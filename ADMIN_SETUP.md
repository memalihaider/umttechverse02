# Admin Portal Setup Instructions

## Overview
This guide will help you set up the admin authentication system for the Techverse 2026 registration portal.

## Prerequisites
- Supabase project already set up
- Node.js dependencies installed (bcryptjs, jsonwebtoken)
- Environment variables configured

## Database Setup

### 1. Run the Complete Setup Script
Run the entire `supabase_setup.sql` file in your Supabase SQL Editor. This will create all tables, indexes, policies, and insert the default admin credentials.

The script includes:
- Admin credentials table creation
- Default admin users insertion
- All necessary indexes and triggers
- Row Level Security policies
- Storage bucket setup

### Default Admin Credentials:
- **Super Admin**: `admin@techverse.com` / `Admin@2026`
- **Admin**: `moderator@techverse.com` / `Admin@2026`
Run the following SQL in your Supabase SQL Editor:

## Environment Variables
Make sure your `.env.local` file contains:

```bash
# JWT Secret for Admin Authentication
JWT_SECRET=techverse2026-admin-secret-key-change-in-production
```

## Admin Access

### Accessing Admin Portal:
1. Navigate to `/admin/signin`
2. Enter admin credentials
3. You'll be redirected to `/admin` (the main admin portal)## Security Notes

### Important Security Measures:
1. **Change Default Passwords**: Immediately change the default passwords after setup
2. **Use Strong JWT Secret**: Change the JWT_SECRET in production
3. **Enable HTTPS**: Ensure your application uses HTTPS in production
4. **Regular Password Updates**: Implement password rotation policies

### Password Requirements:
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

## Features

### Admin Portal Features:
- View all registrations with filtering and search
- Approve/reject pending registrations
- Bulk approve/reject operations
- Export registration data to CSV
- Real-time statistics dashboard
- User management (for super admins)

### Authentication Features:
- JWT-based session management
- Automatic logout on token expiry (24 hours)
- Secure password hashing with bcrypt
- Role-based access control (admin vs super_admin)

## API Endpoints

### Admin Authentication:
- `POST /api/admin/login` - Admin login
- `GET /api/admin/verify` - Token verification

### Existing Endpoints:
- `POST /api/approve` - Approve/reject registrations
- `POST /api/register` - User registration
- `GET /api/certificate/verify` - Certificate verification

## Troubleshooting

### Common Issues:

1. **"Invalid credentials" error**:
   - Check if admin credentials exist in database
   - Verify password hash is correct
   - Ensure admin account is active

2. **"Invalid token" error**:
   - Check JWT_SECRET environment variable
   - Verify token hasn't expired (24h limit)
   - Ensure admin account still exists and is active

3. **Cannot access admin portal**:
   - Clear browser localStorage
   - Try logging in again
   - Check browser console for errors

## Development Notes

### File Structure:
```
app/
├── admin/
│   ├── signin/page.tsx    # Admin sign-in page
│   └── page.tsx           # Main admin portal
├── api/
│   └── admin/
│       ├── login/route.ts # Admin login API
│       └── verify/route.ts # Token verification API
```

### Dependencies Added:
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token management
- `@types/bcryptjs` - TypeScript types
- `@types/jsonwebtoken` - TypeScript types

## Production Deployment

### Before Deploying:
1. Change all default passwords
2. Update JWT_SECRET to a strong, random value
3. Enable HTTPS
4. Configure proper CORS settings
5. Set up monitoring and logging

### Environment Variables for Production:
```bash
JWT_SECRET=your-super-secure-random-jwt-secret-here
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
EMAIL_USER=your-email-user
EMAIL_PASS=your-email-password
```