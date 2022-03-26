/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Stack from '@mui/material/Stack';

import useToastsStore from '../../stores/toasts';

import Toast from './Toast';

export default function Toasts() {
  const { toasts, removeToast } = useToastsStore((state) => state);
  return (
    <Stack>
      {toasts.map((toast) => {
        const { id } = toast;
        return (
          <Toast {...toast} key={id} onDismissClick={() => removeToast(id)} />
        );
      })}
    </Stack>
  );
}
