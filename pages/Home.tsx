
import React from 'react';
import { Page, ProductionCase } from '../types';
import { CORE_COMPETENCIES } from '../constants';

interface HomeProps {
  onNavigate: (page: Page, data?: any) => void;
  cases: ProductionCase[];
}

const Home: React.FC<HomeProps> = ({ onNavigate, cases }) => {
  return (
    <div className="animate-fade-in font-sans">
      {/* Hero Section - Deep Navy Background */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-[#14263D]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <div className="inline-block px-4 py-1.5 bg-[#F36B1C]/10 backdrop-blur-md rounded-full mb-6 border border-[#F36B1C]/30">
            <span className="text-[#F36B1C] font-bold tracking-widest uppercase text-xs md:text-sm">Specialty Vehicle Control Systems</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 leading-tight">
            보이지 않는 제어가,<br />현장의 안전을 만듭니다.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            단순한 제작을 넘어 안전, 효율, 내구성을 설계합니다.<br className="hidden md:block" />명지는 설계부터 사후관리까지 책임지는 당신의 기술 파트너입니다.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={() => onNavigate(Page.CONTACT)}
              className="px-10 py-5 bg-[#F36B1C] text-white rounded-xl font-bold hover:bg-[#d45a15] transition-all shadow-xl shadow-[#F36B1C]/20 text-lg transform hover:-translate-y-1"
            >
              상담 요청하기
            </button>
            <button 
              onClick={() => onNavigate(Page.CASES)}
              className="px-10 py-5 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-all border border-white/20 text-lg backdrop-blur-sm"
            >
              제작사례 보기
            </button>
          </div>
        </div>
      </section>

      {/* Core Competencies - Metallic Grey Text */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-[#F36B1C] font-bold tracking-widest uppercase text-sm mb-3 block">Our Strengths</span>
            <h3 className="text-4xl font-bold text-[#14263D] mb-6">핵심 역량</h3>
            <div className="w-16 h-1 bg-[#F36B1C] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {CORE_COMPETENCIES.map((comp, idx) => (
              <div key={idx} className="p-10 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-2xl hover:shadow-[#14263D]/5 transition-all group border border-transparent hover:border-gray-100">
                <div className="w-16 h-16 bg-[#14263D] text-white rounded-xl flex items-center justify-center mb-8 shadow-lg group-hover:bg-[#F36B1C] transition-colors">
                  {comp.icon}
                </div>
                <h4 className="text-2xl font-bold text-[#14263D] mb-4">{comp.title}</h4>
                <p className="text-[#5A6772] text-base leading-relaxed">{comp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Cases Preview */}
      <section className="py-32 bg-[#F4F6F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 space-y-4 md:space-y-0 text-center md:text-left">
            <div>
              <span className="text-[#F36B1C] font-bold tracking-widest uppercase text-sm mb-3 block">Latest Portfolio</span>
              <h3 className="text-4xl font-bold text-[#14263D] mb-4">최근 제작사례</h3>
              <p className="text-[#5A6772] font-medium">명지의 정밀한 기술이 적용된 최신 사례입니다.</p>
            </div>
            <button 
              onClick={() => onNavigate(Page.CASES)}
              className="flex items-center px-6 py-3 bg-white text-[#14263D] rounded-lg font-bold hover:bg-[#14263D] hover:text-white transition-all border border-gray-200 shadow-sm"
            >
              전체 보기
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {cases.slice(0, 4).map((caseItem) => (
              <div 
                key={caseItem.id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#14263D]/5 transition-all cursor-pointer border border-gray-100 transform hover:-translate-y-2"
                onClick={() => onNavigate(Page.CASE_DETAIL, caseItem)}
              >
                <div className="h-80 overflow-hidden relative">
                  <img src={caseItem.thumbnail} alt={caseItem.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 bg-[#14263D] text-white text-xs font-bold rounded uppercase tracking-wider shadow-lg">
                      {caseItem.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-2xl font-bold text-[#14263D] mb-3 group-hover:text-[#F36B1C] transition-colors">{caseItem.title}</h4>
                  <p className="text-[#5A6772] text-base line-clamp-2 leading-relaxed font-medium">{caseItem.overview.purpose}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Signal Orange Accents */}
      <section className="py-24 bg-[#14263D] relative overflow-hidden text-center">
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">현장에 맞는 제어 설계,<br className="md:hidden" /> 명지가 답을 드립니다.</h2>
          <p className="text-gray-300 mb-12 text-xl font-light">상담부터 설계, 제작, 유지보수까지 원스톱 솔루션을 경험하세요.</p>
          <button 
            onClick={() => onNavigate(Page.CONTACT)}
            className="bg-[#F36B1C] text-white px-12 py-5 rounded-xl font-bold hover:bg-[#d45a15] transition-all shadow-2xl shadow-[#F36B1C]/20 text-lg"
          >
            견적 문의하기
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
