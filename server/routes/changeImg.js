const express = require("express");
const path = require("path"); //识别后缀名
const fs = require("fs"); //修改名称
const router = express.Router();


//上传图片
router.post("/upload", (req, res) => {
  const newName = req.files[0].path + path.extname(req.files[0].originalname);
  fs.rename(req.files[0].path, newName, err => {
    if (err) {
      throw err;
    }
    res.json({
      status: 0,
      name: newName,
      url: newName
    });
  });
});

//删除图片
router.post("/delete", (req, res) => {
  const { name } = req.body;
  fs.unlink(name, err => {
    if (err) {
      res.json({
        status: 1,
        msg: "找不到文件"
      });
    }
    res.json({
      status: 0,
      msg: "删除成功"
    });
  });
});

module.exports = router;
