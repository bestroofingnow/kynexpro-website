'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AuditStage } from '@/lib/types';

interface LoadingAnimationProps {
  stage: AuditStage;
  onComplete?: () => void;
}

const stages: { key: AuditStage; label: string; duration: number }[] = [
  { key: 'connecting', label: 'Connecting to servers...', duration: 3000 },
  { key: 'scanning', label: 'Scanning your website...', duration: 4000 },
  { key: 'analyzing-competitors', label: 'Analyzing competitors...', duration: 5000 },
  { key: 'checking-seo', label: 'Checking 50+ SEO factors...', duration: 4000 },
  { key: 'building-report', label: 'Building your report...', duration: 4000 },
];

export default function LoadingAnimation({ stage, onComplete }: LoadingAnimationProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (stage === 'idle' || stage === 'complete') return;

    const stageIndex = stages.findIndex(s => s.key === stage);
    if (stageIndex !== -1) {
      setCurrentStageIndex(stageIndex);
    }
  }, [stage]);

  useEffect(() => {
    // Animate progress based on current stage
    const totalDuration = stages.reduce((acc, s) => acc + s.duration, 0);
    const completedDuration = stages
      .slice(0, currentStageIndex)
      .reduce((acc, s) => acc + s.duration, 0);

    const targetProgress = ((completedDuration + stages[currentStageIndex]?.duration || 0) / totalDuration) * 100;
    const startProgress = (completedDuration / totalDuration) * 100;

    const duration = stages[currentStageIndex]?.duration || 3000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);
      const currentProgress = startProgress + (targetProgress - startProgress) * progressRatio;

      setProgress(currentProgress);

      if (progressRatio < 1) {
        requestAnimationFrame(animate);
      } else if (currentStageIndex === stages.length - 1 && onComplete) {
        onComplete();
      }
    };

    animate();
  }, [currentStageIndex, onComplete]);

  const renderStageAnimation = () => {
    switch (stages[currentStageIndex]?.key) {
      case 'connecting':
        return <ConnectingAnimation />;
      case 'scanning':
        return <ScanningAnimation />;
      case 'analyzing-competitors':
        return <CompetitorAnimation />;
      case 'checking-seo':
        return <SEOCheckAnimation />;
      case 'building-report':
        return <BuildingAnimation />;
      default:
        return <ConnectingAnimation />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-2xl mx-auto text-center py-12"
    >
      <div className="relative h-64 mb-8 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={stages[currentStageIndex]?.key}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {renderStageAnimation()}
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.h3
        key={stages[currentStageIndex]?.label}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold mb-6 gradient-text"
      >
        {stages[currentStageIndex]?.label}
      </motion.h3>

      {/* Progress bar */}
      <div className="w-full max-w-md mx-auto mb-6">
        <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {Math.round(progress)}% complete
        </p>
      </div>

      {/* Stage indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {stages.map((s, index) => (
          <motion.div
            key={s.key}
            className={`w-3 h-3 rounded-full ${
              index < currentStageIndex
                ? 'bg-success'
                : index === currentStageIndex
                ? 'bg-primary'
                : 'bg-gray-300 dark:bg-slate-600'
            }`}
            animate={index === currentStageIndex ? { scale: [1, 1.3, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// Stage 1: Connecting Animation - Pulsing globe with connection lines
function ConnectingAnimation() {
  return (
    <div className="relative w-48 h-48">
      {/* Outer rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border-2 border-primary/30 rounded-full"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.5 + i * 0.3, opacity: [0, 0.5, 0] }}
          transition={{
            duration: 2,
            delay: i * 0.4,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Globe */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </div>
      </motion.div>

      {/* Connection lines */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.div
          key={angle}
          className="absolute w-1 bg-gradient-to-t from-primary to-transparent"
          style={{
            height: '60px',
            left: '50%',
            top: '50%',
            transformOrigin: 'top center',
            transform: `rotate(${angle}deg) translateX(-50%)`,
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            delay: i * 0.2,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}

// Stage 2: Scanning Animation - Website wireframe with scanner
function ScanningAnimation() {
  return (
    <div className="relative w-64 h-48">
      {/* Website wireframe */}
      <div className="absolute inset-0 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-600 overflow-hidden">
        {/* Header */}
        <div className="h-8 bg-gray-100 dark:bg-slate-700 border-b border-gray-200 dark:border-slate-600 flex items-center px-2 gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
        </div>

        {/* Content placeholder */}
        <div className="p-3 space-y-2">
          <motion.div
            className="h-3 bg-gray-200 dark:bg-slate-600 rounded"
            initial={{ width: 0 }}
            animate={{ width: '80%' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.div
            className="h-3 bg-gray-200 dark:bg-slate-600 rounded"
            initial={{ width: 0 }}
            animate={{ width: '60%' }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
          <motion.div
            className="h-3 bg-gray-200 dark:bg-slate-600 rounded"
            initial={{ width: 0 }}
            animate={{ width: '90%' }}
            transition={{ duration: 0.5, delay: 0.6 }}
          />
          <div className="flex gap-2 mt-4">
            <motion.div
              className="h-16 bg-gray-200 dark:bg-slate-600 rounded flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            />
            <motion.div
              className="h-16 bg-gray-200 dark:bg-slate-600 rounded flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            />
          </div>
        </div>
      </div>

      {/* Scanner beam */}
      <motion.div
        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
        initial={{ top: 0 }}
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Scan particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary rounded-full"
          initial={{ opacity: 0, x: Math.random() * 256, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, 192],
            x: Math.random() * 256,
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.2,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}

// Stage 3: Competitor Analysis Animation
function CompetitorAnimation() {
  const competitors = [
    { x: -80, y: -40, delay: 0 },
    { x: 80, y: -40, delay: 0.2 },
    { x: -60, y: 50, delay: 0.4 },
    { x: 60, y: 50, delay: 0.6 },
    { x: 0, y: -60, delay: 0.8 },
  ];

  return (
    <div className="relative w-64 h-48 flex items-center justify-center">
      {/* Center node (your website) */}
      <motion.div
        className="absolute w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center z-10"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-white font-bold text-sm">YOU</span>
      </motion.div>

      {/* Competitor nodes */}
      {competitors.map((comp, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={{
            x: comp.x,
            y: comp.y,
            opacity: 1,
            scale: 1
          }}
          transition={{ delay: comp.delay, duration: 0.5 }}
        >
          {/* Connection line */}
          <motion.svg
            className="absolute"
            style={{
              width: Math.abs(comp.x) + 20,
              height: Math.abs(comp.y) + 20,
              left: comp.x > 0 ? -Math.abs(comp.x) : 0,
              top: comp.y > 0 ? -Math.abs(comp.y) : 0,
            }}
          >
            <motion.line
              x1={comp.x > 0 ? Math.abs(comp.x) : 10}
              y1={comp.y > 0 ? Math.abs(comp.y) : 10}
              x2={comp.x > 0 ? 10 : Math.abs(comp.x)}
              y2={comp.y > 0 ? 10 : Math.abs(comp.y)}
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary/30"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: comp.delay + 0.3, duration: 0.5 }}
            />
          </motion.svg>

          {/* Competitor bubble */}
          <motion.div
            className="w-10 h-10 bg-gray-200 dark:bg-slate-600 rounded-full flex items-center justify-center"
            animate={{
              boxShadow: ['0 0 0 0 rgba(4, 107, 210, 0.4)', '0 0 0 10px rgba(4, 107, 210, 0)', '0 0 0 0 rgba(4, 107, 210, 0)']
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          >
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">#{i + 1}</span>
          </motion.div>
        </motion.div>
      ))}

      {/* Data flow particles */}
      {competitors.map((comp, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-accent rounded-full"
          initial={{ x: comp.x, y: comp.y, opacity: 0 }}
          animate={{
            x: [comp.x, 0],
            y: [comp.y, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 1,
            delay: comp.delay + 1,
            repeat: Infinity,
            repeatDelay: 1.5
          }}
        />
      ))}
    </div>
  );
}

// Stage 4: SEO Check Animation - Checklist
function SEOCheckAnimation() {
  const checks = [
    'Meta Tags',
    'Page Speed',
    'Mobile Friendly',
    'Backlinks',
    'Keywords',
    'Security',
    'Content',
    'Structure',
  ];

  return (
    <div className="w-64">
      <div className="grid grid-cols-2 gap-2">
        {checks.map((check, i) => (
          <motion.div
            key={check}
            className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
          >
            <motion.div
              className="w-5 h-5 rounded-full bg-success flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.15 + 0.3, type: 'spring' }}
            >
              <motion.svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: i * 0.15 + 0.4, duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </motion.svg>
            </motion.div>
            <span className="text-sm text-gray-700 dark:text-gray-300">{check}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Stage 5: Building Report Animation
function BuildingAnimation() {
  return (
    <div className="relative w-48 h-56">
      {/* Document */}
      <motion.div
        className="absolute inset-0 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-600 overflow-hidden"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="h-8 bg-gradient-to-r from-primary to-secondary flex items-center px-3">
          <span className="text-white text-xs font-semibold">SEO Report</span>
        </div>

        {/* Content building */}
        <div className="p-3 space-y-2">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="h-2 bg-gray-200 dark:bg-slate-600 rounded"
              initial={{ width: 0 }}
              animate={{ width: `${60 + Math.random() * 40}%` }}
              transition={{ delay: 0.5 + i * 0.2, duration: 0.3 }}
            />
          ))}

          {/* Score circle */}
          <motion.div
            className="flex justify-center mt-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.8, type: 'spring' }}
          >
            <div className="w-16 h-16 rounded-full border-4 border-primary flex items-center justify-center">
              <motion.span
                className="text-xl font-bold text-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                A+
              </motion.span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Flying particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary rounded-full"
          initial={{
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 200,
            opacity: 0,
            scale: 0
          }}
          animate={{
            x: 96,
            y: 112,
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 1,
            delay: i * 0.15,
            repeat: Infinity,
            repeatDelay: 2
          }}
        />
      ))}
    </div>
  );
}
