import React, { useEffect, Fragment } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import Post from "./PostTitle"
import Loading from "../../components/Loading"
import { fetchPostList, fetchCommentList } from "./actions"
import { makeGetPosts, makeGetPostsPaginationInfo } from "./selector"
import { makeGetLoadingStatus } from "../../selectors"

function Posts(props) {
  const variables = {
    first: 5,
    after: props.pageInfo.endCursor
  }

  function loadMore() {
    props.onFetchPosts(variables)
  }

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      props.pageInfo.hasNextPage && loadMore()
    }
  }

  useEffect(() => {
    props.onFetchPosts(variables)
  }, props.posts || props.loading)

  return (
    <Fragment>
      {props.loading && props.posts.items.size === 0 && <Loading />}
      <PostsWrapper>
        {props.posts.items &&
          props.posts.items.map(({ node }, index) => (
            <Fragment key={index}>
              <Post
                key={index}
                {...node}
                onFetchComment={props.onFetchComment}
              />
            </Fragment>
          ))}
        {props.loading && props.posts.items.length > 0 && <p>Loading...</p>}
      </PostsWrapper>
    </Fragment>
  )
}

const makeMapStateToProps = () => {
  const getVisiblePosts = makeGetPosts()
  const getPageInfo = makeGetPostsPaginationInfo()
  const getLoading = makeGetLoadingStatus()
  const mapStateToProps = (state, props) => {
    return {
      loading: getLoading(state, props),
      posts: getVisiblePosts(state, props),
      pageInfo: getPageInfo(state, props)
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchPosts: queryVariables => dispatch(fetchPostList(queryVariables))
  }
}
export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(Posts)

const PostsWrapper = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f2f3f5;
  overflow-x: scroll;
  padding: 30px;
`
