import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAppStore } from './store';
import Navigation from './components/Navigation';
import HerbGallery from './components/HerbGallery';
import HerbDetail from './components/HerbDetail';
import AIHome from './components/AIHome';
import ExpertCompare from './components/ExpertCompare';
import ChinaMap from './components/ChinaMap';
import ExpertDetail from './components/ExpertDetail';
import TCMNetwork from './components/TCMNetwork';

function App() {
  const { 
    currentView, 
    selectedHerb,
    selectedExpert,
    loadHerbs,
    loadExperts
  } = useAppStore();

  // 初始化加载数据
  useEffect(() => {
    loadHerbs();
    loadExperts();
    
    // 加载药方数据到localStorage
    const loadFormulas = async () => {
      try {
        const response = await fetch('/data/formulas.json');
        if (response.ok) {
          const formulasData = await response.json();
          localStorage.setItem('formulas', JSON.stringify(formulasData));
        }
      } catch (error) {
        console.error('Failed to load formulas data:', error);
      }
    };
    
    loadFormulas();
  }, [loadHerbs, loadExperts]);

  const renderContent = () => {
    switch (currentView) {
      case 'experts':
        return <AIHome />;
      
      case 'expert-detail':
        return selectedExpert ? <ExpertDetail expert={selectedExpert} /> : <AIHome />;
      
      case 'network':
        return <TCMNetwork />;
      
      case 'gallery':
        return <HerbGallery />;
      
      case 'detail':
        return selectedHerb ? <HerbDetail herb={selectedHerb} /> : <HerbGallery />;
      
      case 'compare':
        return <ExpertCompare />;
      
      case 'map':
        return <ChinaMap />;
      
      default:
        return <AIHome />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </div>
  );
}

export default App;
