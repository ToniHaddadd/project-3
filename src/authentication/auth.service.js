import pkg from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
const { hash, compare } = bcryptjs;
const { sign } = pkg;
const { verify } = pkg;
import userModel from "../user/user.model.js";

class authService {
  static async signUp(email, password, firstName, lastName) {
    if (await this.findUserByEmail(email)) {
      throw new Error("USER ALREADY EXISTS");
    }
    const hashedPass = await hash(password, 12);
    new userModel({ email, password: hashedPass, firstName, lastName }).save();
  }

  static signJwt(userpayload) {
    return sign(userpayload, process.env.JWT_SECRET, { expiresIn: "1d" });
  }

  static async login(email, password) {
    const userFinder = await this.findUserByEmail(email);
    const passChecker = await compare(password, userFinder.password);

    if (!passChecker) {
      throw new Error("PASS or email incorrect");
    }

    if (!userFinder) {
      throw new Error("email or pass not found");
    }
    const token = this.signJwt({
      _id: userFinder._id,
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
