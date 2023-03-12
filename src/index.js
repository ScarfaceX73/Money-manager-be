const express = require("express");
const mongo = require("./connect");
const incomeRouter = require("./router/income");
const expenseRouter = require("./router/expense");
const dotenv = require("dotenv");
const { verifyUser } = require("./utils/firebase");

dotenv.config();
const app = express();
// to parse req.body, to send from client to express framework we are using this middleware
app.use(express.json());

mongo.connect();

app.use((req, res, next) => {
  console.log(req?.method);
  let allowedOrigin = ["http://localhost:3000", "https://main--prismatic-sunflower-f951cc.netlify.app"];
  if (allowedOrigin.indexOf(req.headers.origin) != -1) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Set-Cookie, authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
  }
  next();
});

app.use(async (req, res, next) => {
  const userIdToken = req?.headers?.authorization;
  const isReqMethodOptions = req?.method === "OPTIONS";
  if (isReqMethodOptions) {
    next();
  } else {
    if (!userIdToken) {
      res.status(404).json({ error: "Not authenticated user" });
    } else {
      const userDetails = await verifyUser(req);
      if (userDetails) {
        next();
      } else {
        res.status(404).json({ error: "Not authenticated user" });
      }
    }
  }
});

app.use("/income", incomeRouter);
app.use("/expense", expenseRouter);

app.listen(process.env.PORT || 5000, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
