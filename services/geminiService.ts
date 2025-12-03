
import { BrandParams } from "../types";
import { USANA_PRODUCTS, HEALTH_CATEGORIES, ProductExtended } from "../products";

// Helper to get Korean Name
const getKoreanName = (fullName: string) => {
    return fullName.match(/\((.*?)\)/)?.[1] || fullName;
};

// Helper to get Short Benefit
const getShortBenefit = (benefit: string) => {
    return benefit.split(',')[0].trim();
};

export const constructCrystalPrompt = (params: BrandParams): string => {
  // Common Settings
  const arValue = params.aspectRatio === '16:9' ? "16:9" : "9:16";
  const orientation = params.aspectRatio === '16:9' ? "LANDSCAPE" : "PORTRAIT";
  
  // Layout Instruction - STRICT ASPECT RATIO & FULL BODY
  const layoutInstruction = params.aspectRatio === '16:9' 
    ? "Wide-angle LANDSCAPE shot (16:9). The camera is ZOOMED OUT to show the ENTIRE FIGURE from HEAD TO FEET. Centered on the marble floor." 
    : "Vertical PORTRAIT shot (9:16). The camera is ZOOMED OUT to show the COMPLETE FIGURE from HEAD TO FEET standing on the marble floor.";
    
  // Background Instruction - REMOVED SUNLIGHT/GLARE, FOCUS ON MARBLE
  const backgroundInstruction = "**Background:** A CLEAN, BRIGHT STUDIO SETTING. Soft, even lighting (NO HARSH SUNLIGHT, NO GLARE). The figure stands firmly on a **POLISHED WHITE MARBLE FLOOR** with realistic reflections and shadows. The background is neutral and clean to highlight the crystal figure.";

  // Mode Switching
  if (params.mode === 'wholeBodyAll') {
      return constructWholeBodyAllPrompt(arValue, orientation, layoutInstruction, backgroundInstruction);
  } else if (params.mode === 'healthCategory' && params.selectedProductIds) {
      return constructHealthCategoryPrompt(params, arValue, orientation, layoutInstruction, backgroundInstruction);
  } else if (params.mode === 'manualInput' && params.manualQuery) {
      return constructManualInputPrompt(params.manualQuery, arValue, orientation, layoutInstruction, backgroundInstruction);
  } else {
    // Single Product Mode
    const koreanName = getKoreanName(params.productName);
    const productInfo = USANA_PRODUCTS.find(p => p.name === params.productName) as ProductExtended | undefined;
    let figureType = "Standard Human";
    if (productInfo?.gender === 'female') figureType = "Female";
    if (productInfo?.gender === 'child') figureType = "Child";

    return constructSingleProductPrompt(params, koreanName, arValue, orientation, figureType, layoutInstruction, backgroundInstruction);
  }
};

const constructWholeBodyAllPrompt = (arValue: string, orientation: string, layoutInstruction: string, background: string) => {
    // Group products by HEALTH CATEGORY for the label
    // Format: "Category : Product, Product..."
    // Ensuring ALL products are mapped overlapping where necessary
    const categoryMap: Record<string, string[]> = {
        "눈 건강": [],
        "혈행/면역": [],
        "간/위/장": [],
        "뼈/관절": [],
        "기초/세포": []
    };

    USANA_PRODUCTS.forEach(p => {
        const kName = getKoreanName(p.name);
        
        // Mapping logic to cover all products
        if (p.name.includes("Visionex") || p.targetBodyPart.includes("Eye")) {
            categoryMap["눈 건강"].push(kName);
        }
        
        if (p.targetBodyPart.includes("Blood") || p.targetBodyPart.includes("Heart") || p.name.includes("CoQuinone") || p.name.includes("Circulate") || p.targetBodyPart.includes("Immune") || p.name.includes("Proglucamune") || p.name.includes("Poly C") || p.name.includes("Booster") || p.name.includes("E-Prime") || p.targetBodyPart.includes("Brain")) {
            // Brain is often associated with Biomega (Blood) in this context or general health
            categoryMap["혈행/면역"].push(kName);
        }
        
        if (p.targetBodyPart.includes("Liver") || p.targetBodyPart.includes("Gut") || p.targetBodyPart.includes("Stomach") || p.targetBodyPart.includes("Intestine") || p.targetBodyPart.includes("Colon") || p.name.includes("Hepasil") || p.name.includes("Probiotic") || p.name.includes("Aloenz") || p.name.includes("Fibergy") || p.name.includes("Enzyme") || p.name.includes("Metabolism")) {
            categoryMap["간/위/장"].push(kName);
        }
        
        if (p.targetBodyPart.includes("Bone") || p.targetBodyPart.includes("Joint") || p.targetBodyPart.includes("Muscle") || p.targetBodyPart.includes("Skeleton")) {
            categoryMap["뼈/관절"].push(kName);
        }
        
        if (p.name.includes("HealthPak") || p.name.includes("CellSentials") || p.name.includes("Nutrimeal") || p.name.includes("Usanimals")) {
            categoryMap["기초/세포"].push(kName);
        }
    });

    const mappingList = Object.entries(categoryMap).map(([cat, products]) => {
        if (products.length === 0) return null;
        // Unique products only, joined by comma
        const uniqueProducts = Array.from(new Set(products)).join(', ');
        return `    *   **${cat}**: ${uniqueProducts}`;
    }).filter(Boolean).join('\n');

    return `**Role:** Medical Illustrator & Crystal Artist
**Task:** Create a "USANA TOTAL HEALTH MAP" visualization.

**[CRITICAL CONFIGURATION]**
*   **Aspect Ratio:** ${arValue} (${orientation}) -- **MUST BE EXACT**
*   **Layout:** ${layoutInstruction} (ENSURE FEET ARE VISIBLE)
*   ${background}

**VISUAL STYLE: "SHARP CRYSTAL BODY + REALISTIC ORGANS"**
1.  **The Figure:** A magnificent **Transparent Crystal Human Figure** standing on the marble floor.
    *   **Texture:** High-definition optical glass. Sharp edges. No blur. No lens flare.
2.  **Organ Visualization:**
    *   **Base State:** The body shell is **TRANSPARENT CLEAR CRYSTAL**.
    *   **Active State:** The key organs (Brain, Heart, Liver, Stomach, Intestines, Bones) are **ACTIVATED** with **REALISTIC BIOLOGICAL COLORS** (Red, Pink, Brown, White) to show vitality.
    *   **Contrast:** The realistic organs must look like 3D specimens floating inside the glass body.

**PREMIUM NAMEPLATES**
*   **Style:** **Floating Holographic Glass Panels** with glowing edges.
*   **Text Rendering:** **HIGH-CLARITY KOREAN TEXT**. Modern, bold font.
*   **Alignment:** **PERFECTLY HORIZONTAL**. No slanted text.
*   **Format:** "Category : Product, Product"
*   **Labels to Render:**
${mappingList}

**ATMOSPHERE**
*   **Mood:** Ultimate Health, Clarity, Complete Protection.
*   **Lighting:** Soft studio lighting, high clarity, no glare.

**FINAL CHECK:**
1. Is the **FULL BODY** visible from head to toe?
2. Are organs **REALISTIC** inside the crystal?
3. Is text format **"카테고리 : 제품, 제품"**?
4. Is the background clean (no sun glare)?`;
};

const constructHealthCategoryPrompt = (params: BrandParams, arValue: string, orientation: string, layoutInstruction: string, background: string) => {
    const categoryName = params.productName;
    const products = USANA_PRODUCTS.filter(p => params.selectedProductIds?.includes(p.id));
    
    const isChildCategory = categoryName.includes("어린이");
    const figureType = isChildCategory ? "CHILD (Boy or Girl)" : "ADULT HUMAN (Unisex)";

    const labelList = products.map(p => {
        const kName = getKoreanName(p.name);
        const benefit = getShortBenefit(p.benefit);
        return `* ${kName} (${benefit})`;
    }).join('\n    ');

    const organVisuals = products.map(p => {
        return `- **${p.targetBodyPart}**: **REALISTIC COLOR & TEXTURE** (${p.organColor}).`;
    }).join("\n");

    return `**Role:** Medical Illustrator & Crystal Artist
**Task:** Create a **TRANSPARENT CRYSTAL ${figureType}** visualization for USANA "${categoryName}".

**[CRITICAL CONFIGURATION]**
*   **Aspect Ratio:** ${arValue} (${orientation}) -- **MUST BE EXACT**
*   **Layout:** ${layoutInstruction}
*   ${background}

**VISUAL STYLE: "CRYSTAL BODY + REALISTIC HIGHLIGHTS"**
1.  **The Figure:** A transparent crystal ${figureType.toLowerCase()} standing on marble.
2.  **Organ Visualization:**
    *   **Base:** The body shell is clear high-index crystal. Sharp and clean.
    *   **Target Organs:** Specific organs for **${categoryName}** are **REALISTICALLY RENDERED** inside.
    *   **Details:**
${organVisuals}

**LABELS**
*   **Action:** Generate **Floating Crystal Nameplates** near the target organs.
*   **Text Format (KOREAN):** "Product Name (Benefit)"
*   **Alignment:** **PERFECTLY HORIZONTAL**.
*   **Labels:**
    ${labelList}

**ATMOSPHERE**
*   **Mood:** Clean, Healthy, Bright, Medical Excellence.

**FINAL CHECK:**
1. Is the **FULL BODY** visible?
2. Are target organs **REALISTIC**?
3. Is text format **"제품명 (효능)"**?`;
};

const constructSingleProductPrompt = (params: BrandParams, koreanName: string, arValue: string, orientation: string, figureType: string, layoutInstruction: string, background: string) => {
  const benefit = params.healthBenefit || "";
  
  // Logic to identify multiple target areas based on benefit keywords
  let targetInstructions = `Highlight the **${params.targetBodyPart}** in **REALISTIC COLOR & SHAPE** inside the crystal body.`;
  
  if (benefit.includes("혈행") || benefit.includes("눈") || benefit.includes("뇌") || koreanName.includes("바이오메가")) {
      targetInstructions = `Highlight **MULTIPLE** areas in **REALISTIC COLORS**:
      1. **Brain** (Realistic Grey/Pink)
      2. **Eyes** (Detailed Iris)
      3. **Heart & Blood Vessels** (Realistic Red)
      **ACTION:** Draw multiple thin lines from the single product label connecting to ALL these areas (Head, Eyes, Chest).`;
  } else if ((benefit.includes("장") && benefit.includes("면역")) || koreanName.includes("프로바이오틱")) {
      targetInstructions = `Highlight **Intestines (Realistic Pink)** and **Immune Nodes (White)**. Connect label to both.`;
  } else if (koreanName.includes("헬스팩")) {
      targetInstructions = `Highlight **Whole Body Cells** as glowing golden vitality points, plus **Vital Organs** (Heart, Liver, Brain) in subtle realistic colors. Connect label to center body.`;
  }

  const labelText = `${koreanName} (${getShortBenefit(benefit)})`;

  return `**Role:** Medical Illustrator & Crystal Artist
**Task:** Create a **TRANSPARENT CRYSTAL ${figureType.toUpperCase()}** for USANA '${koreanName}'.

**[CRITICAL CONFIGURATION]**
*   **Aspect Ratio:** ${arValue} (${orientation}) -- **MUST BE EXACT**
*   **Layout:** ${layoutInstruction}
*   ${background}

**VISUAL STYLE: "CRYSTAL BODY + REALISTIC ORGAN"**
1.  **Material:** The body is High-Index Optical Crystal. Transparent, Sharp, No Glare.
2.  **Targets:** ${targetInstructions}
    *   **Contrast:** The target organ stands out because it looks **REALISTIC**, floating inside the clear glass body.

**PREMIUM NAMEPLATE**
*   **Action:** A sleek **Holographic Crystal Plate** floating near the highlighted area.
*   **Logic:** If multiple areas (e.g. Brain & Heart), use thin lines to connect label to all areas.
*   **Alignment:** **PERFECTLY HORIZONTAL**.
*   **TEXT (KOREAN):** "${labelText}"

**ATMOSPHERE**
*   **Mood:** Vitality, Clean, Premium.

**FINAL CHECK:**
1. Is the **FULL BODY** visible?
2. Is the target organ **REALISTIC**?
3. Is the label **"${labelText}"**?`;
};

const constructManualInputPrompt = (query: string, arValue: string, orientation: string, layoutInstruction: string, background: string) => {
    return `**Role:** Medical Illustrator & Crystal Artist
**Task:** Create a Crystal Body visualization interpreting the keyword: "${query}".

**[CRITICAL CONFIGURATION]**
*   **Aspect Ratio:** ${arValue} (${orientation})
*   **Layout:** ${layoutInstruction}
*   ${background}

**VISUAL STYLE: "CRYSTAL BODY + INTELLIGENT HIGHLIGHTS"**
1.  **The Figure:** A magnificent **Transparent Crystal Human Figure** standing on the marble floor.
2.  **Smart Highlight:** 
    *   Identify the body parts associated with the keyword "${query}" (e.g., if "Eye", show Eyes; if "Fatigue", show Liver/Energy; if "Diet", show Body Shape/Stomach).
    *   **Action:** Render these identified parts in **REALISTIC COLORS & TEXTURES** inside the clear crystal shell.
    *   **Contrast:** The realistic parts must float visibly inside the glass body.

**LABELS**
*   **Style:** Floating Holographic Crystal Panel.
*   **Text (KOREAN):** "맞춤 설계 : ${query}"
*   **Alignment:** Horizontal.

**ATMOSPHERE**
*   **Mood:** Clean, Professional, Personalized Health.

**FINAL CHECK:**
1. Is the **FULL BODY** visible?
2. Are the parts relevant to "${query}" highlighted **REALISTICALLY**?
3. Is the label "맞춤 설계 : ${query}"?`;
};
