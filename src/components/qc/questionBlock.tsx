import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import api from "@/api";

interface QuestionBlockProps {
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  selectedAnswer?: string;
  onanswerSelect?: (answer: string) => void;
}


const QuestionBlock: React.FC<QuestionBlockProps> = ({ question, answer1, answer2, answer3, selectedAnswer, onanswerSelect }) => (
  <div className="border-2 rounded-lg p-3 space-y-4 text-lg">
    <p className="text-xl font-bold">{question}</p>
    <RadioGroup value={selectedAnswer} className="space-y-4" onValueChange={onanswerSelect}>
      {[answer1, answer2, answer3].map((answer, index) => (
        <div key={index} className="flex items-center space-x-2">
          <RadioGroupItem value={answer} id={`option-${index + 1}`} />
          <Label htmlFor={`option-${index + 1}`} className="text-lg">{answer}</Label>
        </div>
      ))}
    </RadioGroup>

  </div>
);

export default QuestionBlock;
