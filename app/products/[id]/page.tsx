"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { products } from "@/lib/data"
import { notFound } from "next/navigation"
import { cn } from "@/lib/utils"
import { useUser } from "@/contexts/user-context"
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
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)

  const product = products.find(p => p.id === parseInt(params.id))

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    if (!selectedItem || !playerId || !selectedPayment) {
      toast({
        title: "Missing information",
        description: "Please select a package, enter your Player ID, and choose a payment method.",
        variant: "destructive"
      })
      return
    }

    setShowPaymentDialog(true)
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
        <div className="absolute inset-0">
          <Image
            src={product.banner}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative flex items-center gap-4 p-6">
          <div className="relative w-16 h-16">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{product.name}</h1>
            <p className="text-gray-300">{product.category}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
          {product.items.map((item) => (
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
          ))}
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
              <p className="text-xs text-gray-400 mt-2">
                Simpan ID dengan fitur Save ID
              </p>
            </div>

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
                onClick={() => setSelectedPayment('va')}
                className={cn(
                  "w-full p-4 rounded-lg border flex items-center justify-between",
                  selectedPayment === 'va'
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

            <Button
              size="lg"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              onClick={handleAddToCart}
            >
              Konfirmasi Top Up
            </Button>
          </div>
        </div>
      </div>

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

            {selectedPayment === 'qris' ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-64 h-64">
                  <Image
                    src="/payout_qris.png"
                    alt="QRIS QR Code"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Scan QR code using your preferred payment app
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Virtual Account Number:</p>
                  <p className="text-lg font-mono font-semibold text-gray-900">8800123456789</p>
                </div>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>1. Login to your mobile banking app</li>
                  <li>2. Select Virtual Account payment</li>
                  <li>3. Enter the VA number above</li>
                  <li>4. Confirm and complete your payment</li>
                </ul>
              </div>
            )}

            <div className="flex justify-center gap-3 mt-6">
              <Button
                onClick={handlePaymentComplete}
                disabled={isSendingEmail}
              >
                {isSendingEmail ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
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