import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

export default function ListingModal({ visible, claimedItem, onClose }) {
  if (!claimedItem) return null;

  const totalCost = (claimedItem.quantity * claimedItem.price).toFixed(2);
  const pickupCode = `AG-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* Top Sheet Drag Handle & Header */}
          <View style={styles.dragHandle} />
          <View style={styles.modalHeader}>
            <View style={styles.successBadge}>
              <Text style={styles.successBadgeText}>✅ ORDER CLAIMED & RESERVED</Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>
            <Text style={styles.modalTitle}>Pickup Reserved Successfully!</Text>
            <Text style={styles.modalSub}>
              You have reserved <Text style={styles.highlight}>{claimedItem.produceType}</Text> directly from <Text style={styles.highlight}>{claimedItem.farmerName}</Text>.
            </Text>

            {/* 21st.dev Digital Passcode Card */}
            <View style={styles.codeCard}>
              <Text style={styles.codeHeader}>DIGITAL PICKUP PASSCODE</Text>
              <Text style={styles.codeVal}>{pickupCode}</Text>
              <Text style={styles.codeSubNote}>Present passcode to producer upon pickup arrival</Text>
            </View>

            {/* Structured Invoice Breakdown */}
            <View style={styles.invoiceCard}>
              <View style={styles.invoiceLine}>
                <Text style={styles.invLabel}>Produce Batch:</Text>
                <Text style={styles.invValue}>{claimedItem.produceType}</Text>
              </View>

              <View style={styles.invoiceLine}>
                <Text style={styles.invLabel}>Quantity Reserved:</Text>
                <Text style={styles.invValue}>{claimedItem.quantity} kg</Text>
              </View>

              <View style={styles.invoiceLine}>
                <Text style={styles.invLabel}>Discount Wholesale Rate:</Text>
                <Text style={styles.invValue}>${claimedItem.price.toFixed(2)}/kg</Text>
              </View>

              <View style={styles.dividerLine} />

              <View style={styles.invoiceLine}>
                <Text style={styles.totalLabel}>Total Due at Pickup:</Text>
                <Text style={styles.totalVal}>${totalCost}</Text>
              </View>
            </View>

            {/* Pickup Location Box */}
            <View style={styles.locationCard}>
              <Text style={styles.locTitle}>📍 Pickup Location & Window</Text>
              <Text style={styles.locAddress}>
                {claimedItem.location?.address || 'Highland Regional Farm Hub, Gate 3'}
              </Text>
              <Text style={styles.locNote}>⏱️ Pickup Window: Today within 3 hours</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.doneBtn} onPress={onClose} activeOpacity={0.85}>
            <Text style={styles.doneBtnText}>Return to Marketplace Feed →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    width: '100%',
    maxWidth: 540,
    padding: 24,
    boxShadow: '0 -10px 30px rgba(15, 23, 42, 0.2)',
    elevation: 10,
  },
  dragHandle: {
    width: 44,
    height: 5,
    backgroundColor: '#CBD5E1',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 14,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  successBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  successBadgeText: {
    color: '#047857',
    fontWeight: '800',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  closeBtn: {
    padding: 4,
  },
  closeText: {
    color: '#64748B',
    fontSize: 20,
    fontWeight: '700',
  },
  modalBody: {
    marginBottom: 20,
  },
  modalTitle: {
    color: '#0F172A',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 6,
  },
  modalSub: {
    color: '#64748B',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  highlight: {
    color: '#059669',
    fontWeight: '800',
  },
  codeCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
    boxShadow: '0 4px 12px rgba(217, 119, 6, 0.08)',
  },
  codeHeader: {
    color: '#B45309',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  codeVal: {
    color: '#D97706',
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 4,
  },
  codeSubNote: {
    color: '#92400E',
    fontSize: 11,
    fontWeight: '500',
    marginTop: 4,
  },
  invoiceCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  invoiceLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  invLabel: {
    color: '#64748B',
    fontSize: 12,
  },
  invValue: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '700',
  },
  dividerLine: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 8,
  },
  totalLabel: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '800',
  },
  totalVal: {
    color: '#059669',
    fontSize: 18,
    fontWeight: '900',
  },
  locationCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  locTitle: {
    color: '#047857',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
  },
  locAddress: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  locNote: {
    color: '#047857',
    fontSize: 11,
  },
  doneBtn: {
    backgroundColor: '#059669',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    boxShadow: '0 4px 14px rgba(5, 150, 105, 0.3)',
  },
  doneBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
});
