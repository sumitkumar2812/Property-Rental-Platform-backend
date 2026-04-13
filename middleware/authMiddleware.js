const jwt = require("jsonwebtoken");
const User = require("../model/User");

const protect = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_TOKEN)

            req.user = await User.findById(decoded.id).select("-password");

            next()
        } catch (error) {
            return res.status(400).json({ message: "Not Authorized, Token Failed." })
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not Authorized, No Token." })
    }
}

module.exports = { protect }