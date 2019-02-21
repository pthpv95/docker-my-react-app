import { fromJS, update, remove } from "immutable"
import { combineReducers } from "redux-immutable"
import { updateItemInArray, updateObject } from "../../utils"

const postInitialState = fromJS({
  items: [],
  pageInfo: {}
})

const postsReducers = (state = postInitialState, action) => {
  switch (action.type) {
    case "UPDATE_LIST_POSTS":
      const existingPosts = state.get("items")
      return state.set("items", [...existingPosts, ...action.payload])
    case "UPDATE_POSTS_PAGINATION_INFO":
      return state.set("pageInfo", action.payload)
    default:
      return state
  }
}

const commentsInitialState = fromJS([])

const commentsReducers = (state = commentsInitialState, action) => {
  switch (action.type) {
    case "UPDATE_LIST_COMMENTS": {
      const { postId } = action.payload
      const postIndex = state.findIndex(p => p.postId === action.payload.postId)
      if (postIndex > -1) {
        const updateState = updateItemInArray(
          state,
          postId,
          post => {
            const items = [...post.items, ...action.payload.items]
            return updateObject(post, {
              ...post,
              items,
              pageInfo: action.payload.pageInfo
            })
          },
          "postId"
        )

        return updateState
      }

      return state.push(action.payload)
    }

    case "UPDATE_COMMENT_INTO_LIST": {
      const { postId } = action.payload
      const postIndex = state.findIndex(p => p.postId === action.payload.postId)
      if (postIndex > -1) {
        const updateState = updateItemInArray(
          state,
          postId,
          post => {
            const items = [
              {
                node: {
                  ...action.payload.node
                }
              },
              ...post.items
            ]
            return updateObject(post, {
              ...post,
              items
            })
          },
          "postId"
        )
        return updateState
      }
    }

    case "REMOVE_COMMENT_INTO_LIST": {
      const { postId } = action.payload
      const postIndex = state.findIndex(p => p.postId === action.payload.postId)
      if (postIndex > -1) {
        const updateState = updateItemInArray(
          state,
          postId,
          comment => {
            const items = comment.items.filter(
              x => x.node.id !== action.payload.id
            )
            return updateObject(comment, {
              ...comment,
              items
            })
          },
          "postId"
        )
        return updateState
      }
    }

    default:
      return state
  }
}

export { postsReducers, commentsReducers }
