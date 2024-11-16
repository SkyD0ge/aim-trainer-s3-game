const svgNS = "http://www.w3.org/2000/svg"


//global variables used to hold state of game
const screenSizeX = 1200
const screenSizeY = 720	
const tapRadius = 30
const trackRadius = 30
let cx = 0
let cy = 0
let xspeed = 2
let yspeed = 2
let myTimer = null
let mode = 0
let score = 0
let accuracy = 0
let hits = 0
let shots = 0
let trackerScore = 0
let timer = 0
let gameStarted = false
let hoveringBall = false

//global elements to be added or removed when needed
const startButton = document.createElementNS( svgNS, "polygon" )
const startText = document.createElementNS( svgNS, "text")
const textNode = document.createTextNode("Start!")
const mainMenuButton = document.createElementNS(svgNS, "circle")
const mainMenuText = document.createElementNS(svgNS, "text")
let liveCounter = document.createElementNS(svgNS, "text")
let liveTimer = document.createElementNS(svgNS, "text")
const mainMenuTextNode = document.createTextNode("Main Menu")
let trackerLiveCounter = document.createElementNS( svgNS, "text")
let timerNode = document.createTextNode(timer)
let tapShotFinalScore = document.createTextNode("Score: " + score)
let tapShotScoreboardFinal = document.createElementNS(svgNS, "text")
let trackerScoreboardFinal = document.createElementNS(svgNS, "text")
let tapShotLiveCounter = document.createTextNode(hits+"/"+shots)
let trackerScoreCounter = document.createTextNode(trackerScore)
const tapTarget = document.createElementNS( svgNS, "circle" )
const trackTarget = document.createElementNS( svgNS, "circle" )



//removes all elements from svg
function clearAll() {
    let svg = document.getElementById("screen")
    while(svg.childNodes.length > 0)
        svg.removeChild(svg.firstChild)
}

//adds start button
function addStartGameButton(){
        
        let svg = document.getElementById("screen");
        startButton.setAttribute("id", startButton)
        startButton.setAttribute("points", "242.5,273.61215932167727 115,200 242.49999999999994,126.38784067832268")
        startButton.setAttribute("transform", "translate(790,550) rotate(180 0 0)")
        startButton.setAttribute("stroke", "#89b4fa"); // Mocha blue
        startButton.setAttribute("fill", "#313244"); // Mocha surface
        startButton.setAttribute("stroke-width", "10px")
        startText.setAttribute("x", 560);
        startText.setAttribute("y", 360);
        startText.setAttribute("class", "menuChoice")
        svg.appendChild(startButton)
        startText.appendChild(textNode)  
        svg.appendChild(startText) 
}

//starts timer and adds a live timer on screen
function startTimer(seconds) {
        timer = seconds;
        let svg = document.getElementById("screen")
        liveTimer = document.createElementNS( svgNS, "text")
        timerNode = document.createTextNode(timer)
        liveTimer.setAttribute("x", 1160)
        liveTimer.setAttribute("y", 35)
        liveTimer.setAttribute("stroke", "#cdd6f4")
        liveTimer.setAttribute("font-family", "Comic Sans MS, Comic Sans")
        liveTimer.setAttribute("font-size", "30px")
        liveTimer.appendChild(timerNode)
        svg.appendChild(liveTimer)
        const interval = setInterval(() => {
            timerNode.nodeValue = timer
            timer--;
            if (timer < 0 ) {
                clearInterval(interval)
                if(mode == 2){
                clearInterval(targetTimer)
            }
                clearAll()
                scoreBoard()
                hoveringBall = false
          }
        }, 1000);
}

//starts a timer that updates position of ball
function moveBallTimer(){
    
    targetTimer = setInterval(function() {
    updateScoreBoard()
    trackBall = document.getElementById("trackBall");
    cx = cx + xspeed
    cy = cy + yspeed
    trackBall.setAttribute("cx", cx)
    trackBall.setAttribute("cy", cy)
    if (cx + trackRadius >= screenSizeX || cx - trackRadius <= 0)
        xspeed = -xspeed;
    if (cy + trackRadius >= screenSizeY || cy - trackRadius <= 0)
        yspeed = -yspeed;
 }, 1000 / 120);  

}

//adds elements to show user their score and adds a main menu button to screen
function scoreBoard(){
    let svg = document.getElementById("screen")
    if(mode == 1){
    tapShotScoreboardFinal.setAttribute("class", "menuTitle")
    tapShotScoreboardFinal.setAttribute("x", 315)
    tapShotScoreboardFinal.setAttribute("y", 200)
    tapShotFinalScore.nodeValue = "Score: " + score
    tapShotScoreboardFinal.appendChild(tapShotFinalScore)
    svg.appendChild(tapShotScoreboardFinal)
    mode = 0
}
if(mode == 2){
    
    trackerScoreboardFinal.setAttribute("class", "menuTitle")
    trackerScoreboardFinal.setAttribute("x", 315)
    trackerScoreboardFinal.setAttribute("y", 200)
    trackerScoreCounter.nodeValue = "Score: " + trackerScore
    trackerScoreboardFinal.appendChild(trackerScoreCounter)
    svg.appendChild(trackerScoreboardFinal)        
    mode = 0
}
    mainMenuButton.setAttribute("class", "menuCircle")
    mainMenuText.setAttribute("class", "menuChoice")
    mainMenuButton.setAttribute("cx", 600)
    mainMenuButton.setAttribute("cy", 500)
    mainMenuButton.setAttribute("r", 90)
    mainMenuText.setAttribute("x", 545)
    mainMenuText.setAttribute("y", 510)
    mainMenuText.appendChild(mainMenuTextNode)
    svg.appendChild(mainMenuButton)
    svg.appendChild(mainMenuText)
}

//sets the target onto the screen 
function addTarget(){
    let svg = document.getElementById("screen")  
    if(mode ==  1){
        hits++
        updateScoreBoard();
        clearAll();
        svg.appendChild(liveTimer)
        cx = Math.floor(Math.random() * (screenSizeX - 2*tapRadius) + tapRadius)
        cy = Math.floor(Math.random() * (screenSizeY - 2*tapRadius) + tapRadius)
        tapTarget.setAttribute("id", "tap")
        tapTarget.setAttribute("cx", cx)
        tapTarget.setAttribute("cy", cy)
        tapTarget.setAttribute("r", tapRadius)
        tapTarget.setAttribute("fill", "#89b4fa")
        svg.appendChild(tapTarget)
    }
        if(mode == 2){
        svg.appendChild(liveTimer)
        cx = Math.floor(Math.random() * (screenSizeX - 2*trackRadius) + trackRadius)
        cy = Math.floor(Math.random() * (screenSizeY - 2*trackRadius) + trackRadius)
        trackTarget.setAttribute("id", "tap")
        trackTarget.setAttribute("cx", cx)
        trackTarget.setAttribute("cy", cy)
        trackTarget.setAttribute("r", trackRadius)
        trackTarget.setAttribute("fill", "#89b4fa")
        trackTarget.setAttribute("id", "trackBall")
        svg.appendChild(trackTarget)
        }
}



//updates the score on screen and keeps track and updates other state variables
function updateScoreBoard(){
    let svg = document.getElementById("screen")
    
    if(mode == 1){
        let svg = document.getElementById("screen")
        tapShotLiveCounter = document.createTextNode(hits+"/"+shots)
        liveCounter = document.createElementNS( svgNS, "text")
        liveCounter.setAttribute("x", 10)
        liveCounter.setAttribute("y", 35)
        liveCounter.setAttribute("stroke", "#f9e2af")
        liveCounter.setAttribute("font-family", "Comic Sans MS, Comic Sans")
        liveCounter.setAttribute("font-size", "30px")
        liveCounter.appendChild(tapShotLiveCounter)
        svg.appendChild(liveCounter)
        accuracy = Math.round(hits/shots*100)
        score = Math.round(hits*accuracy) //This is how the score is determinded for Tap Shot gamemode
    }
    if(mode == 2){
        if(gameStarted != true){
        gameStarted = true
        trackerLiveCounter = document.createElementNS( svgNS, "text")
        trackerScoreCounter = document.createTextNode(trackerScore)
        trackerLiveCounter.setAttribute("x", 10)
        trackerLiveCounter.setAttribute("y", 35)
        trackerLiveCounter.setAttribute("stroke", "#f9e2af")
        trackerLiveCounter.setAttribute("font-family", "Comic Sans MS, Comic Sans")
        trackerLiveCounter.setAttribute("font-size", "30px")
        trackerLiveCounter.appendChild(trackerScoreCounter) 
        svg.appendChild(trackerLiveCounter)
    }
        if(hoveringBall == true){
            trackerScore+=3 //score increases by 3 while hovering
        }
        if(hoveringBall == false){
            trackerScore-- //score decreases by 1 while off target
        }
        trackerScoreCounter.nodeValue = trackerScore
    }
        
   
}


window.addEventListener("load", function() {
    //elements set to variables to be used when needed
	const svg = document.getElementById("screen")
    const tapShot = document.getElementById("tapShot")
    const tracker = document.getElementById("tracker")
    const howToPlay = document.getElementById("howToPlay")
    const tapShotText = document.getElementById("tapShotText")
    const trackerText = document.getElementById("trackerText")
    const howToPlayText = document.getElementById("howToPlayText")
    const selectMode = document.getElementById("selectMode")
    const start = document.getElementById("play")
    const textPath = document.getElementById("textPath")
    const textPathElement = document.getElementById("textPathElement")
    const path = document.getElementById("howToPath")
    const tapShotPath = document.getElementById("tapShotPath")
    const trackerPath = document.getElementById("trackerPath")
    const tapShotInfoHeading = document.getElementById("tapShotInfoHeading")
    const tapShotInfo = document.getElementById("tapShotInfo")
    const trackerInfoHeading = document.getElementById("trackerInfoHeading")
    const trackerInfo = document.getElementById("trackerInfo")


    //Starts the game removes unneeded elements and sets the screen
    start.addEventListener("click", function(event) {
        let play = document.getElementById("play");
        play.remove()
        textPath.remove()
        textPathElement.remove()
        tapShotPath.remove()
        trackerPath.remove()
        tapShotInfoHeading.remove()
        tapShotInfo.remove()
        trackerInfoHeading.remove()
        trackerInfo.remove()
        
        svg.style.opacity = "1"
        svg.style.cursor = "crosshair"	
    });
    
    //click events for for users choice of gamemode
    tapShot.addEventListener("click", function(event){
        mode = 1
        clearAll()
        addStartGameButton()
    })
    tapShotText.addEventListener("click", function(event){
        mode = 1
        clearAll()
        addStartGameButton()
    })

    tracker.addEventListener("click", function(event){
        mode = 2
        clearAll()
        addStartGameButton()
    })
    trackerText.addEventListener("click", function(event){
        mode = 2
        clearAll()
        addStartGameButton()
    })
    howToPlay.addEventListener("click", function(event){
        mode = 3
        svg.removeChild(tapShot)
        svg.removeChild(tracker)
        svg.removeChild(howToPlay)
        svg.removeChild(tapShotText)
        svg.removeChild(trackerText)
        svg.removeChild(howToPlayText)
        svg.removeChild(selectMode)
        svg.appendChild(path)
        textPathElement.appendChild(textPath)
        svg.appendChild(textPathElement)
        svg.appendChild(tapShotPath)
        svg.appendChild(trackerPath)
        svg.appendChild(tapShotInfoHeading)
        svg.appendChild(tapShotInfo)
        svg.appendChild(trackerInfoHeading)
        svg.appendChild(trackerInfo)
        scoreBoard()
    })
    howToPlayText.addEventListener("click", function(event){
        mode = 3
        svg.removeChild(tapShot)
        svg.removeChild(tracker)
        svg.removeChild(howToPlay)
        svg.removeChild(tapShotText)
        svg.removeChild(trackerText)
        svg.removeChild(howToPlayText)
        svg.removeChild(selectMode)
        
        svg.appendChild(path)
        textPathElement.appendChild(textPath)
        svg.appendChild(textPathElement)
        svg.appendChild(tapShotPath)
        svg.appendChild(trackerPath)
        svg.appendChild(tapShotInfoHeading)
        svg.appendChild(tapShotInfo)
        svg.appendChild(trackerInfoHeading)
        svg.appendChild(trackerInfo)
        scoreBoard()
    })
    
    //starts a timer of 60 seconds clears screen, adds target, and sets the values of the game
    startButton.addEventListener("click", function(event){
        startTimer(60);
        clearAll();
        addTarget();
        shots = -1; //set to -1 because once user presses start the shots add 1
        hits = 0;
        accuracy = 0;
        score = 0;
    })
    startText.addEventListener("click", function(event){
        startTimer(60)
        clearAll()
        addTarget()
        shots = -1
        hits = 0
        accuracy = 0
        score = 0
    })

    //adds new target when user clicks on a target
    tapTarget.addEventListener("click", function(event){
        addTarget()
    })

    //when user hovers target the target starts to move and updates the variable
    trackTarget.addEventListener("mouseenter", function(event){
        hoveringBall = true
        if (gameStarted != true){
        trackerScore = 0
        moveBallTimer()
        }
    })

    //updates variable when users mouse leaves the target
    trackTarget.addEventListener("mouseleave", function(event){
        hoveringBall = false
    })

    //adds +1 shots every click anywhere on screen and updates the score board every time
    svg.addEventListener("click", function(event){
        if(mode == 1){
        shots++
        liveCounter.removeChild(tapShotLiveCounter)
        updateScoreBoard()
    }
    })

    //removes un needed elements and appends the main menu elements back to the screen
    mainMenuButton.addEventListener("click", function(event){
        if(gameStarted == true){
            trackerScoreboardFinal.removeChild(trackerScoreCounter)
            gameStarted = false
        }
        if(mode == 1 || mode == 2){}
        svg.removeChild(mainMenuButton)
        svg.removeChild(mainMenuText)
        clearAll()
        svg.append(selectMode, tapShot, tracker, howToPlay, tapShotText, trackerText, howToPlayText)
    })
    mainMenuText.addEventListener("click", function(event){
        if(gameStarted == true){
            trackerScoreboardFinal.removeChild(trackerScoreCounter)
            gameStarted = false
        }
        svg.removeChild(mainMenuButton)
        svg.removeChild(mainMenuText)
        clearAll()
        svg.append(selectMode, tapShot, tracker, howToPlay, tapShotText, trackerText, howToPlayText)
    })

});