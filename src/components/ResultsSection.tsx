import { User, Mail, Phone, Code, Briefcase, GraduationCap, Target, TrendingUp } from 'lucide-react';
import type { ResumeData } from '../types';

interface ResultsSectionProps {
  data: ResumeData;
}

function ResultsSection({ data }: ResultsSectionProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Personal Info Card */}
      <div className="glass-effect rounded-2xl p-6 border border-neon-purple/20 hover:border-neon-purple/40 transition-all duration-300">
        <div className="flex items-center space-x-3 mb-4">
          <User className="w-6 h-6 text-neon-purple" />
          <h3 className="text-xl font-bold text-white">Personal Information</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-effect-dark p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-1">Name</p>
            <p className="text-white font-semibold">{data.name}</p>
          </div>
          <div className="glass-effect-dark p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-neon-blue" />
              <p className="text-sm text-gray-400">Email</p>
            </div>
            <p className="text-white font-semibold mt-1">{data.email}</p>
          </div>
          <div className="glass-effect-dark p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-neon-green" />
              <p className="text-sm text-gray-400">Phone</p>
            </div>
            <p className="text-white font-semibold mt-1">{data.phone}</p>
          </div>
        </div>
      </div>

      {/* Skills Card */}
      <div className="glass-effect rounded-2xl p-6 border border-neon-green/20 hover:border-neon-green/40 transition-all duration-300">
        <div className="flex items-center space-x-3 mb-4">
          <Code className="w-6 h-6 text-neon-green" />
          <h3 className="text-xl font-bold text-white">Skills Analysis</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {data.skills.map((skill, index) => (
            <div
              key={index}
              className={`
                px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-110
                ${skill.matched
                  ? 'bg-neon-green/20 text-neon-green border border-neon-green/50 shadow-lg shadow-neon-green/20'
                  : 'bg-gray-800/50 text-gray-500 border border-gray-700'
                }
              `}
            >
              <span className="flex items-center space-x-2">
                <span>{skill.name}</span>
                <span className="text-xs opacity-75">{skill.confidence}%</span>
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 glass-effect-dark rounded-lg">
          <p className="text-sm text-gray-400">
            <span className="text-neon-green font-semibold">
              {data.skills.filter(s => s.matched).length} matched skills
            </span>
            {' • '}
            <span className="text-gray-500">
              {data.skills.filter(s => !s.matched).length} additional skills
            </span>
          </p>
        </div>
      </div>

      {/* Best Match Card */}
      <div className="glass-effect rounded-2xl p-6 border border-neon-blue/20 hover:border-neon-blue/40 transition-all duration-300 bg-gradient-to-br from-neon-blue/5 to-neon-purple/5">
        <div className="flex items-center space-x-3 mb-4">
          <Target className="w-6 h-6 text-neon-blue" />
          <h3 className="text-xl font-bold text-white">Best Matching Role</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white mb-1">{data.bestMatch.role}</p>
              <p className="text-sm text-gray-400">Recommended position based on skills and experience</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-neon-blue">{data.bestMatch.matchPercentage}%</p>
              <p className="text-xs text-gray-400">Match Score</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Match Confidence</span>
              <span className="text-white font-semibold">{data.bestMatch.confidence}%</span>
            </div>
            <div className="relative h-3 bg-dark-card rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${data.bestMatch.matchPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Card */}
      <div className="glass-effect rounded-2xl p-6 border border-neon-pink/20 hover:border-neon-pink/40 transition-all duration-300">
        <div className="flex items-center space-x-3 mb-4">
          <Briefcase className="w-6 h-6 text-neon-pink" />
          <h3 className="text-xl font-bold text-white">Work Experience</h3>
        </div>
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index} className="glass-effect-dark p-4 rounded-lg border-l-4 border-neon-pink/50 hover:border-neon-pink transition-all duration-300">
              <h4 className="text-lg font-bold text-white">{exp.title}</h4>
              <p className="text-neon-pink font-semibold">{exp.company}</p>
              <p className="text-sm text-gray-400 mt-1">{exp.duration}</p>
              <p className="text-sm text-gray-300 mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education Card */}
      <div className="glass-effect rounded-2xl p-6 border border-neon-purple/20 hover:border-neon-purple/40 transition-all duration-300">
        <div className="flex items-center space-x-3 mb-4">
          <GraduationCap className="w-6 h-6 text-neon-purple" />
          <h3 className="text-xl font-bold text-white">Education</h3>
        </div>
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <div key={index} className="glass-effect-dark p-4 rounded-lg border-l-4 border-neon-purple/50 hover:border-neon-purple transition-all duration-300">
              <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
              <p className="text-neon-purple font-semibold">{edu.institution}</p>
              <p className="text-sm text-gray-400 mt-1">{edu.year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResultsSection;
