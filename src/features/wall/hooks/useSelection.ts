import { useState, useEffect } from 'react';

export function useSelection() {
  const [selectedText, setSelectedText] = useState('');

  const getSelection = () => {
    if (window.getSelection) {
      return window.getSelection();
    } else if (document.getSelection) {
      return document.getSelection();
    } else {
      return null;
    }
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = getSelection();
      if (selection) {
        setSelectedText(selection.toString());
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  return {
    selectedText,
    getSelection
  };
}
