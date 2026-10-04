export type ScreenId =
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'home'
  | 'categories'
  | 'plp'
  | 'search'
  | 'pdp'
  | 'wishlist'
  | 'bag'
  | 'checkout'
  | 'order-confirmed'
  | 'live-tracking'
  | 'my-orders'
  | 'account'
  | 'offers'
  | 'notifications'
  | 'about'
  | 'support'
  | 'returns'
  | 'wholesale-order'
  | 'travel-stock';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  ratingCount: number;
  image: string;
  galleryImages: string[];
  inStock: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  metal: string;
  plating: string;
  stone: string;
  weight: string;
  description: string;
  certifications: string[];
  wholesalePrice?: number;
  sku?: string;
}

export interface TravelStockItem {
  id: string;
  productId: string;
  productName: string;
  category: string;
  image: string;
  sku: string;
  wholesaleRate: number;
  retailMrp: number;
  carriedQty: number;
  soldQty: number;
  unit: 'pairs' | 'sets' | 'pieces';
  boxNumber?: string;
}

export interface WholesaleOrderItem {
  productId: string;
  productName: string;
  sku: string;
  image: string;
  wholesaleRate: number;
  quantity: number;
  total: number;
  fulfilledFromTravelStock: boolean;
}

export interface WholesaleOrder {
  id: string;
  orderNumber: string;
  retailerName: string;
  storeName: string;
  city: string;
  market: string;
  phone: string;
  gstin?: string;
  salesmanName: string;
  date: string;
  items: WholesaleOrderItem[];
  subtotal: number;
  taxGst: number;
  totalAmount: number;
  paymentTerms: string;
  notes?: string;
  status: 'Booked' | 'Dispatched from Factory' | 'Delivered Spot' | 'Payment Pending';
}

export interface RetailerClientProfile {
  id: string;
  storeName: string;
  ownerName: string;
  phone: string;
  email?: string;
  city: string;
  market: string;
  address?: string;
  gstin?: string;
  preferredPaymentTerms: string;
  creditLimit: number;
  outstandingBalance: number;
  lifetimeVolume: number;
  totalOrdersCount: number;
  lastOrderDate?: string;
  lastOrderAmount?: number;
  lastOrderNotes?: string;
  visitNotes: { date: string; note: string }[];
  tags: string[];
}

export interface SalesmanTour {
  salesmanName: string;
  salesmanCode: string;
  tourTitle: string;
  currentCity: string;
  startDate: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  hindiName?: string;
  image: string;
  startingPrice: number;
  itemCount: number;
}

export interface Coupon {
  code: string;
  title: string;
  discountText: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrder: number;
  expiresOn: string;
  terms: string[];
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  totalAmount: number;
  items: {
    product: Product;
    quantity: number;
    price: number;
  }[];
  trackingNumber: string;
  courier: string;
  estimatedDelivery: string;
  shippingAddress: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'order' | 'price-drop' | 'restock' | 'reward';
  isRead: boolean;
}
