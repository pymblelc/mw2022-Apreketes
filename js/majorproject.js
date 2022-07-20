//Key for RESTdb.io database
var apikey = '61a3fa6c34abfc7f972efbfd';
var recipesUrl = 'https://apreketes-68e3.restdb.io/rest/recipes';
var userUrl = 'https://apreketes-68e3.restdb.io/rest/accounts';
var mediaUrl = 'https://apreketes-68e3.restdb.io/media/';
document.getElementById("survey").style.display = "none";

/* --- Functions --- */
function getRecipes(mealType, userPreference, recipesUrl, apikey) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": recipesUrl,//mediaURL doesnt work here 
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache",
        }
    }
    //
    $.ajax(settings).done(function (response) {
        console.log(response);
        for(var i=0; i<response.length; i++){
            //console.log("Checking for user pref", mealType, "and", userPreference);
            //console.log("From db", response[i].recipetimeofday, "and", response[i].diet);
            //console.log(response[i].Name);
            if(mealType == response[i].recipetimeofday && 
                userPreference == response[i].diet) {
                var imgURL = mediaUrl + response[i].image[0] + "?s=t";
                //need to use API key when requesting Image 
                //currently throwing a 403 error in console
                var recipeItem = '<div class="recipe" id="' + response[i]._id + '">' + "<span class= 'recipeName'> You Got: " + response[i].recipename +"</span>" + "<a class= 'RepLink' href=" + response[i].url + " target=\"_blank\"> <img id='RECIPEID' src='recipee.png" + "'></a>" + "</div>";
                $("#RecipeItems").empty();
                $("#RecipeItems").append(recipeItem);
            }

           
        }
    });
}



//
function submitUser(user, userUrl, apikey) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": userUrl,
        "method": "POST",
        "headers": {
          "content-type": "application/json",
          "x-apikey": apikey,
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(user)
    }
    
    $.ajax(settings).done(function (response) {
        console.log('User successfully added');
        console.log(response);
        if (response) { //Successfully sign in
            localStorage.setItem('user', response._id);
            
            $("#usernameSignUp").text("Username: "+response.username);
            const usernameSignUp = $("#usernameSignUp").val();
            $("#userName").text("Username: "+ usernameSignUp);
            $('#survey').show();
            $("#SignOutLinkTop").show();
            //$('#MealChoices').show();
            $('#SignIn').hide()
            $('#SignInLinkTop').hide()
            $('#SignUpLinkTop').hide()
        }
    });
}

//RestDb user preference
async function getUserPreference(mealType, url, apikey, username) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `${url}?q={"_id":"${username}"}`,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache"
        }
    }
    var userPreference = ""
    //Wait to get response from database then 
    $.ajax(settings).done(function (response) {
        userPreference = response[0].dietType
        getRecipes(mealType, userPreference, recipesUrl, apikey);
        return userPreference;
    });

}

//checking the logged user with database users 
function logUserIn(url, apikey, username, password){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `${url}?q={"username":"${username}","password":"${password}"}`,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache"
        }
    }
    
    //Wait to get response from database then 
    $.ajax(settings).done(function (response) {
        console.log('response is', response);
        if (response.length > 0) { //credential check successfull
            //Save user for accessing later
            localStorage.setItem('user', response[0]._id);
            $("#userName").text("Username: "+response[0].username);
            $("#dietType").text("Diet: "+response[0].dietType);
            $('#MealChoices').show();
            $('#SignIn').hide()
            $('#SignInLinkTop').hide()
            $('#SignUpLinkTop').hide()
            $('#signInError').hide()
            $("#SignOutLinkTop").show();

        } else {
            //TODO: DISPLAY ERROR MESSAGE SAYING 'USER DOES NOT EXIST'
            $("#signInError").text("Error: Incorrect username or password");
            $('#signInError').show()
        }
        
    });
}





// User makes a profile, and then the sign up hides when they press submit
$('#btnSubmitSignUp').click(function(){
    console.log('signin up');

    var userProfile = {
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      DOB: $("#DOB").val(),
      email: $("#email").val(),
      username: $("#usernameSignUp").val(),
      password: $("#passwordSignUp").val(),
    };

    $('#SignUp').hide();
    submitUser(userProfile, userUrl, apikey) 
    console.log(userProfile);
    return;

    submitUser(userProfile, userUrl, apikey);

})

//This submit button only logs in user's if user's values are entered correctly
//It checks if the values are correct in the database
$('#btnSubmitSignIn').click(function(){
    var username = $('#usernameSignIn').val()
    var password = $('#password').val()
    logUserIn(userUrl, apikey, username, password);

   
})

//When dinner button is clicked, the user's diet dinner options are showed 
$('#dinner-btn').click(function(){
    
    getUserPreference("dinner", userUrl, apikey, localStorage.getItem('user'))

})

//When breakfast button is clicked, the user's diet breakfast options are showed 
$('#breakfast-btn').click(function(){
    
    getUserPreference("breakfast", userUrl, apikey, localStorage.getItem('user'))
})

//When Lunch button is clicked, the user's diet lunch options are showed 
$('#lunch-btn').click(function(){
   
    getUserPreference("lunch", userUrl, apikey, localStorage.getItem('user'))

})

//Back button for Meal Buttons
$('#back').click(function(){
    document.getElementById("back").classList.add("hidden");
    document.getElementById("recipes").classList.add("hidden");
    document.getElementById("mealButtons").classList.remove("hidden");

})

//Hide and Show for Sign In page NAVBAR
$('#SignInLink').click(function(){
    $('#SignIn').show();
    $('#Home').hide();
    $('#SignUp').hide();
    $('#MealChoices').hide();
    $('#survey').hide();
    closeNav();
})


//Hide and Show for Sign In page
$('#SignInLinkTop').click(function(){
    $('#SignIn').show();
    $('#Home').hide();
    $('#SignUp').hide();
    $('#MealChoices').hide();
    $('#survey').hide();
    closeNav();
})

//Hide and Show for Sign Up page 
$('#SignUpLinkTop').click(function(){
    $('#SignIn').hide();
    $('#Home').hide();
    $('#SignUp').show();
    $('#MealChoices').hide();
    $('#survey').hide();
    closeNav();
})

//Hide and Show for SignUp page NAVBAR
$('#SignUpLink').click(function(){
    $('#SignUp').show();
    $('#Home').hide();
    $('#MealChoices').hide();
    $('#SignIn').hide();
    $('#survey').hide();
    closeNav();
})

//Side Nav Bar 
function openNav() {
    document.getElementById("mySidenav").style.width = "450px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }



//TODO: add userName at top of mealchoices 
$("#username").text(localStorage.getItem("username"))


//survey.js
var apikey = '61a3fa6c34abfc7f972efbfd';
var userUrl = 'https://apreketes-68e3.restdb.io/rest/accounts';

const ul_1 = document.querySelector(".option1");
const ul_2 = document.querySelector(".option2");
const ul_3 = document.querySelector(".option3");

const q1 = document.querySelector(".q1");
const q2 = document.querySelector(".q2");
const q3 = document.querySelector(".q3");

const survey = document.querySelector(".survey");
const end = document.querySelector(".end");

function saveDietType(diet) {
    const userID = localStorage.getItem('user');
    var dietData = {"dietType": diet};
    var settings = {
    "async": true,
    "crossDomain": true,
    "url": `${userUrl}/${userID}`,
    "method": "PUT",
    "headers": {
        "content-type": "application/json",
        "x-apikey": apikey,
        "cache-control": "no-cache"
    },
    "processData": false,
    "data": JSON.stringify(dietData)
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        $("#dietType").text("Diet: "+response.dietType);
        $("#SignOutLinkTop").show();
        
    });
}

//First question 
ul_1.addEventListener("click", function() {
    end.style.display = "none";
    q1.style.display = "none";
    q2.style.display = "block";
    console.log(ul_1);
});

//second question 
ul_2.addEventListener("click", function() {
    end.style.display = "none";
    q2.style.display = "none";
    q3.style.display = "block";
    console.log(ul_2);
});

//Display Thanks Messsage
ul_3.addEventListener('click',function() {
    q3.style.display = "none";
    end.style.display = "block";
    console.log(ul_3);
});

end.addEventListener('click',function() {
    end.style.display = "none";
    MealChoices.style.display = "block";
    console.log(MealChoices);
});

//Diet types clicked, are saved with profile in database
$('#veganBtn').click(function(){

    saveDietType("vegan")
})

$('#vegetarianBtn').click(function(){

    saveDietType("vegetarian")
})

$('#glutenBtn').click(function(){
    saveDietType("Gluten Free")
})

$('#noRequirementsBtn').click(function(){
    saveDietType("No Requirements")
})


