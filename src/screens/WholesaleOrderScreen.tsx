import React, { useState } from 'react';
import {
  ScreenId,
  Product,
  TravelStockItem,
  WholesaleOrder,
  WholesaleOrderItem,
  RetailerClientProfile,
} from '../types.ts';
import { MOCK_PRODUCTS } from '../data/mockData.ts';

interface WholesaleOrderScreenProps {
  onNavigate: (screen: ScreenId) => void;
  travelStock: TravelStockItem[];
  wholesaleOrders: WholesaleOrder[];
  onSaveWholesaleOrder: (order: WholesaleOrder) => void;
  retailerClients: RetailerClientProfile[];
  onSaveRetailerClient: (client: RetailerClientProfile) => void;
  onAddClientVisitNote: (clientId: string, note: string) => void;
}

export const WholesaleOrderScreen: React.FC<WholesaleOrderScreenProps> = ({
  onNavigate,
  travelStock,
  wholesaleOrders,
  onSaveWholesaleOrder,
  retailerClients,
  onSaveRetailerClient,
  onAddClientVisitNote,
}) => {
  const [activeTab, setActiveTab] = useState<'new-order' | 'clients' | 'history'>('new-order');

  // Currently Selected Retailer Client ID (defaults to first client)
  const [selectedClientId, setSelectedClientId] = useState<string>('ret-1');

  // Retailer Details Form (Pre-filled from selected client)
  const currentClient = retailerClients.find((c) => c.id === selectedClientId) || retailerClients[0];

  const [storeName, setStoreName] = useState(currentClient ? currentClient.storeName : '');
  const [retailerName, setRetailerName] = useState(currentClient ? currentClient.ownerName : '');
  const [phone, setPhone] = useState(currentClient ? currentClient.phone : '');
  const [city, setCity] = useState(currentClient ? currentClient.city : '');
  const [market, setMarket] = useState(currentClient ? currentClient.market : '');
  const [gstin, setGstin] = useState(currentClient ? currentClient.gstin || '' : '');
  const [paymentTerms, setPaymentTerms] = useState(
    currentClient ? currentClient.preferredPaymentTerms : '50% Advance + Dispatch'
  );
  const [orderNotes, setOrderNotes] = useState('Diwali festive bulk order. Pack with velvet tags.');

  // Sync state when client is selected from CRM
  const handleSelectClient = (client: RetailerClientProfile) => {
    setSelectedClientId(client.id);
    setStoreName(client.storeName);
    setRetailerName(client.ownerName);
    setPhone(client.phone);
    setCity(client.city);
    setMarket(client.market);
    setGstin(client.gstin || '');
    setPaymentTerms(client.preferredPaymentTerms);
    if (client.lastOrderNotes) {
      setOrderNotes(`Repeat: ${client.lastOrderNotes}`);
    }
  };

  // Selected Order Items Matrix: productId -> quantity
  const [orderQuantities, setOrderQuantities] = useState<Record<string, number>>({
    'dl-001': 12, // 12 Kundan Jhumkas
    'dl-003': 6,  // 6 Temple Bangles
    'dl-004': 24, // 24 Demi-Fine Rings
  });

  // Fulfill source: productId -> boolean (true = from travel kit directly, false = factory dispatch)
  const [fulfillFromTravel, setFulfillFromTravel] = useState<Record<string, boolean>>({
    'dl-001': true,
    'dl-003': true,
    'dl-004': false,
  });

  const [orderSuccessModal, setOrderSuccessModal] = useState<WholesaleOrder | null>(null);

  // Search/Filter products in catalog
  const [searchCatalog, setSearchCatalog] = useState('');

  // CRM Search & Filters
  const [crmSearchQuery, setCrmSearchQuery] = useState('');
  const [crmFilterCity, setCrmFilterCity] = useState<string>('All');
  const [newClientModalOpen, setNewClientModalOpen] = useState(false);
  const [activeNoteInputId, setActiveNoteInputId] = useState<string | null>(null);
  const [newVisitNoteText, setNewVisitNoteText] = useState('');

  // New Client Creation Form State
  const [newStore, setNewStore] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCity, setNewCity] = useState('Ahmedabad');
  const [newMarket, setNewMarket] = useState('');
  const [newGst, setNewGst] = useState('');
  const [newTerms, setNewTerms] = useState('50% Advance + Dispatch');
  const [newNotes, setNewNotes] = useState('');

  const filteredCatalog = MOCK_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchCatalog.toLowerCase()) ||
      p.category.toLowerCase().includes(searchCatalog.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(searchCatalog.toLowerCase()))
  );

  const filteredClients = retailerClients.filter((c) => {
    const matchCity = crmFilterCity === 'All' || c.city === crmFilterCity;
    const matchSearch =
      c.storeName.toLowerCase().includes(crmSearchQuery.toLowerCase()) ||
      c.ownerName.toLowerCase().includes(crmSearchQuery.toLowerCase()) ||
      c.phone.includes(crmSearchQuery) ||
      c.market.toLowerCase().includes(crmSearchQuery.toLowerCase());
    return matchCity && matchSearch;
  });

  const handleQtyChange = (productId: string, qty: number) => {
    setOrderQuantities((prev) => {
      const next = { ...prev };
      if (qty <= 0) {
        delete next[productId];
      } else {
        next[productId] = qty;
      }
      return next;
    });
  };

  const handleToggleFulfillSource = (productId: string) => {
    setFulfillFromTravel((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // Calculations
  const lineItems: WholesaleOrderItem[] = Object.entries(orderQuantities).map(
    ([productId, qty]) => {
      const product = MOCK_PRODUCTS.find((p) => p.id === productId)!;
      const rate = product.wholesalePrice || Math.round(product.price * 0.5);
      return {
        productId,
        productName: product.name,
        sku: product.sku || 'DLC-SKU',
        image: product.image,
        wholesaleRate: rate,
        quantity: qty,
        total: rate * qty,
        fulfilledFromTravelStock: !!fulfillFromTravel[productId],
      };
    }
  );

  const subtotal = lineItems.reduce((acc, curr) => acc + curr.total, 0);
  const taxGst = Math.round(subtotal * 0.03); // 3% GST on jewellery
  const grandTotal = subtotal + taxGst;
  const totalUnits = lineItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Retailer Resale Potential
  const estimatedRetailValue = Object.entries(orderQuantities).reduce((acc, [productId, qty]) => {
    const product = MOCK_PRODUCTS.find((p) => p.id === productId);
    return acc + (product ? product.price * qty : 0);
  }, 0);
  const retailerMargin =
    estimatedRetailValue > 0
      ? Math.round(((estimatedRetailValue - grandTotal) / estimatedRetailValue) * 100)
      : 0;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (lineItems.length === 0) {
      alert('Please add at least 1 product to the wholesale order.');
      return;
    }

    const newOrder: WholesaleOrder = {
      id: `wo-${Date.now()}`,
      orderNumber: `WSO-${Math.floor(1000 + Math.random() * 9000)}`,
      storeName,
      retailerName,
      phone,
      city,
      market,
      gstin: gstin.trim() || undefined,
      salesmanName: 'Pravin Bhati',
      date: 'Just now',
      items: lineItems,
      subtotal,
      taxGst,
      totalAmount: grandTotal,
      paymentTerms,
      notes: orderNotes,
      status: lineItems.every((it) => it.fulfilledFromTravelStock)
        ? 'Delivered Spot'
        : 'Booked',
    };

    onSaveWholesaleOrder(newOrder);

    // Update / Save Client in CRM with new order metrics and notes
    if (currentClient) {
      const updatedClient: RetailerClientProfile = {
        ...currentClient,
        storeName,
        ownerName: retailerName,
        phone,
        city,
        market,
        gstin: gstin.trim() || currentClient.gstin,
        preferredPaymentTerms: paymentTerms,
        lifetimeVolume: currentClient.lifetimeVolume + grandTotal,
        totalOrdersCount: currentClient.totalOrdersCount + 1,
        lastOrderDate: 'Today',
        lastOrderAmount: grandTotal,
        lastOrderNotes: orderNotes,
        visitNotes: [
          {
            date: 'Today',
            note: `Booked Order #${newOrder.orderNumber} for ₹${grandTotal.toLocaleString(
              'en-IN'
            )} (${totalUnits} pcs).`,
          },
          ...currentClient.visitNotes,
        ],
      };
      onSaveRetailerClient(updatedClient);
    }

    setOrderSuccessModal(newOrder);
  };

  const handleCreateNewClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStore.trim() || !newPhone.trim()) return;

    const created: RetailerClientProfile = {
      id: `ret-${Date.now()}`,
      storeName: newStore,
      ownerName: newOwner || newStore,
      phone: newPhone,
      city: newCity,
      market: newMarket || 'Main Market',
      gstin: newGst.trim() || undefined,
      preferredPaymentTerms: newTerms,
      creditLimit: 50000,
      outstandingBalance: 0,
      lifetimeVolume: 0,
      totalOrdersCount: 0,
      lastOrderNotes: newNotes,
      visitNotes: [
        {
          date: 'Today',
          note: `New retailer client profile onboarded by salesman Pravin Bhati. ${newNotes}`,
        },
      ],
      tags: ['New Showroom'],
    };

    onSaveRetailerClient(created);
    handleSelectClient(created);
    setNewClientModalOpen(false);
    // Reset inputs
    setNewStore('');
    setNewOwner('');
    setNewPhone('');
    setNewMarket('');
    setNewGst('');
    setNewNotes('');
  };

  const handleAddVisitNote = (clientId: string) => {
    if (newVisitNoteText.trim()) {
      onAddClientVisitNote(clientId, newVisitNoteText.trim());
      setNewVisitNoteText('');
      setActiveNoteInputId(null);
    }
  };

  return (
    <div className="pb-28 px-4 pt-3 bg-[#FEF8F6] text-[#1A1918]">
      {/* Top Salesman Bar */}
      <div className="p-3 bg-[#1A1817] text-white rounded-2xl border border-[#DFC48B]/40 shadow-sm mb-4">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-[#C5A059] text-white flex items-center justify-center font-serif font-bold text-xs">
              SM
            </span>
            <div>
              <strong className="text-stone-100 font-semibold block">
                Pravin Bhati · SM-104
              </strong>
              <span className="text-[10px] text-[#DFC48B]">
                Tour: Gujarat & Rajasthan Circuit
              </span>
            </div>
          </div>
          <button
            onClick={() => onNavigate('travel-stock')}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#DFC48B] text-[11px] font-medium flex items-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">inventory_2</span>
            <span>Kit Stock</span>
          </button>
        </div>
      </div>

      {/* 3 Segmented Tabs: New Order, Client CRM, History */}
      <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-[#E8DED9] mb-4 shadow-2xs">
        <button
          onClick={() => setActiveTab('new-order')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'new-order'
              ? 'bg-[#1A1918] text-white shadow-xs'
              : 'text-[#8C8782] hover:text-[#1A1918]'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">edit_note</span>
          <span>Order Form</span>
        </button>

        <button
          onClick={() => setActiveTab('clients')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'clients'
              ? 'bg-[#1A1918] text-white shadow-xs'
              : 'text-[#8C8782] hover:text-[#1A1918]'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">contacts</span>
          <span>Client CRM ({retailerClients.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'history'
              ? 'bg-[#1A1918] text-white shadow-xs'
              : 'text-[#8C8782] hover:text-[#1A1918]'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">receipt_long</span>
          <span>Orders ({wholesaleOrders.length})</span>
        </button>
      </div>

      {activeTab === 'new-order' && (
        <form onSubmit={handleSubmitOrder} className="space-y-4">
          {/* CRM Quick Client Switcher / Selector Banner */}
          <div className="p-3 bg-[#FEF8F6] border border-[#DFC48B] rounded-2xl shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold text-[#C5A059] uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">person_pin</span>
                <span>Select Retailer Profile</span>
              </span>
              <button
                type="button"
                onClick={() => setNewClientModalOpen(true)}
                className="text-[11px] font-semibold text-[#1A1918] hover:text-[#C5A059] underline flex items-center gap-0.5"
              >
                <span className="material-symbols-outlined text-[13px]">add_circle</span>
                <span>+ Onboard New Store</span>
              </button>
            </div>

            {/* Quick Dropdown of Saved Retailer Clients */}
            <select
              value={selectedClientId}
              onChange={(e) => {
                const found = retailerClients.find((c) => c.id === e.target.value);
                if (found) handleSelectClient(found);
              }}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-white border border-[#E8DED9] text-[#1A1918] outline-hidden focus:border-[#C5A059] cursor-pointer"
            >
              {retailerClients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.storeName} ({client.ownerName} · {client.city})
                </option>
              ))}
            </select>

            {/* Active Client CRM Snapshot Card */}
            {currentClient && (
              <div className="p-2.5 bg-white rounded-xl border border-[#E8DED9] text-xs space-y-1.5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {currentClient.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-semibold bg-[#FEF8F6] text-[#C5A059] border border-[#DFC48B] px-1.5 py-0.5 rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] text-[#8C8782]">
                    Total Orders: <strong>{currentClient.totalOrdersCount}</strong> (₹
                    {currentClient.lifetimeVolume.toLocaleString('en-IN')})
                  </span>
                </div>

                {/* Outstanding balance check */}
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#E8DED9]/60">
                  <span className="text-[#8C8782]">
                    Outstanding Balance:
                    <strong
                      className={`ml-1 font-mono ${
                        currentClient.outstandingBalance > 0
                          ? 'text-amber-800'
                          : 'text-emerald-700'
                      }`}
                    >
                      ₹{currentClient.outstandingBalance.toLocaleString('en-IN')}
                    </strong>
                  </span>
                  <span className="text-[10px] text-[#8C8782]">
                    Credit Limit: ₹{currentClient.creditLimit.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Last Order Notes - Key CRM Highlight! */}
                {currentClient.lastOrderNotes && (
                  <div className="p-2 bg-[#FFFDF8] border-l-2 border-[#C5A059] rounded-r-lg text-[11px] text-[#1A1918]">
                    <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-bold block">
                      📌 Last Order Notes / Retailer Preference:
                    </span>
                    <p className="italic text-[#1A1918] mt-0.5 leading-relaxed">
                      "{currentClient.lastOrderNotes}"
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Section 1: Retailer Profile Details Form */}
          <div className="p-4 bg-white rounded-2xl border border-[#E8DED9] shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#E8DED9]/60 pb-2">
              <span className="text-xs font-bold text-[#1A1918] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#C5A059] text-[18px]">
                  storefront
                </span>
                <span>Retailer Order Destination</span>
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Verified Retailer
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-[#8C8782] mb-1">
                  Store / Showroom Name *
                </label>
                <input
                  type="text"
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="e.g. Shreeji Imitation & Gold House"
                  className="w-full px-3 py-2 rounded-xl border border-[#E8DED9] bg-[#FEF8F6] font-medium outline-hidden focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-[#8C8782] mb-1">
                    Proprietor / Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    value={retailerName}
                    onChange={(e) => setRetailerName(e.target.value)}
                    placeholder="e.g. Ghanshyam Bhai"
                    className="w-full px-3 py-2 rounded-xl border border-[#E8DED9] bg-[#FEF8F6] font-medium outline-hidden focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8C8782] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98..."
                    className="w-full px-3 py-2 rounded-xl border border-[#E8DED9] bg-[#FEF8F6] font-medium outline-hidden focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-[#8C8782] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Ahmedabad"
                    className="w-full px-3 py-2 rounded-xl border border-[#E8DED9] bg-[#FEF8F6] font-medium outline-hidden focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8C8782] mb-1">
                    Jewellery Market / Area
                  </label>
                  <input
                    type="text"
                    value={market}
                    onChange={(e) => setMarket(e.target.value)}
                    placeholder="e.g. Ratanpole / Johari Bazaar"
                    className="w-full px-3 py-2 rounded-xl border border-[#E8DED9] bg-[#FEF8F6] font-medium outline-hidden focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-[#8C8782] mb-1">
                    GSTIN (Optional)
                  </label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value.toUpperCase())}
                    placeholder="24AABCS..."
                    className="w-full px-3 py-2 rounded-xl border border-[#E8DED9] bg-[#FEF8F6] font-mono font-medium outline-hidden focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8C8782] mb-1">
                    Payment Terms *
                  </label>
                  <select
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8DED9] bg-[#FEF8F6] font-medium outline-hidden focus:border-[#C5A059] cursor-pointer"
                  >
                    <option value="Immediate UPI/Cash">Immediate UPI/Cash</option>
                    <option value="50% Advance + Dispatch">50% Advance + Dispatch</option>
                    <option value="15 Days Credit">15 Days Credit</option>
                    <option value="30 Days Credit">30 Days Credit</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Product Catalogue & B2B Quantity Matrix */}
          <div className="p-4 bg-white rounded-2xl border border-[#E8DED9] shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#E8DED9]/60 pb-2">
              <div>
                <span className="text-xs font-bold text-[#1A1918] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#C5A059] text-[18px]">
                    diamond
                  </span>
                  <span>Select Wholesale Products & Quantities</span>
                </span>
                <span className="text-[10px] text-[#8C8782]">
                  Bulk wholesale rates (minimum 6 pcs recommended per design)
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-[#C5A059] tabular-nums">
                {totalUnits} pcs chosen
              </span>
            </div>

            {/* Quick Catalog Search */}
            <div className="relative">
              <input
                type="text"
                value={searchCatalog}
                onChange={(e) => setSearchCatalog(e.target.value)}
                placeholder="Filter catalog by name, category, or SKU..."
                className="w-full px-3 py-1.5 pl-8 text-xs rounded-xl border border-[#E8DED9] bg-[#FEF8F6] outline-hidden focus:border-[#C5A059]"
              />
              <span className="material-symbols-outlined text-[#8C8782] text-[16px] absolute left-2.5 top-2">
                search
              </span>
            </div>

            {/* Product Matrix Cards */}
            <div className="space-y-3">
              {filteredCatalog.map((product) => {
                const currentQty = orderQuantities[product.id] || 0;
                const wholesalePrice =
                  product.wholesalePrice || Math.round(product.price * 0.5);
                const kitStock = travelStock.find((ts) => ts.productId === product.id);
                const kitRemaining = kitStock ? kitStock.carriedQty - kitStock.soldQty : 0;
                const isFromTravel = !!fulfillFromTravel[product.id];

                return (
                  <div
                    key={product.id}
                    className={`p-3 rounded-xl border transition-all ${
                      currentQty > 0
                        ? 'border-[#C5A059] bg-[#FEF8F6]/60 shadow-2xs'
                        : 'border-[#E8DED9] bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover bg-[#F8F2F0] shrink-0 border border-[#E8DED9]"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[9px] font-mono text-[#8C8782] tracking-wider block">
                              {product.sku || 'DLC-SKU'} · {product.category}
                            </span>
                            <h4 className="font-serif text-xs font-bold text-[#1A1918] truncate max-w-[170px]">
                              {product.name}
                            </h4>
                          </div>

                          <div className="text-right">
                            <span className="text-xs font-bold text-[#1A1918] tabular-nums block">
                              ₹{wholesalePrice}/pc
                            </span>
                            <span className="text-[10px] text-[#8C8782] line-through tabular-nums">
                              MRP ₹{product.price}
                            </span>
                          </div>
                        </div>

                        {/* Travel Kit stock info badge */}
                        <div className="flex items-center justify-between mt-1 text-[10px]">
                          <span
                            className={`flex items-center gap-1 font-medium ${
                              kitRemaining > 0 ? 'text-emerald-700' : 'text-[#8C8782]'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[13px]">
                              luggage
                            </span>
                            <span>
                              Kit Stock: <strong>{kitRemaining}</strong> available
                            </span>
                          </span>

                          {currentQty > 0 && (
                            <span className="font-semibold text-[#C5A059] tabular-nums">
                              Sub: ₹{(wholesalePrice * currentQty).toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        {/* Quantity Stepper & Quick Multipliers */}
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E8DED9]/60">
                          {/* Stepper */}
                          <div className="flex items-center border border-[#E8DED9] rounded-lg bg-white shadow-2xs">
                            <button
                              type="button"
                              onClick={() => handleQtyChange(product.id, currentQty - 1)}
                              className="w-7 h-7 flex items-center justify-center text-[#1A1918] hover:bg-[#F8F2F0]"
                            >
                              <span className="material-symbols-outlined text-[14px]">
                                remove
                              </span>
                            </button>
                            <input
                              type="number"
                              min="0"
                              value={currentQty}
                              onChange={(e) =>
                                handleQtyChange(product.id, parseInt(e.target.value) || 0)
                              }
                              className="w-10 text-center text-xs font-bold text-[#1A1918] outline-hidden tabular-nums"
                            />
                            <button
                              type="button"
                              onClick={() => handleQtyChange(product.id, currentQty + 1)}
                              className="w-7 h-7 flex items-center justify-center text-[#1A1918] hover:bg-[#F8F2F0]"
                            >
                              <span className="material-symbols-outlined text-[14px]">
                                add
                              </span>
                            </button>
                          </div>

                          {/* Quick Add Buttons */}
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleQtyChange(product.id, currentQty + 6)}
                              className="px-2 py-1 rounded bg-[#F8F2F0] hover:bg-[#E8DED9] text-[10px] font-semibold text-[#1A1918]"
                            >
                              +6
                            </button>
                            <button
                              type="button"
                              onClick={() => handleQtyChange(product.id, currentQty + 12)}
                              className="px-2 py-1 rounded bg-[#F8F2F0] hover:bg-[#E8DED9] text-[10px] font-semibold text-[#1A1918]"
                            >
                              +12 Doz
                            </button>
                          </div>
                        </div>

                        {/* Source Toggle when selected */}
                        {currentQty > 0 && kitRemaining > 0 && (
                          <div className="mt-2 pt-1 flex items-center justify-between text-[11px] bg-white p-1.5 rounded-lg border border-[#E8DED9]">
                            <span className="text-[#8C8782]">Fulfillment Source:</span>
                            <button
                              type="button"
                              onClick={() => handleToggleFulfillSource(product.id)}
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors flex items-center gap-1 ${
                                isFromTravel
                                  ? 'bg-emerald-700 text-white'
                                  : 'bg-[#1A1817] text-white'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[12px]">
                                {isFromTravel ? 'handshake' : 'factory'}
                              </span>
                              <span>
                                {isFromTravel
                                  ? 'Handover Spot (From Kit)'
                                  : 'Ship from Mumbai Factory'}
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Notes & Logistics */}
          <div className="p-4 bg-white rounded-2xl border border-[#E8DED9] shadow-2xs space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-semibold text-[#8C8782]">
                Order Visit Notes & Special Requests
              </label>
              <span className="text-[10px] text-[#C5A059] font-medium">
                (Saves directly into CRM Client Profile)
              </span>
            </div>
            <textarea
              rows={2}
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="e.g. Demanded Kundan designs with green hydro drops for Diwali. Deliver by 15th."
              className="w-full px-3 py-2 rounded-xl border border-[#E8DED9] bg-[#FEF8F6] outline-hidden focus:border-[#C5A059]"
            />
          </div>

          {/* Section 4: Wholesale Order Summary & Retail Margin */}
          <div className="p-4 bg-white rounded-2xl border border-[#E8DED9] shadow-2xs space-y-2.5 text-xs">
            <h4 className="font-serif text-xs font-semibold text-[#1A1918] pb-1 border-b border-[#E8DED9] flex items-center justify-between">
              <span>Wholesale Billing Summary</span>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-sm">
                Retailer Profit: ~{retailerMargin}%
              </span>
            </h4>

            <div className="flex justify-between text-[#8C8782]">
              <span>Total Units Booked</span>
              <span className="font-bold text-[#1A1918] tabular-nums">{totalUnits} pieces</span>
            </div>

            <div className="flex justify-between text-[#8C8782]">
              <span>Wholesale Base Subtotal</span>
              <span className="font-medium text-[#1A1918] tabular-nums">
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex justify-between text-[#8C8782]">
              <span>GST Tax (3% on Jewellery)</span>
              <span className="font-medium text-[#1A1918] tabular-nums">
                ₹{taxGst.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="pt-2 border-t border-[#E8DED9] flex justify-between items-baseline text-sm font-bold text-[#1A1918]">
              <span>Grand Wholesale Total</span>
              <span className="font-serif text-lg text-[#C5A059] tabular-nums">
                ₹{grandTotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="p-2.5 bg-[#FEF8F6] rounded-xl border border-[#DFC48B] text-[11px] text-[#8C8782] space-y-1">
              <div className="flex justify-between">
                <span>Estimated Retail Counter Resale:</span>
                <strong className="text-[#1A1918]">
                  ₹{estimatedRetailValue.toLocaleString('en-IN')}
                </strong>
              </div>
              <p className="text-[10px] text-emerald-800">
                💰 Retailer stands to earn ~₹
                {(estimatedRetailValue - grandTotal).toLocaleString('en-IN')} profit on this lot!
              </p>
            </div>
          </div>

          {/* Sticky Book Order CTA */}
          <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto z-40 bg-white/95 backdrop-blur-md border-t border-[#E8DED9] p-3 shadow-xl flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('travel-stock')}
              className="py-3 px-3 rounded-full border border-[#1A1918] text-[#1A1918] text-xs font-semibold hover:bg-[#F8F2F0] flex items-center justify-center shrink-0"
              title="Travel Stock"
            >
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            </button>

            <button
              type="submit"
              disabled={lineItems.length === 0}
              className={`flex-1 py-3.5 px-4 rounded-full text-xs font-semibold tracking-wider uppercase shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 ${
                lineItems.length > 0
                  ? 'bg-[#1A1918] text-white hover:bg-[#C5A059]'
                  : 'bg-stone-300 text-stone-500 cursor-not-allowed'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">done_all</span>
              <span>Confirm & Book Order (₹{grandTotal.toLocaleString('en-IN')})</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Retailer Client CRM Hub */}
      {activeTab === 'clients' && (
        <div className="space-y-4">
          {/* CRM Search & Action Bar */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={crmSearchQuery}
                  onChange={(e) => setCrmSearchQuery(e.target.value)}
                  placeholder="Search stores, proprietor, city or phone..."
                  className="w-full px-3 py-2 pl-8 text-xs rounded-xl border border-[#E8DED9] bg-white outline-hidden focus:border-[#C5A059] shadow-2xs"
                />
                <span className="material-symbols-outlined text-[#8C8782] text-[16px] absolute left-2.5 top-2.5">
                  search
                </span>
              </div>

              <button
                type="button"
                onClick={() => setNewClientModalOpen(true)}
                className="px-3 py-2 rounded-xl bg-[#1A1918] text-white text-xs font-semibold hover:bg-[#C5A059] transition-colors flex items-center gap-1 shrink-0"
              >
                <span className="material-symbols-outlined text-[16px]">person_add</span>
                <span>Add Retailer</span>
              </button>
            </div>

            {/* City Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {['All', 'Ahmedabad', 'Jaipur', 'Surat', 'Indore'].map((ct) => (
                <button
                  key={ct}
                  type="button"
                  onClick={() => setCrmFilterCity(ct)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    crmFilterCity === ct
                      ? 'bg-[#1A1918] text-white font-semibold'
                      : 'bg-white border border-[#E8DED9] text-[#1A1918] hover:bg-[#F8F2F0]'
                  }`}
                >
                  {ct}
                </button>
              ))}
            </div>
          </div>

          {/* Retailer Client Cards List */}
          <div className="space-y-3.5">
            {filteredClients.map((client) => {
              const isSelected = selectedClientId === client.id;
              const isAddingNote = activeNoteInputId === client.id;

              return (
                <div
                  key={client.id}
                  className={`p-4 rounded-2xl border transition-all bg-white shadow-2xs space-y-3 ${
                    isSelected ? 'border-[#C5A059] ring-1 ring-[#C5A059]/40' : 'border-[#E8DED9]'
                  }`}
                >
                  {/* Card Header: Store & Owner */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap mb-1">
                        {client.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] font-semibold bg-[#FEF8F6] text-[#C5A059] border border-[#DFC48B] px-1.5 py-0.5 rounded-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h4 className="font-serif text-sm font-bold text-[#1A1918]">
                        {client.storeName}
                      </h4>
                      <p className="text-[11px] text-[#8C8782]">
                        {client.ownerName} · {client.city} ({client.market})
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* WhatsApp Button */}
                      <button
                        type="button"
                        onClick={() =>
                          alert(`Opening WhatsApp chat with ${client.ownerName} (${client.phone})`)
                        }
                        className="w-8 h-8 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors"
                        title="WhatsApp Retailer"
                      >
                        <span className="material-symbols-outlined text-[17px]">chat</span>
                      </button>

                      {/* Call Button */}
                      <button
                        type="button"
                        onClick={() => alert(`Calling ${client.ownerName} at ${client.phone}`)}
                        className="w-8 h-8 rounded-full bg-stone-100 text-[#1A1918] flex items-center justify-center hover:bg-[#1A1918] hover:text-white transition-colors"
                        title="Call Store"
                      >
                        <span className="material-symbols-outlined text-[17px]">call</span>
                      </button>
                    </div>
                  </div>

                  {/* Financial & Order Ledger Metrics */}
                  <div className="grid grid-cols-3 gap-1.5 p-2.5 bg-[#FEF8F6] rounded-xl border border-[#E8DED9] text-center text-xs">
                    <div>
                      <span className="text-[9px] text-[#8C8782] block">Lifetime Volume</span>
                      <strong className="text-[#1A1918] tabular-nums">
                        ₹{client.lifetimeVolume.toLocaleString('en-IN')}
                      </strong>
                    </div>

                    <div>
                      <span className="text-[9px] text-[#8C8782] block">Total Orders</span>
                      <strong className="text-[#1A1918] tabular-nums">{client.totalOrdersCount}</strong>
                    </div>

                    <div>
                      <span className="text-[9px] text-[#8C8782] block">Outstanding</span>
                      <strong
                        className={`tabular-nums font-bold ${
                          client.outstandingBalance > 0 ? 'text-amber-800' : 'text-emerald-700'
                        }`}
                      >
                        ₹{client.outstandingBalance.toLocaleString('en-IN')}
                      </strong>
                    </div>
                  </div>

                  {/* Last Order & Notes (CRM Highlight) */}
                  <div className="p-2.5 bg-[#FFFDF8] border-l-2 border-[#C5A059] rounded-r-lg text-xs space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-[#8C8782]">
                      <span className="font-semibold text-[#C5A059] uppercase tracking-wider">
                        Last Order: {client.lastOrderDate || 'None'}
                      </span>
                      {client.lastOrderAmount && (
                        <span className="font-bold text-[#1A1918] tabular-nums">
                          ₹{client.lastOrderAmount.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    {client.lastOrderNotes && (
                      <p className="text-[11px] text-[#1A1918] italic leading-relaxed">
                        "{client.lastOrderNotes}"
                      </p>
                    )}
                  </div>

                  {/* Visit Notes Timeline */}
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8782]">
                        Visit Logs ({client.visitNotes.length})
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveNoteInputId(isAddingNote ? null : client.id)
                        }
                        className="text-[10px] font-semibold text-[#C5A059] hover:underline"
                      >
                        {isAddingNote ? 'Cancel Note' : '+ Add Visit Note'}
                      </button>
                    </div>

                    {/* Inline Note Logger */}
                    {isAddingNote && (
                      <div className="flex gap-2 pt-1">
                        <input
                          type="text"
                          value={newVisitNoteText}
                          onChange={(e) => setNewVisitNoteText(e.target.value)}
                          placeholder="e.g. Visited shop. Retailer wants Diwali catalogue..."
                          className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-[#E8DED9] outline-hidden focus:border-[#C5A059]"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddVisitNote(client.id)}
                          className="px-3 py-1.5 bg-[#1A1918] text-white text-xs font-semibold rounded-lg hover:bg-[#C5A059]"
                        >
                          Save
                        </button>
                      </div>
                    )}

                    <div className="space-y-1 pt-0.5">
                      {client.visitNotes.slice(0, 2).map((vn, i) => (
                        <div
                          key={i}
                          className="text-[10px] text-[#8C8782] flex items-start gap-1.5"
                        >
                          <span className="text-[#C5A059] font-medium shrink-0">•</span>
                          <span>
                            <strong className="text-[#1A1918]">{vn.date}:</strong> {vn.note}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action: Book Order with this Retailer */}
                  <div className="pt-2 border-t border-[#E8DED9]/60 flex items-center justify-between">
                    <span className="text-[10px] text-[#8C8782]">
                      Terms: {client.preferredPaymentTerms}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        handleSelectClient(client);
                        setActiveTab('new-order');
                      }}
                      className="px-4 py-1.5 rounded-full bg-[#1A1918] text-white text-[11px] font-semibold hover:bg-[#C5A059] transition-colors flex items-center gap-1 active:scale-95 shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[14px]">edit_note</span>
                      <span>Book Wholesale Order</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: History of Booked Retailer Orders */}
      {activeTab === 'history' && (
        <div className="space-y-3.5">
          {wholesaleOrders.map((order) => (
            <div
              key={order.id}
              className="p-4 bg-white rounded-2xl border border-[#E8DED9] shadow-2xs space-y-3"
            >
              <div className="flex items-start justify-between pb-2 border-b border-[#E8DED9]/60">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#C5A059] block">
                    {order.orderNumber}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-[#1A1918]">
                    {order.storeName}
                  </h4>
                  <p className="text-[11px] text-[#8C8782]">
                    {order.retailerName} · {order.city} ({order.market})
                  </p>
                </div>

                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm ${
                    order.status === 'Delivered Spot'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Items summary */}
              <div className="space-y-1.5 text-xs">
                {order.items.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[#8C8782]">
                    <span className="truncate max-w-[220px]">
                      {it.quantity}x {it.productName} ({it.sku})
                    </span>
                    <span className="font-medium text-[#1A1918] tabular-nums">
                      ₹{it.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#E8DED9]/60 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-[#8C8782] block">
                    Terms: {order.paymentTerms}
                  </span>
                  <span className="text-[10px] text-[#8C8782]">Booked: {order.date}</span>
                </div>
                <span className="font-serif font-bold text-base text-[#1A1918] tabular-nums">
                  ₹{order.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Share & Print buttons */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    alert(
                      `Sharing wholesale order copy of #${order.orderNumber} to retailer WhatsApp (+91 ${order.phone})`
                    )
                  }
                  className="flex-1 py-1.5 px-3 rounded-lg bg-[#25D366] text-white text-[11px] font-semibold flex items-center justify-center gap-1 active:scale-95"
                >
                  <span className="material-symbols-outlined text-[15px]">chat</span>
                  <span>WhatsApp Invoice</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    alert(`Generating printable GST Wholesale Proforma Invoice for ${order.storeName}`)
                  }
                  className="py-1.5 px-3 rounded-lg border border-[#E8DED9] text-[#1A1918] text-[11px] font-medium hover:bg-[#F8F2F0]"
                  title="Print Proforma"
                >
                  <span className="material-symbols-outlined text-[15px]">print</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Onboard New Retailer Profile */}
      {newClientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-[#DFC48B] space-y-3.5 max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between border-b border-[#E8DED9] pb-2.5">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#C5A059] text-[20px]">
                  person_add
                </span>
                <h3 className="font-serif text-sm font-bold text-[#1A1918]">
                  Onboard Retailer to CRM
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setNewClientModalOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#8C8782] hover:bg-[#F8F2F0]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateNewClient} className="space-y-2.5 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-[#8C8782] mb-0.5">
                  Store / Showroom Name *
                </label>
                <input
                  type="text"
                  required
                  value={newStore}
                  onChange={(e) => setNewStore(e.target.value)}
                  placeholder="e.g. Radhe Imitation Emporium"
                  className="w-full px-3 py-2 rounded-xl border border-[#E8DED9] bg-[#FEF8F6] outline-hidden focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-[#8C8782] mb-0.5">
                    Proprietor Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newOwner}
                    onChange={(e) => setNewOwner(e.target.value)}
                    placeholder="e.g. Mukesh Bhai"
                    className="w-full px-3 py-2 rounded-xl border border-[#E8DED9] bg-[#FEF8F6] outline-hidden focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8C8782] mb-0.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+91 98..."
                    className="w-full px-3 py-2 rounded-xl border border-[#E8DED9] bg-[#FEF8F6] outline-hidden focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-[#8C8782] mb-0.5">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    placeholder="e.g. Surat"
                    className="w-full px-3 py-2 rounded-xl border border-[#E8DED9] bg-[#FEF8F6] outline-hidden focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8C8782] mb-0.5">
                    Market Area
                  </label>
                  <input
                    type="text"
                    value={newMarket}
                    onChange={(e) => setNewMarket(e.target.value)}
                    placeholder="e.g. Chauta Bazaar"
                    className="w-full px-3 py-2 rounded-xl border border-[#E8DED9] bg-[#FEF8F6] outline-hidden focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-[#8C8782] mb-0.5">
                    GSTIN
                  </label>
                  <input
                    type="text"
                    value={newGst}
                    onChange={(e) => setNewGst(e.target.value.toUpperCase())}
                    placeholder="24ABC..."
                    className="w-full px-3 py-2 rounded-xl border border-[#E8DED9] bg-[#FEF8F6] font-mono outline-hidden focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8C8782] mb-0.5">
                    Payment Terms
                  </label>
                  <select
                    value={newTerms}
                    onChange={(e) => setNewTerms(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8DED9] bg-[#FEF8F6] outline-hidden focus:border-[#C5A059]"
                  >
                    <option value="Immediate UPI/Cash">Immediate UPI/Cash</option>
                    <option value="50% Advance + Dispatch">50% Advance + Dispatch</option>
                    <option value="15 Days Credit">15 Days Credit</option>
                    <option value="30 Days Credit">30 Days Credit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8C8782] mb-0.5">
                  Initial Notes / Retailer Preferences
                </label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Met owner at store. Looking for daily wear mangalsutras & jhumkas..."
                  className="w-full px-3 py-2 rounded-xl border border-[#E8DED9] bg-[#FEF8F6] outline-hidden focus:border-[#C5A059]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-[#1A1918] text-white text-xs font-semibold hover:bg-[#C5A059] shadow-sm"
                >
                  Save Profile & Start Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Confirmed Modal */}
      {orderSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-[#DFC48B] text-center space-y-3.5">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#FEF8F6] border-2 border-[#C5A059] flex items-center justify-center text-[#C5A059]">
              <span className="material-symbols-outlined text-3xl font-bold">check</span>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block mb-1">
                Order Logged & CRM Profile Updated
              </span>
              <h3 className="font-serif text-lg font-bold text-[#1A1918]">
                {orderSuccessModal.orderNumber}
              </h3>
              <p className="text-xs text-[#8C8782] mt-0.5">
                Booked for <strong>{orderSuccessModal.storeName}</strong>
              </p>
            </div>

            <div className="p-3 bg-[#FEF8F6] rounded-xl border border-[#E8DED9] text-xs text-left space-y-1">
              <div className="flex justify-between">
                <span className="text-[#8C8782]">Total Pieces:</span>
                <strong className="text-[#1A1918]">
                  {orderSuccessModal.items.reduce((a, c) => a + c.quantity, 0)} pcs
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C8782]">Wholesale Amount:</span>
                <strong className="text-[#C5A059] tabular-nums font-bold">
                  ₹{orderSuccessModal.totalAmount.toLocaleString('en-IN')}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C8782]">Payment Terms:</span>
                <span className="text-[#1A1918]">{orderSuccessModal.paymentTerms}</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  alert(
                    `Wholesale Order Receipt #${orderSuccessModal.orderNumber} dispatched to ${orderSuccessModal.phone} via WhatsApp.`
                  );
                  setOrderSuccessModal(null);
                  setActiveTab('history');
                }}
                className="w-full py-2.5 rounded-full bg-[#25D366] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs hover:bg-[#20BE5A]"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>Send WhatsApp Receipt to Retailer</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setOrderSuccessModal(null);
                  setActiveTab('history');
                }}
                className="w-full py-2 rounded-full border border-[#E8DED9] text-xs font-medium text-[#1A1918] hover:bg-[#F8F2F0]"
              >
                Close & View All Orders
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
