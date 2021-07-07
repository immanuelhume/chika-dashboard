import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { Guild, User } from '../graphql/generated';

export interface IStoreFields {
  // User info
  user?: Omit<User, 'guild'>;
  setUser: (user?: User) => void;
  guilds: Guild[];
  setGuilds: (guilds: Guild[]) => void;

  // Active guild
  activeGuild?: Guild;
  setActiveGuild: (guild: Guild) => void;

  // Layout
  mobileOpen: boolean;
  toggleMobileOpen: () => void;
}

export const useStore = create<IStoreFields>(
  devtools((set) => ({
    // User info
    setUser: (user?: User) => set({ user }),
    guilds: [],
    setGuilds: (guilds: Guild[]) => set({ guilds }),

    // Active guild
    setActiveGuild: (guild: Guild) => set({ activeGuild: guild }),

    // Layout
    mobileOpen: false,
    toggleMobileOpen: () =>
      set(({ mobileOpen }) => set({ mobileOpen: !mobileOpen })),
  })),
);
