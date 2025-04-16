import pageService from "./page.service.js";

class pageController {
  static async createOne(req, res) {
    try {
      const pageName = req.body.pageName;

      const authHeader = req.headers["authorization"];
      const pages = await pageService.createOne(pageName, authHeader);
      res.status(201).json({
        message: "Page " + pages.pageName + " created and added successfully",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async getOne(req, res) {
    try {
      const _id = req.body._id;
      const authHeader = req.headers["authorization"];
      const page = await pageService.getOne(_id, authHeader);
      res.status(200).json({
        message: "Page fetched succefully",
        page,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async getAll(req, res) {
    try {
      const userId = req.body.userId;
      const authHeader = req.headers["authorization"];

      const pages = await pageService.getAll(userId, authHeader);

      res.status(201).json({ message: "pages fetched successfully", pages });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async deleteOne(req, res) {
    try {
      const pageId = req.body._id;

      const authHeader = req.headers["authorization"];
      const page = await pageService.deleteOne(pageId, authHeader);

      res.status(200).json({ message: "page deleted successfully", page });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
export default pageController;
