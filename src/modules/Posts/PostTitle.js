import React, { useState } from "react";
import styled from "styled-components";
import Comment from "./CommentBox";

const Post = ({ id, title, body }) => {
  const [isToggle, toggleCommentBox] = useState(false);
  return (
    <PostWrapper>
      <h3>{title}</h3>
      <h5>{body}</h5>
      <p onClick={e => toggleCommentBox(!isToggle)}>Comments</p>
      {isToggle && <Comment postId={id} />}
    </PostWrapper>
  );
};

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  border-style: solid;
  border-color: #f2f3f5;
  width: 800px;
  height: auto;
  margin-bottom: 10px;
  p {
    margin-top: 20px;
    text-align: center;
  }
  padding: 10px;
  h5 {
    padding: 10px;
  }
`;

export default Post;
