-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-01-22 12:44:40
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
-- 表的结构 `shoplist`
--

CREATE TABLE IF NOT EXISTS `shoplist` (
`id` int(6) unsigned NOT NULL,
  `user_id` int(20) NOT NULL,
  `shop_name` varchar(50) NOT NULL,
  `shop_type` varchar(50) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- 转存表中的数据 `shoplist`
--

INSERT INTO `shoplist` (`id`, `user_id`, `shop_name`, `shop_type`) VALUES
(4, 10, '智商余额不足充值旗舰店', '11');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `nickname`, `limit`) VALUES
(10, 'genius', '96e79218965eb72c92a549dd5a330112', '暴躁的小蜗牛', 2),
(11, 'genius1', '96e79218965eb72c92a549dd5a330112', NULL, 0),
(12, 'genius2', '96e79218965eb72c92a549dd5a330112', NULL, 0);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `user_record`
--

INSERT INTO `user_record` (`id`, `user_id`, `QQ`, `motto`, `salary`, `orientation`, `interest`, `wishful`, `homeland`, `address`, `profession`, `color`, `avatar`) VALUES
(1, 10, 2147483647, '爱国主义，多少罪恶假汝之名', '五毛', '食用主义', '足球（呵呵）', '面朝大海，春暖花开，穿着大裤衩和西装游泳', '{"p":"provinces19","c":"cities261","n":"counties2184","pn":"内蒙古","cn":"包头","nn":"九原区"}', '{"p":"provinces17","c":"cities235","n":"counties1995","pn":"江西","cn":"赣州","nn":"兴国县"}', '水泥工', '红色蓝色黑色咖啡色', 'img/upimg/0.5277729858644307.jpg');

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for table `shoplist`
--
ALTER TABLE `shoplist`
MODIFY `id` int(6) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
MODIFY `id` int(6) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `user_record`
--
ALTER TABLE `user_record`
MODIFY `id` int(6) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
