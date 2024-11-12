<?php
$servername = "localhost"; // اسم الخادم
$username = "root"; // اسم المستخدم لقاعدة البيانات
$password = ""; // كلمة مرور قاعدة البيانات
$dbname = "course_platform"; // اسم قاعدة البيانات

// إنشاء اتصال
$conn = mysqli_connect($servername,$username,$password,$dbname);

if ($conn->connect_error) {
die("فشل الاتصال: " . $conn->connect_error);
}
session_start();
?>