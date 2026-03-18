"use client";

import { TextareaHTMLAttributes } from "react";

type CodeEditorProps = {
  label?: string;
  language?: "bash" | "python" | "r" | "text";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange">;

export default function CodeEditor({
  label,
  language = "text",
  value,
  onChange,
  placeholder,
  ...rest
}: CodeEditorProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      {label ? <p className="text-sm font-semibold text-gray-700">{label}</p> : null}
      <div className="rounded-xl border border-gray-300 bg-white overflow-hidden">
        <div className="px-3 py-2 text-xs uppercase tracking-wide text-gray-500 border-b border-gray-200 bg-gray-50">
          {language}
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full min-h-40 p-3 text-sm font-mono text-gray-900 outline-none resize-y"
          {...rest}
        />
      </div>
    </div>
  );
}
