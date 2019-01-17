<?php

require_once '../index.php';

$collection = (new MongoDB\Client)->test->scores;

function generate_doc($id) {
    $doc = ['user_id' => $id, 'questions' => []];

    for($i = 1; $i <= 3; $i++) {
        $doc['questions']['q'.$i] = rand(1, 5);
    }

    return $doc;    
}

$docs = [];
for($i = 1; $i <= 3; $i++) {
    $docs []= generate_doc($i);
    if(count($docs) >= 3) {
        $insertManyResult  = $collection->insertMany($docs);

        printf("Inserted %d docs\n", $insertManyResult->getInsertedCount());

        unset($docs);
        $docs = [];
    }
}