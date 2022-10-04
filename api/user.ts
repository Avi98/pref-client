import { gql } from "graphql-request";
import { IUser } from "../interfaces/UserInterface";
import { Fetch } from "./httpClient";

interface ILoginUser {
  userName: string;
  password: string;
}

const url = process.env.NEXT_PUBLIC_BASE_URL || "";
const graphqlClient = new Fetch(url);

export const loginUser = (variables: ILoginUser) => {
  const mutation = gql`
    mutation Login($userName: String!, $password: String!) {
      login(password: $password, userName: $userName) {
        userName
        id
        email
      }
    }
  `;

  return graphqlClient.fetch<{
    login: {
      userName: string;
      id: number;
      email: string;
    };
  }>(mutation, variables);
};

export const logoutUser = (user: IUser) => {
  const mutation = gql`
    mutation logout($userId: Number) {
      logout(userId: $userId)
    }
  `;

  return graphqlClient.fetch(mutation, user.id);
};

export const createUser = (userInfo: IUser, userFields: string) => {
  const mutation = gql`
    mutation Signup($userInfo: CreateUserInput!) {
      signup(userInfo: $userInfo) {
        ...${userFields}
      }
    }
  `;

  return graphqlClient.fetch(mutation, userInfo);
};
