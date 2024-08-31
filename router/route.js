import { Router } from "express";
const router = Router();
import upload from "../Config/MulterConfig.js";

import * as AuthController from "../controllers/AuthController.js"
import * as ProfileController from "../controllers/ProfileController.js"
import * as ChartController from "../controllers/ChartController.js"
import AuthMiddleware from "../middleware/AuthMiddleware.js";

/** GET */
router.route('/user/:id').get(AuthMiddleware, ProfileController.GetProfile)
router.route('/auth-status').get(AuthController.AuthStatus)
// auth - status

router.route('/generateOTP').get(AuthController.GenerateOTP)
router.route('/verifyOTP').get(AuthController.VerifyOTP)
router.route('/createResetSession').get(AuthController.CreateResetSession)
router.route('/getprofileinfo/:id').get(AuthMiddleware, ProfileController.GetProfile)
router.route('/getstoragetype').get(AuthMiddleware, ChartController.GetStorageType)

/** POST */
router.route('/login').post(AuthController.UserLogin)
router.route('/register').post(AuthController.UserRegister)
router.route('/updateprofile').post(AuthMiddleware, upload.single('profileImage'), ProfileController.UpdateProfile)
router.route('/auth/google').post(AuthController.AuthGoogleLogin)


/** PUT */
router.route('/updateUser').put(AuthMiddleware, ProfileController.GetProfile)
router.route('/resetPassword').put(AuthController.ResetPassword)


export default router;