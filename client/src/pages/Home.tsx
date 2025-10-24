import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import { Button } from "@/components/ui/button"
import { AlertTriangle, TrendingDown, Shield, Calculator, BookOpen, ChevronRight, X, Ban, DollarSign, BarChart3, Clock, Flame, Eye, Star, ArrowDown, ArrowUp, Filter } from 'lucide-react'
import { getAffiliateLink } from '@/config/affiliate'
import Tools from '@/components/Tools'

// Type definitions for data structure
interface BadBetReason {
  title: string
  description: string
  severity: 'high' | 'medium' | 'low'
}

interface BetterAlternative {
  bet: string
  odds: number
  ev: string
}

interface BadBet {
  id: string
  match: string
  bet: string
  odds: number
  stake: number
  potentialWin: number
  sport: string
  league: string
  severity: 'critical' | 'high' | 'medium'
  reasons: BadBetReason[]
  betterAlternatives: BetterAlternative[]
}

interface OddsComparison {
  provider: string
  odds: number
  rating: 'best' | 'ok' | 'bad' | 'worst'
}

interface WorstOdds {
  match: string
  bet: string
  odds: OddsComparison[]
  loss: number
}

export default function Home() {
  const [liveViewers, setLiveViewers] = useState(847)
  const [scrollY, setScrollY] = useState(0)
  const [selectedSport, setSelectedSport] = useState<string>('all')

  // Animated counter for live viewers
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViewers(prev => prev + Math.floor(Math.random() * 5) - 2)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Bad Bets of the Day (flexible array - can be 1-10+)
  // In production: This would come from API/database with real-time odds
  const badBetsOfTheDay: BadBet[] = [
    {
      id: '1',
      match: 'Bayern München vs. Union Berlin',
      bet: 'Bayern München gewinnt',
      odds: 1.15,
      stake: 100,
      potentialWin: 15,
      sport: 'Fußball',
      league: 'Bundesliga',
      severity: 'critical',
      reasons: [
        {
          title: 'Katastrophales Risiko-Rendite-Verhältnis',
          description: 'Du riskierst 100€ für nur 15€ Gewinn. Bei einer Niederlage brauchst du 7 Siege in Folge, um den Verlust auszugleichen!',
          severity: 'high'
        },
        {
          title: 'Überschätzte Wahrscheinlichkeit',
          description: 'Quote 1.15 = 87% Wahrscheinlichkeit. Realistische Wahrscheinlichkeit: ~75%. Expected Value: NEGATIV!',
          severity: 'high'
        },
        {
          title: 'Historische Daten sprechen dagegen',
          description: 'Bayern hat in 3 der letzten 10 Heimspiele gegen Union nicht gewonnen.',
          severity: 'medium'
        }
      ],
      betterAlternatives: [
        { bet: 'Über 2.5 Tore', odds: 1.65, ev: '+12%' },
        { bet: 'Bayern gewinnt & Über 2.5 Tore', odds: 1.85, ev: '+8%' },
        { bet: 'Beide Teams treffen', odds: 2.10, ev: '+15%' }
      ]
    },
    {
      id: '2',
      match: 'Real Madrid vs. Getafe',
      bet: 'Real Madrid gewinnt',
      odds: 1.12,
      stake: 100,
      potentialWin: 12,
      sport: 'Fußball',
      league: 'La Liga',
      severity: 'critical',
      reasons: [
        {
          title: 'Noch schlechteres Risiko-Rendite',
          description: 'Nur 12€ Gewinn bei 100€ Risiko. Du brauchst 8 Siege für einen Verlust!',
          severity: 'high'
        },
        {
          title: 'Getafe ist defensiv stark',
          description: 'Getafe hat in 5 der letzten 8 Spiele gegen Top-Teams nicht verloren.',
          severity: 'high'
        }
      ],
      betterAlternatives: [
        { bet: 'Über 1.5 Tore', odds: 1.45, ev: '+10%' },
        { bet: 'Real Madrid gewinnt mit 2+ Toren', odds: 1.75, ev: '+14%' }
      ]
    },
    {
      id: '3',
      match: 'Liverpool vs. Nottingham Forest',
      bet: 'Unter 0.5 Tore',
      odds: 15.00,
      stake: 100,
      potentialWin: 1500,
      sport: 'Fußball',
      league: 'Premier League',
      severity: 'high',
      reasons: [
        {
          title: 'Unrealistische Erwartung',
          description: 'Die Wahrscheinlichkeit, dass Liverpool und Forest 0 Tore schießen, liegt bei <1%.',
          severity: 'high'
        },
        {
          title: 'Historische Daten',
          description: 'In den letzten 50 Liverpool-Heimspielen gab es kein einziges 0:0.',
          severity: 'medium'
        }
      ],
      betterAlternatives: [
        { bet: 'Über 2.5 Tore', odds: 1.55, ev: '+18%' },
        { bet: 'Liverpool gewinnt', odds: 1.35, ev: '+12%' }
      ]
    }
  ]

  // Filter bad bets by sport
  const filteredBadBets = selectedSport === 'all' 
    ? badBetsOfTheDay 
    : badBetsOfTheDay.filter(bet => bet.sport === selectedSport)

  // Get unique sports for filter
  const sports = ['all', ...Array.from(new Set(badBetsOfTheDay.map(bet => bet.sport)))]

  // Worst Odds Comparison (example data)
  const worstOddsComparison: WorstOdds[] = [
    {
      match: 'Real Madrid vs. Barcelona',
      bet: 'Real Madrid gewinnt',
      odds: [
        { provider: 'bet365', odds: 2.10, rating: 'best' },
        { provider: 'Betano', odds: 2.05, rating: 'ok' },
        { provider: 'bwin', odds: 1.95, rating: 'bad' },
        { provider: 'Tipico', odds: 1.85, rating: 'worst' }
      ],
      loss: 25
    },
    {
      match: 'Liverpool vs. Man City',
      bet: 'Über 2.5 Tore',
      odds: [
        { provider: 'Interwetten', odds: 1.75, rating: 'best' },
        { provider: 'bet365', odds: 1.70, rating: 'ok' },
        { provider: 'bwin', odds: 1.62, rating: 'bad' },
        { provider: 'Tipico', odds: 1.55, rating: 'worst' }
      ],
      loss: 20
    }
  ]

  // Latest articles (example data)
  const latestArticles = [
    {
      title: '5 Wetten, die IMMER Geldverbrennung sind',
      category: 'Wettwissen',
      readTime: '5 Min',
      views: '12.4k',
      date: 'vor 2 Tagen'
    },
    {
      title: 'Warum Favoriten-Kombiwetten dich arm machen',
      category: 'Strategie',
      readTime: '8 Min',
      views: '9.2k',
      date: 'vor 3 Tagen'
    },
    {
      title: 'Anbieter-Warnung: Diese Buchmacher haben die schlechtesten Quoten',
      category: 'Anbieter-Test',
      readTime: '6 Min',
      views: '15.7k',
      date: 'vor 5 Tagen'
    }
  ]

  const features = [
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: 'Tägliche Warnungen',
      description: 'Jeden Tag zeigen wir dir die schlechteste Wette des Tages - datenbasiert und unabhängig.',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: <TrendingDown className="w-8 h-8" />,
      title: 'Worst Odds Vergleich',
      description: 'Wir decken auf, welche Anbieter systematisch die schlechtesten Quoten haben.',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: 'Expected Value Analyse',
      description: 'Wir berechnen den Expected Value und zeigen dir, warum du langfristig verlierst.',
      color: 'from-yellow-500 to-green-500'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Wettwissen',
      description: 'Lerne, warum du verlierst und wie du bessere Entscheidungen triffst.',
      color: 'from-green-500 to-blue-500'
    }
  ]

  // Render single detailed bad bet (when only 1)
  const renderDetailedBadBet = (badBet: BadBet) => (
    <div className="bg-gradient-to-br from-red-950/40 to-black/60 rounded-3xl border-2 border-red-500/30 shadow-2xl p-8 md:p-12">
      {/* Match Info */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-600/30 text-blue-400 text-sm font-semibold rounded-full border border-blue-500/50">
            {badBet.sport}
          </span>
          <span className="px-3 py-1 bg-purple-600/30 text-purple-400 text-sm font-semibold rounded-full border border-purple-500/50">
            {badBet.league}
          </span>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold mb-4">{badBet.match}</h3>
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-red-600/30 rounded-xl border border-red-500/50">
          <Ban className="w-6 h-6 text-red-500" />
          <div className="text-left">
            <div className="text-sm text-gray-400">Wette</div>
            <div className="text-lg font-bold">{badBet.bet}</div>
          </div>
          <div className="w-px h-10 bg-red-500/30"></div>
          <div className="text-left">
            <div className="text-sm text-gray-400">Quote</div>
            <div className="text-lg font-bold text-red-400">{badBet.odds}</div>
          </div>
        </div>
      </div>

      {/* Calculation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-black/40 rounded-xl p-6 border border-red-900/30">
          <div className="text-sm text-gray-400 mb-2">Einsatz</div>
          <div className="text-3xl font-bold">{badBet.stake}€</div>
        </div>
        <div className="bg-black/40 rounded-xl p-6 border border-red-900/30">
          <div className="text-sm text-gray-400 mb-2">Potentieller Gewinn</div>
          <div className="text-3xl font-bold text-green-400">{badBet.potentialWin}€</div>
        </div>
        <div className="bg-red-950/60 rounded-xl p-6 border-2 border-red-500">
          <div className="text-sm text-gray-400 mb-2">Risiko-Rendite</div>
          <div className="text-3xl font-bold text-red-400">
            {badBet.severity === 'critical' ? 'KATASTROPHAL' : 'SCHLECHT'}
          </div>
        </div>
      </div>

      {/* Reasons */}
      <div className="mb-8">
        <h4 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          Warum das eine SCHLECHTE Wette ist:
        </h4>
        <div className="space-y-4">
          {badBet.reasons.map((reason, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-xl border-2 ${
                reason.severity === 'high' 
                  ? 'bg-red-950/60 border-red-500' 
                  : 'bg-orange-950/40 border-orange-500/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  reason.severity === 'high' 
                    ? 'bg-red-600' 
                    : 'bg-orange-600'
                }`}>
                  <X className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h5 className="text-xl font-bold mb-2">{reason.title}</h5>
                  <p className="text-gray-300">{reason.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Better Alternatives */}
      <div className="bg-green-950/30 rounded-xl p-6 border-2 border-green-500/50">
        <h4 className="text-2xl font-bold mb-4 flex items-center gap-2 text-green-400">
          💡 Bessere Alternativen:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {badBet.betterAlternatives.map((alt, index) => (
            <div key={index} className="bg-black/40 rounded-lg p-4 border border-green-500/30">
              <div className="text-sm text-gray-400 mb-1">Wette</div>
              <div className="font-bold mb-2">{alt.bet}</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400">Quote</div>
                  <div className="text-lg font-bold text-green-400">{alt.odds}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">Expected Value</div>
                  <div className="text-lg font-bold text-green-400">{alt.ev}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
          Bessere Quoten finden
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  )

  // Render compact bad bet card (when 2+)
  const renderCompactBadBet = (badBet: BadBet) => (
    <div className="group bg-gradient-to-br from-red-950/40 to-black/60 rounded-2xl border-2 border-red-500/30 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-blue-600/30 text-blue-400 text-xs font-semibold rounded-full border border-blue-500/50">
            {badBet.sport}
          </span>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${
            badBet.severity === 'critical' 
              ? 'bg-red-600/30 text-red-400 border-red-500/50' 
              : 'bg-orange-600/30 text-orange-400 border-orange-500/50'
          }`}>
            {badBet.severity === 'critical' ? '🚫 KRITISCH' : '⚠️ WARNUNG'}
          </span>
        </div>
      </div>

      {/* Match */}
      <h3 className="text-xl font-bold mb-2 group-hover:text-red-400 transition-colors">{badBet.match}</h3>
      <div className="text-sm text-gray-400 mb-4">{badBet.league}</div>

      {/* Bet Info */}
      <div className="bg-black/40 rounded-xl p-4 mb-4 border border-red-900/30">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-400">Wette</div>
          <div className="text-sm text-gray-400">Quote</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="font-bold">{badBet.bet}</div>
          <div className="text-2xl font-bold text-red-400">{badBet.odds}</div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-black/40 rounded-lg p-3 border border-red-900/30">
          <div className="text-xs text-gray-400">Einsatz</div>
          <div className="text-lg font-bold">{badBet.stake}€</div>
        </div>
        <div className="bg-black/40 rounded-lg p-3 border border-red-900/30">
          <div className="text-xs text-gray-400">Gewinn</div>
          <div className="text-lg font-bold text-green-400">{badBet.potentialWin}€</div>
        </div>
      </div>

      {/* Main Reason */}
      <div className="bg-red-950/60 rounded-lg p-4 border border-red-500/50 mb-4">
        <div className="flex items-start gap-2">
          <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-sm mb-1">{badBet.reasons[0].title}</div>
            <div className="text-xs text-gray-300 line-clamp-2">{badBet.reasons[0].description}</div>
          </div>
        </div>
      </div>

      {/* Better Alternative */}
      <div className="bg-green-950/30 rounded-lg p-3 border border-green-500/50">
        <div className="text-xs text-gray-400 mb-1">💡 Bessere Alternative:</div>
        <div className="flex items-center justify-between">
          <div className="font-bold text-sm">{badBet.betterAlternatives[0].bet}</div>
          <div className="text-lg font-bold text-green-400">{badBet.betterAlternatives[0].odds}</div>
        </div>
      </div>

      {/* CTA */}
      <Link href={`/bad-bets/${badBet.id}`}>
        <Button className="w-full mt-4 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 group-hover:scale-105 transition-all">
          Details ansehen
          <ChevronRight className="ml-2 w-4 h-4" />
        </Button>
      </Link>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 text-white overflow-x-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="bg-black/40 backdrop-blur-md shadow-lg sticky top-0 z-[9999] border-b border-red-900/30 transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24 py-2">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <img 
                src="/logo.png" 
                alt="Bad Bets Logo" 
                className="w-20 h-20 group-hover:scale-110 transition-all duration-300 filter drop-shadow-[0_0_25px_rgba(239,68,68,0.6)] group-hover:drop-shadow-[0_0_35px_rgba(239,68,68,0.8)] group-hover:brightness-110"
              />
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  BAD BETS
                </span>
                <div className="text-xs text-gray-400 font-medium">Vermeide Geldverbrennung</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#bad-bet" className="text-gray-300 hover:text-red-500 font-medium transition relative group">
                Bad Bets des Tages
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#worst-odds" className="text-gray-300 hover:text-red-500 font-medium transition relative group">
                Worst Odds
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#wettwissen" className="text-gray-300 hover:text-red-500 font-medium transition relative group">
                Wettwissen
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#tools" className="text-gray-300 hover:text-red-500 font-medium transition relative group">
                Tools
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <Button className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300" onClick={() => window.location.href = 'mailto:michael.gierke@web.de?subject=Bad Bets Alert abonnieren&body=Ich möchte über Bad Bets informiert werden.'}>
                <AlertTriangle className="w-4 h-4 mr-2" />
                Jetzt warnen lassen
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center relative z-10">
          {/* Live Viewers Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-900/30 backdrop-blur-sm rounded-full border border-red-500/30 shadow-lg mb-6 animate-fade-in">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </div>
            <span className="text-sm font-semibold text-gray-200">
              <span className="text-red-400">{liveViewers.toLocaleString()}</span> Wetter warnen sich gerade
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-600/20 backdrop-blur-sm rounded-full border-2 border-red-500 mb-6 animate-fade-in">
            <Ban className="w-6 h-6 text-red-500" />
            <span className="text-lg font-bold text-red-400">WARNUNG</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            Wir zeigen dir, welche Wetten du
            <span className="block mt-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-gradient">
              NICHT machen solltest
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Täglich aktualisierte Warnungen vor schlechten Wetten, schlechten Quoten und Geldverbrennung. 
            <span className="font-semibold text-white"> Datenbasiert, unabhängig und auf deiner Seite.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up animation-delay-400">
            <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-lg px-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group" onClick={() => document.getElementById('bad-bets')?.scrollIntoView({ behavior: 'smooth' })}>
              <AlertTriangle className="mr-2 w-5 h-5 group-hover:animate-pulse" />
              Bad Bets des Tages
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-2 border-red-500 text-red-400 hover:bg-red-900/30 hover:scale-105 transition-all duration-300" onClick={() => document.getElementById('worst-odds')?.scrollIntoView({ behavior: 'smooth' })}>
              <TrendingDown className="mr-2 w-5 h-5" />
              Worst Odds ansehen
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-in-up animation-delay-600">
            <div className="flex items-center justify-center gap-2 px-4 py-3 bg-black/40 backdrop-blur-sm rounded-xl border border-red-900/30 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
              <Shield className="w-5 h-5 text-red-500" />
              <span className="text-sm font-semibold text-gray-200">Unabhängig</span>
            </div>
            <div className="flex items-center justify-center gap-2 px-4 py-3 bg-black/40 backdrop-blur-sm rounded-xl border border-red-900/30 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
              <BarChart3 className="w-5 h-5 text-red-500" />
              <span className="text-sm font-semibold text-gray-200">Datenbasiert</span>
            </div>
            <div className="flex items-center justify-center gap-2 px-4 py-3 bg-black/40 backdrop-blur-sm rounded-xl border border-red-900/30 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
              <Clock className="w-5 h-5 text-red-500" />
              <span className="text-sm font-semibold text-gray-200">Täglich aktuell</span>
            </div>
            <div className="flex items-center justify-center gap-2 px-4 py-3 bg-black/40 backdrop-blur-sm rounded-xl border border-red-900/30 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
              <Eye className="w-5 h-5 text-red-500" />
              <span className="text-sm font-semibold text-gray-200">50k+ Leser</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-black/20 backdrop-blur-sm py-16 relative border-y border-red-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Warum Bad Bets?</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Wir sind auf deiner Seite. Während andere dir die "besten Wetten" verkaufen, warnen wir dich vor den schlechtesten.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-black/60 to-red-950/30 hover:from-black/80 hover:to-red-950/50 border border-red-900/30 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-red-400 transition-colors">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
                
                {/* Hover decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bad Bets of the Day Section - FLEXIBLE LAYOUT */}
      <section id="bad-bets" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 backdrop-blur-sm rounded-full border border-red-500/30 font-semibold mb-4">
            <Flame className="w-5 h-5 text-red-500" />
            <span className="text-red-400">17. Oktober 2025</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            🚫 Bad Bet{badBetsOfTheDay.length > 1 ? 's' : ''} des Tages
          </h2>
          <p className="text-xl text-gray-400">
            {badBetsOfTheDay.length === 1 
              ? 'Diese Wette solltest du heute NICHT machen' 
              : `Diese ${badBetsOfTheDay.length} Wetten solltest du heute NICHT machen`}
          </p>
        </div>

        {/* Filter (only show if multiple sports) */}
        {sports.length > 2 && (
          <div className="flex items-center justify-center gap-3 mb-8">
            <Filter className="w-5 h-5 text-gray-400" />
            <div className="flex gap-2">
              {sports.map(sport => (
                <button
                  key={sport}
                  onClick={() => setSelectedSport(sport)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedSport === sport
                      ? 'bg-red-600 text-white'
                      : 'bg-black/40 text-gray-400 hover:bg-black/60'
                  }`}
                >
                  {sport === 'all' ? 'Alle' : sport}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Layout based on number of bad bets */}
        {filteredBadBets.length === 1 ? (
          // Single detailed view
          renderDetailedBadBet(filteredBadBets[0])
        ) : (
          // Grid view for multiple bad bets
          <div className={`grid grid-cols-1 ${
            filteredBadBets.length === 2 ? 'md:grid-cols-2' : 
            filteredBadBets.length >= 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 
            'md:grid-cols-1'
          } gap-6`}>
            {filteredBadBets.map(badBet => (
              <div key={badBet.id}>
                {renderCompactBadBet(badBet)}
              </div>
            ))}
          </div>
        )}

        {/* Show all button (if filtered) */}
        {selectedSport !== 'all' && (
          <div className="text-center mt-8">
            <Button 
              onClick={() => setSelectedSport('all')}
              variant="outline" 
              className="border-2 border-red-500 text-red-400 hover:bg-red-900/30"
            >
              Alle {badBetsOfTheDay.length} Bad Bets ansehen
            </Button>
          </div>
        )}
      </section>

      {/* Worst Odds Comparison Section */}
      <section id="worst-odds" className="bg-black/20 backdrop-blur-sm py-16 border-y border-red-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600/20 backdrop-blur-sm rounded-full border border-orange-500/30 font-semibold mb-4">
              <TrendingDown className="w-5 h-5 text-orange-500" />
              <span className="text-orange-400">Heute aktualisiert</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">📊 Worst Odds Comparison</h2>
            <p className="text-xl text-gray-400">Diese Anbieter haben heute die schlechtesten Quoten</p>
          </div>

          <div className="space-y-6">
            {worstOddsComparison.map((comparison, index) => (
              <div key={index} className="bg-gradient-to-br from-black/60 to-orange-950/30 rounded-2xl border border-orange-900/30 shadow-xl p-6 md:p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{comparison.match}</h3>
                  <div className="text-gray-400">Wette: <span className="text-white font-semibold">{comparison.bet}</span></div>
                </div>

                <div className="space-y-3 mb-6">
                  {comparison.odds.map((odd, i) => (
                    <div 
                      key={i} 
                      className={`flex items-center justify-between p-4 rounded-xl border-2 ${
                        odd.rating === 'best' ? 'bg-green-950/40 border-green-500/50' :
                        odd.rating === 'ok' ? 'bg-blue-950/40 border-blue-500/30' :
                        odd.rating === 'bad' ? 'bg-orange-950/40 border-orange-500/50' :
                        'bg-red-950/60 border-red-500'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          odd.rating === 'best' ? 'bg-green-600' :
                          odd.rating === 'ok' ? 'bg-blue-600' :
                          odd.rating === 'bad' ? 'bg-orange-600' :
                          'bg-red-600'
                        }`}>
                          {odd.rating === 'best' ? <ArrowUp className="w-6 h-6" /> :
                           odd.rating === 'worst' ? <ArrowDown className="w-6 h-6" /> :
                           <span className="text-lg font-bold">{i + 1}</span>}
                        </div>
                        <div>
                          <div className="font-bold text-lg">{odd.provider}</div>
                          <div className="text-sm text-gray-400">
                            {odd.rating === 'best' ? '✅ BESTE QUOTE' :
                             odd.rating === 'ok' ? '⚠️ OK' :
                             odd.rating === 'bad' ? '❌ SCHLECHT' :
                             '🚫 KATASTROPHAL'}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-3xl font-bold ${
                          odd.rating === 'best' ? 'text-green-400' :
                          odd.rating === 'ok' ? 'text-blue-400' :
                          odd.rating === 'bad' ? 'text-orange-400' :
                          'text-red-400'
                        }`}>
                          {odd.odds.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-red-950/60 rounded-xl p-4 border-2 border-red-500">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-6 h-6 text-red-500" />
                    <div>
                      <div className="text-sm text-gray-400">Verlust bei schlechtestem Anbieter</div>
                      <div className="text-xl font-bold text-red-400">-{comparison.loss}€ bei 100€ Einsatz!</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="text-lg border-2 border-orange-500 text-orange-400 hover:bg-orange-900/30 hover:scale-105 transition-all">
              Alle Worst Odds ansehen
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section id="wettwissen" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">📚 Neueste Artikel</h2>
          <p className="text-xl text-gray-400">Lerne, warum du verlierst und wie du es vermeidest</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestArticles.map((article, index) => (
            <div 
              key={index} 
              className="group bg-gradient-to-br from-black/60 to-red-950/30 rounded-2xl border border-red-900/30 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-red-600/30 text-red-400 text-xs font-semibold rounded-full border border-red-500/50">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400">{article.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-red-400 transition-colors">{article.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{article.views} Views</span>
                  </div>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 group-hover:h-2 transition-all duration-300"></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="text-lg border-2 border-red-500 text-red-400 hover:bg-red-900/30 hover:scale-105 transition-all">
            Alle Artikel ansehen
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-red-950/60 to-black/80 py-16 border-y border-red-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-600/20 backdrop-blur-sm rounded-full border-2 border-red-500 mb-6">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <span className="text-lg font-bold text-red-400">WARNUNG</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hör auf, dein Geld zu verbrennen!</h2>
          <p className="text-xl text-gray-300 mb-8">
            Lass dich täglich warnen vor schlechten Wetten und schlechten Quoten. Kostenlos, unabhängig und auf deiner Seite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-lg px-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300" onClick={() => window.location.href = 'mailto:michael.gierke@web.de?subject=Bad Bets Alert abonnieren&body=Ich möchte über Bad Bets informiert werden.'}>
              <AlertTriangle className="mr-2 w-5 h-5" />
              Jetzt warnen lassen
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-2 border-red-500 text-red-400 hover:bg-red-900/30 hover:scale-105 transition-all duration-300">
              Mehr erfahren
            </Button>
          </div>
        </div>
      </section>

      {/* Bad Bets News Section */}
      <section className="bg-gradient-to-br from-black/40 to-red-950/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 backdrop-blur-sm rounded-full border border-red-500/30 font-semibold mb-4">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span className="text-red-400">Warnungen & Analysen</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🚫 Bad Bets News</h2>
            <p className="text-xl text-gray-400">Lerne aus den Fehlern anderer</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Article 1: Bayern vs Brügge */}
            <div className="bg-gradient-to-br from-black/60 to-red-950/30 rounded-2xl border border-red-900/30 shadow-xl p-6 hover:border-red-500/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">🚫</span>
                <span className="px-3 py-1 bg-red-600/30 text-red-400 rounded-full text-xs font-bold">KRITISCH</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Bayern vs Brügge: Warum du NICHT auf Quote 1.20 setzen solltest</h3>
              <p className="text-gray-400 mb-4 text-sm">
                100€ Einsatz für nur 20€ Gewinn? Das ist ein klassischer Bad Bet! Bei einer Niederlage brauchst du 5 Siege in Folge, um den Verlust auszugleichen. Bessere Alternative: HT1/FT1 zu Quote 1.68 oder Über 4.5 Tore zu 2.20.
              </p>
              <div className="bg-red-950/50 p-3 rounded-lg mb-4">
                <div className="text-xs font-semibold text-red-400 mb-2">⚠️ RISIKO-ANALYSE:</div>
                <div className="text-sm text-gray-300">• Risiko-Rendite-Verhältnis: KATASTROPHAL</div>
                <div className="text-sm text-gray-300">• Expected Value: NEGATIV (-8%)</div>
                <div className="text-sm text-gray-300">• Empfehlung: FINGER WEG!</div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>📅 22. Oktober 2025</span>
                <span>⏱️ 3 Min.</span>
              </div>
              <a href="https://nur-sportwetten.de" className="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all text-center">
                Bessere Alternativen →
              </a>
            </div>

            {/* Article 2: Champions League */}
            <div className="bg-gradient-to-br from-black/60 to-orange-950/30 rounded-2xl border border-orange-900/30 shadow-xl p-6 hover:border-orange-500/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">⚠️</span>
                <span className="px-3 py-1 bg-orange-600/30 text-orange-400 rounded-full text-xs font-bold">WARNUNG</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Champions League heute: Diese 4 Wetten solltest du vermeiden</h3>
              <p className="text-gray-400 mb-4 text-sm">
                Heute spielen 4 deutsche Teams in der Champions League. Wir zeigen dir, welche Wetten Bad Bets sind: Favoriten-Wetten mit Mini-Quoten, überbewertete Kombiwetten und Anbieter mit schlechten Quoten. Vergleiche immer die Quoten!
              </p>
              <div className="bg-orange-950/50 p-3 rounded-lg mb-4">
                <div className="text-xs font-semibold text-orange-400 mb-2">🚫 TOP BAD BETS:</div>
                <div className="text-sm text-gray-300">• Bayern 1.20: Zu geringes Risiko-Rendite</div>
                <div className="text-sm text-gray-300">• Frankfurt Sieg: Überschätzte Chance</div>
                <div className="text-sm text-gray-300">• 4er-Kombi: Zu hohes Risiko</div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>📅 22. Oktober 2025</span>
                <span>⏱️ 4 Min.</span>
              </div>
              <a href="https://sportwett-vergleich.de" className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-all text-center">
                Quoten vergleichen →
              </a>
            </div>

            {/* Article 3: Arsenal */}
            <div className="bg-gradient-to-br from-black/60 to-yellow-950/30 rounded-2xl border border-yellow-900/30 shadow-xl p-6 hover:border-yellow-500/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">💸</span>
                <span className="px-3 py-1 bg-yellow-600/30 text-yellow-400 rounded-full text-xs font-bold">VERLUST</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Arsenal 4:0 - Wer auf Atlético gesetzt hat, verlor alles</h3>
              <p className="text-gray-400 mb-4 text-sm">
                Gestern setzten viele auf Atlético Madrid oder "Beide Teams treffen" (Quote 1.70). Beide Wetten gingen nicht auf. Arsenal dominierte mit 4:0. Das ist ein klassisches Beispiel für überschätzte Außenseiter-Chancen und falsche Annahmen.
              </p>
              <div className="bg-yellow-950/50 p-3 rounded-lg mb-4">
                <div className="text-xs font-semibold text-yellow-400 mb-2">💰 VERLUST-ANALYSE:</div>
                <div className="text-sm text-gray-300">• Atlético Sieg (Quote 4.5): -100%</div>
                <div className="text-sm text-gray-300">• Beide treffen (1.70): -100%</div>
                <div className="text-sm text-gray-300">• Unentschieden (3.8): -100%</div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>📅 22. Oktober 2025</span>
                <span>⏱️ 3 Min.</span>
              </div>
              <a href="https://nur-sportwetten.de" className="block w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-4 rounded-lg transition-all text-center">
                Aus Fehlern lernen →
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-r from-red-900/40 to-orange-900/40 rounded-2xl p-8 text-center border border-red-500/30">
            <h3 className="text-2xl font-bold mb-4">🛡️ Schütze dein Geld vor Bad Bets!</h3>
            <p className="text-lg text-gray-300 mb-6">
              Vermeide die häufigsten Wett-Fehler und finde bessere Alternativen. Täglich aktualisiert.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="https://nur-sportwetten.de" className="inline-block bg-white text-red-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all">
                Zu den Wett-Tipps →
              </a>
              <a href="https://sportwett-vergleich.de" className="inline-block bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-all">
                Quoten vergleichen →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <Tools />

      {/* Footer */}
      <footer className="bg-black/60 border-t border-red-900/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-900 rounded-lg flex items-center justify-center">
                  <Ban className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">BAD BETS</span>
              </div>
              <p className="text-gray-400">
                Dein unabhängiger Wächter gegen Geldverbrennung beim Wetten.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Content</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Bad Bets des Tages</a></li>
                <li><a href="#" className="hover:text-white transition">Worst Odds</a></li>
                <li><a href="#" className="hover:text-white transition">Wettwissen</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-red-400">Partner-Portale</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="https://nur-sportwetten.de" className="hover:text-white transition flex items-center">
                    <span className="mr-2">📰</span>
                    nur-sportwetten.de
                  </a>
                  <p className="text-xs text-gray-500 ml-6">News, Tipps & Analysen</p>
                </li>
                <li>
                  <a href="https://sportwett-vergleich.de" className="hover:text-white transition flex items-center">
                    <span className="mr-2">🔍</span>
                    sportwett-vergleich.de
                  </a>
                  <p className="text-xs text-gray-500 ml-6">Anbieter-Vergleich</p>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tools</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">EV Calculator</a></li>
                <li><a href="#" className="hover:text-white transition">Bad Bet Archiv</a></li>
                <li><a href="#" className="hover:text-white transition">Anbieter-Warnungen</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Impressum</a></li>
                <li><a href="#" className="hover:text-white transition">Datenschutz</a></li>
                <li><a href="#" className="hover:text-white transition">AGB</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-red-900/30 pt-8 text-center text-gray-400">
            <p className="mb-4">
              18+ | Glücksspiel kann abhängig machen | Hilfe unter <a href="https://www.bzga.de" className="text-red-400 hover:underline">bzga.de</a>
            </p>
            <p className="mb-4">
              Wir warnen vor schlechten Wetten und empfehlen bessere Alternativen. Dabei erhalten wir Provisionen von Anbietern.
              <a href="#" className="text-red-400 hover:underline ml-1">Mehr Infos</a>
            </p>
            <p className="mb-4 text-sm">
              <span className="text-gray-500">Unsere Partner:</span>
              <a href="https://nur-sportwetten.de" className="text-red-400 hover:underline ml-2">nur-sportwetten.de</a> | 
              <a href="https://sportwett-vergleich.de" className="text-red-400 hover:underline ml-2">sportwett-vergleich.de</a>
            </p>
            <p>
              © 2025 Bad-Bets.de - Alle Rechte vorbehalten
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

