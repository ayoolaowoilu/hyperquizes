
import { useState } from "react"
import SEO from "../seo";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";

export default function Terms() {
  
  
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
      title: "1. Acceptance of Terms",
      content: `By accessing or using HyperQuizzes ("the Service"), you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the Service.

The Service is owned and operated by HyperQuizzes Inc. These terms apply to all users, including those who contribute content, use our mobile applications, or simply browse the platform.`
    },
    {
      title: "2. Description of Service",
      content: `HyperQuizzes provides an interactive platform for creating, sharing, and participating in quizzes. Our services include:

• Quiz creation and management tools
• Real-time quiz participation
• Performance analytics and statistics
• Social features for quiz sharing
• Mobile applications for Android devices

We reserve the right to modify, suspend, or discontinue any part of the Service at any time without notice.`
    },
    {
      title: "3. User Accounts",
      content: `To access certain features, you must register for an account. You agree to:

• Provide accurate, current, and complete information
• Maintain the security of your password and account
• Notify us immediately of any unauthorized access
• Accept responsibility for all activities under your account

Users must be at least 13 years of age to create an account. Users under 18 must have parental consent.`
    },
    {
      title: "4. Quiz Content Guidelines",
      content: `When creating quizzes, you agree not to post content that:

• Infringes on intellectual property rights
• Contains hate speech, harassment, or discrimination
• Includes explicit, violent, or inappropriate material
• Promotes illegal activities or harmful behavior
• Contains malware, phishing attempts, or malicious code

We reserve the right to remove any content that violates these guidelines and terminate accounts of repeat offenders.`
    },
    {
      title: "5. Intellectual Property",
      content: `HyperQuizzes retains all rights to the platform, including:

• The HyperQuizzes name, logo, and branding
• Software, code, and technical infrastructure
• Design elements and user interface

User-created quiz content remains the property of the creator, but you grant HyperQuizzes a non-exclusive license to host, display, and distribute your quizzes on the platform.`
    },
    {
      title: "6. Privacy and Data",
      content: `Your privacy is important to us. Our data practices include:

• Collection of email, username, and quiz performance data
• Use of cookies and similar technologies
• Data storage on secure servers
• No sale of personal information to third parties

For complete details, please review our Privacy Policy.`
    },
    {
      title: "7. Prohibited Activities",
      content: `Users may not:

• Attempt to access unauthorized areas of the Service
• Use automated scripts or bots without permission
• Interfere with other users' access to the Service
• Reverse engineer or extract source code
• Create multiple accounts to manipulate statistics
• Share answers or cheat during quizzes

Violations may result in account suspension or permanent ban.`
    },
    {
      title: "8. Limitation of Liability",
      content: `HyperQuizzes is provided "as is" without warranties of any kind. We are not liable for:

• Service interruptions or data loss
• Inaccuracies in quiz content created by users
• Damages arising from use of the Service
• Third-party links or content

Your use of the Service is at your sole risk.`
    },
    {
      title: "9. Changes to Terms",
      content: `We may update these Terms from time to time. Changes will be effective immediately upon posting. We will notify users of significant changes via:

• Email notification to registered users
• Notice on our website
• Update to the "Last Updated" date

Continued use of the Service after changes constitutes acceptance of the new Terms.`
    },
    {
      title: "10. Contact Information",
      content: `For questions about these Terms, please contact us:

Email: legal@hyperquizzes.com
Address: HyperQuizzes Inc., 123 Quiz Street, San Francisco, CA 94102

We aim to respond to all inquiries within 48 hours.`
    }
  ]



  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-linear-to-br from-orange-50 via-white to-amber-50'}`}>
      {/* Animated Background Effects */}
       <SEO
        title="Terms of Service" 
        description="Terms and conditions" 
      />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-150 h-150 rounded-full blur-[120px] animate-pulse transition-colors duration-700 ${isDark ? 'bg-orange-600/20' : 'bg-orange-300/30'}`}></div>
        <div className={`absolute -bottom-40 -left-20 w-150 h-150 rounded-full blur-[100px] animate-pulse delay-1000 transition-colors duration-700 ${isDark ? 'bg-orange-500/10' : 'bg-amber-300/30'}`}></div>
        
        {isDark && (
          <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-size-[50px_50px]"></div>
        )}
      </div>

      <Navbar onThemeChange={setIsDark} />

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12 lg:py-20">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 border ${isDark ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-orange-100 text-orange-700 border-orange-200'}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Legal Documentation
          </div>
          
          <h1 className={`text-4xl lg:text-5xl font-black mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Terms of <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-amber-500">Service</span>
          </h1>
          
          <p className={`text-lg transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
            Last updated: <span className="font-semibold text-orange-500">{lastUpdated}</span>
          </p>
        </div>

        {/* Terms Content */}
        <div className="max-w-4xl mx-auto">
          {/* Introduction Card */}
          <div className={`rounded-3xl p-8 mb-8 border backdrop-blur-sm ${isDark ? 'bg-black/60 border-orange-500/20' : 'bg-white border-orange-100'}`}>
            <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
              Welcome to HyperQuizzes! These Terms of Service govern your use of our platform. Please read them carefully before using our services. By accessing or using HyperQuizzes, you agree to be bound by these terms.
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
                <div className={`prose prose-lg max-w-none ${isDark ? 'prose-invert prose-p:text-gray-400 text-orange-400' : 'text-slate-600 prose-strong:text-orange-600'}`}>
                  {section.content.split('\n').map((paragraph, pIndex) => (
                    <p key={pIndex} className="mb-4 last:mb-0 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Acceptance Card */}
          <div className={`mt-12 rounded-2xl p-8 border text-center ${isDark ? 'bg-linear-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20' : 'bg-linear-to-br from-orange-50 to-amber-50 border-orange-200'}`}>
            <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Questions About Our Terms?
            </h3>
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              If you have any questions or concerns about these Terms of Service, please don't hesitate to reach out to our legal team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${isDark ? 'bg-linear-to-r from-orange-600 to-orange-500 text-white hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                Contact Legal Team
              </a>
              <a href="/privacy" className={`px-6 py-3 rounded-xl font-semibold border transition-all duration-300 ${isDark ? 'border-orange-500/30 text-orange-400 hover:bg-orange-500/10' : 'border-slate-300 text-slate-700 hover:bg-slate-50'}`}>
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </main>

  <Footer isDark={isDark} />
    </div>
  )
}