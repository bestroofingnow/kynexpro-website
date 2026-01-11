import Link from "next/link";

const services = [
  { title: "Web Design", description: "Custom website development with SEO optimization.", icon: "monitor" },
  { title: "SEO Optimization", description: "Keyword research, on-page optimization, and local SEO.", icon: "search" },
  { title: "AI Strategy", description: "Custom AI implementation and process automation.", icon: "lightbulb" },
  { title: "AI Phone Systems", description: "Natural language processing for customer support.", icon: "phone" },
  { title: "AI Avatars", description: "Video avatars and interactive AI personalities.", icon: "video" },
  { title: "Custom Software", description: "Tailored digital solutions for business automation.", icon: "code" },
];

const features = [
  "100 geo-targeted location pages",
  "Mobile-responsive design",
  "Professional contact forms with CRM integration",
  "SSL security and malware protection",
  "Ongoing website maintenance and updates",
  "Advanced analytics dashboard",
  "Strategic backlink acquisition (DA 50+ sites)",
  "24/7 AI-powered customer support",
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative gradient-bg text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">AI Solutions for <br /><span className="text-accent">Home Service Businesses</span></h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">Your Premier AI Integration Partner. Seamless solutions that enhance customer engagement and streamline operations.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">Get Started Today</Link>
              <Link href="/apps" className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">Explore Our Apps</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our <span className="gradient-text">Services</span></h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">Comprehensive AI and digital solutions tailored for home service businesses</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg card-hover">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Everything You Need to <span className="gradient-text">Succeed Online</span></h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">We provide full-service support tailored to your business needs.</p>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
              <p className="text-gray-200 mb-6">Get a free consultation and discover how AI can revolutionize your operations.</p>
              <Link href="/contact" className="inline-block bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">Schedule a Call</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Powerful Apps</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">Cutting-edge tools designed specifically for the roofing and home service industry</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Roofy.pro", desc: "AI Roof Report Generator", url: "https://roofy.pro" },
              { name: "KontentFire", desc: "Content Creation Platform", url: "https://app.kontentfire.com" },
              { name: "Kynex AI", desc: "Business AI Assistant", url: "https://app.kynex.ai" },
              { name: "InstantRoofEstimate", desc: "60-Second Roof Estimates", url: "https://instantroofestimate.ai" },
            ].map((app, index) => (
              <a key={index} href={app.url} target="_blank" rel="noopener noreferrer" className="bg-white/10 backdrop-blur rounded-xl p-6 hover:bg-white/20 transition-colors">
                <h3 className="text-xl font-semibold mb-2">{app.name}</h3>
                <p className="text-gray-300">{app.desc}</p>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/apps" className="inline-block border-2 border-white text-white hover:bg-white hover:text-secondary px-8 py-3 rounded-lg font-semibold transition-colors">View All Apps</Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">Join hundreds of home service businesses already using our AI solutions to grow their business.</p>
          <Link href="/contact" className="inline-block bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-lg font-semibold text-lg transition-colors">Contact Us Today</Link>
        </div>
      </section>
    </div>
  );
}
