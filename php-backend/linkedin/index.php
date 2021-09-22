<?php
require_once 'vendor/autoload.php';

use GuzzleHttp\Client;

$link = $_GET['LINK'];
$access_token = $_GET['ACCESS_TOKEN'];
$linkedin_id = $_GET['ID'];
$body = new \stdClass();
$body->content = new \stdClass();
$body->content->contentEntities[0] = new \stdClass();
$body->text = new \stdClass();
$body->content->contentEntities[0]->thumbnails[0] = new \stdClass();
$body->content->contentEntities[0]->entityLocation = $link;
$body->content->contentEntities[0]->thumbnails[0]->resolvedUrl = $link;
$body->content->title = $_GET['TITLE'];
$body->owner = 'urn:li:person:' . $linkedin_id;
$body->text->text = $_GET['TEXT'];
$body_json = json_encode($body, true);

try {
    $client = new Client(['base_uri' => 'https://api.linkedin.com']);
    $response = $client->request('POST', '/v2/shares', [
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
} catch (Exception $e) {
    echo $e->getMessage() . ' for link ' . $link;
}
