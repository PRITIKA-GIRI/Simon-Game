colors=["green","red","yellow","blue"];
var user_sequence=[];
var color_sequence=[];
var level=1;
//to detect if any key has been pressed to start the game
$(document).keypress(function() {  
   if(level==1){
    next_sequence();
   }

});

//to increase level of the game by adding the color sequence to color_sequence array
function next_sequence(){
    user_sequence=[];
    $("h1").text("Level "+ level);

    var random_number=Math.floor(Math.random()*4);
    var chosen_color=colors[random_number];
    color_sequence.push(chosen_color);

    play_sound(chosen_color);
    pressed_button(chosen_color);
  
    level++;
  
}

//to detect which buttons have been clicked and adding sequence to user_sequence array
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    user_sequence.push(userChosenColor);
    play_sound(userChosenColor);
    pressed_button(userChosenColor);
    check_answer(user_sequence.length -1);
});

//to determine whether color_sequence and use_sequence has been matching or not 
function check_answer(current_index){
 if(user_sequence[current_index]===color_sequence[current_index]){
    if (user_sequence.length === color_sequence.length) {
        setTimeout(next_sequence, 1000);
    }
    }
    //if not matched game over and start again
    else{
        play_sound("wrong");
        $("h1").text("Game over!! Press any key to restart.")
        $("body").addClass("game-over");
        setTimeout(function() {
        $("body").removeClass("game-over");
        }, 200); 
        start_over();
    }

}
// Restart the game
function start_over() {
    level = 1;
    color_sequence = [];
    user_sequence = [];
}

//to play sound 
function play_sound(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}

//to animate the pressed button
function pressed_button(button_color){
    $("."+button_color).addClass("pressed");
    setTimeout(function() {
        $("."+button_color).removeClass("pressed");
    }, 100); 
   

}

   
