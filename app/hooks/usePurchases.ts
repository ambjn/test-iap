import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { CustomerInfo } from 'react-native-purchases';
import { PAYWALL_RESULT } from 'react-native-purchases-ui';
import { PurchaseService } from '../services/purchaseService';
import { PurchaseState } from '../types/purchases';

export function usePurchases() {
  const [state, setState] = useState<PurchaseState>({
    customerInfo: null,
    isProUser: false,
    currentOffering: null,
    isLoading: true,
  });

  useEffect(() => {
    initializePurchases();
  }, []);

  const initializePurchases = async () => {
    try {
      await PurchaseService.initialize();

      PurchaseService.addCustomerInfoUpdateListener((info) => {
        updateCustomerInfo(info);
      });

      const info = await PurchaseService.getCustomerInfo();
      console.log("amber", info);
      updateCustomerInfo(info);

      const offering = await PurchaseService.getCurrentOffering();
      if (offering) {
        setState(prev => ({ ...prev, currentOffering: offering }));
      }

      setState(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      console.error('Error initializing purchases:', error);
      Alert.alert('Error', 'Failed to initialize purchases');
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const updateCustomerInfo = (info: CustomerInfo) => {
    const hasProEntitlement = PurchaseService.hasProEntitlement(info);
    setState(prev => ({
      ...prev,
      customerInfo: info,
      isProUser: hasProEntitlement,
    }));
  };

  const presentPaywall = async () => {
    try {
      const paywallResult = await PurchaseService.presentPaywall();

      switch (paywallResult) {
        case PAYWALL_RESULT.PURCHASED:
          Alert.alert('Success', 'Welcome to Pro Meow!');
        case PAYWALL_RESULT.RESTORED:
          Alert.alert('Success', 'Welcome to Pro!');
          break;
        case PAYWALL_RESULT.CANCELLED:
          Alert.alert('Paywall cancelled');
          break;
        case PAYWALL_RESULT.ERROR:
          Alert.alert('Error', 'Something went wrong');
          break;
      }
    } catch (error) {
      console.error('Error presenting paywall:', error);
      Alert.alert('Error', 'Failed to show paywall');
    }
  };

  const presentCustomerCenter = async () => {
    try {
      await PurchaseService.presentCustomerCenter();
    } catch (error) {
      console.error('Error presenting customer center:', error);
      Alert.alert('Error', 'Failed to show customer center');
    }
  };

  const restorePurchases = async () => {
    try {
      const info = await PurchaseService.restorePurchases();
      updateCustomerInfo(info);
      Alert.alert('Restored', 'Your purchases have been restored');
    } catch (error) {
      console.error('Error restoring purchases:', error);
      Alert.alert('Error', 'Failed to restore purchases');
    }
  };

  return {
    ...state,
    presentPaywall,
    presentCustomerCenter,
    restorePurchases,
  };
}
