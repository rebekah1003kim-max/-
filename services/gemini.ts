
import { GoogleGenAI, Type } from "@google/genai";

export async function getSmartConsultation(prompt: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `
      사용자가 특장차 제어 시스템에 대해 문의합니다. 
      사용자의 요청 내용을 분석하여 '명지'에서 제공할 수 있는 제어 솔루션, 예상되는 기술 스택(PLC, 유압, 통신 등), 그리고 안전 고려사항을 전문가적 관점에서 답변해주세요. 
      답변은 친절하고 전문적인 한국어로 작성해주시기 바랍니다.
      
      사용자 문의 내용: ${prompt}
    `,
    config: {
      temperature: 0.7,
      topP: 0.95,
      maxOutputTokens: 1000,
    }
  });

  return response.text;
}
