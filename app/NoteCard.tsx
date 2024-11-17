import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    Image,
    Modal,
} from 'react-native';
import { ThemedView } from "@/components/ThemedView";
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const COLORS = [
    '#ffffff', '#f28b82', '#fbbc04', '#fff475', '#ccff90',
    '#a7ffeb', '#cbf0f8', '#d7aefb', '#fdcfe8',
];

const NoteCreationScreen: React.FC = () => {
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showReminder, setShowReminder] = useState(false);
    const [reminderDate, setReminderDate] = useState<Date | null>(null);
    const [showReminderPicker, setShowReminderPicker] = useState(false);

    const pickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: true,
                quality: 1,
            });

            if (!result.canceled) {
                const newImages = result.assets.map(asset => asset.uri);
                setImages([...images, ...newImages]);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            alert('Error picking image');
        }
    };

    const handleReminderChange = (event: any, selectedDate?: Date) => {
        setShowReminderPicker(false);
        if (selectedDate) {
            setReminderDate(selectedDate);
            setShowReminder(true);
            // Here you would typically set up the actual reminder notification
            // using something like react-native-notifications
            console.log('Reminder set for:', selectedDate);
        }
    };

    const removeReminder = () => {
        setReminderDate(null);
        setShowReminder(false);
        // Here you would typically cancel the reminder notification
    };

    const formatReminderDate = (date: Date) => {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === now.toDateString()) {
            return `Today ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return `Tomorrow ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else {
            return date.toLocaleDateString([], {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    };

    const ReminderBadge = () => (
        showReminder && reminderDate ? (
            <View style={styles.reminderBadge}>
                <Icon name="access-time" size={16} color="#666" />
                <Text style={styles.reminderText}>
                    {formatReminderDate(reminderDate)}
                </Text>
                <TouchableOpacity
                    onPress={removeReminder}
                    style={styles.removeReminderButton}
                >
                    <Icon name="close" size={16} color="#666" />
                </TouchableOpacity>
            </View>
        ) : null
    );

    const ColorPicker = () => (
        <Modal
            transparent
            visible={showColorPicker}
            onRequestClose={() => setShowColorPicker(false)}
            animationType="fade"
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                onPress={() => setShowColorPicker(false)}
            >
                <View style={styles.colorPickerContainer}>
                    {COLORS.map((color) => (
                        <TouchableOpacity
                            key={color}
                            style={[styles.colorOption, { backgroundColor: color }]}
                            onPress={() => {
                                setBackgroundColor(color);
                                setShowColorPicker(false);
                            }}
                        >
                            {color === backgroundColor && (
                                <Icon name="check" size={20} color="#666" />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </TouchableOpacity>
        </Modal>
    );

    // @ts-ignore
    return (
        <ThemedView style={[styles.container, { backgroundColor }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoid}
            >
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerButton}>
                        <Icon name="arrow-back" size={24} color="#666" />
                    </TouchableOpacity>

                    <View style={styles.headerActions}>
                        <TouchableOpacity style={styles.headerButton}>
                            <Icon name="push-pin" size={24} color="#666" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.headerButton}
                            onPress={() => setShowReminderPicker(true)}
                        >
                            <Icon
                                name="notifications"
                                size={24}
                                color={showReminder ? "#4285f4" : "#666"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerButton}>
                            <Icon name="archive" size={24} color="#666" />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView style={styles.content}>
                    <View style={styles.noteContent}>
                        <TextInput
                            style={styles.titleInput}
                            placeholder="Title"
                            value={title}
                            onChangeText={setTitle}
                            placeholderTextColor="#666"
                        />

                        <ReminderBadge />

                        {images.length > 0 && (
                            <View style={styles.imagesSection}>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.imageScrollContainer}
                                >
                                    {images.map((uri, index) => (
                                        <View key={index} style={styles.imageWrapper}>
                                            <Image source={{ uri }} style={styles.image} />
                                            <TouchableOpacity
                                                style={styles.removeImage}
                                                onPress={() => {
                                                    const newImages = [...images];
                                                    newImages.splice(index, 1);
                                                    setImages(newImages);
                                                }}
                                            >
                                                <Icon name="close" size={20} color="#fff" />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                        )}

                        <TextInput
                            style={styles.noteInput}
                            placeholder="Note"
                            value={note}
                            onChangeText={setNote}
                            multiline
                            textAlignVertical="top"
                            placeholderTextColor="#666"
                        />
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <View style={styles.toolbarLeft}>
                        <TouchableOpacity
                            style={styles.toolbarButton}
                            onPress={pickImage}
                        >
                            <Icon name="add-box" size={24} color="#666" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.toolbarButton}
                            onPress={() => setShowColorPicker(true)}
                        >
                            <Icon name="palette" size={24} color="#666" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.toolbarButton}>
                            <Icon name="text-format" size={24} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footerRight}>
                        <TouchableOpacity style={styles.editedButton}>
                            <Icon name="more-vert" size={24} color="#666" />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>

            <ColorPicker />

            {showReminderPicker && (
                <DateTimePicker
                    value={reminderDate || new Date()}
                    mode="datetime"
                    display="default"
                    onChange={handleReminderChange}
                />
            )}
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    // ... previous styles remain the same ...
    reminderBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f3f4',
        padding: 8,
        borderRadius: 16,
        marginBottom: 16,
        alignSelf: 'flex-start',
    },
    reminderText: {
        marginLeft: 4,
        marginRight: 8,
        color: '#666',
        fontSize: 14,
    },
    removeReminderButton: {
        padding: 2,
    },
    container: {
        flex: 1,
    },
    keyboardAvoid: {
        flex: 1,
    },
    header: {
        marginTop: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerButton: {
        padding: 8,
    },
    headerActions: {
        flexDirection: 'row',
    },
    content: {
        flex: 1,
    },
    noteContent: {
        padding: 16,
    },
    titleInput: {
        fontSize: 22,
        fontWeight: '500',
        marginBottom: 16,
        color: '#000',
    },
    imagesSection: {
        marginBottom: 16,
    },
    imageScrollContainer: {
        paddingRight: 8, // Account for the last image's margin
    },
    noteInput: {
        fontSize: 16,
        color: '#000',
        minHeight: 200,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    toolbarLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    toolbarButton: {
        padding: 8,
        marginRight: 8,
    },
    footerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    editedButton: {
        padding: 8,
    },
    imageWrapper: {
        marginRight: 8,
        position: 'relative',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 8,
    },
    removeImage: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 12,
        padding: 4,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorPickerContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '80%',
        justifyContent: 'center',
    },
    colorOption: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
});

export default NoteCreationScreen;
