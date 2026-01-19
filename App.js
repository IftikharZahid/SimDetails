import React, { useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import Server01 from './screens/Server01';
import Server02 from './screens/Server02';
import Server03 from './screens/Server03';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import DisclaimerModal from './components/DisclaimerModal';
import { ThemeProvider } from './context/ThemeContext';

const Stack = createNativeStackNavigator();

function MainApp({ showDisclaimer, onDisclaimerAccept }) {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
              }}
            >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Server01" component={Server01} />
              <Stack.Screen name="Server02" component={Server02} />
              <Stack.Screen name="Server03" component={Server03} />
              <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
            </Stack.Navigator>
          </NavigationContainer>

          {/* Disclaimer Modal */}
          <DisclaimerModal
            visible={showDisclaimer}
            onAccept={onDisclaimerAccept}
          />

          <StatusBar style="light" />
        </View>
      </ThemeProvider>
    </SafeAreaProvider >
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
    setShowDisclaimer(true);
  }, []);

  const handleDisclaimerAccept = useCallback(() => {
    setShowDisclaimer(false);
  }, []);

  if (showSplash) {
    return (
      <SafeAreaProvider>
        <ThemeProvider>
          <SplashScreen onFinish={handleSplashFinish} />
          <StatusBar style="light" />
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }

  return (
    <MainApp
      showDisclaimer={showDisclaimer}
      onDisclaimerAccept={handleDisclaimerAccept}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
});
