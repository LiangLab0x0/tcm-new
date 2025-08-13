import React from 'react';
import { Home, Layers, Map, Users, BookOpen, Network, Brain, Search, Zap } from 'lucide-react';
import { useAppStore } from '../store';

const Navigation: React.FC = () => {
  const { currentView, setCurrentView, expertCompareList, getStats } = useAppStore();
  const stats = getStats();

  const navItems = [
    {
      id: 'experts' as const,
      label: 'AI首页',
      icon: Brain,
      description: '智能鉴定数据库系统首页'
    },
    {
      id: 'gallery' as const,
      label: 'AI药材识别',
      icon: Search,
      description: '智能药材鉴定与分析'
    },
    {
      id: 'network' as const,
      label: '智能关系图谱',
      icon: Network,
      description: '多维度AI关联分析'
    },
    {
      id: 'map' as const,
      label: '地理智能分析',
      icon: Map,
      description: '产地溯源与分布预测'
    },
    {
      id: 'compare' as const,
      label: 'AI对比分析',
      icon: Zap,
      description: '智能差异识别与洞察',
      badge: expertCompareList.length > 0 ? expertCompareList.length : undefined
    }
  ];

  return (
    <nav className="bg-white border-b-2 border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo和标题 */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              🧠
            </div>
            {/* 桌面端显示完整标题，移动端隐藏 */}
            <div className="hidden lg:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">传统医药智能鉴定数据库</h1>
              <p className="text-xs text-gray-500">AI驱动 • 多智能体协调 • 专业鉴定</p>
            </div>
          </div>

          {/* 导航菜单 */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`
                  relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors
                  ${currentView === item.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  }
                `}
                title={item.description}
              >
                <item.icon className="w-5 h-5" />
                <span className="hidden md:inline">{item.label}</span>
                
                {/* 徽章 */}
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* AI系统统计信息 */}
          <div className="hidden lg:flex items-center gap-4 text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-lg">
                <Brain className="w-4 h-4 text-blue-600" />
                <span className="text-blue-900 font-medium">
                  {stats.total} 个数据样本
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-lg">
                <Zap className="w-4 h-4 text-green-600" />
                <span className="text-green-900 font-medium">
                  5 个智能体
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-purple-50 rounded-lg">
                <Layers className="w-4 h-4 text-purple-600" />
                <span className="text-purple-900 font-medium">
                  {stats.categories} 个类别
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
