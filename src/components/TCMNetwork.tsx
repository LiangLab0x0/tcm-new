import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Network, Users, Pill, Leaf, Stethoscope, 
  Search, Filter, RotateCcw, ZoomIn, ZoomOut,
  Play, Pause, Settings, Info
} from 'lucide-react';
import { useAppStore } from '../store';
import { NetworkNode, NetworkEdge, NetworkNodeType, NetworkFilters } from '../types';

const TCMNetwork: React.FC = () => {
  const { experts, herbs } = useAppStore();
  const [networkData, setNetworkData] = useState<{ nodes: NetworkNode[]; edges: NetworkEdge[] }>({ nodes: [], edges: [] });
  const [filters, setFilters] = useState<NetworkFilters>({
    nodeTypes: ['expert', 'formula', 'herb', 'treatmentDomain'],
    relationTypes: ['creates', 'treats', 'contains', 'specializes'],
    importanceMin: 1,
    connectionsMin: 0
  });
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const networkRef = useRef<HTMLDivElement>(null);

  // 检测移动端设备
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 生成网络数据
  useEffect(() => {
    generateNetworkData();
  }, [experts, herbs, filters]);

  const generateNetworkData = () => {
    const nodes: NetworkNode[] = [];
    const edges: NetworkEdge[] = [];

    // 添加专家节点
    if (filters.nodeTypes.includes('expert')) {
      experts.forEach(expert => {
        nodes.push({
          id: expert.id,
          type: 'expert',
          name: expert.name,
          category: expert.category,
          description: expert.biography?.substring(0, 100) + '...',
          importance: expert.reputation?.overallRating || 5,
          connections: 0, // 会在后面计算
          styling: {
            color: '#3B82F6', // 蓝色
            size: Math.max(24, (expert.reputation?.overallRating || 5) * 5), // 增大移动端节点尺寸
            shape: 'circle'
          }
        });
      });
    }

    // 添加药方节点 (从localStorage或状态中获取)
    if (filters.nodeTypes.includes('formula')) {
      try {
        const formulasData = JSON.parse(localStorage.getItem('formulas') || '[]');
        formulasData.forEach((formula: any) => {
          nodes.push({
            id: formula.id,
            type: 'formula',
            name: formula.name,
            category: formula.category,
            description: formula.effects?.primaryEffect,
            importance: formula.effectiveness?.clinicalEfficacy || 5,
            connections: 0,
            styling: {
              color: '#10B981', // 绿色
              size: Math.max(20, (formula.effectiveness?.clinicalEfficacy || 5) * 4), // 增大移动端节点尺寸
              shape: 'square'
            }
          });
        });
      } catch (error) {
        console.log('No formulas data found');
      }
    }

    // 添加药材节点
    if (filters.nodeTypes.includes('herb')) {
      herbs.slice(0, 20).forEach(herb => { // 限制数量避免过度复杂
        nodes.push({
          id: herb.id,
          type: 'herb',
          name: herb.name,
          category: herb.category,
          description: herb.functions?.join(', ').substring(0, 50) + '...',
          importance: herb.functions?.length || 3,
          connections: 0,
          styling: {
            color: '#059669', // 深绿色
            size: Math.max(18, (herb.functions?.length || 3) * 3), // 增大移动端节点尺寸
            shape: 'circle'
          }
        });
      });
    }

    // 添加治疗领域节点
    if (filters.nodeTypes.includes('treatmentDomain')) {
      const treatmentDomains = [
        { id: 'domain_1', name: '脾胃病', color: '#F59E0B' },
        { id: 'domain_2', name: '风湿病', color: '#EF4444' },
        { id: 'domain_3', name: '心血管病', color: '#8B5CF6' },
        { id: 'domain_4', name: '呼吸系统病', color: '#06B6D4' },
        { id: 'domain_5', name: '泌尿系统病', color: '#84CC16' }
      ];

      treatmentDomains.forEach(domain => {
        nodes.push({
          id: domain.id,
          type: 'treatmentDomain',
          name: domain.name,
          category: '治疗领域',
          description: `${domain.name}相关疾病的治疗`,
          importance: 6,
          connections: 0,
          styling: {
            color: domain.color,
            size: 30, // 增大移动端节点尺寸
            shape: 'diamond'
          }
        });
      });
    }

    // 生成边/关系
    experts.forEach(expert => {
      // 专家 -> 药方关系
      if (expert.relatedFormulas) {
        expert.relatedFormulas.forEach(formula => {
          const formulaNode = nodes.find(n => n.id === formula.id);
          if (formulaNode) {
            edges.push({
              id: `${expert.id}-${formula.id}`,
              source: expert.id,
              target: formula.id,
              type: formula.relationship.includes('创制') ? 'creates' : 'researches',
              strength: formula.effectiveness || 5,
              description: formula.relationship,
              styling: {
                color: '#6B7280',
                width: Math.max(1, (formula.effectiveness || 5) / 2),
                style: 'solid'
              }
            });
          }
        });
      }

      // 专家 -> 治疗领域关系
      if (expert.specializations) {
        expert.specializations.forEach(spec => {
          const domainMap: { [key: string]: string } = {
            '脾胃病学': 'domain_1',
            '风湿病学': 'domain_2',
            '心血管病学': 'domain_3',
            '中医内科': 'domain_1'
          };
          
          const domainId = domainMap[spec];
          if (domainId && nodes.find(n => n.id === domainId)) {
            edges.push({
              id: `${expert.id}-${domainId}`,
              source: expert.id,
              target: domainId,
              type: 'specializes',
              strength: 7,
              description: `专长于${spec}`,
              styling: {
                color: '#F59E0B',
                width: 2,
                style: 'solid'
              }
            });
          }
        });
      }
    });

    // 添加药方 -> 药材关系
    try {
      const formulasData = JSON.parse(localStorage.getItem('formulas') || '[]');
      formulasData.forEach((formula: any) => {
        if (formula.ingredients && formula.ingredients.length > 0) {
          formula.ingredients.slice(0, 6).forEach((ingredient: any) => {
            // 查找是否有对应的药材节点
            const herbNode = nodes.find(n => n.type === 'herb' && n.name === ingredient.name);
            if (herbNode) {
              edges.push({
                id: `${formula.id}-${herbNode.id}`,
                source: formula.id,
                target: herbNode.id,
                type: 'contains',
                strength: ingredient.role === 'monarch' ? 10 : ingredient.role === 'minister' ? 8 : 6,
                description: `${formula.name}包含${ingredient.name}(${ingredient.role === 'monarch' ? '君药' : ingredient.role === 'minister' ? '臣药' : ingredient.role === 'assistant' ? '佐药' : '使药'})`,
                styling: {
                  color: '#10B981',
                  width: ingredient.role === 'monarch' ? 3 : ingredient.role === 'minister' ? 2 : 1,
                  style: 'solid'
                }
              });
            }
          });
        }
      });
    } catch (error) {
      console.log('No formulas data found for herb relations');
    }

    // 添加药材 -> 治疗领域关系
    const herbDomainMap: { [key: string]: string[] } = {
      '人参': ['domain_1', 'domain_3'], // 脾胃病、心血管病
      '黄芪': ['domain_1', 'domain_3'], 
      '当归': ['domain_2', 'domain_3'], // 风湿病、心血管病
      '川芎': ['domain_2', 'domain_3'],
      '白芍': ['domain_1', 'domain_2'],
      '甘草': ['domain_1', 'domain_4'], // 脾胃病、呼吸系统病
      '茯苓': ['domain_1', 'domain_5'], // 脾胃病、泌尿系统病
      '白术': ['domain_1'],
      '陈皮': ['domain_1'],
      '半夏': ['domain_1', 'domain_4']
    };

    Object.entries(herbDomainMap).forEach(([herbName, domainIds]) => {
      const herbNode = nodes.find(n => n.type === 'herb' && n.name === herbName);
      if (herbNode) {
        domainIds.forEach(domainId => {
          const domainNode = nodes.find(n => n.id === domainId);
          if (domainNode) {
            edges.push({
              id: `${herbNode.id}-${domainId}`,
              source: herbNode.id,
              target: domainId,
              type: 'treats',
              strength: 6,
              description: `${herbName}用于治疗${domainNode.name}`,
              styling: {
                color: '#059669',
                width: 1.5,
                style: 'dashed'
              }
            });
          }
        });
      }
    });

    // 添加专家之间的师承关系
    const mentorRelations = [
      { mentor: 'expert_1', student: 'expert_2', description: '学术交流' },
      { mentor: 'expert_3', student: 'expert_4', description: '理论传承' }
    ];

    mentorRelations.forEach(relation => {
      const mentorNode = nodes.find(n => n.id === relation.mentor);
      const studentNode = nodes.find(n => n.id === relation.student);
      if (mentorNode && studentNode) {
        edges.push({
          id: `${relation.mentor}-${relation.student}`,
          source: relation.mentor,
          target: relation.student,
          type: 'mentor',
          strength: 8,
          description: relation.description,
          styling: {
            color: '#8B5CF6',
            width: 2,
            style: 'dotted'
          }
        });
      }
    });

    // 计算节点连接数
    nodes.forEach(node => {
      node.connections = edges.filter(edge => 
        edge.source === node.id || edge.target === node.id
      ).length;
    });

    // 应用筛选
    const filteredNodes = nodes.filter(node => 
      filters.nodeTypes.includes(node.type) &&
      node.importance >= filters.importanceMin &&
      node.connections >= filters.connectionsMin &&
      (!filters.searchTerm || node.name.toLowerCase().includes(filters.searchTerm.toLowerCase()))
    );

    const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
    const filteredEdges = edges.filter(edge => 
      filteredNodeIds.has(edge.source) && 
      filteredNodeIds.has(edge.target) &&
      filters.relationTypes.includes(edge.type)
    );

    setNetworkData({ nodes: filteredNodes, edges: filteredEdges });
  };

  // 获取节点类型图标
  const getNodeIcon = (type: NetworkNodeType) => {
    switch (type) {
      case 'expert': return <Users className="w-4 h-4" />;
      case 'formula': return <Pill className="w-4 h-4" />;
      case 'herb': return <Leaf className="w-4 h-4" />;
      case 'treatmentDomain': return <Stethoscope className="w-4 h-4" />;
      default: return <Network className="w-4 h-4" />;
    }
  };

  // 获取节点类型标签
  const getNodeTypeLabel = (type: NetworkNodeType) => {
    const labels: { [key in NetworkNodeType]: string } = {
      'expert': '专家',
      'formula': '药方',
      'herb': '药材',
      'disease': '疾病',
      'treatmentDomain': '治疗领域',
      'syndrome': '证候'
    };
    return labels[type];
  };

  // 获取关系类型标签
  const getRelationTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      'creates': '创制',
      'treats': '治疗',
      'contains': '包含',
      'specializes': '专长',
      'research': '研究',
      'mentor': '师承'
    };
    return labels[type] || type;
  };

  // 响应式布局算法 - 移动端优化
  const layoutNodes = () => {
    // 根据屏幕尺寸调整参数
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;
    
    const centerX = isMobile ? 200 : isTablet ? 300 : 400;
    const centerY = isMobile ? 250 : isTablet ? 300 : 350;
    const baseRadius = isMobile ? 120 : isTablet ? 160 : 200;
    
    return networkData.nodes.map((node, index) => {
      const angle = (index / networkData.nodes.length) * 2 * Math.PI;
      const importanceMultiplier = isMobile ? 10 : 20;
      const nodeRadius = baseRadius + (node.importance - 5) * importanceMultiplier;
      
      return {
        ...node,
        position: {
          x: centerX + Math.cos(angle) * nodeRadius,
          y: centerY + Math.sin(angle) * nodeRadius
        }
      };
    });
  };

  const positionedNodes = layoutNodes();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-white py-8"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* 页面标题 - 移动端优化 */}
        <div className="text-center mb-4 md:mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-4"
          >
            中医脉络知识图谱
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto px-4"
          >
            探索中医专家、药方、药材和治疗领域之间的深层关联
          </motion.p>
        </div>

        {/* 控制面板 - 移动端优化 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-3 md:p-6 mb-4 md:mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {/* 搜索 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">搜索节点</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="输入关键词..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.searchTerm || ''}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                />
              </div>
            </div>

            {/* 节点类型筛选 */}
            <div className="md:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">节点类型</label>
              <div className="grid grid-cols-2 gap-2">
                {(['expert', 'formula', 'herb', 'treatmentDomain'] as NetworkNodeType[]).map(type => (
                  <label key={type} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.nodeTypes.includes(type)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters(prev => ({ ...prev, nodeTypes: [...prev.nodeTypes, type] }));
                        } else {
                          setFilters(prev => ({ ...prev, nodeTypes: prev.nodeTypes.filter(t => t !== type) }));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="flex items-center gap-1">
                      {getNodeIcon(type)}
                      {getNodeTypeLabel(type)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 重要性筛选 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                最低重要性: {filters.importanceMin}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={filters.importanceMin}
                onChange={(e) => setFilters(prev => ({ ...prev, importanceMin: Number(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* 控制按钮 */}
            <div className="flex items-end gap-2">
              <button
                onClick={() => setFilters({
                  nodeTypes: ['expert', 'formula', 'herb', 'treatmentDomain'],
                  relationTypes: ['creates', 'treats', 'contains', 'specializes'],
                  importanceMin: 1,
                  connectionsMin: 0
                })}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                重置
              </button>
              <button
                onClick={() => setIsAnimating(!isAnimating)}
                className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isAnimating ? '暂停' : '动画'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* 网络可视化主区域 - 移动端优化布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
          {/* 网络图 */}
          <div className="lg:col-span-3 order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">知识关系图谱</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 3))}
                    className={`${isMobile ? 'p-3' : 'p-2'} text-gray-600 hover:bg-gray-100 rounded-lg transition-colors active:bg-gray-200`}
                  >
                    <ZoomIn className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'}`} />
                  </button>
                  <button
                    onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.5))}
                    className={`${isMobile ? 'p-3' : 'p-2'} text-gray-600 hover:bg-gray-100 rounded-lg transition-colors active:bg-gray-200`}
                  >
                    <ZoomOut className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'}`} />
                  </button>
                  <span className="text-sm text-gray-500">{Math.round(zoomLevel * 100)}%</span>
                </div>
              </div>
              
              <div 
                ref={networkRef}
                className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
              >
                {/* SVG 背景网格 */}
                <svg className="absolute inset-0 w-full h-full">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" strokeWidth="1" opacity="0.3"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* 绘制边 */}
                  {networkData.edges.map(edge => {
                    const sourceNode = positionedNodes.find(n => n.id === edge.source);
                    const targetNode = positionedNodes.find(n => n.id === edge.target);
                    
                    if (!sourceNode || !targetNode || !sourceNode.position || !targetNode.position) return null;
                    
                    return (
                      <motion.line
                        key={edge.id}
                        x1={sourceNode.position.x}
                        y1={sourceNode.position.y}
                        x2={targetNode.position.x}
                        y2={targetNode.position.y}
                        stroke={edge.styling?.color || '#6B7280'}
                        strokeWidth={edge.styling?.width || 1}
                        strokeDasharray={edge.styling?.style === 'dashed' ? '5,5' : undefined}
                        opacity={0.6}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      />
                    );
                  })}
                </svg>

                {/* 节点 */}
                {positionedNodes.map((node, index) => {
                  if (!node.position) return null;
                  
                  return (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.3 + index * 0.05,
                        type: "spring",
                        stiffness: 300
                      }}
                      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: node.position.x,
                        top: node.position.y,
                        zIndex: selectedNode?.id === node.id ? 10 : 1
                      }}
                      onClick={() => setSelectedNode(node)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div
                        className={`flex items-center justify-center text-white font-bold shadow-lg transition-all ${
                          node.styling?.shape === 'circle' ? 'rounded-full' :
                          node.styling?.shape === 'square' ? 'rounded-lg' :
                          node.styling?.shape === 'diamond' ? 'rotate-45 rounded-lg' : 'rounded-full'
                        } ${selectedNode?.id === node.id ? 'ring-4 ring-blue-300' : ''}`}
                        style={{
                          backgroundColor: node.styling?.color,
                          width: node.styling?.size || 20,
                          height: node.styling?.size || 20,
                          fontSize: Math.max(8, (node.styling?.size || 20) / 3)
                        }}
                      >
                        {node.styling?.shape === 'diamond' ? (
                          <span className="-rotate-45">{node.name.charAt(0)}</span>
                        ) : (
                          node.name.charAt(0)
                        )}
                      </div>
                      
                      {/* 节点标签 - 移动端优化 */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs md:text-sm font-medium text-gray-700 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-md whitespace-nowrap border border-gray-200">
                        {node.name}
                      </div>
                    </motion.div>
                  );
                })}

                {/* 动画效果 */}
                {isAnimating && (
                  <div className="absolute inset-0 pointer-events-none">
                    {/* 可以添加一些动态效果，如粒子、波纹等 */}
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* 移动端交互提示 */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg"
              >
                <p className="text-sm text-blue-700 text-center">
                  💡 点击节点查看详情 • 使用缩放按钮调整视图 • 在右侧查看统计信息
                </p>
              </motion.div>
            )}
          </div>

          {/* 侧边栏信息 - 移动端优化 */}
          <div className="lg:col-span-1 order-2">
            {/* 统计信息 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-4 lg:p-6 mb-4 lg:mb-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">网络统计</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">节点总数</span>
                  <span className="font-semibold text-blue-600">{networkData.nodes.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">关系总数</span>
                  <span className="font-semibold text-green-600">{networkData.edges.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">专家数量</span>
                  <span className="font-semibold text-purple-600">
                    {networkData.nodes.filter(n => n.type === 'expert').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">药方数量</span>
                  <span className="font-semibold text-emerald-600">
                    {networkData.nodes.filter(n => n.type === 'formula').length}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 选中节点信息 - 移动端优化 */}
            {selectedNode && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-lg p-4 lg:p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">节点详情</h3>
                </div>
                
                <div className="space-y-4">
                  {/* 基本信息 */}
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      {getNodeIcon(selectedNode.type)}
                      <span className="font-medium text-gray-800">{selectedNode.name}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {getNodeTypeLabel(selectedNode.type)}
                      </span>
                      {selectedNode.category && (
                        <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
                          {selectedNode.category}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">
                        重要性: <span className="font-medium text-gray-800">{selectedNode.importance}/10</span>
                      </span>
                      <span className="text-gray-600">
                        连接数: <span className="font-medium text-gray-800">{selectedNode.connections}</span>
                      </span>
                    </div>
                  </div>
                  
                  {selectedNode.description && (
                    <div>
                      <span className="text-sm text-gray-600 block mb-1">描述：</span>
                      <p className="text-sm text-gray-700 leading-relaxed bg-blue-50 p-3 rounded-lg">
                        {selectedNode.description}
                      </p>
                    </div>
                  )}

                  {/* 关联节点 */}
                  {(() => {
                    // 计算与选中节点相关的边和节点
                    const relatedEdges = networkData.edges.filter(
                      edge => edge.source === selectedNode.id || edge.target === selectedNode.id
                    );
                    const relatedNodeIds = relatedEdges.map(edge => 
                      edge.source === selectedNode.id ? edge.target : edge.source
                    );
                    const relatedNodes = networkData.nodes.filter(node => 
                      relatedNodeIds.includes(node.id)
                    );

                    if (relatedNodes.length === 0) return null;

                    return (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <Network className="w-4 h-4" />
                          关联节点 ({relatedNodes.length})
                        </h4>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {relatedNodes.map((relatedNode, index) => {
                            const relatedEdge = relatedEdges.find(edge =>
                              (edge.source === selectedNode.id && edge.target === relatedNode.id) ||
                              (edge.target === selectedNode.id && edge.source === relatedNode.id)
                            );
                            
                            return (
                              <motion.div
                                key={relatedNode.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                                onClick={() => setSelectedNode(relatedNode)}
                              >
                                <div 
                                  className="w-3 h-3 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: relatedNode.styling?.color }}
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-800 truncate">
                                      {relatedNode.name}
                                    </span>
                                    <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded">
                                      {getNodeTypeLabel(relatedNode.type)}
                                    </span>
                                  </div>
                                  {relatedEdge && (
                                    <div className="text-xs text-gray-600 mt-1">
                                      关系: {getRelationTypeLabel(relatedEdge.type)}
                                    </div>
                                  )}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {relatedNode.importance}/10
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}

                  {/* 专属信息根据节点类型显示 */}
                  {selectedNode.type === 'expert' && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="text-sm font-semibold text-blue-800 mb-2">专家信息</h4>
                      <div className="text-xs text-blue-700 space-y-1">
                        <div>专业领域: 中医内科、脾胃病学</div>
                        <div>主要贡献: 五脏相关学说、重症肌无力治疗</div>
                        <div>学术影响: 国医大师级别，影响深远</div>
                      </div>
                    </div>
                  )}

                  {selectedNode.type === 'formula' && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h4 className="text-sm font-semibold text-green-800 mb-2">药方信息</h4>
                      <div className="text-xs text-green-700 space-y-1">
                        <div>功效: 补中益气，升阳举陷</div>
                        <div>主治: 脾胃气虚证</div>
                        <div>现代应用: 慢性胃炎、胃下垂等</div>
                      </div>
                    </div>
                  )}

                  {selectedNode.type === 'herb' && (
                    <div className="bg-emerald-50 p-3 rounded-lg">
                      <h4 className="text-sm font-semibold text-emerald-800 mb-2">药材信息</h4>
                      <div className="text-xs text-emerald-700 space-y-1">
                        <div>性味: 甘，微温</div>
                        <div>归经: 脾、肺经</div>
                        <div>功效: 大补元气，复脉固脱</div>
                      </div>
                    </div>
                  )}

                  {selectedNode.type === 'treatmentDomain' && (
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <h4 className="text-sm font-semibold text-yellow-800 mb-2">治疗领域</h4>
                      <div className="text-xs text-yellow-700 space-y-1">
                        <div>相关疾病: 消化不良、胃炎、胃下垂</div>
                        <div>治疗原则: 健脾和胃，升阳益气</div>
                        <div>常用方剂: 补中益气汤、参苓白术散</div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* 图例 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">图例说明</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">中医专家</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-green-500 rounded-lg"></div>
              <span className="text-sm text-gray-700">经典药方</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-emerald-600 rounded-full"></div>
              <span className="text-sm text-gray-700">中药材</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-yellow-500 rounded-lg transform rotate-45"></div>
              <span className="text-sm text-gray-700">治疗领域</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">关系类型</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-600">
              <span>━━ 创制关系</span>
              <span>━━ 研究关系</span>
              <span>━━ 专长关系</span>
              <span>━━ 治疗关系</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TCMNetwork;
