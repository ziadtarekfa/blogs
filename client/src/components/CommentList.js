import { useState, useEffect } from "react";
import axios from "axios"

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        const res = await axios.get(`http://localhost:4000/posts/${postId}/comments`);
        setComments(res.data);
    }
    useEffect(() => {
        fetchComments();
    }, []);
    return (
        <div>
            <ul>
                {
                    comments.map((comment) => {
                        return (
                            <li>{comment.content}</li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default CommentList;