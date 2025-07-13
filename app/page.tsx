"use client"

import { useState, useEffect } from 'react'
import { 
  ChevronRight, Code, Zap, Users, DollarSign, Globe, Award, MessageSquare, Phone, Mail, 
  Activity, AlertTriangle, CheckCircle, Thermometer, Battery, Gauge, Settings, Download, 
  RefreshCw, TrendingUp, Calculator, Target, Shield, Star, BookOpen, Play, Pause, RotateCcw,
  Clock, ExternalLink, ArrowRight, FileText, Cpu, Bot, Brain, Satellite, Network, Cog, Linkedin,
  Menu, X, Home, User, Briefcase, GraduationCap, Contact
} from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  // Real-time data simulation for vehicle diagnostics
  const [realTimeData, setRealTimeData] = useState({
    batterySOC: 78,
    batterySOH: 94,
    batteryTemp: 23,
    motorTemp: 45,
    batteryVoltage: 412,
    motorPower: 18.5,
  });

  // ROI Calculator State
  const [roiInputs, setRoiInputs] = useState({
    serviceTeamSize: 25,
    avgDiagnosticTime: 45,
    escalationRate: 15,
    technicianHourlyRate: 75,
    monthlyVehicleVolume: 500,
  })

  // Navigation items
  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FileText },
    { id: 'capabilities', label: 'Capabilities', icon: Zap },
    { id: 'contact', label: 'Contact', icon: Contact }
  ];

  // Key achievements data
  const achievements = [
    { value: '$6.2M+', label: 'Cost Savings Generated', icon: DollarSign },
    { value: '300+', label: 'Professionals Trained', icon: Users },
    { value: '32K+', label: 'Engineering Escalations Resolved', icon: Code },
    { value: '20+', label: 'Years Multi-Domain Experience', icon: Award },
    { value: '4', label: 'Global Regions Served', icon: Globe },
    { value: '99.99%', label: 'Satellite Uptime Maintained', icon: Zap }
  ]

  // Career timeline
  const companies = [
    { name: 'Evaluate Consulting', role: 'Founder & Multi-Domain Consultant', period: '2024-Present', color: 'from-purple-500 to-blue-500', industry: 'Cross-Industry Consulting' },
    { name: 'Fisker', role: 'Service Product Manager & Engineer', period: '2022-2024', color: 'from-green-500 to-emerald-500', industry: 'Electric Vehicles' },
    { name: 'Rivian', role: 'Diagnostics Engineer', period: '2021-2022', color: 'from-blue-500 to-cyan-500', industry: 'Electric Vehicles' },
    { name: 'Tesla', role: 'Lead Field Remote Diagnostics Engineer', period: '2018-2021', color: 'from-red-500 to-pink-500', industry: 'Electric Vehicles' },
    { name: 'Iridium', role: 'Product Support Engineer', period: '2014-2016', color: 'from-indigo-500 to-purple-500', industry: 'Satellite Communications' },
    { name: 'Verizon', role: 'Technical Consultant', period: '2005-2014', color: 'from-red-600 to-orange-500', industry: 'Telecommunications' }
  ]

  // Featured projects
  const projects = [
    {
      id: 'fisker-fast',
      title: 'Fisker Aftersales Service Tool (FAST)',
      company: 'Fisker',
      period: '2022-2024',
      category: 'Product Development',
      overview: 'Revolutionary diagnostic platform with comprehensive UI/UX design for vehicle communication via CAN/CAN-FD/LIN & UDS protocols.',
      achievements: [
        'Reduced ECU flashing time by 40% (60 to 35 minutes)',
        'Increased diagnostic efficiency by 35%',
        'Saved $2M in supplier costs through RFI/RFP optimization',
        'Led team of 6 engineers globally across India and EU',
        'Complete UI/UX design with intuitive service interface'
      ],
      technologies: ['CAN/CAN-FD', 'LIN', 'UDS', 'OBD', 'UI/UX Design', 'IoT Controls', 'ADAS Calibration'],
      impact: 'Transformed Fisker\'s service operations with industry-leading efficiency gains',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      hasDemo: true
    },
    {
      id: 'tesla-remote',
      title: 'Tesla Remote Diagnostics System',
      company: 'Tesla',
      period: '2018-2021',
      category: 'Remote Diagnostics',
      overview: 'Built world-class remote diagnostic strategies for global service centers covering ADAS, HV/LV systems, infotainment, and body/chassis systems.',
      achievements: [
        'Resolved 32,000+ engineering escalations',
        'Reduced field diagnostic time by 50%',
        'Saved $3M in buyback investigations',
        'Enhanced service readiness across 4 global regions'
      ],
      technologies: ['SSH', 'DoIP', 'Syslog Generation', 'HV Safety Protocols', 'AutoPilot Analysis'],
      impact: 'Revolutionized Tesla\'s global service operations with remote diagnostic capabilities',
      icon: Satellite,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'humanoid-robotics',
      title: '3-Year Humanoid Robotics Service Strategy',
      company: '1X Technologies',
      period: '2024',
      category: 'Strategic Planning',
      overview: 'Comprehensive 3-year service strategy for humanoid robots featuring tiered support infrastructure and ML-powered diagnostics.',
      achievements: [
        'Designed 3-tier service support architecture',
        'Created predictive maintenance strategy using ML algorithms',
        'Established comprehensive KPI framework',
        'Implemented Flying Doctors/Service Partner Networks'
      ],
      technologies: ['ML/AI Algorithms', 'IoT Sensors', 'Cloud Platforms', 'CRM Systems', 'Predictive Analytics'],
      impact: 'Strategic roadmap positioning humanoid robotics service engineering at the forefront of the $66B market',
      icon: Bot,
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        batterySOC: Math.max(20, Math.min(100, prev.batterySOC + (Math.random() - 0.5) * 1)),
        batterySOH: Math.max(85, Math.min(100, prev.batterySOH + (Math.random() - 0.5) * 0.1)),
        batteryTemp: Math.max(15, Math.min(45, prev.batteryTemp + (Math.random() - 0.5) * 2)),
        motorTemp: Math.max(25, Math.min(80, prev.motorTemp + (Math.random() - 0.5) * 3)),
        batteryVoltage: Math.max(350, Math.min(450, prev.batteryVoltage + (Math.random() - 0.5) * 10)),
        motorPower: Math.max(0, Math.min(150, prev.motorPower + (Math.random() - 0.5) * 10))
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // ROI Calculation
  const calculateROI = () => {
    const diagnosticCostPerMonth = roiInputs.monthlyVehicleVolume * (roiInputs.avgDiagnosticTime / 60) * roiInputs.technicianHourlyRate
    const escalationCount = roiInputs.monthlyVehicleVolume * (roiInputs.escalationRate / 100)
    const escalationCostPerMonth = escalationCount * 200
    
    const diagnosticTimeSavings = diagnosticCostPerMonth * 0.4
    const escalationSavings = escalationCostPerMonth * 0.3
    const totalMonthlySavings = diagnosticTimeSavings + escalationSavings
    const annualSavings = totalMonthlySavings * 12
    
    return {
      monthlySavings: totalMonthlySavings,
      annualSavings: annualSavings,
      roi: ((annualSavings - 50000) / 50000) * 100
    }
  }

  const roiResults = calculateROI()
  const currentProject = projects[selectedProject]

  const HomeSection = () => (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-block">
            <div className="relative px-4 py-2 text-sm font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="relative z-10">Multi-Domain Engineering Expert</span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse"></span>
            </div>
          </div>
          
          <div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
              <span className="block text-white">Hi, I'm</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Ahmed Said
              </span>
            </h