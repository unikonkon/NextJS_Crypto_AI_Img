import { TechnicalIndicator } from '@/types/analysis';

// Helper functions for Technical Analysis tools

export const interpretRSI = (value: number): TechnicalIndicator => {
  let signal: 'BUY' | 'SELL' | 'HOLD' | 'NEUTRAL' = 'NEUTRAL';
  let description = '';

  if (value >= 70) {
    signal = 'SELL';
    description = `RSI อยู่ที่ ${value} แสดงว่าตลาดอาจ Overbought (ซื้อมากเกินไป) ควรระวังการปรับตัวลง`;
  } else if (value <= 30) {
    signal = 'BUY';
    description = `RSI อยู่ที่ ${value} แสดงว่าตลาดอาจ Oversold (ขายมากเกินไป) อาจมีโอกาสเด้งขึ้น`;
  } else if (value >= 50) {
    signal = 'HOLD';
    description = `RSI อยู่ที่ ${value} แสดงว่าตลาดมีแนวโน้มขาขึ้น`;
  } else {
    signal = 'HOLD';
    description = `RSI อยู่ที่ ${value} แสดงว่าตลาดมีแนวโน้มขาลง`;
  }

  return {
    name: 'RSI',
    value: value,
    signal,
    description
  };
};

export const interpretMACD = (macdLine: number, signalLine: number, histogram: number): TechnicalIndicator => {
  let signal: 'BUY' | 'SELL' | 'HOLD' | 'NEUTRAL' = 'NEUTRAL';
  let description = '';

  if (macdLine > signalLine && histogram > 0) {
    signal = 'BUY';
    description = 'MACD Line ตัด Signal Line ขึ้น พร้อม Histogram เป็นบวก → สัญญาณ Bullish';
  } else if (macdLine < signalLine && histogram < 0) {
    signal = 'SELL';
    description = 'MACD Line ตัด Signal Line ลง พร้อม Histogram เป็นลบ → สัญญาณ Bearish';
  } else if (macdLine > signalLine) {
    signal = 'HOLD';
    description = 'MACD Line อยู่เหนือ Signal Line → แนวโน้มขาขึ้น';
  } else {
    signal = 'HOLD';
    description = 'MACD Line อยู่ใต้ Signal Line → แนวโน้มขาลง';
  }

  return {
    name: 'MACD',
    value: `${macdLine.toFixed(4)}`,
    signal,
    description
  };
};

export const interpretMA = (currentPrice: number, ma20: number, ma50: number, ma200: number): TechnicalIndicator[] => {
  const indicators: TechnicalIndicator[] = [];

  // MA20 analysis
  let ma20Signal: 'BUY' | 'SELL' | 'HOLD' | 'NEUTRAL' = 'NEUTRAL';
  let ma20Description = '';
  
  if (currentPrice > ma20) {
    ma20Signal = 'BUY';
    ma20Description = `ราคาอยู่เหนือ MA20 (${ma20.toFixed(2)}) → แนวโน้มระยะสั้นขาขึ้น`;
  } else {
    ma20Signal = 'SELL';
    ma20Description = `ราคาอยู่ใต้ MA20 (${ma20.toFixed(2)}) → แนวโน้มระยะสั้นขาลง`;
  }

  indicators.push({
    name: 'MA20',
    value: ma20.toFixed(2),
    signal: ma20Signal,
    description: ma20Description
  });

  // MA200 analysis (long-term trend)
  let ma200Signal: 'BUY' | 'SELL' | 'HOLD' | 'NEUTRAL' = 'NEUTRAL';
  let ma200Description = '';
  
  if (currentPrice > ma200) {
    ma200Signal = 'BUY';
    ma200Description = `ราคาอยู่เหนือ MA200 (${ma200.toFixed(2)}) → ตลาดกบฎหลักขาขึ้น (Bull Market)`;
  } else {
    ma200Signal = 'SELL';
    ma200Description = `ราคาอยู่ใต้ MA200 (${ma200.toFixed(2)}) → ตลาดหลักขาลง (Bear Market)`;
  }

  indicators.push({
    name: 'MA200',
    value: ma200.toFixed(2),
    signal: ma200Signal,
    description: ma200Description
  });

  return indicators;
};

export const interpretBollingerBands = (currentPrice: number, upperBand: number, lowerBand: number, middleBand: number): TechnicalIndicator => {
  let signal: 'BUY' | 'SELL' | 'HOLD' | 'NEUTRAL' = 'NEUTRAL';
  let description = '';



  if (currentPrice >= upperBand) {
    signal = 'SELL';
    description = `ราคาชนเส้นบน Bollinger Band (${upperBand.toFixed(2)}) → อาจ Overbought`;
  } else if (currentPrice <= lowerBand) {
    signal = 'BUY';
    description = `ราคาชนเส้นล่าง Bollinger Band (${lowerBand.toFixed(2)}) → อาจ Oversold`;
  } else if (currentPrice > middleBand) {
    signal = 'HOLD';
    description = `ราคาอยู่เหนือเส้นกลาง BB (${middleBand.toFixed(2)}) → แรงซื้อมากกว่า`;
  } else {
    signal = 'HOLD';
    description = `ราคาอยู่ใต้เส้นกลาง BB (${middleBand.toFixed(2)}) → แรงขายมากกว่า`;
  }

  return {
    name: 'Bollinger Bands',
    value: `${upperBand.toFixed(2)} / ${middleBand.toFixed(2)} / ${lowerBand.toFixed(2)}`,
    signal,
    description
  };
};

export const interpretVolume = (currentVolume: number, averageVolume: number): TechnicalIndicator => {
  let signal: 'BUY' | 'SELL' | 'HOLD' | 'NEUTRAL' = 'NEUTRAL';
  let description = '';

  const volumeRatio = (currentVolume / averageVolume);

  if (volumeRatio >= 2) {
    signal = 'BUY';
    description = `ปริมาณซื้อขายสูงกว่าเฉลี่ย ${volumeRatio.toFixed(1)} เท่า → ยืนยันการเคลื่อนไหว`;
  } else if (volumeRatio >= 1.5) {
    signal = 'HOLD';
    description = `ปริมาณซื้อขายสูงกว่าเฉลี่ย ${volumeRatio.toFixed(1)} เท่า → สนใจเพิ่มขึ้น`;
  } else if (volumeRatio <= 0.5) {
    signal = 'NEUTRAL';
    description = `ปริมาณซื้อขายต่ำกว่าเฉลี่ย → ขาดความสนใจ`;
  } else {
    signal = 'NEUTRAL';
    description = `ปริมาณซื้อขายปกติ → ไม่มีสัญญาณชัดเจน`;
  }

  return {
    name: 'Volume',
    value: currentVolume.toLocaleString(),
    signal,
    description
  };
};

interface CandleData {
  open: number;
  high: number;
  low: number;
  close: number;
}

export const detectCandlestickPatterns = (candles: CandleData[]): TechnicalIndicator[] => {
  // This is a simplified pattern detection
  // In a real implementation, you would need more sophisticated pattern recognition
  const patterns: TechnicalIndicator[] = [];

  if (candles.length < 3) return patterns;

  const latest = candles[candles.length - 1];

  // Doji pattern
  const bodySize = Math.abs(latest.close - latest.open);
  const candleRange = latest.high - latest.low;
  
  if (bodySize / candleRange < 0.1) {
    patterns.push({
      name: 'Doji',
      value: 'Detected',
      signal: 'NEUTRAL',
      description: 'เทียน Doji พบ → ตลาดลังเลใจ อาจมีการเปลี่ยนแปลงทิศทาง'
    });
  }

  // Hammer pattern (simplified)
  const lowerShadow = latest.open < latest.close 
    ? latest.open - latest.low 
    : latest.close - latest.low;
  const upperShadow = latest.high - Math.max(latest.open, latest.close);

  if (lowerShadow > bodySize * 2 && upperShadow < bodySize * 0.5) {
    patterns.push({
      name: 'Hammer',
      value: 'Detected',
      signal: 'BUY',
      description: 'เทียน Hammer พบ → สัญญาณการเด้งขึ้น'
    });
  }

  return patterns;
};

// Utility function to format price levels
export const formatPriceLevel = (price: number): string => {
  if (price >= 1000) {
    return price.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
  return price.toFixed(4);
};

// Calculate percentage change
export const calculatePercentageChange = (current: number, previous: number): number => {
  return ((current - previous) / previous) * 100;
};