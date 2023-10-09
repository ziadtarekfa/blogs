
const CommentList = ({ comments }) => {

    return (
        <div>
            <ul>
                {
                    comments.map((comment) => {
                        let content;
                        if (comment.status === 'approved') {
                            content = comment.content;
                        }
                        else if (comment.status === 'pending') {
                            content = 'This comment is awaiting moderation';
                        }
                        else {
                            content = 'This comment has been rejected';
                        }
                        return (
                            <li>{content}</li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default CommentList;