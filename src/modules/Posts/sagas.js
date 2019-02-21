import { put, takeLatest, call, all } from "redux-saga/effects"
import GraphqlHttpClient from "../../services/graphql-client"
import { updateLoadingStatus } from "../../app/actions"

const GET_POST_QUERY = /* GraphQL */ `
  query getPosts($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      aggregate {
        count
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
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
    }
  }
`

const GET_COMMENTS_QUERY = /* GraphQL */ `
  query getComments($postId: String, $first: Int, $after: String) {
    comments(
      postId: $postId
      first: $first
      after: $after
      orderBy: createdAt_DESC
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      aggregate {
        count
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
`

const CREATE_COMMENT = /* GraphQL */ `
  mutation($text: String!, $post: String!) {
    createComment(data: { text: $text, post: $post }) {
      id
      text
      author {
        id
        name
      }
      post {
        id
      }
    }
  }
`

const REMOVE_COMMENT = /* GraphQL */ `
  mutation($id: String!) {
    deleteComment(id: $id) {
      id
    }
  }
`

function* getPosts(action) {
  yield put(updateLoadingStatus(true))
  const data = yield call(
    GraphqlHttpClient,
    GET_POST_QUERY,
    action.payload.variables
  )

  yield put({ type: "UPDATE_LIST_POSTS", payload: data.posts.edges })
  yield put({
    type: "UPDATE_POSTS_PAGINATION_INFO",
    payload: data.posts.pageInfo
  })

  yield put(updateLoadingStatus(false))
}

function* getComments(action) {
  yield put(updateLoadingStatus(true))
  const data = yield call(
    GraphqlHttpClient,
    GET_COMMENTS_QUERY,
    action.payload.variables
  )

  yield put({
    type: "UPDATE_LIST_COMMENTS",
    payload: {
      postId: action.payload.variables.postId,
      items: data.comments.edges,
      pageInfo: {
        ...data.comments.pageInfo,
        count: data.comments.aggregate.count
      }
    }
  })

  yield put(updateLoadingStatus(false))
  // yield put({
  //   type: "UPDATE_COMMENTS_PAGINATION_INFO",
  //   payload: data.comments.pageInfo
  // })
}

function* createComment(action) {
  yield put(updateLoadingStatus(true))
  const result = yield call(
    GraphqlHttpClient,
    CREATE_COMMENT,
    action.payload.variables
  )

  const data = result.createComment

  yield put({
    type: "UPDATE_COMMENT_INTO_LIST",
    payload: {
      node: {
        id: data.id,
        text: data.text,
        author: {
          id: data.author.id,
          name: data.author.name
        }
      },
      postId: data.post.id
    }
  })

  yield put(updateLoadingStatus(false))
}

function* deleteComment(action) {
  yield put(updateLoadingStatus(true))
  const variables = {
    id: action.payload.id
  }
  const result = yield call(GraphqlHttpClient, REMOVE_COMMENT, variables)

  if (result.deleteComment.id) {
    yield put({
      type: "REMOVE_COMMENT_INTO_LIST",
      payload: {
        id: result.deleteComment.id,
        postId: action.payload.postId
      }
    })

    yield put(updateLoadingStatus(false))
  }
}

function* postSaga() {
  yield all([
    takeLatest("GET_POST_LIST", getPosts),
    takeLatest("GET_COMMENT_LIST", getComments),
    takeLatest("CREATE_COMMENT", createComment),
    takeLatest("REMOVE_COMMENT", deleteComment)
  ])
}

export default postSaga
