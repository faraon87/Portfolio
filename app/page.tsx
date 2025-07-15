'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { 
  ChevronDown, 
  ChevronRight, 
  Download, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Target,
  DollarSign,
  Users,
  Zap,
  Clock,
  Award,
  Activity,
  Play, 
  Pause, 
  RotateCcw, 
  Battery, 
  BookOpen,
  ArrowRight,
  Settings,
  Eye,
  Upload
} from 'lucide-react'

// Types
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
}

interface Skill {
  name: string
  level: number
}

interface TrainingModule {
  id: number
  title: string
  duration: string
  description: string
  topics: string[]
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

// Types for signal configuration
type SignalType = 'can-bus' | 'motor-pwm' | 'battery-cell' | 'charging';

interface SignalConfig {
  name: string;
  description: string;
  frequency: string;
  amplitude: string;
}

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

  const lessonSteps = {
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

// Mock Training Program Component for other modules
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
                  : "bg-zinc-800/50 border-zinc-700/50 text-zinc-400 hover:text-white hover:border-zinc-600/50"
              )}
            >
              <h4 className="font-medium mb-2">{module.title}</h4>
              <p className="text-xs opacity-75 mb-2">{module.description}</p>
              <div className="text-xs text-purple-400">{module.duration}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative p-6 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">{modules[currentModule].title}</h3>
            <p className="text-zinc-300 mb-6">{modules[currentModule].description}</p>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-zinc-400">Progress</span>
                <span className="text-sm text-purple-400">{progress}%</span>
              </div>
              <div className="w-full bg-zinc-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-4 mb-6">
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

// Projects data
const projects: Project[] = [
  {
    title: 'Fisker Ocean ECU Flashing Tool',
    company: 'Fisker Inc.',
    period: '2022-2024',
    description: 'Led comprehensive software development for Fisker Ocean ECU flashing tool, transforming vehicle service operations.',
    achievements: [
      'Reduced ECU flashing time by 40%',
      'Achieved 99.7% flash success rate across 25+ ECU types',
      'Saved $850K annually through automation',
      'Eliminated manual configuration errors',
      'Reduced service bay time by 2.5 hours per vehicle',
      'Integrated comprehensive logging and audit trails'
    ],
    technologies: ['Python', 'C++', 'CAN/CAN-FD', 'UDS Protocol', 'DoIP', 'Vehicle Networks', 'Diagnostics', 'Automation'],
    challenges: [
      'Complex multi-ECU flash sequences requiring precise timing',
      'Ensuring flash reliability across diverse hardware configurations',
      'Integrating with existing service workflows and tools',
      'Managing dependencies between interconnected ECU systems'
    ],
    solutions: [
      'Automated dependency resolution and flash sequencing',
      'Real-time monitoring and error recovery mechanisms',
      'Comprehensive validation testing across all vehicle configurations',
      'Intuitive UI/UX design for service technician efficiency'
    ],
    impact: 'Revolutionized Fisker service operations, enabling faster vehicle delivery and significantly improved customer satisfaction through reliable, automated ECU management.'
  },
  {
    title: 'Tesla Remote Diagnostics Platform',
    company: 'Tesla',
    period: '2018-2021',
    description: 'Spearheaded global remote diagnostics engineering for Tesla Model S, 3, X, and Y, revolutionizing automotive service delivery.',
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
      'Establishing KPI frameworks for new technology',
      'Training teams on completely new diagnostic procedures'
    ],
    solutions: [
      'Cloud-native diagnostic architecture for scalability',
      'Integrated repair planning with diagnostic workflows',
      'Comprehensive KPI tracking and milestone reporting',
      'Detailed training materials and technical documentation'
    ],
    impact: 'Established foundation for Rivian\'s service operations with innovative cloud-based diagnostics, enabling efficient remote support for adventure vehicles.'
  }
]

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
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
    )}>
      <nav className="bg-zinc-900/80 backdrop-blur-md border border-zinc-700/50 rounded-full px-6 py-3">
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeSection === item.id
                  ? "bg-purple-500 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              )}
            >
              {item.name}
            </a>
          ))}
          <div className="w-px h-6 bg-zinc-700 mx-2" />
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            <Download size={16} />
            Resume
          </button>
        </div>
      </nav>
    </div>
  )
}

// Hero Section Component
function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            Ahmed Said
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 mb-6 max-w-3xl mx-auto">
            Senior Engineering Leader specializing in EV diagnostics, remote troubleshooting, and next-generation automotive technologies
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="bg-zinc-800/50 border border-zinc-700/50 px-4 py-2 rounded-full text-sm text-zinc-300">
              20+ Years Experience
            </span>
            <span className="bg-zinc-800/50 border border-zinc-700/50 px-4 py-2 rounded-full text-sm text-zinc-300">
              EV Diagnostics Expert
            </span>
            <span className="bg-zinc-800/50 border border-zinc-700/50 px-4 py-2 rounded-full text-sm text-zinc-300">
              Remote Troubleshooting
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#projects"
            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            View My Work
            <ChevronDown className="w-5 h-5" />
          </a>
          <a
            href="#contact"
            className="border border-zinc-600 hover:border-zinc-500 text-white px-8 py-4 rounded-lg font-medium transition-colors"
          >
            Get In Touch
          </a>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-1">32K+</div>
            <div className="text-sm text-zinc-400">Issues Resolved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-pink-400 mb-1">$5M+</div>
            <div className="text-sm text-zinc-400">Cost Savings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">50%</div>
            <div className="text-sm text-zinc-400">Time Reduction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-green-400 mb-1">4</div>
            <div className="text-sm text-zinc-400">Global Regions</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// About Section Component  
function AboutSection() {
  return (
    <section id="about" className="py-32 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Engineering <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Excellence</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Two decades of transformative engineering leadership in automotive diagnostics and cutting-edge technology solutions that redefine our connected world
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-6">
            <p className="text-lg text-zinc-300 leading-relaxed">
              With over 20 years of engineering expertise, I've led transformative projects at industry giants like Tesla, Rivian, and Fisker, revolutionizing how we approach electric vehicle diagnostics and service operations.
            </p>
            <p className="text-lg text-zinc-300 leading-relaxed">
              My passion lies in solving complex technical challenges through innovative remote diagnostic solutions, advanced training programs, and process optimization that delivers measurable impact to both teams and bottom lines.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div>
                <h4 className="text-purple-400 font-semibold mb-2">Core Expertise</h4>
                <ul className="text-zinc-300 space-y-1 text-sm">
                  <li>• EV Diagnostics & Troubleshooting</li>
                  <li>• Remote Engineering Solutions</li>
                  <li>• Process Optimization</li>
                  <li>• Team Leadership & Training</li>
                </ul>
              </div>
              <div>
                <h4 className="text-pink-400 font-semibold mb-2">Industries</h4>
                <ul className="text-zinc-300 space-y-1 text-sm">
                  <li>• Electric Vehicles</li>
                  <li>• Automotive Technology</li>
                  <li>• Satellite Communications</li>
                  <li>• Wireless Networks</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-lg"></div>
            <div className="relative bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg p-8">
              <h3 className="text-xl font-bold text-white mb-6">Impact Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-300">Engineering Escalations Resolved</span>
                  <span className="font-bold text-purple-400">32,000+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-300">Annual Cost Savings Generated</span>
                  <span className="font-bold text-green-400">$5M+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-300">Process Efficiency Improvement</span>
                  <span className="font-bold text-blue-400">50%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-300">Global Regions Supported</span>
                  <span className="font-bold text-pink-400">4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Project Card Component
function ProjectCard({ project, onClick }: { project: Project, onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className={cn(
        "absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur transition-all duration-300",
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
            isHovered ? "bg-purple-500/20 text-purple-400" : "bg-zinc-800 text-zinc-400"
          )}>
            <ExternalLink size={20} />
          </div>
        </div>

        {/* Description */}
        <p className="text-zinc-300 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Key Achievement */}
        <div className="mb-4">
          <div className="text-xs text-zinc-500 mb-1">Key Achievement</div>
          <div className="text-sm text-green-400 font-medium">
            {project.achievements[0]}
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-4">
          <div className="text-xs text-zinc-500 mb-2">Technologies</div>
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 4).map((tech, techIndex) => (
              <span 
                key={techIndex}
                className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded border border-zinc-700"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-xs text-zinc-500 px-2 py-1">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Impact */}
        <div className="text-xs text-zinc-400 italic line-clamp-2">
          {project.impact}
        </div>
      </div>
    </div>
  )
}

// Project Modal Component
function ProjectModal({ project, isOpen, onClose }: { project: Project | null, isOpen: boolean, onClose: () => void }) {
  if (!project || !isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-zinc-900 border border-zinc-700 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
              <div className="flex items-center gap-4">
                <span className="text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                  {project.company}
                </span>
                <span className="text-zinc-400">{project.period}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Description */}
          <p className="text-zinc-300 text-lg mb-8">{project.description}</p>

          {/* Grid Layout */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Achievements */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Key Achievements</h3>
              <div className="space-y-3">
                {project.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-zinc-300">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges & Solutions */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Challenges</h3>
                <div className="space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <AlertTriangle size={16} className="text-yellow-400 mt-1 flex-shrink-0" />
                      <span className="text-zinc-300">{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">Solutions</h3>
                <div className="space-y-3">
                  {project.solutions.map((solution, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Zap size={16} className="text-blue-400 mt-1 flex-shrink-0" />
                      <span className="text-zinc-300">{solution}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-white mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="bg-zinc-800 text-zinc-300 px-3 py-2 rounded border border-zinc-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Impact */}
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
            <h3 className="text-xl font-bold text-white mb-3">Impact</h3>
            <p className="text-zinc-300 italic">{project.impact}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Timeline Component
function VerticalTimeline() {
  const timelineData = [
    {
      period: '2022 - 2024',
      title: 'Senior Diagnostics Engineer',
      company: 'Fisker Inc.',
      description: 'Led comprehensive software development for Fisker Ocean ECU flashing tool, achieving 40% reduction in flashing time and 99.7% success rate.',
      highlights: ['$850K annual savings', '25+ ECU types supported', 'Zero manual errors']
    },
    {
      period: '2021 - 2022', 
      title: 'Senior Engineering Manager',
      company: 'Rivian',
      description: 'Designed RivianOS cloud-based diagnostics platform, reducing response time by 60% and saving $1.2M annually.',
      highlights: ['Cloud-native architecture', '45% adoption increase', 'Executive KPI reporting']
    },
    {
      period: '2018 - 2021',
      title: 'Lead Field Remote Diagnostics Engineer',
      company: 'Tesla',
      description: 'Spearheaded global remote diagnostics for Model S/3/X/Y, resolving 32,000+ escalations and saving $3M in buyback investigations.',
      highlights: ['4 global regions', '50% time reduction', 'HV safety protocols']
    },
    {
      period: '2014 - 2016',
      title: 'Product Support Engineer',
      company: 'Iridium Communications',
      description: 'Ensured 99.99% satellite uptime managing 66 LEO satellites, optimizing global commercial and government communications.',
      highlights: ['Global satellite network', '40% reliability increase', 'Commercial & gov clients']
    }
  ]

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500"></div>
      
      <div className="space-y-12">
        {timelineData.map((item, index) => (
          <div key={index} className={cn(
            "relative flex items-center",
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          )}>
            {/* Timeline dot */}
            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-zinc-900 transform -translate-x-1/2 z-10"></div>
            
            {/* Content */}
            <div className={cn(
              "ml-12 md:ml-0 md:w-1/2",
              index % 2 === 0 ? "md:pr-12" : "md:pl-12"
            )}>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative p-6 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg">
                  <div className="text-sm text-purple-400 mb-2">{item.period}</div>
                  <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                  <div className="text-lg text-zinc-300 mb-3">{item.company}</div>
                  <p className="text-zinc-400 mb-4">{item.description}</p>
                  <div className="space-y-2">
                    {item.highlights.map((highlight, highlightIndex) => (
                      <div key={highlightIndex} className={cn(
                        "flex items-center gap-2 text-sm",
                        index % 2 === 0 ? "justify-start" : "md:justify-end md:flex-row-reverse"
                      )}>
                        <ChevronRight size={12} className="text-purple-400 mt-1 flex-shrink-0" />
                        {highlight}
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
    { name: 'CAN/CAN-FD', level: 95 },
    { name: 'UDS Protocols', level: 92 },
    { name: 'ISO 13400', level: 88 },
    { name: 'TT&C', level: 96 },
    { name: 'Remote Debug', level: 90 },
    
    { name: 'DoIP', level: 94 },
    { name: 'Python', level: 86 },
    { name: 'SSH', level: 93 },
    { name: 'ADAS', level: 85 },
    { name: 'HV/LV Systems', level: 89 },
    
    { name: 'Leadership', level: 97 },
    { name: 'AutoCAD/CATIA', level: 94 },
    { name: 'Training', level: 96 },
    { name: 'Repair Planning', level: 91 },
    { name: 'React.js', level: 93 }
  ]

  return (
    <div className="grid grid-cols-5 gap-4 max-w-4xl mx-auto">
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
  const [inputs, setInputs] = useState({
    technicians: 50,
    hourlyRate: 85,
    hoursPerDay: 8,
    diagnosticTime: 2,
    trainingCost: 25000,
    efficiencyGain: 40
  })

  const calculateROI = () => {
    const dailyDiagnosticHours = inputs.technicians * inputs.diagnosticTime
    const timeSaved = dailyDiagnosticHours * (inputs.efficiencyGain / 100)
    const dailySavings = timeSaved * inputs.hourlyRate
    const annualSavings = dailySavings * 250 // 250 working days
    const roi = ((annualSavings - inputs.trainingCost) / inputs.trainingCost) * 100
    const paybackMonths = (inputs.trainingCost / (dailySavings * 21.67)) // 21.67 working days per month
    
    return {
      dailySavings,
      annualSavings,
      roi: Math.max(roi, 0),
      paybackMonths: Math.max(paybackMonths, 0)
    }
  }

  const results = calculateROI()

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative p-6 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Training Investment Calculator</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Number of Technicians</label>
                <input
                  type="number"
                  value={inputs.technicians}
                  onChange={(e) => setInputs({...inputs, technicians: parseInt(e.target.value) || 0})}
                  className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Hourly Rate ($)</label>
                <input
                  type="number"
                  value={inputs.hourlyRate}
                  onChange={(e) => setInputs({...inputs, hourlyRate: parseInt(e.target.value) || 0})}
                  className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Diagnostic Time per Day (hours)</label>
                <input
                  type="number"
                  step="0.5"
                  value={inputs.diagnosticTime}
                  onChange={(e) => setInputs({...inputs, diagnosticTime: parseFloat(e.target.value) || 0})}
                  className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Training Investment ($)</label>
                <input
                  type="number"
                  value={inputs.trainingCost}
                  onChange={(e) => setInputs({...inputs, trainingCost: parseInt(e.target.value) || 0})}
                  className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Expected Efficiency Gain (%)</label>
                <input
                  type="number"
                  value={inputs.efficiencyGain}
                  onChange={(e) => setInputs({...inputs, efficiencyGain: parseInt(e.target.value) || 0})}
                  className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative p-6 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Projected Results</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-zinc-300">Daily Savings</span>
                <span className="font-bold text-green-400 text-xl">
                  ${results.dailySavings.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-300">Annual Savings</span>
                <span className="font-bold text-green-400 text-xl">
                  ${results.annualSavings.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
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

// Contact Section Component
function ContactSection() {
  return (
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

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <a href="mailto:ahmed@example.com" className="flex items-center gap-4 text-zinc-300 hover:text-purple-400 transition-colors">
                  <Mail className="w-6 h-6" />
                  <span>ahmed@example.com</span>
                </a>
                <a href="tel:+1234567890" className="flex items-center gap-4 text-zinc-300 hover:text-purple-400 transition-colors">
                  <Phone className="w-6 h-6" />
                  <span>+1 (234) 567-8900</span>
                </a>
                <div className="flex items-center gap-4 text-zinc-300">
                  <MapPin className="w-6 h-6" />
                  <span>Available for Remote & On-site Consulting</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-white mb-4">Connect on Social</h4>
              <div className="flex gap-4">
                <a href="https://linkedin.com" className="p-3 bg-zinc-800 hover:bg-purple-500 text-zinc-300 hover:text-white rounded-lg transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://github.com" className="p-3 bg-zinc-800 hover:bg-purple-500 text-zinc-300 hover:text-white rounded-lg transition-colors">
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative p-8 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg">
              <h4 className="text-xl font-semibold text-white mb-6">Let's Discuss Your Project</h4>
              <form className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name"
                    className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-3 text-white placeholder-zinc-400 focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Your Email"
                    className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-3 text-white placeholder-zinc-400 focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    placeholder="Subject"
                    className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-3 text-white placeholder-zinc-400 focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Tell me about your project..."
                    rows={4}
                    className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-3 text-white placeholder-zinc-400 focus:border-purple-500 focus:outline-none resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Main Page Component
export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openProjectModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeProjectModal = () => {
    setSelectedProject(null)
    setIsModalOpen(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      <FloatingNav />
      
      <HeroSection />
      
      <AboutSection />

      {/* Experience Section */}
      <section id="experience" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Professional <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Journey</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Two decades of transformative engineering leadership across cutting-edge automotive and technology sectors that redefine our connected world
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
              Instructional Design / <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Training</span>
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

      <ContactSection />
    </main>
  )
}
