import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Search, Network, Map, Zap, Cpu, Database, Eye, ArrowRight, Activity, Users, BookOpen, TrendingUp, Settings, Play } from 'lucide-react';
import { useAppStore } from '../store';

const AIHome: React.FC = () => {
  const { 
    setCurrentView,
    loadHerbs,
    loadExperts,
    getStats
  } = useAppStore();

  const [activeAgent, setActiveAgent] = useState(0);
  const [processingState, setProcessingState] = useState('idle'); // idle, analyzing, complete

  useEffect(() => {
    loadHerbs();
    loadExperts();
  }, [loadHerbs, loadExperts]);

  const stats = getStats();

  // 多智能体系统定义
  const aiAgents = [
    {
      id: 'recognition',
      name: '图像识别智能体',
      description: '基于深度学习的药材图像识别与特征提取',
      icon: Eye,
      color: 'from-blue-500 to-blue-600',
      capabilities: ['图像预处理', '特征提取', '模式识别', '相似度计算'],
      accuracy: '96.8%'
    },
    {
      id: 'knowledge',
      name: '知识匹配智能体',
      description: '传统医药知识库智能匹配与推理',
      icon: Brain,
      color: 'from-green-500 to-green-600',
      capabilities: ['知识图谱查询', '语义匹配', '推理分析', '权威验证'],
      accuracy: '94.2%'
    },
    {
      id: 'geographic',
      name: '地理分析智能体',
      description: '产地溯源与地理分布智能分析',
      icon: Map,
      color: 'from-purple-500 to-purple-600',
      capabilities: ['产地识别', '气候分析', '品质预测', '分布建模'],
      accuracy: '92.5%'
    },
    {
      id: 'comparison',
      name: '对比分析智能体',
      description: '多维度差异分析与智能洞察',
      icon: Zap,
      color: 'from-orange-500 to-orange-600',
      capabilities: ['特征对比', '差异识别', '相关性分析', '趋势预测'],
      accuracy: '93.7%'
    },
    {
      id: 'integration',
      name: '数据整合智能体',
      description: '多源数据融合与综合决策',
      icon: Database,
      color: 'from-indigo-500 to-indigo-600',
      capabilities: ['数据融合', '权重分配', '决策树构建', '结果优化'],
      accuracy: '95.1%'
    }
  ];

  // 核心功能模块
  const coreModules = [
    {
      id: 'gallery',
      title: 'AI药材识别',
      description: '智能图像识别，精准药材鉴定',
      icon: Search,
      gradient: 'from-blue-500 to-cyan-500',
      features: ['图像智能识别', '特征自动提取', '相似度匹配', '品质评估'],
      stats: `${stats.total} 个样本`
    },
    {
      id: 'network',
      title: '智能关系图谱',
      description: '多维度关联分析与知识发现',
      icon: Network,
      gradient: 'from-green-500 to-emerald-500',
      features: ['知识图谱构建', '关系挖掘', '路径分析', '智能推荐'],
      stats: '10万+ 关系'
    },
    {
      id: 'map',
      title: '地理智能分析',
      description: '产地溯源与分布预测分析',
      icon: Map,
      gradient: 'from-purple-500 to-violet-500',
      features: ['产地识别', '气候建模', '品质预测', '分布分析'],
      stats: `${stats.provinces} 个产区`
    },
    {
      id: 'compare',
      title: 'AI对比分析',
      description: '智能差异识别与深度洞察',
      icon: Zap,
      gradient: 'from-orange-500 to-red-500',
      features: ['多维对比', '差异识别', '相关分析', '趋势预测'],
      stats: '千万级 对比'
    }
  ];

  // 模拟AI处理过程
  const simulateAIProcess = () => {
    setProcessingState('analyzing');
    let currentStep = 0;
    
    const processSteps = () => {
      if (currentStep < aiAgents.length) {
        setActiveAgent(currentStep);
        currentStep++;
        setTimeout(processSteps, 800);
      } else {
        setProcessingState('complete');
        setTimeout(() => {
          setProcessingState('idle');
          setActiveAgent(0);
        }, 2000);
      }
    };
    
    processSteps();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50"
    >
      {/* Hero Section - AI驱动的首页横幅 */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-green-600/5" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full text-white font-medium mb-8"
            >
              <Brain className="w-5 h-5" />
              <span>AI-Powered Traditional Medicine Database</span>
              <Activity className="w-5 h-5 animate-pulse" />
            </motion.div>
            
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-blue-700 via-purple-600 to-green-600 bg-clip-text text-transparent">
                传统医药智能鉴定
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                数据库系统
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              运用先进的人工智能技术，集成多智能体协调系统，为传统医药提供精准、高效、权威的智能鉴定服务
            </motion.p>
          </div>

          {/* 核心统计数据 */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
          >
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{stats.total.toLocaleString()}</div>
              <div className="text-gray-600 font-medium">数据样本</div>
            </div>
            
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">5</div>
              <div className="text-gray-600 font-medium">AI智能体</div>
            </div>
            
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">96.8%</div>
              <div className="text-gray-600 font-medium">识别精度</div>
            </div>
            
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Network className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">10万+</div>
              <div className="text-gray-600 font-medium">知识关系</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 多智能体协调工作流展示 */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                多智能体协调系统
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">五个专业AI智能体协同工作，提供全方位智能鉴定服务</p>
            
            {/* AI处理演示按钮 */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={simulateAIProcess}
              disabled={processingState !== 'idle'}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              <Play className="w-5 h-5" />
              {processingState === 'idle' ? '演示AI处理流程' : processingState === 'analyzing' ? 'AI分析中...' : '分析完成'}
            </motion.button>
          </motion.div>

          {/* 智能体网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiAgents.map((agent, index) => {
              const IconComponent = agent.icon;
              const isActive = activeAgent === index && processingState === 'analyzing';
              
              return (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: isActive ? 1.05 : 1,
                    boxShadow: isActive ? '0 20px 40px rgba(0,0,0,0.1)' : '0 8px 20px rgba(0,0,0,0.05)'
                  }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`relative p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 ${
                    isActive ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                  }`}
                >
                  {/* 智能体状态指示器 */}
                  {isActive && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full"
                    />
                  )}
                  
                  <div className={`w-16 h-16 bg-gradient-to-br ${agent.color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{agent.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{agent.description}</p>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {agent.capabilities.map((capability, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-green-500 rounded-full" />
                        <span>{capability}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">准确率: </span>
                    <span className="font-bold text-green-600">{agent.accuracy}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 核心功能模块 */}
      <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                核心功能模块
              </span>
            </h2>
            <p className="text-xl text-gray-600">专业化AI功能模块，满足不同应用场景需求</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreModules.map((module, index) => {
              const IconComponent = module.icon;
              
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setCurrentView(module.id as any)}
                  className="group cursor-pointer p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${module.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-bold text-gray-800">{module.title}</h3>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">{module.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        {module.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className={`w-1.5 h-1.5 bg-gradient-to-r ${module.gradient} rounded-full`} />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                          {module.stats}
                        </span>
                        <span className="text-sm text-blue-600 font-medium group-hover:text-blue-700">立即体验 →</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 技术优势展示 */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                技术优势
              </span>
            </h2>
            <p className="text-xl text-gray-600">领先的AI技术与传统医药知识的完美融合</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '深度学习引擎',
                description: '基于最新的深度学习算法，实现高精度图像识别和特征提取',
                icon: Brain,
                color: 'from-blue-500 to-blue-600'
              },
              {
                title: '知识图谱技术',
                description: '构建大规模传统医药知识图谱，支持智能推理和关联分析',
                icon: Network,
                color: 'from-green-500 to-green-600'
              },
              {
                title: '多模态融合',
                description: '融合图像、文本、地理等多种数据模态，提供全方位分析',
                icon: Settings,
                color: 'from-purple-500 to-purple-600'
              }
            ].map((advantage, index) => {
              const IconComponent = advantage.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${advantage.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{advantage.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 快速开始 */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                立即开始智能鉴定
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">选择适合的功能模块，体验AI驱动的传统医药智能鉴定服务</p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView('gallery')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Search className="w-5 h-5" />
                药材智能识别
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView('network')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Network className="w-5 h-5" />
                关系图谱分析
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default AIHome;