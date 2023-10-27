import { Router } from "express";
import passport from "passport";
import { authorization, passportCall } from "../utils.js";
import { current, failLogin, failRegister, githubCallback, login, logout, register } from "../controllers/sessions.js";

const router = Router();

router.post('/login', passport.authenticate('login', { session: false, failureRedirect: '/api/sessions/failLogin' }), login)

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { })

router.get('/githubCallback', passport.authenticate('github', { session: false, failureRedirect: '/failLogin' }), githubCallback)

router.get('/failLogin', failLogin )

router.post('/register', passport.authenticate('register', { session: false, failureRedirect: '/api/sessions/failRegister' }), register)

router.get('/failRegister', failRegister)

router.get('/logout', logout);

router.get('/current', passportCall('jwt'), authorization('usuario'), current)

export default router;