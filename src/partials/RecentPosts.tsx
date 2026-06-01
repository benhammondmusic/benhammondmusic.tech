import { useState, useEffect } from 'react';
import { BlogGallery, GradientText, Section } from '../astro-boilerplate-components';

type BlogPost = {
  slug: string;
  title: string;
  imgSrc?: string;
};

const RecentPosts = () => {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);

  useEffect(() => {
    fetch('/api/posts')
      .then(r => r.json())
      .then(setPosts)
      .catch(() => setPosts([]));
  }, []);

  return (
    <Section
      title={
        <div className='flex justify-between'>
          <div className='font-rubik'>
            Recent <GradientText>Posts</GradientText>
          </div>
          <div className='text-sm'>
            <a
              className='hover:text-benhammondyellow flex flex-col sm:block italic md:not-italic'
              href='/blog'
            >
              <span>Read the </span>
              <span>tech blog ↗</span>
            </a>
          </div>
        </div>
      }
    >
      {posts === null ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 bg-gradient-to-br p-4 from-benhammondyellow to-benhammondyellow-600 rounded-md animate-pulse">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-32 bg-white/20 rounded-md" />
          ))}
        </div>
      ) : (
        <BlogGallery posts={posts} />
      )}
    </Section>
  );
};

export { RecentPosts };
