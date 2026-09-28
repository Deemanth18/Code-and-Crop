import React, { useEffect } from 'react';
import { Text, StyleSheet, Animated } from 'react-native';

export default function Toast({ visible, message, type = 'success', onClose }) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start(() => {
          if (onClose) onClose();
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  const isSuccess = type === 'success';

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        isSuccess ? styles.toastSuccess : styles.toastWarning,
        { opacity: fadeAnim }
      ]}
    >
      <Text style={styles.toastIcon}>{isSuccess ? '🌱' : '⚠️'}</Text>
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 16,
    boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.25)',
    elevation: 8,
    borderWidth: 1,
  },
  toastSuccess: {
    backgroundColor: '#059669',
    borderColor: '#34D399',
  },
  toastWarning: {
    backgroundColor: '#D97706',
    borderColor: '#FBBF24',
  },
  toastIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    flex: 1,
  },
});
