"use client"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Button } from "@/components/ui/button"
import { ChevronRight, Gamepad2, Gift, CreditCard, ArrowRight, Smartphone, Monitor, Globe, Users, LucideProps, CheckCircle2, Zap, Shield, Sparkles, Search, ShoppingCart, User, LogOut } from "lucide-react"
import Link from "next/link"
import { products } from "@/lib/data"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import { formatPrice } from "@/lib/data"
import { useRef, useState } from "react"
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

export default function Home() {
  const { user, logout } = useUser()
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)

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

  return (
    <div className="flex flex-col bg-white text-gray-900">
      {/* Hero Section as Simple Carousel */}
      <section className="relative mb-12 mt-32 max-h-[500px]">
        <div className="w-full mx-auto -ml-4">
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
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
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
          
          {/* <div className="mt-12 text-center">
            <Link href="/marketplace">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium shadow-lg shadow-blue-500/20">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div> */}
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