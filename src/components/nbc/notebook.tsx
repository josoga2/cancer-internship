// components/NotebookViewer.js
import { useEffect, useState } from "react";

export default function NotebookViewer({ url }: { url: string }) {
  const [html, setHtml] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!url || !url.startsWith("https://raw.githubusercontent.com/")) {
      setError("Invalid or missing raw GitHub URL.");
      return;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch notebook.");
        return res.text();
      })
      .then(setHtml)
      .catch((err) => {
        console.error(err);
        setError("Could not load notebook content.");
      });
  }, [url]);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="prose prose-lg max-w-4/5 "
    />
  );
}
