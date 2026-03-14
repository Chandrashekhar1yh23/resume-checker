"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FileUploader from "@/components/ui/FileUploader";
import Dashboard, { AnalysisData } from "@/components/ui/Dashboard";
import { Sparkles, FileText, CheckCircle } from "lucide-react";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUpload = async (file: File) => {
    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze resume");
      }

      const data = await response.json();
      setAnalysisResult(data);
    } catch (error) {
      console.error(error);
      alert("An error occurred during analysis. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans selection:bg-blue-200 dark:selection:bg-blue-900">
      
      {/* Navigation */}
      <nav className="w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">AI Resume Checker</span>
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Powered by Next.js & AI
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {!analysisResult ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center pt-10"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-8">
                <Sparkles className="w-4 h-4 mr-2" />
                Beat the ATS. Land the interview.
              </div>
              
              <h1 className="text-5xl md:text-6xl font-extrabold text-center tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                Is your resume good enough?
              </h1>
              
              <p className="text-lg md:text-xl text-center text-gray-500 dark:text-gray-400 max-w-2xl mb-12">
                Our AI analyzes your resume against industry standards, scores it for ATS compatibility, and gives you actionable feedback designed to increase your callback rate.
              </p>

              <div className="w-full">
                <FileUploader onUpload={handleUpload} isAnalyzing={isAnalyzing} />
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full max-w-4xl">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Deep Parse</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Extracts text flawlessly from complex PDFs and Word docs.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">ATS Score</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Know exactly how parsers read and score your skills.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">AI Enhancer</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Automatically rewrites bullet points to be impact-driven.</p>
                </div>
              </div>

            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <Dashboard data={analysisResult} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-400/10 dark:bg-blue-900/20 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3" />
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-400/10 dark:bg-indigo-900/20 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3" />
      </div>

    </div>
  );
}
