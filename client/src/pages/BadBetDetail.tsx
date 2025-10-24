import { useParams, Link } from 'wouter'
import { Button } from "@/components/ui/button"
import { AlertTriangle, TrendingDown, TrendingUp, Shield, Calculator, BookOpen, ChevronRight, X, Ban, DollarSign, BarChart3, Clock, Flame, Eye, Star, ArrowDown, ArrowUp } from 'lucide-react'
import { getAffiliateLink } from '@/config/affiliate'

export default function BadBetDetail() {
  const params = useParams()
  const badBetId = params.id
  
  // TODO: Fetch bad bet data from API or database
  const badBet = {
    id: badBetId,
    match: 'Bayern München vs. Hoffenheim',
    bet: 'Bayern Sieg',
    odds: 1.15,
    provider: 'Tipico',
    sport: 'Fußball',
    league: 'Bundesliga',
    date: '26. Oktober 2025',
    stake: 100,
    potentialWin: 115,
    actualProfit: 15,
    riskLevel: 'high',
    reasons: [
      {
        title: 'Extrem niedrige Quote',
        description: 'Bei Quote 1.15 musst du 100€ riskieren um nur 15€ zu gewinnen. Das Risiko-Rendite-Verhältnis ist katastrophal.',
        severity: 'high' as const
      },
      {
        title: 'Hohe Varianz',
        description: 'Auch klare Favoriten verlieren manchmal. Ein einziger Verlust vernichtet die Gewinne von 7 erfolgreichen Wetten.',
        severity: 'high' as const
      },
      {
        title: 'Bessere Alternativen verfügbar',
        description: 'Mit kombinierten Wetten oder anderen Märkten kannst du deutlich bessere Quoten bei ähnlichem Risiko erzielen.',
        severity: 'medium' as const
      }
    ],
    betterAlternatives: [
      {
        bet: 'Über 2.5 Tore',
        odds: 1.65,
        provider: 'Bet365',
        stake: 100,
        potentialWin: 165,
        profit: 65,
        reasoning: 'Bayern schießt im Schnitt 3+ Tore gegen Hoffenheim. Deutlich bessere Quote bei ähnlicher Wahrscheinlichkeit.'
      },
      {
        bet: 'Bayern gewinnt & Über 2.5 Tore',
        odds: 1.85,
        provider: 'Betano',
        stake: 100,
        potentialWin: 185,
        profit: 85,
        reasoning: 'Kombiwette mit höherer Quote. Wenn Bayern gewinnt, fallen meist viele Tore.'
      },
      {
        bet: 'Bayern -1.5 Handicap',
        odds: 1.75,
        provider: 'Bet365',
        stake: 100,
        potentialWin: 175,
        profit: 75,
        reasoning: 'Bayern muss mit 2+ Toren Unterschied gewinnen. Bessere Quote als einfacher Sieg.'
      }
    ],
    statistics: {
      expectedValue: -12.5,
      impliedProbability: 86.96,
      realProbability: 75.0,
      valueRating: 1.2
    }
  }
  
  const getSeverityColor = (severity: 'high' | 'medium' | 'low') => {
    const colors = {
      high: 'from-red-500 to-red-700',
      medium: 'from-orange-500 to-orange-700',
      low: 'from-yellow-500 to-yellow-700'
    }
    return colors[severity]
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-red-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center space-x-3 group cursor-pointer">
                <div className="text-4xl">🚫</div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                    bad-bets<span className="text-red-500">.de</span>
                  </h1>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-block bg-red-900/50 rounded-full px-6 py-3 mb-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
                <span className="font-bold text-lg">WARNUNG: BAD BET</span>
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{badBet.match}</h1>
            <div className="flex items-center justify-center gap-4 text-lg mb-6">
              <span className="bg-white/20 px-4 py-2 rounded-lg">{badBet.sport}</span>
              <span className="bg-white/20 px-4 py-2 rounded-lg">{badBet.league}</span>
              <span className="bg-white/20 px-4 py-2 rounded-lg">📅 {badBet.date}</span>
            </div>
            
            <div className="bg-slate-900/50 rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-300 mb-2">Wette</p>
                  <p className="text-2xl font-bold">{badBet.bet}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-300 mb-2">Quote</p>
                  <p className="text-4xl font-bold text-red-400">{badBet.odds}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-300 mb-2">Einsatz</p>
                  <p className="text-xl font-bold">{badBet.stake}€</p>
                </div>
                <div>
                  <p className="text-sm text-gray-300 mb-2">Gewinn</p>
                  <p className="text-xl font-bold text-red-400">nur {badBet.actualProfit}€</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Why This Is A Bad Bet */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Ban className="w-8 h-8 text-red-500" />
            Warum ist das eine Bad Bet?
          </h2>
          
          <div className="space-y-4">
            {badBet.reasons.map((reason, idx) => (
              <div key={idx} className="bg-slate-800 rounded-xl p-6 border-l-4 border-red-500">
                <div className="flex items-start gap-4">
                  <div className={`bg-gradient-to-r ${getSeverityColor(reason.severity)} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{reason.title}</h3>
                    <p className="text-gray-300">{reason.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Better Alternatives */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-green-500" />
            Bessere Alternativen
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {badBet.betterAlternatives.map((alt, idx) => (
              <div key={idx} className="bg-slate-800 rounded-xl p-6 border-2 border-green-500/30 hover:border-green-500 transition-all">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-400 mb-2">Alternative #{idx + 1}</p>
                  <h3 className="text-xl font-bold text-white mb-4">{alt.bet}</h3>
                  <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-lg p-4 mb-4">
                    <p className="text-sm text-white/80 mb-1">Quote</p>
                    <p className="text-4xl font-bold text-white">{alt.odds}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-400">Einsatz</p>
                      <p className="font-bold text-white">{alt.stake}€</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Gewinn</p>
                      <p className="font-bold text-green-400">+{alt.profit}€</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-300 mb-4">{alt.reasoning}</p>
                
                <a
                  href={getAffiliateLink(alt.provider.toLowerCase(), {
                    source: 'bad-bets',
                    campaign: 'bad-bet-detail',
                    medium: 'alternative-cta'
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900">
                    Bei {alt.provider} wetten →
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Back Link */}
        <div className="text-center">
          <Link href="/">
            <a className="text-red-400 hover:text-red-300 font-medium text-lg">
              ← Zurück zur Übersicht
            </a>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-12 mt-20 border-t border-red-500/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm mb-4">
            ⚠️ Glücksspiel kann süchtig machen. Bitte spiele verantwortungsvoll. 18+
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 bad-bets.de - Alle Rechte vorbehalten
          </p>
        </div>
      </footer>
    </div>
  )
}

