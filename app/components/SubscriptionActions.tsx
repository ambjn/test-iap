import { Button, StyleSheet, Text, View } from 'react-native';
import { PurchasesOffering } from 'react-native-purchases';

interface SubscriptionActionsProps {
  isProUser: boolean;
  currentOffering: PurchasesOffering | null;
  onPresentPaywall: () => void;
  onPresentCustomerCenter: () => void;
  onRestorePurchases: () => void;
}

export function SubscriptionActions({
  isProUser,
  currentOffering,
  onPresentPaywall,
  onPresentCustomerCenter,
  onRestorePurchases,
}: SubscriptionActionsProps) {
  if (isProUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>
          Welcome to test-iap Pro!
        </Text>
        <Button
          title="Manage Subscription"
          onPress={onPresentCustomerCenter}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Unlock Premium Features
      </Text>

      {currentOffering && (
        <View style={styles.offeringInfo}>
          <Text style={styles.offeringTitle}>
            Available Plans:
          </Text>
          {currentOffering.availablePackages.map((pkg) => (
            <Text key={pkg.identifier} style={styles.packageText}>
              \u2022 {pkg.product.title} - {pkg.product.priceString}
            </Text>
          ))}
        </View>
      )}

      <Button
        title="View Subscription Options"
        onPress={onPresentPaywall}
      />
      <View style={styles.spacer} />
      <Button
        title="Restore Purchases"
        onPress={onRestorePurchases}
        color="#888"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 300,
  },
  welcomeText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#4CAF50',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '500',
  },
  offeringInfo: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  offeringTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  packageText: {
    fontSize: 13,
    marginBottom: 5,
    color: '#333',
  },
  spacer: {
    height: 10,
  },
});
