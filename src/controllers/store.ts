import create, { StateSelector } from 'zustand';

export interface IStoreFields {
  // User info
  guildId: string;

  // Layout
  mobileOpen: boolean;
  toggleMobileOpen: () => void;
}

export const useStore = create<IStoreFields>((set) => ({
  guildId: '848575017406562334',
  mobileOpen: false,
  toggleMobileOpen: () =>
    set(({ mobileOpen }) => set({ mobileOpen: !mobileOpen })),
}));

export const guildIdSelector: StateSelector<IStoreFields, string> = (state) =>
  state.guildId;

export const layoutSelector: StateSelector<
  IStoreFields,
  Pick<IStoreFields, 'mobileOpen' | 'toggleMobileOpen'>
> = ({ mobileOpen, toggleMobileOpen }) => ({ mobileOpen, toggleMobileOpen });
