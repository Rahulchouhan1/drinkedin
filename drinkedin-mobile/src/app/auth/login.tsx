import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { useAuth } from '@/store/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(true);

  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.dark.background} />
      <View style={styles.circleTopRight} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.backText}>← Back</Text>
              </TouchableOpacity>
            </View>

            {/* Logo */}
            <View style={styles.logoSection}>
              <Image
                source={require('@/assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Sign in to continue your journey</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="your@email.com"
                  placeholderTextColor={Colors.dark.textSecondary}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.input, { flex: 1, borderWidth: 0, paddingHorizontal: 0 }]}
                    placeholder="Enter your password"
                    placeholderTextColor={Colors.dark.textSecondary}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={secureEntry}
                  />
                  <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
                    <Text style={styles.showHideText}>{secureEntry ? 'Show' : 'Hide'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.primaryButton}
                activeOpacity={0.85}
                onPress={handleLogin}
              >
                <Text style={styles.primaryButtonText}>Sign In</Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or continue with</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Login */}
              <View style={styles.socialRow}>
                <TouchableOpacity style={styles.socialButton}>
                  <Text style={styles.socialIcon}>G</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Text style={styles.socialIcon}>🍎</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Don't have an account?{' '}
                <Text
                  style={styles.footerLink}
                  onPress={() => router.push('/auth/register')}
                >
                  Join Now
                </Text>
              </Text>
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  circleTopRight: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(124, 58, 237, 0.10)',
  },
  scrollContent: {
    flexGrow: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
  },
  header: {
    paddingTop: Spacing.three,
    paddingBottom: Spacing.two,
  },
  backText: {
    color: Colors.dark.primaryLight,
    fontSize: 16,
    fontWeight: '600',
  },
  logoSection: {
    alignItems: 'center',
    paddingVertical: Spacing.five,
    gap: Spacing.two,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: Spacing.two,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.dark.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.dark.textSecondary,
  },
  form: {
    gap: Spacing.three,
  },
  inputGroup: {
    gap: Spacing.one,
  },
  label: {
    color: Colors.dark.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: Colors.dark.backgroundElement,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.three,
    paddingVertical: 14,
    color: Colors.dark.text,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.backgroundElement,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.three,
  },
  showHideText: {
    color: Colors.dark.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  forgotText: {
    color: Colors.dark.primary,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
  primaryButton: {
    backgroundColor: Colors.dark.primary,
    paddingVertical: 16,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    marginTop: Spacing.two,
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
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    marginVertical: Spacing.two,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.dark.border,
  },
  dividerText: {
    color: Colors.dark.textSecondary,
    fontSize: 13,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.three,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    backgroundColor: Colors.dark.backgroundElement,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    fontSize: 22,
    color: Colors.dark.text,
    fontWeight: '700',
  },
  footer: {
    paddingVertical: Spacing.four,
    alignItems: 'center',
  },
  footerText: {
    color: Colors.dark.textSecondary,
    fontSize: 15,
  },
  footerLink: {
    color: Colors.dark.primary,
    fontWeight: '700',
  },
});
