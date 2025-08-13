const fs = require('fs');
const path = require('path');

// 读取专家数据
const expertsPath = path.join(__dirname, 'public/data/experts.json');
const expertsData = JSON.parse(fs.readFileSync(expertsPath, 'utf8'));

// 原始的3位中医大师名单
const originalMasters = ['邓铁涛', '朱良春', '颜德馨'];

// 分离原始大师和其他专家
const originalMasterExperts = [];
const otherExperts = [];

expertsData.forEach(expert => {
  if (originalMasters.includes(expert.name)) {
    originalMasterExperts.push(expert);
  } else {
    otherExperts.push(expert);
  }
});

// 按照指定顺序排序原始大师
const orderedOriginalMasters = [];
originalMasters.forEach(masterName => {
  const master = originalMasterExperts.find(expert => expert.name === masterName);
  if (master) {
    orderedOriginalMasters.push(master);
  }
});

// 合并数据：原始大师在前，其他专家在后
const reorderedExperts = [...orderedOriginalMasters, ...otherExperts];

// 写回文件
fs.writeFileSync(expertsPath, JSON.stringify(reorderedExperts, null, 2), 'utf8');

console.log('专家数据重新排序完成！');
console.log(`原始中医大师（前3位）：${orderedOriginalMasters.map(e => e.name).join('、')}`);
console.log(`其他专家（${otherExperts.length}位）已排在后面`);
console.log(`总计专家数量：${reorderedExperts.length}位`);
