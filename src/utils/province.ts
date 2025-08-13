// 省份名称归一化工具

// 省份名称映射表（短名 -> 可能的全名）
const PROVINCE_MAPPING: Record<string, string[]> = {
  '北京': ['北京市', '北京'],
  '天津': ['天津市', '天津'],
  '上海': ['上海市', '上海'],
  '重庆': ['重庆市', '重庆'],
  '河北': ['河北省', '河北'],
  '山西': ['山西省', '山西'],
  '内蒙古': ['内蒙古自治区', '内蒙古'],
  '辽宁': ['辽宁省', '辽宁'],
  '吉林': ['吉林省', '吉林'],
  '黑龙江': ['黑龙江省', '黑龙江'],
  '江苏': ['江苏省', '江苏'],
  '浙江': ['浙江省', '浙江'],
  '安徽': ['安徽省', '安徽'],
  '福建': ['福建省', '福建'],
  '江西': ['江西省', '江西'],
  '山东': ['山东省', '山东'],
  '河南': ['河南省', '河南'],
  '湖北': ['湖北省', '湖北'],
  '湖南': ['湖南省', '湖南'],
  '广东': ['广东省', '广东'],
  '广西': ['广西壮族自治区', '广西'],
  '海南': ['海南省', '海南'],
  '四川': ['四川省', '四川'],
  '贵州': ['贵州省', '贵州'],
  '云南': ['云南省', '云南'],
  '西藏': ['西藏自治区', '西藏'],
  '陕西': ['陕西省', '陕西'],
  '甘肃': ['甘肃省', '甘肃'],
  '青海': ['青海省', '青海'],
  '宁夏': ['宁夏回族自治区', '宁夏'],
  '新疆': ['新疆维吾尔自治区', '新疆'],
  '香港': ['香港特别行政区', '香港'],
  '澳门': ['澳门特别行政区', '澳门'],
  '台湾': ['台湾省', '台湾']
};

/**
 * 归一化省份名称为短名（去掉省/市/自治区/特别行政区后缀）
 */
export function normalizeShort(name: string): string {
  if (!name) return '';
  
  // 去掉常见后缀
  const normalized = name
    .replace(/省$/, '')
    .replace(/市$/, '')
    .replace(/自治区$/, '')
    .replace(/壮族自治区$/, '')
    .replace(/回族自治区$/, '')
    .replace(/维吾尔自治区$/, '')
    .replace(/特别行政区$/, '')
    .trim();
  
  // 特殊处理：如果输入包含市/县等下级地名，提取省份部分
  // 例如："广东开平" -> "广东"
  for (const short of Object.keys(PROVINCE_MAPPING)) {
    if (normalized.startsWith(short)) {
      return short;
    }
  }
  
  return normalized;
}

/**
 * 将短名转换为与 ECharts GeoJSON 匹配的完整名称
 * @param short 短名（如"北京"）
 * @param featureNames GeoJSON 中实际存在的省份名称集合
 * @returns 匹配的完整名称，如果没找到则返回短名
 */
export function toEchartsName(short: string, featureNames: Set<string>): string {
  const normalized = normalizeShort(short);
  
  // 查找映射表中的候选名称
  const candidates = PROVINCE_MAPPING[normalized];
  if (candidates) {
    // 优先返回在 GeoJSON 中存在的名称
    for (const candidate of candidates) {
      if (featureNames.has(candidate)) {
        return candidate;
      }
    }
  }
  
  // 如果映射表中没有，尝试直接匹配
  if (featureNames.has(normalized)) {
    return normalized;
  }
  
  // 尝试加上常见后缀
  const suffixes = ['省', '市', '自治区', '壮族自治区', '回族自治区', '维吾尔自治区', '特别行政区'];
  for (const suffix of suffixes) {
    const fullName = normalized + suffix;
    if (featureNames.has(fullName)) {
      return fullName;
    }
  }
  
  // 最后返回原始短名
  return normalized;
}

/**
 * 批量转换省份名称数组
 */
export function normalizeProvinceList(provinces: string[]): string[] {
  return provinces.map(p => normalizeShort(p)).filter(Boolean);
}

/**
 * 判断是否为有效的省份名称
 */
export function isValidProvince(name: string): boolean {
  const normalized = normalizeShort(name);
  return Object.keys(PROVINCE_MAPPING).includes(normalized);
}