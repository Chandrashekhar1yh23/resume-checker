"use client";

import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { CheckCircle, AlertCircle, TrendingUp, AlertTriangle } from "lucide-react";

export interface AnalysisData {
  overall_score: number;
  ats_compatibility_score: number;
  structure_feedback: string;
  skills_detected: string[];
  skills_missing: string[];
  grammar_corrections: { original: string; correction: string; reason: string }[];
  bullet_suggestions: { original_bullet: string; improved_bullet: string }[];
}

interface DashboardProps {
  data: AnalysisData;
  onReset: () => void;
}

export default function Dashboard({ data, onReset }: DashboardProps) {
  const chartData = [
    { name: "Score", value: data.overall_score },
    { name: "Remaining", value: 100 - data.overall_score },
  ];

  const atsChartData = [
    { name: "ATS Score", value: data.ats_compatibility_score },
    { name: "Remaining", value: 100 - data.ats_compatibility_score },
  ];

  const getColor = (score: number) => {
    if (score >= 80) return "#10B981"; // green
    if (score >= 60) return "#F59E0B"; // yellow
    return "#EF4444"; // red
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mx-auto mt-8 space-y-8"
    >
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Analysis Complete</h2>
          <p className="text-gray-500 dark:text-gray-400">Here is your detailed resume feedback.</p>
        </div>
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors"
        >
          Analyze Another
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Score Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Overall Score</h3>
          <div className="h-48 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={180}
                  endAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill={getColor(data.overall_score)} />
                  <Cell fill="#E5E7EB" className="dark:fill-gray-700" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
              <span className="text-4xl font-bold" style={{ color: getColor(data.overall_score) }}>
                {data.overall_score}
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">/ 100</span>
            </div>
          </div>
        </div>

        {/* ATS Score Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">ATS Compatibility</h3>
          <div className="h-48 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={atsChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={180}
                  endAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill={getColor(data.ats_compatibility_score)} />
                  <Cell fill="#E5E7EB" className="dark:fill-gray-700" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
              <span className="text-4xl font-bold" style={{ color: getColor(data.ats_compatibility_score) }}>
                {data.ats_compatibility_score}
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">/ 100</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skills Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 col-span-1 border-t-4 border-t-blue-500">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-blue-500" />
            Skills Analysis
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Detected</h4>
              <div className="flex flex-wrap gap-2">
                {data.skills_detected.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-sm rounded-full border border-green-200 dark:border-green-800">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Missing / Recommended</h4>
              <div className="flex flex-wrap gap-2">
                {data.skills_missing.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-sm rounded-full border border-red-200 dark:border-red-800">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Actionable Feedback */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 col-span-1 lg:col-span-2 space-y-8">
          
          {/* Bullet Suggestions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-indigo-500" />
              Impact Enhancer
            </h3>
            <div className="space-y-4">
              {data.bullet_suggestions.map((suggestion, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-start space-x-3 mb-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs font-semibold uppercase text-gray-400 mb-1 block">Original</span>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-through decoration-red-400/50">{suggestion.original_bullet}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 pl-8">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs font-semibold uppercase text-green-500 mb-1 block">Improved Metric-Driven</span>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{suggestion.improved_bullet}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-100 dark:border-gray-700" />

          {/* Grammar & Structure */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-rose-500" />
              Grammar & Structure
            </h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-900/50 mb-6">
              <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                <span className="font-semibold block mb-1 text-blue-900 dark:text-blue-200">Structural Feedback:</span>
                {data.structure_feedback}
              </p>
            </div>

            <ul className="space-y-3">
              {data.grammar_corrections.map((correction, i) => (
                <li key={i} className="flex items-start bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg text-sm border border-gray-100 dark:border-gray-700">
                  <span className="text-red-500 line-through mr-3 shrink-0">"{correction.original}"</span>
                  <span className="text-green-600 dark:text-green-400 font-medium mr-3">"{correction.correction}"</span>
                  <span className="text-gray-400 italic">({correction.reason})</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
