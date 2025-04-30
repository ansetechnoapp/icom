"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
}

interface PartnerBrandsProps {
  title: string;
  subtitle?: string;
  brands: Brand[];
  className?: string;
}

export function PartnerBrands({
  title,
  subtitle,
  brands,
  className,
}: PartnerBrandsProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className={cn("py-12 bg-muted/50", className)}>
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          {brands.map((brand) => (
            <motion.div key={brand.id} variants={item}>
              <Link
                href={`/brands/${brand.slug}`}
                className="flex h-24 items-center justify-center rounded-lg bg-background p-4 transition-all hover:shadow-md"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={120}
                  height={60}
                  className="max-h-16 w-auto object-contain grayscale transition-all hover:grayscale-0"
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
