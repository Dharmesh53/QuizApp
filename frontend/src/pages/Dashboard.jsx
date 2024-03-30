import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Pencil1Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { Button } from "@/components/ui/button";

axios.defaults.withCredentials = true;

const dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [quizzes, setQuizzes] = useState([]);

  const sendRequest = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user", {
        withCredentials: true,
      });
      if (res.status == 400) {
        dispatch(logout());
        navigate("/login");
      }
      const data = await res.data;
      return data;
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    sendRequest().then(async (data) => {
      setUser(data);
      const quizReq = data.quizzes.map(async (id) => {
        const res = await axios.get(
          `http://localhost:5000/api/quizzes?id=${id}&dashboard=true`
        );
        return res.data;
      });
      const result = await Promise.all(quizReq);
      setQuizzes(result);
    });
  }, []);

  return (
    <div className="flex flex-col gap-5 mt-10">
      <span className="text-4xl font-bold">
        {user && (
          <span>{user.name[0].toUpperCase() + user.name.slice(1)}'s </span>
        )}
        Dashboard
      </span>
      <div className="flex justify-between border-b-2 border-black pb-2">
        <div className="text-xl">Your Quizes</div>
        <div>
          {user && (
            <Link to={`/create/${user._id}`}>
              <Button>
                Create a Quiz
                <Pencil1Icon className="ml-3" />
              </Button>
            </Link>
          )}
        </div>
      </div>
      <div>
        <Table>
          <TableCaption>A list of Quizzes created by you.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Quiz ID</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>No. of Questions</TableHead>
              <TableHead className="text-right">
                No. of Users Attempted
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quizzes?.map(
              (quiz, i) =>
                quiz && (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{i}</TableCell>
                    <TableCell>
                      {quiz.difficult[0].toUpperCase() +
                        quiz.difficult.slice(1)}
                    </TableCell>
                    <TableCell>{quiz.data.length} </TableCell>
                    <TableCell className="text-right">
                      {quiz?.users.length}
                    </TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default dashboard;
