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
  description: Scalars['String'];
  disabled: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Guild = {
  __typename?: 'Guild';
  icon: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  disableCommand: CommandGuildCtx;
  enableCommand: CommandGuildCtx;
};

export type MutationDisableCommandArgs = {
  toggleCommandInput: ToggleCommandInput;
};

export type MutationEnableCommandArgs = {
  toggleCommandInput: ToggleCommandInput;
};

export type Query = {
  __typename?: 'Query';
  getAllCommands: Array<Command>;
  getCommandsUnderGuildCtx: Array<CommandGuildCtx>;
  getUser: User;
};

export type QueryGetCommandsUnderGuildCtxArgs = {
  guildId: Scalars['String'];
};

export type ToggleCommandInput = {
  commandId: Scalars['ID'];
  guildId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  guilds: Array<Guild>;
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type CommandsQueryVariables = Exact<{
  guildId: Scalars['String'];
}>;

export type CommandsQuery = { __typename?: 'Query' } & {
  getCommandsUnderGuildCtx: Array<
    { __typename?: 'CommandGuildCtx' } & SimpleCommandFragment
  >;
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

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: 'Query' } & {
  getUser: { __typename?: 'User' } & Pick<
    User,
    'id' | 'username' | 'avatar'
  > & {
      guilds: Array<
        { __typename?: 'Guild' } & Pick<Guild, 'id' | 'name' | 'icon'>
      >;
    };
};

export type SimpleCommandFragment = { __typename?: 'CommandGuildCtx' } & Pick<
  CommandGuildCtx,
  'id' | 'name' | 'description' | 'category' | 'disabled'
>;

export const SimpleCommandFragmentDoc = gql`
  fragment SimpleCommand on CommandGuildCtx {
    id
    name
    description
    category
    disabled
  }
`;
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
