<!-- 
<?php
//include('menu.php');?>
    <div class="content">
        <center>
    <form action="uploadcon.php" method="POST" enctype="multipart/form-data">
        <h3>انشاء مادة</h3>
        <fieldset><legend>المادة</legend> 
            <input type="text" name="coursename" placeholder="Course Name"  required>
        </fieldset> 
    
    
        <fieldset><legend>صورة المادة</legend> 
        <label for="avatar">رفع الصورة</label>
            <input type="file" id="avatar" style="display: none;" name="course" >
        </fieldset> 
    
    
        <fieldset><legend>الوصف</legend>
            <textarea id="" rows="10" cols="50" required name="description"></textarea>
        </fieldset>
    

    <input type="submit" value="Submit">
    <input type="reset" value="Reset">
    </form>
    </center>
</div>
</body>
</html> -->


<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>إنشاء مادة</title>
</head>
<body>
    <?php 
    include('menu.php');
    include('con2.php');

    
    $query = "SELECT * FROM courses";
    $result = mysqli_query($conn, $query);
    ?>
    
    <div class="content">
        <center>
            <form action="uploadconMa.php" method="POST" enctype="multipart/form-data">
                <h3>إنشاء مادة</h3>
                
                <fieldset>
                    <legend>اسم المادة</legend> 
                    <input type="text" name="coursename" placeholder="Course Name" required>
                </fieldset> 

                <fieldset>
                <legend>رابط الفيديو</legend> 

                    <input type="url" name="matrial" id="">
        
                </fieldset> 

                <fieldset>
                    <legend>رقم الفديو</legend>
                    <input type="number" name="number" min="1" required placeholder="number" id="">
                </fieldset>

                <fieldset>
                    <legend>الكورس المرتبط</legend>
                    <select name="course_id" required style="color: black;">
                        <option value="">اختر الكورس</option>
                        
                        <?php 
                       
                        while ($row = mysqli_fetch_assoc($result)) {
                            echo "<option value='{$row['course_id']}'> {$row['title']}</option>";
                        }
                        ?>
                    </select>
                </fieldset>

                <input type="submit" value="Submit">
                <input type="reset" value="Reset">
            </form>
        </center>
    </div>
</body>
</html>


    