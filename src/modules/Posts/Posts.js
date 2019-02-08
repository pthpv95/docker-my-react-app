import React from "react";
import Post from "./PostTitle";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Loading from "../../components/Loading";
import Header from "../../components/Header";

export const GET_POSTS_DATA = gql`
  query GetPostList {
    posts {
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

export default function Posts() {
  return (
    <Query query={GET_POSTS_DATA} fetchPolicy={"network-only"}>
      {({ data, loading, error, fetchMore }) => {
        if (loading) return <Loading />;
        if (error) return <p>ERROR</p>;
        return (
          <PostsWrapper>
            <Header title={"New posts"} />
            {data.posts &&
              data.posts.map(({ ...props }, index) => (
                <Post key={index} {...props} />
              ))}
          </PostsWrapper>
        );
      }}
    </Query>
  );
}

const PostsWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f2f3f5;
`;
