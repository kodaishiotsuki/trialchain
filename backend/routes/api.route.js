const router = require("express").Router();

const {google} =require("googleapis")

const GOOGLE_CLIENT_ID = ""
const GOOGLE_CLIENT_SECRET=""
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  'http://localhost:3000'
)

router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});

router.post("/create-tokens", async (req, res, next) => {
  try {
    const { code } = req.body;
    res.send(code);
  } catch (error) {
    next(error);
  } finally {
  }
});

module.exports = router;
