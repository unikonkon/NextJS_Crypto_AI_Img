# Crypto Chart Analyzer

เว็บแอปพลิเคชันสำหรับวิเคราะห์กราฟ Cryptocurrency ด้วย AI โดยใช้ Next.js 15 + Google Gemini AI

## ✨ Features

- 🤖 **AI-Powered Analysis**: วิเคราะห์กราฟด้วย Google Gemini 1.5 Pro
- 📊 **Technical Indicators**: รองรับ RSI, MACD, Bollinger Bands, Moving Averages, Volume
- 📈 **Trend Identification**: ระบุแนวโน้ม Bullish, Bearish, Sideways พร้อมระดับความมั่นใจ
- 🎯 **Support & Resistance**: ระบุแนวรับและแนวต้านที่สำคัญ
- 💰 **Trading Signals**: ให้สัญญาณ BUY/SELL/HOLD พร้อม Entry Point และ Stop Loss
- 💾 **Local Storage**: บันทึกผลการวิเคราะห์ในเครื่อง
- 🌐 **Multilingual**: รองรับภาษาไทยและภาษาอังกฤษ
- 📱 **Responsive Design**: ใช้งานได้บนทุกอุปกรณ์

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **UI**: TailwindCSS 4
- **AI**: Google Gemini 1.5 Pro API
- **Language**: TypeScript
- **Storage**: localStorage (client-side)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/analyze/route.ts          # API endpoint สำหรับวิเคราะห์
│   ├── upload/page.tsx               # หน้าอัปโหลดภาพ
│   ├── result/[id]/page.tsx          # หน้าแสดงผลการวิเคราะห์
│   ├── page.tsx                      # หน้าหลัก
│   └── layout.tsx                    # Layout หลัก
├── components/
│   ├── ImagePreview.tsx              # Component อัปโหลดและแสดงภาพ
│   └── ChartResultCard.tsx           # Component แสดงผลการวิเคราะห์
├── lib/
│   ├── gemini.ts                     # Gemini AI integration
│   └── ta-tools.ts                   # Technical Analysis utilities
├── types/
│   └── analysis.ts                   # TypeScript type definitions
└── public/uploads/                   # Directory สำหรับไฟล์อัปโหลด
```

## ⚡ Quick Start

### 1. Clone & Install

```bash
git clone <your-repo>
cd nextjs-img-ai
npm install
```

### 2. Environment Setup

สร้างไฟล์ `.env.local`:

```bash
cp .env.example .env.local
```

แก้ไขไฟล์ `.env.local`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Get Gemini API Key

1. ไปที่ [Google AI Studio](https://aistudio.google.com/app/apikey)
2. สร้าง API Key ใหม่
3. Copy และใส่ในไฟล์ `.env.local`

### 4. Run Development Server

```bash
npm run dev
```

เปิดเบราว์เซอร์ไปที่ http://localhost:3000

## 📖 How to Use

### 1. อัปโหลดภาพกราฟ

- ไปที่หน้า "เริ่มวิเคราะห์กราฟ"
- ลากไฟล์ภาพกราฟมาวาง หรือคลิกเลือกไฟล์
- รองรับไฟล์: PNG, JPG, JPEG (ขนาดไม่เกิน 10MB)
- เลือกภาษาการวิเคราะห์ (ไทย/อังกฤษ)

### 2. รับผลการวิเคราะห์

AI จะวิเคราะห์และให้ข้อมูล:

- **แนวโน้มหลัก**: Bullish/Bearish/Sideways + ระดับความมั่นใจ
- **แนวรับ-แนวต้าน**: Support & Resistance levels
- **Technical Indicators**: RSI, MACD, MA, Bollinger Bands, Volume
- **คำแนะนำการซื้อขาย**: BUY/SELL/HOLD พร้อม Entry/Stop Loss/Take Profit

### 3. จัดการผลการวิเคราะห์

- ดูประวัติการวิเคราะห์ในหน้าหลัก
- บันทึกผลเป็นไฟล์ JSON
- ลบผลการวิเคราะห์ที่ไม่ต้องการ

## 🔧 API Usage

### POST /api/analyze

วิเคราะห์ภาพกราฟ

**Request:**
```bash
curl -X POST http://localhost:3000/api/analyze \
  -F 'file=@chart.png' \
  -F 'language=th'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "trend": "BULLISH",
    "confidence": 85,
    "keyLevels": {
      "support": [42000, 41500],
      "resistance": [45000, 46000]
    },
    "indicators": [...],
    "recommendation": {
      "action": "BUY",
      "entryPoint": 43000,
      "stopLoss": 41800,
      "takeProfit": 46500,
      "reasoning": "..."
    },
    "rawAnalysis": "..."
  }
}
```

## 📊 Technical Indicators Support

| Indicator | Description | Usage |
|-----------|-------------|-------|
| RSI | Relative Strength Index | หา overbought/oversold (>70 = overbought, <30 = oversold) |
| MACD | Moving Average Convergence Divergence | หาจุดตัดเส้นสัญญาณ |
| MA | Moving Averages (20, 50, 200) | แนวโน้มระยะสั้น/ยาว |
| Bollinger Bands | ความผันผวนของราคา | ช่วงราคาและ overbought/oversold |
| Volume | ปริมาณการซื้อขาย | ยืนยันแนวโน้มและการเคลื่อนไหว |

## ⚠️ Important Notes

- **ไม่ใช่คำแนะนำการลงทุน**: ผลการวิเคราะห์นี้เป็นเพียงข้อมูลเพื่อการศึกษา
- **ความถูกต้อง**: AI อาจให้ผลลัพธ์ที่ไม่ถูกต้อง 100%
- **ความเสี่ยง**: การลงทุนมีความเสี่ยง ควรศึกษาข้อมูลเพิ่มเติม
- **API Limits**: Gemini API มีขีดจำกัดการใช้งาน

## 🔄 Development

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

### Project Dependencies

- `@google/generative-ai`: Gemini AI SDK
- `uuid`: สำหรับสร้าง unique IDs
- `tailwindcss`: UI styling
- `typescript`: Type safety

## 🚀 Future Enhancements

- [ ] **Pine Script Parser**: วิเคราะห์ TradingView JSON
- [ ] **Real-time Data**: เชื่อมต่อ Binance API / CoinGecko
- [ ] **User Authentication**: ระบบ login และบันทึกข้อมูล
- [ ] **Database Storage**: บันทึกผลในฐานข้อมูล
- [ ] **Chart.js Integration**: สร้างกราฟแบบ interactive
- [ ] **Mobile App**: React Native version
- [ ] **Multiple Chart Analysis**: วิเคราะห์หลายกราฟพร้อมกัน
- [ ] **Portfolio Tracking**: ติดตามพอร์ตการลงทุน

## 📄 License

MIT License - ใช้งานได้อย่างเสรี

## 🤝 Contributing

Welcome! Pull requests และ issues สามารถส่งได้ตลอดเวลา

---

**⚡ Built with Next.js 15 & Google Gemini AI**