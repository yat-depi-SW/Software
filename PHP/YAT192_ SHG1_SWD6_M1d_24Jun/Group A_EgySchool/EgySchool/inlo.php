<?php 
session_start();
   if(isset($_POST['submit'])){
   $username=$_POST['username'];
   $password=$_POST['Password'];
   $teacher='teacher';
   $student='student';   
   $sql="select * from users";
   $q=mysqli_query($conn,$sql);
   while($row=mysqli_fetch_array($q)){
    $r1=$row['username'];
    $r2=$row['password'];
    $r3=$row['role'];
   }
   if($username == $r1 && $password == $r2){
    if($r3 == $teacher){
        header('location:contact.php');
}
if($r3 == $student){
    header('location:contact2.php');
    }
   }else{
    $_SESSION["errorlogin"]="تاكد من صحة البيانات";
    header('location:Login.php');
   }}
?>