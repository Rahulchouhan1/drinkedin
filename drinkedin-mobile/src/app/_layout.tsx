import { Stack, router, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from '../store/AuthContext';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

function InitialLayout() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'auth';
    const isWelcome = segments[0] === 'welcome';

    if (!user && !inAuthGroup && !isWelcome) {
      // If not logged in and not on auth or welcome screens, force to login
      router.replace('/auth/login');
    } else if (user && (inAuthGroup || isWelcome)) {
      // If logged in and on auth or welcome screens, force to feed
      router.replace('/feed');
    }
  }, [user, isLoading, segments]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A0A0F' }}>
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0A0A0F' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="feed" />
      <Stack.Screen name="index" options={{ redirect: true }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <InitialLayout />
    </AuthProvider>
  );
}
