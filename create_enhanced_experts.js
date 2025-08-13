import fs from 'fs';

// 读取原始专家数据
const originalExperts = JSON.parse(fs.readFileSync('/workspace/data/tcm_experts_enhanced.json', 'utf8'));

// 读取药材数据，用于建立关联
const herbs = JSON.parse(fs.readFileSync('public/data/herbs_with_images.json', 'utf8'));

// 创建专家-药材关联映射
const expertHerbMapping = {
  "邓铁涛": ["人参", "黄芪", "甘草", "茯苓"],
  "朱良春": ["当归", "川芎", "白芍", "丹参"],
  "颜德馨": ["三七", "天麻", "人参", "黄芪"],
  "路志正": ["甘草", "茯苓", "当归", "白芍"],
  "张大宁": ["人参", "黄芪", "三七", "天麻"],
  "王琦": ["当归", "川芎", "甘草", "茯苓"],
  "石学敏": ["天麻", "三七", "人参", "丹参"],
  "屠呦呦": ["黄芪", "甘草", "当归", "川芎"],
  "黄璐琦": ["人参", "三七", "天麻", "茯苓"],
  "张伯礼": ["甘草", "黄芪", "当归", "白芍"],
  "陈可冀": ["丹参", "三七", "人参", "川芎"],
  "王永炎": ["天麻", "茯苓", "黄芪", "甘草"],
  "刘保延": ["当归", "白芍", "人参", "丹参"],
  "仝小林": ["川芎", "三七", "天麻", "黄芪"]
};

// 转换专家数据为新的格式
const enhancedExperts = originalExperts.map((expert, index) => {
  const relatedHerbNames = expertHerbMapping[expert.name] || [];
  const relatedHerbs = relatedHerbNames.map(herbName => {
    const herb = herbs.find(h => h.name === herbName);
    return herb ? {
      id: herb.id,
      name: herb.name,
      category: herb.category,
      primaryImage: herb.primaryImage
    } : null;
  }).filter(Boolean);

  return {
    id: `expert_${index + 1}`,
    name: expert.name,
    title: getTitle(expert),
    institution: expert.basic_info.institution,
    specialities: getSpecialities(expert),
    experience: getExperience(expert),
    avatar: `expert_${index + 1}.jpg`,
    birth_year: expert.basic_info.birth_year,
    place_of_origin: expert.basic_info.place_of_origin,
    academic_title: expert.basic_info.academic_title,
    field_of_expertise: expert.basic_info.field_of_expertise,
    
    // 教育和经历
    education: expert.education_and_experience.education,
    mentors: expert.education_and_experience.mentors,
    work_experience: expert.education_and_experience.work_experience,
    academic_roles: expert.education_and_experience.academic_roles,
    
    // 学术成就
    books: expert.academic_achievements.books,
    papers: expert.academic_achievements.papers,
    awards_and_honors: expert.academic_achievements.awards_and_honors,
    contributions_and_theories: expert.academic_achievements.contributions_and_theories,
    
    // 临床特色
    specialized_diseases: expert.clinical_features.specialized_diseases,
    common_herbs_and_formulas: expert.clinical_features.common_herbs_and_formulas,
    diagnostic_features: expert.clinical_features.diagnostic_features,
    academic_lineage: expert.clinical_features.academic_lineage,
    
    // 可访问资源
    accessible_resources: expert.accessible_resources,
    
    // 关联药材
    relatedHerbs: relatedHerbs,
    
    // 简化的推荐药材名称（向后兼容）
    recommendedHerbs: relatedHerbNames
  };
});

// 辅助函数
function getTitle(expert) {
  if (expert.basic_info.current_position.includes('已故')) {
    return expert.basic_info.current_position.replace(/（已故）/, '').trim();
  }
  return expert.basic_info.current_position;
}

function getSpecialities(expert) {
  return [expert.basic_info.field_of_expertise];
}

function getExperience(expert) {
  const currentYear = 2025;
  const birthYear = expert.basic_info.birth_year;
  const startWorkYear = birthYear + 25; // 假设25岁开始工作
  return Math.max(currentYear - startWorkYear, 0);
}

// 写入增强的专家数据
fs.writeFileSync('public/data/experts.json', JSON.stringify(enhancedExperts, null, 2));

console.log(`✅ 成功创建增强的专家数据，包含 ${enhancedExperts.length} 位专家`);
console.log('✅ 已建立专家与药材的关联关系');
console.log('✅ 已添加详细的学术信息和可访问资源');

// 创建专家头像占位符文件夹
if (!fs.existsSync('public/images/experts')) {
  fs.mkdirSync('public/images/experts', { recursive: true });
}

console.log('🎉 专家数据增强完成！');
