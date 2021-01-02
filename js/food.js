class Food
{
    constructor()
    {
      this.foodImg=createSprite(100,100);
      this.foodStock;
      this.lastFed;
      this.image=loadImage("images/Milk.png");
    }

    display()
    {
      foodImg.addImage(this.image)
    }
    
  getFoodStock()
  {
    var foodStock = database.ref("foodS");
    foodStock.on("value",function(data){
      foodStock=data.val();
    })
  }

  updateFoodStock(foodS){
    var foodStock = "foodS";
    database.ref(foodStock).set({
      foodS:foodStock
    });
  }

  deductFood(foodS)
  {
    if(keyDown==="space")
    {
      foodS-=1
    }
  }
}