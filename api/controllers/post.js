import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    console.error("err1:" + err);
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    
    if (err) {
      console.error(err); // Log the error for debugging purposes
      return res.status(403).json("Token is not valid!" + err);
    }

    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) {
        console.error(err); // Log the error for debugging purposes
        return res.status(500).json("An error occurred while creating the post." + err); }
      return res.json("Post has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) {
      console.error(err); // Log the error for debugging purposes
      return res.status(403).json("Token is not valid!");
    }

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) 
    return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) { console.error(err); // Log the error for debugging purposes
      return res.status(500).json("An error occurred while updating the post.");}
      return res.json("Post has been updated.");
    });
  });
};
/* import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getRecipes = (req, res)=>{
    const q = req.query.cat ? "SELECT * FROM recipes WHERE cat=?" : "SELECT * FROM recipes";

    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json(data);
    });
};

//Single recipe
export const getRecipe = (req, res)=>{
    const q =
    "SELECT r.id, `username`, `title`, `desc`, r.img, u.img AS userImg, `cat`,`date` FROM users u JOIN recipes r ON u.id = r.uid WHERE r.id = ? ";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data[0]); //returns first item
    });
};

export const addRecipe = (req, res)=>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q =
        "INSERT INTO recipes(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";

        const values = [
        req.body.title,
        req.body.desc,
        req.body.img,
        req.body.cat,
        req.body.date,
        userInfo.id,
        ];

        db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been created.");
        });
    });
};

export const deleteRecipe = (req, res)=>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
    
        const recipeId = req.params.id;
        const q = "DELETE FROM recipes WHERE `id` = ? AND `uid` = ?";

        db.query(q, [recipeId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You can delete only your recipe!");
      
            return res.json("Recipe has been deleted!");
        });
    });
};

export const updateRecipe = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const recipeId = req.params.id;
      const q =
        "UPDATE recipes SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";
  
      const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];
  
      db.query(q, [...values, recipeId, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Recipe has been updated.");
      });
    });
  };

 */