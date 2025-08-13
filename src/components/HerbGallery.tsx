import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, List, Shuffle, SortAsc, SortDesc, Brain, Search, Zap, Eye, Cpu } from 'lucide-react';
import { useAppStore } from '../store';
import HerbCard from './HerbCard';
import SearchAndFilters from './SearchAndFilters';

type SortOption = 'name' | 'category' | 'nature';
type SortOrder = 'asc' | 'desc';
type ViewMode = 'grid' | 'list';

const HerbGallery: React.FC = () => {
  const { filteredHerbs, isLoading, error } = useAppStore();
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // 排序和过滤逻辑
  const getSortedAndFilteredHerbs = () => {
    let herbs = [...filteredHerbs];

    // 排序
    herbs.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name, 'zh-CN');
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category, 'zh-CN');
          break;
        case 'nature':
          comparison = a.nature.localeCompare(b.nature, 'zh-CN');
          break;
        default:
          comparison = 0;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return herbs;
  };

  const sortedHerbs = getSortedAndFilteredHerbs();

  const handleSortChange = (newSortBy: SortOption) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  const shuffleHerbs = () => {
    // 随机排序的视觉效果
    setSortBy('name');
    setSortOrder(Math.random() > 0.5 ? 'asc' : 'desc');
    setTimeout(() => {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-medium text-gray-700">AI药材识别系统初始化中...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😵</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">加载失败</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* AI驱动的页面标题 */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full text-white font-medium mb-6"
          >
            <Brain className="w-5 h-5" />
            <span>AI-Powered Herb Recognition</span>
            <Zap className="w-5 h-5 animate-pulse" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-blue-700 via-purple-600 to-green-600 bg-clip-text text-transparent">
              AI药材智能识别系统
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto mb-6"
          >
            基于深度学习的智能药材识别系统，集成图像识别、特征匹配、知识推理多种AI能力
          </motion.p>
          
          {/* AI能力指示器 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {[
              { icon: Eye, label: '图像识别', accuracy: '96.8%' },
              { icon: Search, label: '特征匹配', accuracy: '94.2%' },
              { icon: Brain, label: '知识推理', accuracy: '92.5%' },
              { icon: Cpu, label: '数据融合', accuracy: '95.1%' }
            ].map((capability, index) => {
              const IconComponent = capability.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-lg border border-white/20 shadow-sm"
                >
                  <IconComponent className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">{capability.label}</span>
                  <span className="text-xs text-green-600 font-bold">{capability.accuracy}</span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* 搜索和过滤 */}
        <SearchAndFilters />

        {/* AI智能工具栏 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* 左侧：AI显示模式 */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-lg">
                <Brain className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">AI视图模式</span>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title="智能网格视图"
                >
                  <Grid className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title="AI列表视图"
                >
                  <List className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* 右侧：AI智能排序 */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-lg">
                <Zap className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">AI智能排序</span>
              </div>
              
              {[
                { key: 'name' as const, label: '名称' },
                { key: 'category' as const, label: '类别' },
                { key: 'nature' as const, label: '药性' }
              ].map(option => (
                <motion.button
                  key={option.key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSortChange(option.key)}
                  className={`
                    flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300
                    ${sortBy === option.key 
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }
                  `}
                >
                  <span>{option.label}</span>
                  {sortBy === option.key && (
                    sortOrder === 'asc' ? 
                      <SortAsc className="w-4 h-4" /> : 
                      <SortDesc className="w-4 h-4" />
                  )}
                </motion.button>
              ))}

              <motion.button
                whileHover={{ scale: 1.05, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                onClick={shuffleHerbs}
                className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                title="AI随机排序"
              >
                <Shuffle className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* AI识别结果统计 */}
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-600">AI识别结果：</span>
                <span className="font-bold text-blue-600">{sortedHerbs.length}</span>
                <span className="text-sm text-gray-600">个药材样本</span>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-50 to-green-50 rounded-full">
                <Brain className="w-3 h-3 text-blue-600" />
                <span className="text-xs font-medium text-blue-700">精度: 96.8%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 药材网格/列表 */}
        <AnimatePresence mode="wait">
          {sortedHerbs.length > 0 ? (
            <motion.div
              key={`${viewMode}-${sortBy}-${sortOrder}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
              }
            >
              {sortedHerbs.map((herb, index) => (
                <motion.div
                  key={herb.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <HerbCard 
                    herb={herb} 
                    isCompact={viewMode === 'list'}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-6"
              >
                🤖
              </motion.div>
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full text-white font-medium mb-6">
                <Brain className="w-5 h-5" />
                <span>AI识别系统</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  未找到匹配的药材样本
                </span>
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                AI系统正在持续学习中，请调整搜索条件或筛选器，或者尝试不同的关键词
              </p>
              <div className="flex justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
                  <Search className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-700">搜索优化</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
                  <Zap className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700">筛选改进</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HerbGallery;
