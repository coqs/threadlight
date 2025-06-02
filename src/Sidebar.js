import React, { useState } from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  // State for toggles
  const [settings, setSettings] = useState({
    notifications: false,
    redditSource: true,
    twitterSource: false,
    aiResults: false
  });

  // Handle toggle change
  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`} 
        onClick={toggleSidebar}
      ></div>
      
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="close-sidebar" onClick={toggleSidebar}>×</button>
        </div>
        
        <div className="sidebar-content">
          {/* Settings Section */}
          <div className="sidebar-section">
            <h3>Settings (MOST THINGS ARE BROKEN AND DONT EVEN WORK, WILL FIX LATER)</h3>
        
            
            <div className="option-toggle">
              <span>Notifications</span>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.notifications}
                  onChange={() => handleToggle('notifications')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          {/* Source Settings */}
          <div className="sidebar-section">
            <h3>Content Sources</h3>
            
            <div className="option-toggle">
              <span>Reddit</span>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.redditSource}
                  onChange={() => handleToggle('redditSource')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            
            <div className="option-toggle">
              <span>Twitter (X)</span>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.twitterSource}
                  onChange={() => handleToggle('twitterSource')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="option-toggle">
              <span>Quora</span>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.twitterSource}
                  onChange={() => handleToggle('twitterSource')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="option-toggle">
              <span>Images</span>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.twitterSource}
                  onChange={() => handleToggle('twitterSource')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="option-toggle">
              <span>StackOverFlow</span>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.twitterSource}
                  onChange={() => handleToggle('twitterSource')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            
            <div className="option-toggle">
              <span>AI the results?</span>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.aiResults}
                  onChange={() => handleToggle('aiResults')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          {/* About Us */}
          <div className="sidebar-section">
            <h3>About Us</h3>
            <p style={{ color: '#e6e6e6', lineHeight: '1.4' }}>
              This app is for two people:
              <br></br>
              <br></br>
                for the people who don't want to waste time while surfing on the internet,
                <br></br>
                <br></br>
                and for the people who want geniune true responses from people with experience!
                <br></br>
                <br></br>
              Credits to: @hallworld
            </p>
          </div>
          
          {/* API Documentation */}
          <div className="sidebar-section">
            <h3>API Documentation</h3>
            <div className="doc-links">
              <a href="#" className="doc-link">Coming Soon!</a>
            </div>
          </div>
          
          {/* Pricing */}
          <div className="sidebar-section">
            <h3>Pricing</h3>
            <div style={{ color: '#e6e6e6' }}>
              <div style={{ marginBottom: '10px' }}>
                <strong>Free</strong>: 50 searches/month
              </div>
              <div style={{ marginBottom: '10px' }}>
                <strong>Basic</strong>: $9.99/month - 500 searches
              </div>
              <div>
                <strong>Pro</strong>: $19.99/month - Unlimited searches
              </div>
            </div>
          </div>
        </div>
        
        {/* Auth buttons */}
        <div className="sidebar-auth">
          <button className="sidebar-login">Log In</button>
          <button className="sidebar-signup">Sign Up</button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

