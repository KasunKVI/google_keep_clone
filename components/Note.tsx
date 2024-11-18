import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface NoteCardProps {
    note: {
        id: string;
        title: string;
        content: string;
        images?: string[];
        pinned?: boolean;
        backgroundColor: string;
    };
    onPress: (note: any) => void;
}

const Note: React.FC<NoteCardProps> = ({ note, onPress }) => {
    const renderImage = ({ item }: { item: string }) => (
        <Image
            source={{ uri: item }}
            style={styles.image}
            resizeMode="cover"
        />
    );

    return (
        <TouchableOpacity style={[styles.container,{backgroundColor:note.backgroundColor }]} onPress={() => onPress(note)}>
            {note.images && note.images.length > 0 && (
                <FlatList
                    data={note.images}
                    renderItem={renderImage}
                    keyExtractor={(_, index) => index.toString()}
                    horizontal
                    style={styles.imageList}
                />
            )}
            <View style={styles.content}>
                <Text style={styles.title}>{note.title}</Text>
                <Text style={styles.text}>{note.content}</Text>
            </View>
            {note.pinned && (
                <Icon name="push-pin" size={24} color="#666" style={styles.pinIcon} />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageList: {
        marginRight: 16,
        maxHeight: 60,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 8,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    text: {
        fontSize: 14,
        color: '#666',
    },
    pinIcon: {
        marginLeft: 16,
    },
});

export default Note;
