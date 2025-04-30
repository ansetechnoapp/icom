"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";

interface NewsletterProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function Newsletter({ title, subtitle, className }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // In a real application, you would call an API endpoint to subscribe the user
      // For now, we'll just simulate a successful response
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSuccess(true);
      setEmail("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={cn("py-12 bg-primary text-primary-foreground", className)}>
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Mail className="mx-auto mb-4 h-12 w-12" />
            <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
              {title}
            </h2>
            {subtitle && <p className="mb-6 text-primary-foreground/80">{subtitle}</p>}

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-lg bg-primary-foreground/10 p-6"
              >
                <h3 className="mb-2 text-xl font-medium">Thank you for subscribing!</h3>
                <p>
                  You've been added to our newsletter. Get ready for exclusive deals and the latest tech news.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mx-auto max-w-md">
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-2 sm:space-y-0">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 focus:border-primary-foreground/30 focus:ring-primary-foreground/20"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  >
                    {isSubmitting ? "Subscribing..." : "Subscribe"}
                  </Button>
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-300">{error}</p>
                )}
                <p className="mt-4 text-xs text-primary-foreground/70">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
