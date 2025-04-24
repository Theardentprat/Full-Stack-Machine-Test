<?php
header('Content-Type: application/json');
// CORS settings
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  exit(0);
}

require __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
// Parse URI to find "tasks" segment regardless of folder depth
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$parts = explode('/', trim($path, '/'));
$taskIndex = array_search('tasks', $parts, true);
if ($taskIndex === false) {
  http_response_code(404);
  echo json_encode(['error' => 'Not Found']);
  exit;
}
// optional ID is the next segment
$id = $parts[$taskIndex + 1] ?? null;

switch ($method) {
  case 'GET':
    $stmt = $pdo->query('SELECT * FROM tasks');
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    break;

  case 'POST':
    $data = json_decode(file_get_contents('php://input'), true);
    $title = trim($data['title'] ?? '');
    if ($title === '') {
      http_response_code(400);
      echo json_encode(['error' => 'Title required']);
      exit;
    }
    $stmt = $pdo->prepare('INSERT INTO tasks (title) VALUES (?)');
    $stmt->execute([$title]);
    echo json_encode([
      'id' => $pdo->lastInsertId(),
      'title' => $title,
      'is_completed' => 0
    ]);
    break;

  case 'PUT':
    if (!$id) { http_response_code(400); exit; }
    $data = json_decode(file_get_contents('php://input'), true);
    $fields = [];
    $params = [];
    if (isset($data['title'])) {
      $fields[] = 'title = ?';
      $params[] = trim($data['title']);
    }
    if (isset($data['is_completed'])) {
      $fields[] = 'is_completed = ?';
      $params[] = $data['is_completed'] ? 1 : 0;
    }
    if (empty($fields)) { http_response_code(400); exit; }
    $params[] = $id;
    $sql = 'UPDATE tasks SET ' . implode(', ', $fields) . ' WHERE id = ?';
    $pdo->prepare($sql)->execute($params);
    echo json_encode(['success' => true]);
    break;

  case 'DELETE':
    if (!$id) { http_response_code(400); exit; }
    $pdo->prepare('DELETE FROM tasks WHERE id = ?')->execute([$id]);
    echo json_encode(['success' => true]);
    break;

  default:
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
}