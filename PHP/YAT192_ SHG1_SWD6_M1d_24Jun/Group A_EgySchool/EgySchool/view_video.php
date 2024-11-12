<?php   

?>
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تصميم عرض فيديو مثل يوتيوب</title>
    <style>
        * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
}


.video-card {
    margin-top:50px ;
    width: 90%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease-in-out;
}

.video-card:hover {
    transform: scale(1.05);
}

.video-thumbnail {
    width: 100%;
}

.video-info {
    padding: 15px;
    text-align: right; /* لجعل النصوص من اليمين لليسار */
}

.video-title {
    font-size: 1.1rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.episode-number {
    font-size: 0.9rem;
    color: #555;
    background-color: #f0f0f0;
    padding: 5px;
    border-radius: 4px;
    display: inline-block;
}

video {
    width: 100%;
    height: auto;
    border-bottom: 1px solid #eee;
}

    </style>
    <link rel="stylesheet" href="styles.css">   
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
</head>
<body>

    <header class="header">
        <nav>
            <ul>
                <li><a href="index.php" class="animate__animated animate__fadeIn">الرئيسية</a></li>
                <li><a href="logout.php" class="animate__animated animate__fadeIn">تسجيل الخروج</a></li>
            </ul>
        </nav>
    </header>
    <center>
<div class="gg">
    <?php 
    include('con2.php');

    // استعلام لجلب تفاصيل الدورة
    if (isset($_GET['course_id'])) {
        $course_id = $_GET['course_id'];
$sql="select * from material where course_id= $course_id";
$q=mysqli_query($conn,$sql);
while($row = mysqli_fetch_array($q)){


    
    ?>
    <div class="video-card">
        <div class="video-thumbnail">
            <!-- إضافة iframe لعرض فيديو من يوتيوب -->
            <iframe width="350" height="300" 
                    src="<?php echo $row['material'];?>" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
            </iframe>
        </div>
        <div class="video-info">
            <h3 class="video-title"><?php echo $row['inname'];?></h3>
            <span class="episode-number">الحلقة رقم: <?php echo $row['number'];?></span>
        </div>
    </div>
<?php 
$qq=mysqli_num_rows($q);
$sql2="UPDATE `courses` SET `num_lessons`='$qq' where course_id= $course_id ";
$r=mysqli_query($conn,$sql2);
}
}
?>
</div></center>
</body>
</html>


</body>
</html>
