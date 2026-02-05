import React from 'react'
import { Container, PostForm } from '../Components/index.js'
import appwriteservice from '../AppWrite/config.js'
import { useParams, useNavigate } from 'react-router-dom'

function EditPost() {
    const [posts, setPosts] = React.useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        appwriteservice.getPost(slug).then((data) => {
            if (data) {
                setPosts(data);
            } else {
                navigate('/');
            }
        })
    }, [slug, navigate]);

    return posts ? (
        <div className='py-8 pt-32 min-h-screen'>
            <Container>
                <PostForm post={posts} />
            </Container>
        </div>
    ) : (
        <div className='py-8'>
            Loading...
        </div>
    )
}

export default EditPost
