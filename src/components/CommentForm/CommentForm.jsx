import "./CommentForm.css"
import {createRef} from "react";

const CommentForm = ({addCommentCallback}) => {
    let delayedAdd
    const wrapperRef = createRef()

    const addComment = (e) => {
        let searchQuery = e?.target?.value
        clearTimeout(delayedAdd)
        delayedAdd = setTimeout(() => {
            addCommentCallback(searchQuery)
        }, 500)
    }

    return (
        <div className="comment_form-disable" ref={wrapperRef}>
            <textarea onChange={(e) => addComment(e)} className="comment_form-textarea" rows="4"
                      placeholder="Type your comment"/>
        </div>
    )
}

export default CommentForm