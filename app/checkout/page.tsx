import { Metadata } from "next";
import { redirect } from "next/navigation";
import { CheckoutForm } from "../../src/components/checkout/checkout-form";
import { CheckoutSummary } from "../../src/components/checkout/checkout-summary";

export const metadata: Metadata = {
  title: "Checkout | iCome Hardware",
  description: "Complete your purchase securely",
};

export default function CheckoutPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">
        Checkout
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <CheckoutForm />
        <CheckoutSummary />
      </div>
    </div>
  );
}
