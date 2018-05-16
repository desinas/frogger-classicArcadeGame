/**
* @description Representation of enemy class - bug vehicles
* @constractor Function that produce a new enemy on the game deck 
* @param {number} x - Horizontal pixels on canvas
* @param {number} y - Vertical pixels on canvas
* Enemies generated from this class are vehicles passing the street
* in order to collide and run over the player - frog 
*/  
var Enemy = function (x, y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 50;
    this.speed = this.randomSpeed = 10 + Math.random() * 100 +40;
    this.sprite = 'images/enemy-bug.png';
};
 
/**
* @param {number} dt - time delta between ticks
* Update method defined on Enemy's instances to update the enemy's position,
* so that to erase the previous and draw the enemy at the current position,
* to make an illusion of movement of enemies in the game deck
* Any movement is multyplied by the dt parameter, which will ensure
* the game runs at the same speed for all computers.
*/
Enemy.prototype.update = function(dt) {
    
    if (this.x < 500) {
        this.x += (dt) * this.speed;
    } else {
        this.x = -200;
        this.speed = this.speed + 10 +Math.random() *32;
    }
};

// Render method defined on Enemy's instances
// to draw the enemy's sprite on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @description Representation of player class - the frog
* @constractor Function that produce a new enemy on the game deck 
* @param {number} x - Horizontal pixels on canvas
* @param {number} y - Vertical pixels on canvas
*/
var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 75;
    this.sprite = 'images/char-boy.png';
};

/**
* Update method defined on Player's instances to update the enemy's position,
* so that to erase the previous and draw the enemy at the current position,
* to make an illusion of movement of enemies in the game deck.
* If player reaches the top of the game deck this is a game win.
*/
Player.prototype.update = function(dt) {
    if (this.y < 0) {
        alert("You did it!");
        this.reset(202, 388);
    }
};

// Render method on player to redraw on canvas, so to make a move
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle input method on player to take a keystroke
// and make a move to the player by reposition him on the game deck
Player.prototype.handleInput = function (direction) {
    if (direction === 'left' && this.x > -25) {
        this.x -= 50;
    }
    if (direction === 'right' && this.x < 425) {
        this.x += 50;
    }
    if (direction === 'up' && this.y > 0) {
        this.y -= 41;
    }
    if (direction === 'down' && this.y < 366) {
        this.y += 41;
    }
};

// Reset method defined on player and invoke it on game win
// so the player to have a new try
Player.prototype.reset = function(x, y) {
    this.x = x;
    this.y = y;
};

// Instantiation of the enemy objects,
// all enemy objects placed in an array called allEnemies
var allEnemies = [
    new Enemy(-202, 56),
    new Enemy(-202, 56),
    new Enemy(-202, 139),
    new Enemy(-202, 222)
];

// Instantiation of the player object
var player = new Player(0, 469);

// Check collisions function to check if the player is crashed by an enemy
function checkCollisions(allEnemies, player) {
    for (var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x < player.x + player.width/3 &&
            allEnemies[i].x + allEnemies[i].width/3 > player.x &&
            allEnemies[i].y < player.y + player.height &&
            allEnemies[i].height + allEnemies[i].y > player.y) {
            player.reset(0, 469);
        }
    }
}

// Browser's document attahed an event listener for key pressed and released
// and sends the key to Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
