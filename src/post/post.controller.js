import postService from "./post.service.js";
class postController {
  static async createAPost(req, res) {
    try {
      const { pageId, postName, content } = req.body;

      const authHeader = req.headers["authorization"];
      const user = await postService.createAPost(
        pageId,
        postName,
        content,
        authHeader
      );
      res.status(200).json({
        message: "Post " + postName + "' created and added successfully by: ",
        user,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async getAPost(req, res) {
    try {
      const _id = req.body._id;
      const authHeader = req.headers["authorization"];
      const post = await postService.getAPost(_id, authHeader);

      res.status(200).json({
        message: "Post fetched succefully",
        post,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async getAllPosts(req, res) {
    try {
      const pageId = req.body.pageId;
      const authHeader = req.headers["authorization"];

      const posts = await postService.getAllPosts(pageId, authHeader);

      res.status(200).json({ message: "posts fetched successfully", posts });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
export default postController;
