import commentService from "./comment.service.js";
class commentController {
  static async createAComment(req, res) {
    try {
      const { postId, userId, content } = req.body;

      const authHeader = req.headers["authorization"];
      const user = await commentService.createAComment(
        postId,
        userId,
        content,
        authHeader
      );
      res.status(201).json({
        message: "comment created and added successfully by: ",
        user,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async getAComment(req, res) {
    try {
      const _id = req.body._id;
      const authHeader = req.headers["authorization"];
      const comment = await commentService.getAComment(_id, authHeader);

      res.status(200).json({
        message: "comment fetched succefully",
        comment,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async getAllComments(req, res) {
    try {
      const postId = req.body.postId;
      const authHeader = req.headers["authorization"];

      const comments = await commentService.getAllComments(postId, authHeader);

      res
        .status(200)
        .json({ message: "comments fetched successfully", comments });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async deleteAComment(req, res) {
    try {
      const _id = req.body._id;
      const authHeader = req.headers["authorization"];
      const comment = await commentService.deleteAComment(_id, authHeader);

      res.status(200).json({
        message: "comment deleted succefully",
        comment,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
export default commentController;
