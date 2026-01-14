import { NextRequest, NextResponse } from 'next/server';
import { performSEOAudit } from '@/lib/brightdata';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'Website URL is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    try {
      new URL(normalizedUrl);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Perform the SEO audit
    const auditReport = await performSEOAudit(normalizedUrl);

    return NextResponse.json({
      success: true,
      report: auditReport,
    });
  } catch (error) {
    console.error('SEO Audit error:', error);
    return NextResponse.json(
      { error: 'Failed to perform SEO audit. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST with a URL.' },
    { status: 405 }
  );
}
