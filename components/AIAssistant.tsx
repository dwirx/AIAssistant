'use client';
import React, { useState } from 'react';
import { FaEnvelope, FaSpellCheck, FaComments, FaLanguage, FaCodeBranch, FaInstagram, FaSearch } from 'react-icons/fa';

const AIAssistant: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState('');
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const features = [
    { title: 'Email', description: 'Generate email templates', icon: FaEnvelope },
    { title: 'Grammar', description: 'Check grammar and make text more interesting', icon: FaSpellCheck },
    { title: 'Message Replier', description: 'Generate replies to any message', icon: FaComments },
    { title: 'Translate', description: 'Translate text to other languages with ease', icon: FaLanguage },
    { title: 'Pull Request Description', description: 'Generate pull request descriptions', icon: FaCodeBranch },
    { title: 'Caption Generator', description: 'Generate caption for Instagram, Twitter...', icon: FaInstagram },
    { title: 'Fill the Blank', description: 'Generate answers for fill in the blank questions', icon: FaSearch },
  ];

  const handleFeatureClick = (title: string) => {
    setSelectedFeature(title);
    setUserInput('');
    setAiResponse('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feature: selectedFeature, prompt: userInput }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setAiResponse(data.response || 'No response generated.');
    } catch (error) {
      console.error('Error calling API:', error);
      setAiResponse('An error occurred while processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-2">AI Assistant</h1>
        <p className="text-xl text-center text-gray-600 mb-12">Let AI help you with your daily tasks</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg cursor-pointer ${selectedFeature === feature.title ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => handleFeatureClick(feature.title)}
            >
              <h2 className="text-2xl font-semibold mb-2 flex items-center justify-between">
                {feature.title}
                <feature.icon className="text-blue-500 text-2xl" />
              </h2>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {selectedFeature && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">{selectedFeature}</h2>
            <form onSubmit={handleSubmit}>
              <textarea 
                className="w-full p-2 border rounded mb-4"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter your prompt here..."
                rows={4}
              />
              <button 
                type="submit" 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                disabled={isLoading || !userInput.trim()}
              >
                {isLoading ? 'Processing...' : 'Submit'}
              </button>
            </form>
            {aiResponse && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">AI Response:</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{aiResponse}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
