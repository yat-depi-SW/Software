<?php
include('con2.php');


    $sql = "SELECT * FROM courses WHERE user_id=$_SESSION[user_id]";
    $result = mysqli_query($conn,$sql);


// استعلام لجلب تفاصيل الدورة

   
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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الصفحة الرئيسية - منصة التعليم الإلكتروني</title>
    <link rel="stylesheet" href="styles.css">
   
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
</head>
<body>

    <header class="header">
        <nav>
            <ul>
            <li><a href="index.php" class="animate__animated animate__fadeIn">الرئيسية</a></li>
                <li><a href="course-details2.php" class="animate__animated animate__fadeIn">الدورات</a></li>
                <li><a href="login.php" class="animate__animated animate__fadeIn">تسجيل الخروج</a></li>
            </ul>
        </nav>
    </header>

    <?php 
    
    $sql = "SELECT * FROM courses ";
    $result = mysqli_query($conn,$sql);
   
    while($course=mysqli_fetch_assoc( $result)){
        
   

    ?>
    <main>
        <h2><?php echo $course['title']; ?></h2>
        <p><?php echo $course['description']; ?></p>
        <h3>مدة الدورة</h3>
        <p><?php echo $course['price']; ?></p>
        <h3>المواد التعليمية</h3>
        <ul>
            <!-- يمكنك إضافة الدروس هنا -->
        </ul>
 
  
    <button onclick="location.href='view_video.php?course_id=<?php echo $course['course_id']; ?>"  name="submit2">تسجيل في الكورس</button>
   
    </main>
    <?php 
     }
     $conn->close(); // إغلاق الاتصال

     ?>
    <footer>
        <p>حقوق الطبع والنشر &copy; 2024 منصة التعليم الإلكتروني</p>
    </footer>
</body>
</html>
