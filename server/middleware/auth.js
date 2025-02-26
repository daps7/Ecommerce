const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = (requiredAccessLevel) => {
    return async (req, res, next) => {
        const token = req.header("Authorization").replace("Bearer ", "");
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findOne({ _id: decoded._id });

            if (!user) {
                throw new Error();
            }

            if (user.accessLevel < requiredAccessLevel) {
                return res.status(403).send({ error: "Access denied" });
            }

            req.user = user;
            req.token = token;
            next();
        } catch (error) {
            res.status(401).send({ error: "Please authenticate" });
        }
    };
};

module.exports = auth;
