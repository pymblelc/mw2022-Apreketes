var apikey = '61a3fa6c34abfc7f972efbfd';
var recipesUrl = 'https://apreketes-68e3.restdb.io/rest/recipes';
var userUrl = 'https://apreketes-68e3.restdb.io/rest/accounts';

/* --- Functions --- */

function getRecipes(mealType, userPreference, recipesUrl, apikey) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": recipesUrl,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache",
            
        }
    }
    
    $.ajax(settings).done(function (response) {
        for(var i=0; i<response.length; i++){
            console.log("Checking for user pref", mealType, "and", userPreference);
            console.log("From db", response[i].recipetimeofday, "and", response[i].diet);
            //console.log(response[i].Name);
            if(mealType == response[i].recipetimeofday && 
                userPreference == response[i].diet) {
                console.log("hello")
                var recipeItem = '<div class="recipe" id="' + response[i]._id + '">' + "<span class= 'recipeName' >" + response[i].recipename +"</span>" + "<a href=" + response[i].url + ">" + response[i].url + "</a>" + "</div>";
                $("#mealButtons").append(recipeItem);
            }

           
        }
    });
}

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
        if (response) {
            localStorage.setItem('user', response._id);
            window.location.href = './survey/index.html';
        }
    });
}

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
        if (response.length > 0) {
            //Save user for accessing later
            localStorage.setItem('user', response[0]._id);
            
            window.location.href = 'mealChoices.html';

        } else {
            //TODO: DISPLAY ERROR MESSAGE SAYING 'USER DOES NOT EXIST'
        }
        
    });
}

/*document.getElementById("back").classList.add("hidden");
document.getElementById("recipes").classList.add("hidden");*/

/*
document.getElementById('nav--bar').addEventListener('click', function (e) {
    e.preventDefault();
    const target = e.target;
    if (target.classList.contains('link--a')) {
        const id = target.getAttribute('href').slice(1);
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    }
});
*/
//

$('#btnSubmitSignUp').click(function(){
    console.log('signin up');
    //var tempItem = {Name: $('#Name').val(),AnimalType: $('#AnimalType').val(),Description: $('#Description').val(), ImguserUrl: $('#ImguserUrl').val() };
    // document.getElementById("mealButtons").style.visibility = "visible";
    // document.getElementById("button").style.visibility = "hidden";

    var userProfile = {firstName: $('#firstName').val(), lastName: $('#lastName').val(), DOB: $('#DOB').val(), email: $('#email').val(), username: $('#username').val(), password: $('#password').val()};
    submitUser(userProfile, userUrl, apikey);

    //document.getElementById("login-form").classList.add("hidden");
    //document.getElementById("mealButtons").classList.remove("hidden");
})

$('#btnSubmitSignIn').click(function(){
    //var md5Hash = CryptoJS.MD5("Test");
    //console.log(md5Hash)
    //var tempItem = {Name: $('#Name').val(),AnimalType: $('#AnimalType').val(),Description: $('#Description').val(), ImguserUrl: $('#ImguserUrl').val() };
    // document.getElementById("mealButtons").style.visibility = "visible";
    // document.getElementById("button").style.visibility = "hidden";

    var username = $('#username').val()
    var password = $('#password').val()
    logUserIn(userUrl, apikey, username, password);

    //document.getElementById("login-form").classList.add("hidden");
    //document.getElementById("mealButtons").classList.remove("hidden");
})

$('#dinner-btn').click(function(){
    /*
    document.getElementById("mealButtons").classList.add("hidden");
    document.getElementById("recipes").classList.remove("hidden");
    console.log('hello');
    getRecipes(recipesUrl,apikey);
    document.getElementById("recipes").innerHTML = 'https://www.taste.com.au/recipes/chicken-caesar-veggie-wraps/7voSwi5x?r=recipes/lunchrecipes&c=0fa1cf4f-809b-4ee7-88a0-72da8e8543a4/Lunch%20recipes';
    document.getElementById("back").classList.remove("hidden");
    */
    getUserPreference("Dinner", userUrl, apikey, localStorage.getItem('user'))

})

$('#breakfast-btn').click(function(){
    /*
    document.getElementById("mealButtons").classList.add("hidden");
    document.getElementById("recipes").classList.remove("hidden");
    console.log('hello');
    document.getElementById("recipes").innerHTML = 'https://www.cookinglight.com/recipes/avocado-toast-recipe';
    document.getElementById("back").classList.remove("hidden");
    */
    getUserPreference("breakfast", userUrl, apikey, localStorage.getItem('user'))
})



$('#lunch-btn').click(function(){
    /*
    document.getElementById("mealButtons").classList.add("hidden");
    document.getElementById("recipes").classList.remove("hidden");
    console.log('hello');
    document.getElementById("recipes").innerHTML = 'https://www.bbcgoodfood.com/recipes/chicken-pasta-bake';
    document.getElementById("back").classList.remove("hidden");
    */
    getUserPreference("Lunch", userUrl, apikey, localStorage.getItem('user'))

})

$('#back').click(function(){
    document.getElementById("back").classList.add("hidden");
    document.getElementById("recipes").classList.add("hidden");
    document.getElementById("mealButtons").classList.remove("hidden");

})

$("#username").text(localStorage.getItem("username"))