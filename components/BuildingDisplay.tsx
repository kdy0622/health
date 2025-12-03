
import React, { useState } from 'react';
import { Copy, Check, Terminal, FileJson } from 'lucide-react';

interface BuildingDisplayProps {
  prompt: string | null;
}

const BuildingDisplay: React.FC<BuildingDisplayProps> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (prompt) {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!prompt) {
    return (
      <div className="w-full h-full min-h-[400px] bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group">
         <div className="absolute inset-0 bg-grid-slate-200 opacity-50"></div>
         <div className="relative z-10">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
            <Terminal className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-2">설계지시서</h3>
            <p className="text-slate-400 text-sm max-w-[200px] mx-auto leading-relaxed">
            왼쪽 패널에서 제품을 선택하고 생성 버튼을 눌러주세요.
            </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-900 text-slate-300 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[600px] md:h-full relative border border-slate-700 ring-4 ring-slate-200/50">
      
      {/* Header */}
      <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex items-center gap-2">
            <FileJson className="w-4 h-4 text-teal-500" />
            <span className="text-xs font-mono font-bold text-slate-400">PROMPT_GENERATED</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-grow p-6 overflow-auto custom-scrollbar relative">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20"></div>
        <pre className="relative z-10 whitespace-pre-wrap font-mono text-xs md:text-sm leading-relaxed text-teal-50/90 selection:bg-teal-900 selection:text-white">
            {prompt}
        </pre>
      </div>

      {/* Action Bar */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 sticky bottom-0 z-30 space-y-3">
        
        <div className="flex items-start gap-3 p-3 rounded-lg bg-teal-900/20 border border-teal-900/50">
             <div className="mt-1 w-2 h-2 rounded-full bg-teal-500 animate-pulse flex-shrink-0"></div>
             <p className="text-[11px] text-teal-400 leading-snug">
                <strong className="block mb-1 text-teal-300">사용 가이드:</strong>
                1. 복사 버튼 클릭 → 2. Gemini에 붙여넣기 → 3. <span className="underline decoration-teal-500/50">제품 PDF 파일 업로드 필수</span>
             </p>
        </div>

        <button 
          onClick={handleCopy}
          className={`w-full py-4 rounded-xl font-bold text-base tracking-wide shadow-lg transition-all transform flex items-center justify-center gap-3
            ${copied 
              ? 'bg-teal-500 text-slate-900 scale-[0.98]' 
              : 'bg-white text-slate-900 hover:bg-slate-200 hover:scale-[1.02] active:scale-[0.98]'
            }`}
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" /> Copied to Clipboard
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" /> Copy Prompt Code
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BuildingDisplay;
