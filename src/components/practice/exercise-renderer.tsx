"use client";

import CodeEditor from "@/components/practice/code-editor";
import DragDropArea from "@/components/practice/drag-drop-area";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

type ExerciseRendererProps = {
  exerciseType: string;
  content: Record<string, any>;
  answer: any;
  onAnswerChange: (value: any) => void;
};

const SELECT_TYPES = new Set(["mcq", "plot_interpret", "tool_select", "scenario"]);
const CODE_TYPES = new Set(["command", "debug", "plot_reproduce", "dataset"]);
const ORDER_TYPES = new Set(["rearrange", "pipeline"]);

export default function ExerciseRenderer({
  exerciseType,
  content,
  answer,
  onAnswerChange,
}: ExerciseRendererProps) {
  const prompt = content?.prompt || "";
  const options = Array.isArray(content?.options) ? content.options : [];
  const isOrderType = ORDER_TYPES.has(exerciseType);
  const tokens = Array.isArray(content?.tokens)
    ? content.tokens
    : Array.isArray(content?.steps)
      ? content.steps
      : Array.isArray(content?.options)
        ? content.options
        : [];

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-green-700">Quiz Checkpoint</p>
        <div className={`mt-2 max-w-none text-gray-900 prose prose-sm ${isOrderType ? "font-mono" : ""}`}>
          <Markdown
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex]}
            components={{
              img: ({ ...props }) => (
                <img {...props} className="mt-2 max-h-64 w-full rounded-md border border-gray-200 object-contain" />
              ),
              code: ({ className, children, ...props }: any) => {
                const inline = !className;
                if (inline) {
                  return (
                    <code {...props} className="rounded-sm bg-gray-100 px-1 py-0.5 font-mono text-xs text-gray-900">
                      {children}
                    </code>
                  );
                }
                return (
                  <code {...props} className="block overflow-x-auto rounded-md bg-gray-950 p-3 font-mono text-xs text-gray-100">
                    {children}
                  </code>
                );
              },
            }}
          >
            {String(prompt)}
          </Markdown>
        </div>
      </div>

      {content?.dataset_preview ? (
        <div className="rounded-xl border border-gray-200 bg-white p-4 overflow-auto">
          <p className="text-xs font-semibold text-gray-500 uppercase">Dataset Preview</p>
          <pre className="text-xs text-gray-700 mt-2 whitespace-pre-wrap">{String(content.dataset_preview)}</pre>
        </div>
      ) : null}

      {content?.plot_url ? (
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <img src={content.plot_url} alt="exercise plot" className="w-full rounded-lg border border-gray-200" />
        </div>
      ) : null}

      {SELECT_TYPES.has(exerciseType) ? (
        <div className="flex flex-col gap-3">
          {options.map((option: any, index: number) => {
            const value = String(option?.value ?? option);
            const label = String(option?.label ?? option);
            const selected = String(answer || "") === value;
            return (
              <button
                key={`${value}-${index}`}
                type="button"
                onClick={() => onAnswerChange(value)}
                className={`w-full text-left rounded-xl border px-4 py-3 transition ${
                  selected
                    ? "border-green-600 bg-green-50 shadow-sm"
                    : "border-gray-300 bg-white hover:border-green-300"
                }`}
              >
                <span className="text-sm font-medium text-gray-900">{label}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      {CODE_TYPES.has(exerciseType) ? (
        <CodeEditor
          label="Your Answer"
          language={content?.editor || "bash"}
          value={typeof answer === "string" ? answer : String(answer || "")}
          onChange={onAnswerChange}
          placeholder={content?.placeholder || "Write your answer here"}
        />
      ) : null}

      {ORDER_TYPES.has(exerciseType) ? (
        <DragDropArea
          items={tokens.map((item: any) => String(item))}
          value={Array.isArray(answer) ? answer : []}
          onChange={onAnswerChange}
        />
      ) : null}
    </div>
  );
}
