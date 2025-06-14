"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Voucher {
  id: string;
  name: string;
  game: string;
  image: string;
  price: number;
  description: string;
  seller: {
    id: string;
    name: string;
    rating: number;
    avatar: string;
    slug: string;
  };
}

export default function VoucherPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState('all');
  const [sortBy, setSortBy] = useState('price-asc');
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Hardcoded vouchers with 5 different sellers
    const hardcodedVouchers = [
      {
        id: "ml80",
        name: "MOBILELEGEND - 80 Diamond",
        game: "Mobile Legends",
        image: "https://static-src.vocagame.com/vocagame/mobilelegends-4702-original.webp",
        price: 21028,
        description: "80 Diamonds for Mobile Legends",
        seller: {
          id: "1",
          name: "Genggam Dunia Game",
          rating: 4.9,
          avatar: "/seller_ic/gdg_ic.png",
          slug: "genggam-dunia-game"
        }
      },
      {
        id: "ml85",
        name: "MOBILELEGEND - 85 Diamond",
        game: "Mobile Legends",
        image: "https://static-src.vocagame.com/vocagame/mobilelegends-4702-original.webp",
        price: 24780,
        description: "85 Diamonds for Mobile Legends",
        seller: {
          id: "2",
          name: "Kasih Game Store",
          rating: 4.8,
          avatar: "/seller_ic/kgs_ic.png",
          slug: "kasih-game-store"
        }
      },
      {
        id: "ml86",
        name: "MOBILELEGEND - 86 Diamond",
        game: "Mobile Legends",
        image: "https://static-src.vocagame.com/vocagame/mobilelegends-4702-original.webp",
        price: 24010,
        description: "86 Diamonds for Mobile Legends",
        seller: {
          id: "3",
          name: "Legenda Topup",
          rating: 4.7,
          avatar: "/seller_ic/lgt_ic.png",
          slug: "legenda-topup"
        }
      },
      {
        id: "ml88",
        name: "MOBILELEGEND - 88 Diamond",
        game: "Mobile Legends",
        image: "https://static-src.vocagame.com/vocagame/mobilelegends-4702-original.webp",
        price: 22814,
        description: "88 Diamonds for Mobile Legends",
        seller: {
          id: "4",
          name: "Sahabat Gaming",
          rating: 4.9,
          avatar: "/seller_ic/sg_ic.png",
          slug: "sahabat-gaming"
        }
      },
      {
        id: "ml89",
        name: "MOBILELEGEND - 89 Diamond",
        game: "Mobile Legends",
        image: "https://static-src.vocagame.com/vocagame/mobilelegends-4702-original.webp",
        price: 23271,
        description: "89 Diamonds for Mobile Legends",
        seller: {
          id: "5",
          name: "TopUp1212",
          rating: 4.8,
          avatar: "/seller_ic/t12_ic.png",
          slug: "topup1212"
        }
      },
      {
        id: "ml90",
        name: "MOBILELEGEND - 90 Diamond",
        game: "Mobile Legends",
        image: "https://static-src.vocagame.com/vocagame/mobilelegends-4702-original.webp",
        price: 23241,
        description: "90 Diamonds for Mobile Legends",
        seller: {
          id: "1",
          name: "Genggam Dunia Game",
          rating: 4.9,
          avatar: "/seller_ic/gdg_ic.png",
          slug: "genggam-dunia-game"
        }
      },
      {
        id: "mlweek",
        name: "MOBILE LEGENDS Weekly Diamond Pass",
        game: "Mobile Legends",
        image: "https://static-src.vocagame.com/vocagame/mobilelegends-4702-original.webp",
        price: 21000,
        description: "Weekly Diamond Pass for Mobile Legends",
        seller: {
          id: "2",
          name: "Kasih Game Store",
          rating: 4.8,
          avatar: "/seller_ic/kgs_ic.png",
          slug: "kasih-game-store"
        }
      },
      {
        id: "pbgrp",
        name: "Pubg Royale Pass",
        game: "PUBG Mobile",
        image: "https://static-src.vocagame.com/vocagame/pubg_global-afab-original.webp",
        price: 142200,
        description: "Royal Pass + Bonus for PUBG Mobile",
        seller: {
          id: "3",
          name: "Legenda Topup",
          rating: 4.7,
          avatar: "/seller_ic/lgt_ic.png",
          slug: "legenda-topup"
        }
      },
      {
        id: "pm105",
        name: "PUBG MOBILE 105 UC",
        game: "PUBG Mobile",
        image: "https://static-src.vocagame.com/vocagame/pubg_global-afab-original.webp",
        price: 27125,
        description: "105 UC for PUBG Mobile",
        seller: {
          id: "4",
          name: "Sahabat Gaming",
          rating: 4.9,
          avatar: "/seller_ic/sg_ic.png",
          slug: "sahabat-gaming"
        }
      },
      {
        id: "pm120",
        name: "PUBG MOBILE 120 UC",
        game: "PUBG Mobile",
        image: "https://static-src.vocagame.com/vocagame/pubg_global-afab-original.webp",
        price: 26874,
        description: "120 UC for PUBG Mobile",
        seller: {
          id: "5",
          name: "TopUp1212",
          rating: 4.8,
          avatar: "/seller_ic/t12_ic.png",
          slug: "topup1212"
        }
      },
      {
        id: "pm122",
        name: "PUBG MOBILE 122 UC",
        game: "PUBG Mobile",
        image: "https://static-src.vocagame.com/vocagame/pubg_global-afab-original.webp",
        price: 40682,
        description: "122 UC for PUBG Mobile",
        seller: {
          id: "1",
          name: "Genggam Dunia Game",
          rating: 4.9,
          avatar: "/seller_ic/gdg_ic.png",
          slug: "genggam-dunia-game"
        }
      },
      {
        id: "pm125",
        name: "PUBG MOBILE 125 UC",
        game: "PUBG Mobile",
        image: "https://static-src.vocagame.com/vocagame/pubg_global-afab-original.webp",
        price: 48500,
        description: "125 UC for PUBG Mobile",
        seller: {
          id: "2",
          name: "Kasih Game Store",
          rating: 4.8,
          avatar: "/seller_ic/kgs_ic.png",
          slug: "kasih-game-store"
        }
      },
      {
        id: "pm131",
        name: "PUBG MOBILE 131 UC",
        game: "PUBG Mobile",
        image: "https://static-src.vocagame.com/vocagame/pubg_global-afab-original.webp",
        price: 40681,
        description: "131 UC for PUBG Mobile",
        seller: {
          id: "3",
          name: "Legenda Topup",
          rating: 4.7,
          avatar: "/seller_ic/lgt_ic.png",
          slug: "legenda-topup"
        }
      },
      {
        id: "pm62",
        name: "PUBG MOBILE 62 UC",
        game: "PUBG Mobile",
        image: "https://static-src.vocagame.com/vocagame/pubg_global-afab-original.webp",
        price: 27125,
        description: "62 UC for PUBG Mobile",
        seller: {
          id: "4",
          name: "Sahabat Gaming",
          rating: 4.9,
          avatar: "/seller_ic/sg_ic.png",
          slug: "sahabat-gaming"
        }
      },
      {
        id: "pm70",
        name: "PUBG MOBILE 70 UC",
        game: "PUBG Mobile",
        image: "https://static-src.vocagame.com/vocagame/pubg_global-afab-original.webp",
        price: 21107,
        description: "70 UC for PUBG Mobile",
        seller: {
          id: "5",
          name: "TopUp1212",
          rating: 4.8,
          avatar: "/seller_ic/t12_ic.png",
          slug: "topup1212"
        }
      }
    ];

    setVouchers(hardcodedVouchers);
    setLoading(false);
  }, []);

  const filteredVouchers = vouchers
    .filter(voucher => {
      const matchesSearch = voucher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        voucher.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGame = selectedGame === 'all' || voucher.game === selectedGame;
      return matchesSearch && matchesGame;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  const games = Array.from(new Set(vouchers.map(v => v.game)));

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading vouchers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center text-red-600">
          <p>Error: {error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Game Vouchers</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search vouchers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Select value={selectedGame} onValueChange={setSelectedGame}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select game" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Games</SelectItem>
              {games.map(game => (
                <SelectItem key={game} value={game}>{game}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVouchers.map((voucher) => (
          <Link
            key={voucher.id}
            href={`/exclusive-voucher/${voucher.id}`}
            className="group"
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="relative aspect-square">
                <Image
                  src={voucher.image}
                  alt={voucher.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
                  {voucher.game}
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                  {voucher.name}
                </h3>
                <div className="h-10 mb-2">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {voucher.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-blue-600 font-semibold">
                    {voucher.price.toLocaleString('id-ID')} IDR
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <Link 
                    href={`/seller/${voucher.seller.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      router.push(`/seller/${voucher.seller.slug}`);
                    }}
                    className="flex items-center gap-2 hover:bg-gray-50 p-1 rounded-md transition-colors"
                  >
                    <Image
                      src={voucher.seller.avatar}
                      alt={voucher.seller.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600">
                        {voucher.seller.name}
                      </p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-3 h-3",
                              i < Math.floor(voucher.seller.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            )}
                          />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">
                          ({voucher.seller.rating})
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 