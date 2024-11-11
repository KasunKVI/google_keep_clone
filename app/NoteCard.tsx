import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import { ThemedView } from "@/components/ThemedView";
import Icon from 'react-native-vector-icons/MaterialIcons';

const NoteCreationScreen: React.FC = () => {

    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');


    return (
        <ThemedView style={styles.container}>
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
                        <TouchableOpacity style={styles.headerButton}>
                            <Icon name="notifications" size={24} color="#666" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerButton}>
                            <Icon name="archive" size={24} color="#666" />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView style={styles.content}>
                    <TextInput
                        style={styles.titleInput}
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                        placeholderTextColor="#666"
                    />
                    <TextInput
                        style={styles.noteInput}
                        placeholder="Note"
                        value={note}
                        onChangeText={setNote}
                        multiline
                        textAlignVertical="top"
                        placeholderTextColor="#666"
                    />
                </ScrollView>

                <View style={styles.footer}>
                    <View style={styles.toolbarLeft}>
                        <TouchableOpacity style={styles.toolbarButton}>
                            <Icon name="add-box" size={24} color="#666" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.toolbarButton}>
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
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
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
        padding: 16,
    },
    titleInput: {
        fontSize: 22,
        fontWeight: '500',
        marginBottom: 16,
        color: '#000',
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
});

export default NoteCreationScreen;
