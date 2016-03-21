-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-03-21 02:48:24
-- 服务器版本： 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `zzyanode`
--

-- --------------------------------------------------------

--
-- 表的结构 `goods_list`
--

CREATE TABLE IF NOT EXISTS `goods_list` (
`id` int(6) unsigned NOT NULL,
  `shop_id` int(6) NOT NULL,
  `goods_name` varchar(35) NOT NULL,
  `price` decimal(7,0) NOT NULL,
  `old_price` decimal(6,0) DEFAULT NULL,
  `stock` int(6) NOT NULL,
  `denomination` varchar(50) NOT NULL,
  `validity` varchar(50) NOT NULL,
  `img` varchar(300) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- 转存表中的数据 `goods_list`
--

INSERT INTO `goods_list` (`id`, `shop_id`, `goods_name`, `price`, `old_price`, `stock`, `denomination`, `validity`, `img`) VALUES
(7, 6, '腊八粥营养早餐春节大放送', '20', '89', 128, '80,1000,300', '50,30,20,100', 'img/upimg/0.46105061494745314.jpg'),
(8, 6, '每日轻松一刻强烈推荐产品', '188', '966', 3, '1000,300,200', '100,50,30,20', 'img/upimg/0.6530198147520423.jpg'),
(9, 6, '春节大返利姚笛签名智商充值套餐', '200', '1350', 20, '50,80,100,150,200,300', '30,20,100', 'img/upimg/0.18467349070124328.jpg'),
(10, 19, '每天站在高楼上看着地上的小蚂蚁', '640', '890', 560, '80,100,300,500', '50,30,100,10', 'img/upimg/0.6043837738689035.jpg'),
(11, 19, '天空之城宫崎骏的某种期许', '80', '90', 130, '50,80', '8,10', 'img/upimg/0.04650297900661826.jpg'),
(12, 19, '万物生长靠太阳尊享', '800', '1800', 9, '50,80,100', '8,10,20', 'img/upimg/0.396100633777678.jpg'),
(13, 19, '油品商城连夜加班所得', '99', '12', 3, '50,80,100', '5,3,100,20', 'img/upimg/0.6478600825648755.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `shoplist`
--

CREATE TABLE IF NOT EXISTS `shoplist` (
`id` int(6) unsigned NOT NULL,
  `user_id` int(20) NOT NULL,
  `shop_name` varchar(50) NOT NULL,
  `shop_type` varchar(50) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=20 ;

--
-- 转存表中的数据 `shoplist`
--

INSERT INTO `shoplist` (`id`, `user_id`, `shop_name`, `shop_type`) VALUES
(6, 10, '智商充值华北去旗舰店', '11'),
(19, 13, '尼亚加拉瀑布的忧伤', '5');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
`id` int(6) unsigned NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `nickname` varchar(30) DEFAULT NULL,
  `limit` int(2) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `nickname`, `limit`) VALUES
(10, 'genius', '96e79218965eb72c92a549dd5a330112', '暴躁的小蜗牛', 2),
(13, 'zzyycg', '96e79218965eb72c92a549dd5a330112', '分萧萧兮易水寒', 1);

-- --------------------------------------------------------

--
-- 表的结构 `user_record`
--

CREATE TABLE IF NOT EXISTS `user_record` (
`id` int(6) unsigned NOT NULL,
  `user_id` int(6) NOT NULL,
  `QQ` int(15) DEFAULT NULL,
  `motto` varchar(200) DEFAULT NULL,
  `salary` varchar(20) DEFAULT NULL,
  `orientation` varchar(10) DEFAULT NULL,
  `interest` varchar(50) DEFAULT NULL,
  `wishful` varchar(200) DEFAULT NULL,
  `homeland` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `profession` varchar(20) DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL,
  `avatar` varchar(300) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `user_record`
--

INSERT INTO `user_record` (`id`, `user_id`, `QQ`, `motto`, `salary`, `orientation`, `interest`, `wishful`, `homeland`, `address`, `profession`, `color`, `avatar`) VALUES
(1, 10, 2147483647, '爱国主义，多少罪恶假汝之名', '五毛', '食用主义', '足球（呵呵）', '面朝大海，春暖花开，穿着大裤衩和西装游泳', '{"p":"provinces19","c":"cities261","n":"counties2184","pn":"内蒙古","cn":"包头","nn":"九原区"}', '{"p":"provinces17","c":"cities235","n":"counties1995","pn":"江西","cn":"赣州","nn":"兴国县"}', '水泥工', '红色蓝色黑色咖啡色', 'img/upimg/0.11735455226153135.jpg'),
(2, 13, 123123, '爱国主义，多少罪恶假汝之名', '五毛', '食用主义', '足球（呵呵）', '面朝大海，春暖花开，穿着大裤衩和西装游泳', '{"p":"provinces4","c":"cities55","n":"counties540","pn":"福建","cn":"南平","nn":"武夷山市"}', '{"p":"provinces3","c":"cities38","n":"counties418","pn":"安徽","cn":"巢湖","nn":"无为县"}', '水泥工', '红色蓝色黑色咖啡色', 'img/upimg/0.5139642104040831.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `goods_list`
--
ALTER TABLE `goods_list`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shoplist`
--
ALTER TABLE `shoplist`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_record`
--
ALTER TABLE `user_record`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `goods_list`
--
ALTER TABLE `goods_list`
MODIFY `id` int(6) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `shoplist`
--
ALTER TABLE `shoplist`
MODIFY `id` int(6) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
MODIFY `id` int(6) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `user_record`
--
ALTER TABLE `user_record`
MODIFY `id` int(6) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
