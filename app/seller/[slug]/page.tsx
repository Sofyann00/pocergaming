"use client"

import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"
import { Star, Shield, Users, TrendingUp } from "lucide-react"

const agents = [
  {
    id: "1",
    name: "Genggam Dunia Game",
    rating: 4.9,
    avatar: "/seller_ic/gdg_ic.png",
    slug: "genggam-dunia-game",
    items: [
      {
        id: "ml80",
        name: "MOBILELEGEND - 80 Diamond",
        game: "Mobile Legends",
        image: "https://static-src.vocagame.com/vocagame/mobilelegends-4702-original.webp",
        price: 21028,
        description: "80 Diamonds for Mobile Legends"
      },
      {
        id: "ml90",
        name: "MOBILELEGEND - 90 Diamond",
        game: "Mobile Legends",
        image: "https://static-src.vocagame.com/vocagame/mobilelegends-4702-original.webp",
        price: 23241,
        description: "90 Diamonds for Mobile Legends"
      },
      {
        id: "pm122",
        name: "PUBG MOBILE 122 UC",
        game: "PUBG Mobile",
        image: "https://static-src.vocagame.com/vocagame/pubg_global-afab-original.webp",
        price: 40682,
        description: "122 UC for PUBG Mobile"
      }
    ]
  },
  {
    id: "2",
    name: "Kasih Game Store",
    rating: 4.8,
    avatar: "/seller_ic/kgs_ic.png",
    slug: "kasih-game-store",
    items: [
      {
        id: "ml85",
        name: "MOBILELEGEND - 85 Diamond",
        game: "Mobile Legends",
        image: "https://static-src.vocagame.com/vocagame/mobilelegends-4702-original.webp",
        price: 24780,
        description: "85 Diamonds for Mobile Legends"
      },
      {
        id: "mlweek",
        name: "MOBILE LEGENDS Weekly Diamond Pass",
        game: "Mobile Legends",
        image: "https://static-src.vocagame.com/vocagame/mobilelegends-4702-original.webp",
        price: 21000,
        description: "Weekly Diamond Pass for Mobile Legends"
      },
      {
        id: "pm125",
        name: "PUBG MOBILE 125 UC",
        game: "PUBG Mobile",
        image: "https://static-src.vocagame.com/vocagame/pubg_global-afab-original.webp",
        price: 48500,
        description: "125 UC for PUBG Mobile"
      }
    ]
  },
  {
    id: "3",
    name: "Legenda Topup",
    rating: 4.7,
    avatar: "/seller_ic/lgt_ic.png",
    slug: "legenda-topup",
    items: [
      {
        id: "ml86",
        name: "MOBILELEGEND - 86 Diamond",
        game: "Mobile Legends",
        image: "https://static-src.vocagame.com/vocagame/mobilelegends-4702-original.webp",
        price: 24010,
        description: "86 Diamonds for Mobile Legends"
      },
      {
        id: "pbgrp",
        name: "Pubg Royale Pass",
        game: "PUBG Mobile",
        image: "https://static-src.vocagame.com/vocagame/pubg_global-afab-original.webp",
        price: 142200,
        description: "Royal Pass + Bonus for PUBG Mobile"
      },
      {
        id: "pm131",
        name: "PUBG MOBILE 131 UC",
        game: "PUBG Mobile",
        image: "https://static-src.vocagame.com/vocagame/pubg_global-afab-original.webp",
        price: 40681,
        description: "131 UC for PUBG Mobile"
      }
    ]
  },
  {
    id: "4",
    name: "Sahabat Gaming",
    rating: 4.9,
    avatar: "/seller_ic/sg_ic.png",
    slug: "sahabat-gaming",
    items: [
      {
        id: "ml88",
        name: "MOBILELEGEND - 88 Diamond",
        game: "Mobile Legends",
        image: "https://static-src.vocagame.com/vocagame/mobilelegends-4702-original.webp",
        price: 22814,
        description: "88 Diamonds for Mobile Legends"
      },
      {
        id: "pm105",
        name: "PUBG MOBILE 105 UC",
        game: "PUBG Mobile",
        image: "https://static-src.vocagame.com/vocagame/pubg_global-afab-original.webp",
        price: 27125,
        description: "105 UC for PUBG Mobile"
      },
      {
        id: "pm62",
        name: "PUBG MOBILE 62 UC",
        game: "PUBG Mobile",
        image: "https://static-src.vocagame.com/vocagame/pubg_global-afab-original.webp",
        price: 27125,
        description: "62 UC for PUBG Mobile"
      }
    ]
  },
  {
    id: "5",
    name: "TopUp1212",
    rating: 4.8,
    avatar: "/seller_ic/t12_ic.png",
    slug: "topup1212",
    items: [
      {
        id: "ml89",
        name: "MOBILELEGEND - 89 Diamond",
        game: "Mobile Legends",
        image: "https://static-src.vocagame.com/vocagame/mobilelegends-4702-original.webp",
        price: 23271,
        description: "89 Diamonds for Mobile Legends"
      },
      {
        id: "pm120",
        name: "PUBG MOBILE 120 UC",
        game: "PUBG Mobile",
        image: "https://static-src.vocagame.com/vocagame/pubg_global-afab-original.webp",
        price: 26874,
        description: "120 UC for PUBG Mobile"
      },
      {
        id: "pm70",
        name: "PUBG MOBILE 70 UC",
        game: "PUBG Mobile",
        image: "https://static-src.vocagame.com/vocagame/pubg_global-afab-original.webp",
        price: 21107,
        description: "70 UC for PUBG Mobile"
      }
    ]
  }
]

export default function SellerPage({ params }: { params: { slug: string } }) {
  // Find the seller based on the slug
  const seller = agents.find(agent => agent.slug === params.slug)

  if (!seller) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-center">Seller not found</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Seller Profile Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="relative">
              <Image
                src={seller.avatar}
                alt={seller.name}
                width={120}
                height={120}
                className="rounded-full border-4 border-blue-100 w-24 h-24 sm:w-[120px] sm:h-[120px]"
              />
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{seller.name}</h1>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4 sm:w-5 sm:h-5",
                        i < Math.floor(seller.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-base sm:text-lg text-gray-600">({seller.rating})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                <div className="bg-blue-50 rounded-lg p-2 sm:p-3">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    <span className="text-xs sm:text-sm text-gray-600">100+ Sales</span>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-2 sm:p-3">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    <span className="text-xs sm:text-sm text-gray-600">Verified</span>
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-2 sm:p-3">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                    <span className="text-xs sm:text-sm text-gray-600">Top Seller</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seller's Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {seller.items.map((item) => (
            <Link
              key={item.id}
              href={`/exclusive-voucher/${item.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="relative aspect-square">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs sm:text-sm">
                    {item.game}
                  </div>
                </div>
                <div className="p-3 sm:p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 text-sm sm:text-base">
                    {item.name}
                  </h3>
                  <div className="h-8 sm:h-10 mb-2">
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-blue-600 font-semibold text-sm sm:text-base">
                      {item.price.toLocaleString('id-ID')} IDR
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 