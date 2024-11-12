<?php


include('menu.php');
include('con2.php');



if ($_SERVER['REQUEST_METHOD'] == 'POST') {
   
    $coursename = $_POST['coursename'];
    $description = $_POST['number'];
    $course_id =  $_POST['course_id'];
    $matrial = $_POST['matrial'] ;
    
    
  
        $sql = "INSERT INTO `material` (`material`, `course_id`, `inname`, `number`) 
                VALUES (' $matrial', $course_id, '$coursename', $description)";

        if (mysqli_query($conn, $sql)) {
            header("Refresh:1; url=matrial.php");

            echo "<p style='color: green;'>تم إدخال المادة بنجاح!</p>";
        } else {
            echo "<p style='color: red;'>خطأ: " . mysqli_error($conn) . "</p>";
        }
     }

mysqli_close($conn);
?>
