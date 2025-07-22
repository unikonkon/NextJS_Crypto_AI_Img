"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, TrendingUp, BarChart3, Clock, Search, Filter, Download, Eye, Trash2 } from "lucide-react"
import Link from "next/link"
import { ChartAnalyzer } from "@/components/chart-analyzer"

// Mock user analysis history
const analysisHistory = [
  {
    id: "1",
    filename: "BTC_4H_Chart.png",
    uploadDate: "2024-01-15T10:30:00Z",
    timeframe: "4h",
    signal: "buy",
    confidence: 78,
    trend: "bullish",
    status: "completed",
  },
  {
    id: "2",
    filename: "ETH_Daily_Analysis.jpg",
    uploadDate: "2024-01-14T15:45:00Z",
    timeframe: "1d",
    signal: "hold",
    confidence: 65,
    trend: "sideways",
    status: "completed",
  },
  {
    id: "3",
    filename: "SOL_Weekly_Chart.png",
    uploadDate: "2024-01-13T09:15:00Z",
    timeframe: "1w",
    signal: "sell",
    confidence: 82,
    trend: "bearish",
    status: "completed",
  },
  {
    id: "4",
    filename: "ADA_1H_Pattern.png",
    uploadDate: "2024-01-12T14:20:00Z",
    timeframe: "1h",
    signal: "buy",
    confidence: 71,
    trend: "bullish",
    status: "processing",
  },
]

const mockAnalysisResult = {
  overall: {
    trend: "bullish",
    confidence: 78,
    signal: "buy",
    strength: "moderate",
  },
  patterns: [
    { name: "Ascending Triangle", confidence: 85, bullish: true },
    { name: "Support Level", confidence: 92, level: "$42,150" },
    { name: "Resistance Level", confidence: 88, level: "$45,200" },
  ],
  indicators: {
    rsi: { value: 65, signal: "neutral", overbought: false, oversold: false },
    macd: { signal: "bullish", crossover: true, histogram: "positive" },
    bollinger: { position: "middle", squeeze: false, expansion: true },
  },
  recommendations: [
    { action: "Buy", price: "$42,500", confidence: 75, timeframe: "1-3 days", reason: "Bullish pattern confirmation" },
    { action: "Stop Loss", price: "$41,800", confidence: 90, reason: "Below key support level" },
    { action: "Take Profit", price: "$44,800", confidence: 80, reason: "Near resistance level" },
  ],
}

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null)

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "buy":
        return "bg-green-100 text-green-800"
      case "sell":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "bullish":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "bearish":
        return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
      default:
        return <BarChart3 className="h-4 w-4 text-gray-600" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredHistory = analysisHistory.filter((analysis) =>
    analysis.filename.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (selectedAnalysis) {
    const analysis = analysisHistory.find((a) => a.id === selectedAnalysis)
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" onClick={() => setSelectedAnalysis(null)}>
              ← Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{analysis?.filename}</h1>
              <p className="text-gray-600">Analysis Results</p>
            </div>
          </div>

          <ChartAnalyzer analysisResult={mockAnalysisResult} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Manage your crypto chart analyses</p>
          </div>
          <Button asChild>
            <Link href="/upload">
              <Upload className="mr-2 h-4 w-4" />
              New Analysis
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Analyses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-sm text-gray-600">+3 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-sm text-gray-600">Profitable signals</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Active Signals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-sm text-gray-600">Open positions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Avg Confidence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">74%</div>
              <p className="text-sm text-gray-600">Analysis accuracy</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="recent" className="space-y-6">
          <TabsList>
            <TabsTrigger value="recent">Recent Analyses</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search analyses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>

            {/* Analysis History */}
            <div className="space-y-4">
              {filteredHistory.map((analysis) => (
                <Card key={analysis.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-100 rounded-lg p-3">
                          <BarChart3 className="h-6 w-6 text-blue-600" />
                        </div>

                        <div>
                          <h3 className="font-semibold text-lg">{analysis.filename}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              {formatDate(analysis.uploadDate)}
                            </div>
                            <Badge variant="outline">{analysis.timeframe}</Badge>
                            <Badge className={getSignalColor(analysis.signal)}>{analysis.signal.toUpperCase()}</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            {getTrendIcon(analysis.trend)}
                            <span className="font-medium capitalize">{analysis.trend}</span>
                          </div>
                          <div className="text-sm text-gray-600">{analysis.confidence}% confidence</div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => setSelectedAnalysis(analysis.id)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredHistory.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No analyses found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm ? "Try adjusting your search terms" : "Upload your first crypto chart to get started"}
                  </p>
                  <Button asChild>
                    <Link href="/upload">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Chart
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="favorites">
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorite analyses yet</h3>
                <p className="text-gray-600">Star your best analyses to find them quickly</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="archived">
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No archived analyses</h3>
                <p className="text-gray-600">Archived analyses will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
