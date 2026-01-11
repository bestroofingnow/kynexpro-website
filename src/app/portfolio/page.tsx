import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Portfolio | Kynex Pro',
  description: 'View websites and digital solutions we have created for our clients.',
};

const projects = [
  {
    name: 'Carolina Horse Farm Realty',
    url: 'https://carolinahorsefarmrealty.com',
    industry: 'Real Estate',
    description: 'Custom real estate website for horse farm properties in the Carolinas. Features advanced property search, virtual tours, and lead generation.',
    services: ['Web Design', 'SEO', 'Lead Generation'],
  },
  {
    name: 'Best Roofing Now',
    url: 'https://bestroofingnow.com',
    industry: 'Roofing',
    description: 'Modern roofing contractor website serving the Charlotte, NC area. Includes service pages, testimonials, and online quote requests.',
    services: ['Web Design', 'Local SEO', 'Content'],
  },
  {
    name: 'Best Roofers Now',
    url: 'https://bestroofersnow.com',
    industry: 'Roofing',
    description: 'Professional roofing company site with dark modern aesthetic. Features drone inspections, storm damage services, and 50-year warranty information.',
    services: ['Web Design', 'SEO', 'Branding'],
  },
  {
    name: 'Get My Roof Estimate Now',
    url: 'https://getmyroofestimatenow.com',
    industry: 'Roofing',
    description: 'Lead generation website for roofing estimates. Streamlined user experience focused on capturing customer information quickly.',
    services: ['Web Design', 'Lead Generation', 'Automation'],
  },
  {
    name: 'Fireflies Landscape Lighting',
    url: 'https://fireflieslandscapelighting.com',
    industry: 'Landscape Lighting',
    description: 'Elegant website for outdoor lighting contractor serving the Lake Norman area. Showcases portfolio, services, and free nighttime demonstrations.',
    services: ['Web Design', 'Local SEO', 'Content'],
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Portfolio</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            See the websites and digital solutions we have crafted for businesses across various industries.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden card-hover"
              >
                {/* Preview Area */}
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{project.industry}</span>
                  </div>
                  <a 
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center bg-primary/90 opacity-0 hover:opacity-100 transition-opacity"
                  >
                    <span className="text-white font-semibold flex items-center space-x-2">
                      <span>Visit Site</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </span>
                  </a>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service, sIndex) => (
                      <span 
                        key={sIndex} 
                        className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want Your Business Featured Here?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
            Let us create a stunning website that generates leads and grows your business. We specialize in home service businesses and understand what it takes to succeed online.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Start Your Project
          </Link>
        </div>
      </section>
    </div>
  );
}
