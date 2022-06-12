let userName=document.getElementById("username");
let gridItems=document.querySelectorAll(".griditems");
let start=document.getElementById("start");
let restart=document.getElementById("restart");
let playagn=document.getElementById("playagain");
let score=document.getElementById("scoreval");
let score36=document.getElementById("scoreval36");
let finalscore=document.getElementById("finalscore");
let gmOver=document.getElementById("gmover");
let Level2=document.getElementById("level2");
//window.localStorage.clear();
let scoretracker=[0];
let scoretracker36=[0];
let tiletracker;
let lvl2=0;

let gridItems36=document.getElementsByClassName("griditems36");
let Start36=document.getElementById("start36");
let Restart36=document.getElementById("restart36");
Start36.addEventListener("click",startgame36);
Restart36.addEventListener("click",restartgame36);
let tiletracker36;
let a=0;
let arr36=[];
let lit_up_tiles36=[];
for(let i=0;i<36;i++){
    arr36.push(i);
}
start.addEventListener("click",startgame);
restart.addEventListener("click",restartgame);
playagn.addEventListener("click",playagain);

let lit_up_tiles=[];
var wrongaudio=new Audio("wrongclick.mp3");
var correctaudio=new Audio("correctclick.mp3");
var gamemusic=new Audio("gamemusic.mp3")
let lay1=document.querySelector(".sec1")//useername screen
let lay2=document.querySelector(".sec2")//game screen
let lay3=document.querySelector(".sec3");//gameover
let lay4=document.querySelector(".sec4")//leaderboard
let lay5=document.querySelector(".sec5")
let layout=document.querySelector(".body")

// STOPWATCH
var seconds = 00; 
var tens = 00; 
var appendTens = document.getElementById("tens")
var appendSeconds = document.getElementById("seconds")
var appendTens36 = document.getElementById("tens36")
var appendSeconds36 = document.getElementById("seconds36")
var Interval ;
//
let highScores=JSON.parse(localStorage.getItem("highScores")) || [];
let highScores36=JSON.parse(localStorage.getItem("highScores36")) || [];
let highscoreList=document.getElementById("highscorelist");
let highscoreList36=document.getElementById("highscorelist36");

//lay1.parentNode.removeChild(lay1)
lay2.parentNode.removeChild(lay2)//Removes the game screen..username only will be there
lay3.parentNode.removeChild(lay3)
lay4.parentNode.removeChild(lay4)
lay5.parentNode.removeChild(lay5)
Level2.addEventListener("click",function (){
    lvl2=1;
    lay2.parentNode.removeChild(lay2);
    layout.appendChild(lay5);
    resetimer();
    gamemusic.pause();
    gamemusic.currentTime=0;

})


for(let i=0;i<16;i++){
    let j=i+1;
    gridItems[i].classList.add(`tile${j}`)
    
}
let randarr=[];
for(let i=0;i<16;i++){
    randarr.push(i);
}

function time(ms){
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,ms);
    })
}

async function startgame(){
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);//calls the start tier every 10 ms
    gamemusic.loop=true;
    gamemusic.play();
    
    await time(1000);
    window.requestAnimationFrame(gameloop);
   
    
}
async function startgame36(){
    
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);//calls the start tier every 10 ms
    gamemusic.loop=true;
    gamemusic.play();
    console.log("A");
    await time(1000);
    window.requestAnimationFrame(gameloop36);
   
    
}
function restartgame(){
    window.location.reload();
}
function restartgame36(){
    window.location.reload();
}
function randgen(){//returns unique integers from 0-15 everytime
    let rand=randarr[Math.floor(Math.random()*(randarr.length))]
    let ind=randarr.indexOf(rand);
    randarr.splice(ind,1);
    return rand;
}
function randgen36(){
    let rand=arr36[Math.floor(Math.random()*(arr36.length))]
    let ind=arr36.indexOf(rand);
    arr36.splice(ind,1);
    return rand;
}

async function gameloop(){
    
    
    lightup();
    await time(100);
    window.requestAnimationFrame(clicktile);
}
async function gameloop36(){
    
    
    lightup36();
    await time(100);
    window.requestAnimationFrame(clicktile36);
}
async function lightup(){

    let randm=randgen();
    lit_up_tiles.push(randm);
    
    for(let a=0;a<lit_up_tiles.length;a++){
        gridItems[lit_up_tiles[a]].classList.add("tilelightup");
        setTimeout(function (){gridItems[lit_up_tiles[a]].classList.remove("tilelightup")},150);
        await time(750);
        
    }
}
async function lightup36(){

    let randm=randgen36();
    lit_up_tiles36.push(randm);
    
    for(let a=0;a<lit_up_tiles36.length;a++){
        gridItems36[lit_up_tiles36[a]].classList.add("tilelightup");
        setTimeout(function (){gridItems36[lit_up_tiles36[a]].classList.remove("tilelightup")},150);
        await time(750);
        
    }
}
function clicktile(){
    let max_noof_clicks=lit_up_tiles.length;
    let no_of_clicks=0;
    
    for(let i=0;i<16;i++){
        gridItems[i].addEventListener("click",function kpo(){
            
                
                tiletracker=i;
                no_of_clicks++;
                gridItems[i].removeEventListener("click",kpo);
                checktile(max_noof_clicks,no_of_clicks);

            })
    }
}
function clicktile36(){
    let max_noof_clicks=lit_up_tiles36.length;
    let no_of_clicks=0;
    
    for(let i=0;i<36;i++){
        gridItems36[i].addEventListener("click",function kpo(){
            
                
                tiletracker36=i;
                no_of_clicks++;
                gridItems36[i].removeEventListener("click",kpo);
                checktile36(max_noof_clicks,no_of_clicks);

            })
    }
}

async function checktile(max_noof_clicks,no_of_clicks){
    if(no_of_clicks<=max_noof_clicks){
        
        if(lit_up_tiles.includes(tiletracker)){
            gridItems[tiletracker].classList.add("correctclick");
            score.innerHTML=scoreupdate(scoretracker);
            correctaudio.play();
            setTimeout(function (){gridItems[tiletracker].classList.remove("correctclick")},200);
            
            if(no_of_clicks==16){
                gamemusic.pause();
                gamemusic.currentTime=0;
                lay2.parentNode.removeChild(lay2)
                layout.appendChild(lay3);
                gmOver.innerHTML="You Won"
                finalscore.innerHTML=scoretracker[0];
                savescore();
            }

        }
        else{
            gridItems[tiletracker].classList.add("wrongclick");
            wrongclickact();
            setTimeout(function (){gridItems[tiletracker].classList.remove("wrongclick")},200);
            await time(300);
            lay2.parentNode.removeChild(lay2)
            layout.appendChild(lay3);
            finalscore.innerHTML=scoretracker[0];
            savescore();
        }
    }
    if(no_of_clicks==max_noof_clicks){
        
        await time(500);
        window.requestAnimationFrame(gameloop);
        
    }
    else{
        return;
    }
    
    
}
async function checktile36(max_noof_clicks,no_of_clicks){
    if(no_of_clicks<=max_noof_clicks){
        
        if(lit_up_tiles36[a]==tiletracker36){
            a++;
            gridItems36[tiletracker36].classList.add("correctclick");
            
            score36.innerHTML=scoreupdate36(scoretracker36);
            correctaudio.play();
            setTimeout(function (){gridItems36[tiletracker36].classList.remove("correctclick")},200);
            if(no_of_clicks==36){
                gamemusic.pause();
                gamemusic.currentTime=0;
                lay2.parentNode.removeChild(lay2)
                layout.appendChild(lay3);
                gmOver.innerHTML="You Won"
                finalscore.innerHTML=scoretracker36[0];
                savescore();
            }

        }
        else{
            gridItems36[tiletracker36].classList.add("wrongclick");
            wrongclickact();
            setTimeout(function (){gridItems36[tiletracker36].classList.remove("wrongclick")},200);
            await time(300);
            lay5.parentNode.removeChild(lay5)
            layout.appendChild(lay3);
            finalscore.innerHTML=scoretracker36[0];
            a=0;
            savescore()

        }
    }
    if(no_of_clicks==max_noof_clicks){
        a=0;
        await time(500);
        window.requestAnimationFrame(gameloop36);
        
    }
    else{
        return;
    }
    
    
}
function gameover(){
   
}
function readybtn(){
    
    lay1.parentNode.removeChild(lay1);
    layout.appendChild(lay2)
}
function wrongclickact(){

    gamemusic.pause();
    gamemusic.currentTime=0;
    wrongaudio.play();
    stoptimer();
    resetimer();
    score.innerHTML="00"
    score36.innerHTML="00"
    
}       
        


  


function s() {
  
  clearInterval(Interval);
   Interval = setInterval(startTimer, 10);//calls the start tier every 10 ms
   
}

function stoptimer() {
     clearInterval(Interval);
}


function resetimer() {
   clearInterval(Interval);
   tens = "00";
   seconds = "00";
   
   appendTens.innerHTML = tens;
   appendTens36.innerHTML = tens;
   appendSeconds.innerHTML = seconds;
   appendSeconds36.innerHTML = seconds;
}

 
function startTimer(){
    console.log("B")
    tens++; 
  
    if(tens <= 9){
        appendTens.innerHTML = "0" + tens;
        appendTens36.innerHTML = "0" + tens;

    }
  
    if (tens > 9){
        appendTens.innerHTML = tens;
        appendTens36.innerHTML = tens;
   
    } 
  
    if (tens > 99) {
        
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        appendSeconds36.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
        appendTens36.innerHTML = "0" + 0;
    }

    if (seconds > 9){
        appendSeconds.innerHTML = seconds;
        appendSeconds36.innerHTML = seconds;
    }

}

function playagain(){
    window.location.reload();
}
function savescore(){
    if(lvl2==0){
        savehighscore();
    }
    else if(lvl2==1){
        savehighscore36();
    }
    lvl2=0;
}

function leadbtn(){
    lay3.parentNode.removeChild(lay3);
    layout.appendChild(lay4);
    
    displead();
    displead36();
}

function scoreupdate(scoretracker){
    scoretracker[0]+=10;
    
    let a=`${scoretracker}`
    return a;
}
function scoreupdate36(scoretracker36){
    scoretracker36[0]+=10;
    let a=`${scoretracker36}`
    return a;
}

function savehighscore(){
    let ind={
        Username:userName.value,
        Points:scoretracker[0]
    }
    highScores.push(ind);
    highScores.sort((a,b)=> b.Points-a.Points);
    highScores.splice(5);
    localStorage.setItem("highScores",JSON.stringify(highScores));
}
function savehighscore36(){
    let ind={
        Username:userName.value,
        Points:scoretracker36[0]
    }
    highScores36.push(ind);
    highScores36.sort((a,b)=> b.Points-a.Points);
    highScores36.splice(5);
    localStorage.setItem("highScores36",JSON.stringify(highScores36));
}
//display leaderboard
function displead(){
    highscoreList.innerHTML+=highScores.map(ind=>{
        return `<li class="lihighscore">${ind.Username} ${ind.Points}<li>`
    }).join("")
}
function displead36(){
    highscoreList36.innerHTML+=highScores36.map(ind=>{
        return `<li class="lihighscore">${ind.Username} ${ind.Points}<li>`
    }).join("")
}
