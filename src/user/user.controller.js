import userService from "./user.service.js";
class userController {
  static async getOne(req, res) {
    try {
      const authHeader = req.headers["authorization"];

      const user = await userService.getOne(authHeader);
      res.status(200).json({ message: "User fetched successfully", user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async getAll(req, res) {
    try {
      const authHeader = req.headers["authorization"];

      const users = await userService.getAll(authHeader);
      res.status(200).json({ message: "Users fetched successfully", users });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async deleteOne(req, res) {
    try {
      const userId = req.body._id;

      const authHeader = req.headers["authorization"];
      const user = await userService.deleteOne(userId, authHeader);

      res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
export default userController;
