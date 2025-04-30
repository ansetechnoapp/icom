"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  featured: boolean;
}

interface CategoryShowcaseProps {
  title: string;
  categories: Category[];
  className?: string;
}

export function CategoryShowcase({
  title,
  categories,
  className,
}: CategoryShowcaseProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className={cn("py-12", className)}>
      <div className="container">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={item}>
              <Link
                href={`/categories/${category.slug}`}
                className="group flex flex-col items-center"
              >
                <div className="relative mb-4 h-32 w-32 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {category.featured && (
                    <div className="absolute inset-0 bg-primary/10" />
                  )}
                </div>
                <h3 className="text-center text-sm font-medium group-hover:text-primary">
                  {category.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
