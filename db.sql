#小程序-心选小铺数据库xx
#创建数据库xz
SET NAMES UTF8;
DROP DATABASE IF EXISTS xx;
CREATE DATABASE xx CHARSET=UTF8;
#进入库  xx
USE xx;
#01. 轮播图表： xx_banner
CREATE TABLE xx_banner(
  id INT PRIMARY KEY AUTO_INCREMENT,
  img_url VARCHAR(255) COMMENT "轮播图url",
  pid INT COMMENT "对应商品编号"
);
INSERT INTO xx_banner VALUES
(null,"http://127.0.0.1:3030/img/banner/banner01.jpg",1),
(null,"http://127.0.0.1:3030/img/banner/banner02.jpg",2),
(null,"http://127.0.0.1:3030/img/banner/banner03.jpg",3),
(null,"http://127.0.0.1:3030/img/banner/banner04.jpg",4)

#02. 首页九宫格表： xx_gongge
CREATE TABLE xx_gongge(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(10) COMMENT "类名",
  img_url VARCHAR(255) COMMENT "图标的url",
  sid INT COMMENT "对应商品类别编号"
);
INSERT INTO xx_gongge VALUES
(null,"居家","http://127.0.0.1:3030/img/gongge/icon01.png",1),
(null,"鞋包配饰","http://127.0.0.1:3030/img/gongge/icon02.png",2),
(null,"服饰","http://127.0.0.1:3030/img/gongge/icon03.png",3),
(null,"电器","http://127.0.0.1:3030/img/gongge/icon04.png",4),
(null,"婴童","http://127.0.0.1:3030/img/gongge/icon05.png",5),
(null,"饮食","http://127.0.0.1:3030/img/gongge/icon06.png",6),
(null,"洗护","http://127.0.0.1:3030/img/gongge/icon07.png",7),
(null,"餐厨","http://127.0.0.1:3030/img/gongge/icon08.png",8),
(null,"文体","http://127.0.0.1:3030/img/gongge/icon09.png",9),
(null,"特色区","http://127.0.0.1:3030/img/gongge/icon10.png",10)

#03.首页楼层展示表： xx_floor
CREATE TABLE xx_floor(
  id INT PRIMARY KEY AUTO_INCREMENT,
  hotTitle VARCHAR(10) COMMENT "楼层左侧名称",
  hotImgUrl VARCHAR(255) COMMENT "楼层图的url",
  hotItemId INT COMMENT "商品滚动列表id"
);
INSERT INTO xx_gongge VALUES
(null,"热门推荐","http://127.0.0.1:3030/img/floor/hot01.jpg",1)
(null,"优选好货","http://127.0.0.1:3030/img/floor/hot02.jpg",2)

#04.首页楼层展示表=> 商品滚动列表：xx_hot
CREATE TABLE xx_hot(
  id INT PRIMARY KEY AUTO_INCREMENT,
  info VARCHAR(20) COMMENT "商品的介绍",
  img_url VARCHAR(255) COMMENT "商品图的url",
  mark VARCHAR(20) COMMENT "促销标签",
  price DECIMAL(10,2) COMMENT "价格",
  pid INT COMMENT "对应商品编号"
);
INSERT INTO xx_hot VALUES
(null,"美的智造T300无线吸尘器","http://127.0.0.1:3030/img/products/product01.png","家电特惠",15,1),
(null,"美国制造 除甲醛空气净化剂227g","http://127.0.0.1:3030/img/products/product02.png","家电特惠",15,2),
(null,"5件装 30包 古风一木四件套囤货清仓","http://127.0.0.1:3030/img/products/product03.png","家电特惠",15,3),
(null,"美的智造T300无线吸尘器","http://127.0.0.1:3030/img/products/product04.png","家电特惠",15,4),
(null,"美的智造T300无线吸尘器","http://127.0.0.1:3030/img/products/product05.png","家电特惠",15,5),
(null,"美的智造T300无线吸尘器","http://127.0.0.1:3030/img/products/product06.png","家电特惠",15,6)

#05首页商品推荐列表：xx_show
CREATE TABLE xx_show(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(50) COMMENT "商品名称",
  img_url VARCHAR(255) COMMENT "商品图的url",
  mark VARCHAR(20) COMMENT "促销标签",
  newPrice DECIMAL(10,2) COMMENT "现价",
  oldPrice DECIMAL(10,2) COMMENT "旧价",
  des VARCHAR(20) COMMENT "商品介绍",
  color VARCHAR(10) COMMENT "商品的颜色种类",
  pid INT COMMENT "对应商品编号"
);
INSERT INTO xx_show VALUES
(null,"冬季特暖棉绒袜","http://127.0.0.1:3030/img/products/product01.png","圣诞特惠",12,52,"保暖，舒适，质量好",8,1),
(null,"冬季特暖棉棉被","http://127.0.0.1:3030/img/products/product02.png","打折",56,92,"保暖，舒适，质量好",8,2),
(null,"家用按摩器","http://127.0.0.1:3030/img/products/product03.png","好货",92,152,"保暖，舒适，质量好",8,3),
(null,"冬季特暖棉绒袜1","http://127.0.0.1:3030/img/products/product04.png","圣诞特惠",12,52,"保暖，舒适，质量好",8,4),
(null,"冬季特暖棉绒袜2","http://127.0.0.1:3030/img/products/product05.png","圣诞特惠",12,52,"保暖，舒适，质量好",8,5),
(null,"冬季特暖棉绒袜3","http://127.0.0.1:3030/img/products/product06.png","圣诞特惠",12,52,"保暖，舒适，质量好",8,6),
(null,"冬季特暖棉绒袜4","http://127.0.0.1:3030/img/products/product07.png","圣诞特惠",12,52,"保暖，舒适，质量好",8,7),
(null,"冬季特暖棉绒袜5","http://127.0.0.1:3030/img/products/product01.png","圣诞特惠",12,52,"保暖，舒适，质量好",8,8),
(null,"冬季特暖棉绒袜6","http://127.0.0.1:3030/img/products/product02.png","圣诞特惠",12,52,"保暖，舒适，质量好",8,9),
(null,"冬季特暖棉绒袜7","http://127.0.0.1:3030/img/products/product03.png","圣诞特惠",12,52,"保暖，舒适，质量好",8,10),
(null,"冬季特暖棉绒袜8","http://127.0.0.1:3030/img/products/product04.png","圣诞特惠",12,52,"保暖，舒适，质量好",8,11),
(null,"冬季特暖棉绒袜9","http://127.0.0.1:3030/img/products/product05.png","圣诞特惠",12,52,"保暖，舒适，质量好",8,12),
(null,"冬季特暖棉绒袜10","http://127.0.0.1:3030/img/products/product06.png","圣诞特惠",12,52,"保暖，舒适，质量好",8,13)

#06分类页-商品类名表：xx_sorts
CREATE TABLE xx_sorts(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(50) COMMENT "类名称",
  stable VARCHAR(50) COMMENT "对应商品类别的表名"
);
INSERT INTO xx_sorts VALUES
(null,"冬季专区","pSort1"),
(null,"鞋包配饰","pSort2"),
(null,"服装","pSort3"),
(null,"电器","pSort4"),
(null,"洗护","pSort5"),
(null,"饮食","pSort6"),
(null,"餐厨","pSort7"),
(null,"婴童","pSort8"),
(null,"文体","pSort9"),
(null,"鞋包配饰","pSort10"),
(null,"冬季专区","pSort11"),
(null,"冬季专区","pSort12"),
(null,"冬季专区","pSort13"),
(null,"冬季专区","pSort14")

#07"冬季专区",pSort1 表：
CREATE TABLE xx_sorts(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(50) COMMENT "类名称",
  table VARCHAR(50) COMMENT "对应商品类别的表名"
);





#05商品表：xx_products
CREATE TABLE xx_hot(
  id INT PRIMARY KEY AUTO_INCREMENT,
  info VARCHAR(20) COMMENT "商品的介绍",
  img_url VARCHAR(255) COMMENT "商品图的url",
  mark VARCHAR(20) COMMENT "促销标签",
  price DECIMAL(10,2) COMMENT "价格",

);


CREATE TABLE xx_banner(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(50)  ,
  ctime DATETIME,
  point INT,
  img_url VARCHAR(255) COMMENT "轮播图url",
  content VARCHAR(255) 
);
INSERT INTO xz_news VALUES(1,'123',now(),0,
"http://127.0.0.1:3000/img/1.jpg","..");
INSERT INTO xz_news VALUES(2,'124',now(),0,
"http://127.0.0.1:3000/img/1.jpg","..");
INSERT INTO xz_news VALUES(3,'1233',now(),0,
"http://127.0.0.1:3000/img/1.jpg","..");
INSERT INTO xz_news VALUES(4,'124',now(),0,
"http://127.0.0.1:3000/img/1.jpg","..");
INSERT INTO xz_news VALUES(5,'125',now(),0,
"http://127.0.0.1:3000/img/1.jpg","..");
INSERT INTO xz_news VALUES(6,'126',now(),0,
"http://127.0.0.1:3000/img/1.jpg","..");
INSERT INTO xz_news VALUES(7,'127',now(),0,
"http://127.0.0.1:3000/img/1.jpg","..");
INSERT INTO xz_news VALUES(8,'128',now(),0,
"http://127.0.0.1:3000/img/1.jpg","..");
INSERT INTO xz_news VALUES(9,'129',now(),0,
"http://127.0.0.1:3000/img/1.jpg","..");
INSERT INTO xz_news VALUES(11,'1231',now(),0,
"http://127.0.0.1:3000/img/1.jpg","..");
INSERT INTO xz_news VALUES(12,'1232',now(),0,
"http://127.0.0.1:3000/img/1.jpg","..");
INSERT INTO xz_news VALUES(13,'1233',now(),0,
"http://127.0.0.1:3000/img/1.jpg","..");
INSERT INTO xz_news VALUES(14,'1234',now(),0,
"http://127.0.0.1:3000/img/1.jpg","..");
INSERT INTO xz_news VALUES(15,'1235',now(),0,
"http://127.0.0.1:3000/img/1.jpg","..");
INSERT INTO xz_news VALUES(16,'1236',now(),0,
"http://127.0.0.1:3000/img/1.jpg","..");
INSERT INTO xz_news VALUES(17,'1237',now(),0,
"http://127.0.0.1:3000/img/1.jpg","..");
INSERT INTO xz_news VALUES(18,'1238',now(),0,
"http://127.0.0.1:3000/img/1.jpg","..");
INSERT INTO xz_news VALUES(19,'1239',now(),0,
"http://127.0.0.1:3000/img/1.jpg","..");
INSERT INTO xz_news VALUES(21,'12322',now(),0,
"http://127.0.0.1:3000/img/1.jpg","..");
INSERT INTO xz_news VALUES(22,'12322',now(),0,
"http://127.0.0.1:3000/img/1.jpg","..");

#货币 小数计算误差
#价格 购物车合计 
#double DECIMAL(10,2)
#严格   将货币转换分单位  1.99 -> 199
#显示  1.99
#3:添加20条记录
#4:查询

#1:创建评论表 39
#   表名 几列 列名
#   xz_comment
#   id        INT        评论编号
#   nid       INT        评论所属新闻编号
#   user_name VARCHAR(25)评论人名称
#   ctime     DATETIME   时间
#   content   VARCHAR(120)内容

USE xz;
CREATE TABLE xz_comment(
  id INT PRIMARY KEY AUTO_INCREMENT,
  nid INT,
  user_name VARCHAR(25),
  ctime DATETIME,
  content VARCHAR(120)
);
#2:添加15条
INSERT INTO xz_comment VALUES(null,1,'dd',now(),'111');
INSERT INTO xz_comment VALUES(null,1,'dd',now(),'112');
INSERT INTO xz_comment VALUES(null,1,'dd',now(),'113');
INSERT INTO xz_comment VALUES(null,1,'dd',now(),'114');
INSERT INTO xz_comment VALUES(null,1,'dd',now(),'115');
INSERT INTO xz_comment VALUES(null,1,'dd',now(),'116');
INSERT INTO xz_comment VALUES(null,1,'dd',now(),'117');
INSERT INTO xz_comment VALUES(null,1,'dd',now(),'118');
INSERT INTO xz_comment VALUES(null,1,'dd',now(),'119');
INSERT INTO xz_comment VALUES(null,1,'dd',now(),'1110');
INSERT INTO xz_comment VALUES(null,1,'dd',now(),'1111');
INSERT INTO xz_comment VALUES(null,1,'dd',now(),'1112');
INSERT INTO xz_comment VALUES(null,1,'dd',now(),'1113');
INSERT INTO xz_comment VALUES(null,1,'dd',now(),'1114');
INSERT INTO xz_comment VALUES(null,1,'dd',now(),'1115');
INSERT INTO xz_comment VALUES(null,1,'dd',now(),'1116');

CREATE TABLE xz_login(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(25) NOT NULL DEFAULT '',
  upwd  VARCHAR(32) NOT NULL DEFAULT ''
);
INSERT INTO xz_login VALUES(null,'dd',md5('123'));
INSERT INTO xz_login VALUES(null,'tom',md5('123'));
INSERT INTO xz_login VALUES(null,'jerry',md5('123'));



