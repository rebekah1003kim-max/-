
import React, { useState } from 'react';
import { Page, ProductionCase } from '../types';
import { CASE_CATEGORIES } from '../constants';

interface CasesProps {
  onNavigate: (page: Page, data?: any) => void;
  cases: ProductionCase[];
}

const Cases: React.FC<CasesProps> = ({ onNavigate, cases }) => {
  const [activeCategory, setActiveCategory] = useState<string>("전체");

  const filteredCases = activeCategory === "전체" 
    ? cases 
    : cases.filter(c => c.category === activeCategory);

  return (
    <div className="animate-fade-in bg-[#F4F6F8] min-h-screen pb-32">
      {/* Page Header - Deep Navy & Centered Text */}
      <div className="bg-[#14263D] py-24 relative overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-5xl font-bold text-white mb-6 uppercase tracking-widest">제작사례</h1>
          <p className="text-gray-400 text-xl font-medium">명지가 해결해온 다양한 특장 제어 솔루션을 소개합니다.</p>
        </div>
      </div>

      {/* Filter Chips - Navy & Grey */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-20 overflow-x-auto">
        <div className="flex space-x-3 pb-6">
          <button
            onClick={() => setActiveCategory("전체")}
            className={`px-8 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all border shadow-sm ${
              activeCategory === "전체" 
              ? "bg-[#14263D] text-white border-[#14263D] shadow-lg shadow-[#14263D]/20" 
              : "bg-white text-[#5A6772] border-gray-200 hover:bg-gray-50"
            }`}
          >
            전체보기
          </button>
          {CASE_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all border shadow-sm ${
                activeCategory === cat 
                ? "bg-[#14263D] text-white border-[#14263D] shadow-lg shadow-[#14263D]/20" 
                : "bg-white text-[#5A6772] border-gray-200 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid - Refined Card UI */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredCases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredCases.map((caseItem) => (
              <div 
                key={caseItem.id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer transform hover:-translate-y-2"
                onClick={() => onNavigate(Page.CASE_DETAIL, caseItem)}
              >
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={caseItem.thumbnail} 
                    alt={caseItem.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-3 py-1 bg-[#14263D]/90 backdrop-blur-md text-white text-[10px] font-bold rounded uppercase tracking-widest shadow-xl">
                      {caseItem.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-[#14263D] mb-6 group-hover:text-[#F36B1C] transition-colors leading-tight line-clamp-2">
                    {caseItem.title}
                  </h3>
                  <div className="space-y-3 mb-8 text-sm">
                    <p className="flex justify-between items-center border-b border-gray-50 pb-2">
                      <span className="text-[#5A6772] font-bold uppercase text-[10px] tracking-widest">차량 종류</span>
                      <span className="text-[#14263D] font-bold">{caseItem.overview.type}</span>
                    </p>
                    <p className="flex justify-between items-center border-b border-gray-50 pb-2">
                      <span className="text-[#5A6772] font-bold uppercase text-[10px] tracking-widest">납품 지역</span>
                      <span className="text-[#14263D] font-bold">{caseItem.overview.location}</span>
                    </p>
                  </div>
                  <div className="pt-4 flex items-center text-[#14263D] font-bold text-xs uppercase tracking-widest group-hover:text-[#F36B1C] transition-colors">
                    자세히 보기
                    <div className="ml-3 w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-[#F36B1C] group-hover:text-white transition-all shadow-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <div className="w-20 h-20 bg-gray-100 text-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-[#5A6772] font-medium text-lg">해당 카테고리의 제작사례가 준비 중입니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cases;
