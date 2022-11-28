import {
  BlogGallery,
  GradientText,
  Section,
} from '../astro-boilerplate-components';

type IRecentPostsProps = {
  postList: any[];
  postImg: any;
};

const RecentPosts = (props: IRecentPostsProps) => (
  <Section
    title={
      <div className="flex items-baseline justify-between">
        <div>
          Recent <GradientText>Posts</GradientText>
        </div>

        <div className="text-sm">
          <a
            className="hover:text-benhammondyellow"
            href="https://blog.benhammond.tech"
          >
            View all posts →
          </a>
        </div>
      </div>
    }
  >
    <BlogGallery postList={props.postList} postImg={props.postImg} />
  </Section>
);

export { RecentPosts };
