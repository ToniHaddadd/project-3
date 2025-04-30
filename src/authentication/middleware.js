import "dotenv/config";
import pkg from "jsonwebtoken";
import bcryptjs from "bcryptjs";
const { verifiy } = pkg;
export default function authenticateJwt(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ message: "missing or invalid authorization header" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = verifiy(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "invalid or expired token" });
  }
}
