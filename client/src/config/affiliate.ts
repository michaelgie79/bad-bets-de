/**
 * ZENTRALE AFFILIATE & CONTENT KONFIGURATION (TypeScript)
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface TrackingParams {
  source?: string
  campaign?: string
  medium?: string
}

export interface AffiliateLink {
  name: string
  baseUrl: string
  affiliateUrl: string
  trackingParams: {
    source: string
    campaign: string
    medium: string
  }
}

export interface Provider {
  id: string
  name: string
  logo: string
  rank: number
  rating: number
  ratingCount: number
  bonus: string
  bonusType: string
  bonusValue: number
  bonusRating: number
  license: string
  licenseSince: string
  licenseRating: number
  quotesRating: number
  appRating: number
  serviceRating: number
  minDeposit: string
  payout: string
  features: string[]
  highlights: string[]
  pros: string[]
  cons: string[]
  paymentMethods: string[]
  badge: string
  badgeColor: string
  sports: string[]
}

// ============================================================================
// AFFILIATE LINKS
// ============================================================================

export const AFFILIATE_LINKS: Record<string, AffiliateLink> = {
  bet365: {
    name: 'Bet365',
    baseUrl: 'https://www.bet365.com',
    affiliateUrl: 'https://www.bet365.com?affiliate=DEIN_CODE',
    trackingParams: {
      source: 'source',
      campaign: 'campaign',
      medium: 'medium'
    }
  },
  betano: {
    name: 'Betano',
    baseUrl: 'https://www.betano.de',
    affiliateUrl: 'https://www.betano.de?affiliate=DEIN_CODE',
    trackingParams: {
      source: 'source',
      campaign: 'campaign',
      medium: 'medium'
    }
  },
  bwin: {
    name: 'bwin',
    baseUrl: 'https://www.bwin.de',
    affiliateUrl: 'https://www.bwin.de?affiliate=DEIN_CODE',
    trackingParams: {
      source: 'source',
      campaign: 'campaign',
      medium: 'medium'
    }
  }
}

// ============================================================================
// PROVIDERS
// ============================================================================

export const PROVIDERS: Record<string, Provider> = {
  bet365: {
    id: 'bet365',
    name: 'Bet365',
    logo: '🎰',
    rank: 1,
    rating: 4.8,
    ratingCount: 1247,
    bonus: '100% bis 100€',
    bonusType: 'Wett-Credits',
    bonusValue: 100,
    bonusRating: 4.5,
    license: 'Deutsche Lizenz',
    licenseSince: 'Seit Ende 2020',
    licenseRating: 5.0,
    quotesRating: 4.7,
    appRating: 4.8,
    serviceRating: 4.6,
    minDeposit: '5€',
    payout: '1-3 Tage',
    features: ['Live-Streaming', 'Cash Out', 'Live-Wetten', 'Statistiken'],
    highlights: ['Live-Streams', 'Starke Quoten', 'Breites Angebot'],
    pros: ['Einer der größten Wettanbieter weltweit', 'Hervorragende Live-Streams', 'Sehr breites Wettangebot'],
    cons: ['Bonusbedingungen etwas komplex', 'Sehr umfangreiches Angebot kann überwältigend sein'],
    paymentMethods: ['PayPal', 'Kreditkarte', 'Banküberweisung', 'Skrill', 'Neteller'],
    badge: 'BESTE WAHL',
    badgeColor: 'gold',
    sports: ['Fußball', 'Tennis', 'Basketball', 'Eishockey']
  },
  betano: {
    id: 'betano',
    name: 'Betano',
    logo: '🏆',
    rank: 2,
    rating: 4.75,
    ratingCount: 892,
    bonus: '20€ Gratiswette + 100% Bonus',
    bonusType: 'Kombination',
    bonusValue: 120,
    bonusRating: 4.9,
    license: 'Deutsche Lizenz',
    licenseSince: 'Seit 2021',
    licenseRating: 5.0,
    quotesRating: 4.8,
    appRating: 4.8,
    serviceRating: 4.5,
    minDeposit: '10€',
    payout: '1-3 Tage',
    features: ['Live-Streaming', 'Cash Out', 'Kombi-Boost', 'Schnelle Auszahlung'],
    highlights: ['Bester Bonus', 'Top-App', 'Schnelle Auszahlung'],
    pros: ['Sehr attraktiver Willkommensbonus', 'Hervorragende mobile App', 'Schnelle Auszahlungen'],
    cons: ['Etwas kleineres Wettangebot als Bet365', 'Live-Streaming nur für ausgewählte Events'],
    paymentMethods: ['PayPal', 'Kreditkarte', 'Banküberweisung', 'Skrill', 'Paysafecard'],
    badge: 'BESTER BONUS',
    badgeColor: 'green',
    sports: ['Fußball', 'Tennis', 'Basketball']
  },
  bwin: {
    id: 'bwin',
    name: 'bwin',
    logo: '⭐',
    rank: 3,
    rating: 4.7,
    ratingCount: 1034,
    bonus: '100% bis 100€',
    bonusType: 'Einzahlungsbonus',
    bonusValue: 100,
    bonusRating: 4.4,
    license: 'Deutsche Lizenz',
    licenseSince: 'Seit 2020',
    licenseRating: 5.0,
    quotesRating: 4.6,
    appRating: 4.7,
    serviceRating: 4.6,
    minDeposit: '10€',
    payout: '1-3 Tage',
    features: ['Live-Streaming', 'Cash Out', 'Statistiken', 'Live-Ticker'],
    highlights: ['Traditionsmarke', 'Große Auswahl', 'Zuverlässig'],
    pros: ['Etablierte Marke mit langer Tradition', 'Sehr breites Sportangebot', 'Zuverlässiger Kundenservice'],
    cons: ['Bonusbedingungen könnten fairer sein', 'Quoten manchmal nicht die besten'],
    paymentMethods: ['PayPal', 'Kreditkarte', 'Banküberweisung', 'Skrill', 'Neteller', 'Paysafecard'],
    badge: 'TRADITIONSMARKE',
    badgeColor: 'blue',
    sports: ['Fußball', 'Tennis', 'Basketball', 'Handball']
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getAffiliateLink(providerId: string, tracking: TrackingParams = {}): string {
  const provider = AFFILIATE_LINKS[providerId]
  
  if (!provider) {
    console.error(`Provider ${providerId} not found in AFFILIATE_LINKS`)
    return '#'
  }
  
  const url = new URL(provider.affiliateUrl)
  
  if (tracking.source) {
    url.searchParams.set(provider.trackingParams.source, tracking.source)
  }
  if (tracking.campaign) {
    url.searchParams.set(provider.trackingParams.campaign, tracking.campaign)
  }
  if (tracking.medium) {
    url.searchParams.set(provider.trackingParams.medium, tracking.medium)
  }
  
  return url.toString()
}

export function getProvider(providerId: string): Provider | null {
  return PROVIDERS[providerId] || null
}

export function getAllProviders(): Provider[] {
  return Object.values(PROVIDERS).sort((a, b) => a.rank - b.rank)
}

export default {
  AFFILIATE_LINKS,
  PROVIDERS,
  getAffiliateLink,
  getProvider,
  getAllProviders
}

