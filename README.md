# Techverse 2026 - Pakistan's Premier Tech Competition

A comprehensive registration and management platform for Techverse 2026, Pakistan's premier technology competition event featuring AI, cybersecurity, gaming, robotics, and more.

## 🌟 Features

- **Futuristic Landing Page**: Modern UI with hero section, event stats, modules showcase, and video highlights
- **Module GuideBooks**: Each module on the Modules page has a "View GuideBook" button which links to the official module guidebook (to be provided). Individual dynamic module pages are not used in this build.
- **Techverse Executives**: Complete executive leadership team including President, Vice Presidents, Secretaries, and Directors
- **Team Registration**: Support for team-based modules with dynamic team member addition
- **User Registration Form**: Complete form with validation, CNIC/phone formatting, and file uploads
- **Admin Portal**: Comprehensive admin interface for managing registrations
- **Bank Details Integration**: Functional bank details display for payments
- **Email Notifications**: Automated emails for booking confirmation and approval/rejection
- **Payment Receipt Upload**: Supabase storage integration for receipt management
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## � Form Schema

The application uses a comprehensive form validation schema defined in `lib/schema.ts`. This schema provides:

- **Type-safe form validation** using Zod
- **Field-specific validation rules** for all form inputs
- **CNIC and phone number formatting** validation
- **File upload validation** for payment receipts
- **Team member validation** with proper constraints
- **Database schema mapping** for API documentation

### Schema Features

- **Personal Information**: Name, email, CNIC, phone, university, roll number validation
- **Module Selection**: Required module selection with validation
- **Team Members**: Dynamic team member validation (1-10 members)
- **Payment Receipts**: File type and size validation (JPEG, PNG, GIF, WebP, max 5MB)
- **API Response Schemas**: Type-safe API response validation

## 🗄️ Database Schema

### Tables

- **`registrations`**: Main registration data
  - `id`: UUID primary key
  - `name`, `email`, `cnic`, `phone`: Personal information
  - `university`, `roll_no`: Academic information
  - `module`: Selected competition module
  - `team_members`: JSON array of team member objects
  - `payment_receipt_url`: Supabase storage URL for receipts
  - `status`: Registration status (pending/approved/rejected)
  - `created_at`, `updated_at`: Timestamps

### Views

- **`registration_stats`**: Overall statistics (total, approved, pending, rejected registrations)
- **`module_stats`**: Statistics per competition module
- **`university_stats`**: Statistics per university

### Storage

- **`receipts`**: Public bucket for payment receipt uploads

### Functions

- **`get_registration_by_email(email)`**: Retrieve registration by email
- **`update_registration_status(id, status)`**: Update registration status

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Supabase:**
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Go to Settings > API to get your project URL and anon key
   - Update `.env.local` with your Supabase credentials

3. **Set up Database:**
   Run the complete Supabase setup script in your Supabase SQL Editor:

   ```bash
   # Run the complete setup script
   psql -f supabase_setup.sql
   ```

   Or copy and paste the contents of `supabase_setup.sql` into your Supabase SQL Editor.

   The setup includes:
   - **Registrations table** with all required fields
   - **Indexes** for optimal query performance
   - **Row Level Security (RLS)** policies for data protection
   - **Storage bucket** for payment receipts
   - **Views** for analytics and reporting
   - **Functions** for common database operations

4. **Create Storage Bucket:**
   - Go to Storage in your Supabase dashboard
   - Create a new bucket called `receipts`
   - Set it to public

5. **Set up Email:**
   - For Gmail, enable 2FA and create an App Password
   - Update `.env.local` with your email credentials

6. **Run the application:**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
reg/
├── app/
│   ├── api/
│   │   ├── approve/
│   │   │   └── route.ts          # Admin approval API
│   │   └── register/
│   │       └── route.ts          # Registration API
│   ├── admin/
│   │   └── page.tsx              # Admin portal
│   ├── components/
│   │   ├── LandingPage.tsx       # Main landing page
│   │   └── RegistrationForm.tsx  # Registration form component
│   ├── modules/
│   │   └── page.tsx              # Modules overview page with View GuideBook buttons
│   ├── register/
│   │   └── page.tsx              # Registration page wrapper
│   ├── team/
│   │   └── page.tsx              # Team page with supporting teams
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── lib/
│   ├── email.ts                  # Email service
│   ├── modules.ts                # Competition modules data
│   ├── schema.ts                 # Form validation schema
│   └── supabase.ts               # Supabase client
├── supabase_setup.sql            # Complete database setup
├── add_university_columns.sql    # Legacy migration script
├── public/                       # Static assets
└── README.md                     # This file
```

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```
