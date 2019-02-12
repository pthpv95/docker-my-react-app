import { createSelector } from "reselect";

const selectPost = state => state.get("posts");

const makeGetPosts = () =>
  createSelector(
    selectPost,
    posts => ({
      items: posts.get("items")
    })
  );

const makeGetPostsPaginationInfo = () =>
  createSelector(
    selectPost,
    posts => posts.get("pageInfo")
  );

export { makeGetPosts, makeGetPostsPaginationInfo };
