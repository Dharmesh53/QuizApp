import { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "@/components/ui/progress";

const ShowQuestion = ({ data, setAnswers, answers }) => {
  const [index, setIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(
    data?.map((question) => new Array(question.options.length).fill(false))
  );

  const handleOptionClick = (i) => {
    const newSelectedOptions = [...selectedOptions];

    if (data[index]?.answers?.length === 1) {
      newSelectedOptions[index].fill(false);
      setAnswers((prev) => {
        const updatedAnswers = [...prev];
        updatedAnswers[index] = [];
        return updatedAnswers;
      });
    }

    newSelectedOptions[index][i] = !newSelectedOptions[index][i];

    const optionValue = data[index]?.options[i];

    setAnswers((prev) => {
      const updatedAnswers = [...prev];
      const optionIndex = updatedAnswers[index].indexOf(optionValue);

      if (newSelectedOptions[index][i]) {
        if (optionIndex === -1) {
          updatedAnswers[index].push(optionValue);
        }
      } else {
        if (optionIndex !== -1) {
          updatedAnswers[index].splice(optionIndex, 1);
        }
      }

      return updatedAnswers;
    });

    setSelectedOptions(newSelectedOptions);
  };

  return (
    <div className="bg-slate-50 rounded-xl mt-6 p-4 leading-10">
      {data[index] && (
        <div>
          <div className="flex justify-between">
            <span>
              Question {index + 1} out of {data.length}
            </span>
            <span>
              {data[index]?.answers?.length > 1 ? (
                <span className="text-sm text-zinc-500">
                  Multiple answer question
                </span>
              ) : (
                <span className="text-sm text-zinc-500">
                  Single answer question
                </span>
              )}
            </span>
          </div>
          <div>{data[index].question}</div>
          <div>
            {data[index]?.options?.map((item, i) => (
              <button
                key={i}
                className={`w-full border-2 border-gray-950 my-1 rounded-lg ${
                  selectedOptions[index][i]
                    ? "bg-black text-white"
                    : "hover:bg-gray-200 hover:text-black"
                }`}
                onClick={() => handleOptionClick(i)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="h-8 relative mt-6">
            {index > 0 && (
              <Button
                variant="outline"
                onClick={() => setIndex((prev) => prev - 1)}
                className="absolute"
              >
                Previous
              </Button>
            )}
            {index < data.length - 1 && (
              <Button
                variant="outline"
                onClick={() => setIndex((prev) => prev + 1)}
                className="absolute right-0"
              >
                Next
              </Button>
            )}
          </div>
        </div>
      )}
      <Progress
        value={(100 / data.length) * (index + 1)}
        className="mt-6 bg-gray-200"
      />
    </div>
  );
};

export default ShowQuestion;
