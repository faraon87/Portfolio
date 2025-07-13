"use client"

import { useState, useEffect } from 'react'
import { 
  ArrowRight, Github, Linkedin, Mail, Phone, DollarSign, Users, 
  Code, Award, Globe, Zap, ChevronRight, Target, Activity,
  Settings, Briefcase, GraduationCap, Building, Menu, X,
  ExternalLink, Download
} from 'lucide-react'

// Utility function
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

// Floating Navigation Component  
function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" }, 
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ]

  const handleDownload = () => {
    // Create a temporary link element to download resume
    const link = document.createElement('a')
    link.href = '/resume.pdf' // Make sure to add your resume PDF to public folder
    link.download = 'Ahmed_Said_Resume.pdf'
    link.click()
  }

  return (
    <div className={cn(
      "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300",
      isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
    )}>
      <div className="relative px-4 py-3 rounded-full bg-zinc-800/80 backdrop-blur-md border border-zinc-700/50 shadow-lg">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur opacity-50"></div>
        <div className="relative flex items-center gap-1">
          <span className="font-bold text-lg mr-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Ahmed</span>
            <span className="text-white ml-1">Said</span>
          </span>
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="px-3 py-1 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              {item.name}
            </a>
          ))}
          <button 
            onClick={handleDownload}
            className="ml-2 px-4 py-1 text-sm bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 border-0 rounded-full text-white font-medium transition-all"
          >
            Resume
          </button>
        </div>
      </div>
    </div>
  )
}

// Achievement Card Component
function AchievementCard({ value, label, icon: Icon }: { value: string, label: string, icon: any }) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
      <div className="relative p-6 bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 rounded-lg">
        <Icon className="w-8 h-8 text-purple-400 mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">{value}</h3>
        <p className="text-zinc-400 text-sm">{label}</p>
      </div>
    </div>
  )
}

// Company Timeline Component
function CompanyTimeline() {
  const companies = [
    { name: 'Evaluate Consulting', role: 'Founder & Multi-Domain Consultant', period: '2024-Present', color: 'bg-purple-500', industry: 'Cross-Industry Consulting' },
    { name: 'Fisker', role: 'Service Product Manager & Engineer', period: '2022-2024', color: 'bg-green-500', industry: 'Electric Vehicles' },
    { name: 'Rivian', role: 'Diagnostics Engineer', period: '2021-2022', color: 'bg-blue-500', industry: 'Electric Vehicles' },
    { name: 'Tesla', role: 'Lead Field Remote Diagnostics Engineer', period: '2018-2021', color: 'bg-red-500', industry: 'Electric Vehicles' },
    { name: 'Iridium', role: 'Product Support Engineer', period: '2014-2016', color: 'bg-indigo-500', industry: 'Satellite Communications' },
    { name: 'Verizon', role: 'Technical Consultant', period: '2005-2014', color: 'bg-red-600', industry: 'Telecommunications' }
  ]

  return (
    <div className="space-y-8">
      {companies.map((company, index) => (
        <div key={index} className="relative flex items-center group">
          <div className={cn(
            "w-4 h-4 rounded-full flex-shrink-0 z-10 border-4 border-zinc-900",
            company.color
          )}></div>
          <div className="ml-6 flex-1">
            <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg p-6 group-hover:border-purple-500/30 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h3 className="text-xl font-bold text-white">{company.name}</h3>
                <span className="text-sm text-zinc-400 bg-zinc-700/50 px-3 py-1 rounded-full">
                  {company.period}
                </span>
              </div>
              <p className="text-purple-400 font-medium mb-1">{company.role}</p>
              <p className="text-zinc-400 text-sm">{company.industry}</p>
            </div>
          </div>
          {index < companies.length - 1 && (
            <div className="absolute left-2 top-8 w-0.5 h-16 bg-gradient-to-b from-purple-500/50 to-transparent"></div>
          )}
        </div>
      ))}
    </div>
  )
}

// Project Card Component
function ProjectCard({ title, company, description, technologies, achievements }: {
  title: string
  company: string
  description: string
  technologies: string[]
  achievements: string[]
}) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
      <div className="relative p-6 bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 rounded-lg h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <span className="text-sm text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
            {company}
          </span>
        </div>
        <p className="text-zinc-400 mb-4">{description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-white mb-2">Key Achievements:</h4>
          <ul className="space-y-1">
            {achievements.map((achievement, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-zinc-400">
                <ChevronRight size={12} className="text-purple-400 mt-1 flex-shrink-0" />
                {achievement}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, idx) => (
            <span key={idx} className="px-2 py-1 bg-zinc-700/50 text-zinc-300 rounded text-xs">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const achievements = [
    { value: '$6.2M+', label: 'Cost Savings Generated', icon: DollarSign },
    { value: '300+', label: 'Professionals Trained', icon: Users },
    { value: '32K+', label: 'Engineering Escalations Resolved', icon: Code },
    { value: '20+', label: 'Years Multi-Domain Experience', icon: Award },
    { value: '4', label: 'Global Regions Served', icon: Globe },
    { value: '99.99%', label: 'Satellite Uptime Maintained', icon: Zap }
  ]

  const projects = [
    {
      title: 'Fisker Aftersales Service Tool (FAST)',
      company: 'Fisker',
      description: 'Revolutionary diagnostic platform that became the backbone of Fisker\'s service operations with comprehensive UI/UX design.',
      technologies: ['CAN/CAN-FD', 'UDS', 'ISO Protocols', 'Diagnostic Systems', 'UI/UX Design'],
      achievements: [
        'Reduced ECU flashing time by 40% (60 to 35 minutes)',
        'Increased diagnostic efficiency by 35%',
        'Saved $2M in supplier costs',
        'Trained 150+ engineers globally'
      ]
    },
    {
      title: 'Tesla Remote Diagnostics System',
      company: 'Tesla',
      description: 'Advanced remote diagnostic strategies for global service centers covering ADAS, HV/LV systems, and infotainment.',
      technologies: ['SSH', 'DoIP', 'Syslog', 'HV Safety', 'Remote Diagnostics'],
      achievements: [
        'Resolved 32,000+ engineering escalations',
        'Reduced field diagnostic time by 50%',
        'Saved $3M in buyback investigations',
        'Served 4 global regions'
      ]
    },
    {
      title: 'Rivian Cloud Diagnostics',
      company: 'Rivian',
      description: 'RivianOS cloud-based remote diagnostics and repair planning system for next-generation electric vehicles.',
      technologies: ['Cloud Computing', 'Remote Diagnostics', 'Planning Systems', 'KPI Analytics'],
      achievements: [
        'Reduced remote response time by 60%',
        'Saved $1.2M annually',
        'Boosted software adoption by 45%',
        'Increased resolution rate by 25%'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-white overflow-hidden">
      <FloatingNav />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <div className="relative px-3 py-1 text-sm font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
                <span className="relative z-10">Multi-Domain Engineering Expert</span>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse"></span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="block text-white">Hi, I'm</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Ahmed Said
              </span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-[600px]">
              Engineering leader with 20+ years across Tesla, Rivian, Fisker, Iridium & Verizon. 
              Delivered $6.2M+ in cost savings and trained 300+ professionals globally.
            </p>
            <div className="flex gap-4">
              <a 
                href="#projects"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white px-8 py-3 rounded-full font-medium flex items-center gap-2 transition-all"
              >
                View Projects <ArrowRight size={20} />
              </a>
              <button 
                onClick={() => {
                  const link = document.createElement('a')
                  link.href = '/Ahmed_Said_Resume.pdf' // Add your resume to public folder
                  link.download = 'Ahmed_Said_Resume.pdf'
                  link.click()
                }}
                className="border border-zinc-700 hover:border-purple-500 text-white px-8 py-3 rounded-full font-medium flex items-center gap-2 transition-all"
              >
                <Download size={20} /> Resume
              </button>
            </div>
            <div className="flex gap-4 pt-4">
              <a href="mailto:ahmed.osaid.pro@gmail.com" className="text-zinc-400 hover:text-purple-400 transition-colors">
                <Mail size={24} />
              </a>
              <a href="https://www.linkedin.com/in/ahmedosaid/" className="text-zinc-400 hover:text-purple-400 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="tel:+16024022505" className="text-zinc-400 hover:text-purple-400 transition-colors">
                <Phone size={24} />
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full h-[400px] relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl backdrop-blur-sm border border-white/10 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-500"></div>
              <div className="absolute inset-4 bg-zinc-900/50 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4 animate-pulse">
                    20+
                  </div>
                  <div className="text-white font-medium text-xl">Years Experience</div>
                  <div className="text-zinc-400 text-sm mt-2">Tesla • Rivian • Fisker • Iridium • Verizon</div>
                  <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                    <div>
                      <div className="text-purple-400 font-bold text-lg">$6.2M+</div>
                      <div className="text-zinc-500 text-xs">Saved</div>
                    </div>
                    <div>
                      <div className="text-pink-400 font-bold text-lg">300+</div>
                      <div className="text-zinc-500 text-xs">Trained</div>
                    </div>
                    <div>
                      <div className="text-purple-400 font-bold text-lg">32K+</div>
                      <div className="text-zinc-500 text-xs">Resolved</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating orbs for visual interest */}
              <div className="absolute top-10 right-10 w-4 h-4 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="absolute bottom-20 left-10 w-3 h-3 bg-pink-400 rounded-full animate-bounce animation-delay-2000"></div>
              <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="about" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Impact by <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Numbers</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Two decades of engineering excellence across automotive, satellite, and telecommunications industries
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <AchievementCard key={index} {...achievement} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Career <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Journey</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              From telecommunications infrastructure to cutting-edge electric vehicles
            </p>
          </div>
          
          <CompanyTimeline />
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Projects</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Breakthrough engineering solutions that transformed operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Technical <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Expertise</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { category: 'Diagnostic Systems', skills: ['CAN/CAN-FD', 'UDS', 'ISO Protocols', 'DoIP', 'Remote Diagnostics'] },
              { category: 'Automotive Tech', skills: ['ADAS', 'ECU Systems', 'HV/LV Systems', 'Vehicle Networks', 'OTA Management'] },
              { category: 'Tools & Platforms', skills: ['CANoe Suite', 'Vehicle Spy', 'GNU/Linux', 'JIRA', 'Cloud Systems'] },
              { category: 'Leadership', skills: ['Product Management', 'Global Teams', 'Process Optimization', 'Training', 'Strategy'] }
            ].map((skillGroup, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative p-6 bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 rounded-lg">
                  <h3 className="text-lg font-bold text-white mb-4">{skillGroup.category}</h3>
                  <div className="space-y-2">
                    {skillGroup.skills.map((skill, idx) => (
                      <span key={idx} className="inline-block px-3 py-1 bg-zinc-700/50 text-zinc-300 rounded-full text-sm mr-2 mb-2">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Let's <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Connect</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Ready to transform your operations with 20+ years of multi-domain expertise?
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Email</h3>
                <a href="mailto:ahmed.osaid.pro@gmail.com" className="text-purple-400 hover:text-pink-400 transition-colors">
                  ahmed.osaid.pro@gmail.com
                </a>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Phone</h3>
                <a href="tel:+16024022505" className="text-purple-400 hover:text-pink-400 transition-colors">
                  +1 (602) 402-2505
                </a>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Linkedin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">LinkedIn</h3>
                <a href="https://www.linkedin.com/in/ahmedosaid/" className="text-purple-400 hover:text-pink-400 transition-colors">
                  Connect with me
                </a>
              </div>
            </div>
            
            <div className="text-center">
              <div className="relative group inline-block">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Evaluate Consulting</h3>
                  <p className="text-zinc-400 mb-6">
                    Providing bespoke engineering support for 3rd party service networks, 
                    collision centers, and out-of-warranty end users globally.
                  </p>
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white px-8 py-3 rounded-full font-medium flex items-center gap-2 mx-auto transition-all">
                    Get Consultation <ExternalLink size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900/50 backdrop-blur-sm border-t border-zinc-700/50 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-zinc-400 mb-4">
              © 2024 Ahmed Said. Engineering excellence across industries.
            </p>
            <p className="text-sm text-zinc-500">
              Tesla • Rivian • Fisker • Iridium • Verizon • Evaluate Consulting
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
