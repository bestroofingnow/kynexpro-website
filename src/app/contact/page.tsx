import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Kynex Pro",
  description: "Get in touch with Kynex Pro for AI solutions, web design, and digital marketing services.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">Ready to transform your business? Get in touch with our team today.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">Fill out the form and our team will get back to you within 24 hours. Or reach out directly using the contact information below.</p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Address</h3>
                    <p className="text-gray-600 dark:text-gray-400">2217 Matthews Township PKWY<br />D-233, Matthews, NC 28105</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <a href="mailto:kynexpro@gmail.com" className="text-primary hover:text-primary-dark transition-colors">kynexpro@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">First Name</label>
                    <input type="text" id="firstName" name="firstName" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors" placeholder="John" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">Last Name</label>
                    <input type="text" id="lastName" name="lastName" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" id="email" name="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors" placeholder="john@example.com" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone</label>
                  <input type="tel" id="phone" name="phone" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors" placeholder="(555) 123-4567" />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium mb-2">Service Interest</label>
                  <select id="service" name="service" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors">
                    <option value="">Select a service...</option>
                    <option value="web-design">Web Design</option>
                    <option value="seo">SEO Optimization</option>
                    <option value="ai-strategy">AI Strategy</option>
                    <option value="phone-systems">AI Phone Systems</option>
                    <option value="avatars">AI Avatars</option>
                    <option value="software">Custom Software</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea id="message" name="message" rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none" placeholder="Tell us about your project..."></textarea>
                </div>
                <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-lg font-semibold text-lg transition-colors">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
