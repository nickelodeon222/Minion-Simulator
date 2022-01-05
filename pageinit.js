const Game = {};

const bananaCounter = document.getElementById("bananaCount");
const feedButton = document.getElementById("feedMinion");
Game.minionSong = new Howl({
src: ['minion.mp3']
});
Game.vectorSound = new Howl({
    src: ['ah-curse-you-tiny-toilet.mp3']
})
Game.bananaAmount = 0;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // true for mobile device)
    document.querySelector("div").style = '';
}

/**
 * Class that represents an item in the game
 */
Game.GameItem = class {
    amount = 0;

    /**
     * The amount of bananas you will have after each second with this item
     * @param {number} bananaAmount 
     */
    profit() {
        return this.amount * this.bananaPerSecond;
    }

    /**
     * Creates a new item
     * @param {number} startingCost The base price of your item 
     * @param {string} name The name of your item 
     * @param {number} bps The bananas per second one of this item makes
     * @param {HTMLElement} button The button that displays the cost and amount of your item
     */
    constructor(startingCost, name, bps, button) {
        this.cost = startingCost;
        this.name = name;
        this.bananaPerSecond = bps;
        this.button = button
        this.baseCost = startingCost;

        this.button.addEventListener('click', () => {
            if (bananaAmount >= this.cost) {
                bananaAmount -= this.cost;
                this.increase();
                bepsMultiplier = 1.01;
            }
        });
    }
    
    /**
     * Increases the amount of items and the cost (DOESN'T DECREASE YOUR AMOUNT OF BANANAS)
     * @param {number} amount 
     */
    increase() {
        this.amount++;
        for (let i = 0; i < this.amount; i++) {
            this.cost = this.baseCost + (this.cost / 10);
        }
        this.button.innerHTML = `${this.name}, cost: ${this.cost.toFixed(2)} bananas, amount: ${this.amount}, bps: ${this.bananaPerSecond}`;
        if (this.name === 'killVector') {
            Game.vectorSound.play();
        }
    }
}
    
// Creates an item called the banana tree with 0.5 bps
Game.bananaTree = new Game.GameItem(10, "banana tree", 0.5, document.getElementById('bananaTreeButton'));

// Creates an item called the banana farm with 2 bps
Game.bananaFarm = new Game.GameItem(100, "banana farm", 2, document.getElementById('bananaFarmButton'));

Game.importedBananas = new Game.GameItem(500, "import bananas", 5, document.getElementById('importButton'));

Game.slaveLabour = new Game.GameItem(1000, "minion labour", 10, document.getElementById("labourButton"));

Game.humanLabour = new Game.GameItem(5000, "human labour", 50, document.getElementById('humanButton'));

Game.killVector = new Game.GameItem(10000, 'kill vector', 100, document.getElementById('vectorButton'));

Game.balls = new Game.GameItem(50000, 'balls', 500, document.getElementById('ballsButton'));

Game.eatenBananas = 0;
Game.bepsMultiplier = 1.01;

Game.allItems = [Game.bananaTree, Game.bananaFarm, Game.importedBananas, Game.slaveLabour, Game.humanLabour, Game.killVector, Game.balls];

if (document.cookie) {
    load();
}

// code for saving and cookies
function setCookie(cname, cvalue)  {
    document.cookie = cname + "=" + cvalue + "; path=/";
}
  
Game.save = () => {
    setCookie('bananas', Game.bananaAmount);
    Game.allItems.forEach(item => {
        setCookie(`${item.name}Amount`, item.amount);
    })
    setCookie('eatenBananas', Game.eatenBananas);
    setCookie('multiplier', Game.bepsMultiplier);
}

Game.deleteSave = () => {
    setCookie('bananas', 0);
    Game.allItems.forEach(item => {
        setCookie(`${item.name}Amount`, 0);
        setCookie(`${item.name}Price`, item.baseCost);
    })
    setCookie('eatenBananas', 0);
    setCookie('multiplier', 1.01);
}

Game.load = () => {
    Game.bananaAmount = parseFloat(getCookie('bananas'));
    Game.eatenBananas = parseFloat(getCookie('eatenBananas'));
    Game.bepsMultiplier = parseFloat(getCookie('multiplier'));
    Game.allItems.forEach(item => {
        item.amount = parseInt(getCookie(`${item.name}Amount`));
        for (let i = 0; i < item.amount; i++) {
            item.cost = item.baseCost + (item.cost / 10);
        }

        item.button.innerHTML = `${item.name}, amount: ${item.amount}, cost: ${item.cost} bananas, bps: ${item.bananaPerSecond}`
    })
    
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
        c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
    }
    }
    return "";
}