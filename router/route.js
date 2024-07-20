import { Router } from "express";
const router = Router();

import * as AuthController from "../controllers/AuthController.js"
import * as ProfileController from "../controllers/ProfileController.js"

/** GET */
router.route('/user/:id').get(ProfileController.GetProfile)

router.route('/generateOTP').get(AuthController.GenerateOTP)
router.route('/verifyOTP').get(AuthController.VerifyOTP)
router.route('/createResetSession').get(AuthController.CreateResetSession)

/** POST */
router.route('/login').post(AuthController.UserLogin)

router.route('/register').post(AuthController.UserRegister)

/** PUT */
router.route('/updateUser').put(ProfileController.GetProfile)
router.route('/resetPassword').put(AuthController.ResetPassword)


export default router;