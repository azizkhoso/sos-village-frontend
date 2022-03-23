import React from 'react';

import { StyledEngineProvider } from '@mui/material/styles';

import Pages from './pages';
import Toasts from './components/Toasts';

import './index.css';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Pages />
      <Toasts />
    </StyledEngineProvider>
  );
}

export default App;
