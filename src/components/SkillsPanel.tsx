import React, { useState, useEffect } from 'react';

interface SkillResponse {
  title: string;
  content: string;
}

const SkillsPanel: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [skillContent, setSkillContent] = useState<SkillResponse | null>(null);
  const [inputContent, setInputContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentChapter, setCurrentChapter] = useState<string>('');

  // Get current chapter from URL or context
  useEffect(() => {
    // In a real implementation, this would come from the current page context
    const path = window.location.pathname;
    const chapterMatch = path.match(/\/docs\/([^\/]+)/);
    if (chapterMatch && chapterMatch[1]) {
      setCurrentChapter(chapterMatch[1]);
    }
  }, []);

  const handleSkillAction = async (skill: string) => {
    if (!inputContent.trim()) return;
    
    setIsLoading(true);
    setActiveSkill(skill);
    
    try {
      let endpoint = '';
      let requestBody: any = { content: inputContent };
      
      // Add chapter context if available
      if (currentChapter) {
        requestBody.context = currentChapter;
      }
      
      switch(skill) {
        case 'glossary':
          endpoint = 'http://localhost:8000/v1/skills/glossary';
          break;
        case 'summarize':
          endpoint = 'http://localhost:8000/v1/skills/summarize';
          break;
        case 'tutor':
          endpoint = 'http://localhost:8000/v1/skills/tutor';
          requestBody.question = inputContent;
          break;
        default:
          throw new Error('Unknown skill');
      }
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Format response based on skill type
      let title = '';
      let content = '';
      
      switch(skill) {
        case 'glossary':
          title = 'Glossary';
          content = data.terms.map((term: any) => `${term.term}: ${term.definition}`).join('\n\n');
          break;
        case 'summarize':
          title = 'Summary';
          content = `${data.summary}\n\nKey Points:\n${data.key_points.map((point: string) => `- ${point}`).join('\n')}`;
          break;
        case 'tutor':
          title = 'Tutor Response';
          content = data.explanation;
          break;
      }
      
      setSkillContent({ title, content });
    } catch (error) {
      console.error(`Error executing ${skill} skill:`, error);
      setSkillContent({
        title: 'Error',
        content: `Failed to execute ${skill}. Please try again.`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const skills = [
    { id: 'glossary', name: 'Generate Glossary', description: 'Create a glossary of important terms' },
    { id: 'summarize', name: 'Summarize Content', description: 'Generate a summary of the content' },
    { id: 'tutor', name: 'Ask Tutor', description: 'Get explanations from an AI tutor' }
  ];

  return (
    <div className="skills-panel">
      <h3>AI-Powered Tools</h3>
      
      <div className="skills-list">
        {skills.map(skill => (
          <button
            key={skill.id}
            className={`skill-button ${activeSkill === skill.id ? 'active' : ''}`}
            onClick={() => handleSkillAction(skill.id)}
            disabled={isLoading}
          >
            {skill.name}
          </button>
        ))}
      </div>
      
      <div className="skills-input">
        <label htmlFor="skills-content">Content to process:</label>
        <textarea
          id="skills-content"
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          placeholder="Enter text to process..."
          rows={4}
        />
        <p className="input-note">Enter the text you want to process with the selected tool</p>
      </div>
      
      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Processing with AI...</p>
        </div>
      )}
      
      {skillContent && !isLoading && (
        <div className="skill-result">
          <h4>{skillContent.title}</h4>
          <div className="result-content">
            <pre>{skillContent.content}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsPanel;