import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Herb, SearchFilters, ExpertSearchFilters, UIState, TCMExpert } from '../types';

interface AppState extends UIState {
  // 数据状态
  herbs: Herb[];
  experts: TCMExpert[];
  filteredHerbs: Herb[];
  filteredExperts: TCMExpert[];
  searchFilters: SearchFilters;
  expertSearchFilters: ExpertSearchFilters;
  
  // 数据操作
  setHerbs: (herbs: Herb[]) => void;
  setExperts: (experts: TCMExpert[]) => void;
  loadHerbs: () => Promise<void>;
  loadExperts: () => Promise<void>;
  
  // 搜索和过滤
  updateSearchFilters: (filters: Partial<SearchFilters>) => void;
  updateExpertSearchFilters: (filters: Partial<ExpertSearchFilters>) => void;
  filterHerbs: () => void;
  filterExperts: () => void;
  
  // 专业功能
  viewHistory: string[];
  addToHistory: (herbId: string) => void;
  
  // UI状态管理
  setCurrentView: (view: UIState['currentView']) => void;
  setSelectedHerb: (herb: Herb | null) => void;
  setSelectedExpert: (expert: TCMExpert | null) => void;
  addToCompare: (herb: Herb) => void;
  removeFromCompare: (herbId: string) => void;
  clearCompare: () => void;
  
  // 专家对比功能
  expertCompareList: TCMExpert[];
  addExpertToCompare: (expert: TCMExpert) => void;
  removeExpertFromCompare: (expertId: string) => void;
  clearExpertCompare: () => void;
  setSelectedProvinces: (provinces: string[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // 统计数据
  getStats: () => {
    total: number;
    categories: number;
    provinces: number;
  };
}

const initialFilters: SearchFilters = {
  searchTerm: '',
  category: '',
  nature: '',
  taste: '',
  meridian: '',
  origin: ''
};

const initialExpertFilters: ExpertSearchFilters = {
  searchTerm: '',
  category: '',
  school: '',
  specialty: '',
  region: '',
  grade: '',
  lineage: '',
  mentor: '',
  inheritanceType: '',
  specializedDisease: '',
  clinicalStrength: '',
  theoreticalContribution: '',
  era: '',
  experienceRange: '',
  influenceLevel: '',
  reputationLevel: ''
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // 初始状态
      herbs: [],
      experts: [],
      filteredHerbs: [],
      filteredExperts: [],
      searchFilters: initialFilters,
      expertSearchFilters: initialExpertFilters,
      viewHistory: [],
      currentView: 'experts',
      selectedHerb: null,
      selectedExpert: null,
      compareList: [],
      expertCompareList: [],
      selectedProvinces: [],
      isLoading: false,
      error: null,

      // 数据操作
      setHerbs: (herbs) => {
        set({ herbs });
        get().filterHerbs();
      },

      setExperts: (experts) => {
        set({ experts });
        get().filterExperts();
      },

      loadHerbs: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('/data/herbs_with_images.json');
          if (!response.ok) {
            throw new Error('Failed to load herbs data');
          }
          const herbs = await response.json();
          get().setHerbs(herbs);
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Unknown error' });
        } finally {
          set({ isLoading: false });
        }
      },

      loadExperts: async () => {
        try {
          const response = await fetch('/data/experts.json');
          if (!response.ok) {
            throw new Error('Failed to load experts data');
          }
          const experts = await response.json();
          get().setExperts(experts);
        } catch (error) {
          console.error('Error loading experts:', error);
        }
      },

      // 搜索和过滤
      updateSearchFilters: (newFilters) => {
        set(state => ({
          searchFilters: { ...state.searchFilters, ...newFilters }
        }));
        get().filterHerbs();
      },

      filterHerbs: () => {
        const { herbs, searchFilters } = get();
        let filtered = [...herbs];

        // 文本搜索
        if (searchFilters.searchTerm.trim()) {
          const term = searchFilters.searchTerm.toLowerCase();
          filtered = filtered.filter(herb =>
            herb.name.toLowerCase().includes(term) ||
            herb.pinyin.toLowerCase().includes(term) ||
            herb.englishName?.toLowerCase().includes(term) ||
            herb.functions.some(func => func.toLowerCase().includes(term)) ||
            herb.indications.some(indication => indication.toLowerCase().includes(term))
          );
        }

        // 类别过滤
        if (searchFilters.category) {
          filtered = filtered.filter(herb => herb.category === searchFilters.category);
        }

        // 性味过滤
        if (searchFilters.nature) {
          filtered = filtered.filter(herb => herb.nature === searchFilters.nature);
        }

        if (searchFilters.taste) {
          filtered = filtered.filter(herb => herb.taste.includes(searchFilters.taste));
        }

        // 归经过滤
        if (searchFilters.meridian) {
          filtered = filtered.filter(herb => 
            herb.meridians?.includes(searchFilters.meridian)
          );
        }

        // 产地过滤
        if (searchFilters.origin) {
          filtered = filtered.filter(herb => 
            herb.origin?.includes(searchFilters.origin)
          );
        }

        set({ filteredHerbs: filtered });
      },

      // 专家搜索和过滤
      updateExpertSearchFilters: (newFilters) => {
        set(state => ({
          expertSearchFilters: { ...state.expertSearchFilters, ...newFilters }
        }));
        get().filterExperts();
      },

      filterExperts: () => {
        const { experts, expertSearchFilters } = get();
        let filtered = [...experts];

        // 文本搜索
        if (expertSearchFilters.searchTerm.trim()) {
          const term = expertSearchFilters.searchTerm.toLowerCase();
          filtered = filtered.filter(expert =>
            expert.name.toLowerCase().includes(term) ||
            expert.pinyin?.toLowerCase().includes(term) ||
            expert.englishName?.toLowerCase().includes(term) ||
            expert.specialty?.some(spec => spec.toLowerCase().includes(term)) ||
            expert.specializations?.some(spec => spec.toLowerCase().includes(term)) ||
            expert.specializedDiseases?.some(disease => disease.toLowerCase().includes(term)) ||
            expert.theoreticalContributions?.some(contrib => contrib.toLowerCase().includes(term))
          );
        }

        // 专家类别过滤
        if (expertSearchFilters.category) {
          filtered = filtered.filter(expert => expert.category === expertSearchFilters.category);
        }

        // 医学流派过滤
        if (expertSearchFilters.school) {
          filtered = filtered.filter(expert => expert.school === expertSearchFilters.school);
        }

        // 专业专长过滤
        if (expertSearchFilters.specialty) {
          filtered = filtered.filter(expert => 
            expert.specialty?.includes(expertSearchFilters.specialty) ||
            expert.specializations?.includes(expertSearchFilters.specialty)
          );
        }

        // 地域过滤
        if (expertSearchFilters.region) {
          filtered = filtered.filter(expert => 
            expert.place_of_origin?.includes(expertSearchFilters.region) ||
            expert.regions?.some(region => region.province.includes(expertSearchFilters.region)) ||
            expert.influenceAreas?.includes(expertSearchFilters.region)
          );
        }

        // 专家等级过滤
        if (expertSearchFilters.grade) {
          filtered = filtered.filter(expert => expert.grade === expertSearchFilters.grade);
        }

        // 师承导师过滤
        if (expertSearchFilters.mentor) {
          filtered = filtered.filter(expert => 
            expert.lineage?.mentorName?.toLowerCase().includes(expertSearchFilters.mentor.toLowerCase()) ||
            expert.mentor?.toLowerCase().includes(expertSearchFilters.mentor.toLowerCase())
          );
        }

        // 师承谱系过滤
        if (expertSearchFilters.lineage) {
          filtered = filtered.filter(expert => 
            expert.lineage?.lineageName?.toLowerCase().includes(expertSearchFilters.lineage.toLowerCase()) ||
            expert.academicLineage?.toLowerCase().includes(expertSearchFilters.lineage.toLowerCase())
          );
        }

        // 传承类型过滤
        if (expertSearchFilters.inheritanceType) {
          filtered = filtered.filter(expert => 
            expert.lineage?.inheritanceMethod?.includes(expertSearchFilters.inheritanceType) ||
            expert.inheritanceInfo?.inheritanceType === expertSearchFilters.inheritanceType
          );
        }

        // 擅长疾病过滤
        if (expertSearchFilters.specializedDisease) {
          filtered = filtered.filter(expert => 
            expert.specializedDiseases?.some(disease => 
              disease.toLowerCase().includes(expertSearchFilters.specializedDisease.toLowerCase())
            )
          );
        }

        // 经验年限范围过滤
        if (expertSearchFilters.experienceRange) {
          const [min, max] = expertSearchFilters.experienceRange.split('-').map(Number);
          filtered = filtered.filter(expert => {
            const exp = expert.experience || 0;
            if (max) {
              return exp >= min && exp <= max;
            } else {
              return exp >= min;
            }
          });
        }

        // 影响力等级过滤
        if (expertSearchFilters.influenceLevel) {
          const level = Number(expertSearchFilters.influenceLevel);
          filtered = filtered.filter(expert => {
            if (!expert.influence) return false;
            // 使用综合评分：引用数、学生数、获奖数的加权平均
            const score = (expert.influence.citationCount * 0.4 + 
                          expert.influence.studentCount * 0.3 + 
                          expert.influence.awardCount * 0.3) / 100;
            return score >= level;
          });
        }

        set({ filteredExperts: filtered });
      },

      // 专业功能
      addToHistory: (herbId) => {
        set(state => {
          const newHistory = [herbId, ...state.viewHistory.filter(id => id !== herbId)];
          return { viewHistory: newHistory.slice(0, 20) }; // 保留最近20条记录
        });
      },

      // UI状态管理
      setCurrentView: (view) => set({ currentView: view }),
      
      setSelectedHerb: (herb) => {
        set({ selectedHerb: herb });
        if (herb) {
          get().addToHistory(herb.id);
        }
      },

      setSelectedExpert: (expert) => {
        set({ selectedExpert: expert });
      },

      addToCompare: (herb) => {
        set(state => {
          if (state.compareList.length >= 3) return state; // 最多比较3个
          if (state.compareList.find(h => h.id === herb.id)) return state; // 避免重复
          return { compareList: [...state.compareList, herb] };
        });
      },

      removeFromCompare: (herbId) => {
        set(state => ({
          compareList: state.compareList.filter(h => h.id !== herbId)
        }));
      },

      clearCompare: () => set({ compareList: [] }),

      // 专家对比功能
      addExpertToCompare: (expert) => {
        set(state => {
          if (state.expertCompareList.length >= 3) return state; // 最多比较3个
          if (state.expertCompareList.find(e => e.id === expert.id)) return state; // 避免重复
          return { expertCompareList: [...state.expertCompareList, expert] };
        });
      },

      removeExpertFromCompare: (expertId) => {
        set(state => ({
          expertCompareList: state.expertCompareList.filter(e => e.id !== expertId)
        }));
      },

      clearExpertCompare: () => set({ expertCompareList: [] }),

      setSelectedProvinces: (provinces) => set({ selectedProvinces: provinces }),

      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),

      // 统计数据
      getStats: () => {
        const { herbs } = get();
        const categories = new Set(herbs.map(h => h.category));
        const provinces = new Set(herbs.flatMap(h => h.origin || []));
        
        return {
          total: herbs.length,
          categories: categories.size,
          provinces: provinces.size
        };
      }
    }),
    {
      name: 'professional-tcm-gallery-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        viewHistory: state.viewHistory
      })
    }
  )
);
