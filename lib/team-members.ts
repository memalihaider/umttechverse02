export type RawTeamMember = Record<string, any>

export function formatCnicDisplay(val?: string) {
  const cleaned = (val || '').replace(/\D/g, '')
  const match = cleaned.match(/^(\d{5})(\d{7})(\d{1})?$/)
  if (match) return `${match[1]}-${match[2]}${match[3] ? '-' + match[3] : ''}`
  return val || ''
}

export function getTeamMembers(obj: any): RawTeamMember[] {
  if (!obj) return []
  const raw = obj.team_members ?? obj.teamMembers ?? obj.members ?? obj
  try {
    if (Array.isArray(raw)) return raw
    if (typeof raw === 'string') {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed
      if (parsed && typeof parsed === 'object' && Array.isArray(parsed.members)) return parsed.members
      return []
    }
    if (raw && typeof raw === 'object') {
      if (Array.isArray(raw.members)) return raw.members
      // fallback: try to collect keys that look like numeric indices
      const arr: RawTeamMember[] = []
      Object.keys(raw).forEach(k => {
        if (/^\d+$/.test(k) && raw[k]) arr.push(raw[k])
      })
      return arr.length > 0 ? arr : []
    }
  } catch (err) {
    console.error('Error parsing team members', err)
    return []
  }
  return []
}

export function normalizeTeamMember(member: RawTeamMember) {
  if (!member) return { name: '', email: '', university: '', roll: '', rollNo: '', cnic: '' }
  const cnic = (member.cnic || member.CNIC || member.cnic_no || member.cnicNo || member.cnic_no || member.cnicNumber || '').toString().replace(/\D/g, '')
  const roll = member.roll || member.roll_no || member.rollNumber || member.rollNo || ''
  return {
    name: member.name || member.full_name || member.fullName || '',
    email: member.email || member.Email || member.email_address || '',
    university: member.university || member.university_name || '',
    roll: roll,
    rollNo: roll,
    cnic: cnic,
    cnic_formatted: formatCnicDisplay(cnic),
  }
}

export function getAdditionalTeamMembers(registration: any): RawTeamMember[] {
  if (!registration) return []
  const members = getTeamMembers(registration)
  if (!members || members.length === 0) return []

  const primaryEmail = (registration.email || registration.Email || '').toString().trim().toLowerCase()
  const primaryName = (registration.name || registration.full_name || '').toString().trim().toLowerCase()
  const primaryRoll = (registration.roll_no || registration.rollNo || registration.roll || '').toString().trim().toLowerCase()

  const filtered = members.filter(member => {
    if (!member) return false
    const normalized = normalizeTeamMember(member)
    const hasDetails = [normalized.name, normalized.email, normalized.university, normalized.rollNo, normalized.cnic]
      .some(value => !!value && value.toString().trim() !== '')
    if (!hasDetails) return false

    const memberEmail = (normalized.email || '').trim().toLowerCase()
    const memberName = (normalized.name || '').trim().toLowerCase()
    const memberRoll = (normalized.rollNo || '').toString().trim().toLowerCase()

    const matchesPrimaryEmail = primaryEmail && memberEmail && memberEmail === primaryEmail
    const matchesPrimaryName = primaryName && memberName && memberName === primaryName
    const matchesPrimaryRoll = primaryRoll && memberRoll && memberRoll === primaryRoll

    return !(matchesPrimaryEmail || matchesPrimaryName || matchesPrimaryRoll)
  })

  return filtered
}
