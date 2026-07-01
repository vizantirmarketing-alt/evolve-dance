export function isProductionDomain(): boolean {
  // Client-side: window.location.host must match the prod host env var
  if (typeof window !== 'undefined') {
    const prodHost = process.env.NEXT_PUBLIC_PRODUCTION_HOST
    if (!prodHost) return false
    return window.location.host === prodHost
  }

  // Server/build-time: NEXT_PUBLIC_PRODUCTION_HOST must be set AND
  // we must be on a Vercel production deployment. This intentionally
  // gates on env var presence — the env var is a coordinated cutover
  // switch that should only be set in Vercel dashboard the moment
  // DNS points at the real domain.
  const prodHost = process.env.NEXT_PUBLIC_PRODUCTION_HOST
  if (!prodHost) return false
  return process.env.VERCEL_ENV === 'production'
}
