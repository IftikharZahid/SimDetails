import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Linking,
    Alert,
    Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

export default function SocialMediaModal({ visible, onClose }) {
    const { theme, isDark } = useTheme();

    const socialPlatforms = [
        {
            name: 'Telegram',
            icon: 'paper-plane',
            gradient: ['#0088cc', '#38bdf8'],
            url: 'https://t.me/getcrack', // Replace with actual link
            description: 'Join our channel'
        },
        {
            name: 'WhatsApp',
            icon: 'logo-whatsapp',
            gradient: ['#25D366', '#128C7E'],
            url: 'https://whatsapp.com/channel/0029VaGM2ptBPzjPOt6Tib2G', // Replace with actual number
            description: 'Chat with support'
        },
    ];

    const handlePress = async (platform) => {
        try {
            const canOpen = await Linking.canOpenURL(platform.url);
            if (canOpen) {
                await Linking.openURL(platform.url);
                onClose();
            } else {
                Alert.alert('Error', `Cannot open ${platform.name}`);
            }
        } catch (error) {
            Alert.alert('Error', `Failed to open ${platform.name}`);
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
                    <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
                        {/* Header */}
                        <View style={styles.header}>
                            <View>
                                <Text style={[styles.title, { color: theme.text }]}>
                                    Join Our Community
                                </Text>
                                <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                                    Connect with us on social media
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={[styles.closeButton, { backgroundColor: isDark ? '#374151' : '#f3f4f6' }]}
                                onPress={onClose}
                            >
                                <Ionicons name="close" size={20} color={theme.text} />
                            </TouchableOpacity>
                        </View>

                        {/* Social Media Cards */}
                        <View style={styles.cardsContainer}>
                            {socialPlatforms.map((platform, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => handlePress(platform)}
                                    activeOpacity={0.8}
                                >
                                    <LinearGradient
                                        colors={platform.gradient}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={styles.socialCard}
                                    >
                                        <View style={styles.iconContainer}>
                                            <Ionicons
                                                name={platform.icon}
                                                size={32}
                                                color="#FFFFFF"
                                            />
                                        </View>
                                        <View style={styles.cardContent}>
                                            <Text style={styles.platformName}>{platform.name}</Text>
                                            <Text style={styles.platformDescription}>
                                                {platform.description}
                                            </Text>
                                        </View>
                                        <Ionicons
                                            name="chevron-forward"
                                            size={20}
                                            color="rgba(255,255,255,0.8)"
                                        />
                                    </LinearGradient>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Footer Note */}
                        <View style={styles.footer}>
                            <Ionicons name="information-circle" size={16} color={theme.textSecondary} />
                            <Text style={[styles.footerText, { color: theme.textSecondary }]}>
                                Tap any platform to open
                            </Text>
                        </View>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: width * 0.85,
        maxWidth: 360,
    },
    modalContent: {
        borderRadius: 20,
        padding: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 2,
    },
    subtitle: {
        fontSize: 12,
        fontWeight: '500',
    },
    closeButton: {
        width: 34,
        height: 34,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardsContainer: {
        marginBottom: 12,
    },
    socialCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 14,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.18,
        shadowRadius: 6,
        elevation: 4,
    },
    iconContainer: {
        width: 44,
        height: 44,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    cardContent: {
        flex: 1,
    },
    platformName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 1,
    },
    platformDescription: {
        fontSize: 11,
        fontWeight: '500',
        color: 'rgba(255,255,255,0.8)',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
        gap: 4,
    },
    footerText: {
        fontSize: 11,
        fontWeight: '500',
    },
});
