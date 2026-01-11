import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Kynex Pro",
  description: "Learn about Kynex Pro - Your Premier AI Integration Partner for home service businesses.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Kynex Pro</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">Your Premier AI Integration Partner</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">Kynex Pro is a leading technology company specializing in AI solutions for home service businesses. We combine cutting-edge artificial intelligence with expert web development to help contractors, roofers, and service professionals grow their businesses.</p>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">Our team brings together expertise in AI development, web design, SEO, and business automation to deliver comprehensive solutions that drive real results.</p>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Based in Matthews, NC, we serve clients across the United States with a focus on the home services industry including roofing, HVAC, plumbing, landscaping, and more.</p>
            </div>
            <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
              <p className="text-gray-200 text-lg">To empower home service businesses with accessible, powerful AI technology that levels the playing field and enables growth through innovation, automation, and exceptional customer experiences.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Kynex Pro?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Industry Expertise", desc: "Deep understanding of home service businesses and their unique challenges." },
              { title: "Cutting-Edge AI", desc: "Access to the latest AI technology adapted specifically for your industry." },
              { title: "Full-Service Support", desc: "From strategy to implementation to ongoing optimization, we are with you every step." },
              { title: "Proven Results", desc: "Track record of helping businesses increase leads, conversions, and revenue." },
              { title: "Custom Solutions", desc: "No cookie-cutter approaches - every solution is tailored to your needs." },
              { title: "Ongoing Partnership", desc: "We grow with you, continuously optimizing and improving your systems." },
            ].map((item, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Work Together?</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">Let us show you how AI can transform your home service business.</p>
          <Link href="/contact" className="inline-block bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-lg font-semibold text-lg transition-colors">Contact Us Today</Link>
        </div>
      </section>
    </div>
  );
}
