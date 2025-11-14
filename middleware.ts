import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Rate limit configuration
const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100, // requests per window
}

// Suspicious patterns to block
const SUSPICIOUS_PATTERNS = [
  /\.\./, // Directory traversal
  /<script/i, // XSS attempts
  /javascript:/i, // JavaScript injection
  /on\w+\s*=/i, // Event handlers
  /eval\(/i, // Code execution
  /base64,/i, // Base64 encoded content
  /data:text/i, // Data URLs
]

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://techverse-umt.vercel.app',
  'https://umttechverse.com',
  // Add your production domain here
]

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const userLimit = rateLimitStore.get(ip)

  if (!userLimit || now > userLimit.resetTime) {
    // Reset or initialize rate limit
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs
    })
    return false
  }

  if (userLimit.count >= RATE_LIMIT.maxRequests) {
    return true
  }

  userLimit.count++
  return false
}

function containsSuspiciousContent(url: string, body?: string): boolean {
  const contentToCheck = [url, body || ''].join(' ')

  return SUSPICIOUS_PATTERNS.some(pattern => pattern.test(contentToCheck))
}

function isValidOrigin(origin: string | null): boolean {
  if (!origin) return true // Allow requests without Origin header

  return ALLOWED_ORIGINS.some(allowedOrigin =>
    origin === allowedOrigin || origin.startsWith(allowedOrigin)
  )
}

function sanitizeHeaders(headers: Headers): void {
  // Remove potentially dangerous headers
  const headersToRemove = [
    'x-forwarded-for',
    'x-real-ip',
    'x-client-ip',
    'x-forwarded-proto',
    'x-forwarded-host',
    'x-forwarded-port',
    'x-forwarded-uri',
    'x-forwarded-path',
    'x-original-uri',
    'x-original-url',
    'x-rewrite-url',
    'x-host',
    'x-forwarded-server',
    'cf-ray',
    'cf-visitor',
    'cf-connecting-ip',
    'true-client-ip',
    'x-cluster-client-ip',
    'x-forwarded',
    'forwarded-for',
    'forwarded',
    'via',
    'x-via',
  ]

  headersToRemove.forEach(header => {
    if (headers.has(header)) {
      headers.delete(header)
    }
  })
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
             request.headers.get('x-real-ip') ||
             request.headers.get('x-client-ip') ||
             'unknown'
  const userAgent = request.headers.get('user-agent') || ''
  const origin = request.headers.get('origin')
  const method = request.method

  // Skip middleware for static files and API routes that need high performance
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') && (
      pathname.includes('/certificate/verify') ||
      pathname.includes('/business-innovation/auth')
    ) ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Rate limiting
  if (isRateLimited(ip)) {
    console.warn(`Rate limit exceeded for IP: ${ip}`)
    return new NextResponse(
      JSON.stringify({
        error: 'Too many requests',
        message: 'Please try again later'
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '900', // 15 minutes
        }
      }
    )
  }

  // CORS validation
  if (!isValidOrigin(origin)) {
    console.warn(`Invalid origin: ${origin} from IP: ${ip}`)
    return new NextResponse(
      JSON.stringify({
        error: 'Forbidden',
        message: 'Origin not allowed'
      }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  }

  // Check for suspicious content
  const url = request.url
  if (containsSuspiciousContent(url)) {
    console.warn(`Suspicious content detected in URL: ${url} from IP: ${ip}`)
    return new NextResponse(
      JSON.stringify({
        error: 'Bad Request',
        message: 'Invalid request'
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  }

  // Block common attack vectors
  if (method === 'TRACE' || method === 'TRACK') {
    return new NextResponse(null, { status: 405 })
  }

  // Sanitize headers
  const response = NextResponse.next()
  sanitizeHeaders(request.headers)

  // Add security headers
  response.headers.set('X-Request-ID', crypto.randomUUID())
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Log suspicious activity (in production, send to monitoring service)
  if (userAgent.includes('sqlmap') || userAgent.includes('nmap') || userAgent.includes('nikto')) {
    console.warn(`Suspicious user agent detected: ${userAgent} from IP: ${ip}`)
  }

  return response
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
}