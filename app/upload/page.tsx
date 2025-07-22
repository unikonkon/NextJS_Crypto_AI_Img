"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileImage, X, Clock, TrendingUp, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface UploadedFile {
  file: File
  preview: string
  timeframe?: string
}

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setUploadedFiles((prev) => [...prev, ...newFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    maxFiles: 5,
  })

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => {
      const newFiles = [...prev]
      URL.revokeObjectURL(newFiles[index].preview)
      newFiles.splice(index, 1)
      return newFiles
    })
  }

  const updateTimeframe = (index: number, timeframe: string) => {
    setUploadedFiles((prev) => {
      const newFiles = [...prev]
      newFiles[index] = { ...newFiles[index], timeframe }
      return newFiles
    })
  }

  const analyzeCharts = async () => {
    if (uploadedFiles.length === 0) return

    setIsAnalyzing(true)
    setProgress(0)
    setError(null)

    try {
      // Progress simulation
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 80) {
            clearInterval(progressInterval)
            return 80
          }
          return prev + 10
        })
      }, 500)

      // Prepare form data with files and timeframes
      const formData = new FormData()
      uploadedFiles.forEach((uploadedFile, index) => {
        formData.append("files", uploadedFile.file)
        formData.append(`timeframe_${index}`, uploadedFile.timeframe || "1d")
      })

      // Call the actual API endpoint
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setProgress(90)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Analysis failed")
      }

      const analysisResults = await response.json()
      
      setProgress(100)

      // Store results in sessionStorage to pass to results page
      sessionStorage.setItem("analysisResults", JSON.stringify(analysisResults))

      // Redirect to analysis results
      setTimeout(() => {
        router.push("/analysis/results")
      }, 1000)
    } catch (error) {
      console.error("Analysis failed:", error)
      setError(error instanceof Error ? error.message : "Analysis failed")
      setIsAnalyzing(false)
      setProgress(0)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Crypto Charts</h1>
          <p className="text-gray-600">Upload your crypto market graphs for AI-powered technical analysis</p>
        </div>

        {/* Upload Area */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Chart Images
            </CardTitle>
            <CardDescription>
              Drag and drop your crypto chart images or click to browse. Supports PNG, JPG, JPEG, GIF, WebP formats.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <input {...getInputProps()} />
              <FileImage className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              {isDragActive ? (
                <p className="text-blue-600">Drop the files here...</p>
              ) : (
                <div>
                  <p className="text-gray-600 mb-2">Drag & drop chart images here, or click to select files</p>
                  <p className="text-sm text-gray-500">Maximum 5 files, up to 10MB each</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Uploaded Charts ({uploadedFiles.length})</CardTitle>
              <CardDescription>Select the timeframe for each chart to improve analysis accuracy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploadedFiles.map((uploadedFile, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={uploadedFile.preview || "/placeholder.svg"}
                        alt={`Chart ${index + 1}`}
                        fill
                        className="object-cover rounded"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="font-medium text-sm">{uploadedFile.file.name}</p>
                      <p className="text-xs text-gray-500">{(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <Select value={uploadedFile.timeframe} onValueChange={(value) => updateTimeframe(index, value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15m">15 minutes</SelectItem>
                          <SelectItem value="1h">1 hour</SelectItem>
                          <SelectItem value="4h">4 hours</SelectItem>
                          <SelectItem value="1d">1 day</SelectItem>
                          <SelectItem value="1w">1 week</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analysis Section */}
        {uploadedFiles.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                AI Analysis
              </CardTitle>
              <CardDescription>
                Our AI will analyze your charts for patterns, trends, and trading signals
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isAnalyzing ? (
                <div className="space-y-4">
                  {error && (
                    <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-red-900 mb-1">Analysis Failed</p>
                        <p className="text-red-800">{error}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900 mb-1">Analysis Features:</p>
                      <ul className="text-blue-800 space-y-1">
                        <li>• Pattern recognition (candlesticks, triangles, flags)</li>
                        <li>• Support and resistance level detection</li>
                        <li>• Technical indicators (RSI, MACD, Bollinger Bands)</li>
                        <li>• Trend analysis and momentum signals</li>
                        <li>• Buy/sell/hold recommendations</li>
                      </ul>
                    </div>
                  </div>

                  <Button onClick={analyzeCharts} className="w-full" size="lg">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Analyze Charts with AI
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 mb-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span className="font-medium">Analyzing your charts...</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                    <p className="text-sm text-gray-600 mt-2">
                      {progress < 30 && "Processing images..."}
                      {progress >= 30 && progress < 60 && "Detecting patterns..."}
                      {progress >= 60 && progress < 90 && "Analyzing indicators..."}
                      {progress >= 90 && "Generating insights..."}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Supported Timeframes */}
        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold mb-4">Supported Timeframes</h3>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">15 minutes</Badge>
            <Badge variant="secondary">1 hour</Badge>
            <Badge variant="secondary">4 hours</Badge>
            <Badge variant="secondary">1 day</Badge>
            <Badge variant="secondary">1 week</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
