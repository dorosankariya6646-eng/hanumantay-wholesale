export const generateInquiryDraft = async (
  businessName: string,
  requirements: string
): Promise<string> => {
  try {
    // Placeholder for Gemini API integration
    // In production, this would call the actual Gemini API
    return `Dear Hanumantay Enterprise Team,

I am ${businessName}, and I am interested in your wholesale products.

${requirements}

Could you please provide:
- Bulk pricing details
- Minimum order quantities (MOQ)
- Shipping options to my location
- Payment terms

Looking forward to your response.

Best regards,
${businessName}`;
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "Error generating draft. Please type your message manually.";
  }
};