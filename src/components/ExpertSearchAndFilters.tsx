import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronDown, User, BookOpen, MapPin, Award } from 'lucide-react';
import { useAppStore } from '../store';

const ExpertSearchAndFilters: React.FC = () => {
  const { expertSearchFilters, updateExpertSearchFilters, experts } = useAppStore();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // 从数据中提取唯一的过滤选项
  const categories = [...new Set(experts.map(expert => expert.category))].filter(Boolean);
  const schools = [...new Set(experts.map(expert => expert.school))].filter(Boolean);
  const specialties = [...new Set(experts.flatMap(expert => expert.specialty || []))].filter(Boolean);
  const grades = [...new Set(experts.map(expert => expert.grade))].filter(Boolean);
  const regions = [...new Set(experts.flatMap(expert => 
    [expert.place_of_origin, ...(expert.influenceAreas || [])]
  ))].filter(Boolean).sort();
  const lineages = [...new Set(experts.map(expert => expert.lineage?.lineageName))].filter(Boolean);
  const inheritanceTypes = [...new Set(experts.map(expert => expert.inheritanceInfo?.inheritanceType))].filter(Boolean);

  // 传承类型中英文映射
  const inheritanceTypeMap: Record<string, string> = {
    'institutional': '机构传承',
    'mentorship': '师承传承',
    'family': '家族传承',
    'academic': '学术传承'
  };

  const clearFilters = () => {
    updateExpertSearchFilters({
      searchTerm: '',
      category: '',
      school: '',
      specialty: '',
      region: '',
      grade: '',
      lineage: '',
      mentor: '',
      inheritanceType: '',
      specializedDisease: '',
      clinicalStrength: '',
      theoreticalContribution: '',
      era: '',
      experienceRange: '',
      influenceLevel: '',
      reputationLevel: ''
    });
  };

  const hasActiveFilters = expertSearchFilters.category || expertSearchFilters.school || 
                          expertSearchFilters.specialty || expertSearchFilters.region || 
                          expertSearchFilters.grade || expertSearchFilters.lineage ||
                          expertSearchFilters.inheritanceType || expertSearchFilters.experienceRange;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      {/* 搜索框 */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="搜索专家姓名、专长、流派、擅长疾病..."
          value={expertSearchFilters.searchTerm}
          onChange={(e) => updateExpertSearchFilters({ searchTerm: e.target.value })}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
        {expertSearchFilters.searchTerm && (
          <button
            onClick={() => updateExpertSearchFilters({ searchTerm: '' })}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 筛选控制 */}
      <div className="flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
            hasActiveFilters 
              ? 'bg-blue-50 border-blue-200 text-blue-700' 
              : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Filter className="w-4 h-4" />
          <span>高级筛选</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
          {hasActiveFilters && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              已筛选
            </span>
          )}
        </motion.button>

        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={clearFilters}
            className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            清除筛选
          </motion.button>
        )}
      </div>

      {/* 高级筛选面板 */}
      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-gray-200 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* 专家类别 */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Award className="w-4 h-4" />
                  专家类别
                </label>
                <select
                  value={expertSearchFilters.category}
                  onChange={(e) => updateExpertSearchFilters({ category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">全部类别</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* 医学流派 */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <BookOpen className="w-4 h-4" />
                  医学流派
                </label>
                <select
                  value={expertSearchFilters.school}
                  onChange={(e) => updateExpertSearchFilters({ school: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">全部流派</option>
                  {schools.map(school => (
                    <option key={school} value={school}>{school}</option>
                  ))}
                </select>
              </div>

              {/* 专业专长 */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4" />
                  专业专长
                </label>
                <select
                  value={expertSearchFilters.specialty}
                  onChange={(e) => updateExpertSearchFilters({ specialty: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">全部专长</option>
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>

              {/* 地域分布 */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4" />
                  地域分布
                </label>
                <select
                  value={expertSearchFilters.region}
                  onChange={(e) => updateExpertSearchFilters({ region: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">全部地区</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              {/* 专家等级 */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">专家等级</label>
                <select
                  value={expertSearchFilters.grade}
                  onChange={(e) => updateExpertSearchFilters({ grade: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">全部等级</option>
                  {grades.map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>

              {/* 师承谱系 */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">师承谱系</label>
                <select
                  value={expertSearchFilters.lineage}
                  onChange={(e) => updateExpertSearchFilters({ lineage: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">全部谱系</option>
                  {lineages.map(lineage => (
                    <option key={lineage} value={lineage}>{lineage}</option>
                  ))}
                </select>
              </div>

              {/* 传承类型 */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">传承类型</label>
                <select
                  value={expertSearchFilters.inheritanceType}
                  onChange={(e) => updateExpertSearchFilters({ inheritanceType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">全部类型</option>
                  {inheritanceTypes.map(type => (
                    <option key={type} value={type}>
                      {inheritanceTypeMap[type] || type}
                    </option>
                  ))}
                </select>
              </div>

              {/* 经验年限 */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">经验年限</label>
                <select
                  value={expertSearchFilters.experienceRange}
                  onChange={(e) => updateExpertSearchFilters({ experienceRange: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">全部年限</option>
                  <option value="0-20">0-20年</option>
                  <option value="21-40">21-40年</option>
                  <option value="41-60">41-60年</option>
                  <option value="61-80">61-80年</option>
                  <option value="81">80年以上</option>
                </select>
              </div>

              {/* 师承导师 */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">师承导师</label>
                <input
                  type="text"
                  placeholder="搜索导师姓名"
                  value={expertSearchFilters.mentor}
                  onChange={(e) => updateExpertSearchFilters({ mentor: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpertSearchAndFilters;
