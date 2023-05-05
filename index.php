<!DOCTYPE html>
<html>
    <head>
        <?php 
            function isMobile() {
                return preg_match("/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i", $_SERVER["HTTP_USER_AGENT"]);
            }
        ?>
        <title>Snake</title>
        <link rel="stylesheet" type="text/css" href="css/styles.css">
    </head>
    <body>
        <div class="page-container">
            <?php
            if(isMobile()){
            ?>
            <div class="control-panel">
                <div class="control-row">
                    <div class="control-button">
                        <div id="upButton" class="button-layer"></div>
                        <div class="button-area"></div>
                    </div>
                </div>
                <div class="control-row">
                    <div class="control-button">
                        <div id="downButton" class="button-layer"></div>
                        <div class="button-area"></div>
                    </div>
                </div>
            </div>
            <?php
            }
            ?>
            <div class="game-panel">
                <canvas id="gameCanvas"></canvas>
            </div>
            <?php
            if(isMobile()){
            ?>
            <div class="control-panel">
                <div class="control-row">
                    <div class="control-button">
                        <div id="leftButton" class="button-layer"></div>
                        <div class="button-area"></div>
                    </div>
                    <div class="control-button">
                        <div id="rightButton" class="button-layer"></div>
                        <div class="button-area"></div>
                    </div>
                </div>
            </div>
            <?php
            }
            ?>
        </div>
        <script type="module" src="js/snakeGame.js"></script>
    </body>
</html>