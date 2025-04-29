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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface DiamondPackage {
  amount: number
  price: number
}

const diamondPackages: DiamondPackage[] = [
  { amount: 5, price: 1000 },
  { amount: 10, price: 1990 },
  { amount: 12, price: 2000 },
  { amount: 20, price: 4000 },
  { amount: 50, price: 8000 },
  { amount: 70, price: 10000 },
  { amount: 100, price: 16000 },
  { amount: 140, price: 20000 },
  { amount: 150, price: 22000 },
  { amount: 210, price: 33000 },
  { amount: 280, price: 40000 },
  { amount: 355, price: 50000 },
  { amount: 425, price: 60000 },
  { amount: 495, price: 70000 },
  { amount: 500, price: 71000 },
  { amount: 720, price: 100000 },
  { amount: 860, price: 120000 },
  { amount: 1000, price: 140000 },
  { amount: 1075, price: 151000 },
  { amount: 1440, price: 198650 },
  { amount: 1450, price: 200000 },
  { amount: 2160, price: 297250 },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [selectedPackage, setSelectedPackage] = useState<DiamondPackage | null>(null)
  const [playerId, setPlayerId] = useState("")
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)

  const product = products.find(p => p.id === parseInt(params.id))

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    if (!selectedPackage || !playerId || !selectedPayment) {
      toast({
        title: "Missing information",
        description: "Please select a package, enter your Player ID, and choose a payment method.",
        variant: "destructive"
      })
      return
    }

    setShowPaymentDialog(true)
  }

  const handlePaymentComplete = () => {
    addItem({
      ...product,
      price: selectedPackage!.price,
      quantity: selectedPackage!.amount,
      playerId
    })
    
    setShowPaymentDialog(false)
    toast({
      title: "Added to cart",
      description: `${selectedPackage!.amount} Diamonds for Player ID ${playerId} has been added to your cart.`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {/* Game Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative w-16 h-16">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-black">{product.name}</h1>
          <p className="text-gray-400">{product.category}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Diamond Packages Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
          {diamondPackages.map((pkg) => (
            <button
              key={pkg.amount}
              onClick={() => setSelectedPackage(pkg)}
              className={cn(
                "flex items-center gap-2 p-4 rounded-lg border transition-all",
                selectedPackage?.amount === pkg.amount
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
                <p className="font-semibold text-black">{pkg.amount} Diamonds</p>
                <p className="text-sm text-gray-400">
                  Rp {pkg.price.toLocaleString('id-ID')},-
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
                  Rp {selectedPackage?.price.toLocaleString('id-ID') ?? '0'},-
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
                  {/* <Image
                    src="/va-logo.png"
                    alt="Virtual Account"
                    width={60}
                    height={24}
                    className="object-contain"
                  /> */}
                  <span className="text-black">Virtual Account</span>
                </div>
                <span className="text-gray-400">
                  Rp {selectedPackage?.price.toLocaleString('id-ID') ?? '0'},-
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
                Total Amount: Rp {selectedPackage?.price.toLocaleString('id-ID')},-
              </p>
              <p className="text-sm text-gray-500">
                {selectedPackage?.amount} Diamonds for {product.name}
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
              {/* <Button
                variant="outline"
                onClick={() => setShowPaymentDialog(false)}
              >
                Cancel
              </Button> */}
              <Button
                onClick={handlePaymentComplete}
              >
                I have completed the payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 