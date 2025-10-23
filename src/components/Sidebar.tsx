import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle, Sparkles, Award } from 'lucide-react';
import type { ResumeData } from '../types';

interface SidebarProps {
  data: ResumeData | null;
}

function Sidebar({ data }: SidebarProps) {
  if (!data) {
    return (
      <div className="glass-effect rounded-2xl p-6 border border-dark-border">
        <div className="flex items-center space-x-3 mb-4">
          <Sparkles className="w-6 h-6 text-neon-purple" />
          <h3 className="text-xl font-bold text-white">AI Insights</h3>
        </div>
        <div className="text-center py-12">
          <Lightbulb className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Upload a resume to see AI-powered insights</p>
        </div>
      </div>
    );
  }

  const skillGaps = data.skills.filter(s => !s.matched);
  const matchedSkills = data.skills.filter(s => s.matched);
  const overallConfidence = Math.round(
    data.skills.reduce((acc, skill) => acc + skill.confidence, 0) / data.skills.length
  );

  return (
    <div className="space-y-6 sticky top-6">
      {/* AI Insights Header */}
      <div className="glass-effect rounded-2xl p-6 border border-neon-purple/20 hover:border-neon-purple/40 transition-all duration-300">
        <div className="flex items-center space-x-3 mb-6">
          <Sparkles className="w-6 h-6 text-neon-purple" />
          <h3 className="text-xl font-bold text-white">AI Insights</h3>
        </div>

        {/* Confidence Level */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-neon-blue" />
              <span className="text-sm font-semibold text-white">Extraction Confidence</span>
            </div>
            <span className="text-2xl font-bold text-neon-blue">{overallConfidence}%</span>
          </div>
          <div className="relative h-2 bg-dark-card rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full transition-all duration-1000"
              style={{ width: `${overallConfidence}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {overallConfidence >= 90 ? 'Excellent' : overallConfidence >= 75 ? 'Good' : 'Fair'} data quality from Azure AI
          </p>
        </div>

        {/* Strengths */}
        <div className="mb-6 p-4 glass-effect-dark rounded-lg border border-neon-green/30">
          <div className="flex items-center space-x-2 mb-3">
            <CheckCircle className="w-5 h-5 text-neon-green" />
            <h4 className="font-semibold text-white">Key Strengths</h4>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start space-x-2">
              <span className="text-neon-green mt-0.5">•</span>
              <span className="text-gray-300">
                <span className="text-neon-green font-semibold">{matchedSkills.length}</span> highly relevant skills detected
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-neon-green mt-0.5">•</span>
              <span className="text-gray-300">
                <span className="text-neon-green font-semibold">{data.experience.length}+ years</span> of professional experience
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-neon-green mt-0.5">•</span>
              <span className="text-gray-300">
                Strong match with <span className="text-neon-green font-semibold">{data.bestMatch.role}</span>
              </span>
            </li>
          </ul>
        </div>

        {/* Skill Gaps */}
        {skillGaps.length > 0 && (
          <div className="p-4 glass-effect-dark rounded-lg border border-yellow-500/30">
            <div className="flex items-center space-x-2 mb-3">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <h4 className="font-semibold text-white">Growth Opportunities</h4>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              Skills to develop for better role fit:
            </p>
            <div className="space-y-2">
              {skillGaps.slice(0, 3).map((skill, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">{skill.name}</span>
                  <span className="text-yellow-400 font-semibold text-xs">+{100 - skill.confidence}% boost</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="glass-effect rounded-2xl p-6 border border-dark-border">
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="w-6 h-6 text-neon-blue" />
          <h3 className="text-lg font-bold text-white">Quick Stats</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 glass-effect-dark rounded-lg">
            <span className="text-sm text-gray-400">Total Skills</span>
            <span className="text-lg font-bold text-white">{data.skills.length}</span>
          </div>
          <div className="flex items-center justify-between p-3 glass-effect-dark rounded-lg">
            <span className="text-sm text-gray-400">Matched Skills</span>
            <span className="text-lg font-bold text-neon-green">{matchedSkills.length}</span>
          </div>
          <div className="flex items-center justify-between p-3 glass-effect-dark rounded-lg">
            <span className="text-sm text-gray-400">Experience Items</span>
            <span className="text-lg font-bold text-white">{data.experience.length}</span>
          </div>
          <div className="flex items-center justify-between p-3 glass-effect-dark rounded-lg">
            <span className="text-sm text-gray-400">Education</span>
            <span className="text-lg font-bold text-white">{data.education.length}</span>
          </div>
        </div>
      </div>

      {/* Processing Info */}
      <div className="glass-effect-dark rounded-lg p-4 border border-dark-border">
        <p className="text-xs text-gray-500 text-center">
          Analyzed by Azure Document Intelligence
        </p>
        <p className="text-xs text-gray-600 text-center mt-1">
          Processing time: 2.3s
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
