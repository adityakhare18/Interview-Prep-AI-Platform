import Session from "../models/Session.js";
import Question from "../models/Question.js";


export const createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } = req.body;

    const userId = req.user._id;

    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });

    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        return question._id;
      })
    );

    session.questions = questionDocs;
    await session.save();

    res.status(201).json({
      success: true,
      session,
    });
  } catch (error) {
    console.error("Error creating session:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};


export const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: -1 } },
      })

    if (!session) {
      return res.status(404).json({ success: false, msg: "Session not found" });
    }

    res.status(200).json({ success: true, session });
  } catch (error) {
    console.error("Error fetching session:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};





export const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id })
      .sort({ createdAt: -1 }) 
      .populate("questions"); 

    res.status(200).json(sessions)
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};





export const deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ success: false, msg: "Session not found" });
    }

    //check if the session belongs to the user
    if (session.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, msg: "Unauthorized to delete this session" });
    }

    // Delete associated questions
    await Question.deleteMany({ session: session._id }); // Delete associated questions

    await session.deleteOne(); // Delete the session

    res
      .status(200)
      .json({ msg: "Session deleted successfully"});
  } catch (error) {
    console.error("Error fetching session:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
