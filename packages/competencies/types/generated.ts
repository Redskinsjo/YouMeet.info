import { GraphQLResolveInfo } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Competency = {
  __typename?: 'Competency';
  advantages?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  appelations?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  conclusion?: Maybe<Scalars['String']['output']>;
  definition?: Maybe<Scalars['String']['output']>;
  development?: Maybe<Scalars['String']['output']>;
  examples?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  extension?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  importance?: Maybe<Scalars['String']['output']>;
  keywords?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  relatedSkills?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type CompetencyInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PageParamsInput = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  competencies?: Maybe<Array<Maybe<Competency>>>;
  oneCompetency?: Maybe<Competency>;
};


export type QueryCompetenciesArgs = {
  data?: InputMaybe<CompetencyInput>;
  params?: InputMaybe<PageParamsInput>;
};


export type QueryOneCompetencyArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type GetManyCompetenciesQueryVariables = Exact<{
  data?: InputMaybe<CompetencyInput>;
  params?: InputMaybe<PageParamsInput>;
}>;


export type GetManyCompetenciesQuery = { __typename?: 'Query', competencies?: Array<{ __typename?: 'Competency', title?: string | null, definition?: string | null, relatedSkills?: Array<string | null> | null, advantages?: Array<string | null> | null, examples?: Array<string | null> | null, importance?: string | null, development?: string | null, keywords?: Array<string | null> | null, conclusion?: string | null, extension?: string | null, slug?: string | null } | null> | null };

export type GetOneCompetencyQueryVariables = Exact<{
  title?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetOneCompetencyQuery = { __typename?: 'Query', oneCompetency?: { __typename?: 'Competency', title?: string | null, definition?: string | null, relatedSkills?: Array<string | null> | null, advantages?: Array<string | null> | null, examples?: Array<string | null> | null, importance?: string | null, development?: string | null, keywords?: Array<string | null> | null, conclusion?: string | null, extension?: string | null, slug?: string | null } | null };



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Competency: ResolverTypeWrapper<Competency>;
  CompetencyInput: CompetencyInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  PageParamsInput: PageParamsInput;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Competency: Competency;
  CompetencyInput: CompetencyInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  PageParamsInput: PageParamsInput;
  Query: {};
  String: Scalars['String']['output'];
};

export type CompetencyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Competency'] = ResolversParentTypes['Competency']> = {
  advantages?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  appelations?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  conclusion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  definition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  development?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  examples?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  extension?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  importance?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  keywords?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  relatedSkills?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  competencies?: Resolver<Maybe<Array<Maybe<ResolversTypes['Competency']>>>, ParentType, ContextType, Partial<QueryCompetenciesArgs>>;
  oneCompetency?: Resolver<Maybe<ResolversTypes['Competency']>, ParentType, ContextType, Partial<QueryOneCompetencyArgs>>;
};

export type Resolvers<ContextType = any> = {
  Competency?: CompetencyResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};



export const GetManyCompetenciesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetManyCompetencies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CompetencyInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PageParamsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"competencies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"relatedSkills"}},{"kind":"Field","name":{"kind":"Name","value":"advantages"}},{"kind":"Field","name":{"kind":"Name","value":"examples"}},{"kind":"Field","name":{"kind":"Name","value":"importance"}},{"kind":"Field","name":{"kind":"Name","value":"development"}},{"kind":"Field","name":{"kind":"Name","value":"keywords"}},{"kind":"Field","name":{"kind":"Name","value":"conclusion"}},{"kind":"Field","name":{"kind":"Name","value":"extension"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<GetManyCompetenciesQuery, GetManyCompetenciesQueryVariables>;
export const GetOneCompetencyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneCompetency"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oneCompetency"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"relatedSkills"}},{"kind":"Field","name":{"kind":"Name","value":"advantages"}},{"kind":"Field","name":{"kind":"Name","value":"examples"}},{"kind":"Field","name":{"kind":"Name","value":"importance"}},{"kind":"Field","name":{"kind":"Name","value":"development"}},{"kind":"Field","name":{"kind":"Name","value":"keywords"}},{"kind":"Field","name":{"kind":"Name","value":"conclusion"}},{"kind":"Field","name":{"kind":"Name","value":"extension"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<GetOneCompetencyQuery, GetOneCompetencyQueryVariables>;