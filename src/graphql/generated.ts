import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddTrackInput = {
  guildId: Scalars['ID'];
  youtubeUrl: Scalars['String'];
};

export type Argument = {
  __typename?: 'Argument';
  command: Command;
  id: Scalars['ID'];
  name: Scalars['String'];
  optional: Scalars['Boolean'];
};

export type Command = {
  __typename?: 'Command';
  aliases?: Maybe<Array<Scalars['String']>>;
  args?: Maybe<Array<Argument>>;
  category: CommandCategory;
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export enum CommandCategory {
  Currency = 'CURRENCY',
  Fun = 'FUN',
  Games = 'GAMES',
  Music = 'MUSIC',
  Utility = 'UTILITY',
}

export type CommandGuildCtx = {
  __typename?: 'CommandGuildCtx';
  aliases?: Maybe<Array<Scalars['String']>>;
  args?: Maybe<Array<Argument>>;
  category: CommandCategory;
  commandId: Scalars['Int'];
  description: Scalars['String'];
  disabled: Scalars['Boolean'];
  /** This is a prefixed ID of the format {guildID}:{commandID} */
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Guild = {
  __typename?: 'Guild';
  icon: Scalars['String'];
  id: Scalars['ID'];
  isChikaIn: Scalars['Boolean'];
  name: Scalars['String'];
};

export type GuildConfig = {
  __typename?: 'GuildConfig';
  ballMaxVol: Scalars['Int'];
  ballMinVol: Scalars['Int'];
  id: Scalars['ID'];
  prefix: Scalars['String'];
  shiriHandSize: Scalars['Int'];
  shiriMinLen: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTrack: Track;
  disableCommand: CommandGuildCtx;
  enableCommand: CommandGuildCtx;
  /**
   * Checks our database for this guild.
   * @deprecated We are syncing with the bot now, no need for this check
   */
  hasChika: Scalars['Boolean'];
  /** Returns true if logout was successful. */
  logout: Scalars['Boolean'];
  /** Returns the number of tracks removed. */
  removeTrack: Scalars['Int'];
  shuffleTracks: Array<Track>;
  updateBalloon: GuildConfig;
  updatePrefix: GuildConfig;
  updateShiritori: GuildConfig;
};

export type MutationAddTrackArgs = {
  input: AddTrackInput;
};

export type MutationDisableCommandArgs = {
  toggleCommandInput: ToggleCommandInput;
};

export type MutationEnableCommandArgs = {
  toggleCommandInput: ToggleCommandInput;
};

export type MutationHasChikaArgs = {
  guildId: Scalars['ID'];
};

export type MutationRemoveTrackArgs = {
  input: RemoveTrackInput;
};

export type MutationShuffleTracksArgs = {
  guildId: Scalars['ID'];
};

export type MutationUpdateBalloonArgs = {
  input: UpdateBalloonInput;
};

export type MutationUpdatePrefixArgs = {
  input: UpdatePrefixInput;
};

export type MutationUpdateShiritoriArgs = {
  input: UpdateShiritoriInput;
};

export type Query = {
  __typename?: 'Query';
  getAllCommands: Array<Command>;
  getCommandsUnderGuildCtx: Array<CommandGuildCtx>;
  getGuildConfig: GuildConfig;
  getNowPlaying?: Maybe<Track>;
  getTracks: Array<Track>;
  getUser: User;
};

export type QueryGetCommandsUnderGuildCtxArgs = {
  guildId: Scalars['String'];
};

export type QueryGetGuildConfigArgs = {
  guildId: Scalars['ID'];
};

export type QueryGetNowPlayingArgs = {
  guildId: Scalars['ID'];
};

export type QueryGetTracksArgs = {
  guildId: Scalars['ID'];
};

export type RemoveTrackInput = {
  guildId: Scalars['ID'];
  trackId: Scalars['String'];
};

export type ToggleCommandInput = {
  /** Name of the command. It should be unique. */
  commandName: Scalars['String'];
  guildId: Scalars['String'];
};

export type Track = {
  __typename?: 'Track';
  duration: Scalars['String'];
  id: Scalars['ID'];
  thumbnailURL: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type UpdateBalloonInput = {
  /** Guild's ID in Discord. */
  id: Scalars['ID'];
  /** Maximum volume. */
  maxVol?: Maybe<Scalars['Int']>;
  /** Minimum volume. */
  minVol?: Maybe<Scalars['Int']>;
};

export type UpdatePrefixInput = {
  id: Scalars['ID'];
  prefix: Scalars['String'];
};

export type UpdateShiritoriInput = {
  /** Hand size. */
  handSize?: Maybe<Scalars['Int']>;
  /** Guild's ID in Discord. */
  id: Scalars['ID'];
  /** Minimum length. */
  minLen?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  guilds: Array<Guild>;
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type GuildConfigInfoFragment = { __typename?: 'GuildConfig' } & Pick<
  GuildConfig,
  | 'id'
  | 'prefix'
  | 'shiriMinLen'
  | 'shiriHandSize'
  | 'ballMinVol'
  | 'ballMaxVol'
>;

export type SimpleCommandFragment = { __typename?: 'CommandGuildCtx' } & Pick<
  CommandGuildCtx,
  'id' | 'commandId' | 'name' | 'description' | 'category' | 'disabled'
>;

export type TrackInfoFragment = { __typename?: 'Track' } & Pick<
  Track,
  'id' | 'title' | 'url' | 'thumbnailURL' | 'duration'
>;

export type AddTrackMutationVariables = Exact<{
  input: AddTrackInput;
}>;

export type AddTrackMutation = { __typename?: 'Mutation' } & {
  addTrack: { __typename?: 'Track' } & Pick<Track, 'id'>;
};

export type DisabledCommandMutationVariables = Exact<{
  input: ToggleCommandInput;
}>;

export type DisabledCommandMutation = { __typename?: 'Mutation' } & {
  disableCommand: { __typename?: 'CommandGuildCtx' } & SimpleCommandFragment;
};

export type EnableCommandMutationVariables = Exact<{
  input: ToggleCommandInput;
}>;

export type EnableCommandMutation = { __typename?: 'Mutation' } & {
  enableCommand: { __typename?: 'CommandGuildCtx' } & SimpleCommandFragment;
};

export type HasChikaMutationVariables = Exact<{
  guildId: Scalars['ID'];
}>;

export type HasChikaMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'hasChika'
>;

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'logout'
>;

export type RemoveTrackMutationVariables = Exact<{
  input: RemoveTrackInput;
}>;

export type RemoveTrackMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'removeTrack'
>;

export type ShuffleTracksMutationVariables = Exact<{
  guildId: Scalars['ID'];
}>;

export type ShuffleTracksMutation = { __typename?: 'Mutation' } & {
  shuffleTracks: Array<{ __typename?: 'Track' } & Pick<Track, 'id'>>;
};

export type UpdateBalloonMutationVariables = Exact<{
  input: UpdateBalloonInput;
}>;

export type UpdateBalloonMutation = { __typename?: 'Mutation' } & {
  updateBalloon: { __typename?: 'GuildConfig' } & GuildConfigInfoFragment;
};

export type UpdatePrefixMutationVariables = Exact<{
  input: UpdatePrefixInput;
}>;

export type UpdatePrefixMutation = { __typename?: 'Mutation' } & {
  updatePrefix: { __typename?: 'GuildConfig' } & Pick<
    GuildConfig,
    'id' | 'prefix'
  >;
};

export type UpdateShiritoriMutationVariables = Exact<{
  input: UpdateShiritoriInput;
}>;

export type UpdateShiritoriMutation = { __typename?: 'Mutation' } & {
  updateShiritori: { __typename?: 'GuildConfig' } & GuildConfigInfoFragment;
};

export type CommandsQueryVariables = Exact<{
  guildId: Scalars['String'];
}>;

export type CommandsQuery = { __typename?: 'Query' } & {
  getCommandsUnderGuildCtx: Array<
    { __typename?: 'CommandGuildCtx' } & SimpleCommandFragment
  >;
};

export type GuildConfigQueryVariables = Exact<{
  guildId: Scalars['ID'];
}>;

export type GuildConfigQuery = { __typename?: 'Query' } & {
  getGuildConfig: { __typename?: 'GuildConfig' } & GuildConfigInfoFragment;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: 'Query' } & {
  getUser: { __typename?: 'User' } & Pick<
    User,
    'id' | 'username' | 'avatar'
  > & {
      guilds: Array<
        { __typename?: 'Guild' } & Pick<
          Guild,
          'id' | 'name' | 'icon' | 'isChikaIn'
        >
      >;
    };
};

export type NowPlayingQueryVariables = Exact<{
  guildId: Scalars['ID'];
}>;

export type NowPlayingQuery = { __typename?: 'Query' } & {
  getNowPlaying?: Maybe<{ __typename?: 'Track' } & TrackInfoFragment>;
};

export type TracksQueryVariables = Exact<{
  guildId: Scalars['ID'];
}>;

export type TracksQuery = { __typename?: 'Query' } & {
  getTracks: Array<
    { __typename?: 'Track' } & Pick<Track, 'id' | 'title' | 'duration'>
  >;
};

export const GuildConfigInfoFragmentDoc = gql`
  fragment GuildConfigInfo on GuildConfig {
    id
    prefix
    shiriMinLen
    shiriHandSize
    ballMinVol
    ballMaxVol
  }
`;
export const SimpleCommandFragmentDoc = gql`
  fragment SimpleCommand on CommandGuildCtx {
    id
    commandId
    name
    description
    category
    disabled
  }
`;
export const TrackInfoFragmentDoc = gql`
  fragment TrackInfo on Track {
    id
    title
    url
    thumbnailURL
    duration
  }
`;
export const AddTrackDocument = gql`
  mutation AddTrack($input: AddTrackInput!) {
    addTrack(input: $input) {
      id
    }
  }
`;
export type AddTrackMutationFn = Apollo.MutationFunction<
  AddTrackMutation,
  AddTrackMutationVariables
>;

/**
 * __useAddTrackMutation__
 *
 * To run a mutation, you first call `useAddTrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTrackMutation, { data, loading, error }] = useAddTrackMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddTrackMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddTrackMutation,
    AddTrackMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddTrackMutation, AddTrackMutationVariables>(
    AddTrackDocument,
    options,
  );
}
export type AddTrackMutationHookResult = ReturnType<typeof useAddTrackMutation>;
export type AddTrackMutationResult = Apollo.MutationResult<AddTrackMutation>;
export type AddTrackMutationOptions = Apollo.BaseMutationOptions<
  AddTrackMutation,
  AddTrackMutationVariables
>;
export const DisabledCommandDocument = gql`
  mutation DisabledCommand($input: ToggleCommandInput!) {
    disableCommand(toggleCommandInput: $input) {
      ...SimpleCommand
    }
  }
  ${SimpleCommandFragmentDoc}
`;
export type DisabledCommandMutationFn = Apollo.MutationFunction<
  DisabledCommandMutation,
  DisabledCommandMutationVariables
>;

/**
 * __useDisabledCommandMutation__
 *
 * To run a mutation, you first call `useDisabledCommandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisabledCommandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disabledCommandMutation, { data, loading, error }] = useDisabledCommandMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDisabledCommandMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DisabledCommandMutation,
    DisabledCommandMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DisabledCommandMutation,
    DisabledCommandMutationVariables
  >(DisabledCommandDocument, options);
}
export type DisabledCommandMutationHookResult = ReturnType<
  typeof useDisabledCommandMutation
>;
export type DisabledCommandMutationResult =
  Apollo.MutationResult<DisabledCommandMutation>;
export type DisabledCommandMutationOptions = Apollo.BaseMutationOptions<
  DisabledCommandMutation,
  DisabledCommandMutationVariables
>;
export const EnableCommandDocument = gql`
  mutation EnableCommand($input: ToggleCommandInput!) {
    enableCommand(toggleCommandInput: $input) {
      ...SimpleCommand
    }
  }
  ${SimpleCommandFragmentDoc}
`;
export type EnableCommandMutationFn = Apollo.MutationFunction<
  EnableCommandMutation,
  EnableCommandMutationVariables
>;

/**
 * __useEnableCommandMutation__
 *
 * To run a mutation, you first call `useEnableCommandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnableCommandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enableCommandMutation, { data, loading, error }] = useEnableCommandMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEnableCommandMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EnableCommandMutation,
    EnableCommandMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    EnableCommandMutation,
    EnableCommandMutationVariables
  >(EnableCommandDocument, options);
}
export type EnableCommandMutationHookResult = ReturnType<
  typeof useEnableCommandMutation
>;
export type EnableCommandMutationResult =
  Apollo.MutationResult<EnableCommandMutation>;
export type EnableCommandMutationOptions = Apollo.BaseMutationOptions<
  EnableCommandMutation,
  EnableCommandMutationVariables
>;
export const HasChikaDocument = gql`
  mutation HasChika($guildId: ID!) {
    hasChika(guildId: $guildId)
  }
`;
export type HasChikaMutationFn = Apollo.MutationFunction<
  HasChikaMutation,
  HasChikaMutationVariables
>;

/**
 * __useHasChikaMutation__
 *
 * To run a mutation, you first call `useHasChikaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHasChikaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hasChikaMutation, { data, loading, error }] = useHasChikaMutation({
 *   variables: {
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useHasChikaMutation(
  baseOptions?: Apollo.MutationHookOptions<
    HasChikaMutation,
    HasChikaMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<HasChikaMutation, HasChikaMutationVariables>(
    HasChikaDocument,
    options,
  );
}
export type HasChikaMutationHookResult = ReturnType<typeof useHasChikaMutation>;
export type HasChikaMutationResult = Apollo.MutationResult<HasChikaMutation>;
export type HasChikaMutationOptions = Apollo.BaseMutationOptions<
  HasChikaMutation,
  HasChikaMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options,
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const RemoveTrackDocument = gql`
  mutation RemoveTrack($input: RemoveTrackInput!) {
    removeTrack(input: $input)
  }
`;
export type RemoveTrackMutationFn = Apollo.MutationFunction<
  RemoveTrackMutation,
  RemoveTrackMutationVariables
>;

/**
 * __useRemoveTrackMutation__
 *
 * To run a mutation, you first call `useRemoveTrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTrackMutation, { data, loading, error }] = useRemoveTrackMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveTrackMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveTrackMutation,
    RemoveTrackMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveTrackMutation, RemoveTrackMutationVariables>(
    RemoveTrackDocument,
    options,
  );
}
export type RemoveTrackMutationHookResult = ReturnType<
  typeof useRemoveTrackMutation
>;
export type RemoveTrackMutationResult =
  Apollo.MutationResult<RemoveTrackMutation>;
export type RemoveTrackMutationOptions = Apollo.BaseMutationOptions<
  RemoveTrackMutation,
  RemoveTrackMutationVariables
>;
export const ShuffleTracksDocument = gql`
  mutation ShuffleTracks($guildId: ID!) {
    shuffleTracks(guildId: $guildId) {
      id
    }
  }
`;
export type ShuffleTracksMutationFn = Apollo.MutationFunction<
  ShuffleTracksMutation,
  ShuffleTracksMutationVariables
>;

/**
 * __useShuffleTracksMutation__
 *
 * To run a mutation, you first call `useShuffleTracksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useShuffleTracksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [shuffleTracksMutation, { data, loading, error }] = useShuffleTracksMutation({
 *   variables: {
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useShuffleTracksMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ShuffleTracksMutation,
    ShuffleTracksMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ShuffleTracksMutation,
    ShuffleTracksMutationVariables
  >(ShuffleTracksDocument, options);
}
export type ShuffleTracksMutationHookResult = ReturnType<
  typeof useShuffleTracksMutation
>;
export type ShuffleTracksMutationResult =
  Apollo.MutationResult<ShuffleTracksMutation>;
export type ShuffleTracksMutationOptions = Apollo.BaseMutationOptions<
  ShuffleTracksMutation,
  ShuffleTracksMutationVariables
>;
export const UpdateBalloonDocument = gql`
  mutation UpdateBalloon($input: UpdateBalloonInput!) {
    updateBalloon(input: $input) {
      ...GuildConfigInfo
    }
  }
  ${GuildConfigInfoFragmentDoc}
`;
export type UpdateBalloonMutationFn = Apollo.MutationFunction<
  UpdateBalloonMutation,
  UpdateBalloonMutationVariables
>;

/**
 * __useUpdateBalloonMutation__
 *
 * To run a mutation, you first call `useUpdateBalloonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBalloonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBalloonMutation, { data, loading, error }] = useUpdateBalloonMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBalloonMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateBalloonMutation,
    UpdateBalloonMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateBalloonMutation,
    UpdateBalloonMutationVariables
  >(UpdateBalloonDocument, options);
}
export type UpdateBalloonMutationHookResult = ReturnType<
  typeof useUpdateBalloonMutation
>;
export type UpdateBalloonMutationResult =
  Apollo.MutationResult<UpdateBalloonMutation>;
export type UpdateBalloonMutationOptions = Apollo.BaseMutationOptions<
  UpdateBalloonMutation,
  UpdateBalloonMutationVariables
>;
export const UpdatePrefixDocument = gql`
  mutation UpdatePrefix($input: UpdatePrefixInput!) {
    updatePrefix(input: $input) {
      id
      prefix
    }
  }
`;
export type UpdatePrefixMutationFn = Apollo.MutationFunction<
  UpdatePrefixMutation,
  UpdatePrefixMutationVariables
>;

/**
 * __useUpdatePrefixMutation__
 *
 * To run a mutation, you first call `useUpdatePrefixMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePrefixMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePrefixMutation, { data, loading, error }] = useUpdatePrefixMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePrefixMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePrefixMutation,
    UpdatePrefixMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdatePrefixMutation,
    UpdatePrefixMutationVariables
  >(UpdatePrefixDocument, options);
}
export type UpdatePrefixMutationHookResult = ReturnType<
  typeof useUpdatePrefixMutation
>;
export type UpdatePrefixMutationResult =
  Apollo.MutationResult<UpdatePrefixMutation>;
export type UpdatePrefixMutationOptions = Apollo.BaseMutationOptions<
  UpdatePrefixMutation,
  UpdatePrefixMutationVariables
>;
export const UpdateShiritoriDocument = gql`
  mutation UpdateShiritori($input: UpdateShiritoriInput!) {
    updateShiritori(input: $input) {
      ...GuildConfigInfo
    }
  }
  ${GuildConfigInfoFragmentDoc}
`;
export type UpdateShiritoriMutationFn = Apollo.MutationFunction<
  UpdateShiritoriMutation,
  UpdateShiritoriMutationVariables
>;

/**
 * __useUpdateShiritoriMutation__
 *
 * To run a mutation, you first call `useUpdateShiritoriMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateShiritoriMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateShiritoriMutation, { data, loading, error }] = useUpdateShiritoriMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateShiritoriMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateShiritoriMutation,
    UpdateShiritoriMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateShiritoriMutation,
    UpdateShiritoriMutationVariables
  >(UpdateShiritoriDocument, options);
}
export type UpdateShiritoriMutationHookResult = ReturnType<
  typeof useUpdateShiritoriMutation
>;
export type UpdateShiritoriMutationResult =
  Apollo.MutationResult<UpdateShiritoriMutation>;
export type UpdateShiritoriMutationOptions = Apollo.BaseMutationOptions<
  UpdateShiritoriMutation,
  UpdateShiritoriMutationVariables
>;
export const CommandsDocument = gql`
  query Commands($guildId: String!) {
    getCommandsUnderGuildCtx(guildId: $guildId) {
      ...SimpleCommand
    }
  }
  ${SimpleCommandFragmentDoc}
`;

/**
 * __useCommandsQuery__
 *
 * To run a query within a React component, call `useCommandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommandsQuery({
 *   variables: {
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useCommandsQuery(
  baseOptions: Apollo.QueryHookOptions<CommandsQuery, CommandsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CommandsQuery, CommandsQueryVariables>(
    CommandsDocument,
    options,
  );
}
export function useCommandsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CommandsQuery,
    CommandsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CommandsQuery, CommandsQueryVariables>(
    CommandsDocument,
    options,
  );
}
export type CommandsQueryHookResult = ReturnType<typeof useCommandsQuery>;
export type CommandsLazyQueryHookResult = ReturnType<
  typeof useCommandsLazyQuery
>;
export type CommandsQueryResult = Apollo.QueryResult<
  CommandsQuery,
  CommandsQueryVariables
>;
export const GuildConfigDocument = gql`
  query GuildConfig($guildId: ID!) {
    getGuildConfig(guildId: $guildId) {
      ...GuildConfigInfo
    }
  }
  ${GuildConfigInfoFragmentDoc}
`;

/**
 * __useGuildConfigQuery__
 *
 * To run a query within a React component, call `useGuildConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useGuildConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGuildConfigQuery({
 *   variables: {
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useGuildConfigQuery(
  baseOptions: Apollo.QueryHookOptions<
    GuildConfigQuery,
    GuildConfigQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GuildConfigQuery, GuildConfigQueryVariables>(
    GuildConfigDocument,
    options,
  );
}
export function useGuildConfigLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GuildConfigQuery,
    GuildConfigQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GuildConfigQuery, GuildConfigQueryVariables>(
    GuildConfigDocument,
    options,
  );
}
export type GuildConfigQueryHookResult = ReturnType<typeof useGuildConfigQuery>;
export type GuildConfigLazyQueryHookResult = ReturnType<
  typeof useGuildConfigLazyQuery
>;
export type GuildConfigQueryResult = Apollo.QueryResult<
  GuildConfigQuery,
  GuildConfigQueryVariables
>;
export const MeDocument = gql`
  query Me {
    getUser {
      id
      username
      avatar
      guilds {
        id
        name
        icon
        isChikaIn
      }
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const NowPlayingDocument = gql`
  query NowPlaying($guildId: ID!) {
    getNowPlaying(guildId: $guildId) {
      ...TrackInfo
    }
  }
  ${TrackInfoFragmentDoc}
`;

/**
 * __useNowPlayingQuery__
 *
 * To run a query within a React component, call `useNowPlayingQuery` and pass it any options that fit your needs.
 * When your component renders, `useNowPlayingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNowPlayingQuery({
 *   variables: {
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useNowPlayingQuery(
  baseOptions: Apollo.QueryHookOptions<
    NowPlayingQuery,
    NowPlayingQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<NowPlayingQuery, NowPlayingQueryVariables>(
    NowPlayingDocument,
    options,
  );
}
export function useNowPlayingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    NowPlayingQuery,
    NowPlayingQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<NowPlayingQuery, NowPlayingQueryVariables>(
    NowPlayingDocument,
    options,
  );
}
export type NowPlayingQueryHookResult = ReturnType<typeof useNowPlayingQuery>;
export type NowPlayingLazyQueryHookResult = ReturnType<
  typeof useNowPlayingLazyQuery
>;
export type NowPlayingQueryResult = Apollo.QueryResult<
  NowPlayingQuery,
  NowPlayingQueryVariables
>;
export const TracksDocument = gql`
  query Tracks($guildId: ID!) {
    getTracks(guildId: $guildId) {
      id
      title
      duration
    }
  }
`;

/**
 * __useTracksQuery__
 *
 * To run a query within a React component, call `useTracksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTracksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTracksQuery({
 *   variables: {
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useTracksQuery(
  baseOptions: Apollo.QueryHookOptions<TracksQuery, TracksQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TracksQuery, TracksQueryVariables>(
    TracksDocument,
    options,
  );
}
export function useTracksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TracksQuery, TracksQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TracksQuery, TracksQueryVariables>(
    TracksDocument,
    options,
  );
}
export type TracksQueryHookResult = ReturnType<typeof useTracksQuery>;
export type TracksLazyQueryHookResult = ReturnType<typeof useTracksLazyQuery>;
export type TracksQueryResult = Apollo.QueryResult<
  TracksQuery,
  TracksQueryVariables
>;
