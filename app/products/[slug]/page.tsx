import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ImageGallery } from "../../../src/components/product/image-gallery";
import { ProductInfo } from "../../../src/components/product/product-info";
import { ProductTabs } from "../../../src/components/product/product-tabs";
import { SimilarProducts } from "../../../src/components/product/similar-products";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// This would be replaced with a real data fetching function in a production app
async function getProductBySlug(slug: string) {
  // Mock data for development
  return {
    id: "1",
    name: "NVIDIA GeForce RTX 4080 Super 16GB GDDR6X Graphics Card",
    slug: "nvidia-geforce-rtx-4080-super",
    brand: {
      id: "nvidia",
      name: "NVIDIA",
      slug: "nvidia",
    },
    sku: "RTX4080S-16G",
    price: 1199.99,
    salePrice: 1099.99,
    images: [
      "/images/products/gpu-1.jpg",
      "/images/products/gpu-1-2.jpg",
      "/images/products/gpu-1.jpg",
      "/images/products/gpu-1-2.jpg",
    ],
    rating: 4.8,
    reviewCount: 124,
    stock: 15,
    description:
      "The NVIDIA GeForce RTX 4080 Super delivers the ultra performance and features that enthusiast gamers and creators demand. Bring your games and creative projects to life with ray tracing and AI-powered graphics. It's powered by the ultra-efficient NVIDIA Ada Lovelace architecture and 16GB of super-fast G6X memory.",
    variants: [
      {
        name: "Model",
        options: [
          {
            id: "founders",
            name: "Founders Edition",
            inStock: true,
          },
          {
            id: "asus-rog",
            name: "ASUS ROG Strix",
            price: 50,
            inStock: true,
          },
          {
            id: "msi-gaming",
            name: "MSI Gaming X Trio",
            price: 30,
            inStock: false,
          },
        ],
      },
    ],
    specifications: [
      { name: "GPU Architecture", value: "NVIDIA Ada Lovelace" },
      { name: "CUDA Cores", value: "10,240" },
      { name: "Memory Size", value: "16 GB GDDR6X" },
      { name: "Memory Interface Width", value: "256-bit" },
      { name: "Memory Speed", value: "23 Gbps" },
      { name: "Ray Tracing Cores", value: "3rd Generation" },
      { name: "Tensor Cores", value: "4th Generation" },
      { name: "NVIDIA DLSS", value: "3" },
      { name: "PCI Express", value: "Gen 4" },
      { name: "Power Connectors", value: "16-pin" },
      { name: "Recommended PSU", value: "750W" },
      { name: "Max GPU Temperature", value: "90°C" },
      { name: "Dimensions", value: "304mm x 137mm (3-Slot)" },
    ],
    reviews: [
      {
        id: "1",
        user: {
          name: "John Doe",
          avatar: "/images/testimonials/user1.jpg",
        },
        rating: 5,
        title: "Amazing performance!",
        comment:
          "This GPU is a beast! I'm getting incredible frame rates in all my games at 4K. The ray tracing performance is especially impressive. Highly recommended for any serious gamer.",
        date: "2023-12-15",
        verified: true,
        helpful: 42,
        unhelpful: 3,
      },
      {
        id: "2",
        user: {
          name: "Jane Smith",
          avatar: "/images/testimonials/user2.jpg",
        },
        rating: 4,
        title: "Great card, but runs hot",
        comment:
          "The performance is excellent, but I've noticed it runs quite hot under load. Had to improve my case airflow to keep temperatures in check. Otherwise, it's a fantastic GPU.",
        date: "2023-11-28",
        verified: true,
        helpful: 31,
        unhelpful: 5,
      },
      {
        id: "3",
        user: {
          name: "Mike Johnson",
          avatar: "/images/testimonials/user3.jpg",
        },
        rating: 5,
        title: "Worth every penny",
        comment:
          "I was hesitant about the price, but after using it for a month, I can say it's worth every penny. The DLSS 3 feature is a game-changer, and the overall performance is outstanding.",
        date: "2023-12-02",
        verified: true,
        helpful: 27,
        unhelpful: 1,
      },
    ],
    faqs: [
      {
        id: "1",
        question: "What power supply do I need for this GPU?",
        answer:
          "NVIDIA recommends a minimum 750W power supply for the RTX 4080 Super. However, if you have a high-end CPU or plan to overclock, we recommend a 850W or higher quality power supply.",
      },
      {
        id: "2",
        question: "Does this GPU support HDMI 2.1?",
        answer:
          "Yes, the RTX 4080 Super includes HDMI 2.1 ports that support 8K resolution at 60Hz or 4K resolution at up to 240Hz.",
      },
      {
        id: "3",
        question: "What's the difference between the RTX 4080 and RTX 4080 Super?",
        answer:
          "The RTX 4080 Super features more CUDA cores, faster memory, and slightly higher clock speeds compared to the standard RTX 4080, resulting in approximately 5-10% better performance in most applications.",
      },
    ],
  };
}

// This would be replaced with a real data fetching function in a production app
async function getSimilarProducts() {
  // Mock data for development
  return [
    {
      id: "2",
      name: "NVIDIA GeForce RTX 4070 Ti Super 16GB GDDR6X Graphics Card",
      slug: "nvidia-geforce-rtx-4070-ti-super",
      price: 799.99,
      images: [
        "/images/products/gpu-1.jpg",
        "/images/products/gpu-1-2.jpg",
      ],
      rating: 4.7,
      reviewCount: 98,
      isNew: true,
      stock: 22,
    },
    {
      id: "3",
      name: "NVIDIA GeForce RTX 4090 24GB GDDR6X Graphics Card",
      slug: "nvidia-geforce-rtx-4090",
      price: 1599.99,
      images: [
        "/images/products/gpu-1.jpg",
        "/images/products/gpu-1-2.jpg",
      ],
      rating: 4.9,
      reviewCount: 156,
      isNew: false,
      stock: 5,
    },
    {
      id: "4",
      name: "AMD Radeon RX 7900 XTX 24GB GDDR6 Graphics Card",
      slug: "amd-radeon-rx-7900-xtx",
      price: 999.99,
      salePrice: 949.99,
      images: [
        "/images/products/gpu-1.jpg",
        "/images/products/gpu-1-2.jpg",
      ],
      rating: 4.6,
      reviewCount: 87,
      isNew: false,
      stock: 18,
    },
    {
      id: "5",
      name: "AMD Radeon RX 7800 XT 16GB GDDR6 Graphics Card",
      slug: "amd-radeon-rx-7800-xt",
      price: 549.99,
      images: [
        "/images/products/gpu-1.jpg",
        "/images/products/gpu-1-2.jpg",
      ],
      rating: 4.5,
      reviewCount: 72,
      isNew: false,
      stock: 30,
    },
    {
      id: "6",
      name: "NVIDIA GeForce RTX 4060 Ti 8GB GDDR6 Graphics Card",
      slug: "nvidia-geforce-rtx-4060-ti",
      price: 399.99,
      salePrice: 379.99,
      images: [
        "/images/products/gpu-1.jpg",
        "/images/products/gpu-1-2.jpg",
      ],
      rating: 4.4,
      reviewCount: 112,
      isNew: false,
      stock: 45,
    },
  ];
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  return {
    title: `${product.name} | iCome Hardware`,
    description: product.description.substring(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.substring(0, 160),
      images: [{ url: product.images[0], alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);
  const similarProducts = await getSimilarProducts();

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/shop" className="hover:text-foreground">
          Shop
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          href={`/categories/${product.brand.slug}`}
          className="hover:text-foreground"
        >
          {product.brand.name}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <ImageGallery
          images={product.images}
          productName={product.name}
        />
        <ProductInfo
          id={product.id}
          name={product.name}
          brand={product.brand}
          sku={product.sku}
          price={product.price}
          salePrice={product.salePrice}
          rating={product.rating}
          reviewCount={product.reviewCount}
          stock={product.stock}
          description={product.description}
          variants={product.variants}
        />
      </div>

      <div className="mt-12">
        <ProductTabs
          description={product.description}
          specifications={product.specifications}
          reviews={product.reviews}
          faqs={product.faqs}
        />
      </div>

      <SimilarProducts
        title="Similar Products"
        products={similarProducts}
        className="mt-12"
      />
    </div>
  );
}
