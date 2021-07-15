var express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require("./routes/routes");
var app = express();
app.use(express.json({extended: false}));


app.get('/', function (req, res) {
  res.send("Hello world!");
});

app.use(cors());
app.use("/images", express.static('images'));
app.use("/post", authRoute);

// var url = "mongodb+srv://bidwaigr:bidwaigr123@cluster0.d6op1.mongodb.net/zep?retryWrites=true&w=majority";
var url = "mongodb+srv://aniket_199:aniket.1999@todo.6is7s.mongodb.net/Zep?retryWrites=true&w=majority";
app.listen(process.env.PORT || 3000, async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
  }).then(() =>
    console.log("Connected to DB")
  ).catch(
    () =>
      console.log("SOmeTHing Error While Connecting DB")
  );
});
