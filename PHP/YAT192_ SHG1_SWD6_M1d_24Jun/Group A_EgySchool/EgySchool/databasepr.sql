CREATE DATABASE IF NOT EXISTS `course_platform` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `course_platform`;
--

CREATE TABLE `courses` (
  `course_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `photo` text NOT NULL,
  `description` text NOT NULL,
  `price` varchar(10) DEFAULT NULL,
  `num_lessons` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `St_c` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- إرجاع أو استيراد بيانات الجدول `courses`
--

INSERT INTO `courses` (`course_id`, `user_id`, `title`, `photo`, `description`, `price`, `num_lessons`, `created_at`, `St_c`) VALUES
(8, 6, 'Science', 'uploads/1.png', 'This year we will be studying Science Techbook, a comprehensive science program developed to inspire students to act and think like scientists. Throughout the year, students will ask questions about the world around them and real-world problems by applying critical thinking across fields. Sciences (life sciences, earth and space sciences, physical sciences).', 'Free', 2, '2024-10-24 09:39:59', 1),
(9, 6, 'Math', 'uploads/2.png', 'Mathematics for the fourth grade of primary school represents a challenge for students to consolidate what they have learned in previous grades, apply new concepts and skills, and also learn new and complex concepts and skills that qualify them to face the challenges of the fifth grade of primary school and the grades that follow it.', 'Free', 3, '2024-10-24 09:41:29', 1),
(10, 6, 'ØªÙƒÙ†ÙˆÙ„ÙˆØ¬ÙŠØ§ Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª ÙˆØ§Ù„Ø§ØªØµØ§Ù„Ø§Øª', 'uploads/3.png', ' ØªØ­ØªÙˆÙŠ Ù‡Ø°Ù‡ Ø§Ù„Ù…Ø§Ø¯Ø© ÙØ¶Ù„Ø§ Ø¹Ù† Ø§Ù„Ù…ÙˆØ§Ø¯ Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ© Ø§Ù„Ø±Ù‚Ù…ÙŠØ© Ø§Ù„ØªÙŠ ØªØ¹ÙƒØ³ Ø±Ø¤ÙŠØªÙ‡Ø§ Ø¹Ù† Ø±Ø­Ù„Ø© Ø§Ù„ØªØ·ÙˆÙŠØ± ÙˆÙ„Ù‚Ø¯ ÙƒØ§Ù† Ù‡Ø°Ø§ Ø§Ù„Ø¹Ù…Ù„ Ù†Ø§ØªØ¬Ø§ Ù„ÙƒØ«ÙŠØ± Ù…Ù† Ø§Ù„Ø¯Ø±Ø§Ø³Ø§Øª Ø§Ù„Ù…Ù‚Ø§Ø±Ù†Ø§Øª ÙˆØ§Ù„ØªÙÙƒÙŠØ± Ø§Ù„Ø¹Ù…ÙŠÙ‚ ÙˆØ§Ù„ØªØ¹Ø§ÙˆÙ† Ù…Ø¹ Ø§Ù„ÙƒØ«ÙŠØ± Ù…Ù† Ø¹Ù„Ù…Ø§Ø¡ Ø§Ù„ØªØ±Ø¨ÙŠØ© ÙÙŠ ÙƒÙ„ Ù…Ù† Ø§Ù„Ù…Ø¤Ø³Ø³Ø§Øª Ø§Ù„ÙˆØ·Ù†ÙŠØ© Ø§Ù„Ø¹Ø§Ù„Ù…ÙŠØ© Ù„ÙƒÙŠ Ù†Ø¶ÙˆØº Ø±Ø¤ÙŠØªÙ†Ø§ ÙÙŠ Ø¥Ø·Ø§Ø± Ù‚ÙˆÙ…ÙŠ Ø§Ø¨Ø¯Ø§Ø¹ÙŠ ÙˆÙ…ÙˆØ§Ø¯ ØªØ¹Ù„ÙŠÙ…ÙŠÙ‡ ÙˆØ±Ù‚ÙŠØ© ÙˆØ±Ù‚Ù…ÙŠØ© ÙØ¹Ø§Ù„Ø©.\r\n\r\n', 'Free', 2, '2024-10-24 09:50:11', 1),
(11, 6, 'Ø§Ù„Ø¯Ø±Ø§Ø³Ø§Øª Ø§Ù„Ø§Ø¬ØªÙ…Ø§Ø¹ÙŠØ©', 'uploads/4.png', 'Ù…Ù† Ø®Ù„Ø§Ù„ Ù…Ø§Ø¯Ø© Ø§Ù„Ø¯Ø±Ø§Ø³Ø§Øª Ø§Ù„Ø§Ø¬ØªÙ…Ø§Ø¹ÙŠØ© Ù†Ø¹Ù…Ù„ Ø¹Ù„Ù‰ Ø§Ø­Ø¯Ø§Ø« Ù†Ù‚Ù„Ù‡ Ù†ÙˆØ¹ÙŠÙ‡ ÙÙŠ Ø·Ø±ÙŠÙ‚Ù‡ Ø§Ø¹Ø¯Ø§Ø¯ Ø·Ù„Ø§Ø¨ Ù…ØµØ± Ù„ÙŠÙƒÙˆÙ†ÙˆØ§ Ø´Ø¨Ø§Ø¨Ø§ Ù†Ø§Ø¬Ø­ÙŠÙ† ÙÙŠ Ù…Ø³ØªÙ‚Ø¨Ù„ Ù„Ø§ ÙŠÙ…ÙƒÙ†Ù†Ø§ Ø§Ù„ØªÙ†Ø¨Ø¤ Ø¨ØªÙØ§ØµÙŠÙ„Ù‡Ù¬ ÙˆØªØ­Ù‚ÙŠÙ‚ Ø§Ù„Ø­Ù„Ù… Ø§Ù„Ù…ØµØ±ÙŠ ÙÙŠ Ø§Ù„ØªØºÙŠÙŠØ± ÙƒÙ…Ø³Ø¤ÙˆÙ„ÙŠØ© Ù…Ø´ØªØ±ÙƒØ© Ø¨ÙŠÙ†Ù†Ø§ Ø¬Ù…ÙŠØ¹Ø§ Ù…Ù† Ù…Ø¤Ø³Ø³Ø§Øª Ø§Ù„Ø¯ÙˆÙ„Ø© ÙˆØ£ÙˆÙ„ÙŠØ§Ø¡ Ø§Ù„Ø£Ù…ÙˆØ±\r\n\r\nÙƒÙ…Ø§ ÙŠÙ…ÙƒÙ†Ù†Ø§ Ù…Ù† Ø®Ù„Ø§Ù„ Ø¯Ø±Ø§Ø³Ø© Ø§Ù„Ù…Ø§Ø¯Ø© Ù…Ø¹Ø±ÙØ© Ù…ÙˆÙ‚Ø¹ Ù…ØµØ± Ø¨Ø§Ù„Ù†Ø³Ø¨Ø© Ø¥Ù„Ù‰ Ø§Ù„Ø¹Ø§Ù„Ù… ÙˆØ¨ÙŠØ¦Ø§ØªÙ‡Ø§ Ø§Ù„Ù…Ø®ØªÙ„ÙØ© ÙˆÙ…Ø­Ø§ÙØ¸Ø§ØªÙ‡Ø§ ÙˆØ¹Ø§Ù„Ù…Ù‡Ø§ Ø¨Ø£Ø¹ÙŠØ§Ø¯Ù‡Ø§ Ø§Ù„Ù‚ÙˆÙ…ÙŠØ© ÙˆÙƒØ°Ù„Ùƒ Ù…Ø¹Ø±ÙØ© ÙƒÙŠÙ Ù†Ø­ÙŠØ§ Ø­ÙŠØ§Ø© Ù…Ø³ØªØ¯Ø§Ù…Ø© Ø¹Ù„Ù‰ Ø£Ø±Ø¶Ù‡', 'Free', 4, '2024-10-24 09:52:58', 1),
(12, 6, 'Ø§Ù„Ù„ØºØ© Ø§Ù„Ø¥Ù†Ø¬Ù„ÙŠØ²ÙŠØ©', 'uploads/17015221134734th primary_English.png', 'It supports the learnerâ€™s skills in self-expression through the integration of different language skills', 'Free', 3, '2024-10-24 10:36:10', 1),
(13, 6, 'Ø§Ù„Ù„ØºØ© Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©', 'uploads/7.png', 'Ø§Ù„ØºØ© Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© Ù„ÙŠØ³Øª Ù„ØºØ© Ø­ÙŠØ§Ø© Ù„ÙƒÙ†Ù‡Ø§ Ù„ØºÙ‡ Ø§Ù„Ø­ÙŠØ§Ù‡  ÙØªØ±ØªØ¨Ø· Ø§Ù„Ù„ØºÙ‡ Ø§Ù„Ø¹Ø±Ø¨ÙŠÙ‡ ÙÙŠ Ù…Ø­ØªÙˆØ§Ù‡Ø§ Ø§Ù„Ø­Ø§Ù„ÙŠ Ø¨Ø­ÙŠØ§Ø© Ø§Ù„ØªÙ„Ø§Ù…ÙŠØ° ÙˆÙŠØ¯Ø¹Ù… Ø¯Ø§ÙØ¹ÙŠØ© Ø§Ù„ØªÙ„Ø§Ù…ÙŠØ° ÙˆÙ†Ø´Ø§Ø·Ø§ØªÙ‡Ù… Ø§Ù„ØªÙŠ ØªÙƒÙÙ„ Ù„Ù‡Ù… Ø§Ù„Ù…Ø´Ø§Ø±ÙƒØ©  Ù†Ø­Ùˆ Ø§Ù„ØªØ¹Ù„Ù… ÙˆØ§Ù„ØªÙƒØ§Ù…Ù„ Ø¨ÙŠÙ† ÙÙ†ÙˆÙ† Ø§Ù„Ù„ØºØ© Ù…Ù† Ø­ÙŠØ« Ø§Ù„Ø§Ø³ØªÙ…Ø§Ø¹ ÙˆØ§Ù„ØªØ­Ø¯Ø« ÙˆØ§Ù„Ù‚Ø±Ø§Ø¡Ø© ÙˆØ§Ù„ÙƒØªØ§Ø¨Ø© ÙˆØªÙ†ÙˆÙŠØ¹ Ù…ØµØ§Ø¯Ø± Ø§Ù„ØªØ¹Ù„Ù…Ù¬ Ø­ÙŠØ« ØªØªØ¶Ù…Ù† Ø§Ù„Ù…Ø§Ø¯Ø© Ù…Ø­Ø§ÙˆØ± Ù‡Ø§Ù…Ø© Ù„Ø§ÙƒØªØ´Ø§Ù Ø§Ù„Ø°Ø§ØªÙ¬ ÙˆÙ…Ø¹Ø±ÙØ© Ø§Ù„Ø­Ù‚ÙˆÙ‚ ÙˆØ§Ù„ÙˆØ§Ø¬Ø¨Ø§Øª ÙˆØ§Ù„ØªØ¹Ø±Ù Ø¹Ù„Ù‰ Ø§Ù„Ø´Ø®ØµÙŠØ§Øª Ø§Ù„Ù…ØµØ±ÙŠØ© Ø§Ù„Ù…Ø¤Ø«Ø±Ø©Ù¬ ÙˆØ§ÙŠØ¶Ø§ Ø§Ù„Ø¹Ù„Ø§Ù‚Ø© Ù…Ø¹ Ø§Ù„Ø¢Ø®Ø±ÙŠÙ†Ù¬ ÙƒÙ…Ø§ ØªÙ†ÙˆØ¹Øª Ù…ÙˆØ¶ÙˆØ¹Ø§Øª Ø§Ù„Ù…Ø§Ø¯Ø© Ø¨ÙŠÙ† Ø§Ù„Ù†ØµÙˆØµ Ø§Ù„Ø´Ø¹Ø±ÙŠØ© ÙˆØ§Ù„Ø¢ÙŠØ§Øª Ø§Ù„Ù‚Ø±Ø¢Ù†ÙŠØ© ÙˆØ§Ù„Ø£Ø­Ø§Ø¯ÙŠØ« Ø§Ù„Ù†Ø¨ÙˆÙŠØ© ÙˆØ¯Ø±ÙˆØ³ Ø§Ù„Ù‚Ø±Ø§Ø¡Ø© ÙˆØ§Ù„Ù‚ØµØµ ØºØ§ÙŠØªÙ‡ ØªÙ‚Ø¯ÙŠÙ… ØªØ¹Ù„ÙŠÙ… Ø¬ÙŠØ¯ Ù„ÙƒÙ„ Ù…ØªØ¹Ù„Ù…\r\n\r\n', 'Free', 2, '2024-10-24 13:05:47', 1),
(14, 6, 'Ø§Ù„Ø¹Ù„ÙˆÙ…', 'uploads/10.png', 'ØªØ¹Ù„Ù… Ø§Ù„Ø¹Ù„ÙˆÙ… Ù…ØªØ¹Ø© ÙˆØ¨Ù‡Ø¬Ø© Ù…ØªØ¹ØªÙ‡Ø§ ÙÙŠ Ø§Ù„Ù‚ÙŠØ§Ù… Ø¨Ø¨Ø¹Ø¶ Ø§Ù„Ø£Ù†Ø´Ø·Ø© Ø§Ù„Ø¹Ù„Ù…ÙŠØ© Ø§Ù„Ø¨Ø³ÙŠØ·Ø© ÙˆØ¨Ù‡Ø¬ØªÙ‡Ø§ ÙÙŠÙ…Ø§ ÙŠÙ…ÙƒÙ† Ø§Ù„ÙˆØµÙˆÙ„ Ø¥Ù„ÙŠÙ‡ Ù…Ù† Ù†ØªØ§Ø¦Ø¬Ù¬ ÙØªØ¹Ù„Ù… Ø§Ù„Ø¹Ù„ÙˆÙ… ÙŠØ¹ØªÙ…Ø¯ Ø¹Ù„Ù‰ Ø§Ù„Ù…Ù„Ø§Ø­Ø¸Ø© ÙˆØ§Ù„ØªÙÙƒÙŠØ± ÙˆØ§Ù„ØªØ¬Ø±Ø¨Ø© ÙˆØ§Ø³ØªØ®Ù„Ø§Øµ Ø§Ù„Ù†ØªØ§Ø¦Ø¬ ÙˆÙ‚Ø¯ ØªÙ… Ø§Ø®ØªÙŠØ§Ø± Ø¹Ù†ÙˆØ§Ù† Ù„Ù‡Ø°Ø§ Ø§Ù„Ù…Ù†Ù‡Ø¬ ÙŠØ¹ÙƒØ³ ÙÙ„Ø³ÙØªÙ‡ ÙˆÙ‡Ùˆ (Ø§ÙƒØªØ´Ù ÙˆØªØ¹Ù„Ù…)', 'Free', 3, '2024-10-24 13:19:57', 1);

-- --------------------------------------------------------

--
-- بنية الجدول `logins`
--

CREATE TABLE `logins` (
  `login_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `login_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `success` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- إرجاع أو استيراد بيانات الجدول `logins`
--

INSERT INTO `logins` (`login_id`, `user_id`, `login_time`, `success`) VALUES
(1, 7, '2024-10-23 16:18:19', 1),
(2, 7, '2024-10-23 16:19:23', 1),
(3, 6, '2024-10-23 16:19:45', 1),
(4, 7, '2024-10-23 16:25:05', 1),
(5, 7, '2024-10-23 16:27:25', 1),
(6, 7, '2024-10-23 16:27:54', 1),
(7, 7, '2024-10-23 16:29:09', 1),
(8, 7, '2024-10-23 16:30:49', 1),
(9, 7, '2024-10-23 16:38:57', 1),
(10, 6, '2024-10-23 16:46:37', 1),
(11, 6, '2024-10-23 16:48:33', 1),
(12, 7, '2024-10-23 20:06:13', 1),
(13, 6, '2024-10-23 20:12:30', 1),
(14, 7, '2024-10-23 20:31:22', 1),
(15, 7, '2024-10-23 20:35:07', 1),
(16, 7, '2024-10-23 21:44:48', 1),
(17, 7, '2024-10-23 21:45:51', 1),
(18, 7, '2024-10-23 21:46:30', 1),
(19, 6, '2024-10-23 21:47:21', 1),
(20, 8, '2024-10-23 23:38:34', 1),
(21, 6, '2024-10-23 23:43:08', 1),
(22, 8, '2024-10-23 23:44:46', 1),
(23, 6, '2024-10-23 23:58:01', 1),
(24, 6, '2024-10-23 23:59:47', 1),
(25, 6, '2024-10-24 00:43:57', 1),
(26, 6, '2024-10-24 00:45:29', 1),
(27, 8, '2024-10-24 00:51:28', 1),
(28, 8, '2024-10-24 00:54:57', 1),
(29, 6, '2024-10-24 08:46:21', 0),
(30, 6, '2024-10-24 08:52:34', 0),
(31, 6, '2024-10-24 09:37:58', 1),
(32, 9, '2024-10-24 10:12:14', 1),
(33, 6, '2024-10-24 10:19:21', 0),
(34, 6, '2024-10-24 10:19:32', 0),
(35, 6, '2024-10-24 10:19:38', 0),
(36, 6, '2024-10-24 10:19:43', 0),
(37, 6, '2024-10-24 10:20:14', 0),
(38, 6, '2024-10-24 10:26:51', 1),
(39, 8, '2024-10-24 10:33:25', 1),
(40, 6, '2024-10-24 12:56:45', 1),
(41, 9, '2024-10-24 12:58:23', 1),
(42, 9, '2024-10-24 12:58:24', 1),
(43, 6, '2024-10-24 13:23:20', 0),
(44, 6, '2024-10-24 13:24:35', 1),
(45, 8, '2024-10-24 13:26:34', 1),
(46, 6, '2024-10-24 13:30:38', 1),
(47, 9, '2024-10-24 13:33:51', 1),
(48, 9, '2024-10-24 13:38:26', 0),
(49, 9, '2024-10-24 13:39:31', 0),
(50, 9, '2024-10-24 13:40:04', 0),
(51, 8, '2024-10-24 14:08:56', 1),
(52, 6, '2024-10-24 15:55:41', 1),
(53, 8, '2024-10-24 16:01:47', 1),
(54, 8, '2024-10-24 16:04:24', 1),
(55, 6, '2024-10-24 16:11:40', 0),
(56, 6, '2024-10-24 16:11:54', 1),
(57, 8, '2024-10-24 16:20:10', 1),
(58, 6, '2024-10-24 16:23:48', 1),
(59, 8, '2024-10-24 16:30:32', 1),
(60, 6, '2024-10-24 17:22:46', 1),
(61, 13, '2024-10-24 17:29:35', 1);

-- --------------------------------------------------------

--
-- بنية الجدول `material`
--

CREATE TABLE `material` (
  `mid` int(11) NOT NULL,
  `material` text NOT NULL,
  `inname` varchar(50) NOT NULL,
  `number` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- إرجاع أو استيراد بيانات الجدول `material`
--

INSERT INTO `material` (`mid`, `material`, `inname`, `number`, `course_id`) VALUES
(4, ' https://madrasetnaplus.eg/s3/gen/6339320139112_720.mp4', 'Ø§Ù„Ø¯Ø±Ø³ Ø§Ù„Ø§ÙˆÙ„ ÙÙŠ Ø§Ù„Ù„ØºØ© Ø§Ù„Ø¥Ù†Ø¬Ù„', 1, 12),
(5, ' https://madrasetnaplus.eg/s3/gen/6339129851112_720.mp4', 'Ø§Ù„Ù„ØºØ© Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©', 7, 13),
(6, ' https://madrasetnaplus.eg/s3/gen/832c6fd5-2145-444a-aa73-e069ff173951.mp4', 'Ø§Ù„Ø¯Ø±Ø§Ø³Ø§Øª Ø§Ù„Ø§Ø¬ØªÙ…Ø§Ø¹ÙŠØ©', 8, 11),
(7, ' https://madrasetnaplus.eg/s3/gen/9eecb046-98b1-4f69-a498-870c044c9a2d.mp4', 'math', 9, 9),
(8, ' https://madrasetnaplus.eg/s3/gen/5f29eeb1-9cac-441e-b0c7-1831e6fcca53.mp4', 'Science', 10, 8),
(9, ' https://madrasetnaplus.eg/s3/gen/1621afb5-e5d4-4ccb-bd06-e66e2249e9dc.mp4', 'Ø§Ù„Ø¹Ù„ÙˆÙ…', 11, 14),
(10, ' https://madrasetnaplus.eg/s3/gen/6339437563112_720.mp4', 'ict', 12, 10),
(11, ' https://madrasetnaplus.eg/s3/gen/6339537519112_720.mp4', 'ict', 13, 10),
(12, ' https://madrasetnaplus.eg/s3/gen/832c6fd5-2145-444a-aa73-e069ff173951.mp4', 'Ø§Ù„Ø¯Ø±Ø§Ø³Ø§Øª Ø§Ù„Ø§Ø¬ØªÙ…Ø§Ø¹ÙŠØ©', 14, 11),
(13, ' https://madrasetnaplus.eg/s3/gen/1111cfc2-1636-4d56-9329-7cd5e81c56ec.mp4', 'Ø§Ù„Ø¯Ø±Ø§Ø³Ø§Øª Ø§Ù„Ø§Ø¬ØªÙ…Ø§Ø¹ÙŠØ©', 15, 11),
(14, ' https://madrasetnaplus.eg/s3/gen/832c6fd5-2145-444a-aa73-e069ff173951.mp4', 'Ø§Ù„Ø¯Ø±Ø§Ø³Ø§Øª Ø§Ù„Ø§Ø¬ØªÙ…Ø§Ø¹ÙŠØ©', 16, 11),
(15, ' https://madrasetnaplus.eg/s3/gen/4faa3550-a6ef-4a26-918f-42c9ecc31fc2.mp4', 'math', 17, 9),
(16, ' https://madrasetnaplus.eg/s3/gen/1fa59a49-bf7e-47d1-893c-d55af1955030.mp4', 'math', 18, 9),
(17, ' https://madrasetnaplus.eg/s3/gen/e3677d6e-68b3-46f0-8eb2-f40833f4233a.mp4', 'Science', 18, 8),
(18, ' https://madrasetnaplus.eg/s3/gen/361f026e-81d6-4ced-9ab0-c97a372332a8.mp4', 'Ø§Ù„Ø¹Ù„ÙˆÙ…', 19, 14),
(19, ' https://madrasetnaplus.eg/s3/gen/b1c3c79c-69d5-44dd-92a6-fa67de2cc2ae.mp4', 'Ø§Ù„Ø¹Ù„ÙˆÙ…', 20, 14),
(20, ' https://madrasetnaplus.eg/s3/gen/6339600922112_720.mp4', 'Ø§Ù„Ù„ØºØ© Ø§Ù„Ø§Ù†Ø¬Ù„ÙŠØ²ÙŠØ©', 22, 12),
(21, ' https://madrasetnaplus.eg/s3/gen/6339431728112_720.mp4', 'Ø§Ù„Ù„ØºØ© Ø§Ù„Ø§Ù†Ø¬Ù„ÙŠØ²ÙŠØ©', 22, 12),
(22, ' https://madrasetnaplus.eg/s3/gen/6339240250112_720.mp4', 'Ø§Ù„Ù„ØºØ© Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©', 23, 13);

-- --------------------------------------------------------

--
-- بنية الجدول `progress`
--

CREATE TABLE `progress` (
  `progress_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `lesson_number` int(11) NOT NULL,
  `completed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- إرجاع أو استيراد بيانات الجدول `progress`
--

INSERT INTO `progress` (`progress_id`, `course_id`, `user_id`, `lesson_number`, `completed_at`) VALUES
(9, 8, 9, 0, '2024-10-24 10:25:45'),
(10, 8, 8, 0, '2024-10-24 10:25:50'),
(11, 9, 9, 0, '2024-10-24 10:25:52'),
(12, 11, 9, 0, '2024-10-24 10:26:19'),
(13, 10, 9, 0, '2024-10-24 10:26:49'),
(14, 12, 8, 0, '2024-10-24 10:39:41'),
(15, 12, 9, 0, '2024-10-24 12:58:56'),
(16, 13, 9, 0, '2024-10-24 13:10:07'),
(17, 14, 9, 0, '2024-10-24 13:22:26'),
(18, 14, 8, 0, '2024-10-24 13:29:30'),
(19, 13, 8, 0, '2024-10-24 13:29:52'),
(20, 9, 8, 0, '2024-10-24 14:07:51'),
(21, 10, 8, 0, '2024-10-24 14:11:16'),
(22, 11, 8, 0, '2024-10-24 14:11:38'),
(23, 8, 13, 0, '2024-10-24 17:29:56');

-- --------------------------------------------------------

--
-- بنية الجدول `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `full_username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `role` enum('teacher','student') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- إرجاع أو استيراد بيانات الجدول `users`
--

INSERT INTO `users` (`user_id`, `username`, `full_username`, `password`, `email`, `phone`, `role`, `created_at`) VALUES
(6, 'Abanoub', 'Abanoub', 'Abanoub123', 'Abanoub@gmail.com', '01012345678', 'teacher', '2024-10-13 20:17:54'),
(7, 'Marco', 'Marco', 'Marco', 'Marco', '01321216546', 'student', '2024-10-13 21:33:41'),
(8, '01063353900', 'Samaan Nady boles', '01063353900', 'samaannady68@gmail.com', '01270085151', 'student', '2024-10-23 23:38:27'),
(9, 'dekeshy', 'dekeshy', '123456789', 'dekeshy@gmail.com', '01222180530', 'student', '2024-10-24 10:11:24'),
(13, '01270085154', 'Ø³Ù…Ø¹Ø§Ù† Ù†Ø§Ø¯ÙŠ', '01270085154', 'samaannady78@gmail.com', '01270085151', 'student', '2024-10-24 17:29:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `logins`
--
ALTER TABLE `logins`
  ADD PRIMARY KEY (`login_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `material`
--
ALTER TABLE `material`
  ADD PRIMARY KEY (`mid`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `progress`
--
ALTER TABLE `progress`
  ADD PRIMARY KEY (`progress_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `logins`
--
ALTER TABLE `logins`
  MODIFY `login_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `material`
--
ALTER TABLE `material`
  MODIFY `mid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `progress`
--
ALTER TABLE `progress`
  MODIFY `progress_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- قيود الجداول المحفوظة
--

--
-- القيود للجدول `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- القيود للجدول `logins`
--
ALTER TABLE `logins`
  ADD CONSTRAINT `logins_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- القيود للجدول `material`
--
ALTER TABLE `material`
  ADD CONSTRAINT `material_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

--
-- القيود للجدول `progress`
--
ALTER TABLE `progress`
  ADD CONSTRAINT `progress_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  ADD CONSTRAINT `progress_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
