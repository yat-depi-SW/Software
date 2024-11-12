<?php
include('con2.php');
if(@$_SESSION['username'] == '' &&  @$_SESSION['password'] == ''){

}else{
    if($_SESSION['type']=='student'){
        header('Location: index.php');

    }
    if($_SESSION['type'] == 'teacher'){
        header('Location: contact.php');
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تسجيل الدخول</title>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="stylesheet" href="Untitled-1.css">
    <style>
        <?php 
        if (isset($_SESSION['errorlogin'])) { 
            ?>
            .err {
                background-color: #9b0f0fde;
                color: white;
                width: 100%;
                text-align: center;
                padding: 10px;
                border-radius: 5px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            <?php
        }
        ?>
    </style>
</head>
<body>
    <form action="#" method="post">
        <h3>Log in</h3>
        <br>
        <?php 
        if (isset($_SESSION['errorlogin'])) { 
            ?>
            <label class="err">
                <?php
                echo $_SESSION['errorlogin'];
                unset($_SESSION['errorlogin']);
                ?>
            </label>
            <?php 
        } 
        ?>
        <fieldset>
            <legend>Username</legend>
            <input type="text" placeholder="UserName" name="username" required><br>
        </fieldset>
        <fieldset>
            <legend>Password</legend>
            <input type="password" placeholder="Password" name="Password" required><br>
        </fieldset><br>
        <input type="submit" name="submit" value="تسجيل الدخول">
        <div dir="rtl">
            <label for="">هل تريد انشاء حساب ؟ <a href="Sign_up.php">انشاء حساب</a></label>
        </div>
    </form>
    
    <?php
    if (isset($_POST['submit'])) { 
        $username = $_POST['username'];
        $password = $_POST['Password'];
        $sql = "SELECT * FROM users where username='$username' or password='$password'";
        $q = mysqli_query($conn, $sql);
        $check = false;
        while ($row = mysqli_fetch_array($q)) {
            $r0 = $row['user_id'];
            $r1 = $row['username'];
            $r2 = $row['password'];
            $r3 = $row['role'];
            $r4 = $row['type_id'];

            if ($username == $r1 && $password == $r2 && $r3 == 'teacher') {
                $_SESSION['user_id']=$r0;
                $_SESSION['username']=$r1;
                $_SESSION['password']=$r2;
                $_SESSION['type']='teacher';
                $check = true;
                header('Location: contact.php');
                $sd="INSERT into logins (user_id,success)values ($r0,1)";
                $q2 = mysqli_query($conn, $sd);
            } else if ($username == $r1 && $password == $r2 && $r3 == 'student') {
                $_SESSION['user_id']=$r0;
                $_SESSION['username']=$r1;
                $_SESSION['password']=$r2;
                $_SESSION['type']='student';
                $check = true;
                header('Location: index.php');
                $sd="INSERT into logins (user_id,success)values ($r0,1)";
                $q2 = mysqli_query($conn, $sd);
            }
        }
        if (!$check) {
            $_SESSION["errorlogin"] = "تأكد من صحة البيانات";
            header('Location: Login.php');
            $sd="INSERT into logins (user_id,success)values ($r0,0)";
            $q2 = mysqli_query($conn, $sd);
            exit();
        }
    }
    ?>
</body>
</html>
