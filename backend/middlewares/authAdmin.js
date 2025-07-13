import jwt from "jsonwebtoken";
//admin authentication middleware
const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is missing",
      });
    }
    const tokenDecode = jwt.verify(atoken, process.env.JWT_SECRET);
    if (tokenDecode != process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this resource",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

};

export default authAdmin;
