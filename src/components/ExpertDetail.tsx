import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, User, Award, BookOpen, Users, Calendar, 
  MapPin, GraduationCap, Star, FileText, Heart, 
  Briefcase, School, BadgeCheck, Lightbulb, Brain,
  Stethoscope, UserCheck, Target, TrendingUp
} from 'lucide-react';
import { TCMExpert } from '../types';
import { useAppStore } from '../store';

interface ExpertDetailProps {
  expert: TCMExpert;
}

const ExpertDetail: React.FC<ExpertDetailProps> = ({ expert }) => {
  const { setCurrentView, herbs } = useAppStore();

  const handleBack = () => {
    setCurrentView('experts');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-white py-8"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* 返回按钮 */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBack}
          className="flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回专家列表</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：专家基本信息 */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-8"
            >
              {/* 专家头像区域 */}
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                <div className="absolute inset-0 bg-black bg-opacity-20" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h1 className="text-2xl font-bold mb-1">{expert.name}</h1>
                  <div className="flex items-center gap-2 text-blue-100 text-sm">
                    <User className="w-4 h-4" />
                    <span>{expert.englishName || expert.pinyin}</span>
                  </div>
                </div>
              </div>

              {/* 基本信息 */}
              <div className="p-6 space-y-4">
                {/* 学术称号 */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-semibold">
                    <BadgeCheck className="w-5 h-5" />
                    {expert.academic_title}
                  </div>
                </div>

                {/* 基础信息项 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{expert.title}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <School className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{expert.institution}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{expert.place_of_origin}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      {expert.birthYear} - {expert.deathYear || '至今'} ({expert.experience}年经验)
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{expert.school}</span>
                  </div>
                </div>

                {/* 专业领域 */}
                {expert.specialty && expert.specialty.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">专业领域</h3>
                    <div className="flex flex-wrap gap-2">
                      {expert.specialty.map((spec, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 荣誉称号 */}
                {expert.achievements && expert.achievements.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">荣誉称号</h3>
                    <div className="space-y-2">
                      {expert.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-xs text-gray-700">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* 右侧：详细信息 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 个人简介 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <User className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-800">个人简介</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-justify">
                {expert.biography}
              </p>
            </motion.div>

            {/* 师承关系 */}
            {expert.lineage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-6 h-6 text-purple-600" />
                  <h2 className="text-xl font-bold text-gray-800">师承关系</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">师承信息</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">师父：</span>{expert.lineage.mentorName}</p>
                      <p><span className="font-medium">学习时期：</span>{expert.lineage.learningPeriod}</p>
                      <p><span className="font-medium">传承方式：</span>{expert.lineage.inheritanceMethod}</p>
                      <p><span className="font-medium">流派：</span>{expert.lineage.mentorSchool}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <h3 className="font-semibold text-indigo-800 mb-2">传承谱系</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">谱系名称：</span>{expert.lineage.lineageName}</p>
                      <p><span className="font-medium">传承世代：</span>第{expert.lineage.lineageGeneration}代</p>
                      <p><span className="font-medium">认证状态：</span>
                        {expert.lineage.certificationStatus ? '已认证' : '未认证'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 学术成就与著作 */}
            {expert.books && expert.books.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-bold text-gray-800">学术著作</h2>
                </div>
                <div className="space-y-4">
                  {expert.books.map((book, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="border-l-4 border-green-500 pl-4 py-2"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">{book.title}</h3>
                          {book.description && (
                            <p className="text-gray-600 text-sm mb-2">{book.description}</p>
                          )}
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{book.year} 年</span>
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                              {book.publisher}
                            </span>
                          </div>
                        </div>
                        <FileText className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 专业特色 */}
            {expert.specializations && expert.specializations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-6 h-6 text-orange-600" />
                  <h2 className="text-xl font-bold text-gray-800">专业特色</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">专业特长</h3>
                    <div className="space-y-2">
                      {expert.specializations.map((spec, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {expert.uniqueTherapies && expert.uniqueTherapies.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">独特疗法</h3>
                      <div className="space-y-2">
                        {expert.uniqueTherapies.map((therapy, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Heart className="w-4 h-4 text-red-500" />
                            <span className="text-sm text-gray-700">{therapy}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* 传承信息 */}
            {expert.inheritanceInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-6 h-6 text-indigo-600" />
                  <h2 className="text-xl font-bold text-gray-800">传承工作</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-indigo-50 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600 mb-1">
                      {expert.inheritanceInfo.totalStudents}
                    </div>
                    <div className="text-sm text-gray-600">培养学生总数</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {expert.inheritanceInfo.activeInheritors}
                    </div>
                    <div className="text-sm text-gray-600">活跃传承人</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-sm font-semibold text-purple-600 mb-1">
                      {expert.inheritanceInfo.inheritanceStatus === 'completed' ? '已完成' : 
                       expert.inheritanceInfo.inheritanceStatus === 'ongoing' ? '进行中' : '筹备中'}
                    </div>
                    <div className="text-sm text-gray-600">传承状态</div>
                  </div>
                </div>
                
                {expert.inheritanceInfo.inheritancePrograms && expert.inheritanceInfo.inheritancePrograms.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-800 mb-2">传承项目</h3>
                    <div className="flex flex-wrap gap-2">
                      {expert.inheritanceInfo.inheritancePrograms.map((program, index) => (
                        <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                          {program}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* 医学观点 */}
            {expert.medicalPhilosophy && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-6 h-6 text-indigo-600" />
                  <h2 className="text-xl font-bold text-gray-800">医学观点</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <h3 className="font-semibold text-indigo-800 mb-2">核心理论</h3>
                    <p className="text-sm text-gray-700">{expert.medicalPhilosophy.coreTheory}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">诊断原则</h3>
                    <p className="text-sm text-gray-700">{expert.medicalPhilosophy.diagnosticPrinciple}</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">治疗理念</h3>
                    <p className="text-sm text-gray-700">{expert.medicalPhilosophy.treatmentPhilosophy}</p>
                  </div>
                  <div className="p-4 bg-teal-50 rounded-lg">
                    <h3 className="font-semibold text-teal-800 mb-2">现代观点</h3>
                    <p className="text-sm text-gray-700">{expert.medicalPhilosophy.modernViewpoint}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 经典医案 */}
            {expert.classicCases && expert.classicCases.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Stethoscope className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-bold text-gray-800">经典医案</h2>
                </div>
                <div className="space-y-6">
                  {expert.classicCases.map((medicalCase, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="border border-green-200 rounded-lg p-4 bg-gradient-to-br from-green-50 to-emerald-50"
                    >
                      <h3 className="font-semibold text-green-800 mb-3">{medicalCase.caseName}</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm font-medium text-gray-700">患者信息：</span>
                            <span className="text-sm text-gray-600">{medicalCase.patientInfo}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-700">主诉：</span>
                            <span className="text-sm text-gray-600">{medicalCase.chiefComplaint}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-700">中医诊断：</span>
                            <span className="text-sm text-gray-600">{medicalCase.diagnosis}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-700">治疗原则：</span>
                            <span className="text-sm text-gray-600">{medicalCase.treatmentPrinciple}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm font-medium text-gray-700">处方：</span>
                            <div className="text-sm text-gray-600 bg-white p-2 rounded border">
                              {medicalCase.prescription}
                            </div>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-700">疗效：</span>
                            <span className="text-sm text-gray-600">{medicalCase.outcome}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-700">学术意义：</span>
                            <span className="text-sm text-gray-600">{medicalCase.significance}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 学术创新 */}
            {expert.academicInnovations && expert.academicInnovations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-6 h-6 text-yellow-600" />
                  <h2 className="text-xl font-bold text-gray-800">学术创新</h2>
                </div>
                <div className="space-y-4">
                  {expert.academicInnovations.map((innovation, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="p-4 border border-yellow-200 rounded-lg bg-gradient-to-br from-yellow-50 to-amber-50"
                    >
                      <h3 className="font-semibold text-yellow-800 mb-2">{innovation.innovationName}</h3>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-gray-700">理论描述：</span>
                          <span className="text-sm text-gray-600">{innovation.description}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">临床应用：</span>
                          <span className="text-sm text-gray-600">{innovation.clinicalApplication}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">学术影响：</span>
                          <span className="text-sm text-gray-600">{innovation.academicImpact}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 临床特色 */}
            {expert.clinicalFeatures && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-6 h-6 text-pink-600" />
                  <h2 className="text-xl font-bold text-gray-800">临床特色</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-pink-50 rounded-lg">
                    <h3 className="font-semibold text-pink-800 mb-3">诊断技能</h3>
                    <ul className="space-y-1">
                      {expert.clinicalFeatures.diagnosticSkills?.map((skill, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-pink-600 text-xs mt-1">•</span>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-rose-50 rounded-lg">
                    <h3 className="font-semibold text-rose-800 mb-3">处方特点</h3>
                    <ul className="space-y-1">
                      {expert.clinicalFeatures.prescriptionFeatures?.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-rose-600 text-xs mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h3 className="font-semibold text-red-800 mb-3">治疗方法</h3>
                    <ul className="space-y-1">
                      {expert.clinicalFeatures.treatmentMethods?.map((method, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-red-600 text-xs mt-1">•</span>
                          <span>{method}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 传承弟子 */}
            {expert.disciples && expert.disciples.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <UserCheck className="w-6 h-6 text-slate-600" />
                  <h2 className="text-xl font-bold text-gray-800">传承弟子</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {expert.disciples.map((disciple, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="p-4 border border-slate-200 rounded-lg bg-gradient-to-br from-slate-50 to-gray-50 hover:shadow-md transition-shadow"
                    >
                      <div className="text-center mb-3">
                        <div className="w-12 h-12 bg-slate-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <span className="text-slate-600 font-bold">{disciple.name.charAt(0)}</span>
                        </div>
                        <h3 className="font-semibold text-gray-800">{disciple.name}</h3>
                        <p className="text-sm text-gray-600">{disciple.title}</p>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="text-xs font-medium text-gray-700">专业：</span>
                          <span className="text-xs text-gray-600">{disciple.specialty}</span>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-gray-700">成就：</span>
                          <p className="text-xs text-gray-600">{disciple.achievement}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 相关药方 */}
            {expert.relatedFormulas && expert.relatedFormulas.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-6 h-6 text-emerald-600" />
                  <h2 className="text-xl font-bold text-gray-800">相关药方</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {expert.relatedFormulas.map((formula, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="p-4 border border-emerald-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-emerald-50 to-teal-50"
                      onClick={() => {
                        // 可以添加跳转到药方详情的逻辑
                        console.log('跳转到药方：', formula.name);
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-emerald-600 text-sm font-bold">{formula.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 text-sm mb-1 truncate">{formula.name}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                              {formula.category}
                            </span>
                            {formula.effectiveness && (
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500" />
                                <span className="text-xs text-gray-600">{formula.effectiveness}/10</span>
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">{formula.relationship}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExpertDetail;
