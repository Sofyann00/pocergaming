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
    const fetchVouchers = async () => {
      try {
        const response = await fetch('/api/digiflazz/price-list');
        if (!response.ok) {
          throw new Error('Failed to fetch vouchers');
        }
        const data = await response.json();
        
        // Check if data is an array and has items
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('No vouchers available');
        }

        // Transform the data to match our Voucher interface
        const transformedVouchers = data.map((item: any) => ({
          id: item.buyer_sku_code,
          name: item.product_name,
          game: item.category,
          image: item.icon_url || '/placeholder.png',
          price: item.price,
          description: item.desc || item.product_name,
          seller: {
            id: '1',
            name: 'Pocergaming',
            rating: 5.0,
            avatar: '/seller_ic/gdg_ic.png',
            slug: 'pocergaming'
          }
        }));

        setVouchers(transformedVouchers);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
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