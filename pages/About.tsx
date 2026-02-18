
import React from 'react';
import { Page } from '../types';
import { CORE_COMPETENCIES, PROCESS_STEPS } from '../constants';

interface AboutProps {
  onNavigate: (page: Page) => void;
}

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="animate-fade-in font-sans">
      {/* Header - Deep Navy */}
      <div className="bg-[#14263D] py-24 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-white mb-6 uppercase tracking-widest">ABOUT 명지</h1>
          <p className="text-[#F36B1C] text-xl font-bold tracking-widest uppercase">Specialty Control Professional</p>
        </div>
      </div>

      {/* Greeting */}
      <section className="py-32 max-w-5xl mx-auto px-4 text-center">
        <blockquote className="text-3xl md:text-5xl font-bold text-[#14263D] mb-14 leading-tight">
          "보이지 않는 제어가, <br /><span className="text-[#F36B1C]">현장의 안전</span>을 만듭니다."
        </blockquote>
        <div className="space-y-8 text-[#5A6772] text-xl leading-relaxed font-medium max-w-4xl mx-auto">
          <p>특장차 제어는 단순한 제작이 아닙니다. 안전, 효율, 내구성을 설계하는 일입니다.</p>
          <p>현장에서 마주하는 다양한 변수와 가혹한 환경 속에서도 흔들림 없는 안정성을 제공하는 것, 그것이 명지가 추구하는 기술의 본질입니다.</p>
          <p>명지는 설계부터 제작, 테스트, 사후관리까지 전 과정을 책임지며, 고객의 현장에 가장 최적화된 맞춤형 솔루션을 제안합니다.</p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 bg-[#F4F6F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-[#F36B1C] font-bold tracking-widest uppercase text-sm mb-3 block">Corporate Philosophy</span>
            <h2 className="text-4xl font-bold text-[#14263D]">기업 철학</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "안전 최우선 설계", items: ["전기 안전 기준 준수", "과전류 차단 시스템 적용", "현장 테스트 필수 진행"] },
              { title: "정직한 제작", items: ["불필요한 사양 제안 지양", "실제 필요한 구성만 제안", "합리적인 유지보수 비용"] },
              { title: "기술 중심 회사", items: ["현장 경험 기반 설계", "실사용 환경 고려", "끊임없는 기술 혁신"] }
            ].map((phil, idx) => (
              <div key={idx} className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 group hover:-translate-y-2 transition-transform">
                <div className="text-[#14263D] mb-8">
                  <span className="text-6xl font-black opacity-10 group-hover:opacity-20 transition-opacity">0{idx + 1}</span>
                </div>
                <h3 className="text-2xl font-bold mb-8 text-[#14263D]">{phil.title}</h3>
                <ul className="space-y-4">
                  {phil.items.map((item, i) => (
                    <li key={i} className="flex items-center text-[#5A6772] font-bold text-base">
                      <div className="w-5 h-5 bg-[#F36B1C]/10 text-[#F36B1C] rounded flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-32 bg-[#14263D] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <span className="text-[#F36B1C] font-bold tracking-widest uppercase text-sm mb-4 block">Work Process</span>
            <h2 className="text-4xl font-bold mb-4">제작 프로세스</h2>
            <div className="w-16 h-1 bg-[#F36B1C] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-4 relative">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center group">
                {/* Connector shape (Visible on LG screens) */}
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[calc(50%+48px)] w-[calc(100%-96px)] h-px bg-white/20 z-0">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-[#F36B1C] rotate-45"></div>
                  </div>
                )}
                
                <div className="w-24 h-24 bg-white/5 text-white rounded-xl flex items-center justify-center font-bold text-3xl mb-8 group-hover:bg-[#F36B1C] group-hover:text-white transition-all shadow-xl border border-white/10 z-10">
                  {idx + 1}
                </div>
                <h4 className="font-bold mb-4 text-xl h-14 flex items-center">{step.title}</h4>
                <p className="text-gray-400 text-sm font-medium leading-relaxed px-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center bg-white">
        <h2 className="text-4xl font-bold mb-10 text-[#14263D]">성공적인 특장차 개발, 명지가 시작입니다.</h2>
        <button 
          onClick={() => onNavigate(Page.CONTACT)}
          className="px-16 py-6 bg-[#F36B1C] text-white rounded-xl font-bold hover:bg-[#d45a15] transition-all shadow-xl shadow-[#F36B1C]/20 text-xl transform hover:-translate-y-1"
        >
          지금 바로 상담하기
        </button>
      </section>
    </div>
  );
};

export default About;
