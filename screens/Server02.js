import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, StatusBar, KeyboardAvoidingView, Platform, ActivityIndicator, Pressable, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { captureRef } from 'react-native-view-shot';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';

const Server02Screen = () => {
    const navigation = useNavigation();
    const { theme, isDark } = useTheme();
    const [input, setInput] = useState('');
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    // Array of refs to capture specific cards
    const cardRefs = useRef([]);

    const fetchDetails = async () => {
        if (!input) {
            setError('Please enter CNIC or phone number');
            return;
        }

        setLoading(true);
        setError('');
        setRecords([]);

        try {
            const response = await fetch(
                `https://legendxdata.site/Api/simdata.php?phone=${input}`
            );

            const jsonData = await response.json();

            // Debug: Log the response to see its structure
            console.log('API Response:', JSON.stringify(jsonData, null, 2));

            // Handle different possible response structures
            let recordsData = [];

            if (jsonData.success && jsonData.data) {
                // Format: { success: true, data: [...] }
                recordsData = Array.isArray(jsonData.data) ? jsonData.data : [jsonData.data];
            } else if (jsonData.records) {
                // Format: { records: [...] }
                recordsData = jsonData.records;
            } else if (Array.isArray(jsonData)) {
                // Format: Direct array response
                recordsData = jsonData;
            } else if (jsonData.data && Array.isArray(jsonData.data)) {
                // Format: { data: [...] }
                recordsData = jsonData.data;
            } else if (typeof jsonData === 'object' && !Array.isArray(jsonData)) {
                // Format: Single record as object
                recordsData = [jsonData];
            }

            if (recordsData.length === 0) {
                setError("No records found.");
                return;
            }

            // Normalize field names (handle different casing/naming conventions)
            const normalizedRecords = recordsData.map(record => ({
                Name: record.Name || record.name || record.full_name || record.fullName || 'N/A',
                Mobile: record.Mobile || record.mobile || record.phone || record.Phone || record.number || 'N/A',
                CNIC: record.CNIC || record.cnic || record.nic || record.NIC || record.id_number || 'N/A',
                Address: record.Address || record.address || record.location || record.Location || 'N/A',
                Country: record.Country || record.country || 'Pakistan',
            }));

            setRecords(normalizedRecords);

        } catch (error) {
            console.error('Error fetching data:', error);
            if (error.name === 'AbortError') {
                setError('Request timed out. Please check your internet connection.');
            } else if (error.message.includes('Network request failed')) {
                setError('Network error. Please check your internet connection.');
            } else {
                setError('Failed to fetch details. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        if (!input) return; // Only refresh if there's a search input

        setRefreshing(true);
        setError('');

        try {
            const response = await fetch(
                `https://tekox.online/api/lookup?phone=${input}`
            );

            const jsonData = await response.json();

            // Handle different possible response structures
            let recordsData = [];

            if (jsonData.success && jsonData.data) {
                recordsData = Array.isArray(jsonData.data) ? jsonData.data : [jsonData.data];
            } else if (jsonData.records) {
                recordsData = jsonData.records;
            } else if (Array.isArray(jsonData)) {
                recordsData = jsonData;
            } else if (jsonData.data && Array.isArray(jsonData.data)) {
                recordsData = jsonData.data;
            } else if (typeof jsonData === 'object' && !Array.isArray(jsonData)) {
                recordsData = [jsonData];
            }

            if (recordsData.length === 0) {
                setError("No records found.");
                setRecords([]);
                return;
            }

            // Normalize field names
            const normalizedRecords = recordsData.map(record => ({
                Name: record.Name || record.name || record.full_name || record.fullName || 'N/A',
                Mobile: record.Mobile || record.mobile || record.phone || record.Phone || record.number || 'N/A',
                CNIC: record.CNIC || record.cnic || record.nic || record.NIC || record.id_number || 'N/A',
                Address: record.Address || record.address || record.location || record.Location || 'N/A',
                Country: record.Country || record.country || 'Pakistan',
            }));

            setRecords(normalizedRecords);
        } catch (error) {
            console.error('Error refreshing data:', error);
            setError('Failed to refresh. Please try again.');
        } finally {
            setRefreshing(false);
        }
    };

    const captureAndCopy = async (index) => {
        try {
            const viewRef = cardRefs.current[index];
            if (!viewRef) return;

            // 1. Capture as Base64 for Clipboard
            const base64 = await captureRef(viewRef, {
                format: 'png',
                quality: 1,
                result: 'base64',
            });

            // 2. Copy to Clipboard
            await Clipboard.setImageAsync(base64);

            Alert.alert('Copied!', 'Snapshot copied to Clipboard.');

        } catch (error) {
            console.error("Snapshot failed", error);
            Alert.alert('Error', 'Failed to copy screenshot.');
        }
    };

    const copyRecordText = async (record, index) => {
        try {
            const formattedRecord = `Record ${index + 1}:\nName: ${record.Name}\nPhone: ${record.Mobile}\nCNIC: ${record.CNIC}\nAddress: ${record.Address}\nCountry: ${record.Country}\nMade with ❤ by @GetCrack`;

            await Clipboard.setStringAsync(formattedRecord);
            Alert.alert('Copied!', 'Record details copied to clipboard.');
        } catch (err) {
            Alert.alert('Error', 'Failed to copy record.');
        }
    };

    const copyAllRecords = async () => {
        if (records.length === 0) return;

        try {
            const formattedRecords = records.map((rec, index) => {
                return `Record ${index + 1}:\nName: ${rec.Name}\nPhone: ${rec.Mobile}\nCNIC: ${rec.CNIC}\nAddress: ${rec.Address}\nCountry: ${rec.Country}\nMade with ❤ by @GetCrack`;
            }).join('\n\n-------------------\n\n');

            await Clipboard.setStringAsync(formattedRecords);
            Alert.alert('Success', 'All records copied to clipboard!');
        } catch (err) {
            Alert.alert('Error', 'Failed to copy records.');
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['left', 'right', 'bottom']}>
            <StatusBar
                barStyle="light-content"
                translucent={false}
            />

            {/* Premium Gradient Header */}
            <LinearGradient
                colors={['#14b8a6', '#06b6d4']}
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
                    <Text style={styles.headerIcon}>🪪</Text>
                    <Text style={styles.headerTitle}>Sim Detail</Text>
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
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={['#14b8a6']}
                            tintColor="#14b8a6"
                        />
                    }
                >

                    {/* Ultra Compact Search Card */}
                    <View style={[styles.searchCard, { backgroundColor: theme.card }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={[styles.inputContainer, { backgroundColor: isDark ? theme.background : '#f8fafc', borderColor: theme.border }]}>
                                <TextInput
                                    style={[styles.input, { color: theme.text }]}
                                    placeholder="Enter CNIC or phone number"
                                    placeholderTextColor="#9ca3af"
                                    value={input}
                                    onChangeText={(text) => {
                                        setInput(text);
                                        setError('');
                                    }}
                                    keyboardType="phone-pad"
                                    returnKeyType="search"
                                    onSubmitEditing={fetchDetails}
                                />
                            </View>

                            <TouchableOpacity
                                onPress={fetchDetails}
                                disabled={loading}
                                activeOpacity={0.8}
                                style={{ marginLeft: 8 }}
                            >
                                <LinearGradient
                                    colors={loading ? ['#9ca3af', '#6b7280'] : ['#14b8a6', '#06b6d4']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={[styles.button, loading && styles.buttonDisabled]}
                                >
                                    <Ionicons name={loading ? "hourglass-outline" : "search"} size={20} color="#fff" />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        {error ? (
                            <View style={[styles.errorContainer, { marginTop: 8 }]}>
                                <Text style={styles.errorIcon}>⚠️</Text>
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        ) : null}
                    </View>

                    {/* Results Section */}
                    {records.length > 0 && (
                        <View style={styles.resultsSection}>
                            <View style={styles.resultsSectionHeader}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.resultsIcon}>📋</Text>
                                    <Text style={[styles.resultsTitle, { color: theme.text }]}>
                                        Found {records.length} Record{records.length > 1 ? 's' : ''}
                                    </Text>
                                </View>

                                {/* Copy All Button */}
                                <TouchableOpacity onPress={copyAllRecords} style={styles.copyAllButton}>
                                    <Ionicons name="copy-outline" size={16} color="#14b8a6" style={{ marginRight: 4 }} />
                                    <Text style={styles.copyAllText}>Copy All</Text>
                                </TouchableOpacity>
                            </View>

                            {records.map((item, index) => (
                                <Pressable
                                    key={index}
                                    onLongPress={() => copyRecordText(item, index)}
                                    delayLongPress={500}
                                >
                                    <View
                                        collapsable={false}
                                        ref={(el) => { cardRefs.current[index] = el; }}
                                        style={[styles.resultCard, { backgroundColor: theme.card }]}
                                    >
                                        {/* Card Header */}
                                        <LinearGradient
                                            colors={['#14b8a6', '#06b6d4']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={styles.cardHeader}
                                        >
                                            <View style={styles.cardHeaderLeft}>
                                                <View style={styles.recordBadge}>
                                                    <Text style={styles.recordBadgeText}>{index + 1}</Text>
                                                </View>
                                                <Text style={styles.cardHeaderTitle}>Record Details</Text>
                                            </View>
                                            <TouchableOpacity
                                                style={styles.copyButton}
                                                onPress={() => captureAndCopy(index)}
                                            >
                                                <Text style={styles.copyIcon}>📸</Text>
                                            </TouchableOpacity>
                                        </LinearGradient>

                                        {/* Card Body */}
                                        <View style={styles.cardBody}>
                                            <View style={styles.infoRow}>
                                                <View style={[styles.infoIconContainer, { backgroundColor: isDark ? '#164e63' : '#ccfbf1' }]}>
                                                    <Text style={styles.infoIcon}>👤</Text>
                                                </View>
                                                <View style={styles.infoContent}>
                                                    <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Name</Text>
                                                    <Text style={[styles.infoValue, { color: theme.text }]}>{item.Name}</Text>
                                                </View>
                                            </View>

                                            <View style={[styles.divider, { backgroundColor: theme.border }]} />

                                            <View style={styles.infoRow}>
                                                <View style={[styles.infoIconContainer, { backgroundColor: isDark ? '#155e75' : '#a5f3fc' }]}>
                                                    <Text style={styles.infoIcon}>📱</Text>
                                                </View>
                                                <View style={styles.infoContent}>
                                                    <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Phone</Text>
                                                    <Text style={[styles.infoValue, { color: theme.text }]}>{item.Mobile}</Text>
                                                </View>
                                            </View>

                                            <View style={[styles.divider, { backgroundColor: theme.border }]} />

                                            <View style={styles.infoRow}>
                                                <View style={[styles.infoIconContainer, { backgroundColor: isDark ? '#0e7490' : '#67e8f9' }]}>
                                                    <Text style={styles.infoIcon}>🪪</Text>
                                                </View>
                                                <View style={styles.infoContent}>
                                                    <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>CNIC</Text>
                                                    <Text style={[styles.infoValue, { color: theme.text }]}>{item.CNIC}</Text>
                                                </View>
                                            </View>

                                            <View style={[styles.divider, { backgroundColor: theme.border }]} />

                                            <View style={styles.infoRow}>
                                                <View style={[styles.infoIconContainer, { backgroundColor: isDark ? '#0891b2' : '#cffafe' }]}>
                                                    <Text style={styles.infoIcon}>📍</Text>
                                                </View>
                                                <View style={styles.infoContent}>
                                                    <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Address</Text>
                                                    <Text style={[styles.infoValue, { color: theme.text }]}>{item.Address}</Text>
                                                </View>
                                            </View>

                                            <View style={[styles.divider, { backgroundColor: theme.border }]} />

                                            <View style={styles.infoRow}>
                                                <View style={[styles.infoIconContainer, { backgroundColor: isDark ? '#06b6d4' : '#e0f2fe' }]}>
                                                    <Text style={styles.infoIcon}>🌍</Text>
                                                </View>
                                                <View style={styles.infoContent}>
                                                    <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Country</Text>
                                                    <Text style={[styles.infoValue, { color: theme.text }]}>{item.Country}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </Pressable>
                            ))}
                        </View>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <View style={styles.loadingContainer}>
                            <View style={[styles.loadingCard, { backgroundColor: theme.card }]}>
                                <ActivityIndicator size="large" color="#14b8a6" />
                                <Text style={[styles.loadingText, { color: theme.text }]}>Searching...</Text>
                                <Text style={[styles.loadingSubtext, { color: theme.textSecondary }]}>
                                    Please wait while we fetch the records
                                </Text>
                            </View>
                        </View>
                    )}

                    {/* Empty State */}
                    {records.length === 0 && !loading && !error && (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyIcon}>🔎</Text>
                            <Text style={[styles.emptyTitle, { color: theme.text }]}>No Records Yet</Text>
                            <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
                                Enter a CNIC or phone number above to search for records
                            </Text>
                        </View>
                    )}

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
    searchCard: {
        borderRadius: 20,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
        marginTop: -15,
    },
    inputContainer: {
        flex: 1,
        borderWidth: 1.5,
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 44,
        justifyContent: 'center'
    },
    input: {
        fontSize: 12,
        fontWeight: '500',
        height: '100%',
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fef2f2',
        padding: 8,
        borderRadius: 8,
    },
    errorIcon: {
        fontSize: 12,
        marginRight: 6,
    },
    errorText: {
        color: '#dc2626',
        fontSize: 12,
        fontWeight: '600',
        flex: 1,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        height: 44,
        width: 44,
        shadowColor: '#14b8a6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    resultsSection: {
        marginTop: 16,
    },
    resultsSectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    resultsIcon: {
        fontSize: 15,
        marginRight: 6,
    },
    resultsTitle: {
        fontSize: 15,
        fontWeight: '700',
    },
    copyAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ecfeff',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#5eead4',
    },
    copyAllText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#14b8a6',
    },
    resultCard: {
        borderRadius: 14,
        overflow: 'hidden',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    cardHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recordBadge: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    recordBadgeText: {
        color: '#ffffff',
        fontSize: 11,
        fontWeight: '800',
    },
    cardHeaderTitle: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '700',
    },
    copyButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    copyIcon: {
        fontSize: 12,
    },
    cardBody: {
        padding: 12,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
    },
    infoIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    infoIcon: {
        fontSize: 12,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 10,
        fontWeight: '600',
        marginBottom: 1,
        textTransform: 'uppercase',
        letterSpacing: 0.3,
    },
    infoValue: {
        fontSize: 12,
        fontWeight: '600',
        lineHeight: 17,
    },
    divider: {
        height: 1,
        marginLeft: 42,
    },
    loadingContainer: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    loadingCard: {
        borderRadius: 20,
        padding: 32,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
        width: '85%',
    },
    loadingText: {
        fontSize: 15,
        fontWeight: '700',
        marginTop: 16,
        marginBottom: 4,
    },
    loadingSubtext: {
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 18,
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 15,
        fontWeight: '800',
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 40,
    },
});

export default Server02Screen;
