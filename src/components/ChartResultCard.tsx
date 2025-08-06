'use client';

import { ChartAnalysis } from '@/types/analysis';
import Image from 'next/image';

interface ChartResultCardProps {
  analysis: ChartAnalysis;
}

export default function ChartResultCard({ analysis }: ChartResultCardProps) {
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'BULLISH':
        return 'text-green-600 bg-green-100';
      case 'BEARISH':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'BUY':
        return 'text-green-700 bg-green-100';
      case 'SELL':
        return 'text-red-700 bg-red-100';
      case 'HOLD':
        return 'text-blue-700 bg-blue-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'BUY':
        return 'bg-green-600 hover:bg-green-700';
      case 'SELL':
        return 'bg-red-600 hover:bg-red-700';
      default:
        return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            ผลการวิเคราะห์กราฟ
          </h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTrendColor(analysis.trend)}`}>
            {analysis.trend}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          วิเคราะห์เมื่อ: {new Date(analysis.timestamp).toLocaleString('th-TH')}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Chart Image */}
        <div className="relative">
          <Image
            src={analysis.imageUrl}
            alt="Analyzed chart"
            width={800}
            height={400}
            className="w-full h-auto rounded-lg border"
          />
        </div>

        {/* Trend & Confidence */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">แนวโน้มหลัก</h3>
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTrendColor(analysis.trend)}`}>
              {analysis.trend}
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm">
                <span>ความมั่นใจ:</span>
                <span className="font-medium">{analysis.confidence}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${analysis.confidence}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Levels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-semibold text-red-700 mb-2">แนวต้าน (Resistance)</h3>
            <div className="space-y-1">
              {analysis.keyLevels.resistance.map((level, index) => (
                <div key={index} className="text-sm font-mono text-red-600">
                  ${level.toLocaleString()}
                </div>
              ))}
              {analysis.keyLevels.resistance.length === 0 && (
                <div className="text-sm text-gray-500">ไม่พบข้อมูล</div>
              )}
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-700 mb-2">แนวรับ (Support)</h3>
            <div className="space-y-1">
              {analysis.keyLevels.support.map((level, index) => (
                <div key={index} className="text-sm font-mono text-green-600">
                  ${level.toLocaleString()}
                </div>
              ))}
              {analysis.keyLevels.support.length === 0 && (
                <div className="text-sm text-gray-500">ไม่พบข้อมูล</div>
              )}
            </div>
          </div>
        </div>

        {/* Technical Indicators */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Technical Indicators</h3>
          <div className="space-y-3">
            {analysis.indicators.map((indicator, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{indicator.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-mono text-gray-600">
                      {indicator.value}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getSignalColor(indicator.signal)}`}>
                      {indicator.signal}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{indicator.description}</p>
              </div>
            ))}
            {analysis.indicators.length === 0 && (
              <div className="text-sm text-gray-500">ไม่พบ Technical Indicators</div>
            )}
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-3">คำแนะนำการซื้อขาย</h3>
          
          <div className="flex items-center space-x-4 mb-4">
            <button className={`px-6 py-2 rounded-lg text-white font-medium ${getActionColor(analysis.recommendation.action)}`}>
              {analysis.recommendation.action}
            </button>
            <div className="text-sm text-gray-600">
              แนะนำ: {analysis.recommendation.action}
            </div>
          </div>

          {analysis.recommendation.entryPoint && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-xs text-gray-500 uppercase tracking-wide">Entry Point</div>
                <div className="text-lg font-mono font-semibold text-blue-600">
                  ${analysis.recommendation.entryPoint.toLocaleString()}
                </div>
              </div>
              {analysis.recommendation.stopLoss && (
                <div className="text-center">
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Stop Loss</div>
                  <div className="text-lg font-mono font-semibold text-red-600">
                    ${analysis.recommendation.stopLoss.toLocaleString()}
                  </div>
                </div>
              )}
              {analysis.recommendation.takeProfit && (
                <div className="text-center">
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Take Profit</div>
                  <div className="text-lg font-mono font-semibold text-green-600">
                    ${analysis.recommendation.takeProfit.toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="bg-white p-4 rounded border">
            <h4 className="font-medium text-gray-900 mb-2">เหตุผล:</h4>
            <p className="text-sm text-gray-700">{analysis.recommendation.reasoning}</p>
          </div>
        </div>

        {/* Raw Analysis */}
        <details className="bg-gray-50 rounded-lg">
          <summary className="p-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-100">
            ข้อมูลการวิเคราะห์แบบเต็ม (Raw Analysis)
          </summary>
          <div className="p-4 pt-0">
            <pre className="text-xs text-gray-600 whitespace-pre-wrap overflow-x-auto">
              {analysis.rawAnalysis}
            </pre>
          </div>
        </details>
      </div>
    </div>
  );
}