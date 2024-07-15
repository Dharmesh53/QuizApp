import axios from "axios";
import ShowQuestion from "../components/ShowQuestion";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [userId, setUserId] = useState("");
  const [quizData, setQuizData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);
  const [result, setResult] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const sendReq = async () => {
    try {
      const res = await axios.get(`https://quizapp-1e1n.onrender.com/api/quizzes?id=${id}`);
      const result = res.data;
      return result;
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
      });
    }
  };

  useEffect(() => {
    sendReq().then((result) => {
      setQuizData(result);
      setAnswers(new Array(result?.data.length).fill(new Array()));
    });
  }, []);

  const handleStart = async () => {
    try {
      const res = await axios.get("https://quizapp-1e1n.onrender.com/api/user");
      const result = res.data;
      setUserId(result._id);
      if (res.status == 200) {
        setStart(true);
      }
    } catch (error) {
      navigate("/login");
    }
  };

  const handleSubmit = async () => {
    let totalCorrect = 0;
    quizData.data.forEach((question, idx) => {
      let tmp = 0;
      for (let i = 0; i < answers[idx].length; i++) {
        const ans = answers[idx][i];
        if (question.answers.includes(ans)) {
          tmp++;
        }
      }
      if (tmp === question.answers.length) {
        totalCorrect++;
      }
    });

    try {
      await axios.post(`https://quizapp-1e1n.onrender.com/api/updateQuiz?id=${id}`, {
        answers,
        result: totalCorrect,
        userId,
      });
      setResult(totalCorrect);
      setFinish(true);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  return (
    <div className="sm:w-full sm:m-1 w-3/4 m-auto">
      {finish ? (
        <div className="flex flex-col justify-center items-center bg-slate-50 rounded-xl mt-6 p-4 leading-10">
          <span className="text-2xl font-bold">
            Quiz Submitted Successfully!!
          </span>
          <span></span>
          <span>
            {result == quizData.data.length && "Congratulations , "}You Scored{" "}
            {result} out of {quizData.data.length}
          </span>
          <div>
            <Link to="/" className="text-sm ">
              <Button variant="link">Return to home page</Button>
            </Link>
            <Link to="/dashboard" className="text-sm ">
              <Button variant="link">Go to Dashborad</Button>
            </Link>
          </div>
        </div>
      ) : start ? (
        <div className="flex flex-col">
          <ShowQuestion
            data={quizData.data}
            answers={answers}
            setAnswers={setAnswers}
          />
          <div className="flex justify-center">
            <Button
              className="mt-6 bg-purple-900 hover:bg-purple-600"
              onClick={handleSubmit}
            >
              Submit Quiz
            </Button>
          </div>
        </div>
      ) : (
        <div className=" bg-slate-50 rounded-xl mt-6 p-4 leading-10">
          <p className="font-bold text-xl">Instructions</p>
          <p>
            · Avoid any form of cheating, including using unauthorized materials
            or seeking external help.
          </p>
          <p>
            · Complete the quiz independently; do not share answers with others.
          </p>
          <p>
            · Ensure a stable internet connection and compatible device/browser.
          </p>
          <p>· Click "Start Quiz" after logging in with your credentials.</p>
          <p>
            · Use "Previous" and "Next" buttons to move between questions and
            double-check answers before submission.
          </p>
          <p>· Click "Submit Quiz" when finished, confirm if prompted.</p>
          <p>
            Note: Non-compliance may result in penalties, contact your
            instructor for queries. Good luck!
          </p>
          <Button className="w-full mt-6" onClick={handleStart}>
            Start Quiz
          </Button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
