import React, { useState, useRef, useEffect } from 'react';
import { Bold, Italic, Link, Code, List, ListOrdered, Quote } from 'lucide-react';
import { useSelection } from '../hooks/useSelection';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isList, setIsList] = useState(false);
  const [isOrderedList, setIsOrderedList] = useState(false);
  const [isQuote, setIsQuote] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const { selectedText, getSelection } = useSelection();

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleFormat = (formatType: string) => {
    if (!editorRef.current) return;
    const selection = getSelection();
    if (!selection) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    if (!selectedText) return;

    let formattedText = selectedText;

    switch (formatType) {
      case 'bold':
        formattedText = `<strong>${selectedText}</strong>`;
        setIsBold(!isBold);
        break;
      case 'italic':
        formattedText = `<em>${selectedText}</em>`;
        setIsItalic(!isItalic);
        break;
      case 'link':
        const url = prompt('Enter URL:');
        if (url) {
          formattedText = `<a href="${url}" target="_blank">${selectedText}</a>`;
          setIsLink(!isLink);
        }
        break;
      case 'code':
        formattedText = `<code>${selectedText}</code>`;
        setIsCode(!isCode);
        break;
      case 'list':
        formattedText = `<li>${selectedText}</li>`;
        setIsList(!isList);
        break;
      case 'ordered-list':
        formattedText = `<ol><li>${selectedText}</li></ol>`;
        setIsOrderedList(!isOrderedList);
        break;
      case 'quote':
        formattedText = `<blockquote>${selectedText}</blockquote>`;
        setIsQuote(!isQuote);
        break;
      default:
        break;
    }

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = formattedText;
    range.deleteContents();
    range.insertNode(tempDiv);

    onChange(editorRef.current.innerHTML);
  };

  const handleInputChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex space-x-2 mb-2">
        <button
          type="button"
          onClick={() => handleFormat('bold')}
          className={`p-2 hover:bg-gray-100 rounded ${isBold ? 'bg-gray-200' : ''}`}
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => handleFormat('italic')}
          className={`p-2 hover:bg-gray-100 rounded ${isItalic ? 'bg-gray-200' : ''}`}
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => handleFormat('link')}
          className={`p-2 hover:bg-gray-100 rounded ${isLink ? 'bg-gray-200' : ''}`}
        >
          <Link className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => handleFormat('code')}
          className={`p-2 hover:bg-gray-100 rounded ${isCode ? 'bg-gray-200' : ''}`}
        >
          <Code className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => handleFormat('list')}
          className={`p-2 hover:bg-gray-100 rounded ${isList ? 'bg-gray-200' : ''}`}
        >
          <List className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => handleFormat('ordered-list')}
          className={`p-2 hover:bg-gray-100 rounded ${isOrderedList ? 'bg-gray-200' : ''}`}
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => handleFormat('quote')}
          className={`p-2 hover:bg-gray-100 rounded ${isQuote ? 'bg-gray-200' : ''}`}
        >
          <Quote className="w-5 h-5" />
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInputChange}
        className="w-full p-3 border rounded-lg resize-none outline-none"
        style={{ minHeight: '100px' }}
      />
    </div>
  );
}
