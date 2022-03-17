import "./CommentForm.css"
import {createRef} from "react";

const CommentForm = ({addCommentCallback}) => {
    let delayedAddTimer
    const wrapperRef = createRef()

    const addComment = (e) => {
        let searchQuery = e?.target?.value
        clearTimeout(delayedAddTimer)
        delayedAddTimer = setTimeout(() => {
            addCommentCallback(searchQuery)
        }, 500)
    }

    return (
        <div className="comment_form-disable full-width" ref={wrapperRef}>
            <textarea onChange={(e) => addComment(e)}
                      className="comment-form-textarea full-width" rows="4"
                      placeholder="Type your comment"/>
        </div>
    )
}

export default CommentForm