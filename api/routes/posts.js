import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;

/* import express from "express";
import { 
    addRecipe, 
    deleteRecipe, 
    getRecipe, 
    getRecipes, 
    updateRecipe,
} from "../controllers/recipe.js";

const router = express.Router();

router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.post("/", addRecipe);
router.delete("/:id", deleteRecipe);
router.put("/:id", updateRecipe);


export default router;
 */