import postService from "./post.service.js";
class postController {
  static async createOne(req, res) {
    try {
      const { pageId, postName, content } = req.body;

      const authHeader = req.headers["authorization"];
      const post = await postService.createOne(
        pageId,
        postName,
        content,
        authHeader
      );
      res.status(201).json({
        message: "Post " + post.postName + "' created and added successfully ",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async getOne(req, res) {
    try {
      const _id = req.body._id;
      const authHeader = req.headers["authorization"];
      const post = await postService.getOne(_id, authHeader);

      res.status(200).json({
        message: "Post fetched succefully",
        post,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async getAll(req, res) {
    try {
      const pageId = req.body.pageId;
      const authHeader = req.headers["authorization"];

      const posts = await postService.getAll(pageId, authHeader);

      res.status(200).json({ message: "posts fetched successfully", posts });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
export default postController;
