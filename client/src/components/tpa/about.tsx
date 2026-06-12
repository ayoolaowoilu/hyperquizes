import logo from "../../assets/carrot-diet-fruit-svgrepo-com.svg"
import { useState} from "react"
import SEO from "../seo";
import Navbar from "../layout/navbar";


export default function About() {

  
 const [isDark, setIsDark] = useState(() => {
    
    return localStorage.getItem('theme') === 'dark';
  });




  const stats = [
    { value: "2022", label: "Founded", suffix: "" },
    { value: "50K", label: "Active Users", suffix: "+" },
    { value: "100K", label: "Quizzes Created", suffix: "+" },
    { value: "1M", label: "Questions Answered", suffix: "+" }
  ]

  const values = [
    {
      title: "Education First",
      description: "We believe learning should be engaging, accessible, and fun for everyone. Our platform makes knowledge sharing interactive and enjoyable.",
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    },
    {
      title: "Community Driven",
      description: "Our users are our greatest asset. We foster a community where knowledge creators and learners thrive together through shared experiences.",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    },
    {
      title: "Innovation",
      description: "We constantly push boundaries to create the most interactive and seamless quiz experience across all devices and platforms.",
      icon: "M13 10V3L4 14h7v7l9-11h-7z"
    },
    {
      title: "Accessibility",
      description: "Knowledge has no barriers. We're committed to making our platform accessible to learners worldwide, regardless of device or ability.",
      icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    }
  ]

  const team = [
    {
      name: "Ayoola Khaleed",
      role: "Founder & CEO",
      bio: "Full-stack developer with 10+ years experience. Leads our engineering team and platform architecture",
      initials: "AK"
    },
    {
      name: "Okafor Louis",
      role: "Project manager",
      bio: "Knowledge has no barriers. We're committed to making our platform accessible to learners worldwide, regardless of device or ability.",
      initials: "OL"
    },
    {
      name: "Ayodapo Fuad",
      role: "Head of Product",
      bio: "UX specialist focused on creating intuitive experiences. Ensures every feature delights our users.",
      initials: "AF"
    }
  ]


  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-linear-to-br from-orange-50 via-white to-amber-50'}`}>
      
       <SEO
        title="About" 
        description="About us" 
      />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-150 h-150 rounded-full blur-[120px] animate-pulse transition-colors duration-700 ${isDark ? 'bg-orange-600/20' : 'bg-orange-300/30'}`}></div>
        <div className={`absolute -bottom-40 -left-20 w-125 h-125 rounded-full blur-[100px] animate-pulse delay-1000 transition-colors duration-700 ${isDark ? 'bg-orange-500/10' : 'bg-amber-300/30'}`}></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full blur-[150px] ${isDark ? 'bg-orange-600/5' : 'bg-orange-200/20'}`}></div>
        
      
        {isDark && (
          <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-size-[50px_50px]"></div>
        )}
      </div>

       <Navbar onThemeChange={setIsDark} />
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 border ${isDark ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-orange-100 text-orange-700 border-orange-200'}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Our Story
            </div>
            
            <h1 className={`text-4xl lg:text-6xl font-black mb-6 transition-colors duration-300 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Making Learning <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 via-amber-500 to-orange-600">Hyper</span> Engaging
            </h1>
            
            <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              HyperQuizzes was born from a simple idea: education should be as engaging as your favorite game. We're building the future of interactive learning.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className={`py-12 border-y ${isDark ? 'bg-black/40 border-orange-500/20' : 'bg-white/50 border-orange-100'}`}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className={`text-3xl lg:text-4xl font-black mb-1 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                    {stat.value}{stat.suffix}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <div className={`rounded-3xl p-8 lg:p-12 border backdrop-blur-sm ${isDark ? 'bg-black/60 border-orange-500/20' : 'bg-white border-orange-100'}`}>
              <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Our Mission</h2>
              <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                At HyperQuizzes, we believe that learning shouldn't feel like a chore. Whether you're a student preparing for exams, a teacher engaging your classroom, or a lifelong learner exploring new topics, our platform transforms knowledge into an adventure.
              </p>
              <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                Founded in 2022, we've grown from a small side project to a global community of over 50,000 quiz creators and learners. Every day, thousands of questions are answered on our platform, each one representing a moment of discovery, understanding, or simply fun competition among friends.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className={`py-16 lg:py-24 ${isDark ? 'bg-black/20' : 'bg-orange-50/30'}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-slate-900'}`}>Our Core Values</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {values.map((value, idx) => (
                  <div 
                    key={idx}
                    className={`group p-8 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${isDark ? 'bg-black/40 border-orange-500/10 hover:border-orange-500/30' : 'bg-white border-orange-100 hover:border-orange-300'}`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${isDark ? 'bg-orange-500/20 text-orange-400 group-hover:bg-orange-500/30' : 'bg-orange-100 text-orange-600 group-hover:bg-orange-200'}`}>
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={value.icon}></path>
                      </svg>
                    </div>
                    <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{value.title}</h3>
                    <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-3xl font-bold text-center mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Meet the Team</h2>
            <p className={`text-center mb-12 max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              We're a passionate group of educators, developers, and designers dedicated to making learning more engaging.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, idx) => (
                <div 
                  key={idx}
                  className={`group p-6 rounded-2xl border text-center transition-all duration-300 hover:scale-[1.02] ${isDark ? 'bg-black/40 border-orange-500/10 hover:border-orange-500/30' : 'bg-white border-orange-100 hover:border-orange-300'}`}
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-linear-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform duration-300">
                    {member.initials}
                  </div>
                  <h3 className={`font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{member.name}</h3>
                  <p className="text-orange-500 text-sm font-medium mb-3">{member.role}</p>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`py-16 lg:py-24 ${isDark ? 'bg-linear-to-br from-orange-600/10 to-orange-500/5' : 'bg-linear-to-br from-orange-100 to-amber-50'}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Join the Learning Revolution</h2>
              <p className={`text-lg mb-8 max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                Whether you want to create engaging quizzes or test your knowledge, there's a place for you in our community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/reg" className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 ${isDark ? 'bg-linear-to-r from-orange-600 to-orange-500 text-white hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg'}`}>
                  Start Creating Free
                </a>
                <a href="/explore" className={`px-8 py-4 rounded-xl font-bold text-lg border transition-all duration-300 hover:scale-105 ${isDark ? 'border-orange-500/30 text-orange-400 hover:bg-orange-500/10' : 'border-slate-300 text-slate-700 hover:bg-white'}`}>
                  Explore Quizzes
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`relative z-10 border-t transition-colors duration-500 ${isDark ? 'bg-black/80 border-orange-500/20' : 'bg-white/80 border-orange-100'}`}>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo & Copyright */}
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl border ${isDark ? 'bg-linear-to-br from-orange-500/20 to-orange-600/10 border-orange-500/30' : 'bg-orange-100 border-orange-200'}`}>
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

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {['About', 'Privacy', 'Terms', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`/${link.toLowerCase()}`}
                  className={`transition-colors duration-300 ${isDark ? 'text-gray-400 hover:text-orange-400' : 'text-slate-600 hover:text-orange-600'} ${link === 'About' ? 'font-semibold text-orange-500' : ''}`}
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Social Links */}
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