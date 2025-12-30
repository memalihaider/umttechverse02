import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function RulesPage() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden scroll-smooth selection:bg-purple-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="relative z-50">
        <Navbar />
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md">
            <span className="text-sm font-medium text-purple-300">Official Guidelines</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-linear-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6">
            Rules & Policies
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Please read the following terms, conditions, and privacy policies carefully to ensure a smooth experience at Techverse 2026.
          </p>
        </div>

        <div className="space-y-8">
          {/* General Rules Section */}
          <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-10 overflow-hidden">
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">General Rules</h2>
              </div>
              
              <p className="text-gray-400 mb-6">To ensure a safe, respectful, and enjoyable environment for all participants and guests, the following rules will be strictly enforced:</p>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "No prohibited items", desc: "Drugs, vapes, cigarettes or intoxicants are strictly prohibited." },
                  { title: "Respect staff", desc: "Behave respectfully with team members, volunteers, and faculty." },
                  { title: "Judges' decision final", desc: "Decisions by the panel of judges are final and binding." },
                  { title: "Property damage", desc: "Damage to property will result in penalties and liability for cost." },
                  { title: "Identification", desc: "Carry university ID/CNIC and Registration Card at all times." },
                  { title: "Maintain decorum", desc: "Maintain proper attire and behavior during all segments." },
                  { title: "Punctuality", desc: "Late arrivals may lead to disqualification or denied entry." },
                  { title: "Performance boundaries", desc: "Unruly or offensive behavior will result in immediate action." }
                ].map((item, i) => (
                  <li key={i} className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <strong className="block text-purple-300 mb-1">{item.title}</strong>
                    <span className="text-sm text-gray-400">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Terms and Conditions Section */}
          <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-10 overflow-hidden">
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Terms & Conditions</h2>
              </div>

              <p className="text-gray-400 mb-6">By registering for Techverse, you agree to the following:</p>

              <div className="space-y-4">
                {[
                  { title: "Eligibility", desc: "All university students with valid institutional identification are eligible." },
                  { title: "Registration confirmation", desc: "Only confirmed registrations are eligible for participation." },
                  { title: "Schedule changes", desc: "Organizers reserve the right to alter schedule or lineup without notice." },
                  { title: "Dinner & Kits", desc: "Eligibility for dinner and kits is based on registration category." },
                  { title: "Disqualification", desc: "Rule violations lead to disqualification without refund." },
                  { title: "Code of conduct", desc: "Follow all UMT and Techverse policies or face removal." },
                  { title: "No refund policy", desc: "Fees are non-refundable under any circumstances." },
                  { title: "No replacement", desc: "No addition or replacement of team members after confirmation." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 shrink-0" />
                    <div>
                      <strong className="text-gray-200">{item.title}:</strong>
                      <span className="text-gray-400 ml-2">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Privacy Policy Section */}
          <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-10 overflow-hidden">
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Privacy Policy</h2>
              </div>

              <p className="text-gray-400 mb-6">Your privacy and data security are important to us:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Data Collection", desc: "We collect only necessary data for registration and verification." },
                  { title: "Data Usage", desc: "Used for verification, certificates, and event updates." },
                  { title: "Data Sharing", desc: "Not shared with third parties without consent, except for legal reasons." },
                  { title: "Data Security", desc: "Stored securely and deleted after the event unless needed." },
                  { title: "Consent", desc: "Permission to use name/photos for promotional purposes." }
                ].map((item, i) => (
                  <div key={i} className="bg-black/20 rounded-xl p-5 border border-white/5">
                    <h3 className="text-green-400 font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold text-white mb-2">Have Questions?</h2>
            <p className="text-gray-400">
              Contact us at <a href="mailto:techverse@umt.edu.pk" className="text-purple-400">techverse@umt.edu.pk</a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
