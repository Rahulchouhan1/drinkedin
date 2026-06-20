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

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'PROFESSIONAL' | 'BUSINESS_OWNER'>('PROFESSIONAL');

  const { register } = useAuth();

  const handleRegister = async () => {
    try {
      await register({ firstName, lastName, email, password, role });
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.dark.background} />
      <View style={styles.circleTopRight} />
      <View style={styles.circleBottomLeft} />

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

            {/* Title */}
            <View style={styles.titleSection}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Join the community that celebrates life</Text>
            </View>

            {/* Role Selector */}
            <View style={styles.roleSelector}>
              <TouchableOpacity
                style={[styles.roleOption, role === 'PROFESSIONAL' && styles.roleOptionActive]}
                onPress={() => setRole('PROFESSIONAL')}
              >
                <Text style={styles.roleEmoji}>🎉</Text>
                <Text style={[styles.roleText, role === 'PROFESSIONAL' && styles.roleTextActive]}>
                  Social
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.roleOption, role === 'BUSINESS_OWNER' && styles.roleOptionActive]}
                onPress={() => setRole('BUSINESS_OWNER')}
              >
                <Text style={styles.roleEmoji}>🏪</Text>
                <Text style={[styles.roleText, role === 'BUSINESS_OWNER' && styles.roleTextActive]}>
                  Business
                </Text>
              </TouchableOpacity>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <View style={styles.nameRow}>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>First Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="John"
                    placeholderTextColor={Colors.dark.textSecondary}
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>Last Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Doe"
                    placeholderTextColor={Colors.dark.textSecondary}
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>
              </View>

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
                <TextInput
                  style={styles.input}
                  placeholder="Min 8 characters"
                  placeholderTextColor={Colors.dark.textSecondary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity
                style={styles.primaryButton}
                activeOpacity={0.85}
                onPress={handleRegister}
              >
                <Text style={styles.primaryButtonText}>Create Account</Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Already have an account?{' '}
                <Text
                  style={styles.footerLink}
                  onPress={() => router.push('/auth/login')}
                >
                  Sign In
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
  circleBottomLeft: {
    position: 'absolute',
    bottom: -40,
    left: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(236, 72, 153, 0.08)',
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
  titleSection: {
    paddingVertical: Spacing.four,
    gap: Spacing.one,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.dark.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.dark.textSecondary,
  },
  roleSelector: {
    flexDirection: 'row',
    gap: Spacing.three,
    marginBottom: Spacing.four,
  },
  roleOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingVertical: 14,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.dark.border,
    backgroundColor: Colors.dark.backgroundElement,
  },
  roleOptionActive: {
    borderColor: Colors.dark.primary,
    backgroundColor: 'rgba(124, 58, 237, 0.12)',
  },
  roleEmoji: {
    fontSize: 20,
  },
  roleText: {
    color: Colors.dark.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
  roleTextActive: {
    color: Colors.dark.primary,
  },
  form: {
    gap: Spacing.three,
  },
  nameRow: {
    flexDirection: 'row',
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
