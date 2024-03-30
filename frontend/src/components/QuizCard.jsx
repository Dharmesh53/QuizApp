import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const QuizCard = ({ quiz }) => {
  return (
    <Link to={`/quiz/${quiz._id}`}>
      <div className="cursor-pointer overflow-hidden">
        <Card
          className={` hover:bg-gradient-to-t ${
            quiz.difficult === "easy"
              ? "from-cyan-400"
              : quiz.difficult === "medium"
              ? "from-yellow-400"
              : "from-red-400"
          } to-white `}
        >
          <CardHeader>
            <CardTitle className="leading-7">{quiz.topics}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{quiz.data.length} Question</p>
          </CardContent>
          <CardFooter>
            <p className="opacity-50">
              {quiz.difficult[0].toUpperCase() + quiz.difficult.slice(1)}
            </p>
          </CardFooter>
        </Card>
      </div>
    </Link>
  );
};

export default QuizCard;
