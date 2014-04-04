/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50612
Source Host           : localhost:3306
Source Database       : crm

Target Server Type    : MYSQL
Target Server Version : 50612
File Encoding         : 65001

Date: 2014-04-03 22:07:00
*/

DROP DATABASE IF EXISTS maizuo;
CREATE DATABASE maizuo DEFAULT CHARACTER SET utf8;
USE maizuo;

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户Id',
  `account` varchar(50) NOT NULL,
  `userName` varchar(30) NOT NULL COMMENT '用户名',
  `password` varchar(50) NOT NULL DEFAULT '' COMMENT '密码',
  `email` varchar(50) DEFAULT '',
  `picture` varchar(255) DEFAULT '',
  `groupId` int(11) NOT NULL,
  `lastLoginTime` varchar(50) NOT NULL DEFAULT '0000-00-00' COMMENT '最后登录时间',
  `lastLoginIp` varchar(20) NOT NULL DEFAULT '0' COMMENT '最后登录IP',
  PRIMARY KEY (`id`,`groupId`),
  KEY `AK_AK_USER_USER_NAME` (`userName`),
  KEY `groupId` (`groupId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'table', 'table', 'aab9e1de16f38176f86d7a92ba337a8d', null, null, '1', '1396509062841', '127.0.0.1');
