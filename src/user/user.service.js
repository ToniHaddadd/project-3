import pkg from "jsonwebtoken";
const { sign } = pkg;
const { verify } = pkg;
import userModel from "../user/user.model.js";
class userService {
  static async getOneUser(id, authHeader) {
    const payload = await this.verifyUser(authHeader);
    if (!payload) {
      throw new Error("token not valid");
    }

    const user = await userModel.findOne({ _id: id });
    return { user: { firstName: user.firstName, id: user.id } };
  }
  static async getAllUsers(authHeader) {
    const payload = await this.verifyUser(authHeader);

    if (!payload) {
      throw new Error("token not valid");
    }

    const users = await userModel.find({});
    let totalusers = [];

    users.forEach((user, i) => {
      totalusers[i] = { firstName: user.firstName, _id: user._id };
    });

    return { totalusers };
  }
  static async deleteOne(userId, authHeader) {
    const payload = await this.verifyUser(authHeader);

    if (!payload) {
      throw new Error("token not valid");
    }

    return userModel.deleteOne({ _id: userId });
  }

  static async verifyUser(authHeader) {
    const token = authHeader.split(" ")[1];
    const payload = verify(token, "mysecretkey");
    return payload;
  }
}
export default userService;
