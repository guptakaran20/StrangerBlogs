import React from 'react'
import { Container, PostForm } from '../Components/index.js'

function AddPost() {
    return (
        <div className='py-8 pt-32 min-h-screen'>
            <Container>
                <PostForm />
            </Container>
        </div>
    )
}

export default AddPost
