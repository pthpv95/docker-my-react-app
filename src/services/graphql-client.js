import { GraphQLClient } from "graphql-request";

const GraphqlHttpClient = async function(query, variables) {
  const endpoint = "https://lee-graphql-blogging-server.herokuapp.com/";
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  return await graphQLClient.request(query, variables);
};

export default GraphqlHttpClient;
