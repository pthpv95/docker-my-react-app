const fetchPostList = queryVariables => {
  return {
    type: "GET_POST_LIST",
    payload: {
      variables: queryVariables
    }
  }
}

const createComment = variables => {
  return {
    type: "CREATE_COMMENT",
    payload: {
      variables
    }
  }
}

const removeComment = (id, postId) => {
  return {
    type: "REMOVE_COMMENT",
    payload: {
      id, postId
    }
  }
}

const fetchCommentList = variables => {
  return {
    type: "GET_COMMENT_LIST",
    payload: {
      variables
    }
  }
}

export { fetchPostList, createComment, fetchCommentList, removeComment }
