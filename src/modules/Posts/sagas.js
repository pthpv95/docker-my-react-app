import { put, takeLatest, call } from "redux-saga/effects";
import GraphqlHttpClient from "../../services/graphql-client";
import { updateLoadingStatus } from "../../app/actions";

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
`;

function* getPosts(action) {
  yield put(updateLoadingStatus(true))
  const data = yield call(
    GraphqlHttpClient,
    GET_POST_QUERY,
    action.payload.variables
  );

  yield put({ type: "UPDATE_LIST_POSTS", payload: data.posts.edges });
  yield put({ type: "UPDATE_POSTS_PAGINATION_INFO", payload: data.posts.pageInfo });
  
  yield put(updateLoadingStatus(false))
}

function* postSaga() {
  yield takeLatest("GET_POST_LIST", getPosts);
}

export default postSaga;
