// Variables
let menu = false;
let device;
let gotoTop = true;
const savedData = localStorage.getItem("omex-data");
const date = new Date();

let data = {
    basic: {
        redirect: "red01011",
        profile: {
            name: "",
            birth: {
                year: "",
                month: "",
                day: "",
            },
            picture: "",
        },
    },
}

function ud() {
    localStorage.setItem("omex-data", JSON.stringify(data));
}

// Check DATA
if (savedData != null) {
    data = JSON.parse(savedData);
} else {
    document.getElementById("comics").innerHTML = `
        <h1>Uff... hát bocs, de erre az eszközre nincsen elmentve még adat, úgyhogy válassz:</h1><br><br>
        <div class="center">
            <button id="createProfile">Új fiók létrehozása</button><br><br>
            <button id="importProfile">Fiók adat importálása</button>
        </div>
    `;

    document.getElementById("importProfile").onclick = function() {
        document.getElementById("comics").innerHTML = `
            <button onclick="window.location.href = 'index.html';">Vissza</button><br><br>

            <span>Ide tudod feltölteni a fájlt: </span><input type="file" id="profileData"><br><br>

            <span>Vagy pedig ide tudod bemásolni a kódot, amit kaptál: </span><input type="text" id="profileData2">
        `;

        const profileData = document.getElementById("profileData"); 
        const profileData2 = document.getElementById("profileData2"); 
        let loadedData;
        let errorY = false;

        const dataLoaded = () => {
            try {
                data = JSON.parse(loadedData);
            } catch (error) {
                if (error !== null) {
                    errorY = true;
                }
            } finally {
                if (errorY) {      
                    document.getElementById("comics").innerHTML = `
                        <h1>Bocs, de a profilkód, amit megadtál, nem jó. Lécci próbáld újra!</h1><br><br>
                        <button onclick="window.location.href = 'index.html';">Újrapróbálás</button>
                    `;
                } else {
                    ud();
                }
            }
        }

        profileData.addEventListener('change', () => {
            let files = profileData.files;
            if(files.length == 0) return;
            const file = files[0];
            let reader = new FileReader();
            reader.onload = (e) => {
                const file = e.target.result;
                loadedData = file;
            };
            reader.onerror = (e) => alert(e.target.error.name);
            reader.readAsText(file); 
            dataLoaded();

        });

        profileData2.onchange = function() {
            loadedData = this.value;
            dataLoaded();
        }
    }
    
    let profDatas = {
        name: "",
        birth: "",
        pic: "",
    }

    document.getElementById("createProfile").onclick = function() {
        document.getElementById("comics").innerHTML = `
            <button onclick="window.location.href = 'index.html';">Vissza</button><br><br>

            <h1>Felhasználónév</h1><br>
            <input type="text" id="username"><br><br>
            <h1>Születési év</h1><br>
            <input type="date" id="userbirth" min="1930-01-01" max="${String(date.getFullYear() - 9) + "-" + "01-01"}"><br><br>
            <h1>Profilkép</h1><br>
            <div class="profPic" style="width: 50px; height: 50px; border: 1px solid green;" id="profPic"></div><br><br>
            <span>Fénykép url-jének megadása (Nem muszáj): </span><input type="url" id="userPic" style="margin-left: 4px;"><br><br><br>

            <button id="saveProfDat">Mentés</button>
        `;
        
        document.getElementById("userPic").onchange = function() {
            profDatas.pic = String(this.value);
            document.getElementById("profPic").style.backgroundImage = "url(" + profDatas.pic + ")";
        }

        
        document.getElementById("saveProfDat").onclick = function() {
            if (document.getElementById("username").value != "" && document.getElementById("userbirth").value != "") {
                data.basic.profile.name = document.getElementById("username").value;

                data.basic.profile.birth.year = Number(document.getElementById("userbirth").value.slice(0, 4));
                data.basic.profile.birth.month = Number(document.getElementById("userbirth").value.slice(5, 7));
                data.basic.profile.birth.day = Number(document.getElementById("userbirth").value.slice(8, 10));

                if (document.getElementById("userPic").value != "") {
                    data.basic.profile.picture = document.getElementById("userPic").value;
                }

                ud();

                alert("Profil sikeresen létrehozva!");
                window.location.href = "index.html";

            } else {
                alert("Lécci töltsd ki az összes mezőt!");
            }
        }
    }
}

function checkMenu() {
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

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    document.getElementById("style-link").innerHTML = `<link rel="stylesheet" href="style-mob.css">`;
    device = "phone";
} else {
    document.getElementById("style-link").innerHTML = `<link rel="stylesheet" href="style-pc.css">`;
    device = "pc";
    document.getElementById("menu").onclick = function() {
        checkMenu();
    }
    if (data.basic.profile.picture != "") {
        document.getElementById("profile").src = data.basic.profile.picture;
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

let fsDisp = false;
/* let dfs = false; */
window.onkeydown = function(evt) {
    if (evt.code == "F4" || evt.code == "NumpadEnter") {
        // Fast search bar in the middle of the screen
        if (fsDisp == false) {
            document.getElementById("fastSearch").style.display = "block";
            fsDisp = true;
        } else {
            document.getElementById("fastSearch").style.display = "none";
            fsDisp = false;
        }

        /* document.getElementById("search-1").onclick = function() {
            dfs = !dfs;
        } */

        /* window.onkeydown = function(event) {
            if (event.code == "F4" && event.code == "NumpadEnter") {
                document.getElementById("fastSearch").style.display = "none";
                fsDisp = false;
            } else if (event.key != "Backspace" && event.key != "Space" && event.key != "Shift" && event.key != "Control" && event.key != "Meta" && event.key != "AltGraph" && event.key != "ContextMenu" && event.key != "ArrowUp" && event.key != "ArrowDown" && event.key != "ArrowLeft" && event.key != "ArrowRight" && event.key != "Enter" && event.key.slice(0, 1) != "F" && dfs == false) {
                document.getElementById("search-1").value += event.key;
            }
        } */
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

function checkCategMenu() {
    const categ = document.getElementById("categ");
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

let categHidden = false;
document.getElementById("categ").onclick = function() {
    if (device == "phone") {
        checkCategMenu();
    }
}

let lastBG;
function settings() {
    lastBG = document.getElementById("bg").innerHTML;
    if (device == "pc") {
        menu = true;
        checkMenu();
        document.getElementById("comics").innerHTML = `
            <div id="sidenav">
                <div class="section">Főoldal</div><br>

                <div class="section">Profil</div>
                <div class="desection">alprofil</div><br>

                <div class="section">Fizetések</div>
                <div class="desection">Tranzakciók</div>
                <div class="desection">Rangok</div>
                <div class="desection">Tagságok</div>
                <div class="desection">Előfizetések</div>
                <div class="desection">Bolt</div><br>

                <div class="section">Nézet</div>
                <div class="desection">Oldal</div><br>

                <div class="section">Egyéb</div>
                <div class="desection">Speciális</div>
                <div class="desection hidden">Developer</div>
            </div>
        `;
    } else {
        categHidden = true;
        checkCategMenu();
        document.getElementById("comics").innerHTML = `
            <button onclick="window.location.href = 'index.html';">Vissza</button><br><br>
            <h1>Home gomb</h1><br>
            <span>Késleltetés </span><input type="number" id="mobHomeBtnTimeout"><button id="mobHomeBtnTimeout-btn">Kész</button>
        `;
        
        document.getElementById("mobHomeBtnTimeout-btn").onclick = function() {
            
        }
    }

}