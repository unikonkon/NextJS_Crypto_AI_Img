import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChartAnalysis } from '@/types/analysis';
import { v4 as uuidv4 } from 'uuid';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const analyzeWithGemini = async (base64Image: string, language: 'th' | 'en' = 'th'): Promise<ChartAnalysis> => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

  const prompt = language === 'th' 
    ? `วิเคราะห์กราฟ Crypto ภาพนี้ให้ละเอียด โดยระบุ:

1. แนวโน้มหลัก (Bullish/Bearish/Sideways) พร้อมระดับความมั่นใจ (0-100%)
2. แนวรับ (Support) และแนวต้าน (Resistance) ที่สำคัญ
3. Technical Indicators ที่เห็นในกราฟ เช่น:
   - RSI: หา overbought/oversold (>70 = overbought, <30 = oversold)
   - MACD: สัญญาณตัดเส้น
   - Moving Average: MA20, MA50, MA200
   - Bollinger Bands: ความผันผวน
   - Volume: ปริมาณการซื้อขาย
   - Candlestick Pattern: รูปแบบเทียน

4. จุดเข้าซื้อขาย (Entry Point) พร้อม Stop Loss และ Take Profit
5. คำแนะนำการซื้อขาย (BUY/SELL/HOLD) พร้อมเหตุผล

กรุณาตอบเป็นรูปแบบ JSON ดังนี้:
{
  "trend": "BULLISH|BEARISH|SIDEWAYS",
  "confidence": 85,
  "keyLevels": {
    "support": [42000, 41500],
    "resistance": [45000, 46000]
  },
  "indicators": [
    {
      "name": "RSI",
      "value": "45",
      "signal": "NEUTRAL",
      "description": "RSI อยู่ที่ 45 แสดงว่าตลาดไม่มี overbought หรือ oversold"
    }
  ],
  "recommendation": {
    "action": "BUY",
    "entryPoint": 43000,
    "stopLoss": 41800,
    "takeProfit": 46500,
    "reasoning": "เหตุผลการแนะนำ"
  }
}`
    : `Analyze this crypto chart image in detail. Identify:

1. Main trend (Bullish/Bearish/Sideways) with confidence level (0-100%)
2. Key support and resistance levels
3. Technical indicators visible in the chart:
   - RSI: overbought/oversold levels (>70 = overbought, <30 = oversold)
   - MACD: signal line crossovers
   - Moving Averages: MA20, MA50, MA200
   - Bollinger Bands: volatility analysis
   - Volume: trading volume analysis
   - Candlestick Patterns: pattern recognition

4. Entry points with Stop Loss and Take Profit levels
5. Trading recommendation (BUY/SELL/HOLD) with reasoning

Please respond in JSON format:
{
  "trend": "BULLISH|BEARISH|SIDEWAYS",
  "confidence": 85,
  "keyLevels": {
    "support": [42000, 41500],
    "resistance": [45000, 46000]
  },
  "indicators": [
    {
      "name": "RSI",
      "value": "45",
      "signal": "NEUTRAL",
      "description": "RSI at 45 indicates neutral market conditions"
    }
  ],
  "recommendation": {
    "action": "BUY",
    "entryPoint": 43000,
    "stopLoss": 41800,
    "takeProfit": 46500,
    "reasoning": "Reason for recommendation"
  }
}`;

  try {
    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: 'image/png',
          data: base64Image.replace(/^data:image\/\w+;base64,/, ''),
        }
      },
      prompt
    ]);

    const response = await result.response;
    const text = response.text();

    // Try to parse JSON from the response
    let analysisData;
    try {
      // Extract JSON from the response text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch {
      // If JSON parsing fails, create a basic analysis from the text
      analysisData = {
        trend: 'SIDEWAYS',
        confidence: 50,
        keyLevels: { support: [], resistance: [] },
        indicators: [],
        recommendation: {
          action: 'HOLD',
          reasoning: 'Unable to parse detailed analysis'
        }
      };
    }

    const analysis: ChartAnalysis = {
      id: uuidv4(),
      timestamp: new Date(),
      imageUrl: '', // Will be set by the caller
      trend: analysisData.trend || 'SIDEWAYS',
      confidence: analysisData.confidence || 50,
      keyLevels: analysisData.keyLevels || { support: [], resistance: [] },
      indicators: analysisData.indicators || [],
      recommendation: analysisData.recommendation || {
        action: 'HOLD',
        reasoning: 'No specific recommendation available'
      },
      rawAnalysis: text
    };

    return analysis;

  } catch (error) {
    console.error('Error analyzing with Gemini:', error);
    throw new Error('Failed to analyze chart with Gemini AI');
  }
};

export const fileToBase64 = async (file: File): Promise<string> => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  return `data:${file.type};base64,${buffer.toString('base64')}`;
};