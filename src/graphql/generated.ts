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
  disableCommand: CommandGuildCtx;
  enableCommand: CommandGuildCtx;
  /**
   * Checks our database for this guild.
   * @deprecated We are syncing with the bot now, no need for this check
   */
  hasChika: Scalars['Boolean'];
  /** Returns true if logout was successful. */
  logout: Scalars['Boolean'];
  /** The new prefix */
  updatePrefix: GuildConfig;
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

export type MutationUpdatePrefixArgs = {
  input: UpdatePrefixInput;
};

export type Query = {
  __typename?: 'Query';
  getAllCommands: Array<Command>;
  getCommandsUnderGuildCtx: Array<CommandGuildCtx>;
  getGuildConfig: GuildConfig;
  getUser: User;
};

export type QueryGetCommandsUnderGuildCtxArgs = {
  guildId: Scalars['String'];
};

export type QueryGetGuildConfigArgs = {
  guildId: Scalars['ID'];
};

export type ToggleCommandInput = {
  commandId: Scalars['Int'];
  guildId: Scalars['String'];
};

export type UpdatePrefixInput = {
  id: Scalars['ID'];
  prefix: Scalars['String'];
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

export type UpdatePrefixMutationVariables = Exact<{
  input: UpdatePrefixInput;
}>;

export type UpdatePrefixMutation = { __typename?: 'Mutation' } & {
  updatePrefix: { __typename?: 'GuildConfig' } & Pick<
    GuildConfig,
    'id' | 'prefix'
  >;
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
