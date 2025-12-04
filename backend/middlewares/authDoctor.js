import jwt from 'jsonwebtoken'

const authDoctor = async (req, res, next) => {
    try {
        // Express converts dToken -> dtoken
        const dToken = req.headers.dtoken;

        if (!dToken) {
            return res.json({ success: false, message: "Not Authorized Login Again" });
        }

        const token_decode = jwt.verify(dToken, process.env.JWT_SECRET);

        req.docId = token_decode.id;

        next();

    } catch (error) {
        console.log("AUTH ERROR:", error);
        return res.json({ success: false, message: "Invalid or expired token" });
    }
};

export default authDoctor;
