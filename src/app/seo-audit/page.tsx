import type { Metadata } from "next";
import { Suspense } from "react";
import SEOAuditClient from "./SEOAuditClient";

export const metadata: Metadata = {
  title: "Free SEO Audit Tool | Kynex Pro",
  description: "Get a comprehensive SEO audit of your website including competitor analysis, keyword rankings, backlink profile, and actionable recommendations. Free and instant results.",
  openGraph: {
    title: "Free SEO Audit Tool | Kynex Pro",
    description: "Get a comprehensive SEO audit of your website including competitor analysis, keyword rankings, and actionable recommendations.",
    type: "website",
  },
};

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <section className="gradient-bg text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Free SEO Audit Tool</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Get a comprehensive analysis of your website&apos;s SEO performance with competitor insights and actionable recommendations.
          </p>
        </div>
      </section>
      <section className="py-12 md:py-20 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function SEOAuditPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SEOAuditClient />
    </Suspense>
  );
}
