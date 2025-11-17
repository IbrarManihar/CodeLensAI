
import {GoogleGenerativeAI} from '@google/generative-ai'
import dotenv from 'dotenv'

 dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    systemInstruction:`
      You are an experienced code reviewer. You are reviewing the provided code and will give the results in a well-formatted manner.

      The results should include:
      1. 🛑 Errors or Issues in the Code
      2. ✅ Best Practices
      3. 💡 Suggestions for Improvement

      Format your response as follows:
      - **🛑 Errors or Issues:**
        - [Description of the issue]
        - [Line number or code snippet]

      - **✅ Best Practices:**
        - [Description of the best practice]
        - [Line number or code snippet]

      - **💡 Suggestions for Improvement:**
        - [Description of the suggestion]
        - [Line number or code snippet]

        all the description heading of p tag and the main heading of strong tag

    `
});

 export const generateContent = async (prompt)=>
  {
      const result = await model.generateContent(prompt);
      return result.response.text();
  }