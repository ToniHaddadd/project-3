import pkg from "jsonwebtoken";
import userService from "../user/user.service.js";
import postModel from "./post.model.js";
import pageService from "../page/page.service.js";
class postService {
  static async createAPost(pageId, postName, content, authHeader) {
    const payload = await userService.verifyUser(authHeader);
    if (!payload) {
      throw new Error("token not valid");
    }

    if (await this.findPostByName(postName)) {
      throw new Error("post ALREADY EXISTS");
    }
    const pageinfo = await pageService.findPageById(pageId);

    if (!(pageinfo.userId == payload._id)) {
      throw new Error("not the creator of the page");
    }
    const postContent = await this.findPostByContent(content);
    if (postContent) {
      throw new Error("content already taken");
    }

    const userId = payload._id;
    new postModel({ pageId, postName, content }).save();
    const user = await userService.getOneUser(userId, authHeader);

    return user;
  }
  static async findPostByName(postName) {
    return postModel.findOne({ postName: postName });
  }

  static async getAPost(_id, authHeader) {
    const payload = await userService.verifyUser(authHeader);
    if (!payload) {
      throw new Error("token not valid");
    }
    const post = await this.findPostById(_id);
    if (!post) {
      throw new Error("post not found");
    }
    return post;
  }
  static async getAllPosts(pageId, authHeader) {
    const payload = await userService.verifyUser(authHeader);

    if (!payload) {
      throw new Error("token not valid");
    }

    const posts = await postModel.find({ pageId: pageId });

    return posts;
  }
  static async findPostById(_id) {
    return postModel.findOne({ _id: _id });
  }
  static async findPostByContent(content) {
    return postModel.findOne({ content: content });
  }
}
export default postService;
