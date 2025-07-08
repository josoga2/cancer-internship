import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";

interface QuestionBlockProps {
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
}

const QuestionBlock: React.FC<QuestionBlockProps> = ({ question, answer1, answer2, answer3 }) => (
  <div className="border-2 rounded-lg p-6 space-y-4 text-lg">
    <p className="text-xl font-bold">{question}</p>
    <RadioGroup defaultValue="none" className="space-y-4">
      {[answer1, answer2, answer3].map((answer, index) => (
        <div key={index} className="flex items-center space-x-2">
          <RadioGroupItem value={`option-${index + 1}`} id={`option-${index + 1}`} />
          <Label htmlFor={`option-${index + 1}`} className="text-lg">{answer}</Label>
        </div>
      ))}
    </RadioGroup>
    <Button className="w-fit bg-hb-green font-bold text-xl py-7 border-2 border-black">Submit</Button>
  </div>
);

export default QuestionBlock;
