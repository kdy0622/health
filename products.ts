
import { ProductPreset, HealthCategory, ProductGroup } from "./types";

export interface ProductExtended extends ProductPreset {
    gender?: 'male' | 'female' | 'child' | 'general';
    organColor?: string; // 장기 색상 (프롬프트용 - 사실적 묘사)
}

export const USANA_PRODUCTS: ProductExtended[] = [
  // --- 기초 영양 (Basic Nutrition) ---
  {
    id: "healthpak",
    category: "nutrition",
    name: "HealthPak (헬스팩)",
    ingredients: "14가지 비타민, 9가지 미네랄, 7가지 식물성분 (인셀리전스)",
    benefit: "기초 영양, 세포 활력, 항산화 보호",
    colorTheme: "Signature Blue",
    targetBodyPart: "Whole Body Cells (전신 세포)",
    organColor: "Glowing Golden Energy Points & Vital Organs",
    gender: "general"
  },
  {
    id: "cellsentials",
    category: "nutrition",
    name: "CellSentials (셀센셜즈)",
    ingredients: "비타에이오, 코어미네랄",
    benefit: "세포 영양, 보호, 활력",
    colorTheme: "Soft Teal",
    targetBodyPart: "DNA & Cells (세포핵)",
    organColor: "Microscopic Cell Structure with Blue Glow",
    gender: "general"
  },
  {
    id: "usanimals",
    category: "nutrition",
    name: "Usanimals (유사니멀즈)",
    ingredients: "13가지 비타민, 9가지 미네랄",
    benefit: "어린이 성장 발육, 뼈/치아 건강",
    colorTheme: "Soft Yellow",
    targetBodyPart: "Growing Bones & Body (성장기 전신)",
    organColor: "Realistic Growing Bones & Tissue",
    gender: "child"
  },

  // --- 혈행, 면역 (Blood & Immune) ---
  {
    id: "biomega",
    category: "nutrition",
    name: "Biomega (바이오메가)",
    ingredients: "오메가-3 (EPA+DHA)",
    benefit: "혈행 개선, 건조한 눈, 뇌 건강",
    colorTheme: "Gold",
    targetBodyPart: "Blood Vessels & Brain (혈관, 뇌)",
    organColor: "Realistic Red Arteries & Grey Brain Matter",
    gender: "general"
  },
  {
    id: "proflavanol",
    category: "nutrition",
    name: "Proflavanol C600 (프로후라바놀)",
    ingredients: "포도씨추출물, 비타민C",
    benefit: "항산화, 혈압 조절, 면역",
    colorTheme: "Purple",
    targetBodyPart: "Heart & Immune System (심장, 면역계)",
    organColor: "Realistic Red Heart & Vascular System",
    gender: "general"
  },
  {
    id: "coquinone",
    category: "nutrition",
    name: "CoQuinone 30 (코퀴논 30)",
    ingredients: "코엔자임Q10",
    benefit: "항산화, 높은 혈압 감소",
    colorTheme: "Orange",
    targetBodyPart: "Heart (심장)",
    organColor: "Realistic Muscular Red Heart",
    gender: "general"
  },
  {
    id: "circulate",
    category: "nutrition",
    name: "Circulate+ (써큘레이트 플러스)",
    ingredients: "L-아르기닌, 붉은시금치추출물",
    benefit: "혈관 이완, 혈행 개선",
    colorTheme: "Ruby Red",
    targetBodyPart: "Veins & Arteries (혈관)",
    organColor: "Detailed Red Blood Vessels",
    gender: "general"
  },
  {
    id: "proglucamune",
    category: "nutrition",
    name: "Proglucamune (프로글루카뮨)",
    ingredients: "아연, 영지/표고버섯/효모추출물",
    benefit: "정상적인 면역기능",
    colorTheme: "Beige",
    targetBodyPart: "Immune Cells (백혈구/면역세포)",
    organColor: "Bright White Immune Nodes",
    gender: "general"
  },
  {
    id: "poly_c",
    category: "nutrition",
    name: "Poly C (폴리 C)",
    ingredients: "다양한 종류의 비타민C",
    benefit: "항산화, 유해산소로부터 세포 보호",
    colorTheme: "Orange",
    targetBodyPart: "Immune System (면역계)",
    organColor: "Vital Orange-Tinted Immune System",
    gender: "general"
  },
  {
    id: "booster_c",
    category: "nutrition",
    name: "Booster C 600 (부스터 C 600)",
    ingredients: "비타민C, 아연, 엘더베리",
    benefit: "강력한 항산화, 면역 급속 충전",
    colorTheme: "Red-Orange",
    targetBodyPart: "Respiratory & Immune (호흡기, 면역)",
    organColor: "Healthy Pink Lungs & Nodes",
    gender: "general"
  },
  {
    id: "vitamin_d",
    category: "nutrition",
    name: "Vitamin D (비타민 D)",
    ingredients: "비타민 D3",
    benefit: "뼈 건강, 면역력",
    colorTheme: "Sunshine Yellow",
    targetBodyPart: "Bones & Immune (뼈, 면역)",
    organColor: "Realistic Strong White Bones",
    gender: "general"
  },
  {
    id: "e_prime",
    category: "nutrition",
    name: "E-Prime (이프라임)",
    ingredients: "비타민 E",
    benefit: "항산화, 세포막 보호",
    colorTheme: "Amber",
    targetBodyPart: "Cell Membranes (세포막)",
    organColor: "Protective Cellular Sheath",
    gender: "general"
  },

  // --- 소화기계 (Digestive) ---
  {
    id: "hepasil",
    category: "nutrition",
    name: "Hepasil DTX (헤파실)",
    ingredients: "밀크씨슬(실리마린)",
    benefit: "간 건강, 피로 회복",
    colorTheme: "Green",
    targetBodyPart: "Liver (간)",
    organColor: "Realistic Healthy Brown-Red Liver",
    gender: "general"
  },
  {
    id: "probiotic",
    category: "nutrition",
    name: "Probiotic (프로바이오틱)",
    ingredients: "100억 유산균",
    benefit: "장내 유익균 증식, 배변 활동",
    colorTheme: "White",
    targetBodyPart: "Intestines (장)",
    organColor: "Healthy Pink Intestines",
    gender: "general"
  },
  {
    id: "aloenz",
    category: "nutrition",
    name: "Aloenz (알로엔즈)",
    ingredients: "알로에베라, 소화효소",
    benefit: "피부, 장 건강, 소화",
    colorTheme: "Aloe Green",
    targetBodyPart: "Stomach & Skin (위, 피부)",
    organColor: "Healthy Beige Stomach",
    gender: "general"
  },
  {
    id: "fibergy",
    category: "diet",
    name: "Fibergy Plus (화이버지)",
    ingredients: "차전자피 식이섬유",
    benefit: "콜레스테롤 개선, 배변 활동",
    colorTheme: "Brown",
    targetBodyPart: "Colon (대장)",
    organColor: "Clean Healthy Colon",
    gender: "general"
  },
  {
    id: "fos_active",
    category: "diet",
    name: "FOS Active (에프오에스)",
    ingredients: "프락토올리고당",
    benefit: "유익균 증식",
    colorTheme: "Soft Green",
    targetBodyPart: "Gut Microbiome (장내세균총)",
    organColor: "Microscopic Biome",
    gender: "general"
  },
  {
    id: "organic_enzyme",
    category: "nutrition",
    name: "Organic Enzyme (유기농 곡물 효소)",
    ingredients: "유기농 곡물 발효 효소",
    benefit: "소화 돕기",
    colorTheme: "Grain Beige",
    targetBodyPart: "Stomach (위)",
    organColor: "Active Stomach Lining",
    gender: "general"
  },

  // --- 근골격계 (Musculoskeletal) ---
  {
    id: "magnecal",
    category: "nutrition",
    name: "MagneCal D (마그네칼 D)",
    ingredients: "마그네슘, 칼슘, 비타민D",
    benefit: "뼈/치아 건강, 근육 기능",
    colorTheme: "White",
    targetBodyPart: "Skeleton (뼈대)",
    organColor: "Realistic White Skeleton",
    gender: "general"
  },
  {
    id: "procosa",
    category: "nutrition",
    name: "Procosa (프로코사)",
    ingredients: "글루코사민, 메리바 커큐민",
    benefit: "관절 연골 건강",
    colorTheme: "Orange",
    targetBodyPart: "Joints (관절)",
    organColor: "Healthy White Cartilage",
    gender: "general"
  },
  {
    id: "core_aminos",
    category: "nutrition",
    name: "Core Aminos (코어 아미노)",
    ingredients: "필수 아미노산, BCAA",
    benefit: "근육 합성 및 유지",
    colorTheme: "Blue",
    targetBodyPart: "Muscles (근육)",
    organColor: "Realistic Red Muscle Fiber",
    gender: "general"
  },

  // --- 기타 (Others) ---
  {
    id: "visionex",
    category: "nutrition",
    name: "Visionex (비전엑스)",
    ingredients: "루테인, 지아잔틴",
    benefit: "눈 건강",
    colorTheme: "Marigold",
    targetBodyPart: "Eyes (눈)",
    organColor: "Detailed Realistic Eye",
    gender: "general"
  },
  {
    id: "nutrimeal_active",
    category: "diet",
    name: "Nutrimeal Active (뉴트리밀 액티브)",
    ingredients: "단백질, 식이섬유",
    benefit: "체중 조절, 식사 대용",
    colorTheme: "Chocolate/Vanilla",
    targetBodyPart: "Whole Body Shape (체형)",
    organColor: "Fit Body Silhouette",
    gender: "general"
  },
  {
    id: "isoflavone",
    category: "nutrition",
    name: "Isoflavone (이소플라본)",
    ingredients: "대두 이소플라본",
    benefit: "여성 건강",
    colorTheme: "Pink",
    targetBodyPart: "Hormone System (호르몬계)",
    organColor: "Soft Pink Balance",
    gender: "female"
  },
  {
      id: "metabolism",
      category: "diet",
      name: "Metabolism+ (메타볼리즘)",
      ingredients: "녹차추출물(카테킨)",
      benefit: "체지방 감소, 대사 증진",
      colorTheme: "Green Tea",
      targetBodyPart: "Fat Tissue (지방 조직)",
      organColor: "Metabolic Energy Glow",
      gender: "general"
  }
];

// --- HEALTH CATEGORY BUNDLES (건강 기능별 제품설계) ---
export const HEALTH_CATEGORIES: HealthCategory[] = [
    {
        id: "blood_health",
        label: "혈행 건강",
        productIds: ["healthpak", "biomega", "coquinone", "circulate", "proflavanol"],
        description: "혈관 탄력, 혈압 조절 및 혈액 순환",
        targetSystem: "Circulatory System (Heart, Blood Vessels)"
    },
    {
        id: "immune_health",
        label: "면역 건강",
        productIds: ["healthpak", "proglucamune", "vitamin_d", "proflavanol", "booster_c", "poly_c"],
        description: "기초 면역 강화 및 항산화",
        targetSystem: "Immune System (Lymph Nodes, White Blood Cells)"
    },
    {
        id: "gut_health",
        label: "장 건강",
        productIds: ["probiotic", "aloenz", "hepasil", "fibergy", "fos_active"],
        description: "장내 환경 개선 및 배변 활동",
        targetSystem: "Digestive System (Intestines, Colon)"
    },
    {
        id: "digestion",
        label: "소화 건강",
        productIds: ["organic_enzyme", "probiotic", "aloenz"],
        description: "음식물 소화 및 흡수",
        targetSystem: "Stomach & Intestines"
    },
    {
        id: "eye_health",
        label: "눈 건강",
        productIds: ["visionex", "biomega", "proflavanol"],
        description: "시력 보호 및 눈의 피로 개선",
        targetSystem: "Eyes & Optical Nerves"
    },
    {
        id: "bone_joint",
        label: "뼈/관절/근육",
        productIds: ["magnecal", "procosa", "core_aminos"],
        description: "뼈 형성, 연골 보호 및 근육 유지",
        targetSystem: "Skeleton & Muscular System"
    },
    {
        id: "brain_health",
        label: "뇌 건강",
        productIds: ["healthpak", "biomega", "e_prime", "proflavanol"],
        description: "기억력 개선 및 뇌 세포 보호",
        targetSystem: "Brain & Nervous System"
    },
    {
        id: "autoimmune",
        label: "자가면역 질환",
        productIds: ["healthpak", "proflavanol", "probiotic", "proglucamune", "biomega"],
        description: "면역 과민 반응 조절 및 염증 관리",
        targetSystem: "Whole Immune System"
    },
    {
        id: "liver_fatigue",
        label: "간 건강/피로",
        productIds: ["healthpak", "hepasil"],
        description: "간 해독 및 활력 충전",
        targetSystem: "Liver & Energy Metabolism"
    },
    {
        id: "diet",
        label: "다이어트",
        productIds: ["nutrimeal_active", "healthpak", "fibergy", "probiotic", "biomega", "proflavanol"],
        description: "체지방 감소 및 영양 밸런스",
        targetSystem: "Whole Body Silhouette & Metabolism"
    },
    {
        id: "child_health",
        label: "어린이 건강",
        productIds: ["usanimals", "nutrimeal_active", "magnecal", "biomega", "proglucamune", "proflavanol"],
        description: "성장기 어린이 영양",
        targetSystem: "Child's Whole Body"
    }
];

// --- INDIVIDUAL PRODUCT GROUPS (제품별 건강기능) ---
export const INDIVIDUAL_PRODUCT_GROUPS: ProductGroup[] = [
    {
        id: "basic_nutrition",
        label: "기초 영양 (Basic Nutrition)",
        productIds: ["healthpak", "cellsentials", "usanimals"]
    },
    {
        id: "blood_health",
        label: "혈행 건강 (Blood Health)",
        productIds: ["biomega", "circulate", "coquinone"]
    },
    {
        id: "antioxidant_immune",
        label: "항산화/면역 (Antioxidant & Immune)",
        productIds: ["proflavanol", "proglucamune", "vitamin_d", "poly_c", "booster_c", "e_prime"]
    },
    {
        id: "bone_joint",
        label: "뼈/관절/근육 (Bone/Joint/Muscle)",
        productIds: ["magnecal", "procosa", "core_aminos"]
    },
    {
        id: "gut_digestion",
        label: "장/소화/간 (Gut, Digestion & Liver)",
        productIds: ["probiotic", "aloenz", "hepasil", "organic_enzyme"]
    },
    {
        id: "diet_fiber",
        label: "다이어트/식이섬유 (Diet & Fiber)",
        productIds: ["nutrimeal_active", "fibergy", "fos_active", "metabolism"]
    },
    {
        id: "special_care",
        label: "스페셜 케어 (Eye & Woman)",
        productIds: ["visionex", "isoflavone"]
    }
];
