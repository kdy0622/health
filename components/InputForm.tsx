
import React, { useState } from 'react';
import { BrandParams } from '../types';
import { 
  Monitor, Smartphone, Activity, Heart, Shield, 
  Utensils, Eye, Bone, Brain, Zap, Baby, Scale,
  User, Package, CheckCircle2, ChevronDown, ChevronUp, Sparkles, UserCheck, Layers
} from 'lucide-react';
import { HEALTH_CATEGORIES, USANA_PRODUCTS, INDIVIDUAL_PRODUCT_GROUPS, ProductExtended } from '../products';

interface InputFormProps {
  params: BrandParams;
  setParams: React.Dispatch<React.SetStateAction<BrandParams>>;
  onSubmit: () => void;
}

type TabMode = 'wholeBody' | 'category' | 'product';

const InputForm: React.FC<InputFormProps> = ({ params, setParams, onSubmit }) => {
  const [activeTab, setActiveTab] = useState<TabMode>('wholeBody');
  const [expandedProductGroupId, setExpandedProductGroupId] = useState<string | null>(null);

  const handleTabChange = (tab: TabMode) => {
    setActiveTab(tab);
    if (tab === 'wholeBody') {
        handleWholeBodySelect();
    } else if (tab === 'category') {
        if (params.mode !== 'healthCategory') {
            // Default select first category
             handleCategorySelect(HEALTH_CATEGORIES[0].id);
        }
    }
    // For product tab, we wait for user to select a group
  };

  const handleWholeBodySelect = () => {
      setParams(prev => ({
          ...prev,
          productName: "Whole Body Health",
          productType: "All Products",
          mode: 'wholeBodyAll',
          selectedProductIds: undefined
      }));
  };

  const handleCategorySelect = (categoryId: string) => {
    const category = HEALTH_CATEGORIES.find(c => c.id === categoryId);
    if (category) {
        setParams(prev => ({
            ...prev,
            productName: category.label,
            productType: "Health Category Bundle",
            ingredients: "Complex Formula", 
            healthBenefit: category.description,
            targetBodyPart: category.targetSystem,
            mode: 'healthCategory',
            selectedProductIds: category.productIds
        }));
    }
  };

  const handleProductSelect = (product: ProductExtended) => {
      setParams(prev => ({
          ...prev,
          productName: product.name,
          productType: product.category,
          ingredients: product.ingredients,
          healthBenefit: product.benefit,
          targetBodyPart: product.targetBodyPart,
          colorTheme: product.colorTheme,
          mode: 'single',
          selectedProductIds: undefined
      }));
  };

  const handleRatioChange = (ratio: '16:9' | '9:16') => {
    setParams(prev => ({ ...prev, aspectRatio: ratio }));
  };

  const toggleProductGroup = (groupId: string) => {
      setExpandedProductGroupId(prev => prev === groupId ? null : groupId);
  };

  // Helper to get icon for category
  const getCategoryIcon = (id: string) => {
    switch(id) {
        case 'blood_health': return <Heart className="w-6 h-6 text-rose-500" />;
        case 'immune_health': return <Shield className="w-6 h-6 text-blue-500" />;
        case 'gut_health': return <Activity className="w-6 h-6 text-emerald-500" />;
        case 'digestion': return <Utensils className="w-6 h-6 text-orange-500" />;
        case 'eye_health': return <Eye className="w-6 h-6 text-amber-500" />;
        case 'bone_joint': return <Bone className="w-6 h-6 text-slate-500" />;
        case 'brain_health': return <Brain className="w-6 h-6 text-purple-500" />;
        case 'liver_fatigue': return <Zap className="w-6 h-6 text-yellow-500" />;
        case 'child_health': return <Baby className="w-6 h-6 text-pink-500" />;
        case 'diet': return <Scale className="w-6 h-6 text-teal-500" />;
        default: return <Activity className="w-6 h-6 text-slate-500" />;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* 1. Main Navigation Tabs (3-Way) */}
      <div className="grid grid-cols-3 p-1.5 bg-slate-100 rounded-2xl gap-2">
        <button
            onClick={() => handleTabChange('wholeBody')}
            className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300
            ${activeTab === 'wholeBody' 
                ? 'bg-white text-indigo-700 shadow-md ring-1 ring-black/5' 
                : 'text-slate-400 hover:text-slate-600'}`}
        >
            <UserCheck className="w-5 h-5" />
            전신 건강
        </button>
        <button
            onClick={() => handleTabChange('category')}
            className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300
            ${activeTab === 'category' 
                ? 'bg-white text-blue-700 shadow-md ring-1 ring-black/5' 
                : 'text-slate-400 hover:text-slate-600'}`}
        >
            <Layers className="w-5 h-5" />
            기능별 솔루션
        </button>
        <button
            onClick={() => handleTabChange('product')}
            className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300
            ${activeTab === 'product' 
                ? 'bg-white text-teal-700 shadow-md ring-1 ring-black/5' 
                : 'text-slate-400 hover:text-slate-600'}`}
        >
            <Package className="w-5 h-5" />
            제품별 상세
        </button>
      </div>

      {/* 2. Content Area */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* VIEW 1: Whole Body */}
        {activeTab === 'wholeBody' && (
            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-6 text-center space-y-4 shadow-sm">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                    <UserCheck className="w-10 h-10 text-indigo-600" />
                </div>
                <div>
                    <h3 className="text-xl font-black text-indigo-900">전신 건강 토탈 케어</h3>
                    <p className="text-sm text-indigo-600/80 font-medium mt-2">
                        유사나의 모든 핵심 제품이 우리 몸 어디에 작용하는지<br/>한 눈에 확인하는 전신 크리스탈 맵을 생성합니다.
                    </p>
                </div>
                <div className="pt-2">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-xs font-bold text-indigo-500 shadow-sm">
                        <CheckCircle2 className="w-4 h-4" /> 헬스팩
                        <CheckCircle2 className="w-4 h-4" /> 바이오메가
                        <CheckCircle2 className="w-4 h-4" /> 프로후라바놀...
                    </div>
                </div>
            </div>
        )}

        {/* VIEW 2: Health Categories */}
        {activeTab === 'category' && (
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-sm font-extrabold text-slate-500 uppercase tracking-wider">
                        기능별 제품 번들 선택
                    </h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {HEALTH_CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => handleCategorySelect(cat.id)}
                            className={`relative p-5 rounded-2xl border-2 text-left flex flex-col gap-3 transition-all duration-200
                                ${params.mode === 'healthCategory' && params.productName === cat.label
                                    ? 'bg-blue-50/50 border-blue-500 ring-2 ring-blue-200 shadow-lg scale-[1.02]'
                                    : 'bg-white border-slate-100 hover:border-blue-300 hover:bg-slate-50 hover:shadow-md'
                                }`}
                        >
                            <div className="flex items-center justify-between w-full">
                                <span className={`text-lg font-bold ${params.mode === 'healthCategory' && params.productName === cat.label ? 'text-blue-800' : 'text-slate-700'}`}>
                                    {cat.label}
                                </span>
                                {getCategoryIcon(cat.id)}
                            </div>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                {cat.description}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        )}

        {/* VIEW 3: Individual Products */}
        {activeTab === 'product' && (
             <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-sm font-extrabold text-slate-500 uppercase tracking-wider">
                        카테고리별 단일 제품 선택
                    </h3>
                </div>

                <div className="space-y-3">
                    {INDIVIDUAL_PRODUCT_GROUPS.map((group) => (
                        <div key={group.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                            <button 
                                onClick={() => toggleProductGroup(group.id)}
                                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                            >
                                <span className="font-bold text-slate-700 text-sm sm:text-base">{group.label}</span>
                                {expandedProductGroupId === group.id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                            </button>
                            
                            {expandedProductGroupId === group.id && (
                                <div className="p-3 grid grid-cols-1 gap-2 bg-white border-t border-slate-100">
                                    {group.productIds.map(pid => {
                                        const product = USANA_PRODUCTS.find(p => p.id === pid);
                                        if (!product) return null;
                                        return (
                                            <button
                                                key={product.id}
                                                onClick={() => handleProductSelect(product)}
                                                className={`p-3 rounded-xl text-left transition-all flex items-center justify-between group
                                                    ${params.productName === product.name 
                                                        ? 'bg-teal-50 border border-teal-500 text-teal-800 shadow-sm' 
                                                        : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50 hover:border-teal-200'
                                                    }`}
                                            >
                                                <div>
                                                    <div className="font-bold text-sm">{product.name}</div>
                                                    <div className="text-[10px] text-slate-400 mt-1 truncate max-w-[200px]">{product.benefit}</div>
                                                </div>
                                                {params.productName === product.name && <CheckCircle2 className="w-4 h-4 text-teal-500" />}
                                            </button>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
             </div>
        )}

      </div>

      {/* 3. Screen Ratio */}
      <section className="space-y-3 mt-4">
         <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
            화면 비율 설정
        </h3>
        <div className="grid grid-cols-2 gap-4">
            <button 
                onClick={() => handleRatioChange('16:9')}
                className={`relative overflow-hidden p-4 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2
                    ${params.aspectRatio === '16:9' 
                    ? 'bg-white border-blue-600 shadow-lg ring-2 ring-blue-100' 
                    : 'bg-slate-50 border-transparent text-slate-400 hover:bg-white hover:border-slate-200'
                }`}
            >
                <Monitor className={`w-8 h-8 ${params.aspectRatio === '16:9' ? 'text-blue-600' : 'text-slate-400'}`} />
                <span className={`text-sm font-bold ${params.aspectRatio === '16:9' ? 'text-slate-800' : 'text-slate-500'}`}>가로형 (16:9)</span>
            </button>
            <button 
                onClick={() => handleRatioChange('9:16')}
                className={`relative overflow-hidden p-4 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2
                    ${params.aspectRatio === '9:16' 
                    ? 'bg-white border-teal-600 shadow-lg ring-2 ring-teal-100' 
                    : 'bg-slate-50 border-transparent text-slate-400 hover:bg-white hover:border-slate-200'
                }`}
            >
                <Smartphone className={`w-8 h-8 ${params.aspectRatio === '9:16' ? 'text-teal-600' : 'text-slate-400'}`} />
                <span className={`text-sm font-bold ${params.aspectRatio === '9:16' ? 'text-slate-800' : 'text-slate-500'}`}>세로형 (9:16)</span>
            </button>
        </div>
      </section>

      {/* Generate Button */}
      <button
        onClick={onSubmit}
        disabled={activeTab !== 'wholeBody' && !params.productName}
        className={`w-full py-5 rounded-2xl font-black text-xl tracking-wide shadow-xl transition-all transform flex items-center justify-center gap-3 mt-4
          ${(activeTab !== 'wholeBody' && !params.productName)
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:from-blue-600 hover:to-teal-500 hover:scale-[1.02] hover:shadow-2xl'
          }`}
      >
        <Sparkles className="w-6 h-6 animate-pulse" /> 
        {activeTab === 'wholeBody' 
            ? '전신 건강 설계 생성' 
            : activeTab === 'category' 
                ? '기능별 설계 생성' 
                : '제품 상세 설계 생성'}
      </button>

    </div>
  );
};

export default InputForm;
