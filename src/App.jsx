import React, { useEffect } from 'react';
import { FontProvider } from './contexts/FontContext';
import Router from './Router/router';
import { checkToken } from './service/api/LogFlexApi';
import { UserAuthProvider } from './contexts/UserAuthContext';




function App() {
  return (
    <UserAuthProvider>
      <FontProvider>
        <div className="App">
          <Router />
        </div>
      </FontProvider>
    </UserAuthProvider>
  );
}

export default App;