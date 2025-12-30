import { CustomerInfo, PurchasesOffering } from 'react-native-purchases';

export interface PurchaseState {
  customerInfo: CustomerInfo | null;
  isProUser: boolean;
  currentOffering: PurchasesOffering | null;
  isLoading: boolean;
}
