const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotEnv = require('dotenv')
const checkAuth = require('../MiddleWare/check-auth.js');
dotEnv.config()

const User = require("../models/UserModel.js");

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = new User({ username, email, password:hashedPassword });
    await newUser.save();
res.cookie('accessToken', accessToken, {
  httpOnly: true,
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000 // 1 day
});
    return res.status(200).json({ message: "signup successful",accessToken });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});



router.get("/profile", (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    console.log("decoded",decoded);
    
    return res.json({ email: decoded.email,username: decoded.username });
  } catch (err) {
   return res.status(403).json({ message: "Invalid token" });
  }
 
});


router.post('/logout', async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (token) {
      await User.updateOne(
        { refreshTokens: token },
        { $pull: { refreshTokens: token } }
      );
    }

      res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return res.json({ message: "Logged out" });
  } catch (err) {
    console.error("logout error", err);
    return res.status(500).json({ message: "Logout failed" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    return res.status(404).json({ error: "user not found" });
  }
  let valid= await bcrypt.compare(password,findUser.password)
  try {
    if (!valid) {
      return res.status(401).json({ message: "not valid credentials" });
    }
    const accessToken = jwt.sign({userId:findUser.id,email:findUser.email,username:findUser.username,role: findUser.role },process.env.SECRETKEY,{expiresIn:"15m"})
    const refreshToken = jwt.sign({userId:findUser.id,email:findUser.email,username:findUser.username,role: findUser.role }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000 // 1 day
    });
    res.cookie('refreshToken',refreshToken,{
      httpOnly:true,
      sameSite:'strict',
      maxAge:7*24*60*60*1000 // 7 days
    })
    findUser.refreshTokens.push(refreshToken);
    await findUser.save();
    return res.status(200).json({ message: "login success",email:findUser.email,username:findUser.username,role: findUser.role });
  } catch (error) {
    return res.status(400).json({ error: "login failed"+ error.message });
  }
});

router.get('/refresh-token', async (req, res) => {
  try {
    console.log("reqeustcookies",req.cookies);
    
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    // Verify refresh token
    jwt.verify(token, process.env.REFRESH_SECRET || process.env.SECRETKEY + "_refresh", async (err, payload) => {
      if (err) return res.status(403).json({ message: "Invalid refresh token" });

      // Confirm refresh token exists in DB
      const user = await User.findById(payload.userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      if (!user.refreshTokens.includes(token)) {
        return res.status(403).json({ message: "Refresh token revoked" });
      }

      const newPayload = { userId: user._id.toString(), email: user.email, username: user.username, role: user.role };
      const newAccessToken = jwt.sign(newPayload, process.env.ACCESS_SECRET || process.env.SECRETKEY, { expiresIn: "10s" });
      const newRefreshToken = jwt.sign(newPayload, process.env.REFRESH_SECRET || process.env.SECRETKEY , { expiresIn: "7d" });

      // Replace old refresh token with the new one (rotation)
      user.refreshTokens = user.refreshTokens.filter(t => t !== token);
      user.refreshTokens.push(newRefreshToken);
      await user.save();

      // Set cookies again
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 15 * 60 * 1000
      });
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      return res.json({ message: "tokens refreshed" });
    });
  } catch (err) {
    console.error("refresh error", err);
    return res.status(500).json({ message: "Refresh failed" });
  }
});


module.exports = router;
