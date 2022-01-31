//@ts-check

const Game = {};

const bananaCounter = document.getElementById("bananaCount");
const feedButton = document.getElementById("feedMinion");
Game.minionName = 'JACOB';
// @ts-ignore
Game.minionSong = new Howl({
src: ['minion.mp3']
});
// @ts-ignore
Game.vectorSound = new Howl({
    src: ['ah-curse-you-tiny-toilet.mp3']
})
Game.bananaAmount = 0;


Game.allItems = [];

/**
 * Class that represents an item in the game
 */
Game.GameItem = class {
    amount = 0;

    /**
     * The amount of bananas you will have after each second with this item
     */
    profit() {
        return this.amount * this.bananaPerSecond;
    }

    /**
     * Creates a new item
     * @param {number} baseCost The base price of your item 
     * @param {string} name The name of your item 
     * @param {number} bps The bananas per second one of this item makes
     */
    constructor(baseCost, name, bps) {
        Game.allItems.push(this);
        this.cost = baseCost;
        this.name = name;
        this.bananaPerSecond = bps;
        this.baseCost = baseCost;
        this.button = document.createElement('button');

        this.button.innerHTML = `${this.name}, cost: ${this.cost.toFixed(2)} bananas, amount: ${this.amount}, bps: ${this.bananaPerSecond}`;

        this.button.addEventListener('click', () => {
            if (Game.bananaAmount >= this.cost) {
                Game.bananaAmount -= this.cost;
                this.increase();
                Game.bepsMultiplier = 1.01;
            }
        });
    }
    
    /**
     * Increases the amount of items and the cost (DOESN'T DECREASE YOUR AMOUNT OF BANANAS)
     */
    increase() {
        this.amount++;
        for (let i = 0; i < this.amount; i++) {
            this.cost += this.cost / 10;
        }
        this.button.innerHTML = `${this.name}, cost: ${this.cost.toFixed(2)} bananas, amount: ${this.amount}, bps: ${this.bananaPerSecond}`;
        if (this.name === 'killVector') {
            Game.vectorSound.play();
        }
    }
}
    
// Creates an item called the banana tree with 0.5 bps
Game.bananaTree = new Game.GameItem(10, "banana tree", 0.5);

// Creates an item called the banana farm with 2 bps
Game.bananaFarm = new Game.GameItem(100, "banana farm", 2);

Game.importedBananas = new Game.GameItem(500, "import bananas", 5);

Game.slaveLabour = new Game.GameItem(1000, "minion labour", 10);

Game.humanLabour = new Game.GameItem(5000, "human labour", 50);

Game.killVector = new Game.GameItem(10000, 'kill vector', 100);

Game.balls = new Game.GameItem(50000, 'balls', 500);

Game.eatenBananas = 0;
Game.bepsMultiplier = 1.01;

// code for saving and cookies
/**
 * @param {string} cname
 * @param {any} cvalue
 */
function setCookie(cname, cvalue)  {
    document.cookie = cname + "=" + cvalue + "; SameSite=strict; path=/";
}
  
Game.save = () => {
    setCookie('bananas', Game.bananaAmount);
    Game.allItems.forEach(item => {
        setCookie(`${item.name}Amount`, item.amount);
    })
    setCookie('eatenBananas', Game.eatenBananas);
    setCookie('multiplier', Game.bepsMultiplier);
    setCookie('name', Game.minionName);
}

Game.deleteSave = () => {
    setCookie('bananas', 0);
    Game.allItems.forEach(item => {
        setCookie(`${item.name}Amount`, 0);
        setCookie(`${item.name}Price`, item.baseCost);
    })
    setCookie('eatenBananas', 0);
    setCookie('multiplier', 1.01);
    setCookie('name', "JACOB");
}

Game.load = () => {
    Game.bananaAmount = parseFloat(getCookie('bananas'));
    Game.eatenBananas = parseFloat(getCookie('eatenBananas'));
    Game.bepsMultiplier = parseFloat(getCookie('multiplier'));
    Game.minionName = getCookie('name').toUpperCase();
    // @ts-ignore
    document.getElementById('minionNamer').placeholder = Game.minionName;
    document.getElementById('nameDisplay').innerHTML = `THE MINION'S NAME IS ${Game.minionName}`;

    Game.allItems.forEach(item => {
        item.amount = parseInt(getCookie(`${item.name}Amount`));
        item.cost = item.baseCost;
        for (let i = 0; i < item.amount; i++) {
            item.cost += item.cost / 10;
        }

        item.button.innerHTML = `${item.name}, amount: ${item.amount}, cost: ${item.cost} bananas, bps: ${item.bananaPerSecond}`;
        if (item.amount >= 1) {
            const li = document.createElement('li');
            document.querySelector("ul").appendChild(li);
            li.appendChild(item.button);
        }
    })
    
}

/**
 * @param {string} cname
 */
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

if (document.cookie !== '') {
    Game.load();
}