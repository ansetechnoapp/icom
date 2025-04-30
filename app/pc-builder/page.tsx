import { Metadata } from "next";
import { PCBuilder } from "../../src/components/pc-builder/pc-builder";

export const metadata: Metadata = {
  title: "PC Builder | iCome Hardware",
  description: "Build your custom PC with our interactive PC Builder tool. Select compatible components and create your dream computer.",
};

export default function PCBuilderPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Custom PC Builder
        </h1>
        <p className="mt-2 text-muted-foreground">
          Build your dream PC by selecting compatible components
        </p>
      </div>

      <PCBuilder />
    </div>
  );
}
