var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var level=0;
var click=0;
function nextSequence(){
  userClickedPattern=[];
  click=0;
  level+=1;
  $("h1").text("LEVEL "+(level));
  var randomNumber= Math.floor(Math.random()*4);
  // console.log(randomNumber);
  var randomChosenColour= buttonColours[randomNumber];
  // console.log(randomChosenColour);
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
}
$(".btn").click(function(){
  click+=1;
  var userChosenColour=this.id;
  console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  animatePress(userChosenColour);
  var audio= new Audio("sounds/"+userChosenColour+".mp3");
  audio.play();
  checkAnswer();
});
// nextSequence();
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}
var check=0;
$('html').keydown(function(){
  check+=1;
  if (check===1){
    setTimeout(function(){
      nextSequence();
    },600);
  }
});
function checkAnswer(){
  var x=userClickedPattern.length-1;
  if (gamePattern[click-1]===userClickedPattern[x]){
    console.log("success");
    if (click===level){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    console.log("failure");
    $('body').addClass("game-over")
    setTimeout(function(){
      var over=new Audio("sounds/wrong.mp3");
      over.play();
      $('body').removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart")
    $('html').keydown(function(){
      // C:\Users\Hp\Desktop\WEB DEVELOPMENT\SIMON-GAME\index.html.reload();
      location=location;
    });
  }
  // if (JSON.stringify(gamePattern)===JSON.stringify(userClickedPattern)){
  //   console.log("success");
  //   setTimeout(function(){
  //     nextSequence();
  //   },1000);
  // }
  // else if(JSON.stringify(gamePattern)!=JSON.stringify(userClickedPattern) && (click+1===level)){
  //   console.log("failure");
  // }
  // else{
  //   console.log("beech ka");
  // }
}
