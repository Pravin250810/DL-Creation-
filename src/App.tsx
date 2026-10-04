import React, { useState } from 'react';
import { ScreenId, Product, CartItem, Order, TravelStockItem, WholesaleOrder, RetailerClientProfile } from './types.ts';
import { MOCK_PRODUCTS, MOCK_ORDERS, INITIAL_TRAVEL_STOCK, INITIAL_WHOLESALE_ORDERS, INITIAL_RETAILER_CLIENTS } from './data/mockData.ts';

// Layout & Frame Components
import { MobileFrame } from './components/MobileFrame.tsx';
import { TopAppBar } from './components/TopAppBar.tsx';
import { BottomNav } from './components/BottomNav.tsx';
import { ScreenNavigatorDrawer } from './components/ScreenNavigatorDrawer.tsx';
import { Toast } from './components/Toast.tsx';

// Flow A: Onboarding & Authentication
import { SplashScreen } from './screens/SplashScreen.tsx';
import { OnboardingCarousel } from './screens/OnboardingCarousel.tsx';
import { LoginScreen } from './screens/LoginScreen.tsx';

// Flow B: Discovery, Catalog & Search
import { HomeScreen } from './screens/HomeScreen.tsx';
import { CategoriesScreen } from './screens/CategoriesScreen.tsx';
import { ProductListingScreen } from './screens/ProductListingScreen.tsx';
import { SearchScreen } from './screens/SearchScreen.tsx';

// Flow C: Product Details & Purchasing
import { ProductDetailScreen } from './screens/ProductDetailScreen.tsx';
import { WishlistScreen } from './screens/WishlistScreen.tsx';
import { ShoppingBagScreen } from './screens/ShoppingBagScreen.tsx';
import { CheckoutScreen } from './screens/CheckoutScreen.tsx';

// Flow D: Post-Purchase, Account & Support
import { OrderConfirmedScreen } from './screens/OrderConfirmedScreen.tsx';
import { LiveTrackingScreen } from './screens/LiveTrackingScreen.tsx';
import { MyOrdersScreen } from './screens/MyOrdersScreen.tsx';
import { AccountScreen } from './screens/AccountScreen.tsx';
import { OffersScreen } from './screens/OffersScreen.tsx';
import { NotificationsScreen } from './screens/NotificationsScreen.tsx';
import { AboutScreen } from './screens/AboutScreen.tsx';
import { SupportScreen } from './screens/SupportScreen.tsx';
import { ReturnsScreen } from './screens/ReturnsScreen.tsx';

// Flow E: B2B Wholesale & Travelling Salesman
import { WholesaleOrderScreen } from './screens/WholesaleOrderScreen.tsx';
import { TravelStockScreen } from './screens/TravelStockScreen.tsx';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart State (initialize with 1 Kundan Jhumka for realistic preview)
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: MOCK_PRODUCTS[0],
      quantity: 1,
    },
  ]);

  // Wishlist State (initialize with 3 favorites)
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    'dl-001',
    'dl-003',
    'dl-004',
    'dl-005',
  ]);

  // Selected Product for PDP
  const [selectedProduct, setSelectedProduct] = useState<Product>(MOCK_PRODUCTS[0]);

  // Applied Coupon (e.g. SPARKLE15 by default)
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('SPARKLE15');

  // User Authentication State
  const [userPhone, setUserPhone] = useState<string>('+91 98201 94820');

  // Active Placed Order for Confirmation
  const [lastPlacedOrder, setLastPlacedOrder] = useState<{
    orderNumber: string;
    totalAmount: number;
  }>({
    orderNumber: 'DLC-849204',
    totalAmount: 1528,
  });

  // Flow E: Travelling Salesman & Wholesale States
  const [travelStock, setTravelStock] = useState<TravelStockItem[]>(INITIAL_TRAVEL_STOCK);
  const [wholesaleOrders, setWholesaleOrders] = useState<WholesaleOrder[]>(INITIAL_WHOLESALE_ORDERS);
  const [retailerClients, setRetailerClients] = useState<RetailerClientProfile[]>(INITIAL_RETAILER_CLIENTS);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  // CRM Client Handlers
  const handleSaveRetailerClient = (client: RetailerClientProfile) => {
    setRetailerClients((prev) => {
      const idx = prev.findIndex((c) => c.id === client.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = client;
        return copy;
      }
      return [client, ...prev];
    });
    showToast(`Saved '${client.storeName}' in CRM Client Profiles`);
  };

  const handleAddClientVisitNote = (clientId: string, noteText: string) => {
    setRetailerClients((prev) =>
      prev.map((c) => {
        if (c.id === clientId) {
          return {
            ...c,
            visitNotes: [{ date: 'Today', note: noteText }, ...c.visitNotes],
          };
        }
        return c;
      })
    );
    showToast('Visit log saved to Retailer CRM');
  };

  // Wholesale & Travel Stock Handlers
  const handleSaveWholesaleOrder = (newOrder: WholesaleOrder) => {
    setWholesaleOrders((prev) => [newOrder, ...prev]);

    // Automatically deduct items marked fulfilled from travel stock
    newOrder.items.forEach((item) => {
      if (item.fulfilledFromTravelStock) {
        setTravelStock((prevStock) =>
          prevStock.map((ts) =>
            ts.productId === item.productId
              ? { ...ts, soldQty: ts.soldQty + item.quantity }
              : ts
          )
        );
      }
    });

    showToast(`Wholesale Order #${newOrder.orderNumber} booked for ${newOrder.storeName}!`);
  };

  const handleUpdateStock = (itemId: string, newCarried: number, newSold: number) => {
    setTravelStock((prev) =>
      prev.map((ts) =>
        ts.id === itemId ? { ...ts, carriedQty: newCarried, soldQty: newSold } : ts
      )
    );
    showToast('Travel kit inventory count updated');
  };

  const handleQuickSpotSale = (itemId: string, qtySold: number) => {
    setTravelStock((prev) =>
      prev.map((ts) =>
        ts.id === itemId ? { ...ts, soldQty: ts.soldQty + qtySold } : ts
      )
    );
    const item = travelStock.find((ts) => ts.id === itemId);
    showToast(`Spot delivery of ${qtySold} pcs recorded for ${item?.productName || 'jewel'}`);
  };

  const handleRequestRefill = (itemId: string, qty: number) => {
    setTravelStock((prev) =>
      prev.map((ts) =>
        ts.id === itemId ? { ...ts, carriedQty: ts.carriedQty + qty } : ts
      )
    );
    const item = travelStock.find((ts) => ts.id === itemId);
    showToast(`Air refill of +${qty} pcs dispatched for ${item?.productName || 'jewel'}`);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added '${product.name}' to Atelier Bag`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Jewel removed from bag');
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    if (wishlistIds.includes(product.id)) {
      setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      showToast(`Removed from Wishlist`);
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      showToast(`Saved '${product.name}' to Wishlist`);
    }
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
    showToast('Jewel removed from Wishlist');
  };

  const handleMoveToBag = (product: Product) => {
    handleAddToCart(product);
    handleRemoveFromWishlist(product.id);
  };

  const handleMoveAllToBag = (products: Product[]) => {
    products.forEach((p) => {
      setCart((prev) => {
        if (prev.some((item) => item.product.id === p.id)) return prev;
        return [...prev, { product: p, quantity: 1 }];
      });
    });
    showToast(`Moved ${products.length} jewels to Atelier Bag`);
    setCurrentScreen('bag');
  };

  const handleBuyNow = (product: Product) => {
    handleAddToCart(product);
    setCurrentScreen('checkout');
  };

  const handlePlaceOrder = (details: {
    paymentMethod: string;
    deliverySpeed: string;
    totalAmount: number;
  }) => {
    const generatedOrderNumber = `DLC-${Math.floor(100000 + Math.random() * 900000)}`;
    setLastPlacedOrder({
      orderNumber: generatedOrderNumber,
      totalAmount: details.totalAmount,
    });
    showToast(`Order #${generatedOrderNumber} placed successfully!`);
  };

  const handleApplyCoupon = (code: string) => {
    setAppliedCoupon(code);
    showToast(`Privilege coupon '${code}' applied!`);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed');
  };

  const totalCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  // Screens that should NOT show the top navigation bar
  const hideTopBarScreens: ScreenId[] = ['splash'];

  return (
    <MobileFrame
      currentScreen={currentScreen}
      onOpenDirectory={() => setIsDrawerOpen(true)}
      onQuickNavigate={(screen) => setCurrentScreen(screen)}
    >
      {/* Toast Feedback */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Screen Navigator Directory Drawer */}
      <ScreenNavigatorDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentScreen={currentScreen}
        onSelectScreen={(screen) => setCurrentScreen(screen)}
      />

      {/* Top App Bar */}
      {!hideTopBarScreens.includes(currentScreen) && (
        <TopAppBar
          currentScreen={currentScreen}
          onNavigate={(s) => setCurrentScreen(s)}
          cartCount={totalCartCount}
          wishlistCount={wishlistIds.length}
          onOpenMenu={() => setIsDrawerOpen(true)}
        />
      )}

      {/* Screen Router */}
      <div className="w-full">
        {/* Flow A: Onboarding & Authentication */}
        {currentScreen === 'splash' && (
          <SplashScreen onNavigate={(s) => setCurrentScreen(s)} />
        )}
        {currentScreen === 'onboarding' && (
          <OnboardingCarousel onNavigate={(s) => setCurrentScreen(s)} />
        )}
        {currentScreen === 'login' && (
          <LoginScreen
            onNavigate={(s) => setCurrentScreen(s)}
            onLoginSuccess={(phone) => {
              setUserPhone(phone);
              showToast(`Welcome back to DL Atelier, ${phone}`);
            }}
          />
        )}

        {/* Flow B: Discovery, Catalog & Search */}
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={(s) => setCurrentScreen(s)}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onAddToCart={handleAddToCart}
          />
        )}
        {currentScreen === 'categories' && (
          <CategoriesScreen onNavigate={(s) => setCurrentScreen(s)} />
        )}
        {currentScreen === 'plp' && (
          <ProductListingScreen
            onNavigate={(s) => setCurrentScreen(s)}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onAddToCart={handleAddToCart}
          />
        )}
        {currentScreen === 'search' && (
          <SearchScreen
            onNavigate={(s) => setCurrentScreen(s)}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* Flow C: Product Details & Purchasing */}
        {currentScreen === 'pdp' && (
          <ProductDetailScreen
            product={selectedProduct}
            onNavigate={(s) => setCurrentScreen(s)}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            onBuyNow={handleBuyNow}
          />
        )}
        {currentScreen === 'wishlist' && (
          <WishlistScreen
            onNavigate={(s) => setCurrentScreen(s)}
            wishlistIds={wishlistIds}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onMoveToBag={handleMoveToBag}
            onMoveAllToBag={handleMoveAllToBag}
          />
        )}
        {currentScreen === 'bag' && (
          <ShoppingBagScreen
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveFromCart}
            onNavigate={(s) => setCurrentScreen(s)}
            appliedCoupon={appliedCoupon}
            onApplyCoupon={handleApplyCoupon}
            onRemoveCoupon={handleRemoveCoupon}
          />
        )}
        {currentScreen === 'checkout' && (
          <CheckoutScreen
            cart={cart}
            appliedCoupon={appliedCoupon}
            onNavigate={(s) => setCurrentScreen(s)}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {/* Flow D: Post-Purchase, Account & Support */}
        {currentScreen === 'order-confirmed' && (
          <OrderConfirmedScreen
            onNavigate={(s) => setCurrentScreen(s)}
            orderNumber={lastPlacedOrder.orderNumber}
            totalAmount={lastPlacedOrder.totalAmount}
          />
        )}
        {currentScreen === 'live-tracking' && (
          <LiveTrackingScreen onNavigate={(s) => setCurrentScreen(s)} />
        )}
        {currentScreen === 'my-orders' && (
          <MyOrdersScreen
            onNavigate={(s) => setCurrentScreen(s)}
            onTrackOrder={(order) => setCurrentScreen('live-tracking')}
          />
        )}
        {currentScreen === 'account' && (
          <AccountScreen
            onNavigate={(s) => setCurrentScreen(s)}
            userPhone={userPhone}
            wishlistCount={wishlistIds.length}
            ordersCount={MOCK_ORDERS.length}
          />
        )}
        {currentScreen === 'offers' && (
          <OffersScreen
            onNavigate={(s) => setCurrentScreen(s)}
            onApplyCoupon={handleApplyCoupon}
          />
        )}
        {currentScreen === 'notifications' && (
          <NotificationsScreen onNavigate={(s) => setCurrentScreen(s)} />
        )}
        {currentScreen === 'about' && (
          <AboutScreen onNavigate={(s) => setCurrentScreen(s)} />
        )}
        {currentScreen === 'support' && (
          <SupportScreen onNavigate={(s) => setCurrentScreen(s)} />
        )}
        {currentScreen === 'returns' && (
          <ReturnsScreen onNavigate={(s) => setCurrentScreen(s)} />
        )}

        {/* Flow E: B2B Wholesale & Travelling Salesman */}
        {currentScreen === 'wholesale-order' && (
          <WholesaleOrderScreen
            onNavigate={(s) => setCurrentScreen(s)}
            travelStock={travelStock}
            wholesaleOrders={wholesaleOrders}
            onSaveWholesaleOrder={handleSaveWholesaleOrder}
            retailerClients={retailerClients}
            onSaveRetailerClient={handleSaveRetailerClient}
            onAddClientVisitNote={handleAddClientVisitNote}
          />
        )}
        {currentScreen === 'travel-stock' && (
          <TravelStockScreen
            onNavigate={(s) => setCurrentScreen(s)}
            travelStock={travelStock}
            onUpdateStock={handleUpdateStock}
            onQuickSpotSale={handleQuickSpotSale}
            onRequestRefill={handleRequestRefill}
          />
        )}
      </div>

      {/* Docked 5-Tab Bottom Navigation */}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={(s) => setCurrentScreen(s)}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
      />
    </MobileFrame>
  );
}
