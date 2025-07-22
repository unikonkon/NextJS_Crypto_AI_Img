"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  Share2,
  AlertTriangle,
  CheckCircle,
  Target,
  Shield,
  ArrowLeft,
  FileImage,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Sample price data for visualization
const mockPriceData = [
  { time: "00:00", price: 42000, volume: 1200 },
  { time: "04:00", price: 42150, volume: 1350 },
  { time: "08:00", price: 42300, volume: 1100 },
  { time: "12:00", price: 42500, volume: 1450 },
  { time: "16:00", price: 42650, volume: 1300 },
  { time: "20:00", price: 42800, volume: 1250 },
  { time: "24:00", price: 43000, volume: 1400 },
]

export default function AnalysisResultsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Get analysis results from sessionStorage
    const storedResults = sessionStorage.getItem("analysisResults")
    if (storedResults) {
      try {
        const data = JSON.parse(storedResults)
        setAnalysisData(data)
        setLoading(false)
      } catch (err) {
        setError("Failed to parse analysis results")
        setLoading(false)
      }
    } else {
      setError("No analysis results found. Please upload and analyze charts first.")
      setLoading(false)
    }
  }, [])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "bullish":
        return <TrendingUp className="h-5 w-5 text-green-600" />
      case "bearish":
        return <TrendingDown className="h-5 w-5 text-red-600" />
      default:
        return <Minus className="h-5 w-5 text-gray-600" />
    }
  }

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "buy":
        return "bg-green-100 text-green-800 border-green-200"
      case "sell":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analysis results...</p>
        </div>
      </div>
    )
  }

  if (error || !analysisData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Analysis Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button asChild>
            <Link href="/upload">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Upload New Charts
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const analysis = analysisData.analysis

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analysis Results</h1>
            <p className="text-gray-600">AI-powered technical analysis of your crypto charts</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span>Analysis ID: {analysisData.id}</span>
              <span>•</span>
              <span>{new Date(analysisData.timestamp).toLocaleString()}</span>
              <span>•</span>
              <span>{analysisData.files.length} chart{analysisData.files.length > 1 ? 's' : ''} analyzed</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Uploaded Files Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Analyzed Charts</CardTitle>
            <CardDescription>Files processed in this analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {analysisData.files.map((file: any, index: number) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FileImage className="h-8 w-8 text-gray-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.filename}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                      <span>•</span>
                      <Badge variant="secondary" className="text-xs">
                        {file.timeframe}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Overall Summary */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Overall Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {getTrendIcon(analysis.overall.trend)}
                <span className="text-2xl font-bold capitalize">{analysis.overall.trend}</span>
              </div>
              <Progress value={analysis.overall.confidence} className="mt-2" />
              <p className="text-xs text-gray-500 mt-1">{analysis.overall.confidence}% confidence</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Signal</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={`${getSignalColor(analysis.overall.signal)} text-lg px-3 py-1`}>
                {analysis.overall.signal.toUpperCase()}
              </Badge>
              <p className="text-sm text-gray-600 mt-2">{analysis.overall.strength} strength</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Patterns Found</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analysis.patterns.length}</div>
              <p className="text-sm text-gray-600">Key patterns detected</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Risk Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Shield className={`h-5 w-5 ${
                  analysis.riskLevel === 'high' ? 'text-red-600' :
                  analysis.riskLevel === 'low' ? 'text-green-600' : 'text-yellow-600'
                }`} />
                <span className="text-lg font-semibold capitalize">{analysis.riskLevel}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {analysis.marketCondition} market • {analysis.volatility} volatility
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
            <TabsTrigger value="indicators">Indicators</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Price Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Price Movement Analysis</CardTitle>
                  <CardDescription>24-hour price action with key levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockPriceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={["dataMin - 100", "dataMax + 100"]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={{ fill: "#2563eb", strokeWidth: 2, r: 4 }}
                      />
                      <ReferenceLine y={42150} stroke="#ef4444" strokeDasharray="5 5" label="Support" />
                      <ReferenceLine y={45200} stroke="#ef4444" strokeDasharray="5 5" label="Resistance" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Key Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                  <CardDescription>Important findings from the analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Overall Trend: {analysis.overall.trend.toUpperCase()}</p>
                      <p className="text-sm text-gray-600">
                        {analysis.overall.confidence}% confidence with {analysis.overall.strength} strength
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Market Condition</p>
                      <p className="text-sm text-gray-600">
                        {analysis.marketCondition} market with {analysis.volatility} volatility
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Trading Signal</p>
                      <p className="text-sm text-gray-600">
                        {analysis.overall.signal.toUpperCase()} signal detected
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analysis.patterns.map((pattern: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{pattern.name}</CardTitle>
                    <CardDescription>Confidence: {pattern.confidence}%</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Progress value={pattern.confidence} />
                      {pattern.level && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Level:</span>
                          <span className="font-medium">{pattern.level}</span>
                        </div>
                      )}
                      <Badge variant={pattern.bullish ? "default" : "destructive"}>
                        {pattern.bullish ? "Bullish" : "Bearish"}
                      </Badge>
                      {pattern.description && (
                        <p className="text-sm text-gray-600">{pattern.description}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="indicators" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* RSI */}
              <Card>
                <CardHeader>
                  <CardTitle>RSI (Relative Strength Index)</CardTitle>
                  <CardDescription>Momentum oscillator (0-100)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{analysis.indicators.rsi.value}</div>
                      <Progress value={analysis.indicators.rsi.value} className="mt-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Signal:</span>
                        <Badge variant="secondary">{analysis.indicators.rsi.signal}</Badge>
                      </div>
                      <div className="text-xs text-gray-600">
                        {analysis.indicators.rsi.value > 70 && "Overbought (>70)"}
                        {analysis.indicators.rsi.value < 30 && "Oversold (<30)"}
                        {analysis.indicators.rsi.value >= 30 && analysis.indicators.rsi.value <= 70 && "Normal range (30-70)"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* MACD */}
              <Card>
                <CardHeader>
                  <CardTitle>MACD</CardTitle>
                  <CardDescription>Moving Average Convergence Divergence</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      {analysis.indicators.macd.signal === "bullish" ? (
                        <TrendingUp className="h-8 w-8 text-green-600" />
                      ) : (
                        <TrendingDown className="h-8 w-8 text-red-600" />
                      )}
                      <span className="text-lg font-semibold capitalize">{analysis.indicators.macd.signal}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Crossover:</span>
                        <span className="text-sm">{analysis.indicators.macd.crossover ? "Yes" : "No"}</span>
                      </div>
                      {analysis.indicators.macd.histogram && (
                        <div className="flex justify-between">
                          <span className="text-sm">Histogram:</span>
                          <span className="text-sm capitalize">{analysis.indicators.macd.histogram}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bollinger Bands */}
              <Card>
                <CardHeader>
                  <CardTitle>Bollinger Bands</CardTitle>
                  <CardDescription>Volatility and price position</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        {analysis.indicators.bollinger.position}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Squeeze:</span>
                        <span className="text-sm">{analysis.indicators.bollinger.squeeze ? "Yes" : "No"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Expansion:</span>
                        <span className="text-sm">{analysis.indicators.bollinger.expansion ? "Yes" : "No"}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="grid gap-6">
              {analysis.recommendations.map((rec: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        {rec.action}
                      </CardTitle>
                      <Badge className={getSignalColor(rec.action.toLowerCase())}>{rec.confidence}% confidence</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      {rec.price && (
                        <div>
                          <p className="text-sm text-gray-600">Price Target</p>
                          <p className="text-xl font-bold">{rec.price}</p>
                        </div>
                      )}
                      {rec.timeframe && (
                        <div>
                          <p className="text-sm text-gray-600">Timeframe</p>
                          <p className="text-lg font-medium">{rec.timeframe}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-gray-600">Reason</p>
                        <p className="text-sm">{rec.reason}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Risk Warning */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <AlertTriangle className="h-5 w-5" />
                  Risk Disclaimer
                </CardTitle>
              </CardHeader>
              <CardContent className="text-yellow-800">
                <p className="text-sm">
                  This analysis is for educational purposes only and should not be considered as financial advice.
                  Cryptocurrency trading involves significant risk and you should conduct your own research before
                  making any investment decisions.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed AI Analysis</CardTitle>
                <CardDescription>Complete technical analysis from Gemini AI</CardDescription>
              </CardHeader>
              <CardContent>
                {analysis.analysisText ? (
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
                      {analysis.analysisText}
                    </pre>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No detailed analysis text available.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
