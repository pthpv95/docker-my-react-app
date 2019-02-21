import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import CommentBox from "./CommentBox"
import { makeGetLoadingStatus } from "../../../selectors"
import { makeGetComments, makeGetCommentsPaginationInfo } from "../selector"
import { fetchCommentList, createComment, removeComment } from "../actions"
import CommentsList from "./CommentList"

const CommentContainer = props => {
  const [refetch, onUpdate] = useState(false)
  const commentRef = useRef()
  const queryVariables = {
    first: 5,
    postId: props.postId,
    after: props.pageInfo.endCursor ? props.pageInfo.endCursor : null
  }

  function handleFetchMore() {
    props.onFetchComments({
      ...queryVariables,
      after: props.pageInfo.endCursor
    })
  }
  function handleCreateComment(text) {
    const variables = {
      text,
      post: props.postId
    }
    props.onCreateComment(variables)
  }

  function handleRemoveComment(id) {
    props.onRemoveComment(id, props.postId)
  }
  useEffect(() => {
    props.onFetchComments(queryVariables)
  }, props.comments)

  return (
    <div ref={commentRef}>
      {/* {props.pageInfo.count} comments */}
      <CommentsList
        comments={props.comments}
        pageInfo={props.pageInfo}
        onFetchMore={handleFetchMore}
        onDeleteComment={handleRemoveComment}
      />
      <CommentBox
        postId={props.postId}
        onCreateComment={handleCreateComment}
        onCompleted={e => {
          onUpdate(true)
        }}
      />
    </div>
  )
}

const makeMapStateToProps = () => {
  const getVisibleComments = makeGetComments()
  const getPageInfo = makeGetCommentsPaginationInfo()
  const getLoading = makeGetLoadingStatus()
  const mapStateToProps = (state, props) => {
    return {
      loading: getLoading(state, props),
      comments: getVisibleComments(state, props),
      pageInfo: getPageInfo(state, props)
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchComments: queryVariables =>
      dispatch(fetchCommentList(queryVariables)),
    onCreateComment: queryVariables => dispatch(createComment(queryVariables)),
    onRemoveComment: (id, postId) => dispatch(removeComment(id, postId))
  }
}
export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(CommentContainer)
