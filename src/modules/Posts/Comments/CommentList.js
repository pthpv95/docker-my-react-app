import React, { useState, useEffect } from "react"
import styled from "styled-components"

const CommentsList = ({ comments, pageInfo, onDeleteComment , onFetchMore}) => {
  return (
    <div>
      {comments.items &&
        comments.items.map(({ node }, index) => (
          <CommentStyle key={index}>
            <div className="comment-author">{node.author.name}</div>
            <div className="comment-text">
              <strong>{node.text}</strong>
            </div>
            <div
              className="delete-comment"
              onClick={() => onDeleteComment(node.id)}
            >
              <i className="fas fa-minus-circle" />
            </div>
          </CommentStyle>
        ))}

      {pageInfo.hasNextPage && (
        <a onClick={(e) => {
            e.preventDefault()
            onFetchMore()
        }}>
          View more comments
        </a>
      )}
    </div>
  )
}

export default CommentsList

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
`
