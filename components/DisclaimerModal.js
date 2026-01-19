import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    ScrollView,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

const { width, height } = Dimensions.get('window');

export default function DisclaimerModal({ visible, onAccept }) {
    const { theme, isDark } = useTheme();

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            statusBarTranslucent={true}
        >
            <View style={styles.overlay}>
                <View style={[styles.modalContainer, { backgroundColor: isDark ? theme.card : '#f0f4ff' }]}>
                    {/* Title */}
                    <Text style={[styles.title, { color: theme.primary }]}>Important Disclaimer</Text>

                    <ScrollView
                        style={styles.scrollView}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Disclaimer Section */}
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>DISCLAIMER: NOT A GOVERNMENT APP</Text>
                        <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
                            This application is a privately developed third-party tool. It is NOT affiliated with, endorsed by, or representative of the Pakistan Telecommunication Authority (PTA), NADRA, or any other government entity.
                        </Text>

                        {/* Bullet Points */}
                        <View style={styles.bulletContainer}>
                            <Text style={[styles.bulletPoint, { color: theme.textSecondary }]}>
                                • No access to government or official databases
                            </Text>
                            <Text style={[styles.bulletPoint, { color: theme.textSecondary }]}>
                                • Content sourced from publicly accessible platforms
                            </Text>
                            <Text style={[styles.bulletPoint, { color: theme.textSecondary }]}>
                                • No ownership claimed over third-party data
                            </Text>
                            <Text style={[styles.bulletPoint, { color: theme.textSecondary }]}>
                                • For informational and reference purposes only
                            </Text>
                            <Text style={[styles.bulletPoint, { color: theme.textSecondary }]}>
                                • Not an official or authoritative source
                            </Text>
                        </View>

                        {/* Source Section */}
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>SOURCE OF INFORMATION</Text>
                        <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
                            The general information regarding SIM card registration and ownership counts displayed in this app is aggregated from publicly available databases and can be verified independently at the official PTA SIM Information System.
                        </Text>
                    </ScrollView>

                    {/* Accept Button */}
                    <TouchableOpacity onPress={onAccept} activeOpacity={0.9}>
                        <LinearGradient
                            colors={theme.gradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>I Understand & Continue</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modalContainer: {
        borderRadius: 24,
        padding: 18,
        width: '100%',
        maxHeight: height * 0.7,
        shadowColor: '#667eea',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 16,
    },
    scrollView: {
        maxHeight: height * 0.45,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        marginTop: 12,
        marginBottom: 8,
    },
    paragraph: {
        fontSize: 14,
        lineHeight: 22,
        textAlign: 'left',
    },
    bulletContainer: {
        marginTop: 16,
        marginBottom: 16,
    },
    bulletPoint: {
        fontSize: 14,
        lineHeight: 24,
        paddingLeft: 4,
    },
    button: {
        borderRadius: 30,
        paddingVertical: 16,
        paddingHorizontal: 32,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#667eea',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
});
