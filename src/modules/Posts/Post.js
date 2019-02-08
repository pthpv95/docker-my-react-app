import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
export const GET_POST_DETAILS = gql`
  query GetPostDetails($postId: String) {
    post(id: $postId) {
      id
      title
      body
      comments {
        id
        text
        author {
          id
          name
        }
      }
    }
  }
`;

const Post = props => {
  return (
    <Query
      query={GET_POST_DETAILS}
      variables={{ postId: props.match.params.postId }}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;
        return (
          data.post && (
            <PostContainer>
              <p>{data.post.title}</p>
              <p>{data.post.body}</p>
              <p>Comments:</p>
              {data.post.comments.length > 0 &&
                data.post.comments.map(({ content, author, id }) => (
                  <div key={id}>
                    <h4>{content}</h4>
                    <h4>{author.name}</h4>
                  </div>
                ))}
            </PostContainer>
          )
        );
      }}
    </Query>
  );
};

const PostContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  flex-direction: column;
`;

export default Post;
