<?php
`git pull`;                         // This will execute the `git pull` command on your instance
header("Cache-Control: max-age=1"); // Lower the cache while we're here so the changes take effect faster
echo "hello!";                      // So you can confirm the file is in the right place by browsing to the URL

/* 
 * Purge a URL on this host
 */
// header("Cache-Control: max-age=1"); // don't cache ourself
 
error_reporting(E_ALL);
ini_set("display_errors", 1);
 
// Set to true to hide varnish result
define("SILENT", false);
 
$path = isset($_GET["path"]) ? $_GET["path"] : "";
 
$purge_url = "http://" . $_SERVER["HTTP_HOST"] . "/$path";
 
if ( $ch = curl_init($purge_url) ) {
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PURGE");
    curl_setopt($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
    //curl_setopt($ch, CURLOPT_NOBODY, SILENT);
 
    curl_exec($ch);
    curl_close($ch);
}

?>
