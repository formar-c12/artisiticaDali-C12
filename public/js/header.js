let navBar = document.querySelector("#navigation-bar-mobile"); // Capturo el elemento por el ID
let searchBar = document.querySelector("#search");
let logo = document.querySelector(".logo");

/* logo.addEventListener('click', () => {
   navBar.style.display = "block"
}) */

function dropMenu() {
  let subcategoryMenu = document.querySelector(".active");
  if (navBar.style.display === "block") {
    navBar.style.display = "none";
    subcategoryMenu?.classList.remove("active");
  } else {
    navBar.style.display = "block"; // aparece la caja
    searchBar.style.display = "none"; // desaparece el buscado en el caso de que este abierto
    subcategoryMenu ? subcategoryMenu.classList.remove("active") : "";
  }
}

function dropSearch() {
    let subcategoryMenu = document.querySelector(".active");
    if (searchBar.style.display === "block") {
      searchBar.style.display = "none";
      subcategoryMenu?.classList.remove("active");
    } else {
      searchBar.style.display = "block";
      navBar.style.display = "none";
      subcategoryMenu?.classList.remove("active");
    }
  }

  function dropSubCategoryMenu(id) {
    console.log(id);
    let list = document.getElementById(`${id}`);
    list.classList.toggle("active");
    navBar.style.display = "none";
    searchBar.style.display = "none";
  }
  
  function closeWindow() {
    document.querySelector(".active").classList.remove("active");
  }
