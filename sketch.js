var dog,happyDog,dogSprite;
var foodS,foodStock,foodObj,foodImg;
var hour;
var db;
function preload()
{
  dog=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png"); 
}
function setup() {
  createCanvas(500,500);
  db=firebase.database();
  dogSprite=createSprite(250,250,20,20);
  dogSprite.addImage(dog);
  dogSprite.scale=0.25;

  foodStock=db.ref('food');
  foodStock.on("value",readstock);

  foodObj=new Food();

  addFood=createButton("add food");
  addFood.position(500,95);
  addFood.mousePressed(addFoods);

  feed=createButton("feed");
  feed.position(600,95);
  feed.mousePressed(feedDog);
}
function draw() {  
  background(46,139,87);
  fill(255,255,255);
  text("food remaing: "+foodS,175,150);

  fedTime=db.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  drawSprites();
  //add styles here
}
function readstock(data)
{
  foodS=data.val();
}
function writeStock(x)
{
  db.ref('/').update({
    food:x
  })
}
function addFoods()
{
  if(foodS<20)
  {
    foodS+=1;
    db.ref('/').set({
      Food:foodS
    })
  }
}
function feedDog()
{
  if(foodS>0)
  {
    foodS-=1
    writeStock(foodS)
    dogSprite.addImage(happyDog);
    hour();
  }
}