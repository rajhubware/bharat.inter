import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  MagnifyingGlassIcon,
  FunnelIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
  LightBulbIcon,
  SparklesIcon,
  BoltIcon,
  CubeTransparentIcon,
} from '@heroicons/react/24/outline';

const Tools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Debounce search term to prevent excessive filtering and animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 600); // 600ms debounce delay to prevent animation on single character

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const categories = [
    { id: 'all', name: 'All Tools', count: 12 },
    { id: 'analytics', name: 'Analytics', count: 4 },
    { id: 'security', name: 'Security', count: 3 },
    { id: 'network', name: 'Network', count: 3 },
    { id: 'optimization', name: 'Optimization', count: 2 },
  ];

  const tools = [
    {
      id: 1,
      name: 'Quantum Network Analyzer',
      category: 'network',
      description: 'Advanced quantum-powered network optimization and real-time performance monitoring with predictive analytics',
      icon: CubeTransparentIcon,
      status: 'active',
      users: 2840,
      efficiency: '98.4%',
      gradient: 'from-blue-500 via-blue-400 to-cyan-400',
      badge: 'Premium',
    },
    {
      id: 2,
      name: 'Neural Fraud Detection',
      category: 'security',
      description: 'AI-powered real-time fraud detection using advanced neural networks and machine learning algorithms',
      icon: ShieldCheckIcon,
      status: 'active',
      users: 1890,
      efficiency: '99.1%',
      gradient: 'from-red-500 via-red-400 to-pink-400',
      badge: 'Critical',
    },
    {
      id: 3,
      name: 'Customer Intelligence Engine',
      category: 'analytics',
      description: 'Deep customer behavior analysis and prediction with sentiment analysis and churn prevention',
      icon: LightBulbIcon,
      status: 'active',
      users: 1650,
      efficiency: '96.8%',
      gradient: 'from-yellow-500 via-yellow-400 to-orange-400',
      badge: 'Popular',
    },
    {
      id: 4,
      name: 'Predictive Maintenance AI',
      category: 'optimization',
      description: 'Intelligent infrastructure maintenance scheduling with failure prediction and resource optimization',
      icon: WrenchScrewdriverIcon,
      status: 'maintenance',
      users: 1450,
      efficiency: '94.2%',
      gradient: 'from-green-500 via-green-400 to-emerald-400',
      badge: 'Beta',
    },
    {
      id: 5,
      name: 'Quantum Traffic Optimizer',
      category: 'network',
      description: 'Revolutionary traffic pattern optimization using quantum computing principles and AI algorithms',
      icon: BoltIcon,
      status: 'active',
      users: 2780,
      efficiency: '97.6%',
      gradient: 'from-purple-500 via-purple-400 to-indigo-400',
      badge: 'New',
    },
    {
      id: 6,
      name: 'Advanced Threat Monitor',
      category: 'security',
      description: 'Next-generation security threat detection and automated response with real-time monitoring',
      icon: SparklesIcon,
      status: 'active',
      users: 2100,
      efficiency: '98.9%',
      gradient: 'from-red-600 via-red-500 to-orange-500',
      badge: 'Enhanced',
    },
  ];

  // Memoize filtered tools to prevent unnecessary recalculations
  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                           tool.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [debouncedSearchTerm, selectedCategory, tools]);

  const getBadgeStyle = (badge) => {
    const styles = {
      'Premium': 'bg-gradient-to-r from-primary-500 to-accent-500 text-white',
      'Critical': 'bg-gradient-to-r from-red-500 to-pink-500 text-white',
      'Popular': 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
      'Beta': 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
      'New': 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white',
      'Enhanced': 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
    };
    return styles[badge] || 'bg-gray-500 text-white';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">AI Intelligence Hub</h1>
          <p className="text-dark-300">
            Explore quantum-powered tools for telecom optimization
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {filteredTools.length} tools available • {tools.filter(t => t.status === 'active').length} active instances
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary"
        >
          <CpuChipIcon className="w-5 h-5 mr-2" />
          Deploy New Model
        </motion.button>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-4"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-600 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search AI tools and models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/95 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
            />
            {/* Search loading indicator */}
            {searchTerm !== debouncedSearchTerm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <div className="w-4 h-4 border-2 border-gray-500 border-t-purple-500 rounded-full animate-spin"></div>
              </motion.div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <FunnelIcon className="w-5 h-5 text-gray-600" />
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                onFocus={() => setIsDropdownOpen(true)}
                onBlur={() => setIsDropdownOpen(false)}
                className="bg-white/95 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 min-w-[160px] cursor-pointer appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em'
                }}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id} className="bg-black text-gray-900">
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
              {/* Dropdown animation indicator */}
              <motion.div
                className="absolute inset-0 border border-purple-500/50 rounded-lg pointer-events-none"
                initial={{ opacity: 0, scale: 1 }}
                animate={{ 
                  opacity: isDropdownOpen ? 1 : 0,
                  scale: isDropdownOpen ? 1.02 : 1
                }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass-card-hover group relative overflow-hidden"
            >
              {/* Badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${getBadgeStyle(tool.badge)}`}>
                {tool.badge}
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${tool.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                <Icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {tool.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-800/50">
                  <div>
                    <div className="text-sm text-gray-600">Active Users</div>
                    <div className="text-lg font-bold text-white">{tool.users.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Efficiency</div>
                    <div className="text-lg font-bold text-purple-400">{tool.efficiency}</div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between">
                  <div className={`status-${tool.status}`}>
                    <div className={`w-2 h-2 rounded-full ${
                      tool.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
                    }`}></div>
                    <span className="capitalize">{tool.status}</span>
                  </div>
                  <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/20 rounded-lg text-purple-400 text-sm transition-colors">
                    Launch
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredTools.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <CpuChipIcon className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No tools found</h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your search criteria or explore different categories
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/20 rounded-lg text-purple-400 text-sm transition-colors"
          >
            Reset Filters
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Tools;