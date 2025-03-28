-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Värd: robertsql
-- Tid vid skapande: 28 mars 2025 kl 09:06
-- Serverversion: 11.7.2-MariaDB-ubu2404
-- PHP-version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `ecommerce`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `customers`
--

CREATE TABLE `customers` (
  `id` int(10) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(60) DEFAULT NULL,
  `phone` varchar(30) NOT NULL,
  `street_address` varchar(100) NOT NULL,
  `postal_code` varchar(30) NOT NULL,
  `city` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumpning av Data i tabell `customers`
--

INSERT INTO `customers` (`id`, `firstname`, `lastname`, `email`, `password`, `phone`, `street_address`, `postal_code`, `city`, `country`, `created_at`) VALUES
(50, 'adamaaasds', 'asdsa', 'apa@apa.com', 'asd', '123', 'a aaa', '33333', '', 'sverige', '2025-03-21 08:19:41'),
(171, 'Robertastasdt', 'asdasdas', 'gris@a.com', '', '123123', 'qasdad 1', '12345', '', 'Sverige', '2025-03-26 14:41:56'),
(203, 'ada', 'asdsa', 'a@a.com', 'asd', '123', 'a aaa', '33333', '', 'sverige', '2025-03-26 15:53:29'),
(204, 'ada', 'asdsa', 'a@aa.com', 'asd', '123', 'a aaa', '33333', '', 'sverige', '2025-03-26 15:55:22'),
(205, 'adam', 'jahiop', 'fram@far.com', '', '031024', 'slklav 5', '13245', 'csadasd', 'sweden', '2025-03-27 08:13:18'),
(206, 'adam', 'jahiop', 'fram@fara.com', '', '031024', 'slklav 5', '13245', 'csadasd', 'sweden', '2025-03-27 08:24:11'),
(208, 'greken', 'bertilsson', 'damp@damp.se', '', '0706050404', 'friskvägen 9', '12312', 'landetlångtborta', 'sweden', '2025-03-27 13:27:21'),
(209, 'greken', 'bertilsson', 'damp@dampa.se', '', '0706050404', 'friskvägen 9', '12312', 'landetlångtborta', 'sweden', '2025-03-27 14:38:23'),
(210, 'Robert', 'adolf', 'speed@speed.se', '', '0704', 'damp 1', '41233', 'ajaur', 'sweden', '2025-03-27 14:53:52'),
(211, 'pelle', 'svans', 'lös@asd.com', '', '1124', 'avägen 8', '12432', 'ajaur', 'sweden', '2025-03-27 14:57:39');

-- --------------------------------------------------------

--
-- Tabellstruktur `orders`
--

CREATE TABLE `orders` (
  `id` int(10) NOT NULL,
  `customer_id` int(10) NOT NULL,
  `total_price` int(5) NOT NULL,
  `payment_status` varchar(30) NOT NULL,
  `payment_id` varchar(200) DEFAULT NULL,
  `order_status` varchar(30) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumpning av Data i tabell `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `total_price`, `payment_status`, `payment_id`, `order_status`, `created_at`) VALUES
(111, 50, 2609, 'paid', 'pi_3R5455QWSzFKPi7P4MyN5uO2', 'Received', '2025-03-21 11:49:31'),
(112, 50, 2620, 'paid', 'pi_3R55L5QWSzFKPi7P5IEDb3Wk', 'Received', '2025-03-21 13:10:07'),
(113, 50, 2620, 'paid', 'pi_3R55QCQWSzFKPi7P1LkGNr8Q', 'Received', '2025-03-21 13:15:24'),
(120, 50, 2620, 'paid', 'pi_3R55wUQWSzFKPi7P51dRcvNe', 'Received', '2025-03-21 13:48:46'),
(121, 50, 2620, 'paid', 'pi_3R55ynQWSzFKPi7P201GkXsg', 'Received', '2025-03-21 13:51:10'),
(122, 50, 2620, 'paid', 'pi_3R560OQWSzFKPi7P20RyLoq8', 'Received', '2025-03-21 13:52:46'),
(123, 50, 44, 'paid', 'pi_3R56JkQWSzFKPi7P1TbZAHAD', 'Received', '2025-03-21 14:12:49'),
(124, 50, 11, 'paid', 'pi_3R56KfQWSzFKPi7P58eDZOu2', 'Received', '2025-03-21 14:13:46'),
(125, 50, 11, 'paid', 'pi_3R56LHQWSzFKPi7P3b6tlLnm', 'Received', '2025-03-21 14:14:25'),
(126, 50, 11, 'paid', 'pi_3R56SUQWSzFKPi7P15rGeiEC', 'Received', '2025-03-21 14:21:51'),
(127, 50, 11, 'paid', 'pi_3R56WlQWSzFKPi7P5ocpCLSm', 'Received', '2025-03-21 14:26:16'),
(128, 50, 1310, 'paid', 'pi_3R56cbQWSzFKPi7P0RWK0485', 'Received', '2025-03-21 14:32:18'),
(129, 50, 1310, 'paid', 'pi_3R56d5QWSzFKPi7P46Pjks9E', 'Received', '2025-03-21 14:32:45'),
(130, 50, 11, 'paid', 'pi_3R56qaQWSzFKPi7P0h7Fal6S', 'Received', '2025-03-21 14:46:45'),
(132, 50, 11, 'paid', 'pi_3R65yoQWSzFKPi7P1A1vmIGh', 'Received', '2025-03-24 08:03:16'),
(133, 50, 1310, 'paid', 'pi_3R69JTQWSzFKPi7P1iXvfgqN', 'Received', '2025-03-24 11:36:52'),
(134, 50, 2309, 'paid', 'pi_3R69KlQWSzFKPi7P2r6DZOIF', 'Received', '2025-03-24 11:38:04'),
(146, 50, 5196, 'paid', 'pi_3R7BRiQWSzFKPi7P28DZ7qnn', 'Received', '2025-03-27 08:05:25'),
(148, 50, 1310, 'paid', 'pi_3R7BXKQWSzFKPi7P1wYbAxdm', 'Received', '2025-03-27 08:11:26'),
(149, 205, 1321, 'paid', 'pi_3R7BZ8QWSzFKPi7P1tnYeftB', 'Received', '2025-03-27 08:13:18'),
(150, 205, 11, 'paid', 'pi_3R7BaHQWSzFKPi7P25m5Bk6s', 'Received', '2025-03-27 08:14:30'),
(151, 205, 1010, 'paid', 'pi_3R7BcJQWSzFKPi7P4kjawzxe', 'Received', '2025-03-27 08:16:29'),
(152, 206, 1310, 'paid', 'pi_3R7BjfQWSzFKPi7P1Qg2o0yp', 'Received', '2025-03-27 08:24:11'),
(155, 50, 1310, 'paid', 'pi_3R7GMxQWSzFKPi7P19NhJuSR', 'Received', '2025-03-27 13:21:03'),
(156, 208, 11022, 'paid', 'pi_3R7GTRQWSzFKPi7P0ZupF8F4', 'Received', '2025-03-27 13:27:21'),
(157, 209, 1299, 'paid', 'pi_3R7HZpQWSzFKPi7P1POfjeay', 'Received', '2025-03-27 14:38:23'),
(159, 209, 11347, 'paid', 'pi_3R7HksQWSzFKPi7P14c9cQF1', 'Shipped', '2025-03-27 14:49:41'),
(160, 210, 0, 'unpaid', '', 'Pending', '2025-03-27 14:53:52'),
(161, 211, 3297, 'paid', 'pi_3R7HsSQWSzFKPi7P4uetzzTH', 'Received', '2025-03-27 14:57:39'),
(162, 211, 33, 'paid', 'pi_3R7Ht8QWSzFKPi7P36qDM90B', 'Received', '2025-03-27 14:58:23'),
(163, 211, 22, 'paid', 'pi_3R7HzXQWSzFKPi7P0OvXPPet', 'Received', '2025-03-27 15:04:57'),
(164, 211, 0, 'unpaid', '', 'Pending', '2025-03-27 15:05:54'),
(165, 211, 11, 'paid', 'pi_3R7I0gQWSzFKPi7P4GbQjn6p', 'Received', '2025-03-27 15:06:11'),
(166, 50, 13246, 'paid', 'pi_3R7XedQWSzFKPi7P41llKGkr', 'Received', '2025-03-28 07:48:23'),
(167, 50, 1310, 'paid', 'pi_3R7XpfQWSzFKPi7P5GumhG9M', 'Received', '2025-03-28 07:59:51');

-- --------------------------------------------------------

--
-- Tabellstruktur `order_items`
--

CREATE TABLE `order_items` (
  `id` int(10) NOT NULL,
  `order_id` int(10) NOT NULL,
  `product_id` int(10) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `quantity` int(5) NOT NULL,
  `unit_price` int(5) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `product_name`, `quantity`, `unit_price`, `created_at`) VALUES
(273, 111, 23, 'Bahco , 91 parts', 1, 0, '2025-03-21 11:49:31'),
(274, 111, 22, 'Makita skruvdragare', 2, 1299, '2025-03-21 11:49:31'),
(275, 111, 5, 'screwdriver', 1, 11, '2025-03-21 11:49:31'),
(276, 112, 23, 'Bahco , 91 parts', 1, 0, '2025-03-21 13:10:07'),
(277, 112, 22, 'Makita skruvdragare', 2, 1299, '2025-03-21 13:10:07'),
(278, 112, 5, 'screwdriver', 2, 11, '2025-03-21 13:10:07'),
(279, 113, 23, 'Bahco , 91 parts', 1, 0, '2025-03-21 13:15:24'),
(280, 113, 22, 'Makita skruvdragare', 2, 1299, '2025-03-21 13:15:24'),
(281, 113, 5, 'screwdriver', 2, 11, '2025-03-21 13:15:24'),
(300, 120, 23, 'Bahco , 91 parts', 1, 0, '2025-03-21 13:48:46'),
(301, 120, 22, 'Makita skruvdragare', 2, 1299, '2025-03-21 13:48:46'),
(302, 120, 5, 'screwdriver', 2, 11, '2025-03-21 13:48:46'),
(303, 121, 23, 'Bahco , 91 parts', 1, 0, '2025-03-21 13:51:10'),
(304, 121, 22, 'Makita skruvdragare', 2, 1299, '2025-03-21 13:51:10'),
(305, 121, 5, 'screwdriver', 2, 11, '2025-03-21 13:51:10'),
(306, 122, 23, 'Bahco , 91 parts', 1, 0, '2025-03-21 13:52:46'),
(307, 122, 22, 'Makita skruvdragare', 2, 1299, '2025-03-21 13:52:46'),
(308, 122, 5, 'screwdriver', 2, 11, '2025-03-21 13:52:46'),
(309, 123, 5, 'screwdriver', 4, 11, '2025-03-21 14:12:49'),
(310, 124, 5, 'screwdriver', 1, 11, '2025-03-21 14:13:46'),
(311, 125, 5, 'screwdriver', 1, 11, '2025-03-21 14:14:25'),
(312, 126, 5, 'screwdriver', 1, 11, '2025-03-21 14:21:51'),
(313, 127, 5, 'screwdriver', 1, 11, '2025-03-21 14:26:16'),
(314, 128, 5, 'screwdriver', 1, 11, '2025-03-21 14:32:18'),
(315, 128, 22, 'Makita skruvdragare', 1, 1299, '2025-03-21 14:32:18'),
(316, 129, 5, 'screwdriver', 1, 11, '2025-03-21 14:32:45'),
(317, 129, 22, 'Makita skruvdragare', 1, 1299, '2025-03-21 14:32:45'),
(318, 130, 5, 'screwdriver', 1, 11, '2025-03-21 14:46:45'),
(320, 132, 5, 'screwdriver', 1, 11, '2025-03-24 08:03:16'),
(321, 133, 22, 'Makita skruvdragare', 1, 1299, '2025-03-24 11:36:52'),
(322, 133, 5, 'screwdriver', 1, 11, '2025-03-24 11:36:52'),
(323, 134, 22, 'Makita skruvdragare', 1, 1299, '2025-03-24 11:38:04'),
(324, 134, 5, 'screwdriver', 1, 11, '2025-03-24 11:38:04'),
(325, 134, 25, 'Handtoolbag', 1, 999, '2025-03-24 11:38:04'),
(336, 146, 22, 'Makita skruvdragare', 4, 1299, '2025-03-27 08:05:25'),
(339, 148, 22, 'Makita skruvdragare', 1, 1299, '2025-03-27 08:11:26'),
(340, 148, 5, 'screwdriver', 1, 11, '2025-03-27 08:11:26'),
(341, 149, 5, 'screwdriver', 2, 11, '2025-03-27 08:13:18'),
(342, 149, 22, 'Makita skruvdragare', 1, 1299, '2025-03-27 08:13:18'),
(343, 150, 5, 'screwdriver', 1, 11, '2025-03-27 08:14:30'),
(344, 151, 25, 'Handtoolbag', 1, 999, '2025-03-27 08:16:29'),
(345, 151, 5, 'screwdriver', 1, 11, '2025-03-27 08:16:29'),
(346, 152, 5, 'screwdriver', 1, 11, '2025-03-27 08:24:11'),
(347, 152, 22, 'Makita skruvdragare', 1, 1299, '2025-03-27 08:24:11'),
(352, 155, 22, 'Makita skruvdragare', 1, 1299, '2025-03-27 13:21:03'),
(353, 155, 5, 'screwdriver', 1, 11, '2025-03-27 13:21:03'),
(354, 156, 24, 'Toolcart', 1, 10000, '2025-03-27 13:27:21'),
(355, 156, 23, 'Bahco , 91 parts', 1, 0, '2025-03-27 13:27:22'),
(356, 156, 5, 'screwdriver', 1, 11, '2025-03-27 13:27:22'),
(357, 156, 27, 'Saw', 1, 6, '2025-03-27 13:27:22'),
(358, 156, 25, 'Handtoolbag', 1, 999, '2025-03-27 13:27:22'),
(359, 156, 28, 'Saw', 1, 0, '2025-03-27 13:27:22'),
(360, 156, 29, 'Saw', 1, 0, '2025-03-27 13:27:22'),
(361, 156, 30, 'Saw', 1, 0, '2025-03-27 13:27:22'),
(362, 156, 40, 'awd', 1, 6, '2025-03-27 13:27:22'),
(363, 156, 39, 'awd', 1, 0, '2025-03-27 13:27:22'),
(364, 157, 23, 'Bahco , 91 parts', 1, 0, '2025-03-27 14:38:23'),
(365, 157, 22, 'Makita skruvdragare', 1, 1299, '2025-03-27 14:38:23'),
(370, 159, 22, 'Makita skruvdragare', 1, 1299, '2025-03-27 14:49:41'),
(371, 159, 24, 'Toolcart', 1, 10000, '2025-03-27 14:49:41'),
(372, 159, 40, 'awd', 8, 6, '2025-03-27 14:49:41'),
(373, 159, 38, 'awd', 1, 0, '2025-03-27 14:49:41'),
(374, 160, 30, 'Saw', 1, 0, '2025-03-27 14:53:52'),
(375, 160, 29, 'Saw', 1, 0, '2025-03-27 14:53:52'),
(376, 161, 22, 'Makita skruvdragare', 1, 1299, '2025-03-27 14:57:39'),
(377, 161, 25, 'Handtoolbag', 2, 999, '2025-03-27 14:57:39'),
(378, 161, 28, 'Saw', 1, 0, '2025-03-27 14:57:39'),
(379, 162, 5, 'screwdriver', 3, 11, '2025-03-27 14:58:23'),
(380, 163, 5, 'screwdriver', 2, 11, '2025-03-27 15:04:57'),
(381, 164, 29, 'Saw', 1, 0, '2025-03-27 15:05:54'),
(382, 164, 30, 'Saw', 1, 0, '2025-03-27 15:05:54'),
(383, 165, 29, 'Saw', 1, 0, '2025-03-27 15:06:11'),
(384, 165, 30, 'Saw', 1, 0, '2025-03-27 15:06:11'),
(385, 165, 5, 'screwdriver', 1, 11, '2025-03-27 15:06:11'),
(386, 166, 33, 'Saw', 1, 13123, '2025-03-28 07:48:23'),
(387, 166, 34, 'Saw', 1, 123, '2025-03-28 07:48:23'),
(388, 166, 37, 'awd', 1, 0, '2025-03-28 07:48:23'),
(389, 167, 22, 'Makita skruvdragare', 1, 1299, '2025-03-28 07:59:51'),
(390, 167, 5, 'screwdriver', 1, 11, '2025-03-28 07:59:51'),
(391, 167, 23, 'Bahco , 91 parts', 1, 0, '2025-03-28 07:59:51');

-- --------------------------------------------------------

--
-- Tabellstruktur `products`
--

CREATE TABLE `products` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `price` int(5) NOT NULL,
  `stock` int(4) NOT NULL,
  `category` varchar(100) NOT NULL,
  `image` varchar(200) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumpning av Data i tabell `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `stock`, `category`, `image`, `created_at`) VALUES
(5, 'screwdriver', 'A Torx 25 screwdriver is a tool designed for tightening or loosening screws with a Torx 25 head, which features a six-pointed star shape. The Torx design provides excellent grip and minimizes wear on the screw head. This screwdriver often includes an ergonomic handle and a precision tip to ensure efficiency and comfort during use—ideal for technical or mechanical tasks!', 11, 78, 'Handtools', 'https://dyncdn.thg.dk/img/990075760435_0_m_650_1100.JPG', '2025-03-11 04:58:55'),
(22, 'Makita skruvdragare', 'Elektriskt skruvdragarae', 1299, 78, 'Electrictools', 'https://www.bauhaus.se/media/catalog/product/cache/3e7b8fe327b7b9553ccec016d3f9a411/1/1/1161916a.jpg', '2025-03-13 14:08:12'),
(23, 'Bahco , 91 parts', 'asd', 0, -4, '', 'https://images.clasohlson.com/medias/sys_master/ha8/h7a/68446551179294.jpg', '2025-03-14 12:19:30'),
(24, 'Toolcart', 'aasd ', 10000, 7, 'Handtools', 'https://d35upy55xh4amn.cloudfront.net/media/catalog/product/cache/4ca15067a9e420372ae431c0fa0f6369/2/4/2485054.jpg', '2025-03-14 12:20:21'),
(25, 'Handtoolbag', 'asdasf alsfm asfölmas fmlasöf öalms f\'ölmas f\'lölmas f\'ölmlas fölmas f\'ölmas f\'ölmlmas f', 999, 45, 'Handtools', 'https://m.media-amazon.com/images/I/91Vn65daz3L._AC_SL1500_.jpg', '2025-03-14 12:24:40'),
(27, 'Saw', 'asd', 6, -3, 'Electrictools', 'https://th.bing.com/th/id/R.d685eed8c3049211e11e95d448114313?rik=CjqIicT4oQi9xQ&pid=ImgRaw&r=0', '2025-03-14 12:27:38'),
(28, 'Saw', 'asd', 0, -2, '', 'https://th.bing.com/th/id/R.d685eed8c3049211e11e95d448114313?rik=CjqIicT4oQi9xQ&pid=ImgRaw&r=0', '2025-03-14 12:28:25'),
(29, 'Saw', 'asd', 0, -2, '', 'https://th.bing.com/th/id/R.d685eed8c3049211e11e95d448114313?rik=CjqIicT4oQi9xQ&pid=ImgRaw&r=0', '2025-03-14 12:28:28'),
(30, 'Saw', 'asd', 0, -2, '', 'https://th.bing.com/th/id/R.d685eed8c3049211e11e95d448114313?rik=CjqIicT4oQi9xQ&pid=ImgRaw&r=0', '2025-03-14 12:28:31'),
(33, 'Saw', 'asd', 13123, 122, '', 'https://th.bing.com/th/id/R.d685eed8c3049211e11e95d448114313?rik=CjqIicT4oQi9xQ&pid=ImgRaw&r=0', '2025-03-17 11:52:27'),
(34, 'Saw', 'asd', 123, 122, 'Electrictools', 'https://th.bing.com/th/id/R.d685eed8c3049211e11e95d448114313?rik=CjqIicT4oQi9xQ&pid=ImgRaw&r=0', '2025-03-17 11:52:34'),
(35, '123', '123', 123, 123, 'Electrictools', 'https://th.bing.com/th/id/R.d685eed8c3049211e11e95d448114313?rik=CjqIicT4oQi9xQ&pid=ImgRaw&r=0', '2025-03-17 11:52:42'),
(36, 'awd', '123', 0, 0, 'Electrictools', 'https://th.bing.com/th/id/R.d685eed8c3049211e11e95d448114313?rik=CjqIicT4oQi9xQ&pid=ImgRaw&r=0', '2025-03-17 11:52:47'),
(37, 'awd', '123', 0, -1, 'Electrictools', 'https://th.bing.com/th/id/R.d685eed8c3049211e11e95d448114313?rik=CjqIicT4oQi9xQ&pid=ImgRaw&r=0', '2025-03-17 11:52:50'),
(38, 'awd', '123', 0, -1, 'Electrictools', 'https://th.bing.com/th/id/R.d685eed8c3049211e11e95d448114313?rik=CjqIicT4oQi9xQ&pid=ImgRaw&r=0', '2025-03-17 11:52:53'),
(39, 'awd', '123', 0, -1, 'Electrictools', 'https://th.bing.com/th/id/R.d685eed8c3049211e11e95d448114313?rik=CjqIicT4oQi9xQ&pid=ImgRaw&r=0', '2025-03-17 11:52:56'),
(40, 'awd', '123', 6, 312, 'Electrictools', 'https://th.bing.com/th/id/R.d685eed8c3049211e11e95d448114313?rik=CjqIicT4oQi9xQ&pid=ImgRaw&r=0', '2025-03-17 11:52:59');

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index för tabell `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orderItems_orders` (`order_id`);

--
-- Index för tabell `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=212;

--
-- AUTO_INCREMENT för tabell `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=168;

--
-- AUTO_INCREMENT för tabell `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=392;

--
-- AUTO_INCREMENT för tabell `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- Restriktioner för dumpade tabeller
--

--
-- Restriktioner för tabell `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_orderItems_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
