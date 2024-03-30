import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";

const CreateQuestion = ({ data, setData, index }) => {
  const [options, setOptions] = useState(new Array(4).fill(""));
  const [answers, setAnswers] = useState(new Array(4).fill(false));

  const handleQuestion = (e) => {
    setData((prev) => {
      const newData = [...prev];
      newData[index].question = e.target.value;
      return newData;
    });
  };

  const handleAddOption = (e) => {
    setOptions((prev) => [...prev, ""]);
    setAnswers((prev) => [...prev, false]);
    data[index].options.push("");
  };

  const handleCheckBox = (i) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[i] = !newAnswers[i];
      setData((prev) => {
        const newData = [...prev];
        const currentOptions = newData[index].options;
        const checkedOption = currentOptions[i];

        const answerIndex = newData[index].answers.indexOf(checkedOption);

        if (newAnswers[i] && answerIndex === -1) {
          newData[index].answers.push(checkedOption);
        } else if (!newAnswers[i] && answerIndex !== -1) {
          newData[index].answers.splice(answerIndex, 1);
        }
        return newData;
      });
      return newAnswers;
    });
    // TODO: find any other good solution
  };

  const handleOptions = (e, i) => {
    setData((prev) => {
      const newData = [...prev];
      newData[index].options[i] = e.target.value;
      return newData;
    });
  };

  return (
    <div>
      <div className="mt-3">
        <span className="font-semibold">Question no. {index + 1}</span>
        <Input
          value={data[index].question}
          onChange={(e) => handleQuestion(e)}
        />
      </div>
      <div className="options mt-3">
        <div className="flex justify-between ">
          <span className="flex  items-center font-semibold">Options</span>
          <Button variant="link" type="a" onClick={() => handleAddOption()}>
            Add Option
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          {options.map((_, i) => (
            <div key={i}>
              <div className="flex justify-between">
                <span>{i + 1}</span>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`terms${i}${index}`}
                    checked={answers[i]}
                    onCheckedChange={() => handleCheckBox(i)}
                  />
                  <label
                    htmlFor={`terms${i}${index}`}
                    className="text-sm font-normal select-none"
                  >
                    Mark as answer
                  </label>
                </div>
              </div>
              <Input
                name={`${i}`}
                value={data[index].options[i]}
                onChange={(e) => handleOptions(e, i)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateQuestion;
