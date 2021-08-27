import express from 'express';
//middleware
import { requireSignIn } from '../middlewares';
//controllers
import { register, login, logout, currentUser } from '../controllers/auth'

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get('/logout', logout);
router.get('/current-user', requireSignIn, currentUser)

module.exports = router;