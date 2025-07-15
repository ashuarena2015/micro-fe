/* eslint-disable padding-line-between-statements */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
const express = require('express');
const bcrypt = require("bcrypt");
const routerAccount = express.Router();
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./isAuth');
const { AccountCreation } = require('./schema/Accounts/accounts');

const fs = require('fs');
const path = require("path");
const multer = require("multer");
const sharp = require("sharp");
const nodemailer = require('nodemailer');
const cors = require('cors');

// Gmail app passoword: MailSender / cued eiag suuv ybzq

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ashuarena@gmail.com',
      pass: 'cued eiag suuv ybzq' // Use App Passwords, not your Gmail password
    }
  });

routerAccount.get('/auth', verifyToken, async (req, res) => {
    try {

        const existingUser = await AccountCreation.findOne({ email: req.user?.email });
        return res
            .status(200)
            .json({
                user: existingUser,
                isAuthLogin: true
            });
    } catch (error) {
        return res
            .status(403)
            .json({error: error?.errmsg});
    }
})

routerAccount.post("/create", async (req, res) => {
    try {
    
        console.log('req.body.userInfo', req.body.userInfo);
        const { email, firstName, lastName, password } = req.body.userInfo;
        if(!email) {
            return res.status(400).send({message: 'Please provide correct credentials.'})
        }
        // Check If User Exists In The Database
        const user = await AccountCreation.findOne({ email });
        const otp = Math.floor(100000 + Math.random() * 900000);
        if(user) {
            return res.status(400).send({message: 'You have already registered with this email. Please login.'});
        }
        else {
            console.log('Creating new user', email, otp);
            await AccountCreation.insertOne({
                email,
                verify_otp: otp,
                isVerified: false,
                firstName: firstName,
                lastName: lastName,
                password: bcrypt.hashSync(password, 10)
            })
        }
        await transporter.sendMail({
            from: '"Admin portal application" <ashuarena@gmail.com>',
            to: email,
            subject: 'Admin-Portal-App: Email Verification Code',
            text: `Your verification code is ${otp}`
        });
        console.log({
            message: "Please check your mail to get OTP.",
            user: {
                email: user?.email
            },
            isLoginOtpSent: true})
        return res.status(200).json({
            message: "Please check your mail to get OTP.",
            user: {
                email: user?.email
            },
            isLoginOtpSent: true
        });
    } catch (error) {
        res.send({error: error?.errmsg});
    }
});

routerAccount.post('/login', async (req, res) => {

    try {
    
        const { email, password } = req.body.userInfo;

        if(!email || !password) {
            return res.status(400).send({message: 'Please provide correct credentials.'})
        }

        // Check If User Exists In The Database
        const user = await AccountCreation.findOne({ email });
        console.log({user});
        // Compare Passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!user || !passwordMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Generate JWT Token
        const token = jwt.sign({
            userId: user._id,
            email: user.email
        },
        "1234!@#%<{*&)",
        {
            expiresIn: "24h",
        });

        res.cookie("auth", token, {
            httpOnly: true, // ✅ Prevents client-side access
            secure: true, // ✅ Use HTTPS in production
            sameSite: "Strict" // ✅ Prevents CSRF attacks
        });

        return res
            .status(200)
            .json({
                message: "Login Successful",
                user,
                token
            });

    } catch (error) {
        res.send({error: error?.errmsg});
    }
    
});

routerAccount.post("/verify", async (req, res) => {
    try {
    
        const { otp, email, isResetPassword, resetPasswordOtp } = req.body.userInfo;
        console.log('req.body.userInfo', req.body.userInfo);
        if(isResetPassword) {
            const user = await AccountCreation.find ({ email, forgot_password: resetPasswordOtp });
            console.log({user})
            if(user) {
                return res.status(200).json({
                    message: "Please enter your new password.",
                    isResetOtpVerify: true,
                });    
            } else {
                return res.status(401).send({message: 'Please provide correct details.'});
            }
        }
        if (otp) {
            // Check If User Exists In The Database
            const user = await AccountCreation.findOne({ email, verify_otp: otp });
            if(user) {
                // Generate JWT Token
                const token = jwt.sign({
                    userId: user._id,
                    email: user.email
                },
                "1234!@#%<{*&)",
                {
                    expiresIn: "24h",
                });

                await AccountCreation.findOneAndUpdate(
                    { email },
                    { verify_otp: '', isVerified: true }
                );

                res.cookie("auth", token, {
                    httpOnly: true, // ✅ Prevents client-side access
                    secure: true, // ✅ Use HTTPS in production
                    sameSite: "Strict" // ✅ Prevents CSRF attacks
                });

                await transporter.sendMail({
                    from: '"Admin portal application" <ashuarena@gmail.com>',
                    to: email,
                    subject: 'Admin-Portal-App: Your account has been verified successfully!',
                    text: `You can now start browsing the app's pages. Happy Browsing!!!`
                });
                return res.status(200).json({
                    message: "Your account has been created.",
                    user,
                    token
                });
            } else {
                return res.status(401).send({message: 'Please provide correct details.'});
            }
        }
    } catch (error) {
        res.send({error: error?.errmsg});
    }
});

routerAccount.post('/forgot-password', async (req, res) => {

    const { email } = req?.body;

    try {
        const userInfo = await AccountCreation.findOne({ email });
        const otp = Math.floor(100000 + Math.random() * 900000);
        if(userInfo) {
            await AccountCreation.findOneAndUpdate(
                { email },
                { forgot_password: otp }
            );
            await transporter.sendMail({
                from: '"Admin portal application" <ashuarena@gmail.com>',
                to: email,
                subject: 'Admin-Portal-App: Forgot password code',
                text: `Your reset password code is ${otp}`
            });
        return res
            .status(200)
            .json({
                isForgotPasswordOtp: true,
                message: "Please check your mail to get OTP.",
            });
        }
        return res
            .status(400)
            .json({
                message: "User not found. Please register first."
            });
    } catch (error) {
        return res
            .status(403)
            .json({error: error?.errmsg});
    }
})


routerAccount.post('/reset-password', async (req, res) => {

    const { password, email } = req?.body.userInfo;

    try {
        const userInfo = await AccountCreation.findOne({ email });
        if(userInfo) {
            await AccountCreation.findOneAndUpdate(
                { email },
                { password: bcrypt.hashSync(password, 10), forgot_password: null }
            );
            return res
                .status(200)
                .json({
                    isNewPasswordSet: true,
                    message: "Please login with your new credential.",
                });
            }
    } catch (error) {
        return res
            .status(403)
            .json({error: error?.errmsg});
    }
})

routerAccount.get('/user-info', verifyToken, async (req, res) => {

    const tokenData = req.user;
    const { email } = tokenData;

    try {
        const userInfo = await AccountCreation.findOne({ email });

        return res
            .status(200)
            .json({
                user: userInfo,
                isProfileFetched: true
            });
    } catch (error) {
        return res
            .status(403)
            .json({error: error?.errmsg});
    }
})

module.exports = { routerAccount };

