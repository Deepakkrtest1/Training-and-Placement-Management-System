-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 14, 2021 at 04:38 AM
-- Server version: 8.0.21
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `placement`
--

-- --------------------------------------------------------

--
-- Table structure for table `applied`
--

DROP TABLE IF EXISTS `applied`;
CREATE TABLE IF NOT EXISTS `applied` (
  `aid` int NOT NULL AUTO_INCREMENT,
  `jid` int NOT NULL,
  `cid` int NOT NULL,
  `sid` int NOT NULL,
  `iseligible` varchar(50) NOT NULL,
  PRIMARY KEY (`aid`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `applied`
--

INSERT INTO `applied` (`aid`, `jid`, `cid`, `sid`, `iseligible`) VALUES
(89, 101, 5, 210, 'yes'),
(90, 101, 5, 211, 'no'),
(91, 99, 5, 210, 'yes'),
(92, 99, 5, 207, 'no'),
(93, 105, 5, 254, 'yes'),
(94, 104, 5, 254, 'yes'),
(95, 108, 7, 254, 'no'),
(98, 111, 5, 254, 'yes');

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
CREATE TABLE IF NOT EXISTS `company` (
  `cid` int NOT NULL AUTO_INCREMENT COMMENT 'Auto increment',
  `hrname` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cemail` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cpassword` varchar(500) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cname` char(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cwebsite` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `city` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ctype` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cinfo` varchar(100) NOT NULL,
  `cmobileno` decimal(10,0) NOT NULL,
  `empl` varchar(50) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`cid`, `hrname`, `cemail`, `cpassword`, `cname`, `cwebsite`, `city`, `ctype`, `cinfo`, `cmobileno`, `empl`) VALUES
(5, 'hr', 'tcs@gmail.com', '$2a$12$7KNAgxGZsJGtUNMsN81C1euU8LNLdjlRbxHIzK2qU6UMe8mM3JEQ2', 'tcs', 'www.tcs.com', 'Pune', 'Public Limited Company', 'IT Company ', '9913919327', '200 to 499'),
(6, 'vinodbhai', 'vin@gmail.com', '$2a$12$GjW9hkJKTiVU2QI9DxXMuejlhVe5VjvyT7/XsWTeBwu5c3kIAh3ma', 'vincompany', 'www.vin.com', 'Ahmedabad', 'Public Limited Company', 'Software Company', '9903919327', '500 to 1000'),
(7, 'shayambhai', 'easytech@gmail.com', '$2a$12$fSsZp3nnfzCUxHyLbUSsLOCZJ6Pv3nLx6P7lKu1wAp2h0EX4x0ixO', 'easytech', 'www.easytech.in', 'delhi', 'other', 'goverment Contract Company', '6549873211', 'more than 1000'),
(9, 'lakhanbhai', 'gtpl@gmail.com', '$2a$12$m364wV9SuWQVqC9jpKdvIuxEbyastr.VhZI1s2KVC.cH/BUyxAOXm', 'gtpl', 'www.gtpl.com', 'delhi', 'Public Limited Company', 'Fibercompany', '6565498732', '200 to 499'),
(10, 'mohitbhai', 'jio@gmail.com', '$2a$12$iiF.p8wNF7YOabxtpqc9ZeIV9CIdWk.iKXWHnLo./8DLhv2guXi3S', 'jio', 'www.jio.com', 'Ahmedabad', 'Joint-Venture Company', '', '9999999999', '200 to 499'),
(11, 'abhibhai', 'mi@gmail.com', '$2a$12$ZNxwekjQ1wcsHQybVLZybO7mZnNcVAWIre.O1d5i6eCaGtAD2j4Mm', 'mi', 'www.miindia.com.in', 'kolkata', 'Private Limited Company', 'mobile manufacturing company', '6655449988', 'more than 1000'),
(12, 'vipulbhai', 'vivo@gmail.com', '$2a$12$8Al9Tdw4ZhWHFFfpPb8.te76qfXetMKEUhR.Il8oysShhsLlisuYm', 'vivo', 'www.vivo.com', 'Nadiad', 'One Person Company', 'Software Company', '6665554444', 'less than 200'),
(13, 'princebhai', 'oppo@gmail.com', '$2a$12$QSff.ebbe0ybyfX4YUcZAegvoTsv4MeEGuRdYN/ic.bRVD8RF1nzi', 'oppo', 'www.oppo.in', 'mumbai', 'Private Limited Company', 'agritech', '9876665555', '500 to 1000'),
(14, 'jenishbhai', 'info@gmail.com', '$2a$12$42tYQlITtBL9JmZchTYL9u.yTdWIMph3ngMCJcvOjdfAnlQdDjoQW', 'info', 'www.infotech.com', 'surat', 'Public Limited Company', 'IT Company ', '9999965432', 'more than 1000'),
(15, 'dhirajbhai', 'funtech@gmail.com', '$2a$12$xDlIH6sB3Fxg/jmxAlNxFO0HcuAL7349OIQxmzdJwQSXDyquDxmsa', 'funtech', 'www.funtech.org.in', 'rajkot', 'Non-Government Organization (NGO)', 'help in any innovation', '9876543222', '500 to 1000');

-- --------------------------------------------------------

--
-- Table structure for table `jobdetail`
--

DROP TABLE IF EXISTS `jobdetail`;
CREATE TABLE IF NOT EXISTS `jobdetail` (
  `jid` int NOT NULL AUTO_INCREMENT,
  `cid` int NOT NULL COMMENT 'Foreign key',
  `place` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `salary` varchar(50) NOT NULL,
  `bondyears` decimal(10,0) NOT NULL,
  `servagree` varchar(500) NOT NULL,
  `jobtype` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `jobinfo` varchar(500) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `vacancy` decimal(10,0) NOT NULL,
  `minavgcp` float NOT NULL,
  `minblog` int NOT NULL,
  `lastdate` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `dateexam` varchar(50) NOT NULL,
  `dateinterview` varchar(50) NOT NULL,
  `college` varchar(100) NOT NULL,
  `department` varchar(100) NOT NULL,
  `request` varchar(10) NOT NULL DEFAULT 'no',
  `accepted` varchar(10) NOT NULL DEFAULT 'no',
  `rejected` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'no',
  PRIMARY KEY (`jid`),
  KEY `cid` (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `jobdetail`
--

INSERT INTO `jobdetail` (`jid`, `cid`, `place`, `salary`, `bondyears`, `servagree`, `jobtype`, `jobinfo`, `vacancy`, `minavgcp`, `minblog`, `lastdate`, `dateexam`, `dateinterview`, `college`, `department`, `request`, `accepted`, `rejected`) VALUES
(101, 5, 'Surat', '15000/month', '1', '', 'Job', '', '20', 8, 0, '2021-04-03', '2021-04-07', '2021-04-09', 'all', 'COMPUTER,IT', 'no', 'no', 'no'),
(102, 5, 'Ahemdabaad', '20000/month', '0', '', 'Job', '', '25', 8, 0, '2021-04-08', '', '', 'tpocollege', 'COMPUTER,MCA', 'no', 'no', 'no'),
(103, 5, 'Ahemdabaad', '5000/month', '0', '', 'Only Internship', '', '20', 7, 0, '', '', '', 'ddu', 'IT', 'yes', 'no', 'no'),
(104, 5, 'Ahemdabaad', '20000/month', '0', 'some job serv agreement are there', 'Job', 'Field Eng', '35', 8.6, 0, '2021-04-06', '2021-04-01', '2021-04-04', 'tpocollege', 'COMPUTER,MBA', 'no', 'no', 'no'),
(105, 5, 'Nadiad', '50000/month', '0', '', 'Internship + Job', '', '35', 8, 0, '2021-04-07', '2021-04-08', '2021-04-10', 'tpocollege', 'COMPUTER,IT', 'yes', 'yes', 'no'),
(106, 5, 'Bangalore', '25000/month', '1', '', 'Job', '', '36', 8, 0, '', '', '', 'tpocollege', 'MBA,IT', 'yes', 'no', 'no'),
(107, 7, 'Ahemdabaad', '20000/month', '1', '', 'Internship + Job', '', '25', 8, 0, '', '', '', 'tpocollege', 'COMPUTER', 'yes', 'no', 'yes'),
(108, 7, 'Pune', '50000/month', '0', '', 'Internship + Job', '', '15', 9.1, 0, '2021-04-20', '2021-04-22', '2021-04-24', 'all', 'IT', 'no', 'no', 'no'),
(111, 5, 'Ahemdabaad', '50000/month', '0', '', 'Internship + Job', '', '50', 8, 0, '2021-05-12', '', '', 'all', 'COMPUTER', 'no', 'no', 'no'),
(112, 5, 'Ahemdabaad', '20000/month', '0', '', 'Internship + Job', '', '20', 0, 0, '2021-05-12', '', '', 'tpocollege', 'COMPUTER,IT', 'yes', 'yes', 'no');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
CREATE TABLE IF NOT EXISTS `student` (
  `sid` int NOT NULL AUTO_INCREMENT COMMENT 'Auto increment',
  `sname` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `semail` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `spass` varchar(500) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `collegename` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `age` decimal(3,0) NOT NULL,
  `city` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `gender` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `smobileno` decimal(10,0) NOT NULL,
  `isverifed` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'NO',
  `dname` varchar(50) NOT NULL,
  `passingyear` varchar(10) NOT NULL,
  `result10` varchar(10) NOT NULL,
  `result12` varchar(10) NOT NULL,
  `avgcgpa` varchar(10) NOT NULL,
  `backlogs` decimal(3,0) NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=372 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`sid`, `sname`, `semail`, `spass`, `collegename`, `age`, `city`, `gender`, `smobileno`, `isverifed`, `dname`, `passingyear`, `result10`, `result12`, `avgcgpa`, `backlogs`) VALUES
(39, 'adarsh', 'adarsh@gmail.com', '$2a$12$.1eGhO1/bImq2TQgW6aYo.kxBZVXsh19OZeLFT3.pOkIFUcNGmbsi', 'ddu', '20', 'surat', 'male', '2147483647', 'NO', 'computer', '2022', '85', '90', '8.67', '1'),
(200, 'anjan', 'anjan@gmail.com', '$2a$12$Pg0ZzX6XZHkagJL75HUTSOTvL8RKBmQLgE4V3cbiMkKv9mV4sMGlq', 'tpocollege', '20', 'Jamnagar', 'male', '2147483647', 'NO', 'Civil', '2023', '94', '90', '9.08', '0'),
(207, 'charmi Mehta', 'charmi@gmail.com', '$2a$12$122M1XJmR.CAa8zrXEwu2OB3cBJhOVZFPfc55Gnpcdz1mrJNizBh.', 'ddu', '21', 'dwarka', 'female', '2147483647', 'YES', 'Computer', '2022', '91', '85', '8.5', '0'),
(208, 'jay sanghani', 'jay@gmail.com', '$2a$12$GWWzfVGfK52ZJ.xZQa.vLu03dczV.ZPa1Ntx6hZiETR9xkD0pxMKq', 'ddu', '21', 'surat', 'male', '2147483647', 'YES', 'MBA', '2021', '70', '75', '7.9', '2'),
(209, 'kailash', 'kailash@gmail.com', '$2a$12$GR8g7QKL29BVBDHIOdeC2eRtst7wypSGBz9BBb3dQ.UBGdkIp0KOS', 'ddu', '20', 'nadiad', 'male', '2147483647', 'YES', 'MCA', '2022', '85', '70', '8.3', '1'),
(210, 'dip Vachhani', 'dip@gmail.com', '$2a$12$moQY.KzFhGyYF49rM3ZNKepLl/cYtoSHKdRxkdBgIBPkT3ebx6RdO', 'ddu', '18', 'jamnagar', 'male', '2147483647', 'YES', 'Computer', '2021', '80', '95', '9', '0'),
(211, 'shyam', 'shaym@gmail.com', '$2a$12$8dxy/dYpk94LBKaoapBBQOTAssbhJ3z.J5PgUtrEU2A7E8LLisDF.', 'ddu', '20', 'surat', 'male', '2147483647', 'YES', 'It', '2021', '92', '95', '7.77', '0'),
(212, 'drashty patel', 'drashty@gmail.com', '$2a$12$q33tcFQm4EzKZchI7CBnLOafDrIdpD2UqHQPXa72kJD3sVj71qo9i', 'ddu', '21', 'jamnagar', 'female', '2147483647', 'YES', 'Chemical', '2022', '90', '90', '9', '0'),
(213, 'kd', 'kd@gmail.com', '$2a$12$Ba78di7cHQED47LNm4GBxuVpsJ4U6QPiGrUkODXvasgicpxBDcAJu', 'nirma', '20', 'Jamnangar', 'male', '0', 'NO', 'Chemical', '2023', '80', '80', '8.5', '0'),
(254, 'Darshak Kathiriya', 'darshak@gmail.com', '$2a$12$OU/.rQC1xpIsuQUclL3t.uiGPqtZfwmcn7LyXR81YRsU8V4aoz0eG', 'tpocollege', '18', 'jamnagar', 'male', '9988776655', 'YES', 'It', '2021', '90', '95', '8', '0'),
(255, 'ramesh sanghani', 'ramesh@gmail.com', '$2a$12$q5yDzxDDzt8dlwCW4BztCudU98YGfbiizKHveloi1KqiXkSibkhky', 'tpocollege', '20', 'surat', 'male', '2147483647', 'YES', 'MBA', '2021', '70', '75', '7.9', '1'),
(256, 'mahesh', 'mahesh@gmail.com', '$2a$12$ShnXjXMgekd2aIp9.F/qa.0lM/3oQxv0XzwdOp6doMKGVNc3C6OFy', 'tpocollege', '20', 'nadiad', 'male', '2147483647', 'YES', 'Computer', '2022', '85', '70', '8.3', '2'),
(257, 'ayushi ajudiya', 'ayushi@gmail.com', '$2a$12$1nNV0kKxxSzF8DlK8zUP2O3LFoPYjvzkU5aPBZqbKKGmFfiLYGhHm', 'tpocollege', '19', 'jamnagar', 'female', '2147483647', 'YES', 'Chemical', '2022', '90', '90', '9', '0'),
(258, 'Nihal Limbani', 'nihal@gmail.com', '$2a$12$G.bxGyl/iOcO8ALLHuo3ZOwsOFpiPT2ftUdi/bu3jl056OjQww0ka', 'tpocollege', '19', 'dwarka', 'male', '2147483647', 'YES', 'Computer', '2022', '91', '85', '8.5', '0'),
(259, 'suresh', 'suresh@gmail.com', '$2a$12$U38VJAd2zXSXdvBT.3wH8OPRAK0.bbwt58iSImpXWH0Aq0Y6C.Vdq', 'tpocollege', '20', 'surat', 'male', '2147483647', 'YES', 'It', '2021', '92', '95', '7.77', '0');

-- --------------------------------------------------------

--
-- Table structure for table `tpo`
--

DROP TABLE IF EXISTS `tpo`;
CREATE TABLE IF NOT EXISTS `tpo` (
  `tid` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `tname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `temail` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tpassword` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `collegename` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `city` varchar(50) NOT NULL,
  `mobileno` decimal(10,0) NOT NULL,
  `website` varchar(50) NOT NULL,
  `nirf` decimal(3,0) NOT NULL,
  `nacc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ncte` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `aicte` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ugc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tpo`
--

INSERT INTO `tpo` (`tid`, `tname`, `temail`, `tpassword`, `collegename`, `city`, `mobileno`, `website`, `nirf`, `nacc`, `ncte`, `aicte`, `ugc`) VALUES
(9, 'VipulDabhisir', 'vipuldabhi@gmail.com', '$2a$12$5acV8OmlNEu1/X8bL7HMsOLtv.46RkgS4XUVqBkDTMS.r5Yd28Yau', 'ddu', 'Nadiad', '6543219877', 'www.ddit.com', '120', 'yes', 'yes', 'no', 'no'),
(10, 'mmg sir', 'mmgsir@gmail.com', '$2a$12$jSx1bCgsYMaOJQEWKcFT6OzyRCoAnOrIcdU5Y5PQ8vjuaw4sDRIX2', 'nirma', 'Ahmedabad', '9992255555', 'www.nirma.com', '80', 'yes', 'no', 'yes', 'yes'),
(36, 'TPO', 'tpo@gmail.com', '$2a$12$.7EI0jWvpRUk0H/OwkqGE.p091.5PLrzMf.SxLJ0Y2ymfHJuCKsIy', 'tpocollege', 'Jamnangar', '9987654333', 'www.tpo.com', '10', 'no', 'yes', 'yes', 'no');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
