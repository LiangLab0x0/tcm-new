// 药材类型定义 - 药典级增强版
export interface Herb {
  id: string;
  name: string;
  englishName?: string;
  pinyin: string;
  functions: string[];
  nature: string;
  taste: string[];
  origin?: string[];
  category: string;
  indications: string[];
  images: string[];
  primaryImage: string;
  meridians?: string[];
  dosage?: string;
  contraindications?: string[];
  processing?: string[];
  compounds?: string[];
  description?: string;
  
  // 专业功能扩展
  detailedOrigins?: ProvinceInfo[];
  expertRecommendations?: ExpertRecommendation[];
  clinicalApplication?: string[];
  pharmacology?: string[];
  qualityStandards?: string[];
  
  // v9.0 药典级新增字段
  pharmacopoeiaInfo?: PharmacopoeiaInfo;
  chemicalComponents?: ChemicalComponent[];
  pharmacologicalActions?: PharmacologicalAction[];
  qualityControl?: QualityControl;
  clinicalGuide?: ClinicalGuide;
  resourceInfo?: ResourceInfo;
  modernResearch?: ModernResearch;
  compatibilityInfo?: CompatibilityInfo;
}

// 药典信息
export interface PharmacopoeiaInfo {
  code: string;              // 药典编号
  latinName: string;         // 拉丁学名
  aliases: string[];         // 别名（地方名称）
  grade: 'premium' | 'first' | 'second' | 'third';  // 药材等级
  standardYear: number;      // 标准制定年份
  officialSource: string;    // 正品来源
}

// 化学成分
export interface ChemicalComponent {
  name: string;              // 成分名称
  category: string;          // 成分类别（如生物碱、黄酮类等）
  content: string;           // 含量范围
  function: string;          // 主要作用
  importance: 'primary' | 'secondary' | 'trace';  // 重要程度
}

// 药理作用
export interface PharmacologicalAction {
  action: string;            // 药理作用
  mechanism: string;         // 作用机制
  evidence: string;          // 证据等级
  clinicalRelevance: string; // 临床意义
  studies?: string[];        // 相关研究
}

// 质量控制
export interface QualityControl {
  identificationMethods: string[];    // 鉴定方法
  contentDetermination: string[];     // 含量测定
  qualityIndicators: QualityIndicator[];  // 质量指标
  storageConditions: string;          // 储存条件
  shelfLife: string;                  // 保质期
}

// 质量指标
export interface QualityIndicator {
  parameter: string;         // 指标参数
  specification: string;     // 规格要求
  method: string;           // 检测方法
  importance: 'critical' | 'major' | 'minor';
}

// 临床应用指南
export interface ClinicalGuide {
  indications: ClinicalIndication[];   // 适应症
  contraindications: string[];         // 禁忌症
  dosageAndAdministration: DosageInfo; // 用法用量
  adverseReactions: string[];          // 不良反应
  interactions: DrugInteraction[];     // 相互作用
  specialPopulations: SpecialPopulation[]; // 特殊人群
}

// 临床适应症
export interface ClinicalIndication {
  condition: string;         // 病症
  evidenceLevel: string;     // 证据等级
  recommendations: string;   // 推荐意见
  dosage: string;           // 推荐剂量
}

// 用法用量
export interface DosageInfo {
  oralDose: string;         // 口服剂量
  externalUse?: string;     // 外用方法
  preparationMethods: string[]; // 制备方法
  administrationTiming: string; // 服用时间
  courseDuration: string;   // 疗程
}

// 药物相互作用
export interface DrugInteraction {
  drug: string;             // 相互作用药物
  type: 'synergistic' | 'antagonistic' | 'toxic'; // 相互作用类型
  mechanism: string;        // 作用机制
  clinicalSignificance: string; // 临床意义
  management: string;       // 处理建议
}

// 特殊人群
export interface SpecialPopulation {
  population: string;       // 人群类型（孕妇、儿童等）
  recommendations: string; // 使用建议
  precautions: string[];   // 注意事项
}

// 资源信息
export interface ResourceInfo {
  authenticRegions: AuthenticRegion[]; // 道地产区
  gapBases: GAPBase[];                // GAP基地
  cultivationTech: CultivationInfo;   // 种植技术
  processingMethods: ProcessingMethod[]; // 炮制方法
  marketInfo: MarketInfo;             // 市场信息
}

// 道地产区
export interface AuthenticRegion {
  region: string;           // 产区名称
  quality: string;          // 质量特点
  reason: string;           // 道地原因
  annualProduction: string; // 年产量
  mainSupplyMonths: string[]; // 主要供应月份
}

// GAP基地
export interface GAPBase {
  name: string;             // 基地名称
  location: string;         // 位置
  area: string;             // 面积
  certification: string;   // 认证情况
  contact?: string;         // 联系方式
}

// 种植信息
export interface CultivationInfo {
  growingConditions: string[]; // 生长条件
  plantingTime: string;        // 种植时间
  harvestTime: string;         // 采收时间
  yieldPerMu: string;          // 亩产量
  techniques: string[];        // 种植技术要点
}

// 炮制方法
export interface ProcessingMethod {
  method: string;           // 炮制方法
  purpose: string;          // 炮制目的
  procedure: string[];      // 炮制程序
  qualityChanges: string;   // 质量变化
  clinicalApplication: string; // 临床应用差异
}

// 市场信息
export interface MarketInfo {
  currentPrice: string;     // 当前价格
  priceRange: string;       // 价格区间
  marketTrend: string;      // 市场趋势
  mainMarkets: string[];    // 主要市场
  seasonalPattern: string;  // 季节性规律
}

// 现代研究
export interface ModernResearch {
  researchAchievements: string[];    // 科研成果
  patents: Patent[];                 // 专利信息
  internationalRecognition: string; // 国际认知度
  standardizationLevel: string;     // 标准化程度
  clinicalTrials: ClinicalTrial[];  // 临床试验
  futureProspects: string[];        // 发展前景
}

// 专利信息
export interface Patent {
  title: string;            // 专利名称
  patentNumber: string;     // 专利号
  inventor: string;         // 发明人
  applicationDate: string;  // 申请日期
  description: string;      // 专利描述
}

// 临床试验
export interface ClinicalTrial {
  title: string;            // 试验标题
  phase: string;            // 试验阶段
  status: string;           // 试验状态
  participants: number;     // 参与人数
  primaryOutcome: string;   // 主要终点
  sponsor: string;          // 主办方
}

// 配伍信息
export interface CompatibilityInfo {
  commonCombinations: HerbCombination[]; // 常用配伍
  incompatibleHerbs: string[];           // 配伍禁忌
  synergisticEffects: string[];          // 协同效应
  dosageAdjustments: string[];           // 剂量调整建议
}

// 药材配伍
export interface HerbCombination {
  herbs: string[];          // 配伍药材
  ratio: string;            // 配伍比例
  function: string;         // 配伍功效
  indications: string[];    // 适用病症
  source: string;           // 来源方剂
}

// 省份信息
export interface ProvinceInfo {
  province: string;
  quality: 'excellent' | 'good' | 'moderate';
  notes?: string;
}

// 专家推荐
export interface ExpertRecommendation {
  expertId: string;
  expertName: string;
  recommendation: string;
  clinicalExperience?: string;
}

// 中医药专家类型 - 药典级完整结构
export interface TCMExpert {
  // 基本信息 - 对应药材的基础字段
  id: string;
  name: string;
  pinyin: string;              // 姓名拼音，便于搜索和排序
  aliases?: string[];          // 别名、字号等
  englishName?: string;        // 英文名称
  
  // 分类属性 - 对应药材的分类系统
  category: ExpertCategory;    // 专家类别（国医大师、名老中医等）
  school: TCMSchool;          // 医学流派（伤寒派、温病派等）
  specialty: string[];        // 专业专长领域（内科、外科、针灸等）
  grade: ExpertGrade;         // 专家等级
  
  // 基础信息
  academic_title: string;     // 学术职称
  title: string;              // 职务头衔
  institution: string;        // 所属机构
  birthYear?: number;         // 出生年份
  deathYear?: number;         // 逝世年份（如适用）
  place_of_origin: string;    // 籍贯
  experience: number;         // 从业年限
  
  // 师承体系 - 中医核心特色
  lineage: TCMLineage;        // 师承关系
  mentor?: string;            // 主要师承
  students?: Student[];       // 传承人
  academicLineage?: string;   // 学术流派传承
  
  // 专业特色 - 对应药材的功效
  specializations: string[];   // 专业专长
  uniqueTherapies: string[];  // 独特疗法
  diagnosticFeatures: string[]; // 诊疗特色
  clinicalStrengths: string[]; // 临床优势
  theoreticalContributions: string[]; // 理论贡献
  
  // 地域分布 - 对应药材的产地
  regions: ExpertRegion[];    // 行医地区及影响
  influenceAreas: string[];   // 影响地域
  
  // 学术成就
  achievements: string[];
  publications?: Publication[];
  books?: BookPublication[];
  papers?: AcademicPaper[];   // 学术论文
  patents?: Patent[];         // 专利发明
  
  // 临床应用 - 对应药材的适应症
  specializedDiseases: string[];    // 擅长疾病
  clinicalCases: ClinicalCase[];   // 典型医案
  prescriptionFormulas: Formula[]; // 经验方剂
  treatmentMethods: TreatmentMethod[]; // 治法特色
  
  // 传承信息
  inheritanceInfo: InheritanceInfo;
  workshop?: WorkshopInfo;    // 传承工作室信息
  
  // 现代应用
  modernApplications: string[]; // 现代应用
  collaborations: string[];    // 合作研究
  
  // 多媒体资源
  images: string[];
  primaryImage: string;
  videos?: string[];          // 视频资源
  
  // 关联信息
  relatedHerbs?: RelatedHerb[];     // 相关药材  
  relatedExperts?: RelatedExpert[]; // 相关专家
  relatedFormulas?: RelatedFormula[]; // 相关方剂
  
  // 评价指标 - 对应药材的质量标准
  reputation: ExpertReputation;     // 声誉评价
  influence: InfluenceMetrics;      // 影响力指标
  
  // 其他信息
  biography: string;
  honors?: string[];
  researchAreas?: string[];
  avatar?: string;

  // 新增属性
  medicalPhilosophy?: MedicalPhilosophy;     // 医学观点
  classicCases?: ClassicCase[];              // 经典医案
  academicInnovations?: AcademicInnovation[]; // 学术创新
  clinicalFeatures?: ClinicalFeatures;       // 临床特色
  disciples?: Disciple[];                    // 传承弟子
}

// 出版物
export interface Publication {
  title: string;
  year: number;
  type: 'book' | 'paper' | 'standard';
  description?: string;
}

// 书籍著作
export interface BookPublication {
  title: string;
  year: string;
  publisher?: string;
  description?: string;
  link?: string; // 访问链接
}

// 相关药材
export interface RelatedHerb {
  id: string;
  name: string;
  relationship: string; // 与专家的关系，如"常用药材"、"研究重点"等
}

// 相关药方
export interface RelatedFormula {
  id: string;
  name: string;
  relationship: string; // 与专家的关系，如"创制者"、"改良者"、"常用方"、"研究方向"等
  category?: FormulaCategory; // 方剂分类
  effectiveness?: number; // 疗效评分
}

// 专家分类枚举
export type ExpertCategory = 
  | '国医大师'
  | '全国名中医' 
  | '省级名中医'
  | '传承导师'
  | '学术继承人'
  | '青年名医'
  | '民间中医'
  | '中医学者';

// 医学流派
export type TCMSchool = 
  | '经方派'
  | '时方派' 
  | '温病派'
  | '伤寒派'
  | '补土派'
  | '火神派'
  | '滋阴派'
  | '攻邪派'
  | '针灸流派'
  | '综合派'
  | '现代中医';

// 专家等级
export type ExpertGrade = 
  | '国家级'
  | '省部级'
  | '地市级'
  | '县区级'
  | '民间级';

// 师承关系
export interface TCMLineage {
  mentorName?: string;           // 师父姓名
  mentorSchool?: string;         // 师父所属流派
  lineageGeneration: number;     // 传承世代
  lineageName: string;           // 传承谱系名称
  learningPeriod?: string;       // 师承学习时期
  inheritanceMethod: string;     // 传承方式（师承、家传、自学等）
  certificationStatus: boolean;  // 师承认定状态
}

// 地域影响
export interface ExpertRegion {
  province: string;
  city?: string;
  period: string;               // 行医时期
  influence: 'high' | 'medium' | 'low'; // 影响程度
  contributions: string[];      // 地区贡献
  institutions: string[];       // 相关机构
}

// 学术论文
export interface AcademicPaper {
  title: string;
  journal: string;
  year: number;
  coAuthors?: string[];
  citations?: number;
  impact: 'high' | 'medium' | 'low';
  link?: string;
}

// 专利信息已在上面定义过，这里不需要重复定义

// 临床医案
export interface ClinicalCase {
  diseaseName: string;
  patientProfile: string;
  diagnosis: string;
  treatment: string;
  formula?: string;
  outcome: string;
  significance: string;
}

// 经验方剂
export interface Formula {
  name: string;
  composition: string[];
  indications: string[];
  dosage?: string;
  modifications?: string[];
  clinicalApplication: string;
  source: string;
}

// 治疗方法
export interface TreatmentMethod {
  methodName: string;
  technique: string;
  applications: string[];
  uniqueFeatures: string[];
  effectiveness: string;
}

// 传承信息
export interface InheritanceInfo {
  inheritanceType: 'family' | 'mentorship' | 'institutional' | 'academic';
  totalStudents: number;
  activeInheritors: number;
  inheritanceStatus: 'active' | 'completed' | 'ongoing';
  inheritanceMaterials: string[];  // 传承资料
  inheritancePrograms: string[];   // 传承项目
}

// 工作室信息
export interface WorkshopInfo {
  name: string;
  establishYear: number;
  location: string;
  participants: number;
  achievements: string[];
  projects: string[];
}

// 相关专家
export interface RelatedExpert {
  id: string;
  name: string;
  relationship: string; // 关系类型：师承、同门、合作等
  collaboration?: string; // 合作内容
}

// 专家声誉
export interface ExpertReputation {
  nationalRecognition: number;    // 国家认可度 (1-10)
  academicInfluence: number;      // 学术影响力 (1-10)
  clinicalReputation: number;     // 临床声誉 (1-10)
  publicRecognition: number;      // 公众认知度 (1-10)
  overallRating: number;         // 综合评分 (1-10)
}

// 影响力指标
export interface InfluenceMetrics {
  citationCount: number;          // 论文引用数
  studentCount: number;           // 学生数量
  mediaAppearances: number;       // 媒体露面次数
  awardCount: number;            // 获奖数量
  consultationCases: number;      // 咨询案例数
}

// 传承人信息
export interface Student {
  name: string;
  batch: string;
  currentPosition: string;
  institution: string;
  specialization?: string[];
  achievements?: string[];
}

// 搜索过滤器类型 - v9.0 增强版
export interface SearchFilters {
  searchTerm: string;
  category: string;
  nature: string;
  taste: string;
  meridian: string;
  origin: string;
  
  // v9.0 新增高级搜索字段
  chemicalComponent?: string;    // 化学成分搜索
  pharmacologicalAction?: string; // 药理作用搜索
  clinicalIndication?: string;   // 临床适应症搜索
  qualityGrade?: string;         // 质量等级筛选
  priceRange?: string;           // 价格区间筛选
  researchLevel?: string;        // 研究程度筛选
}

// 专家搜索过滤器类型 - 对应药材搜索系统
export interface ExpertSearchFilters {
  searchTerm: string;            // 搜索关键词
  category: string;              // 专家类别（国医大师、名老中医等）
  school: string;                // 医学流派（经方派、温病派等）
  specialty: string;             // 专业专长（内科、外科、针灸等）
  region: string;                // 地域分布
  grade: string;                 // 专家等级
  
  // 师承关系筛选
  lineage: string;               // 师承谱系
  mentor: string;                // 师承导师
  inheritanceType: string;       // 传承类型
  
  // 专业能力筛选
  specializedDisease: string;    // 擅长疾病
  clinicalStrength: string;      // 临床优势
  theoreticalContribution: string; // 理论贡献
  
  // 时代筛选
  era: string;                   // 所属时代（近代、现代、当代）
  experienceRange: string;       // 经验年限范围
  
  // 影响力筛选
  influenceLevel: string;        // 影响力等级
  reputationLevel: string;       // 声誉等级
}

// 高级搜索配置
export interface AdvancedSearchConfig {
  enableChemicalSearch: boolean;
  enablePharmacologySearch: boolean;
  enableClinicalSearch: boolean;
  enablePriceFilter: boolean;
  enableResearchFilter: boolean;
}

// 智能推荐配置
export interface RecommendationConfig {
  basedOnNature: boolean;        // 基于药性推荐
  basedOnFunction: boolean;      // 基于功效推荐
  basedOnCompatibility: boolean; // 基于配伍推荐
  maxRecommendations: number;    // 最大推荐数量
}

// 数据导出配置
export interface ExportConfig {
  format: 'excel' | 'pdf' | 'json' | 'csv';
  includeImages: boolean;
  includeDetailedInfo: boolean;
  includeChemicalData: boolean;
  includeClinicalData: boolean;
}

// 界面状态
export interface UIState {
  currentView: 'gallery' | 'detail' | 'compare' | 'map' | 'experts' | 'expert-detail' | 'network';
  selectedHerb: Herb | null;
  selectedExpert: TCMExpert | null;
  compareList: Herb[];
  selectedProvinces: string[];
  isLoading: boolean;
  error: string | null;
}

// 专业主题色
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  border: string;
}

// 根据药材属性获取专业主题色
export const getNatureTheme = (nature: string): ThemeColors => {
  const themes: Record<string, ThemeColors> = {
    '寒': {
      primary: 'from-blue-500 to-blue-600',
      secondary: 'bg-blue-50',
      accent: 'text-blue-700',
      background: 'bg-gradient-to-br from-blue-50 to-blue-100',
      text: 'text-blue-900',
      border: 'border-blue-200'
    },
    '凉': {
      primary: 'from-cyan-500 to-cyan-600',
      secondary: 'bg-cyan-50',
      accent: 'text-cyan-700',
      background: 'bg-gradient-to-br from-cyan-50 to-cyan-100',
      text: 'text-cyan-900',
      border: 'border-cyan-200'
    },
    '平': {
      primary: 'from-green-500 to-green-600',
      secondary: 'bg-green-50',
      accent: 'text-green-700',
      background: 'bg-gradient-to-br from-green-50 to-green-100',
      text: 'text-green-900',
      border: 'border-green-200'
    },
    '温': {
      primary: 'from-orange-500 to-orange-600',
      secondary: 'bg-orange-50',
      accent: 'text-orange-700',
      background: 'bg-gradient-to-br from-orange-50 to-orange-100',
      text: 'text-orange-900',
      border: 'border-orange-200'
    },
    '热': {
      primary: 'from-red-500 to-red-600',
      secondary: 'bg-red-50',
      accent: 'text-red-700',
      background: 'bg-gradient-to-br from-red-50 to-red-100',
      text: 'text-red-900',
      border: 'border-red-200'
    },
    '微温': {
      primary: 'from-amber-500 to-amber-600',
      secondary: 'bg-amber-50',
      accent: 'text-amber-700',
      background: 'bg-gradient-to-br from-amber-50 to-amber-100',
      text: 'text-amber-900',
      border: 'border-amber-200'
    },
    '微寒': {
      primary: 'from-indigo-500 to-indigo-600',
      secondary: 'bg-indigo-50',
      accent: 'text-indigo-700',
      background: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
      text: 'text-indigo-900',
      border: 'border-indigo-200'
    }
  };
  
  return themes[nature] || themes['平'];
};

// 获取专业等级（基于功效数量和专业属性）
export const getProfessionalLevel = (herb: Herb): {
  level: string;
  color: string;
  description: string;
} => {
  const functionsCount = herb.functions.length;
  const hasDetailedInfo = (herb.meridians?.length || 0) + (herb.contraindications?.length || 0);
  
  if (functionsCount >= 8 && hasDetailedInfo >= 5) {
    return { level: '权威认证', color: 'text-purple-700', description: '临床应用广泛，药理研究充分' };
  } else if (functionsCount >= 6 && hasDetailedInfo >= 3) {
    return { level: '临床常用', color: 'text-blue-700', description: '临床使用频繁，疗效确切' };
  } else if (functionsCount >= 4) {
    return { level: '专业推荐', color: 'text-green-700', description: '具有明确疗效，专业认可' };
  } else if (functionsCount >= 2) {
    return { level: '基础药材', color: 'text-gray-700', description: '基础功效，适合入门学习' };
  } else {
    return { level: '研究中', color: 'text-orange-700', description: '正在深入研究中' };
  }
};

// 中国省份地图数据类型
export interface ProvinceMapData {
  name: string;
  value: number;
  herbs: string[];
  itemStyle?: {
    areaColor: string;
  };
}

// 对比分析结果
export interface ComparisonResult {
  similarities: string[];
  differences: {
    category: string;
    items: {
      herb1: string;
      herb2: string;
      difference: string;
    }[];
  }[];
  recommendations: string[];
}

// ==================== 药方数据结构 ====================

// 药材组成信息
export interface FormulaIngredient {
  id: string;                    // 药材ID
  name: string;                  // 药材名称
  dosage: string;                // 用量，如"10-15g"
  role: 'monarch' | 'minister' | 'assistant' | 'guide'; // 君臣佐使
  roleDescription: string;       // 角色说明
  processingMethod?: string;     // 炮制方法
  notes?: string;               // 特殊说明
}

// 药方分类枚举
export type FormulaCategory = 
  | '解表方'
  | '泻下方' 
  | '和解方'
  | '清热方'
  | '祛暑方'
  | '温里方'
  | '补益方'
  | '固涩方'
  | '安神方'
  | '开窍方'
  | '理气方'
  | '理血方'
  | '治风方'
  | '治燥方'
  | '祛湿方'
  | '祛痰方'
  | '消导方'
  | '驱虫方'
  | '涌吐方'
  | '外用方'
  | '妇科方'
  | '儿科方'
  | '五官科方'
  | '骨伤科方';

// 药方来源类型
export type FormulaSource = 
  | '经典方'
  | '时方'
  | '验方'
  | '秘方'
  | '民间方'
  | '现代方';

// 药方功效分类
export interface FormulaEffect {
  primaryEffect: string;         // 主要功效
  secondaryEffects: string[];    // 次要功效
  mechanismOfAction: string;     // 作用机理
  clinicalApplications: string[]; // 临床应用
}

// 适应症信息
export interface Indication {
  disease: string;               // 疾病名称
  symptoms: string[];            // 主要症状
  tcmSyndrome: string;          // 中医证候
  modernDiagnosis?: string;     // 现代医学诊断
  severity: 'mild' | 'moderate' | 'severe'; // 适用病情程度
}

// 配伍禁忌
export interface Contraindication {
  type: 'absolute' | 'relative'; // 绝对禁忌/相对禁忌
  description: string;           // 禁忌描述
  reason: string;               // 禁忌原因
  alternatives?: string[];       // 替代方案
}

// 现代研究
export interface ModernResearch {
  pharmacology: string[];        // 药理作用
  clinicalStudies: string[];     // 临床研究
  mechanismStudies: string[];    // 机理研究
  qualityControl: string[];      // 质量控制
  safetyProfile: string[];       // 安全性研究
}

// 相关疾病治疗领域
export interface TreatmentDomain {
  id: string;
  name: string;                  // 治疗领域名称
  description: string;           // 描述
  commonDiseases: string[];      // 常见疾病
  tcmTheory: string;            // 中医理论基础
  modernMedicine: string;        // 现代医学对应
}

// 方剂（药方）主接口
export interface Formula {
  // 基本信息
  id: string;
  name: string;                  // 方剂名称
  pinyin: string;               // 拼音
  aliases: string[];            // 别名
  englishName?: string;         // 英文名

  // 分类信息
  category: FormulaCategory;     // 方剂分类
  formulaSource: FormulaSource;        // 来源类型
  sourceBook: string;           // 出处典籍
  dynastyPeriod: string;        // 朝代时期
  originalText?: string;        // 原文记载

  // 组成信息
  ingredients: FormulaIngredient[]; // 药材组成
  preparation: string;          // 制备方法
  administration: {             // 服用方法
    dosage: string;            // 用法用量
    timing: string;            // 服用时间
    duration: string;          // 疗程
    frequency: string;         // 频次
    notes?: string;           // 注意事项
  };

  // 功效信息
  effects: FormulaEffect;       // 功效作用
  clinicalIndications: Indication[];    // 适应症
  contraindications: Contraindication[]; // 禁忌症
  
  // 治疗领域
  treatmentDomains: TreatmentDomain[]; // 对治领域

  // 配伍分析
  formulaAnalysis: {
    structure: string;          // 方剂结构
    compatibility: string;      // 配伍特点
    modifications: string[];    // 常见加减
    relatedFormulas: string[];  // 相关方剂
  };

  // 现代研究
  modernResearch: ModernResearch;

  // 临床应用
  clinicalGuidelines: {
    patientProfile: string;     // 适用人群
    diagnosticCriteria: string[]; // 诊断标准
    treatmentProtocol: string;  // 治疗方案
    followUpGuidelines: string; // 随访指导
    combinationTherapy?: string; // 联合治疗
  };

  // 质量控制
  qualityControl: {
    standardization: string;    // 标准化程度
    qualityMarkers: string[];   // 质量标志物
    preparation: string;        // 制备要求
    storage: string;           // 贮藏条件
  };

  // 关联信息
  relatedExperts: {            // 相关专家
    id: string;
    name: string;
    relationship: string;      // 关系描述，如"创制者"、"改良者"、"研究者"等
  }[];
  
  relatedDiseases: string[];   // 相关疾病
  relatedSymptoms: string[];   // 相关症状

  // 评价指标
  effectiveness: {
    clinicalEfficacy: number;   // 临床疗效评分 (1-10)
    safetyProfile: number;      // 安全性评分 (1-10)
    evidenceLevel: 'A' | 'B' | 'C' | 'D'; // 证据级别
    recommendationGrade: number; // 推荐等级 (1-5)
  };

  // 使用统计
  usageStats: {
    prescriptionFrequency: number; // 处方频次
    clinicalStudies: number;    // 临床研究数量
    patientReports: number;     // 患者使用报告
    expertRecommendations: number; // 专家推荐次数
  };

  // 其他信息
  notes?: string;              // 备注
  references: string[];        // 参考文献
  lastUpdated: string;        // 最后更新时间
}

// 药方搜索筛选器
export interface FormulaSearchFilters {
  searchTerm?: string;         // 搜索关键词
  category?: FormulaCategory;  // 方剂分类
  formulaSource?: FormulaSource;      // 来源类型
  treatmentDomain?: string;    // 治疗领域
  indication?: string;         // 适应症
  expertId?: string;          // 相关专家
  ingredientName?: string;     // 包含药材
  dynastyPeriod?: string;     // 朝代时期
  sourceBook?: string;        // 出处典籍
  effectivenessMin?: number;   // 最低疗效评分
  safetyMin?: number;         // 最低安全性评分
  evidenceLevel?: 'A' | 'B' | 'C' | 'D'; // 证据级别
}

// ==================== 中医脉络关系数据结构 ====================

// 节点类型
export type NetworkNodeType = 'expert' | 'formula' | 'herb' | 'disease' | 'treatmentDomain' | 'syndrome';

// 关系类型
export type NetworkRelationType = 
  | 'creates'          // 创制
  | 'improves'         // 改良
  | 'researches'       // 研究
  | 'specializes'      // 专长
  | 'treats'           // 治疗
  | 'contains'         // 包含
  | 'derivedFrom'      // 衍生自
  | 'combinedWith'     // 配伍
  | 'contraindicated'  // 禁忌
  | 'alternative'      // 替代
  | 'mentor'           // 师承
  | 'student'          // 传承
  | 'influences';      // 影响

// 网络节点
export interface NetworkNode {
  id: string;
  type: NetworkNodeType;
  name: string;
  category?: string;
  description?: string;
  importance: number;        // 重要性评分 (1-10)
  connections: number;       // 连接数量
  metadata?: {              // 额外元数据
    [key: string]: any;
  };
  position?: {              // 节点位置（用于布局）
    x: number;
    y: number;
  };
  styling?: {               // 节点样式
    color: string;
    size: number;
    shape: 'circle' | 'square' | 'triangle' | 'diamond';
  };
}

// 网络边/关系
export interface NetworkEdge {
  id: string;
  source: string;           // 源节点ID
  target: string;           // 目标节点ID
  type: NetworkRelationType;
  strength: number;         // 关系强度 (1-10)
  description?: string;     // 关系描述
  bidirectional?: boolean;  // 是否双向关系
  metadata?: {              // 额外元数据
    [key: string]: any;
  };
  styling?: {               // 边样式
    color: string;
    width: number;
    style: 'solid' | 'dashed' | 'dotted';
  };
}

// 中医知识网络
export interface TCMKnowledgeNetwork {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  metadata: {
    title: string;
    description: string;
    version: string;
    lastUpdated: string;
    statistics: {
      totalNodes: number;
      totalEdges: number;
      nodeTypeDistribution: { [key in NetworkNodeType]: number };
      relationTypeDistribution: { [key in NetworkRelationType]: number };
    };
  };
}

// 网络筛选器
export interface NetworkFilters {
  nodeTypes: NetworkNodeType[];
  relationTypes: NetworkRelationType[];
  importanceMin: number;
  connectionsMin: number;
  searchTerm?: string;
  centerNode?: string;       // 中心节点ID（用于显示局部网络）
  maxDepth?: number;         // 最大深度（从中心节点开始）
}

// 网络布局配置
export interface NetworkLayoutConfig {
  algorithm: 'force' | 'circular' | 'hierarchical' | 'grid';
  width: number;
  height: number;
  nodeSpacing: number;
  edgeLength: number;
  iterations: number;
  animationDuration: number;
  interactionEnabled: boolean;
}

// 新增接口定义

// 医学观点
export interface MedicalPhilosophy {
  coreTheory: string;           // 核心理论
  diagnosticPrinciple: string;  // 诊断原则
  treatmentPhilosophy: string;  // 治疗理念
  modernViewpoint: string;      // 现代观点
}

// 经典医案
export interface ClassicCase {
  caseName: string;             // 医案名称
  patientInfo: string;          // 患者信息
  chiefComplaint: string;       // 主诉
  diagnosis: string;            // 中医诊断
  prescription: string;         // 处方
  treatmentPrinciple: string;   // 治疗原则
  outcome: string;              // 疗效
  significance: string;         // 学术意义
}

// 学术创新
export interface AcademicInnovation {
  innovationName: string;       // 创新名称
  description: string;          // 理论描述
  clinicalApplication: string;  // 临床应用
  academicImpact: string;       // 学术影响
}

// 临床特色
export interface ClinicalFeatures {
  diagnosticSkills?: string[];     // 诊断技能
  prescriptionFeatures?: string[]; // 处方特点
  treatmentMethods?: string[];     // 治疗方法
}

// 传承弟子
export interface Disciple {
  name: string;                 // 姓名
  title: string;                // 职称
  specialty: string;            // 专业
  achievement: string;          // 主要成就
}
