import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';
import DragAndDrop from './DragAndDrop';
import { ClipLoader } from 'react-spinners';


const redditAPIUrl = 'https://www.reddit.com/r/AdvertiseYourVideos/top.json?sort=random&t=all';

const App = () => {
  const [adPosts, setAdPosts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(redditAPIUrl);
        const posts = response.data.data.children
          .slice(0, 6)
          .map((post, index) => {
            // Since Reddit is pretty much very safe with its contents, I am altering the titles myself for this demo. LOL
            if (index == 1) {
              return {
                title: `Get free money!! Click Now - ${post.data.title}`,
                thumbnail: post.data.thumbnail,
              };
            } else if (index == 4) {
              return {
                title: `Adult Content - ${post.data.title}`,
                thumbnail: post.data.thumbnail,
              };
            }
            else {
              return {
                title: post.data.title,
                thumbnail: post.data.thumbnail,
              };
            }
          });
  
          setAdPosts(posts);
          setLoading(false);
      } catch (error) {
        console.error('Error fetching downvoted posts:', error);
        setLoading(false);
      }
    };
  
    fetchAds();
  }, []);

  return (
    <div>
    {loading ? (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ClipLoader size={150} color={'#123abc'} loading={loading} />
      </div>
      ):(
      <div>
      <h1 style={{ textAlign: 'center', fontFamily: 'cursive', color: '#4285f4' }}>
      Posts from Advertisement subreddit</h1>
      <div className="card-container">
        {adPosts.map(post => (
          <Card key={post.title} post={post} />
        ))}
      </div>
      <DragAndDrop cards={adPosts} />
      </div>
    ) 
  }
    
    </div>
  );
};

export default App;
