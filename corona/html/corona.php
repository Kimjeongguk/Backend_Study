<?php
    $selectedDate = $_GET["selectedDate"];
    $ch = curl_init();
    $url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson'; /*URL*/
    $queryParams = '?' . urlencode('ServiceKey') . '=k5EL7RPKwskySYAuwLZDW5%2BWD%2BNTiPLZnmqMVazEArswlaL6XkxiAIJAOPFkNDWzm%2F8dx99fF%2BrOFd%2FyJK7r4g%3D%3D'; /*Service Key*/
    $queryParams .= '&' . urlencode('pageNo') . '=' . urlencode('1'); /**/
    $queryParams .= '&' . urlencode('numOfRows') . '=' . urlencode('10'); /**/
    $queryParams .= '&' . urlencode('startCreateDt') . '=' . urlencode($selectedDate); /**/
    $queryParams .= '&' . urlencode('endCreateDt') . '=' . urlencode($selectedDate); /**/
    $queryParams .= '&' . urlencode('_type') . '=' . urlencode('json'); /**/


    curl_setopt($ch, CURLOPT_URL, $url . $queryParams);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_HEADER, FALSE);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
    $response = curl_exec($ch);
    curl_close($ch);
    echo $response;
?>