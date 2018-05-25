<?php 

	// connection
$host = "localhost";
$db = "e_retribusi";
$port = "";
$user = "root";
$pass = "";
//postgressql connect
//$connect = pg_connect("host=$host port=$port dbname=$db user=$user password=$pass") || die(); //pilih salah satu
//mysql  connect
$re_connect = mysqli_connect("$host", "$user", "$pass", "$db"); //pilih salah satu

	$query = mysqli_query($re_connect, "SELECT * FROM re_users WHERE re_user_level = 2 ") or die(mysqli_error($re_connect));
	while ($row = mysqli_fetch_array($query))
	{
		$row_set[]= $row['re_user_name'];
	}

	echo json_encode($row_set);
	// print_r($row_set);
?>