import pageService from "./page.service.js";

class pageController {
  static async createAPage(req, res) {
    try {
      const pageName = req.body.pageName;

      const authHeader = req.headers["authorization"];
      const user = await pageService.createAPage(pageName, authHeader);
      res.status(200).json({
        message: "Page " + pageName + "' created and added successfully by: ",
        user,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async getAPage(req, res) {
    try {
      const _id = req.body._id;
      const authHeader = req.headers["authorization"];
      const page = await pageService.getAPage(_id, authHeader);
      res.status(200).json({
        message: "Page fetched succefully",
        page,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async getAllPages(req, res) {
    try {
      const userId = req.body.userId;
      const authHeader = req.headers["authorization"];

      const pages = await pageService.getAllPages(userId, authHeader);

      res.status(200).json({ message: "pages fetched successfully", pages });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async deleteAPage(req, res) {
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
