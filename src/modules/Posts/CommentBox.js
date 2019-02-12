import React, { useState, useEffect } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Loading from "../../components/Loading";
import _ from "lodash";

const CREATE_COMMENT = gql`
  mutation($text: String!, $post: String!) {
    createComment(data: { text: $text, post: $post }) {
      id
    }
  }
`;

const REMOVE_COMMENT = gql`
  mutation($id: String!) {
    deleteComment(id: $id) {
      id
    }
  }
`;

const GET_COMMENTS_BY_POST = gql`
  query($postId: String, $first: Int, $after: String) {
    comments(
      postId: $postId
      first: $first
      after: $after
      orderBy: createdAt_DESC
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          text
          author {
            id
            name
          }
        }
      }
    }
  }
`;

const CommentsList = ({ postId, isRefetch }) => {
  return (
    <div>
      <Query
        query={GET_COMMENTS_BY_POST}
        fetchPolicy={"network-only"}
        variables={{ postId, first: 5 }}
      >
        {({ loading, error, data, refetch, fetchMore }) => {
          if (loading) return <p>Loading ... </p>;
          if (error) return <p>ERROR</p>;
          if (isRefetch) refetch();
          return (
            <div>
              {data.comments &&
                data.comments.edges.map(({ node }, index) => (
                  <CommentStyle key={index}>
                    <div className="comment-author">{node.author.name}</div>
                    <div className="comment-text">
                      <strong>{node.text}</strong>
                    </div>
                    <Mutation
                      mutation={REMOVE_COMMENT}
                      refetchQueries={[
                        {
                          query: GET_COMMENTS_BY_POST,
                          variables: { postId, first: 5 }
                        }
                      ]}
                    >
                      {(deleteComment, { loading, error, data }) => {
                        return (
                          <div
                            className="delete-comment"
                            onClick={() =>
                              deleteComment({ variables: { id: node.id } })
                            }
                          >
                            <i className="fas fa-minus-circle" />
                          </div>
                        );
                      }}
                    </Mutation>
                  </CommentStyle>
                ))}

              {data.comments && data.comments.pageInfo.hasNextPage && (
                <a
                  href="#"
                  onClick={() => {
                    fetchMore({
                      query: GET_COMMENTS_BY_POST,
                      variables: {
                        postId,
                        first: 5,
                        after: data.comments.pageInfo.endCursor
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (fetchMoreResult.comments.edges.length === 0)
                          return prev;
                        const temp = {
                          ...fetchMoreResult
                        };

                        temp.comments.edges = fetchMoreResult.comments.edges.concat(
                          prev.comments.edges
                        );

                        return temp;
                      }
                    });
                  }}
                >
                  View more comments
                </a>
              )}
            </div>
          );
        }}
      </Query>
    </div>
  );
};

const CommentBox = ({ postId, onCompleted }) => {
  const [text, updateText] = useState("");
  return (
    <Mutation mutation={CREATE_COMMENT} onCompleted={onCompleted}>
      {(createComment, { loading, error }) => {
        if (loading) return <Loading />;
        return (
          <form
            onSubmit={e => {
              e.preventDefault();
              createComment({ variables: { text, post: postId } });
              updateText("");
            }}
          >
            <CommentBoxInput
              type="text"
              placeholder="Write a comment"
              value={text}
              onChange={e => {
                updateText(e.target.value);
              }}
            />
          </form>
        );
      }}
    </Mutation>
  );
};

const CommentContainer = ({ postId }) => {
  const [refetch, onUpdate] = useState(false);
  return (
    <div>
      <CommentBox
        postId={postId}
        onCompleted={e => {
          onUpdate(true);
        }}
      />
      <CommentsList postId={postId} isRefetch={refetch} />
    </div>
  );
};

const CommentStyle = styled.div`
  display: flex;
  padding: 8px;
  border-radius: 10px;
  background-color: #f2f3f5;
  align-items: center;
  .comment-text {
    margin-left: 15px;
    width: 600px;
  }
  .comment-author {
    font-weight: bold;
  }
  .delete-comment {
    margin-left: auto;
  }
  width: 700px;
  min-height: 40px;
  margin: 0 auto;
  margin-bottom: 12px;
`;

const CommentBoxInput = styled.input`
  border-radius: 10px;
  width: 700px;
  height: 30px;
  margin-left: 38px;
  margin-bottom: 20px;
  padding: 10px;
  outline: none;
`;

export default CommentContainer;
