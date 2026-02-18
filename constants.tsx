
import { ProductionCase } from './types';

export const CASE_CATEGORIES = [
  "특장차 제어 시스템",
  "유압 · 전장 제어",
  "자동화 제어 시스템",
  "커스텀 특장차 제작",
  "공공기관 납품 사례",
  "유지보수 · 개조 사례"
];

export const PRODUCTION_CASES: ProductionCase[] = [
  {
    id: "1",
    category: "특장차 제어 시스템",
    title: "고소작업차 통합 제어 시스템 구축",
    thumbnail: "https://picsum.photos/id/101/800/600",
    overview: {
      type: "고소작업차 (25m급)",
      industry: "건설 및 시설물 관리",
      purpose: "작업대 수평 유지 및 안전 속도 제어",
      location: "경기도 안산",
      duration: "3개월"
    },
    requirements: [
      "기존 유압 제어의 반응 속도 저하 문제 해결 필요",
      "강풍 발생 시 흔들림 최소화 알고리즘 요구",
      "초보자도 쉽게 조작 가능한 직관적 UI 필요"
    ],
    solution: {
      design: "고성능 PLC 기반 실시간 모니터링 시스템 설계",
      wiring: "CAN 통신 기반 배선 간소화 및 노이즈 차단 설계",
      safety: "2중 리미트 센서 및 비상 정지 시스템 탑재",
      test: "3단계 시뮬레이션 및 실하중 테스트 완료"
    },
    technologies: ["PLC 제어 시스템", "CAN 통신", "자이로 센서 연동", "맞춤형 컨트롤 패널"],
    results: {
      efficiency: "작업 준비 시간 25% 단축",
      stability: "흔들림 폭 40% 감소 (정밀 제어 구현)",
      maintenance: "배선 간소화로 유지보수 포인트 50% 절감"
    },
    images: [
      "https://picsum.photos/id/111/800/600",
      "https://picsum.photos/id/112/800/600",
      "https://picsum.photos/id/113/800/600",
      "https://picsum.photos/id/114/800/600"
    ]
  },
  {
    id: "2",
    category: "유압 · 전장 제어",
    title: "대형 환경미화차량 유압 전동화 시스템",
    thumbnail: "https://picsum.photos/id/102/800/600",
    overview: {
      type: "16톤 압착 진개차",
      industry: "공공 서비스 / 폐기물 처리",
      purpose: "압착 기구 고부하 대응 제어",
      location: "인천광역시",
      duration: "2개월"
    },
    requirements: [
      "과부하 시 시스템 멈춤 현상 빈번",
      "야간 작업 시 유압 소음 민원 발생",
      "노후된 배선으로 인한 잦은 고장"
    ],
    solution: {
      design: "부하 감응형 유압 펌프 제어 로직 적용",
      wiring: "IP67 등급 방수 배선 및 하네스 전면 교체",
      safety: "압착 방지 안전 센서 및 알람 연동",
      test: "실제 폐기물 투입 후 압착력 테스트 수행"
    },
    technologies: ["유압 연동 제어", "전기 안전 설계", "방수 하우징 설계", "고출력 릴레이 제어"],
    results: {
      efficiency: "폐기물 처리 속도 15% 향상",
      stability: "소음 10dB 감소로 야간 작업 편의성 확보",
      maintenance: "자가 진단 모듈 탑재로 고장 식별 속도 개선"
    },
    images: [
      "https://picsum.photos/id/121/800/600",
      "https://picsum.photos/id/122/800/600",
      "https://picsum.photos/id/123/800/600"
    ]
  },
  {
    id: "3",
    category: "자동화 제어 시스템",
    title: "자율주행 방역차량 특장 제어부 제작",
    thumbnail: "https://picsum.photos/id/103/800/600",
    overview: {
      type: "소형 자율주행 방역차",
      industry: "스마트 시티 / 방역",
      purpose: "자율주행 연동 노즐 각도 및 분사량 자동 제어",
      location: "세종특별자치시",
      duration: "4개월"
    },
    requirements: [
      "자율주행 플랫폼(ROS)과의 통신 호환성 확보",
      "주행 속도에 따른 분사량 가변 제어",
      "배터리 기반 구동을 위한 전력 효율 극대화"
    ],
    solution: {
      design: "Modbus/TCP 통신 인터페이스 구축",
      wiring: "경량화 및 고효율 전력 분배 시스템 설계",
      safety: "장애물 인식 시 분사 즉시 중단 기능",
      test: "실증 단지 내 500km 주행 연동 테스트"
    },
    technologies: ["자율주행 연동", "가변 분사 시스템", "고효율 전원 설계", "스마트 컨트롤러"],
    results: {
      efficiency: "약액 낭비 30% 절감",
      stability: "무인 환경 내 24시간 안정 구동 확인",
      maintenance: "원격 모니터링 시스템 구축"
    },
    images: [
      "https://picsum.photos/id/131/800/600",
      "https://picsum.photos/id/132/800/600"
    ]
  }
];

export const CORE_COMPETENCIES = [
  {
    title: "특장차 제어 시스템 설계",
    desc: "현장 경험을 바탕으로 최적의 구동 환경을 설계합니다.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    title: "전장 배선 설계 및 시공",
    desc: "완성도 높은 배선으로 고장 없는 시스템을 보장합니다.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: "유압 · 전기 연동 시스템",
    desc: "복합적인 구동 메커니즘을 유기적으로 연결합니다.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    )
  },
  {
    title: "맞춤형 컨트롤 패널 제작",
    desc: "조작 편의성과 내구성을 갖춘 컨트롤러를 직접 제작합니다.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    )
  }
];

export const PROCESS_STEPS = [
  { title: "상담 및 현장 분석", desc: "차량의 용도와 작업 환경을 면밀히 검토합니다." },
  { title: "설계 및 견적 제안", desc: "분석 데이터를 기반으로 최적의 솔루션을 제안합니다." },
  { title: "제작 및 배선 작업", desc: "엄격한 공정 관리를 통해 정밀하게 시공합니다." },
  { title: "통합 테스트 및 검증", desc: "다양한 시나리오 하에 시스템 안정성을 확인합니다." },
  { title: "출고 및 납품", desc: "작업자 교육 및 최종 검수를 완료 후 인도합니다." },
  { title: "A/S 및 유지관리", desc: "지속적인 모니터링과 신속한 기술 지원을 제공합니다." }
];
