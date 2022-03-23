import React from 'react';

import { StyledEngineProvider } from '@mui/material/styles';

import Pages from './pages';

import './index.css';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Pages />
    </StyledEngineProvider>
  );
}

export default App;
