import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { supabase } from '../lib/supabase';
import { useAuth } from '../providers/auth-provider';
import { Redirect, useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ionicons } from '@expo/vector-icons';

const emailSchema = zod.object({
  email: zod.string().email('Please enter a valid email'),
  password: zod.string().min(6, 'Password must be at least 6 characters'),
});

export default function Auth() {
  const { session } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'mail' | 'mobile'>('mail');
  const [isRegistering, setIsRegistering] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loadingMobile, setLoadingMobile] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<zod.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
  });

  if (session) return <Redirect href="/" />;

  const isValidIndianMobile = (num: string) => /^\d{10}$/.test(num);
  const isValidOtp = /^\d{6}$/.test(otp.trim());

  // Email handlers
  const onEmailLogin = async (data: zod.infer<typeof emailSchema>) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        alert(error.message);
        return;
      }
      alert('Logged in successfully');
      router.replace('/');
    } catch {
      alert('Unexpected error');
    }
  };

  const onEmailRegister = async (data: zod.infer<typeof emailSchema>) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      if (error) {
        alert(error.message);
        return;
      }
      alert('Registration successful! Check your email for confirmation.');
    } catch {
      alert('Unexpected error');
    }
  };

  // Mobile OTP handlers
  const sendOtp = async () => {
    const trimmedPhone = phoneNumber.trim();
    if (!isValidIndianMobile(trimmedPhone)) {
      alert('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setLoadingMobile(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: `+91${trimmedPhone}`,
      });
      if (error) {
        alert(error.message);
        return;
      }
      alert('OTP sent to your phone');
      setOtpSent(true);
      setShowOtpModal(true);
    } finally {
      setLoadingMobile(false);
    }
  };

  const verifyOtp = async () => {
    const trimmedPhone = phoneNumber.trim();
    if (!isValidIndianMobile(trimmedPhone)) {
      alert('Invalid mobile number');
      return;
    }
    if (!otp.trim()) {
      alert('Please enter the OTP');
      return;
    }
    setLoadingMobile(true);
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.verifyOtp({
        phone: `+91${trimmedPhone}`,
        token: otp.trim(),
        type: 'sms',
      });
      if (error) {
        alert(error.message);
        return;
      }
      if (session) {
        alert('Logged in successfully');
        setShowOtpModal(false);
        setOtp('');
        setPhoneNumber('');
        router.replace('/');
      }
    } finally {
      setLoadingMobile(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <Image
            source={require('../../assets/logo/nfapplogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Heading */}
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setActiveTab('mail');
                setIsRegistering(false);
              }}
              style={[
                styles.tabButton,
                activeTab === 'mail' ? styles.tabActive : styles.tabInactive,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'mail' ? styles.tabTextActive : styles.tabTextInactive,
                ]}
              >
                Email
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setActiveTab('mobile');
                setIsRegistering(false);
              }}
              style={[
                styles.tabButton,
                activeTab === 'mobile' ? styles.tabActive : styles.tabInactive,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'mobile' ? styles.tabTextActive : styles.tabTextInactive,
                ]}
              >
                Mobile
              </Text>
            </TouchableOpacity>
          </View>

          {/* Email Login/Register Form */}
          {activeTab === 'mail' ? (
            <View style={styles.form}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="Email address"
                    placeholderTextColor="#B0B0B0"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    style={[styles.input, errors.email && styles.inputError]}
                    onChangeText={onChange}
                    value={value}
                    editable={!isSubmitting}
                  />
                )}
              />
              {errors.email?.message && typeof errors.email.message === 'string' && (
                <Text style={styles.error}>{errors.email.message}</Text>
              )}

              <View style={[styles.passwordWrapper, errors.password && styles.inputError]}>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor="#B0B0B0"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      style={styles.passwordInput}
                      onChangeText={onChange}
                      value={value}
                      editable={!isSubmitting}
                    />
                  )}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={22}
                    color="#777"
                    style={{ paddingHorizontal: 8 }}
                  />
                </TouchableOpacity>
              </View>
              {errors.password?.message && typeof errors.password.message === 'string' && (
                <Text style={styles.error}>{errors.password.message}</Text>
              )}

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleSubmit(isRegistering ? onEmailRegister : onEmailLogin)}
                disabled={isSubmitting}
                activeOpacity={0.9}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loginButtonText}>
                    {isRegistering ? 'Register' : 'Login'}
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setIsRegistering(!isRegistering)}
                style={{ marginTop: 16 }}
              >
                <Text style={styles.toggleText}>
                  {isRegistering
                    ? 'Already have an account? Login'
                    : "Don't have an account? Register"}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.form}>
              <Text style={styles.mobileInfo}>
                Enter your mobile number to get OTP
              </Text>

              <View style={styles.phoneInputWrapper}>
                <View style={styles.countryCodeBox}>
                  <Text style={styles.countryCodeText}>+91</Text>
                </View>
                <TextInput
                  placeholder="10-digit mobile number"
                  placeholderTextColor="#B0B0B0"
                  keyboardType="number-pad"
                  maxLength={10}
                  style={[styles.input, styles.phoneInput]}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  editable={!loadingMobile}
                />
              </View>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={sendOtp}
                disabled={loadingMobile}
                activeOpacity={0.9}
              >
                {loadingMobile ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loginButtonText}>Send OTP</Text>
                )}
              </TouchableOpacity>

              <Modal visible={showOtpModal} transparent animationType="fade">
                <View style={styles.modalBackground}>
                  <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Enter OTP</Text>
                    <TextInput
                      placeholder="6-digit OTP"
                      placeholderTextColor="#B0B0B0"
                      keyboardType="number-pad"
                      maxLength={6}
                      style={styles.input}
                      value={otp}
                      onChangeText={setOtp}
                      editable={!loadingMobile}
                    />

                    <TouchableOpacity
                      style={[styles.loginButton, !isValidOtp && { opacity: 0.6 }]}
                      onPress={verifyOtp}
                      disabled={loadingMobile || !isValidOtp}
                      activeOpacity={0.9}
                    >
                      {loadingMobile ? (
                        <ActivityIndicator color="#fff" />
                      ) : (
                        <Text style={styles.loginButtonText}>Verify OTP</Text>
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ marginTop: 12 }}
                      onPress={() => {
                        setShowOtpModal(false);
                        setOtp('');
                      }}
                    >
                      <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F8FA' },
  wrapper: {
    flex: 1,
  },
  container: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    height: 180,
    width: '100%',
    marginBottom: 32,
    alignSelf: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 24,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    alignSelf: 'center',
    borderRadius: 24,
    backgroundColor: '#E6E9F1',
    padding: 4,
    width: 250,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#A62F2E',
  },
  tabInactive: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontWeight: '600',
    fontSize: 16,
  },
  tabTextActive: {
    color: 'white',
  },
  tabTextInactive: {
    color: '#7A7A7A',
  },
  form: {
    marginTop: 12,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    borderWidth: 1,
    borderColor: '#eee',
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#A62F2E',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginTop: 4,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  toggleText: {
    textAlign: 'center',
    color: '#A62F2E',
    fontWeight: '600',
    fontSize: 14,
  },
  error: {
    color: '#FF6B6B',
    fontWeight: '600',
    marginBottom: 8,
  },
  mobileInfo: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
    textAlign: 'center',
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  countryCodeBox: {
  backgroundColor: 'white',
  borderTopLeftRadius: 16,
  borderBottomLeftRadius: 16,
  justifyContent: 'center',
  paddingHorizontal: 16,
  borderColor: '#eee',
  borderWidth: 1,
  paddingVertical: 14,
  height: 52,      
},

  countryCodeText: {
    fontSize: 16,
    color: '#333',
  },
  phoneInput: {
    borderTopLeftRadius: 1,
    borderBottomLeftRadius: 1,
    flex: 1,
    borderWidth: 1,
    borderColor: '#eee',
    paddingVertical: 14,

  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  cancelText: {
    color: '#777',
    fontWeight: '600',
    fontSize: 16,
  },
});
