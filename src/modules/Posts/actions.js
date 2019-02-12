const fetchPostList = queryVariables => {
  return {
    type: "GET_POST_LIST",
    payload: {
      variables: queryVariables
    }
  };
};

export { fetchPostList };
