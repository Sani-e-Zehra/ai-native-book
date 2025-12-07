import React, { useState } from 'react';

interface TranslationControlsProps {
  onTranslate: (text: string, targetLang: string) => Promise<string>;
  originalContent: string;
}

const TranslationControls: React.FC<TranslationControlsProps> = ({ 
  onTranslate, 
  originalContent 
}) => {
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedContent, setTranslatedContent] = useState<string | null>(null);
  const [targetLanguage, setTargetLanguage] = useState('ur');
  const [selectedText, setSelectedText] = useState<string | null>(null);

  const translateText = async () => {
    if (!originalContent && !selectedText) return;
    
    const textToTranslate = selectedText || originalContent;
    setIsTranslating(true);
    setTranslatedContent(null);
    
    try {
      const response = await onTranslate(textToTranslate, targetLanguage);
      setTranslatedContent(response);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedContent('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleTextSelection = () => {
    const selectedText = window.getSelection()?.toString().trim();
    if (selectedText) {
      setSelectedText(selectedText);
    }
  };

  return (
    <div className="translation-controls">
      <div className="translation-options">
        <label htmlFor="target-language">Translate to:</label>
        <select 
          id="target-language"
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
        >
          <option value="ur">Urdu</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>
      
      <div className="selected-text-preview">
        {selectedText ? (
          <>
            <p><strong>Selected text to translate:</strong> "{selectedText.substring(0, 100)}{selectedText.length > 100 ? '...' : ''}"</p>
            <button onClick={() => onTranslate(selectedText, targetLanguage)} disabled={isTranslating}>
              {isTranslating ? 'Translating...' : 'Translate Selected Text'}
            </button>
          </>
        ) : (
          <button onClick={translateText} disabled={isTranslating}>
            {isTranslating ? 'Translating...' : 'Translate Content'}
          </button>
        )}
      </div>

      {translatedContent && (
        <div className="translation-result">
          <h4>Translation:</h4>
          <div className="translated-content">
            {translatedContent}
          </div>
        </div>
      )}
    </div>
  );
};

export default TranslationControls;