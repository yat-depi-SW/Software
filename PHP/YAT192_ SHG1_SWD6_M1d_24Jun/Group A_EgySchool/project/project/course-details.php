<?php
include('con2.php');

// استعلام لجلب تفاصيل الدورة
if (isset($_GET['course_id'])) {
    $course_id = $_GET['course_id'];
    $sql = "SELECT * FROM courses WHERE course_id = $course_id";
    $result = mysqli_query($conn,$sql);
    
    if ($result->num_rows > 0) {
        $course = $result->fetch_assoc();
    } else {
        die("الدورة غير موجودة.");
    }
} else {
    die("مطلوب معرف الدورة.");
}

$conn->close(); // إغلاق الاتصال
?>

<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $course['title']; ?></title>
    <link rel="stylesheet" href="styles.css">
    <style>
        body {
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    margin: 0;
    padding: 0;
}

header {
    background-color: #007bff;
    color: #fff;
    padding: 20px;
    text-align: center;
}

h1 {
    margin: 0;
}

nav {
    margin-top: 10px;
}

nav ul {
    list-style: none;
    padding: 0;
}

nav ul li {
    display: inline;
    margin: 0 15px;
}

nav a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
}

nav a:hover {
    text-decoration: underline;
}

main {
    padding: 20px;
    max-width: 800px;
    margin: 20px auto;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
    color: #333;
    margin-bottom: 10px;
}

h3 {
    color: #555;
    margin-top: 20px;
}

p {
    line-height: 1.6;
    color: #444;
}

ul {
    list-style: none;
    padding: 0;
}

button {
    padding: 10px 15px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 20px;
}

button:hover {
    background-color: #0056b3;
}

footer {
    text-align: center;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    position: relative;
    bottom: 0;
    width: 100%;
    margin-top: 20px;
}

    </style>
</head>
<body>
    <header>
        <h1>منصة التعليم الإلكتروني</h1>
        <nav>
            <ul>
                <li><a href="index.php">الرئيسية</a></li>
                <li><a href="courses.php">الدورات</a></li>
                <li><a href="about.php">من نحن</a></li>
                <li><a href="contact.php">اتصل بنا</a></li>
                <li><a href="faq.php">الأسئلة الشائعة</a></li>
                <li><a href="featured.php">الدورات المميزة</a></li>
                <li><a href="admin-dashboard.php">لوحة التحكم</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <h2><?php echo $course['title']; ?></h2>
        <p><?php echo $course['description']; ?></p>
        <h3>مدة الدورة</h3>
        <p><?php echo $course['price']; ?></p>
        <h3>المواد التعليمية</h3>
        <ul>
            <!-- يمكنك إضافة الدروس هنا -->
        </ul>
        <button>تسجيل</button>
    </main>
    <footer>
        <p>حقوق الطبع والنشر &copy; 2024 منصة التعليم الإلكتروني</p>
    </footer>
</body>
</html>
