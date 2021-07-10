import create, { StateSelector } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Guild, User } from '../graphql/generated';

export interface IStoreFields {
  // User info
  user?: Omit<User, 'guilds'>;
  setUser: (user?: Omit<User, 'guilds'>) => void;
  guilds: Guild[];
  setGuilds: (guilds: Guild[]) => void;
  unauthorized?: boolean;

  // User preferences
  prefersDark: boolean;
  toggleTheme: () => void;

  // Active guild
  activeGuild?: Guild;
  setActiveGuild: (guild?: Guild) => void;

  // Layout
  mobileOpen: boolean;
  toggleMobileOpen: () => void;
  isDrawerMinified: boolean;
  toggleDrawerMinified: () => void;

  // wow
  clearStore: () => void;
}

export const useStore = create<IStoreFields>(
  devtools(
    persist(
      (set) => ({
        // User info
        setUser: (user) => set({ user }),
        guilds: [],
        setGuilds: (guilds) => set({ guilds }),

        // User preferences
        prefersDark: true,
        toggleTheme: () =>
          set(({ prefersDark }) => ({ prefersDark: !prefersDark })),

        // Active guild
        setActiveGuild: (guild) => set({ activeGuild: guild }),

        // Layout
        mobileOpen: false,
        toggleMobileOpen: () =>
          set(({ mobileOpen }) => set({ mobileOpen: !mobileOpen })),
        isDrawerMinified: true,
        toggleDrawerMinified: () =>
          set(({ isDrawerMinified }) => ({
            isDrawerMinified: !isDrawerMinified,
          })),

        // wow
        clearStore: () => set({}, true),
      }),
      {
        name: 'zustand-store',
        whitelist: ['user', 'guilds', 'activeGuild', 'prefersDark'],
      },
    ),
  ),
);

// Selectors for convenience
export const activeGuildSelector: StateSelector<
  IStoreFields,
  Guild | undefined
> = (state) => state.activeGuild;
