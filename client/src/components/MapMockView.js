import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MOCK_BUYER_LOCATION, calculateDistance } from '../mockData';

export default function MapMockView({ listings = [], selectedItem, onSelectItem }) {
  return (
    <View style={styles.radarCard}>
      {/* 21st.dev Style Header Bar */}
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <Text style={styles.radarIcon}>📡</Text>
          <Text style={styles.headerTitle}>Agri-Radar Geolocation Matcher</Text>
        </View>
        <View style={styles.gpsBadge}>
          <View style={styles.gpsPulseDot} />
          <Text style={styles.gpsText}>GPS 5km Radius Active</Text>
        </View>
      </View>

      {/* Radar Canvas Area */}
      <View style={styles.canvasArea}>
        {/* Radar Concentric Circles */}
        <View style={styles.outerRadarRing} />
        <View style={styles.middleRadarRing} />
        <View style={styles.innerRadarRing} />
        <View style={styles.axisH} />
        <View style={styles.axisV} />

        {/* Central Buyer Location Marker */}
        <View style={styles.buyerCenterWrapper}>
          <View style={styles.buyerPulseRing} />
          <View style={styles.buyerCorePin}>
            <Text style={styles.buyerPinIcon}>🏬</Text>
          </View>
          <View style={styles.buyerTagBox}>
            <Text style={styles.buyerTagText}>Your Kitchen (Hub)</Text>
          </View>
        </View>

        {/* Farm Markers Positioned on Radar */}
        {listings.map((item, index) => {
          const isSelected = selectedItem && selectedItem._id === item._id;

          const angle = (index * (360 / Math.max(listings.length, 1)) + 30) * (Math.PI / 180);
          const distanceOffset = 65 + (index % 3) * 22;
          const leftPos = 145 + Math.cos(angle) * distanceOffset;
          const topPos = 110 + Math.sin(angle) * distanceOffset;

          const distStr = calculateDistance(
            MOCK_BUYER_LOCATION.latitude,
            MOCK_BUYER_LOCATION.longitude,
            item.location?.latitude,
            item.location?.longitude
          );

          return (
            <TouchableOpacity
              key={item._id || index}
              style={[
                styles.farmMarkerWrapper,
                { left: leftPos, top: topPos },
                isSelected && styles.farmMarkerSelected
              ]}
              onPress={() => onSelectItem && onSelectItem(item)}
              activeOpacity={0.8}
            >
              <View style={[styles.farmNodeCircle, isSelected && styles.farmNodeActive]}>
                <Text style={styles.nodeIcon}>🌾</Text>
              </View>

              <View style={[styles.nodeTooltip, isSelected && styles.nodeTooltipActive]}>
                <Text style={styles.nodeTitle}>{item.produceType}</Text>
                <Text style={styles.nodeDist}>{distStr}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Footer Info Summary */}
      <View style={styles.cardFooter}>
        <Text style={styles.footerText}>
          🌱 <Text style={styles.highlightText}>{listings.length} Active Farm Batches</Text> ready within 15-min delivery/pickup radius
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  radarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 20,
    boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radarIcon: {
    fontSize: 16,
  },
  headerTitle: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '800',
  },
  gpsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    gap: 6,
  },
  gpsPulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  gpsText: {
    color: '#047857',
    fontSize: 10,
    fontWeight: '800',
  },
  canvasArea: {
    height: 240,
    backgroundColor: '#F1F5F9',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  outerRadarRing: {
    position: 'absolute',
    width: 210,
    height: 210,
    borderRadius: 105,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
  },
  middleRadarRing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: '#94A3B8',
  },
  innerRadarRing: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#64748B',
  },
  axisH: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: '#CBD5E1',
  },
  axisV: {
    position: 'absolute',
    height: '100%',
    width: 1,
    backgroundColor: '#CBD5E1',
  },
  buyerCenterWrapper: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10,
  },
  buyerPulseRing: {
    position: 'absolute',
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(245, 158, 11, 0.25)',
    top: -8,
  },
  buyerCorePin: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    boxShadow: '0 2px 8px rgba(245, 158, 11, 0.4)',
  },
  buyerPinIcon: {
    fontSize: 14,
  },
  buyerTagBox: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#F59E0B',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
  },
  buyerTagText: {
    color: '#D97706',
    fontSize: 9,
    fontWeight: '800',
  },
  farmMarkerWrapper: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 5,
  },
  farmMarkerSelected: {
    zIndex: 20,
  },
  farmNodeCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    boxShadow: '0 2px 6px rgba(5, 150, 105, 0.3)',
  },
  farmNodeActive: {
    backgroundColor: '#D97706',
    borderColor: '#FFFFFF',
    transform: [{ scale: 1.25 }],
  },
  nodeIcon: {
    fontSize: 12,
  },
  nodeTooltip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#059669',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 2,
    alignItems: 'center',
  },
  nodeTooltipActive: {
    borderColor: '#D97706',
    backgroundColor: '#FFFBEB',
  },
  nodeTitle: {
    color: '#0F172A',
    fontSize: 9,
    fontWeight: '800',
  },
  nodeDist: {
    color: '#059669',
    fontSize: 8,
    fontWeight: '700',
  },
  cardFooter: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  footerText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
  },
  highlightText: {
    color: '#059669',
    fontWeight: '800',
  },
});
