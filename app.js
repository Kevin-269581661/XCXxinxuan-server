//1:加载模块 express pool
const express = require("express");
const pool = require("./pool");
//2:创建express对象
var app = express();
//2.1:加载跨域访问组件
const cors = require("cors");
//2.2:配置允许脚手架访问程序
app.use(cors({
    origin:["http://127.0.0.1:3001",
    "http://localhost:3001"],
    credentials:true
}));
// 加载第三方模块 express-session
const session = require("express-session")
//7.2:对模块配置   
app.use(session({
  secret:"128位随机字符",    //安全字符串
  resave:false,             //请求保存
  saveUninitialized:true,   //初始化保存
  cookie:{
    maxAge:1000 * 60 * 60 * 24 
  }
}));
//引入上传头像模块
const fs = require("fs");
const multer = require("multer");

//3:指定监听端口3000
app.listen(3030);
//4:指定静态目录 public
// __dirname 当前程序所属目录绝对路径 
//app.js vue_app_server
app.use(express.static(__dirname+"/public"))
//指定上传文件目录
var upload = multer({dest:"public/upload/"});

//上传头像功能
//一次上传单张图片 name=mypic
app.post("/upload",upload.single("mypic"),
  (req,res)=>{
    //获取上传文件大小 拒接超过2M文件
    var size = req.file.size/1000/1000;
    if(size>2){
      res.send({code:-1,msg:"上传图片过大，超过2MB"});
      return
    }
    //获取上传文件类型 --必须为图片
    var type = req.file.mimetype;
    var i = type.indexOf("image");
    if(i == -1){
      res.send({code:-2,msg:"上传的只能是图片"});
      return
    }
    //穿件新文件名
    var src = req.file.originalname;
    var fTime = new Date().getTime();
    var fRand = Math.floor(Math.random()*9999);
    var i3 = src.lastIndexOf(".");
    var suff = src.substring(i3,src.length);
    var des = "./public/upload/"+fTime+fRand+suff;
    console.log(des);
    //将临时文件移动到upload目录下
    fs.renameSync(req.file.path,des);
    //将新的图片信息保存数据库
    //返回上传成功信息
    res.send({code:1,msg:"图片上传成功"})
  }
)

//功能一:首页轮播图
app.get("/bannerlist",(req,res)=>{
  var sql = "SELECT * FROM xx_banner";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result);
  })
});

//功能二：首页九宫格
app.get("/sortlist",(req,res)=>{
  var sql = "SELECT * FROM xx_gongge";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result);
  })
});

//功能三：首页楼层展示
app.get("/floorlist",(req,res)=>{
  var  hotList = 
  [
    {
      hotTitle:"热门回购",
      hotImgUrl:"http://127.0.0.1:3030/img/floor/hot01.jpg",
      hotItem:[
        { id: 1, img_url:"http://127.0.0.1:3030/img/products/product01.png", mark: ["销量最佳"], info: "5件装 30包 古风一木四件套囤货清仓", price: "75" },
        { id: 2, img_url:"http://127.0.0.1:3030/img/products/product02.png", mark: ["圣诞特惠", "优选"], info: "5件装 30包 古风一木四件套囤货清仓", price: "25" },
        { id: 3, img_url:"http://127.0.0.1:3030/img/products/product03.png", mark: [], info: "5件装 30包 古风一木四件套囤货清仓", price: "10" },
        { id: 4, img_url: "http://127.0.0.1:3030/img/products/product04.png", mark: ["圣诞特惠", "优选"], info: "5件装 30包 古风一木四件套囤货清仓", price: "102" },
        { id: 5, img_url: "http://127.0.0.1:3030/img/products/product05.png", mark: ["销量最佳"], info: "5件装 30包 古风一木四件套囤货清仓", price: "66" },
        { id: 6, img_url: "http://127.0.0.1:3030/img/products/product06.png", mark: [], info: "5件装 30包 古风一木四件套囤货清仓", price: "68" }
      ]
    },
    {
      hotTitle: "优选新品",
      hotImgUrl: "http://127.0.0.1:3030/img/floor/hot02.jpg",
      hotItem: [
        { id: 1, img_url: "http://127.0.0.1:3030/img/products/product01.png", mark: ["圣诞特惠", "优选"], info: "5件装 30包 古风一木四件套囤货清仓", price: "75" },
        { id: 2, img_url: "http://127.0.0.1:3030/img/products/product02.png", mark: [], info: "5件装 30包 古风一木四件套囤货清仓", price: "25" },
        { id: 3, img_url:"http://127.0.0.1:3030/img/products/product03.png", mark: ["销量最佳"], info: "5件装 30包 古风一木四件套囤货清仓", price: "10" },
        { id: 4, img_url: "http://127.0.0.1:3030/img/products/product04.png", mark: ["圣诞特惠", "优选"], info: "5件装 30包 古风一木四件套囤货清仓", price: "102" },
        { id: 5, img_url: "http://127.0.0.1:3030/img/products/product05.png", mark: [], info: "5件装 30包 古风一木四件套囤货清仓", price: "66" },
        { id: 6, img_url: "http://127.0.0.1:3030/img/products/product07.png", mark: ["销量最佳"], info: "5件装 30包 古风一木四件套囤货清仓", price: "68" }
      ]
    }
  ];
  res.send(hotList)
})

//功能四:首页商品推荐分页显示
app.get("/showlist",(req,res)=>{
  //1:获取参数
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  //2:设置默认值 
  if(!pno){pno = 1}
  if(!pageSize){pageSize=6}
  var progress = 0;
  var obj = {code:1};
  //5:创建sql1 查询总记录数 
  var sql = "SELECT count(id) AS c FROM xx_show";
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    var pageCount = Math.ceil(result[0].c/pageSize);
    progress+=50;
    obj.pageCount = pageCount;
    if(progress==100){
      res.send(obj);
    }
  });
  //创建sql2 查询当前页内容 
  var sql =" SELECT id,title,img_url,mark,newPrice,oldPrice,des,color,pid";
    sql+=" FROM xx_show";
    sql+=" LIMIT ?,?";
  var offset = parseInt((pno-1)*pageSize);
    pageSize = parseInt(pageSize);
  pool.query(sql,[offset,pageSize],(err,result)=>{
    if(err)throw err;
   //把查询结果中的标签字符串用|切割成数组
    for(var item of result){
      var mark = [];
      //console.log(item.mark)
      if(item.mark.indexOf("|")==-1){
        mark.push(item.mark);
      }else{
        mark=item.mark.split("|");
      }
      item.mark=mark;
    }
    progress+=50;
    obj.data=result;
    if(progress==100){
      res.send(obj);
    }
  })
 //7:返回结果
});  

//功能五：分类页左侧标题
app.get("/leftlist",(req,res)=>{
  var sql = "SELECT id,title,sid FROM xx_sorts";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result)
  })
})

//功能六：分类页右侧模块
app.get("/rightlist",(req,res)=>{
  var id = req.query.id;
  var obj1 = {
    id:1,
    goodImgUrl: "http://127.0.0.1:3030/img/sort/sort01.png",
    goodsSort:[
      {
        sortTitle: "床品",
        goods: [
          { id: 1, imgUrl: "http://127.0.0.1:3030/img/sort/goods06.png", title: "床品件套" },
          { id: 2, imgUrl: "http://127.0.0.1:3030/img/sort/goods06.png", title: "床品件套" },
          { id: 3, imgUrl: "http://127.0.0.1:3030/img/sort/goods06.png", title: "被子" },
          { id: 4, imgUrl: "http://127.0.0.1:3030/img/sort/goods06.png", title: "床品件套" },
          { id: 5, imgUrl: "http://127.0.0.1:3030/img/sort/goods06.png", title: "枕头" },
          { id: 6, imgUrl: "http://127.0.0.1:3030/img/sort/goods06.png", title: "床品件套" },
          { id: 7, imgUrl: "http://127.0.0.1:3030/img/sort/goods06.png", title: "床品件套" }
        ]},
      {
        sortTitle: "家具家装",
        goods: [
          { id: 1, imgUrl: "http://127.0.0.1:3030/img/sort/goods07.png", title: "布艺软装" },
          { id: 2, imgUrl: "http://127.0.0.1:3030/img/sort/goods07.png", title: "布艺软装" },
          { id: 3, imgUrl: "http://127.0.0.1:3030/img/sort/goods07.png", title: "家具" },
          { id: 4, imgUrl: "http://127.0.0.1:3030/img/sort/goods07.png", title: "布艺软装" },
          { id: 5, imgUrl: "http://127.0.0.1:3030/img/sort/goods07.png", title: "布艺软装" },
          { id: 6, imgUrl: "http://127.0.0.1:3030/img/sort/goods07.png", title: "布艺软装" },
          { id: 7, imgUrl: "http://127.0.0.1:3030/img/sort/goods07.png", title: "布艺软装" }
        ]
      }
    ]
  };
  var obj2 = {
    id:2,
    goodImgUrl: "http://127.0.0.1:3030/img/sort/sort02.png",
    goodsSort:[
      {
        sortTitle: "男装",
        goods: [
          { id: 1, imgUrl: "http://127.0.0.1:3030/img/sort/goods01.png", title: "冬季外套" },
          { id: 2, imgUrl: "http://127.0.0.1:3030/img/sort/goods03.png", title: "冬季裤子" },
          { id: 3, imgUrl: "http://127.0.0.1:3030/img/sort/goods01.png", title: "冬季外套" },
          { id: 4, imgUrl: "http://127.0.0.1:3030/img/sort/goods02.png", title: "毛衣" },
          { id: 5, imgUrl: "http://127.0.0.1:3030/img/sort/goods01.png", title: "冬季外套" },
          { id: 6, imgUrl: "http://127.0.0.1:3030/img/sort/goods01.png", title: "冬季外套" },
          { id: 7, imgUrl: "http://127.0.0.1:3030/img/sort/goods01.png", title: "冬季外套" }
        ]},
      {
        sortTitle: "女装",
        goods: [
          { id: 1, imgUrl: "http://127.0.0.1:3030/img/sort/goods05.png", title: "裙子" },
          { id: 2, imgUrl: "http://127.0.0.1:3030/img/sort/goods05.png", title: "冬季外套" },
          { id: 3, imgUrl: "http://127.0.0.1:3030/img/sort/goods04.png", title: "牛仔裤" },
          { id: 4, imgUrl: "http://127.0.0.1:3030/img/sort/goods05.png", title: "冬季外套" },
          { id: 5, imgUrl: "http://127.0.0.1:3030/img/sort/goods05.png", title: "冬季外套" },
          { id: 6, imgUrl: "http://127.0.0.1:3030/img/sort/goods05.png", title: "冬季外套" },
          { id: 7, imgUrl: "http://127.0.0.1:3030/img/sort/goods05.png", title: "冬季外套" }
        ]
      }
    ]
  };
  if(id%2){
    res.send(obj1)
  }else{
    res.send(obj2)
  }
})


//功能:查找一条商品详细信息
app.get("/productdetail",(req,res)=>{
  //1:参数 id 
  var id = req.query.id;
  var product1 = {
    id:1,
    // 头部轮播图列表
    bannerList: [
      {id: 1, img_url: "http://127.0.0.1:3030/img/details/product-detail-banner04.jpg"},
      {id: 2, img_url: "http://127.0.0.1:3030/img/details/product-detail-banner03.jpg" },
      {id: 3, img_url: "http://127.0.0.1:3030/img/details/product-detail-banner02.jpg" },
      {id: 4, img_url: "http://127.0.0.1:3030/img/details/product-detail-banner01.jpg" }
    ],
    title:"2双经典好袜子",
    subtitle:"经典好袜子啊经典好袜子啊经典好袜子啊经典好袜子啊经典好袜子啊经典好袜子啊",
    newPrice:59,
    oldPrice:99,
    mark:["全场满减"],
    img_url:"http://127.0.0.1:3030/img/products/product01.png",
    selectSize:[
      { id: 1, size: "黑色（3双装）"},
      { id: 2, size: "白色（3双装）" },
      { id: 3, size: "蓝色（3双装）" },
      { id: 4, size: "淡蓝色（3双装）" },
      { id: 5, size: "咖啡色（3双装）" },
      { id: 6, size: "黑色（3双装）" },
      { id: 7, size: "黑色（3双装）" },
      { id: 8, size: "黑色（3双装）" },
      { id: 9, size: "黑色（3双装）" }
    ]
  };
  var product2 = {
    id:2,
    // 头部轮播图列表
    bannerList: [
      {id: 1, img_url: "http://127.0.0.1:3030/img/details/product02-detail01.png"},
      {id: 2, img_url: "http://127.0.0.1:3030/img/details/product02-detail02.jpg" }
    ],
    title:"家用按摩器",
    subtitle:"质量灰常好，按摩超舒服，东西实惠",
    newPrice:169,
    oldPrice:256,
    mark:["全场满减","圣诞特惠","打八折"],
    img_url:"http://127.0.0.1:3030/img/products/product03.png",
    selectSize:[
      { id: 1, size: "黑色（家用装）"},
      { id: 2, size: "白色（豪华装）" },
      { id: 3, size: "蓝色（简约装）" },
      { id: 4, size: "淡蓝色（实惠装）" },
      { id: 5, size: "咖啡色（家用装）" },
      { id: 6, size: "黑色（家用装）" },
      { id: 7, size: "黑色（家用装）" },
      { id: 8, size: "黑色（家用装）" },
      { id: 9, size: "黑色（家用装）" }
    ]
  }
  if(id%2){
    res.send(product1)
  }else{
    res.send(product2)
  }  
});


//功能四:分页查找指定新闻下评论列表
app.get("/getcomment",(req,res)=>{
 //1:获取参数
 var pno = req.query.pno;  //页码
 var pageSize = req.query.pageSize;//页大小
 var nid = req.query.nid; //新闻id
 //2:设置默认值 1 7
 if(!pno){pno = 1}
 if(!pageSize){pageSize=7}
 //3:创建正则表达式验证用户输入验证
 var reg = /^[0-9]{1,3}$/;
 //4:如果错出停止函数运行
 if(!reg.test(pno)){
    res.send({code:-1,msg:"页编格式不正确"});
    return;
 }
 if(!reg.test(pageSize)){
    res.send({code:-2,msg:"页大小格式不正确"});
    return;
 }
 var progress = 0;
 var obj = {code:1};
 obj.uname = req.session.uname;
 //11:49
 //5:创建sql1 查询总记录数   严格区分大小写
 var sql = "SELECT count(id) AS c FROM xz_comment WHERE nid = ?";
 nid = parseInt(nid);
 pool.query(sql,[nid],(err,result)=>{
   if(err)throw err;
   var pageCount = Math.ceil(result[0].c/pageSize);
   progress+=50;
   obj.pageCount = pageCount;
   if(progress==100){
     res.send(obj);
   }
 });
 //6:创建sql2 查询当前页内容 严格区分大小写
 var sql =" SELECT id,user_name,ctime,";
     sql+=" content";
     sql+=" FROM xz_comment";
     sql+=" WHERE nid = ?";
     sql+=" ORDER BY id DESC";
     sql+=" LIMIT ?,?";
 var offset = parseInt((pno-1)*pageSize);
     pageSize = parseInt(pageSize);
 pool.query(sql,[nid,offset,pageSize],(err,result)=>{
   if(err)throw err;
   progress+=50;
   obj.data=result;
   if(progress==100){
     res.send(obj);
   }
 })
});

//功能五:发表评论
//引入第三方模块:bodyParser 处理post请求
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended:false
}));
app.post("/addComment",(req,res)=>{
  //1:获取3个参数
  //需要第三方模块支持 bodyParser
  var nid = req.body.nid;
  var content = req.body.content;
  var user_name = req.session.uname;
  //2:创建sql语句
  var sql  =" INSERT INTO `xz_comment`(`id`,";
      sql +=" `nid`, `user_name`, `ctime`,";
      sql +=" `content`) VALUES";
      sql +=" (null,?,?,now(),?)";
  nid = parseInt(nid);
  pool.query(sql,[nid,user_name,content],(err,result)=>{
       if(err)throw err;
       res.send({code:1,msg:"评论发表成功"});
  });
  //3:返回添加结果
})


//功能六:查询商品列表
app.get("/goodsList",(req,res)=>{
  var obj = [];
  obj.push({id:1,title:"小辣椒",old:1999,now:99,img_url:"http://127.0.0.1:3000/img/banner1.png"});
  obj.push({id:2,title:"中辣椒",old:2999,now:99,img_url:"http://127.0.0.1:3000/img/banner2.png"});
  obj.push({id:3,title:"大辣椒",old:3999,now:99,img_url:"http://127.0.0.1:3000/img/banner3.png"});
  res.send(obj);

});


//功能七:用户登录
app.get("/login",(req,res)=>{
   //1:获取参数 uname,upwd
   var uname = req.query.uname;
   var upwd = req.query.upwd;
   //2:创建正则表达式验证
   //3:创建sql
   var sql = "SELECT count(id) as c";
   sql +=" FROM xz_login";
   sql +=" WHERE uname = ? AND upwd = md5(?)";
   pool.query(sql,[uname,upwd],(err,result)=>{
    if(err)throw err;
    var obj = result[0].c;
    if(obj == 1){
     //7.3:将用户名保存session对象中
     req.session.uname = uname;
     res.send({code:1,msg:"登录成功"});
    }else{
     res.send({code:-1,msg:"用户名或密码有误"}) 
     }  
   });
   //4:返回结果
})

//功能八:加入购物车
app.get("/addCart",(req,res)=>{
  var uid = req.query.uid;
  var pid = req.query.pid;
  var c = req.query.count;
  var sql  =" INSERT INTO `xz_shoppingcart_item`(`iid`, `user_id`, `product_id`, `count`, `is_checked`) VALUES (null,?,?,?,0)"
  pool.query(sql,[uid,pid,c],(err,result)=>{
       if(err)throw err;
       res.send({code:1,msg:"购物车添加成功"});
  });
})

//功能九:查询购物详细信息
app.get("/getCarts",(req,res)=>{
  var uid = req.query.uid;
  var sql =" SELECT c.iid,c.user_id,c.count";
  sql +=" ,p.price,p.lname";
  sql +=" FROM xz_laptop p,";
  sql +=" xz_shoppingcart_item c";
  sql +=" WHERE p.lid = c.product_id";
  sql +=" AND c.user_id = ?";
  uid = parseInt(uid);
  pool.query(sql,[uid],(err,result)=>{
   if(err)throw err;
   res.send({code:1,data:result});
  });
  //4:返回结果
})

//功能十:更新购物数量
app.get("/updateCart",(req,res)=>{
   //1:参数 iid/count
   var iid = req.query.iid;
   var count = req.query.count;
   var sql = " UPDATE xz_shoppingcart_item";
   sql += " SET count = ? WHERE iid = ?";
   iid = parseInt(iid);
   count = parseInt(count);
   pool.query(sql,[count,iid],(err,result)=>{
        if(err)throw err;
        if(result.affectedRows > 0){
         res.send({code:1,msg:"数量修改成功"});
        }else{
         res.send({code:-1,msg:"数量修改失败"});
        }
   })
})

//功能十一:搜索商品
app.get("/search",(req,res)=>{
   //如果搜索参数太多
   //var color = req.query.color;
   //var are = req.query.are;
   //var sql = "SELECT ....";
   //if(color != undefined){
   //sql += "AND color="+color;
   //}
   //if(are != undefined){
   //  sql+"AND are = "+color
   //}


   //商品名称关键字
   var keyword = req.query.keyword;
   var low = req.query.low;
   var high = req.query.high;
   var sql = " SELECT lid,lname,price";
   sql +=" FROM xz_laptop";
   sql +=" WHERE lname LIKE ?";
   sql +=" AND price >= ?";
   sql +=" AND price <= ?";
   low = parseFloat(low);
   high = parseFloat(high);
   pool.query(sql,[`%${keyword}%`,low,high],(err,result)=>{
       if(err)throw err;
       if(result.length == 0){
         res.send({code:-1,msg:"您搜索商品不存在噢!"});
       }else{
         res.send({code:1,data:result})
       }
   });
})