import express from "express";
//this route file import controller stuff
const router = express.Router();

router.route("/")
    .get()
    .post()
    .put()
    .delete();

export default router;
