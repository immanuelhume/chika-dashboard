import create, { StateSelector } from 'zustand';
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

export const useStore = create<IStoreFields>((set) => ({
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
}));

export const layoutSelector: StateSelector<
  IStoreFields,
  Pick<IStoreFields, 'mobileOpen' | 'toggleMobileOpen'>
> = ({ mobileOpen, toggleMobileOpen }) => ({ mobileOpen, toggleMobileOpen });

export const userSetterSelector: StateSelector<
  IStoreFields,
  Pick<IStoreFields, 'setUser' | 'setGuilds'>
> = ({ setUser, setGuilds }) => ({ setUser, setGuilds });

export const userGetterSelector: StateSelector<
  IStoreFields,
  Pick<IStoreFields, 'user' | 'guilds'>
> = ({ user, guilds }) => ({ user, guilds });

export const activeGuildSelector: StateSelector<
  IStoreFields,
  Pick<IStoreFields, 'activeGuild' | 'setActiveGuild'>
> = ({ activeGuild, setActiveGuild }) => ({ activeGuild, setActiveGuild });
