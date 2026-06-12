import logo from "../../assets/carrot-diet-fruit-svgrepo-com.svg"
import { useState } from "react"
import SEO from "../seo";
import Navbar from "../layout/navbar";


export default function Contact() {

  
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || 
        (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  })
  



  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')


  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitStatus('success')
    setFormData({ name: '', email: '', subject: '', message: '' })
    
    setTimeout(() => setSubmitStatus('idle'), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactMethods = [
    {
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      title: "Email Us",
      description: "Get a response within 24 hours",
      value: "support@hyperquizzes.com",
      href: "mailto:support@hyperquizzes.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
      title: "Visit Us",
      description: "HyperQuizzes HQ, San Francisco",
      value: "123 Quiz Street, CA 94102",
      href: "#",
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
      title: "Live Chat",
      description: "Available 9AM - 6PM PST",
      value: "Start a conversation",
      href: "#",
      color: "from-green-500 to-emerald-500"
    }
  ]

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Go to your profile settings and click 'Change Password'. If you've forgotten it, use the 'Forgot Password' link on the login page."
    },
    {
      question: "Can I delete my account?",
      answer: "Yes, you can request account deletion from your profile settings. All your data will be permanently removed within 30 days."
    },
    {
      question: "How do I report inappropriate content?",
      answer: "Click the 'Report' button on any quiz or use this contact form selecting 'Report Content' as the subject."
    },
    {
      question: "Do you offer API access?",
      answer: "We're currently beta testing our API. Contact our enterprise team for early access and pricing information."
    }
  ]


  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-linear-to-br from-orange-50 via-white to-amber-50'}`}>
      {/* Animated Background Effects */}
       <SEO
        title="Contact" 
        description="Contact Us" 
      />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-150 h-150 rounded-full blur-[120px] animate-pulse transition-colors duration-700 ${isDark ? 'bg-orange-600/20' : 'bg-orange-300/30'}`}></div>
        <div className={`absolute -bottom-40 -left-20 w-125 h-125 rounded-full blur-[100px] animate-pulse delay-1000 transition-colors duration-700 ${isDark ? 'bg-orange-500/10' : 'bg-amber-300/30'}`}></div>
        
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
            Get in Touch
          </div>
          
          <h1 className={`text-4xl lg:text-5xl font-black mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Contact <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-amber-500">Support</span>
          </h1>
          
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
            Have a question, feedback, or need help? We're here for you. Reach out through any of the channels below or send us a message.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.href}
                className={`group relative overflow-hidden rounded-2xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-xl ${isDark ? 'bg-black/40 border-orange-500/10 hover:border-orange-500/30' : 'bg-white/80 border-orange-100 hover:border-orange-300'}`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${method.color} opacity-10 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:opacity-20 transition-opacity duration-300`}></div>
                
                <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${method.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={method.icon}></path>
                  </svg>
                </div>
                
                <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {method.title}
                </h3>
                <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  {method.description}
                </p>
                <p className={`font-semibold text-sm ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                  {method.value}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form & FAQ Grid */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className={`rounded-3xl p-8 border backdrop-blur-sm ${isDark ? 'bg-black/60 border-orange-500/20' : 'bg-white border-orange-100'}`}>
            <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 focus:ring-2 focus:ring-orange-500/50 ${isDark ? 'bg-gray-900/50 border-orange-500/30 text-white placeholder-gray-500 focus:border-orange-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-orange-500'}`}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 focus:ring-2 focus:ring-orange-500/50 ${isDark ? 'bg-gray-900/50 border-orange-500/30 text-white placeholder-gray-500 focus:border-orange-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-orange-500'}`}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 focus:ring-2 focus:ring-orange-500/50 ${isDark ? 'bg-gray-900/50 border-orange-500/30 text-white focus:border-orange-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-orange-500'}`}
                >
                  <option value="">Select a topic...</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="report">Report Content</option>
                  <option value="partnership">Business Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 focus:ring-2 focus:ring-orange-500/50 resize-none ${isDark ? 'bg-gray-900/50 border-orange-500/30 text-white placeholder-gray-500 focus:border-orange-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-orange-500'}`}
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] hover:shadow-lg'} ${isDark ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                    Send Message
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className={`p-4 rounded-xl flex items-center gap-3 ${isDark ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}
            </form>
          </div>

          {/* FAQ Section */}
          <div className="space-y-4">
            <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Frequently Asked Questions
            </h2>
            
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.01] ${isDark ? 'bg-black/40 border-orange-500/10 hover:border-orange-500/30' : 'bg-white/80 border-orange-100 hover:border-orange-300'}`}
              >
                <h3 className={`font-semibold mb-2 flex items-start gap-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                    Q
                  </span>
                  {faq.question}
                </h3>
                <p className={`ml-9 text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                  {faq.answer}
                </p>
              </div>
            ))}

            <div className={`mt-8 p-6 rounded-2xl border ${isDark ? 'bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20' : 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200'}`}>
              <h3 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Still need help?
              </h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                Check out our comprehensive documentation or community forums for more answers.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/docs" className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDark ? 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}`}>
                  Documentation
                </a>
                <a href="/community" className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                  Community Forum
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`relative z-10 border-t transition-colors duration-500 ${isDark ? 'bg-black/80 border-orange-500/20' : 'bg-white/80 border-orange-100'}`}>
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl border ${isDark ? 'bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-500/30' : 'bg-orange-100 border-orange-200'}`}>
                <img src={logo} alt="Hyper Quizes" className="w-8 h-8" />
              </div>
              <div>
                <span className={`font-bold transition-colors duration-300 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Hyper<span className="text-orange-500">Quizzes</span>
                </span>
                <p className={`text-xs transition-colors duration-300 ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                  © 2024 All rights reserved.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {['About', 'Privacy', 'Terms', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`/${link.toLowerCase()}`}
                  className={`transition-colors duration-300 ${isDark ? 'text-gray-400 hover:text-orange-400' : 'text-slate-600 hover:text-orange-600'} ${link === 'Contact' ? 'font-semibold text-orange-500' : ''}`}
                >
                  {link}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {[
                { name: 'Twitter', icon: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' },
                { name: 'GitHub', icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' }
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 border ${isDark ? 'text-gray-400 hover:text-orange-400 hover:bg-orange-500/10 border-orange-500/20' : 'text-slate-600 hover:text-orange-500 hover:bg-orange-50 border-slate-200'}`}
                >
                  <span className="sr-only">{social.name}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}