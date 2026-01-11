import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Apps | Kynex Pro',
  description: 'Explore our suite of AI-powered apps designed for roofing and home service businesses.',
};

const apps = [
  {
    name: 'Roofy.pro',
    tagline: 'AI Roof Report Generator',
    description: 'Generate professional roof inspection reports using AI technology. Streamline your documentation process with automated analysis and PDF report generation.',
    url: 'https://roofy.pro',
    features: ['AI-powered roof analysis', 'Professional PDF reports', 'Cloud-based platform', 'Easy to use interface'],
    color: 'from-blue-500 to-blue-700',
  },
  {
    name: 'KontentFire',
    tagline: 'Content Creation Platform',
    description: 'Create engaging content for your home service business. From blog posts to social media, generate professional content that converts.',
    url: 'https://app.kontentfire.com',
    features: ['AI content generation', 'Social media integration', 'SEO optimization', 'Brand voice consistency'],
    color: 'from-orange-500 to-red-600',
  },
  {
    name: 'Kynex AI',
    tagline: 'Blog Creator & SEO Tool',
    description: 'Powerful AI-driven blog creation and SEO optimization platform. Generate high-quality, SEO-optimized content that ranks and drives organic traffic to your business.',
    url: 'https://app.kynex.ai',
    features: ['AI blog generation', 'SEO optimization', 'Keyword research', 'Content scheduling'],
    color: 'from-purple-500 to-purple-700',
  },
  {
    name: 'InstantRoofEstimate.ai',
    tagline: '60-Second Roof Estimates',
    description: 'Provide instant roof replacement cost estimates using satellite imagery. No appointment needed - homeowners get accurate estimates in 60 seconds.',
    url: 'https://instantroofestimate.ai',
    features: ['Satellite-based measurements', '90-95% accuracy', 'Multiple material options', 'Lead generation tool'],
    color: 'from-green-500 to-teal-600',
  },
];

const community = {
  name: 'Roofing School Community',
  platform: 'Skool.com',
  description: 'Join our exclusive community of roofing professionals. Learn everything from AI implementation to business automation, marketing strategies, and industry best practices.',
  url: 'https://skool.com',
  features: ['AI & Automation training', 'Marketing strategies', 'Business growth tactics', 'Networking opportunities', 'Weekly live sessions', 'Expert mentorship'],
};

export default function AppsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Apps & Tools</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Powerful AI-driven applications designed to help roofing and home service businesses grow and operate more efficiently.
          </p>
        </div>
      </section>

      {/* Apps Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {apps.map((app, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden card-hover"
              >
                <div className={`h-2 bg-gradient-to-r ${app.color}`}></div>
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold">{app.name}</h2>
                      <p className="text-primary font-medium">{app.tagline}</p>
                    </div>
                    <a 
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Visit App
                    </a>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{app.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {app.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-muted dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-secondary to-primary rounded-2xl p-8 md:p-12 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-accent text-sm font-medium uppercase tracking-wider">Community</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{community.name}</h2>
                <p className="text-gray-200 text-lg mb-6">{community.description}</p>
                <a 
                  href={community.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Join the Community
                </a>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {community.features.map((feature, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-4">
                    <svg className="w-6 h-6 text-accent mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">More Apps Coming Soon</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
            We are constantly developing new tools to help home service businesses thrive. Stay tuned for exciting new releases!
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Get Notified About New Apps
          </Link>
        </div>
      </section>
    </div>
  );
}
