import React, { useState, useEffect, useRef } from "react";
import {View, TextInput, StyleSheet, Text, TouchableOpacity, Animated, FlatList} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useLocalSearchParams, useRouter} from 'expo-router';
import NoteCard from '@/components/Note';

import axios from 'axios';
import {auth} from "@/firebaseConfig";

interface Note {
    id: string;
    title: string;
    content: string;
    backgroundColor: string;
    images?: string[];
    pinned?: boolean;
    reminder?: Date | null;
}
const Home: React.FC = () => {
    const [selectedNoteType, setSelectedNoteType] = useState<string | null>(null);
    const [showOptions, setShowOptions] = useState(false);
    const optionsAnim = useRef(new Animated.Value(0)).current;
    const rotateAnimation = useRef(new Animated.Value(0)).current;
    const [notes, setNotes] = useState<Note[]>([]);
    const [pinnedNote, setPinnedNote] = useState<Note | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { searchText } = useLocalSearchParams<{ searchText?: string }>();
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);


    const router = useRouter();

    // Animate options when showOptions changes
    useEffect(() => {
        Animated.parallel([
            Animated.timing(optionsAnim, {
                toValue: showOptions ? 1 : 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.spring(rotateAnimation, {
                toValue: showOptions ? 1 : 0,
                useNativeDriver: true,
                tension: 40,
                friction: 7
            })
        ]).start();
    }, [showOptions]);

    // Effect to filter notes based on search text from drawer
    useEffect(() => {
        if (!searchText || searchText.trim() === '') {
            // If search text is empty, show all non-pinned notes
            setFilteredNotes(notes.filter(note => !note.pinned));
        } else {
            // Filter notes by title or content (case-insensitive)
            const filtered = notes.filter(note =>

                note.title.toLowerCase().includes(searchText.toLowerCase()) ||
                note.content.toLowerCase().includes(searchText.toLowerCase())

            );
            setFilteredNotes(filtered);
        }
    }, [searchText, notes]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setIsLoading(true);
                if (auth.currentUser) {
                    const response = await axios.get(`http://localhost:5000/api/v1/note/${auth.currentUser.uid}`);
                    console.log('Fetched notes:', response.data.data);
                    setNotes(response.data.data);

                    // Use response.data directly to set pinnedNote
                    const pinned = response.data.find((note: Note) => note.pinned);
                    setPinnedNote(pinned || null);
                }
            } catch (error) {
                console.error('Error fetching notes:', error);
            } finally {
                setIsLoading(false);
            }

    };



        // Add authentication state listener
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                fetchNotes();
            } else {
                setNotes([]);
                setPinnedNote(null);
                setIsLoading(false);
            }
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, []);

    const rotation = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg']
    });

    const handleAddNote = () => {
        setShowOptions(!showOptions);
    };

    const handleSelectNoteType = (type: string) => {

        switch (type) {
            case 'text':
                router.push({
                    pathname: '/NoteCard',
                    params: { type: 'text' }
                });
                break;
            case 'image':

                break;
            case 'drawing':

                break;
            case 'list':
                router.push({
                    pathname: '/TaskList',
                    params: { type: 'text' }
                });
                break;
            default:
                break
        }

        setSelectedNoteType(type);
        setShowOptions(false);
    };
    const handleNotePress = (note: Note) => {
        router.push({
            pathname: '/NoteCard',
            params: {
                noteId: note.id,
                title: note.title,
                content: note.content,
                backgroundColor: note.backgroundColor,
                images: JSON.stringify(note.images),
                reminder: note.reminder ? note.reminder.toString() : null,
            }
        });
    };

    return (
        <ThemedView style={styles.container}>
            {/* Floating Action Button */}
            {pinnedNote && (
                <NoteCard note={pinnedNote} onPress={handleNotePress} />
            )}
            <FlatList
                data={filteredNotes}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <View style={styles.columnItem}>
                        <NoteCard note={item} onPress={handleNotePress} />
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            {searchText && searchText.trim() !== ''
                                ? 'No notes found matching your search'
                                : 'No notes yet'}
                        </Text>
                    </View>
                }
            />

            <TouchableOpacity
                onPress={handleAddNote}
                style={[styles.fab, showOptions && styles.fabActive]}
                activeOpacity={0.8}
            >
                <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                    <Icon name="add" size={30} color="#fff" />
                </Animated.View>
            </TouchableOpacity>

            {/* Animated Options Menu */}
            <Animated.View
                style={[
                    styles.optionMenu,
                    {
                        opacity: optionsAnim,
                        transform: [
                            { translateY: optionsAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [100, 0]
                                })}
                        ],
                        pointerEvents: showOptions ? 'auto' : 'none'
                    }
                ]}
            >
                <TouchableOpacity
                    onPress={() => handleSelectNoteType('image')}
                    style={styles.optionButton}
                >
                    <Icon name="image" size={24} color="#fff" />
                    <Text style={styles.optionText}>Image</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleSelectNoteType('drawing')}
                    style={styles.optionButton}
                >
                    <Icon name="brush" size={24} color="#fff" />
                    <Text style={styles.optionText}>Drawing</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleSelectNoteType('list')}
                    style={styles.optionButton}
                >
                    <Icon name="list" size={24} color="#fff" />
                    <Text style={styles.optionText}>List</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        handleSelectNoteType('text')
                }
                    style={styles.optionButton}
                >
                    <Icon name="text-fields" size={24} color="#fff" />
                    <Text style={styles.optionText}>Text</Text>
                </TouchableOpacity>
            </Animated.View>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    optionText: {
        color: "#fff",
        fontSize: 16,
        marginLeft: 10,
    },
    optionMenu: {
        position: "absolute",
        bottom: 100,
        right: 20,
        borderRadius: 10,
        zIndex: 10,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: "#8c0b10",
        marginBottom: 10,
        borderRadius: 20,
        width: 150,
    },
    fab: {
        position: "absolute",
        right: 20,
        bottom: 30,
        backgroundColor: "#8c0b10",
        borderRadius: 20,
        height: 60,
        width: 60,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    fabActive: {
        backgroundColor: "#6b080c",
    },
    row: {
        flex:1,
        justifyContent: 'space-between',
    },
    columnItem: {
        width: '48%', // Slightly less than 50% to add some spacing
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        color: '#888',
        fontSize: 16,
    }
});

export default Home;
