import { NextRequest, NextResponse } from 'next/server';
import type { LeadData, AuditReport } from '@/lib/types';

const WEBHOOK_URL = process.env.WEBHOOK_URL;

interface SubmitLeadRequest {
  lead: LeadData;
  report: AuditReport;
}

export async function POST(request: NextRequest) {
  try {
    const body: SubmitLeadRequest = await request.json();
    const { lead, report } = body;

    // Validate required fields
    if (!lead.fullName || !lead.email || !lead.phone || !lead.website) {
      return NextResponse.json(
        { error: 'All fields are required: fullName, email, phone, website' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(lead.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Prepare webhook payload
    const webhookPayload = {
      timestamp: new Date().toISOString(),
      source: 'kynexpro-seo-audit',
      lead: {
        fullName: lead.fullName,
        email: lead.email,
        phone: lead.phone,
        website: lead.website,
        auditScore: report.overallScore,
        submittedAt: lead.submittedAt,
      },
      auditSummary: {
        overallScore: report.overallScore,
        pageSpeedScore: report.pageSpeed.score,
        metaTagsScore: report.metaTags.score,
        backlinksScore: report.backlinks.score,
        keywordsScore: report.keywords.score,
        mobileScore: report.mobile.score,
        securityScore: report.security.score,
        contentScore: report.content.score,
        topRecommendations: report.recommendations
          .filter(r => r.priority === 'high')
          .map(r => r.title),
        competitorCount: report.competitors.length,
      },
      fullReport: report,
    };

    // Send to webhook if configured
    if (WEBHOOK_URL) {
      try {
        const webhookResponse = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookPayload),
        });

        if (!webhookResponse.ok) {
          console.error('Webhook error:', webhookResponse.status, await webhookResponse.text());
          // Don't fail the request if webhook fails - still return success to user
        }
      } catch (webhookError) {
        console.error('Webhook request failed:', webhookError);
        // Don't fail the request if webhook fails
      }
    } else {
      console.log('Webhook URL not configured. Lead data:', JSON.stringify(webhookPayload, null, 2));
    }

    return NextResponse.json({
      success: true,
      message: 'Lead submitted successfully',
    });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit lead. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit lead data.' },
    { status: 405 }
  );
}
