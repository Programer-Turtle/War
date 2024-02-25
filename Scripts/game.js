var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var right1 = false, left1 = false, shoot1 = false, right2 = false, left2 = false, shoot2 = false
var GameRunning = true
const Player1Health = document.getElementById("Player1Health"), Player2Health = document.getElementById("Player2Health")

grid = 20
player = 
{
    x:canvas.width/2-grid,
    y:400 - grid*2,
    health: 100
}

player2 = 
{
    x:canvas.width/2,
    y:0 + grid,
    health: 100
}

class Laser
{
    constructor(x, y)
    {
        this.laser = {x: x, y: y-grid}
    }
    movelaser()
    {
        var i = setInterval(() => {
            if (this.laser.y == 0)
            {
                clearInterval(i)
            }
            this.laser.y -= grid
            context.fillStyle = "rgb(255, 185, 56"
            context.clearRect(this.laser.x, this.laser.y + grid, grid, grid);
            context.fillRect(this.laser.x + grid / 4, this.laser.y, grid / 2, grid)
            if(this.laser.y == player2.y && this.laser.x == player2.x)
            {
                player2.health-=2
                clearInterval(i)
                context.clearRect(this.laser.x, this.laser.y, grid, grid);
            }
            var touchingWalLeft = this.laser.y == canvas.height/2 && this.laser.x <= grid
            var touchingWalMiddle = this.laser.y == canvas.height/2 && this.laser.x >= grid*8 && this.laser.x <= grid*11
            var touchingWalRight = this.laser.y == canvas.height/2 && this.laser.x > grid*17
            if(touchingWalLeft || touchingWalMiddle || touchingWalRight)
            {
                clearInterval(i)
                context.clearRect(this.laser.x, this.laser.y, grid, grid);
                DrawWalls()
            }
            drawPlayer2()
        }, 50);
    }
}

class Laser2
{
    constructor(x, y)
    {
        this.laser = {x: x, y: y+grid}
    }
    movelaser()
    {
        var i = setInterval(() => {
            if (this.laser.y == 400-grid)
            {
                clearInterval(i)
            }
            this.laser.y += grid
            context.fillStyle = "rgb(79, 79, 245)"
            context.clearRect(this.laser.x, this.laser.y - grid, grid, grid);
            context.fillRect(this.laser.x + grid / 4, this.laser.y, grid / 2, grid)
            if(this.laser.y == player.y && this.laser.x == player.x)
            {
                player.health-=2
                clearInterval(i)
                context.clearRect(this.laser.x, this.laser.y, grid, grid);
            }
            var touchingWalLeft = this.laser.y == canvas.height/2 && this.laser.x <= grid
            var touchingWalMiddle = this.laser.y == canvas.height/2 && this.laser.x >= grid*8 && this.laser.x <= grid*11
            var touchingWalRight = this.laser.y == canvas.height/2 && this.laser.x > grid*17
            if(touchingWalLeft || touchingWalMiddle || touchingWalRight)
            {
                clearInterval(i)
                context.clearRect(this.laser.x, this.laser.y, grid, grid);
                DrawWalls()
            }
            drawPlayer1()
        }, 50); 
    }
}

function DrawWalls()
{
    context.fillStyle = "red"
    context.fillRect(0, (canvas.height/2)+grid/4, grid*2, grid/2)
    context.fillRect((canvas.width/2)-grid*2, (canvas.height/2)+grid/4, grid*4, grid/2)
    context.fillRect((canvas.width)-grid*2, (canvas.height/2)+grid/4, grid*2, grid/2)
}

function drawPlayer1()
{
    context.clearRect(0, player.y, canvas.width, grid);
    context.fillStyle = "orange"
    context.fillRect(player.x, player.y, grid, grid)
}

function drawPlayer2()
{
    context.clearRect(0, player2.y, canvas.width, grid);
    context.fillStyle = "blue"
    context.fillRect(player2.x, player2.y, grid, grid)
}

//When key is down
document.addEventListener("keydown", function(event) 
{
    if(event.key == "ArrowRight")
    {
        right1 = true
    }
    else if(event.key == "ArrowLeft")
    {
        left1 = true
    }
    else if(event.key == "ArrowUp")
    {
        shoot1 = true
    }
    else if(event.key == "d")
    {
        right2 = true
    }
    else if(event.key == "a")
    {
        left2 = true
    }
    else if(event.key == "w")
    {
        shoot2 = true
    }
});

//When key is up
document.addEventListener("keyup", function(event) 
{
    if(event.key == "ArrowRight")
    {
        right1 = false
    }
    else if(event.key == "ArrowLeft")
    {
        left1 = false
    }
    else if(event.key == "ArrowUp")
    {
        shoot1 = false
    }
    else if(event.key == "d")
    {
        right2 = false
    }
    else if(event.key == "a")
    {
        left2 = false
    }
    else if(event.key == "w")
    {
        shoot2 = false
    }
});

function Restart()
{
    //Player 1
    player.x = canvas.width/2-grid
    player.health = 100

    //Player2
    player2.x = canvas.width/2
    player2.health = 100

    //Draw
    drawPlayer1()
    drawPlayer2()
    DrawWalls()

    //Starts Game
    GameRunning = true
}

function DisplayWinner(Winner)
{
    GameRunning = false
    context.clearRect(0, 0, canvas.width, canvas.height);
    Player1Health.innerText = ""
    Player2Health.innerText = `${Winner} Won`
    setTimeout(function(){
        Restart() 
   },3000); //delay is in milliseconds
}

function CheckIfPlayerDead()
{
    if(player.health <= 0)
    {
        DisplayWinner("Player 2")
    }
    else if(player2.health <= 0)
    {
        DisplayWinner("Player 1")
    }
}

function move()
{
    //Player1
    if(right1 == true && player.x != 400 - grid)
    {
        player.x+=grid
        drawPlayer1()
    }
    if(left1 == true && player.x != 0)
    {
        player.x-=grid
        drawPlayer1()
    }
    if(shoot1 == true)
    {
        const laser = new Laser(player.x, player.y)
        laser.movelaser()
    }

    //Player2
    if(right2 == true && player2.x != 400 - grid)
    {
        player2.x+=grid
        drawPlayer2()
    }
    if(left2 == true && player2.x != 0)
    {
        player2.x-=grid
        drawPlayer2()
    }
    if(shoot2 == true)
    {
        const laser = new Laser2(player2.x, player2.y)
        laser.movelaser()
    }
}

var counter = 0

function UpdateHealth()
{
    counter+=1
        
    if(counter == 25)
    {
        //Add to health
        if(player.health != 100)
        {
            player.health+=5
        }
        if(player2.health != 100)
        {
            player2.health+=5
        }

        //Sets to 100 if goes over 
        if(player.health > 100)
        {
            player.health = 100
        }
        if(player2.health > 100)
        {
            player2.health = 100
        }

        //Resets Counter
        counter = 0
    }

    

    //SetHealthBar
    Player1Health.innerText = `Player 1 Health\n${player.health}`
    Player2Health.innerText = `Player 2 Health\n${player2.health}`
}

var i = setInterval(() => {
    if(GameRunning == true)
    {
        move()
        UpdateHealth()
        CheckIfPlayerDead()
    }
    else
    {
        counter = 0
    }
}, 100)

drawPlayer1()
drawPlayer2()
DrawWalls()