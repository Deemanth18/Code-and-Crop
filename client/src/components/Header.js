import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Header({ activeUser, onSwitchRole, onRefresh, onSeed, currentTab, onTabChange }) {
  const isFarmer = activeUser?.role === 'farmer';

  return (
    <View style={styles.headerContainer}>
      {/* Top Brand & Actions Bar */}
      <View style={styles.topRow}>
        <View style={styles.brandContainer}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoIcon}>🌾</Text>
          </View>
          <View>
            <View style={styles.titleRow}>
              <Text style={styles.appName}>Agri<Text style={styles.appNameHighlight}>Grid</Text></Text>
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>B2B LIVE</Text>
              </View>
            </View>
            <Text style={styles.tagline}>Surplus Produce Exchange • 21st Dev Design</Text>
          </View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.iconBtn} onPress={onRefresh} activeOpacity={0.75}>
            <Text style={styles.iconBtnText}>🔄 Refresh</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconBtn, styles.seedBtn]} onPress={onSeed} activeOpacity={0.75}>
            <Text style={styles.seedBtnText}>✨ Seed Demo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Active User Account & Segmented Navigation Control */}
      {activeUser && (
        <View style={styles.navSection}>
          <View style={styles.userProfileRow}>
            <View style={styles.userLeft}>
              <View style={styles.avatarWrap}>
                <Text style={styles.userRoleIcon}>{isFarmer ? '🚜' : '👨‍🍳'}</Text>
              </View>
              <View>
                <Text style={styles.userName}>{activeUser.name}</Text>
                <Text style={styles.userRoleTag}>
                  {isFarmer ? 'ORGANIC FARMER (SELLER)' : 'COMMERCIAL KITCHEN (BUYER)'}
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.switchRoleBtn} onPress={onSwitchRole} activeOpacity={0.8}>
              <Text style={styles.switchRoleText}>Switch Role ⇄</Text>
            </TouchableOpacity>
          </View>

          {/* 21st.dev Style Segmented Tab Navigation Control */}
          <View style={styles.segmentedControl}>
            <TouchableOpacity
              style={[
                styles.segmentTab,
                currentTab === 'farmer' && styles.segmentTabActive
              ]}
              onPress={() => onTabChange('farmer')}
              activeOpacity={0.85}
            >
              <Text style={[
                styles.segmentText,
                currentTab === 'farmer' && styles.segmentTextActive
              ]}>
                🚜 Farmer Dashboard
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.segmentTab,
                currentTab === 'buyer' && styles.segmentTabActive
              ]}
              onPress={() => onTabChange('buyer')}
              activeOpacity={0.85}
            >
              <Text style={[
                styles.segmentText,
                currentTab === 'buyer' && styles.segmentTextActive
              ]}>
                🛒 Buyer Marketplace
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingTop: 16,
    paddingHorizontal: 22,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoBadge: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#10B981',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)',
  },
  logoIcon: {
    fontSize: 22,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  appName: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  appNameHighlight: {
    color: '#059669',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 5,
  },
  liveText: {
    color: '#047857',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  tagline: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconBtnText: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '700',
  },
  seedBtn: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  seedBtnText: {
    color: '#D97706',
    fontSize: 12,
    fontWeight: '800',
  },
  navSection: {
    marginTop: 8,
  },
  userProfileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  userLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  userRoleIcon: {
    fontSize: 18,
  },
  userName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  userRoleTag: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
    letterSpacing: 0.5,
  },
  switchRoleBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  switchRoleText: {
    color: '#475569',
    fontSize: 11,
    fontWeight: '700',
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    padding: 4,
    borderRadius: 16,
  },
  segmentTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
  },
  segmentTabActive: {
    backgroundColor: '#059669',
    boxShadow: '0 4px 12px rgba(5, 150, 105, 0.35)',
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  segmentTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
});
