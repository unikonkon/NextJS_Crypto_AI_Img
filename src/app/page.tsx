'use client';

import Link from 'next/link';

export default function HomePage() {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Crypto Chart Analyzer
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              วิเคราะห์กราฟ Cryptocurrency ด้วย AI ขั้นสูง โดยใช้ Gemini 1.5 Pro 
              เพื่อให้คำแนะนำการซื้อขายที่แม่นยำ พร้อม Technical Indicators
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/upload"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-lg"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                เริ่มวิเคราะห์กราฟ
              </Link>
              <a
                href="#features"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors text-lg"
              >
                เรียนรู้เพิ่มเติม
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ฟีเจอร์หลัก
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              เครื่องมือวิเคราะห์กราฟที่ครบครันด้วยเทคโนโลยี AI ขั้นสูง
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Technical Analysis</h3>
              <p className="text-gray-600">
                วิเคราะห์ RSI, MACD, Bollinger Bands, Moving Averages และ Volume
              </p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trend Identification</h3>
              <p className="text-gray-600">
                ระบุแนวโน้ม Bullish, Bearish หรือ Sideways พร้อมระดับความมั่นใจ
              </p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 text-white rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Support & Resistance</h3>
              <p className="text-gray-600">
                ระบุแนวรับและแนวต้านที่สำคัญสำหรับการตัดสินใจ
              </p>
            </div>

            <div className="text-center p-6 bg-yellow-50 rounded-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-600 text-white rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trading Signals</h3>
              <p className="text-gray-600">
                ให้สัญญาณ BUY, SELL หรือ HOLD พร้อม Entry Point และ Stop Loss
              </p>
            </div>

            <div className="text-center p-6 bg-red-50 rounded-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Analysis</h3>
              <p className="text-gray-600">
                ใช้ Google Gemini 1.5 Pro สำหรับการวิเคราะห์ที่แม่นยำ
              </p>
            </div>

            <div className="text-center p-6 bg-indigo-50 rounded-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">บันทึกผลการวิเคราะห์</h3>
              <p className="text-gray-600">
                เก็บประวัติการวิเคราะห์และสามารถดาวน์โหลดผลลัพธ์ได้
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            เริ่มต้นวิเคราะห์กราฟของคุณ
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            อัปโหลดภาพกราฟ Cryptocurrency และรับการวิเคราะห์โดย AI ทันที
          </p>
          <Link
            href="/upload"
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-lg"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            เริ่มต้นใช้งาน
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Crypto Chart Analyzer</h3>
            <p className="text-gray-400 mb-4">
              Powered by Next.js 15 & Google Gemini AI
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <span>⚠️ ข้อมูลนี้เป็นเพียงการวิเคราะห์เพื่อการศึกษา</span>
              <span>💡 ไม่ใช่คำแนะนำการลงทุน</span>
              <span>📊 ผลการวิเคราะห์อาจไม่ถูกต้อง 100%</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}