import axios from "axios";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Question from "../components/CreateQuestion";
import { useParams, useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const Create = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const format = {
    question: "",
    options: new Array(4).fill(""),
    answers: [],
  };
  const [difficult, setDifficult] = useState("easy");
  const [topics, setTopics] = useState("");
  const [data, setData] = useState([format]);

  const sendReq = async () => {
    try {
      const quiz = {
        id,
        data,
        difficult,
        topics,
      };
      const res = await axios.post(
        "https://quizapp-1e1n.onrender.com/api/createQuiz",
        quiz
      );
      console.log(res.data);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleSubmit = () => {
    const isEmpty = data.some(
      (item) =>
        item.question.trim() === "" ||
        item.options.some((option) => option.trim() === "")
    );
    const hasAnswer = data.some((item) => item.answers.length === 0);
    if (isEmpty) {
      toast({
        title: "Error",
        description: "Please fill in all questions and options.",
      });
    } else if (hasAnswer) {
      toast({
        title: "Error",
        description:
          "Please mark at least one option as an answer for each question",
      });
    } else if (topics === "") {
      toast({
        title: "Error",
        description: "Please fill in the topics",
      });
    } else {
      sendReq().then(() => {
        toast({
          title: "Done !! ",
          description: "Created your quiz, Redirecting to Dashboard in 3s",
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      });
    }
  };

  return (
    <div className="mt-5">
      <div>
        <div>
          <span className="font-medium">Difficulty</span>
          <Select value={difficult} onValueChange={setDifficult}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Easy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="my-3">
          <span className="font-medium">Topics</span>
          <Textarea
            placeholder="Seperate topics with comma"
            onChange={(e) => setTopics(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          {data.map((_, i) => (
            <div key={i}>
              <div className=" border-gray-400 border-t-2 ">
                <Question data={data} setData={setData} index={i} />
              </div>
              <Button
                variant="secondary"
                className="w-full hover:bg-red-800 hover:text-white duration-200 transition-colors my-3"
                onClick={() => {
                  setData((prevData) =>
                    prevData.filter((_, index) => index !== i)
                  );
                }}
              >
                Remove Question
              </Button>
            </div>
          ))}
        </div>
        <Button
          variant="secondary"
          onClick={() => setData((prev) => [...prev, format])}
        >
          Add Question
        </Button>
      </div>
      <Button
        onClick={() => handleSubmit()}
        className="flex w-full font-bold my-5 bg-purple-900"
      >
        Create
      </Button>
    </div>
  );
};

export default Create;
