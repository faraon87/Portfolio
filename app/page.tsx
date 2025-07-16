"use client"

import { useState, useEffect } from 'react'
import { 
  ArrowRight, Github, Linkedin, Mail, Phone, DollarSign, Users, 
  Code, Award, Globe, Zap, ChevronRight, Target, Activity,
  Settings, Briefcase, GraduationCap, Building, Menu, X,
  ExternalLink, Download, Calculator, BookOpen, Play, Pause,
  Clock, TrendingUp, BarChart3, CheckCircle, AlertTriangle,
  Brain, Cpu, Network, Shield, Database, Cloud, Wrench, RotateCcw,
  Battery, Thermometer, Gauge, RefreshCw, Eye, Maximize2
} from 'lucide-react'

// Utility function with proper TypeScript
function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Type definitions
interface Achievement {
  value: string
  label: string
  icon: any
}

interface Company {
  name: string
  role: string
  period: string
  color: string
  industry: string
  location: string
  achievements: string[]
}

interface Skill {
  name: string
  level: number
}

interface Project {
  title: string
  company: string
  period: string
  description: string
  achievements: string[]
  technologies: string[]
  challenges: string[]
  solutions: string[]
  impact: string
  serviceRequirements?: any
  kpiFramework?: any
  hasDemo?: boolean
}

interface EVSystem {
  id: string
  name: string
  status: string
  alerts: number
  description: string
}

interface RealTimeData {
  batterySOC: number
  batterySOH: number
  batteryTemp: number
  motorTemp: number
  batteryVoltage: number
  motorPower: number
}

interface ROIInputs {
  serviceTeamSize: number
  avgDiagnosticTime: number
  escalationRate: number
  technicianHourlyRate: number
  monthlyVehicleVolume: number
  trainingCostPerTech: number
  downtimeHours: number
}

interface ROIResults {
  currentMonthlyCosts: number
  monthlySavings: number
  annualSavings: number
  trainingInvestment: number
  roi: number
  paybackMonths: number
}

interface TrainingModule {
  id: number
  title: string
  duration: string
  description: string
  topics: string[]
}

// Types for signal configuration
type SignalType = 'can-bus' | 'motor-pwm' | 'battery-cell' | 'charging';

interface SignalConfig {
  name: string;
  description: string;
  frequency: string;
  amplitude: string;
}

interface TrainingModuleDetailed {
  id: number;
  title: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  description: string;
  lessons: string[];
  completed?: boolean;
  current?: boolean;
}

// Types for lesson steps
interface LessonStep {
  title: string;
  content: string;
  interactive: string;
  task: string;
}

// Training Module Data for EV Diagnostics
const trainingModules: TrainingModuleDetailed[] = [
  {
    id: 1,
    title: 'PicoScope Fundamentals for EV Technicians',
    duration: '45 min',
    difficulty: 'Beginner',
    description: 'Master the basics of oscilloscope operation specifically for electric vehicle diagnostics',
    lessons: [
      'EV Signal Characteristics',
      'Timebase & Voltage Ranges for HV/LV',
      'Basic Triggering for EV Signals',
      'Safety Protocols for EV Measurements'
    ],
    completed: true
  },
  {
    id: 2,
    title: 'HV/LV System Signal Analysis',
    duration: '60 min',
    difficulty: 'Intermediate',
    description: 'Advanced measurement techniques for high and low voltage EV systems',
    lessons: [
      'Battery Pack Voltage Monitoring',
      'Motor Drive Waveform Analysis',
      'Charging System Diagnostics',
      'Insulation Resistance Testing'
    ],
    completed: true
  },
  {
    id: 3,
    title: 'CAN/LIN Bus Diagnostics for EVs',
    duration: '75 min',
    difficulty: 'Advanced',
    description: 'Complete guide to EV communication protocol analysis and troubleshooting',
    lessons: [
      'CAN Bus Physical Layer Analysis',
      'EV-Specific CAN Messages',
      'LIN Bus Battery Management',
      'Protocol Error Detection'
    ],
    completed: false,
    current: true
  },
  {
    id: 4,
    title: 'Motor Drive & Power Electronics',
    duration: '50 min',
    difficulty: 'Advanced',
    description: 'Analyzing PWM signals, inverter outputs, and motor control systems',
    lessons: [
      'PWM Signal Analysis',
      'Three-Phase Motor Diagnostics',
      'Inverter Output Analysis',
      'Torque Control Verification'
    ],
    completed: false
  },
  {
    id: 5,
    title: 'Battery Management System (BMS)',
    duration: '65 min',
    difficulty: 'Expert',
    description: 'Deep dive into BMS diagnostics, cell balancing, and thermal management',
    lessons: [
      'Cell Voltage Monitoring',
      'Balance Current Analysis',
      'Temperature Sensor Verification',
      'SOC/SOH Calculation Validation'
    ],
    completed: false
  }
];

// Simulated Oscilloscope Interface
function EVOscilloscopeInterface() {
  const [isCapturing, setIsCapturing] = useState(false);
  const [selectedSignal, setSelectedSignal] = useState<SignalType>('can-bus');
  const [timebase, setTimebase] = useState('500us');
  const [voltageRange, setVoltageRange] = useState('5V');
  const [triggerLevel, setTriggerLevel] = useState(2.5);

  const signalTypes: Record<SignalType, SignalConfig> = {
    'can-bus': {
      name: 'CAN Bus High',
      description: 'Differential CAN signal showing normal communication',
      frequency: '500 kbps',
      amplitude: '2V differential'
    },
    'motor-pwm': {
      name: 'Motor PWM Drive',
      description: 'Three-phase PWM output from motor controller',
      frequency: '10 kHz',
      amplitude: '400V peak'
    },
    'battery-cell': {
      name: 'Battery Cell Voltage',
      description: 'Individual cell voltage during charge/discharge cycle',
      frequency: 'DC + ripple',
      amplitude: '3.2V - 4.2V'
    },
    'charging': {
      name: 'DC Fast Charging',
      description: 'High voltage DC charging current and voltage',
      frequency: '50-100 Hz ripple',
      amplitude: '400V, 150A'
    }
  };

  // Generate realistic waveform data
  const generateWaveform = () => {
    const points = [];
    const samples = 1000;
    
    for (let i = 0; i < samples; i++) {
      const t = (i / samples) * 10; // 10 time units
      let value = 0;
      
      switch (selectedSignal) {
        case 'can-bus':
          // CAN bus signal with dominant/recessive bits
          value = Math.sin(t * 20) > 0 ? 5 : 0;
          value += Math.random() * 0.2 - 0.1; // Add noise
          break;
        case 'motor-pwm':
          // PWM signal with variable duty cycle
          const duty = 0.7 + 0.2 * Math.sin(t * 0.5);
          value = (t * 50) % 1 < duty ? 400 : 0;
          break;
        case 'battery-cell':
          // Battery cell voltage with ripple
          value = 3.7 + 0.3 * Math.sin(t * 2) + 0.05 * Math.sin(t * 100);
          break;
        case 'charging':
          // DC charging with AC ripple
          value = 400 + 20 * Math.sin(t * 100) + 5 * Math.random();
          break;
      }
      
      points.push({ x: i, y: value });
    }
    return points;
  };

  const waveformData = generateWaveform();

  return (
    <div className="bg-black text-green-400 p-4 rounded-lg border border-green-500/30 font-mono">
      {/* Scope Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-green-500/30">
        <div className="text-green-300 font-bold">PicoScope 6 - EV Diagnostics Mode</div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsCapturing(!isCapturing)}
            className={`px-3 py-1 rounded text-xs font-bold ${
              isCapturing ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
            }`}
          >
            {isCapturing ? 'STOP' : 'RUN'}
          </button>
          <span className="text-xs text-green-300">
            {isCapturing ? 'CAPTURING' : 'STOPPED'}
          </span>
        </div>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-4 gap-4 mb-4 text-xs">
        <div>
          <label className="block text-green-300 mb-1">Signal Type</label>
          <select 
            value={selectedSignal}
            onChange={(e) => setSelectedSignal(e.target.value as SignalType)}
            className="w-full bg-gray-900 border border-green-500/50 rounded p-1 text-green-400"
          >
            {Object.entries(signalTypes).map(([key, signal]) => (
              <option key={key} value={key}>{signal.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-green-300 mb-1">Timebase</label>
          <select 
            value={timebase}
            onChange={(e) => setTimebase(e.target.value)}
            className="w-full bg-gray-900 border border-green-500/50 rounded p-1 text-green-400"
          >
            <option value="100us">100 μs/div</option>
            <option value="500us">500 μs/div</option>
            <option value="1ms">1 ms/div</option>
            <option value="10ms">10 ms/div</option>
          </select>
        </div>
        <div>
          <label className="block text-green-300 mb-1">Voltage Range</label>
          <select 
            value={voltageRange}
            onChange={(e) => setVoltageRange(e.target.value)}
            className="w-full bg-gray-900 border border-green-500/50 rounded p-1 text-green-400"
          >
            <option value="5V">±5V</option>
            <option value="20V">±20V</option>
            <option value="100V">±100V</option>
            <option value="500V">±500V</option>
          </select>
        </div>
        <div>
          <label className="block text-green-300 mb-1">Trigger Level</label>
          <input 
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={triggerLevel}
            onChange={(e) => setTriggerLevel(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-green-300">{triggerLevel.toFixed(1)}V</div>
        </div>
      </div>

      {/* Signal Info */}
      <div className="bg-gray-900 p-2 rounded mb-4 text-xs">
        <div className="text-green-300 font-bold">{signalTypes[selectedSignal].name}</div>
        <div className="text-green-400">{signalTypes[selectedSignal].description}</div>
        <div className="text-green-500">
          Frequency: {signalTypes[selectedSignal].frequency} | 
          Amplitude: {signalTypes[selectedSignal].amplitude}
        </div>
      </div>

      {/* Oscilloscope Display */}
      <div className="relative bg-gray-950 border border-green-500/30 rounded" style={{ height: '300px' }}>
        {/* Grid */}
        <svg className="absolute inset-0 w-full h-full">
          {/* Horizontal grid lines */}
          {[...Array(11)].map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 30}
              x2="100%"
              y2={i * 30}
              stroke="rgba(34, 197, 94, 0.2)"
              strokeWidth="1"
            />
          ))}
          {/* Vertical grid lines */}
          {[...Array(11)].map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 60}
              y1="0"
              x2={i * 60}
              y2="100%"
              stroke="rgba(34, 197, 94, 0.2)"
              strokeWidth="1"
            />
          ))}
          
          {/* Trigger line */}
          <line
            x1="0"
            y1={150 - (triggerLevel / 5) * 150}
            x2="100%"
            y2={150 - (triggerLevel / 5) * 150}
            stroke="red"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          
          {/* Waveform */}
          {isCapturing && (
            <polyline
              points={waveformData.map(point => 
                `${(point.x / 1000) * 600},${150 - (point.y / 5) * 30}`
              ).join(' ')}
              fill="none"
              stroke="rgb(34, 197, 94)"
              strokeWidth="2"
            />
          )}
        </svg>
        
        {/* Trigger indicator */}
        <div 
          className="absolute left-0 w-4 h-4 bg-red-500 rounded-full transform -translate-x-2 -translate-y-2"
          style={{ top: `${150 - (triggerLevel / 5) * 150}px` }}
        />
      </div>

      {/* Measurements */}
      <div className="grid grid-cols-4 gap-4 mt-4 text-xs">
        <div className="bg-gray-900 p-2 rounded">
          <div className="text-green-300">Frequency</div>
          <div className="text-green-400 font-bold">
            {selectedSignal === 'can-bus' ? '500 kHz' : 
             selectedSignal === 'motor-pwm' ? '10 kHz' :
             selectedSignal === 'battery-cell' ? 'DC' : '100 Hz'}
          </div>
        </div>
        <div className="bg-gray-900 p-2 rounded">
          <div className="text-green-300">Peak-Peak</div>
          <div className="text-green-400 font-bold">
            {selectedSignal === 'can-bus' ? '5.2V' : 
             selectedSignal === 'motor-pwm' ? '400V' :
             selectedSignal === 'battery-cell' ? '0.6V' : '40V'}
          </div>
        </div>
        <div className="bg-gray-900 p-2 rounded">
          <div className="text-green-300">RMS</div>
          <div className="text-green-400 font-bold">
            {selectedSignal === 'can-bus' ? '2.8V' : 
             selectedSignal === 'motor-pwm' ? '283V' :
             selectedSignal === 'battery-cell' ? '3.71V' : '401V'}
          </div>
        </div>
        <div className="bg-gray-900 p-2 rounded">
          <div className="text-green-300">Duty Cycle</div>
          <div className="text-green-400 font-bold">
            {selectedSignal === 'can-bus' ? 'Variable' : 
             selectedSignal === 'motor-pwm' ? '70%' :
             selectedSignal === 'battery-cell' ? 'N/A' : 'N/A'}
          </div>
        </div>
      </div>
    </div>
  );
}

// Interactive Lesson Component
function InteractiveLesson({ lesson, onComplete }: { lesson: string; onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const lessonSteps: Record<string, LessonStep[]> = {
    'CAN Bus Physical Layer Analysis': [
      {
        title: 'Understanding CAN Bus Signals',
        content: 'CAN bus uses differential signaling with CAN_H and CAN_L lines. The differential voltage determines the bit state.',
        interactive: 'Observe the CAN bus waveform above. Notice how the voltage difference creates the digital data.',
        task: 'Set the oscilloscope to capture a CAN bus signal and identify dominant vs recessive bits.'
      },
      {
        title: 'Measuring Signal Quality',
        content: 'Good CAN signals should have clean transitions and proper voltage levels. Look for noise, reflections, and timing issues.',
        interactive: 'Use the cursor measurements to check rise/fall times and voltage levels.',
        task: 'Measure the rise time of the CAN signal - it should be < 150ns for proper operation.'
      },
      {
        title: 'Protocol Decoding',
        content: 'PicoScope can decode CAN frames automatically, showing message IDs, data, and errors.',
        interactive: 'Enable CAN decoding in the Serial Decoding menu to see the actual messages.',
        task: 'Identify at least 3 different CAN message IDs in the decoded output.'
      }
    ]
  };

  const steps = lessonSteps[lesson] || [
    {
      title: 'Getting Started',
      content: 'This lesson will guide you through the fundamentals.',
      interactive: 'Follow along with the interactive scope display.',
      task: 'Complete the exercise to proceed.'
    }
  ];

  const currentStepData = steps[currentStep];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">{lesson}</h3>
        <div className="text-sm text-zinc-400">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>

      <div className="bg-zinc-800/50 p-6 rounded-lg">
        <h4 className="text-lg font-semibold text-white mb-3">{currentStepData.title}</h4>
        <p className="text-zinc-300 mb-4">{currentStepData.content}</p>
        
        <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg mb-4">
          <div className="text-blue-400 font-medium mb-2">Interactive Exercise:</div>
          <div className="text-blue-300">{currentStepData.interactive}</div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg mb-6">
          <div className="text-yellow-400 font-medium mb-2">Your Task:</div>
          <div className="text-yellow-300">{currentStepData.task}</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-full bg-zinc-700 rounded-full h-2 max-w-xs">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
            <span className="text-sm text-zinc-400">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>

          <button
            onClick={nextStep}
            disabled={completed}
            className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            {completed ? (
              <>
                <CheckCircle size={16} />
                Completed
              </>
            ) : currentStep === steps.length - 1 ? (
              <>
                Complete Lesson
                <Award size={16} />
              </>
            ) : (
              <>
                Next Step
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Main EV Diagnostics Training Component
function EVDiagnosticsTraining() {
  const [currentModule, setCurrentModule] = useState(3); // Start with CAN Bus module
  const [currentLesson, setCurrentLesson] = useState(0);
  const [showScope, setShowScope] = useState(true);
  const [completedLessons, setCompletedLessons] = useState(new Set());

  const currentModuleData = trainingModules.find(m => m.id === currentModule);
  const currentLessonName = currentModuleData?.lessons[currentLesson];

  const completeLesson = () => {
    setCompletedLessons(prev => new Set([...prev, `${currentModule}-${currentLesson}`]));
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Module Sidebar */}
      <div className="lg:col-span-1">
        <h3 className="text-xl font-bold text-white mb-6">Training Modules</h3>
        <div className="space-y-3">
          {trainingModules.map((module) => (
            <div
              key={module.id}
              onClick={() => setCurrentModule(module.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                currentModule === module.id 
                  ? 'bg-purple-500/20 border-purple-500/50 text-white' 
                  : 'bg-zinc-800/50 border-zinc-700/50 text-zinc-400 hover:text-white hover:border-zinc-600/50'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-sm">{module.title}</h4>
                {module.completed && (
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                )}
                {module.current && !module.completed && (
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-4 text-xs opacity-75">
                <span>{module.duration}</span>
                <span className={`px-2 py-1 rounded ${
                  module.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                  module.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                  module.difficulty === 'Advanced' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {module.difficulty}
                </span>
              </div>
              <p className="text-xs mt-2 opacity-75">{module.description}</p>
              
              {/* Lesson Progress */}
              <div className="mt-3">
                <div className="text-xs text-zinc-400 mb-1">Lessons:</div>
                <div className="space-y-1">
                  {module.lessons.map((lesson, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      {completedLessons.has(`${module.id}-${idx}`) ? (
                        <CheckCircle className="w-3 h-3 text-green-400" />
                      ) : currentModule === module.id && currentLesson === idx ? (
                        <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
                      ) : (
                        <div className="w-3 h-3 border border-zinc-600 rounded-full" />
                      )}
                      <span className={
                        completedLessons.has(`${module.id}-${idx}`) ? 'text-green-400' :
                        currentModule === module.id && currentLesson === idx ? 'text-purple-400' :
                        'text-zinc-500'
                      }>
                        {lesson}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
          <h4 className="font-semibold text-white mb-3">Your Progress</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-zinc-400 text-sm">Modules Completed</span>
              <span className="text-white font-bold">2/5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400 text-sm">Lessons Completed</span>
              <span className="text-white font-bold">{completedLessons.size}/20</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400 text-sm">Hands-on Exercises</span>
              <span className="text-white font-bold">{Math.min(completedLessons.size * 2, 40)}/40</span>
            </div>
            <div className="w-full bg-zinc-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(completedLessons.size / 20) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-2 space-y-8">
        {/* Current Module Header */}
        <div className="bg-zinc-800/50 p-6 rounded-lg border border-zinc-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-white">{currentModuleData?.title}</h3>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                currentModuleData?.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                currentModuleData?.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                currentModuleData?.difficulty === 'Advanced' ? 'bg-orange-500/20 text-orange-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {currentModuleData?.difficulty}
              </span>
              <span className="text-zinc-400 text-sm">{currentModuleData?.duration}</span>
            </div>
          </div>
          <p className="text-zinc-300">{currentModuleData?.description}</p>
        </div>

        {/* Interactive Oscilloscope */}
        {showScope && (
          <div className="bg-zinc-800/50 p-6 rounded-lg border border-zinc-700/50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">Interactive PicoScope Simulator</h4>
              <button
                onClick={() => setShowScope(!showScope)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <Eye size={20} />
              </button>
            </div>
            <EVOscilloscopeInterface />
          </div>
        )}

        {/* Current Lesson */}
        {currentLessonName && (
          <InteractiveLesson 
            lesson={currentLessonName}
            onComplete={completeLesson}
          />
        )}

        {/* Lesson Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
            disabled={currentLesson === 0}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-lg transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Previous Lesson
          </button>

          <div className="text-center">
            <div className="text-sm text-zinc-400">
              Lesson {currentLesson + 1} of {currentModuleData?.lessons.length}
            </div>
            <div className="text-xs text-zinc-500 mt-1">
              {currentLessonName}
            </div>
          </div>

          <button
            onClick={() => setCurrentLesson(Math.min((currentModuleData?.lessons.length || 1) - 1, currentLesson + 1))}
            disabled={currentLesson === (currentModuleData?.lessons.length || 1) - 1}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-lg transition-colors"
          >
            Next Lesson
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// EV Diagnostics Dashboard Component
function EVDiagnosticsDashboard() {
  const [selectedSystem, setSelectedSystem] = useState<string>('BMS')
  const [isScanning, setIsScanning] = useState<boolean>(false)
  const [diagnosticData, setDiagnosticData] = useState<any>({})
  
  // Real-time data simulation
  const [realTimeData, setRealTimeData] = useState<RealTimeData>({
    batterySOC: 75.9,
    batterySOH: 94.6,
    batteryTemp: 39,
    motorTemp: 45,
    batteryVoltage: 376,
    motorPower: 62.6,
  })

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
  
  const evSystems: EVSystem[] = [
    { id: 'BMS', name: 'Battery Management System', status: 'healthy', alerts: 0, description: 'SOC, SOH, Cell Balancing' },
    { id: 'Motor', name: 'Motor Control Unit', status: 'healthy', alerts: 0, description: 'Torque, Speed, Efficiency' },
    { id: 'Charging', name: 'Charging System', status: 'charging', alerts: 0, description: 'AC/DC Charging, Power Management' },
    { id: 'Thermal', name: 'Thermal Management', status: 'warning', alerts: 1, description: 'Battery & Motor Cooling' },
    { id: 'HV', name: 'High Voltage System', status: 'healthy', alerts: 0, description: 'Insulation, Safety, Distribution' },
    { id: 'Energy', name: 'Energy Management', status: 'healthy', alerts: 0, description: 'Consumption, Regeneration, Range' }
  ]

  const handleScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setDiagnosticData({
        scanTime: new Date().toLocaleTimeString(),
        vehicleStatus: 'Connected',
        totalSystems: 6,
        healthySystems: 5,
        systemsWithAlerts: 1
      })
      setIsScanning(false)
    }, 3000)
  }

  return (
    <div className="bg-zinc-900/90 text-white p-6 rounded-lg mb-6 border border-zinc-700/50">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-xl font-bold mb-2">FAST Tool - Vehicle Diagnostics Dashboard</h4>
            <p className="text-zinc-400 text-sm">Real-time EV diagnostics and system monitoring interface</p>
          </div>
          <button 
            onClick={handleScan}
            disabled={isScanning}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 text-sm"
          >
            <RefreshCw className={isScanning ? 'animate-spin' : ''} size={16} />
            {isScanning ? 'Scanning...' : 'System Scan'}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
          <div className="bg-zinc-800/70 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Battery className="text-green-400" size={16} />
              <span className="text-xs text-zinc-400">SOC</span>
            </div>
            <div className="text-lg font-bold">{realTimeData.batterySOC.toFixed(1)}%</div>
          </div>
          
          <div className="bg-zinc-800/70 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="text-blue-400" size={16} />
              <span className="text-xs text-zinc-400">SOH</span>
            </div>
            <div className="text-lg font-bold">{realTimeData.batterySOH.toFixed(1)}%</div>
          </div>
          
          <div className="bg-zinc-800/70 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="text-yellow-400" size={16} />
              <span className="text-xs text-zinc-400">HV</span>
            </div>
            <div className="text-lg font-bold">{realTimeData.batteryVoltage.toFixed(0)}V</div>
          </div>
          
          <div className="bg-zinc-800/70 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="text-orange-400" size={16} />
              <span className="text-xs text-zinc-400">Temp</span>
            </div>
            <div className="text-lg font-bold">{realTimeData.batteryTemp.toFixed(0)}°C</div>
          </div>
          
          <div className="bg-zinc-800/70 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Gauge className="text-purple-400" size={16} />
              <span className="text-xs text-zinc-400">Power</span>
            </div>
            <div className="text-lg font-bold">{realTimeData.motorPower.toFixed(1)}kW</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-zinc-800/70 p-4 rounded-lg">
            <h5 className="text-sm font-bold mb-3">EV System Status</h5>
            <div className="space-y-2">
              {evSystems.map((system) => (
                <div
                  key={system.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors text-sm ${
                    selectedSystem === system.id ? 'bg-blue-600/50' : 'bg-zinc-700/50 hover:bg-zinc-600/50'
                  }`}
                  onClick={() => setSelectedSystem(system.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-xs">{system.name}</div>
                      <div className="text-xs text-zinc-400">{system.description}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {system.status === 'healthy' && <CheckCircle className="text-green-400" size={14} />}
                      {system.status === 'warning' && <AlertTriangle className="text-yellow-400" size={14} />}
                      {system.status === 'charging' && <Zap className="text-blue-400" size={14} />}
                      <span className="text-xs">{system.alerts} alerts</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-800/70 p-4 rounded-lg">
            <h5 className="text-sm font-bold mb-3">Advanced Diagnostics</h5>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-cyan-400">271</div>
                  <div className="text-xs text-zinc-400">Wh/km</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400">972</div>
                  <div className="text-xs text-zinc-400">MΩ Insulation</div>
                </div>
              </div>
              
              <div className="border-t border-zinc-600 pt-3">
                <div className="text-xs text-zinc-300 mb-2">Battery Cell Balance</div>
                <div className="grid grid-cols-8 gap-1">
                  {Array.from({length: 8}, (_, i: number) => (
                    <div key={i} className="h-4 bg-green-500 rounded-sm opacity-90"></div>
                  ))}
                </div>
              </div>

              {diagnosticData.scanTime && (
                <div className="border-t border-zinc-600 pt-3">
                  <div className="text-xs text-zinc-300 mb-2">Latest Scan Results</div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-sm font-bold text-green-400">{diagnosticData.healthySystems}</div>
                      <div className="text-xs text-zinc-400">Healthy</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-yellow-400">{diagnosticData.systemsWithAlerts}</div>
                      <div className="text-xs text-zinc-400">Alerts</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-blue-400">{diagnosticData.totalSystems}</div>
                      <div className="text-xs text-zinc-400">Total</div>
                    </div>
                  </div>
                  <div className="text-xs text-zinc-400 mt-2">Scan: {diagnosticData.scanTime}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Enhanced Project Modal Component
function ProjectModal({ project, isOpen, onClose }: { project: Project | null, isOpen: boolean, onClose: () => void }) {
  if (!isOpen || !project) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-zinc-900 border border-zinc-700/50 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-700/50 p-6 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white">{project.title}</h2>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-purple-400 font-medium">{project.company}</span>
                <span className="text-zinc-400 text-sm">{project.period}</span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <X className="text-zinc-400 hover:text-white" size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          <p className="text-zinc-300 text-lg leading-relaxed">{project.description}</p>

          {/* EV Diagnostics Dashboard Demo for Fisker */}
          {project.hasDemo && project.title.includes('Fisker') && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Interactive Demo</h3>
              <EVDiagnosticsDashboard />
            </div>
          )}

          {/* Key Achievements */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Award className="text-purple-400" size={20} />
              Key Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.achievements.map((achievement, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/30">
                  <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={16} />
                  <span className="text-zinc-300">{achievement}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Special rendering for Humanoid Robotics project */}
          {project.title.includes('Humanoid Robotics') && project.serviceRequirements && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="text-blue-400" size={20} />
                Service Requirements Evolution
              </h3>
              <div className="space-y-6">
                {Object.values(project.serviceRequirements).map((year: any, index) => (
                  <div key={index} className="border border-zinc-700/50 p-6 rounded-lg bg-zinc-800/30">
                    <h4 className="font-bold text-white text-lg mb-2">{year.title}</h4>
                    <p className="text-zinc-400 mb-4">{year.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {year.details.map((detail: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2">
                          <ChevronRight size={16} className="text-blue-400 mt-1 flex-shrink-0" />
                          <span className="text-zinc-300 text-sm">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Complete KPI Framework for Humanoid Robotics */}
          {project.title.includes('Humanoid Robotics') && project.kpiFramework && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="text-purple-400" size={20} />
                Comprehensive KPI Framework
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(project.kpiFramework).map(([category, kpis]: [string, any]) => (
                  <div key={category} className="border border-zinc-700/50 p-6 rounded-lg bg-zinc-800/30">
                    <h4 className="font-bold text-blue-400 text-lg mb-4 capitalize">
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <div className="space-y-2">
                      {kpis.map((kpi: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Target size={14} className="text-purple-400 mt-1 flex-shrink-0" />
                          <span className="text-zinc-300 text-sm">{kpi}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenges & Solutions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="text-red-400" size={20} />
                Challenges
              </h3>
              <div className="space-y-3">
                {project.challenges.map((challenge, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                    <AlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-zinc-300">{challenge}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-400" size={20} />
                Solutions
              </h3>
              <div className="space-y-3">
                {project.solutions.map((solution, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                    <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-zinc-300">{solution}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Code className="text-cyan-400" size={20} />
              Technologies & Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="px-3 py-2 bg-zinc-800/70 border border-zinc-700/50 text-zinc-300 rounded-lg text-sm hover:bg-zinc-700/70 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Impact */}
          <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <TrendingUp className="text-purple-400" size={20} />
              Impact & Results
            </h3>
            <p className="text-zinc-300 text-lg leading-relaxed">{project.impact}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Enhanced Project Card Component
function ProjectCard({ project, onClick }: { project: Project, onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Animated background */}
      <div className={cn(
        "absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-75 transition duration-500",
        isHovered ? "opacity-100 scale-105" : "opacity-75"
      )}></div>
      
      <div className={cn(
        "relative p-6 bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 rounded-lg h-full transition-all duration-300",
        isHovered ? "transform -translate-y-2 shadow-2xl" : ""
      )}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                {project.company}
              </span>
              <span className="text-xs text-zinc-500">{project.period}</span>
            </div>
          </div>
          
          <div className={cn(
            "p-2 rounded-lg transition-all duration-300",
            isHovered ? "bg-purple-500/20 text-purple-400" : "bg-zinc-800/50 text-zinc-500"
          )}>
            <Maximize2 size={18} />
          </div>
        </div>
        
        {/* Description */}
        <p className="text-zinc-400 mb-4 line-clamp-3">{project.description}</p>
        
        {/* Preview of key achievements */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-white mb-2">Key Highlights:</h4>
          <ul className="space-y-1">
            {project.achievements.slice(0, 3).map((achievement, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-zinc-400">
                <ChevronRight size={12} className="text-purple-400 mt-1 flex-shrink-0" />
                <span className="line-clamp-1">{achievement}</span>
              </li>
            ))}
          </ul>
          {project.achievements.length > 3 && (
            <p className="text-xs text-zinc-500 mt-2">+{project.achievements.length - 3} more achievements</p>
          )}
        </div>

        {/* Technology preview */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <span key={idx} className="px-2 py-1 bg-zinc-700/50 text-zinc-300 rounded text-xs">
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 bg-zinc-700/50 text-zinc-400 rounded text-xs">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Special indicators */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {project.hasDemo && (
              <span className="flex items-center gap-1 text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                <Eye size={10} />
                Live Demo
              </span>
            )}
            {project.serviceRequirements && (
              <span className="flex items-center gap-1 text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20">
                <Target size={10} />
                Strategy
              </span>
            )}
          </div>
          
          <div className={cn(
            "text-purple-400 font-medium text-sm transition-all duration-300 flex items-center gap-1",
            isHovered ? "translate-x-1" : ""
          )}>
            View Details
            <ArrowRight size={14} />
          </div>
        </div>

        {/* Hover overlay */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent rounded-lg transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}></div>
      </div>
    </div>
  )
}

// Timeline Component for Work Experience
function VerticalTimeline() {
  const companies: Company[] = [
    { 
      name: 'Evaluate Consulting', 
      role: 'Founder & Multi-Domain Consultant', 
      period: '2024-Present', 
      color: 'bg-purple-500',
      industry: 'Cross-Industry Consulting',
      location: 'Global',
      achievements: [
        'Trained 50+ service engineers across multiple clients',
        'Reduced technical escalations by 30%',
        'Implemented process automation improving workflows by 20%'
      ]
    },
    { 
      name: 'Fisker', 
      role: 'Service Product Manager & Engineer', 
      period: '2022-2024', 
      color: 'bg-green-500',
      industry: 'Electric Vehicles',
      location: 'Global',
      achievements: [
        'Reduced ECU flashing time by 40% (60 to 35 minutes)',
        'Increased diagnostic efficiency by 35%',
        'Saved $2M in supplier costs through RFI/RFP optimization',
        'Trained 150+ engineers globally on diagnostic protocols'
      ]
    },
    { 
      name: 'Rivian', 
      role: 'Diagnostics Engineer', 
      period: '2021-2022', 
      color: 'bg-blue-500',
      industry: 'Electric Vehicles',
      location: 'USA',
      achievements: [
        'Reduced remote diagnostic response time by 60%',
        'Saved $1.2M annually through tool optimization',
        'Boosted internal software adoption by 45%',
        'Increased issue resolution rate by 25%'
      ]
    },
    { 
      name: 'Tesla', 
      role: 'Lead Field Remote Diagnostics Engineer', 
      period: '2018-2021', 
      color: 'bg-red-500',
      industry: 'Electric Vehicles',
      location: 'Global',
      achievements: [
        'Resolved 32,000+ engineering escalations',
        'Reduced field diagnostic time by 50%',
        'Saved $3M in buyback investigations',
        'Enhanced service readiness across 4 global regions'
      ]
    },
    { 
      name: 'Iridium', 
      role: 'Product Support Engineer', 
      period: '2014-2016', 
      color: 'bg-indigo-500',
      industry: 'Satellite Communications',
      location: 'USA',
      achievements: [
        'Ensured 99.99% satellite uptime',
        'Managed 66 Low Earth Orbit satellites',
        'Increased network reliability by 40%',
        'Reduced troubleshooting time by 50%'
      ]
    },
    { 
      name: 'Verizon', 
      role: 'Technical Consultant', 
      period: '2005-2014', 
      color: 'bg-red-600',
      industry: 'Telecommunications',
      location: 'USA',
      achievements: [
        'Optimized 500+ cell sites',
        'Reduced average resolution time by 25%',
        'Led 3G, LTE, and LTE-A deployments',
        'Improved RF coverage reducing disruptions by 15%'
      ]
    }
  ]

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Central timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-green-500"></div>
      
      <div className="space-y-12">
        {companies.map((company, index) => (
          <div key={index} className="relative">
            {/* Timeline node - centered */}
            <div className={cn(
              "absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-zinc-900 z-10",
              company.color
            )}></div>
            
            {/* Content card - alternating sides */}
            <div className={cn(
              "relative flex w-full",
              index % 2 === 0 ? "justify-start pr-1/2 pr-8" : "justify-end pl-1/2 pl-8"
            )}>
              <div className={cn(
                "relative group max-w-md w-full",
                index % 2 === 0 ? "" : "text-right"
              )}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative p-6 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg">
                  <div className={cn(
                    "flex items-center justify-between mb-3", 
                    index % 2 !== 0 ? "flex-row-reverse" : ""
                  )}>
                    <h3 className="text-xl font-bold text-white">{company.name}</h3>
                    <span className="text-xs text-zinc-400 bg-zinc-700/50 px-2 py-1 rounded-full">
                      {company.period}
                    </span>
                  </div>
                  <p className="text-purple-400 font-medium mb-1">{company.role}</p>
                  <p className="text-zinc-400 text-sm mb-3">{company.industry} • {company.location}</p>
                  
                  <div className="space-y-1">
                    {company.achievements.slice(0, 2).map((achievement, idx) => (
                      <div key={idx} className={cn(
                        "flex items-start gap-2 text-sm text-zinc-300",
                        index % 2 !== 0 ? "flex-row-reverse text-right" : ""
                      )}>
                        <ChevronRight size={12} className="text-purple-400 mt-1 flex-shrink-0" />
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Skills Grid Component
function SkillsGrid() {
  const skills: Skill[] = [
    { name: 'Leadership', level: 97 },
    { name: 'TT&C', level: 96 },
    { name: 'Training', level: 96 },
    { name: 'CAN/CAN-FD', level: 95 },
    { name: 'DoIP', level: 94 },
    { name: 'AutoCAD/CATIA', level: 94 },
    { name: 'SSH', level: 93 },
    { name: 'React.js', level: 93 },
    { name: 'UDS Protocols', level: 92 },
    { name: 'Repair Planning', level: 91 },
    { name: 'Remote Debug', level: 90 },
    { name: 'QGIS', level: 90 },
    { name: 'HV/LV Systems', level: 89 },
    { name: 'ISO 13400', level: 88 },
    { name: 'Python', level: 86 },
    { name: 'ADAS', level: 85 }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
      {skills.map((skill, index) => (
        <div key={index} className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative p-4 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg text-center">
            <h3 className="text-sm font-bold text-white mb-2">{skill.name}</h3>
            <div className="w-full bg-zinc-700 rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
            <span className="text-xs text-purple-400 font-medium">{skill.level}%</span>
          </div>
        </div>
      ))}
    </div>
  )
}

// ROI Calculator Component
function ROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    serviceTeamSize: 25,
    avgDiagnosticTime: 45,
    escalationRate: 15,
    technicianHourlyRate: 75,
    monthlyVehicleVolume: 500,
    trainingCostPerTech: 2000,
    downtimeHours: 12
  })

  const [results, setResults] = useState<ROIResults>({
    currentMonthlyCosts: 0,
    monthlySavings: 0,
    annualSavings: 0,
    trainingInvestment: 0,
    roi: 0,
    paybackMonths: 0
  })

  useEffect(() => {
    const diagnosticTimeSavings = (inputs.monthlyVehicleVolume * inputs.avgDiagnosticTime * 0.4 / 60) * inputs.technicianHourlyRate
    const escalationSavings = (inputs.monthlyVehicleVolume * inputs.escalationRate / 100 * 2) * inputs.technicianHourlyRate
    const downtimeSavings = (inputs.downtimeHours * 0.3) * inputs.technicianHourlyRate * inputs.serviceTeamSize
    
    const totalMonthlySavings = diagnosticTimeSavings + escalationSavings + downtimeSavings
    const annualSavings = totalMonthlySavings * 12
    const trainingInvestment = inputs.serviceTeamSize * inputs.trainingCostPerTech
    const roi = ((annualSavings - trainingInvestment) / trainingInvestment) * 100
    const paybackMonths = trainingInvestment / totalMonthlySavings

    setResults({
      currentMonthlyCosts: inputs.monthlyVehicleVolume * (inputs.avgDiagnosticTime / 60) * inputs.technicianHourlyRate,
      monthlySavings: totalMonthlySavings,
      annualSavings: annualSavings,
      trainingInvestment: trainingInvestment,
      roi: roi,
      paybackMonths: paybackMonths
    })
  }, [inputs])

  const formatCurrency = (num: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num)

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
        <div className="relative p-8 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-6">Input Parameters</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Service Team Size</label>
              <input
                type="number"
                value={inputs.serviceTeamSize}
                onChange={(e) => setInputs({...inputs, serviceTeamSize: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Avg Diagnostic Time (min)</label>
              <input
                type="number"
                value={inputs.avgDiagnosticTime}
                onChange={(e) => setInputs({...inputs, avgDiagnosticTime: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Monthly Vehicle Volume</label>
              <input
                type="number"
                value={inputs.monthlyVehicleVolume}
                onChange={(e) => setInputs({...inputs, monthlyVehicleVolume: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Training Cost per Tech</label>
              <input
                type="number"
                value={inputs.trainingCostPerTech}
                onChange={(e) => setInputs({...inputs, trainingCostPerTech: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative p-6 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Return on Investment</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Training Investment</span>
                <span className="font-semibold text-white">
                  {formatCurrency(results.trainingInvestment)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Monthly Savings</span>
                <span className="font-semibold text-green-400">
                  {formatCurrency(results.monthlySavings)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Annual Savings</span>
                <span className="font-semibold text-green-400">
                  {formatCurrency(results.annualSavings)}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-zinc-600 pt-3">
                <span className="text-zinc-300 font-semibold">ROI</span>
                <span className="font-bold text-green-400 text-lg">
                  {results.roi.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Payback Period</span>
                <span className="font-semibold text-green-400">
                  {results.paybackMonths.toFixed(1)} months
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative p-6 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Based on Real Results</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                <span className="text-zinc-300">40% reduction in ECU flashing time (Fisker)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                <span className="text-zinc-300">60% faster remote diagnostics (Rivian)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                <span className="text-zinc-300">50% reduction in field time (Tesla)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Training Program Component - Mock for other modules
function MockTrainingProgram() {
  const [currentModule, setCurrentModule] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const modules: TrainingModule[] = [
    {
      id: 1,
      title: 'Advanced CAN/CAN-FD Diagnostics',
      duration: '45 min',
      description: 'Master modern vehicle communication protocols and diagnostic procedures',
      topics: ['CAN Network Fundamentals', 'UDS Protocol Implementation', 'Error Detection & Analysis', 'Real-world Case Studies']
    },
    {
      id: 2,
      title: 'Remote Diagnostic Strategies',
      duration: '60 min', 
      description: 'Learn to troubleshoot complex issues without physical access to vehicles',
      topics: ['SSH Remote Access', 'Log Analysis Techniques', 'Cloud-based Diagnostics', 'Customer Communication']
    },
    {
      id: 3,
      title: 'Process Optimization & Automation',
      duration: '50 min',
      description: 'Implement efficient workflows and automated diagnostic procedures',
      topics: ['Workflow Design', 'Automation Tools', 'KPI Tracking', 'Continuous Improvement']
    }
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false)
            return 100
          }
          return prev + 1
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <h3 className="text-xl font-bold text-white mb-6">Training Modules</h3>
        <div className="space-y-3">
          {modules.map((module, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentModule(index)
                setProgress(0)
                setIsPlaying(false)
              }}
              className={cn(
                "w-full text-left p-4 rounded-lg border transition-all",
                currentModule === index 
                  ? "bg-purple-500/20 border-purple-500/50 text-white" 
                  : "bg-zinc-800/50 border-zinc-700/50 text-zinc-400 hover:text-white"
              )}
            >
              <div className="font-medium">{module.title}</div>
              <div className="text-sm opacity-75">{module.duration}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative p-8 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">{modules[currentModule].title}</h3>
              <span className="text-sm text-zinc-400 bg-zinc-700/50 px-3 py-1 rounded-full">
                {modules[currentModule].duration}
              </span>
            </div>

            <p className="text-zinc-300 mb-6">{modules[currentModule].description}</p>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-400">Progress</span>
                <span className="text-sm text-zinc-400">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-zinc-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button
                onClick={() => {
                  setProgress(0)
                  setIsPlaying(false)
                }}
                className="flex items-center gap-2 bg-zinc-600 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <RotateCcw size={20} />
                Reset
              </button>
            </div>

            {/* Module Topics */}
            <div>
              <h4 className="font-semibold text-white mb-3">Module Topics</h4>
              <div className="grid grid-cols-2 gap-3">
                {modules[currentModule].topics.map((topic, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-zinc-700/30 rounded-lg">
                    <CheckCircle size={16} className="text-purple-400" />
                    <span className="text-zinc-300 text-sm">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Floating Navigation Component
function FloatingNav() {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [activeSection, setActiveSection] = useState<string>('')

  const navItems: Array<{name: string, href: string, id: string}> = [
    { name: "About", href: "#about", id: "about" },
    { name: "Experience", href: "#experience", id: "experience" }, 
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "ROI", href: "#roi-calculator", id: "roi-calculator" },
    { name: "Training", href: "#training", id: "training" },
    { name: "Contact", href: "#contact", id: "contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)

      // Check which section is currently in view
      const sections = navItems.map(item => item.id)
      let currentSection = ''

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = sectionId
            break
          }
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/ASCV25.pdf'
    link.download = 'Ahmed_Said_Resume.pdf'
    link.setAttribute('type', 'application/pdf')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className={cn(
      "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300",
      isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
    )}>
      <div className="relative px-4 py-3 rounded-full bg-zinc-800/80 backdrop-blur-md border border-zinc-700/50 shadow-lg max-w-[90vw] overflow-hidden">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur opacity-50"></div>
        <div className="relative flex items-center gap-1 overflow-x-auto scrollbar-hide">
          <span className="font-bold text-lg mr-4 flex-shrink-0">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Ahmed</span>
            <span className="text-white ml-1">Said</span>
          </span>
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "px-3 py-1 text-sm font-medium transition-all duration-300 rounded-full flex-shrink-0",
                activeSection === item.id 
                  ? "text-white bg-purple-500/20 border border-purple-500/30" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-700/30"
              )}
            >
              {item.name}
            </a>
          ))}
          <button 
            onClick={handleDownload}
            className="ml-2 px-4 py-1 text-sm bg-zinc-700 hover:bg-zinc-600 border border-zinc-600 hover:border-zinc-500 rounded-full text-white font-medium transition-all flex-shrink-0"
          >
            Resume
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const achievements: Achievement[] = [
    { value: '$6.2M+', label: 'Cost Savings Generated', icon: DollarSign },
    { value: '300+', label: 'Professionals Trained', icon: Users },
    { value: '32K+', label: 'Engineering Escalations Resolved', icon: Code },
    { value: '20+', label: 'Years Multi-Domain Experience', icon: Award },
    { value: '4', label: 'Global Regions Served', icon: Globe },
    { value: '99.99%', label: 'Satellite Uptime Maintained', icon: Zap }
  ]

  const projects: Project[] = [
    {
      title: 'Fisker Aftersales Service Tool (FAST)',
      company: 'Fisker',
      period: '2022-2024',
      description: 'Revolutionary diagnostic platform that became the backbone of Fisker\'s service operations. Comprehensive UI/UX design for vehicle communication via CAN/CAN-FD/LIN & UDS protocols.',
      achievements: [
        'Reduced ECU flashing time by 40% (from 60 to 35 minutes)',
        'Increased diagnostic efficiency by 35%',
        'Saved $2M in supplier costs through RFI/RFP optimization',
        'Trained 150+ engineers and senior architects globally',
        'Improved software release cycle efficiency by 50%',
        'Led team of 6 direct reports globally'
      ],
      technologies: ['CAN/CAN-FD', 'LIN', 'UDS', 'OBD', 'VCI Integration', 'Azure Directory', 'UI/UX Design', 'IoT Controls', 'ADAS Calibration', 'CANoe Suite', 'Vehicle Spy', 'JIRA', 'Agile'],
      challenges: [
        'Cross-cultural team management (India & EU)',
        'Complex multi-protocol vehicle communication',
        'Real-time diagnostic data processing',
        'Supplier integration and cost optimization',
        'Integration of pre-delivery and post-delivery service strategies'
      ],
      solutions: [
        'Designed intuitive UI mockups for service diagnostic tool',
        'Implemented vehicle overview capability within 60 seconds',
        'Created full-scale DTC scan with architecture display',
        'Developed intelligent ECU flashing sequence methodology',
        'Advanced IO controls and calibration routines including ADAS'
      ],
      impact: 'Revolutionary diagnostic tool that transformed Fisker\'s service operations with industry-leading efficiency gains',
      hasDemo: true
    },
    {
      title: 'Tesla Remote Diagnostics System',
      company: 'Tesla',
      period: '2018-2021',
      description: 'Built world-class remote diagnostic strategies for global service centers covering ADAS, HV/LV systems, infotainment, and body/chassis systems.',
      achievements: [
        'Resolved 32,000+ engineering escalations',
        'Reduced field diagnostic time by 50%',
        'Saved $3M in buyback investigations',
        'Reduced incident resolution time by 35%',
        'Enhanced service readiness across 4 global regions',
        'Led training programs for service center technicians'
      ],
      technologies: ['SSH', 'DoIP', 'Syslog Generation', 'HV Safety Protocols', 'AutoPilot Analysis', 'OTA Management', 'Remote Diagnostics'],
      challenges: [
        'Complex EV systems requiring remote troubleshooting',
        'Global service coordination across multiple time zones',
        'AutoPilot incident analysis and resolution',
        'Training technicians on advanced diagnostic procedures'
      ],
      solutions: [
        'Advanced SSH capabilities for remote system access',
        'Comprehensive log analysis and diagnostic procedures',
        'Real-time troubleshooting and problem-solving strategies',
        'Systematic training programs focused on HV safety protocols'
      ],
      impact: 'Revolutionized Tesla\'s global service operations with remote diagnostic capabilities, enabling rapid issue resolution and significant cost savings in buyback investigations.'
    },
    {
      title: 'Rivian Cloud Diagnostics Platform',
      company: 'Rivian',
      period: '2021-2022',
      description: 'Designed and implemented RivianOS cloud-based remote diagnostics and repair planning system for next-generation electric adventure vehicles.',
      achievements: [
        'Reduced remote diagnostic response time by 60%',
        'Saved $1.2M annually through tool optimization',
        'Boosted internal diagnostics software adoption by 45%',
        'Increased issue resolution rate by 25%',
        'Created comprehensive training materials',
        'Delivered KPI-based reports for executive stakeholders'
      ],
      technologies: ['Cloud Computing', 'RivianOS', 'Remote Diagnostics', 'Planning Systems', 'KPI Analytics', 'Training Documentation'],
      challenges: [
        'Building diagnostics from scratch for new EV platform',
        'Integrating cloud-based solutions with vehicle systems',
        'Establish diagnostics stations with mechanical, electrical, and software tools',
        'Create lab checklists for daily, weekly, monthly maintenance',
        'Deploy CRM workflow management system with incident reporting',
        'Knowledge base framework with troubleshooting procedures',
        'Regional OTA rollout strategy development'
      ],
      solutions: [
        'Cloud-native diagnostic architecture for scalability',
        'Integrated repair planning with diagnostic workflows',
        'Comprehensive KPI tracking and milestone reporting',
        'Detailed training materials and technical documentation'
      ],
      impact: 'Established foundation for Rivian\'s service operations with innovative cloud-based diagnostics, enabling efficient remote support for adventure vehicles.'
    },
    {
      title: '3-Year Humanoid Robotics Service Strategy',
      company: '1X Technologies',
      period: '2024',
      description: 'Comprehensive 3-year service strategy for humanoid robots featuring tiered support infrastructure, predictive maintenance algorithms, and ML-powered diagnostics for the $66B robotics market growing at 45.5% CAGR.',
      achievements: [
        'Designed 3-tier service support architecture (Tier 1: Basic Support → Tier 3: Field Engineers)',
        'Established comprehensive KPI framework for humanoid robot fleet management',
        'Created predictive maintenance strategy using ML algorithms and IoT sensors',
        'Developed CRM workflow management system with JIRA integration',
        'Designed regional OTA rollout strategy with homologation compliance',
        'Implemented Flying Doctors/Service Partner Networks for unsupported regions'
      ],

      serviceRequirements: {
        year1: {
          title: 'Year 1: Foundation & Hardware Focus',
          description: 'Tier 3 (Field Service Engineers) for hardware failures requiring physical intervention',
          details: [
            'Establish'
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
  impact: 'Strategic roadmap positioning humanoid robotics service engineering at the forefront of the $66B market, with framework adaptable across robotics, automotive, and IoT industries.'
},
{
  title: 'Bentley APAC Product Support Planning',
  company: 'Bentley Motors APAC',
  period: '2024',
  description: 'Comprehensive technical service workflow transformation for Bentley APAC, implementing pre-delivery engineering diagnostics, post-delivery service strategy, and cost reduction methodologies for luxury automotive operations.',
  achievements: [
    'Implemented pre-delivery engineering level diagnostics framework',
    'Developed post-delivery service strategy and execution procedures',
    'Created cost reduction methodologies for luxury vehicle operations',
    'Established product support management workflows and processes',
    'Designed systematic issue prioritization based on impact and brand reputation',
    'Implemented cross-functional collaboration protocols'
  ],
  technologies: [
    'Diagnostic Systems',
    'Process Management', 
    'Cost Analysis Tools',
    'Quality Control Systems',
    'Workflow Automation',
    'Performance Analytics'
  ],
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
  impact: 'Transformed Bentley APAC product support operations with comprehensive management procedures, enhancing quality assurance and operational efficiency for luxury automotive market'
}
]

const openProjectModal = (project: Project) => {
  setSelectedProject(project)
  setIsModalOpen(true)
}

const closeProjectModal = () => {
  setIsModalOpen(false)
  setSelectedProject(null)
}

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
            A seasoned engineering leader with two decades of cross-industry expertise, bridging the gap between cutting-edge technology and practical solutions. 
            From telecommunications infrastructure to revolutionary electric vehicles and next-generation robotics, I transform complex challenges into streamlined operations.
          </p>
          <div className="text-lg text-zinc-500 space-y-2">
            <p>🚗 <strong>Automotive Pioneer:</strong> Led diagnostic innovation at Tesla, Rivian, and Fisker</p>
            <p>🛰️ <strong>Global Communications:</strong> Maintained 99.99% uptime across 66 satellites at Iridium</p>
            <p>📡 <strong>Network Architect:</strong> Optimized 500+ cell sites during 9 years at Verizon</p>
            <p>🤖 <strong>Future Tech:</strong> Designing service strategies for humanoid robotics</p>
          </div>
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
                link.href = '/ASCV25.pdf'
                link.download = 'Ahmed_Said_Resume.pdf'
                link.setAttribute('type', 'application/pdf')
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
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
            <div className="absolute top-10 right-10 w-4 h-4 bg-purple-400 rounded-full animate-bounce"></div>
            <div className="absolute bottom-20 left-10 w-3 h-3 bg-pink-400 rounded-full animate-bounce animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>

    {/* About Section */}
    <section id="about" className="py-32 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Engineering <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Excellence</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            What drives me is the intersection of human ingenuity and technological possibility. Throughout my career, I've learned that the most complex engineering challenges are often solved not by the most sophisticated algorithms, but by deeply understanding the human element.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative p-6 bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 rounded-lg">
                <achievement.icon className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{achievement.value}</h3>
                <p className="text-zinc-400 text-sm">{achievement.label}</p>
              </div>
            </div>
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
            Two decades of engineering leadership across industries that define our connected world
          </p>
        </div>
        
        <VerticalTimeline />
      </div>
    </section>

    {/* Enhanced Projects Section */}
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
            Breakthrough engineering solutions that transformed operations and delivered measurable impact
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project}
              onClick={() => openProjectModal(project)}
            />
          ))}
        </div>
      </div>
    </section>

    {/* Project Modal */}
    <ProjectModal 
      project={selectedProject}
      isOpen={isModalOpen}
      onClose={closeProjectModal}
    />

    {/* Skills Section */}
    <section id="skills" className="py-32 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Technical <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Expertise</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Core competencies refined through 20+ years of hands-on engineering
          </p>
        </div>
        
        <SkillsGrid />
      </div>
    </section>

    {/* ROI Calculator Section */}
    <section id="roi-calculator" className="py-32 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            ROI <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Calculator</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Calculate the return on investment for advanced diagnostic training and process optimization based on real-world results
          </p>
        </div>
        
        <ROICalculator />
      </div>
    </section>

    {/* Training Section - Updated */}
    <section id="training" className="py-32 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            LX Design <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">& Training</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Custom instructional design and training facilitation tailored to elevate technical expertise, optimize diagnostic workflows, and drive measurable performance improvements
          </p>
        </div>
        
        {/* EV Diagnostics Training - Featured */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Featured: EV Diagnostics Training</h3>
            <p className="text-zinc-400">Interactive PicoScope training for electric vehicle diagnostics</p>
          </div>
          <EVDiagnosticsTraining />
        </div>
        
        {/* Other Training Modules */}
        <div className="border-t border-zinc-700/50 pt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Additional Training Programs</h3>
            <p className="text-zinc-400">Comprehensive modules for automotive diagnostics and process optimization</p>
          </div>
          <MockTrainingProgram />
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
          <div className="flex justify-center items-center gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <a href="mailto:ahmed.osaid.pro@gmail.com" className="text-purple-400 hover:text-pink-400 transition-colors">
                E-Mail
              </a>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <a href="tel:+16024022505" className="text-purple-400 hover:text-pink-400 transition-colors">
                Call Me
              </a>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Linkedin className="w-8 h-8 text-white" />
              </div>
              <a href="https://www.linkedin.com/in/ahmedosaid/" className="text-purple-400 hover:text-pink-400 transition-colors">
                Connect with me
              </a>
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
            © 2025 Ahmed Said. Engineering excellence across industries.
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
