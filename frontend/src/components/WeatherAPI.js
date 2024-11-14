import React, { useEffect } from 'react';
const WeatherComponent = () => {
  useEffect(() => {
    const existingScript = document.getElementById('elfsight-platform-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://static.elfsight.com/platform/platform.js';
      script.async = true;
      script.id = 'elfsight-platform-script'; // Add an ID to avoid loading multiple times
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div>
      <div className="elfsight-app-11f00bb9-d4fc-47cf-9351-3c904c57189b" data-elfsight-app-lazy></div>
    </div>
  );
};

export default WeatherComponent;
