import React, { useState, useMemo, useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { MapPin, TrendingUp, Info, Loader2 } from 'lucide-react';
import { useAppStore } from '../store';
import { normalizeShort, toEchartsName } from '../utils/province';

interface ProvinceStats {
  short: string;
  herbs: number;
  experts: number;
  herbNames: string[];
  expertNames: string[];
}

const ChinaMap: React.FC = () => {
  const { herbs, experts, updateSearchFilters, setCurrentView } = useAppStore();
  const [metric, setMetric] = useState<'herbs' | 'experts'>('herbs');
  const [mapReady, setMapReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const featureNamesRef = useRef<Set<string>>(new Set());
  const chartRef = useRef<ReactECharts | null>(null);

  // 加载并注册地图
  useEffect(() => {
    const loadMap = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/geo/china.json');
        if (!response.ok) {
          throw new Error(`Failed to load map: ${response.status}`);
        }
        
        const geoJson = await response.json();
        
        // 提取所有省份名称
        const names = new Set<string>();
        if (geoJson.features) {
          geoJson.features.forEach((feature: any) => {
            if (feature.properties && feature.properties.name) {
              names.add(feature.properties.name);
            }
          });
        }
        featureNamesRef.current = names;
        
        // 注册地图
        echarts.registerMap('china', geoJson);
        setMapReady(true);
      } catch (err) {
        console.error('Failed to load China map:', err);
        setError(err instanceof Error ? err.message : 'Failed to load map');
      } finally {
        setLoading(false);
      }
    };

    loadMap();
  }, []);

  // 聚合省级数据
  const provinceStats = useMemo(() => {
    const statsMap = new Map<string, ProvinceStats>();
    
    // 统计药材
    herbs.forEach(herb => {
      if (herb.origin && Array.isArray(herb.origin)) {
        herb.origin.forEach(origin => {
          const short = normalizeShort(origin);
          if (short) {
            const existing = statsMap.get(short) || {
              short,
              herbs: 0,
              experts: 0,
              herbNames: [],
              expertNames: []
            };
            existing.herbs++;
            if (existing.herbNames.length < 5) {
              existing.herbNames.push(herb.name);
            }
            statsMap.set(short, existing);
          }
        });
      }
    });
    
    // 统计专家
    experts.forEach(expert => {
      let provinceName = '';
      
      // 优先使用 place_of_origin
      if (expert.place_of_origin) {
        provinceName = expert.place_of_origin;
      } 
      // 其次使用 regions 中的第一个省份
      else if (expert.regions && expert.regions.length > 0 && expert.regions[0].province) {
        provinceName = expert.regions[0].province;
      }
      
      if (provinceName) {
        const short = normalizeShort(provinceName);
        if (short) {
          const existing = statsMap.get(short) || {
            short,
            herbs: 0,
            experts: 0,
            herbNames: [],
            expertNames: []
          };
          existing.experts++;
          if (existing.expertNames.length < 5) {
            existing.expertNames.push(expert.name);
          }
          statsMap.set(short, existing);
        }
      }
    });
    
    return Array.from(statsMap.values());
  }, [herbs, experts]);

  // 准备 ECharts 数据
  const seriesData = useMemo(() => {
    return provinceStats.map(stat => ({
      name: toEchartsName(stat.short, featureNamesRef.current),
      value: metric === 'herbs' ? stat.herbs : stat.experts,
      herbs: stat.herbs,
      experts: stat.experts,
      herbNames: stat.herbNames,
      expertNames: stat.expertNames,
      short: stat.short
    }));
  }, [provinceStats, metric]);

  // 计算最大值
  const maxValue = useMemo(() => {
    const values = seriesData.map(d => d.value || 0);
    return Math.max(1, ...values);
  }, [seriesData]);

  // ECharts 配置
  const option = useMemo(() => ({
    title: {
      text: '中国中医药地理分布',
      left: 'center',
      textStyle: {
        fontSize: 20,
        color: '#1f2937'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        if (!params.data) return params.name;
        
        const { name, herbs, experts, herbNames, expertNames } = params.data;
        let html = `<div style="padding: 8px;">
          <strong>${name}</strong><br/>
          <div style="margin-top: 4px;">
            药材数量: ${herbs || 0} 种<br/>
            专家数量: ${experts || 0} 位
          </div>`;
        
        if (herbNames && herbNames.length > 0) {
          html += `<div style="margin-top: 4px; font-size: 12px;">
            主要药材: ${herbNames.join('、')}${herbNames.length >= 5 ? '...' : ''}
          </div>`;
        }
        
        if (expertNames && expertNames.length > 0) {
          html += `<div style="margin-top: 4px; font-size: 12px;">
            主要专家: ${expertNames.join('、')}${expertNames.length >= 5 ? '...' : ''}
          </div>`;
        }
        
        html += '</div>';
        return html;
      }
    },
    visualMap: {
      type: 'continuous',
      min: 0,
      max: maxValue,
      text: ['高', '低'],
      left: 'left',
      bottom: '10%',
      calculable: true,
      inRange: {
        color: metric === 'herbs' 
          ? ['#dcfce7', '#86efac', '#22c55e', '#16a34a', '#166534']
          : ['#ede9fe', '#c4b5fd', '#a855f7', '#7c3aed', '#581c87']
      },
      textStyle: {
        color: '#6b7280'
      }
    },
    series: [{
      name: metric === 'herbs' ? '药材分布' : '专家分布',
      type: 'map',
      map: 'china',
      roam: true,
      zoom: 1.2,
      label: {
        show: false,
        fontSize: 10,
        color: '#374151'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 12,
          color: '#111827'
        },
        itemStyle: {
          areaColor: '#fbbf24',
          borderColor: '#92400e',
          borderWidth: 2
        }
      },
      itemStyle: {
        borderColor: '#9ca3af',
        borderWidth: 0.5,
        areaColor: '#f3f4f6'
      },
      data: seriesData
    }],
    toolbox: {
      show: true,
      orient: 'horizontal',
      right: 20,
      top: 20,
      feature: {
        saveAsImage: {
          title: '保存图片',
          pixelRatio: 2
        },
        restore: {
          title: '重置'
        }
      }
    }
  }), [seriesData, metric, maxValue]);

  // 处理点击事件
  const onEvents = {
    click: (params: any) => {
      if (params.data && params.data.short) {
        updateSearchFilters({ origin: params.data.short });
        setCurrentView('gallery');
      }
    }
  };

  // 排行榜数据
  const topProvinces = useMemo(() => {
    return [...provinceStats]
      .sort((a, b) => {
        const aValue = metric === 'herbs' ? a.herbs : a.experts;
        const bValue = metric === 'herbs' ? b.herbs : b.experts;
        return bValue - aValue;
      })
      .slice(0, 10)
      .filter(p => (metric === 'herbs' ? p.herbs : p.experts) > 0);
  }, [provinceStats, metric]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">地图加载失败: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              重新加载
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">中国中医药地理分布</h1>
          <p className="text-gray-600 text-lg">探索中华大地上的药材宝库与专家分布</p>
        </div>

        {/* 指标切换 */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => setMetric('herbs')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                metric === 'herbs' 
                  ? 'bg-green-100 text-green-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              药材数量
            </button>
            <button
              onClick={() => setMetric('experts')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                metric === 'experts' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              专家数量
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 地图区域 */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-800">地理分布图</h2>
              </div>
              
              {loading ? (
                <div className="flex items-center justify-center h-96">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  <span className="ml-2 text-gray-600">加载地图中...</span>
                </div>
              ) : mapReady ? (
                <ReactECharts
                  ref={(e) => { chartRef.current = e; }}
                  option={option}
                  style={{ height: '500px' }}
                  onEvents={onEvents}
                  opts={{ renderer: 'svg' }}
                />
              ) : (
                <div className="flex items-center justify-center h-96 text-gray-500">
                  地图初始化中...
                </div>
              )}
            </div>
          </div>

          {/* 侧边栏 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 排行榜 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-bold text-gray-800">
                  {metric === 'herbs' ? '药材产地排行' : '专家分布排行'}
                </h2>
              </div>
              <div className="space-y-3">
                {topProvinces.map((province, index) => {
                  const count = metric === 'herbs' ? province.herbs : province.experts;
                  const names = metric === 'herbs' ? province.herbNames : province.expertNames;
                  
                  return (
                    <div
                      key={province.short}
                      onClick={() => {
                        updateSearchFilters({ origin: province.short });
                        setCurrentView('gallery');
                      }}
                      className="p-3 rounded-lg cursor-pointer transition-colors bg-gray-50 hover:bg-gray-100"
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
                          <span className="font-medium text-gray-800">{province.short}</span>
                        </div>
                        <span className={`text-sm font-bold ${
                          metric === 'herbs' ? 'text-green-600' : 'text-purple-600'
                        }`}>
                          {count} {metric === 'herbs' ? '种' : '位'}
                        </span>
                      </div>
                      
                      {names.length > 0 && (
                        <div className="mt-2 text-xs text-gray-600">
                          {names.slice(0, 3).join('、')}
                          {names.length > 3 && '...'}
                        </div>
                      )}
                    </div>
                  );
                })}
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
                  <strong>查看详情</strong>
                  <p>鼠标悬停查看省份详细信息</p>
                </div>
                <div>
                  <strong>筛选数据</strong>
                  <p>点击省份筛选该地区的数据</p>
                </div>
                <div>
                  <strong>缩放漫游</strong>
                  <p>使用鼠标滚轮缩放，拖拽移动地图</p>
                </div>
                <div>
                  <strong>导出图片</strong>
                  <p>点击右上角工具栏保存地图</p>
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