import { fromJS } from "immutable";

const postInitialState = fromJS({
  items: [],
  pageInfo: {}
});

const postsReducers = (state = postInitialState, action) => {
  switch (action.type) {
    case "UPDATE_LIST_POSTS":
      const existingPosts = state.get("items");
      return state.set("items", [...existingPosts, ...action.payload]);
    case "UPDATE_POSTS_PAGINATION_INFO":
      return state.set("pageInfo", action.payload);
    default:
      return state;
  }
};

export default postsReducers;
