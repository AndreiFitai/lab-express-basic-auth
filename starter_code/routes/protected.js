const express = require("express");
const router = express.Router();

function authorizeMiddleware(req, res, next) {
    if (!req.session.currentUser) res.send("You should not be here");
    else next();
}
router.use(authorizeMiddleware);

router.get("/main", (req, res, next) => {
    if (!req.session.currentUser) res.send("YOU should not be here");

    res.render("main",);
});

router.get("/private", (req, res, next) => {
    if (!req.session.currentUser) res.send("YOU should not be here");

    res.render("private");
});

module.exports = router;
