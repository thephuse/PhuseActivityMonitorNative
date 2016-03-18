export const
  clientId = 'oEhF39KY-GdKDhfHvFPL6A',
  serverUrl = 'https://phuse-activity-monitor-native.herokuapp.com',
  redirectUrl = `${serverUrl}/auth/harvest/callback`,
  harvestUrl = `https://phuse.harvestapp.com/oauth2/authorize`,
  oAuthUrl = `${harvestUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code`,
  successUrl = `${serverUrl}/authenticated/success`,
  appUrl = 'pam://auth',
  maxAge = 60 * 60 * 24 * 365,
  workingHours = 6
