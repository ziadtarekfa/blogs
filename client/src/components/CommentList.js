
const CommentList = ({ comments }) => {

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