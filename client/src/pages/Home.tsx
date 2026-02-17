import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertTriangle, TrendingDown, Shield, Calculator, BookOpen, ChevronRight, X, Ban, DollarSign, BarChart3, Clock, Flame, Eye, Star, ArrowDown, ArrowUp, Filter, Download } from 'lucide-react'
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
  // ⚠️ OPTIMIERUNG #1: FAKE COUNTER ENTFERNT
  // const [liveViewers, setLiveViewers] = useState(847)
  
  const [scrollY, setScrollY] = useState(0)
  const [selectedSport, setSelectedSport] = useState<string>('all')
  
  // ✅ OPTIMIERUNG #2: EMAIL CAPTURE STATE
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // ⚠️ OPTIMIERUNG #1: FAKE COUNTER CODE ENTFERNT
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setLiveViewers(prev => prev + Math.floor(Math.random() * 5) - 2)
  //   }, 3000)
  //   return () => clearInterval(interval)
  // }, [])

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ✅ OPTIMIERUNG #2: EMAIL SUBMIT HANDLER
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // TODO: Integration mit Newsletter-Tool (Brevo/Mailerlite)
      // Für jetzt: Simuliere erfolgreichen Submit
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Trigger PDF Download
      const pdfUrl = '/downloads/7-toedlichste-wetten.pdf' // Pfad zum PDF
      const link = document.createElement('a')
      link.href = pdfUrl
      link.download = '7-toedlichste-wetten-bad-bets.pdf'
      link.click()
      
      setSubmitStatus('success')
      setEmail('')
      
      // Reset nach 5 Sekunden
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

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
      ]
    },
    // ... weitere Bad Bets wie im Original
  ]

  // Features array
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Unabhängig',
      description: 'Keine Affiliate-Links. Keine versteckten Deals. Nur ehrliche Warnungen.',
      color: 'from-red-600 to-orange-600'
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: 'Datenbasiert',
      description: 'Mathematische Analysen und historische Daten zeigen dir die Wahrheit.',
      color: 'from-orange-600 to-yellow-600'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Täglich aktuell',
      description: 'Frische Analysen jeden Tag. Vermeide die schlechtesten Wetten in Echtzeit.',
      color: 'from-yellow-600 to-red-600'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Lernorientiert',
      description: 'Verstehe WARUM eine Wette schlecht ist. Werde ein besserer Wetter.',
      color: 'from-red-600 to-red-800'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Fixed Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-black/95 backdrop-blur-md shadow-lg border-b border-red-900/30' : 'bg-transparent'}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Ban 
                className="w-10 h-10 text-red-500 group-hover:text-red-400 transition-all duration-300 group-hover:rotate-12" 
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
              <a href="#bad-bets" className="text-gray-300 hover:text-red-500 font-medium transition relative group">
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
              <Button className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300" onClick={() => document.getElementById('email-form')?.scrollIntoView({ behavior: 'smooth' })}>
                <AlertTriangle className="w-4 h-4 mr-2" />
                Gratis PDF laden
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content with padding for fixed header */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 text-white overflow-x-hidden relative pt-24">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

      {/* Hero Section - OPTIMIERT */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center relative z-10">
          {/* ⚠️ OPTIMIERUNG #1: FAKE COUNTER ENTFERNT */}
          {/* Live Viewers Badge - REMOVED */}
          
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
          
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Täglich aktualisierte Warnungen vor schlechten Wetten, schlechten Quoten und Geldverbrennung. 
            <span className="font-semibold text-white"> Datenbasiert, unabhängig und auf deiner Seite.</span>
          </p>

          {/* ✅ OPTIMIERUNG #3: PERSONAL BRAND */}
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
            Von Marco [Nachname], 15 Jahre Sportwett-Industrie, ex-C-Level. 
            <br className="hidden md:block" />
            Ich habe gesehen, wie Quoten manipuliert werden. 
            <span className="text-red-400 font-semibold"> Jetzt arbeite ich für DICH.</span>
          </p>

          {/* ✅ OPTIMIERUNG #2: EMAIL CAPTURE FORM */}
          <div id="email-form" className="max-w-md mx-auto mb-8 animate-fade-in-up animation-delay-400">
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Deine Email-Adresse..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 text-lg bg-black/40 border-2 border-red-500/50 rounded-xl text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                />
              </div>
              
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-lg px-8 py-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
              >
                <Download className="mr-2 w-5 h-5" />
                {isSubmitting ? 'Wird geladen...' : 'Kostenlos herunterladen'}
                <span className="ml-2 text-sm opacity-80">(PDF, 18 Seiten)</span>
              </Button>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-900/30 border border-green-500 rounded-xl text-green-400 text-sm animate-fade-in">
                  ✓ Download startet! Check auch deine Emails.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-900/30 border border-red-500 rounded-xl text-red-400 text-sm animate-fade-in">
                  ✗ Fehler. Bitte versuche es nochmal.
                </div>
              )}
              
              <p className="text-xs text-gray-500 text-center">
                Gratis PDF: "Die 7 tödlichsten Wetten" + Newsletter mit wöchentlichen Warnungen
              </p>
            </form>
          </div>

          {/* Secondary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up animation-delay-500">
            <Button size="lg" variant="outline" className="text-lg px-8 border-2 border-red-500 text-red-400 hover:bg-red-900/30 hover:scale-105 transition-all duration-300" onClick={() => document.getElementById('bad-bets')?.scrollIntoView({ behavior: 'smooth' })}>
              <AlertTriangle className="mr-2 w-5 h-5" />
              Bad Bets des Tages
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-2 border-red-500/50 text-gray-400 hover:bg-red-900/20 hover:scale-105 transition-all duration-300" onClick={() => document.getElementById('worst-odds')?.scrollIntoView({ behavior: 'smooth' })}>
              <TrendingDown className="mr-2 w-5 h-5" />
              Worst Odds ansehen
            </Button>
          </div>

          {/* Trust Badges - ⚠️ OPTIMIERUNG #1: "50k+ Leser" ENTFERNT */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto animate-fade-in-up animation-delay-600">
            <div className="flex items-center justify-center gap-2 px-4 py-3 bg-black/40 backdrop-blur-sm rounded-xl border border-red-900/30 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
              <Shield className="w-5 h-5 text-red-500" />
              <span className="text-sm font-semibold text-gray-200">Unabhängig</span>
            </div>
            <div className="flex items-center justify-center gap-2 px-4 py-3 bg-black/40 backdrop-blur-sm rounded-xl border border-red-900/30 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
              <BarChart3 className="w-5 h-5 text-red-500" />
              <span className="text-sm font-semibold text-gray-200">Datenbasiert</span>
            </div>
            <div className="flex items-center justify-center gap-2 px-4 py-3 bg-black/40 backdrop-blur-sm rounded-xl border border-red-900/30 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 col-span-2 md:col-span-1">
              <Clock className="w-5 h-5 text-red-500" />
              <span className="text-sm font-semibold text-gray-200">Täglich aktuell</span>
            </div>
            {/* ⚠️ "50k+ Leser" Badge ENTFERNT - wird später hinzugefügt wenn echte Zahlen da sind */}
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

      {/* REST DER SEITE WIE IM ORIGINAL... */}
      {/* (Bad Bets Section, Worst Odds, etc. - unverändert) */}
      
    </div>
    </div>
  )
}
