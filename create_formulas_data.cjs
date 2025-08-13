const fs = require('fs');
const path = require('path');

// 生成药方数据
const generateFormulasData = () => {
  const formulasData = [
    {
      id: "formula_1",
      name: "补中益气汤",
      pinyin: "Buzhong Yiqi Tang",
      aliases: ["补中益气散", "调中益气汤"],
      englishName: "Tonify the Middle and Augment the Qi Decoction",
      
      category: "补益方",
      formulaSource: "经典方",
      sourceBook: "脾胃论",
      dynastyPeriod: "金代",
      originalText: "人参、白术、炙甘草、当归、陈皮、升麻、柴胡、黄芪",
      
      ingredients: [
        {
          id: "herb_2",
          name: "黄芪",
          dosage: "12-30g",
          role: "monarch",
          roleDescription: "补气固表，为君药",
          processingMethod: "蜜炙",
          notes: "补气之要药"
        },
        {
          id: "herb_1",
          name: "人参",
          dosage: "6-12g",
          role: "minister",
          roleDescription: "补气健脾，为臣药",
          processingMethod: "生用",
          notes: "气虚重症可用"
        },
        {
          id: "herb_11",
          name: "白术",
          dosage: "6-12g",
          role: "minister",
          roleDescription: "健脾燥湿，为臣药",
          processingMethod: "炒用"
        },
        {
          id: "herb_5",
          name: "当归",
          dosage: "6-10g",
          role: "assistant",
          roleDescription: "补血和血，为佐药",
          processingMethod: "酒洗"
        },
        {
          id: "herb_12",
          name: "陈皮",
          dosage: "3-6g",
          role: "assistant",
          roleDescription: "理气健脾，为佐药"
        },
        {
          id: "herb_13",
          name: "升麻",
          dosage: "3-6g",
          role: "assistant",
          roleDescription: "升举阳气，为佐药"
        },
        {
          id: "herb_14",
          name: "柴胡",
          dosage: "3-6g",
          role: "assistant",
          roleDescription: "疏肝解郁，升举阳气，为佐药"
        },
        {
          id: "herb_3",
          name: "甘草",
          dosage: "3-6g",
          role: "guide",
          roleDescription: "调和诸药，为使药",
          processingMethod: "炙用"
        }
      ],
      
      preparation: "水煎服，每日一剂，分二次温服",
      administration: {
        dosage: "每日一剂，水煎分二次服",
        timing: "饭前温服",
        duration: "7-14天为一疗程",
        frequency: "日服二次",
        notes: "宜空腹服用，以利药物吸收"
      },
      
      effects: {
        primaryEffect: "补中益气，升阳举陷",
        secondaryEffects: ["健脾和胃", "调和营卫", "固表止汗"],
        mechanismOfAction: "通过补益脾胃之气，升举下陷之阳气，调理中焦气机",
        clinicalApplications: ["脾胃气虚", "中气下陷", "久泻脱肛", "子宫脱垂"]
      },
      
      clinicalIndications: [
        {
          disease: "脾胃气虚证",
          symptoms: ["倦怠乏力", "食少便溏", "腹胀", "面色萎黄"],
          tcmSyndrome: "脾胃气虚，中阳不足",
          modernDiagnosis: "慢性胃炎、胃下垂、慢性肠炎",
          severity: "moderate"
        },
        {
          disease: "中气下陷证",
          symptoms: ["久泻不止", "脱肛", "子宫脱垂", "胃下垂"],
          tcmSyndrome: "中气下陷，升举无力",
          modernDiagnosis: "内脏下垂、慢性腹泻",
          severity: "moderate"
        }
      ],
      
      contraclinicalIndications: [
        {
          type: "absolute",
          description: "阴虚火旺者忌用",
          reason: "本方性温，阴虚火旺者服之助火伤阴",
          alternatives: ["生脉散", "沙参麦冬汤"]
        }
      ],
      
      treatmentDomains: [
        {
          id: "domain_1",
          name: "脾胃病",
          description: "脾胃功能失调相关疾病",
          commonDiseases: ["慢性胃炎", "胃下垂", "慢性腹泻"],
          tcmTheory: "脾主运化，胃主受纳",
          modernMedicine: "消化系统疾病"
        }
      ],
      
      formulaAnalysis: {
        structure: "君臣佐使配伍严谨",
        compatibility: "补气与升阳并用，标本兼治",
        modifications: ["气虚甚者加党参", "血虚加熟地黄", "湿重加茯苓"],
        relatedFormulas: ["四君子汤", "六君子汤", "参苓白术散"]
      },
      
      modernResearch: {
        pharmacology: ["增强免疫功能", "调节胃肠运动", "抗疲劳作用"],
        clinicalStudies: ["治疗胃下垂有效率85%", "改善慢性疲劳综合征"],
        mechanismStudies: ["调节胃肠激素分泌", "改善胃肠动力"],
        qualityControl: ["HPLC测定黄芪甲苷含量", "薄层色谱鉴别"],
        safetyProfile: ["长期服用安全", "无明显不良反应"]
      },
      
      clinicalGuidelines: {
        patientProfile: "中老年气虚体质者",
        diagnosticCriteria: ["脾胃气虚证候", "中医四诊合参"],
        treatmentProtocol: "辨证论治，个体化用药",
        followUpGuidelines: "定期复诊，调整剂量",
        combinationTherapy: "可配合针灸、推拿"
      },
      
      qualityControl: {
        standardization: "国家药品标准",
        qualityMarkers: ["黄芪甲苷", "人参皂苷"],
        preparation: "严格按比例配制",
        storage: "密封，置阴凉干燥处"
      },
      
      relatedExperts: [
        {
          id: "expert_1",
          name: "邓铁涛",
          relationship: "临床应用专家"
        }
      ],
      
      relatedDiseases: ["脾胃气虚", "中气下陷", "胃下垂", "慢性腹泻"],
      relatedSymptoms: ["倦怠乏力", "食少便溏", "脱肛", "胃痛"],
      
      effectiveness: {
        clinicalEfficacy: 8.5,
        safetyProfile: 9.0,
        evidenceLevel: "A",
        recommendationGrade: 5
      },
      
      usageStats: {
        prescriptionFrequency: 1250,
        clinicalStudies: 89,
        patientReports: 3420,
        expertRecommendations: 156
      },
      
      notes: "李东垣创制，为补气升阳之代表方",
      references: ["脾胃论", "医方集解", "中医方剂学"],
      lastUpdated: "2025-07-14"
    },
    
    {
      id: "formula_2",
      name: "益肾蠲痹丸",
      pinyin: "Yishen Juanbi Wan",
      aliases: ["益肾蠲痹汤", "朱良春益肾蠲痹丸"],
      englishName: "Kidney-Tonifying Arthralgia-Relieving Pill",
      
      category: "补益方",
      formulaSource: "验方",
      sourceBook: "朱良春用药经验集",
      dynastyPeriod: "现代",
      originalText: "朱良春经验方，专治痹证",
      
      ingredients: [
        {
          id: "herb_15",
          name: "熟地黄",
          dosage: "15-20g",
          role: "monarch",
          roleDescription: "滋肾阴，补肾精，为君药"
        },
        {
          id: "herb_16",
          name: "山茱萸",
          dosage: "10-15g",
          role: "minister",
          roleDescription: "补肝肾，固精气，为臣药"
        },
        {
          id: "herb_17",
          name: "山药",
          dosage: "15-20g",
          role: "minister",
          roleDescription: "补脾肾，为臣药"
        },
        {
          id: "herb_18",
          name: "蜈蚣",
          dosage: "3-5g",
          role: "assistant",
          roleDescription: "搜风通络，为佐药"
        },
        {
          id: "herb_19",
          name: "全蝎",
          dosage: "3-6g",
          role: "assistant",
          roleDescription: "息风止痉，通络止痛，为佐药"
        }
      ],
      
      preparation: "上药共研细末，制成蜜丸，每丸重9g",
      administration: {
        dosage: "每次1丸，每日2-3次",
        timing: "饭后服用",
        duration: "3个月为一疗程",
        frequency: "日服2-3次",
        notes: "服药期间忌食辛辣刺激食物"
      },
      
      effects: {
        primaryEffect: "益肾蠲痹，搜风通络",
        secondaryEffects: ["强筋骨", "止疼痛", "活血化瘀"],
        mechanismOfAction: "补肾强骨与搜风通络并用，标本兼治",
        clinicalApplications: ["类风湿性关节炎", "强直性脊柱炎", "骨关节炎"]
      },
      
      clinicalIndications: [
        {
          disease: "类风湿性关节炎",
          symptoms: ["关节疼痛", "晨僵", "关节变形", "活动受限"],
          tcmSyndrome: "肾虚督寒，痹阻经络",
          modernDiagnosis: "类风湿性关节炎",
          severity: "moderate"
        }
      ],
      
      contraclinicalIndications: [
        {
          type: "relative",
          description: "孕妇慎用",
          reason: "方中含虫类药，恐有堕胎之虞"
        }
      ],
      
      treatmentDomains: [
        {
          id: "domain_2",
          name: "风湿病",
          description: "风湿免疫性疾病",
          commonDiseases: ["类风湿性关节炎", "强直性脊柱炎"],
          tcmTheory: "痹证理论",
          modernMedicine: "风湿免疫科疾病"
        }
      ],
      
      formulaAnalysis: {
        structure: "补肾与通络并重",
        compatibility: "虫类药配伍补肾药，搜剔力强",
        modifications: ["寒甚加附子", "湿重加薏苡仁"],
        relatedFormulas: ["独活寄生汤", "身痛逐瘀汤"]
      },
      
      modernResearch: {
        pharmacology: ["抗炎作用", "免疫调节", "骨保护作用"],
        clinicalStudies: ["治疗类风湿关节炎有效率78%"],
        mechanismStudies: ["调节T细胞功能", "抑制炎症因子"],
        qualityControl: ["HPLC测定山茱萸苷含量"],
        safetyProfile: ["长期应用需监测肝肾功能"]
      },
      
      clinicalGuidelines: {
        patientProfile: "中老年类风湿患者",
        diagnosticCriteria: ["关节炎诊断标准", "中医辨证"],
        treatmentProtocol: "个体化治疗方案",
        followUpGuidelines: "定期检查关节功能",
        combinationTherapy: "可配合物理治疗"
      },
      
      qualityControl: {
        standardization: "院内制剂标准",
        qualityMarkers: ["山茱萸苷", "薯蓣皂苷"],
        preparation: "严格炮制工艺",
        storage: "密封防潮"
      },
      
      relatedExperts: [
        {
          id: "expert_2",
          name: "朱良春",
          relationship: "创制者"
        }
      ],
      
      relatedDiseases: ["类风湿性关节炎", "强直性脊柱炎", "骨关节炎"],
      relatedSymptoms: ["关节疼痛", "晨僵", "活动受限"],
      
      effectiveness: {
        clinicalEfficacy: 7.8,
        safetyProfile: 8.0,
        evidenceLevel: "B",
        recommendationGrade: 4
      },
      
      usageStats: {
        prescriptionFrequency: 680,
        clinicalStudies: 45,
        patientReports: 1250,
        expertRecommendations: 78
      },
      
      notes: "朱良春创制验方，专治风湿痹证",
      references: ["朱良春用药经验集", "中国现代名医验案精选"],
      lastUpdated: "2025-07-14"
    },
    
    {
      id: "formula_3",
      name: "血府逐瘀汤",
      pinyin: "Xuefu Zhuyu Tang",
      aliases: ["血府逐瘀散"],
      englishName: "Drive Out Stasis from the Blood Chamber Decoction",
      
      category: "理血方",
      formulaSource: "经典方",
      sourceBook: "医林改错",
      dynastyPeriod: "清代",
      originalText: "王清任创制，专治胸中血瘀",
      
      ingredients: [
        {
          id: "herb_5",
          name: "当归",
          dosage: "9-12g",
          role: "monarch",
          roleDescription: "补血活血，为君药"
        },
        {
          id: "herb_20",
          name: "生地黄",
          dosage: "9-15g",
          role: "minister",
          roleDescription: "滋阴凉血，为臣药"
        },
        {
          id: "herb_21",
          name: "桃仁",
          dosage: "9-12g",
          role: "minister",
          roleDescription: "活血祛瘀，为臣药"
        },
        {
          id: "herb_22",
          name: "红花",
          dosage: "6-9g",
          role: "minister",
          roleDescription: "活血通经，为臣药"
        },
        {
          id: "herb_14",
          name: "柴胡",
          dosage: "3-6g",
          role: "assistant",
          roleDescription: "疏肝解郁，为佐药"
        }
      ],
      
      preparation: "水煎服，每日一剂",
      administration: {
        dosage: "每日一剂，水煎分二次服",
        timing: "饭后服用",
        duration: "10-15天为一疗程",
        frequency: "日服二次",
        notes: "孕妇忌服"
      },
      
      effects: {
        primaryEffect: "活血化瘀，行气止痛",
        secondaryEffects: ["疏肝解郁", "通经活络"],
        mechanismOfAction: "活血与理气并用，气行则血行",
        clinicalApplications: ["胸痹心痛", "头痛", "急躁易怒", "内热晚热"]
      },
      
      clinicalIndications: [
        {
          disease: "胸痹心痛",
          symptoms: ["胸痛", "胸闷", "心悸", "失眠"],
          tcmSyndrome: "胸中血瘀，气机不畅",
          modernDiagnosis: "冠心病心绞痛",
          severity: "moderate"
        }
      ],
      
      contraclinicalIndications: [
        {
          type: "absolute",
          description: "孕妇禁用",
          reason: "方中活血药较多，恐致堕胎"
        }
      ],
      
      treatmentDomains: [
        {
          id: "domain_3",
          name: "心血管病",
          description: "心血管系统疾病",
          commonDiseases: ["冠心病", "心绞痛", "心律失常"],
          tcmTheory: "心主血脉",
          modernMedicine: "心血管内科疾病"
        }
      ],
      
      formulaAnalysis: {
        structure: "活血化瘀为主，理气为辅",
        compatibility: "四物汤加减配桃红四物",
        modifications: ["气滞重加香附", "血瘀重加三七"],
        relatedFormulas: ["四物汤", "桃红四物汤"]
      },
      
      modernResearch: {
        pharmacology: ["改善微循环", "抗血小板聚集", "扩张冠脉"],
        clinicalStudies: ["治疗冠心病心绞痛有效率82%"],
        mechanismStudies: ["改善血液流变学", "保护血管内皮"],
        qualityControl: ["HPLC测定阿魏酸含量"],
        safetyProfile: ["长期服用需监测凝血功能"]
      },
      
      clinicalGuidelines: {
        patientProfile: "中老年心血管病患者",
        diagnosticCriteria: ["心绞痛诊断", "血瘀证辨证"],
        treatmentProtocol: "个体化调整剂量",
        followUpGuidelines: "定期心电图检查",
        combinationTherapy: "可配合西药治疗"
      },
      
      qualityControl: {
        standardization: "国家药品标准",
        qualityMarkers: ["阿魏酸", "芍药苷"],
        preparation: "标准煎煮工艺",
        storage: "密封保存"
      },
      
      relatedExperts: [
        {
          id: "expert_3",
          name: "颜德馨",
          relationship: "临床应用专家"
        }
      ],
      
      relatedDiseases: ["冠心病", "心绞痛", "胸痹", "头痛"],
      relatedSymptoms: ["胸痛", "胸闷", "心悸", "失眠"],
      
      effectiveness: {
        clinicalEfficacy: 8.2,
        safetyProfile: 7.5,
        evidenceLevel: "A",
        recommendationGrade: 4
      },
      
      usageStats: {
        prescriptionFrequency: 980,
        clinicalStudies: 67,
        patientReports: 2340,
        expertRecommendations: 123
      },
      
      notes: "王清任创制，为活血化瘀代表方",
      references: ["医林改错", "中医方剂学"],
      lastUpdated: "2025-07-14"
    }
  ];

  return formulasData;
};

// 生成数据并保存到文件
const formulasData = generateFormulasData();
const formulasPath = path.join(__dirname, 'public/data/formulas.json');

// 确保目录存在
const dataDir = path.dirname(formulasPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(formulasPath, JSON.stringify(formulasData, null, 2), 'utf8');

console.log('✅ 药方数据已生成！');
console.log(`📊 数据统计：`);
console.log(`   - 药方总数：${formulasData.length}个`);
console.log(`   - 补益方：${formulasData.filter(f => f.category === '补益方').length}个`);
console.log(`   - 理血方：${formulasData.filter(f => f.category === '理血方').length}个`);
console.log(`   - 经典方：${formulasData.filter(f => f.formulaSource === '经典方').length}个`);
console.log(`   - 验方：${formulasData.filter(f => f.formulaSource === '验方').length}个`);
console.log(`   - 治疗领域：${[...new Set(formulasData.flatMap(f => f.treatmentDomains.map(d => d.name)))].length}个`);
