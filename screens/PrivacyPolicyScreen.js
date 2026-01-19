import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const PrivacyPolicyScreen = () => {
    const navigation = useNavigation();
    const { theme, isDark } = useTheme();

    const sections = [
        {
            title: 'Introduction',
            icon: '📋',
            content: 'This Privacy Policy explains how we collect, use, and protect your information. By using this app, you agree to the terms.'
        },
        {
            title: 'Information Collection',
            icon: '📱',
            content: '• Search queries (CNIC/phone numbers)\n• Device info for functionality\n• Usage analytics\n\nWe do NOT store search history on servers.'
        },
        {
            title: 'Data Usage',
            icon: '🔄',
            content: '• Provide SIM lookup service\n• Improve app performance\n• Enhance user experience'
        },
        {
            title: 'Third-Party Services',
            icon: '🌐',
            content: 'This app uses third-party APIs for publicly available data. We are not responsible for third-party data accuracy.'
        },
        {
            title: 'Data Security',
            icon: '🔒',
            content: '• Encrypted transmissions\n• No data selling/sharing\n• No permanent storage\n• No account required'
        },
        {
            title: 'Disclaimer',
            icon: '⚠️',
            content: 'NOT affiliated with PTA, NADRA, or any government body. For informational purposes only.'
        },
        {
            title: 'Contact',
            icon: '📧',
            content: 'Email: support@getcrack.com'
        },
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="light-content" translucent={false} />

            {/* Compact Gradient Header */}
            <LinearGradient
                colors={theme.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>‹</Text>
                </TouchableOpacity>

                <View style={styles.headerCenter}>
                    <Text style={styles.headerIcon}>🔒</Text>
                    <Text style={styles.headerTitle}>Privacy Policy</Text>
                </View>

                <View style={styles.headerPlaceholder} />
            </LinearGradient>

            {/* Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Last Updated Badge */}
                <View style={[styles.updateBadge, { backgroundColor: theme.primaryLight, borderColor: theme.primaryBorder }]}>
                    <Ionicons name="time-outline" size={12} color={theme.primary} />
                    <Text style={[styles.updateText, { color: theme.primary }]}>Updated: Jan 2026</Text>
                </View>

                {/* Sections */}
                {sections.map((section, index) => (
                    <View key={index} style={[styles.sectionCard, { backgroundColor: theme.card }]}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionEmoji}>{section.icon}</Text>
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>{section.title}</Text>
                        </View>
                        <Text style={[styles.sectionContent, { color: theme.textSecondary }]}>{section.content}</Text>
                    </View>
                ))}

                {/* Footer */}
                <Text style={[styles.footerText, { color: theme.textSecondary }]}>
                    © 2026 GetCrack
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 6,
        paddingBottom: 10,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 26,
        fontWeight: '700',
        color: '#ffffff',
        marginTop: -4,
    },
    headerCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        fontSize: 15,
        marginRight: 6,
    },
    headerTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: '#ffffff',
    },
    headerPlaceholder: {
        width: 36,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 30,
    },
    updateBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 14,
        marginTop: -4,
    },
    updateText: {
        fontSize: 11,
        fontWeight: '600',
        marginLeft: 4,
    },
    sectionCard: {
        borderRadius: 14,
        padding: 14,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    sectionEmoji: {
        fontSize: 15,
        marginRight: 8,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '700',
    },
    sectionContent: {
        fontSize: 13,
        lineHeight: 19,
    },
    footerText: {
        fontSize: 11,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 12,
    },
});

export default PrivacyPolicyScreen;
