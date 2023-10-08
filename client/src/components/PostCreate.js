import { useRef } from 'react';
import axios from "axios";
const PostCreate = () => {

    const titleRef = useRef();

    const createPost = (e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        axios.post('http://localhost:3001/posts', {
            title
        });
        titleRef.current.value = "";
    }
    return (
        <div>
            <form onSubmit={createPost}>
                <div className="form-group">
                    <label>Title</label>
                    <input ref={titleRef} required className="form-control" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>

        </div>
    );
}

export default PostCreate;