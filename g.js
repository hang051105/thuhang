function welcomeUser() {
    const name = prompt("What is your full name?");
    if (name) {
        alert(`Welcome ${name} to the ice cream shop!`);
    } else {
        alert("Welcome to the ice cream shop!");
    }
}
class IceCream {
    constructor(name, ingredients, basePrice) {
        this.name = name;
        this.ingredients = ingredients;
        this.basePrice = basePrice;
    }  
}        
class IceCreamShop {
    playBackgroundMusic() {
        const backgroundMusic = document.getElementById('background-music');
        backgroundMusic.play();
    }
    constructor() {
        this.storage = {
            Chocolate: 10,
            Sprinkles: 5,
            Cones: 6,
            Vanilla: 8,
        };
        this.money = 100;
        this.day = 1;
        this.dailySalesLimit = 3;
        this.iceCreams = [
            new IceCream("Chocolate Delight", { Chocolate: 3, Cones: 1 }, 20),
            new IceCream("Sprinkle Surprise", { Sprinkles: 2, Cones: 1 }, 25),
            new IceCream("Vanilla Dream", { Vanilla: 2, Cones: 1 }, 15)
        ];
        this.presidents = [
            "Barack Obama", "Donald Trump", "Abraham Lincoln",
            "George Washington", "Vladimir Putin", 
            "Angela Merkel", "Emmanuel Macron", 
            "Queen Elizabeth II", "Nelson Mandela"
        ];
        this.dialogues = [
            "Obama walks in and says: 'Is this the Hope and Change flavor?'",
            "Trump demands: 'This better be the biggest, most beautiful ice cream ever. Believe me!'",
            "Lincoln exclaims: 'Four scoops and seven sprinkles ago...'",
            "Washington says proudly: 'I cannot tell a lie... I want chocolate!'",
            "Putin, in his usual calm voice: 'In Russia, we don't ask for ice cream, ice cream asks for us.'",
            "Merkel nods approvingly: 'This ice cream will bring unity to Europe!'",
            "Macron asks, 'Do you have something as sophisticated as French ice cream?'",
            "Queen Elizabeth II declares: 'One must enjoy ice cream with dignity.'",
            "Mandela smiles and says: 'After all those years, this ice cream is the sweetest freedom.'"
        ];
        
        document.getElementById('start-button').addEventListener('click', () => {
            this.startGame();
        });

        document.getElementById('buy-button').addEventListener('click', () => {
            this.purchaseSupplies();
        });
        
        document.getElementById('cancel-button').addEventListener('click', () => {
            this.cancelRestock();
        });
    }

    startGame() {
        this.playBackgroundMusic();
        document.getElementById('intro-container').style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
        this.updateDayInfo();
        this.manageShop();
        
    }

    updateDayInfo() {
        document.getElementById('day-info').innerText = `--- Day ${this.day} --- You can sell 3 ice creams today.`;
        this.renderShopOptions();
    }

    renderShopOptions() {
        const shopOptions = document.getElementById('shop-options');
        shopOptions.innerHTML = `
            <button onclick="iceCreamShop.displayStorage()">Display Ingredients</button>
            <button onclick="iceCreamShop.takeCustomerOrder()">Take Order</button>
            <button onclick="iceCreamShop.showRestockForm()">Restock Ingredients</button>
            <button onclick="iceCreamShop.displayMoney()">Display Money</button>
            <button onclick="iceCreamShop.displayRecipeBook()">Recipe Book</button>
            <button onclick="iceCreamShop.nextDay()">End Day</button>
            <button onclick="iceCreamShop.endGame()">Exit Game</button>
        `;
    }

    showRestockForm() {
        document.getElementById('restock-form').style.display = 'block';
        document.getElementById('shop-options').style.display = 'none';
    }

    cancelRestock() {
        document.getElementById('restock-form').style.display = 'none';
        document.getElementById('shop-options').style.display = 'block';
    }

    purchaseSupplies() {
        const itemSelect = document.getElementById('item-select');
        const selectedIndex = itemSelect.selectedIndex;
        const quantity = parseInt(document.getElementById('quantity-input').value);

        let cost;
        switch (selectedIndex) {
            case 0:
                cost = quantity * 5;
                if (this.money >= cost) {
                    this.storage.Chocolate += quantity;
                    this.money -= cost;
                    alert(`You bought ${quantity} Chocolate.`);
                } else {
                    alert("Not enough money.");
                }
                break;
            case 1:
                cost = quantity * 10;
                if (this.money >= cost) {
                    this.storage.Sprinkles += quantity;
                    this.money -= cost;
                    alert(`You bought ${quantity} Sprinkles.`);
                } else {
                    alert("Not enough money.");
                }
                break;
            case 2:
                cost = quantity * 2;
                if (this.money >= cost) {
                    this.storage.Cones += quantity;
                    this.money -= cost;
                    alert(`You bought ${quantity} Cones.`);
                } else {
                    alert("Not enough money.");
                }
                break;
            case 3:
                cost = quantity * 4;
                if (this.money >= cost) {
                    this.storage.Vanilla += quantity;
                    this.money -= cost;
                    alert(`You bought ${quantity} Vanilla.`);
                } else {
                    alert("Not enough money.");
                }
                break;
            default:
                alert("Invalid selection.");
        }
        this.cancelRestock();
        this.renderShopOptions();
    }

    displayStorage() {
        const container = document.getElementById('shop-options');
        let storageDisplay = '<h2>Inventory</h2><ul class="storage-list">';
        for (const item in this.storage) {
            storageDisplay += `<li>${item}: ${this.storage[item]}</li>`;
        }
        storageDisplay += '</ul>';
        container.innerHTML = storageDisplay;
        this.addBackButton();
    }

    displayMoney() {
        const container = document.getElementById('shop-options');
        container.innerHTML = `<p><strong style="font-size: 24px;">Money: ${this.money}</strong></p>`;
        this.addBackButton();
    }

    displayRecipeBook() {
        const container = document.getElementById('shop-options');
        let recipeDisplay = '<h2>Ice Cream Recipe Book</h2><ul class="recipe-list">';
        this.iceCreams.forEach((iceCream, index) => {
            recipeDisplay += `<li>${index + 1}. ${iceCream.name} (Base Price: ${iceCream.basePrice} money)</li>`;
            recipeDisplay += '<ul>';
            for (const ingredient in iceCream.ingredients) {
                recipeDisplay += `<li>${ingredient}: ${iceCream.ingredients[ingredient]}</li>`;
            }
            recipeDisplay += '</ul>';
        });
        recipeDisplay += '</ul>';
        container.innerHTML = recipeDisplay;
        this.addBackButton();
    }
    

    addBackButton() {
        const container = document.getElementById('shop-options');
        container.innerHTML += `<button class="back-button" onclick="iceCreamShop.renderShopOptions()">Back</button>`;
    }

    takeCustomerOrder() {
        if (this.dailySalesLimit <= 0) {
            alert("You have completed all orders for today. See you tomorrow!");
            return;
        }

        const presidentIndex = Math.floor(Math.random() * this.presidents.length);
        const president = this.presidents[presidentIndex];
        const dialogue = this.dialogues[presidentIndex];
        
        const customerOrder = this.iceCreams[Math.floor(Math.random() * this.iceCreams.length)];
        document.getElementById('order-ingredients').innerHTML = '';
        
        document.getElementById('customer-name').innerText = `Customer: ${president}`;
        document.getElementById('customer-dialogue').innerText = dialogue;
        document.getElementById('order-ingredients').innerHTML = `<strong>Order: ${customerOrder.name}</strong>`;
        

       
        for (const ingredient in customerOrder.ingredients) {
            document.getElementById('order-ingredients').innerHTML += `
                <label>${ingredient} :</label>
                <input type="number" id="${ingredient}-input" min="0" value="0">
                <br>
            `;
        }

       
        document.getElementById('order-form').style.display = 'block';
        document.getElementById('shop-options').style.display = 'none';

       
        document.getElementById('submit-order-button').onclick = () => {
            this.processOrder(customerOrder);
        };

        
        document.getElementById('cancel-order-button').onclick = () => {
            this.cancelOrder();
        };
    }

    processOrder(customerOrder) {
        const playerSelection = {};
        for (const ingredient in customerOrder.ingredients) {
            playerSelection[ingredient] = parseInt(document.getElementById(`${ingredient}-input`).value) || 0;
        }

        if (this.verifyCrafting(customerOrder, playerSelection)) {
            for (const ingredient in playerSelection) {
                this.storage[ingredient] -= playerSelection[ingredient];
            }
            this.haggleIceCreamSale(customerOrder);
            this.dailySalesLimit--;
            alert(`Successfully served ${customerOrder.name} to the customer!`);
        } else {
            this.dailySalesLimit--;
            alert("Oops! It looks like you used the wrong ingredients!\nJoe chuckles and says: 'Don't worry, folks! Mistakes happen! Give it another try!");
        }

        this.cancelOrder();
    }

    cancelOrder() {
        document.getElementById('order-form').style.display = 'none';
        document.getElementById('shop-options').style.display = 'block';
    }


    processOrder(customerOrder) {
        const playerSelection = {};
        for (const ingredient in customerOrder.ingredients) {
            playerSelection[ingredient] = parseInt(document.getElementById(`${ingredient}-input`).value) || 0;
        }

        if (this.verifyCrafting(customerOrder, playerSelection)) {
            for (const ingredient in playerSelection) {
                this.storage[ingredient] -= playerSelection[ingredient];
            }
            this.haggleIceCreamSale(customerOrder);
            this.dailySalesLimit--;
            alert(`Successfully served ${customerOrder.name} to the customer!`);
        } else {
              this.dailySalesLimit--;
            alert("Oops! It looks like you used the wrong ingredients!\nJoe chuckles and says: 'Don't worry, folks! Mistakes happen! Give it another try!");
        }

        this.cancelOrder();
    }

    cancelOrder() {
        document.getElementById('order-form').style.display = 'none';
        document.getElementById('shop-options').style.display = 'block';
    }

    verifyCrafting(iceCream, playerSelection) {
        for (const ingredient in iceCream.ingredients) {
            if (playerSelection[ingredient] !== iceCream.ingredients[ingredient]) {
                return false;
            }
        }
        return true;
    }

    haggleIceCreamSale(iceCream) {
        const choice = parseInt(prompt("Would you like to negotiate for a better price? (1 = Yes, 2 = No):"));
        if (choice === 1) {
            const rng = Math.random() * 100;
            if (rng <= 50) {
                const newPrice = iceCream.basePrice * 1.3;
                this.money += newPrice;
                alert(`Negotiation successful! You sold ${iceCream.name} for ${newPrice} money.`);
            } else if (rng <= 80) {
                const newPrice = iceCream.basePrice * 0.8;
                this.money += newPrice;
                alert(`Negotiation unsuccessful! You sold ${iceCream.name} for only ${newPrice} money.`);
            } else {
                this.money += iceCream.basePrice;
                alert(`Neutral outcome, sold at base price: ${iceCream.basePrice} money.`);
            }
        } else {
            this.money += iceCream.basePrice;
            alert(`You sold it for ${iceCream.basePrice} money.`);
        }
    }
    
    nextDay() {
        const confirmEndDay = confirm("Are you sure you want to end the day?");
        if (!confirmEndDay) return;
    
        if (this.day < 3) {
            this.day++;
            this.dailySalesLimit = 3;
            alert(`\nDay ${this.day} has started. You can sell 3 ice creams today.`);
            this.updateDayInfo();
        } else {
            this.endGame();
        }
    }
    

   endGame() {
    const confirmEndGame = confirm("Are you sure you want to exit the game?");
    if (!confirmEndGame) return;
    this.displayEnding();
    this.resetGame(); 
    }
}

    resetGame() {
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('intro-container').style.display = 'block';

    this.money = 100;
    this.day = 1;
    this.dailySalesLimit = 3;
    
    this.storage = {
        Chocolate: 10,
        Sprinkles: 5,
        Cones: 6,
        Vanilla: 8,
    };

    this.updateDayInfo();
    const backgroundMusic = document.getElementById('background-music');
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0; 
    
}

    displayEnding() {
        if (this.money >= 200) {
            alert(`Congratulations! You have saved ${this.money} money and kept Joe Biden's ice cream shop open!`);
        } else if (this.money >= 150) {
            alert(`Not bad! You earned " << money << " money. Joe's shop survives, but it’s going to be tough.`);
        } else {
            alert(`Oh no! You only saved ${this.money} money, which is far from the requirement to save the shop.`);
        }
    }
    
}

const iceCreamShop = new IceCreamShop();
