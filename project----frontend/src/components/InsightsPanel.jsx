import { useState, useEffect } from 'react';

function InsightsPanel() {
  const [insights, setInsights] = useState({ summary: '' });

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await fetch('http://localhost:3000/insights');
        const data = await res.json();
        setInsights(data);
      } catch (error) {
        console.error('Error fetching insights:', error);
      }
    };
    fetchInsights();
  }, []);

  return (
    <div className="insights">
      <h2>Smart Insights</h2>
      <p>{insights.summary}</p>
    </div>
  );
}

export default InsightsPanel;












































































































































