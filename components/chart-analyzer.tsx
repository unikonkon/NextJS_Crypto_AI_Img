"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, BarChart3, Target, AlertTriangle, CheckCircle, Download, Share2 } from "lucide-react"

interface AnalysisResult {
  overall: {
    trend: string
    confidence: number
    signal: string
    strength: string
  }
  patterns: Array<{
    name: string
    confidence: number
    bullish?: boolean
    level?: string
  }>
  indicators: {
    rsi: {
      value: number
      signal: string
      overbought: boolean
      oversold: boolean
    }
    macd: {
      signal: string
      crossover: boolean
      histogram: string
    }
    bollinger: {
      position: string
      squeeze: boolean
      expansion: boolean
    }
  }
  recommendations: Array<{
    action: string
    price: string
    confidence: number
    timeframe?: string
    reason: string
  }>
}

interface ChartAnalyzerProps {
  analysisResult: AnalysisResult
}

export function ChartAnalyzer({ analysisResult }: ChartAnalyzerProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "bullish":
        return <TrendingUp className="h-5 w-5 text-green-600" />
      case "bearish":
        return <TrendingDown className="h-5 w-5 text-red-600" />
      default:
        return <BarChart3 className="h-5 w-5 text-gray-600" />
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

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share Analysis
        </Button>
        <Button size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Overall Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {getTrendIcon(analysisResult.overall.trend)}
              <span className="text-lg font-bold capitalize">{analysisResult.overall.trend}</span>
            </div>
            <Progress value={analysisResult.overall.confidence} className="mt-2" />
            <p className="text-xs text-gray-500 mt-1">{analysisResult.overall.confidence}% confidence</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Signal</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className={`${getSignalColor(analysisResult.overall.signal)} text-sm px-2 py-1`}>
              {analysisResult.overall.signal.toUpperCase()}
            </Badge>
            <p className="text-sm text-gray-600 mt-2">{analysisResult.overall.strength} strength</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{analysisResult.patterns.length}</div>
            <p className="text-sm text-gray-600">Detected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Risk Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <span className="text-lg font-semibold">Moderate</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Balanced risk/reward</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="indicators">Indicators</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
                <CardDescription>Important findings from the analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Strong Bullish Pattern</p>
                    <p className="text-sm text-gray-600">Multiple indicators confirm upward momentum</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Clear Entry Point</p>
                    <p className="text-sm text-gray-600">Good risk/reward ratio identified</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Monitor Volume</p>
                    <p className="text-sm text-gray-600">Watch for volume confirmation on breakout</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Context</CardTitle>
                <CardDescription>Current market conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Market Condition:</span>
                    <Badge variant="outline">Trending</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Volatility:</span>
                    <Badge variant="secondary">Medium</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Time Horizon:</span>
                    <span className="text-sm font-medium">Short to Medium Term</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analysisResult.patterns.map((pattern, index) => (
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
                    {pattern.bullish !== undefined && (
                      <Badge variant={pattern.bullish ? "default" : "destructive"}>
                        {pattern.bullish ? "Bullish" : "Bearish"}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="indicators" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6">
            {/* RSI Card */}
            <Card>
              <CardHeader>
                <CardTitle>RSI</CardTitle>
                <CardDescription>Relative Strength Index</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{analysisResult.indicators.rsi.value}</div>
                    <Progress value={analysisResult.indicators.rsi.value} className="mt-2" />
                  </div>
                  <Badge variant="secondary">{analysisResult.indicators.rsi.signal}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* MACD Card */}
            <Card>
              <CardHeader>
                <CardTitle>MACD</CardTitle>
                <CardDescription>Moving Average Convergence Divergence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    {analysisResult.indicators.macd.signal === "bullish" ? (
                      <TrendingUp className="h-8 w-8 text-green-600" />
                    ) : (
                      <TrendingDown className="h-8 w-8 text-red-600" />
                    )}
                    <span className="text-lg font-semibold capitalize">{analysisResult.indicators.macd.signal}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Crossover: {analysisResult.indicators.macd.crossover ? "Yes" : "No"}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bollinger Bands Card */}
            <Card>
              <CardHeader>
                <CardTitle>Bollinger Bands</CardTitle>
                <CardDescription>Volatility indicator</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    {analysisResult.indicators.bollinger.position}
                  </Badge>
                  <div className="text-sm text-gray-600">
                    Expansion: {analysisResult.indicators.bollinger.expansion ? "Yes" : "No"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="space-y-4">
            {analysisResult.recommendations.map((rec, index) => (
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
                    <div>
                      <p className="text-sm text-gray-600">Price Target</p>
                      <p className="text-xl font-bold">{rec.price}</p>
                    </div>
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
                Cryptocurrency trading involves significant risk and you should conduct your own research before making
                any investment decisions.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
