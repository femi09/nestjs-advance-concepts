import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import Post from './post.entity';
import PostSearchResult from './types/post-search-result.interface';
import PostSearchBody from './types/post-search-body.interface';
 
@Injectable()
export default class PostsSearchService {
  index = 'posts'
 
  constructor(
    private readonly elasticsearchService: ElasticsearchService
  ) {}
 
  async indexPost(post: Post) {
    const result = await this.elasticsearchService.index<PostSearchBody>({
      index: this.index,
      body: {
        id: post.id,
        title: post.title,
        content: post.content,
        authorId: post.author.id
      },
    })

    return result;
  }
 
  async search(text: string) {
    const  result = await this.elasticsearchService.search<PostSearchResult | any>({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ['title', 'content']
          }
        }
      }
    })
    const hits = result.hits.hits;
    return hits.map((item) => item._source);
  }

  async update(post: Post) {
    const newBody: PostSearchBody = {
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.author.id
    }
 
    const script = Object.entries(newBody).reduce((result, [key, value]) => {
      return `${result} ctx._source.${key}='${value}';`;
    }, '');
 
    return this.elasticsearchService.updateByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id: post.id,
          }
        },
        script:{
            source: script
        }
      }
    })
  }

  async remove(postId: number) {
    this.elasticsearchService.deleteByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id: postId,
          }
        }
      }
    })
  }
}