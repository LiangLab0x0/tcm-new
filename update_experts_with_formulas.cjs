const fs = require('fs');
const path = require('path');

// 更新专家数据，添加相关药方信息
const updateExpertsWithFormulas = () => {
  const expertsPath = path.join(__dirname, 'public/data/experts.json');
  const expertsData = JSON.parse(fs.readFileSync(expertsPath, 'utf8'));

  // 为每个专家添加相关药方
  expertsData.forEach(expert => {
    switch (expert.id) {
      case 'expert_1': // 邓铁涛
        expert.relatedFormulas = [
          {
            id: "formula_1",
            name: "补中益气汤",
            relationship: "常用方",
            category: "补益方",
            effectiveness: 9
          },
          {
            id: "formula_4",
            name: "强肌健力饮",
            relationship: "创制方",
            category: "补益方",
            effectiveness: 8
          }
        ];
        break;
        
      case 'expert_2': // 朱良春
        expert.relatedFormulas = [
          {
            id: "formula_2",
            name: "益肾蠲痹丸",
            relationship: "创制者",
            category: "补益方",
            effectiveness: 8
          },
          {
            id: "formula_5",
            name: "朱氏化瘀汤",
            relationship: "创制方",
            category: "理血方",
            effectiveness: 7
          }
        ];
        break;
        
      case 'expert_3': // 颜德馨
        expert.relatedFormulas = [
          {
            id: "formula_3",
            name: "血府逐瘀汤",
            relationship: "临床应用专家",
            category: "理血方",
            effectiveness: 8
          },
          {
            id: "formula_6",
            name: "衡法调治方",
            relationship: "理论指导",
            category: "补益方",
            effectiveness: 8
          }
        ];
        break;
        
      case 'expert_4': // 王琦
        expert.relatedFormulas = [
          {
            id: "formula_7",
            name: "体质调理方",
            relationship: "体质理论应用",
            category: "补益方",
            effectiveness: 7
          }
        ];
        break;
        
      default:
        expert.relatedFormulas = [];
    }
    
    // 保留原有的relatedHerbs，但可以选择性地转换或保留
    // 这里我们保留原有的药材关联，同时添加药方关联
  });

  return expertsData;
};

// 执行更新
const updatedExperts = updateExpertsWithFormulas();
const expertsPath = path.join(__dirname, 'public/data/experts.json');

fs.writeFileSync(expertsPath, JSON.stringify(updatedExperts, null, 2), 'utf8');

console.log('✅ 专家数据已更新，添加了相关药方信息！');
console.log('📊 更新统计：');
updatedExperts.forEach(expert => {
  console.log(`   - ${expert.name}: ${expert.relatedFormulas?.length || 0}个相关药方`);
});
