//@ts-check

// Increases the number of bananas by one when the "Feed minion" button is clicked

feedButton.addEventListener('click', () => {
    Game.minionSong.play();
    Game.bananaAmount++;
    bananaCounter.innerHTML = `YOU HAVE ${Math.floor(Game.bananaAmount)} BANANAS`;
});

const saveButton = document.getElementById('saveButton');

saveButton.addEventListener("click", () => {
    Game.save();
});

const resetButton = document.getElementById('resetButton');

resetButton.addEventListener("click", () => {
    if (window.confirm('are you sure you want to delete it?')) {
        Game.deleteSave();
        location.reload();
    }
});

let minionIsYellow = true;

document.getElementById('colourButton').addEventListener('click', () => {
    if (minionIsYellow) {
        // @ts-ignore
        document.getElementById('minionImage').src = 'minion-purple.jpg'
        minionIsYellow = false;
    }
    else {
        // @ts-ignore
        document.getElementById('minionImage').src = 'minion.jpg'
        minionIsYellow = true;
    }
});

document.getElementById('nameMinionButton').addEventListener('click', () => {
    const nameInput = document.querySelector('#minionNamer');

    // @ts-ignore
    if (nameInput.value != '') {
        // @ts-ignore
        nameInput.placeholder = nameInput.value.toUpperCase();
        // @ts-ignore
        Game.minionName = nameInput.value.toUpperCase();
        // @ts-ignore
        nameInput.value = '';
        document.getElementById('nameDisplay').innerHTML = `THE MINION'S NAME IS ${Game.minionName}`;
    }
});

// Increases your bananas by your BPS every second
const loop = setInterval(() => {
    // Displays your bps
    let bps = 0;
    Game.allItems.forEach(item => {
        bps += item.profit();
        if (Game.bananaAmount >= item.cost / 2 && item.button.hidden) {
            item.button.hidden = false;
        } 
    })
    
    const bpsCounter = document.getElementById('bpsCounter');
    bpsCounter.innerHTML = `${bps} bananas per second`;

    Game.bananaAmount += bps;

    // if your bps doesn't equal zero, the minion eats the bananas, and the beps is shown
    if (bps !== 0) {
        const bananasEatenPerSecond = bps / 3 * Game.bepsMultiplier;
        Game.bepsMultiplier *= 1.001;
        Game.bananaAmount -= bananasEatenPerSecond;
        Game.eatenBananas += bananasEatenPerSecond;

        const bananasEatenCounter = document.getElementById('eatenBananasCount');
        bananasEatenCounter.innerHTML = `THE MINION HAS EATEN ${Math.floor(Game.eatenBananas)} BANANAS`;

        const bepsCounter = document.getElementById('bepsCount');
        bepsCounter.innerHTML = `THE MINION EATS ${(bananasEatenPerSecond).toFixed(2)} OF YOUR BANANAS PER SECOND`
    }

    bananaCounter.innerHTML = `YOU HAVE ${Math.floor(Game.bananaAmount)} BANANAS`;

    if (Game.bananaAmount < 0) {
        alert('THE MINION ATE ALL THE BANANAS');
        clearInterval(loop);
        Game.bananaAmount = 0;   
    }

}, 1000);
