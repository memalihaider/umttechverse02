'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { modules } from '@/lib/modules'

export default function ModulePage() {
  const params = useParams()
  const moduleName = params.moduleName as string

  // Decode the module name (URL encoded)
  const decodedModuleName = decodeURIComponent(moduleName)

  // Find the module data
  const selectedModule = modules.find(m => m.name === decodedModuleName)

  if (!selectedModule) {
    return (
    <div className="min-h-screen bg-linear-to-br from-black via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Module Not Found</h1>
          <p className="text-purple-300 mb-8">The module you&apos;re looking for doesn&apos;t exist.</p>
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
    type ModuleDetails = {
  title?: string
      description?: string
      problemStatement?: string
  announcements?: string[]
  challenges?: string[]
  claimingFlags?: string[]
  commonFlagLocations?: string[]
       scoring?: string[]
  specialRecognition?: string[]
  infrastructure?: string[]
  hintsNotifications?: string[]
  faqs?: string[]
  matchRules?: string[]
  tournamentFormat?: string
  toolsAllowed?: string[]
  codeOfConduct?: string[]
  winningCriteria?: string
      registration?: {
        teamSize?: string
        feePKR?: number
        crossTeamCollaboration?: boolean
        eligibility?: string
        tournamentPlatform?: string
      }
      gameSettings?: string[]
      recordingRequirement?: string[]
      venueRules?: string[]
      placementPoints?: string[]
      contact?: string
      prizes?: string[]
      importantGuidelines?: string[]
      hackathonRules?: string[]
      judgingCriteria?: string[]
      useOfAITools?: string[]
      preparationChecklist?: string[]
      evaluationCriteria?: string[]
      useOfAI?: string[]
      judgingDecisions?: string[]
      intellectualProperty?: string[]
      requirements?: string[]
      rules?: string[]
      duration?: string
      category?: string
      contactSupport?: string
    }

    const details: Record<string, ModuleDetails> = {
      'AI Hackathon': {
        title: 'Techverse Chapter 2 AI Hackathon',
  description: `Techverse AI Hackathon is your chance to innovate, collaborate, and solve real-world problems using Generative AI or Agentic AI. It&apos;s the perfect platform to gain hands-on experience, connect with like-minded innovators, and showcase your AI engineering and problem-solving skills.`,
        problemStatement: 'The problem statement and hackathon theme will be announced at the start of the event. Teams will have 48 hours to ideate and build a working prototype addressing the given challenge.',
        registration: {
          teamSize: '2 to 4 members',
          feePKR: 2500,
          crossTeamCollaboration: true,
          eligibility: 'Open to students, professionals, freelancers, or anyone passionate about AI'
        },
        prizes: [
          'First Prize: PKR 30,000 per team + Shield + Certificate',
          'Runner-up Prize: PKR 15,000 per team + Shield + Certificate',
          'Certificates: All participants will receive certificates, with special recognition for top-performing teams.'
        ],
        importantGuidelines: [
          'All code must be built on the spot; no pre-existing projects or solutions are allowed.',
          'Internet facilities will be provided (stable, high-speed connection).',
          'Judging Panel: 4–5 experts from industry and academia.',
          'Languages: Python or TypeScript are preferred.'
        ],
        hackathonRules: [
          'Duration: All work must be completed within the official 48-hour event timeframe.',
          'Tools & Frameworks: Pre-built libraries and frameworks may be used but must be disclosed and used minimally.',
          'Code of Conduct: Respect and professionalism are mandatory. Plagiarism or misuse of AI tools without proper credit will lead to disqualification.',
          'Project Submission Requirements: Final source code, 2–3-minute demo video, project documentation, live pitch or presentation to the judges.'
        ],
        // Keep `rules` and `requirements` for the module UI which expects those fields
        rules: [
          'Teams must consist of 2-4 members',
          'All code must be built on the spot; no pre-existing projects or solutions are allowed',
          'Use of pre-trained models is allowed but must be disclosed',
          'Final presentations and submission requirements must be followed',
          'Plagiarism or misuse of AI tools without proper credit will lead to disqualification'
        ],
        requirements: [
          'Laptop with development environment (VS Code / PyCharm recommended)',
          'Basic knowledge of Python and ML frameworks or TypeScript and Node.js',
          'GitHub/GitLab account for code submission',
          'Presentation materials for final demo'
        ],
        judgingCriteria: [
          'Innovation & Creativity - 30%',
          'Technical Execution - 25%',
          'Feasibility & Real-world Impact - 20%',
          'Presentation & Clarity - 15%',
          'Team Collaboration - 10%'
        ],
        useOfAITools: [
          'Open-source and public AI tools are allowed.',
          'Teams must explain how AI models or APIs are integrated.',
          'Generative tools (e.g., GPT, Stable Diffusion) are permitted with proper attribution.'
        ],
        preparationChecklist: [
          'Laptop with necessary tools/software pre-installed',
          'Chargers and extension cords (1 per team)',
          'Valid ID (student or professional)',
          'Pre-installed Tools (recommended): VS Code, PyCharm; any third-party or open-source AI tools',
          'Optional: Headphones, USB drive for backups, notebook and pen, reusable water bottle'
        ],
        contactSupport: 'Umair Khan – +92 308 6707770',
        duration: '48 hours',
        category: 'Artificial Intelligence'
      },
      'Cyber Hackathon': {
        title: 'Techverse Chapter 2 Cyber Hackathon',
        description: 'Cyber Hackathon is a cybersecurity competition where participants solve challenges in areas such as hacking, cryptography, and digital forensics to uncover hidden "flags". These flags earn points and simulate real-world security tasks.',
        announcements: [
          'Important onsite announcements may include hints, clarifications, new challenges, or rule updates',
          'Pay close attention to announcements as they may provide critical guidance'
        ],
        challenges: [
          'Binary Exploitation (Pwn): Buffer overflows, memory corruption, binary vulnerabilities',
          'Reverse Engineering: Decompiled code analysis and program behavior understanding',
          'Web Exploitation: SQL Injection, XSS, authentication bypasses',
          'Cryptography: Breaking or applying cryptographic algorithms',
          'Digital Forensics & Steganography: File analysis, hidden data recovery, metadata study',
          'Operating System Exploitation: Kernel exploits, privilege escalation',
          'Mobile Exploitation: Android/iOS app vulnerabilities',
          'Programming: Solve coding challenges in C++, Python, C#, etc.',
          'Miscellaneous: Logic puzzles, steganography, unconventional problems'
        ],
        claimingFlags: [
          'Flags follow the format: ETSCTF_FLAG or ETSCTF{FLAG}',
          'Only the FLAG portion is required for submission'
        ],
        commonFlagLocations: [
          '/root directory',
          'Environment variables',
          'System files (/etc/shadow, /etc/passwd)',
          'Application-specific databases, memcache keys',
          'Other hidden or non-standard locations'
        ],
        scoring: [
          'Points are awarded upon successful flag submission',
          'Services (open ports) may give hints or partial points',
          'Complete all services and flags within a challenge to finish it'
        ],
        specialRecognition: [
          'First Blood Prize: PKR 5,000 to the team securing the most first bloods (fastest solves)',
          'Additional Awards: Best Writeup, Most Innovative Approach, Best Rookie Team'
        ],
        infrastructure: [
          'A dedicated stable internet connection will be ensured throughout the competition',
          'The organizing team will operate a local server for the CTF platform'
        ],
        hintsNotifications: [
          'Each challenge page may include hints as you progress',
          'If multiple teams are stuck on the same point, public hints may be issued'
        ],
        registration: {
          teamSize: '1 to 3 members',
          feePKR: 1500,
          eligibility: 'Open to students, professionals, and anyone with interest in cybersecurity'
        },
        requirements: [
          'Laptop with Kali Linux or similar security tools',
          'Knowledge of networking and security concepts',
          'Basic programming skills (Python, Bash)',
          'Understanding of common vulnerabilities'
        ],
        prizes: ['Winner: PKR 30,000 + Shield + Certificate', 'Runner-up: PKR 15,000 + Shield + Certificate', 'Certificates: All participants will receive e-certificates'],
        rules: [
          'No DoS attacks. Don\'t overload servers',
          'No abuse of access. Misuse leads to disqualification',
          'Don\'t attack the platform itself. Only challenge systems are in scope',
          'No spoilers. Don\'t share flags or publish solutions before the event ends',
          'No mass scanning / brute force unless explicitly stated by a challenge'
        ],
        faqs: [
          'Q: Are there extra points for performance? Yes — fastest solves, best averages, full-category completions, and best writeups can earn extra points',
          'Q: How are ties resolved? (1) Higher points; (2) Earliest submission; (3) Oldest registered team',
          'Q: Can we publish solutions during the event? No — publishing or streaming solutions before the event ends lead to disqualification'
        ],
        contactSupport: 'Nabaha Umar - +92 349 4709369',
        duration: 'Varies by challenge type',
        category: 'Cybersecurity'
      },
      
      'FIFA 26': {
        title: 'Techverse Chapter 2 FIFA 26',
        description: 'Welcome to the EAFC 26 Tournament! Show off your football gaming skills in a smooth and competitive environment. Read the rules carefully before participating.',
        registration: { teamSize: 'Individual/Team', feePKR: 1000, eligibility: 'All registered university participants', tournamentPlatform: 'PlayStation 5 / EAFC 26' },
        prizes: ['1st Place: PKR 20,000 + Shield + Certificate', '2nd Place: PKR 10,000 + Shield + Certificate', 'Certificates for all participants'],
        matchRules: [
          "Half-time: 5 minutes each half for the winner's bracket; 4 minutes each half for the loser's bracket",
          'Camera Settings: Tele Broadcast (can be changed by mutual decision of both players)',
          'Gameplay Difficulty: Legendary',
          'Rest of World teams are not allowed. Only Clubs and International Teams are allowed.'
        ],
  tournamentFormat: 'Double Elimination Matches',
  toolsAllowed: ['Players may bring their own controllers to ensure fairness'],
        codeOfConduct: [
          'Fair Play: Players must adhere to the rules and show sportsmanship',
          'Respect Property: Do not damage or misuse gaming equipment',
          'Volunteers & Judges: All decisions by organizers are final and should be respected.'
        ],
        winningCriteria: 'The first player or team to successfully complete all rounds and win their matches will be declared the winner',
        rules: [
          'Eligibility: The tournament is open to all registered participants who are enrolled in universities.',
          'Players may participate individually or as part of a team.',
          'Registration: All participants must register before the tournament begins.',
          'Start & End Time: The tournament will begin at the specified time on the designated date. Late entries will not be entertained.'
        ],
  contactSupport: 'Asad - +92 324 8443622',
  contact: 'Asad - +92 324 8443622',
        duration: 'Match durations vary; tournament duration depends on bracket progress',
        category: 'Esports',
        requirements: ['PS5 with EAFC 26 installed', 'Stable internet connection', 'Gaming controller (PS5 controller recommended)', 'Discord for communication']
      },
      'Line Following Robot': {
        title: 'Techverse Chapter 2 LFR Guide Book',
        description: 'Welcome to the Line Following Robot Competition at Techverse Chapter 2. This exciting challenge will test your innovation and robotic skills. Please read the following rules and regulations carefully to ensure fair participation and a thrilling experience.',
        registration: { teamSize: '1 - 3 members', feePKR: 1500 },
        prizes: [
          'Winner: PKR 15,000 + Shield + Certificate',
          'Runner Up: PKR 10,000 + Shield + Certificate',
          'Certificates for all participants'
        ],
        requirements: [
          'Team Size: Maximum 3 members',
          'Microcontroller: Must use one with an IR sensor',
          'Chassis: Any base/chassis allowed (Max size: 10" x 10")',
          'Motors: Any RPM, any motor driver',
          'Battery: Maximum 12V allowed',
          'Prebuilt Circuits: Not allowed'
        ],
        rules: [
          'Robot must follow the black line on a white surface',
          'No touching the robot during the run',
          'Maximum 3 attempts; each failed attempt deducts 5 marks',
          'Arena dimensions: 12ft x 6ft',
          'Robot must navigate various junctions to reach the finish point in limited time'
        ],
        scoring: [
          'Fastest robot to complete the track wins',
          'Judges evaluate overall performance to declare the winner'
        ],
        contactSupport: 'Junaid - +92 324 4768248; Muhammad Itayab - +92 333 4204421',
        contact: 'Junaid - +92 324 4768248',
        duration: '3 hours',
        category: 'Robotics'
      },
      'Obstacle Avoidance Robot': {
        title: 'Techverse Chapter 2 Obstacle Avoidance Guide Book',
        description: 'Welcome to the Obstacle Avoiding Robot Competition at Techverse Chapter 2! This exciting challenge will test your robot’s agility, sensors, and obstacle navigation skills. Please carefully read the rules and regulations to ensure fair participation and a smooth experience.',
        registration: { teamSize: '1 - 3 members', feePKR: 1500 },
        prizes: [
          'Winner: PKR 15,000 + Shield + Certificate',
          'Runner Up: PKR 10,000 + Shield + Certificate',
          'Certificates for all participants'
        ],
        requirements: [
          'Team Size: Maximum 3 members',
          'Microcontroller: Must include Ultrasonic sensor capability',
          'Chassis: Any base/chassis allowed (Max size: 10" x 10")',
          'Motors: Any RPM, any motor driver',
          'Battery: Maximum 12V allowed',
          'Prebuilt Circuits: Not allowed'
        ],
        rules: [
          'Arena Size: 8ft x 4ft',
          'Obstacle Avoidance: Robot must avoid all obstacles',
          'Time-Based: Fastest completion time wins',
          'Touch Penalty: +2 seconds for each collision',
          'Attempts: Max 3 tries; -5 marks per failure',
          'Judging: Based on overall performance and impartial evaluation'
        ],
        scoring: [
          'Fastest completion time wins',
          'Touch Penalty: +2s added per collision',
          'Attempts: Max 3 tries; failures may incur -5 marks'
        ],
        contactSupport: 'Junaid - +92 324 4768248; Muhammad Itayab - +92 333 4204421',
        contact: 'Junaid - +92 324 4768248',
        duration: 'Varies by round',
        category: 'Robotics'
      },
      'PUBG Mobile': {
        title: 'Techverse Chapter 2 PUBG Guide Book',
        description: 'Welcome to the PUBG Mobile LAN Tournament! Below are the official rules and regulations to ensure a competitive and fair experience. Please read them carefully before participating.',
        registration: { teamSize: 'Squad (4 members) or Duo (2 members)', feePKR: 2000, tournamentPlatform: 'iOS and Android devices' },
        prizes: ['1st Place: PKR 20,000', '2nd Place: PKR 10,000'],
        gameSettings: [
          'Mode: Official Tournament Room Settings',
          'Loot: 3x (Advanced Room Card will be used)',
          'Zone Speed: 1.75x',
          'Pan & Fist Fights: Allowed',
          'Emergency Pickup: Not allowed (A -5 points penalty will be applied if used)',
          'iPads: Allowed',
          'Devices: Players must bring their own devices, chargers, cooling fans (if needed), and headphones',
          'Device Restrictions: Devices from the Red Magic and ROG series are not permitted for use in the tournament due to compliance and fairness regulations'
        ],
        recordingRequirement: [
          'A minimum of two players per team must record their gameplay during matches',
          'In case of allegations or disputes, the recording must be presented to the management immediately',
          'Failure to provide recordings upon request will result in immediate disqualification'
        ],
        venueRules: [
          'All players are required to be physically present at the venue',
          'Absenteeism or no-shows will lead to disqualification'
        ],
        placementPoints: [
          '1st: +10 points',
          '2nd: +6 points',
          '3rd: +5 points',
          '4th: +3 points',
          '5th: +2 points',
          '6th–8th: +1 point',
          '9th–16th: 0 points',
          'Kill: +1 per Kill',
          'Emergency Pickup: -5 points penalty'
        ],
        codeOfConduct: [
          'Fair Play: Players must respect the rules and the integrity of the tournament',
          'Respect Property: Ensure the gaming equipment is handled with care and respect',
          'Volunteers & Judges: All decisions made by the organizing committee and volunteers are final. Disrespect toward organizers or volunteers may result in disqualification'
        ],
        winningCriteria: 'In case of a tie, the total number of kills and the overall placement will be used to break the tie',
        rules: [
          'Registering as a duo places you at a disadvantage against full squads. However, if two duos agree to form a squad on spot, they may compete together but performance, synergy, or in-game roles will not be grounds for reconsideration by the management',
          'Eligibility: The tournament is open to all registered participants. The team leader must be enrolled in a university, while other squad members can be students from university or with a minimum qualification of intermediate (FA/FSc/A Levels or equivalent). Players must be physically present at the venue to participate. Players must bring their own devices, including: Chargers, Cooling fans (if needed), Headphones or hands-free sets',
          'Registration: All participants must register before the tournament begins'
        ],
        requirements: [
          'Android smartphone with PUBG Mobile installed',
          'Stable internet connection',
          'Gaming accessories (optional)',
          'Discord for team communication',
          'PUBG Mobile account'
        ],
        contactSupport: 'Mueez - +92 307 8630935',
        contact: 'Mueez - +92 307 8630935',
        duration: '2-3 hours',
        category: 'Esports'
      },
      'Scavenger Hunt': {
        title: 'Techverse Chapter 2 Scavenger Hunt Guide Book',
        description: 'Welcome to the Campus Clue Mania – a test of logic, speed, and observation! Please read the following rules and regulations carefully to ensure fair participation and an enjoyable experience.',
        registration: { teamSize: '3 - 5 members', feePKR: 2000 },
        prizes: [
          'Winner: PKR 15,000 + Shield + Certificate',
          'Runner Up: PKR 10,000 + Shield + Certificate',
          'Certificates for all participants'
        ],
        rules: [
          'Eligibility: The hunt is open to all registered students. Participants may join in min 3 and of max up to 5 members.',
          'Registration: All participants must register before the hunt begins.',
          'Start & End Time: The hunt will begin at 9:00 and end at 1:30pm. Late entries will not be entertained.',
          'How It Works: QR codes will be placed across campus. Scanning a QR code will reveal a question. Answering it correctly will show an encrypted code. The code is encrypted using a Cipher with a shift of 3. Participants must decode it to find the next location. The team leader must take a picture with the QR code. This will ensure that each team visits the location.',
          'Clue Progression: Each code leads to the next location. Skipping clues or solving them out of order is not allowed.',
          'Tools Allowed: Use of mobile phones for scanning QR codes and decoding messages is allowed. Internet usage is permitted only for general knowledge or cipher tools, not for sharing clues with others.'
        ],
        codeOfConduct: [
          'Fair Play: Collaboration between different teams is strictly prohibited. Sharing answers or codes with other participants will lead to immediate disqualification.',
          'Respect Property: QR codes will be placed in visible and accessible locations. Do not damage or remove any clue or marker.',
          'Volunteers & Judges: All decisions made by the organizing committee and volunteers are final. Any disrespect toward organizers or volunteers may result in immediate disqualification.'
        ],
        winningCriteria: 'The first team or individual to successfully complete all clues and reach the final location wins. In case of a tie, accuracy and completion time will be the deciding factors',
        requirements: [
          'Smartphone with camera and GPS',
          'Transportation within campus',
          'Team coordination skills',
          'Basic problem-solving abilities',
          'Good physical condition'
        ],
        contactSupport: 'Zunaira Maalik - +92 342 5486444',
        contact: 'Zunaira Maalik - +92 342 5486444',
        duration: '4 hours',
        category: 'Adventure'
      },
      'Speed Programming': {
        title: 'Techverse Chapter 2 Speed Programming Guide Book',
        description: 'Welcome to Speed Programming at Techverse Chapter 2',
        registration: { teamSize: '1 - 3 members', feePKR: 2500 },
        prizes: [
          'Winner: PKR 30,000',
          'Runner-up: PKR 15,000',
          'Certificates for all participants'
        ],
        rules: [
          'Competition Overview: The programming competition consists of one round. The duration will be 5 hours (non-stop). The competition organizers will provide teams with the problem set, papers, and pens. The competition organizers will be providing PCs and the Internet. One PC per team will be provided',
          'All programming languages that are supported by the platform (HackerRank) will be allowed in the competition.',
          'The use of standard libraries and functions (methods) provided by the IDEs will be allowed.',
          'The competition would include several challenging problems, each of which would require you to develop some algorithm and get the output in a fixed format on the console. The output would be matched character-to-character with the output of our program through a PC',
          'The scoring would hence be Yes/No, i.e. either correct or incorrect.',
          'If there is a tie in the number of problems solved, the scoring will depend on the time taken from the start of the competition to the time of correct submission. (This is automatically judged by the PC and viewable on board).',
          'The decision of the Judges will be final and cannot be challenged. If any team keeps arguing with the host team on this matter, they will be disqualified.',
          'The use of mobile phones and other communication devices is strictly prohibited during the competition. Anyone seen using devices will be immediately disqualified. Such devices should be switched off and placed in pockets/handbags and not visible or accessible during the competition.',
          'Once the competition starts, any discussion between two different teams may result in immediate disqualification from the competition',
          'Any sort of unfair means like plagiarism, helping codes, cheat-sheets, LLMs are prohibited to use.',
          'No external edibles are allowed inside the lab. You may purchase refreshments once the competition is over.',
          'Team Eligibility Criteria: Each team should consist of a minimum of 1 and a maximum of 3 participants. Participants must be enrolled in an undergraduate degree program. Cross-university teams are allowed.'
        ],
        requirements: [
          'Laptop with development environment',
          'Knowledge of at least one programming language',
          'Understanding of algorithms and data structures',
          'Problem-solving skills',
          'Time management abilities'
        ],
        contactSupport: 'Ali Raza: +92 313 0669834; Ali Masood: +92 325 4180227',
        contact: 'Ali Raza - +92 313 0669834',
        duration: '5 hours',
        category: 'Programming'
      },
      'Speed Wiring': {
        title: 'Techverse Chapter 2 Speed Wiring Guide Book',
        description: 'Speed Wiring is a technical competition where participants must assemble a given circuit diagram on a breadboard within a specified time limit. The circuit will be based on Integrated Circuits (ICs) and related components.',
        registration: { teamSize: '1 - 3 members', feePKR: 1500 },
        prizes: [
          'Winner: PKR 15,000 + Shield + Certificate',
          'Runner Up: PKR 10,000 + Shield + Certificate'
        ],
        rules: [
          'Eligibility: Individual participation or a team of two members. Basic knowledge of electronics and breadboard wiring is expected.',
          'Material Provided: The organizers will provide the following material: Breadboard / Training Board, ICs (as per the given circuit), Jumper wires, Resistors, Capacitors, LEDs (if required), Regulated 5V Power Supply, Circuit Diagram',
          'The circuit diagram will be distributed at the start of the competition.',
          'Only the provided material is allowed.',
          'Soldering is not allowed – only breadboard wiring.',
          'The circuit must be wired correctly and neatly.',
          'Power supply can only be connected after the organizer\'s approval.',
          'The maximum time limit is 20 minutes.',
          'Participants are not allowed to copy or touch other participants\' setups.',
          'Evaluation Criteria: Judging will be based on the following: Correctness of Circuit – 50 points, Neatness of Wiring – 20 points, Time Taken to Complete – 20 points, Functionality / Output Test – 10 points',
          'Disqualification: Participants may be disqualified if they: Use unauthorized material, Engage in cheating or disturb others, Connect the power supply without approval.',
          'Winner Selection: The participant/team with the highest score will be declared the winner. In case of a tie, the fastest completion time will be considered.',
          'General Instructions: All participants must register with their name/roll number before the event. The type of IC and circuit will not be disclosed in advance. The decision of the organizers will be final and binding.'
        ],
        requirements: [
          'Basic electronics knowledge',
          'Understanding of circuit components',
          'Soldering skills (optional)',
          'Safety awareness',
          'Precision and focus'
        ],
        contactSupport: 'Junaid - +92 324 4768248; Muhammad Itayab - +92 333 4204421',
        contact: 'Junaid - +92 324 4768248',
        duration: '2 hours',
        category: 'Electronics'
      },
      'Sumo War Robot': {
        title: 'Techverse Chapter 2 Sumo War Guide Book',
        description: 'Welcome to the Sumo Robot War at Techverse Chapter 2. This exciting challenge will test your innovation and robotic skills. Please read the following rules and regulations carefully to ensure fair participation and a thrilling experience.',
        registration: { teamSize: '1 - 3 members', feePKR: 2000 },
        prizes: [
          'Winner: PKR 15,000 + Shield + Certificate',
          'Runner Up: PKR 10,000 + Shield + Certificate'
        ],
        requirements: [
          'Team Size: Maximum 3 members per team.',
          'Robot Type: Fully autonomous or manually controlled robot allowed (as per category).',
          'Microcontroller: Any (e.g. Arduino, ESP32, Raspberry Pi, etc.)',
          'Chassis Size: Maximum 30 cm × 30 cm (12" × 12").',
          'Weight Limit: Maximum 8kg including batteries.',
          'Motors: Any DC or geared motor; maximum 12V supply.',
          'Battery Limit: Maximum 12V DC.',
          'Prebuilt Kits: Not allowed robot must be built by the team.'
        ],
        rules: [
          'Arena Specifications: Shape: Circular arena (Sumo Ring). Diameter: 1.5 meters (approx 5 feet). Boundary: White line (2–3 cm wide) at the edge if robot crosses it, it\'s out. Surface: Smooth (PVC, metal sheet, or wooden board).',
          'Each match lasts 2 minutes maximum.',
          'The goal is to push the opponent robot out of the ring.',
          'The round starts only after referee\'s signal.',
          'A robot is considered out (Oust) if: Any part of it touches outside the white boundary line. It is immobilized for 10 seconds or more.',
          'Best of 3 rounds decides the winner.',
          'No intentional damage to the arena or opponent\'s robot.',
          'No flame, liquid, projectile, or sharp weapons allowed.',
          'Control Rules: Autonomous Category: Robot must detect opponent and push it out automatically using sensors. Manual Category: Robot may be controlled by wired/wireless remote; range ≤ 10m. No external power supply from outside the arena. Interference (e.g. jammers) not allowed.',
          'Disqualification: Damaging arena or opponent robot intentionally. Using banned materials or weapons. Delaying the match beyond allowed setup time. Team misconduct or arguing with referees.',
          'Safety & Conduct: All robots must pass safety inspection before the match. Teams must follow referee\'s instructions at all times. Judges\' decision is final and cannot be challenged.'
        ],
        scoring: [
          'Push opponent out: +3 points',
          'Opponent disabled: +2 points',
          'Draw / both out: 0 points',
          'Rule violation: -2 points'
        ],
        contactSupport: 'Junaid - +92 324 4768248; Muhammad Itayab - +92 333 4204421',
        contact: 'Junaid - +92 324 4768248',
        duration: '3 hours',
        category: 'Robotics'
      },
      'Tekken 8': {
        title: 'Techverse Chapter 2 Tekken 8 Guide Book',
        description: 'Welcome to the Tekken Tournament! Below are the official rules and regulations to ensure an exciting and fair competition. Please read them carefully before participating.',
        registration: { teamSize: 'Individual', feePKR: 1000, tournamentPlatform: 'PS5 / Tekken 8' },
        prizes: [
          '1st Place: PKR 15,000 + Shield + Certificate',
          '2nd Place: PKR 10,000 + Shield + Certificate',
          'Certificates for all participants'
        ],
        rules: [
          'Eligibility: The tournament is open to all registered participants who enrolled in universities. Players will participate individually.',
          'Registration: All participants must register before the tournament begins. Late registrations will not be entertained.',
          'Start & End Time: The tournament will begin at the specified time on the designated date. No late entries will be accepted once the tournament starts.',
          'Important Game-Specific Guidelines: The tournament will be played exclusively on PlayStation 5 (PS5). Participants using arcade sticks must bring their own equipment. It must be compatible with PS5. Non-compatible devices will not be allowed. Keyboard usage is strictly prohibited. It is highly recommended that players bring their own PS5 controllers or arcade sticks to avoid any last-minute inconvenience.',
          'Tournament Format: Double Elimination.',
          'Match Play: First-to-2 wins for all matches except: Winners Final, Losers Semi-Final, Losers Final, Grand Final (Reset). These matches will be played in a First-to-3 setting.',
          'Round Settings: 3 rounds per match. 60 seconds per round.',
          'Character Select: No restrictions.',
          'Stage Select: Always random stage selects, regardless of who loses.',
          'Code of Conduct: All decisions made by the organizing committee and volunteers are final. Disrespect towards organizers or volunteers may result in disqualification.',
          'Winning Criteria: The first player or team to successfully win all their matches and reach the Grand Final will be declared the winner.'
        ],
        requirements: [
          'PS5 or PC with Tekken 8 installed',
          'Fighting game controller',
          'Practice time with the game',
          'Understanding of fighting game mechanics',
          'Quick reflexes and strategy'
        ],
        contactSupport: 'Zain - +92 331 5758888',
        contact: 'Zain - +92 331 5758888',
        duration: '3-4 hours',
        category: 'Esports'
      },
      'UI/UX Competition': {
        title: 'Techverse Chapter 2 UI/UX Guide Book',
        description: 'Welcome to the TechVerse 2.0 UI/UX Competition – a test of creativity, problem-solving, and design thinking! Please read the following rules and regulations carefully to ensure fair participation and an enjoyable experience.',
        registration: { teamSize: '2-4 members', feePKR: 2000 },
        prizes: [
          'Winner: PKR 15,000 + Shield + Certificate',
          'Runner-Up: PKR 10,000 + Shield + Certificate',
          'All participants will receive a Participation Certificate'
        ],
        rules: [
          'Event Details: Duration: 10 Hours (divided across 2 days of design work). Venue: University of Management and Technology (UMT).',
          'Team Guidelines: Teams may consist of 2–4 participants. Participants must be enrolled students. Cross-university teams are allowed.',
          'Competition Format: The problem statement will be revealed at the start of the competition. All teams must work on the same design challenge. The competition will be hosted on Devpost. All teams must register and submit their final deliverables via the official Devpost event page.',
          'Devpost Submission Requirements: Project Submission including: Link to the interactive prototype (Figma, Adobe XD, Sketch), Presentation slides',
          'Process & Deliverables: Teams are expected to apply a structured design process, which may include: Research & understanding users, Problem definition, Ideation & brainstorming, Wireframing & prototyping, Testing & refinement',
          'Deliverables: User Personas: At least two personas highlighting different user needs and contexts. Empathy Maps & Journey Flows: Visualize user pain points, goals, and interactions. Wireframes: Low/mid fidelity showing layout, navigation, and flow. High-Fidelity Prototype: Clickable design showcasing branding, visual hierarchy, and interactions. Presentation Deck (max 10 slides): 1. Your Exact Problem statement, 2. Research Findings, 3. User Personas, 4. Journey Map, 5. Wireframes → Final Screens, 6. Prototype Demo, 7. Usability Testing Insights, 8. Future Improvements',
          'All work must be original and developed during the event.',
          'Use of any design tool is allowed (Figma, Adobe XD, Sketch, Canva, PowerPoint, Google Slides, etc.).',
          'Plagiarism or reuse of pre-built templates without meaningful customization will result in disqualification.',
          'Teams must be physically present at UMT throughout the in-person portion of the event.',
          'No external help from non-team members is allowed.',
          'Bring your own devices, chargers, and accessories.',
          'Judges\' decisions are final and non-negotiable.',
          'Evaluation Criteria: Creativity & Innovation (Originality and uniqueness of the solution) - 25%, User-Centered Design (How well the design addresses user needs) - 25%, Usability & Accessibility (Ease of use and accessibility considerations) - 20%, Visual Aesthetics (Visual appeal, branding, and layout) - 15%, Presentation & Communication (Clarity in demonstrating the process and solution) - 15%',
          'Winning Criteria: The highest-scoring team based on the evaluation rubric will be declared the winner. In case of a tie, prototype interactivity and usability testing insights will serve as tiebreakers.'
        ],
        requirements: [
          'Design software (Figma, Adobe XD, Sketch)',
          'Understanding of UI/UX principles',
          'Creativity and innovation',
          'Presentation skills',
          'User research knowledge'
        ],
        contactSupport: 'Zainab Salman - +92 302 1402652',
        contact: 'Zainab Salman - +92 302 1402652',
        duration: '10 hours',
        category: 'Design'
      },
      'Valorant': {
        title: 'Techverse Chapter 2 Valorant Guide Book',
        description: 'Welcome to the Valorant Tournament! Below are the official rules and regulations to ensure a smooth and enjoyable competition. Please read them carefully before participating.',
        registration: { teamSize: '5 members + 1 substitute', feePKR: 2500, tournamentPlatform: 'PC' },
        prizes: [
          'Winner: PKR 25,000',
          'Runner-up: PKR 10,000'
        ],
        rules: [
          'Eligibility: Players must register using their official names and valid Riot IDs. The team leader must be enrolled in a university, while other squad members can be students from university or with a minimum qualification of intermediate (FA/FSc/A-Levels or equivalent). All teams must consist of 5 players and may have 1 substitute. Tournament admins\' decisions are final and must be respected by all participants.',
          'Player Equipment: Players must bring their own gear. None of the equipment will be provided by the administration. Players are responsible for any gear failure. A technical timeout is mentioned in the document for such cases.',
          'Match Format: Group Stage: Best of 1 (Bo1). Semi-Finals and Finals: Best of 3 (Bo3). Map Selection: Follows a ban-pick system with a veto engine. The attacking and defending side will be chosen via a toss. Overtime: Overtime will be played as per standard competitive rules (first to 13 rounds, win by 2). Map Pool: The map pool will be announced one week prior to the start of the tournament.',
          'Game Settings: Mode: Custom Game. Cheats: Off. Tournament Mode: On. Server: Closest to majority player region (decided by admins).',
          'Code of Conduct: Fair Play: No use of cheats, hacks, or third-party tools. Abuse of glitches is strictly prohibited. Toxicity, harassment, hate speech, or unsportsmanlike conduct will result in disqualification. Use of Macros to reduce your recoil is prohibited in case anyone found using macros the team will be disqualified. Match Integrity: Players must not intentionally disconnect or delay matches. Drug use and abuse are strictly prohibited, as per the policy of UMT (this includes smoking and vaping).',
          'Punctuality: Teams must be ready within 15 minutes of the scheduled match time. Late teams will forfeit the match unless given leniency by admins.',
          'Technical Issues: Crashes or Disconnects: In case of crashes or disconnects within the first 3 rounds, the match may be restarted. Technical Pauses: Technical pauses are allowed for a maximum of 10 minutes per team, per match. Reporting Issues: All issues must be reported to tournament admins immediately.',
          'Disqualification Criteria: Use of ineligible players. Violation of rules or code of conduct. Repeated lateness or no-shows. Cheating or use of unfair advantages.',
          'Agreement: By registering, all participants agree to abide by the rules and accept any decisions made by the tournament committee.',
          'Communication: A group chat will be created 1 week before the start of the tournament. All updates will be sent through this chat. In case of any queries, you can ask the game management for assistance.'
        ],
        requirements: [
          'PC with Valorant installed',
          'Gaming peripherals (mouse, keyboard, headset)',
          'Team coordination and communication',
          'Individual skill and game knowledge',
          'Practice and team strategy'
        ],
        contactSupport: 'Muhammad Moeed - +92 324 4932912',
        contact: 'Muhammad Moeed - +92 324 4932912',
        duration: '4-6 hours',
        category: 'Esports'
      },
      'Web Hackathon': {
        title: 'Techverse Chapter 2 Web Hackathon Guide Book',
        description: 'Welcome to Web Dev Hackathon at Techverse Chapter 2',
        registration: { teamSize: '1 to 3 participants', feePKR: 2500 },
        prizes: [
          'Winner: Rs. 30,000 + Shield + Certificates',
          'Runner-up: Rs. 15,000 + Shield + Certificates',
          'All participants will receive Participation Certificates'
        ],
        rules: [
          'Event Details: Duration: 12 Hours, Venue: University of Management and Technology (UMT), Registration Fee: Rs. 2500 per team',
          'Team Guidelines: Teams must consist of 1 to 3 participants. Participants must be enrolled in an undergraduate degree program. Cross-university teams are allowed.',
          'Competition Format: The task will be provided at the beginning of the event. Teams must develop a functional solution within the given timeframe. Each team is required to make their final code commit before the deadline. Any commits or changes in the code made after the deadline will result in disqualification. Each team will present their projects before the judges. Any team failing to present their project will be disqualified. Each team is required to add admin\'s account as collaborator in their GitHub project.',
          'General Guidelines: All participants are required to bring their own laptops. During the competition, participants are NOT allowed to go outside the premises. Participants must adhere to respectful and professional code of conduct. Participants must maintain a positive and friendly environment. Participants are strongly urged to bring their own personal Wi-Fi connection (e.g., mobile hotspot or data plan) as a backup to avoid potential connectivity issues and ensure a smooth competition experience, even though Internet access will be provided. Open for all students from any university.',
          'Competition Rules: All teams must commit their projects on GitHub before the deadline. Use of any FREE tech stack or AI tool is allowed. Free frameworks and libraries are allowed. Participants must use Github to sync their codebases. CMS platforms like WordPress are not allowed. AI platforms like Replit/Loveable are not allowed. All code must be developed during the event. Plagiarism or reuse of prebuilt projects will result in disqualification. Teams must be physically present at UMT throughout the event. Judges\' decision will be final and non-negotiable. No external help from non-team members is allowed. Bring your own chargers, laptops, converters, and devices. Collaboration between teams is strictly prohibited.',
          'Judging and Decisions: Participants will present their projects before the judges. All decisions by our judges will be final.',
          'Intellectual Property: Participants retain ownership of their work but grant the organizers the right to showcase it for promotional purposes.'
        ],
        evaluationCriteria: [
          'Innovation & Creativity: Is the solution unique or rectifying the problem in a novel way?',
          'Technical Execution: Code quality, structure, and working functionality',
          'User Experience (UI/UX): Interface design and user interaction',
          'Relevance to Problem: How effectively the solution addresses the provided problem',
          'Presentation & Demo: Clarity in communicating the idea and functionality to the judges'
        ],
        useOfAI: [
          'Use of Free AI Tools is allowed.',
          'Paid tools or Subscriptions are prohibited.'
        ],
        requirements: [
          'Laptop with development environment',
          'Knowledge of HTML, CSS, JavaScript',
          'Framework knowledge (React, Vue, Angular)',
          'Backend development skills',
          'Git and version control',
          'Bring your own chargers, laptops, converters, and devices'
        ],
        contactSupport: 'Muhammad Faizan - +92 341 4123652',
        contact: 'Muhammad Faizan - +92 341 4123652',
        duration: '12 Hours',
        category: 'Programming'
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

  const moduleDetails = getModuleDetails(selectedModule.name)

  return (
  <div className="min-h-screen bg-linear-to-br from-black via-purple-900 to-blue-900">
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
              <h1 className="text-2xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Techverse 2026
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/register"
                className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
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
              {selectedModule.name.includes('AI') && '🤖'}
              {selectedModule.name.includes('Cyber') && '🔒'}
              {selectedModule.name.includes('FIFA') && '⚽'}
              {selectedModule.name.includes('Robot') && '🤖'}
              {selectedModule.name.includes('PUBG') && '🎮'}
              {selectedModule.name.includes('Programming') && '💻'}
              {selectedModule.name.includes('Wiring') && '⚡'}
              {selectedModule.name.includes('Sumo') && '🤼'}
              {selectedModule.name.includes('Tekken') && '🥊'}
              {selectedModule.name.includes('UI/UX') && '🎨'}
              {selectedModule.name.includes('Valorant') && '🎯'}
              {selectedModule.name.includes('Web') && '🌐'}
              {selectedModule.name.includes('Business') && '💼'}
              {!selectedModule.name.includes('AI') && !selectedModule.name.includes('Cyber') && !selectedModule.name.includes('FIFA') && !selectedModule.name.includes('Robot') && !selectedModule.name.includes('PUBG') && !selectedModule.name.includes('Programming') && !selectedModule.name.includes('Wiring') && !selectedModule.name.includes('Sumo') && !selectedModule.name.includes('Tekken') && !selectedModule.name.includes('UI/UX') && !selectedModule.name.includes('Valorant') && !selectedModule.name.includes('Web') && !selectedModule.name.includes('Business') && '🏆'}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
              {selectedModule.name}
            </h1>
            <p className="text-sm text-purple-300 mb-6">{moduleDetails.title ? `${moduleDetails.title} Guide Book` : `Techverse Chapter 2 ${selectedModule.name} Guide Book`}</p>
            <p className="text-xl text-purple-200 mb-6">{moduleDetails.category}</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-purple-900/50 text-purple-200 px-4 py-2 rounded-lg">
                Entry Fee: PKR {selectedModule.fee}
              </span>
              <span className="bg-purple-900/50 text-purple-200 px-4 py-2 rounded-lg">
                Team Size: {selectedModule.teamSize}
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

            {/* AI Hackathon Additional Details */}
            {selectedModule.name === 'AI Hackathon' && (
              <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
                <h2 className="text-2xl font-semibold text-blue-300 mb-4">🧭 Problem Statement</h2>
                <p className="text-purple-200 leading-relaxed mb-4">{moduleDetails.problemStatement}</p>

                <h3 className="text-xl font-semibold text-blue-300 mb-3">📌 Important Guidelines</h3>
                <ul className="space-y-2 text-purple-200 mb-4">
                  {(moduleDetails.importantGuidelines || []).map((g: string, i: number) => (
                    <li key={i} className="flex items-start"><span className="text-blue-400 mr-2 mt-1">•</span><span>{g}</span></li>
                  ))}
                </ul>

                <h3 className="text-xl font-semibold text-blue-300 mb-3">🧾 Hackathon Rules & Submission</h3>
                <ul className="space-y-2 text-purple-200 mb-4">
                  {(moduleDetails.hackathonRules || []).map((r: string, i: number) => (
                    <li key={i} className="flex items-start"><span className="text-blue-400 mr-2 mt-1">•</span><span>{r}</span></li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cyber Hackathon Additional Details */}
            {selectedModule.name === 'Cyber Hackathon' && (
              <>
                <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
                  <h2 className="text-2xl font-semibold text-blue-300 mb-4">📢 Announcements</h2>
                  <ul className="space-y-2 text-purple-200">
                    {(moduleDetails.announcements || []).map((a: string, i: number) => (
                      <li key={i} className="flex items-start"><span className="text-blue-400 mr-2 mt-1">•</span><span>{a}</span></li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
                  <h2 className="text-2xl font-semibold text-blue-300 mb-4">🧩 Challenges</h2>
                  <ul className="space-y-2 text-purple-200">
                    {(moduleDetails.challenges || []).map((c: string, i: number) => (
                      <li key={i} className="flex items-start"><span className="text-blue-400 mr-2 mt-1">•</span><span>{c}</span></li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
                  <h2 className="text-2xl font-semibold text-blue-300 mb-4">🏷️ Claiming Flags</h2>
                  <ul className="space-y-2 text-purple-200">
                    {(moduleDetails.claimingFlags || []).map((f: string, i: number) => (
                      <li key={i} className="flex items-start"><span className="text-blue-400 mr-2 mt-1">•</span><span>{f}</span></li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
                  <h2 className="text-2xl font-semibold text-blue-300 mb-4">🔍 Common Flag Locations</h2>
                  <ul className="space-y-2 text-purple-200">
                    {(moduleDetails.commonFlagLocations || []).map((cl: string, i: number) => (
                      <li key={i} className="flex items-start"><span className="text-blue-400 mr-2 mt-1">•</span><span>{cl}</span></li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
                  <h2 className="text-2xl font-semibold text-blue-300 mb-4">⚖️ Gameplay & Scoring</h2>
                  <ul className="space-y-2 text-purple-200">
                    {(moduleDetails.scoring || []).map((g: string, i: number) => (
                      <li key={i} className="flex items-start"><span className="text-blue-400 mr-2 mt-1">•</span><span>{g}</span></li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
                  <h2 className="text-2xl font-semibold text-blue-300 mb-4">🏅 Special Recognition</h2>
                  <ul className="space-y-2 text-purple-200">
                    {(moduleDetails.specialRecognition || []).map((s: string, i: number) => (
                      <li key={i} className="flex items-start"><span className="text-blue-400 mr-2 mt-1">•</span><span>{s}</span></li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
                  <h2 className="text-2xl font-semibold text-blue-300 mb-4">🌐 Infrastructure & Internet</h2>
                  <ul className="space-y-2 text-purple-200">
                    {(moduleDetails.infrastructure || []).map((i: string, n: number) => (
                      <li key={n} className="flex items-start"><span className="text-blue-400 mr-2 mt-1">•</span><span>{i}</span></li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
                  <h2 className="text-2xl font-semibold text-blue-300 mb-4">💡 Hints & Notifications</h2>
                  <ul className="space-y-2 text-purple-200">
                    {(moduleDetails.hintsNotifications || []).map((h: string, i: number) => (
                      <li key={i} className="flex items-start"><span className="text-blue-400 mr-2 mt-1">•</span><span>{h}</span></li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20 md:col-span-2">
                  <h2 className="text-2xl font-semibold text-blue-300 mb-4">❓ FAQs</h2>
                  <ul className="space-y-2 text-purple-200">
                    {(moduleDetails.faqs || []).map((f: string, i: number) => (
                      <li key={i} className="flex items-start"><span className="text-blue-400 mr-2 mt-1">•</span><span>{f}</span></li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* PUBG Mobile Additional Details */}
            {selectedModule.name === 'PUBG Mobile' && (
              <>
                <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
                  <h2 className="text-2xl font-semibold text-blue-300 mb-4">⚙️ Game Settings & Tournament Rules</h2>
                  <ul className="space-y-2 text-purple-200">
                    {(moduleDetails.gameSettings || []).map((g: string, i: number) => (
                      <li key={i} className="flex items-start"><span className="text-blue-400 mr-2 mt-1">•</span><span>{g}</span></li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
                  <h2 className="text-2xl font-semibold text-blue-300 mb-4">📹 Gameplay Recording Requirement</h2>
                  <ul className="space-y-2 text-purple-200">
                    {(moduleDetails.recordingRequirement || []).map((r: string, i: number) => (
                      <li key={i} className="flex items-start"><span className="text-blue-400 mr-2 mt-1">•</span><span>{r}</span></li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
                  <h2 className="text-2xl font-semibold text-blue-300 mb-4">� Venue Rules</h2>
                  <ul className="space-y-2 text-purple-200">
                    {(moduleDetails.venueRules || []).map((v: string, i: number) => (
                      <li key={i} className="flex items-start"><span className="text-blue-400 mr-2 mt-1">•</span><span>{v}</span></li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
                  <h2 className="text-2xl font-semibold text-blue-300 mb-4">📊 Placement & Points</h2>
                  <ul className="space-y-2 text-purple-200">
                    {(moduleDetails.placementPoints || []).map((p: string, i: number) => (
                      <li key={i} className="flex items-start"><span className="text-blue-400 mr-2 mt-1">•</span><span>{p}</span></li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
                  <h2 className="text-2xl font-semibold text-blue-300 mb-4">📜 Code of Conduct</h2>
                  <ul className="space-y-2 text-purple-200">
                    {(moduleDetails.codeOfConduct || []).map((c: string, i: number) => (
                      <li key={i} className="flex items-start"><span className="text-blue-400 mr-2 mt-1">•</span><span>{c}</span></li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
                  <h2 className="text-2xl font-semibold text-blue-300 mb-4">🏆 Winning Criteria</h2>
                  <p className="text-purple-200 leading-relaxed">{moduleDetails.winningCriteria}</p>
                </div>
              </>
            )}

            {/* Web Hackathon Additional Details */}
            {selectedModule.name === 'Web Hackathon' && (
              <>
                <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
                  <h2 className="text-2xl font-semibold text-blue-300 mb-4">🏅 Evaluation Criteria</h2>
                  <ul className="space-y-2 text-purple-200">
                    {(moduleDetails.evaluationCriteria || []).map((c: string, i: number) => (
                      <li key={i} className="flex items-start"><span className="text-blue-400 mr-2 mt-1">•</span><span>{c}</span></li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
                  <h2 className="text-2xl font-semibold text-blue-300 mb-4">🧠 Use of AI</h2>
                  <ul className="space-y-2 text-purple-200">
                    {(moduleDetails.useOfAI || []).map((u: string, i: number) => (
                      <li key={i} className="flex items-start"><span className="text-blue-400 mr-2 mt-1">•</span><span>{u}</span></li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
                  <h2 className="text-2xl font-semibold text-blue-300 mb-4">🏆 Judging and Decisions</h2>
                  <ul className="space-y-2 text-purple-200">
                    {(moduleDetails.judgingDecisions || []).map((j: string, i: number) => (
                      <li key={i} className="flex items-start"><span className="text-blue-400 mr-2 mt-1">•</span><span>{j}</span></li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
                  <h2 className="text-2xl font-semibold text-blue-300 mb-4">📄 Intellectual Property</h2>
                  <ul className="space-y-2 text-purple-200">
                    {(moduleDetails.intellectualProperty || []).map((ip: string, i: number) => (
                      <li key={i} className="flex items-start"><span className="text-blue-400 mr-2 mt-1">•</span><span>{ip}</span></li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20 md:col-span-2">
                  <h2 className="text-2xl font-semibold text-blue-300 mb-4">📞 Contact & Support</h2>
                  <p className="text-purple-200">For any queries or assistance during the event: {moduleDetails.contactSupport}</p>
                </div>
              </>
            )}

            {/* Contact Info */}
            <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">📞 Contact Information</h2>
              <div className="space-y-3 text-purple-200">
                <p><span className="font-medium">Coordinator:</span> {selectedModule.contact}</p>
                <p><span className="font-medium">Event:</span> Techverse 2026</p>
                <p><span className="font-medium">Venue:</span> UMT Lahore</p>
                <p><span className="font-medium">Date:</span> Jan 5-11, 2026</p>
              </div>
            </div>

            {/* Registration Details (modules with registration info) */}
            {moduleDetails.registration && (
              <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
                <h2 className="text-2xl font-semibold text-blue-300 mb-4">📝 Registration</h2>
                <div className="space-y-3 text-purple-200">
                  <p><strong>Team Size:</strong> {moduleDetails.registration?.teamSize}</p>
                  <p><strong>Registration Fee:</strong> PKR {moduleDetails.registration?.feePKR || selectedModule.fee} per team</p>
                  {moduleDetails.registration?.tournamentPlatform && (
                    <p><strong>Tournament Platform:</strong> {moduleDetails.registration?.tournamentPlatform}</p>
                  )}
                  <p><strong>Cross-team Collaboration:</strong> {moduleDetails.registration?.crossTeamCollaboration ? 'Allowed' : 'Not Allowed'}</p>
                  <p><strong>Eligibility:</strong> {moduleDetails.registration?.eligibility}</p>
                </div>
              </div>
            )}

            {/* Scoring (generic) */}
            {moduleDetails.scoring && (
              <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
                <h2 className="text-2xl font-semibold text-blue-300 mb-4">⚖️ Scoring & Penalties</h2>
                <ul className="space-y-2 text-purple-200">
                  {(moduleDetails.scoring || []).map((s: string, i: number) => (
                    <li key={i} className="flex items-start"><span className="text-blue-400 mr-2 mt-1">•</span><span>{s}</span></li>
                  ))}
                </ul>
              </div>
            )}

            {/* Rules */}
            <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">📜 Rules & Guidelines</h2>
              <ul className="space-y-2 text-purple-200">
                {(moduleDetails.rules || []).map((rule: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-400 mr-2 mt-1">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">{selectedModule.name === 'Line Following Robot' || selectedModule.name === 'Obstacle Avoidance Robot' ? '🛠️ Team & Robot Requirements' : '🛠️ Requirements'}</h2>
              <ul className="space-y-2 text-purple-200">
                {(moduleDetails.requirements || []).map((req: string, index: number) => (
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
                {(moduleDetails.prizes || []).map((prize: string, index: number) => (
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

            {(selectedModule.name === 'AI Hackathon' || selectedModule.name === 'FIFA 26' || selectedModule.name === 'Line Following Robot' || selectedModule.name === 'Obstacle Avoidance Robot' || selectedModule.name === 'PUBG Mobile') && (
              <>
                <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
                  <h2 className="text-2xl font-semibold text-blue-300 mb-4">🏅 Judging Criteria</h2>
                  <ul className="space-y-2 text-purple-200">
                    {(moduleDetails.judgingCriteria || []).map((c: string, i: number) => (
                      <li key={i} className="flex items-start"><span className="text-blue-400 mr-2 mt-1">•</span><span>{c}</span></li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
                  <h2 className="text-2xl font-semibold text-blue-300 mb-4">🧠 Use of AI Tools</h2>
                  <ul className="space-y-2 text-purple-200">
                    {(moduleDetails.useOfAITools || []).map((u: string, i: number) => (
                      <li key={i} className="flex items-start"><span className="text-blue-400 mr-2 mt-1">•</span><span>{u}</span></li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
                  <h2 className="text-2xl font-semibold text-blue-300 mb-4">🔧 Preparation Checklist</h2>
                  <ul className="space-y-2 text-purple-200">
                    {(moduleDetails.preparationChecklist || []).map((p: string, i: number) => (
                      <li key={i} className="flex items-start"><span className="text-blue-400 mr-2 mt-1">•</span><span>{p}</span></li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20 md:col-span-2">
                  <h2 className="text-2xl font-semibold text-blue-300 mb-4">📞 Contact & Support</h2>
                  <p className="text-purple-200">For any queries or assistance during the event: {moduleDetails.contactSupport}</p>
                </div>
              </>
            )}

          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-linear-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-2xl p-12 border border-purple-500/30">
            <h2 className="text-4xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
                Ready to Compete in {selectedModule.name}?
            </h2>
            <p className="text-xl text-purple-200 mb-8">
              Join the challenge and showcase your skills. Register now for Techverse 2026!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Register for {selectedModule.name}
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