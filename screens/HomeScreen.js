import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Share,
    Alert,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import SocialMediaModal from '../components/SocialMediaModal';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
    const { theme, isDark, toggleTheme } = useTheme();
    const [showSocialModal, setShowSocialModal] = useState(false);

    const handleCheckSim = () => {
        navigation.navigate('Server01');
    };

    const handleCheckCNIC = () => {
        navigation.navigate('Server02');
    };

    const handlePrivacyPolicy = () => {
        navigation.navigate('PrivacyPolicy');
    };

    const handleYTDownload = () => {
        navigation.navigate('Server03');
    };

    const handleRateApp = () => {
        Alert.alert('Rate Us', 'Thank you for your support! Rating feature coming soon.');
    };

    const handleShareApp = async () => {
        try {
            const result = await Share.share({
                message: '📱 Check how many SIMs are registered on your CNIC!\\n\\nDownload GetCrack app now:\\nhttps://play.google.com/store/apps/details?id=com.getcrack',
                title: 'GetCrack App',
            });
        } catch (error) {
            Alert.alert('Error', 'Failed to share the app');
        }
    };

    const handleSocialMedia = () => {
        setShowSocialModal(true);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['left', 'right', 'bottom']}>
            <StatusBar barStyle="light-content" backgroundColor="#3B82F6" translucent={false} />

            {/* Compact Header */}
            <LinearGradient
                colors={theme.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/icon.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.headerTitle}>GetCrack</Text>
                </View>
                <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
                    <Ionicons name={isDark ? "sunny" : "moon"} size={18} color="#FFFFFF" />
                </TouchableOpacity>
            </LinearGradient>

            {/* Main Content */}
            <View style={styles.content}>
                {/* Check SIM Details Card */}
                <TouchableOpacity onPress={handleCheckSim} activeOpacity={0.8}>
                    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
                        <LinearGradient
                            colors={theme.gradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.iconBox}
                        >
                            <Ionicons name="card-outline" size={22} color="#FFFFFF" />
                        </LinearGradient>
                        <View style={styles.cardContent}>
                            <Text style={[styles.cardTitle, { color: theme.text }]}>
                                Check SIM Details
                            </Text>
                            <Text style={[styles.cardDesc, { color: theme.textSecondary }]}>
                                View registered SIM info
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
                    </View>
                </TouchableOpacity>

                {/* Check CNIC Details Card */}
                <TouchableOpacity onPress={handleCheckCNIC} activeOpacity={0.8}>
                    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
                        <LinearGradient
                            colors={theme.gradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.iconBox}
                        >
                            <Ionicons name="id-card-outline" size={22} color="#FFFFFF" />
                        </LinearGradient>
                        <View style={styles.cardContent}>
                            <Text style={[styles.cardTitle, { color: theme.text }]}>
                                Check CNIC Details
                            </Text>
                            <Text style={[styles.cardDesc, { color: theme.textSecondary }]}>
                                Verify CNIC registration
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
                    </View>
                </TouchableOpacity>

                {/* YouTube Downloader Card */}
                <TouchableOpacity onPress={handleYTDownload} activeOpacity={0.8}>
                    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
                        <LinearGradient
                            colors={theme.gradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.iconBox}
                        >
                            <Ionicons name="logo-youtube" size={22} color="#FFFFFF" />
                        </LinearGradient>
                        <View style={styles.cardContent}>
                            <Text style={[styles.cardTitle, { color: theme.text }]}>
                                YouTube Downloader
                            </Text>
                            <Text style={[styles.cardDesc, { color: theme.textSecondary }]}>
                                Download videos & audio
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
                    </View>
                </TouchableOpacity>
            </View>

            {/* Compact Bottom Navigation */}
            <View style={[styles.bottomNav, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
                <TouchableOpacity style={styles.navItem} onPress={handlePrivacyPolicy}>
                    <LinearGradient
                        colors={theme.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.navIcon}
                    >
                        <Ionicons name="shield-checkmark" size={18} color="#FFFFFF" />
                    </LinearGradient>
                    <Text style={[styles.navLabel, { color: theme.text }]}>Privacy</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={handleRateApp}>
                    <LinearGradient
                        colors={theme.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.navIcon}
                    >
                        <Ionicons name="star" size={18} color="#FFFFFF" />
                    </LinearGradient>
                    <Text style={[styles.navLabel, { color: theme.text }]}>Rate</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={handleShareApp}>
                    <LinearGradient
                        colors={theme.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.navIcon}
                    >
                        <Ionicons name="share-social" size={18} color="#FFFFFF" />
                    </LinearGradient>
                    <Text style={[styles.navLabel, { color: theme.text }]}>Share</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={handleSocialMedia}>
                    <LinearGradient
                        colors={theme.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.navIcon}
                    >
                        <Ionicons name="people" size={18} color="#FFFFFF" />
                    </LinearGradient>
                    <Text style={[styles.navLabel, { color: theme.text }]}>Social</Text>
                </TouchableOpacity>
            </View>

            {/* Social Media Modal */}
            <SocialMediaModal
                visible={showSocialModal}
                onClose={() => setShowSocialModal(false)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 40,
        paddingBottom: 12,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    logo: {
        width: 28,
        height: 28,
        borderRadius: 7,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.3,
    },
    themeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    card: {
        borderRadius: 14,
        borderWidth: 1,
        padding: 14,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 3,
    },
    cardDesc: {
        fontSize: 12,
        lineHeight: 16,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.04,
        shadowRadius: 3,
    },
    navItem: {
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    navIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    navLabel: {
        fontSize: 10,
        fontWeight: '600',
    },
});
