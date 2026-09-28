import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import MapMockView from '../components/MapMockView';
import ListingModal from '../components/ListingModal';
import Toast from '../components/Toast';
import {
  MOCK_BUYER_LOCATION,
  calculateDistance,
  calculateDiscount
} from '../mockData';

export default function BuyerScreen({
  listings = [],
  onClaimListing,
  isLoading,
  onRefresh,
  activeBuyerName
}) {
  const [selectedEnterprise, setSelectedEnterprise] = useState(activeBuyerName || 'The Artisanal Kitchen & Bistro');
  const [claimingId, setClaimingId] = useState(null);
  const [claimedItemModal, setClaimedItemModal] = useState(null);
  const [selectedMapItem, setSelectedMapItem] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [refreshing, setRefreshing] = useState(false);

  // Toast State
  const [toastConfig, setToastConfig] = useState({ visible: false, message: '', type: 'success' });

  const triggerToast = (message, type = 'success') => {
    setToastConfig({ visible: true, message, type });
  };

  const handlePullToRefresh = async () => {
    setRefreshing(true);
    try {
      await onRefresh();
      triggerToast('Marketplace feed updated!', 'success');
    } catch (e) {
      console.error(e);
    } finally {
      setRefreshing(false);
    }
  };

  const availableListings = listings.filter(item => item.status === 'Available');
  const categories = ['All', 'Vegetables', 'Root Crops', 'Greens', 'Herbs'];

  const filteredItems = availableListings.filter(item => {
    if (filterCategory === 'All') return true;
    if (filterCategory === 'Vegetables') return item.produceType.toLowerCase().includes('tomato') || item.produceType.toLowerCase().includes('pepper');
    if (filterCategory === 'Root Crops') return item.produceType.toLowerCase().includes('carrot') || item.produceType.toLowerCase().includes('potato');
    if (filterCategory === 'Greens') return item.produceType.toLowerCase().includes('spinach') || item.produceType.toLowerCase().includes('lettuce');
    if (filterCategory === 'Herbs') return item.produceType.toLowerCase().includes('basil');
    return true;
  });

  const handleClaim = async (item) => {
    setClaimingId(item._id);
    try {
      const updatedItem = await onClaimListing(item._id, selectedEnterprise);
      setClaimedItemModal(updatedItem || item);
      triggerToast(`Order Claimed! Passcode generated for ${item.produceType}`, 'success');
    } catch (err) {
      console.error('Failed to claim:', err);
      triggerToast('Could not claim item. It may have already been claimed.', 'warning');
    } finally {
      setClaimingId(null);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handlePullToRefresh}
          tintColor="#059669"
          colors={['#059669', '#D97706']}
        />
      }
    >
      {/* Toast Notification */}
      <Toast
        visible={toastConfig.visible}
        message={toastConfig.message}
        type={toastConfig.type}
        onClose={() => setToastConfig(prev => ({ ...prev, visible: false }))}
      />

      {/* 21st.dev Style Buyer Enterprise Banner */}
      <View style={styles.buyerBanner}>
        <View style={styles.buyerInfoCol}>
          <Text style={styles.buyerSubTag}>COMMERCIAL KITCHEN (BUYER HUB)</Text>
          <Text style={styles.buyerNameText}>👨‍🍳 {selectedEnterprise}</Text>
          <Text style={styles.buyerLocText}>📍 {MOCK_BUYER_LOCATION.name}</Text>
        </View>

        <TouchableOpacity
          style={styles.switchAccountBtn}
          onPress={() => {
            const names = [
              'The Artisanal Kitchen & Bistro',
              'Green Leaf Community Kitchen',
              'Urban Fresh Supermarket'
            ];
            const nextIndex = (names.indexOf(selectedEnterprise) + 1) % names.length;
            setSelectedEnterprise(names[nextIndex]);
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.switchBtnText}>Switch Account ⇄</Text>
        </TouchableOpacity>
      </View>

      {/* Geolocation Mock Radar Component */}
      <MapMockView
        listings={availableListings}
        selectedItem={selectedMapItem}
        onSelectItem={(item) => setSelectedMapItem(item)}
      />

      {/* Filter Category Tabs */}
      <View style={styles.filterSection}>
        <Text style={styles.feedHeaderTitle}>
          🛒 Nearby Farm Surplus Feed ({filteredItems.length})
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.catChip,
                filterCategory === cat && styles.catChipActive
              ]}
              onPress={() => setFilterCategory(cat)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.catChipText,
                  filterCategory === cat && styles.catChipTextActive
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 21st.dev Marketplace Product Cards Feed */}
      {isLoading ? (
        <View style={styles.loaderBox}>
          <ActivityIndicator size="large" color="#059669" />
          <Text style={styles.loaderText}>Scanning nearby farm inventory...</Text>
        </View>
      ) : filteredItems.length === 0 ? (
        <View style={styles.emptyFeedCard}>
          <Text style={styles.emptyIcon}>🌱</Text>
          <Text style={styles.emptyTitle}>No Surplus Batches Available Right Now</Text>
          <Text style={styles.emptySub}>
            All surplus produce batches have been claimed by local kitchens or pull down to refresh!
          </Text>
          <TouchableOpacity style={styles.refreshBtn} onPress={onRefresh}>
            <Text style={styles.refreshBtnText}>🔄 Refresh Marketplace</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.feedGrid}>
          {filteredItems.map((item) => {
            const distance = calculateDistance(
              MOCK_BUYER_LOCATION.latitude,
              MOCK_BUYER_LOCATION.longitude,
              item.location?.latitude,
              item.location?.longitude
            );
            const discountBadge = calculateDiscount(item.price, item.produceType);
            const totalCost = ((item.quantity || 0) * (item.price || 0)).toFixed(2);
            const isClaiming = claimingId === item._id;

            return (
              <View key={item._id || item.createdAt} style={styles.productCard}>
                {/* Hero Produce Banner Image */}
                <View style={styles.imageContainer}>
                  <Image
                    source={{
                      uri: item.imageUrl || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'
                    }}
                    style={styles.cardImg}
                    resizeMode="cover"
                  />
                  {/* Status Badge */}
                  <View style={styles.statusBadgeGreen}>
                    <Text style={styles.statusBadgeTextGreen}>Available</Text>
                  </View>

                  {/* Flame Discount Badge */}
                  <View style={styles.discountPill}>
                    <Text style={styles.discountPillText}>🔥 {discountBadge}</Text>
                  </View>

                  {/* Distance Indicator */}
                  <View style={styles.distPill}>
                    <Text style={styles.distPillText}>📍 {distance}</Text>
                  </View>
                </View>

                {/* Card Body Content */}
                <View style={styles.cardBody}>
                  <View style={styles.cardTopRow}>
                    <View style={styles.titleCol}>
                      <Text style={styles.produceName}>{item.produceType}</Text>
                      <Text style={styles.farmerName}>From {item.farmerName}</Text>
                    </View>

                    <View style={styles.priceCol}>
                      <Text style={styles.unitRate}>${item.price.toFixed(2)}/kg</Text>
                      <Text style={styles.totalRate}>Batch Total: ${totalCost}</Text>
                    </View>
                  </View>

                  {/* Quantity Banner */}
                  <View style={styles.boldQtyBanner}>
                    <Text style={styles.boldQtyText}>
                      📦 <Text style={styles.boldQtyHighlight}>{item.quantity} kg</Text> @ ${item.price.toFixed(2)}/kg
                    </Text>
                  </View>

                  <Text style={styles.descText} numberOfLines={2}>
                    {item.description}
                  </Text>

                  {/* 21st.dev Style High-Impact Claim CTA Button */}
                  <TouchableOpacity
                    style={[styles.claimCTA, isClaiming && styles.claimDisabled]}
                    onPress={() => handleClaim(item)}
                    disabled={isClaiming}
                    activeOpacity={0.85}
                  >
                    {isClaiming ? (
                      <ActivityIndicator color="#FFFFFF" size="small" />
                    ) : (
                      <Text style={styles.claimCTAText}>
                        🛒 Claim & Reserve Batch (${totalCost}) →
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      )}

      {/* Confirmation Bottom Sheet Modal */}
      <ListingModal
        visible={!!claimedItemModal}
        claimedItem={claimedItemModal}
        onClose={() => setClaimedItemModal(null)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 20,
    maxWidth: 640,
    width: '100%',
    alignSelf: 'center',
  },
  buyerBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
  },
  buyerInfoCol: {
    flex: 1,
  },
  buyerSubTag: {
    color: '#D97706',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  buyerNameText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '900',
    marginVertical: 2,
  },
  buyerLocText: {
    color: '#64748B',
    fontSize: 12,
  },
  switchAccountBtn: {
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  switchBtnText: {
    color: '#D97706',
    fontSize: 12,
    fontWeight: '800',
  },
  filterSection: {
    marginBottom: 18,
  },
  feedHeaderTitle: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 12,
  },
  filterBar: {
    flexDirection: 'row',
  },
  catChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  catChipActive: {
    backgroundColor: '#059669',
    borderColor: '#059669',
    boxShadow: '0 2px 8px rgba(5, 150, 105, 0.25)',
  },
  catChipText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
  },
  catChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  loaderBox: {
    padding: 40,
    alignItems: 'center',
  },
  loaderText: {
    color: '#64748B',
    fontSize: 13,
    marginTop: 12,
  },
  emptyFeedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  emptyTitle: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  emptySub: {
    color: '#64748B',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  refreshBtn: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  refreshBtnText: {
    color: '#047857',
    fontWeight: '800',
    fontSize: 13,
  },
  feedGrid: {
    gap: 20,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.08)',
  },
  imageContainer: {
    height: 190,
    position: 'relative',
  },
  cardImg: {
    width: '100%',
    height: '100%',
  },
  statusBadgeGreen: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#059669',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusBadgeTextGreen: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  discountPill: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#D97706',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  discountPillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  distPill: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  distPillText: {
    color: '#0F172A',
    fontSize: 11,
    fontWeight: '800',
  },
  cardBody: {
    padding: 20,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleCol: {
    flex: 1,
  },
  produceName: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '900',
  },
  farmerName: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 2,
  },
  priceCol: {
    alignItems: 'flex-end',
  },
  unitRate: {
    color: '#059669',
    fontSize: 18,
    fontWeight: '900',
  },
  totalRate: {
    color: '#D97706',
    fontSize: 12,
    fontWeight: '800',
  },
  boldQtyBanner: {
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 14,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  boldQtyText: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '600',
  },
  boldQtyHighlight: {
    color: '#059669',
    fontWeight: '900',
  },
  descText: {
    color: '#64748B',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  claimCTA: {
    backgroundColor: '#D97706',
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)',
  },
  claimDisabled: {
    opacity: 0.7,
  },
  claimCTAText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
});
