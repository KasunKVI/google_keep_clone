import React from 'react';
import {Text, Image, StyleSheet, TouchableOpacity, useColorScheme, Dimensions, AppRegistry} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import AppLoadingComponent from '../components/AppLoadingComponent';
import { useRouter } from 'expo-router';
import 'react-native-gesture-handler';


const { width: screenWidth } = Dimensions.get('window');

const Index: React.FC = () => {
    const router = useRouter();
    const colorScheme = useColorScheme();

    // Define colors for light and dark themes
    const textColor = colorScheme === 'dark' ? '#FFFFFF' : '#000000';

    return (
        <AppLoadingComponent>
            <ParallaxScrollView
                headerBackgroundColor={{ light: '#FFFFFF', dark: '#000000' }}
                headerImage={
                    <Image
                        source={require('@/assets/images/keep_image.png')}
                        style={styles.brentLogo}
                    />
                }
                headerHeight={530}
            >
                <ThemedView style={styles.titleContainer}>
                    <Text style={[styles.welcomeText, { color: textColor }]}>Capture anything</Text>
                </ThemedView>
                <ThemedView style={styles.expText}>
                    <Text style={[styles.label, { color: textColor }]}>
                       Make lists, take photos, speak your mind -
                    </Text>
                    <Text style={[styles.label, { color: textColor }]}>
                        whatever works for you, works in keep.
                    </Text>
                </ThemedView>

                <TouchableOpacity  style={styles.getStartButton} onPress={() => router.push('/home')}>
                    <Text style={styles.signUp}>Get Start</Text>
                </TouchableOpacity>


            </ParallaxScrollView>
        </AppLoadingComponent>
    );
};

const styles = StyleSheet.create({

    brentLogo: {
        height: 200,
        width: 200,
        margin: 15,
        borderRadius: 10,
        position: 'relative',
        top: 160,
        alignSelf: 'center',
    },
    welcomeText: {
        fontSize: 35,
        fontWeight: 'bold',
    },
    titleContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    expText: {
        flexDirection: 'column',
        gap: 1,
        alignSelf: 'center',
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    signUp: {
        color: 'white',
    },
    getStartButton: {
        backgroundColor: '#2a57eb',
        paddingVertical: 13,
        borderRadius: 20,
        marginTop: 20,
        paddingHorizontal: 25,
        alignSelf: 'center',
    },

});

export default Index;
