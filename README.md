# CryptoVision AI - Crypto Chart Analysis SaaS

A Next.js application that uses Google's Gemini AI to analyze cryptocurrency chart images and provide technical analysis insights.

## Features

- **AI-Powered Analysis**: Upload crypto chart images and get detailed technical analysis using Gemini AI
- **Pattern Recognition**: Identifies chart patterns like triangles, wedges, support/resistance levels
- **Technical Indicators**: Analysis of RSI, MACD, Bollinger Bands, and other key indicators
- **Trading Recommendations**: Provides buy/sell/hold signals with confidence levels
- **Multiple Timeframes**: Support for 15m, 1h, 4h, 1d, 1w timeframes
- **Interactive Dashboard**: Beautiful UI to view analysis results and insights

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crypto-analysis-saas
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## How to Use

1. **Upload Charts**: Go to `/upload` and drag/drop or select your crypto chart images
2. **Select Timeframes**: Choose the appropriate timeframe for each chart (15m, 1h, 4h, 1d, 1w)
3. **Analyze**: Click "Analyze Charts with AI" to process your images
4. **View Results**: Review detailed analysis including trends, patterns, indicators, and recommendations

## API Integration

### Gemini AI Setup

The application uses Google's Gemini 1.5 Pro model for image analysis. Make sure you have:

1. **Valid API Key**: Get it from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. **Proper Billing**: Ensure your Google Cloud account has billing enabled
3. **API Access**: Verify the Gemini API is enabled for your project

### API Endpoints

- `POST /api/analyze`: Main endpoint that processes uploaded charts and returns analysis
  - Accepts `multipart/form-data` with files and timeframe parameters
  - Returns structured analysis data including trends, patterns, and recommendations

## Architecture

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Component library
- **Recharts**: Data visualization

### Backend  
- **Next.js API Routes**: Serverless functions
- **Gemini AI Integration**: Real-time image analysis
- **File Processing**: Multipart form handling and image conversion

### Data Flow
1. User uploads chart images through the upload interface
2. Frontend calls `/api/analyze` with FormData containing files and metadata
3. Backend converts images to base64 and sends to Gemini AI
4. Gemini analyzes charts and returns text-based technical analysis
5. Backend parses AI response into structured data
6. Frontend displays results in an interactive dashboard

## Development

### Dependencies Fixed
- **React Day Picker**: Upgraded from v8 to v9 to support date-fns v4
- **Peer Dependencies**: Using `--legacy-peer-deps` for React 19 compatibility
- **Type Safety**: Added proper TypeScript types throughout

### Key Components
- `app/upload/page.tsx`: File upload interface with drag-and-drop
- `app/api/analyze/route.ts`: Main analysis API with Gemini integration
- `app/analysis/results/page.tsx`: Results dashboard with interactive charts
- `components/ui/*`: Reusable UI components

## Troubleshooting

### Common Issues

**Installation Errors**
```bash
# Use legacy peer deps for React 19 compatibility
npm install --legacy-peer-deps
```

**API Key Issues**
- Verify your Gemini API key is correct
- Check that billing is enabled on your Google Cloud account
- Ensure the API key has proper permissions

**Analysis Failures**
- Check image format is supported (PNG, JPG, JPEG, GIF, WebP)
- Verify image size is under 10MB
- Ensure images contain visible chart data

### Error Messages
- "Gemini API key not configured": Add `GEMINI_API_KEY` to `.env.local`
- "Analysis failed": Check API key validity and billing status
- "No analysis results found": Complete the upload process first

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

[Add your license here]

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the GitHub issues
3. Submit a new issue with detailed information

---

**Note**: This application is for educational purposes. All trading recommendations should be verified independently before making investment decisions. 