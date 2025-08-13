import React, { useState, useMemo } from 'react';
import { MapPin, TrendingUp, Info, Users, BookOpen, GraduationCap } from 'lucide-react';
import { useAppStore } from '../store';
import { Herb, TCMExpert } from '../types';

// 中国省份地理数据（简化版，包含主要省份的SVG路径）
const CHINA_PROVINCES = {
  '北京': { 
    path: 'M400,180 L420,170 L430,180 L425,195 L405,195 Z',
    center: [415, 185],
    name: '北京市'
  },
  '天津': {
    path: 'M425,175 L435,170 L445,180 L440,190 L430,185 Z',
    center: [437, 180],
    name: '天津市'
  },
  '河北': {
    path: 'M380,160 L450,150 L460,200 L440,220 L380,210 L370,180 Z',
    center: [415, 185],
    name: '河北省'
  },
  '山西': {
    path: 'M340,160 L380,155 L375,210 L345,215 L330,180 Z',
    center: [355, 185],
    name: '山西省'
  },
  '内蒙古': {
    path: 'M280,120 L520,100 L530,150 L500,155 L380,155 L340,160 L280,145 Z',
    center: [405, 135],
    name: '内蒙古自治区'
  },
  '辽宁': {
    path: 'M480,150 L520,140 L530,180 L510,190 L485,185 L470,165 Z',
    center: [495, 165],
    name: '辽宁省'
  },
  '吉林': {
    path: 'M510,120 L540,115 L545,150 L525,155 L505,145 Z',
    center: [525, 135],
    name: '吉林省'
  },
  '黑龙江': {
    path: 'M520,80 L580,70 L590,120 L565,125 L540,115 L515,105 Z',
    center: [550, 100],
    name: '黑龙江省'
  },
  '上海': {
    path: 'M520,260 L530,255 L535,265 L525,270 Z',
    center: [527, 262],
    name: '上海市'
  },
  '江苏': {
    path: 'M480,240 L530,235 L535,265 L490,270 L475,255 Z',
    center: [505, 252],
    name: '江苏省'
  },
  '浙江': {
    path: 'M490,270 L535,265 L540,295 L495,300 L485,285 Z',
    center: [512, 280],
    name: '浙江省'
  },
  '安徽': {
    path: 'M450,240 L490,235 L495,280 L455,285 L440,260 Z',
    center: [467, 260],
    name: '安徽省'
  },
  '福建': {
    path: 'M500,300 L530,295 L535,330 L505,335 L495,315 Z',
    center: [515, 315],
    name: '福建省'
  },
  '江西': {
    path: 'M450,280 L495,275 L500,315 L460,320 L445,300 Z',
    center: [472, 297],
    name: '江西省'
  },
  '山东': {
    path: 'M460,200 L510,195 L520,230 L475,235 L455,215 Z',
    center: [487, 215],
    name: '山东省'
  },
  '河南': {
    path: 'M400,220 L460,215 L465,255 L410,260 L385,240 Z',
    center: [425, 237],
    name: '河南省'
  },
  '湖北': {
    path: 'M380,260 L430,255 L435,290 L385,295 L370,275 Z',
    center: [402, 275],
    name: '湖北省'
  },
  '湖南': {
    path: 'M370,295 L420,290 L425,325 L375,330 L360,310 Z',
    center: [392, 312],
    name: '湖南省'
  },
  '广东': {
    path: 'M380,350 L480,345 L485,380 L385,385 L375,365 Z',
    center: [430, 365],
    name: '广东省'
  },
  '广西': {
    path: 'M320,350 L380,345 L385,385 L325,390 L310,370 Z',
    center: [347, 367],
    name: '广西壮族自治区'
  },
  '海南': {
    path: 'M380,420 L420,415 L425,440 L385,445 Z',
    center: [402, 430],
    name: '海南省'
  },
  '重庆': {
    path: 'M350,280 L370,275 L375,295 L355,300 Z',
    center: [362, 287],
    name: '重庆市'
  },
  '四川': {
    path: 'M280,260 L350,255 L355,300 L285,305 L270,280 Z',
    center: [312, 280],
    name: '四川省'
  },
  '贵州': {
    path: 'M280,320 L330,315 L335,350 L285,355 L270,337 Z',
    center: [302, 335],
    name: '贵州省'
  },
  '云南': {
    path: 'M220,340 L280,335 L285,380 L225,385 L210,362 Z',
    center: [247, 360],
    name: '云南省'
  },
  '西藏': {
    path: 'M120,280 L220,275 L225,340 L125,345 L110,312 Z',
    center: [167, 310],
    name: '西藏自治区'
  },
  '陕西': {
    path: 'M340,220 L385,215 L390,260 L345,265 L330,242 Z',
    center: [360, 240],
    name: '陕西省'
  },
  '甘肃': {
    path: 'M260,180 L340,175 L345,235 L265,240 L250,207 Z',
    center: [297, 207],
    name: '甘肃省'
  },
  '青海': {
    path: 'M200,200 L280,195 L285,250 L205,255 L190,227 Z',
    center: [237, 225],
    name: '青海省'
  },
  '宁夏': {
    path: 'M320,180 L340,175 L345,200 L325,205 Z',
    center: [332, 190],
    name: '宁夏回族自治区'
  },
  '新疆': {
    path: 'M80,120 L260,115 L265,200 L200,205 L190,180 L120,185 L85,152 Z',
    center: [172, 160],
    name: '新疆维吾尔自治区'
  }
};

interface ProvinceData {
  name: string;
  herbCount: number;
  herbs: Herb[];
  expertCount: number;
  experts: TCMExpert[];
  schools: string[];
  institutions: string[];
  color: string;
}

const ChinaMap: React.FC = () => {
  const { herbs, experts, updateSearchFilters, setCurrentView } = useAppStore();
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'herbs' | 'experts'>('all');

  // 计算各省份的综合数据
  const provinceData = useMemo(() => {
    const data: Record<string, ProvinceData> = {};
    
    // 初始化所有省份
    Object.keys(CHINA_PROVINCES).forEach(province => {
      data[province] = {
        name: CHINA_PROVINCES[province as keyof typeof CHINA_PROVINCES].name,
        herbCount: 0,
        herbs: [],
        expertCount: 0,
        experts: [],
        schools: [],
        institutions: [],
        color: '#e5e7eb' // 默认灰色
      };
    });

    // 统计各省份的药材数量
    herbs.forEach(herb => {
      if (herb.origin) {
        herb.origin.forEach(origin => {
          // 简单的省份名称匹配
          const matchedProvince = Object.keys(CHINA_PROVINCES).find(province => 
            origin.includes(province) || province.includes(origin)
          );
          
          if (matchedProvince && data[matchedProvince]) {
            data[matchedProvince].herbCount++;
            data[matchedProvince].herbs.push(herb);
          }
        });
      }
    });

    // 统计各省份的专家数量
    experts.forEach(expert => {
      if (expert.place_of_origin) {
        // 从籍贯中提取省份信息
        const matchedProvince = Object.keys(CHINA_PROVINCES).find(province => 
          expert.place_of_origin.includes(province) || province.includes(expert.place_of_origin.substring(0, 2))
        );
        
        if (matchedProvince && data[matchedProvince]) {
          data[matchedProvince].expertCount++;
          data[matchedProvince].experts.push(expert);
          
          // 添加学派信息
          if (expert.school && !data[matchedProvince].schools.includes(expert.school)) {
            data[matchedProvince].schools.push(expert.school);
          }
          
          // 添加机构信息
          if (expert.institution && !data[matchedProvince].institutions.includes(expert.institution)) {
            data[matchedProvince].institutions.push(expert.institution);
          }
        }
      }
    });

    // 根据综合数据量设置颜色
    const totalCounts = Object.values(data).map(d => d.herbCount + d.expertCount);
    const maxCount = Math.max(...totalCounts);
    Object.values(data).forEach(province => {
      const totalCount = province.herbCount + province.expertCount;
      if (totalCount === 0) {
        province.color = '#f3f4f6';
      } else {
        const intensity = totalCount / maxCount;
        if (viewMode === 'herbs') {
          // 药材模式 - 绿色系
          const herbIntensity = province.herbCount / Math.max(...Object.values(data).map(d => d.herbCount));
          if (herbIntensity > 0.8) province.color = '#166534';
          else if (herbIntensity > 0.6) province.color = '#16a34a';
          else if (herbIntensity > 0.4) province.color = '#22c55e';
          else if (herbIntensity > 0.2) province.color = '#86efac';
          else province.color = '#dcfce7';
        } else if (viewMode === 'experts') {
          // 专家模式 - 紫色系
          const expertIntensity = province.expertCount / Math.max(...Object.values(data).map(d => d.expertCount));
          if (expertIntensity > 0.8) province.color = '#581c87';
          else if (expertIntensity > 0.6) province.color = '#7c3aed';
          else if (expertIntensity > 0.4) province.color = '#a855f7';
          else if (expertIntensity > 0.2) province.color = '#c4b5fd';
          else province.color = '#ede9fe';
        } else {
          // 综合模式 - 蓝色系
          if (intensity > 0.8) province.color = '#1e40af';
          else if (intensity > 0.6) province.color = '#3b82f6';
          else if (intensity > 0.4) province.color = '#60a5fa';
          else if (intensity > 0.2) province.color = '#93c5fd';
          else province.color = '#dbeafe';
        }
      }
    });

    return data;
  }, [herbs, experts, viewMode]);

  const handleProvinceClick = (province: string) => {
    setSelectedProvince(province);
    updateSearchFilters({ origin: province });
    setCurrentView('gallery');
  };

  const clearSelection = () => {
    setSelectedProvince(null);
    updateSearchFilters({ origin: '' });
  };

  const totalHerbs = Object.values(provinceData).reduce((sum, p) => sum + p.herbCount, 0);
  const totalExperts = Object.values(provinceData).reduce((sum, p) => sum + p.expertCount, 0);
  const totalSchools = [...new Set(Object.values(provinceData).flatMap(p => p.schools))].length;
  const activeProvinces = Object.values(provinceData).filter(p => p.herbCount > 0 || p.expertCount > 0).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">中国中医药行业地理分布</h1>
          <p className="text-gray-600 text-lg">探索中华大地上的药材宝库、专家分布与学派传承</p>
        </div>

        {/* 视图模式切换 */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => setViewMode('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'all' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              综合视图
            </button>
            <button
              onClick={() => setViewMode('herbs')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'herbs' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              药材分布
            </button>
            <button
              onClick={() => setViewMode('experts')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'experts' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              专家分布
            </button>
          </div>
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-600">{totalHerbs}</div>
            <div className="text-sm text-gray-600">药材总数</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{totalExperts}</div>
            <div className="text-sm text-gray-600">专家总数</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-indigo-600">{totalSchools}</div>
            <div className="text-sm text-gray-600">学派数量</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{activeProvinces}</div>
            <div className="text-sm text-gray-600">活跃省份</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 地图区域 */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-800">中国地图</h2>
                </div>
                {selectedProvince && (
                  <button
                    onClick={clearSelection}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    清除选择
                  </button>
                )}
              </div>

              {/* SVG地图 */}
              <div className="relative">
                <svg 
                  viewBox="0 0 600 500" 
                  className="w-full h-auto border border-gray-200 rounded-lg"
                >
                  {/* 背景 */}
                  <rect width="600" height="500" fill="#f8fafc" />
                  
                  {/* 省份路径 */}
                  {Object.entries(CHINA_PROVINCES).map(([province, data]) => {
                    const provinceInfo = provinceData[province];
                    const isHovered = hoveredProvince === province;
                    const isSelected = selectedProvince === province;
                    
                    return (
                      <g key={province}>
                        <path
                          d={data.path}
                          fill={isSelected ? '#fbbf24' : provinceInfo.color}
                          stroke={isHovered || isSelected ? '#1e40af' : '#6b7280'}
                          strokeWidth={isHovered || isSelected ? 2 : 1}
                          className="cursor-pointer transition-all duration-200"
                          onMouseEnter={() => setHoveredProvince(province)}
                          onMouseLeave={() => setHoveredProvince(null)}
                          onClick={() => handleProvinceClick(province)}
                        />
                        
                        {/* 省份标签 */}
                        {provinceInfo.herbCount > 0 && (
                          <text
                            x={data.center[0]}
                            y={data.center[1]}
                            textAnchor="middle"
                            className="fill-current text-xs font-medium pointer-events-none"
                            fill={isSelected ? '#92400e' : '#374151'}
                          >
                            {province}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* 悬停信息框 */}
                {hoveredProvince && (
                  <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg border z-10 max-w-sm">
                    <h3 className="font-bold text-gray-800 mb-2">
                      {provinceData[hoveredProvince].name}
                    </h3>
                    
                    {/* 药材信息 */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <BookOpen className="w-4 h-4 text-green-600" />
                      <span>药材: {provinceData[hoveredProvince].herbCount} 种</span>
                    </div>
                    
                    {/* 专家信息 */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span>专家: {provinceData[hoveredProvince].expertCount} 位</span>
                    </div>
                    
                    {/* 学派信息 */}
                    {provinceData[hoveredProvince].schools.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <GraduationCap className="w-4 h-4 text-indigo-600" />
                        <span>学派: {provinceData[hoveredProvince].schools.length} 个</span>
                      </div>
                    )}
                    
                    {/* 详细信息 */}
                    {viewMode !== 'experts' && provinceData[hoveredProvince].herbCount > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">主要药材:</p>
                        <div className="text-xs text-gray-700">
                          {provinceData[hoveredProvince].herbs
                            .slice(0, 3)
                            .map(h => h.name)
                            .join('、')}
                          {provinceData[hoveredProvince].herbs.length > 3 && '...'}
                        </div>
                      </div>
                    )}
                    
                    {viewMode !== 'herbs' && provinceData[hoveredProvince].expertCount > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">主要专家:</p>
                        <div className="text-xs text-gray-700">
                          {provinceData[hoveredProvince].experts
                            .slice(0, 3)
                            .map(e => e.name)
                            .join('、')}
                          {provinceData[hoveredProvince].experts.length > 3 && '...'}
                        </div>
                      </div>
                    )}
                    
                    {provinceData[hoveredProvince].schools.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">主要学派:</p>
                        <div className="text-xs text-gray-700">
                          {provinceData[hoveredProvince].schools
                            .slice(0, 2)
                            .join('、')}
                          {provinceData[hoveredProvince].schools.length > 2 && '...'}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 图例 */}
              <div className="mt-4 flex items-center justify-center gap-4">
                <span className="text-sm text-gray-600">药材数量：</span>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <span className="text-xs text-gray-500">0</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-200 rounded"></div>
                  <span className="text-xs text-gray-500">1-3</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-400 rounded"></div>
                  <span className="text-xs text-gray-500">4-6</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-600 rounded"></div>
                  <span className="text-xs text-gray-500">7+</span>
                </div>
              </div>
            </div>
          </div>

          {/* 侧边栏 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 产地排行榜 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-bold text-gray-800">产地排行</h2>
              </div>
              <div className="space-y-3">
                {Object.entries(provinceData)
                  .filter(([_, data]) => data.herbCount > 0)
                  .sort(([_a, a], [_b, b]) => b.herbCount - a.herbCount)
                  .slice(0, 10)
                  .map(([province, data], index) => (
                    <div
                      key={province}
                      onClick={() => handleProvinceClick(province)}
                      className={`
                        p-3 rounded-lg cursor-pointer transition-colors
                        ${selectedProvince === province
                          ? 'bg-blue-100 border-2 border-blue-300'
                          : 'bg-gray-50 hover:bg-gray-100'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`
                            w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                            ${index < 3 
                              ? 'bg-yellow-400 text-yellow-900' 
                              : 'bg-gray-300 text-gray-700'
                            }
                          `}>
                            {index + 1}
                          </span>
                          <span className="font-medium text-gray-800">{province}</span>
                        </div>
                        <span className="text-sm font-bold text-blue-600">
                          {data.herbCount} 种
                        </span>
                      </div>
                      
                      {/* 药材列表预览 */}
                      <div className="mt-2 text-xs text-gray-600">
                        {data.herbs.slice(0, 3).map(h => h.name).join('、')}
                        {data.herbs.length > 3 && ` 等${data.herbs.length}种`}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* 使用说明 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-800">使用说明</h2>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div>
                  <strong>1. 省份查看</strong>
                  <p>鼠标悬停查看省份详细信息</p>
                </div>
                <div>
                  <strong>2. 药材筛选</strong>
                  <p>点击省份筛选该地区的药材</p>
                </div>
                <div>
                  <strong>3. 颜色含义</strong>
                  <p>颜色深浅代表药材数量多少</p>
                </div>
                <div>
                  <strong>4. 数据统计</strong>
                  <p>右侧面板显示详细排行榜</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChinaMap;
