'use client';

import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import type { AuditReport } from '@/lib/types';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    borderBottom: '2px solid #046BD2',
    paddingBottom: 15,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#046BD2',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#233E5D',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#233E5D',
    marginBottom: 10,
    backgroundColor: '#F0F5FA',
    padding: 8,
    borderRadius: 4,
  },
  scoreBox: {
    backgroundColor: '#046BD2',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  scoreLabel: {
    color: 'white',
    fontSize: 12,
    marginBottom: 5,
  },
  scoreValue: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  scoreGrade: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  col: {
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    color: '#666',
  },
  scoreBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  scoreBarLabel: {
    width: 120,
    fontSize: 9,
  },
  scoreBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginRight: 10,
  },
  scoreBarFill: {
    height: 8,
    borderRadius: 4,
  },
  scoreBarValue: {
    width: 30,
    textAlign: 'right',
    fontSize: 9,
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F0F5FA',
    padding: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 6,
    borderBottom: '1px solid #E0E0E0',
  },
  tableCell: {
    flex: 1,
    fontSize: 9,
  },
  competitorCard: {
    padding: 10,
    backgroundColor: '#F8FAFC',
    borderRadius: 4,
    marginBottom: 8,
  },
  competitorName: {
    fontWeight: 'bold',
    fontSize: 11,
    marginBottom: 4,
  },
  competitorDomain: {
    fontSize: 9,
    color: '#666',
    marginBottom: 6,
  },
  strengthsWeaknesses: {
    flexDirection: 'row',
    marginTop: 6,
  },
  strengthsList: {
    flex: 1,
    paddingRight: 10,
  },
  weaknessesList: {
    flex: 1,
    paddingLeft: 10,
  },
  listTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  listItem: {
    fontSize: 8,
    marginBottom: 2,
  },
  recommendation: {
    padding: 10,
    marginBottom: 8,
    borderRadius: 4,
    borderLeftWidth: 3,
  },
  highPriority: {
    backgroundColor: '#FEF2F2',
    borderLeftColor: '#EF4444',
  },
  mediumPriority: {
    backgroundColor: '#FFFBEB',
    borderLeftColor: '#F59E0B',
  },
  lowPriority: {
    backgroundColor: '#EFF6FF',
    borderLeftColor: '#3B82F6',
  },
  recTitle: {
    fontWeight: 'bold',
    fontSize: 10,
    marginBottom: 4,
  },
  recDescription: {
    fontSize: 9,
    color: '#666',
    marginBottom: 4,
  },
  recImpact: {
    fontSize: 8,
    color: '#888',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 8,
    color: '#888',
    borderTop: '1px solid #E0E0E0',
    paddingTop: 10,
  },
  checkmark: {
    color: '#22C55E',
    marginRight: 4,
  },
  crossmark: {
    color: '#EF4444',
    marginRight: 4,
  },
});

const getScoreColor = (score: number): string => {
  if (score >= 80) return '#22C55E';
  if (score >= 60) return '#F59E0B';
  if (score >= 40) return '#F97316';
  return '#EF4444';
};

const getScoreGrade = (score: number): string => {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
};

interface ReportPDFProps {
  report: AuditReport;
}

function ReportPDFDocument({ report }: ReportPDFProps) {
  const formattedDate = new Date(report.generatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Document>
      {/* Page 1: Overview */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.logo}>Kynex Pro</Text>
          <Text style={styles.title}>SEO Audit Report</Text>
          <Text style={styles.subtitle}>{report.website}</Text>
          <Text style={styles.subtitle}>Generated on {formattedDate}</Text>
        </View>

        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Overall SEO Score</Text>
          <Text style={styles.scoreValue}>{report.overallScore}/100</Text>
          <Text style={styles.scoreGrade}>Grade: {getScoreGrade(report.overallScore)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Score Breakdown</Text>
          {[
            { label: 'Page Speed', score: report.pageSpeed.score },
            { label: 'Meta Tags', score: report.metaTags.score },
            { label: 'Backlinks', score: report.backlinks.score },
            { label: 'Keywords', score: report.keywords.score },
            { label: 'Mobile Friendliness', score: report.mobile.score },
            { label: 'Security', score: report.security.score },
            { label: 'Content Quality', score: report.content.score },
          ].map((item) => (
            <View key={item.label} style={styles.scoreBar}>
              <Text style={styles.scoreBarLabel}>{item.label}</Text>
              <View style={styles.scoreBarContainer}>
                <View
                  style={[
                    styles.scoreBarFill,
                    {
                      width: `${item.score}%`,
                      backgroundColor: getScoreColor(item.score),
                    },
                  ]}
                />
              </View>
              <Text style={styles.scoreBarValue}>{item.score}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Page Speed Analysis</Text>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Load Time:</Text>
              <Text style={styles.value}>{report.pageSpeed.loadTime}s</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>First Contentful Paint:</Text>
              <Text style={styles.value}>{report.pageSpeed.firstContentfulPaint}s</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Largest Contentful Paint:</Text>
              <Text style={styles.value}>{report.pageSpeed.largestContentfulPaint}s</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Time to Interactive:</Text>
              <Text style={styles.value}>{report.pageSpeed.timeToInteractive}s</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meta Tags</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Title: </Text>
            <Text style={styles.value}>{report.metaTags.title || 'Not found'} ({report.metaTags.titleLength} chars)</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Description: </Text>
            <Text style={styles.value}>{report.metaTags.description ? report.metaTags.description.substring(0, 100) + '...' : 'Not found'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={report.metaTags.hasOgTags ? styles.checkmark : styles.crossmark}>
              {report.metaTags.hasOgTags ? '✓' : '✗'}
            </Text>
            <Text style={styles.value}>Open Graph Tags</Text>
            <Text style={[report.metaTags.hasTwitterCards ? styles.checkmark : styles.crossmark, { marginLeft: 20 }]}>
              {report.metaTags.hasTwitterCards ? '✓' : '✗'}
            </Text>
            <Text style={styles.value}>Twitter Cards</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Kynex Pro SEO Audit | kynexpro.com | Page 1
        </Text>
      </Page>

      {/* Page 2: Backlinks & Keywords */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Backlink Profile</Text>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Total Backlinks: </Text>
              <Text style={styles.value}>{report.backlinks.total}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Dofollow: </Text>
              <Text style={styles.value}>{report.backlinks.dofollow}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Quality: </Text>
              <Text style={styles.value}>{report.backlinks.quality}</Text>
            </View>
          </View>
          <Text style={[styles.label, { marginTop: 10, marginBottom: 5 }]}>Top Referring Domains:</Text>
          {report.backlinks.topDomains.map((domain, i) => (
            <View key={i} style={styles.row}>
              <Text style={styles.value}>{domain.domain} (DA: {domain.authority})</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Keyword Rankings</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, styles.label]}>Keyword</Text>
              <Text style={[styles.tableCell, styles.label, { textAlign: 'center' }]}>Position</Text>
              <Text style={[styles.tableCell, styles.label, { textAlign: 'right' }]}>Volume</Text>
            </View>
            {report.keywords.ranking.map((kw, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={styles.tableCell}>{kw.keyword}</Text>
                <Text style={[styles.tableCell, { textAlign: 'center' }]}>#{kw.position}</Text>
                <Text style={[styles.tableCell, { textAlign: 'right' }]}>{kw.searchVolume.toLocaleString()}/mo</Text>
              </View>
            ))}
          </View>
          <Text style={[styles.label, { marginTop: 15, marginBottom: 5 }]}>Keyword Opportunities:</Text>
          {report.keywords.opportunities.map((opp, i) => (
            <View key={i} style={styles.row}>
              <Text style={styles.value}>{opp.keyword} (Difficulty: {opp.difficulty}%, Volume: {opp.volume.toLocaleString()})</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mobile & Security</Text>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Mobile Friendly:</Text>
              <Text style={report.mobile.isMobileFriendly ? styles.checkmark : styles.crossmark}>
                {report.mobile.isMobileFriendly ? '✓ Yes' : '✗ No'}
              </Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>HTTPS:</Text>
              <Text style={report.security.hasHttps ? styles.checkmark : styles.crossmark}>
                {report.security.hasHttps ? '✓ Secure' : '✗ Not Secure'}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.footer}>
          Kynex Pro SEO Audit | kynexpro.com | Page 2
        </Text>
      </Page>

      {/* Page 3: Competitors */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Competitor Analysis</Text>
          {report.competitors.map((comp, i) => (
            <View key={i} style={styles.competitorCard}>
              <Text style={styles.competitorName}>{comp.name} (Score: {comp.score}/100)</Text>
              <Text style={styles.competitorDomain}>{comp.domain} | Traffic: {comp.traffic}</Text>
              <View style={styles.strengthsWeaknesses}>
                <View style={styles.strengthsList}>
                  <Text style={[styles.listTitle, { color: '#22C55E' }]}>Strengths:</Text>
                  {comp.strengths.map((s, j) => (
                    <Text key={j} style={styles.listItem}>+ {s}</Text>
                  ))}
                </View>
                <View style={styles.weaknessesList}>
                  <Text style={[styles.listTitle, { color: '#EF4444' }]}>Weaknesses:</Text>
                  {comp.weaknesses.map((w, j) => (
                    <Text key={j} style={styles.listItem}>- {w}</Text>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>
          Kynex Pro SEO Audit | kynexpro.com | Page 3
        </Text>
      </Page>

      {/* Page 4: Recommendations */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          {report.recommendations.map((rec, i) => (
            <View
              key={i}
              style={[
                styles.recommendation,
                rec.priority === 'high' ? styles.highPriority :
                rec.priority === 'medium' ? styles.mediumPriority : styles.lowPriority,
              ]}
            >
              <Text style={styles.recTitle}>
                [{rec.priority.toUpperCase()}] {rec.title}
              </Text>
              <Text style={styles.recDescription}>{rec.description}</Text>
              <Text style={styles.recImpact}>Impact: {rec.impact}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Content Analysis</Text>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Word Count:</Text>
              <Text style={styles.value}>{report.content.wordCount.toLocaleString()}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Headings (H1/H2/H3):</Text>
              <Text style={styles.value}>
                {report.content.headingsStructure.h1}/{report.content.headingsStructure.h2}/{report.content.headingsStructure.h3}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Internal Links:</Text>
              <Text style={styles.value}>{report.content.internalLinks}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Images with Alt:</Text>
              <Text style={styles.value}>{report.content.imagesWithAlt}/{report.content.imagesWithAlt + report.content.imagesWithoutAlt}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.section, { marginTop: 20, padding: 15, backgroundColor: '#F0F5FA', borderRadius: 8 }]}>
          <Text style={[styles.label, { textAlign: 'center', marginBottom: 10 }]}>
            Need Help Improving Your SEO?
          </Text>
          <Text style={[styles.value, { textAlign: 'center' }]}>
            Contact Kynex Pro for a free consultation
          </Text>
          <Text style={[styles.value, { textAlign: 'center' }]}>
            kynexpro@gmail.com | kynexpro.com
          </Text>
        </View>

        <Text style={styles.footer}>
          Kynex Pro SEO Audit | kynexpro.com | Page 4
        </Text>
      </Page>
    </Document>
  );
}

export async function generatePDF(report: AuditReport): Promise<Blob> {
  const blob = await pdf(<ReportPDFDocument report={report} />).toBlob();
  return blob;
}

export function downloadPDF(report: AuditReport) {
  generatePDF(report).then((blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `seo-audit-${new Date().toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
}

export default ReportPDFDocument;
