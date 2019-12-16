<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
header('Content-type: text/html; charset=utf-8');

$host = 'localhost'; 
$user = 'root'; 
$password = ''; 
$dbname = 'weather_test'; 
$id = "";

$con = mysqli_connect($host, $user, $password, $dbname);

if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}

$method = $_SERVER['REQUEST_METHOD'];

$json_var = [];

$city = $_GET['city'];

switch ($method) {
    case 'GET':
		getFunction(sqlCityName($city),$con,$city);
      break;
    case 'POST':
	
	  $date_n = new DateTime('now', new DateTimeZone('Asia/Jerusalem'));
	  $date_frm = $date_n->format('Y-m-d H:i:s');
	
	  $dt = $_GET['dt'];
      $min_temp = $_GET['minTemp'];
      $max_temp = $_GET['maxTemp'];	  
      $wind_speed = $_GET['windSpeed'];
	  
	  
      $rs = mysqli_query($con,sqlCityName($city)); 
	  $obj_is_city = $rs -> fetch_object();
	  
	  
	  if(!$obj_is_city){ // insert
	    $Str = str_replace("'", '', $city);
		
		
		$update_city = "insert into city (c_city_name, created_at, updated_at) values ($city, '$date_frm', '$date_frm')"; 	
		$result = mysqli_query($con,$update_city);

		$id = findIdByName($city,$con);
		
		$update_temp = "insert into temp (t_temp_max, t_temp_min, t_date_time, t_city_id) values ($max_temp, $min_temp,$dt,'$id')"; 
		$result = mysqli_query($con,$update_temp);
		
		$stmt = $con->prepare("INSERT INTO wind (w_speed, w_city_id) VALUES (?, ?)");
		$stmt->bind_param("di",$wind_speed,$id);
		$stmt->execute();
      
	  }
	  else{ // update
	      $id = $obj_is_city->c_id;
		  
		  $stmt = $con->prepare("UPDATE city SET updated_at=? WHERE c_id=?");
		  $stmt->bind_param("si",$date_frm,$id);
		  $stmt->execute();
		  
		  $update_temp="UPDATE temp SET t_temp_max=$max_temp, t_temp_min=$min_temp, t_date_time=$dt WHERE t_city_id = $id";
		  $update_wind="UPDATE wind SET w_speed=$wind_speed WHERE w_city_id = $id";
		
		  $result = mysqli_query($con,$update_temp);
		  $result = mysqli_query($con,$update_wind);
	  }
	  
	   
	  $json_var['cod'] = 200;
	  $con->close();
	  die(json_encode($json_var));
	  
	  break;
}

// function :

//============================================
function sqlCityName($city) {
	return "select * from city".($city?" where c_city_name=$city":'');
}
//============================================

//============================================
function findIdByName($city,$con) {
		
	$rst = mysqli_query($con,sqlCityName($city));
	$obj_is_city = $rst -> fetch_object();
	$id = $obj_is_city->c_id;
	return $id;
}
//============================================


//===================================
function getFunction($sql,$con,$city) {
	
	$sql_find_all = "SELECT c.* , t.* , w.* FROM city c INNER JOIN temp t ON c.c_id = t.t_city_id INNER JOIN wind w ON c.c_id = w.w_city_id WHERE c.c_city_name=$city";
	
	$result = mysqli_query($con,$sql_find_all);
	
	$obj = $result -> fetch_object();
	
	if (!$result || !$obj) {
		$json_var['cod'] = 404;
		$con->close();
		die(json_encode($json_var));
	}
	
	
	
	$json_var['cod'] = 200;
	$json_var['c_id'] = $obj->c_id;
	$json_var['updated_at'] = $obj->updated_at;
	$json_var['dt'] = $obj->t_date_time;
	$json_var['temp_min'] = $obj->t_temp_min;
	$json_var['temp_max'] =  $obj->t_temp_max;		
	$json_var['w_speed'] = $obj->w_speed;
	echo json_encode($json_var);
	

	
	$con->close();
}
//===================================


?>