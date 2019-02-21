import { createSelector } from "reselect"

const selectPost = state => state.get("posts")
const selectComment = (state, props) => {
  const comments = state.get("comments")
  if (comments.size > 0) {
    const comment = comments.find(c => c.postId === props.postId)
    if (!comment) {
      return {
        pageInfo: {
          hasNextPage: false
        },
        items: []
      }
    }
    return comment
  }
  return {
    pageInfo: {
      hasNextPage: false
    },
    items: []
  }
}

const makeGetPosts = () =>
  createSelector(
    selectPost,
    posts => ({
      items: posts.get("items")
    })
  )

const makeGetPostsPaginationInfo = () =>
  createSelector(
    selectPost,
    posts => posts.get("pageInfo")
  )

const makeGetComments = (state, props) =>
  createSelector(
    selectComment,
    comment => ({
      items: comment.items
    })
  )

const makeGetCommentsPaginationInfo = () =>
  createSelector(
    selectComment,
    comment => comment.pageInfo
  )

export {
  makeGetPosts,
  makeGetPostsPaginationInfo,
  makeGetComments,
  makeGetCommentsPaginationInfo
}
