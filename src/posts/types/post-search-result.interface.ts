import PostSearchBody from './post-search-body.interface';
interface PostSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: PostSearchBody;
    }>;
  };
}

export default PostSearchResult;
