
import React from 'react';
import { Page, ProductionCase } from '../types';

interface CaseDetailProps {
  caseData: ProductionCase;
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

const CaseDetail: React.FC<CaseDetailProps> = ({ caseData, onBack, onNavigate }) => {
  return (
    <div className="animate-fade-in bg-white min-h-screen">
      {/* Back Button & Header - Deep Navy */}
      <div className="bg-[#14263D] py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-start relative z-10">
          <button 
            onClick={onBack}
            className="text-gray-400 hover:text-[#F36B1C] transition-colors flex items-center mb-8 font-bold group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            목록으로 돌아가기
          </button>
          <span className="px-3 py-1 bg-[#F36B1C] text-white font-bold uppercase tracking-widest text-[10px] mb-4 rounded">{caseData.category}</span>
          <h1 className="text-3xl md:text-6xl font-bold text-white leading-tight">{caseData.title}</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-20">
            
            {/* Project Overview */}
            <section>
              <h2 className="text-2xl font-bold mb-8 border-l-4 border-[#F36B1C] pl-4 text-[#14263D]">프로젝트 개요</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "차량 종류", value: caseData.overview.type },
                  { label: "적용 산업군", value: caseData.overview.industry },
                  { label: "제작 목적", value: caseData.overview.purpose },
                  { label: "납품 지역", value: caseData.overview.location },
                  { label: "제작 기간", value: caseData.overview.duration }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-[#5A6772] font-bold uppercase tracking-wider">{item.label}</span>
                    <span className="text-[#14263D] font-bold text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Customer Requirements */}
            <section>
              <h2 className="text-2xl font-bold mb-8 border-l-4 border-[#F36B1C] pl-4 text-[#14263D]">고객 요청사항</h2>
              <ul className="space-y-4">
                {caseData.requirements.map((req, i) => (
                  <li key={i} className="flex items-start p-6 bg-gray-50 rounded-xl border-l-4 border-[#5A6772]">
                    <span className="text-[#F36B1C] font-black mr-4 text-xl opacity-80">0{i+1}</span>
                    <p className="text-[#14263D] font-medium leading-relaxed">{req}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Solution */}
            <section>
              <h2 className="text-2xl font-bold mb-8 border-l-4 border-[#F36B1C] pl-4 text-[#14263D]">명지의 솔루션</h2>
              <div className="space-y-10">
                {[
                  { title: "제어 시스템 설계 방식", content: caseData.solution.design },
                  { title: "배선 및 전장 구성", content: caseData.solution.wiring },
                  { title: "안전 설계 적용 내용", content: caseData.solution.safety },
                  { title: "테스트 및 검증 과정", content: caseData.solution.test }
                ].map((sol, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-start group border-b border-gray-100 pb-10 group-last:border-0">
                    <div className="md:w-56 font-bold text-[#F36B1C] mb-3 md:mb-0 text-sm uppercase tracking-widest">
                      {sol.title}
                    </div>
                    <div className="flex-1 text-[#5A6772] font-medium leading-relaxed">
                      {sol.content}
                    </div>
                  </div>
                ))}
              </div>
            </section>

             {/* Results */}
             <section className="bg-[#14263D] p-12 rounded-2xl text-white shadow-xl">
              <h2 className="text-2xl font-bold mb-10 text-center uppercase tracking-widest text-[#F36B1C]">제작 결과</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  { label: "작업 효율 향상", value: caseData.results.efficiency },
                  { label: "안정성 개선", value: caseData.results.stability },
                  { label: "유지보수 절감", value: caseData.results.maintenance }
                ].map((res, i) => (
                  <div key={i} className="text-center">
                    <p className="text-gray-400 text-xs font-bold mb-3 uppercase tracking-wider">{res.label}</p>
                    <p className="text-2xl font-bold">{res.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Gallery Images */}
            {caseData.images && caseData.images.length > 0 && (
              <section>
                <div className="flex justify-between items-end mb-8 border-l-4 border-[#F36B1C] pl-4">
                  <h2 className="text-2xl font-bold text-[#14263D]">현장 이미지 갤러리</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {caseData.images.map((img, i) => (
                    <div key={i} className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 bg-gray-50 border border-gray-100">
                      <img 
                        src={img} 
                        alt={`현장 사진 ${i+1}`} 
                        className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700" 
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-xs font-bold mb-6 text-[#5A6772] uppercase tracking-widest border-b border-gray-100 pb-4">적용 기술 스택</h3>
                <div className="flex flex-wrap gap-2 pt-4">
                  {caseData.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 border border-gray-200 rounded text-[11px] font-bold text-[#14263D]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sidebar CTA Card */}
              <div className="bg-[#14263D] p-10 rounded-2xl text-white text-center shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-[#F36B1C] rounded-full blur-3xl opacity-20"></div>
                <div className="w-16 h-16 bg-[#F36B1C] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <p className="text-xl font-bold mb-2 relative z-10">상담이 필요하신가요?</p>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed font-medium relative z-10">비슷한 프로젝트의 제어 설계 및<br />견적이 궁금하시다면 문의주세요.</p>
                <button 
                  onClick={() => onNavigate(Page.CONTACT)}
                  className="w-full bg-[#F36B1C] text-white font-bold py-4 rounded-xl hover:bg-[#d45a15] transition-all shadow-xl text-sm relative z-10 transform active:scale-95"
                >
                  무료 견적 상담 신청
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;
