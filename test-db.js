import { supabase } from './lib/supabase.js'

async function testDatabase() {
  console.log('Testing Supabase connection...')

  try {
    // Test connection by fetching admin credentials
    const { data: adminData, error: adminError } = await supabase
      .from('admin_credentials')
      .select('*')
      .limit(1)

    if (adminError) {
      console.error('Admin credentials table error:', adminError)
    } else {
      console.log('✅ Admin credentials table accessible')
      console.log('Admin users found:', adminData?.length || 0)
    }

    // Test registrations table
    const { data: regData, error: regError } = await supabase
      .from('registrations')
      .select('id, name, email, module, status')
      .limit(5)

    if (regError) {
      console.error('Registrations table error:', regError)
    } else {
      console.log('✅ Registrations table accessible')
      console.log('Sample registrations:', regData?.length || 0)
      if (regData && regData.length > 0) {
        console.log('Sample data:', regData.slice(0, 2))
      }
    }

    // Test business innovation evaluations table
    const { data: evalData, error: evalError } = await supabase
      .from('business_innovation_evaluations')
      .select('*')
      .limit(3)

    if (evalError) {
      console.error('Evaluations table error:', evalError)
    } else {
      console.log('✅ Business innovation evaluations table accessible')
      console.log('Evaluations found:', evalData?.length || 0)
      if (evalData && evalData.length > 0) {
        console.log('Sample evaluation:', evalData[0])
      }
    }

    // Test business innovation leaderboard view
    const { data: leaderboardData, error: leaderboardError } = await supabase
      .from('business_innovation_leaderboard')
      .select('*')
      .limit(5)

    if (leaderboardError) {
      console.error('Leaderboard view error:', leaderboardError)
    } else {
      console.log('✅ Business innovation leaderboard view accessible')
      console.log('Leaderboard entries:', leaderboardData?.length || 0)
      if (leaderboardData && leaderboardData.length > 0) {
        console.log('Top entries:', leaderboardData.slice(0, 2))
      }
    }

    console.log('\nDatabase test completed!')

  } catch (error) {
    console.error('Database test failed:', error)
  }
}

testDatabase()