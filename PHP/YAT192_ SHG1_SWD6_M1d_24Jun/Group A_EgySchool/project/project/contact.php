
<?php 
session_start();
include('menu.php');
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
                    <span>90</span>
                </div>
            </div>
            <div class="box">
                <i class="fas fa-pen"></i>
                <div class="data">
                    <p>posts</p>
                    <span>25</span>
                </div>
            </div>
            <div class="box">
                <i class="fas fa-table"></i>
                <div class="data">
                    <p>products</p>
                    <span>30</span>
                </div>
            </div>
            <div class="box">
                <i class="fas fa-dollar"></i>
                <div class="data">
                    <p>revenue</p>
                    <span>1000</span>
                </div>
            </div>
        </div>
        <div class="titleinfo">
            <p>products</p>
            <i class="fas fa-table"></i>
        </div>
        <table>
            <thead>
                <tr>
                    <th>products</th>
                    <th>price</th>
                    <th>Count</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>math</td>
                    <td><span class="price">$20</span></td>
                    <td><span class="count">$80</span></td>
                </tr>
                <tr>
                    <td>english</td>
                    <td><span class="price">$25</span></td>
                    <td><span class="count">$150</span></td>
                </tr>
                <tr>
                    <td>accounting</td>
                    <td><span class="price">$30</span></td>
                    <td><span class="count">$210</span></td>
                </tr>

            </tbody>
        </table>
    </div>
</body>
</html>