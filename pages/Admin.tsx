
import React, { useState, useRef } from 'react';
import { ProductionCase } from '../types';
import { CASE_CATEGORIES } from '../constants';

interface AdminProps {
  cases: ProductionCase[];
  onUpdateCases: (newCases: ProductionCase[]) => void;
}

const Admin: React.FC<AdminProps> = ({ cases, onUpdateCases }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingCase, setEditingCase] = useState<ProductionCase | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // 레이블 매핑 객체
  const overviewLabels: Record<string, string> = {
    type: "차량 종류",
    industry: "적용 산업군",
    purpose: "제작 목적",
    location: "납품 지역",
    duration: "제작 기간"
  };

  const solutionLabels: Record<string, string> = {
    design: "제어 시스템 설계 방식",
    wiring: "배선 및 전장 구성",
    safety: "안전 설계 적용 내용",
    test: "테스트 및 검증 과정"
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1111') {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      onUpdateCases(cases.filter(c => c.id !== id));
    }
  };

  const handleEdit = (caseItem: ProductionCase) => {
    setEditingCase(caseItem);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    const newCase: ProductionCase = {
      id: Date.now().toString(),
      category: CASE_CATEGORIES[0],
      title: '',
      thumbnail: '',
      overview: { type: '', industry: '', purpose: '', location: '', duration: '' },
      requirements: [''],
      solution: { design: '', wiring: '', safety: '', test: '' },
      technologies: [''],
      results: { efficiency: '', stability: '', maintenance: '' },
      images: []
    };
    setEditingCase(newCase);
    setIsModalOpen(true);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && editingCase) {
      const base64 = await fileToBase64(e.target.files[0]);
      setEditingCase({ ...editingCase, thumbnail: base64 });
    }
  };

  const handleGalleryAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && editingCase) {
      const files = Array.from(e.target.files);
      const base64s = await Promise.all(files.map(file => fileToBase64(file)));
      setEditingCase({ 
        ...editingCase, 
        images: [...editingCase.images, ...base64s] 
      });
      if (galleryInputRef.current) galleryInputRef.current.value = '';
    }
  };

  const removeGalleryImage = (index: number) => {
    if (editingCase) {
      const newImages = [...editingCase.images];
      newImages.splice(index, 1);
      setEditingCase({ ...editingCase, images: newImages });
    }
  };

  const clearAllGalleryImages = () => {
    if (editingCase && window.confirm('갤러리의 모든 이미지를 삭제하시겠습니까?')) {
      setEditingCase({ ...editingCase, images: [] });
    }
  };

  const saveCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCase) return;

    if (!editingCase.thumbnail) {
      alert('썸네일 이미지를 등록해주세요.');
      return;
    }

    const exists = cases.find(c => c.id === editingCase.id);
    if (exists) {
      onUpdateCases(cases.map(c => c.id === editingCase.id ? editingCase : c));
    } else {
      onUpdateCases([...cases, editingCase]);
    }
    setIsModalOpen(false);
    setEditingCase(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">관리자 로그인</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14263D] focus:outline-none mb-4"
          />
          <button type="submit" className="w-full bg-[#14263D] text-white py-3 rounded-lg font-bold hover:bg-[#1c3350] transition-all">
            로그인
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F6F8] min-h-screen pb-24">
      <div className="bg-[#14263D] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">포트폴리오 관리</h1>
            <p className="text-gray-400">제작사례를 추가하거나 수정할 수 있습니다.</p>
          </div>
          <button 
            onClick={handleAddNew}
            className="bg-[#F36B1C] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#d45a15] transition-all shadow-lg"
          >
            신규 사례 등록
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">제목</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">카테고리</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cases.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-[#14263D]">{c.title}</td>
                  <td className="px-6 py-4 text-sm text-[#5A6772]">{c.category}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-3">
                      <button onClick={() => handleEdit(c)} className="text-[#14263D] hover:text-[#F36B1C] font-bold text-sm">수정</button>
                      <button onClick={() => handleDelete(c.id)} className="text-red-600 hover:text-red-800 font-bold text-sm">삭제</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingCase && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-4xl p-8 my-8 shadow-2xl relative animate-fade-in">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-2xl font-bold mb-8 text-[#14263D] border-b pb-4">제작사례 편집</h2>
            
            <form onSubmit={saveCase} className="space-y-8 max-h-[70vh] overflow-y-auto pr-4">
              <div className="space-y-6">
                <h3 className="font-bold text-[#14263D] border-l-4 border-[#F36B1C] pl-3 text-lg">대표 이미지 (썸네일)</h3>
                <div className="flex items-start space-x-6">
                  <div className="w-48 h-36 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center relative">
                    {editingCase.thumbnail ? (
                      <img src={editingCase.thumbnail} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-400 text-xs text-center px-2">이미지를 업로드해주세요</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <input 
                      type="file" accept="image/*" className="hidden" ref={thumbnailInputRef}
                      onChange={handleThumbnailChange}
                    />
                    <button 
                      type="button"
                      onClick={() => thumbnailInputRef.current?.click()}
                      className="px-6 py-3 bg-[#14263D] text-white rounded-lg font-bold text-sm hover:bg-[#1c3350] transition-all shadow-md"
                    >
                      대표 이미지 교체
                    </button>
                    <p className="text-xs text-[#5A6772] mt-2">목록 화면에 노출될 메인 이미지입니다. (권장: 4:3 비율)</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#5A6772] mb-2">제목</label>
                  <input
                    type="text" required
                    value={editingCase.title}
                    onChange={(e) => setEditingCase({...editingCase, title: e.target.value})}
                    className="w-full px-4 py-3 bg-white text-[#14263D] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14263D] outline-none"
                    placeholder="프로젝트 제목을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#5A6772] mb-2">카테고리</label>
                  <select
                    value={editingCase.category}
                    onChange={(e) => setEditingCase({...editingCase, category: e.target.value})}
                    className="w-full px-4 py-3 bg-white text-[#14263D] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14263D] outline-none"
                  >
                    {CASE_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end border-l-4 border-[#F36B1C] pl-3">
                  <div>
                    <h3 className="font-bold text-[#14263D] text-lg">현장 이미지 갤러리</h3>
                    <p className="text-xs text-[#5A6772] mt-1">상세 페이지 하단에 표시될 여러 장의 사진입니다. (현재: {editingCase.images.length}장)</p>
                  </div>
                  <div className="flex space-x-2">
                    {editingCase.images.length > 0 && (
                      <button 
                        type="button"
                        onClick={clearAllGalleryImages}
                        className="text-xs font-bold text-red-500 hover:text-red-700 px-2 py-1"
                      >
                        전체 삭제
                      </button>
                    )}
                    <button 
                      type="button"
                      onClick={() => galleryInputRef.current?.click()}
                      className="px-4 py-2 bg-gray-50 text-[#14263D] rounded-lg font-bold text-xs border border-gray-200 hover:bg-gray-100 transition-all flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                      이미지 다중 추가
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 bg-gray-50 p-6 rounded-xl border border-gray-200 min-h-[160px]">
                  {editingCase.images.map((img, idx) => (
                    <div key={idx} className="relative aspect-video bg-white rounded-lg overflow-hidden border border-gray-200 group shadow-sm">
                      <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          type="button"
                          onClick={() => removeGalleryImage(idx)}
                          className="bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition-colors"
                          title="이미지 삭제"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                      <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[8px] px-1.5 py-0.5 rounded">
                        #{idx + 1}
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    type="button"
                    onClick={() => galleryInputRef.current?.click()}
                    className="aspect-video bg-white border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:text-[#14263D] hover:border-[#14263D] hover:bg-gray-100 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 mb-2 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    </div>
                    <span className="text-[10px] font-bold">다중 선택 업로드</span>
                  </button>
                  <input 
                    type="file" accept="image/*" multiple className="hidden" ref={galleryInputRef}
                    onChange={handleGalleryAdd}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-[#14263D] border-l-4 border-[#F36B1C] pl-3">개요 정보</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.keys(editingCase.overview).map((key) => (
                    <div key={key}>
                      <label className="block text-xs font-bold text-[#5A6772] mb-1">
                        {overviewLabels[key] || key}
                      </label>
                      <input
                        type="text"
                        value={(editingCase.overview as any)[key]}
                        onChange={(e) => setEditingCase({
                          ...editingCase, 
                          overview: { ...editingCase.overview, [key]: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-white text-[#14263D] border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#14263D] outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-[#14263D] border-l-4 border-[#F36B1C] pl-3">고객 요청사항 (한 줄씩 입력)</h3>
                <textarea
                  rows={4}
                  value={editingCase.requirements.join('\n')}
                  onChange={(e) => setEditingCase({...editingCase, requirements: e.target.value.split('\n')})}
                  className="w-full px-4 py-3 bg-white text-[#14263D] border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#14263D] outline-none"
                  placeholder="요청사항1&#10;요청사항2"
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-[#14263D] border-l-4 border-[#F36B1C] pl-3">솔루션</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(editingCase.solution).map((key) => (
                    <div key={key}>
                      <label className="block text-xs font-bold text-[#5A6772] mb-1">
                        {solutionLabels[key] || key}
                      </label>
                      <textarea
                        value={(editingCase.solution as any)[key]}
                        onChange={(e) => setEditingCase({
                          ...editingCase, 
                          solution: { ...editingCase.solution, [key]: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-white text-[#14263D] border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#14263D] outline-none"
                        rows={3}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-8 border-t">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border border-gray-200 rounded-lg text-[#5A6772] hover:bg-gray-50 font-bold"
                >
                  취소
                </button>
                <button 
                  type="submit"
                  className="px-10 py-3 bg-[#F36B1C] text-white rounded-lg font-bold hover:bg-[#d45a15] shadow-lg"
                >
                  변경사항 저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
