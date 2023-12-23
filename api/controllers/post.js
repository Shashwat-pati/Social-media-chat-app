import { db } from "../connect.js";

export const getPosts = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is invalid!");
    });

    const q =
        "SELECT p.*,id,name,profilePic FROM posts AS p JOIN users AS u ON (u.id=p.userId)LEFT JOIN realtionships AS r ON (p.userId=r.followedUserid) WHERE r.followerUserId=? OR p.userId=? ORDER BY p.createdAt DESC";

    db.query(q, [userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

export const addPost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is invalid!");
    });

    const q =
        "INSERT INTO posts (`desc`,`img`,`createdAt`,`userId`) VALUES (?)";

    const values = [
        req.body.desc,
        req.body.img,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userInfo.id,
    ];

    db.query(q, [userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Post has been created!");
    });
};
