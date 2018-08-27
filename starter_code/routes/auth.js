const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

/* Sign-up*/

router.get("/sign-up", (req, res, next) => {
    res.render("sign-up");
});

router.post("/sign-up", (req, res, next) => {
    const { email, password } = req.body;

    User.findOne({ email }).then(user => {
        if (!user) {
            const encrypted = bcrypt.hashSync(password, 10);
            new User({ email, password: encrypted }).save().then(result => {
                res.send("User account was created");
            });
        } else {
            res.render("sign-up", { error: "User already registed" });
        }
    });
});

router.get("/sign-in", (req, res, next) => {
    res.render("sign-in");
});

router.post("/sign-in", (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email }).then(user => {
        if (!user) return res.render("sign-in", { error: "No such user" });
        const passwordsMatch = bcrypt.compareSync(password, user.password);
        if (!passwordsMatch) return res.render("sign-in", { error: "Wrong password" });

        // don't save password, here! => SECURITY ISSUE!

        const cleanUser = user.toObject();
        delete cleanUser.password;
        // Save the login in the session!
        req.session.currentUser = cleanUser;

        res.render("index", { signedin: true });
    });
});

module.exports = router;
