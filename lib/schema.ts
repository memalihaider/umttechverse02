import { z } from 'zod'

// CNIC validation regex (XXXXX-XXXXXXX-X format)
const cnicRegex = /^\d{5}-\d{7}-\d{1}$/

// Phone validation regex (+92XXXXXXXXXX format)
const phoneRegex = /^\+92\d{10}$/

// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Team member schema
export const teamMemberSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

  email: z.string()
    .regex(emailRegex, 'Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),

  university: z.string()
    .min(3, 'University name must be at least 3 characters')
    .max(200, 'University name must be less than 200 characters'),

  rollNo: z.string()
    .min(1, 'Roll number is required')
    .max(50, 'Roll number must be less than 50 characters')
})

// Main registration form schema
export const registrationFormSchema = z.object({
  // Personal Information
  name: z.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

  email: z.string()
    .regex(emailRegex, 'Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),

  cnic: z.string()
    .regex(cnicRegex, 'CNIC must be in format XXXXX-XXXXXXX-X')
    .length(15, 'CNIC must be exactly 15 characters'),

  phone: z.string()
    .regex(phoneRegex, 'Phone number must be in format +92XXXXXXXXXX')
    .length(13, 'Phone number must be exactly 13 characters'),

  university: z.string()
    .min(3, 'University name must be at least 3 characters')
    .max(200, 'University name must be less than 200 characters'),

  rollNo: z.string()
    .min(1, 'Roll number is required')
    .max(50, 'Roll number must be less than 50 characters'),

  // Module Selection
  module: z.string()
    .min(1, 'Please select a module'),

  // Team Members (array with at least 1 member - the team leader)
  teamMembers: z.array(teamMemberSchema)
    .min(1, 'At least one team member (team leader) is required')
    .max(10, 'Maximum 10 team members allowed'),

  // Payment Receipt (optional file)
  paymentReceipt: z.instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024, // 5MB max
      'File size must be less than 5MB'
    )
    .refine(
      (file) => !file || ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type),
      'Only JPEG, PNG, GIF, and WebP images are allowed'
    )
})

// Type inference from schema
export type RegistrationFormData = z.infer<typeof registrationFormSchema>
export type TeamMember = z.infer<typeof teamMemberSchema>

// Form validation helper
export const validateRegistrationForm = (data: unknown) => {
  return registrationFormSchema.safeParse(data)
}

// Field-specific validation helpers
export const validateField = (field: keyof RegistrationFormData, value: unknown) => {
  const fieldSchema = registrationFormSchema.shape[field]
  return fieldSchema.safeParse(value)
}

// Module-specific validation rules
export const getModuleValidationRules = (moduleName: string) => {
  // You can add module-specific validation rules here
  // For example, some modules might require more team members
  const moduleRules: Record<string, Partial<z.ZodObject<any>>> = {
    // Add module-specific rules as needed
  }

  return moduleRules[moduleName] || {}
}

// Form field configuration
export const formFields = {
  personal: [
    {
      name: 'name' as const,
      label: 'Full Name',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter your full name',
      validation: 'Minimum 2 characters, letters and spaces only'
    },
    {
      name: 'email' as const,
      label: 'Email',
      type: 'email' as const,
      required: true,
      placeholder: 'your.email@university.edu.pk',
      validation: 'Valid email address required'
    },
    {
      name: 'cnic' as const,
      label: 'CNIC',
      type: 'text' as const,
      required: true,
      placeholder: 'XXXXX-XXXXXXX-X',
      validation: 'Format: XXXXX-XXXXXXX-X (automatically formatted)'
    },
    {
      name: 'phone' as const,
      label: 'Phone Number',
      type: 'tel' as const,
      required: true,
      placeholder: '+92XXXXXXXXXX',
      validation: 'Format: +92XXXXXXXXXX (automatically formatted)'
    },
    {
      name: 'university' as const,
      label: 'University Name',
      type: 'text' as const,
      required: true,
      placeholder: 'University of Management and Technology',
      validation: 'Full university name'
    },
    {
      name: 'rollNo' as const,
      label: 'Roll Number',
      type: 'text' as const,
      required: true,
      placeholder: '2021-CS-123',
      validation: 'Your university roll number'
    }
  ],
  module: [
    {
      name: 'module' as const,
      label: 'Competition Module',
      type: 'select' as const,
      required: true,
      validation: 'Select your preferred competition module'
    }
  ],
  team: [
    {
      name: 'name' as const,
      label: 'Name',
      type: 'text' as const,
      required: true,
      placeholder: 'Team member name'
    },
    {
      name: 'email' as const,
      label: 'Email',
      type: 'email' as const,
      required: true,
      placeholder: 'member@university.edu.pk'
    },
    {
      name: 'university' as const,
      label: 'University Name',
      type: 'text' as const,
      required: true,
      placeholder: 'University name'
    },
    {
      name: 'rollNo' as const,
      label: 'Roll Number',
      type: 'text' as const,
      required: true,
      placeholder: 'Roll number'
    }
  ],
  payment: [
    {
      name: 'paymentReceipt' as const,
      label: 'Payment Receipt',
      type: 'file' as const,
      required: false,
      accept: 'image/*',
      validation: 'JPEG, PNG, GIF, WebP only. Max 5MB.'
    }
  ]
}

// Form step configuration
export const formSteps = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Enter your personal and academic details',
    fields: formFields.personal
  },
  {
    id: 'module',
    title: 'Module Selection',
    description: 'Choose your competition module',
    fields: formFields.module
  },
  {
    id: 'team',
    title: 'Team Members',
    description: 'Add your team members (if applicable)',
    fields: formFields.team,
    repeatable: true
  },
  {
    id: 'payment',
    title: 'Payment Details',
    description: 'Upload your payment receipt',
    fields: formFields.payment
  }
]

// Database schema mapping (for API documentation)
export const databaseSchema = {
  registrations: {
    id: 'uuid (primary key)',
    name: 'text (required)',
    email: 'text (required, unique)',
    cnic: 'text (required, unique)',
    phone: 'text (required)',
    university: 'text (required)',
    roll_no: 'text (required)',
    module: 'text (required)',
    team_members: 'jsonb (array of team member objects)',
    payment_receipt_url: 'text',
    status: 'text (pending/approved/rejected)',
    created_at: 'timestamp',
    updated_at: 'timestamp'
  }
}

// API response schemas
export const apiResponseSchemas = {
  registration: z.object({
    success: z.boolean(),
    message: z.string().optional(),
    registrationId: z.string().optional()
  }),

  error: z.object({
    error: z.string(),
    details: z.unknown().optional()
  })
}

export type ApiRegistrationResponse = z.infer<typeof apiResponseSchemas.registration>
export type ApiErrorResponse = z.infer<typeof apiResponseSchemas.error>