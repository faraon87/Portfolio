import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, Code, Zap, Users, DollarSign, Globe, Award, MessageSquare, Phone, Mail, 
  Activity, AlertTriangle, CheckCircle, Thermometer, Battery, Gauge, Settings, Download, 
  RefreshCw, TrendingUp, Calculator, Target, Shield, Star, BookOpen, Play, Pause, RotateCcw,
  Clock, ExternalLink, ArrowRight, FileText, Cpu, Bot, Brain, Satellite, Network, Cog, Linkedin,
  Maximize2, Minimize2
} from 'lucide-react';

const ComprehensivePortfolio = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [subSection, setSubSection] = useState('');
  
  // Vehicle Diagnostics Dashboard State
  const [selectedSystem, setSelectedSystem] = useState('BMS');
  const [isScanning, setIsScanning] = useState(false);
  const [diagnosticData, setDiagnosticData] = useState({});
  const [realTimeData, setRealTimeData] = useState({
    batterySOC: 78,
    batterySOH: 94,
    batteryTemp: 23,
    motorTemp: 45,
    batteryVoltage: 412,
    chargingCurrent: 0,
    motorPower: 18.5,
    energyConsumption: 245,
    hvInsulation: 985,
    coolantTemp: 32
  });

  // ROI Calculator State
  const [inputs, setInputs] = useState({
    serviceTeamSize: 25,
    avgDiagnosticTime: 45,
    escalationRate: 15,
    technicianHourlyRate: 75,
    monthlyVehicleVolume: 500,
    trainingCostPerTech: 2000,
    downtimeHours: 12
  });
  const [results, setResults] = useState({});

  // Training Program State
  const [currentModule, setCurrentModule] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedModules, setCompletedModules] = useState([]);

  // Project Portfolio State
  const [selectedProject, setSelectedProject] = useState(0);
  const [expandedWorkflow, setExpandedWorkflow] = useState(null);

  // Data Definitions
  const achievements = [
    { value: '$6.2M+', label: 'Cost Savings Generated', icon: DollarSign },
    { value: '300+', label: 'Professionals Trained', icon: Users },
    { value: '32K+', label: 'Engineering Escalations Resolved', icon: Code },
    { value: '20+', label: 'Years Multi-Domain Experience', icon: Award },
    { value: '4', label: 'Global Regions Served', icon: Globe },
    { value: '99.99%', label: 'Satellite Uptime Maintained', icon: Zap }
  ];

  // Chronological order of experience
  const companies = [
    { name: 'Verizon', role: 'Technical Consultant', period: '2005-2014', color: 'bg-red-600', industry: 'Telecommunications' },
    { name: 'Iridium', role: 'Product Support Engineer', period: '2014-2016', color: 'bg-indigo-500', industry: 'Satellite Communications' },
    { name: 'Tesla', role: 'Lead Field Remote Diagnostics Engineer', period: '2018-2021', color: 'bg-red-500', industry: 'Electric Vehicles' },
    { name: 'Rivian', role: 'Diagnostics Engineer', period: '2021-2022', color: 'bg-blue-500', industry: 'Electric Vehicles' },
    { name: 'Fisker', role: 'Service Product Manager & Engineer', period: '2022-2024', color: 'bg-green-500', industry: 'Electric Vehicles' },
    { name: 'Evaluate Consulting', role: 'Founder & Multi-Domain Consultant', period: '2024-Present', color: 'bg-purple-500', industry: 'Cross-Industry Consulting' }
  ];

  const impactMetrics = [
    {
      company: 'Tesla',
      achievement: 'Reduced field diagnostic time by 50%',
      impact: '$3M saved in buyback investigations',
      detail: '32K+ engineering escalations resolved'
    },
    {
      company: 'Fisker',
      achievement: 'Reduced ECU flashing time by 40%',
      impact: '$2M saved in supplier costs',
      detail: '35% increase in diagnostic efficiency'
    },
    {
      company: 'Rivian',
      achievement: 'Reduced remote diagnostic response time by 60%',
      impact: '$1.2M saved annually through optimization',
      detail: '25% increase in issue resolution rate'
    },
    {
      company: 'Iridium',
      achievement: 'Ensured 99.99% satellite uptime',
      impact: 'Global commercial & government communications',
      detail: '66 LEO satellite elements managed'
    },
    {
      company: 'Verizon',
      achievement: 'Optimized 500+ cell sites',
      impact: '25% reduction in resolution time',
      detail: '15% reduction in service disruptions'
    },
    {
      company: 'Evaluate Consulting',
      achievement: 'Reduced technical escalations by 30%',
      impact: '50+ service engineers trained',
      detail: '20% improvement in diagnostic workflows'
    }
  ];

  // Enhanced Project Data with Updated Bentley Project
  const projects = [
    {
      id: 'fast-diagnostics',
      title: 'Fisker Aftersales Service Tool Development',
      company: 'Fisker',
      period: '2022-2024',
      category: 'Product Development',
      overview: 'Comprehensive diagnostics tool with UI/UX design for vehicle communication via CAN/CAN-FD/LIN & UDS protocols. Revolutionary diagnostic platform that became the backbone of Fisker\'s service operations.',
      achievements: [
        'Reduced ECU flashing time by 40% (60 to 35 minutes)',
        'Increased diagnostic efficiency by 35%',
        'Saved $2M in supplier costs through streamlined RFI/RFP/RFQ processes',
        'Led team of 6 engineers globally across India and EU',
        'Complete UI/UX design with intuitive service interface',
        'Vehicle overview capability implemented within 60 seconds'
      ],
      technologies: ['CAN/CAN-FD', 'LIN', 'UDS', 'OBD', 'VCI Integration', 'Azure Directory', 'UI/UX Design', 'IoT Controls', 'ADAS Calibration'],
      challenges: [
        'Cross-cultural team management (India & EU)',
        'Complex multi-protocol vehicle communication',
        'Real-time diagnostic data processing',
        'Supplier integration and cost optimization'
      ],
      solutions: [
        'Designed intuitive UI mockups for service diagnostic tool',
        'Implemented vehicle overview capability within 60 seconds',
        'Created full-scale DTC scan with architecture display',
        'Developed intelligent ECU flashing sequence methodology'
      ],
      impact: 'Revolutionary diagnostic tool that transformed Fisker\'s service operations with industry-leading efficiency gains',
      icon: Code,
      color: 'bg-blue-500',
      hasDemo: true
    },
    {
      id: 'humanoid-robotics-vision',
      title: '3-Year Humanoid Robotics Service Engineering Vision',
      company: '1X Technologies (Humanoid Robotics)',
      period: '2024',
      category: 'Strategic Service Planning',
      overview: 'Comprehensive 3-year service strategy for humanoid robots featuring tiered support infrastructure, predictive maintenance algorithms, and ML-powered diagnostics platforming for remote operators and diagnostic technicians. Designed for the $66B humanoid robotics market growing at 45.5% CAGR.',
      
      achievements: [
        'Designed 3-tier service support architecture (Tier 1: Basic Support → Tier 3: Field Engineers)',
        'Established comprehensive KPI framework for humanoid robot fleet management',
        'Created predictive maintenance strategy using ML algorithms and IoT sensors',
        'Developed CRM workflow management system with JIRA integration',
        'Designed regional OTA rollout strategy with homologation compliance',
        'Implemented Flying Doctors/Service Partner Networks for unsupported regions'
      ],
      
      // Service Requirements by Year
      serviceRequirements: {
        year1: {
          title: 'Year 1: Foundation & Hardware Focus',
          description: 'Tier 3 (Field Service Engineers) for hardware failures requiring physical intervention',
          details: [
            'Establish diagnostics stations with mechanical, electrical, and software tools',
            'Create lab checklists for daily, weekly, monthly maintenance',
            'Deploy CRM workflow management system with incident reporting',
            'Knowledge base framework with troubleshooting procedures',
            'Regional OTA rollout strategy development'
          ]
        },
        year2: {
          title: 'Year 2: Advanced Remote Capabilities',
          description: 'Tier 2 (Advanced Technicians) trained for remote diagnostics and complex issue resolution',
          details: [
            'Humanoid robots execute onboard customer training programs',
            'Self-Service Portal for customers to log requests and track status',
            'Threshold alerts trigger automated diagnostics reporting',
            'Integration of lab-setting remote diagnostics into production systems',
            'Predictive analytics for proactive service intervention'
          ]
        },
        year3: {
          title: 'Year 3: Autonomous Service Operations',
          description: 'Tier 1 (Basic Support) with self-service portals and automated resolution',
          details: [
            'ML models deployed for self-diagnosis and resolution of non-HW defects',
            'Humanoid robots conduct automated CSAT and NPS surveys',
            'Real-time CRM integration with Robot Identification Number (RIN) tracking',
            'Hardware engineering refinement using 3 years of predictive failure data',
            'Flying Doctors deployment for global service coverage'
          ]
        }
      },
      
      // Comprehensive KPI Framework
      kpiFramework: {
        reliability: [
          'Mean Time Between Failures (MTBF)',
          'Mean Time to Repair (MTTR)', 
          'Predictive Failure & Maintenance Accuracy Rates',
          'Average Fleet Uptime (Target: 99.5%+)'
        ],
        scalability: [
          'Fleet Health Grading',
          'Service Request Rate',
          'Remote Diagnostics Response Time',
          'Service & Repair Response Time'
        ],
        customerExperience: [
          'Customer Satisfaction (CSAT)',
          'Net Promoter Score (NPS)',
          'First Repair Resolution Rate',
          'Support Ticket Resolution Rate'
        ],
        financial: [
          'Service Cost per Unit',
          'Warranty Claim per Unit Sold',
          'Cost of Ownership per Unit',
          'ROI on Predictive Maintenance Investment'
        ]
      },
      
      technologies: [
        'ML/AI Algorithms for Predictive Failure Analysis',
        'IoT Sensors for Continuous Performance Monitoring', 
        'Cloud Platforms (AWS) for Real-time Data Processing',
        'CRM Systems with JIRA Integration',
        'Predictive Analytics and Dashboard Development',
        'Robot Identification Number (RIN) Tracking System',
        'OTA Update Management with Regional Compliance',
        'Remote Diagnostics with Python-enabled SSH Access'
      ],
      
      challenges: [
        'Defining service requirements for emerging humanoid robotics technology',
        'Balancing automation with human intervention across 3-tier support',
        'Creating scalable support infrastructure for global deployment',
        'Establishing measurable success metrics for unprecedented technology',
        'Regional compliance and homologation for OTA updates',
        'Cross-functional collaboration between service and engineering teams'
      ],
      
      solutions: [
        'Phased 3-year implementation with clear tier progression',
        'ML-powered predictive maintenance preventing 80% of failures',
        'Semi-automated feedback loops with intelligent ticket creation',
        'Regional service partner certification for global coverage',
        'Continuous data collection for service strategy refinement',
        'Bi-weekly organization-wide collaboration sessions'
      ],
      
      impact: 'Strategic roadmap positioning humanoid robotics service engineering at the forefront of the $66B market, with framework adaptable across robotics, automotive, and IoT industries',
      icon: Bot,
      color: 'bg-purple-500'
    },
    {
      id: 'bentley-apac-product-support',
      title: 'Bentley APAC, Product Support Planning',
      company: 'Bentley Motors APAC',
      period: '2024',
      category: 'Strategic Operations',
      overview: 'Comprehensive technical service workflow transformation for Bentley APAC, implementing pre-delivery engineering diagnostics, post-delivery service strategy, and cost reduction methodologies for luxury automotive operations.',
      achievements: [
        'Implemented pre-delivery engineering level diagnostics framework',
        'Developed post-delivery service strategy and execution procedures',
        'Created cost reduction methodologies for luxury vehicle operations',
        'Established product support management workflows and processes',
        'Designed systematic issue prioritization based on impact and brand reputation',
        'Implemented cross-functional collaboration protocols'
      ],
      technologies: ['Diagnostic Systems', 'Process Management', 'Cost Analysis Tools', 'Quality Control Systems', 'Workflow Automation', 'Performance Analytics'],
      challenges: [
        'Complex luxury vehicle systems requiring specialized diagnostics',
        'Brand reputation impact considerations for high-end market',
        'Integration of pre-delivery and post-delivery service strategies',
        'Cost optimization while maintaining luxury service standards',
        'Cross-functional team coordination across APAC region',
        'Establishing measurable quality and efficiency metrics'
      ],
      solutions: [
        'Systematic pre-delivery diagnostic protocols ensuring quality standards',
        'Integrated service strategy covering entire vehicle lifecycle',
        'Cost reduction methodologies preserving luxury experience',
        'Streamlined workflows optimizing operational efficiency',
        'Cross-functional collaboration frameworks for seamless execution',
        'Performance tracking and continuous improvement processes'
      ],
      impact: 'Transformed Bentley APAC product support operations with comprehensive management procedures, enhancing quality assurance and operational efficiency for luxury automotive market',
      icon: Settings,
      color: 'bg-orange-500'
    }
  ];

  // Combined Technology Convergence Capabilities
  const convergenceCapabilities = [
    {
      title: 'Cross-Domain Diagnostic Systems',
      description: 'Advanced diagnostic protocols spanning automotive ECUs, satellite networks, and telecommunications infrastructure with 20+ years of proven expertise.',
      keyMetrics: [
        '40% faster ECU flashing (Fisker)',
        '99.99% satellite uptime (Iridium)', 
        '25% faster network troubleshooting (Verizon)',
        '35% diagnostic efficiency gains across platforms'
      ],
      technologies: ['CAN/CAN-FD', 'UDS', 'ISO Protocols', 'Satellite Operations', 'RF Analysis', 'Remote Diagnostics'],
      industries: ['Automotive', 'Satellite Communications', 'Telecommunications'],
      icon: Activity,
      color: 'bg-blue-500'
    },
    {
      title: 'Global Technical Leadership',
      description: 'Proven leadership across Tesla, Rivian, Fisker, Iridium, and Verizon with expertise in managing cross-cultural teams and complex technical projects.',
      keyMetrics: [
        '300+ professionals trained globally',
        'Teams across India, EU, and US',
        '$6.2M+ in documented cost savings',
        '6 direct reports in latest role'
      ],
      technologies: ['Agile', 'JIRA', 'Cross-Cultural Management', 'Technical Training', 'Stakeholder Alignment'],
      industries: ['Multi-Industry Leadership'],
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Advanced Service Engineering',
      description: 'Strategic service engineering for emerging technologies including humanoid robotics, predictive maintenance, and IoT-enabled diagnostics.',
      keyMetrics: [
        '3-year strategic service visions',
        'ML-powered failure prediction systems',
        'Comprehensive KPI frameworks',
        'Cost analysis across multiple domains'
      ],
      technologies: ['ML/AI Integration', 'IoT Sensors', 'Predictive Analytics', 'CRM Systems', 'Dashboard Development'],
      industries: ['Robotics', 'Automotive', 'Industrial IoT'],
      icon: Brain,
      color: 'bg-purple-500'
    },
    {
      title: 'Technology Integration Strategy',
      description: 'Unique expertise in bridging automotive, telecommunications, and satellite technologies for next-generation applications and connected systems.',
      keyMetrics: [
        'Cross-industry technology roadmaps',
        'Connected vehicle ecosystem design',
        'Satellite-terrestrial integration',
        'Multi-domain systems architecture'
      ],
      technologies: ['Systems Integration', 'Cloud Platforms', 'OTA Updates', 'Connected Vehicle Tech'],
      industries: ['Technology Convergence'],
      icon: Network,
      color: 'bg-orange-500'
    }
  ];

  // EV Diagnostic Systems
  const evSystems = [
    { id: 'BMS', name: 'Battery Management System', status: 'healthy', alerts: 0, description: 'SOC, SOH, Cell Balancing' },
    { id: 'Motor', name: 'Motor Control Unit', status: 'healthy', alerts: 0, description: 'Torque, Speed, Efficiency' },
    { id: 'Charging', name: 'Charging System', status: 'charging', alerts: 0, description: 'AC/DC Charging, Power Management' },
    { id: 'Thermal', name: 'Thermal Management', status: 'warning', alerts: 1, description: 'Battery & Motor Cooling' },
    { id: 'HV', name: 'High Voltage System', status: 'healthy', alerts: 0, description: 'Insulation, Safety, Distribution' },
    { id: 'Energy', name: 'Energy Management', status: 'healthy', alerts: 0, description: 'Consumption, Regeneration, Range' }
  ];

  // Training modules data
  const trainingModules = [
    {
      id: 1,
      title: 'EV Diagnostics Fundamentals',
      duration: '4 hours',
      topics: ['CAN/UDS Protocols', 'Battery Management', 'Motor Control', 'Safety Systems'],
      learningObjectives: [
        'Understand EV diagnostic protocols and communication systems',
        'Master battery management system diagnostics and health monitoring',
        'Apply motor control diagnostics and performance optimization'
      ],
      practicalLab: 'Hands-on FAST diagnostic tool demonstration',
      assessment: 'Real-world EV diagnostic scenario analysis'
    },
    {
      id: 2,
      title: 'Remote Diagnostics & Troubleshooting',
      duration: '6 hours',
      topics: ['Remote Access', 'Cloud Diagnostics', 'Predictive Maintenance', 'Data Analysis'],
      learningObjectives: [
        'Implement secure remote diagnostic connections',
        'Analyze diagnostic data for predictive maintenance',
        'Develop troubleshooting workflows for complex systems'
      ],
      practicalLab: 'Tesla/Rivian remote diagnostic simulation',
      assessment: 'Remote troubleshooting case study completion'
    },
    {
      id: 3,
      title: 'Cross-Platform Integration',
      duration: '8 hours',
      topics: ['Multi-Brand Diagnostics', 'Protocol Translation', 'System Integration', 'Global Standards'],
      learningObjectives: [
        'Navigate different manufacturer diagnostic systems',
        'Translate between various communication protocols',
        'Integrate diagnostic solutions across platforms'
      ],
      practicalLab: 'Multi-brand diagnostic tool comparison workshop',
      assessment: 'Cross-platform integration project'
    }
  ];

  // Simulation functions
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        batterySOC: Math.max(20, Math.min(100, prev.batterySOC + (Math.random() - 0.5) * 1)),
        batterySOH: Math.max(85, Math.min(100, prev.batterySOH + (Math.random() - 0.5) * 0.1)),
        batteryTemp: Math.max(15, Math.min(45, prev.batteryTemp + (Math.random() - 0.5) * 2)),
        motorTemp: Math.max(25, Math.min(80, prev.motorTemp + (Math.random() - 0.5) * 3)),
        batteryVoltage: Math.max(350, Math.min(450, prev.batteryVoltage + (Math.random() - 0.5) * 10)),
        chargingCurrent: prev.batterySOC < 95 ? Math.max(0, Math.min(50, prev.chargingCurrent + (Math.random() - 0.5) * 5)) : 0,
        motorPower: Math.max(0, Math.min(150, prev.motorPower + (Math.random() - 0.5) * 10)),
        energyConsumption: Math.max(150, Math.min(350, prev.energyConsumption + (Math.random() - 0.5) * 20)),
        hvInsulation: Math.max(900, Math.min(1000, prev.hvInsulation + (Math.random() - 0.5) * 5)),
        coolantTemp: Math.max(20, Math.min(50, prev.coolantTemp + (Math.random() - 0.5) * 2))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // ROI calculation - original version
  useEffect(() => {
    const calculateROI = () => {
      // Labor costs
      const laborCostPerMonth = inputs.serviceTeamSize * inputs.technicianHourlyRate * 160; // 160 hours/month
      
      // Diagnostic time costs
      const diagnosticTimePerMonth = inputs.monthlyVehicleVolume * (inputs.avgDiagnosticTime / 60);
      const diagnosticCostPerMonth = diagnosticTimePerMonth * inputs.technicianHourlyRate;
      
      // Escalation costs
      const escalationCount = inputs.monthlyVehicleVolume * (inputs.escalationRate / 100);
      const escalationCostPerMonth = escalationCount * 200; // $200 per escalation
      
      // Downtime costs
      const downtimeCostPerMonth = inputs.downtimeHours * inputs.technicianHourlyRate * inputs.serviceTeamSize;
      
      const totalCurrentCosts = laborCostPerMonth + diagnosticCostPerMonth + escalationCostPerMonth + downtimeCostPerMonth;
      
      // Savings calculations based on proven improvements
      const diagnosticTimeSavings = diagnosticCostPerMonth * 0.4; // 40% improvement
      const escalationSavings = escalationCostPerMonth * 0.3; // 30% reduction
      const downtimeSavings = downtimeCostPerMonth * 0.25; // 25% reduction
      
      const totalMonthlySavings = diagnosticTimeSavings + escalationSavings + downtimeSavings;
      const annualSavings = totalMonthlySavings * 12;
      
      // Training investment
      const trainingInvestment = inputs.serviceTeamSize * inputs.trainingCostPerTech;
      
      // ROI calculation
      const roi = ((annualSavings - trainingInvestment) / trainingInvestment) * 100;
      const paybackMonths = trainingInvestment / totalMonthlySavings;
      
      setResults({
        currentMonthlyCosts: totalCurrentCosts,
        monthlySavings: totalMonthlySavings,
        annualSavings: annualSavings,
        trainingInvestment: trainingInvestment,
        roi: roi,
        paybackMonths: paybackMonths,
        diagnosticTimeSavings: diagnosticTimeSavings,
        escalationSavings: escalationSavings,
        downtimeSavings: downtimeSavings
      });
    };

    calculateROI();
  }, [inputs]);

  // Helper functions
  const formatNumber = (num) => new Intl.NumberFormat().format(Math.round(num));
  const formatCurrency = (num) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setDiagnosticData({
        scanTime: new Date().toLocaleTimeString(),
        vehicleStatus: 'Connected',
        totalSystems: 6,
        healthySystems: 5,
        systemsWithAlerts: 1
      });
      setIsScanning(false);
    }, 3000);
  };

  const handleTrainingProgress = () => {
    if (isPlaying) {
      const newProgress = Math.min(progress + 2, 100);
      setProgress(newProgress);
      if (newProgress === 100) {
        setCompletedModules([...completedModules, currentModule]);
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(handleTrainingProgress, 100);
    return () => clearInterval(interval);
  }, [isPlaying, progress]);

  const currentModuleData = trainingModules[currentModule] || trainingModules[0];
  const currentProject = projects[selectedProject];

  // Navigation sections - back to top layout
  const navigationSections = [
    { id: 'overview', label: 'Overview', icon: Award },
    { id: 'projects', label: 'Project Portfolio', icon: FileText },
    { id: 'roi-calculator', label: 'ROI Calculator', icon: Calculator },
    { id: 'training', label: 'Training Program', icon: BookOpen },
    { id: 'consulting', label: 'Consulting', icon: MessageSquare }
  ];

  // Render functions for each section
  const renderOverview = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Ahmed Said</h1>
        <p className="text-xl text-gray-600 mb-2">Global Technical Solutions Leader</p>
        <p className="text-lg text-gray-500">2 Decades of Multi-Domain Engineering Expertise</p>
        <p className="text-md text-gray-400 mt-2">Automotive • Telecommunications • Satellite Communications</p>
        <div className="flex justify-center gap-4 mt-6">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            <Phone size={20} />
            +1 (602) 402-2505
          </button>
          <a 
            href="mailto:ahmed.osaid.pro@gmail.com"
            className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Mail size={20} />
            ahmed.osaid.pro@gmail.com
          </a>
          <a 
            href="https://www.linkedin.com/in/ahmedosaid/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
          >
            <Linkedin size={20} />
            LinkedIn
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow">
            <achievement.icon size={32} className="text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 mb-1">{achievement.value}</div>
            <div className="text-sm text-gray-600">{achievement.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Multi-Domain Experience</h3>
          <div className="space-y-4">
            {companies.map((company, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${company.color}`}></div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{company.name}</div>
                  <div className="text-sm text-gray-600">{company.role}</div>
                  <div className="text-xs text-gray-500">{company.period} • {company.industry}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Core Technology Capabilities</h3>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="font-semibold text-gray-900 flex items-center gap-2">
                <Activity size={16} />
                Advanced Diagnostic Systems
              </div>
              <div className="text-sm text-gray-600 mt-1">Cross-domain protocols spanning automotive ECUs, satellite networks, and telecom infrastructure</div>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <div className="font-semibold text-gray-900 flex items-center gap-2">
                <Users size={16} />
                Global Technical Leadership
              </div>
              <div className="text-sm text-gray-600 mt-1">Cross-cultural team management with 300+ professionals trained across multiple industries</div>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <div className="font-semibold text-gray-900 flex items-center gap-2">
                <Bot size={16} />
                Emerging Technology Strategy
              </div>
              <div className="text-sm text-gray-600 mt-1">Service engineering for humanoid robotics and AI-powered predictive maintenance systems</div>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <div className="font-semibold text-gray-900 flex items-center gap-2">
                <Network size={16} />
                Technology Integration
              </div>
              <div className="text-sm text-gray-600 mt-1">Bridging automotive, telecommunications, and satellite technologies for connected systems</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl">
        <h3 className="text-2xl font-bold mb-4">Industry Leadership in Technology Convergence</h3>
        <p className="text-lg mb-6">
          Uniquely positioned at the intersection of automotive diagnostics, telecommunications infrastructure, and satellite communications - 
          exactly where the biggest opportunities exist in connected vehicles, robotics, and next-generation wireless networks.
        </p>
        <div className="grid md:grid-cols-4 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold">Fast Growth</div>
            <div className="text-sm">Robotics Market</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">High Demand</div>
            <div className="text-sm">Engineering Talent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">Expanding</div>
            <div className="text-sm">Predictive Maintenance</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">Growing</div>
            <div className="text-sm">Connected Systems</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Technology Convergence Expertise</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {convergenceCapabilities.map((capability, index) => (
            <div key={index} className="border border-gray-200 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${capability.color}`}>
                  <capability.icon size={20} className="text-white" />
                </div>
                <h4 className="font-semibold text-gray-900">{capability.title}</h4>
              </div>
              <p className="text-gray-600 text-sm mb-4">{capability.description}</p>
              
              <div className="mb-4">
                <h5 className="font-semibold text-gray-900 mb-2 text-sm">Key Achievements</h5>
                <ul className="space-y-1">
                  {capability.keyMetrics.map((metric, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                      <ChevronRight size={12} className="text-green-500" />
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-4">
                <h5 className="font-semibold text-gray-900 mb-2 text-sm">Technologies</h5>
                <div className="flex flex-wrap gap-1">
                  {capability.technologies.slice(0, 4).map((tech, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                  {capability.technologies.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      +{capability.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 mb-2 text-sm">Industries</h5>
                <div className="flex flex-wrap gap-1">
                  {capability.industries.map((industry, idx) => (
                    <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVehicleDiagnostics = () => (
    <div className="bg-gray-900 text-white p-6 rounded-lg mb-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold mb-2">Vehicle Diagnostics Dashboard</h3>
            <p className="text-gray-400">Real-time EV diagnostics and system monitoring - FAST Tool Interface</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleScan}
              disabled={isScanning}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              <RefreshCw className={isScanning ? 'animate-spin' : ''} size={18} />
              {isScanning ? 'Scanning...' : 'System Scan'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Battery className="text-green-400" size={20} />
              <span className="text-sm text-gray-400">SOC</span>
            </div>
            <div className="text-xl font-bold">{realTimeData.batterySOC.toFixed(1)}%</div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="text-blue-400" size={20} />
              <span className="text-sm text-gray-400">SOH</span>
            </div>
            <div className="text-xl font-bold">{realTimeData.batterySOH.toFixed(1)}%</div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="text-yellow-400" size={20} />
              <span className="text-sm text-gray-400">HV</span>
            </div>
            <div className="text-xl font-bold">{realTimeData.batteryVoltage.toFixed(0)}V</div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="text-orange-400" size={20} />
              <span className="text-sm text-gray-400">Temp</span>
            </div>
            <div className="text-xl font-bold">{realTimeData.batteryTemp.toFixed(0)}°C</div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Gauge className="text-purple-400" size={20} />
              <span className="text-sm text-gray-400">Power</span>
            </div>
            <div className="text-xl font-bold">{realTimeData.motorPower.toFixed(1)}kW</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-lg font-bold mb-4">EV System Status</h4>
            <div className="space-y-3">
              {evSystems.map((system) => (
                <div
                  key={system.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedSystem === system.id ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  onClick={() => setSelectedSystem(system.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-sm">{system.name}</div>
                      <div className="text-xs text-gray-400">{system.description}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {system.status === 'healthy' && <CheckCircle className="text-green-400" size={16} />}
                      {system.status === 'warning' && <AlertTriangle className="text-yellow-400" size={16} />}
                      {system.status === 'charging' && <Zap className="text-blue-400" size={16} />}
                      <span className="text-xs">{system.alerts} alerts</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-lg font-bold mb-4">Advanced Diagnostics</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-cyan-400">{realTimeData.energyConsumption.toFixed(0)}</div>
                  <div className="text-xs text-gray-400">Wh/km</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400">{realTimeData.hvInsulation.toFixed(0)}</div>
                  <div className="text-xs text-gray-400">MΩ Insulation</div>
                </div>
              </div>
              
              <div className="border-t border-gray-600 pt-4">
                <div className="text-sm text-gray-300 mb-2">Battery Cell Balance</div>
                <div className="grid grid-cols-8 gap-1">
                  {Array.from({length: 8}, (_, i) => (
                    <div key={i} className="h-6 bg-green-500 rounded-sm opacity-90"></div>
                  ))}
                </div>
              </div>

              {diagnosticData.scanTime && (
                <div className="border-t border-gray-600 pt-4">
                  <div className="text-sm text-gray-300 mb-2">Latest Scan Results</div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg font-bold text-green-400">{diagnosticData.healthySystems}</div>
                      <div className="text-xs text-gray-400">Healthy</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-yellow-400">{diagnosticData.systemsWithAlerts}</div>
                      <div className="text-xs text-gray-400">Alerts</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-400">{diagnosticData.totalSystems}</div>
                      <div className="text-xs text-gray-400">Total</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mt-2">Scan: {diagnosticData.scanTime}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Portfolio</h1>
        <p className="text-xl text-gray-600">Comprehensive showcase of multi-domain engineering excellence and strategic innovation</p>
        <p className="text-lg text-gray-500 mt-2">Ahmed Said - 2 Decades Spanning Automotive • Telecommunications • Satellite Communications</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Featured Projects</h3>
          <div className="space-y-3">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedProject === index 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedProject(index)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${selectedProject === index ? 'bg-blue-500' : project.color}`}>
                    <project.icon size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{project.title}</div>
                    <div className="text-xs opacity-75">{project.company} • {project.period}</div>
                  </div>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  selectedProject === index 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {project.category}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-3 rounded-lg ${currentProject.color}`}>
              <currentProject.icon size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{currentProject.title}</h2>
              <p className="text-gray-600">{currentProject.company} • {currentProject.period}</p>
            </div>
          </div>

          {/* Vehicle Diagnostics Dashboard Demo */}
          {currentProject.hasDemo && renderVehicleDiagnostics()}

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Overview</h3>
            <p className="text-gray-600 leading-relaxed">{currentProject.overview}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Achievements</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {currentProject.achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <ChevronRight size={16} className="text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{achievement}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Special rendering for Humanoid Robotics Vision project */}
          {currentProject.id === 'humanoid-robotics-vision' && (
            <>
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Requirements Evolution</h3>
                <div className="grid gap-4">
                  {Object.values(currentProject.serviceRequirements).map((year, index) => (
                    <div key={index} className="border border-gray-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">{year.title}</h4>
                      <p className="text-gray-600 text-sm mb-3">{year.description}</p>
                      <ul className="space-y-1">
                        {year.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <ChevronRight size={12} className="text-blue-500 mt-1 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Comprehensive KPI Framework</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(currentProject.kpiFramework).map(([category, kpis]) => (
                    <div key={category} className="border border-gray-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 text-sm mb-3 capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</h4>
                      <ul className="space-y-2">
                        {kpis.map((kpi, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <Target size={12} className="text-purple-500 mt-1 flex-shrink-0" />
                            {kpi}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Technologies & Tools</h3>
            <div className="flex flex-wrap gap-2">
              {currentProject.technologies.map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Challenges & Solutions</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-red-700 mb-3">Challenges</h4>
                <ul className="space-y-2">
                  {currentProject.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <AlertTriangle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-3">Solutions</h4>
                <ul className="space-y-2">
                  {currentProject.solutions.map((solution, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      {solution}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Impact</h3>
            <p className="text-gray-700">{currentProject.impact}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderROICalculator = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">ROI Calculator</h1>
        <p className="text-xl text-gray-600">Calculate the return on investment for advanced diagnostic training and process optimization</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Input Parameters</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Team Size</label>
              <input
                type="number"
                value={inputs.serviceTeamSize}
                onChange={(e) => setInputs({...inputs, serviceTeamSize: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Diagnostic Time (minutes)</label>
              <input
                type="number"
                value={inputs.avgDiagnosticTime}
                onChange={(e) => setInputs({...inputs, avgDiagnosticTime: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Escalation Rate (%)</label>
              <input
                type="number"
                value={inputs.escalationRate}
                onChange={(e) => setInputs({...inputs, escalationRate: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Technician Hourly Rate ($)</label>
              <input
                type="number"
                value={inputs.technicianHourlyRate}
                onChange={(e) => setInputs({...inputs, technicianHourlyRate: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Vehicle Volume</label>
              <input
                type="number"
                value={inputs.monthlyVehicleVolume}
                onChange={(e) => setInputs({...inputs, monthlyVehicleVolume: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Training Cost per Technician ($)</label>
              <input
                type="number"
                value={inputs.trainingCostPerTech}
                onChange={(e) => setInputs({...inputs, trainingCostPerTech: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Downtime Hours</label>
              <input
                type="number"
                value={inputs.downtimeHours}
                onChange={(e) => setInputs({...inputs, downtimeHours: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Return on Investment</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Training Investment</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(results.trainingInvestment || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Monthly Savings</span>
                <span className="font-semibold text-green-600">
                  {formatCurrency(results.monthlySavings || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Annual Savings</span>
                <span className="font-semibold text-green-600">
                  {formatCurrency(results.annualSavings || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center border-t pt-3">
                <span className="text-gray-600 font-semibold">ROI</span>
                <span className="font-bold text-green-600 text-lg">
                  {(results.roi || 0).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Payback Period</span>
                <span className="font-semibold text-green-600">
                  {(results.paybackMonths || 0).toFixed(1)} months
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Savings Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Diagnostic Time Savings</span>
                <span className="font-semibold text-blue-600">
                  {formatCurrency(results.diagnosticTimeSavings || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Escalation Reduction</span>
                <span className="font-semibold text-blue-600">
                  {formatCurrency(results.escalationSavings || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Downtime Reduction</span>
                <span className="font-semibold text-blue-600">
                  {formatCurrency(results.downtimeSavings || 0)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Monthly Costs</h3>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(results.currentMonthlyCosts || 0)}
              </div>
              <div className="text-sm text-gray-600">Total operational costs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTraining = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Automotive Training Program</h1>
        <p className="text-xl text-gray-600">Advanced EV Diagnostics & Protocol Training</p>
        <p className="text-lg text-gray-500 mt-2">Tailored training programs - 300+ Professionals Trained Globally</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Training Modules</h3>
          <div className="space-y-3">
            {trainingModules.map((module, index) => (
              <div
                key={module.id}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  currentModule === index 
                    ? 'bg-blue-600 text-white' 
                    : completedModules.includes(index)
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => {
                  setCurrentModule(index);
                  setProgress(0);
                  setIsPlaying(false);
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{module.title}</div>
                    <div className="text-sm opacity-75">{module.duration}</div>
                  </div>
                  {completedModules.includes(index) && (
                    <CheckCircle size={20} className="text-green-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">{currentModuleData.title}</h3>
            <div className="text-sm text-gray-500">{currentModuleData.duration}</div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm text-gray-500">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{width: `${progress}%`}}
              ></div>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                isPlaying 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              {isPlaying ? 'Pause' : 'Start'} Training
            </button>
            <button
              onClick={() => {
                setProgress(0);
                setIsPlaying(false);
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-gray-600 hover:bg-gray-700 text-white transition-colors"
            >
              <RotateCcw size={20} />
              Reset
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Topics Covered</h4>
              <div className="grid grid-cols-2 gap-2">
                {currentModuleData.topics.map((topic, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    {topic}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Learning Objectives</h4>
              <ul className="space-y-1">
                {currentModuleData.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <Target size={16} className="text-green-500 mt-0.5" />
                    {objective}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-sm text-green-600 font-semibold">Practical Lab</div>
                <div className="text-sm text-gray-600">{currentModuleData.practicalLab}</div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm text-blue-600 font-semibold">Assessment</div>
                <div className="text-sm text-gray-600">{currentModuleData.assessment}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConsulting = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Evaluate Consulting</h2>
        <p className="text-gray-600">Bespoke engineering support for automotive service networks globally</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <Globe size={32} />
            <h3 className="text-2xl font-bold">Global Engineering Excellence</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Advanced Automotive Diagnostics</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Embedded Software Validation</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Remote Troubleshooting Solutions</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Process Automation & Optimization</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Service Portfolio</h3>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-900">Technical Training & Development</h4>
              <p className="text-sm text-gray-600 mt-1">50+ service engineers trained across multiple clients on advanced diagnostic protocols</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-gray-900">Service Network Consulting</h4>
              <p className="text-sm text-gray-600 mt-1">Technical consultations enabling adequate diagnostic services for customer networks</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-gray-900">Process Automation</h4>
              <p className="text-sm text-gray-600 mt-1">20% reduction in software update failures through improved diagnostic workflows</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-semibold text-gray-900">Global Team Leadership</h4>
              <p className="text-sm text-gray-600 mt-1">Managed development teams across North America, APAC, and EU, fostering cross-cultural collaboration</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Proven Results</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">30%</div>
            <div className="text-gray-600">Technical Escalation Reduction</div>
            <div className="text-sm text-gray-500 mt-1">Through advanced diagnostic training and process optimization</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
            <div className="text-gray-600">Engineers Trained</div>
            <div className="text-sm text-gray-500 mt-1">Across multiple clients in automotive diagnostics and troubleshooting</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">20%</div>
            <div className="text-gray-600">Workflow Improvement</div>
            <div className="text-sm text-gray-500 mt-1">Enhanced system performance through process automation</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Operations?</h3>
        <p className="text-lg mb-6">Let's discuss how 20+ years of engineering expertise can benefit your organization today</p>
        <div className="flex justify-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Phone size={20} />
            <span>+1 (602) 402-2505</span>
          </div>
          <a 
            href="mailto:ahmed.osaid.pro@gmail.com"
            className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
          >
            <Mail size={20} />
            <span>ahmed.osaid.pro@gmail.com</span>
          </a>
          <a 
            href="https://www.linkedin.com/in/ahmedosaid/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
          >
            <Linkedin size={20} />
            <span>LinkedIn</span>
          </a>
        </div>
        <p className="text-sm opacity-90">
          Ahmed Said - Global Technical Solutions Leader | $6.2M+ in Documented Savings | 300+ Professionals Trained Globally
        </p>
      </div>
    </div>
  );

  // Main component render - Back to top navigation layout
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto">
          <nav className="flex flex-wrap gap-2 p-4">
            {navigationSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === section.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <section.icon size={18} />
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="transition-all duration-300">
          {activeSection === 'overview' && renderOverview()}
          {activeSection === 'projects' && renderProjects()}
          {activeSection === 'roi-calculator' && renderROICalculator()}
          {activeSection === 'training' && renderTraining()}
          {activeSection === 'consulting' && renderConsulting()}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-8 mt-12">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Operations?</h3>
          <p className="text-gray-300 mb-6">Let's discuss how 20+ years of multi-domain engineering expertise can benefit your organization</p>
          <div className="flex justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Phone size={20} />
              <span>+1 (602) 402-2505</span>
            </div>
            <a 
              href="mailto:ahmed.osaid.pro@gmail.com"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Mail size={20} />
              <span>ahmed.osaid.pro@gmail.com</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/ahmedosaid/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
          </div>
          <p className="text-sm text-gray-400">
            Ahmed Said - Global Technical Solutions Leader | $6.2M+ in Documented Savings | 300+ Professionals Trained Globally
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ComprehensivePortfolio;
