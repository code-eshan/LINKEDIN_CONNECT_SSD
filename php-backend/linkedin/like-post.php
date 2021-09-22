<?php
require_once 'vendor/autoload.php';

use GuzzleHttp\Client;

$profileid = $_GET['PROFILEID'];
$likeid = $_GET['LIKEID'];
$access_token = $_GET['ACCESS_TOKEN'];
$body = new \stdClass();
$body->actor = "urn:li:person:" . $profileid;
$body->object = "urn:li:activity:" . $likeid;
$body_json = json_encode($body, true);

try {
    $client = new Client(['base_uri' => 'https://api.linkedin.com']);
    $response = $client->request('POST', '/v2/socialActions/urn:li:activity:' . $likeid . '/likes', [
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

    echo "LIKE SUCCESSFUL";
} catch (Exception $e) {
    echo $e->getMessage();
}
