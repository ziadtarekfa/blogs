import axios from "axios";
import { useState, useEffect } from 'react';
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:3001/posts');
        setPosts(res.data);
    }
    useEffect(() => {
        fetchPosts();
    }, []);



    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {
                Object.values(posts).map((post) => {
                    return (
                        <div className="card" style={{ width: '30%', marginBottom: '20px' }} key={post.id}>
                            <div className="card-body">
                                <h3>{post.title}</h3>
                                <CommentCreate postId={post.id} />
                                <CommentList postId={post.id} />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default PostList;