let menu = false;
let device;

/* setTimeout(function() {
    if (device == "pc") {
        
    }
}, 1500); */

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    document.getElementById("style-link").innerHTML = `<link rel="stylesheet" href="style-mob.css">`;
    device = "phone";
} else {
    document.getElementById("style-link").innerHTML = `<link rel="stylesheet" href="style-pc.css">`;
    device = "pc";
    document.getElementById("menu").onclick = function() {
        const dropdownMenu = document.getElementById("dropdown-menu");
        if (menu == false) {
            dropdownMenu.style.display = "block";
            dropdownMenu.style.animationName = "menu-dropdown";
            dropdownMenu.style.opacity = "1";
            dropdownMenu.style.top = "70px";
            document.getElementById("menu-slice-1").style.transform = "rotate(120deg)";
            document.getElementById("menu-slice-2").style.transform = "rotate(-120deg)";
            document.getElementById("menu-slice-3").style.transform = "rotate(120deg)";
            menu = true;
        } else {
            dropdownMenu.style.animationName = "menu-dropup";
            setTimeout(function() {
                dropdownMenu.style.display = "none";
                dropdownMenu.style.opacity = "0";
                dropdownMenu.style.top = "-180px";
            }, 150);
            document.getElementById("menu-slice-1").style.transform = "rotate(0deg)";
            document.getElementById("menu-slice-2").style.transform = "rotate(0deg)";
            document.getElementById("menu-slice-3").style.transform = "rotate(0deg)";
            menu = false;
        }
    }
}

let egs = [false]
function easterEgg(eg) {
    switch (eg) {
        case "0":
            if (egs[0] == false) {
                document.getElementById("profile").style.transform = "rotate(180deg)";
                egs[0] = true;
            } else {
                document.getElementById("profile").style.transform = "rotate(0deg)";
                egs[0] = false;
            }
            break;
    
        default:
            break;
    }
}
/* 
let closeDDMCAT = true;
let closeDDMCATFE = true;

function showDDMCategories() {
    const ddmCat = document.getElementById("ddm-categories");
    ddmCat.style.display = "block";
    ddmCat.style.animationName = "ddmCat-dropdown";
    ddmCat.style.opacity = "1";
    ddmCat.style.top = "70px";
    if (closeDDMCATFE == false) {
        const dropdownMenu = document.getElementById("dropdown-menu");
        dropdownMenu.style.animationName = "menu-dropup";
        setTimeout(function() {
            dropdownMenu.style.display = "none";
            dropdownMenu.style.opacity = "0";
            dropdownMenu.style.top = "-180px";
        }, 150);
        document.getElementById("menu-slice-1").style.transform = "rotate(0deg)";
        document.getElementById("menu-slice-2").style.transform = "rotate(0deg)";
        document.getElementById("menu-slice-3").style.transform = "rotate(0deg)";
        closeDDMCAT = true;
    }
    let doit = false;
    console.log(doit);
    document.getElementById("ddm-categories").onmouseout = function() {
        doit = true;
        console.log(doit);
    }
    document.getElementById("ddm-categories").onmouseover = function() {
        doit = false;
        console.log(doit);
    }
    document.getElementById("bg").onclick = function() {
        console.log(doit);
        if (doit) {
            hideDDMCategories();
        }
    }
}

function checkDDMCategories(stat) {
    if (closeDDMCAT && closeDDMCATFE) {
        hideDDMCategories();
    } else {
        showDDMCategories();
    }
    if (stat == "click") {
        closeDDMCATFE = false;
        checkDDMCategories();
    }
}

function hideDDMCategories() {
    const ddmCat = document.getElementById("ddm-categories");
    ddmCat.style.animationName = "menu-dropup";
    setTimeout(function() {
        ddmCat.style.display = "none";
        ddmCat.style.opacity = "0";
        ddmCat.style.top = "-180px";
    }, 150);
} */

let lastDDMIH;

function closeCategories() {
    document.getElementById("dropdown-menu").innerHTML = lastDDMIH;
}

function openCategories() {
    lastDDMIH = document.getElementById("dropdown-menu").innerHTML;
    document.getElementById("dropdown-menu").innerHTML = '<div class="section" onclick="closeCategories()">< Vissza</div>' + document.getElementById("ddm-categories").innerHTML;
}

let titles = ["Omex", "Manga", "OmexManga"];
/* let titles = ["Omex", "Omex + ", "Omex + Manga", "Omex + Manga = ", "Omex + Manga = OmexManga", "Omex + Manga = ", "Omex + Manga", "Omex + "]; */
/* let titles = ["Omex", "Ome", "Om", "O", "Om", "Ome", "Omex"]; */
let currentTitle = 0;
function changeTitle() {
    document.title = titles[currentTitle];
    currentTitle += 1;
    if (currentTitle > titles.length - 1) {
        currentTitle = 0;
    }
    setTimeout(function() {
        changeTitle();
    }, 1000);
}
changeTitle();

window.onkeydown = function(evt) {
    if (evt.code == "F4" || evt.code == "NumpadEnter") {
        // Fast search bar in the middle of the screen
    }
}

let navHidden = false;
document.getElementById("hideNav").onclick = function() {
    const bottomNav = document.getElementById("navbar-bottom");
    const hideNav = document.getElementById("hideNav");
    if (device == "phone") {
        if (navHidden == false) {
            document.getElementById("home").style.animationName = "fade-down";
            document.getElementById("categ").style.animationName = "fade-down";
            bottomNav.style.animationName = "bottomNav-dropdown";
            hideNav.style.transform = "rotate(-90deg)";
            hideNav.style.bottom = "-5px";
            setTimeout(function() {
                bottomNav.style.bottom = "-35px";
                document.getElementById("home").style.display = "none";
                document.getElementById("categ").style.display = "none";
            }, 400);
            navHidden = true;
        } else {
            document.getElementById("home").style.animationName = "fade-up";
            document.getElementById("categ").style.animationName = "fade-up";
            bottomNav.style.animationName = "bottomNav-dropup";
            hideNav.style.transform = "rotate(90deg)";
            hideNav.style.bottom = "5px";
            bottomNav.style.bottom = "0px";
            document.getElementById("home").style.display = "block";
            document.getElementById("categ").style.display = "block";
            navHidden = false;
        }
    }
}

let lastCategMenu;
function openCategCategMenu() {
    lastCategMenu = document.getElementById("categ-menu").innerHTML;
    document.getElementById("categ-menu").innerHTML = `<div class="section" onclick="closeCategCategMenu()">< Vissza</div>` + document.getElementById("categ-categories").innerHTML;
    document.getElementById("categ-menu").style.height = "350px";
}

function closeCategCategMenu() {
    document.getElementById("categ-menu").innerHTML = lastCategMenu;
    document.getElementById("categ-menu").style.height = "150px";
}

let categHidden = false;
document.getElementById("categ").onclick = function() {
    const categ = document.getElementById("categ");
    if (device == "phone") {
        if (categHidden == false) {
            document.getElementById("categ-menu").style.display = "block";
            document.getElementById("categ-menu").style.animationName = "fade-up";
            document.getElementById("categ-slice-1").style.transform = "rotate(120deg)";
            document.getElementById("categ-slice-2").style.transform = "rotate(-120deg)";
            document.getElementById("categ-slice-3").style.transform = "rotate(120deg)";
            setTimeout(function() {
                document.getElementById("categ-menu").style.opacity = "1";
            }, 100);
            categHidden = true;
        } else {
            document.getElementById("categ-menu").style.animationName = "fade-down";
            document.getElementById("categ-slice-1").style.transform = "rotate(0deg)";
            document.getElementById("categ-slice-2").style.transform = "rotate(0deg)";
            document.getElementById("categ-slice-3").style.transform = "rotate(0deg)";
            setTimeout(function() {
                document.getElementById("categ-menu").style.opacity = "0";
                document.getElementById("categ-menu").style.display = "none";
            }, 100);
            categHidden = false;
        }
    }
}

