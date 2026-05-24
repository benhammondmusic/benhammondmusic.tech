export const sortByDate = (posts: any[]) => {
  return posts.sort(
    (a, b) =>
      new Date(b.data.pubDate).valueOf() -
      new Date(a.data.pubDate).valueOf()
  );
};
