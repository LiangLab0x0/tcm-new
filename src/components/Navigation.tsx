import React from 'react';
import { Home, Layers, Map, Users, BookOpen, Network } from 'lucide-react';
import { useAppStore } from '../store';

const Navigation: React.FC = () => {
  const { currentView, setCurrentView, expertCompareList, getStats } = useAppStore();
  const stats = getStats();

  const navItems = [
    {
      id: 'experts' as const,
      label: '中医大师',
      icon: Home,
      description: '权威专家介绍'
    },
    {
      id: 'network' as const,
      label: '中医脉络',
      icon: Network,
      description: '知识关系图谱'
    },
    {
      id: 'gallery' as const,
      label: '药材图鉴',
      icon: BookOpen,
      description: '浏览所有药材'
    },
    {
      id: 'map' as const,
      label: '产地地图',
      icon: Map,
      description: '中国中医药行业地理分布'
    },
    {
      id: 'compare' as const,
      label: '专家对比',
      icon: Users,
      description: '对比专家信息',
      badge: expertCompareList.length > 0 ? expertCompareList.length : undefined
    }
  ];

  return (
    <nav className="bg-white border-b-2 border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo和标题 */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              🌿
            </div>
            {/* 桌面端显示完整标题，移动端隐藏 */}
            <div className="hidden lg:block">
              <h1 className="text-xl font-bold text-gray-800">中医药专家智能系统 v9.0</h1>
              <p className="text-xs text-gray-500">专家引领 • 药材精研 • 传承创新</p>
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

          {/* 统计信息 */}
          <div className="hidden lg:flex items-center gap-4 text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-lg">
                <BookOpen className="w-4 h-4 text-green-600" />
                <span className="text-green-900 font-medium">
                  {stats.total} 种药材
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-lg">
                <Map className="w-4 h-4 text-blue-600" />
                <span className="text-blue-900 font-medium">
                  {stats.provinces} 个产地
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
