import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function RulesPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-black via-purple-900 to-blue-900 text-white">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-10 border border-purple-500/20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Techverse: Rules, Terms & Conditions & Privacy Policy
          </h1>

          <section className="mt-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-blue-300 mb-3">General Rules and Guidelines</h2>
            <p className="text-purple-200 mb-4">To ensure a safe, respectful, and enjoyable environment for all participants and guests, the following rules will be strictly enforced during the entire Techverse event:</p>

            <ul className="list-disc list-inside space-y-3 text-purple-200">
              <li>
                <strong>No use of prohibited items:</strong> Use of drugs, vapes, cigarettes or any form of intoxicants is strictly prohibited within the University of Management and Technology (UMT) premises and during all event activities. Violation will result in immediate disqualification and referral to the UMT Disciplinary Committee.
              </li>

              <li>
                <strong>Respect event staff and volunteers:</strong> All participants are expected to behave respectfully with organizing team members, volunteers, faculty and fellow participants.
              </li>

              <li>
                <strong>Judges&apos; decision is final:</strong> For all competitions, the decision made by the panel of judges will be considered final and binding. No objections or challenges will be entertained.
              </li>

              <li>
                <strong>Event property and materials:</strong> Any damage to university property, event equipment or competition materials will result in penalties and will be the participant&apos;s sole responsibility, including liability for cost. This may also result in removal from the event.
              </li>

              <li>
                <strong>Identification and verification:</strong> Participants must carry their university ID or CNIC and Techverse Registration Card at all times for entry and verification.
              </li>

              <li>
                <strong>Maintain decorum:</strong> Participants are expected to maintain proper attire and behavior during formal and informal segments like workshops, competitions, and social events.
              </li>

              <li>
                <strong>Punctuality is required:</strong> Be on time for all events. Late arrivals may lead to disqualification or denied entry for specific activities.
              </li>

              <li>
                <strong>Respect performance boundaries:</strong> During social events, any unruly or offensive behavior will result in immediate action.
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-blue-300 mb-3">Terms and Conditions</h2>
            <p className="text-purple-200 mb-4">By registering for Techverse, you agree to the following:</p>

            <div className="space-y-3 text-purple-200">
              <p>
                <strong>Eligibility:</strong> All university students with valid institutional identification are eligible to participate.
              </p>

              <p>
                <strong>Registration confirmation:</strong> Only those who have successfully completed the online registration and received confirmation will be eligible for participation.
              </p>

              <p>
                <strong>Changes to event schedule:</strong> The organizing team reserves the right to alter the schedule, timing or lineup of competitions, workshops or social events without prior notice.
              </p>

              <p>
                <strong>Formal dinner and competition kits:</strong> Participants who register will be eligible for Formal Dinner (for winners and top achievers) and Competition materials (based on their selected categories).
              </p>

              <p>
                <strong>Disqualification clause:</strong> Any participant found violating rules, disturbing other attendees or disrespecting the team will be disqualified without refund or reconsideration.
              </p>

              <p>
                <strong>Code of conduct:</strong> Participants are expected to follow all UMT and Techverse policies. The organizing team reserves the right to refuse entry or remove participants who fail to comply.
              </p>

              <p>
                <strong>No refund policy:</strong> All registration fees are non-refundable under any circumstances, including disqualification, withdrawal, or absence.
              </p>

              <p>
                <strong>No addition/replacement policy:</strong> Once registration is confirmed, no addition or replacement of team members will be allowed.
              </p>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-blue-300 mb-3">Privacy Policy</h2>
            <p className="text-purple-200 mb-4">Your privacy and data security are important to us. We commit to the following:</p>

            <div className="space-y-3 text-purple-200">
              <p>
                <strong>Data collection:</strong> We only collect data necessary for registration, identity verification, and participation tracking (e.g. name, contact info, university name, CNIC or student ID).
              </p>

              <p>
                <strong>Data usage:</strong> Your data will be used solely for the purpose of: verifying event participation, generating certificates, providing event updates and schedules.
              </p>

              <p>
                <strong>Data sharing:</strong> Your personal data will not be shared with third parties without your explicit consent, except in case of disciplinary action or law enforcement requests.
              </p>

              <p>
                <strong>Data security:</strong> All data is stored securely and will be deleted after the event ends unless needed for issuing certificates or follow-up communication (e.g., feedback or future events).
              </p>

              <p>
                <strong>Consent:</strong> By registering, you give Techverse permission to use your name and photographs captured during the event for promotional or documentation purposes.
              </p>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-blue-300 mb-3">For Queries</h2>
            <p className="text-purple-200">Email: <a href="mailto:techverse@umt.edu.pk" className="text-blue-300 hover:text-blue-400 underline">techverse@umt.edu.pk</a></p>
            <p className="text-purple-200">Phone: <a href="tel:+924235212801" className="text-blue-300 hover:text-blue-400 underline">+92 42 35212801-10</a></p>
          </section>

          <div className="mt-10 text-sm text-purple-400">
            <p>© 2025 Techverse 2026. Organized by University of Management and Technology. All rights reserved.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
