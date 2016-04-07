<?php
`git pull`;                         // This will execute the `git pull` command on your instance
header("Cache-Control: max-age=1"); // Lower the cache while we're here so the changes take effect faster
echo "hello!";                      // So you can confirm the file is in the right place by browsing to the URL
?>
