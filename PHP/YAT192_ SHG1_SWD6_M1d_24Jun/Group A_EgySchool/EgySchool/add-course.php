<?php
include('con2.php');
$rd=$_SESSION['user_id'];
$title = $_POST['coursename'];
$description = $_POST['description'];
$price = $_POST['price'];
$availability = $_POST['availability'];
$uploads_dir = 'uploads'; // استخدام __DIR__ للإشارة إلى المجلد الحالي

if (isset($_FILES['course']) && $_FILES['course']['error'] == UPLOAD_ERR_OK) {
    $tmp_name = $_FILES['course']['tmp_name'];
    $name = basename($_FILES['course']['name']);
    $upload_file_path = $uploads_dir . '/' . $name; // إنشاء المسار الكامل للملف

    // التحقق من أن المجلد موجود وإذا لم يكن موجودًا، إنشاؤه
    if (!is_dir($uploads_dir)) {
        mkdir($uploads_dir, 0777, true); // إنشاء المجلد بصلاحيات كاملة
    }

    if (move_uploaded_file($tmp_name, $upload_file_path)) {
        $photo_path = $upload_file_path;
        echo "تم رفع الصورة بنجاح.";
    } else {
        echo "حدث خطأ أثناء رفع الملف.";
    }
} else {
    echo "لم يتم رفع الملف.";
}
$sql = "INSERT INTO courses ( user_id, title,photo,`description`, price,St_c) 
        VALUES ($rd, '$title', '$photo_path', '$description', '$price', '$availability')";

$q = mysqli_query($conn, $sql);

if ($q) {
    echo "
    <center>
    <p style='background-color:red; color:white; width:52%; font-size:19px;'>تم التسجيل</p>
    </center>
    ";
    header('Refresh:1; url=contact.php');
    exit;
} else {
    echo 'لم يتم التسجيل';
}

mysqli_close($conn);
?>
