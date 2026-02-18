
import React from 'react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#14263D] text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-20">
          <div>
            <div className="mb-8 cursor-pointer group inline-block" onClick={() => onNavigate(Page.HOME)}>
              <img 
                src="logo.png" 
                alt="MYOUNGJI 명지" 
                className="h-14 w-auto brightness-0 invert object-contain transition-transform group-hover:scale-105" 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<h3 class="text-3xl font-bold tracking-tighter">MYOUNGJI <span class="text-[#F36B1C]">명지</span></h3>';
                }}
              />
            </div>
            <p className="text-gray-400 text-base leading-relaxed font-medium max-w-sm">
              "보이지 않는 제어가, 현장의 안전을 만듭니다."<br />
              특장차 제어 시스템 설계 및 제작 전문 기업 명지(MYOUNGJI)입니다. 최고의 기술력으로 보답하겠습니다.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-8 text-[#F36B1C] uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <button onClick={() => onNavigate(Page.ABOUT)} className="text-gray-400 hover:text-white transition-colors text-base font-bold">회사 소개</button>
              </li>
              <li>
                <button onClick={() => onNavigate(Page.CASES)} className="text-gray-400 hover:text-white transition-colors text-base font-bold">제작 사례</button>
              </li>
              <li>
                <button onClick={() => onNavigate(Page.CONTACT)} className="text-gray-400 hover:text-white transition-colors text-base font-bold">상담 신청</button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-8 text-[#F36B1C] uppercase tracking-widest text-sm">Contact Us</h4>
            <div className="space-y-3">
              <p className="text-gray-400 text-sm font-medium">전북 김제시 백산면 지평선산단1길 214-65</p>
              <p className="text-gray-400 text-sm font-medium">T. 063-542-7477 | F. 063-542-7478</p>
              <p className="text-[#F36B1C] text-sm font-bold">M. 010-5526-3848</p>
              <div className="pt-2">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-tighter mb-1">이메일 문의</p>
                <p className="text-gray-400 text-xs">PM. automachine@myoungji.com</p>
                <p className="text-gray-400 text-xs">TM. master@myoungji.com</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 text-center text-xs text-gray-500 font-bold uppercase tracking-widest">
          <p>© {new Date().getFullYear()} MYOUNGJI. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
