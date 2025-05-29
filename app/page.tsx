"use client"
import dynamic from 'next/dynamic'
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Button } from "@/components/ui/button"
import { ChevronRight, Gamepad2, Gift, CreditCard, ArrowRight, Smartphone, Monitor, Globe, Users, LucideProps, CheckCircle2, Zap, Shield, Sparkles, Search, ShoppingCart, User, LogOut } from "lucide-react"
import Link from "next/link"
import { products } from "@/lib/data"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import { formatPrice } from "@/lib/data"
import { useRef, useState, useEffect } from "react"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useUser } from "@/contexts/user-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

export default function Home() {
  const { user, logout } = useUser()
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [openQna, setOpenQna] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    setShowSearchResults(query.length > 0)
  }

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 3,
      spacing: 30,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(max-width: 480px)": {
        slides: { perView: 1, spacing: 10 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  const servicesRef = useRef<HTMLDivElement>(null)
  
  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const categories = [
    { name: "PC Gaming", icon: (props: LucideProps) => <Monitor {...props} /> },
    { name: "Console Gaming", icon: (props: LucideProps) => <Gamepad2 {...props} /> },
    { name: "Mobile Gaming", icon: (props: LucideProps) => <Smartphone {...props} /> },
    { name: "Online Gaming", icon: (props: LucideProps) => <Globe {...props} /> },
  ]

  const heroSlides = [
    {
      key: "slide1",
      bg: "/banner_01.jpg",
      title: "Mobile Legends: Bang Bang",
      subtitle: "Get your Starlight, Diamonds, and more!",
    },
    {
      key: "slide2",
      bg: "/banner_02.jpg",
      title: "Free Fire",
      subtitle: "Top up your Diamonds and enjoy the battle!",
    },
    {
      key: "slide3",
      bg: "/banner_03.jpg",
      title: "PUBG Mobile",
      subtitle: "Get your UC and dominate the battleground!",
    },
    {
      key: "slide4",
      bg: "/banner_04.webp",
      title: "Honor of Kings",
      subtitle: "Ultimate 5v5 Hero Battle Game",
    },
    {
      key: "slide5",
      bg: "/banner_05.jpg",
      title: "Ragnarok Guild Championship",
      subtitle: "Join the adventure and win rewards!",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    centerMode: true,
    centerPadding: "18%",
    swipeToSlide: true,
    swipe: true,
    touchMove: true,
    customPaging: () => (
      <div className="my-3 h-3 transition-all duration-200">
        <div
          className="!mx-[8px] h-3 w-3 rounded-[4px] bg-blue-600/50 \
          hover:bg-blue-600 [.slick-active_&]:w-6 [.slick-active_&]:bg-blue-600"
        />
      </div>
    ),
    dotsClass: "slick-dots flex justify-center w-full",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "18%",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "18%",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "10%",
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0",
          centerMode: false,
        },
      },
    ],
  };

  const marketplaceFeatures = [
    {
      name: 'Top Up Game Credits',
      description: 'Instantly top up your favorite games with a variety of payment methods.',
      icon: <Gamepad2 className="h-8 w-8 text-blue-400" />,
    },
    {
      name: 'Gift Cards',
      description: 'Purchase digital gift cards for popular platforms and games.',
      icon: <Gift className="h-8 w-8 text-purple-400" />,
    },
    {
      name: 'Fast Delivery',
      description: 'Receive your codes and credits within seconds after payment.',
      icon: <Zap className="h-8 w-8 text-yellow-400" />,
    },
    {
      name: 'Secure Payment',
      description: 'Shop with confidence using our secure and trusted payment system.',
      icon: <CreditCard className="h-8 w-8 text-green-400" />,
    },
    {
      name: '24/7 Support',
      description: 'Our support team is ready to help you anytime, anywhere.',
      icon: <Users className="h-8 w-8 text-pink-400" />,
    },
    {
      name: 'Promos & Discounts',
      description: 'Enjoy regular promotions and exclusive discounts for members.',
      icon: <Sparkles className="h-8 w-8 text-orange-400" />,
    },
  ];

  const qnaList = [
    {
      question: "Apakah Diamonds/Chips/Item Game dari pocergeming.com Legal?",
      answer: (
        <span>
          Semua Diamonds, item dalam game, dan voucher yang dijual di pocergeming.com <b>100% legal dan bersumber dari developer/publisher</b>. Jangan khawatir, berbelanja di Tokogame.com dijamin aman.
        </span>
      ),
    },
    {
      question: "Bagaimana Cara Top-Up Diamonds atau Beli Voucher?", 
      answer: (
        <span>
          Cukup pilih game Anda, pilih item atau voucher yang diinginkan, masukkan ID pemain, dan selesaikan pembayaran. Pesanan Anda akan diproses secara instan!
        </span>
      ),
    },
    {
      question: "Apakah Bisa Bayar Menggunakan QRIS?",
      answer: (
        <span>
          Ya, pocergeming.com mendukung berbagai metode pembayaran termasuk QRIS dan Virtual Account.
        </span>
      ),
    },
    {
      question: "Pembayaran Berhasil, Tapi Item Belum Diterima?",
      answer: (
        <span>
          Silakan hubungi layanan pelanggan kami dengan detail pesanan Anda. Kami akan membantu menyelesaikan masalah Anda secepatnya.
        </span>
      ),
    },
    {
      question: "Mengapa Harus Beli di pocergeming.com?",
      answer: (
        <span>
          Kami menawarkan pengiriman cepat, pembayaran aman, dan hanya produk resmi dan legal. Kepuasan dan keamanan Anda adalah prioritas kami!
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col bg-white text-gray-900">
      {isMounted ? (
        <>
          {/* Hero Section as Simple Carousel */}
          <section className="relative mb-12 mt-32 max-h-[500px]">
            <div className="w-full mx-auto sm:-ml-4">
              <Slider
                {...sliderSettings}
                className="h-full max-h-[500px] [&_.slick-list]:h-full [&_.slick-slide.slick-active]:opacity-100 [&_.slick-slide]:ml-0 [&_.slick-slide]:opacity-70 [&_.slick-slide]:px-2 [&_.slick-track]:h-full"
              >
                {heroSlides.map((slide) => (
                  <div key={slide.key} className="relative aspect-[2/1] flex items-center justify-center px-2">
                    <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl">
                      <img src={slide.bg} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50" />
                      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full h-full p-6 md:p-16">
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">{slide.title}</h2>
                        <span className="text-base sm:text-lg md:text-2xl text-white/80 font-medium drop-shadow-lg">{slide.subtitle}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </section>

          {/* Featured Products Section */}
          <section ref={servicesRef} className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-900 rounded-full text-sm font-medium mb-4 border border-gray-200">
                  Produk Unggulan
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Voucher Game</span> Terpopuler
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Pilih dari berbagai macam voucher digital dan kredit game yang kami sediakan
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-8">
                {products.map((product) => (
                  <Link href={`/products/${product.id}`} key={product.id}>
                    <Card className="overflow-hidden rounded-2xl shadow-md bg-white border border-gray-100 group relative hover:scale-105 transition-transform duration-200">
                      <div className="relative aspect-[4/5] w-full">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent" />
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] flex flex-col items-center space-y-2">
                          <div className="w-full px-3 py-1.5 rounded-full bg-blue-500">
                            <p className="text-white font-medium text-sm text-center break-words line-clamp-2">
                              More
                            </p>
                          </div>
                          <span className="text-sm text-white font-medium text-center truncate w-full">
                            {product.name}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>

            </div>
          </section>

          {/* Game Items Section */}
          <section className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-900 rounded-full text-sm font-medium mb-4 border border-gray-200">
                  Game Items
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Dota 2</span> Items
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Exclusive Dota 2 items and sets from The International
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[
                   {
                    id: "1",
                    name: "Doom's Infernal Blade",
                    hero: "Doom",
                    image: "/dota_item/doom_weapon.png",
                    price: 25000,
                    description: "Mythical weapon for Doom with custom particle effects",
                    seller: {
                      id: "1",
                      name: "Genggam Dunia Game",
                      rating: 5.0,
                      avatar: "/seller_ic/gdg_ic.png",
                      slug: "genggam-dunia-game"
                    }
                  },
                  {
                    id: "2",
                    name: "Terrorblade's Demon Edge",
                    hero: "Terrorblade",
                    image: "/dota_item/tb_full.png",
                    price: 30000,
                    description: "Legendary weapon for Terrorblade with demonic effects",
                    seller: {
                      id: "1",
                      name: "Genggam Dunia Game",
                      rating: 5.0,
                      avatar: "/seller_ic/gdg_ic.png",
                      slug: "genggam-dunia-game"
                    }
                  },
                  {
                    id: "3",
                    name: "Ursa's Savage Claws",
                    hero: "Ursa",
                    image: "/dota_item/ursa_back.png",
                    price: 22000,
                    description: "Rare back item for Ursa with custom animations",
                    seller: {
                      id: "2",
                      name: "Sahabat Gaming",
                      rating: 5.0,
                      avatar: "/seller_ic/sg_ic.png",
                      slug: "sahabat-gaming"
                    }
                  },
                  {
                    id: "4",
                    name: "Razor's Storm Blade",
                    hero: "Razor",
                    image: "/dota_item/razor_weapon.png",
                    price: 28000,
                    description: "Epic weapon for Razor with lightning effects",
                    seller: {
                      id: "2",
                      name: "Sahabat Gaming",
                      rating: 5.0,
                      avatar: "/seller_ic/sg_ic.png",
                      slug: "sahabat-gaming"
                    }
                  },
                  {
                    id: "5",
                    name: "Venomancer's Toxic Mantle",
                    hero: "Venomancer",
                    image: "/dota_item/venomaner_top.png",
                    price: 18000,
                    description: "Rare top item for Venomancer with poison effects",
                    seller: {
                      id: "3",
                      name: "Kasih Game Store",
                      rating: 5.0,
                      avatar: "/seller_ic/kgs_ic.png",
                      slug: "kasih-game-store"
                    }
                  }
                ].map((item) => (
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
                        <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
                          {item.hero}
                        </div>
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                          {item.name}
                        </h3>
                        <div className="h-10 mb-2">
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <p className="text-blue-600 font-semibold">
                            {item.price.toLocaleString('id-ID')} IDR
                          </p>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <Link 
                            href={`/seller/${item.seller.slug}`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              router.push(`/seller/${item.seller.slug}`);
                            }}
                            className="flex items-center gap-2 hover:bg-gray-50 p-1 rounded-md transition-colors"
                          >
                            <Image
                              src={item.seller.avatar}
                              alt={item.seller.name}
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600">
                                {item.seller.name}
                              </p>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={cn(
                                      "w-3 h-3",
                                      i < Math.floor(item.seller.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                    )}
                                  />
                                ))}
                                <span className="text-xs text-gray-500 ml-1">
                                  ({item.seller.rating})
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

              <div className="text-center mt-12">
                <Link 
                  href="/items"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Show More Items
                </Link>
              </div>
            </div>
          </section>

          {/* QnA Section */}
          <section className="max-w-3xl mx-auto w-full mb-16 px-2 sm:px-0">
            <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-xl p-2 sm:p-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-blue-700 font-sans tracking-tight">QnA</h2>
              {qnaList.map((qna, idx) => (
                <div key={qna.question} className="relative group">
                  <button
                    className={`w-full flex items-center justify-between py-6 px-4 sm:px-8 text-lg sm:text-xl font-semibold font-sans rounded-xl transition-all duration-200 text-gray-900 hover:bg-blue-50 focus:outline-none ${openQna === idx ? "bg-blue-50" : ""}`}
                    onClick={() => setOpenQna(openQna === idx ? null : idx)}
                    style={{ position: 'relative' }}
                  >
                    {/* Accent bar for active */}
                    <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-10 w-1 rounded bg-blue-500 transition-all duration-300 ${openQna === idx ? 'opacity-100' : 'opacity-0'}`}></span>
                    <span className="text-left w-full flex-1 font-[600] font-sans" style={{fontFamily: 'Rajdhani, sans-serif'}}>{qna.question}</span>
                    <ChevronRight className={`ml-2 h-6 w-6 transition-transform duration-300 ${openQna === idx ? "rotate-90 text-blue-600" : "text-gray-400"}`} />
                  </button>
                  <div
                    style={{
                      maxHeight: openQna === idx ? 200 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
                    }}
                  >
                    {openQna === idx && (
                      <div className="px-4 sm:px-8 pb-6 pt-2 text-center text-base sm:text-lg text-gray-800 font-sans animate-fade-in">
                        {qna.answer}
                      </div>
                    )}
                  </div>
                  {idx !== qnaList.length - 1 && (
                    <div className="mx-4 sm:mx-8 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent my-1" />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Reseller Section */}
          <section className="py-24 relative">
            <div className="max-w-6xl mx-auto px-4">
              <div className="relative w-full">
                <img
                  src="/reseller_banner.png"
                  alt="Reseller Program pocergeming.com"
                  className="w-full object-cover h-[400px] transition-transform duration-300 group-hover:scale-105"
                  style={{ borderRadius: '1rem' }}
                />
              </div>
              <div className="p-8 text-center relative">
                <div className="absolute inset-0 pointer-events-none" />
                <div className="relative z-10">
                  <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-4">
                    Program Partnership pocergeming.com
                  </h2>
                  <p className="text-gray-600 mb-6 text-lg max-w-2xl mx-auto">
                    Bergabunglah dengan program partnership kami dan dapatkan keuntungan menarik dengan menjual item game anda pada website kami.
                  </p>
                  <Link href="/partnership" className="">
                    <div className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors hover:translate-x-1 duration-200">
                      Learn More <ChevronRight className="w-5 h-5 ml-1" />
                    </div>
                  </Link>
                </div>
              </div>

              {/* Payment Methods Slider */}
              <div className="mt-12 w-full overflow-hidden bg-gradient-to-r from-white/80 via-blue-50/30 to-white/80 rounded-2xl backdrop-blur-sm border border-blue-100/50 shadow-lg">
                <div className="relative flex items-center py-10">
                  <div className="absolute left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10" />
                  <div className="absolute right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10" />
                  <style jsx>{`
                    @keyframes slide {
                      from {
                        transform: translateX(0);
                      }
                      to {
                        transform: translateX(-50%);
                      }
                    }
                    .animate-slide {
                      animation: slide 10s linear infinite;
                    }
                    .animate-slide:hover {
                      animation-play-state: paused;
                    }
                  `}</style>
                  <div className="flex animate-slide">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="flex gap-12 px-12">
                        <div className="flex items-center justify-center bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 w-32 h-16">
                          <img src="https://www.lapakgaming.com/static/images/payment-methods/dana.webp?w=128&q=75" alt="Dana" className="h-8 object-contain hover:scale-110 transition-transform duration-200" />
                        </div>
                        <div className="flex items-center justify-center bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 w-32 h-16">
                          <img src="https://www.lapakgaming.com/static/images/payment-methods/gopay.webp?w=128&q=75" alt="Gopay" className="h-8 object-contain hover:scale-110 transition-transform duration-200" />
                        </div>
                        <div className="flex items-center justify-center bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 w-32 h-16">
                          <img src="https://www.lapakgaming.com/static/images/payment-methods/shopeepay-horizontal.webp?w=128&q=75" alt="ShopeePay" className="h-8 object-contain hover:scale-110 transition-transform duration-200" />
                        </div>
                        <div className="flex items-center justify-center bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 w-32 h-16">
                          <img src="https://www.lapakgaming.com/static/images/payment-methods/ovo.webp?w=128&q=75" alt="OVO" className="h-8 object-contain hover:scale-110 transition-transform duration-200" />
                        </div>
                        <div className="flex items-center justify-center bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 w-32 h-16">
                          <img src="https://imgop.itemku.com/?url=https%3A%2F%2Ffiles.itemku.com%2Flogo%2Fpayment%2Fqris.png&w=96&q=75" alt="QRIS" className="h-8 object-contain hover:scale-110 transition-transform duration-200" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center pb-8">
                  <p className="text-sm text-gray-500 font-medium">Supported Payment Methods</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section as Marketplace */}
          {/* <section className="py-24 relative">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <span className="inline-block px-3 py-1 bg-white/5 text-white rounded-full text-sm font-medium mb-4 border border-white/10">
                  Marketplace Services
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Explore Our <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Marketplace</span>
                </h2>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                  All your gaming needs in one place
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {marketplaceFeatures.map((feature) => (
                  <div
                    key={feature.name}
                    className="bg-black/60 p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col items-center text-center shadow-lg"
                  >
                    <div className="mb-6">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{feature.name}</h3>
                    <p className="text-white/60 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section> */}

          {/* CTA Section */}
          {/* <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-transparent" />
            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Top Up</span> Your Games?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Get instant access to your favorite games with our secure and fast digital vouchers
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/marketplace">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium shadow-lg shadow-blue-500/20">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-medium backdrop-blur-sm">
                  View All Products
                </Button>
              </div>
            </div>
          </section> */}

          {/* Floating WhatsApp Button */}
          <a
            href="https://wa.me/6285811959392"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed z-50 bottom-6 right-6 group"
            aria-label="Chat via WhatsApp"
          >
            <div className="relative">
              {/* Outer pulse effect */}
              <div className="absolute inset-0 rounded-full animate-ping bg-green-500 opacity-20"></div>
              {/* Inner pulse effect */}
              <div className="absolute inset-0 rounded-full animate-pulse-slow bg-green-400 opacity-40"></div>
              {/* Floating animation container */}
              <div className="animate-float">
                <img
                  src="/wa_img.png"
                  alt="WhatsApp Chat"
                  className="w-16 h-16 rounded-full shadow-lg border-4 border-white p-2 transition-transform duration-200 group-hover:scale-110 group-hover:shadow-2xl relative z-10"
                />
              </div>
            </div>
            <style jsx>{`
              @keyframes float {
                0%, 100% {
                  transform: translateY(0);
                }
                50% {
                  transform: translateY(-10px);
                }
              }
              @keyframes pulse-slow {
                0%, 100% {
                  transform: scale(1);
                  opacity: 0.4;
                }
                50% {
                  transform: scale(1.1);
                  opacity: 0.2;
                }
              }
              .animate-float {
                animation: float 3s ease-in-out infinite;
              }
              .animate-pulse-slow {
                animation: pulse-slow 3s ease-in-out infinite;
              }
            `}</style>
          </a>
        </>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  )
}

const features = [
  {
    name: 'Instant Delivery',
    description: 'Get your game vouchers and credits instantly after purchase.',
    icon: <Zap className="h-6 w-6 text-blue-400" />,
    benefits: [
      'Digital delivery within minutes',
      'No waiting time',
      '24/7 availability'
    ]
  },
  {
    name: 'Secure Payments',
    description: 'Shop with confidence using our secure payment system.',
    icon: <Shield className="h-6 w-6 text-blue-400" />,
    benefits: [
      'Multiple payment methods',
      'SSL encryption',
      'Secure checkout process'
    ]
  },
  {
    name: 'Wide Selection',
    description: 'Access to all major gaming platforms and titles.',
    icon: <Gamepad2 className="h-6 w-6 text-blue-400" />,
    benefits: [
      'All major gaming platforms',
      'Popular game titles',
      'Regular new additions'
    ]
  },
]