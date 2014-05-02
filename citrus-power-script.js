// VARIABLES----------------------------------------------------------------------------------------------------------------------------------------------

var xClick = -1;
var yClick = -1;
var playerScore = 0;
var limeCount = 0;
var lemonCount = 0;
var bloodOrangeCount = 0;
var orangeCount = 0;
var grapeFruitCount = 0;
var time = 3;
var pauseTime = 0;
var gamePaused = false;
var fontStyle = "bold 16px Helvetica";
var firstClick = true;
var firstClickX = 0;
var firstClickY = 0;
var temp = " ";
var temp2 = " ";
var emptyJar = new Image();
var lime = new Image();
var limeJar01 = new Image();
var limeJar02 = new Image();
var limeJar03 = new Image();
var limeJarPower = new Image();
var bloodOrange = new Image();
var bloodOrangeJar01 = new Image();
var bloodOrangeJar02 = new Image();
var bloodOrangeJar03 = new Image();
var bloodOrangeJarPower = new Image();
var lemonJar01 = new Image();
var lemonJar02 = new Image();
var lemonJar03 = new Image();
var lemonJarPower = new Image();
var lemonJarSERVE = new Image();
var limeJarSERVE = new Image();
var grapeFruitJarSERVE = new Image();
var bloodOrangeJarSERVE = new Image();
var orangeJarSERVE = new Image();
var orangeJarPower = new Image();
var orangeJar01 = new Image();
var orangeJar02 = new Image();
var orangeJar03 = new Image();
var grapeFruitJarPower = new Image();
var grapeFruitJar01 = new Image();
var grapeFruitJar02 = new Image();
var grapeFruitJar03 = new Image();
//var backgroundIdea = new Image();
var backgroundIdea02 = new Image();
var backgroundIdea03 = new Image();
var backgroundIdea04 = new Image();
var backgroundIdea05 = new Image();
var selector = new Image();
var rottenLemon = new Image();
var lemon = new Image();
var orange = new Image();
var grapeFruit = new Image();
//var plus100 = new Image();
var splatter = new Image();
var citrusStartMenu = new Image();
var pauseScreen = new Image();
var sfx01 = new Audio("/assets/rottenSplat.mp3");
var fps = 16;
var serveCount = 3;
var startMenu = true;
var fruits =
[
[lime, bloodOrange, orange, grapeFruit, lemon],
[, , , , ],
[, , , , ],
[, , , , ],
[, , , , ]
];



// INIT FUNCTION-------------------------------------------------------------------------------------------------------------------------------------------------
function init() {

    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    var width = canvas.getAttribute('width');
    var height = canvas.getAttribute('height');

    loadAssets();

    // Attach a mouse click event listener for switching droplet colors
    $("#myCanvas").click(function (e) {

        //e will give us absolute x, y so we need to calculate relative to canvas
        var pos = $("#myCanvas").position();
        var ox = e.pageX - pos.left;
        var oy = e.pageY - pos.top;

        // 100 = width of the tile
        var xField = Math.floor(oy / 100);
        var yField = Math.floor(ox / 100);

        xClick = xField;
        yClick = yField;

        if (xField <= 4 && yField <= 4 && !gamePaused) {
            if (firstClick == true && fruits[xField][yField] == rottenLemon) {
                fruits[xField][yField] = splatter;
                playerScore = playerScore + 100;
                firstClick = true;
                sfx01.play();
                if (!gamePaused) {
                    draw();
                }
            } /* else if (firstClick == true) {
                            temp = fruits[xField][yField];
                            firstClickX = xField;
                            firstClickY = yField;
                            firstClick = false;
                        } else if (firstClick == false && xField == firstClickX + 1 && yField == firstClickY) {
                            temp2 = fruits[xField][yField];
                            fruits[xField][yField] = temp;
                            fruits[firstClickX][firstClickY] = temp2;
                            firstClick = true;
                        } else if (firstClick == false && xField == firstClickX - 1 && yField == firstClickY) {
                            temp2 = fruits[xField][yField];
                            fruits[xField][yField] = temp;
                            fruits[firstClickX][firstClickY] = temp2;
                            firstClick = true;
                        } else if (firstClick == false && yField == firstClickY + 1 && xField == firstClickX) {
                            temp2 = fruits[xField][yField];
                            fruits[xField][yField] = temp;
                            fruits[firstClickX][firstClickY] = temp2;
                            firstClick = true;
                        } else if (firstClick == false && yField == firstClickY - 1 && xField == firstClickX) {
                            temp2 = fruits[xField][yField];
                            fruits[xField][yField] = temp;
                            fruits[firstClickX][firstClickY] = temp2;
                            firstClick = true;
                        } else {
                            firstClick = false;
                        } */
        } else if (xField == 5) {
            serverSmoothies();
        }
        if (!gamePaused) {
            draw();
        }
    });



    // DRAW FUNCTION-----------------------------------------------------------------------------------------------------------------------------------------
    function draw() {
        // Clear Canvas
        clear();

        ctx.drawImage(backgroundIdea05, 0, 0);

        for (var i = 0; i < fruits.length; i++) { // Rows
            for (var j = 0; j < fruits[i].length; j++) { // Columns

                // Check which color to fill the droplet
                if (fruits[i][j] == lime) {
                    ctx.drawImage(lime, j * 100, i * 100);
                } else if (fruits[i][j] == lemon) {
                    ctx.drawImage(lemon, j * 100, i * 100);
                } else if (fruits[i][j] == orange) {
                    ctx.drawImage(orange, j * 100, i * 100);
                } else if (fruits[i][j] == grapeFruit) {
                    ctx.drawImage(grapeFruit, j * 100, i * 100);
                } else if (fruits[i][j] == bloodOrange) {
                    ctx.drawImage(bloodOrange, j * 100, i * 100);
                } else if (fruits[i][j] == rottenLemon) {
                    ctx.drawImage(rottenLemon, j * 100, i * 100);
                } else if (fruits[i][j] == splatter) {
                    ctx.drawImage(splatter, j * 100, i * 100);
                }
            }

        }


        /* if (firstClick == false) {
        ctx.drawImage(selector, yClick * 100, xClick * 100);
        } */

        if (limeCount == 0) {
            ctx.drawImage(limeJar03, 0, 500);
        } else if (limeCount == 1) {
            ctx.drawImage(limeJar02, 0, 500);
        } else if (limeCount == 2) {
            ctx.drawImage(limeJar01, 0, 500);
        } else if (limeCount >= 3) {
            ctx.drawImage(limeJarSERVE, 0, 500);
        }

        if (lemonCount == 0) {
            ctx.drawImage(lemonJar03, 400, 500);
        } else if (lemonCount == 1) {
            ctx.drawImage(lemonJar02, 400, 500);
        } else if (lemonCount == 2) {
            ctx.drawImage(lemonJar01, 400, 500);
        } else if (lemonCount >= 3) {
            ctx.drawImage(lemonJarSERVE, 400, 500);
        }
        if (grapeFruitCount == 0) {
            ctx.drawImage(grapeFruitJar03, 300, 500);
        } else if (grapeFruitCount == 1) {
            ctx.drawImage(grapeFruitJar02, 300, 500);
        } else if (grapeFruitCount == 2) {
            ctx.drawImage(grapeFruitJar01, 300, 500);
        } else if (grapeFruitCount >= 3) {
            ctx.drawImage(grapeFruitJarSERVE, 300, 500);
        }
        if (orangeCount == 0) {
            ctx.drawImage(orangeJar03, 200, 500);
        } else if (orangeCount == 1) {
            ctx.drawImage(orangeJar02, 200, 500);
        } else if (orangeCount == 2) {
            ctx.drawImage(orangeJar01, 200, 500);
        } else if (orangeCount >= 3) {
            ctx.drawImage(orangeJarSERVE, 200, 500);
        }
        if (bloodOrangeCount == 0) {
            ctx.drawImage(bloodOrangeJar03, 100, 500);
        } else if (bloodOrangeCount == 1) {
            ctx.drawImage(bloodOrangeJar02, 100, 500);
        } else if (bloodOrangeCount == 2) {
            ctx.drawImage(bloodOrangeJar01, 100, 500);
        } else if (bloodOrangeCount >= 3) {
            ctx.drawImage(bloodOrangeJarSERVE, 100, 500);
        }

        // Display Timer & Score
        ctx.fillStyle = "rgb(000, 000, 000)";
        ctx.font = fontStyle;
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Timer: " + (time), 25, 0);
        ctx.fillText("Score: " + (playerScore), 370, 0);

        //Start the game display the startMenu
        if (startMenu == true) {
            console.log(startMenu);
            console.log("why");
            ctx.drawImage(citrusStartMenu, 0, 0);
            startGame();
        }
    };

    // TIMER FUNCTION--------------------------------------------------------------------------------------------------------------------------------------------
    var myVar = setInterval(function () { myTimer() }, 1000);

    function myTimer() {
        if (time > 1) {
            time = time - 1;
        } else if (time == 1) {
            time = 3;
            //scored();
            makeSmoothies();
        }
    }





    // When player has successfully filled a smoothie blender and clicks that smoothie they will then score with the SERVER SMOOTHIES function----------------------
    function serverSmoothies() {
        if (xClick == 5 && yClick == 0 && limeCount >= serveCount) {
            playerScore += 1000;
            limeCount = 0;
            //console.log("Lime CLICKED");
        } else if (xClick == 5 && yClick == 1 && bloodOrangeCount >= serveCount) {
            playerScore += 1000;
            bloodOrangeCount = 0;
            //console.log("BloodOrange CLICKED");
        } else if (xClick == 5 && yClick == 2 && orangeCount >= serveCount) {
            playerScore += 1000;
            orangeCount = 0;
            //console.log("Orange CLICKED");
        } else if (xClick == 5 && yClick == 3 && grapeFruitCount >= serveCount) {
            playerScore += 1000;
            grapeFruitCount = 0;
            //console.log("GrapeFruit CLICKED");
        } else if (xClick == 05 && yClick == 4 && lemonCount >= serveCount) {
            playerScore += 1000;
            lemonCount = 0;
            //console.log("Lemon CLICKED");
        }
        if (!gamePaused) {
            draw();
        }
    }





    // START MENU FUNCTION--------------------------------------------------------------------------------------------------------------------------------------------
    function startGame() {
        if (startMenu) {
            time = 0;
            clearInterval(interval);

            $("#myCanvas").click(function (e) {
                internal = setInterval(main, fps);
                console.log("its here");
                console.log(startMenu);
                time = 3;
                startMenu = false;
            });
        }
    }

    // Pause Game----------------------------------------------------------------------------------------------------------------------------------------------------
    $("#pause").click(function (e) {
        pauseGame();
    });
    function pauseGame() {
        if (gamePaused) {
            interval = setInterval(main, fps);
            time = pauseTime;
            pauseTime = 0;
            gamePaused = false;
        } else if (!gamePaused) {
            clearInterval(interval);
            ctx.drawImage(pauseScreen, 0, 0);
            pauseTime = time;
            time = 0;
            gamePaused = true;
        }
    }

    // Update Function----------------------------------------------------------------------------------------------------------------------------------------------
    var update = function (modifier) { }

    // The main game loop-------------------------------------------------------------------------------------------------------------------------------------------
    var main = function () {
        var now = Date.now();
        var delta = now - then;

        update(delta / 1000);
        if (!gamePaused) {
            draw();
        }

        then = now;
    };

    // Let's play this game!-----------------------------------------------------------------------------------------------------------------------------------------
    clear();
    var then = Date.now();
    var interval = setInterval(main, fps); // Execute as fast as possible
}

// LOAD ASSETS FUNCTION--------------------------------------------------------------------------------------------------------------------------------
function loadAssets() {
    citrusStartMenu.src = 'assets/citrus-start-menu.png';
    pauseScreen.src = 'assets/pauseScreen.png';
    lime.src = 'assets/lime-small.png';
    lemon.src = 'assets/lemon-small.png';
    orange.src = 'assets/orange-small.png';
    rottenLemon.src = 'assets/rottenLemon.png';
    grapeFruit.src = 'assets/grapefruit-small.png';
    grapeFruitJar01.src = 'assets/grapeFruitJar01.png';
    grapeFruitJar02.src = 'assets/grapeFruitJar02.png';
    grapeFruitJar03.src = 'assets/grapeFruitJar03.png';
    //grapeFruitJarPower.src = 'assets/grapeFruitJarPower.png';
    orangeJar01.src = 'assets/orangeJar01.png';
    orangeJar02.src = 'assets/orangeJar02.png';
    orangeJar03.src = 'assets/orangeJar03.png';
    //orangeJarPower.src = 'assets/orangeJarPower.png';
    lemonJar01.src = 'assets/lemonJar01.png';
    lemonJar02.src = 'assets/lemonJar02.png';
    lemonJar03.src = 'assets/lemonJar03.png';
    //lemonJarPower.src = 'assets/lemonJarPower.png';
    lemonJarSERVE.src = 'assets/lemonJarSERVE.png';
    limeJarSERVE.src = 'assets/limeJarSERVE.png';
    bloodOrangeJarSERVE.src = 'assets/bloodOrangeJarSERVE.png';
    orangeJarSERVE.src = 'assets/orangeJarSERVE.png';
    grapeFruitJarSERVE.src = 'assets/grapeFruitJarSERVE.png';
    emptyJar.src = 'assets/emptyJar.png';
    limeJar01.src = 'assets/limeJar01.png';
    limeJar02.src = 'assets/limeJar02.png';
    limeJar03.src = 'assets/limeJar03.png';
    //limeJarPower.src = 'assets/limeJarPower.png';
    bloodOrange.src = 'assets/bloodorange-small.png';
    bloodOrangeJar01.src = 'assets/bloodOrangeJar01.png';
    bloodOrangeJar02.src = 'assets/bloodOrangeJar02.png';
    bloodOrangeJar03.src = 'assets/bloodOrangeJar03.png';
    //bloodOrangeJarPower.src = 'assets/bloodOrangeJarPower.png';
    //backgroundIdea.src = 'assets/backgroundIdea.png';
    //backgroundIdea02.src = 'assets/backgroundIdea02.png';
    //backgroundIdea03.src = 'assets/backgroundIdea03.png';
    //backgroundIdea04.src = 'assets/backgroundIdea04.png';
    backgroundIdea05.src = 'assets/backgroundIdea05.png';
    selector.src = 'assets/selector.png';
    //plus100.src = 'assets/plus100.png';
    splatter.src = 'assets/splatter.png';
}

// Move array elements along their respective 'column' and populate top row with same colors + rotten fruits----------------------------------------------------
function moveBoardModified() {
    for (var i = fruits.length - 1; i >= 0; --i) {
        for (var j = fruits[i].length - 1; j >= 0; --j) {
            if (i < 4) {
                fruits[i + 1][j] = fruits[i][j];
                if (i == 0 && j == 0) {
                    var randomColor = " ";
                    randomColor = Math.floor(Math.random() * 6) + 1;
                    if (randomColor == 1) {
                        randomColor = lime;
                    } else if (randomColor == 2) {
                        randomColor = lime;
                    } else if (randomColor == 3) {
                        randomColor = lime;
                    } else if (randomColor == 4) {
                        randomColor = rottenLemon;
                    } else if (randomColor == 5) {
                        randomColor = rottenLemon;
                    } else if (randomColor == 6) {
                        randomColor = rottenLemon;
                    }
                    fruits[i][j] = randomColor;
                    firstClick = true;
                }
                if (i == 0 && j == 1) {
                    var randomColor = " ";
                    randomColor = Math.floor(Math.random() * 6) + 1;
                    if (randomColor == 1) {
                        randomColor = bloodOrange;
                    } else if (randomColor == 2) {
                        randomColor = bloodOrange;
                    } else if (randomColor == 3) {
                        randomColor = bloodOrange;
                    } else if (randomColor == 4) {
                        randomColor = rottenLemon;
                    } else if (randomColor == 5) {
                        randomColor = rottenLemon;
                    } else if (randomColor == 6) {
                        randomColor = rottenLemon;
                    }
                    fruits[i][j] = randomColor;
                    firstClick = true;
                }
                if (i == 0 && j == 2) {
                    var randomColor = " ";
                    randomColor = Math.floor(Math.random() * 6) + 1;
                    if (randomColor == 1) {
                        randomColor = orange;
                    } else if (randomColor == 2) {
                        randomColor = orange;
                    } else if (randomColor == 3) {
                        randomColor = orange;
                    } else if (randomColor == 4) {
                        randomColor = rottenLemon;
                    } else if (randomColor == 5) {
                        randomColor = rottenLemon;
                    } else if (randomColor == 6) {
                        randomColor = rottenLemon;
                    }
                    fruits[i][j] = randomColor;
                    firstClick = true;
                }
                if (i == 0 && j == 3) {
                    var randomColor = " ";
                    randomColor = Math.floor(Math.random() * 6) + 1;
                    if (randomColor == 1) {
                        randomColor = grapeFruit;
                    } else if (randomColor == 2) {
                        randomColor = grapeFruit;
                    } else if (randomColor == 3) {
                        randomColor = grapeFruit;
                    } else if (randomColor == 4) {
                        randomColor = rottenLemon;
                    } else if (randomColor == 5) {
                        randomColor = rottenLemon;
                    } else if (randomColor == 6) {
                        randomColor = rottenLemon;
                    }
                    fruits[i][j] = randomColor;
                    firstClick = true;
                }
                if (i == 0 && j == 4) {
                    var randomColor = " ";
                    randomColor = Math.floor(Math.random() * 6) + 1;
                    if (randomColor == 1) {
                        randomColor = lemon;
                    } else if (randomColor == 2) {
                        randomColor = lemon;
                    } else if (randomColor == 3) {
                        randomColor = lemon;
                    } else if (randomColor == 4) {
                        randomColor = rottenLemon;
                    } else if (randomColor == 5) {
                        randomColor = rottenLemon;
                    } else if (randomColor == 6) {
                        randomColor = rottenLemon;
                    }
                    fruits[i][j] = randomColor;
                    firstClick = true;
                }
            }
        }
    }
}

// MAKE SMOOTHIES FUNCION will replace score function--------------------------------------------------------------------------------------------------------------
function makeSmoothies() {
    if (fruits[4][0] == lime) {
        limeCount = limeCount + 1;
    } else if (fruits[4][0] == rottenLemon) {
        limeCount = 0;
    }
    if (fruits[4][1] == bloodOrange) {
        bloodOrangeCount = bloodOrangeCount + 1;
    } else if (fruits[4][0] == rottenLemon) {
        bloodOrangeCount = 0;
    }
    if (fruits[4][2] == orange) {
        orangeCount = orangeCount + 1;
    } else if (fruits[4][0] == rottenLemon) {
        orangeCount = 0;
    }
    if (fruits[4][3] == grapeFruit) {
        grapeFruitCount = grapeFruitCount + 1;
    } else if (fruits[4][0] == rottenLemon) {
        grapeFruitCount = 0;
    }
    if (fruits[4][4] == lemon) {
        lemonCount = lemonCount + 1;
    } else if (fruits[4][0] == rottenLemon) {
        lemonCount = 0;
    }
    moveBoardModified();
}

// SCORE FUNCTION (Check to see if score should be increased)--------------------------------------------------------------------------------------------------
function scored() {
    if (fruits[4][0] == lime) {
        playerScore = playerScore + 100;
        limeCount = limeCount + 1;
    }
    if (fruits[4][1] == bloodOrange) {
        playerScore = playerScore + 100;
        bloodOrangeCount = bloodOrangeCount + 1;
    }
    if (fruits[4][2] == orange) {
        playerScore = playerScore + 100;
        orangeCount = orangeCount + 1;
    }
    if (fruits[4][3] == grapeFruit) {
        playerScore = playerScore + 100;
        grapeFruitCount = grapeFruitCount + 1;
    }
    if (fruits[4][4] == lemon) {
        playerScore = (playerScore + 100);
        lemonCount = lemonCount + 1;
    }
    moveBoardModified();
}

// Clear Canvas Function----------------------------------------------------------------------------------------------------------------------------------------
function clear() {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 500, 600);
}








// NOT USED ---------------------------------------------------------------------------------------------------------------------------------------------------

// Move array elements along their respective 'column' and randomly populate top row-------------------------------------------------------------------------------
/* function moveBoard() {
for (var i = fruits.length - 1; i >= 0; --i) {
for (var j = fruits[i].length - 1; j >= 0; --j) {
if (i < 4) {
fruits[i + 1][j] = fruits[i][j];
if (i == 0) {
var randomColor = " ";
randomColor = Math.floor(Math.random() * 6) + 1;
if (randomColor == 1) {
randomColor = lime;
} else if (randomColor == 2) {
randomColor = lemon;
} else if (randomColor == 3) {
randomColor = orange;
} else if (randomColor == 4) {
randomColor = bloodOrange;
} else if (randomColor == 5) {
randomColor = grapeFruit;
} else if (randomColor == 6) {
randomColor = rottenLemon;
}
fruits[i][j] = randomColor;
firstClick = true;
}
}
}
}
} */