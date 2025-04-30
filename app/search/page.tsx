import { Metadata } from "next";
import { Search } from "lucide-react";
import { ProductGrid } from "../../src/components/shop/product-grid";

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export const metadata: Metadata = {
  title: "Search Results | iCome Hardware",
  description: "Search results for computer hardware and components",
};

// This would be replaced with a real search function in a production app
async function searchProducts(query: string) {
  // Mock data for development
  const allProducts = [
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

  if (!query) return { products: allProducts, totalProducts: allProducts.length };

  const lowerQuery = query.toLowerCase();
  const filteredProducts = allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.slug.toLowerCase().includes(lowerQuery)
  );

  return {
    products: filteredProducts,
    totalProducts: filteredProducts.length,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";
  const { products, totalProducts } = await searchProducts(query);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Search Results
        </h1>
        {query ? (
          <p className="mt-2 text-muted-foreground">
            {totalProducts} results for "{query}"
          </p>
        ) : (
          <p className="mt-2 text-muted-foreground">
            Showing all products
          </p>
        )}
      </div>

      {totalProducts === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 rounded-full bg-muted p-6">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-medium">No results found</h2>
          <p className="mt-2 max-w-md text-muted-foreground">
            We couldn't find any products matching "{query}". Try using different
            keywords or check for typos.
          </p>
        </div>
      ) : (
        <ProductGrid products={products} totalProducts={totalProducts} />
      )}
    </div>
  );
}
