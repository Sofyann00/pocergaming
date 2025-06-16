"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { products } from "@/lib/data"
import { notFound } from "next/navigation"
import { cn } from "@/lib/utils"
import { useUser } from "@/contexts/user-context"
import { useQRCode } from 'next-qrcode'
import { PaymentSuccessDialog } from "@/app/components/payment-success-dialog"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export default function ProductPage({ params }: { params: { id: string } }) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const { user, addOrder } = useUser()
  const [selectedItem, setSelectedItem] = useState<any | null>(null)
  const [playerId, setPlayerId] = useState("")
  const [serverId, setServerId] = useState("")
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [paymentData, setPaymentData] = useState<any>(null)
  const [isLoadingPayment, setIsLoadingPayment] = useState(false)
  const [isCheckingPayment, setIsCheckingPayment] = useState(false)
  const [digiflazzItems, setDigiflazzItems] = useState<any[]>([])
  const { Canvas } = useQRCode()

  const product = products.find(p => p.id === parseInt(params.id))

  if (!product) {
    notFound()
  }

  // Fetch Digiflazz items for highlighted products
  useEffect(() => {
    const fetchDigiflazzItems = async () => {
      const isHighlightedProduct = product.name.toLowerCase().includes('mobile legends') || 
        product.name.toLowerCase().includes('free fire') ||
        product.name.toLowerCase().includes('pubg mobile') ||
        product.name.toLowerCase().includes('ragnarok m eternal love');

      if (isHighlightedProduct) {
        try {
          // Determine the brand based on product name
          let brand = '';
          if (product.name.toLowerCase().includes('mobile legends')) {
            brand = 'mobile legends';
          } else if (product.name.toLowerCase().includes('free fire')) {
            brand = 'free fire';
          } else if (product.name.toLowerCase().includes('pubg mobile')) {
            brand = 'pubg mobile';
          } else if (product.name.toLowerCase().includes('ragnarok m eternal love')) {
            brand = 'ragnarok m eternal love';
          }

          const response = await fetch(`/api/digiflazz/price-list?brand=${encodeURIComponent(brand)}`);
          const data = await response.json();
          
          if (data.data) {
            // Filter items by price and status
            const sortedItems = data.data
              .filter((item: any) => item.price >= 15000 && item.buyer_product_status === true)
              .map((item: any) => ({
                ...item,
                product_name: item.product_name
                  .replace('MOBILELEGEND - ', '')
                  .replace('FREEFIRE - ', '')
                  .replace('PUBGM - ', '')
                  .replace('RAGNAROK - ', '')
              }))
              .sort((a: any, b: any) => a.price - b.price);
            
            setDigiflazzItems(sortedItems);
          }
        } catch (error) {
          console.error('Error fetching Digiflazz items:', error);
        }
      }
    };

    fetchDigiflazzItems();
  }, [product.id, product.name]);

  // Add polling mechanism
  useEffect(() => {
    let pollInterval: NodeJS.Timeout;

    const checkPaymentStatus = async () => {
      if (!paymentData?.depositId || isCheckingPayment) return;

      try {
        setIsCheckingPayment(true);
        const response = await fetch(`/api/payment/status?depositId=${paymentData.depositId}`);
        const data = await response.json();

        if (data.data?.status === 'completed') {
          // Payment completed successfully
          clearInterval(pollInterval);
          setShowPaymentDialog(false);
          setShowSuccessDialog(true);
          // Handle successful payment (e.g., add to cart, send email, etc.)
          handlePaymentComplete();
        } else if (data.data?.status === 'failed' || data.data?.status === 'expired') {
          // Payment failed or expired
          clearInterval(pollInterval);
          toast({
            title: "Payment Failed",
            description: "Your payment has failed or expired. Please try again.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      } finally {
        setIsCheckingPayment(false);
      }
    };

    if (showPaymentDialog && paymentData?.depositId) {
      // Start polling when dialog is shown and we have a deposit ID
      pollInterval = setInterval(checkPaymentStatus, 10000); // Poll every 10 seconds
    }

  }, [showPaymentDialog, paymentData?.depositId]);

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to continue with your purchase.",
        variant: "destructive"
      })
      return
    }

    if (!selectedItem || !playerId || !selectedPayment) {
      toast({
        title: "Missing information",
        description: "Please select a package, enter your Player ID, and choose a payment method.",
        variant: "destructive"
      })
      return
    }

    setIsLoadingPayment(true)
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          outputCurrency: "IDR",
          reference: `order-${Date.now()}`,
          inputCurrency: "IDR",
          balanceType: "fiat",
          paymentMethod: selectedPayment,
          inputAmount: selectedItem.price
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create payment');
      }

      console.log(data.data)

      setPaymentData(data.data);
      setShowPaymentDialog(true);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process payment",
        variant: "destructive"
      });
    } finally {
      setIsLoadingPayment(false)
    }
  }

  const handlePaymentComplete = async () => {
    if (!user?.email) {
      toast({
        title: "Error",
        description: "Please log in to complete your purchase.",
        variant: "destructive"
      })
      return
    }

    setIsSendingEmail(true)
    
    try {
      // Add to cart
      addItem({
        ...product,
        price: selectedItem.price,
        quantity: 1,
        playerId
      })

      // Add order to user's orders
      addOrder({
        items: [{
          id: selectedItem.id.toString(),
          name: selectedItem.name,
          price: selectedItem.price,
          quantity: 1,
          image: selectedItem.iconUrl || product.image
        }],
        total: selectedItem.price,
        status: "completed",
        productName: product.name,
        itemName: selectedItem.name
      })

      // Call our backend API for Digiflazz transaction
      const digiflazzResponse = await fetch('/api/digiflazz/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productCode: selectedItem.productCode,
          playerId,
          serverId: product.name.toLowerCase().includes('mobile legends') ? serverId : undefined
        })
      })

      const digiflazzData = await digiflazzResponse.json()
      
      if (!digiflazzResponse.ok) {
        throw new Error(digiflazzData.error || 'Failed to process transaction')
      }

      // Send confirmation email via API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: user.email,
          productName: product.name,
          itemName: selectedItem.name,
          price: selectedItem.price,
          playerId: playerId
        }),
      });

      const data = await response.json();

      if (!data.success) {
        toast({
          title: "Email Error",
          description: "Failed to send confirmation email, but your purchase was successful.",
          variant: "destructive"
        })
      }
      
      setShowPaymentDialog(false)
      toast({
        title: "Thank You For Purchasing",
        description: `Your purchase of ${selectedItem.name} for ${product.name} is being processed. We'll notify you via email once completed.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while processing your purchase. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSendingEmail(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-4 mt-6">
      {/* Game Header with Banner */}
      <div className="relative rounded-xl overflow-hidden mb-8">
        {/* Banner Image */}
        <div className="absolute inset-0">
          <Image
            src={product.banner}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        </div>

        {/* Content Overlay */}
        <div className="relative py-12 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Game Logo */}
            <div className="flex flex-col items-center mb-8">
              <Image
                src={product.image}
                alt={product.name}
                width={180}
                height={180}
                className="object-contain mb-6 drop-shadow-2xl"
              />
              <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4 drop-shadow-lg">{product.name}</h1>
            </div>

            {/* Badges */}
            <div className="flex justify-center gap-4">
              <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                Customer Service 24/7
              </div>
              {/* <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Official Distributor
              </div> */}
            </div>

            {/* Publisher */}
            <div className="text-center mt-4">
              <p className="text-gray-300 text-lg">{product.category}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
          {product.id === 1 ? (
            // Display Digiflazz items for Mobile Legends
            digiflazzItems.map((item) => (
              <button
                key={item.buyer_sku_code}
                onClick={() => {
                  console.log('Selected Digiflazz Item:', item);
                  setSelectedItem({
                    id: item.buyer_sku_code,
                    name: item.product_name,
                    price: item.price,
                    productCode: item.buyer_sku_code
                  })
                }}
                className={cn(
                  "flex items-center gap-2 p-4 rounded-lg border transition-all",
                  selectedItem?.id === item.buyer_sku_code
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-white/10 hover:border-white/20 bg-white/5"
                )}
              >
                <Image
                  src="/diamond_img.webp"
                  alt="Diamond"
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <div className="text-left">
                  <p className="font-semibold text-black">{item.product_name}</p>
                  <p className="text-sm text-gray-400">
                    Rp {item.price.toLocaleString('id-ID')},-
                  </p>
                </div>
              </button>
            ))
          ) : (
            // Display regular items for other products
            product.items.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={cn(
                  "flex items-center gap-2 p-4 rounded-lg border transition-all",
                  selectedItem?.id === item.id
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-white/10 hover:border-white/20 bg-white/5"
                )}
              >
                {item.iconUrl && (
                  <Image
                    src={item.iconUrl}
                    alt={item.name}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
                <div className="text-left">
                  <p className="font-semibold text-black">{item.name}</p>
                  <p className="text-sm text-gray-400">
                    Rp {item.price.toLocaleString('id-ID')},-
                  </p>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Order Information */}
        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-6 text-black flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Informasi Pesanan
          </h2>

        <div className="space-y-6">
            {/* Player ID Input */}
          <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Masukkan Player ID
              </label>
              <Input
                type="text"
                placeholder="Enter your Player ID"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
                className="bg-white/10 border-white/20 text-black placeholder:text-gray-400"
              />
          </div>

          {/* Only show Server ID for Mobile Legends */}
          {product.name.toLowerCase().includes('mobile legends') && (
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Masukkan Server ID (Optional)
              </label>
              <Input
                type="text"
                placeholder="Enter your Server ID"
                value={serverId}
                onChange={(e) => setServerId(e.target.value)}
                className="bg-white/10 border-white/20 text-black placeholder:text-gray-400"
              />
            </div>
          )}

            {/* Payment Methods */}
          <div>
              <h3 className="text-lg font-semibold mb-4 text-black">Pilih Pembayaran</h3>
              
              {/* QRIS */}
              <button
                onClick={() => setSelectedPayment('qris')}
                className={cn(
                  "w-full p-4 rounded-lg border mb-3 flex items-center justify-between",
                  selectedPayment === 'qris'
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-white/10 hover:border-white/20 bg-white/5"
                )}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/qris_img.png"
                    alt="QRIS"
                    width={60}
                    height={24}
                    className="object-contain"
                  />
                  <span className="text-black">QRIS</span>
                </div>
                <span className="text-gray-400">
                  Rp {selectedItem?.price.toLocaleString('id-ID') ?? '0'},-
                </span>
              </button>

              {/* Virtual Account */}
              <button
                onClick={() => setSelectedPayment('va_permata')}
                className={cn(
                  "w-full p-4 rounded-lg border flex items-center justify-between",
                  selectedPayment === 'va_permata'
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-white/10 hover:border-white/20 bg-white/5"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-black">Virtual Account</span>
                </div>
                <span className="text-gray-400">
                  Rp {selectedItem?.price.toLocaleString('id-ID') ?? '0'},-
                </span>
              </button>
          </div>

            {/* Payment Instructions */}
            {selectedPayment && (
              <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                <h4 className="text-sm font-medium text-black mb-2">Cara Pembayaran:</h4>
                {selectedPayment === 'qris' ? (
                  <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
                    <li>Scan QR Code yang muncul setelah konfirmasi</li>
                    <li>Pilih aplikasi e-wallet atau mobile banking</li>
                    <li>Masukkan nominal pembayaran</li>
                    <li>Konfirmasi pembayaran</li>
                  </ol>
                ) : (
                  <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
                    <li>Nomor Virtual Account akan muncul setelah konfirmasi</li>
                    <li>Buka aplikasi mobile banking</li>
                    <li>Pilih menu Transfer ke Virtual Account</li>
                    <li>Masukkan nomor Virtual Account</li>
                    <li>Konfirmasi pembayaran</li>
                  </ol>
                )}
          </div>
            )}

          <Button 
            size="lg" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleAddToCart}
            disabled={isLoadingPayment}
          >
            {isLoadingPayment ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              "Konfirmasi Top Up"
            )}
          </Button>
          </div>
        </div>
      </div>

      {/* Payment Success Dialog */}
      <PaymentSuccessDialog
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        paymentData={paymentData}
        productData={product}
        selectedItem={{
          ...selectedItem,
          playerId
        }}
      />

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>
              Complete your payment using the selected method
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900">
                Total Amount: Rp {selectedItem?.price.toLocaleString('id-ID')},-
              </p>
              <p className="text-sm text-gray-500">
                {selectedItem?.name} for {product.name}
              </p>
            </div>

            {selectedPayment === 'qris' && paymentData?.paymentFiat?.qrData ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-64 h-64">
                  <Canvas
                    text={paymentData.paymentFiat.qrData}
                    options={{
                      errorCorrectionLevel: 'M',
                      margin: 3,
                      scale: 4,
                      width: 256,
                      color: {
                        dark: '#000000FF',
                        light: '#FFFFFFFF',
                      },
                    }}
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Scan QR code using your preferred payment app
                </p>
                <div className="text-sm text-gray-500">
                  <p>Expires at: {new Date(paymentData.expiredAt).toLocaleString()}</p>
                </div>
              </div>
            ) : selectedPayment === 'va_permata' && paymentData?.paymentFiat ? (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Virtual Account Number:</p>
                  <p className="text-lg font-mono font-semibold text-gray-900">{paymentData.paymentFiat.accountNumber}</p>
                  <p className="text-sm text-gray-500 mt-1">Bank: {paymentData.paymentFiat.bankName}</p>
                </div>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>1. Login to your mobile banking app</li>
                  <li>2. Select Virtual Account payment</li>
                  <li>3. Enter the VA number above</li>
                  <li>4. Confirm and complete your payment</li>
                </ul>
                <div className="text-sm text-gray-500">
                  <p>Expires at: {new Date(paymentData.expiredAt).toLocaleString()}</p>
                </div>
              </div>
            ) : null}

            <div className="flex justify-center gap-3 mt-6">
              <Button
                onClick={() => setShowPaymentDialog(false)}
                variant="outline"
                disabled={isCheckingPayment}
              >
                Cancel
              </Button>
              <Button
                onClick={() => setShowPaymentDialog(false)}
                disabled={isCheckingPayment}
              >
                {isCheckingPayment ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Checking Payment...
                  </>
                ) : (
                  "I have completed the payment"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 