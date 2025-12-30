import { StyleSheet, Text, View } from "react-native";
import { usePurchases } from './hooks/usePurchases';
import { SubscriptionStatus } from './components/SubscriptionStatus';
import { SubscriptionActions } from './components/SubscriptionActions';

export default function Index() {
  const {
    customerInfo,
    isProUser,
    currentOffering,
    isLoading,
    presentPaywall,
    presentCustomerCenter,
    restorePurchases,
  } = usePurchases();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>test-iap App</Text>

      <SubscriptionStatus
        isProUser={isProUser}
        customerInfo={customerInfo}
      />

      <SubscriptionActions
        isProUser={isProUser}
        currentOffering={currentOffering}
        onPresentPaywall={presentPaywall}
        onPresentCustomerCenter={presentCustomerCenter}
        onRestorePurchases={restorePurchases}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
