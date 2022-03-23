import React from 'react';

import { StyledEngineProvider } from '@mui/material/styles';

import { QueryClientProvider, QueryClient } from 'react-query';

import Pages from './pages';
import Toasts from './components/Toasts';

import './index.css';

const queryClient = new QueryClient();

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <QueryClientProvider client={queryClient}>
        <Pages />
        <Toasts />
      </QueryClientProvider>
    </StyledEngineProvider>
  );
}

export default App;
