const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const MongoClient = require("mongodb").MongoClient;
app.set("view engine", "ejs");
var db;
MongoClient.connect(
  "mongodb+srv://sun1238799:12w12w12w@cluster0.uk7d0.mongodb.net/Todoapp?retryWrites=true&w=majority",
  function (에러, client) {
    if (에러) return console.log(에러);

    db = client.db("Todoapp");

    db.collection("post").insertOne(
      { 이름: "john", 나이: 20, _id: 100 },
      function (에러, 결과) {
        console.log("저장완료");
      }
    );
    app.listen(8080, function () {
      console.log("listening on 8080");
    });
  }
);

app.get("/", function (요청, 응답) {
  응답.sendFile(__dirname + "/index.html");
});

app.post("/add", function (요청, 응답) {
  응답.send("전송완료");
  console.log(요청.body.date);
  console.log(요청.body.title);
  db.collection("post").insertOne(
    {
      제목: 요청.body.title,
      날짜: 요청.body.date,
    },
    function (에러, 결과) {
      console.log("저장완료");
    }
  );
});
app.get("/write", function (요청, 응답) {
  응답.sendFile(__dirname + "/write.html");
});

app.get("/list", function (요청, 응답) {
  db.collection("post")
    .find()
    .toArray(function (에러, 결과) {
      console.log(결과);
      응답.render("list.ejs", { posts: 결과 });
    });
});
