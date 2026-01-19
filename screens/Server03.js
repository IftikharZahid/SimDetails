import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, StatusBar, KeyboardAvoidingView, Platform, ActivityIndicator, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Server03Screen = () => {
    const navigation = useNavigation();
    const { theme, isDark } = useTheme();
    const [videoUrl, setVideoUrl] = useState('');
    const [formatType, setFormatType] = useState('video');
    const [quality, setQuality] = useState('18');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');

    // Extract video ID from YouTube URL
    const extractVideoId = (url) => {
        const regex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        const match = url.match(regex);
        return (match && match[1].length === 11) ? match[1] : null;
    };

    const downloadVideo = async () => {
        if (!videoUrl.trim()) {
            setError('Please enter a YouTube URL');
            return;
        }

        const videoId = extractVideoId(videoUrl);
        if (!videoId) {
            setError('Invalid YouTube URL');
            return;
        }

        setLoading(true);
        setError('');
        setStatus('Extracting video info...');

        try {
            const apiUrl = `https://fam-official.serv00.net/api/ytapi.php?video=${videoId}`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            console.log('API Response:', data);

            if (data.success && data.formats && data.formats.length > 0) {
                // Find the requested quality format
                let targetFormat = data.formats.find(f => f.itag == quality);

                if (!targetFormat) {
                    targetFormat = data.formats[0];
                }

                const downloadUrl = targetFormat.url;
                setStatus('Opening download link...');

                // Open the download URL in browser
                const supported = await Linking.canOpenURL(downloadUrl);
                if (supported) {
                    await Linking.openURL(downloadUrl);
                    setStatus('Download started in browser!');
                    Alert.alert(
                        'Download Started',
                        'The video will download through your browser.',
                        [{ text: 'OK' }]
                    );
                } else {
                    setError('Unable to open download link');
                }
            } else {
                setError('No download formats available for this video');
            }
        } catch (error) {
            console.error('Download error:', error);
            setError('Failed to fetch video. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['left', 'right', 'bottom']}>
            <StatusBar translucent={false} barStyle="light-content" translucent={false} />

            {/* Gradient Header */}
            <LinearGradient
                colors={['#e44d26', '#f16529']}
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
                    <Text style={styles.headerIcon}>📥</Text>
                    <Text style={styles.headerTitle}>YT Downloader</Text>
                </View>

                <View style={styles.headerPlaceholder} />
            </LinearGradient>

            {/* Content */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Input Card */}
                    <View style={[styles.inputCard, { backgroundColor: theme.card }]}>
                        <Text style={[styles.label, { color: theme.primary }]}>YOUTUBE URL</Text>
                        <TextInput
                            style={[styles.input, { color: theme.text, backgroundColor: isDark ? theme.background : '#f8fafc', borderColor: theme.border }]}
                            placeholder="Paste YouTube link here..."
                            placeholderTextColor="#9ca3af"
                            value={videoUrl}
                            onChangeText={(text) => {
                                setVideoUrl(text);
                                setError('');
                                setStatus('');
                            }}
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="done"
                        />

                        {/* Format Type */}
                        <Text style={[styles.label, { color: theme.primary, marginTop: 16 }]}>FORMAT</Text>
                        <View style={styles.formatButtons}>
                            <TouchableOpacity
                                style={[
                                    styles.formatBtn,
                                    formatType === 'video' && styles.formatBtnActive
                                ]}
                                onPress={() => setFormatType('video')}
                            >
                                <Ionicons name="videocam" size={20} color={formatType === 'video' ? '#fff' : '#e44d26'} />
                                <Text style={[styles.formatBtnText, formatType === 'video' && styles.formatBtnTextActive]}>
                                    MP4 Video
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.formatBtn,
                                    formatType === 'audio' && styles.formatBtnActive
                                ]}
                                onPress={() => setFormatType('audio')}
                            >
                                <Ionicons name="musical-notes" size={20} color={formatType === 'audio' ? '#fff' : '#e44d26'} />
                                <Text style={[styles.formatBtnText, formatType === 'audio' && styles.formatBtnTextActive]}>
                                    MP3 Audio
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Quality Selection */}
                        {formatType === 'video' && (
                            <>
                                <Text style={[styles.label, { color: theme.primary, marginTop: 16 }]}>QUALITY</Text>
                                <View style={styles.qualityButtons}>
                                    <TouchableOpacity
                                        style={[styles.qualityBtn, quality === '18' && styles.qualityBtnActive]}
                                        onPress={() => setQuality('18')}
                                    >
                                        <Text style={[styles.qualityBtnText, quality === '18' && styles.qualityBtnTextActive]}>
                                            360p
                                        </Text>
                                        <Text style={[styles.qualitySubtext, quality === '18' && { color: '#fff' }]}>Fastest</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.qualityBtn, quality === '22' && styles.qualityBtnActive]}
                                        onPress={() => setQuality('22')}
                                    >
                                        <Text style={[styles.qualityBtnText, quality === '22' && styles.qualityBtnTextActive]}>
                                            720p
                                        </Text>
                                        <Text style={[styles.qualitySubtext, quality === '22' && { color: '#fff' }]}>HD</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}

                        {/* Download Button */}
                        <TouchableOpacity
                            onPress={downloadVideo}
                            disabled={loading}
                            activeOpacity={0.9}
                            style={{ marginTop: 20 }}
                        >
                            <LinearGradient
                                colors={loading ? ['#9ca3af', '#6b7280'] : ['#e44d26', '#f16529']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.downloadButton}
                            >
                                {loading ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <Ionicons name="download" size={20} color="#fff" />
                                )}
                                <Text style={styles.downloadButtonText}>
                                    {loading ? 'Processing...' : '🚀 Download Now'}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Error Message */}
                        {error && (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorIcon}>⚠️</Text>
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        )}

                        {/* Status Message */}
                        {status && !error && (
                            <View style={styles.statusContainer}>
                                <Text style={styles.statusText}>✓ {status}</Text>
                            </View>
                        )}
                    </View>

                    {/* Info Card */}
                    <View style={[styles.infoCard, { backgroundColor: theme.card }]}>
                        <Text style={[styles.infoTitle, { color: theme.text }]}>How to use:</Text>
                        <Text style={[styles.infoItem, { color: theme.textSecondary }]}>1. Copy YouTube video URL</Text>
                        <Text style={[styles.infoItem, { color: theme.textSecondary }]}>2. Paste link above</Text>
                        <Text style={[styles.infoItem, { color: theme.textSecondary }]}>3. Select format & quality</Text>
                        <Text style={[styles.infoItem, { color: theme.textSecondary }]}>4. Tap Download Now</Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
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
        paddingTop: 45,
        paddingBottom: 12,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#ffffff',
        marginTop: -6,
    },
    headerCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        fontSize: 24,
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: '#ffffff',
        letterSpacing: 0.3,
    },
    headerPlaceholder: {
        width: 40,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40,
    },
    inputCard: {
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
        marginTop: -15,
    },
    label: {
        fontSize: 11,
        fontWeight: '700',
        marginBottom: 8,
        letterSpacing: 1,
    },
    input: {
        borderWidth: 1.5,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 12,
        fontWeight: '500',
    },
    formatButtons: {
        flexDirection: 'row',
        gap: 10,
    },
    formatBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fee2e2',
        backgroundColor: '#fff5f5',
        gap: 6,
    },
    formatBtnActive: {
        backgroundColor: '#e44d26',
        borderColor: '#e44d26',
    },
    formatBtnText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#e44d26',
    },
    formatBtnTextActive: {
        color: '#fff',
    },
    qualityButtons: {
        flexDirection: 'row',
        gap: 10,
    },
    qualityBtn: {
        flex: 1,
        padding: 12,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fee2e2',
        backgroundColor: '#fff5f5',
        alignItems: 'center',
    },
    qualityBtnActive: {
        backgroundColor: '#e44d26',
        borderColor: '#e44d26',
    },
    qualityBtnText: {
        fontSize: 15,
        fontWeight: '800',
        color: '#e44d26',
    },
    qualityBtnTextActive: {
        color: '#fff',
    },
    qualitySubtext: {
        fontSize: 10,
        color: '#9ca3af',
        marginTop: 2,
    },
    downloadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        gap: 8,
        shadowColor: '#e44d26',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    downloadButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '700',
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fef2f2',
        padding: 10,
        borderRadius: 8,
        marginTop: 12,
    },
    errorIcon: {
        fontSize: 12,
        marginRight: 8,
    },
    errorText: {
        color: '#dc2626',
        fontSize: 12,
        fontWeight: '600',
        flex: 1,
    },
    statusContainer: {
        backgroundColor: '#f0fdf4',
        padding: 10,
        borderRadius: 8,
        marginTop: 12,
    },
    statusText: {
        color: '#16a34a',
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    infoCard: {
        borderRadius: 14,
        padding: 16,
        marginTop: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 3,
    },
    infoTitle: {
        fontSize: 12,
        fontWeight: '700',
        marginBottom: 8,
    },
    infoItem: {
        fontSize: 12,
        marginBottom: 4,
        lineHeight: 18,
    },
});

export default Server03Screen;
