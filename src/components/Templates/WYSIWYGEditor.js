import React, { useState, useRef } from "react";

const WYSIWYGEditor = ({ onChange }) => {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setUnderline] = useState(false);
  const editorRef = useRef(null);

  const handleChange = () => {
    // Get the current HTML content of the editor
    const content = editorRef.current.innerHTML;

    // Call the onChange prop with the updated content
    if (onChange) {
      onChange(content);
    }
  };

  const toggleBold = () => {
    document.execCommand("bold", false, null);
    setIsBold(!isBold);
  };

  const toggleItalic = () => {
    document.execCommand("italic", false, null);
    setIsItalic(!isItalic);
  };

  const toggleUnderline = () => {
    document.execCommand("underline", false, null);
    setUnderline(!isUnderline);
  };


  return (
    <div className="max-w-4xl mx-auto p-3 rounded-md border  border-hackbio-green-light">

      <div className="pb-3 flex flex-row gap-2">
        {/* Toolbar for text formatting */}
        <button
          onClick={toggleBold}
          className={`px-2 text-sm rounded-sm text-white ${isBold ? 'bg-hackbio-green' : 'bg-gray-400'}`}
        >
          Bold
        </button>
        <button
          onClick={toggleItalic}
          className={`px-2 text-sm rounded-sm text-white ${isItalic ? 'bg-hackbio-green' : 'bg-gray-400'}`}
        >
          Italics
        </button>
        <button
          onClick={toggleUnderline}
          className={`px-2 text-sm rounded-sm text-white ${isUnderline ? 'bg-hackbio-green' : 'bg-gray-400'}`}
        >
          Underline
        </button>
      </div>

      {/* Contenteditable div for WYSIWYG editing */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleChange}
        className="p-4 border border-hackbio-green-light rounded-md min-h-[200px] max-h-[200px] overflow-auto focus:outline-none text-sm focus:ring-2 focus:ring-hackbio-green"
        placeholder="Start typing here..."
      >Start typing your solution here ...</div>
    </div>
  );
};

export default WYSIWYGEditor;
