import { Metadata } from "next";
import { Filter } from "lucide-react";
import { Button } from "../../src/components/ui/button";
import { FilterSidebar } from "../../src/components/shop/filter-sidebar";
import { ProductGrid } from "../../src/components/shop/product-grid";
import { MobileFilters } from "../../src/components/shop/mobile-filters";

export const metadata: Metadata = {
  title: "Shop | Computer Hardware & Components",
  description: "Browse our extensive collection of computer hardware and components. Find the perfect parts for your PC build.",
};

// Mock data for development
const categories = {
  id: "categories",
  name: "Categories",
  options: [
    { id: "cpus", name: "CPUs", count: 24 },
    { id: "graphics-cards", name: "Graphics Cards", count: 32 },
    { id: "motherboards", name: "Motherboards", count: 45 },
    { id: "memory", name: "Memory", count: 38 },
    { id: "storage", name: "Storage", count: 56 },
    { id: "cases", name: "Cases", count: 29 },
    { id: "power-supplies", name: "Power Supplies", count: 21 },
    { id: "cooling", name: "Cooling", count: 34 },
  ],
};

const brands = {
  id: "brands",
  name: "Brands",
  options: [
    { id: "nvidia", name: "NVIDIA", count: 18 },
    { id: "amd", name: "AMD", count: 24 },
    { id: "intel", name: "Intel", count: 16 },
    { id: "asus", name: "ASUS", count: 42 },
    { id: "msi", name: "MSI", count: 38 },
    { id: "gigabyte", name: "Gigabyte", count: 35 },
    { id: "corsair", name: "Corsair", count: 29 },
    { id: "nzxt", name: "NZXT", count: 15 },
  ],
};

const priceRange = {
  min: 0,
  max: 2000,
};

const specifications = [
  {
    id: "memory",
    name: "Memory Size",
    options: [
      { id: "4gb", name: "4GB", count: 12 },
      { id: "8gb", name: "8GB", count: 24 },
      { id: "16gb", name: "16GB", count: 36 },
      { id: "32gb", name: "32GB", count: 18 },
      { id: "64gb", name: "64GB", count: 6 },
    ],
  },
  {
    id: "storage",
    name: "Storage Capacity",
    options: [
      { id: "256gb", name: "256GB", count: 15 },
      { id: "512gb", name: "512GB", count: 28 },
      { id: "1tb", name: "1TB", count: 42 },
      { id: "2tb", name: "2TB", count: 24 },
      { id: "4tb", name: "4TB", count: 10 },
    ],
  },
  {
    id: "cores",
    name: "CPU Cores",
    options: [
      { id: "4-cores", name: "4 Cores", count: 8 },
      { id: "6-cores", name: "6 Cores", count: 16 },
      { id: "8-cores", name: "8 Cores", count: 24 },
      { id: "12-cores", name: "12 Cores", count: 12 },
      { id: "16-cores", name: "16+ Cores", count: 6 },
    ],
  },
];

const products = [
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
  {
    id: "9",
    name: "Intel Core i9-14900K Desktop Processor",
    slug: "intel-core-i9-14900k",
    price: 589.99,
    images: [
      "/images/products/cpu-1.jpg",
      "/images/products/cpu-1-2.jpg",
    ],
    rating: 4.8,
    reviewCount: 65,
    isNew: true,
    stock: 14,
  },
  {
    id: "10",
    name: "MSI MPG Z790 CARBON WIFI Gaming Motherboard",
    slug: "msi-mpg-z790-carbon-wifi",
    price: 399.99,
    salePrice: 369.99,
    images: [
      "/images/products/motherboard-1.jpg",
      "/images/products/motherboard-1-2.jpg",
    ],
    rating: 4.7,
    reviewCount: 42,
    isNew: false,
    stock: 10,
  },
  {
    id: "11",
    name: "G.SKILL Trident Z5 RGB 32GB (2 x 16GB) DDR5 6400",
    slug: "gskill-trident-z5-rgb-32gb",
    price: 219.99,
    images: [
      "/images/products/ram-1.jpg",
      "/images/products/ram-1-2.jpg",
    ],
    rating: 4.8,
    reviewCount: 36,
    isNew: false,
    stock: 22,
  },
  {
    id: "12",
    name: "WD_BLACK SN850X 1TB NVMe SSD",
    slug: "wd-black-sn850x-1tb",
    price: 149.99,
    salePrice: 129.99,
    images: [
      "/images/products/ssd-1.jpg",
      "/images/products/ssd-1-2.jpg",
    ],
    rating: 4.9,
    reviewCount: 58,
    isNew: false,
    stock: 35,
  },
];

export default function ShopPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Computer Hardware
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse our extensive collection of computer components and hardware.
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">
        <div className="hidden lg:block">
          <FilterSidebar
            categories={categories}
            brands={brands}
            priceRange={priceRange}
            specifications={specifications}
          />
        </div>

        <div className="flex flex-col">
          <div className="mb-6 block lg:hidden">
            <MobileFilters
              categories={categories}
              brands={brands}
              priceRange={priceRange}
              specifications={specifications}
            />
          </div>

          <ProductGrid
            products={products}
            totalProducts={120} // Mock total for pagination
          />
        </div>
      </div>
    </div>
  );
}
