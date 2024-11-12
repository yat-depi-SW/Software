<?php

include('con2.php');
include('co2.php');

if($_SESSION['type'] == 'student'){
}else
       if($_SESSION['type'] == 'teacher'){
    header('Location: contact.php');
}





?>

<!DOCTYPE html>
<html lang="ar">
<head>
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
            </ul>
        </nav>
    </header>

   
    <section class="hero animate__animated animate__fadeIn">
        <h1>مرحبا بكم في منصة التعليم الإلكتروني</h1>
        <p>تعلم مهارات جديدة، طور مستقبلك مع دورات متنوعة.</p>
        <?php   if(!$_SESSION['username'] &&  !$_SESSION['password']){


  ?>
        <a href="login.php" class="btn animate__animated animate__bounce">ابدأ الآن</a>
    <?php   
    
} else{

   ?>
           <a href="logout.php" class="btn animate__animated animate__bounce">تسجيل الخروج</a>

   <?php
    }
    ?>
    </section>

    <section class="courses">
        <h2 class="animate__animated animate__fadeInUp">الدورات المتاحة</h2>
        <div class="course-list">
            <?php
            
            $query = "SELECT `course_id`, `title`, `photo`, `description`, `price`, `num_lessons` 
                      FROM `courses` 
                     ";
            $result = mysqli_query($conn, $query);

           
            if (mysqli_num_rows($result) > 0) {
              
                while ($row = mysqli_fetch_assoc($result)) {
                    echo "<div class='course animate__animated animate__fadeIn'>";
                    echo "<img src='" . $row['photo'] . "' alt='" . $row['title'] . "'>";
                    echo "<h3>" . $row['title'] . "</h3>";
                    echo "<p>" . $row['description'] . "</p>";
                    echo "<p class='price'>السعر: $" . $row['price'] . "</p>";
                    echo "<p class='lessons'>عدد الدروس: " . $row['num_lessons'] . "</p>";
                    echo "<a href='course-details.php?course_id=" . $row['course_id'] . "' class='btn'>عرض الدورة</a>";
                    echo "</div>";
                }
            } else {
                echo "<p>لا توجد كورسات متاحة لك حاليًا.</p>";
            }
            ?>
        </div>
    </section>

    <!-- قسم التواصل -->
    <!-- <section class="contact">
        <h2 class="animate__animated animate__fadeInUp">تواصل معنا</h2>
        <form class="animate__animated animate__fadeIn">
            <input type="text" placeholder="اسمك">
            <input type="email" placeholder="بريدك الإلكتروني">
            <textarea placeholder="رسالتك"></textarea>
            <button type="submit" class="btn">إرسال</button>
        </form>
    </section>

    الفوتر 
    <footer class="footer">
        <p>&copy; 2024 منصة التعليم الإلكتروني. جميع الحقوق محفوظة.</p>
    </footer>

     ملف الجافا سكريبت 
    <script src="scripts.js"></script>-->

</body>
</html>
