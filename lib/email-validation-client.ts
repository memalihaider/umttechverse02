// Client-safe email validation utilities
// This file is safe to import in client components

// List of common disposable email domains
const DISPOSABLE_DOMAINS = [
  '10minutemail.com',
  'guerrillamail.com',
  'mailinator.com',
  'temp-mail.org',
  'throwaway.email',
  'yopmail.com',
  'maildrop.cc',
  'tempail.com',
  'dispostable.com',
  'getnada.com',
  'mail-temporaire.fr',
  'mytemp.email',
  'temp-mail.io',
  'tempmail.net',
  'temp-mail.ru',
  'throwaway.email',
  'trashmail.com',
  'fakeinbox.com',
  'mailcatch.com',
  'tempinbox.com',
  'guerrillamail.net',
  'sharklasers.com',
  'grr.la',
  'pokemail.net',
  'spam4.me',
  'mailnull.com',
  'suremail.info',
  'meltmail.com',
  'fixmail.tk',
  '10mail.org',
  '20email.eu',
  '2prong.com',
  '33mail.com',
  'anonbox.net',
  'deadaddress.com',
  'drdrb.com',
  'e4ward.com',
  'emailondeck.com',
  'emailto.de',
  'fixmail.tk',
  'gishpuppy.com',
  'guerrillamail.biz',
  'guerrillamail.de',
  'guerrillamail.org',
  'haltospam.com',
  'incognitomail.org',
  'kasmail.com',
  'klzlk.com',
  'kurzepost.de',
  'lifebyfood.com',
  'lovemeleaveme.com',
  'mailin8r.com',
  'mailmetrash.com',
  'mintemail.com',
  'mohmal.com',
  'mytrashmail.com',
  'nobulk.com',
  'noclickemail.com',
  'nogmailspam.info',
  'nomail.xl.cx',
  'nospamfor.us',
  'objectmail.com',
  'obobbo.com',
  'oneoffemail.com',
  'oopi.org',
  'opayq.com',
  'owlpic.com',
  'pookmail.com',
  'proxymail.eu',
  'rcpt.at',
  'reallymymail.com',
  'safe-mail.net',
  'saynotospams.com',
  'selfdestructingmail.com',
  'sendspamhere.com',
  'spamail.com',
  'spamcero.com',
  'spamcorptastic.com',
  'spamcowboy.com',
  'spamcowboy.net',
  'spamcowboy.org',
  'spamgourmet.com',
  'spamgourmet.net',
  'spamgourmet.org',
  'spamhole.com',
  'spamify.com',
  'spaminator.de',
  'spamkill.info',
  'spaml.com',
  'spaml.de',
  'spammotel.com',
  'spamobox.com',
  'spamspot.com',
  'spamthis.co.uk',
  'spamthisplease.com',
  'superrito.com',
  'suremail.info',
  'tempalias.com',
  'tempe-mail.com',
  'tempemail.biz',
  'tempemail.com',
  'tempemail.net',
  'tempinbox.co.uk',
  'temp-mail.org',
  'temp-mail.ru',
  'temporaryinbox.com',
  'thankyou2010.com',
  'thisisnotmyrealemail.com',
  'throam.com',
  'tilien.com',
  'tmailinator.com',
  'tradermail.info',
  'trash2009.com',
  'trashemail.de',
  'trashymail.com',
  'tyldd.com',
  'upliftnow.com',
  'uplipht.com',
  'venompen.com',
  'veryrealemail.com',
  'walkmail.net',
  'wetrainbayarea.com',
  'wetrainbayarea.org',
  'wh4f.org',
  'whyspam.me',
  'willselfdestruct.com',
  'xoxy.net',
  'yogamaven.com',
  'yuurok.com',
  'zehnminutenmail.de',
  'zetmail.com',
  'zippymail.info',
  'zoemail.org'
]

export interface EmailValidationResult {
  isValid: boolean
  isDisposable: boolean
  hasMxRecords: boolean
  errors: string[]
}

/**
 * Validates email format using regex
 */
export function validateEmailFormat(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Checks if email domain is in disposable email list
 */
export function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase()
  return domain ? DISPOSABLE_DOMAINS.includes(domain) : false
}

/**
 * Quick email validation (format + disposable check only)
 * Safe for client-side use
 */
export function quickValidateEmail(email: string): EmailValidationResult {
  const result: EmailValidationResult = {
    isValid: false,
    isDisposable: false,
    hasMxRecords: false, // Not checked in quick validation
    errors: []
  }

  // Check format
  if (!validateEmailFormat(email)) {
    result.errors.push('Invalid email format')
    return result
  }

  // Check if disposable
  result.isDisposable = isDisposableEmail(email)
  if (result.isDisposable) {
    result.errors.push('Disposable email addresses are not allowed')
  }

  // Overall validity (MX records not checked)
  result.isValid = result.errors.length === 0

  return result
}

/**
 * Frontend-friendly email validation (returns user-friendly messages)
 * Safe for client-side use
 */
export function validateEmailForFrontend(email: string): { isValid: boolean; message: string } {
  const validation = quickValidateEmail(email)

  if (validation.isValid) {
    return { isValid: true, message: 'Email is valid' }
  }

  // Return the first error as a user-friendly message
  const errorMessages: { [key: string]: string } = {
    'Invalid email format': 'Please enter a valid email address (e.g., user@example.com)',
    'Disposable email addresses are not allowed': 'Temporary or disposable email addresses are not allowed. Please use a permanent email address.'
  }

  const firstError = validation.errors[0]
  const message = errorMessages[firstError] || firstError

  return { isValid: false, message }
}