import fs from 'fs';
import path from 'path';

// 读取现有的herbs数据
const herbsData = JSON.parse(fs.readFileSync('public/data/herbs_with_images.json', 'utf8'));

// 读取产地数据
const originData = JSON.parse(fs.readFileSync('/workspace/data/chinese_herbal_medicine_production_areas.json', 'utf8'));

// 创建产地映射
const originMap = {};
originData.forEach(item => {
  originMap[item.name] = {
    provinces: item.main_producing_areas.map(area => area.province),
    detailedOrigins: item.main_producing_areas.map(area => ({
      province: area.province,
      description: area.description,
      quality: "优质"
    })),
    properties: item.properties_and_efficacy
  };
});

// 补充更多中药材数据
const additionalHerbs = [
  {
    id: "herb_21",
    name: "茯苓",
    englishName: "Poria",
    pinyin: "Fuling",
    functions: ["利水渗湿", "健脾", "宁心"],
    nature: "平",
    taste: ["甘", "淡"],
    origin: ["云南", "安徽", "湖北"],
    category: "利水渗湿药",
    indications: ["水肿尿少", "痰饮眩悸", "脾虚食少", "便溏泄泻", "心神不安", "惊悸失眠"],
    images: ["茯苓.jpg"],
    primaryImage: "茯苓.jpg"
  },
  {
    id: "herb_22", 
    name: "丹参",
    englishName: "Red Sage Root",
    pinyin: "Danshen",
    functions: ["活血祛瘀", "通经止痛", "清心除烦", "凉血消痈"],
    nature: "微寒",
    taste: ["苦"],
    origin: ["山东", "河南", "山西"],
    category: "活血化瘀药",
    indications: ["胸痹心痛", "脘腹胁痛", "症瘕积聚", "热痹疼痛", "心烦不眠", "月经不调", "痛经经闭", "疮疡肿痛"],
    images: ["丹参.jpg"],
    primaryImage: "丹参.jpg"
  },
  {
    id: "herb_23",
    name: "三七",
    englishName: "Panax Notoginseng",
    pinyin: "Sanqi",
    functions: ["散瘀止血", "消肿定痛"],
    nature: "温",
    taste: ["甘", "微苦"],
    origin: ["云南", "广西"],
    category: "化瘀止血药",
    indications: ["各种出血证", "跌扑瘀肿", "胸痹心痛", "中风偏瘫"],
    images: ["三七.jpg"],
    primaryImage: "三七.jpg"
  },
  {
    id: "herb_24",
    name: "天麻",
    englishName: "Gastrodia Elata",
    pinyin: "Tianma", 
    functions: ["息风止痉", "平抑肝阳", "祛风通络"],
    nature: "平",
    taste: ["甘"],
    origin: ["云南", "贵州", "四川"],
    category: "平肝息风药",
    indications: ["头痛眩晕", "肢体麻木", "小儿惊风", "癫痫抽搐", "破伤风"],
    images: ["天麻.jpg"],
    primaryImage: "天麻.jpg"
  },
  {
    id: "herb_25",
    name: "枸杞子",
    englishName: "Wolfberry",
    pinyin: "Gouqizi",
    functions: ["滋补肝肾", "益精明目"],
    nature: "平",
    taste: ["甘"],
    origin: ["宁夏", "新疆", "内蒙古"],
    category: "补虚药",
    indications: ["肝肾阴虚", "腰膝酸软", "头晕", "目眩", "目昏多泪", "虚劳咳嗽", "消渴", "遗精"],
    images: ["枸杞子.jpg"],
    primaryImage: "枸杞子.jpg"
  }
];

// 合并现有数据和新增数据
const mergedHerbs = [...herbsData, ...additionalHerbs];

// 更新所有草药的产地信息
const updatedHerbs = mergedHerbs.map(herb => {
  const originInfo = originMap[herb.name];
  
  // 确保所有必需字段都存在
  const updatedHerb = {
    ...herb,
    // 确保origin字段存在且为数组
    origin: herb.origin || [],
    // 确保functions字段存在且为数组
    functions: herb.functions || [],
    // 确保indications字段存在且为数组
    indications: herb.indications || [],
    // 确保taste字段存在且为数组
    taste: Array.isArray(herb.taste) ? herb.taste : [herb.taste].filter(Boolean),
    // 确保images字段存在且为数组
    images: herb.images || [`${herb.name}.jpg`],
    // 确保primaryImage字段存在
    primaryImage: herb.primaryImage || `${herb.name}.jpg`,
    // 添加详细产地信息
    detailedOrigins: originInfo ? originInfo.detailedOrigins : (herb.origin || []).map(province => ({
      province,
      description: `${province}是${herb.name}的主要产地之一`,
      quality: "优质"
    }))
  };

  return updatedHerb;
});

// 写入更新后的数据
fs.writeFileSync('public/data/herbs_with_images.json', JSON.stringify(updatedHerbs, null, 2));

console.log(`✅ 成功处理了 ${updatedHerbs.length} 个中药材数据`);
console.log('✅ 已修复数据结构问题');
console.log('✅ 已添加详细产地信息');

// 创建专家数据（如果不存在）
const expertsData = [
  {
    "id": "expert_1",
    "name": "孙宝惠",
    "title": "主任医师",
    "institution": "中国中医科学院",
    "specialities": ["中药药理", "方剂学"],
    "experience": 35,
    "avatar": "expert1.jpg",
    "recommendedHerbs": ["人参", "黄芪", "当归"]
  },
  {
    "id": "expert_2", 
    "name": "牛小莲",
    "title": "教授",
    "institution": "北京中医药大学",
    "specialities": ["中药鉴定", "药材质量"],
    "experience": 28,
    "avatar": "expert2.jpg",
    "recommendedHerbs": ["甘草", "川芎", "白芍"]
  },
  {
    "id": "expert_3",
    "name": "段吉平",
    "title": "研究员",
    "institution": "中国医学科学院",
    "specialities": ["药用植物", "资源保护"],
    "experience": 32,
    "avatar": "expert3.jpg", 
    "recommendedHerbs": ["茯苓", "丹参", "三七"]
  }
];

if (!fs.existsSync('public/data/experts.json')) {
  fs.writeFileSync('public/data/experts.json', JSON.stringify(expertsData, null, 2));
  console.log('✅ 已创建专家数据文件');
}

console.log('\n🎉 数据修复完成！');
