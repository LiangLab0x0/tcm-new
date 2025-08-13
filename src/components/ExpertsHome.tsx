import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Award, Calendar, Plus, Minus, BookOpen, ExternalLink } from 'lucide-react';
import { useAppStore } from '../store';
import ExpertSearchAndFilters from './ExpertSearchAndFilters';

const ExpertsHome: React.FC = () => {
  const { 
    experts,
    filteredExperts,
    loadExperts, 
    setSelectedExpert, 
    isLoading,
    expertCompareList,
    addExpertToCompare,
    removeExpertFromCompare,
    setCurrentView 
  } = useAppStore();

  useEffect(() => {
    loadExperts();
  }, [loadExperts]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <span className="text-xl font-medium text-gray-700">正在加载专家信息...</span>
        </div>
      </div>
    );
  }

  const handleHerbClick = (herbName: string) => {
    // 切换到药材图鉴页面并搜索该药材
    setCurrentView('gallery');
    // 这里可以添加搜索逻辑
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-white py-8"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            中医大师知识图谱
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            汇聚国医大师和著名中医学者的智慧结晶，传承中医药文化，弘扬传统医学精神
          </motion.p>
        </div>

        {/* 搜索和筛选 */}
        <ExpertSearchAndFilters />

        {/* 统计信息 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">{filteredExperts.length}</p>
                <p className="text-sm text-gray-600">位专家</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">
                  {filteredExperts.reduce((sum, expert) => sum + (expert.books?.length || 0), 0)}
                </p>
                <p className="text-sm text-gray-600">部著作</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">
                  {filteredExperts.filter(expert => expert.academic_title === '国医大师').length}
                </p>
                <p className="text-sm text-gray-600">国医大师</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">
                  {filteredExperts.length > 0 ? Math.round(filteredExperts.reduce((sum, expert) => sum + (expert.experience || 0), 0) / filteredExperts.length) : 0}
                </p>
                <p className="text-sm text-gray-600">年平均经验</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 对比区域 */}
        {expertCompareList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-blue-800">
                  已选择 {expertCompareList.length} 位专家进行对比
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView('compare')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                查看对比结果
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* 专家卡片网格 */}
        {filteredExperts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperts.map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden relative hover:shadow-xl transition-all duration-300"
              >
                {/* 对比按钮 */}
                <div className="absolute top-4 right-4 z-10">
                  {expertCompareList.find(e => e.id === expert.id) ? (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeExpertFromCompare(expert.id);
                      }}
                      className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Minus className="w-5 h-5" />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        addExpertToCompare(expert);
                      }}
                      className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg"
                      disabled={expertCompareList.length >= 3}
                    >
                      <Plus className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>

                {/* 专家头像区域 */}
                <div className="relative h-32 bg-gradient-to-br from-blue-500 to-purple-600">
                  <div className="absolute inset-0 bg-black bg-opacity-20" />
                  <div className="absolute bottom-4 left-4 right-16">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <User className="w-8 h-8 text-gray-600" />
                      </div>
                      <div className="text-white">
                        <h3 className="text-xl font-bold">{expert.name}</h3>
                        <p className="text-blue-100 text-sm">{expert.academic_title}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 专家信息 */}
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => setSelectedExpert(expert)}
                >
                  {/* 基本信息 */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Award className="w-4 h-4" />
                      <span className="text-sm">{expert.institution}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{expert.experience}年经验</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{expert.place_of_origin}</span>
                    </div>
                  </div>

                  {/* 专业领域 */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-800 mb-2">专业领域</h4>
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {expert.specialty ? expert.specialty.join(', ') : ''}
                    </div>
                  </div>

                  {/* 主要著作 */}
                  {expert.books && expert.books.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-800 mb-2">主要著作</h4>
                      <div className="space-y-1">
                        {expert.books.slice(0, 2).map((book, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <BookOpen className="w-3 h-3 text-blue-500 mt-1 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="text-xs text-gray-700 font-medium">{book.title}</div>
                              <div className="text-xs text-gray-500">{book.year}</div>
                            </div>
                            {book.link && (
                              <a
                                href={book.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        ))}
                        {expert.books.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{expert.books.length - 2} 更多著作...
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 相关药材 */}
                  {expert.relatedHerbs && expert.relatedHerbs.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-800 mb-2">相关药材</h4>
                      <div className="flex flex-wrap gap-1">
                        {expert.relatedHerbs.slice(0, 4).map((herb, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleHerbClick(herb.name);
                            }}
                            className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full hover:bg-green-200 transition-colors"
                          >
                            {herb.name}
                          </motion.button>
                        ))}
                        {expert.relatedHerbs.length > 4 && (
                          <span className="text-xs text-gray-500">
                            +{expert.relatedHerbs.length - 4} 更多
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 查看详情按钮 */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedExpert(expert);
                      setCurrentView('expert-detail');
                    }}
                    className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium text-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    查看详细资料
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">👨‍⚕️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">暂无专家信息</h3>
            <p className="text-gray-600">专家信息正在整理中，敬请期待</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ExpertsHome;
