const bananaCounter = document.getElementById("bananaCount");
const feedButton = document.getElementById("feedMinion");
const minionSong = new Howl({
src: ['minion.mp3']
});
const vectorSound = new Howl({
    src: ['ah-curse-you-tiny-toilet.mp3']
})

let bananaAmount = 0;

// Increases the number of bananas by one when the "Feed minion" button is clicked

feedButton.addEventListener('click', () => {
    minionSong.play();
    bananaAmount++;
    bananaCounter.innerHTML = `YOU HAVE ${Math.floor(bananaAmount)} BANANAS`;
});

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

// Buys a tree on click of the buy button
bananaTreeButton.addEventListener('click', () => {
    if (bananaAmount >= bananaTree.cost) {
        bananaAmount -= bananaTree.cost;
        bananaTree.increase();
        bepsMultiplier = 1.01;
    }
})

const bananaFarmButton = document.getElementById('bananaFarmButton');

// Creates an item called the banana farm with 2 bps
const bananaFarm = new GameItem(200, "banana farm", 2, bananaFarmButton);

// Buys a farm on click of the buy button
bananaFarmButton.addEventListener('click', () => {  ;
    if (bananaAmount >= bananaFarm.cost) {
        bananaAmount -= bananaFarm.cost;
        bananaFarm.increase()
        bepsMultiplier = 1.01;
    }
});

const importButton = document.getElementById('importButton');

const importedBananas = new GameItem(1000, "import bananas", 5, importButton);

// Buys imported bananas when pressed
importButton.addEventListener('click', () => {  
    if (bananaAmount >= importedBananas.cost) {
        bananaAmount -= importedBananas.cost;
        importedBananas.increase();
        bepsMultiplier = 1.01;
    }
})

const labourButton = document.getElementById("labourButton");

const slaveLabour = new GameItem(1000, "minion labour", 10, labourButton);

// Buys a slave on click of the buy button
labourButton.addEventListener('click', () => {  
    if (bananaAmount >= slaveLabour.cost) {
        bananaAmount -= slaveLabour.cost;
        slaveLabour.increase();
        bepsMultiplier = 1.01;
    }
})

const humanButton = document.getElementById('humanButton');

const humanLabour = new GameItem(10000, "human labour", 50, humanButton)

// Buys a human slave on click of the buy button
humanButton.addEventListener('click', () => {  
    if (bananaAmount >= humanLabour.cost) {
        bananaAmount -= humanLabour.cost;
        humanLabour.increase();
        bepsMultiplier = 1.01;
    }
})

const vectorButton = document.getElementById('vectorButton');

const killVector = new GameItem(500000, 'kill vector', 100, vectorButton);

vectorButton.addEventListener('click', () => {  
    if (bananaAmount >= killVector.cost) {
        bananaAmount -= killVector.cost;
        killVector.increase();
        bepsMultiplier = 1.01;
        vectorSound.play();
    }
})

let eatenBananas = 0;
let bepsMultiplier = 1.01;

const allItems = [bananaTree, bananaFarm, importedBananas, slaveLabour, humanLabour, killVector];

// Increases your bananas by your BPS every second
const loop = setInterval(() => {
    // Displays your bps
    const bps = bananaFarm.profit() + bananaTree.profit() + slaveLabour.profit() + humanLabour.profit() + importedBananas.profit() + killVector.profit();
    const bpsCounter = document.getElementById('bpsCounter');
    bpsCounter.innerHTML = `${bps} bananas per second`;

    bananaAmount += bps;

    // if your bps doesn't equal zero, the minion eats the bananas, and the beps is shown
    if (!bps == 0) {
        const bananasEatenPerSecond = bps / 3 * bepsMultiplier;
        bepsMultiplier *= 1.001;
        bananaAmount -= bananasEatenPerSecond;
        eatenBananas += bananasEatenPerSecond;

        const bananasEatenCounter = document.getElementById('eatenBananasCount');
        bananasEatenCounter.innerHTML = `THE MINION HAS EATEN ${Math.floor(eatenBananas)} BANANAS`;

        const bepsCounter = document.getElementById('bepsCount');
        bepsCounter.innerHTML = `THE MINION EATS ${(bananasEatenPerSecond).toFixed(2)} OF YOUR BANANAS PER SECOND`
    }

    bananaCounter.innerHTML = `YOU HAVE ${Math.floor(bananaAmount)} BANANAS`;

    if (bananaAmount < 0) {
        alert('THE MINION ATE ALL THE BANANAS');
        clearInterval(loop);
        bananaAmount = 0;   
    }

    allItems.forEach(item => {
        if (bananaAmount >= item.cost / 2 && item.button.hidden) {
            item.button.hidden = false;
        } 
    })
}, 1000);