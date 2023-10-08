import { useRef } from "react";
import axios from "axios";
const CommentCreate = ({ postId }) => {
    const commentRef = useRef();

    const createComment = async (e) => {
        e.preventDefault();
        const content = commentRef.current.value;
        await axios.post(`http://localhost:4000/posts/${postId}/comments`, {
            content
        });
        commentRef.current.value = "";
    }
    return (
        <div>
            <form onSubmit={createComment}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input ref={commentRef} required className="form-control" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>

        </div>
    );
}

export default CommentCreate;