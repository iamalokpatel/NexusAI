import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const LoadingDots = () => (
  <div className="flex space-x-2 items-center text-gray-400 py-2 animate-pulse">
    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-150" />
    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-300" />
    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-300" />
  </div>
);

const MessageRenderer = ({ content }) => {
  if (content === "__loading__") return <LoadingDots />;

  const parts = [];
  const lines = content.split("\n");
  let inCodeBlock = false;
  let codeLang = "javascript";
  let codeLines = [];
  let textBuffer = [];

  const flushTextBuffer = () => {
    if (textBuffer.length > 0) {
      parts.push(
        <p key={`text-${parts.length}`} className="mb-2 leading-relaxed">
          {textBuffer.join("\n")}
        </p>
      );
      textBuffer = [];
    }
  };

  lines.forEach((line) => {
    const match = line.trim().match(/^```(\w*)?/);
    if (match) {
      flushTextBuffer();
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLang = match[1] || "javascript";
        codeLines = [];
      } else {
        parts.push(
          <div
            key={`code-${parts.length}`}
            className="my-2 rounded overflow-auto border border-gray-700"
          >
            <SyntaxHighlighter
              language={codeLang}
              style={vscDarkPlus}
              wrapLongLines={true}
              customStyle={{
                margin: 0,
                backgroundColor: "#1e1e1e",
                fontSize: "0.85rem",
                borderRadius: "0.5rem",
              }}
            >
              {codeLines.join("\n")}
            </SyntaxHighlighter>
          </div>
        );
        inCodeBlock = false;
      }
    } else if (inCodeBlock) {
      codeLines.push(line);
    } else {
      textBuffer.push(line);
    }
  });

  flushTextBuffer();

  if (inCodeBlock && codeLines.length > 0) {
    parts.push(
      <div
        key={`code-unclosed-${parts.length}`}
        className="my-2 rounded overflow-auto border border-gray-700"
      >
        <SyntaxHighlighter
          language={codeLang}
          style={vscDarkPlus}
          wrapLongLines={true}
          customStyle={{
            margin: 0,
            backgroundColor: "#1e1e1e",
            fontSize: "0.85rem",
            borderRadius: "0.5rem",
          }}
        >
          {codeLines.join("\n")}
        </SyntaxHighlighter>
      </div>
    );
  }

  return parts;
};

export default MessageRenderer;
