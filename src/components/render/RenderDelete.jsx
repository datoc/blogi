import { useState, useEffect } from 'react';
import axios from 'axios'
import {DashboardCard} from '../Cards/Card'
import image from '../../assets/images/card.png'
import scrollToTop from '../../functions/scrolToTop';

const RenderDeleteArticle = () => {
    const [posts, setPosts] = useState([]);

    // Get All Articles
    useEffect(() => {
        axios.get('https://apitest.reachstar.io/blog/list')
            .then(res => setPosts(res.data))
            .catch(err => console.log(err))
    },[])

    // Delete Article
    const deleteHandler = (Id) => {
        axios.delete(`https://apitest.reachstar.io/blog/delete/${Id}`);

        // Return left article list
        setPosts(posts.filter(post => post.id !== Id));
        scrollToTop();
    }

    return(
        <div className='flex gap-5 flex-col'>
            {
                posts && posts.reverse().map(post => (
                    <DashboardCard 
                        post={post} 
                        url={`${post.id}`} 
                        textLimits={true}
                        key={post.id} 
                        image={image} 
                        action={'delete'}
                        clickHandler={deleteHandler}
                    />
                ))
            }
        </div>
    )
}

export default RenderDeleteArticle;