import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { X, BookOpen, Award, User, Calendar, MapPin, Users, ExternalLink, TrendingUp, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';
import { useAppStore } from '../store';

const ExpertCompare: React.FC = () => {
  const { expertCompareList, removeExpertFromCompare, clearExpertCompare } = useAppStore();

  // 智能分析函数
  const analysisInsights = useMemo(() => {
    if (expertCompareList.length < 2) return null;

    const insights = {
      similarities: [],
      differences: [],
      keyFindings: [],
      recommendations: []
    };

    // 分析相似性
    const schools = expertCompareList.map(expert => expert.school).filter(Boolean);
    const uniqueSchools = [...new Set(schools)];
    if (uniqueSchools.length === 1 && schools.length > 1) {
      insights.similarities.push(`所有专家均属于${uniqueSchools[0]}学派，具有相同的学术传承背景`);
    }

    // 专业领域相似性分析
    const allSpecialties = expertCompareList.flatMap(expert => expert.specialty || []);
    const specialtyCount = {};
    allSpecialties.forEach(specialty => {
      specialtyCount[specialty] = (specialtyCount[specialty] || 0) + 1;
    });
    const commonSpecialties = Object.keys(specialtyCount).filter(specialty => specialtyCount[specialty] > 1);
    if (commonSpecialties.length > 0) {
      insights.similarities.push(`共同专业领域包括：${commonSpecialties.join('、')}`);
    }

    // 年代相似性分析
    const birthYears = expertCompareList.map(expert => expert.birthYear).filter(Boolean);
    if (birthYears.length > 1) {
      const eraSpan = Math.max(...birthYears) - Math.min(...birthYears);
      if (eraSpan < 20) {
        insights.similarities.push(`专家年代相近（${Math.min(...birthYears)}-${Math.max(...birthYears)}年），属于同一历史时期的中医大师群体`);
      }
    }

    // 学术头衔相似性
    const titles = expertCompareList.map(expert => expert.academic_title).filter(Boolean);
    const nationalMasters = titles.filter(title => title.includes('国医大师'));
    if (nationalMasters.length > 1) {
      insights.similarities.push(`均为国医大师级别，代表中医界最高学术荣誉`);
    }

    // 分析差异性
    if (uniqueSchools.length > 1) {
      insights.differences.push(`学术流派多样化：涵盖${uniqueSchools.join('、')}等不同医学传统`);
    }

    const regions = expertCompareList.map(expert => expert.place_of_origin).filter(Boolean);
    const uniqueRegions = [...new Set(regions)];
    if (uniqueRegions.length > 1) {
      insights.differences.push(`地域分布广泛：代表${uniqueRegions.join('、')}等不同地区的中医特色`);
    }

    const experiences = expertCompareList.map(expert => expert.experience).filter(Boolean);
    if (experiences.length > 1) {
      const maxExp = Math.max(...experiences);
      const minExp = Math.min(...experiences);
      const avgExperience = experiences.reduce((a, b) => a + b, 0) / experiences.length;
      insights.differences.push(`从业经验跨度较大：${minExp}-${maxExp}年（平均${Math.round(avgExperience)}年），体现不同世代的临床积累`);
    }

    // 专业特长差异性
    const uniqueSpecialties = expertCompareList.map(expert => {
      const specs = expert.specialty || [];
      return specs.length > 0 ? specs[0] : expert.specializations?.[0];
    }).filter(Boolean);
    const uniqueSpecialtySet = [...new Set(uniqueSpecialties)];
    if (uniqueSpecialtySet.length > 1) {
      insights.differences.push(`专业特长各异：分别专精于${uniqueSpecialtySet.join('、')}等不同领域`);
    }

    // 关键发现
    const hasNationalMaster = expertCompareList.some(expert => expert.academic_title?.includes('国医大师'));
    if (hasNationalMaster) {
      const masterCount = expertCompareList.filter(expert => expert.academic_title?.includes('国医大师')).length;
      insights.keyFindings.push(`包含${masterCount}位国医大师，代表中医界最高学术水平和临床造诣`);
    }

    const totalBooks = expertCompareList.reduce((total, expert) => total + (expert.books?.length || 0), 0);
    if (totalBooks > 0) {
      insights.keyFindings.push(`学术著作丰富，总计${totalBooks}部著作，展现深厚的理论功底和学术积淀`);
    }

    const innovationsCount = expertCompareList.reduce((total, expert) => total + (expert.academicInnovations?.length || 0), 0);
    if (innovationsCount > 0) {
      insights.keyFindings.push(`理论创新卓越，共有${innovationsCount}项重要学术创新，显著推动中医药理论发展`);
    }

    // 医案分析
    const totalCases = expertCompareList.reduce((total, expert) => total + (expert.classicCases?.length || 0), 0);
    if (totalCases > 0) {
      insights.keyFindings.push(`临床经验丰富，收录${totalCases}个经典医案，为后世提供宝贵的诊疗参考`);
    }

    // 传承分析
    const totalDisciples = expertCompareList.reduce((total, expert) => total + (expert.disciples?.length || 0), 0);
    if (totalDisciples > 0) {
      insights.keyFindings.push(`学术传承有序，培养弟子${totalDisciples}人，确保中医药文化薪火相传`);
    }

    // 学习建议
    if (expertCompareList.length >= 2) {
      insights.recommendations.push(`综合学习建议：融合不同专家的诊疗特色，形成个性化的中医临床思维模式`);
      
      if (uniqueSchools.length > 1) {
        insights.recommendations.push(`流派融合：深入研究不同学派的理论精髓，取长补短，博采众长`);
      }
      
      if (innovationsCount > 0) {
        insights.recommendations.push(`创新研究：关注专家的理论创新点，有助于理解中医药现代化发展方向`);
      }
      
      if (totalCases > 0) {
        insights.recommendations.push(`医案学习：详细研读经典医案，掌握不同专家的诊疗思路和用药特色`);
      }
      
      insights.recommendations.push(`临床应用：结合现代医学知识，将传统中医理论与当代临床实践相结合`);
    }

    return insights;
  }, [expertCompareList]);

  if (expertCompareList.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-white py-8"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">专家对比</h2>
            <p className="text-gray-600 mb-4">
              选择最多3位专家进行详细对比分析
            </p>
            <p className="text-sm text-gray-500">
              在专家列表页面点击专家卡片上的 "+" 按钮来添加对比
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-white py-8"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* 页面标题 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">专家对比分析</h1>
            <p className="text-gray-600">
              正在对比 {expertCompareList.length} 位专家的详细信息
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearExpertCompare}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            <X className="w-4 h-4" />
            清空对比
          </motion.button>
        </div>

        {/* 对比表格 */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* 表头 */}
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider min-w-32">
                    对比项目
                  </th>
                  {expertCompareList.map((expert) => (
                    <th key={expert.id} className="px-6 py-4 text-left relative min-w-80">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{expert.name}</h3>
                          <p className="text-sm text-gray-600">{expert.academic_title}</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeExpertFromCompare(expert.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* 表体 */}
              <tbody className="bg-white divide-y divide-gray-200">
                {/* 基本信息 */}
                <CompareRow
                  title="基本信息"
                  icon={<User className="w-4 h-4" />}
                  experts={expertCompareList}
                  renderCell={(expert) => (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-sm">{expert.birth_year}年生</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-sm">{expert.place_of_origin}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        从业经验：{expert.experience}年
                      </div>
                    </div>
                  )}
                />

                {/* 专业领域 */}
                <CompareRow
                  title="专业领域"
                  icon={<BookOpen className="w-4 h-4" />}
                  experts={expertCompareList}
                  renderCell={(expert) => (
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-800">
                        {expert.field_of_expertise}
                      </div>
                      {expert.specialities && expert.specialities.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {expert.specialities.slice(0, 3).map((spec, idx) => (
                            <span
                              key={idx}
                              className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                />

                {/* 所属机构 */}
                <CompareRow
                  title="所属机构"
                  icon={<Award className="w-4 h-4" />}
                  experts={expertCompareList}
                  renderCell={(expert) => (
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-gray-800">
                        {expert.institution}
                      </div>
                      <div className="text-sm text-gray-600">
                        {expert.title}
                      </div>
                    </div>
                  )}
                />

                {/* 学术著作 */}
                <CompareRow
                  title="主要著作"
                  icon={<BookOpen className="w-4 h-4" />}
                  experts={expertCompareList}
                  renderCell={(expert) => (
                    <div className="space-y-2">
                      {expert.books && expert.books.slice(0, 3).map((book, idx) => (
                        <div key={idx} className="p-2 bg-gray-50 rounded-lg">
                          <div className="text-sm font-medium text-gray-800">
                            {book.title}
                          </div>
                          <div className="text-xs text-gray-600">
                            {book.publisher} • {book.year}
                          </div>
                          {book.link && (
                            <a
                              href={book.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                              查看详情
                            </a>
                          )}
                        </div>
                      ))}
                      {expert.books && expert.books.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{expert.books.length - 3} 更多著作...
                        </div>
                      )}
                    </div>
                  )}
                />

                {/* 擅长疾病 */}
                <CompareRow
                  title="擅长疾病"
                  icon={<Users className="w-4 h-4" />}
                  experts={expertCompareList}
                  renderCell={(expert) => (
                    <div className="space-y-1">
                      {expert.specialized_diseases && expert.specialized_diseases.slice(0, 4).map((disease, idx) => (
                        <div key={idx} className="text-sm text-gray-700">
                          • {disease}
                        </div>
                      ))}
                      {expert.specialized_diseases && expert.specialized_diseases.length > 4 && (
                        <div className="text-xs text-gray-500">
                          +{expert.specialized_diseases.length - 4} 更多...
                        </div>
                      )}
                    </div>
                  )}
                />

                {/* 关联药材 */}
                <CompareRow
                  title="关联药材"
                  icon={<BookOpen className="w-4 h-4" />}
                  experts={expertCompareList}
                  renderCell={(expert) => (
                    <div className="flex flex-wrap gap-1">
                      {expert.relatedHerbs && expert.relatedHerbs.slice(0, 6).map((herb, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                        >
                          {herb.name}
                        </span>
                      ))}
                      {expert.relatedHerbs && expert.relatedHerbs.length > 6 && (
                        <span className="text-xs text-gray-500">
                          +{expert.relatedHerbs.length - 6} 更多...
                        </span>
                      )}
                    </div>
                  )}
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* 智能分析洞见 */}
        {analysisInsights && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">智能分析洞见</h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">AI分析</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 相似性分析 */}
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-800">共同特征</h3>
                </div>
                {analysisInsights.similarities.length > 0 ? (
                  <ul className="space-y-2">
                    {analysisInsights.similarities.map((similarity, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-green-600 text-xs mt-1.5">●</span>
                        <span>{similarity}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">这些专家各具特色，没有明显的共同特征</p>
                )}
              </div>

              {/* 差异性分析 */}
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  <h3 className="font-semibold text-gray-800">差异特色</h3>
                </div>
                {analysisInsights.differences.length > 0 ? (
                  <ul className="space-y-2">
                    {analysisInsights.differences.map((difference, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-orange-600 text-xs mt-1.5">●</span>
                        <span>{difference}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">专家们的背景和特长较为相似</p>
                )}
              </div>

              {/* 关键发现 */}
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-semibold text-gray-800">关键发现</h3>
                </div>
                {analysisInsights.keyFindings.length > 0 ? (
                  <ul className="space-y-2">
                    {analysisInsights.keyFindings.map((finding, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-yellow-600 text-xs mt-1.5">●</span>
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">基于现有信息，暂无特别突出的发现</p>
                )}
              </div>

              {/* 学习建议 */}
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-800">学习建议</h3>
                </div>
                {analysisInsights.recommendations.length > 0 ? (
                  <ul className="space-y-2">
                    {analysisInsights.recommendations.map((recommendation, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-purple-600 text-xs mt-1.5">●</span>
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">建议深入研究每位专家的独特贡献</p>
                )}
              </div>
            </div>

            {/* 综合评价 */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">综合评价</h4>
              <p className="text-sm text-gray-700">
                通过对比这{expertCompareList.length}位中医大师，我们可以看到中医药学术的多样性和深度。
                {expertCompareList.length >= 3 ? '这种多元化的对比有助于全面理解中医药的发展轨迹和学术特色。' : '建议增加更多专家进行对比，以获得更全面的分析视角。'}
                每位专家都代表着中医药传承中的重要环节，值得深入学习和研究。
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// 对比行组件
interface CompareRowProps {
  title: string;
  icon: React.ReactNode;
  experts: any[];
  renderCell: (expert: any) => React.ReactNode;
}

const CompareRow: React.FC<CompareRowProps> = ({ title, icon, experts, renderCell }) => (
  <tr>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center gap-2">
        <div className="text-blue-600">{icon}</div>
        <span className="text-sm font-medium text-gray-800">{title}</span>
      </div>
    </td>
    {experts.map((expert) => (
      <td key={expert.id} className="px-6 py-4">
        {renderCell(expert)}
      </td>
    ))}
  </tr>
);

export default ExpertCompare;
