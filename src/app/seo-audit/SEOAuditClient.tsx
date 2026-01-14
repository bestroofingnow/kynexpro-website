'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import AuditForm from '@/components/seo-audit/AuditForm';
import LoadingAnimation from '@/components/seo-audit/LoadingAnimation';
import LeadCaptureForm from '@/components/seo-audit/LeadCaptureForm';
import AuditReport from '@/components/seo-audit/AuditReport';
import { downloadPDF } from '@/components/seo-audit/ReportPDF';
import type { AuditReport as AuditReportType, AuditStage } from '@/lib/types';

type PageState = 'form' | 'loading' | 'lead-capture' | 'report';

export default function SEOAuditClient() {
  const searchParams = useSearchParams();
  const [pageState, setPageState] = useState<PageState>('form');
  const [auditStage, setAuditStage] = useState<AuditStage>('idle');
  const [report, setReport] = useState<AuditReportType | null>(null);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for URL parameter from exit popup
  useEffect(() => {
    const urlParam = searchParams.get('url');
    if (urlParam && pageState === 'form') {
      handleAuditSubmit(urlParam);
    }
  }, [searchParams]);

  const simulateLoadingStages = useCallback(async () => {
    const stages: AuditStage[] = [
      'connecting',
      'scanning',
      'analyzing-competitors',
      'checking-seo',
      'building-report',
    ];

    for (const stage of stages) {
      setAuditStage(stage);
      // Wait for each stage
      const duration = stage === 'analyzing-competitors' ? 5000 :
                       stage === 'building-report' ? 4000 : 3500;
      await new Promise(resolve => setTimeout(resolve, duration));
    }
  }, []);

  const handleAuditSubmit = async (url: string) => {
    setWebsiteUrl(url);
    setPageState('loading');
    setError(null);

    try {
      // Start loading animation
      const loadingPromise = simulateLoadingStages();

      // Make API call
      const response = await fetch('/api/seo-audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to perform audit');
      }

      // Wait for loading animation to complete
      await loadingPromise;

      setReport(data.report);
      setAuditStage('complete');

      // Short delay before showing lead capture
      setTimeout(() => {
        setPageState('lead-capture');
      }, 500);
    } catch (err) {
      console.error('Audit error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setPageState('form');
      setAuditStage('idle');
    }
  };

  const handleLeadSubmit = async (leadData: { fullName: string; email: string; phone: string }) => {
    if (!report) return;

    setIsSubmittingLead(true);

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lead: {
            ...leadData,
            website: websiteUrl,
            auditScore: report.overallScore,
            submittedAt: new Date().toISOString(),
          },
          report,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit');
      }

      setPageState('report');
    } catch (err) {
      console.error('Lead submission error:', err);
      // Still show report even if webhook fails
      setPageState('report');
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const handleDownload = () => {
    if (report) {
      downloadPDF(report);
    }
  };

  const handleStartOver = () => {
    setPageState('form');
    setAuditStage('idle');
    setReport(null);
    setWebsiteUrl('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Free SEO Audit Tool
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto"
          >
            Get a comprehensive analysis of your website&apos;s SEO performance with competitor insights and actionable recommendations.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {/* Form State */}
            {pageState === 'form' && (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-center"
                  >
                    {error}
                  </motion.div>
                )}
                <AuditForm onSubmit={handleAuditSubmit} />
              </motion.div>
            )}

            {/* Loading State */}
            {pageState === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto"
              >
                <div className="text-center mb-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    Analyzing <span className="font-semibold text-primary">{websiteUrl}</span>
                  </p>
                </div>
                <LoadingAnimation stage={auditStage} />
              </motion.div>
            )}

            {/* Lead Capture State */}
            {pageState === 'lead-capture' && report && (
              <motion.div
                key="lead-capture"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Blurred report in background */}
                <AuditReport report={report} isBlurred={true} />
                {/* Lead capture overlay */}
                <LeadCaptureForm
                  onSubmit={handleLeadSubmit}
                  isLoading={isSubmittingLead}
                  score={report.overallScore}
                />
              </motion.div>
            )}

            {/* Report State */}
            {pageState === 'report' && report && (
              <motion.div
                key="report"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <AuditReport
                  report={report}
                  isBlurred={false}
                  onDownload={handleDownload}
                />

                {/* Start Over Button */}
                <div className="text-center mt-8 mb-12">
                  <button
                    onClick={handleStartOver}
                    className="text-primary hover:text-primary-dark font-medium transition-colors inline-flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Audit Another Website
                  </button>
                </div>

                {/* CTA Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center max-w-2xl mx-auto"
                >
                  <h3 className="text-2xl font-bold mb-4">Need Help Improving Your SEO?</h3>
                  <p className="text-white/90 mb-6">
                    Our team of SEO experts can help you implement these recommendations and boost your rankings.
                  </p>
                  <a
                    href="/contact"
                    className="inline-block bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Get a Free Consultation
                  </a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Features Section - Only show on form state */}
      {pageState === 'form' && (
        <section className="py-16 bg-white dark:bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              What&apos;s Included in Your <span className="gradient-text">Free Audit</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: '🚀',
                  title: 'Page Speed Analysis',
                  description: 'Detailed performance metrics including load time, FCP, and LCP.',
                },
                {
                  icon: '🔍',
                  title: 'Competitor Research',
                  description: 'See how you stack up against your top 5 competitors.',
                },
                {
                  icon: '🔗',
                  title: 'Backlink Profile',
                  description: 'Analyze your backlink quality and find link building opportunities.',
                },
                {
                  icon: '📱',
                  title: 'Mobile Optimization',
                  description: 'Ensure your site provides a great mobile experience.',
                },
                {
                  icon: '🏷️',
                  title: 'Meta Tag Analysis',
                  description: 'Check your title tags, descriptions, and Open Graph tags.',
                },
                {
                  icon: '🔐',
                  title: 'Security Check',
                  description: 'Verify HTTPS, SSL certificate, and security headers.',
                },
                {
                  icon: '📊',
                  title: 'Keyword Rankings',
                  description: 'See where you rank for important keywords in your niche.',
                },
                {
                  icon: '✅',
                  title: 'Actionable Tips',
                  description: 'Get prioritized recommendations to improve your SEO.',
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
