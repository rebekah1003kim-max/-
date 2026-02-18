
import React, { useState } from 'react';
import { InquiryFormData } from '../types';
import { supabase } from '../services/supabase.ts';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<InquiryFormData>({
    company: '',
    name: '',
    phone: '',
    email: '',
    vehicleType: '',
    purpose: '',
    hasExistingSystem: '신규 제작',
    deadline: '',
    budget: '',
    message: ''
  });

  const [honeypot, setHoneypot] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.company || !formData.name || !formData.phone || !formData.email || !formData.purpose) {
      return "모든 필수 항목을 입력해주세요.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "올바른 이메일 형식을 입력해주세요.";
    }
    const phoneRegex = /^[0-9-]{9,20}$/;
    if (!phoneRegex.test(formData.phone)) {
      return "올바른 연락처 형식을 입력해주세요.";
    }
    if (!isAgreed) {
      return "개인정보 수집 및 이용에 동의해주세요.";
    }
    if (honeypot !== '') {
      return "비정상적인 접근이 감지되었습니다.";
    }
    return null;
  };

  const checkRateLimit = () => {
    const lastSubmit = localStorage.getItem('myungji_last_submit');
    if (lastSubmit) {
      const diff = Date.now() - parseInt(lastSubmit);
      const limit = 5 * 60 * 1000;
      if (diff < limit) {
        const remainingMinutes = Math.ceil((limit - diff) / 60000);
        return `${remainingMinutes}분 후에 다시 문의하실 수 있습니다.`;
      }
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    const limitError = checkRateLimit();
    if (limitError) {
      alert(limitError);
      return;
    }

    setIsSubmitting(true);

    try {
      // Supabase 'inquiries' 테이블에 데이터 저장
      const { error } = await supabase
        .from('inquiries')
        .insert([
          {
            company: formData.company,
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            vehicle_type: formData.vehicleType,
            has_existing_system: formData.hasExistingSystem,
            purpose: formData.purpose,
            created_at: new Date().toISOString(),
          }
        ]);

      if (error) throw error;

      alert('상담 신청이 성공적으로 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.');
      localStorage.setItem('myungji_last_submit', Date.now().toString());
      
      // 폼 초기화
      setFormData({
        company: '', name: '', phone: '', email: '', vehicleType: '',
        purpose: '', hasExistingSystem: '신규 제작', deadline: '', budget: '', message: ''
      });
      setIsAgreed(false);

    } catch (err: any) {
      console.error('Error submitting form:', err);
      alert('데이터 저장 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 전화로 문의 부탁드립니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const kakaoMapUrl = "https://map.kakao.com/link/search/전북 김제시 백산면 지평선산단1길 214-65";
  const naverMapUrl = "https://map.naver.com/v5/search/전북 김제시 백산면 지평선산단1길 214-65";

  return (
    <div className="animate-fade-in pb-32 bg-gray-50/50">
      <div className="bg-[#14263D] py-24 text-center relative overflow-hidden">
        <div className="relative z-10 px-4">
          <h1 className="text-5xl font-bold text-white mb-6 uppercase tracking-widest">상담 신청</h1>
          <p className="text-gray-400 text-xl font-medium">최상의 솔루션을 위해 현장 전문가가 직접 상담해 드립니다.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-10 md:p-16 shadow-xl shadow-gray-200 border border-gray-100">
              <div className="mb-14 p-8 bg-gray-50 rounded-xl border-l-4 border-[#14263D]">
                <p className="text-[#14263D] font-bold text-lg leading-relaxed">
                  💡 특장차는 현장 조건에 따라 설계가 달라집니다. <br />
                  <span className="text-[#5A6772] font-medium text-base">정확한 상담을 위해 상세 정보를 함께 전달해 주세요.</span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="hidden" aria-hidden="true">
                  <input type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-bold text-[#5A6772] mb-3 uppercase tracking-widest">업체명 <span className="text-red-500">*</span></label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} required className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#14263D] focus:outline-none transition-all font-medium text-[#14263D]" placeholder="회사명을 입력하세요" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#5A6772] mb-3 uppercase tracking-widest">담당자명 <span className="text-red-500">*</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#14263D] focus:outline-none transition-all font-medium text-[#14263D]" placeholder="성함을 입력하세요" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#5A6772] mb-3 uppercase tracking-widest">연락처 <span className="text-red-500">*</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#14263D] focus:outline-none transition-all font-medium text-[#14263D]" placeholder="010-0000-0000" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#5A6772] mb-3 uppercase tracking-widest">이메일 <span className="text-red-500">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#14263D] focus:outline-none transition-all font-medium text-[#14263D]" placeholder="example@company.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-bold text-[#5A6772] mb-3 uppercase tracking-widest">차량 종류</label>
                    <input type="text" name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#14263D] focus:outline-none transition-all font-medium text-[#14263D]" placeholder="예: 고소작업차, 소방차 등" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#5A6772] mb-3 uppercase tracking-widest">기존 시스템 여부</label>
                    <select name="hasExistingSystem" value={formData.hasExistingSystem} onChange={handleChange} className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#14263D] focus:outline-none transition-all font-bold text-[#14263D] cursor-pointer">
                      <option value="신규 제작">신규 제작</option>
                      <option value="기존 시스템 개선">기존 시스템 개선</option>
                      <option value="단순 유지보수">단순 유지보수</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5A6772] mb-3 uppercase tracking-widest">제작 목적 및 요청사항 <span className="text-red-500">*</span></label>
                  <textarea name="purpose" value={formData.purpose} onChange={handleChange} required rows={6} className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#14263D] focus:outline-none transition-all font-medium text-[#14263D] resize-none" placeholder="구체적인 제작 목적이나 해결하고 싶은 문제점을 입력하세요."></textarea>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <div className="flex items-start">
                    <input id="privacy-agree" type="checkbox" checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} className="mt-1 w-5 h-5 text-[#F36B1C] border-gray-300 rounded focus:ring-[#F36B1C] cursor-pointer" />
                    <label htmlFor="privacy-agree" className="ml-3 text-sm text-[#5A6772] leading-relaxed cursor-pointer select-none">
                      <span className="font-bold text-[#14263D]">[필수] 개인정보 수집 및 이용 동의</span><br />
                      문의 처리 및 상담 결과 회신을 위해 성함, 연락처, 이메일 등의 개인정보를 수집하며, 목적 달성 후 즉시 파기합니다.
                    </label>
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full py-6 bg-[#F36B1C] text-white rounded-xl font-bold text-xl hover:bg-[#d45a15] transition-all shadow-xl shadow-[#F36B1C]/20 disabled:bg-gray-300 transform active:scale-95">
                  {isSubmitting ? '접수 중...' : '상담 신청하기'}
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-12">
            <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-10 text-[#14263D] border-b border-gray-50 pb-6 uppercase tracking-wider">빠른 상담 경로</h3>
              <div className="space-y-8">
                <div className="flex items-start group">
                  <div className="w-14 h-14 bg-gray-50 text-[#14263D] rounded-xl flex items-center justify-center mr-5 transition-all shadow-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#5A6772] font-bold mb-1 uppercase tracking-widest">전화 상담</p>
                    <p className="text-[#14263D] font-bold text-base">T. 063-542-7477</p>
                    <p className="text-[#F36B1C] font-bold text-base">M. 010-5526-3848</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="w-14 h-14 bg-gray-50 text-[#14263D] rounded-xl flex items-center justify-center mr-5 shadow-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-[#5A6772] font-bold mb-1 uppercase tracking-widest">위치 안내</p>
                    <p className="text-[#14263D] font-bold text-sm mb-4 leading-tight">전북 김제시 백산면 지평선산단1길 214-65</p>
                    <div className="flex flex-col space-y-2">
                      <a href={kakaoMapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-4 py-2.5 bg-[#FEE500] text-[#14263D] rounded-lg font-bold text-xs hover:bg-[#EBD200] transition-colors">카카오지도로 보기</a>
                      <a href={naverMapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-4 py-2.5 bg-[#03C75A] text-white rounded-lg font-bold text-xs hover:bg-[#02b351] transition-colors">네이버지도로 보기</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#14263D] p-10 rounded-2xl text-white">
              <p className="text-xl font-bold mb-4">현장에 맞는 제어 설계,<br />명지가 답을 드립니다.</p>
              <p className="text-gray-400 text-sm font-medium leading-relaxed">수많은 프로젝트 경험을 토대로 귀사의 현장에 가장 최적화된 시스템을 제안하겠습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
