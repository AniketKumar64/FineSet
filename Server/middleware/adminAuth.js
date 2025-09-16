import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {

    try{
          const { token } = req.headers;
    if (!token) {
return res.json({ message: "Unauthorized", success: false });
    }

    const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (token_decoded !==process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
    
        return res.json({ message: "Unauthorized" , success: false });
    }

   next();
    }
    catch (err) {
        console.log("Error in adminAuth:", err);
        return res.status(500).json({ message: "Internal server error", success: false });
    }

  
};

export default adminAuth;
