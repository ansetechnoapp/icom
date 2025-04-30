"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { cn } from "../../lib/utils";

interface Specification {
  name: string;
  value: string;
}

interface Review {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
  unhelpful: number;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface ProductTabsProps {
  description: string;
  specifications: Specification[];
  reviews: Review[];
  faqs: FAQ[];
  className?: string;
}

export function ProductTabs({
  description,
  specifications,
  reviews,
  faqs,
  className,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  const ratingCounts = Array.from({ length: 5 }, (_, i) => {
    const count = reviews.filter((review) => review.rating === 5 - i).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { rating: 5 - i, count, percentage };
  });

  return (
    <Tabs
      defaultValue="description"
      value={activeTab}
      onValueChange={setActiveTab}
      className={cn("w-full", className)}
    >
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="reviews">
          Reviews ({reviews.length})
        </TabsTrigger>
        <TabsTrigger value="faqs">FAQs ({faqs.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-6">
        <div className="prose max-w-none">
          <p>{description}</p>
        </div>
      </TabsContent>

      <TabsContent value="specifications" className="mt-6">
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full">
            <tbody>
              {specifications.map((spec, index) => (
                <tr
                  key={spec.name}
                  className={cn(
                    index % 2 === 0 ? "bg-muted/50" : "bg-background"
                  )}
                >
                  <td className="px-4 py-3 text-sm font-medium">{spec.name}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <div className="grid gap-8 md:grid-cols-[300px_1fr]">
          <div className="space-y-6 rounded-lg border p-6">
            <div className="text-center">
              <div className="text-5xl font-bold">{averageRating.toFixed(1)}</div>
              <div className="mt-2 flex justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : i < averageRating
                          ? "fill-yellow-400/50 text-yellow-400"
                          : "fill-muted text-muted"
                    )}
                  />
                ))}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                Based on {reviews.length} reviews
              </div>
            </div>

            <div className="space-y-2">
              {ratingCounts.map((item) => (
                <div key={item.rating} className="flex items-center gap-2">
                  <div className="w-12 text-sm">{item.rating} stars</div>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-yellow-400"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-8 text-right text-sm text-muted-foreground">
                    {item.count}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button className="w-full">Write a Review</Button>
            </div>
          </div>

          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                      {review.user.avatar ? (
                        <img
                          src={review.user.avatar}
                          alt={review.user.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-lg font-medium uppercase text-muted-foreground">
                          {review.user.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{review.user.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {review.date}
                        {review.verified && (
                          <span className="ml-2 text-green-600">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-muted text-muted"
                        )}
                      />
                    ))}
                  </div>
                </div>

                <h4 className="mb-2 font-medium">{review.title}</h4>
                <p className="text-sm text-muted-foreground">{review.comment}</p>

                <div className="mt-4 flex items-center gap-4">
                  <div className="text-xs text-muted-foreground">
                    Was this review helpful?
                  </div>
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                    <ThumbsUp className="h-3 w-3" />
                    <span>Yes ({review.helpful})</span>
                  </button>
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                    <ThumbsDown className="h-3 w-3" />
                    <span>No ({review.unhelpful})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="faqs" className="mt-6">
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
            >
              <h4 className="mb-2 font-medium">{faq.question}</h4>
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
