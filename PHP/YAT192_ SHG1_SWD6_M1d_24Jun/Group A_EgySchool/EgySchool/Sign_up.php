<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link rel="stylesheet" href="Untitled-1.css">
</head>
<body>
    <form action="conniction.php" method="post" dir="rtl">
        <h3>Sign in</h3>
        <fieldset>
            <legend>الاسم ثلاثي</legend>
            <input id="n" type="text" placeholder="FullName" name="full_name" required>
        </fieldset>
        <fieldset>
            <legend>اسم المستخدم</legend>
            <input id="n" type="text" placeholder="UserName" name="username" required>
        </fieldset>
        
        <fieldset>
        <legend>الباسورد</legend>
        <input id="p" type="password" placeholder="Password" name="password"required minlength="8">
    </fieldset>
<fieldset>
    <legend>الايميل</legend>
    <input id="a" type="email" placeholder="Email" name="email"required>
</fieldset>
<fieldset>
    <legend>الهاتف</legend>
 <input type="tel" name="Phone" minlength="11"
 maxlength="11"placeholder="Phone" id="" dir="rtl">
</fieldset>
        <input type="submit" value="حفظ">
        <input type="reset" value="الغاء">   
        <div dir="rtl">
            <label for="">هل لديك حساب ؟ <a href="Login.php">تسجيل الدخول</a></label>
        </div>
    </form>
</body>
</html>