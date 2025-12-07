import React, { useState, useEffect } from 'react';

interface UserPreferences {
  technicalBackground?: string;
  hardwareSpecs?: string;
  contentLevel?: string;
  examplesPreference?: string;
}

interface PersonalizationControlsProps {
  onPreferencesChange: (preferences: UserPreferences) => void;
  currentPreferences: UserPreferences;
}

const PersonalizationControls: React.FC<PersonalizationControlsProps> = ({ 
  onPreferencesChange, 
  currentPreferences 
}) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    technicalBackground: currentPreferences.technicalBackground || '',
    hardwareSpecs: currentPreferences.hardwareSpecs || '',
    contentLevel: currentPreferences.contentLevel || '',
    examplesPreference: currentPreferences.examplesPreference || ''
  });

  useEffect(() => {
    setPreferences({
      technicalBackground: currentPreferences.technicalBackground || '',
      hardwareSpecs: currentPreferences.hardwareSpecs || '',
      contentLevel: currentPreferences.contentLevel || '',
      examplesPreference: currentPreferences.examplesPreference || ''
    });
  }, [currentPreferences]);

  const handleChange = (field: keyof UserPreferences, value: string) => {
    const newPreferences = { ...preferences, [field]: value };
    setPreferences(newPreferences);
    onPreferencesChange(newPreferences);
  };

  return (
    <div className="personalization-controls">
      <h4>Personalize Your Learning Experience</h4>
      
      <div className="control-group">
        <label htmlFor="technicalBackground">Your Technical Background:</label>
        <select 
          id="technicalBackground"
          value={preferences.technicalBackground || ''}
          onChange={(e) => handleChange('technicalBackground', e.target.value)}
        >
          <option value="">Select your level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      
      <div className="control-group">
        <label htmlFor="hardwareSpecs">Your Hardware Specs:</label>
        <select 
          id="hardwareSpecs"
          value={preferences.hardwareSpecs || ''}
          onChange={(e) => handleChange('hardwareSpecs', e.target.value)}
        >
          <option value="">Select your specs</option>
          <option value="low-end">Low-end</option>
          <option value="mid-range">Mid-range</option>
          <option value="high-end">High-end</option>
        </select>
      </div>
      
      <div className="control-group">
        <label htmlFor="contentLevel">Content Detail Level:</label>
        <select 
          id="contentLevel"
          value={preferences.contentLevel || ''}
          onChange={(e) => handleChange('contentLevel', e.target.value)}
        >
          <option value="">Select detail level</option>
          <option value="simplified">Simplified</option>
          <option value="detailed">Detailed</option>
          <option value="technical">Technical</option>
        </select>
      </div>
      
      <div className="control-group">
        <label htmlFor="examplesPreference">Preferred Examples:</label>
        <select 
          id="examplesPreference"
          value={preferences.examplesPreference || ''}
          onChange={(e) => handleChange('examplesPreference', e.target.value)}
        >
          <option value="">Select preference</option>
          <option value="practical">Practical Applications</option>
          <option value="theoretical">Theoretical Concepts</option>
        </select>
      </div>
    </div>
  );
};

export default PersonalizationControls;