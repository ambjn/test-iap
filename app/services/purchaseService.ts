import { Platform } from 'react-native';
import Purchases, { CustomerInfo, LOG_LEVEL, PurchasesOffering } from 'react-native-purchases';
import RevenueCatUI, { PAYWALL_RESULT } from 'react-native-purchases-ui';
import { REVENUECAT_CONFIG } from '../config/revenueCat';

export class PurchaseService {
  static async initialize(): Promise<void> {
    Purchases.setLogLevel(LOG_LEVEL.DEBUG);

    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      await Purchases.configure({ apiKey: REVENUECAT_CONFIG.API_KEY });
    }
  }

  static async getCustomerInfo(): Promise<CustomerInfo> {
    return await Purchases.getCustomerInfo();
  }

  static async getCurrentOffering(): Promise<PurchasesOffering | null> {
    const offerings = await Purchases.getOfferings();
    return offerings.current;
  }

  static async restorePurchases(): Promise<CustomerInfo> {
    return await Purchases.restorePurchases();
  }

  static async presentPaywall(): Promise<PAYWALL_RESULT> {
    return await RevenueCatUI.presentPaywall();
  }

  static async presentCustomerCenter(): Promise<void> {
    await RevenueCatUI.presentCustomerCenter();
  }

  static addCustomerInfoUpdateListener(
    listener: (customerInfo: CustomerInfo) => void
  ): void {
    Purchases.addCustomerInfoUpdateListener(listener);
  }

  static hasProEntitlement(customerInfo: CustomerInfo): boolean {
    return typeof customerInfo.entitlements.active[REVENUECAT_CONFIG.ENTITLEMENT_ID] !== 'undefined';
  }
}
