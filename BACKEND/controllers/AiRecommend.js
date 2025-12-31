const User = require("../models/User");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINIAPI);

const RecommendFood = async (req, res) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const { item } = req.body;
  const userId = req.user.id;

  if (!item) {
    return res.status(400).json({
      success: false,
      message: "Food item is required",
    });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userHealth = user?.health || {};

    // system instructions
    const systemPrompt = `
You are a professional but friendly nutrition coach 👩‍⚕️🥗.  
Your role is to give a **detailed and structured nutrition recommendation** about a food item.  
⚡ RULES:
- Answer in **JSON only** (no markdown, no extra commentary).  
- Always include:  
   - "recommendation": "yes" | "no" | "moderate"  
   - "reason": Short summary of decision  
   - "benefits": 2–3 bullet-style points of health benefits 🌱  
   - "sideEffects": 2–3 bullet-style points of harmful effects / side effects if eaten too much 🚫  
   - "suggestions": Clear guidance on portion, frequency, and best time to eat (e.g., morning vs night, workout days, etc.) ⏰  
   - "bestTimeToEat": Specific timing recommendation
   - "friendlyText": Tiny motivational message with emojis ❤️  
Keep the language **simple, user-friendly, but professional**.  
Give enough detail to feel like real health advice, not just a one-liner.  
`;

    // user-specific content
    const userPrompt = `
User health profile: ${JSON.stringify(userHealth)}
Food item: ${JSON.stringify(item)}
Task: Based on user's health, give a detailed, structured food recommendation using the rules above. 
`;

    // call Gemini
    const result = await model.generateContent(
      `${systemPrompt}\n${userPrompt}`
    );

    // get text safely
    const output = result.response.text();
    let parsed;
    try {
      // Remove Markdown code block if present
      const cleaned = output
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      parsed = JSON.parse(cleaned);
    } catch (err) {
      parsed = { raw: output }; // fallback if still invalid
    }

    // Prepare the response data with additional info
    const responseData = {
      ...parsed,
      userHealth: userHealth,
      foodItem: item,
      analyzedAt: new Date().toISOString(),
      userId: userId,
    };

    res.status(200).json({
      success: true,
      message: "Recommended successfully",
      data: responseData,
    });
  } catch (error) {
    console.error("Error in RecommendFood:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const chat = async (req, res) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.json({
        success: false,
        message: "Prompt is required",
      });
    }

    const result = await model.generateContent(prompt);

    // Get safe output
    const output = result.response.text();

    res.status(200).json({
      success: true,
      message: "Response generated successfully",
      data: output,
    });
  } catch (error) {
    console.error("Error in chat:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { RecommendFood, chat };
