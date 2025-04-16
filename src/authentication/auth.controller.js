import authService from "./auth.service.js";

class authController {
  static async signUp(req, res) {
    try {
      const { email, password, firstName, lastName } = req.body;

      const user = await authService.signUp(
        email,
        password,
        firstName,
        lastName
      );
      res
        .status(201) //201 is the signed up good res created
        .json({ message: "user sign up and added successfully" + firstName });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await authService.login(email, password);
      res.status(200).json({ message: "Users logged in successfully", user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
export default authController;
