/*
Navicat MySQL Data Transfer

Source Server         : 3306
Source Server Version : 50612
Source Host           : localhost:3306
Source Database       : yuk202

Target Server Type    : MYSQL
Target Server Version : 50612
File Encoding         : 65001

Date: 2019-06-03 20:40:01
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `about`
-- ----------------------------
DROP TABLE IF EXISTS `about`;
CREATE TABLE `about` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `word` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of about
-- ----------------------------
INSERT INTO `about` VALUES ('1', '所有人都知道 但所有人都不知道是谁 - 无名');
INSERT INTO `about` VALUES ('3', '浩浩乎如冯虚御风，而不知其所止；飘飘乎如遗世独立，羽化而登仙。');
INSERT INTO `about` VALUES ('4', '秋水共长天一色 落霞与孤鹜齐飞');
INSERT INTO `about` VALUES ('5', '既 非风动，亦非幡动，仁者心动耳');
INSERT INTO `about` VALUES ('6', '任何足够先进的技术都和魔法无异');
INSERT INTO `about` VALUES ('7', '岂能尽如人意 但求无愧于心');

-- ----------------------------
-- Table structure for `admin`
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` char(8) NOT NULL,
  `password` char(20) NOT NULL,
  `sign` char(255) DEFAULT '人若无名 便可专心练剑',
  `blobname` char(255) DEFAULT 'yuk202',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'yuk202', '789456321', '人若无名 便可专心练剑', 'yuk202');

-- ----------------------------
-- Table structure for `classify`
-- ----------------------------
DROP TABLE IF EXISTS `classify`;
CREATE TABLE `classify` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of classify
-- ----------------------------
INSERT INTO `classify` VALUES ('10', '前端');
INSERT INTO `classify` VALUES ('11', '杂谈');
INSERT INTO `classify` VALUES ('12', '后端');

-- ----------------------------
-- Table structure for `message`
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` tinytext NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `create_time` datetime NOT NULL,
  `page_id` int(11) DEFAULT NULL,
  `status` tinyint(4) DEFAULT '0',
  `nickname` char(11) NOT NULL,
  `e_mail` char(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`parent_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES ('2', '我是第二条同级回复 嘚瑟', null, '2019-03-14 20:49:11', null, '1', '路小果', '127@qq.com');
INSERT INTO `message` VALUES ('3', '我是第一条 关联回复', '2', '2019-03-14 20:50:10', null, '1', '橙留香', '1412@qq.com');
INSERT INTO `message` VALUES ('4', '我是第二条关联回复', '3', '2019-03-14 20:51:10', null, '1', '东方求败', '141@qq.com');
INSERT INTO `message` VALUES ('7', '你好', '2', '2019-03-25 13:23:51', null, '1', '打你猪头', '123');
INSERT INTO `message` VALUES ('19', '去去去', null, '2019-03-25 17:44:16', '1', '1', '铁头娃', '123@qq.com');
INSERT INTO `message` VALUES ('20', '我不好 谢谢', '7', '2019-03-25 17:53:09', null, '1', '我好', '123@qq.com');
INSERT INTO `message` VALUES ('21', '哈哈哈哈哈哈哈隔', '19', '2019-03-25 20:03:36', '1', '1', '愣头青', '123@qq.com');
INSERT INTO `message` VALUES ('22', '测试', null, '2019-03-26 17:18:08', null, '1', 'admin', '123@qq.com');
INSERT INTO `message` VALUES ('24', '好的 测试成功', '22', '2019-03-26 19:54:17', null, '1', 'admin', '123@qq.com');
INSERT INTO `message` VALUES ('25', '还行', null, '2019-03-27 14:02:35', '4', '1', '匿名用户1', '123@qq.com');

-- ----------------------------
-- Table structure for `page`
-- ----------------------------
DROP TABLE IF EXISTS `page`;
CREATE TABLE `page` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `content` longtext NOT NULL,
  `create_time` datetime NOT NULL,
  `tag_id` char(255) NOT NULL,
  `classify_id` tinyint(255) NOT NULL,
  `title` char(255) NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of page
-- ----------------------------
INSERT INTO `page` VALUES ('1', '<h1>1</h1>', '2019-03-25 11:19:14', '1', '10', '思考', '1');
INSERT INTO `page` VALUES ('2', '<h1><strong>打包</strong></h1><p><br></p><p><br></p><ul><li><span class=\"ql-size-large\">把配置文件夹 （config）下的index.js 中 dev属性中asset..中的路径进行修改，有两处修改路径哦，注意了，忘记了就重新百度。</span></li></ul><p><br></p><p><br></p><ul><li><span class=\"ql-size-large\">在项目中的路由模式选择了history的话，还需要额外的操作配置，需要给 路由上添加一个属性，base 写上服务器部署该项目的根文件夹。</span></li></ul><p><br></p><ul><li><span class=\"ql-size-large\">问题不大直接去掉了 history模式， 捞的一。</span></li></ul>', '2019-03-25 15:47:09', '2', '10', '打包的坑', '1');
INSERT INTO `page` VALUES ('3', '<p>1</p>', '2019-03-25 20:32:00', '3', '11', '春与秋', '1');
INSERT INTO `page` VALUES ('4', '<p><br></p><p><br></p><p><span class=\"ql-size-large\">关于this，困惑了许久实际使用还是蒙头蒙脑，重新研读一遍，不行就在一遍，所以坐一些记录。</span></p><p><br></p><p><span class=\"ql-size-large\">this 在任何情况下都不指向函数的词法作用域，（此法作用域就是你所定义的量在代码中的位置，你所写下赋予代码变量生命的地方，他们便在那里生根发芽，裙带关系，作用域便由之而来 </span><strong class=\"ql-size-large\">js中的函数也只看此法作用域</strong><span class=\"ql-size-large\">）。</span></p><p><br></p><p><br></p><p><strong class=\"ql-size-large\">this 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式</strong></p><p><br></p><p><br></p><p><strong class=\"ql-size-huge\">this的四条绑定规则</strong></p><p><br></p><ul><li><span class=\"ql-size-large\">默认绑定 调用位置是全局的时候（或者一些特殊的位置） 函数的this指向的是global对象， 回调，定时器。</span></li></ul><p><br></p><ul><li><span class=\"ql-size-large\">隐式绑定 函数被调用时的直接落脚点是一个对象，那么函数内部的this访问可以访问到这个对象的内容。(回调函数隐式丢失this 因为在传递回调时，回调引用被赋值，在内部进行调用，但是这时的this已经不是我们所希望的this了，它回到没人调用的寂寞，所以重新去找window)</span></li></ul><p><br></p><ul><li><span class=\"ql-size-large\">call/apply/bind 动态改变this的指向，注意了他们的调用，第一个参数只能传入一个对象，如果传入的不是对象那么就自动装箱转成它们的对象形式，比如String 类型的数据， 自动转成new String() 。</span><strong class=\"ql-size-large\">使用bind绑定过的函数，this不能在被bing二次修改了。</strong></li></ul><p><br></p><ul><li><span class=\"ql-size-large\">new 进行绑定也会改变this指向。</span></li></ul><p><br></p><p><br></p><p><strong class=\"ql-size-huge\">绑定的优先级</strong></p><p><br></p><ul><li><span class=\"ql-size-large\">new &gt; 显示绑定（call/bind）&gt; 隐式绑定（对象修饰符） &gt; 默认绑定</span></li></ul><p><br></p><p><br></p><p><strong class=\"ql-size-huge\">使用call/bind 进行绑定的特殊情况</strong></p><p><br></p><p><br></p><ul><li><span class=\"ql-size-large\">当call/bind的第一个参数中传入undefined 或 者 null时，所调用函数绑定的对象就绑定到了window上去，所以我们使用null作为绑定对象的方案不是很优秀，故使用一个创建空对象 的手段来进行操作，空对象 使用 Object.create(null)这个空对象是没有prototype，很空，一穷二白的那种，但是很有效，它会作为函数的this （如果有），这样就不会污染全局window了。</span></li></ul><p><br></p><ul><li><span class=\"ql-size-large\">还有就 是函数的柯里化，在第一次函数调用，先预定一些参数的设置，返回一个初始化了的函数引用，第二次调用可以再进一步传入深入参数，例如</span></li></ul><p>			</p><p>			<span style=\"color: rgb(235, 214, 255);\">&nbsp;</span><span class=\"ql-size-large\" style=\"color: rgb(136, 136, 136);\">function foo(a,b){ console.log(a,b)};\n&nbsp;&nbsp;&nbsp;let bar = foo.bind(Object.create(null), 3);</span><span class=\"ql-size-large\">&nbsp;//这里就是先给一个参数a 赋值 ，并且返回一个foo函数的引用   </span></p><p><span class=\"ql-size-large\">         </span><span class=\"ql-size-large\" style=\"color: rgb(136, 136, 136);\">bar(5);</span><span class=\"ql-size-large\"> //这里才传入第二个参数，做一次foo的调用</span>。</p>', '2019-03-27 09:21:23', '4', '10', '你所不知道的javascript', '1');

-- ----------------------------
-- Table structure for `tag`
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tag
-- ----------------------------
INSERT INTO `tag` VALUES ('1', 'vue');
INSERT INTO `tag` VALUES ('2', 'bug');
INSERT INTO `tag` VALUES ('3', '哔哔机');
INSERT INTO `tag` VALUES ('4', 'js');
INSERT INTO `tag` VALUES ('5', 'css');
INSERT INTO `tag` VALUES ('6', 'node');
