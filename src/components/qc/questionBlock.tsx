import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import api from "@/api";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

interface QuestionBlockProps {
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  selectedAnswer?: string;
  onanswerSelect?: (answer: string) => void;
}


const QuestionBlock: React.FC<QuestionBlockProps> = ({ question, answer1, answer2, answer3, selectedAnswer, onanswerSelect }) => (
  <div className="border-2 rounded-lg p-3 space-y-4 text-base">
    <Markdown
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeKatex]}
      components={{
        h1: ({ children }: any) => <p className="mb-2 text-base font-normal leading-7 text-gray-900 dark:text-gray-100">{children}</p>,
        h2: ({ children }: any) => <p className="mb-2 text-base font-normal leading-7 text-gray-900 dark:text-gray-100">{children}</p>,
        h3: ({ children }: any) => <p className="mb-2 text-base font-normal leading-7 text-gray-900 dark:text-gray-100">{children}</p>,
        p: ({ children }: any) => <p className="mb-2 text-base font-normal leading-7 text-gray-900 dark:text-gray-100">{children}</p>,
        pre: ({ children }: any) => (
          <pre className="mt-2 overflow-x-auto rounded-md bg-gray-950 p-3 font-mono text-xs text-gray-100">{children}</pre>
        ),
        code: ({ inline, children, ...props }: any) =>
          inline ? (
            <code {...props} className="rounded-sm bg-gray-100 px-1 py-0.5 font-mono text-xs text-gray-900">
              {children}
            </code>
          ) : (
            <code {...props} className="font-mono text-xs text-gray-100">
              {children}
            </code>
          ),
      }}
    >
      {question}
    </Markdown>
    <RadioGroup value={selectedAnswer} className="space-y-4" onValueChange={onanswerSelect}>
      {[answer1, answer2, answer3].map((answer, index) => (
        <div key={index} className="flex items-center space-x-2">
          <RadioGroupItem value={answer} id={`option-${index + 1}`} />
          <Label htmlFor={`option-${index + 1}`} className="text-sm">{answer}</Label>
        </div>
      ))}
    </RadioGroup>

  </div>
);

export default QuestionBlock;
