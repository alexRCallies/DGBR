var players = [];
var rounds = 6;
var DiceSides = [4, 6, 8, 10, 12, 20];
var round = 1;

function populatePlayers(){
    for (let i = 0; i < 10; i++) {
        var player = {name: "Player " + (i+1), score: 0};
        players.push(player);
    }
    console.log(players);
    createTable();
    roundButton();
}

function EarlyRounds(players){
for (let i = 0; i < players.length; i++) {
    players[i].score = RollDiceSet();
    
    
}
    console.log(players);
    players.sort(function(a,b){return a.score - b.score});
    
    var removedPlayers = players.splice(0,2);
    console.log(players);
    alert(removedPlayers[0].name + ' and ' + removedPlayers[1].name + ' lost');
    createTable();
    
}

function MidRounds(players){
    for (let i = 0; i < players.length; i++) {
        players[i].score = RollDiceSet();
        
        
    }
        console.log(players);
        players.sort(function(a,b){return a.score - b.score});
       
        var removedPlayers = players.shift();
        console.log(players);
        alert(removedPlayers.name + ' lost');
        createTable();
        
}
 function FinalRound(players){
    var dTwentyRollsForPlayerOne = [];
    for (let i = 0; i < 4; i++) {
        dTwentyRollsForPlayerOne.push(randomDiceTotal(20));
        
    }
    players[0].score = dTwentyRollsForPlayerOne[(randomDiceTotal(4))-1]
    
    var dTwentyRollsForPlayerTwo = [];
    for (let i = 0; i < 4; i++) {
        dTwentyRollsForPlayerTwo.push(randomDiceTotal(20));
        
    }
    players[1].score = dTwentyRollsForPlayerOne[(randomDiceTotal(4))-1]
    if (players[0].score > players[1].score) {
        console.log(players[0].name + " wins!");
        alert(players[0].name + ' has won!');
        players.pop();
        displayWinner();
    }
    else if (players[0].score == players[1].score)
    {
        console.log("Draw");
        FinalRound(players);
    }
    else
    {
        console.log(players[1].name + " wins!");
        alert(players[1].name + ' has won!');
        players.shift();
        displayWinner();
    }
}

  
 function RollDiceSet(){
    var result = 0;
     for (let i = 0; i < DiceTotals.length; i++) {
         result += randomDiceSide(DiceTotals[i]);
         
     };
     
     return result;
 }
 function randomDiceSIde(Limit){
     return Math.floor((Math.random() * Limit)+1);
 }
function createTable(){
    var table = '';
    var rows = players.length;
    var cols = 2;
    table += '<thead><tr><th>Player Number</th><th>Score</th></tr></thead><tbody>';
    for (let i = 0; i < rows; i++) {
        table += '<tr>';
        table += '<td>' + players[i].name + '</td>';
        table += '<td>' + players[i].score + '</td>';  
        table += '</tr>';
        
    }
    document.getElementById("playerTable").innerHTML =   '<table>' + table + '</tbody></table>';
}
function displayWinner(){
    
    document.getElementById("playerTable").innerHTML =   '<div><h4 class="text-white">'+ players[0].name + ' is the winner!</h4></div>';
}


function startGame(){
    document.getElementById("DiceGame");
    populatePlayers();
}
function roundButton(){
 document.getElementById("roundButton").innerHTML = '<button onclick="roundStart()" type="button">Round '+ round +'</button>';

}
function restartButton(){
    
    document.getElementById("roundButton").innerHTML = '<button onclick="restartGame()" type="button">Restart Game</button>';
       
       

}
function restartGame(){
    round = 1;
    emptyList();
    populatePlayers();
}
function emptyList(){
    players.length =0;
}

function roundStart(){
    if (round <4) {
        EarlyRounds(players);
        round ++;
        roundButton();
    }
    else if (round >=4 && round <6) {
        MidRounds(players);
        round++;
        roundButton();
    }
    else{
        FinalRound(players);
        restartButton();
    }

}