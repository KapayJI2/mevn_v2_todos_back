import jwt from "jsonwebtoken";
import config from "config";

export function authMiddleware(req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    // console.log(req.headers.authorization.split(" ")[1]);
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Not authorization" });
    }
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ message: "Error authorization" });
    console.log(e);
  }
}
