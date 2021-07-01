var dog, food, database;
var img1, img2;
var fedTime, lastFed;
var foodObj
var feed, addFood;

function preload() {
    img1 = loadImage("images/dogimg.png");
    img2 = loadImage("images/dogimg1.png");
}

function setup() {
    database = firebase.database();
    createCanvas(800, 700);
    foodObj = new Food()
    dog = createSprite(400, 500, 20, 20);
    dog.addImage(img2);
    dog.scale = 0.15

    feed = createButton("feed the dog");
    feed.position(700, 95)
    feed.mousePressed(feedDog);

    addFood = createButton("Add food");
    addFood.position(800, 95);
    addFood.mousePressed(addFoods);
}

function draw() {
    background("green")
    fedTime = database.ref("lastFeed");
    fedTime.on("value", function(data) {
        lastFed = data.val();
    })
    fill(255);
    textSize(15)
    if (lastFed >= 12) {
        text("last Feed: " + lastFed % 12 + "PM", 350, 30)
    } else if (lastFed == 0) {
        text("last Feed: " + lastFed + "AM", 350, 30)
    } else {
        text("last Feed: " + lastFed + "AM", 350, 30);
    }
    foodObj.display();
    drawSprites();
}

function readStock(data) {
    food = data.val();
    foodObj.updateFoodStock(food)
}

function feedDog(x) {
    dog.addImage(img1);
    foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
    database.ref('/').update({
        food: foodObj.getFoodStock(),
        lastFeed: hour()
    })
}

function addFoods() {
    food++;
    database.ref('/').update({
        food: 20
    })
}