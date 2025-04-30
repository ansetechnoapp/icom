import { HeroCarousel } from "../src/components/sections/hero-carousel";
import { CategoryShowcase } from "../src/components/sections/category-showcase";
import { FeaturedProducts } from "../src/components/sections/featured-products";
import { PartnerBrands } from "../src/components/sections/partner-brands";
import { WhyChooseUs } from "../src/components/sections/why-choose-us";
import { Testimonials } from "../src/components/sections/testimonials";
import { Newsletter } from "../src/components/sections/newsletter";

// Mock data for development
const categories = [
  {
    id: "1",
    name: "CPUs",
    slug: "cpus",
    image: "/images/categories/cpu.jpg",
    featured: true,
  },
  {
    id: "2",
    name: "Graphics Cards",
    slug: "graphics-cards",
    image: "/images/categories/gpu.jpg",
    featured: true,
  },
  {
    id: "3",
    name: "Motherboards",
    slug: "motherboards",
    image: "/images/categories/motherboard.jpg",
    featured: false,
  },
  {
    id: "4",
    name: "Memory",
    slug: "memory",
    image: "/images/categories/ram.jpg",
    featured: false,
  },
  {
    id: "5",
    name: "Storage",
    slug: "storage",
    image: "/images/categories/storage.jpg",
    featured: false,
  },
  {
    id: "6",
    name: "Cases",
    slug: "cases",
    image: "/images/categories/case.jpg",
    featured: false,
  },
  {
    id: "7",
    name: "Power Supplies",
    slug: "power-supplies",
    image: "/images/categories/psu.jpg",
    featured: false,
  },
  {
    id: "8",
    name: "Cooling",
    slug: "cooling",
    image: "/images/categories/cooling.jpg",
    featured: false,
  },
  {
    id: "9",
    name: "Peripherals",
    slug: "peripherals",
    image: "/images/categories/peripherals.jpg",
    featured: false,
  },
  {
    id: "10",
    name: "Monitors",
    slug: "monitors",
    image: "/images/categories/monitor.jpg",
    featured: false,
  },
  {
    id: "11",
    name: "Networking",
    slug: "networking",
    image: "/images/categories/networking.jpg",
    featured: false,
  },
  {
    id: "12",
    name: "Software",
    slug: "software",
    image: "/images/categories/software.jpg",
    featured: false,
  },
];

const featuredProducts = [
  {
    id: "1",
    name: "NVIDIA GeForce RTX 4080 Super 16GB GDDR6X Graphics Card",
    slug: "nvidia-geforce-rtx-4080-super",
    price: 1199.99,
    salePrice: 1099.99,
    images: [
      "/images/products/gpu-1.jpg",
      "/images/products/gpu-1-2.jpg",
    ],
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
    stock: 15,
  },
  {
    id: "2",
    name: "AMD Ryzen 9 7950X 16-Core, 32-Thread Processor",
    slug: "amd-ryzen-9-7950x",
    price: 699.99,
    salePrice: 649.99,
    images: [
      "/images/products/cpu-1.jpg",
      "/images/products/cpu-1-2.jpg",
    ],
    rating: 4.9,
    reviewCount: 87,
    isNew: true,
    stock: 22,
  },
  {
    id: "3",
    name: "ASUS ROG Strix X670E-E Gaming WiFi ATX Motherboard",
    slug: "asus-rog-strix-x670e-e-gaming",
    price: 499.99,
    images: [
      "/images/products/motherboard-1.jpg",
      "/images/products/motherboard-1-2.jpg",
    ],
    rating: 4.7,
    reviewCount: 56,
    isNew: false,
    stock: 8,
  },
  {
    id: "4",
    name: "Corsair Vengeance RGB Pro 32GB (2x16GB) DDR5 6000MHz",
    slug: "corsair-vengeance-rgb-pro-32gb-ddr5",
    price: 189.99,
    salePrice: 169.99,
    images: [
      "/images/products/ram-1.jpg",
      "/images/products/ram-1-2.jpg",
    ],
    rating: 4.6,
    reviewCount: 42,
    isNew: false,
    stock: 30,
  },
  {
    id: "5",
    name: "Samsung 990 PRO 2TB NVMe SSD M.2 PCIe Gen 4",
    slug: "samsung-990-pro-2tb-nvme-ssd",
    price: 249.99,
    images: [
      "/images/products/ssd-1.jpg",
      "/images/products/ssd-1-2.jpg",
    ],
    rating: 4.9,
    reviewCount: 78,
    isNew: true,
    stock: 25,
  },
  {
    id: "6",
    name: "Lian Li O11 Dynamic EVO ATX Mid Tower Case",
    slug: "lian-li-o11-dynamic-evo",
    price: 169.99,
    images: [
      "/images/products/case-1.jpg",
      "/images/products/case-1-2.jpg",
    ],
    rating: 4.8,
    reviewCount: 63,
    isNew: false,
    stock: 12,
  },
  {
    id: "7",
    name: "Corsair RM850x 850W 80+ Gold Fully Modular PSU",
    slug: "corsair-rm850x-850w",
    price: 149.99,
    salePrice: 129.99,
    images: [
      "/images/products/psu-1.jpg",
      "/images/products/psu-1-2.jpg",
    ],
    rating: 4.7,
    reviewCount: 51,
    isNew: false,
    stock: 18,
  },
  {
    id: "8",
    name: "NZXT Kraken X73 RGB 360mm AIO Liquid CPU Cooler",
    slug: "nzxt-kraken-x73-rgb",
    price: 199.99,
    images: [
      "/images/products/cooler-1.jpg",
      "/images/products/cooler-1-2.jpg",
    ],
    rating: 4.6,
    reviewCount: 37,
    isNew: false,
    stock: 0,
  },
];

const brands = [
  {
    id: "1",
    name: "NVIDIA",
    slug: "nvidia",
    logo: "/images/brands/nvidia.svg",
  },
  {
    id: "2",
    name: "AMD",
    slug: "amd",
    logo: "/images/brands/amd.svg",
  },
  {
    id: "3",
    name: "Intel",
    slug: "intel",
    logo: "/images/brands/intel.svg",
  },
  {
    id: "4",
    name: "ASUS",
    slug: "asus",
    logo: "/images/brands/asus.svg",
  },
  {
    id: "5",
    name: "MSI",
    slug: "msi",
    logo: "/images/brands/msi.svg",
  },
  {
    id: "6",
    name: "Gigabyte",
    slug: "gigabyte",
    logo: "/images/brands/gigabyte.svg",
  },
  {
    id: "7",
    name: "Corsair",
    slug: "corsair",
    logo: "/images/brands/corsair.svg",
  },
  {
    id: "8",
    name: "NZXT",
    slug: "nzxt",
    logo: "/images/brands/nzxt.svg",
  },
  {
    id: "9",
    name: "Samsung",
    slug: "samsung",
    logo: "/images/brands/samsung.svg",
  },
  {
    id: "10",
    name: "Western Digital",
    slug: "western-digital",
    logo: "/images/brands/wd.svg",
  },
  {
    id: "11",
    name: "Seagate",
    slug: "seagate",
    logo: "/images/brands/seagate.svg",
  },
  {
    id: "12",
    name: "Logitech",
    slug: "logitech",
    logo: "/images/brands/logitech.svg",
  },
];

const testimonials = [
  {
    id: "1",
    name: "Alex Johnson",
    role: "Gaming Enthusiast",
    avatar: "/images/testimonials/user1.jpg",
    content: "iCome Hardware has been my go-to for PC parts for years. Their selection is unmatched, and the customer service is exceptional. I recently built a new gaming rig with components exclusively from them, and the experience was seamless.",
    rating: 5,
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "Software Developer",
    avatar: "/images/testimonials/user2.jpg",
    content: "As a developer, I need reliable hardware for my workstation. iCome not only provided expert advice on the best components for my needs but also offered competitive prices. The PC I built with their parts has been running flawlessly for over a year.",
    rating: 5,
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    role: "Content Creator",
    avatar: "/images/testimonials/user3.jpg",
    content: "The PC configurator tool on iCome's website made it incredibly easy to select compatible components for my video editing workstation. Their fast shipping and excellent packaging ensured everything arrived in perfect condition.",
    rating: 4,
  },
  {
    id: "4",
    name: "Emily Taylor",
    role: "IT Professional",
    avatar: "/images/testimonials/user4.jpg",
    content: "I've been ordering hardware for our company's workstations from iCome for the past three years. Their business support is outstanding, and they've always been reliable with stock and delivery times, even during supply chain challenges.",
    rating: 5,
  },
];

export default function Home() {
  return (
    <>
      <HeroCarousel />

      <CategoryShowcase
        title="Shop by Category"
        categories={categories}
        className="pt-16"
      />

      <FeaturedProducts
        title="Featured Products"
        subtitle="Handpicked premium components for your next build"
        products={featuredProducts}
        viewAllLink="/shop"
      />

      <WhyChooseUs
        title="Why Choose Us"
        subtitle="We're committed to providing the best experience for PC enthusiasts"
      />

      <PartnerBrands
        title="Our Trusted Partners"
        subtitle="We work with the leading brands in the industry"
        brands={brands}
      />

      <Testimonials
        title="What Our Customers Say"
        subtitle="Don't just take our word for it"
        testimonials={testimonials}
      />

      <Newsletter
        title="Stay Updated"
        subtitle="Subscribe to our newsletter for exclusive deals, new arrivals, and tech tips"
      />
    </>
  );
}
