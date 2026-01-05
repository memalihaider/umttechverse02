#!/usr/bin/env node

/**
 * SECURITY EMERGENCY: Database Clearing Script
 * This script will permanently delete ALL data from the database
 * Use only in case of security breach
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables:');
  console.error('   - NEXT_PUBLIC_SUPABASE_URL');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY');
  console.error('\nPlease check your .env.local file');
  process.exit(1);
}

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function clearDatabase() {
  console.log('🚨 SECURITY EMERGENCY: Clearing all database data...');
  console.log('⚠️  This action cannot be undone!');
  console.log('');

  try {
    // Clear business innovation evaluations first (foreign key constraints)
    console.log('🗑️  Clearing business innovation evaluations...');
    const { error: evalError } = await supabase
      .from('business_innovation_evaluations')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (evalError) {
      console.error('❌ Error clearing evaluations:', evalError);
      return;
    }

    // Clear all registrations
    console.log('🗑️  Clearing all registrations...');
    const { error: regError } = await supabase
      .from('registrations')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (regError) {
      console.error('❌ Error clearing registrations:', regError);
      return;
    }

    // Optional: Clear admin credentials (uncomment if needed)
    // console.log('🗑️  Clearing admin credentials...');
    // const { error: adminError } = await supabase
    //   .from('admin_credentials')
    //   .delete()
    //   .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    // if (adminError) {
    //   console.error('❌ Error clearing admin credentials:', adminError);
    //   return;
    // }

    // Verify the clearing
    console.log('\n🔍 Verifying data clearance...');

    const { data: adminCount, error: adminCheckError } = await supabase
      .from('admin_credentials')
      .select('id', { count: 'exact', head: true });

    const { data: regCount, error: regCheckError } = await supabase
      .from('registrations')
      .select('id', { count: 'exact', head: true });

    const { data: evalCount, error: evalCheckError } = await supabase
      .from('business_innovation_evaluations')
      .select('id', { count: 'exact', head: true });

    if (adminCheckError || regCheckError || evalCheckError) {
      console.error('❌ Error verifying clearance');
      return;
    }

    console.log('\n✅ Database cleared successfully!');
    console.log('📊 Remaining records:');
    console.log(`   - Admin credentials: ${adminCount?.length || 0}`);
    console.log(`   - Registrations: ${regCount?.length || 0}`);
    console.log(`   - Evaluations: ${evalCount?.length || 0}`);

    if ((regCount?.length || 0) === 0 && (evalCount?.length || 0) === 0) {
      console.log('\n🎉 All user data has been successfully removed from the database.');
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Confirmation prompt
console.log('🚨 SECURITY EMERGENCY DATABASE CLEARANCE');
console.log('=' .repeat(50));
console.log('');
console.log('This script will PERMANENTLY DELETE all data from:');
console.log('  - registrations table');
console.log('  - business_innovation_evaluations table');
console.log('');
console.log('Admin credentials will be PRESERVED.');
console.log('');
console.log('⚠️  WARNING: This action cannot be undone!');
console.log('');

// Run the clearance
clearDatabase();