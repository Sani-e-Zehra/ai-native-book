import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import './ChatbotWidget.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! I\'m your AI assistant. How can I help you with the AI-native systems content today?', sender: 'bot', timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [autoFocusInput, setAutoFocusInput] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Handle text selection on the page
  useEffect(() => {
    const handleSelection = () => {
      const selectedText = window.getSelection()?.toString().trim();
      if (selectedText && selectedText.length > 0) {
        setSelectedText(selectedText);
      } else {
        setSelectedText(null);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    return () => {
      document.removeEventListener('mouseup', handleSelection);
    };
  }, []);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100); // Small delay to ensure DOM is updated
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Determine if we're using selected text context
      let requestBody: { question: string; selected_text?: string } = {
        question: inputText
      };

      if (selectedText) {
        requestBody = {
          question: inputText,
          selected_text: selectedText
        };
      }

      // Call the backend API
      const response = await fetch('http://localhost:8000/v1/rag/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        // Try to get error details from response
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage += ` - ${errorData.detail || JSON.stringify(errorData)}`;
        } catch (e) {
          // If we can't parse the error, use the status text
          errorMessage += ` - ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.answer,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setSelectedText(null); // Clear selected text after sending

      // Focus input after sending message
      if (inputRef.current) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleUseSelectedText = () => {
    if (selectedText) {
      setInputText(`Regarding: "${selectedText}". ${inputText || 'Can you explain this?'}`);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  // Add ARIA attributes and keyboard navigation
  return (
    <div
      className={`chatbot-widget ${isOpen ? 'open' : ''}`}
      aria-label="AI Assistant Chatbot"
      role="region"
    >
      {!isOpen ? (
        <button
          className="chatbot-toggle"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant"
          title="Open AI Assistant"
        >
          💬 AI Assistant
        </button>
      ) : (
        <div
          className="chatbot-container"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chatbot-header"
        >
          <div className="chatbot-header" id="chatbot-header">
            <h3>AI Assistant</h3>
            <button
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              title="Close chat"
            >
              ×
            </button>
          </div>

          <div
            className="chatbot-messages"
            aria-live="polite"
            aria-atomic="false"
            tabIndex={0} // Allow focus for keyboard navigation
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.sender}`}
                role="listitem"
                aria-label={`${message.sender === 'user' ? 'Your message' : 'AI Assistant response'}: ${message.text}`}
              >
                <div className="message-content" tabIndex={0} aria-hidden="true">
                  {message.text}
                </div>
                <div className="message-timestamp" aria-label={`Sent at ${message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot" role="status" aria-label="AI Assistant is typing">
                <div className="message-content" tabIndex={0} aria-hidden="true">
                  <div className="typing-indicator" aria-label="Typing indicator">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {selectedText && (
            <div
              className="selected-text-preview"
              role="complementary"
              aria-label={`Selected text: ${selectedText}`}
            >
              <p><strong>Selected text:</strong> "{selectedText.substring(0, 100)}{selectedText.length > 100 ? '...' : ''}"</p>
              <button
                onClick={handleUseSelectedText}
                className="use-selected-btn"
                aria-label="Use selected text in your question"
              >
                Use in question
              </button>
            </div>
          )}

          <div className="chatbot-input-area" role="form" aria-label="Message input area">
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={selectedText ? "Ask about selected text..." : "Ask about the content..."}
              className="chatbot-input"
              rows={3}
              aria-label="Type your message here"
              aria-required="false"
              role="textbox"
              aria-multiline="true"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputText.trim()}
              className="chatbot-send-btn"
              aria-label="Send message"
              title="Send message"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;