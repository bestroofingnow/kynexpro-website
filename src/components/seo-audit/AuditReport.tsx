'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { AuditReport as AuditReportType } from '@/lib/types';

interface AuditReportProps {
  report: AuditReportType;
  isBlurred?: boolean;
  onDownload?: () => void;
}

const getScoreColor = (score: number): string => {
  if (score >= 80) return 'text-green-500';
  if (score >= 60) return 'text-yellow-500';
  if (score >= 40) return 'text-orange-500';
  return 'text-red-500';
};

const getScoreBgColor = (score: number): string => {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-yellow-500';
  if (score >= 40) return 'bg-orange-500';
  return 'bg-red-500';
};

const getScoreGrade = (score: number): string => {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
};

function AnimatedScore({ score, delay = 0 }: { score: number; delay?: number }) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 1500;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayScore(Math.round(score * eased));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    }, delay);

    return () => clearTimeout(timer);
  }, [score, delay]);

  return <span>{displayScore}</span>;
}

function ScoreGauge({ score, size = 'large' }: { score: number; size?: 'large' | 'small' }) {
  const radius = size === 'large' ? 80 : 40;
  const strokeWidth = size === 'large' ? 12 : 6;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={radius * 2 + strokeWidth * 2}
        height={radius * 2 + strokeWidth * 2}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200 dark:text-slate-700"
        />
        {/* Progress circle */}
        <motion.circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={getScoreColor(score)}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`${size === 'large' ? 'text-4xl' : 'text-xl'} font-bold ${getScoreColor(score)}`}>
          <AnimatedScore score={score} />
        </span>
        <span className={`${size === 'large' ? 'text-sm' : 'text-xs'} text-gray-500`}>/ 100</span>
      </div>
    </div>
  );
}

function ScoreBar({ score, label }: { score: number; label: string }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600 dark:text-gray-300">{label}</span>
        <span className={`font-semibold ${getScoreColor(score)}`}>{score}/100</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${getScoreBgColor(score)} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

function ReportSection({
  title,
  children,
  delay = 0
}: {
  title: string;
  children: React.ReactNode;
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6"
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

export default function AuditReport({ report, isBlurred = false, onDownload }: AuditReportProps) {
  const formattedDate = new Date(report.generatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`max-w-4xl mx-auto ${isBlurred ? 'filter blur-sm pointer-events-none select-none' : ''}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold mb-2">SEO Audit Report</h2>
        <p className="text-gray-600 dark:text-gray-300">{report.website}</p>
        <p className="text-sm text-gray-500">Generated on {formattedDate}</p>
      </motion.div>

      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white text-center mb-8"
      >
        <h3 className="text-xl font-semibold mb-4">Overall SEO Score</h3>
        <div className="flex justify-center mb-4">
          <div className="bg-white rounded-full p-2">
            <ScoreGauge score={report.overallScore} />
          </div>
        </div>
        <p className="text-2xl font-bold mb-2">Grade: {getScoreGrade(report.overallScore)}</p>
        <p className="text-white/80">
          {report.overallScore >= 80
            ? 'Excellent! Your site is well optimized.'
            : report.overallScore >= 60
            ? 'Good, but there\'s room for improvement.'
            : 'Needs work. Follow our recommendations below.'}
        </p>
      </motion.div>

      {/* Score Overview */}
      <ReportSection title="Score Breakdown" delay={0.3}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <ScoreBar score={report.pageSpeed.score} label="Page Speed" />
          <ScoreBar score={report.metaTags.score} label="Meta Tags" />
          <ScoreBar score={report.backlinks.score} label="Backlinks" />
          <ScoreBar score={report.keywords.score} label="Keywords" />
          <ScoreBar score={report.mobile.score} label="Mobile Friendliness" />
          <ScoreBar score={report.security.score} label="Security" />
          <ScoreBar score={report.content.score} label="Content Quality" />
        </div>
      </ReportSection>

      {/* Page Speed */}
      <ReportSection title="Page Speed Analysis" delay={0.4}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Load Time', value: `${report.pageSpeed.loadTime}s` },
            { label: 'First Contentful Paint', value: `${report.pageSpeed.firstContentfulPaint}s` },
            { label: 'Largest Contentful Paint', value: `${report.pageSpeed.largestContentfulPaint}s` },
            { label: 'Time to Interactive', value: `${report.pageSpeed.timeToInteractive}s` },
          ].map((item) => (
            <div key={item.label} className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-primary">{item.value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{item.label}</p>
            </div>
          ))}
        </div>
      </ReportSection>

      {/* Meta Tags */}
      <ReportSection title="Meta Tags Analysis" delay={0.5}>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium">Title Tag</span>
              <span className="text-sm text-gray-500">{report.metaTags.titleLength} characters</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{report.metaTags.title || 'Not found'}</p>
          </div>
          <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium">Meta Description</span>
              <span className="text-sm text-gray-500">{report.metaTags.descriptionLength} characters</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{report.metaTags.description || 'Not found'}</p>
          </div>
          <div className="flex gap-4">
            <div className={`flex items-center gap-2 ${report.metaTags.hasOgTags ? 'text-green-500' : 'text-red-500'}`}>
              {report.metaTags.hasOgTags ? '✓' : '✗'} Open Graph Tags
            </div>
            <div className={`flex items-center gap-2 ${report.metaTags.hasTwitterCards ? 'text-green-500' : 'text-red-500'}`}>
              {report.metaTags.hasTwitterCards ? '✓' : '✗'} Twitter Cards
            </div>
          </div>
          {report.metaTags.issues.length > 0 && (
            <div className="mt-4">
              <p className="font-medium text-orange-500 mb-2">Issues Found:</p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                {report.metaTags.issues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </ReportSection>

      {/* Backlinks */}
      <ReportSection title="Backlink Profile" delay={0.6}>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-primary">{report.backlinks.total}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Total Backlinks</p>
          </div>
          <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-500">{report.backlinks.dofollow}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Dofollow</p>
          </div>
          <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gray-500">{report.backlinks.nofollow}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Nofollow</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Quality Rating: <span className={`font-semibold capitalize ${
            report.backlinks.quality === 'high' ? 'text-green-500' :
            report.backlinks.quality === 'medium' ? 'text-yellow-500' : 'text-red-500'
          }`}>{report.backlinks.quality}</span>
        </p>
        <div>
          <p className="font-medium mb-2">Top Referring Domains:</p>
          <div className="space-y-2">
            {report.backlinks.topDomains.map((domain, i) => (
              <div key={i} className="flex justify-between items-center bg-gray-50 dark:bg-slate-700 rounded px-3 py-2">
                <span className="text-sm">{domain.domain}</span>
                <span className="text-sm font-medium text-primary">DA: {domain.authority}</span>
              </div>
            ))}
          </div>
        </div>
      </ReportSection>

      {/* Keywords */}
      <ReportSection title="Keyword Rankings" delay={0.7}>
        <div className="mb-6">
          <p className="font-medium mb-3">Current Rankings:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-slate-700">
                <tr>
                  <th className="text-left p-3 rounded-tl-lg">Keyword</th>
                  <th className="text-center p-3">Position</th>
                  <th className="text-right p-3 rounded-tr-lg">Search Volume</th>
                </tr>
              </thead>
              <tbody>
                {report.keywords.ranking.map((kw, i) => (
                  <tr key={i} className="border-b dark:border-slate-700">
                    <td className="p-3">{kw.keyword}</td>
                    <td className="text-center p-3">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        kw.position <= 10 ? 'bg-green-100 text-green-800' :
                        kw.position <= 30 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                        #{kw.position}
                      </span>
                    </td>
                    <td className="text-right p-3">{kw.searchVolume.toLocaleString()}/mo</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <p className="font-medium mb-3">Keyword Opportunities:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {report.keywords.opportunities.map((opp, i) => (
              <div key={i} className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                <p className="font-medium text-sm">{opp.keyword}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Difficulty: {opp.difficulty}% | Volume: {opp.volume.toLocaleString()}/mo
                </p>
              </div>
            ))}
          </div>
        </div>
      </ReportSection>

      {/* Competitors */}
      <ReportSection title="Competitor Analysis" delay={0.8}>
        <div className="space-y-4">
          {report.competitors.map((comp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold">{comp.name}</h4>
                  <p className="text-sm text-gray-500">{comp.domain}</p>
                </div>
                <div className="text-right">
                  <ScoreGauge score={comp.score} size="small" />
                  <p className="text-xs text-gray-500 mt-1">{comp.traffic}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-green-600 mb-1">Strengths:</p>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                    {comp.strengths.map((s, j) => (
                      <li key={j} className="flex items-center gap-1">
                        <span className="text-green-500">+</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-red-600 mb-1">Weaknesses:</p>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                    {comp.weaknesses.map((w, j) => (
                      <li key={j} className="flex items-center gap-1">
                        <span className="text-red-500">-</span> {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ReportSection>

      {/* Mobile & Security */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ReportSection title="Mobile Friendliness" delay={0.9}>
          <div className="space-y-3">
            {[
              { label: 'Mobile Friendly', value: report.mobile.isMobileFriendly },
              { label: 'Viewport Configured', value: report.mobile.viewportConfigured },
              { label: 'Text Readable', value: report.mobile.textReadable },
              { label: 'Tap Targets Sized', value: report.mobile.tapTargetsSize },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center">
                <span className="text-sm">{item.label}</span>
                <span className={item.value ? 'text-green-500' : 'text-red-500'}>
                  {item.value ? '✓ Pass' : '✗ Fail'}
                </span>
              </div>
            ))}
          </div>
          {report.mobile.issues.length > 0 && (
            <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <p className="font-medium text-orange-600 text-sm mb-1">Issues:</p>
              <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc list-inside">
                {report.mobile.issues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </ReportSection>

        <ReportSection title="Security" delay={1}>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">HTTPS</span>
              <span className={report.security.hasHttps ? 'text-green-500' : 'text-red-500'}>
                {report.security.hasHttps ? '✓ Secure' : '✗ Not Secure'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Valid Certificate</span>
              <span className={report.security.validCertificate ? 'text-green-500' : 'text-red-500'}>
                {report.security.validCertificate ? '✓ Valid' : '✗ Invalid'}
              </span>
            </div>
            <div className="border-t dark:border-slate-600 pt-3 mt-3">
              <p className="font-medium text-sm mb-2">Security Headers:</p>
              {report.security.headers.map((header) => (
                <div key={header.name} className="flex justify-between items-center text-sm py-1">
                  <span className="text-gray-600 dark:text-gray-300">{header.name}</span>
                  <span className={header.present ? 'text-green-500' : 'text-red-500'}>
                    {header.present ? '✓' : '✗'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ReportSection>
      </div>

      {/* Content Analysis */}
      <ReportSection title="Content Analysis" delay={1.1}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-primary">{report.content.wordCount.toLocaleString()}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Words</p>
          </div>
          <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-primary">
              {report.content.headingsStructure.h1}/{report.content.headingsStructure.h2}/{report.content.headingsStructure.h3}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">H1/H2/H3</p>
          </div>
          <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-primary">{report.content.internalLinks}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Internal Links</p>
          </div>
          <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-primary">{report.content.imagesWithAlt}/{report.content.imagesWithAlt + report.content.imagesWithoutAlt}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Images with Alt</p>
          </div>
        </div>
      </ReportSection>

      {/* Recommendations */}
      <ReportSection title="Recommendations" delay={1.2}>
        <div className="space-y-4">
          {report.recommendations.map((rec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              className={`border-l-4 ${
                rec.priority === 'high' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                rec.priority === 'medium' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              } rounded-r-lg p-4`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className={`text-xs font-medium uppercase ${
                    rec.priority === 'high' ? 'text-red-600' :
                    rec.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                  }`}>
                    {rec.priority} Priority
                  </span>
                  <span className="text-xs text-gray-500 ml-2">• {rec.category}</span>
                </div>
              </div>
              <h4 className="font-semibold mb-1">{rec.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{rec.description}</p>
              <p className="text-xs text-gray-500">
                <span className="font-medium">Impact:</span> {rec.impact}
              </p>
            </motion.div>
          ))}
        </div>
      </ReportSection>

      {/* Download Button */}
      {!isBlurred && onDownload && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-8 mb-12"
        >
          <button
            onClick={onDownload}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Full Report (PDF)
          </button>
        </motion.div>
      )}
    </div>
  );
}
