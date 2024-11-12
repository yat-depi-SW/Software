<?php
include('menu.php');
include('con2.php');
?>
<div class="content">
    <center>
        <div class="titleinfo">
            <p>الكورسات</p>
            <i class="fas fa-chart-bar"></i>
        </div>
        <table border="1">
            <thead>
                <tr>
                    <th>رقم الكورس</th>
                    <th>اسم المستخدم</th>
                    <th>عنوان الكورس</th>
                    <th>صورة الكورس</th>
                    <th>وصف الكورس</th>
                    <th>سعر الكورس</th>
                    <th>عدد الدروس</th>
                    <th>تاريخ الإنشاء</th>
                </tr>
            </thead>
            <tbody>
                <?php
              
                $query = "SELECT * 
                          FROM courses , users where courses.user_id = users.user_id
                         ";
                $result = mysqli_query($conn, $query);

                if (mysqli_num_rows($result) > 0) {
                    while ($row = mysqli_fetch_assoc($result)) {
                        echo "<tr>";
                        echo "<td>" . $row['course_id'] . "</td>"; // رقم الكورس
                        echo "<td>" . $row['full_username'] . "</td>"; // رقم المستخدم
                        echo "<td>" . $row['title'] . "</td>"; // عنوان الكورس
                        echo "<td><img src='" . $row['photo'] . "' alt='" . $row['title'] . "' style='width:100px;height:auto;'></td>"; // صورة الكورس
                        echo "<td>" . $row['description'] . "</td>"; // وصف الكورس
                        echo "<td>" . $row['price'] . " LE</td>"; // سعر الكورس
                        echo "<td>" . $row['num_lessons'] . "</td>"; // عدد الدروس
                        echo "<td>" . $row['created_at'] . "</td>"; // تاريخ الإنشاء (make sure to fetch created_at if it's in courses)
                        echo "</tr>";
                    }
                } else {
                    echo "<tr><td colspan='8'>لا توجد كورسات متاحة.</td></tr>";
                }
                ?>
            </tbody>
        </table>
    </center>
</div>
</body>
</html>
