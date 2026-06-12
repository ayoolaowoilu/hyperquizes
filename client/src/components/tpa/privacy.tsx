
import { useState } from "react"
import SEO from "../seo";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";


export default function Privacy() {

  
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || 
        (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  })
  






  const lastUpdated = "January 1, 2024"

  const sections = [
    {
      title: "1. Information We Collect",
      content: `We collect information you provide directly to us when you:

• Create an account (email, username, password)
• Create or participate in quizzes
• Contact our support team
• Use our mobile applications

We also collect certain information automatically:

• Device information (type, OS version, unique identifiers)
• Log data (IP address, browser type, pages visited)
• Usage data (quiz participation, scores, time spent)
• Cookies and similar technologies`
    },
    {
      title: "2. How We Use Your Information",
      content: `We use the information we collect to:

• Provide, maintain, and improve our services
• Process and complete quiz transactions
• Send technical notices, updates, and support messages
• Respond to your comments and questions
• Monitor and analyze trends, usage, and activities
• Personalize your experience and deliver relevant content
• Detect, investigate, and prevent fraudulent transactions and abuse
• Carry out any other purpose described at the time of collection

We process your data based on:
• Your consent (when you create an account)
• Contract necessity (to provide our services)
• Legal obligations (compliance with laws)
• Legitimate interests (improving our platform)`
    },
    {
      title: "3. Information Sharing",
      content: `We do not sell, trade, or rent your personal information to third parties. We may share information in the following circumstances:

• With service providers who perform services on our behalf
• To comply with legal obligations or respond to lawful requests
• To protect the rights, property, or safety of HyperQuizzes, our users, or others
• In connection with a merger, sale, or acquisition of all or part of our company
• With your consent or at your direction

Quiz creators can see participant scores and usernames, but never email addresses or passwords.`
    },
    {
      title: "4. Data Security",
      content: `We implement appropriate technical and organizational measures to protect your data:

• Encryption of data in transit (TLS/SSL) and at rest
• Regular security assessments and penetration testing
• Access controls and authentication requirements
• Monitoring for suspicious activities
• Employee training on data protection

However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.`
    },
    {
      title: "5. Your Data Rights",
      content: `Depending on your location, you may have the following rights:

• Access: Request a copy of your personal data
• Correction: Update or correct inaccurate information
• Deletion: Request deletion of your account and data
• Portability: Receive your data in a structured format
• Restriction: Limit how we process your data
• Objection: Object to certain processing activities
• Withdraw Consent: Revoke consent at any time

To exercise these rights, contact us at privacy@hyperquizzes.com. We respond to all requests within 30 days.`
    },
    {
      title: "6. Cookies & Tracking",
      content: `We use cookies and similar technologies to:

• Keep you logged in during sessions
• Remember your preferences (theme, language)
• Analyze site traffic and usage patterns
• Improve our services and user experience

Types of cookies we use:
• Essential: Required for basic functionality
• Functional: Remember your preferences
• Analytics: Help us understand usage patterns
• Marketing: Deliver relevant content (if opted in)

You can control cookies through your browser settings. Disabling essential cookies may affect site functionality.`
    },
    {
      title: "7. Data Retention",
      content: `We retain your information for as long as necessary to:

• Provide our services to you
• Comply with legal obligations
• Resolve disputes and enforce agreements
• Maintain business records

Specific retention periods:
• Account data: Until account deletion + 30 days grace period
• Quiz content: Until deleted by creator or 2 years of inactivity
• Usage logs: 12 months for analytics, then anonymized
• Deleted accounts: Permanently removed within 90 days

You may request early deletion by contacting us.`
    },
    {
      title: "8. Children's Privacy",
      content: `HyperQuizzes is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.

If we learn we have collected personal information from a child under 13, we will:

• Delete that information immediately
• Terminate the associated account
• Notify parents/guardians if contact information is available

Parents or guardians who believe their child has provided us with information may contact us at privacy@hyperquizzes.com.`
    },
    {
      title: "9. International Transfers",
      content: `Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws.

We ensure appropriate safeguards are in place:

• Standard Contractual Clauses for EU data transfers
• Adequacy decisions where recognized by regulatory authorities
• Data Processing Agreements with all service providers

By using our services, you consent to the transfer of your information to countries that may not provide equivalent data protection.`
    },
    {
      title: "10. Changes to This Policy",
      content: `We may update this Privacy Policy from time to time to reflect:

• Changes in our practices or services
• New legal requirements or regulations
• Improvements to our data protection measures

We will notify you of significant changes by:

• Email notification to registered users
• Prominent notice on our website
• Update to the "Last Updated" date

Continued use of our services after changes constitutes acceptance of the updated policy. We encourage you to review this policy periodically.`
    },
    {
      title: "11. Contact Us",
      content: `For privacy-related questions, concerns, or to exercise your data rights, please contact:

Email: privacy@hyperquizzes.com
Data Protection Officer: dpo@hyperquizzes.com
Address: HyperQuizzes Inc., 123 Quiz Street, San Francisco, CA 94102

We aim to respond to all privacy inquiries within 48 hours. For formal data requests, please include "Data Request" in the subject line.

If you believe we have not addressed your concern, you have the right to complain to your local data protection authority.`
    }
  ]

  

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-linear-to-br from-orange-50 via-white to-amber-50'}`}>
      {/* Animated Background Effects */}
       <SEO
        title="Privacy Policy" 
        description="Our Privacy policy" 
      />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-150 h-150 rounded-full blur-[120px] animate-pulse transition-colors duration-700 ${isDark ? 'bg-orange-600/20' : 'bg-orange-300/30'}`}></div>
        <div className={`absolute -bottom-40 -left-20 w-125 h-125 rounded-full blur-[100px] animate-pulse delay-1000 transition-colors duration-700 ${isDark ? 'bg-orange-500/10' : 'bg-amber-300/30'}`}></div>
        
        {/* Grid pattern for dark mode */}
        {isDark && (
          <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-size-[50px_50px]"></div>
        )}
      </div>
     
     <Navbar onThemeChange={setIsDark} />

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12 lg:py-20">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 border ${isDark ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-green-100 text-green-700 border-green-200'}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            Your Data Matters
          </div>
          
          <h1 className={`text-4xl lg:text-5xl font-black mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Privacy <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-amber-500">Policy</span>
          </h1>
          
          <p className={`text-lg transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
            Last updated: <span className="font-semibold text-orange-500">{lastUpdated}</span>
          </p>
        </div>

        {/* Privacy Content */}
        <div className="max-w-4xl mx-auto">
          {/* Introduction Card */}
          <div className={`rounded-3xl p-8 mb-8 border backdrop-blur-sm ${isDark ? 'bg-black/60 border-orange-500/20' : 'bg-white border-orange-100'}`}>
            <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
              At HyperQuizzes, we take your privacy seriously. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our platform. We are committed to being transparent about our data practices and giving you control over your information.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div 
                key={index}
                className={`group rounded-2xl p-6 lg:p-8 border transition-all duration-300 hover:scale-[1.01] ${isDark ? 'bg-black/40 border-orange-500/10 hover:border-orange-500/30' : 'bg-white/80 border-orange-100 hover:border-orange-300'}`}
              >
                <h2 className={`text-xl lg:text-2xl font-bold mb-4 flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${isDark ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600'}`}>
                    {index + 1}
                  </span>
                  {section.title.split('. ')[1]}
                </h2>
                <div className={`space-y-4 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                  {section.content.split('\n\n').map((paragraph, pIndex) => (
                    <div key={pIndex}>
                      {paragraph.startsWith('•') ? (
                        <ul className="space-y-2 ml-4">
                          {paragraph.split('\n').map((item, iIndex) => (
                            <li key={iIndex} className="flex items-start gap-2">
                              <span className="text-orange-500 mt-1.5">•</span>
                              <span className="leading-relaxed">{item.replace('• ', '')}</span>
                            </li>
                          ))}
                        </ul>
                      ) : paragraph.includes(':') && !paragraph.includes('.') ? (
                        <p className="font-semibold text-orange-500 mb-2">{paragraph}</p>
                      ) : (
                        <p className="leading-relaxed">{paragraph}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA Card */}
          <div className={`mt-12 rounded-2xl p-8 border text-center ${isDark ? 'bg-linear-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20' : 'bg-linear-to-br from-orange-50 to-amber-50 border-orange-200'}`}>
            <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Have Privacy Concerns?
            </h3>
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              Your privacy is our priority. If you have any questions about how we handle your data, our privacy team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:privacy@hyperquizzes.com" className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${isDark ? 'bg-linear-to-r from-orange-600 to-orange-500 text-white hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                Email Privacy Team
              </a>
              <a href="/terms" className={`px-6 py-3 rounded-xl font-semibold border transition-all duration-300 ${isDark ? 'border-orange-500/30 text-orange-400 hover:bg-orange-500/10' : 'border-slate-300 text-slate-700 hover:bg-slate-50'}`}>
                View Terms of Service
              </a>
            </div>
          </div>

          {/* Data Rights Quick Links */}
          <div className={`mt-8 grid md:grid-cols-3 gap-4`}>
            {[
              { title: "Access Your Data", desc: "Request a copy of all your personal information", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
              { title: "Delete Account", desc: "Permanently remove your account and all data", icon: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" },
              { title: "Export Data", desc: "Download your data in a portable format", icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }
            ].map((item, idx) => (
              <a 
                key={idx}
                href="mailto:privacy@hyperquizzes.com"
                className={`group p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${isDark ? 'bg-black/40 border-orange-500/10 hover:border-orange-500/30' : 'bg-white border-orange-100 hover:border-orange-300'}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 ${isDark ? 'bg-orange-500/20 text-orange-400 group-hover:bg-orange-500/30' : 'bg-orange-100 text-orange-600 group-hover:bg-orange-200'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
                  </svg>
                </div>
                <h4 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{item.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </main>

      <Footer isDark={isDark} />
    </div>
  )
}