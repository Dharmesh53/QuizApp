import axios from "axios";
import Card from "../components/QuizCard";
import { useEffect } from "react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Home = () => {
  const { toast } = useToast();
  const [data, setData] = useState([]);
  const sendReq = async () => {
    try {
      const res = await axios.get("https://quizapp-1e1n.onrender.com/api/quizzes");
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
    sendReq().then((item) => setData(item));
  }, []);
  return (
    <div className="mt-4">
      {data.length > 0 && (
        <div className="grid  gap-3 md:grid-cols-2 sm:grid-cols-1">
          {data.map((item, i) => (
            <div key={i}>
              <Card quiz={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
