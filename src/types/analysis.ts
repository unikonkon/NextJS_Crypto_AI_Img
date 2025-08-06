export interface TechnicalIndicator {
  name: string;
  value: number | string;
  signal: 'BUY' | 'SELL' | 'HOLD' | 'NEUTRAL';
  description: string;
}

export interface ChartAnalysis {
  id: string;
  timestamp: Date;
  imageUrl: string;
  trend: 'BULLISH' | 'BEARISH' | 'SIDEWAYS';
  confidence: number; // 0-100
  keyLevels: {
    support: number[];
    resistance: number[];
  };
  indicators: TechnicalIndicator[];
  recommendation: {
    action: 'BUY' | 'SELL' | 'HOLD';
    entryPoint?: number;
    stopLoss?: number;
    takeProfit?: number;
    reasoning: string;
  };
  rawAnalysis: string; // Raw text from Gemini
}

export interface AnalysisRequest {
  file: File;
  language?: 'th' | 'en';
}

export interface AnalysisResponse {
  success: boolean;
  data?: ChartAnalysis;
  error?: string;
}