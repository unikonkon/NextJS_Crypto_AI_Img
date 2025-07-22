import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, TrendingUp, BarChart3, Target, Clock, Users } from "lucide-react"
import Link from "next/link"

const educationalContent = [
  {
    category: "Basics",
    title: "Understanding Candlestick Patterns",
    description: "Learn to read and interpret candlestick charts, the foundation of technical analysis.",
    duration: "15 min read",
    level: "Beginner",
    topics: ["Doji", "Hammer", "Shooting Star", "Engulfing Patterns"],
  },
  {
    category: "Technical Indicators",
    title: "RSI and Momentum Trading",
    description: "Master the Relative Strength Index for identifying overbought and oversold conditions.",
    duration: "20 min read",
    level: "Intermediate",
    topics: ["RSI Calculation", "Divergences", "Entry/Exit Signals"],
  },
  {
    category: "Advanced",
    title: "Support and Resistance Levels",
    description: "Identify key price levels that act as barriers to price movement.",
    duration: "25 min read",
    level: "Intermediate",
    topics: ["Horizontal Levels", "Trend Lines", "Dynamic S&R"],
  },
  {
    category: "Patterns",
    title: "Chart Pattern Recognition",
    description: "Recognize common chart patterns and their implications for future price movement.",
    duration: "30 min read",
    level: "Advanced",
    topics: ["Triangles", "Head & Shoulders", "Flags & Pennants"],
  },
  {
    category: "Risk Management",
    title: "Position Sizing and Risk Control",
    description: "Learn how to manage risk and protect your capital in volatile crypto markets.",
    duration: "18 min read",
    level: "Beginner",
    topics: ["Stop Losses", "Position Sizing", "Risk/Reward Ratios"],
  },
  {
    category: "Advanced",
    title: "MACD and Trend Following",
    description: "Use Moving Average Convergence Divergence for trend identification and timing.",
    duration: "22 min read",
    level: "Advanced",
    topics: ["MACD Line", "Signal Line", "Histogram Analysis"],
  },
]

const getLevelColor = (level: string) => {
  switch (level) {
    case "Beginner":
      return "bg-green-100 text-green-800"
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800"
    case "Advanced":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Basics":
      return <BookOpen className="h-5 w-5" />
    case "Technical Indicators":
      return <BarChart3 className="h-5 w-5" />
    case "Patterns":
      return <TrendingUp className="h-5 w-5" />
    case "Advanced":
      return <Target className="h-5 w-5" />
    default:
      return <BookOpen className="h-5 w-5" />
  }
}

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Learn Technical Analysis</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master the art of reading crypto charts with our comprehensive educational resources. From basic candlestick
            patterns to advanced trading strategies.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="bg-blue-100 rounded-full p-3">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">25+</div>
                <div className="text-sm text-gray-600">Learning Modules</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="bg-green-100 rounded-full p-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">10k+</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="bg-purple-100 rounded-full p-3">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">5 hrs</div>
                <div className="text-sm text-gray-600">Total Content</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Path */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Learning Path</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-green-200">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 rounded-full p-2">
                    <span className="text-green-600 font-bold">1</span>
                  </div>
                  <CardTitle className="text-lg">Start with Basics</CardTitle>
                </div>
                <CardDescription>Learn fundamental concepts and chart reading</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1">
                  <li>• Candlestick patterns</li>
                  <li>• Support & resistance</li>
                  <li>• Trend identification</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-200">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="bg-yellow-100 rounded-full p-2">
                    <span className="text-yellow-600 font-bold">2</span>
                  </div>
                  <CardTitle className="text-lg">Technical Indicators</CardTitle>
                </div>
                <CardDescription>Master popular trading indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1">
                  <li>• RSI and momentum</li>
                  <li>• Moving averages</li>
                  <li>• MACD analysis</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="bg-red-100 rounded-full p-2">
                    <span className="text-red-600 font-bold">3</span>
                  </div>
                  <CardTitle className="text-lg">Advanced Strategies</CardTitle>
                </div>
                <CardDescription>Combine concepts for trading strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1">
                  <li>• Pattern recognition</li>
                  <li>• Risk management</li>
                  <li>• Strategy backtesting</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Course Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Courses</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationalContent.map((course, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {getCategoryIcon(course.category)}
                    <Badge variant="outline">{course.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{course.duration}</span>
                      </div>
                      <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Topics covered:</p>
                      <div className="flex flex-wrap gap-1">
                        {course.topics.map((topic, topicIndex) => (
                          <Badge key={topicIndex} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full" asChild>
                      <Link href={`/education/${index + 1}`}>Start Learning</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Interactive Demo */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Try Interactive Chart Analysis</CardTitle>
            <CardDescription className="text-blue-100">
              Practice your skills with our interactive chart simulator
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/simulator">Launch Simulator</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Watch Demo Video
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
