export class GetCommentsQuery {
  postId: number;
  constructor(postId: number) {
    this.postId = postId;
  }
}
