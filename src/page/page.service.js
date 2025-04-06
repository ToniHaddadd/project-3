import pkg from "jsonwebtoken";
import userService from "../user/user.service.js";
import pageModel from "./page.model.js";

class pageService {
  static async createAPage(pageName, authHeader) {
    const payload = await userService.verifyUser(authHeader);
    if (!payload) {
      throw new Error("token not valid");
    }

    if (await this.findPageByName(pageName)) {
      throw new Error("page ALREADY EXISTS");
    }

    const userId = payload._id;
    new pageModel({ userId, pageName }).save();
    const user = await userService.getOneUser(userId, authHeader);

    return user;
  }
  static async getAPage(_id, authHeader) {
    const payload = await userService.verifyUser(authHeader);
    if (!payload) {
      throw new Error("token not valid");
    }
    const page = await this.findPageById(_id);
    if (!page) {
      throw new Error("page not found");
    }
    return page;
  }
  static async getAllPages(userId, authHeader) {
    const payload = await userService.verifyUser(authHeader);

    if (!payload) {
      throw new Error("token not valid");
    }

    const pages = await pageModel.find({ userId: userId });

    return pages;
  }

  static async deleteOne(pageId, authHeader) {
    const payload = await userService.verifyUser(authHeader);

    if (!payload) {
      throw new Error("token not valid");
    }

    return pageModel.deleteOne({ _id: pageId });
  }

  static async findPageByName(pageName) {
    return pageModel.findOne({ pageName: pageName });
  }

  static async findPageById(_id) {
    return pageModel.findOne({ _id: _id });
  }
}
export default pageService;
