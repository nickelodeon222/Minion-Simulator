const bananaCounter = document.getElementById("bananaCount");
const feedButton = document.getElementById("feedMinion");
const minionSong = new Howl({
src: ['minion.mp3']
});
const vectorSound = new Howl({
    src: ['ah-curse-you-tiny-toilet.mp3']
})
let bananaAmount = 0;

/**
 * Class that represents an item in the game
 */
 class GameItem {
    amount = 0;

    /**
     * The amount of bananas you will have after each second with this item
     * @param {number} bananaAmount 
     */
    profit() {
        return this.amount * this.bananaPerSecond
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
    }
    
    /**
     * Increases the amount of items and the cost (DOESN'T DECREASE YOUR AMOUNT OF BANANAS)
     * @param {number} amount 
     */
    increase() {
        this.amount++;
        this.cost = this.cost + (this.cost / 10);
        this.button.innerHTML = `${this.name}, cost: ${this.cost.toFixed(2)} bananas, amount: ${this.amount}, bps: ${this.bananaPerSecond}`;
    }
}
    

// The button to buy the tree
const bananaTreeButton = document.getElementById('bananaTreeButton');

// Creates an item called the banana tree with 0.5 bps
const bananaTree = new GameItem(10, "banana tree", 0.5, bananaTreeButton);


const bananaFarmButton = document.getElementById('bananaFarmButton');

// Creates an item called the banana farm with 2 bps
const bananaFarm = new GameItem(100, "banana farm", 2, bananaFarmButton);


const importButton = document.getElementById('importButton');

const importedBananas = new GameItem(500, "import bananas", 5, importButton);


const labourButton = document.getElementById("labourButton");

const slaveLabour = new GameItem(1000, "minion labour", 10, labourButton);


const humanButton = document.getElementById('humanButton');

const humanLabour = new GameItem(5000, "human labour", 50, humanButton);


const vectorButton = document.getElementById('vectorButton');

const killVector = new GameItem(100000, 'kill vector', 100, vectorButton);

let eatenBananas = 0;
let bepsMultiplier = 1.01;

const allItems = [bananaTree, bananaFarm, importedBananas, slaveLabour, humanLabour, killVector];

if (document.cookie) {
    load();
}

// code for saving and cookies
function setCookie(cname, cvalue)  {
    document.cookie = cname + "=" + cvalue + "; path=/";
}
  
function save() {
    setCookie('bananas', bananaAmount);
    allItems.forEach(item => {
        setCookie(`${item.name}Amount`, item.amount);
        setCookie(`${item.name}Price`, item.cost);
    })
    setCookie('eatenBananas', eatenBananas);
    setCookie('multiplier', bepsMultiplier);
}

function load() {
    bananaAmount = parseFloat(getCookie('bananas'));
    eatenBananas = parseFloat(getCookie('eatenBananas'));
    bepsMultiplier = parseFloat(getCookie('multiplier'));
    allItems.forEach(item => {
        item.amount = parseInt(getCookie(`${item.name}Amount`));
        item.cost = parseFloat(getCookie(`${item.name}Price`));
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