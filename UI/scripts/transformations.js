/*begin Выпадающее меню для пользователя */
function user_dropdown_function() {
    document.getElementById('user-content').classList.toggle('show');
}
window.onclick = function (event) {
    if (!event.target.matches('.dropbutton')) {
        var dropdowns = document.getElementsByClassName('dropdown-content');
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};
/*end Выпадающее меню для пользователя */
function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

/*begin Превращение меню в бургер */
function menu_transform_function() {

    var burger = document.getElementById("burger");
    if (burger.className === "categories") {
        burger.className += " responsive";
    } else {
        burger.className = "categories";
    }
}
/*end Превращение меню в бургер */
