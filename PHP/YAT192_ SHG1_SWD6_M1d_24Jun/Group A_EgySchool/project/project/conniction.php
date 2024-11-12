<?php
include('con2.php');

// الحصول على البيانات من النموذج
$user_name = $_POST['username'];
$full_user_name=$_POST['full_name'];
$password = $_POST['password'];
$email = $_POST['email'];
$phone = $_POST['Phone'];
// $num_lessons = $_POST['num_lessons'];

$sql= "INSERT INTO users (username,full_username,password,email,phone,role) 
VALUES ('$user_name','$full_user_name','$password','$email','$phone','student')";
$q = mysqli_query($conn,$sql);

if($q){
 echo"
<center>
<p style='backgroud:red; color:white; width:52%; font-size:19px;'>تم التسجيل</p>
</center>
";
header('Refresh:1; url=Login.php'); // دا بعد ثانيه يحوله الي صفحة تسجيل الدخول
exit;
}
else{
echo 'لم يتم التسجيل';
}
$exit=mysqli_close($conn);
?>