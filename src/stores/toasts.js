import create from 'zustand';

const useToastsStore = create((set) => ({
  toasts: [],
  addToast: (toast) => set(
    (state) => (
      {
        toasts: [...state.toasts, { ...toast, id: Number(new Date()), open: true }],
      }
    ),
  ),
  removeToast: (id) => set(
    (state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }),
  ),
}));

export default useToastsStore;
