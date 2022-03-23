import create from 'zustand';

const useLoginStore = create((set) => ({
  isLoggedIn: false,
  login: () => set(() => ({ isLoggedIn: true })),
  logout: () => set(() => ({ isLoggedIn: false })),
}));

export default useLoginStore;
