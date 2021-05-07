const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./Routes/users-routes");
const adminCharts = require("./Routes/admin-charts");
const questionsRoutes = require("./Routes/questions-routs");
const isCompleteRoute = require("./Routes/isComplete-route");
const raffel = require("./Routes/raffel-route");

const HttpError = require("./models/http-error");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/authenticate", userRoutes);
app.use("/admin/anyatics", adminCharts);
app.use("/surway", questionsRoutes);
app.use("/questions", isCompleteRoute);
app.use("/monthly", raffel);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

//to get rid of index warning
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

mongoose
  .connect(
    "mongodb+srv://himath:himath123456@cluster0.hmakd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(5000);
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
