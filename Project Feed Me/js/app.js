function getElement(selector) {
    return document.querySelector('.game-box-container ' + selector);
}

let totalScore = 0;
let playerPosition;
let chosenItem;
let keysPressed = {
    37: false,
    39: false
};
let difficulty = 5;
let savedScore = [0,0,0,0,0];
let activeElements = [];
let randomizingInterval;
let movingPlayerInterval;
let collisionsInterval;
let activeObjectFallingInterval;


const playerNode = getElement('div.game-dude');
const playButton = getElement('.play');
const instructionButton = getElement('.instructions');
const easyButton = getElement('.easy');
const hardButton = getElement('.hard');
const instructionArea = getElement('.game-instruction');
const submitButton = document.querySelector(".sub-button");
const greyBackground = getElement('.grey-background');
let topScoresBoard = getElement('.top-score-board');
let gameDifficulty = getElement('.game-difficulty');

const gameItemsCollection = [
    {   name: "apple",
        height: 89,
        width: 75,
        radius: 45,
        image: "url('images/game_assets/apple.png')",
        points: -5,
        healthy: true
    },
    {   name: "carrot",
        height: 94,
        width: 100,
        radius: 47,
        image: "url('images/game_assets/carrot.png')",
        points: -5,
        healthy: true
    },
    {   name: "pear",
        height: 80,
        width: 80,
        radius: 40,
        image: "url('images/game_assets/pear.png')",
        points: -5,
        healthy: true
    },
    {   name: "aubergine",
        height: 83,
        width: 75,
        radius: 42,
        image: "url('images/game_assets/aubergine.png')",
        points: -5,
        healthy: true
    },
    {   name: "strawberry",
        height: 75,
        width: 75,
        radius: 37,
        image: "url('images/game_assets/strawberry.png')",
        points: -5,
        healthy: true
    },
    {   name: "fries",
        height: 92,
        width: 75,
        radius: 46,
        image: "url('images/game_assets/fries.png')",
        points: 5,
        healthy: false
    },
    {   name: "cupcake",
        height: 83,
        width: 85,
        radius: 42,
        image: "url('images/game_assets/cupcake.png')",
        points: 5,
        healthy: false
    },
    {   name: "pizza",
        height: 92,
        width: 95,
        radius: 46,
        image: "url('images/game_assets/pizza.png')",
        points: 10,
        healthy: false
    },
    {   name: "icecream",
        height: 90,
        width: 95,
        radius: 45,
        image: "url('images/game_assets/icecream.png')",
        points: 5,
        healthy: false
    },
    {   name: "burger",
        height: 87,
        width: 90,
        radius: 44,
        image: "url('images/game_assets/burger.png')",
        points: 15,
        healthy: false
    },
    {   name: "cake",
        height: 81,
        width: 85,
        radius: 41,
        image: "url('images/game_assets/cake.png')",
        points: 10,
        healthy: false
    },
    {   name: "hotdog",
        height: 76,
        width: 100,
        radius: 38,
        image: "url('images/game_assets/hotdog.png')",
        points: 10,
        healthy: false
    },
    {   name: "sprite",
        height: 75,
        width: 45,
        radius: 37,
        image: "url('images/game_assets/sprite.png')",
        points: 5,
        healthy: false
    },
    {   name: "donut",
        height: 73,
        width: 80,
        radius: 37,
        image: "url('images/game_assets/donut.png')",
        points: 10,
        healthy: false
    },
    {   name: "steak",
        height: 74,
        width: 95,
        radius: 37,
        image: "url('images/game_assets/steak.png')",
        points: 10,
        healthy: false
    },
    {   name: "whiskey",
        height: 109,
        width: 35,
        radius:54,
        image: "url('images/game_assets/whiskey.png')",
        points: 50,
        healthy: false
    },
    {   name: "chocolate",
        height: 120,
        width: 69,
        radius: 60,
        image: "url('images/game_assets/chocolate.png')",
        points: 20,
        healthy: false
    }
];

const gameCorridors = [
    {   name: "corridor1",
        middleFromLeft: 50
    },
    {   name: "corridor2",
        middleFromLeft: 150
    },
    {   name: "corridor3",
        middleFromLeft: 250
    },
    {   name: "corridor4",
        middleFromLeft: 350
    },
    {   name: "corridor5",
        middleFromLeft: 450
    },
    {   name: "corridor6",
        middleFromLeft: 550
    },
    {   name: "corridor7",
        middleFromLeft: 650
    },
    {   name: "corridor8",
        middleFromLeft: 750
    }
];

function initializingGame () {
    if (screen.width>1200) {
        submitButton.addEventListener('click', showGame);
    }
}

function timeStart (time) {
    let lenghtOfGame = time;
    if (lenghtOfGame>0) {
        displayTime(lenghtOfGame);
        setTimeout(function(){
            timeStart(time-1);
            --lenghtOfGame;

        },1000)
    }
    else {
        stopGame();
    }
}

function startGame () {
    easyButton.removeEventListener('click',easyStart);
    hardButton.removeEventListener('click',hardStart);
    setStyleDisplayNone(gameDifficulty);
    setStyleDisplayNone(greyBackground);
    setStyleDisplayBlock(playerNode);
    positionPlayer();
    playerMoving();
    collisions();
    totalScore=0;
    displayScore(totalScore);
    createNewActiveItems();
    timeStart(40);
    activeObjectsFalling();
}

function stopGame () {
    setStyleDisplayNone(playerNode);
    clearInterval(randomizingInterval);
    clearInterval(movingPlayerInterval);
    clearInterval(collisionsInterval);
    clearInterval(activeObjectFallingInterval);
    document.removeEventListener('keydown', onKeyDown);
    setStyleDisplayBlock(greyBackground);
    removeAllActiveElements ();
    saveAndPresentScore(totalScore);
    presentTopScores ();
    setStyleDisplayBlock(topScoresBoard);
    playButton.style.top = 375 + 'px';
    instructionButton.style.top = 375 + 'px';
    playButton.style.left = 108 + 'px';
    instructionButton.style.left = 366 + 'px';
    setStyleDisplayBlock(instructionButton);
    setStyleDisplayBlock(playButton);
    playButton.addEventListener('click',chooseDifficulty);
    instructionButton.addEventListener('click',showInstruction);
    displayTime(40);
}

function showGame () {
    let game = document.querySelector(".game-box");
    setStyleDisplayBlock(game);
    playButtonEvent();
    instructionButtonEvent ();
    submitButton.removeEventListener('click',showGame);
}

function playButtonEvent () {
    playButton.addEventListener('click', chooseDifficulty);
}

function instructionButtonEvent () {
    instructionButton.addEventListener('click',showInstruction);
}

function showInstruction () {
    instructionButton.removeEventListener('click',showInstruction);
    setStyleDisplayNone(instructionButton);
    setStyleDisplayNone(topScoresBoard);
    playButton.addEventListener('click',chooseDifficulty);
    setStyleDisplayBlock(instructionArea);
    setStyleDisplayBlock(playButton);
    playButton.style.top = 320 + 'px';
    playButton.style.left = 325 + 'px';
}

function randomizeAndReturnItems(tableOfItems) {
    chosenItem = tableOfItems[Math.floor(Math.random() * tableOfItems.length)];
    return chosenItem;
}

function randomizeAndReturnMiddleOfRandomCorridor (gameCorridor) {
    let randomCorridor =  gameCorridor[Math.floor(Math.random() * gameCorridor.length)];
    return randomCorridor.middleFromLeft
}

function createNewActiveItems () {
    randomizingInterval = setInterval(function () {
        createElement();
        },500
    );
}

function createElement() {
    let randomizedGameObject = randomizeAndReturnItems(gameItemsCollection);
    let createdObject = returnObjectElement (randomizedGameObject);
    pushActiveElementToArray(createdObject);
}

function returnObjectElement (chosenItem) {
    let objectNode = createItemNodeForFallingItemsInsideGame ();
    let possitionFromLeft = randomizeAndReturnMiddleOfRandomCorridor(gameCorridors);
    let possitionFromTop = 0;
    let activeObject = {
        type: chosenItem,
        top: possitionFromTop,
        left: possitionFromLeft - (chosenItem.width)/2,
        posX: possitionFromLeft,
        posY: possitionFromTop + chosenItem.height/2,
        ref: objectNode
    };
    setStylesForItemNode(activeObject);
    return activeObject
}

function pushActiveElementToArray (activeElement) {
    activeElements.push(activeElement);
}

function setStylesForItemNode(object){
    addStyleWidth (object);
    addStyleHeight (object);
    setStylePositionAbsolute (object);
    addStyleLeft (object);
    addStyleTop (object);
    addBackgroundImage (object);
    addStyleOpacity (object);
}

function setStyleDisplayNone (item) {
    item.style.display = "none";
}

function setStyleDisplayBlock (item) {
    item.style.display = "block";
}

function setStylePositionAbsolute (object) {
    object.ref.style.position = "absolute";
}

function addStyleHeight (object) {
    object.ref.style.height = object.type.height + 'px';
}

function addStyleWidth (object) {
    object.ref.style.width = object.type.width + 'px';
}

function addBackgroundImage (object) {
    object.ref.style.backgroundImage = object.type.image;
}

function addStyleLeft (object) {
    object.ref.style.left = object.left + 'px';
}

function addStyleOpacity (object) {
    object.ref.style.opacity = 1;
}

function addStyleTop (object) {
    object.ref.style.top = object.top + 'px';
}



function createItemNodeForFallingItemsInsideGame () {
    let randomizedItemNode = document.createElement("div");
    playerNode.parentNode.insertBefore(randomizedItemNode,playerNode);
    return randomizedItemNode
}

function removeAllActiveElements() {
    for (let i=activeElements.length; i>0; i--) {
        activeElements[0].ref.remove();
        activeElements.splice(0,1)
    }
}

function positionPlayer() {
    playerNode.style.left = '400px';
    playerPosition = parseInt(playerNode.style.left);
}

function movePlayerLeft() {
    playerNode.style.backgroundImage = "url('images/game_assets/dude-left.png')";
    if (playerPosition > 0) {
        playerNode.style.left = (playerPosition - 10).toString() + 'px';
        playerPosition -= 10;
    }
}

function movePlayerRight() {
    playerNode.style.backgroundImage = "url('images/game_assets/dude-right.png')";
    if (playerPosition < 719) {
        playerNode.style.left = (playerPosition + 10).toString() + 'px';
        playerPosition += 10;
    }
}

function onKeyDown(event) {
    event.preventDefault();
    keysPressed[event.which] = true;
}

function onKeyUp(event) {
    keysPressed[event.which] = false;
}


function playerMoving () {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    movingPlayerInterval = setInterval(function(){
    if (keysPressed[37]) {movePlayerLeft()}
        else
    if (keysPressed[39]) {movePlayerRight()}
    },25)
}



function collisions () {
    collisionsInterval = setInterval(function () {
        activeElements.forEach(function (activeObject,index) {
            let playerNodePosX = parseInt(playerNode.style.left)+ 41,
                playerNodePosY = 420,
                lengthA = playerNodePosX - activeObject.posX,
                lengthB = playerNodePosY - activeObject.posY,
                distance = Math.sqrt(lengthA * lengthA + lengthB * lengthB);

            if (distance < 65 + activeObject.type.radius) {
                totalScore+=activeObject.type.points;
                if (activeObject.type.healthy === true) {
                    const collisionSoundBad = new Audio('sounds/game-burp.wav');

                    collisionSoundBad.play();
                }
                else {
                    const collisionSoundGood = new Audio('sounds/game-bite.wav');
                    collisionSoundGood.play();
                }
                activeElements.splice(index,1);
                activeObject.ref.remove();
                displayScore(totalScore);
            }
        })
    },10)
}

function activeObjectsFalling () {
    activeObjectFallingInterval = setInterval(function(){
        let fallingSpeed = 1.5;
        activeElements.forEach(function(activeObject,index) {
            if (activeObject.top<(500-activeObject.type.height)) {
                activeObject.top+=fallingSpeed;
                activeObject.posY+=fallingSpeed;
                activeObject.ref.style.top=activeObject.top+'px'
            }
            else if (activeObject.ref.style.opacity > 0) {
                    activeObject.ref.style.opacity -= 0.03;
                }
            else {
                    activeElements.splice(index, 1);
                    activeObject.ref.remove();
            }

        })
    },difficulty)
}


function displayScore (totalScore) {
    let scoreToDisplay = `<p>TWÓJ WYNIK: ${totalScore}</p>`,
        scoreNode = getElement('.score-board');
    scoreNode.removeChild(scoreNode.firstChild);
    scoreNode.innerHTML = scoreToDisplay;
}

function displayTime (time) {
    let timeToDisplay = `<p>CZAS: ${time}s</p>`,
        timeNode = getElement('.time-left-board');
    timeNode.removeChild(timeNode.firstChild);
    timeNode.innerHTML = timeToDisplay;
}

function saveAndPresentScore (totalScore) {
    let retrievedSavedScore = JSON.parse(localStorage.getItem('topScoresAMPFGame')),
        allScores = [],
        sortedTopScores = [];

    if (retrievedSavedScore) {
        allScores=retrievedSavedScore;
        allScores.push(totalScore);
    }
    else {
        savedScore.push(totalScore);
        allScores = savedScore;
    }

    sortedTopScores = allScores.sort(function(a,b){return b-a});
    if (sortedTopScores.length>5) {sortedTopScores.splice(5)}
    localStorage.setItem('topScoresAMPFGame',JSON.stringify(sortedTopScores));
}

function presentTopScores () {
    let topScores = JSON.parse(localStorage.getItem('topScoresAMPFGame')),
        topScoresToDisplay =
                            `<div>
                            <h2>NAJLEPSZE WYNIKI:</h2>
                            <h3>1. ${topScores[0]}</h3>
                            <h3>2. ${topScores[1]}</h3>
                            <h3>3. ${topScores[2]}</h3>
                            <h3>4. ${topScores[3]}</h3>
                            <h3>5. ${topScores[4]}</h3>
                            </div>`,
        TopScoreNode = getElement('.top-score-board');
    TopScoreNode.removeChild(TopScoreNode.firstChild);

    TopScoreNode.innerHTML = topScoresToDisplay;
}

function chooseDifficulty () {
    playButton.removeEventListener('click', chooseDifficulty);
    instructionButton.removeEventListener('click',showInstruction);
    setStyleDisplayNone(playButton);
    setStyleDisplayNone(instructionButton);
    setStyleDisplayNone(instructionArea);
    setStyleDisplayNone(topScoresBoard);
    setStyleDisplayBlock(gameDifficulty);
    easyButton.addEventListener('click',easyStart);
    hardButton.addEventListener('click',hardStart);
}

function easyStart () {
    difficulty = 5;
    startGame()
}

function hardStart () {
    difficulty = 1.5;
    startGame()
}


initializingGame ();



$().ready(function () {
let monster={set:function(e,t,n,r){var i=new Date,s="",o=typeof t,u="";r=r||"/",n&&(i.setTime(i.getTime()+n*24*60*60*1e3),s="; expires="+i.toGMTString());if(o==="object"&&o!=="undefined"){if(!("JSON"in window))throw"Bummer, your browser doesn't support JSON parsing.";u=JSON.stringify({v:t})}else u=escape(t);document.cookie=e+"="+u+s+"; path="+r},get:function(e){var t=e+"=",n=document.cookie.split(";"),r="",i="",s={};for(var o=0;o<n.length;o++){var u=n[o];while(u.charAt(0)==" ")u=u.substring(1,u.length);if(u.indexOf(t)===0){r=u.substring(t.length,u.length),i=r.substring(0,1);if(i=="{"){s=JSON.parse(r);if("v"in s)return s.v}return r=="undefined"?undefined:unescape(r)}}return null},remove:function(e){this.set(e,"",-1)},increment:function(e,t){var n=this.get(e)||0;this.set(e,parseInt(n,10)+1,t)},decrement:function(e,t){var n=this.get(e)||0;this.set(e,parseInt(n,10)-1,t)}};

if (monster.get('feedMeAcceptCookie') !== 'true') {
  $('#cookie-message').show();
    }
});

$(".turn-it-off").click(function () {
    $(".cookie-message").fadeOut("slow");
});
$(".cookie-button").click(function () {
    $(".cookie-message").fadeOut("slow");
    document.cookie="feedMeAcceptCookie=true; expires=Wed, 01 Jun 2020 10:00:00 GMT; path=/;"
});




