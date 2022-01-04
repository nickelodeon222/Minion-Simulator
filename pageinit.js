const bananaCounter = document.getElementById("bananaCount");
const feedButton = document.getElementById("feedMinion");
const minionSong = new Howl({
src: ['minion.mp3']
});
const vectorSound = new Howl({
    src: ['ah-curse-you-tiny-toilet.mp3']
})
let bananaAmount = 0;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // true for mobile device)
    document.querySelector("div").style = '';
}

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
    }
}
    
// Creates an item called the banana tree with 0.5 bps
const bananaTree = new GameItem(10, "banana tree", 0.5, document.getElementById('bananaTreeButton'));

// Creates an item called the banana farm with 2 bps
const bananaFarm = new GameItem(100, "banana farm", 2, document.getElementById('bananaFarmButton'));

const importedBananas = new GameItem(500, "import bananas", 5, document.getElementById('importButton'));

const slaveLabour = new GameItem(1000, "minion labour", 10, document.getElementById("labourButton"));

const humanLabour = new GameItem(5000, "human labour", 50, document.getElementById('humanButton'));

const killVector = new GameItem(10000, 'kill vector', 100, document.getElementById('vectorButton'));

const balls = new GameItem(50000, 'balls', 500, document.getElementById('ballsButton'));

let eatenBananas = 0;
let bepsMultiplier = 1.01;

const allItems = [bananaTree, bananaFarm, importedBananas, slaveLabour, humanLabour, killVector, balls];

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
    })
    setCookie('eatenBananas', eatenBananas);
    setCookie('multiplier', bepsMultiplier);
}

function deleteSave() {
    setCookie('bananas', 0);
    allItems.forEach(item => {
        setCookie(`${item.name}Amount`, 0);
        setCookie(`${item.name}Price`, item.baseCost);
    })
    setCookie('eatenBananas', 0);
    setCookie('multiplier', 1.01);
}

function load() {
    bananaAmount = parseFloat(getCookie('bananas'));
    eatenBananas = parseFloat(getCookie('eatenBananas'));
    bepsMultiplier = parseFloat(getCookie('multiplier'));
    allItems.forEach(item => {
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