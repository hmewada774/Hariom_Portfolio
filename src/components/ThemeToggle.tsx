import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="fixed top-20 right-6 z-50 w-12 h-12 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-gray-800 dark:text-white" />
      ) : (
        <Sun className="w-5 h-5 text-white" />
      )}
    </motion.button>
  );
}
