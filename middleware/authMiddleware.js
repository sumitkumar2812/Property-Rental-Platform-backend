const jwt = require("jsonwebtoken")
const User = require("../model/User")
const asyncHandler = require("express-async-handler")

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1]

            const decoded = jwt.verify(token, process.env.JWT_TOKEN)

            req.user = await User.findById(decoded.id).select("-password")

            if (!req.user) {
                req.statusCode(401)
                throw new Error("Not Authorized, Ussr not found in the Database")
            }

            next()

        } catch (error) {
            console.error("Auth Middleware Error:", error.message)
            throw new Error("Not Authorized, Token Invalid or Faild")
        }
    }

    if (!token) {
        req.statusCode(401)
        throw new Error("Not Authorized, No Token Provided")
    }
});

const authorize = (...roles) => {
    return (req, res, next) => {
        if ((!req.user) || (!roles.includes(req.user.role))) {
            res.status(403)
            throw new error(`User role ${req.user ? req.user.role : Unauthenticated} is not authorized to access this route.` )
        }
        next()
    }
};

module.exports = {protect, authorize};
