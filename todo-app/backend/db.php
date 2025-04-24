<?php
// backend/db.php (MySQL)
$host = '127.0.0.1';
$db   = 'todo_db';       // Must match database name in phpMyAdmin
$user = 'root';
$pass = '';
$dsn  = "mysql:host=$host;dbname=$db;charset=utf8mb4";

$pdo = new PDO($dsn, $user, $pass, [
  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);
// Create table if missing
$pdo->exec(
  "CREATE TABLE IF NOT EXISTS tasks (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     is_completed TINYINT(1) DEFAULT 0
   ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
);
?>