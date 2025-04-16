import pkg from "jsonwebtoken";
import userService from "../user/user.service.js";
import commentModel from "./comment.model.js";
import postService from "../post/post.service.js";
import pageService from "../page/page.service.js";

class commentService {
  static async createAComment(postId, content, authHeader) {
    const payload = await userService.verify(authHeader);

    const commentContent = await this.findCommentByContent(content);
    if (commentContent) {
      throw new Error("comment already been used");
    }
    const userId = payload._id;

    new commentModel({ postId, userId, content }).save();
    const user = await userService.getOneUser(userId, authHeader);

    return user;
  }

  static async findCommentByContent(content) {
    return commentModel.findOne({ content: content });
  }
  static async getAComment(_id, authHeader) {
    const payload = await userService.verify(authHeader);

    const Comment = await this.findCommentById(_id);
    if (!Comment) {
      throw new Error("comment not found");
    }
    return Comment;
  }
  static async findCommentById(_id) {
    return commentModel.findOne({ _id: _id });
  }
  static async getAllComments(postId, authHeader) {
    const payload = await userService.verify(authHeader);

    const comments = await commentModel.find({ postId: postId });

    return comments;
  }
  static async deleteAComment(_id, authHeader) {
    const payload = await userService.verify(authHeader);

    const Comment = await this.findCommentById(_id);
    if (!Comment) {
      throw new Error("comment not found");
    }

    if (!(payload._id == userId)) {
      throw new Error("not the creator of the comment");
    }
    return commentModel.deleteOne({ _id: _id, userId: payload._id });
  }
}
export default commentService;
