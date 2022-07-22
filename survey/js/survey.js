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
    });
}

//First question 
ul_1.addEventListener("click", function() {
    q1.style.display = "none";
    q2.style.display = "block";
    console.log(ul_1);
});

//second question 
ul_2.addEventListener("click", function() {
    q2.style.display = "none";
    q3.style.display = "block";
    console.log(ul_2);
});

//Display Thanks Messsage
ul_3.addEventListener('click',function() {
    q3.style.display = "none";
    survey.style.display = "none";
    end.style.display = "block";
    console.log(ul_3);
});

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