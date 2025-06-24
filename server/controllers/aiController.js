import {
  questionAnswerPrompt,
  conceptExplainPrompt,
} from "../utils/prompts.js";

import JSON5 from "json5";

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyBSdPdjI2_47kX-s3jpQkeYAJCf5ug2OHQ");

const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const response = await model.generateContent(prompt);
    const candidates = response.response.candidates;
    const firstCandidate = candidates[0];
    const parts = firstCandidate.content.parts;
    const rawText = parts.map((part) => part.text || "").join("");

    const jsonMatch = rawText.match(/\[\s*{[\s\S]*?}\s*\]/);

    if (!jsonMatch) {
      throw new Error("Failed to extract valid JSON from the response.");
    }

    const cleanedText = jsonMatch[0]; 
    const data = JSON.parse(cleanedText);
    const formattedData = data.map((item) => ({
      question: item.question,
      answer: item.answer, 
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to generate questions",
      error: error.message,
    });
  }
};

const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ msg: "Question is required" });
    }

    const prompt = conceptExplainPrompt(question);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const response = await model.generateContent(prompt);
    const candidates = response.response.candidates;
    const firstCandidate = candidates[0];
    const parts = firstCandidate.content.parts;
    const rawText = parts.map((part) => part.text || "").join("");

    let cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```[\s\S]*$/, "")
      .trim();

    let data;
    try {
      data = JSON5.parse(cleanedText);
    } catch (err) {
      console.error("JSON Parse Error:", err.message);
      return res.status(500).json({
        msg: "Invalid JSON returned by AI",
        error: err.message,
        raw: cleanedText,
      });
    }

    const formattedData = {
      title: data.title,
      explanation: data.explanation
        .replace(/\n/g, "<br>")
        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
        .replace(/\*(.*?)\*/g, "<i>$1</i>"),
    };


    return res.status(200).json(formattedData);
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to generate questions",
      error: error.message,
    });
  }
};

export { generateInterviewQuestions, generateConceptExplanation };
