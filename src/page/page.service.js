import pkg from "jsonwebtoken";
import userService from "../user/user.service.js";
import pageModel from "./page.model.js";

class pageService {
  static async createOne(pageName, authHeader) {
    const payload = await userService.verify(authHeader);

    if (await this.findPageByName(pageName)) {
      throw new Error("page ALREADY EXISTS");
    }

    const userId = payload._id;
    const page = await new pageModel({ userId, pageName }).save();

    return page;
  }
  static async getOne(_id, authHeader) {
    const payload = await userService.verify(authHeader);

    const page = pageModel.findOne({ _id: _id, userId: payload._id });

    return page;
  }
  static async getAll(userId, authHeader) {
    const payload = await userService.verify(authHeader);

    const pages = await pageModel.find({ userId: userId });

    return pages;
  }

  static async deleteOne(pageId, authHeader) {
    const payload = await userService.verify(authHeader);

    return pageModel.deleteOne({ _id: pageId, userId: payload._id });
  }

  static async findPageByName(pageName) {
    return pageModel.findOne({ pageName: pageName });
  }

  static async findPageById(_id) {
    return pageModel.findOne({ _id: _id });
  }
}
export default pageService;
