"use client";

import { motion } from "framer-motion";
import { Truck, Shield, Clock, Award, Headset, CreditCard } from "lucide-react";
import { cn } from "../../lib/utils";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface WhyChooseUsProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function WhyChooseUs({ title, subtitle, className }: WhyChooseUsProps) {
  const features: Feature[] = [
    {
      icon: <Truck className="h-10 w-10 text-primary" />,
      title: "Fast Delivery",
      description: "Free shipping on orders over $99. Same-day dispatch for orders placed before 2 PM.",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Extended Warranty",
      description: "All products come with a minimum 2-year warranty. Extended coverage available.",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "30-Day Returns",
      description: "Not satisfied? Return within 30 days for a full refund or exchange.",
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Quality Assurance",
      description: "All products are tested and verified to meet our high-quality standards.",
    },
    {
      icon: <Headset className="h-10 w-10 text-primary" />,
      title: "Expert Support",
      description: "Our tech experts are available 7 days a week to help with any questions.",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "Secure Payment",
      description: "Multiple payment options with secure checkout and fraud protection.",
    },
  ];

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
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="flex flex-col items-center rounded-lg border bg-background p-6 text-center transition-all hover:shadow-md"
            >
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-medium">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
