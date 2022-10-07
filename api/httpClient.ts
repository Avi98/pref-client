import { GraphQLClient } from "graphql-request";
import { PatchedRequestInit } from "graphql-request/dist/types";
import { getFirst } from "../utils";

export class Fetch extends GraphQLClient {
  constructor(url: string, option?: PatchedRequestInit) {
    super(url, option);
  }

  fetch<T>(query: string, options: Record<string, any>): Promise<T>;
  fetch<T>(query: string, options: string | number): Promise<T>;
  fetch<T>(
    query: string,
    options?: Record<string, any> | string | number
  ): Promise<T> {
    const promise = this.rawRequest(query, options)
      .then((res) => {
        if (res.errors) {
          const d = getFirst(res.errors).message;
          throw new Error(getFirst(res.errors).message);
        }
        this.authMiddleware(res);
        return res.data;
      })
      .catch((e) => {
        const gqlError = getFirst(e.response.errors);
        if (gqlError) {
          throw new Error(gqlError.message);
        }
      });

    return promise;
  }

  authMiddleware(res: any) {
    if (res.headers.get("authorization")) {
      this.setHeaders({
        authorization: `Bearer ${res.headers.get("authorization")}`,
      });
    }
  }
}
