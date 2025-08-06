'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImagePreview from '@/components/ImagePreview';
import { ChartAnalysis } from '@/types/analysis';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState<'th' | 'en'>('th');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleAnalyze = async () => {
    if (!file) {
      setError('กรุณาเลือกไฟล์ภาพกราฟ');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('language', language);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        // Save to localStorage
        const analysisData: ChartAnalysis = result.data;
        const savedAnalyses = JSON.parse(localStorage.getItem('chart-analyses') || '[]');
        savedAnalyses.unshift(analysisData);
        
        // Keep only last 50 analyses
        if (savedAnalyses.length > 50) {
          savedAnalyses.splice(50);
        }
        
        localStorage.setItem('chart-analyses', JSON.stringify(savedAnalyses));

        // Navigate to result page
        router.push(`/result/${analysisData.id}`);
      } else {
        setError(result.error || 'เกิดข้อผิดพลาดในการวิเคราะห์');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Crypto Chart Analyzer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            อัปโหลดภาพกราฟเทคนิคของ Cryptocurrency เพื่อให้ AI วิเคราะห์แนวโน้ม Technical Indicators และให้คำแนะนำการซื้อขาย
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* File Upload */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              อัปโหลดภาพกราฟ
            </h2>
            <ImagePreview file={file} onFileChange={setFile} />
          </div>

          {/* Language Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              เลือกภาษาการวิเคราะห์
            </h3>
            <div className="flex space-x-4">
              <button
                onClick={() => setLanguage('th')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  language === 'th'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🇹🇭 ภาษาไทย
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🇺🇸 English
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Analyze Button */}
          <div className="flex justify-center">
            <button
              onClick={handleAnalyze}
              disabled={!file || isAnalyzing}
              className={`px-8 py-3 rounded-lg font-medium text-lg transition-all ${
                !file || isAnalyzing
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {isAnalyzing ? (
                <div className="flex items-center space-x-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>กำลังวิเคราะห์...</span>
                </div>
              ) : (
                'เริ่มวิเคราะห์กราฟ'
              )}
            </button>
          </div>

          {/* Info */}
          <div className="mt-8 bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-blue-900 mb-3">
              ข้อมูลที่ AI จะวิเคราะห์:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div>
                <h4 className="font-medium mb-2">Technical Indicators:</h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• RSI (Relative Strength Index)</li>
                  <li>• MACD (Moving Average Convergence Divergence)</li>
                  <li>• Moving Averages (MA20, MA50, MA200)</li>
                  <li>• Bollinger Bands</li>
                  <li>• Volume Analysis</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Chart Patterns:</h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• Support & Resistance Levels</li>
                  <li>• Trend Lines</li>
                  <li>• Candlestick Patterns</li>
                  <li>• Breakout Patterns</li>
                  <li>• Price Action Analysis</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}