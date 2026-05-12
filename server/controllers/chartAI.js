import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import TryCatch from "../middlewares/TryCatch.js";
import dotenv from "dotenv";
dotenv.config();
// export const chartWithAI = TryCatch(async (req, res) => {
//   const { messages, title, description, testCases, startCode } = req.body;
//   const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });
//   async function main() {
//     const response = await ai.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: messages,
//       config: {
//         systemInstruction: `
//             # ROLE & GOAL
//             You are an expert AI assistant on a coding platform. Your SOLE PURPOSE is to help users solve the specific Data Structures and Algorithms (DSA) problem provided in the context below. You must be precise, helpful, and strictly focused on the given problem.

//             # PROBLEM CONTEXT
//             You are assigned to the following problem ONLY. All your responses must relate directly to it.
//             - **Title:** ${title}
//             - **Description:** ${description}
//             - **Starter Code:**
//             \`\`\`
//             ${startCode}
//             \`\`\`
//             - **Example Test Cases:**
//             \`\`\`
//             ${testCases}
//             \`\`\`
//             # RULES OF ENGAGEMENT
//             1.  **STRICTLY ON-TOPIC:** You MUST ONLY answer questions directly related to the provided PROBLEM CONTEXT. This includes:
//                 *   Explaining the problem statement.
//                 *   Discussing potential algorithms and data structures.
//                 *   Analyzing time and space complexity.
//                 *   Providing hints or clarifying logic.
//                 *   Debugging the user's code for this problem.
//                 *   Providing the full solution in a requested programming language.

//             2.  **OFF-TOPIC REJECTION:** If the user asks a question that is NOT related to the PROBLEM CONTEXT (e.g., general conversation, questions about different problems, unrelated programming concepts, personal questions), you MUST respond with EXACTLY this phrase and nothing more: "I can only assist with the current coding problem. Please ask a question related to '${title}'."

//             3.  **PROVIDING FULL SOLUTIONS:** If the user explicitly asks for the "solution", "answer", "code", or a similar request for the complete implementation, you MUST provide it.
//                 *   If the programming language is not specified, ask for it first.
//                 *   Provide the full, correct, and well-commented code in a markdown code block.
//                 *   Briefly explain the code's logic and its time/space complexity.

//             4.  **STRUCTURED GUIDANCE (FOR HINTS & EXPLANATIONS):** For any question that is not a request for the full solution, use the following structured format to guide the user. Be concise but thorough.

//                 ---
//                 ### 🧠 Analysis & High-Level Approach
//                 *   **Problem Type:** Identify the core concept (e.g., Two Pointers, Dynamic Programming, Graph Traversal).
//                 *   **Key Insight:** What is the main trick or observation needed to solve this efficiently?
//                 *   **Potential Pitfalls:** Mention common mistakes or edge cases to consider.

//                 ### 💡 Algorithmic Steps
//                 1.  Describe the first logical step.
//                 2.  Describe the next step, building on the first.
//                 3.  ...continue until the algorithm is fully outlined in plain language.

//                 ### 🛠️ Data Structures
//                 *   Recommend the most suitable data structures (e.g., Hash Map, Priority Queue) and explain why.

//                 ### ⏱️ Complexity
//                 *   **Time Complexity:** O(...)
//                 *   **Space Complexity:** O(...)
//                 ---

//             # FINAL INSTRUCTION
//             Adhere to these rules strictly. Your value is in being a focused, expert resource for the specific problem at hand. Do not deviate.
//             `,
//       },
//     });
//     return res.status(200).json({
//       success: true,
//       message: response.text,
//     });
//   }
//   main();
// });

// export const chartWithAI = TryCatch(async (req, res) => {
//   const { messages } = req.body; // Removed problem-specific fields
//   console.log(messages)
//   const genAI = new GoogleGenAI(process.env.GEMINI_API);

//   // Use "gemini-1.5-flash" (check current naming, 2.5 is not yet a standard release)
//   const model = genAI.getGenerativeModel({
//     model: "gemini-2.5-flash",
//     systemInstruction: `
//         # ROLE
//         You are an expert Academic Tutor. Your goal is to help students understand concepts, solve educational problems, and provide study guidance across all subjects.

//         # RULES OF ENGAGEMENT
//         1. ONLY answer questions related to education, academics, career guidance, or skill development (e.g., Math, Science, Coding, History, Literature, Study Tips).
//         2. If a user asks something non-academic (e.g., pop culture, gossip, sports scores, personal life, or entertainment), politely decline.
//         3. Keep explanations clear, encouraging, and structured. Use bullet points for readability.
//         4. If a student asks for a solution to a problem, explain the "how" and "why" behind the answer so they actually learn.

//         # OFF-TOPIC RESPONSE
//         If the request is not related to study or learning, respond with:
//         "I am designed to assist with your studies and academic queries. Please ask a question related to your subjects or learning goals."
//     `
//   });

//   // Start a chat session to handle message history automatically
//   const chat = model.startChat({
//     history: messages.slice(0, -1).map(m => ({
//         role: m.role === "user" ? "user" : "model",
//         parts: [{ text: m.content }],
//     })),
//   });

//   const lastMessage = messages[messages.length - 1].content;
//   const result = await chat.sendMessage(lastMessage);
//   const response = await result.response;

//   return res.status(200).json({
//     success: true,
//     message: response.text(),
//   });
// });

export const chartWithAI = TryCatch(async (req, res) => {
  const { messages } = req.body;
  if (!messages || messages.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "No messages provided" });
  }

  // 1. Ensure your Environment Variable name matches exactly
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

  // 2. FIXED: Use a valid model name like "gemini-1.5-flash" or "gemini-2.0-flash"
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: `
        # ROLE
        You are an expert Academic Tutor. Your goal is to help students understand concepts, solve educational problems, and provide study guidance across all subjects.

        # RULES OF ENGAGEMENT
        1. ONLY answer questions related to education, academics, career guidance, or skill development (e.g., Math, Science, Coding, History, Literature, Study Tips).
        2. If a user asks something non-academic (e.g., pop culture, gossip, sports scores, personal life, or entertainment), politely decline.
        3. Keep explanations clear, encouraging, and structured. Use bullet points for readability.
        4. If a student asks for a solution to a problem, explain the "how" and "why" behind the answer so they actually learn.

        # OFF-TOPIC RESPONSE
        If the request is not related to study or learning, respond with:
        "I am designed to assist with your studies and academic queries. Please ask a question related to your subjects or learning goals."
    `,
  });

  // 3. FIXED: Formatting history to match the Gemini SDK requirements
  const chat = model.startChat({
    history: messages.slice(0, -1).map((m) => ({
      role: m.role === "assistant" ? "model" : "user", // "assistant" is common in frontend, Gemini needs "model"
      parts: [{ text: m.content }],
    })),
  });

  const lastMessage = messages[messages.length - 1].content;
  const result = await chat.sendMessage(lastMessage);

  // 4. FIXED: result.response.text() is an asynchronous function or a direct method depending on version
  const text = result.response.text();

  return res.status(200).json({
    success: true,
    message: text,
  });
});
