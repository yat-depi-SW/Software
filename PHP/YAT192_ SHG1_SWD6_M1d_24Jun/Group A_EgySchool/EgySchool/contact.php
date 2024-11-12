
<?php 
include('menu.php');
include('con2.php');

include('co2.php');

if($_SESSION['type'] == 'student'){
    header('Location: index.php');

}elseif($_SESSION['type'] == 'teacher'){

}
?>
    <div class="content">
        <div class="titleinfo">
            <p>board</p>
            <i class="fas fa-chart-bar"></i>
        </div>
        <div class="datainfo">
            <div class="box">
                <i class="fas fa-user"></i>
                <div class="data">
                    <p>user</p>
                    <span><?php 
                    $sql="select * from users where role not in ('teacher')";
                    $e=mysqli_query($conn ,$sql);
                    $q=mysqli_num_rows($e);
                   echo $q; 
                    ?> </span>
                </div>
            </div>
            
            <div class="box">
                <i class="fas fa-table"></i>
                <div class="data">
                    <p>course</p>
                    <span><?php 
                    $sql="select * from courses where user_id =$_SESSION[user_id]";
                    $e=mysqli_query($conn ,$sql);
                    $q=mysqli_num_rows($e);
                   echo $q; 
                    ?> </span>                </div>
            </div>

        </div>
       
    </div>
</body>
</html>