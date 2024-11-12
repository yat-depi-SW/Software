
<?php 
include('con2.php');
$course_id=$_POST['uii'];
if(isset($_POST['submit2'])){
    $sql2="INSERT into progress (course_id,user_id,lesson_number) values ($course_id,$_SESSION[user_id],0)";
    $result = mysqli_query($conn,$sql2);
    if($result){
        header("Refresh:1; url=index.php");
        unset($_SESSION['coursss']);
echo"تم التسجيل في الكورس";

    }
}

?>
   