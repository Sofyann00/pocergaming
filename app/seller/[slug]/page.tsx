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
    rating: 5.0,
    avatar: "/seller_ic/gdg_ic.png",
    items: [
      {
        id: "1",
        name: "Doom's Infernal Blade",
        hero: "Doom",
        image: "/dota_item/doom_weapon.png",
        price: 25000,
        description: "Mythical weapon for Doom with custom particle effects"
      },
      {
        id: "2",
        name: "Terrorblade's Demon Edge",
        hero: "Terrorblade",
        image: "/dota_item/tb_full.png",
        price: 30000,
        description: "Legendary weapon for Terrorblade with demonic effects"
      }
    ]
  },
  {
    id: "2",
    name: "Sahabat Gaming",
    rating: 5.0,
    avatar: "/seller_ic/sg_ic.png",
    items: [
      {
        id: "3",
        name: "Ursa's Savage Claws",
        hero: "Ursa",
        image: "/dota_item/ursa_back.png",
        price: 22000,
        description: "Rare back item for Ursa with custom animations"
      },
      {
        id: "4",
        name: "Razor's Storm Blade",
        hero: "Razor",
        image: "/dota_item/razor_weapon.png",
        price: 28000,
        description: "Epic weapon for Razor with lightning effects"
      }
    ]
  },
  {
    id: "3",
    name: "Kasih Game Store",
    rating: 5.0,
    avatar: "/seller_ic/kgs_ic.png",
    items: [
      {
        id: "5",
        name: "Venomancer's Toxic Mantle",
        hero: "Venomancer",
        image: "/dota_item/venomaner_top.png",
        price: 18000,
        description: "Rare top item for Venomancer with poison effects"
      },
      {
        id: "6",
        name: "Mirana's Starfall Shoulders",
        hero: "Mirana",
        image: "/dota_item/mirana_shoulder.png",
        price: 32000,
        description: "Legendary shoulder item for Mirana with star effects"
      }
    ]
  },
  {
    id: "4",
    name: "TopUp1212",
    rating: 5.0,
    avatar: "/seller_ic/t12_ic.png",
    items: [
      {
        id: "7",
        name: "Chaos Knight's Armor",
        hero: "Chaos Knight",
        image: "/dota_item/ck_shoulder.png",
        price: 35000,
        description: "Mythical shoulder armor for Chaos Knight"
      },
      {
        id: "8",
        name: "Night Stalker's Wings",
        hero: "Night Stalker",
        image: "/dota_item/ns_wings.png",
        price: 27000,
        description: "Rare wings for Night Stalker with night effects"
      }
    ]
  },
  {
    id: "5",
    name: "Legenda TopUp",
    rating: 5.0,
    avatar: "/seller_ic/lgt_ic.png",
    items: [
      {
        id: "9",
        name: "Axe's Mythical Axe",
        hero: "Axe",
        image: "/dota_item/axe_myth.png",
        price: 29000,
        description: "Mythical weapon for Axe with custom animations"
      },
      {
        id: "10",
        name: "Nyx's Immortal Carapace",
        hero: "Nyx Assassin",
        image: "/dota_item/nyx_immo.png",
        price: 1200000,
        description: "Immortal back item for Nyx Assassin"
      }
    ]
  }
]

export default function SellerPage({ params }: { params: { slug: string } }) {
  // Find the seller based on the slug
  const seller = agents.find(agent => 
    agent.name.toLowerCase().replace(/\s+/g, '-') === params.slug
  )

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
              href={`/dota-items/${item.id}`}
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
                    {item.hero}
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