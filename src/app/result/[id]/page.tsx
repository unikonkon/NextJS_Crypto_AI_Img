'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import ChartResultCard from '@/components/ChartResultCard';
import { ChartAnalysis } from '@/types/analysis';

export default function ResultPage() {
  const [analysis, setAnalysis] = useState<ChartAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  useEffect(() => {
    if (!id) return;

    // Load from localStorage
    const savedAnalyses = JSON.parse(localStorage.getItem('chart-analyses') || '[]');
    const foundAnalysis = savedAnalyses.find((a: ChartAnalysis) => a.id === id);

    if (foundAnalysis) {
      setAnalysis(foundAnalysis);
    }
    
    setLoading(false);
  }, [id]);

  const handleSaveAnalysis = () => {
    if (!analysis) return;

    // Create downloadable JSON
    const dataStr = JSON.stringify(analysis, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `chart-analysis-${analysis.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDeleteAnalysis = () => {
    if (!analysis) return;

    if (confirm('คุณต้องการลบผลการวิเคราะห์นี้หรือไม่?')) {
      const savedAnalyses = JSON.parse(localStorage.getItem('chart-analyses') || '[]');
      const filteredAnalyses = savedAnalyses.filter((a: ChartAnalysis) => a.id !== analysis.id);
      localStorage.setItem('chart-analyses', JSON.stringify(filteredAnalyses));
      router.push('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" viewBox="0 0 24 24">
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
          <p className="text-gray-600">กำลังโหลดผลการวิเคราะห์...</p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            ไม่พบผลการวิเคราะห์
          </h1>
          <p className="text-gray-600 mb-6">
            ผลการวิเคราะห์ที่คุณค้นหาไม่มีอยู่ หรืออาจถูกลบไปแล้ว
          </p>
          <Link
            href="/upload"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            วิเคราะห์กราฟใหม่
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              กลับหน้าหลัก
            </Link>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSaveAnalysis}
              className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              บันทึกไฟล์
            </button>
            
            <button
              onClick={handleDeleteAnalysis}
              className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              ลบ
            </button>
            
            <Link
              href="/upload"
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              วิเคราะห์ใหม่
            </Link>
          </div>
        </div>

        {/* Analysis Result */}
        <ChartResultCard analysis={analysis} />

        {/* Action Buttons */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            ขั้นตอนต่อไป
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">📊</div>
              <h4 className="font-medium text-blue-900">ติดตามตลาด</h4>
              <p className="text-sm text-blue-700 mt-1">
                ติดตามการเคลื่อนไหวของราคาตาม Support/Resistance ที่ระบุ
              </p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">💰</div>
              <h4 className="font-medium text-green-900">จัดการความเสี่ยง</h4>
              <p className="text-sm text-green-700 mt-1">
                ตั้ง Stop Loss และ Take Profit ตามที่แนะนำ
              </p>
            </div>
            
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl mb-2">⚠️</div>
              <h4 className="font-medium text-yellow-900">คำเตือน</h4>
              <p className="text-sm text-yellow-700 mt-1">
                ผลการวิเคราะห์นี้เป็นเพียงข้อมูลอ้างอิง ไม่ใช่คำแนะนำการลงทุน
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}