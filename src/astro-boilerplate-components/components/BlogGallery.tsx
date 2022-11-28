import { BlogCard } from './BlogCard';

type IRecentPostsProps = {
  postList: any[];
  postImg: any;
};

const BlogGallery = (props: IRecentPostsProps) => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
    {props.postList.map((postItem) => {
      return (
        <BlogCard
          key={postItem.slug}
          postItem={postItem}
          postImg={props.postImg}
        />
      );
    })}
  </div>
);

export { BlogGallery };
