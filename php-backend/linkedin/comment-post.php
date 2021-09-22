<?php
require_once 'vendor/autoload.php';

use GuzzleHttp\Client;

$activity_id = $_GET['ACTIVITY_ID'];
$access_token = $_GET['ACCESS_TOKEN'];
$linkedin_id = $_GET['ID'];
$comment = $_GET['COMMENT'];
$body = new \stdClass();
$body->actor = "urn:li:person:" . $linkedin_id;
$body->object = "urn:li:activity:" . $activity_id;
$body->message = new \stdClass();
$body->message->text = $comment;
$body_json = json_encode($body, true);

try {
    $client = new Client(['base_uri' => 'https://api.linkedin.com']);
    $response = $client->request('POST', 'https://api.linkedin.com/v2/socialActions/urn:li:activity:'. $activity_id . '/comments', [
        'headers' => [
            "Authorization" => "Bearer " . $access_token,
            "Content-Type"  => "application/json",
            "x-li-format"   => "json",
            "Access-Control-Allow-Origin" => "http://127.0.0.1:5500"
        ],
        'body' => $body_json,
    ]);

    if ($response->getStatusCode() !== 201) {
        echo 'Error: ' . $response->getLastBody()->errors[0]->message;
    }

    echo "COMMENT SUCCESSFUL";
} catch (Exception $e) {
    echo $e->getMessage() . ' for link ' . $link;
}
