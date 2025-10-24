import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Calculator, TrendingUp, DollarSign, BarChart3, AlertTriangle } from 'lucide-react'

export default function Tools() {
  const [activeTool, setActiveTool] = useState<string>('bad-bet-checker')

  // Bad Bet Checker State
  const [odds, setOdds] = useState<string>('')
  const [stake, setStake] = useState<string>('100')
  const [badBetResult, setBadBetResult] = useState<any>(null)

  // Value Calculator State
  const [valueOdds, setValueOdds] = useState<string>('')
  const [trueProbability, setTrueProbability] = useState<string>('')
  const [valueResult, setValueResult] = useState<any>(null)

  // Bankroll Manager State
  const [bankroll, setBankroll] = useState<string>('1000')
  const [kellyOdds, setKellyOdds] = useState<string>('')
  const [kellyProbability, setKellyProbability] = useState<string>('')
  const [kellyResult, setKellyResult] = useState<any>(null)

  // Arbitrage Calculator State
  const [odds1, setOdds1] = useState<string>('')
  const [odds2, setOdds2] = useState<string>('')
  const [totalStake, setTotalStake] = useState<string>('100')
  const [arbResult, setArbResult] = useState<any>(null)

  // Odds Comparison State
  const [comparisonBet, setComparisonBet] = useState<string>('Bayern gewinnt')

  const calculateBadBet = () => {
    const o = parseFloat(odds)
    const s = parseFloat(stake)
    
    if (isNaN(o) || isNaN(s)) return

    const potentialWin = s * (o - 1)
    const impliedProbability = (1 / o) * 100
    const winsNeeded = Math.ceil(s / potentialWin)
    
    let severity: 'critical' | 'high' | 'medium' | 'low' = 'low'
    let message = ''
    
    if (o < 1.3) {
      severity = 'critical'
      message = '🚫 KRITISCHER BAD BET! Finger weg!'
    } else if (o < 1.5) {
      severity = 'high'
      message = '⚠️ HOHES RISIKO! Sehr schlechtes Risiko-Rendite-Verhältnis.'
    } else if (o < 2.0) {
      severity = 'medium'
      message = '⚡ VORSICHT! Überlege dir bessere Alternativen.'
    } else {
      severity = 'low'
      message = '✅ Akzeptables Risiko-Rendite-Verhältnis.'
    }

    setBadBetResult({
      potentialWin: potentialWin.toFixed(2),
      impliedProbability: impliedProbability.toFixed(1),
      winsNeeded,
      severity,
      message
    })
  }

  const calculateValue = () => {
    const o = parseFloat(valueOdds)
    const p = parseFloat(trueProbability) / 100
    
    if (isNaN(o) || isNaN(p)) return

    const impliedProbability = 1 / o
    const expectedValue = (p * (o - 1)) - (1 - p)
    const evPercentage = (expectedValue * 100).toFixed(2)
    
    let message = ''
    let isValue = false
    
    if (expectedValue > 0.05) {
      message = '✅ VALUE BET! Positive Expected Value.'
      isValue = true
    } else if (expectedValue > 0) {
      message = '⚡ Leichter Value, aber Vorsicht.'
      isValue = true
    } else {
      message = '❌ KEIN VALUE! Negative Expected Value.'
      isValue = false
    }

    setValueResult({
      impliedProbability: (impliedProbability * 100).toFixed(1),
      expectedValue: evPercentage,
      message,
      isValue
    })
  }

  const calculateKelly = () => {
    const o = parseFloat(kellyOdds)
    const p = parseFloat(kellyProbability) / 100
    const b = parseFloat(bankroll)
    
    if (isNaN(o) || isNaN(p) || isNaN(b)) return

    const q = 1 - p
    const kellyFraction = ((o - 1) * p - q) / (o - 1)
    const kellyStake = Math.max(0, kellyFraction * b)
    const fractionalKelly = kellyStake * 0.25 // 1/4 Kelly (konservativ)
    
    let message = ''
    
    if (kellyFraction <= 0) {
      message = '❌ NICHT WETTEN! Negative Expected Value.'
    } else if (kellyFraction > 0.2) {
      message = '⚠️ VORSICHT! Sehr hoher Kelly-Wert. Nutze 1/4 Kelly!'
    } else {
      message = '✅ Empfohlener Einsatz berechnet.'
    }

    setKellyResult({
      kellyFraction: (kellyFraction * 100).toFixed(2),
      fullKelly: kellyStake.toFixed(2),
      fractionalKelly: fractionalKelly.toFixed(2),
      message
    })
  }

  const calculateArbitrage = () => {
    const o1 = parseFloat(odds1)
    const o2 = parseFloat(odds2)
    const total = parseFloat(totalStake)
    
    if (isNaN(o1) || isNaN(o2) || isNaN(total)) return

    const arbPercentage = (1/o1 + 1/o2) * 100
    const isArbitrage = arbPercentage < 100
    
    const stake1 = (total / (1 + o1/(o2 - 1)))
    const stake2 = total - stake1
    
    const profit1 = (stake1 * o1) - total
    const profit2 = (stake2 * o2) - total
    const guaranteedProfit = Math.min(profit1, profit2)
    
    let message = ''
    
    if (isArbitrage) {
      message = '✅ ARBITRAGE GEFUNDEN! Risikofreier Gewinn möglich!'
    } else {
      message = '❌ KEINE ARBITRAGE! Kein risikofreier Gewinn möglich.'
    }

    setArbResult({
      arbPercentage: arbPercentage.toFixed(2),
      isArbitrage,
      stake1: stake1.toFixed(2),
      stake2: stake2.toFixed(2),
      guaranteedProfit: guaranteedProfit.toFixed(2),
      message
    })
  }

  const tools = [
    { id: 'bad-bet-checker', name: 'Bad-Bet-Checker', icon: AlertTriangle },
    { id: 'value-calculator', name: 'Value-Rechner', icon: TrendingUp },
    { id: 'bankroll-manager', name: 'Bankroll-Manager', icon: DollarSign },
    { id: 'arbitrage-calculator', name: 'Arbitrage-Rechner', icon: BarChart3 },
    { id: 'odds-comparison', name: 'Quoten-Vergleich', icon: Calculator },
  ]

  return (
    <section id="tools" className="bg-gradient-to-br from-black/40 to-red-950/20 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 backdrop-blur-sm rounded-full border border-red-500/30 font-semibold mb-4">
            <Calculator className="w-5 h-5 text-red-500" />
            <span className="text-red-400">Kostenlose Tools</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">🛠️ Wett-Tools</h2>
          <p className="text-xl text-gray-400">Professionelle Rechner für smarte Wetten</p>
        </div>

        {/* Tool Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`${
                  activeTool === tool.id
                    ? 'bg-gradient-to-r from-red-600 to-red-800 text-white'
                    : 'bg-black/40 text-gray-400 hover:text-white border border-red-900/30'
                } px-6 py-3 rounded-lg transition-all hover:scale-105`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tool.name}
              </Button>
            )
          })}
        </div>

        {/* Tool Content */}
        <div className="bg-gradient-to-br from-black/60 to-red-950/30 rounded-2xl border border-red-900/30 shadow-2xl p-8">
          
          {/* Bad Bet Checker */}
          {activeTool === 'bad-bet-checker' && (
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <AlertTriangle className="w-7 h-7 text-red-500" />
                Bad-Bet-Checker
              </h3>
              <p className="text-gray-400 mb-6">Prüfe, ob deine Wette ein Bad Bet ist!</p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Quote</label>
                  <input
                    type="number"
                    step="0.01"
                    value={odds}
                    onChange={(e) => setOdds(e.target.value)}
                    className="w-full bg-black/40 border border-red-900/30 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                    placeholder="z.B. 1.15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Einsatz (€)</label>
                  <input
                    type="number"
                    value={stake}
                    onChange={(e) => setStake(e.target.value)}
                    className="w-full bg-black/40 border border-red-900/30 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                    placeholder="z.B. 100"
                  />
                </div>
              </div>

              <Button
                onClick={calculateBadBet}
                className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-lg py-6"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Jetzt prüfen
              </Button>

              {badBetResult && (
                <div className={`mt-6 p-6 rounded-xl border-2 ${
                  badBetResult.severity === 'critical' ? 'bg-red-950/50 border-red-500' :
                  badBetResult.severity === 'high' ? 'bg-orange-950/50 border-orange-500' :
                  badBetResult.severity === 'medium' ? 'bg-yellow-950/50 border-yellow-500' :
                  'bg-green-950/50 border-green-500'
                }`}>
                  <div className="text-2xl font-bold mb-4">{badBetResult.message}</div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-400">Möglicher Gewinn</div>
                      <div className="text-2xl font-bold">{badBetResult.potentialWin}€</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Implizierte Wahrscheinlichkeit</div>
                      <div className="text-2xl font-bold">{badBetResult.impliedProbability}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Siege zum Ausgleich</div>
                      <div className="text-2xl font-bold">{badBetResult.winsNeeded}x</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Value Calculator */}
          {activeTool === 'value-calculator' && (
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <TrendingUp className="w-7 h-7 text-green-500" />
                Value-Rechner (Expected Value)
              </h3>
              <p className="text-gray-400 mb-6">Berechne den Expected Value (EV) deiner Wette!</p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Quote</label>
                  <input
                    type="number"
                    step="0.01"
                    value={valueOdds}
                    onChange={(e) => setValueOdds(e.target.value)}
                    className="w-full bg-black/40 border border-red-900/30 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                    placeholder="z.B. 2.50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Wahre Wahrscheinlichkeit (%)</label>
                  <input
                    type="number"
                    value={trueProbability}
                    onChange={(e) => setTrueProbability(e.target.value)}
                    className="w-full bg-black/40 border border-red-900/30 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                    placeholder="z.B. 45"
                  />
                </div>
              </div>

              <Button
                onClick={calculateValue}
                className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-lg py-6"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                EV berechnen
              </Button>

              {valueResult && (
                <div className={`mt-6 p-6 rounded-xl border-2 ${
                  valueResult.isValue ? 'bg-green-950/50 border-green-500' : 'bg-red-950/50 border-red-500'
                }`}>
                  <div className="text-2xl font-bold mb-4">{valueResult.message}</div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-400">Implizierte Wahrscheinlichkeit</div>
                      <div className="text-2xl font-bold">{valueResult.impliedProbability}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Expected Value</div>
                      <div className={`text-2xl font-bold ${parseFloat(valueResult.expectedValue) > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {valueResult.expectedValue}%
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bankroll Manager */}
          {activeTool === 'bankroll-manager' && (
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <DollarSign className="w-7 h-7 text-blue-500" />
                Bankroll-Manager (Kelly-Kriterium)
              </h3>
              <p className="text-gray-400 mb-6">Berechne den optimalen Einsatz nach Kelly-Kriterium!</p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Bankroll (€)</label>
                  <input
                    type="number"
                    value={bankroll}
                    onChange={(e) => setBankroll(e.target.value)}
                    className="w-full bg-black/40 border border-red-900/30 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                    placeholder="z.B. 1000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Quote</label>
                  <input
                    type="number"
                    step="0.01"
                    value={kellyOdds}
                    onChange={(e) => setKellyOdds(e.target.value)}
                    className="w-full bg-black/40 border border-red-900/30 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                    placeholder="z.B. 2.50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Gewinnwahrscheinlichkeit (%)</label>
                  <input
                    type="number"
                    value={kellyProbability}
                    onChange={(e) => setKellyProbability(e.target.value)}
                    className="w-full bg-black/40 border border-red-900/30 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                    placeholder="z.B. 45"
                  />
                </div>
              </div>

              <Button
                onClick={calculateKelly}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-lg py-6"
              >
                <DollarSign className="w-5 h-5 mr-2" />
                Kelly berechnen
              </Button>

              {kellyResult && (
                <div className="mt-6 p-6 rounded-xl border-2 bg-blue-950/50 border-blue-500">
                  <div className="text-2xl font-bold mb-4">{kellyResult.message}</div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-400">Kelly-Fraction</div>
                      <div className="text-2xl font-bold">{kellyResult.kellyFraction}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Full Kelly</div>
                      <div className="text-2xl font-bold">{kellyResult.fullKelly}€</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">1/4 Kelly (empfohlen)</div>
                      <div className="text-2xl font-bold text-green-400">{kellyResult.fractionalKelly}€</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Arbitrage Calculator */}
          {activeTool === 'arbitrage-calculator' && (
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <BarChart3 className="w-7 h-7 text-purple-500" />
                Arbitrage-Rechner
              </h3>
              <p className="text-gray-400 mb-6">Finde risikofreie Wetten (Arbitrage)!</p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Quote Anbieter 1</label>
                  <input
                    type="number"
                    step="0.01"
                    value={odds1}
                    onChange={(e) => setOdds1(e.target.value)}
                    className="w-full bg-black/40 border border-red-900/30 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                    placeholder="z.B. 2.10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Quote Anbieter 2</label>
                  <input
                    type="number"
                    step="0.01"
                    value={odds2}
                    onChange={(e) => setOdds2(e.target.value)}
                    className="w-full bg-black/40 border border-red-900/30 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                    placeholder="z.B. 2.05"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Gesamt-Einsatz (€)</label>
                  <input
                    type="number"
                    value={totalStake}
                    onChange={(e) => setTotalStake(e.target.value)}
                    className="w-full bg-black/40 border border-red-900/30 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                    placeholder="z.B. 100"
                  />
                </div>
              </div>

              <Button
                onClick={calculateArbitrage}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-lg py-6"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Arbitrage prüfen
              </Button>

              {arbResult && (
                <div className={`mt-6 p-6 rounded-xl border-2 ${
                  arbResult.isArbitrage ? 'bg-green-950/50 border-green-500' : 'bg-red-950/50 border-red-500'
                }`}>
                  <div className="text-2xl font-bold mb-4">{arbResult.message}</div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-400">Arbitrage-Prozentsatz</div>
                      <div className="text-2xl font-bold">{arbResult.arbPercentage}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Garantierter Gewinn</div>
                      <div className={`text-2xl font-bold ${parseFloat(arbResult.guaranteedProfit) > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {arbResult.guaranteedProfit}€
                      </div>
                    </div>
                  </div>
                  {arbResult.isArbitrage && (
                    <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                      <div>
                        <div className="text-sm text-gray-400">Einsatz Anbieter 1</div>
                        <div className="text-xl font-bold">{arbResult.stake1}€</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Einsatz Anbieter 2</div>
                        <div className="text-xl font-bold">{arbResult.stake2}€</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Odds Comparison */}
          {activeTool === 'odds-comparison' && (
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Calculator className="w-7 h-7 text-orange-500" />
                Quoten-Vergleich
              </h3>
              <p className="text-gray-400 mb-6">Vergleiche Quoten verschiedener Anbieter!</p>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Wette</label>
                <input
                  type="text"
                  value={comparisonBet}
                  onChange={(e) => setComparisonBet(e.target.value)}
                  className="w-full bg-black/40 border border-red-900/30 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                  placeholder="z.B. Bayern gewinnt"
                />
              </div>

              <div className="bg-black/40 rounded-xl p-6 border border-red-900/30">
                <div className="text-center text-gray-400 mb-4">
                  <Calculator className="w-12 h-12 mx-auto mb-3 text-orange-500" />
                  <p className="text-lg">Live-Quoten-Vergleich</p>
                  <p className="text-sm mt-2">Diese Funktion wird in Kürze verfügbar sein!</p>
                  <p className="text-sm mt-4">Bald kannst du hier live Quoten von über 20 Anbietern vergleichen.</p>
                </div>
                <div className="mt-6 text-center">
                  <a 
                    href="https://sportwett-vergleich.de" 
                    className="inline-block bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-700 hover:to-orange-900 text-white font-bold py-3 px-8 rounded-lg transition-all"
                  >
                    Zu sportwett-vergleich.de →
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}

