import pkg from "jsonwebtoken";
const { sign } = pkg;
const { verify } = pkg;
import userModel from "../user/user.model.js";
// get one not get one user and change return email and first name last name on one user
class userService {
  static async getOne(authHeader) {
    const payload = await this.verify(authHeader);

    const user = await userModel.findOne({ _id: payload._id });
    return { user: { firstName: user.firstName, id: user.id } };
  }
  static async getAll(authHeader) {
    const payload = await this.verify(authHeader);

    const users = await userModel.find({});
    let totalusers = [];

    users.forEach((user, i) => {
      totalusers[i] = { firstName: user.firstName, _id: user._id };
    });

    return { totalusers };
  }
  static async deleteOne(userId, authHeader) {
    const payload = await this.verify(authHeader);

    if (!payload) {
      throw new Error("token not valid");
    }

    return userModel.deleteOne({ _id: userId });
  }

  static async verify(authHeader) {
    const token = authHeader.split(" ")[1];
    const payload = verify(token, "mysecretkey"); //to do
    if (!payload) {
      throw new Error("token not valid");
    }
    return payload;
  }
}
export default userService;
