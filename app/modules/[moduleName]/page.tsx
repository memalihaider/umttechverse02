'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { modules } from '@/lib/modules'

export default function ModulePage() {
  const params = useParams()
  const router = useRouter()
  const moduleName = params.moduleName as string

  // Decode the module name (URL encoded)
  const decodedModuleName = decodeURIComponent(moduleName)

  // Find the module data
  const module = modules.find(m => m.name === decodedModuleName)

  if (!module) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Module Not Found</h1>
          <p className="text-purple-300 mb-8">The module you're looking for doesn't exist.</p>
          <Link
            href="/"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  // Module-specific information
  const getModuleDetails = (moduleName: string) => {
    const details: Record<string, {
      description: string
      rules: string[]
      requirements: string[]
      prizes: string[]
      duration: string
      category: string
    }> = {
      'AI Hackathon': {
        description: 'Showcase your artificial intelligence and machine learning skills in this intensive hackathon. Build innovative AI solutions to real-world problems.',
        rules: [
          'Teams must consist of 2-4 members',
          'All code must be original and created during the event',
          'Use of pre-trained models is allowed but must be disclosed',
          'Projects must demonstrate practical AI applications',
          'Final presentations are mandatory'
        ],
        requirements: [
          'Laptop with development environment',
          'Basic knowledge of Python and ML frameworks',
          'GitHub account for code submission',
          'Presentation materials for final demo'
        ],
        prizes: ['1st Place: PKR 15,000', '2nd Place: PKR 10,000', '3rd Place: PKR 5,000'],
        duration: '24 hours',
        category: 'Artificial Intelligence'
      },
      'Cyber Hackathon': {
        description: 'Test your cybersecurity skills in this challenging hackathon. Identify vulnerabilities, develop security solutions, and compete in ethical hacking challenges.',
        rules: [
          'Individual participation only',
          'All activities must be ethical and legal',
          'No actual system exploitation allowed',
          'CTF-style challenges with time limits',
          'Code of conduct must be followed strictly'
        ],
        requirements: [
          'Laptop with Kali Linux or similar security tools',
          'Knowledge of networking and security concepts',
          'Basic programming skills (Python, Bash)',
          'Understanding of common vulnerabilities'
        ],
        prizes: ['1st Place: PKR 8,000', '2nd Place: PKR 5,000', '3rd Place: PKR 3,000'],
        duration: '12 hours',
        category: 'Cybersecurity'
      },
      'FIFA 26': {
        description: 'Compete in the latest FIFA 26 tournament. Show off your football gaming skills in this exciting esports competition.',
        rules: [
          'Individual or team participation',
          'Single elimination tournament format',
          'Standard FIFA rules apply',
          'Custom tactics allowed',
          'Fair play and sportsmanship required'
        ],
        requirements: [
          'PS5 or PC with FIFA 26 installed',
          'Stable internet connection',
          'Gaming controller (PS5 controller recommended)',
          'Discord for communication'
        ],
        prizes: ['1st Place: PKR 5,000', '2nd Place: PKR 3,000', '3rd Place: PKR 2,000'],
        duration: '4-6 hours',
        category: 'Esports'
      },
      'Line Following Robot': {
        description: 'Design and build a robot that can follow a line autonomously. Test your robotics and programming skills in this hardware challenge.',
        rules: [
          'Teams of 1-3 members',
          'Robot must follow the given track autonomously',
          'Maximum robot dimensions: 30cm x 30cm x 30cm',
          'Battery-powered only (no external power)',
          'Safety rules must be followed'
        ],
        requirements: [
          'Arduino or Raspberry Pi board',
          'IR sensors for line detection',
          'DC motors and motor driver',
          'Battery pack (safe voltage only)',
          'Basic programming knowledge'
        ],
        prizes: ['1st Place: PKR 8,000', '2nd Place: PKR 5,000', '3rd Place: PKR 3,000'],
        duration: '3 hours',
        category: 'Robotics'
      },
      'Obstacle Avoidance Robot': {
        description: 'Build a robot that can navigate through obstacles autonomously. This challenge tests your sensor integration and pathfinding algorithms.',
        rules: [
          'Teams of 1-3 members',
          'Robot must avoid obstacles and reach the destination',
          'Maximum robot dimensions: 30cm x 30cm x 30cm',
          'Autonomous operation only',
          'Time limits apply for each run'
        ],
        requirements: [
          'Microcontroller (Arduino/Raspberry Pi)',
          'Ultrasonic or IR sensors',
          'DC motors with wheels',
          'Battery power source',
          'Programming skills in C/C++ or Python'
        ],
        prizes: ['1st Place: PKR 8,000', '2nd Place: PKR 5,000', '3rd Place: PKR 3,000'],
        duration: '3 hours',
        category: 'Robotics'
      },
      'PUBG Mobile': {
        description: 'Compete in the ultimate battle royale experience. Form squads and fight for victory in this popular mobile esports tournament.',
        rules: [
          'Teams of 2-4 members',
          'TPP (Third Person Perspective) mode',
          'Standard PUBG Mobile rules apply',
          'No cheating or unfair advantages',
          'Sportsmanship and fair play required'
        ],
        requirements: [
          'Android smartphone with PUBG Mobile installed',
          'Stable internet connection',
          'Gaming accessories (optional)',
          'Discord for team communication',
          'PUBG Mobile account'
        ],
        prizes: ['1st Place: PKR 10,000', '2nd Place: PKR 7,000', '3rd Place: PKR 4,000'],
        duration: '2-3 hours',
        category: 'Esports'
      },
      'Scavenger Hunt': {
        description: 'Embark on an exciting scavenger hunt that combines technology, creativity, and teamwork. Solve clues and complete challenges across the campus.',
        rules: [
          'Teams of 3-5 members',
          'All team members must participate',
          'Clues must be solved in sequence',
          'Time limits apply',
          'Fair play and safety first'
        ],
        requirements: [
          'Smartphone with camera and GPS',
          'Transportation within campus',
          'Team coordination skills',
          'Basic problem-solving abilities',
          'Good physical condition'
        ],
        prizes: ['1st Place: PKR 10,000', '2nd Place: PKR 7,000', '3rd Place: PKR 4,000'],
        duration: '4 hours',
        category: 'Adventure'
      },
      'Speed Programming': {
        description: 'Test your coding speed and accuracy in this intense programming competition. Solve algorithmic problems under time pressure.',
        rules: [
          'Individual participation',
          'Time limits for each problem',
          'Multiple programming languages allowed',
          'Code must be efficient and correct',
          'Plagiarism is strictly prohibited'
        ],
        requirements: [
          'Laptop with development environment',
          'Knowledge of at least one programming language',
          'Understanding of algorithms and data structures',
          'Problem-solving skills',
          'Time management abilities'
        ],
        prizes: ['1st Place: PKR 15,000', '2nd Place: PKR 10,000', '3rd Place: PKR 5,000'],
        duration: '3 hours',
        category: 'Programming'
      },
      'Speed Wiring': {
        description: 'Race against time to complete electronic circuit wiring challenges. Test your knowledge of electronics and circuit design.',
        rules: [
          'Individual participation',
          'Time limits for each circuit',
          'Circuits must function correctly',
          'Safety precautions must be followed',
          'Clean and organized wiring required'
        ],
        requirements: [
          'Basic electronics knowledge',
          'Understanding of circuit components',
          'Soldering skills (optional)',
          'Safety awareness',
          'Precision and focus'
        ],
        prizes: ['1st Place: PKR 8,000', '2nd Place: PKR 5,000', '3rd Place: PKR 3,000'],
        duration: '2 hours',
        category: 'Electronics'
      },
      'Sumo War Robot': {
        description: 'Build a powerful sumo robot and compete in robotic combat. Push your opponent out of the ring to win!',
        rules: [
          'Teams of 1-3 members',
          'Robot weight limit: 5kg',
          'Maximum dimensions: 30cm x 30cm x 30cm',
          'Battery-powered only',
          'Safety rules strictly enforced'
        ],
        requirements: [
          'Strong motors and chassis',
          'Battery power system',
          'Remote control system',
          'Durable construction materials',
          'Basic electronics knowledge'
        ],
        prizes: ['1st Place: PKR 10,000', '2nd Place: PKR 7,000', '3rd Place: PKR 4,000'],
        duration: '3 hours',
        category: 'Robotics'
      },
      'Tekken 8': {
        description: 'Showcase your fighting game skills in the latest Tekken 8 tournament. Master the characters and compete in this fighting game classic.',
        rules: [
          'Individual participation',
          'Single elimination tournament',
          'Best of 3 matches format',
          'Character selection rules apply',
          'Fair play and sportsmanship required'
        ],
        requirements: [
          'PS5 or PC with Tekken 8 installed',
          'Fighting game controller',
          'Practice time with the game',
          'Understanding of fighting game mechanics',
          'Quick reflexes and strategy'
        ],
        prizes: ['1st Place: PKR 5,000', '2nd Place: PKR 3,000', '3rd Place: PKR 2,000'],
        duration: '3-4 hours',
        category: 'Esports'
      },
      'UI/UX Competition': {
        description: 'Design beautiful and functional user interfaces. Showcase your design skills and create innovative user experiences.',
        rules: [
          'Teams of 2-4 members',
          'Design must solve a real problem',
          'Prototypes or mockups required',
          'Original designs only',
          'Presentation of design process mandatory'
        ],
        requirements: [
          'Design software (Figma, Adobe XD, Sketch)',
          'Understanding of UI/UX principles',
          'Creativity and innovation',
          'Presentation skills',
          'User research knowledge'
        ],
        prizes: ['1st Place: PKR 10,000', '2nd Place: PKR 7,000', '3rd Place: PKR 4,000'],
        duration: '24 hours',
        category: 'Design'
      },
      'Valorant': {
        description: 'Compete in the tactical 5v5 character-based shooter. Form a team and battle for victory in this competitive esports title.',
        rules: [
          'Teams of 5 members + 1 substitute',
          'Standard Valorant competitive rules',
          'No cheating or unfair advantages',
          'Professional conduct required',
          'Tournament format: Best of 1 or 3'
        ],
        requirements: [
          'PC with Valorant installed',
          'Gaming peripherals (mouse, keyboard, headset)',
          'Team coordination and communication',
          'Individual skill and game knowledge',
          'Practice and team strategy'
        ],
        prizes: ['1st Place: PKR 15,000', '2nd Place: PKR 10,000', '3rd Place: PKR 5,000'],
        duration: '4-6 hours',
        category: 'Esports'
      },
      'Web Hackathon': {
        description: 'Build innovative web applications in this intensive coding challenge. Create functional websites and web apps from scratch.',
        rules: [
          'Teams of 1-3 members',
          'All code must be original',
          'Web applications must be functional',
          'Modern web technologies encouraged',
          'Final presentation required'
        ],
        requirements: [
          'Laptop with development environment',
          'Knowledge of HTML, CSS, JavaScript',
          'Framework knowledge (React, Vue, Angular)',
          'Backend development skills',
          'Git and version control'
        ],
        prizes: ['1st Place: PKR 15,000', '2nd Place: PKR 10,000', '3rd Place: PKR 5,000'],
        duration: '24 hours',
        category: 'Web Development'
      },
      'CyberQuest': {
        description: 'Embark on a cybersecurity adventure. Solve challenges, find hidden flags, and learn about digital security in this interactive quest.',
        rules: [
          'Individual participation',
          'Capture The Flag (CTF) format',
          'Ethical hacking principles only',
          'Time limits for challenges',
          'Learning and fun-focused approach'
        ],
        requirements: [
          'Laptop with basic tools',
          'Curiosity and problem-solving skills',
          'Basic computer knowledge',
          'Internet access for research',
          'Willingness to learn'
        ],
        prizes: ['1st Place: PKR 15,000', '2nd Place: PKR 10,000', '3rd Place: PKR 5,000'],
        duration: '4 hours',
        category: 'Cybersecurity'
      },
      'Business Innovation': {
        description: 'Develop innovative business ideas and create startup concepts. Combine technology with entrepreneurial thinking.',
        rules: [
          'Teams of 1-5 members',
          'Business plan must be feasible',
          'Technology integration required',
          'Original ideas only',
          'Pitch presentation mandatory'
        ],
        requirements: [
          'Business and market knowledge',
          'Understanding of technology trends',
          'Presentation and pitching skills',
          'Creativity and innovation',
          'Team collaboration abilities'
        ],
        prizes: ['1st Place: PKR 20,000', '2nd Place: PKR 15,000', '3rd Place: PKR 10,000'],
        duration: '48 hours',
        category: 'Business & Technology'
      }
    }

    return details[moduleName] || {
      description: 'Exciting competition module at Techverse 2026.',
      rules: ['Follow all event guidelines', 'Maintain fair play', 'Respect other participants'],
      requirements: ['Basic participation requirements', 'Check with organizers for specifics'],
      prizes: ['TBD'],
      duration: 'TBD',
      category: 'Competition'
    }
  }

  const moduleDetails = getModuleDetails(module.name)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm border-b border-purple-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-purple-200 hover:text-blue-300 transition-colors"
              >
                ← Back to Home
              </Link>
              <div className="h-6 w-px bg-purple-500/50"></div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Techverse 2026
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/register"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/20">
            <div className="text-8xl mb-6">
              {module.name.includes('AI') && '🤖'}
              {module.name.includes('Cyber') && '🔒'}
              {module.name.includes('FIFA') && '⚽'}
              {module.name.includes('Robot') && '🤖'}
              {module.name.includes('PUBG') && '🎮'}
              {module.name.includes('Programming') && '💻'}
              {module.name.includes('Wiring') && '⚡'}
              {module.name.includes('Sumo') && '🤼'}
              {module.name.includes('Tekken') && '🥊'}
              {module.name.includes('UI/UX') && '🎨'}
              {module.name.includes('Valorant') && '🎯'}
              {module.name.includes('Web') && '🌐'}
              {module.name.includes('Business') && '💼'}
              {!module.name.includes('AI') && !module.name.includes('Cyber') && !module.name.includes('FIFA') && !module.name.includes('Robot') && !module.name.includes('PUBG') && !module.name.includes('Programming') && !module.name.includes('Wiring') && !module.name.includes('Sumo') && !module.name.includes('Tekken') && !module.name.includes('UI/UX') && !module.name.includes('Valorant') && !module.name.includes('Web') && !module.name.includes('Business') && '🏆'}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
              {module.name}
            </h1>
            <p className="text-xl text-purple-200 mb-6">{moduleDetails.category}</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-purple-900/50 text-purple-200 px-4 py-2 rounded-lg">
                Entry Fee: PKR {module.fee}
              </span>
              <span className="bg-purple-900/50 text-purple-200 px-4 py-2 rounded-lg">
                Team Size: {module.teamSize}
              </span>
              <span className="bg-purple-900/50 text-purple-200 px-4 py-2 rounded-lg">
                Duration: {moduleDetails.duration}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Module Details */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">

            {/* Description */}
            <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">📋 Description</h2>
              <p className="text-purple-200 leading-relaxed">{moduleDetails.description}</p>
            </div>

            {/* Contact Info */}
            <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">📞 Contact Information</h2>
              <div className="space-y-3 text-purple-200">
                <p><span className="font-medium">Coordinator:</span> {module.contact}</p>
                <p><span className="font-medium">Event:</span> Techverse 2026</p>
                <p><span className="font-medium">Venue:</span> UMT Lahore</p>
                <p><span className="font-medium">Date:</span> Jan 5-11, 2026</p>
              </div>
            </div>

            {/* Rules */}
            <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">📜 Rules & Guidelines</h2>
              <ul className="space-y-2 text-purple-200">
                {moduleDetails.rules.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-400 mr-2 mt-1">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">🛠️ Requirements</h2>
              <ul className="space-y-2 text-purple-200">
                {moduleDetails.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-400 mr-2 mt-1">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prizes */}
            <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20 md:col-span-2">
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">🏆 Prize Distribution</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {moduleDetails.prizes.map((prize, index) => (
                  <div key={index} className="bg-black/30 rounded-lg p-4 text-center border border-purple-500/10">
                    <div className="text-2xl mb-2">
                      {index === 0 && '🥇'}
                      {index === 1 && '🥈'}
                      {index === 2 && '🥉'}
                    </div>
                    <div className="text-purple-200 font-medium">{prize}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-2xl p-12 border border-purple-500/30">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Ready to Compete in {module.name}?
            </h2>
            <p className="text-xl text-purple-200 mb-8">
              Join the challenge and showcase your skills. Register now for Techverse 2026!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Register for {module.name}
              </Link>
              <Link
                href="/"
                className="border-2 border-purple-500/50 text-purple-200 hover:bg-purple-500/20 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
              >
                View All Modules
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}