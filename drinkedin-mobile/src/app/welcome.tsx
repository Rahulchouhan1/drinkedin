import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.dark.background} />

      {/* Background Gradient Overlay */}
      <View style={styles.gradientOverlay} />

      {/* Decorative Circles */}
      <View style={styles.circleTopRight} />
      <View style={styles.circleBottomLeft} />

      <SafeAreaView style={styles.safeArea}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Tagline Section */}
        <View style={styles.taglineSection}>
          <Text style={styles.tagline}>Connect for the</Text>
          <Text style={styles.taglineHighlight}>After-Hours</Text>
          <Text style={styles.subtitle}>
            Discover the best bars, restaurants, and social events.{'\n'}
            Meet people who love to celebrate life.
          </Text>
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={() => router.push('/auth/register')}
          >
            <Text style={styles.primaryButtonText}>Join Now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.85}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.secondaryButtonText}>Sign In</Text>
          </TouchableOpacity>

          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(124, 58, 237, 0.06)',
  },
  circleTopRight: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(124, 58, 237, 0.12)',
  },
  circleBottomLeft: {
    position: 'absolute',
    bottom: -60,
    left: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(236, 72, 153, 0.10)',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.five,
  },
  logoSection: {
    alignItems: 'center',
    paddingTop: height * 0.06,
  },
  logoContainer: {
    width: 180,
    height: 180,
    borderRadius: BorderRadius.xl,
    backgroundColor: 'rgba(167, 139, 250, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.15)',
  },
  logo: {
    width: 140,
    height: 140,
  },
  taglineSection: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  tagline: {
    fontSize: 32,
    fontWeight: '300',
    color: Colors.dark.text,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  taglineHighlight: {
    fontSize: 44,
    fontWeight: '800',
    color: Colors.dark.primary,
    textAlign: 'center',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.two,
    paddingHorizontal: Spacing.four,
  },
  buttonSection: {
    gap: Spacing.three,
    paddingBottom: Spacing.three,
  },
  primaryButton: {
    backgroundColor: Colors.dark.primary,
    paddingVertical: 16,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    borderWidth: 1.5,
    borderColor: Colors.dark.border,
    paddingVertical: 16,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  secondaryButtonText: {
    color: Colors.dark.text,
    fontSize: 17,
    fontWeight: '600',
  },
  termsText: {
    color: Colors.dark.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: Spacing.four,
  },
  termsLink: {
    color: Colors.dark.primaryLight,
    fontWeight: '600',
  },
});
