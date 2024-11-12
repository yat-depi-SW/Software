
<?php
include('menu.php');
?>
    <div class="content">
        <center>
    <form action="add-course.php" method="POST" enctype="multipart/form-data">
        <h3>انشاء كورس</h3>
        <fieldset><legend>اسم الكورس</legend> 
            <input type="text" name="coursename" placeholder="Course Name"  required>
        </fieldset> 
    
    
        <fieldset><legend>صورة الكورس</legend> 
        <label for="avatar">رفع الصورة</label>
            <input type="file" id="avatar" style="display: none;" name="course" >
        </fieldset> 
    
    
        <fieldset><legend>السعر</legend>
            <input type="number" name="price" placeholder="Price"  required>
        </fieldset>
    
        <select name="availability" id="availability" required>
            <option value="">اختر نوع الكورس</option>
            <option value="1">متاح</option>
            <option value="0">غير متاح</option>
        </select>
    
        <fieldset><legend>الوصف</legend>
            <textarea id="" rows="10" cols="50" required name="description"></textarea>
        </fieldset>
    

    <input type="submit" value="Submit">
    <input type="reset" value="Reset">
    </form>
    </center>
</div>
</body>
</html>

    