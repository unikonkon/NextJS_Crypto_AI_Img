import { NextRequest, NextResponse } from 'next/server';
import { analyzeWithGemini, fileToBase64 } from '@/lib/gemini';
import { AnalysisResponse } from '@/types/analysis';

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file = data.get('file') as File;
    const language = (data.get('language') as string) || 'th';

    if (!file) {
      return NextResponse.json({
        success: false,
        error: 'No file uploaded'
      } as AnalysisResponse, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({
        success: false,
        error: 'File must be an image'
      } as AnalysisResponse, { status: 400 });
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({
        success: false,
        error: 'File size must be less than 10MB'
      } as AnalysisResponse, { status: 400 });
    }

    // Convert file to base64
    const base64Image = await fileToBase64(file);

    // Analyze with Gemini
    const analysis = await analyzeWithGemini(base64Image, language as 'th' | 'en');

    // Set the image URL (in a real app, you'd save the file and return the URL)
    analysis.imageUrl = base64Image;

    return NextResponse.json({
      success: true,
      data: analysis
    } as AnalysisResponse);

  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to analyze image'
    } as AnalysisResponse, { status: 500 });
  }
}