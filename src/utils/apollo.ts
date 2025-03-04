import {ApolloClient, InMemoryCache} from "@apollo/client";
import {Endpoints} from "@/constants/endpoints";

export const client = new ApolloClient({
    uri: Endpoints.Main,
    cache: new InMemoryCache(),
});