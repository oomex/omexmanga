let menu = false;
document.getElementById("menu").onclick = function() {
    const dropdownMenu = document.getElementById("dropdown-menu");
    if (menu == false) {
        dropdownMenu.style.display = "block";
        dropdownMenu.style.animationName = "menu-dropdown";
        dropdownMenu.style.opacity = "1";
        dropdownMenu.style.top = "60px";
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