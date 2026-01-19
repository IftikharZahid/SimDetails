import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import * as SplashScreenNative from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreenNative.preventAutoHideAsync();

export default function SplashScreen({ onFinish }) {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            try {
                await Font.loadAsync({
                    'JameelNooriNastaleeq': require('../assets/fonts/JameelNooriNastaleeq.ttf'),
                });
                setFontsLoaded(true);
                await SplashScreenNative.hideAsync();
            } catch (error) {
                console.log('Font loading error:', error);
                setFontsLoaded(true);
                await SplashScreenNative.hideAsync();
            }
        }
        loadFonts();
    }, []);

    useEffect(() => {
        if (fontsLoaded) {
            const timer = setTimeout(() => {
                if (onFinish) onFinish();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [fontsLoaded, onFinish]);

    if (!fontsLoaded) {
        return (
            <LinearGradient
                colors={['#3B82F6', '#2563EB']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.container}
            >
                <View style={styles.content} />
            </LinearGradient>
        );
    }

    return (
        <LinearGradient
            colors={['#3B82F6', '#2563EB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <View style={styles.content}>
                <Text style={styles.mainText}>آپکے نام کتنی سم</Text>
                <Text style={styles.mainText}>رجسٹرڈ ہیں؟</Text>
                <Text style={styles.ctaText}>ابھی چیک کریں!</Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
    },
    mainText: {
        fontSize: 42,
        fontWeight: '800',
        color: '#FFFFFF',
        fontFamily: 'JameelNooriNastaleeq',
        textAlign: 'center',
        marginBottom: 6,
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    ctaText: {
        fontSize: 26,
        fontWeight: '700',
        color: '#FFFFFF',
        fontFamily: 'JameelNooriNastaleeq',
        marginTop: 20,
        textAlign: 'center',
        opacity: 0.95,
    },
});
