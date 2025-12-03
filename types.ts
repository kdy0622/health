
export type ProductCategoryId = 'nutrition' | 'diet' | 'drink' | 'cosmetic';

export interface ProductPreset {
  id: string;
  category: ProductCategoryId;
  name: string;
  ingredients: string;
  benefit: string;
  colorTheme: string; // 제품 고유의 은은한 색상 테마
  targetBodyPart: string; // 주요 작용 신체 부위 (예: 간, 눈, 관절)
  gender?: 'male' | 'female' | 'child' | 'general';
}

export interface BrandParams {
  productName: string;      // 제품명 또는 카테고리명
  productType: string;      // 제품 종류
  ingredients?: string;     // 성분 목록 (단일 또는 다중)
  healthBenefit?: string;   // 효능 목록 (단일 또는 다중)
  aspectRatio: '16:9' | '9:16'; // 화면 비율
  colorTheme?: string;      // 은은한 틴트 색상
  targetBodyPart?: string;  // 타겟 신체 부위
  mode: 'single' | 'healthCategory' | 'wholeBodyAll' | 'manualInput'; // 모드 추가: wholeBodyAll, manualInput
  selectedProductIds?: string[]; // 선택된 제품 ID 목록 (카테고리 모드용)
  manualQuery?: string;     // 사용자 입력 검색어 (매뉴얼 모드용)
}

export interface GenerationState {
  generatedPrompt: string | null;
}

export interface HealthCategory {
  id: string;
  label: string;
  productIds: string[];
  description: string;
  targetSystem: string; // 주요 타겟 시스템 (프롬프트용)
}

export interface ProductGroup {
    id: string;
    label: string;
    productIds: string[];
}