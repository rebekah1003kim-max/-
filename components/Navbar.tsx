
import React, { useState } from 'react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'ABOUT 명지', page: Page.ABOUT },
    { label: '제작사례', page: Page.CASES },
    { label: '문의하기', page: Page.CONTACT },
    { label: 'Admin', page: Page.ADMIN },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer group" 
            onClick={() => onNavigate(Page.HOME)}
          >
            <div className="relative h-12 md:h-14 flex items-center">
              <img 
                src="logo.png" 
                alt="MYOUNGJI 명지" 
                className="h-full w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-2xl font-black text-[#14263D] tracking-tighter">MYOUNGJI <span class="text-[#F36B1C]">명지</span></span>';
                }}
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`text-sm font-bold transition-all hover:text-[#F36B1C] uppercase tracking-wider relative py-2 ${
                  currentPage === item.page 
                    ? 'text-[#F36B1C]' 
                    : item.page === Page.ADMIN 
                      ? 'text-[#5A6772]/40' 
                      : 'text-[#5A6772]'
                }`}
              >
                {item.label}
                {currentPage === item.page && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F36B1C] rounded-full animate-fade-in"></span>
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#14263D] focus:outline-none p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="px-4 pt-4 pb-8 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-4 text-base font-bold rounded-xl transition-all ${
                  currentPage === item.page 
                    ? 'bg-gray-50 text-[#F36B1C]' 
                    : item.page === Page.ADMIN
                      ? 'text-[#5A6772]/30 hover:bg-gray-50' 
                      : 'text-[#5A6772] hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
