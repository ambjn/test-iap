import { StyleSheet, Text, View } from 'react-native';
import { CustomerInfo } from 'react-native-purchases';

interface SubscriptionStatusProps {
  isProUser: boolean;
  customerInfo: CustomerInfo | null;
}

export function SubscriptionStatus({ isProUser, customerInfo }: SubscriptionStatusProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>
        Status: {isProUser ? '\u2705 Pro User' : '\u274C Free User'}
      </Text>
      {customerInfo && (
        <Text style={styles.infoText}>
          User ID: {customerInfo.originalAppUserId}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    width: '100%',
    maxWidth: 300,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
  },
});
