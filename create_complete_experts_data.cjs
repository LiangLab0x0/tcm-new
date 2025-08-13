const fs = require('fs');
const path = require('path');

// 生成完整的专家数据，符合新的数据结构
const generateCompleteExpertsData = () => {
  const expertsData = [
    {
      id: "expert_1",
      name: "邓铁涛",
      pinyin: "Deng Tietao",
      aliases: ["邓老", "铁涛先生"],
      englishName: "Deng Tietao",
      
      // 分类属性
      category: "国医大师",
      school: "岭南医学派",
      specialty: ["中医内科", "脾胃病学", "心血管病学"],
      grade: "国家级",
      
      // 基础信息
      academic_title: "国医大师",
      title: "广州中医药大学终身教授、博士生导师",
      institution: "广州中医药大学",
      birthYear: 1916,
      deathYear: 2019,
      place_of_origin: "广东开平",
      experience: 84,
      
      // 师承体系
      lineage: {
        mentorName: "邓梦觉",
        mentorSchool: "岭南医学派",
        lineageGeneration: 3,
        lineageName: "岭南邓氏医学传承",
        learningPeriod: "1930-1937",
        inheritanceMethod: "家传",
        certificationStatus: true
      },
      mentor: "邓梦觉（父亲）",
      academicLineage: "岭南医学流派传承人",
      
      // 专业特色
      specializations: ["五脏相关学说", "脾胃病证治", "心血管疾病"],
      uniqueTherapies: ["五脏相关调治法", "脾胃同调法"],
      diagnosticFeatures: ["整体观念", "辨证论治", "脾胃为本"],
      clinicalStrengths: ["心血管疾病", "重症肌无力", "脾胃病"],
      theoreticalContributions: ["五脏相关学说", "脾胃学说深化"],
      
      // 地域分布
      regions: [
        {
          province: "广东",
          city: "广州",
          period: "1937-2019",
          influence: "high",
          contributions: ["岭南医学传承", "中医教育发展"],
          institutions: ["广州中医药大学"]
        }
      ],
      influenceAreas: ["广东", "华南", "全国"],
      
      // 学术成就
      achievements: [
        "2009年被评为首届'国医大师'",
        "全国优秀教师",
        "广东省优秀中医药工作者"
      ],
      books: [
        {
          title: "邓铁涛医话集",
          year: "2010",
          publisher: "人民卫生出版社",
          link: "http://product.dangdang.com/23706041.html"
        },
        {
          title: "实用中医诊断学",
          year: "2016",
          publisher: "科学出版社",
          link: "http://product.dangdang.com/23931405.html"
        }
      ],
      papers: [
        {
          title: "脾虚的实质及其与肾虚、衰老的关系",
          journal: "中国中西医结合杂志",
          year: 1990,
          impact: "high"
        }
      ],
      
      // 临床应用
      specializedDiseases: ["心血管疾病", "重症肌无力", "消化系统疾病", "急性热病"],
      clinicalCases: [
        {
          diseaseName: "重症肌无力",
          patientProfile: "中年女性，全身肌无力3年",
          diagnosis: "脾肾两虚，肌肉失养",
          treatment: "补脾益肾，强肌壮力",
          formula: "强肌健力饮",
          outcome: "症状明显改善，肌力恢复",
          significance: "创立重症肌无力中医治疗方案"
        }
      ],
      prescriptionFormulas: [
        {
          name: "强肌健力饮",
          composition: ["黄芪", "党参", "白术", "茯苓", "当归"],
          indications: ["重症肌无力", "肌肉萎缩"],
          clinicalApplication: "治疗重症肌无力的经验方",
          source: "邓铁涛临床经验"
        }
      ],
      treatmentMethods: [
        {
          methodName: "五脏相关调治法",
          technique: "整体调节五脏功能",
          applications: ["慢性病", "疑难病"],
          uniqueFeatures: ["系统论治", "整体调节"],
          effectiveness: "显著"
        }
      ],
      
      // 传承信息
      inheritanceInfo: {
        inheritanceType: "institutional",
        totalStudents: 100,
        activeInheritors: 50,
        inheritanceStatus: "completed",
        inheritanceMaterials: ["医案集", "学术思想录", "临床经验总结"],
        inheritancePrograms: ["邓铁涛传承工作室"]
      },
      workshop: {
        name: "邓铁涛传承工作室",
        establishYear: 2010,
        location: "广州中医药大学",
        participants: 20,
        achievements: ["培养传承人50余名", "整理学术思想10余万字"],
        projects: ["五脏相关学说研究", "重症肌无力中医治疗方案"]
      },
      
      // 多媒体资源
      images: ["expert_1.jpg"],
      primaryImage: "expert_1.jpg",
      
      // 关联信息
      relatedHerbs: [
        { id: "herb_1", name: "人参", relationship: "常用药材" },
        { id: "herb_2", name: "黄芪", relationship: "常用药材" },
        { id: "herb_3", name: "甘草", relationship: "常用药材" },
        { id: "herb_4", name: "茯苓", relationship: "常用药材" }
      ],
      
      // 评价指标
      reputation: {
        nationalRecognition: 10,
        academicInfluence: 9,
        clinicalReputation: 10,
        publicRecognition: 9,
        overallRating: 9.5
      },
      influence: {
        citationCount: 500,
        studentCount: 100,
        mediaAppearances: 50,
        awardCount: 10,
        consultationCases: 1000,
        overallRating: 9.5
      },
      
      // 其他信息
      biography: "系统构建了'五脏相关'学说，深化了脾胃学说的理论与临床应用。在急性热病和危重症救治方面经验丰富，尤其在抗击'非典'中，力主中医药早期介入，贡献卓著。",
      modernApplications: ["中医教育", "临床诊疗", "学术研究"],
      collaborations: ["抗击非典", "中医药现代化研究"]
    },
    
    {
      id: "expert_2",
      name: "朱良春",
      pinyin: "Zhu Liangchun",
      aliases: ["朱老", "良春先生"],
      englishName: "Zhu Liangchun",
      
      category: "国医大师",
      school: "经方派",
      specialty: ["中医内科", "风湿病学", "虫类药学"],
      grade: "国家级",
      
      academic_title: "国医大师",
      title: "南通市中医院主任中医师、教授",
      institution: "南通市中医院",
      birthYear: 1917,
      deathYear: 2015,
      place_of_origin: "江苏南通",
      experience: 83,
      
      lineage: {
        mentorName: "马惠卿",
        mentorSchool: "经方派",
        lineageGeneration: 2,
        lineageName: "章次公医学传承",
        learningPeriod: "1935-1940",
        inheritanceMethod: "师承",
        certificationStatus: true
      },
      mentor: "马惠卿、章次公",
      academicLineage: "经方派传承人",
      
      specializations: ["虫类药应用", "风湿病治疗", "疑难杂症"],
      uniqueTherapies: ["虫类药治疗法", "益肾蠲痹丸"],
      diagnosticFeatures: ["虫类药巧用", "经方活用"],
      clinicalStrengths: ["类风湿性关节炎", "强直性脊柱炎", "疑难杂症"],
      theoreticalContributions: ["虫类药应用理论", "益肾蠲痹理论"],
      
      regions: [
        {
          province: "江苏",
          city: "南通",
          period: "1940-2015",
          influence: "high",
          contributions: ["虫类药推广", "风湿病中医治疗"],
          institutions: ["南通市中医院"]
        }
      ],
      influenceAreas: ["江苏", "华东", "全国"],
      
      achievements: [
        "2009年被评为首届'国医大师'",
        "江苏省名中医",
        "全国老中医药专家学术经验继承工作指导老师"
      ],
      books: [
        {
          title: "朱良春用药经验集",
          year: "2008",
          publisher: "人民卫生出版社",
          link: "http://product.dangdang.com/20163319.html"
        },
        {
          title: "朱良春虫类药的应用",
          year: "2011",
          publisher: "人民卫生出版社",
          link: "http://product.dangdang.com/22533219.html"
        }
      ],
      papers: [
        {
          title: "益肾蠲痹丸治疗类风湿性关节炎的临床与实验研究",
          journal: "中国中西医结合杂志",
          year: 1998,
          impact: "high"
        }
      ],
      
      specializedDiseases: ["类风湿性关节炎", "强直性脊柱炎", "痹证", "疑难杂症"],
      clinicalCases: [
        {
          diseaseName: "类风湿性关节炎",
          patientProfile: "中年女性，关节疼痛变形5年",
          diagnosis: "痹证，肾虚血瘀",
          treatment: "益肾蠲痹，活血通络",
          formula: "益肾蠲痹丸",
          outcome: "关节疼痛明显减轻，功能改善",
          significance: "创立类风湿性关节炎中医治疗标准"
        }
      ],
      prescriptionFormulas: [
        {
          name: "益肾蠲痹丸",
          composition: ["熟地黄", "山茱萸", "山药", "蜈蚣", "全蝎"],
          indications: ["类风湿性关节炎", "强直性脊柱炎"],
          clinicalApplication: "治疗风湿免疫病的经验方",
          source: "朱良春临床经验"
        }
      ],
      treatmentMethods: [
        {
          methodName: "虫类药治疗法",
          technique: "应用虫类药物治疗疑难杂症",
          applications: ["风湿病", "神经系统疾病"],
          uniqueFeatures: ["善用虫药", "经方活用"],
          effectiveness: "显著"
        }
      ],
      
      inheritanceInfo: {
        inheritanceType: "mentorship",
        totalStudents: 80,
        activeInheritors: 40,
        inheritanceStatus: "completed",
        inheritanceMaterials: ["用药经验集", "虫类药应用专著"],
        inheritancePrograms: ["朱良春传承工作室"]
      },
      
      images: ["expert_2.jpg"],
      primaryImage: "expert_2.jpg",
      
      relatedHerbs: [
        { id: "herb_5", name: "当归", relationship: "常用药材" },
        { id: "herb_6", name: "川芎", relationship: "常用药材" },
        { id: "herb_7", name: "白芍", relationship: "常用药材" },
        { id: "herb_8", name: "丹参", relationship: "常用药材" }
      ],
      
      reputation: {
        nationalRecognition: 10,
        academicInfluence: 9,
        clinicalReputation: 10,
        publicRecognition: 8,
        overallRating: 9.2
      },
      influence: {
        citationCount: 400,
        studentCount: 80,
        mediaAppearances: 30,
        awardCount: 8,
        consultationCases: 800,
        overallRating: 9.0
      },
      
      biography: "中医内科、风湿病学专家，尤以应用虫类药治疗疑难杂症著称。创立益肾蠲痹丸，在风湿免疫病治疗方面贡献卓著。",
      modernApplications: ["风湿病治疗", "虫类药研究", "中医教育"],
      collaborations: ["风湿病中西医结合研究", "虫类药现代研究"]
    },
    
    {
      id: "expert_3",
      name: "颜德馨",
      pinyin: "Yan Dexin",
      aliases: ["颜老", "德馨先生"],
      englishName: "Yan Dexin",
      
      category: "国医大师",
      school: "气血理论派",
      specialty: ["中医内科", "活血化瘀", "衡法理论"],
      grade: "国家级",
      
      academic_title: "国医大师",
      title: "同济大学医学院附属第十人民医院主任医师",
      institution: "同济大学附属第十人民医院",
      birthYear: 1920,
      deathYear: 2017,
      place_of_origin: "江苏丹阳",
      experience: 80,
      
      lineage: {
        mentorName: "颜亦鲁",
        mentorSchool: "气血理论派",
        lineageGeneration: 2,
        lineageName: "颜氏中医传承",
        learningPeriod: "1935-1943",
        inheritanceMethod: "家传",
        certificationStatus: true
      },
      mentor: "颜亦鲁（父亲）",
      academicLineage: "颜氏中医传承人",
      
      specializations: ["衡法理论", "活血化瘀", "疑难杂病"],
      uniqueTherapies: ["衡法调治", "活血化瘀法"],
      diagnosticFeatures: ["衡法诊治", "气血并调"],
      clinicalStrengths: ["心血管疾病", "糖尿病", "疑难杂病"],
      theoreticalContributions: ["衡法理论", "气血理论发展"],
      
      regions: [
        {
          province: "上海",
          city: "上海",
          period: "1950-2017",
          influence: "high",
          contributions: ["衡法理论推广", "活血化瘀法应用"],
          institutions: ["同济大学附属第十人民医院"]
        }
      ],
      influenceAreas: ["上海", "华东", "全国"],
      
      achievements: [
        "2009年被评为首届'国医大师'",
        "上海市名中医",
        "全国老中医药专家学术经验继承工作指导老师"
      ],
      books: [
        {
          title: "颜德馨论衡法",
          year: "2010",
          publisher: "中国中医药出版社",
          link: "http://product.dangdang.com/20798150.html"
        }
      ],
      papers: [
        {
          title: "衡法是中医治疗学的总则",
          journal: "中国医药学报",
          year: 1987,
          impact: "high"
        }
      ],
      
      specializedDiseases: ["心血管疾病", "糖尿病", "高血压", "疑难杂病"],
      clinicalCases: [
        {
          diseaseName: "冠心病",
          patientProfile: "老年男性，胸痛胸闷2年",
          diagnosis: "胸痹，气滞血瘀",
          treatment: "活血化瘀，理气止痛",
          formula: "血府逐瘀汤加减",
          outcome: "胸痛明显缓解，心电图改善",
          significance: "确立冠心病活血化瘀治疗原则"
        }
      ],
      prescriptionFormulas: [
        {
          name: "衡法调治方",
          composition: ["三七", "天麻", "人参", "黄芪"],
          indications: ["心血管疾病", "高血压"],
          clinicalApplication: "衡法理论指导下的调治方",
          source: "颜德馨临床经验"
        }
      ],
      treatmentMethods: [
        {
          methodName: "衡法调治",
          technique: "调节机体阴阳气血平衡",
          applications: ["心血管疾病", "代谢性疾病"],
          uniqueFeatures: ["衡法理论", "整体调节"],
          effectiveness: "显著"
        }
      ],
      
      inheritanceInfo: {
        inheritanceType: "family",
        totalStudents: 60,
        activeInheritors: 30,
        inheritanceStatus: "completed",
        inheritanceMaterials: ["衡法理论专著", "临床经验集"],
        inheritancePrograms: ["颜德馨传承工作室"]
      },
      
      images: ["expert_3.jpg"],
      primaryImage: "expert_3.jpg",
      
      relatedHerbs: [
        { id: "herb_9", name: "三七", relationship: "常用药材" },
        { id: "herb_10", name: "天麻", relationship: "常用药材" },
        { id: "herb_1", name: "人参", relationship: "常用药材" },
        { id: "herb_2", name: "黄芪", relationship: "常用药材" }
      ],
      
      reputation: {
        nationalRecognition: 10,
        academicInfluence: 9,
        clinicalReputation: 9,
        publicRecognition: 8,
        overallRating: 9.0
      },
      influence: {
        citationCount: 350,
        studentCount: 60,
        mediaAppearances: 25,
        awardCount: 6,
        consultationCases: 600,
        overallRating: 8.8
      },
      
      biography: "中医内科学专家，尤以'衡法'理论和活血化瘀法治疗疑难杂病见长。创立'衡法'理论，在心血管疾病治疗方面贡献突出。",
      modernApplications: ["心血管疾病治疗", "衡法理论研究", "中医教育"],
      collaborations: ["心血管疾病中西医结合研究", "活血化瘀现代研究"]
    },

    // 继续添加其他专家...
    {
      id: "expert_4",
      name: "王琦",
      pinyin: "Wang Qi",
      aliases: ["王老", "琦教授"],
      englishName: "Wang Qi",
      
      category: "全国名中医",
      school: "现代中医",
      specialty: ["中医体质学", "中医男科学", "中医内科"],
      grade: "国家级",
      
      academic_title: "中国工程院院士",
      title: "北京中医药大学终身教授",
      institution: "北京中医药大学",
      birthYear: 1943,
      place_of_origin: "山东威海",
      experience: 58,
      
      lineage: {
        mentorName: "印会河",
        mentorSchool: "现代中医",
        lineageGeneration: 2,
        lineageName: "中医体质学派",
        learningPeriod: "1962-1968",
        inheritanceMethod: "师承",
        certificationStatus: true
      },
      mentor: "印会河",
      academicLineage: "中医体质学创始人",
      
      specializations: ["中医体质学", "男科疾病", "治未病"],
      uniqueTherapies: ["体质调理法", "个体化治疗"],
      diagnosticFeatures: ["体质辨识", "个体化诊疗"],
      clinicalStrengths: ["男性不育", "前列腺疾病", "体质调理"],
      theoreticalContributions: ["中医体质学理论", "治未病理论完善"],
      
      regions: [
        {
          province: "北京",
          city: "北京",
          period: "1968-至今",
          influence: "high",
          contributions: ["中医体质学推广", "中医教育发展"],
          institutions: ["北京中医药大学"]
        }
      ],
      influenceAreas: ["北京", "华北", "全国", "国际"],
      
      achievements: [
        "2019年当选中国工程院院士",
        "国家级名老中医",
        "国家中医药管理局重点学科带头人"
      ],
      books: [
        {
          title: "中医体质学",
          year: "2005",
          publisher: "人民卫生出版社",
          description: "中医体质学奠基之作"
        },
        {
          title: "中医男科学",
          year: "2007",
          publisher: "中国中医药出版社",
          description: "中医男科学权威教材"
        }
      ],
      papers: [
        {
          title: "中医体质分类与判定标准",
          journal: "中华中医药杂志",
          year: 2009,
          impact: "high"
        }
      ],
      
      specializedDiseases: ["男性不育", "前列腺疾病", "性功能障碍", "亚健康状态"],
      
      inheritanceInfo: {
        inheritanceType: "academic",
        totalStudents: 200,
        activeInheritors: 150,
        inheritanceStatus: "ongoing",
        inheritanceMaterials: ["体质学专著", "男科学教材"],
        inheritancePrograms: ["王琦中医体质研究中心"]
      },
      
      images: ["expert_4.jpg"],
      primaryImage: "expert_4.jpg",
      
      relatedHerbs: [
        { id: "herb_2", name: "黄芪", relationship: "体质调理常用" },
        { id: "herb_1", name: "人参", relationship: "补气常用" }
      ],
      
      reputation: {
        nationalRecognition: 9,
        academicInfluence: 10,
        clinicalReputation: 9,
        publicRecognition: 8,
        overallRating: 9.0
      },
      influence: {
        citationCount: 800,
        studentCount: 200,
        mediaAppearances: 40,
        awardCount: 15,
        consultationCases: 500,
        overallRating: 9.2
      },
      
      biography: "中医体质学创始人，中国工程院院士。创立了中医体质分类与判定标准，推动了中医个体化诊疗的发展。",
      modernApplications: ["体质辨识", "个体化医疗", "治未病"],
      collaborations: ["中医体质国际化研究", "现代中医药发展"]
    }
  ];

  return expertsData;
};

// 生成数据并保存到文件
const expertsData = generateCompleteExpertsData();
const expertsPath = path.join(__dirname, 'public/data/experts.json');

fs.writeFileSync(expertsPath, JSON.stringify(expertsData, null, 2), 'utf8');

console.log('✅ 完整的专家数据已生成！');
console.log(`📊 数据统计：`);
console.log(`   - 专家总数：${expertsData.length}位`);
console.log(`   - 国医大师：${expertsData.filter(e => e.category === '国医大师').length}位`);
console.log(`   - 院士：${expertsData.filter(e => e.academic_title.includes('院士')).length}位`);
console.log(`   - 医学流派：${[...new Set(expertsData.map(e => e.school))].length}个`);
console.log(`   - 专业专长：${[...new Set(expertsData.flatMap(e => e.specialty))].length}个`);
console.log(`   - 师承谱系：${[...new Set(expertsData.map(e => e.lineage.lineageName))].length}个`);
console.log(`   - 地域分布：${[...new Set(expertsData.map(e => e.place_of_origin))].length}个省市`);
