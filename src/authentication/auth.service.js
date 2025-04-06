import pkg from "jsonwebtoken";
const { sign } = pkg;
const { verify } = pkg;
import userModel from "../user/user.model.js";

class authService {
  static async signUp(email, password, firstName, lastName) {
    if (!(await this.findUserByEmail(email))) {
      new userModel({ email, password, firstName, lastName }).save();
    } else {
      throw new Error("USER ALREADY EXISTS");
    }
  }
  static signJwt(userpayload) {
    return sign(userpayload, "mysecretkey", { expiresIn: "1d" });
  }
  static async login(email, password) {
    const userFinder = await this.findUserByEmail(email);

    if (userFinder.password != password) {
      throw new Error("PASS incorrect");
    }

    if (!userFinder) {
      throw new Error("email not found");
    }
    const token = this.signJwt({
      _id: userFinder._id,
      firstName: userFinder.firstName,
    });

    return {
      user: { firstName: userFinder.firstName, lastName: userFinder.lastName },
      token,
    };
  }
  static async findUserByEmail(email) {
    return userModel.findOne({ email: email });
  }
}
export default authService;
