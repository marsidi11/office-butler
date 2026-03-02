import { AI_SUGGESTIONS } from '../data';

export default function AISuggestionBox({ serviceType }) {
  const suggestion = AI_SUGGESTIONS[serviceType] ?? AI_SUGGESTIONS['Office Cleaning'];

  return (
    <div className="ai-card">
      <div className="ai-header">
        <span className="ai-icon">✦</span>
        <span className="ai-label">AI Suggestion</span>
      </div>
      <p className="ai-text">{suggestion}</p>
    </div>
  );
}
