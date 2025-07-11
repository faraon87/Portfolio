import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, Code, Zap, Users, DollarSign, Globe, Award, MessageSquare, Phone, Mail, 
  Activity, AlertTriangle, CheckCircle, Thermometer, Battery, Gauge, Settings, Download, 
  RefreshCw, TrendingUp, Calculator, Target, Shield, Star, BookOpen, Play, Pause, RotateCcw,
  Clock, ExternalLink, ArrowRight, FileText, Cpu
} from 'lucide-react';

const ComprehensivePortfolio = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [subSection, setSubSection] = useState('');
  
  // Diagnostics Dashboard State
  const [selectedECU, setSelectedECU] = useState('VCU');
  const [isScanning, setIsScanning] = useState(false);
  const [diagnosticData, setDiagnosticData] = useState({});
  const [realTimeData, setRealTimeData] = useState({
    batteryTemp: 23,
    motorTemp: 45,
    batteryLevel: 78,
    voltage: 412,
    current: 45,
    power: 18.5
  });

  // ROI Calculator State
  const [inputs, setInputs] = useState({
    serviceTeamSize: 25,
    avgDiagnosticTime: 45,
    escalationRate: 15,
    technicianHourlyRate: 75,
    monthlyVehicleVolume: 500,
    trainingCostPerTech: 2000,
    downtime: 12
  });
  const [results, setResults] = useState({});

  // Training Program State
  const [currentModule, setCurrentModule] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedModules, setCompletedModules] = useState([]);

  // SWOT Analysis State
  const [activeQuadrant, setActiveQuadrant] = useState('strengths');

  // Project Portfolio State
  const [selectedProject, setSelectedProject] = useState(0);

  // Data definitions
  const achievements = [
    { value: '$6.2M+', label: 'Cost Savings Generated', icon: DollarSign },
    { value: '300+', label: 'Professionals Trained', icon: Users },
    { value: '32K+', label: 'Engineering Escalations Resolved', icon: Code },
    { value: '20+', label: 'Years Experience', icon: Award },
    { value: '4', label: 'Global Regions Served', icon: Globe },
    { value: '99.99%', label: 'Satellite Uptime Maintained', icon: Zap }
  ];

  const companies = [
    { name: 'Tesla', role: 'Lead Field Remote Diagnostics Engineer', period: '2018-2021', color: 'bg-red-500' },
    { name: 'Rivian', role: 'Diagnostics Engineer', period: '2021-2022', color: 'bg-blue-500' },
    { name: 'Fisker', role: 'Service Product Manager & Engineer', period: '2022-2024', color: 'bg-green-500' },
    { name: 'Evaluate Consulting', role: 'Automotive Consultant & Founder', period: '2024-Present', color: 'bg-purple-500' }
  ];

  const capabilities = [
    {
      title: 'EV Diagnostics & Product Management',
      description: 'Advanced diagnostic protocols, ECU debugging, remote troubleshooting, UI/UX design',
      metrics: ['40% faster ECU flashing', '60% faster remote diagnostics', '35% better efficiency'],
      technologies: ['CAN/CAN FD', 'DoIP', 'UDS', 'ISO 24089/15765/13400', 'Azure Directory', 'VCI Integration'],
      projects: ['FAST Tool Development at Fisker', 'RivianOS Cloud Diagnostics', 'Tesla Remote Diagnostics']
    },
    {
      title: 'Cross-Cultural Team Leadership',
      description: 'Global team management, cultural diversity leadership, cross-industry collaboration',
      metrics: ['Teams in India & EU', 'Global dev collaboration', 'Cross-functional leadership'],
      technologies: ['Agile', 'JIRA', 'Confluence', 'Stakeholder Management'],
      projects: ['Multi-region diagnostic tool development', 'Supplier negotiations with Magna Steyr, LEAR, CATL']
    },
    {
      title: 'Service Engineering & Process Optimization',
      description: 'PDI issue management, workflow design, predictive maintenance, SWOT analysis',
      metrics: ['Systematic issue prioritization', 'Cross-functional collaboration', 'KPI-driven solutions'],
      technologies: ['CRM Systems', 'Dashboard Development', 'Process Automation', 'ML/AI Integration'],
      projects: ['Bentayga PDI Management', 'Humanoid Robot Service Strategy', 'Troubleshooting Workflow Design']
    },
    {
      title: 'Strategic Vision & Innovation',
      description: 'Long-term service strategies, technology roadmaps, business development',
      metrics: ['3-year service vision', '6-month implementation roadmaps', 'Predictive analytics integration'],
      technologies: ['Cloud Platforms (AWS)', 'IoT Sensors', 'Predictive Analytics', 'OTA Updates'],
      projects: ['3-Year Service Engineering Vision', 'Short-term Humanoid Robot Strategy', 'SUMS-compliant methodologies']
    }
  ];

  // ECU and diagnostic data
  const ecus = [
    { id: 'VCU', name: 'Vehicle Control Unit', status: 'healthy', dtcs: 0 },
    { id: 'BMS', name: 'Battery Management System', status: 'warning', dtcs: 1 },
    { id: 'MCU', name: 'Motor Control Unit', status: 'healthy', dtcs: 0 },
    { id: 'ADAS', name: 'Advanced Driver Assistance', status: 'error', dtcs: 2 },
    { id: 'HVAC', name: 'Climate Control', status: 'healthy', dtcs: 0 },
    { id: 'TCU', name: 'Telematics Control Unit', status: 'healthy', dtcs: 0 }
  ];

  const protocols = [
    { name: 'CAN', status: 'active', traffic: '87%' },
    { name: 'CAN FD', status: 'active', traffic: '92%' },
    { name: 'DoIP', status: 'active', traffic: '45%' },
    { name: 'UDS', status: 'active', traffic: '78%' }
  ];

  const dtcCodes = [
    { code: 'P0A80', description: 'Replace Hybrid Battery Pack', severity: 'critical', ecu: 'BMS' },
    { code: 'B1A00', description: 'Camera System Malfunction', severity: 'warning', ecu: 'ADAS' },
    { code: 'U0100', description: 'Lost Communication with ECM', severity: 'error', ecu: 'ADAS' }
  ];

  // Training modules
  const trainingModules = [
    {
      id: 1,
      title: 'CAN Bus Fundamentals',
      duration: '2 hours',
      difficulty: 'Beginner',
      topics: ['CAN Protocol Basics', 'Message Format', 'Arbitration', 'Error Handling'],
      learningObjectives: [
        'Understand CAN bus architecture',
        'Identify message types and formats',
        'Troubleshoot common CAN issues'
      ],
      practicalLab: 'CAN Bus Analyzer Lab',
      assessment: 'Protocol Analysis Quiz'
    },
    {
      id: 2,
      title: 'Diagnostic over IP (DoIP)',
      duration: '3 hours',
      difficulty: 'Intermediate',
      topics: ['DoIP Architecture', 'Vehicle Discovery', 'Routing Activation', 'Diagnostic Messages'],
      learningObjectives: [
        'Configure DoIP connections',
        'Implement vehicle discovery protocols',
        'Execute remote diagnostics'
      ],
      practicalLab: 'Remote Diagnostics Setup',
      assessment: 'DoIP Implementation Test'
    },
    {
      id: 3,
      title: 'UDS Protocol Mastery',
      duration: '4 hours',
      difficulty: 'Advanced',
      topics: ['Service Identification', 'Session Control', 'ECU Programming', 'Security Access'],
      learningObjectives: [
        'Master UDS service categories',
        'Implement security procedures',
        'Perform ECU reflashing'
      ],
      practicalLab: 'ECU Programming Workshop',
      assessment: 'Live ECU Flashing Demo'
    }
  ];

  const ahmadStats = {
    totalTrained: 300,
    companiesTrained: 15,
    trainingHours: 1200,
    certificationRate: 95,
    satisfactionScore: 4.8,
    regions: ['North America', 'Europe', 'Asia-Pacific', 'Australia']
  };

  const ahmadAchievements = [
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
      company: 'Evaluate Consulting',
      achievement: 'Reduced technical escalations by 30%',
      impact: '50+ service engineers trained',
      detail: '20% improvement in diagnostic workflows'
    }
  ];

  const projects = [
    {
      id: 'fast-diagnostics',
      title: 'FAST Diagnostics Tool Development',
      company: 'Fisker',
      period: '2022-2024',
      category: 'Product Development',
      overview: 'Comprehensive diagnostics tool with UI/UX design for vehicle communication via CAN/CAN-FD/LIN & UDS protocols',
      achievements: [
        'Reduced ECU flashing time by 40% (60 to 35 minutes)',
        'Increased diagnostic efficiency by 35%',
        'Saved $2M in supplier costs through streamlined RFI/RFP/RFQ processes',
        'Led team of 6 engineers globally'
      ],
      technologies: ['CAN/CAN-FD', 'LIN', 'UDS', 'OBD', 'VCI Integration', 'Azure Directory', 'UI/UX Design'],
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
      impact: 'Revolutionary diagnostic tool that became the backbone of Fisker\'s service operations',
      icon: Code,
      color: 'bg-blue-500'
    },
    {
      id: 'service-strategy',
      title: '3-Year Service Engineering Vision',
      company: 'Consulting Portfolio',
      period: '2024',
      category: 'Strategic Planning',
      overview: 'Comprehensive 3-year service strategy for humanoid robots including KPIs, infrastructure, and feedback loops',
      achievements: [
        'Established comprehensive KPI framework',
        'Designed 3-tier service support structure',
        'Created predictive maintenance strategy',
        'Developed ML-powered failure prediction system'
      ],
      technologies: ['ML/AI', 'IoT Sensors', 'Cloud Platforms (AWS)', 'CRM Systems', 'Predictive Analytics'],
      challenges: [
        'Defining service requirements for emerging technology',
        'Balancing automation with human intervention',
        'Creating scalable support infrastructure',
        'Establishing measurable success metrics'
      ],
      solutions: [
        'Year 1: Tier 3 field service engineers for hardware repairs',
        'Year 2: Advanced technicians with remote diagnostic capabilities',
        'Year 3: Basic support with self-service portals',
        'Continuous ML model improvement and data collection'
      ],
      impact: 'Roadmap for transforming service operations through predictive analytics and automation',
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ];

  const swotData = {
    strengths: {
      title: 'Strengths',
      icon: Star,
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-800',
      items: [
        {
          title: 'Extensive Experience',
          description: 'Over 20 years of expertise in various engineering and communication roles, particularly in diagnostics and field service',
          impact: 'Proven track record across Tesla, Rivian, Fisker, and private consulting'
        },
        {
          title: 'Leadership Skills',
          description: 'Proven leadership experience as Lead Diagnostics Product Manager & Engineer with cross-organizational direct and indirect reports',
          impact: '300+ professionals trained globally across multiple companies'
        }
      ]
    },
    opportunities: {
      title: 'Opportunities',
      icon: TrendingUp,
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-800',
      items: [
        {
          title: 'Growing Demand for EVs',
          description: 'The electric vehicle market is expanding, providing opportunities to leverage expertise',
          potential: 'Position as EV diagnostics and service strategy expert'
        },
        {
          title: 'Technological Integration',
          description: 'Integration of advanced technologies such as AI, ML, and IoT into automotive diagnostics provides innovation opportunities',
          potential: 'Pioneer predictive maintenance and AI-driven diagnostic solutions'
        }
      ]
    }
  };

  // Effects and handlers
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        batteryTemp: prev.batteryTemp + (Math.random() - 0.5) * 2,
        motorTemp: prev.motorTemp + (Math.random() - 0.5) * 3,
        batteryLevel: Math.max(0, Math.min(100, prev.batteryLevel + (Math.random() - 0.5) * 0.5)),
        voltage: prev.voltage + (Math.random() - 0.5) * 5,
        current: prev.current + (Math.random() - 0.5) * 8,
        power: prev.power + (Math.random() - 0.5) * 2
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    calculateSavings();
  }, [inputs]);

  useEffect(() => {
    let interval;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            if (!completedModules.includes(currentModule)) {
              setCompletedModules(prev => [...prev, currentModule]);
            }
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress, currentModule, completedModules]);

  const calculateSavings = () => {
    const currentMonthlyCost = inputs.serviceTeamSize * inputs.avgDiagnosticTime * inputs.technicianHourlyRate * inputs.monthlyVehicleVolume / 60;
    const escalationCost = (inputs.escalationRate / 100) * currentMonthlyCost * 2.5;
    const downtimeCost = inputs.downtime * inputs.technicianHourlyRate * inputs.monthlyVehicleVolume;
    
    const diagnosticTimeReduction = 0.50;
    const escalationReduction = 0.30;
    const downtimeReduction = 0.35;
    
    const improvedDiagnosticCost = currentMonthlyCost * (1 - diagnosticTimeReduction);
    const improvedEscalationCost = escalationCost * (1 - escalationReduction);
    const improvedDowntimeCost = downtimeCost * (1 - downtimeReduction);
    
    const totalCurrentCost = currentMonthlyCost + escalationCost + downtimeCost;
    const totalImprovedCost = improvedDiagnosticCost + improvedEscalationCost + improvedDowntimeCost;
    
    const monthlySavings = totalCurrentCost - totalImprovedCost;
    const annualSavings = monthlySavings * 12;
    const trainingInvestment = inputs.serviceTeamSize * inputs.trainingCostPerTech;
    const roi = ((annualSavings - trainingInvestment) / trainingInvestment) * 100;
    const paybackPeriod = trainingInvestment / monthlySavings;
    
    setResults({
      currentMonthlyCost: totalCurrentCost,
      improvedMonthlyCost: totalImprovedCost,
      monthlySavings,
      annualSavings,
      trainingInvestment,
      roi,
      paybackPeriod,
      diagnosticTimeSaved: inputs.avgDiagnosticTime * diagnosticTimeReduction,
      escalationReduction: inputs.escalationRate * escalationReduction,
      efficiencyGain: ((totalCurrentCost - totalImprovedCost) / totalCurrentCost) * 100
    });
  };

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(Math.round(num));
  };

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setDiagnosticData({
        timestamp: new Date().toLocaleTimeString(),
        ecuCount: ecus.length,
        totalDTCs: dtcCodes.length,
        protocolsActive: protocols.length
      });
    }, 3000);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleModuleChange = (moduleIndex) => {
    setCurrentModule(moduleIndex);
    setProgress(completedModules.includes(moduleIndex) ? 100 : 0);
    setIsPlaying(false);
  };

  const currentModuleData = trainingModules[currentModule];
  const currentProject = projects[selectedProject];
  const currentSwotData = swotData[activeQuadrant];

  // Navigation sections
  const sections = [
    { id: 'overview', label: 'Overview', icon: Award },
    { id: 'diagnostics', label: 'EV Diagnostics', icon: Activity },
    { id: 'roi-calculator', label: 'ROI Calculator', icon: Calculator },
    { id: 'projects', label: 'Project Portfolio', icon: FileText },
    { id: 'training', label: 'Training Program', icon: BookOpen },
    { id: 'swot', label: 'SWOT Analysis', icon: Target },
    { id: 'consulting', label: 'Consulting', icon: MessageSquare }
  ];

  // Render functions for each section
  const renderOverview = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Ahmed Said</h1>
        <p className="text-xl text-gray-600 mb-2">Automotive Engineering & Diagnostics Leader</p>
        <p className="text-lg text-gray-500">20+ Years | $6.2M+ Impact | Global Experience</p>
        <div className="flex justify-center gap-4 mt-6">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            <Phone size={20} />
            (602) 402-2505
          </button>
          <button className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
            <Mail size={20} />
            ahmed.osaid.pro@gmail.com
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow">
            <achievement.icon className="mx-auto mb-3 text-blue-600" size={32} />
            <div className="text-2xl font-bold text-gray-900 mb-1">{achievement.value}</div>
            <div className="text-sm text-gray-600">{achievement.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Career Progression</h3>
        <div className="space-y-4">
          {companies.map((company, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
              <div className={`w-4 h-4 rounded-full ${company.color}`}></div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{company.name}</div>
                <div className="text-sm text-gray-600">{company.role}</div>
              </div>
              <div className="text-sm text-gray-500">{company.period}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Capabilities</h2>
          <p className="text-gray-600">Proven expertise across automotive engineering, product management, and global operations</p>
        </div>

        <div className="grid gap-8">
          {capabilities.map((capability, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{capability.title}</h3>
              <p className="text-gray-600 mb-6">{capability.description}</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Achievements</h4>
                  <ul className="space-y-2">
                    {capability.metrics.map((metric, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <ChevronRight size={16} className="text-green-500" />
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {capability.technologies.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDiagnostics = () => (
    <div className="min-h-screen bg-gray-900 text-white p-6 rounded-lg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">EV Diagnostics Dashboard</h1>
              <p className="text-gray-400">Real-time vehicle diagnostics and ECU monitoring</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handleScan}
                disabled={isScanning}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                <RefreshCw className={isScanning ? 'animate-spin' : ''} size={20} />
                {isScanning ? 'Scanning...' : 'Full Scan'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Battery className="text-green-400" size={24} />
              <span className="text-sm text-gray-400">Battery</span>
            </div>
            <div className="text-2xl font-bold">{realTimeData.batteryLevel.toFixed(1)}%</div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="text-yellow-400" size={24} />
              <span className="text-sm text-gray-400">Voltage</span>
            </div>
            <div className="text-2xl font-bold">{realTimeData.voltage.toFixed(0)}V</div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="text-blue-400" size={24} />
              <span className="text-sm text-gray-400">Current</span>
            </div>
            <div className="text-2xl font-bold">{realTimeData.current.toFixed(1)}A</div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Gauge className="text-purple-400" size={24} />
              <span className="text-sm text-gray-400">Power</span>
            </div>
            <div className="text-2xl font-bold">{realTimeData.power.toFixed(1)}kW</div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Thermometer className="text-orange-400" size={24} />
              <span className="text-sm text-gray-400">Battery °C</span>
            </div>
            <div className="text-2xl font-bold">{realTimeData.batteryTemp.toFixed(1)}°</div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Cpu className="text-red-400" size={24} />
              <span className="text-sm text-gray-400">Motor °C</span>
            </div>
            <div className="text-2xl font-bold">{realTimeData.motorTemp.toFixed(1)}°</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Settings size={24} />
              ECU Status
            </h3>
            <div className="space-y-3">
              {ecus.map((ecu) => (
                <div 
                  key={ecu.id}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedECU === ecu.id ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  onClick={() => setSelectedECU(ecu.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{ecu.name}</div>
                      <div className="text-sm text-gray-400">{ecu.id}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(ecu.status)}`}>
                        {ecu.status}
                      </span>
                      {ecu.dtcs > 0 && (
                        <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs">
                          {ecu.dtcs} DTC
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Communication Protocols</h3>
            <div className="space-y-4">
              {protocols.map((protocol) => (
                <div key={protocol.name} className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{protocol.name}</span>
                    <span className="text-green-400 text-sm">{protocol.status}</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: protocol.traffic }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-400 mt-1">Traffic: {protocol.traffic}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-900 rounded-lg">
              <h4 className="font-semibold text-green-400 mb-2">ISO Standards Compliance</h4>
              <div className="text-sm space-y-1">
                <div>✓ ISO 24089 - Software Update</div>
                <div>✓ ISO 15765 - Diagnostic Communication</div>
                <div>✓ ISO 13400 - Diagnostic over IP</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle size={24} />
              Diagnostic Trouble Codes
            </h3>
            <div className="space-y-3">
              {dtcCodes.map((dtc, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold">{dtc.code}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(dtc.severity)}`}>
                      {dtc.severity}
                    </span>
                  </div>
                  <div className="text-sm text-gray-300 mb-1">{dtc.description}</div>
                  <div className="text-xs text-gray-500">ECU: {dtc.ecu}</div>
                </div>
              ))}
            </div>

            {diagnosticData.timestamp && (
              <div className="mt-6 p-4 bg-blue-900 rounded-lg">
                <h4 className="font-semibold text-blue-400 mb-2">Last Scan Results</h4>
                <div className="text-sm space-y-1">
                  <div>Time: {diagnosticData.timestamp}</div>
                  <div>ECUs Scanned: {diagnosticData.ecuCount}</div>
                  <div>Total DTCs: {diagnosticData.totalDTCs}</div>
                  <div>Protocols Active: {diagnosticData.protocolsActive}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderROICalculator = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">ROI & Cost Savings Calculator</h1>
        <p className="text-xl text-gray-600">Calculate the financial impact of automotive diagnostics optimization</p>
        <p className="text-lg text-gray-500 mt-2">Based on Ahmed Said's proven track record: $6.2M+ in documented savings</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Proven Track Record</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ahmadAchievements.map((achievement, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
              <div className="font-bold text-blue-600 mb-2">{achievement.company}</div>
              <div className="text-sm text-gray-600 mb-2">{achievement.achievement}</div>
              <div className="font-semibold text-green-600 mb-1">{achievement.impact}</div>
              <div className="text-xs text-gray-500">{achievement.detail}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Calculator size={28} />
            Your Organization
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Team Size</label>
              <input
                type="number"
                value={inputs.serviceTeamSize}
                onChange={(e) => handleInputChange('serviceTeamSize', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Number of technicians"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Diagnostic Time (minutes)</label>
              <input
                type="number"
                value={inputs.avgDiagnosticTime}
                onChange={(e) => handleInputChange('avgDiagnosticTime', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Time per diagnostic session"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Escalation Rate (%)</label>
              <input
                type="number"
                value={inputs.escalationRate}
                onChange={(e) => handleInputChange('escalationRate', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Percentage requiring escalation"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Technician Hourly Rate ($)</label>
              <input
                type="number"
                value={inputs.technicianHourlyRate}
                onChange={(e) => handleInputChange('technicianHourlyRate', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Hourly labor cost"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Vehicle Volume</label>
              <input
                type="number"
                value={inputs.monthlyVehicleVolume}
                onChange={(e) => handleInputChange('monthlyVehicleVolume', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Vehicles serviced per month"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Training Cost per Technician ($)</label>
              <input
                type="number"
                value={inputs.trainingCostPerTech}
                onChange={(e) => handleInputChange('trainingCostPerTech', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="One-time training investment"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Downtime per Vehicle (hours)</label>
              <input
                type="number"
                value={inputs.downtime}
                onChange={(e) => handleInputChange('downtime', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Hours of downtime per vehicle"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp size={28} />
            Projected Savings
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="text-sm text-green-600 font-medium">Monthly Savings</div>
                <div className="text-2xl font-bold text-green-700">
                  {formatCurrency(results.monthlySavings || 0)}
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="text-sm text-blue-600 font-medium">Annual Savings</div>
                <div className="text-2xl font-bold text-blue-700">
                  {formatCurrency(results.annualSavings || 0)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="text-sm text-purple-600 font-medium">ROI</div>
                <div className="text-2xl font-bold text-purple-700">
                  {formatNumber(results.roi || 0)}%
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="text-sm text-orange-600 font-medium">Payback Period</div>
                <div className="text-2xl font-bold text-orange-700">
                  {(results.paybackPeriod || 0).toFixed(1)} months
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Efficiency Improvements</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Diagnostic Time Reduction</span>
                  <span className="font-semibold text-green-600">
                    -{formatNumber(results.diagnosticTimeSaved || 0)} minutes (50%)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Escalation Reduction</span>
                  <span className="font-semibold text-blue-600">
                    -{(results.escalationReduction || 0).toFixed(1)}% (30% improvement)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Overall Efficiency Gain</span>
                  <span className="font-semibold text-purple-600">
                    +{(results.efficiencyGain || 0).toFixed(1)}%
                  </span>
                </div>
              </div>
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
        <p className="text-xl text-gray-600">Comprehensive showcase of engineering excellence and strategic innovation</p>
        <p className="text-lg text-gray-500 mt-2">Ahmed Said - 20+ Years of Automotive & Systems Engineering</p>
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

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Impact</h3>
            <p className="text-gray-700 leading-relaxed">{currentProject.impact}</p>
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
        <p className="text-lg text-gray-500 mt-2">Designed by Ahmed Said - 300+ Professionals Trained Globally</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="text-yellow-500" size={28} />
          Training Excellence Record
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{ahmadStats.totalTrained}+</div>
            <div className="text-sm text-gray-600">Professionals Trained</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{ahmadStats.companiesTrained}</div>
            <div className="text-sm text-gray-600">Companies Served</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{ahmadStats.trainingHours}</div>
            <div className="text-sm text-gray-600">Training Hours</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{ahmadStats.certificationRate}%</div>
            <div className="text-sm text-gray-600">Certification Rate</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{ahmadStats.satisfactionScore}</div>
            <div className="text-sm text-gray-600">Satisfaction Score</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-600">{ahmadStats.regions.length}</div>
            <div className="text-sm text-gray-600">Global Regions</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen size={24} />
            Training Modules
          </h3>
          <div className="space-y-3">
            {trainingModules.map((module, index) => (
              <div
                key={module.id}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  currentModule === index 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => handleModuleChange(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-semibold">{module.title}</div>
                    <div className="text-sm opacity-75">{module.duration}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      currentModule === index 
                        ? 'bg-blue-500 text-white' 
                        : getDifficultyColor(module.difficulty)
                    }`}>
                      {module.difficulty}
                    </span>
                    {completedModules.includes(index) && (
                      <CheckCircle size={16} className="text-green-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">{currentModuleData.title}</h3>
            <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(currentModuleData.difficulty)}`}>
              {currentModuleData.difficulty}
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Module Progress</span>
              <span className="text-sm font-semibold">{progress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-6">
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

  const renderSWOT = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Strategic SWOT Analysis</h1>
        <p className="text-xl text-gray-600">Comprehensive assessment of professional positioning and strategic opportunities</p>
        <p className="text-lg text-gray-500 mt-2">Ahmed Said - Automotive Engineering & Diagnostics Expert</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {Object.entries(swotData).map(([key, data]) => (
          <div
            key={key}
            className={`cursor-pointer transition-all duration-300 p-6 rounded-lg border-2 ${
              activeQuadrant === key 
                ? `bg-gradient-to-br ${data.color} text-white border-transparent shadow-lg transform scale-105` 
                : `${data.bgColor} ${data.textColor} border-gray-200 hover:border-gray-300 hover:shadow-md`
            }`}
            onClick={() => setActiveQuadrant(key)}
          >
            <div className="flex items-center gap-3 mb-4">
              <data.icon size={32} />
              <h2 className="text-2xl font-bold">{data.title}</h2>
            </div>
            <p className="text-sm opacity-90">
              Click to explore {data.items.length} key {data.title.toLowerCase()} factors
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-3 rounded-lg bg-gradient-to-br ${currentSwotData.color}`}>
            <currentSwotData.icon size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{currentSwotData.title}</h2>
            <p className="text-gray-600">Strategic analysis and actionable insights</p>
          </div>
        </div>

        <div className="grid gap-6">
          {currentSwotData.items.map((item, index) => (
            <div key={index} className={`p-6 rounded-lg border-l-4 ${currentSwotData.bgColor}`} 
                 style={{ borderLeftColor: currentSwotData.color.includes('green') ? '#10b981' : '#3b82f6' }}>
              <div className="flex items-start gap-4">
                <ChevronRight size={20} className={`mt-1 flex-shrink-0 ${currentSwotData.textColor}`} />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700 mb-3">{item.description}</p>
                  
                  {item.impact && (
                    <div className="bg-green-100 p-3 rounded-lg">
                      <div className="text-sm font-medium text-green-800 mb-1">Impact:</div>
                      <div className="text-sm text-green-700">{item.impact}</div>
                    </div>
                  )}
                  
                  {item.potential && (
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <div className="text-sm font-medium text-blue-800 mb-1">Potential:</div>
                      <div className="text-sm text-blue-700">{item.potential}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
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
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-xl">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Services Offered</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <ChevronRight className="text-purple-600 mt-1" size={20} />
              <div>
                <div className="font-semibold">Advanced Diagnostics Training</div>
                <div className="text-sm text-gray-600">CAN/CAN-FD/LIN & UDS protocols, embedded software validation</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="text-purple-600 mt-1" size={20} />
              <div>
                <div className="font-semibold">UI/UX Design & Development</div>
                <div className="text-sm text-gray-600">Service diagnostic tool interfaces, VCI integration</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="text-purple-600 mt-1" size={20} />
              <div>
                <div className="font-semibold">Process Optimization</div>
                <div className="text-sm text-gray-600">Workflow design, predictive maintenance, system automation</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="text-purple-600 mt-1" size={20} />
              <div>
                <div className="font-semibold">Strategic Planning</div>
                <div className="text-sm text-gray-600">3-year service visions, technology roadmaps, KPI development</div>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Portfolio Highlights</h3>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="font-semibold text-gray-900">FAST Diagnostics Tool</div>
              <div className="text-sm text-gray-600 mt-1">Complete UI/UX design and development for Fisker AfterSales Service Tool with VCI integration</div>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <div className="font-semibold text-gray-900">Global Team Leadership</div>
              <div className="text-sm text-gray-600 mt-1">Managed development teams across India and EU, fostering cross-cultural collaboration</div>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <div className="font-semibold text-gray-900">Service Strategy Development</div>
              <div className="text-sm text-gray-600 mt-1">Created comprehensive 3-year service engineering visions and implementation roadmaps</div>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <div className="font-semibold text-gray-900">Process Engineering</div>
              <div className="text-sm text-gray-600 mt-1">Designed troubleshooting workflows and PDI management systems for luxury automotive brands</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
          <div className="text-sm text-gray-600">Service Engineers Trained</div>
        </div>
        <div className="bg-green-50 p-6 rounded-xl text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">30%</div>
          <div className="text-sm text-gray-600">Reduction in Technical Escalations</div>
        </div>
        <div className="bg-purple-50 p-6 rounded-xl text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">20%</div>
          <div className="text-sm text-gray-600">Improvement in Diagnostic Workflows</div>
        </div>
      </div>
    </div>
  );

  // Main render function
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <div className="sticky top-0 z-50 bg-white shadow-lg">
          <div className="flex justify-center p-4">
            <nav className="flex bg-gray-100 rounded-lg p-2 overflow-x-auto">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setSubSection('');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    activeSection === section.id 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <section.icon size={18} />
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="transition-all duration-300">
            {activeSection === 'overview' && renderOverview()}
            {activeSection === 'diagnostics' && renderDiagnostics()}
            {activeSection === 'roi-calculator' && renderROICalculator()}
            {activeSection === 'projects' && renderProjects()}
            {activeSection === 'training' && renderTraining()}
            {activeSection === 'swot' && renderSWOT()}
            {activeSection === 'consulting' && renderConsulting()}
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white p-8 mt-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Operations?</h3>
            <p className="text-gray-300 mb-6">Let's discuss how 20+ years of engineering expertise can benefit your organization today</p>
            <div className="flex justify-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Phone size={20} />
                <span>(602) 402-2505</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={20} />
                <span>ahmed.osaid.pro@gmail.com</span>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Ahmed Said - Automotive Engineering Excellence | $6.2M+ in Documented Savings | 300+ Professionals Trained Globally
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ComprehensivePortfolio;
