
// loading screen animation 
$(window).ready(function(){
    $("#loading-screen").fadeOut(500)
    $("body").css("overflow", "visible")
    openProject()
})

let sideNavInnerWidth = $('.side-nav-inner').innerWidth();
$('.side-nav').css({ left: -sideNavInnerWidth });

let sideNavLeftValue = $(".side-nav").css('left');
let navbarLinks = $('li.pointer');

// Open slider
function closeSlider() {
  $('.side-nav').animate({ left: -sideNavInnerWidth }, 600);
  $("#slider-btn").removeClass("fa-x");
  $("#slider-btn").addClass("fa-align-justify");
  navbarLinks.each(function (index) {
    $(this).animate({ top: (index + 1) * 50 }, (index + 1) * 200);
  });
}

// Close slider
function openSlider() {
  $('.side-nav').animate({ left: 0 }, 600);
  $("#slider-btn").addClass("fa-x");
  $("#slider-btn").removeClass("fa-align-justify");
  navbarLinks.each(function (index) {
    $(this).css({ position: 'relative', top: "100%" });
    $(this).animate({ top: 0 }, (index + 1) * 200);
  });
}

$('#slider-btn').click(function () {
  sideNavLeftValue = $(".side-nav").css('left'); 
  if (sideNavLeftValue === "0px") {
    closeSlider();
  } else {
    openSlider();
  }
});

//---------Home Page --------

async function openProject() {
  let respone= await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
  let data = await respone.json()
  let meal=data.meals

  displayProject(meal)
}
function displayProject(array){
  for (let i = 0; i < array.length; i++) {
    let colDiv= document.createElement("div");
    colDiv.className = "col-md-3 py-2";
    colDiv.addEventListener('click',function(){
      filterById(array[i].idMeal)
    })

    let div = document.createElement("div");
    div.className = "position-relative overflow-hidden cover-div pointer";

    let img = document.createElement("img");
    img.className = "w-100";
    img.src = array[i].strMealThumb;

    let layer = document.createElement("div");
    layer.className = "text-center p-2 hidden-layer";

    let h3 = document.createElement("h3");
    h3.className = " py-3";
    h3.textContent = array[i].strMeal;

    layer.appendChild(h3);
    div.appendChild(img);
    div.appendChild(layer);

    colDiv.appendChild(div);
    container.appendChild(colDiv);
  }
}
// category section ------- part one

  let category = document.getElementById('category');
  category.addEventListener('click', function() {
      row.classList.replace('d-block',"d-none")
      fetchCategories();
      closeSlider();
  });
  
  async function fetchCategories() {
    $("#inner-loading-screen").fadeIn(600)

      let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
      let data = await response.json();
      let categories = data.categories;
  
      displayCategoriesSection(categories);
    $("#inner-loading-screen").fadeOut(600)
  }
  
  let container = document.getElementById('container');
  function displayCategoriesSection(array) {
      container.innerHTML = ""; 
  
      for (let i = 0; i < array.length; i++) {
          let colDiv = document.createElement("div");
          colDiv.className = "col-md-3 py-2";
          colDiv.addEventListener('click',function(){
            filterByCategory(array[i].strCategory)
          })
  
          let div = document.createElement("div");
          div.className = "position-relative overflow-hidden cover-div pointer";
  
          let img = document.createElement("img");
          img.className = "w-100";
          img.src = array[i].strCategoryThumb;
  
          let layer = document.createElement("div");
          layer.className = "text-center p-2 hidden-layer";
  
          let h3 = document.createElement("h3");
          h3.className = " py-3";
          h3.textContent = array[i].strCategory;
  
          let p = document.createElement("p");
          p.textContent = array[i].strCategoryDescription.split(" ").slice(0, 20).join(" ");
  
          layer.appendChild(h3);
          layer.appendChild(p);
          div.appendChild(img);
          div.appendChild(layer);
  
          colDiv.appendChild(div);
          container.appendChild(colDiv);
      }
  }
    

// category section ------- part two

async function filterByCategory(filterd){
  $("#inner-loading-screen").fadeIn(600)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${filterd}`);
    let data = await response.json();
    let categories = data.meals;

    console.log(categories)
    displayFilterdCategory(categories)
    $("#inner-loading-screen").fadeOut(600)
}

function displayFilterdCategory(array) {
    container.innerHTML = ""; 
  
    for (let i = 0; i < array.length; i++) {
        let colDiv = document.createElement("div");
        colDiv.className = "col-md-3 py-2";
        colDiv.addEventListener('click',function(){
          filterById(array[i].idMeal)
        })

        let div = document.createElement("div");
        div.className = "position-relative overflow-hidden cover-div pointer ";

        let img = document.createElement("img");
        img.className = "w-100";
        img.src = array[i].strMealThumb;

        let layer = document.createElement("div");
        layer.className = "text-center p-2 hidden-layer";

        let h3 = document.createElement("h3");
        h3.className = " py-3";
        h3.textContent = array[i].strMeal;

        layer.appendChild(h3);
        div.appendChild(img);
        div.appendChild(layer);

        colDiv.appendChild(div);
        container.appendChild(colDiv);

        
    }
}

//  Area section ----- part one ------

let area = document.getElementById('area');
area.addEventListener('click', function() {
    row.classList.replace('d-block',"d-none")
    fetchArea();
    closeSlider();
});


async function fetchArea() {
  $("#inner-loading-screen").fadeIn(600);

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  let data = await response.json();
  let area = data.meals;

  displayAreaSection(area);

  $("#inner-loading-screen").fadeOut(600);
}

function displayAreaSection(array) {
    container.innerHTML = ""; 

    for (let i = 0; i < array.length; i++) {
        let colDiv = document.createElement("div");
        colDiv.className = "col-md-3 text-white text-center";
        colDiv.addEventListener('click',function(){
          filterByArea(array[i].strArea)
        })
     

        let icon = document.createElement("i");
        icon.className = "fa-solid fa-house-laptop fs-1 pointer";

        let h3 = document.createElement("h3");
        h3.className = " py-2 pointer";
        h3.textContent = array[i].strArea;


        colDiv.appendChild(icon);
        colDiv.appendChild(h3);

        container.appendChild(colDiv);
    }
}
  
// Area section ------ part two -----
async function filterByArea(filterd){
  $("#inner-loading-screen").fadeIn(600);

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${filterd}`);
  let data = await response.json();
  let area = data.meals;

  displayFilterdArea(area)
  $("#inner-loading-screen").fadeOut(600);

}

function displayFilterdArea(array) {
  container.innerHTML = ""; 

  for (let i = 0; i < array.length; i++) {
      let colDiv = document.createElement("div");
      colDiv.className = "col-md-3 py-2 pointer";
      colDiv.addEventListener('click',function(){
        filterById(array[i].idMeal)
      })

      let div = document.createElement("div");
      div.className = "position-relative overflow-hidden cover-div";

      let img = document.createElement("img");
      img.className = "w-100";
      img.src = array[i].strMealThumb;

      let layer = document.createElement("div");
      layer.className = "text-center p-2 hidden-layer";

      let h3 = document.createElement("h3");
      h3.className = " py-3";
      h3.textContent = array[i].strMeal;

      layer.appendChild(h3);
      div.appendChild(img);
      div.appendChild(layer);

      colDiv.appendChild(div);
      container.appendChild(colDiv);

      
  }
}


// Ingredients section ----- part one -----

let ingredients = document.getElementById('ingredients');
ingredients.addEventListener('click', function() {
    fetchIngredients();
    closeSlider();
});

async function fetchIngredients() {
   $("#inner-loading-screen").fadeIn(600)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let data = await response.json();
    let ingredients = data.meals;

displayIngredientsSection(ingredients)
$("#inner-loading-screen").fadeOut(600)

}

function displayIngredientsSection(array) {
    container.innerHTML = ""; 

    for (let i = 0; i < array.length; i++) {
        let colDiv = document.createElement("div");
        colDiv.className = "col-md-3 text-white pointer text-center";
        colDiv.addEventListener('click',function(){
          filterByIngredients(array[i].strIngredient)
        })
       

        let icon = document.createElement("i");
        icon.className = "fa-solid fa-plate-wheat fs-1";



        let h3 = document.createElement("h3");
        h3.className = " py-2";
        h3.textContent = array[i].strIngredient;


        colDiv.appendChild(icon);
        colDiv.appendChild(h3);


        container.appendChild(colDiv);
    }
}
  
// ---------------------- Ingredients section --- part two ---------------------------

async function filterByIngredients(filterd){
  $("#inner-loading-screen").fadeIn(600)

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${filterd}`);
  let data = await response.json();
  let ingredients = data.meals;

  displayFilterdIngredients(ingredients)

  $("#inner-loading-screen").fadeOut(600)

}

 function displayFilterdIngredients(array) {
  container.innerHTML = ""; 

  for (let i = 0; i < array.length; i++) {
      let colDiv = document.createElement("div");
      colDiv.className = "col-md-3 py-2 pointer";
      colDiv.addEventListener('click',function(){
        filterById(array[i].idMeal)
      })


      let div = document.createElement("div");
      div.className = "position-relative overflow-hidden cover-div";

      let img = document.createElement("img");
      img.className = "w-100";
      img.src = array[i].strMealThumb;

      let layer = document.createElement("div");
      layer.className = "text-center p-2 hidden-layer";

      let h3 = document.createElement("h3");
      h3.className = " py-3";
      h3.textContent = array[i].strMeal;

      layer.appendChild(h3);
      div.appendChild(img);
      div.appendChild(layer);

      colDiv.appendChild(div);
      container.appendChild(colDiv);

      
  }
}


// -------------------------- contact us section ------------------
let outerContainer = document.getElementById('outerContainer')
let contactUs = document.getElementById('contactUs')
contactUs.addEventListener('click',function(){
  row.classList.replace('d-block',"d-none")
  contactUsPart();
  closeSlider();

})

// --------------- contact design ----------------------
function contactUsPart() {
  container.innerHTML = "";
  
  let contactCover = document.createElement("div");
  contactCover.className = "d-flex justify-content-center align-items-center position-absolute flex-wrap top-0 bottom-0 w-75 ms-5";

  let contact = document.createElement("div");
  contact.className="w-100"

  let div = document.createElement("div");
  div.className = "row";

  let left = document.createElement('div');
  left.className = "col-md-6";

  let right = document.createElement('div');
  right.className = "col-md-6";

  let innerLeft = document.createElement('div');
  let innerRight = document.createElement('div');

  let inputName = document.createElement('input');
  inputName.className = "my-3 py-2 form-control input-name";
  inputName.type = "text";
  inputName.placeholder = "Enter Your Name";
  inputName.addEventListener('blur',function() {
    validation( nameRegax,inputName,nameErrMsg)
    function enableButton(){
      if (validation( passwordRegax,inputPassword,passErrMsg ) &&
      validation( ageRegax,inputAge,ageErrMsg ) &&
      validation( phoneRegax,inputPhone,phnumErrMsg ) &&
      validation( emailRegax,inputEmail,emailErrMsg ) &&
      validation( nameRegax,inputName,nameErrMsg)) {
        button.removeAttribute("disabled");
      } else {
      button.setAttribute("disabled", true)
   }}
   enableButton()
  
  })
  let nameErrMsg= document.createElement('p');
  nameErrMsg.textContent="Enter valid name, Special characters and numbers not allowed"
  nameErrMsg.className="text-danger p-3 rounded bg-danger-subtle d-none nameErrMsg"
  
  
  let inputEmail = document.createElement('input');
  inputEmail.className = "my-3 py-2 form-control input-email";
  inputEmail.type = "email";
  inputEmail.placeholder = "Enter Your Email";
  inputEmail.addEventListener('blur',function() {
    validation( emailRegax,inputEmail,emailErrMsg )
    function enableButton(){
      if (validation( passwordRegax,inputPassword,passErrMsg ) &&
      validation( ageRegax,inputAge,ageErrMsg ) &&
      validation( phoneRegax,inputPhone,phnumErrMsg ) &&
      validation( emailRegax,inputEmail,emailErrMsg ) &&
      validation( nameRegax,inputName,nameErrMsg)) {
        button.removeAttribute("disabled");
      } else {
      button.setAttribute("disabled", true)
   }}
   enableButton()
    })
  let emailErrMsg= document.createElement('p');
  emailErrMsg.textContent="Email not valid *exemple@yyy.zzz"
  emailErrMsg.className="text-danger p-3 rounded bg-danger-subtle d-none emailErrMsg"
  

  let inputPhone = document.createElement('input');
  inputPhone.className = "my-3 py-2 form-control input-phone";
  inputPhone.type = "tel";
  inputPhone.placeholder = "Enter Your Phone";
  inputPhone.addEventListener('blur',function() {
    validation( phoneRegax,inputPhone,phnumErrMsg )
    function enableButton(){
      if (validation( passwordRegax,inputPassword,passErrMsg ) &&
      validation( ageRegax,inputAge,ageErrMsg ) &&
      validation( phoneRegax,inputPhone,phnumErrMsg ) &&
      validation( emailRegax,inputEmail,emailErrMsg ) &&
      validation( nameRegax,inputName,nameErrMsg)) {
        button.removeAttribute("disabled");
      } else {
      button.setAttribute("disabled", true)
   }}
   enableButton()
    })
  let phnumErrMsg= document.createElement('p');
  phnumErrMsg.textContent="Enter valid Phone Number"
  phnumErrMsg.className="text-danger p-3 rounded bg-danger-subtle d-none phnumErrMsg"
  

  let inputAge = document.createElement('input');
  inputAge.className = "my-3 py-2 form-control input-age";
  inputAge.type = "number";
  inputAge.placeholder = "Enter Your Age";
  inputAge.addEventListener('blur',function() {
    validation( ageRegax,inputAge,ageErrMsg )
    function enableButton(){
      if (validation( passwordRegax,inputPassword,passErrMsg ) &&
      validation( ageRegax,inputAge,ageErrMsg ) &&
      validation( phoneRegax,inputPhone,phnumErrMsg ) &&
      validation( emailRegax,inputEmail,emailErrMsg ) &&
      validation( nameRegax,inputName,nameErrMsg)) {
        button.removeAttribute("disabled");
      } else {
      button.setAttribute("disabled", true)
   }}
   enableButton()
    })
  let ageErrMsg= document.createElement('p');
  ageErrMsg.textContent="Enter valid age"
  ageErrMsg.className="text-danger p-3 rounded bg-danger-subtle d-none ageErrMsg"
  

  let inputPassword = document.createElement('input');
  inputPassword.className = "my-3 py-2 form-control input-password";
  inputPassword.type = "password";
  inputPassword.placeholder = "Enter Your Password";
  inputPassword.style.padding = "15px";
  inputPassword.addEventListener('blur',function() {
    validation( passwordRegax,inputPassword,passErrMsg )
    function enableButton(){
    if (validation( passwordRegax,inputPassword,passErrMsg ) &&
    validation( ageRegax,inputAge,ageErrMsg ) &&
    validation( phoneRegax,inputPhone,phnumErrMsg ) &&
    validation( emailRegax,inputEmail,emailErrMsg ) &&
    validation( nameRegax,inputName,nameErrMsg)) {
      button.removeAttribute("disabled");
    } else {
    button.setAttribute("disabled", true)
 }}
 enableButton()
  })
  let passErrMsg= document.createElement('p');
  passErrMsg.textContent="Enter valid password *Minimum eight characters, at least one letter and one number:*"
  passErrMsg.className="text-danger p-3 rounded bg-danger-subtle d-none passErrMsg"
  
  
  let inputRepass = document.createElement('input');
  inputRepass.className = "my-3 py-2 form-control input-repass";
  inputRepass.type = "password";
  inputRepass.placeholder = "Repassword";
  inputRepass.addEventListener('blur',function() {
    if (inputPassword.value === inputRepass.value) {
      repassErrMsg.classList.replace("d-block", "d-none");
      return true;
    } else {
      repassErrMsg.classList.replace("d-none", "d-block");
      return false;
    }
  })
  let repassErrMsg= document.createElement('p');
  repassErrMsg.textContent="Enter valid repassword"
  repassErrMsg.className="text-danger p-3 rounded bg-danger-subtle d-none repassErrMsg"
  

  let buttonContainer = document.createElement('div');
  buttonContainer.className = "d-flex justify-content-center mt-3"; 

  let button = document.createElement('button');
  button.className = "btn py-2 px-3 btn-border button";
  button.disabled = true;
  button.textContent = "Submit";
  button.style.color = "red"; 
  button.style.borderColor = "red"; 


  innerLeft.appendChild(inputName);
  innerLeft.appendChild(nameErrMsg);
  innerLeft.appendChild(inputPhone);
  innerLeft.appendChild(phnumErrMsg);
  innerLeft.appendChild(inputPassword);
  innerLeft.appendChild(passErrMsg);
  innerRight.appendChild(inputEmail);
  innerRight.appendChild(emailErrMsg);
  innerRight.appendChild(inputAge);
  innerRight.appendChild(ageErrMsg);
  innerRight.appendChild(inputRepass);
  innerRight.appendChild(repassErrMsg);

  left.appendChild(innerLeft);
  right.appendChild(innerRight);

  div.appendChild(left);
  div.appendChild(right);

  contact.appendChild(div);
  buttonContainer.appendChild(button);
  contact.appendChild(buttonContainer);

  contactCover.appendChild(contact);
  container.appendChild(contactCover);
} 

// --------------- contact validation-------------------

  // Get input elements
  let nameErrMsg = document.querySelector('.nameErrMsg');
  let emailErrMsg = document.querySelector('emailErrMsg');
  let phnumErrMsg = document.querySelector('phnumErrMsg');
  let ageErrMsg = document.querySelector('ageErrMsg');
  let passErrMsg = document.querySelector('passErrMsg');
  let repassErrMsg = document.querySelector('repassErrMsg');
  let inputName = document.querySelector('.input-name');
  let inputEmail = document.querySelector('.input-email');
  let inputPhone = document.querySelector('.input-phone');
  let inputAge = document.querySelector('.input-age');
  let inputPassword = document.querySelector('.input-password');
  let inputRepass = document.querySelector('.input-repass');
  let button = document.querySelector('.button');

  // regaxes on inputs 
  let nameRegax=/^[A-Za-z]{3,}$/;
  let emailRegax=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let phoneRegax= /^\d{7,}$/;
  let ageRegax= /^1[6-9]|[2-9]\d$/;
  let passwordRegax=/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;


    // Validation function
  function validation(regax,element,err) {
  if( regax.test(element.value)==true){
      err.classList.replace("d-block","d-none")
      return true;
  }else{
      err.classList.replace("d-none","d-block")
      return false;
  }
  }


/*   function validateRepassword() {
    if (inputPassword.value === inputRepass.value) {
      repassErrMsg.classList.replace("d-block", "d-none");
      return true;
    } else {
      repassErrMsg.classList.replace("d-none", "d-block");
      return false;
    }
  } */
  
/* function enableButton(){
  if (validation( passwordRegax,inputPassword,passErrMsg ) &&
      validation( ageRegax,inputAge,ageErrMsg ) &&
      validation( phoneRegax,inputPhone,phnumErrMsg ) &&
      validation( emailRegax,inputEmail,emailErrMsg ) &&
      validation( nameRegax,inputName,nameErrMsg)) {
        button.removeAttribute("disabled");
      } else {
      button.setAttribute("disabled", true)
   }
  }
 */
//------------------------ Search section ------------------
 let search= document.getElementById("search")
search.addEventListener('click',function(){
  searchPart();
  closeSlider();
})

let row= document.getElementById("row")
function searchPart(){
  row.classList.replace('d-none',"d-block")
  container.innerHTML='';
}

//// fetch data ----------- 
async function searchByName(name) {
  $("#inner-loading-screen").fadeIn(600)

  let response = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
  let data = await response.json();
  search = data.meals

  displaySearchedByName(search)
  $("#inner-loading-screen").fadeOut(600)
}

async function searchByFirstLetter(letter) {
  $("#inner-loading-screen").fadeIn(600)

  let response = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
  let data = await response.json();
  search = data.meals

  displaySearchedByLetter(search)
  $("#inner-loading-screen").fadeOut(600)
}
 
/// desplay data ---------- 
function displaySearchedByName(array) {
  container.innerHTML='';

  for(let i=0 ; i <array.length ;i++){   
    let colDiv= document.createElement("div");
    colDiv.className = "col-md-3 py-2";
    colDiv.addEventListener('click',function(){
      filterById(array[i].idMeal)
    })

    let div = document.createElement("div");
    div.className = "position-relative overflow-hidden cover-div pointer";

    let img = document.createElement("img");
    img.className = "w-100";
    img.src = array[i].strMealThumb;

    let layer = document.createElement("div");
    layer.className = "text-center p-2 hidden-layer";

    let h3 = document.createElement("h3");
    h3.className = " py-3";
    h3.textContent = array[i].strMeal;

    layer.appendChild(h3);
    div.appendChild(img);
    div.appendChild(layer);

    colDiv.appendChild(div);
    container.appendChild(colDiv);
}

}

function displaySearchedByLetter(array) {
  container.innerHTML='';

  for(let i=0 ; i <array.length ;i++){   
    let colDiv= document.createElement("div");
    colDiv.className = "col-md-3 py-2";
    colDiv.addEventListener('click',function(){
      filterById(array[i].idMeal)
    })


    let div = document.createElement("div");
    div.className = "position-relative overflow-hidden cover-div pointer";

    let img = document.createElement("img");
    img.className = "w-100";
    img.src = array[i].strMealThumb;

    let layer = document.createElement("div");
    layer.className = "text-center p-2 hidden-layer";

    let h3 = document.createElement("h3");
    h3.className = " py-3";
    h3.textContent = array[i].strMeal;

    layer.appendChild(h3);
    div.appendChild(img);
    div.appendChild(layer);

    colDiv.appendChild(div);
    container.appendChild(colDiv);
}

}

//// remove search data --------

function handleNameInput(value) {
  if (value === '') {
    container.innerHTML = '';
  } else {
    searchByName(value);
  }
}

function handleLetterInput(value) {
  if (value === '') {
    container.innerHTML = '';
  } else {
    searchByFirstLetter(value);
  }
}

// display meals details ------- final part 
async function filterById(id){
  $("#inner-loading-screen").fadeIn(600)

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  let data = await response.json();
  let meal = data.meals;

  displayDetails(meal)
  $("#inner-loading-screen").fadeOut(600)
}

function displayDetails(item) {
    container.innerHTML = "";
    
    if (item && item.length > 0) {
      let colDiv3 = document.createElement("div");
      colDiv3.className = "col-md-3 py-2 text-white";
  
      let img = document.createElement("img");
      img.className = "w-100";
      img.src = item[0].strMealThumb;
  
      let name = document.createElement("h3");
      name.textContent = item[0].strMeal;
  
      let colDiv9 = document.createElement("div");
      colDiv9.className = "col-md-9 py-2 text-white";
  
      let instructions = document.createElement("h3");
      instructions.className = "pb-2";
      instructions.textContent = "Instructions";
  
      let description = document.createElement("p");
      description.textContent = item[0].strInstructions;
  
      let area = document.createElement("h3");
      area.textContent = `Area: ${item[0].strArea}`;
  
      let category = document.createElement("h3");
      category.textContent = `Category: ${item[0].strCategory}`;
  
      let recipes = document.createElement("h3");
      recipes.textContent = "Recipes:";
  
      let ingredients = document.createElement("div");
      ingredients.className = "d-flex flex-wrap py-1";
  
      for (let i = 1; i <= 20; i++) {
        let ingredient = item[0]['strIngredient' + i];
        let measure = item[0]['strMeasure' + i];
      
        if (ingredient) {
          let div = document.createElement("div");
          div.className = "alert alert-info py-1 mx-1";
          div.textContent = `${measure} ${ingredient}`;
          ingredients.appendChild(div);
        }
      }

      let tags = document.createElement("h3");
      tags.textContent = "Tags:";
  
      let button1 = document.createElement("button");
      button1.className = "btn btn-success mx-2";
      button1.textContent = "Source";
      button1.addEventListener('click', function () {
        window.open(item[0].strSource);
      });
  
      let button2 = document.createElement("button");
      button2.className = "btn btn-danger";
      button2.textContent = "Youtube";
      button2.addEventListener('click', function () {
        window.open(item[0].strYoutube);
      });
  
      tags.appendChild(button1);
      tags.appendChild(button2);
      colDiv3.appendChild(img);
      colDiv3.appendChild(name);
      colDiv9.appendChild(instructions);
      colDiv9.appendChild(description);
      colDiv9.appendChild(area);
      colDiv9.appendChild(category);
      colDiv9.appendChild(recipes);
      colDiv9.appendChild(ingredients);
      colDiv9.appendChild(tags);
  
      container.appendChild(colDiv3);
      container.appendChild(colDiv9);
    }
}


