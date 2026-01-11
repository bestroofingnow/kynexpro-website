import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | Kynex Pro",
  description: "Expert web design, SEO optimization, AI integration, and custom software development for home service businesses.",
};

const services = [
  {
    title: "Web Design",
    description: "Custom website development with SEO optimization, responsive design, and mobile compatibility. We create stunning websites that convert visitors into customers.",
    features: ["Custom design tailored to your brand", "Mobile-responsive layouts", "Fast loading speeds", "SEO-optimized structure", "CRM integration", "Analytics dashboard"],
  },
  {
    title: "SEO Optimization",
    description: "Comprehensive SEO services to help your business rank higher in search results and attract more qualified leads.",
    features: ["Keyword research and strategy", "On-page optimization", "Local SEO for service areas", "Backlink building (DA 50+ sites)", "Voice search optimization", "Monthly reporting"],
  },
  {
    title: "AI Strategy and Consultation",
    description: "Expert guidance on implementing AI solutions that transform your business operations and customer experience.",
    features: ["AI readiness assessment", "Process automation analysis", "Custom AI implementation", "ROI projections", "Staff training", "Ongoing support"],
  },
  {
    title: "Conversational AI Phone Systems",
    description: "Advanced phone systems powered by AI that handle customer calls 24/7 with natural conversation.",
    features: ["Natural language processing", "24/7 availability", "Appointment scheduling", "Lead qualification", "Call routing", "CRM integration"],
  },
  {
    title: "Lifelike AI Avatars",
    description: "Engaging AI video avatars that represent your brand and interact with customers in a personalized way.",
    features: ["Custom avatar creation", "Brand voice matching", "Multi-language support", "Website integration", "Video content creation", "Interactive responses"],
  },
  {
    title: "Custom Software Development",
    description: "Tailored software solutions built specifically for your business needs and workflows.",
    features: ["Custom applications", "API integrations", "Workflow automation", "Database design", "Cloud deployment", "Maintenance and updates"],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">Comprehensive digital solutions designed to help home service businesses thrive in the modern marketplace.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 card-hover">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-400 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">Let us help you leverage the power of AI and modern web technology to grow your home service business.</p>
          <Link href="/contact" className="inline-block bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-lg font-semibold text-lg transition-colors">Get Started Today</Link>
        </div>
      </section>
    </div>
  );
}
