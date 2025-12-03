import React, { useState } from 'react';
import InputForm from './components/InputForm';
import BuildingDisplay from './components/BuildingDisplay';
import { BrandParams, GenerationState } from './types';
import { constructCrystalPrompt } from './services/geminiService';
import { Sparkles, ChevronRight, Activity } from 'lucide-react';

const App: React.FC = () => {
  const [params, setParams] = useState<BrandParams>({
    productName: '',
    productType: '',
    ingredients: '',
    healthBenefit: '',
    aspectRatio: '16:9',
    mode: 'healthCategory' // Default to category mode
  });

  const [state, setState] = useState<GenerationState>({
    generatedPrompt: null
  });

  const handleGenerate = () => {
    const prompt = constructCrystalPrompt(params);
    setState({ generatedPrompt: prompt });
    
    // On mobile, scroll to result
    const resultElement = document.getElementById('result-section');
    if (resultElement) {
      setTimeout(() => {
        resultElement.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 relative overflow-x-hidden font-sans selection:bg-blue-100 selection:text-blue-900 pb-20">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-grid-slate-200 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-20%] w-[80%] h-[60%] bg-blue-400/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[40%] right-[-10%] w-[60%] h-[60%] bg-teal-400/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-20 bg-white/90 backdrop-blur-xl border-b border-slate-200 sticky top-0 shadow-sm transition-all duration-300">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 leading-none">
                헬시 바디 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">아키텍트</span>
              </h1>
              <span className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">USANA Health Visualizer</span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-4 py-6 md:py-8 flex flex-col gap-8">
        
        {/* User Guide Bar */}
        <section className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                 <div className="p-2 bg-slate-100 rounded-full">
                    <Sparkles className="w-4 h-4 text-slate-500" />
                 </div>
                 <h2 className="text-sm font-extrabold text-slate-700 uppercase tracking-wide">
                    사용 가이드
                 </h2>
            </div>
            
            <div className="w-full flex items-center justify-between sm:justify-end gap-2 text-xs font-bold text-slate-500">
                <div className="flex items-center gap-2 bg-slate-50/50 px-3 py-2 rounded-lg flex-1 sm:flex-none justify-center whitespace-nowrap">
                    <span className="w-5 h-5 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full text-[10px]">1</span>
                    메뉴 선택
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                <div className="flex items-center gap-2 bg-slate-50/50 px-3 py-2 rounded-lg flex-1 sm:flex-none justify-center whitespace-nowrap">
                    <span className="w-5 h-5 flex items-center justify-center bg-teal-100 text-teal-700 rounded-full text-[10px]">2</span>
                    설계 생성
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                <div className="flex items-center gap-2 bg-slate-50/50 px-3 py-2 rounded-lg flex-1 sm:flex-none justify-center whitespace-nowrap">
                    <span className="w-5 h-5 flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-full text-[10px]">3</span>
                    복사 & Gemini
                </div>
            </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Column: Input Form */}
            <div className="w-full lg:w-[480px] flex-shrink-0 flex flex-col gap-6">
            <InputForm 
                params={params} 
                setParams={setParams} 
                onSubmit={handleGenerate}
            />
            </div>

            {/* Right Column: Result Display */}
            <div id="result-section" className="w-full flex-grow min-h-[500px]">
                <div className="sticky top-24">
                    <BuildingDisplay prompt={state.generatedPrompt} />
                </div>
            </div>
        </div>

      </main>
    </div>
  );
};

export default App;