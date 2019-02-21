import React, { useState, useEffect } from "react"
import styled from "styled-components"

const CommentBox = ({ onCreateComment }) => {
  const [text, updateText] = useState("")
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        onCreateComment(text)
        updateText('')
      }}
    >
      <CommentBoxInput
        type="text"
        placeholder="Write a comment"
        value={text}
        onChange={e => {
          updateText(e.target.value)
        }}
      />
    </form>
  )
}

export default CommentBox

const CommentBoxInput = styled.input`
  border-radius: 10px;
  width: 700px;
  height: 30px;
  margin-left: 38px;
  margin-bottom: 20px;
  padding: 10px;
  outline: none;
`
