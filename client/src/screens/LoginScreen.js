import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import Toast from '../components/Toast';
import { FARM_LOCATION_PRESETS } from '../mockData';

export default function LoginScreen({ onSelectRole }) {
  const [authMode, setAuthMode] = useState('demo'); // 'demo', 'signin', 'register'
  const [selectedRole, setSelectedRole] = useState('farmer'); // 'farmer' or 'buyer'

  // Input states
  const [emailOrPhone, setEmailOrPhone] = useState('john.miller@highlandfarm.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [businessName, setBusinessName] = useState('Highland Acres Organic Farm');
  const [selectedLocation, setSelectedLocation] = useState(FARM_LOCATION_PRESETS[0]);
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [rememberMe, setRememberMe] = useState(true);

  // Toast State
  const [toastConfig, setToastConfig] = useState({ visible: false, message: '', type: 'success' });

  const triggerToast = (message, type = 'success') => {
    setToastConfig({ visible: true, message, type });
  };

  // Preset Quick Demo Accounts
  const demoAccounts = [
    {
      role: 'farmer',
      name: 'John Miller (Highland Acres)',
      email: 'john.miller@highlandfarm.com',
      location: 'Highland Farm, Sector 12',
      avatar: '👨‍🌾',
      tag: 'ORGANIC FARM PRODUCER'
    },
    {
      role: 'farmer',
      name: 'Maria Santos (Verde Organics)',
      email: 'maria@verdeorganics.org',
      location: 'Verde Valley Plot #4',
      avatar: '👩‍🌾',
      tag: 'COOPERATIVE SELLER'
    },
    {
      role: 'buyer',
      name: 'The Artisanal Kitchen & Bistro',
      email: 'orders@artisanalkitchen.com',
      location: 'Downtown Commercial Hub',
      avatar: '👨‍🍳',
      tag: 'COMMERCIAL KITCHEN'
    },
    {
      role: 'buyer',
      name: 'Green Leaf Supermarket Co-op',
      email: 'procurement@greenleaf.com',
      location: 'Metro Grocery Depot',
      avatar: '🏬',
      tag: 'WHOLESALE BUYER'
    }
  ];

  const handleQuickDemoLogin = (account) => {
    triggerToast(`Authenticated as ${account.name}`, 'success');
    setTimeout(() => {
      onSelectRole({
        role: account.role,
        name: account.name,
      });
    }, 400);
  };

  const handleFormSubmit = () => {
    if (!businessName.trim() && authMode === 'register') {
      triggerToast('Please enter your farm or business name', 'warning');
      return;
    }

    const displayName = businessName || (selectedRole === 'farmer' ? 'Highland Acres Organic Farm' : 'The Artisanal Kitchen');
    triggerToast(`Welcome back, ${displayName}!`, 'success');

    setTimeout(() => {
      onSelectRole({
        role: selectedRole,
        name: displayName,
      });
    }, 400);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Toast Notification */}
      <Toast
        visible={toastConfig.visible}
        message={toastConfig.message}
        type={toastConfig.type}
        onClose={() => setToastConfig(prev => ({ ...prev, visible: false }))}
      />

      {/* Hero Header Banner */}
      <View style={styles.heroSection}>
        <View style={styles.heroLogoWrapper}>
          <Text style={styles.heroLogoIcon}>🌾</Text>
        </View>
        <Text style={styles.heroTitle}>Agri<Text style={styles.greenText}>Grid</Text></Text>
        <Text style={styles.heroSub}>Hyperlocal B2B Surplus Produce Exchange Portal</Text>
      </View>

      {/* Auth Navigation Segmented Tabs */}
      <View style={styles.authTabRow}>
        <TouchableOpacity
          style={[styles.authTab, authMode === 'demo' && styles.authTabActive]}
          onPress={() => setAuthMode('demo')}
          activeOpacity={0.8}
        >
          <Text style={[styles.authTabText, authMode === 'demo' && styles.authTabTextActive]}>
            ⚡ Quick Demo Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.authTab, authMode === 'signin' && styles.authTabActive]}
          onPress={() => setAuthMode('signin')}
          activeOpacity={0.8}
        >
          <Text style={[styles.authTabText, authMode === 'signin' && styles.authTabTextActive]}>
            🔑 Sign In
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.authTab, authMode === 'register' && styles.authTabActive]}
          onPress={() => setAuthMode('register')}
          activeOpacity={0.8}
        >
          <Text style={[styles.authTabText, authMode === 'register' && styles.authTabTextActive]}>
            📝 Register
          </Text>
        </TouchableOpacity>
      </View>

      {/* Card Body */}
      {authMode === 'demo' ? (
        /* MODE 1: 21st.dev Style Quick Demo Profile Selector */
        <View style={styles.card}>
          <Text style={styles.cardHeaderTitle}>SELECT TEST PROFILE FOR INSTANT ACCESS</Text>
          <Text style={styles.cardHeaderSub}>
            Click any profile card below for 1-click authentication into the marketplace.
          </Text>

          <View style={styles.demoGrid}>
            {demoAccounts.map((acc, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.demoCard,
                  acc.role === 'farmer' ? styles.demoCardFarmer : styles.demoCardBuyer
                ]}
                onPress={() => handleQuickDemoLogin(acc)}
                activeOpacity={0.85}
              >
                <View style={styles.demoAvatarCircle}>
                  <Text style={styles.demoAvatarIcon}>{acc.avatar}</Text>
                </View>

                <View style={styles.demoInfo}>
                  <View style={styles.demoRoleTagRow}>
                    <Text
                      style={[
                        styles.demoTagText,
                        acc.role === 'farmer' ? styles.tagFarmer : styles.tagBuyer
                      ]}
                    >
                      {acc.tag}
                    </Text>
                  </View>
                  <Text style={styles.demoName}>{acc.name}</Text>
                  <Text style={styles.demoLoc}>📍 {acc.location}</Text>
                </View>

                <View style={styles.arrowBadge}>
                  <Text style={styles.arrowIcon}>→</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        /* MODE 2 & 3: Sign In or Register Form */
        <View style={styles.card}>
          {/* Role Picker (Farmer vs Buyer) */}
          <Text style={styles.fieldLabel}>SELECT YOUR ACCOUNT PORTAL ROLE</Text>
          <View style={styles.rolePickerRow}>
            <TouchableOpacity
              style={[
                styles.roleChoiceBtn,
                selectedRole === 'farmer' && styles.roleChoiceFarmerActive
              ]}
              onPress={() => setSelectedRole('farmer')}
              activeOpacity={0.8}
            >
              <Text style={styles.roleChoiceIcon}>🚜</Text>
              <Text
                style={[
                  styles.roleChoiceText,
                  selectedRole === 'farmer' && styles.roleChoiceTextActive
                ]}
              >
                Farmer (Seller)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleChoiceBtn,
                selectedRole === 'buyer' && styles.roleChoiceBuyerActive
              ]}
              onPress={() => setSelectedRole('buyer')}
              activeOpacity={0.8}
            >
              <Text style={styles.roleChoiceIcon}>👨‍🍳</Text>
              <Text
                style={[
                  styles.roleChoiceText,
                  selectedRole === 'buyer' && styles.roleChoiceTextActive
                ]}
              >
                Enterprise (Buyer)
              </Text>
            </TouchableOpacity>
          </View>

          {/* Business / Farm Name Field (Register Mode) */}
          {authMode === 'register' && (
            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>
                {selectedRole === 'farmer' ? 'FARM / PRODUCER NAME' : 'RESTAURANT / BUSINESS NAME'}
              </Text>
              <TextInput
                style={styles.textInput}
                value={businessName}
                onChangeText={setBusinessName}
                placeholder={selectedRole === 'farmer' ? 'e.g. Green Valley Organic Farm' : 'e.g. Artisan Bistro'}
                placeholderTextColor="#94A3B8"
              />
            </View>
          )}

          {/* Email / Phone Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.fieldLabel}>EMAIL ADDRESS OR MOBILE NUMBER</Text>
            <TextInput
              style={styles.textInput}
              value={emailOrPhone}
              onChangeText={setEmailOrPhone}
              keyboardType="email-address"
              placeholder="e.g. farmer@agrigrid.com"
              placeholderTextColor="#94A3B8"
            />
          </View>

          {/* Phone Field (Register Mode) */}
          {authMode === 'register' && (
            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>DIRECT CONTACT PHONE</Text>
              <TextInput
                style={styles.textInput}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholder="+1 (555) 000-0000"
                placeholderTextColor="#94A3B8"
              />
            </View>
          )}

          {/* Location Selector (Register Mode) */}
          {authMode === 'register' && (
            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>GPS REGION LOCATION</Text>
              <View style={styles.locGrid}>
                {FARM_LOCATION_PRESETS.map((loc) => (
                  <TouchableOpacity
                    key={loc.label}
                    style={[
                      styles.locPill,
                      selectedLocation.label === loc.label && styles.locPillActive
                    ]}
                    onPress={() => setSelectedLocation(loc)}
                  >
                    <Text
                      style={[
                        styles.locPillText,
                        selectedLocation.label === loc.label && styles.locPillTextActive
                      ]}
                    >
                      📍 {loc.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Password Field */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.fieldLabel}>PASSWORD</Text>
              {authMode === 'signin' && (
                <TouchableOpacity onPress={() => triggerToast('Password reset link sent to email', 'success')}>
                  <Text style={styles.forgotText}>Forgot?</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.passWrapper}>
              <TextInput
                style={[styles.textInput, { flex: 1 }]}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholder="Enter account password"
                placeholderTextColor="#94A3B8"
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeText}>{showPassword ? '👁️' : '🙈'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Remember Me Checkbox */}
          <TouchableOpacity
            style={styles.rememberRow}
            onPress={() => setRememberMe(!rememberMe)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
              {rememberMe && <Text style={styles.checkIcon}>✓</Text>}
            </View>
            <Text style={styles.rememberText}>Keep me signed in on this device</Text>
          </TouchableOpacity>

          {/* Submit CTA Button */}
          <TouchableOpacity style={styles.submitBtn} onPress={handleFormSubmit} activeOpacity={0.85}>
            <Text style={styles.submitBtnText}>
              {authMode === 'signin' ? 'Sign In to Account →' : 'Complete Registration & Launch →'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Footer Info */}
      <Text style={styles.footerNote}>
        🌱 AgriGrid B2B Marketplace • Local Database Connected
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 24,
    maxWidth: 560,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heroLogoWrapper: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#10B981',
    marginBottom: 10,
    boxShadow: '0 8px 20px rgba(16, 185, 129, 0.2)',
  },
  heroLogoIcon: {
    fontSize: 32,
  },
  heroTitle: {
    color: '#0F172A',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  greenText: {
    color: '#059669',
  },
  heroSub: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  authTabRow: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    padding: 4,
    borderRadius: 16,
    marginBottom: 20,
  },
  authTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
  },
  authTabActive: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
  },
  authTabText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '700',
  },
  authTabTextActive: {
    color: '#059669',
    fontWeight: '900',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.08)',
    elevation: 4,
  },
  cardHeaderTitle: {
    color: '#334155',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
    textAlign: 'center',
  },
  cardHeaderSub: {
    color: '#64748B',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  demoGrid: {
    gap: 12,
  },
  demoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1.5,
    backgroundColor: '#F8FAFC',
  },
  demoCardFarmer: {
    borderColor: '#A7F3D0',
    backgroundColor: '#ECFDF5',
  },
  demoCardBuyer: {
    borderColor: '#FDE68A',
    backgroundColor: '#FFFBEB',
  },
  demoAvatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
  },
  demoAvatarIcon: {
    fontSize: 22,
  },
  demoInfo: {
    flex: 1,
  },
  demoRoleTagRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  demoTagText: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  tagFarmer: {
    color: '#047857',
  },
  tagBuyer: {
    color: '#D97706',
  },
  demoName: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '800',
  },
  demoLoc: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 1,
  },
  arrowBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  arrowIcon: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '800',
  },
  fieldLabel: {
    color: '#334155',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  rolePickerRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  roleChoiceBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
  },
  roleChoiceFarmerActive: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  roleChoiceBuyerActive: {
    borderColor: '#F59E0B',
    backgroundColor: '#FFFBEB',
  },
  roleChoiceIcon: {
    fontSize: 16,
  },
  roleChoiceText: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '700',
  },
  roleChoiceTextActive: {
    color: '#0F172A',
    fontWeight: '800',
  },
  inputGroup: {
    marginBottom: 14,
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    color: '#0F172A',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  forgotText: {
    color: '#059669',
    fontSize: 11,
    fontWeight: '700',
  },
  passWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeBtn: {
    position: 'absolute',
    right: 12,
    padding: 6,
  },
  eyeText: {
    fontSize: 16,
  },
  locGrid: {
    gap: 8,
  },
  locPill: {
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  locPillActive: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  locPillText: {
    color: '#64748B',
    fontSize: 12,
  },
  locPillTextActive: {
    color: '#047857',
    fontWeight: '800',
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#94A3B8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  checkIcon: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  rememberText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
  },
  submitBtn: {
    backgroundColor: '#059669',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 6,
    boxShadow: '0 4px 14px rgba(5, 150, 105, 0.35)',
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  footerNote: {
    color: '#94A3B8',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
  },
});
