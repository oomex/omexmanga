// Variables
let menu = false;
let device;
let gotoTop = true;
const savedData = localStorage.getItem("omex-data");
const date = new Date();
let currentVersion = 2;

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
        signed: false,
        guest: true,
        version: 2,
    },
    
    notifications: [
        {
            name: "Welcome",
            desc: "Welcome in OMEX!",
        },
    ],

    backups: {

    }
}

let data2 = {

}

function ud() {
    localStorage.setItem("omex-data", JSON.stringify(data));
}

// Check DATA
if (savedData != null) {
    data2 = JSON.parse(savedData);
    /* if (data.basic.profile.name == "Markkun") {
        document.getElementById("comics").innerHTML = "<span>Menj má innen, ki vagy tiltva!!!</span><br><br><span>Na jó csak vicceltem, frissült a rendszered, minden jó, csak majd írj rám, hogy mikor kapod vissza a fiókodat.</span>";
    } else if (data.basic.profile.name != "McDumfly") {
        document.getElementById("comics").innerHTML = "<span>Ne szórakozz már velem, tudom, hogy te vagy az!!!</span>";
    }  */

    if (currentVersion > data2.basic.version) {
        // Old version
        /* for (let i = 0; i < Object.keys(data2).length; i++) {
            console.log(Object.keys(data)[i]);
            console.log(!(Object.keys(data)[i] in data2));
            if (!(Object.keys(data)[i] in data2)) {
                data2[Object.keys(data)[i]] = Object.keys(data)[i];
                console.log("Key added:" + Object.keys(data)[i]);
            }
        }
        for (let i = 0; i < Object.keys(data2.basic).length; i++) {
            console.log(Object.keys(data.basic)[i]);
            console.log(!(Object.keys(data.basic)[i] in data2.basic));
            if (!(Object.keys(data.basic)[i] in data2.basic)) {
                data2.basic[Object.keys(data.basic)[i]] = Object.keys(data.basic)[i];
                console.log("Key added:" + Object.keys(data.basic)[i]);
            }
        } */
        data = data2;
        ud();
    } else {
        // New version
    }
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
                console.log(error);
            } finally {
                if (errorY) {      
                    document.getElementById("comics").innerHTML = `
                        <h1>Bocs, de a profilkód, amit megadtál, nem jó. Lécci próbáld újra!</h1><br><br>
                        <button onclick="window.location.href = 'index.html';">Újrapróbálás</button>
                    `;
                } else {
                    ud();
                    data.basic.profile.signed = true;
                    ok("Sikeresen beimportáltad a kódot! Pacsi!");
                    setTimeout(function() {
                        window.location.href = "index.html";
                    }, 1400);
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
                dataLoaded();
            };
            reader.onerror = (e) => alert(e.target.error.name);
            reader.readAsText(file); 
        });

        profileData2.onchange = function() {
            loadedData = profileData2.value;
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

function ok(text) {
    document.getElementById("checkmark-text").innerText = String(text);
    document.getElementById("checkmark").style.display = "block";
    document.getElementById("checkmark").style.animationName = "fadein";
    setTimeout(function() {
        document.getElementById("checkmark").style.animationName ="fadeout";
        setTimeout(function() {
            document.getElementById("checkmark").style.display = "none";
        }, 200);
    }, 1200);
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

function saveFile(data, filename, type) {
    var file = new Blob([data], {type: ".omex"});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
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

function saveSave() {
    saveFile(JSON.stringify(data), "OMEXSAVE.omex", "text/plain");
}

function copy(text) {
    var copyText;
    if (text == 'dat') {
        copyText = JSON.stringify(data);
    } else {
        copyText = text;
    }
    navigator.clipboard.writeText(copyText).then(function() {
        ok("Adat sikeresen másolva!");
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
}

let lastBG;
function settings() {
    lastBG = document.getElementById("bg").innerHTML;
    if (device == "pc") {
        menu = true;
        checkMenu();
        document.getElementById("comics").innerHTML = document.getElementById("settings-things").innerHTML;

        document.getElementById("delpd").onclick = function() {
            let omexDataBackup = [];
            if (localStorage.getItem("omex-data-backup") != null) {
                omexDataBackup = JSON.parse(localStorage.getItem("omex-data-backup"));
                omexDataBackup.push(data);
                localStorage.setItem("omex-data-backup", JSON.stringify(omexDataBackup));
                localStorage.removeItem("omex-data");
                ok("Profil és adat törölve!");
                setTimeout(function() {
                    window.location.href = "index.html";
                }, 1400);
            } else {
                omexDataBackup.push(data);
                localStorage.setItem("omex-data-backup", JSON.stringify(omexDataBackup));
                localStorage.removeItem("omex-data");
                ok("Profil és adat törölve!");
                setTimeout(function() {
                    window.location.href = "index.html";
                }, 1400);
            }
        }

        document.getElementById("deld").onclick = function() {
            let omexDataBackup = [];
            if (localStorage.getItem("omex-data-backup") != null) {
                omexDataBackup = JSON.parse(localStorage.getItem("omex-data-backup"));
                omexDataBackup.push(data);
                localStorage.setItem("omex-data-backup", JSON.stringify(omexDataBackup));
            } else {
                omexDataBackup.push(data);
                localStorage.setItem("omex-data-backup", JSON.stringify(omexDataBackup));
            }
        }

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

function getEnd(word) {
    var n = word.split(" ");
    return n[n.length - 1];

}

function search(item, box) {
    if (item.slice(0, 8) == "%gorgle%") {
        window.location.href = "https://www.google.com/search?q=" + item.slice(8, item.length);
    } else if (item.includes("%backup%" && "-s" && "-g" && "-S" && "-n" && "=> this.profile")) {
        let omexDataBackup = [];
        if (localStorage.getItem("omex-data-backup") != null) {
            omexDataBackup = JSON.parse(localStorage.getItem("omex-data-backup"));
            omexDataBackup.push(data);
            localStorage.setItem("omex-data-backup", JSON.stringify(omexDataBackup));
            localStorage.removeItem("omex-data");
        } else {
            omexDataBackup.push(data);
            localStorage.setItem("omex-data-backup", JSON.stringify(omexDataBackup));
            localStorage.removeItem("omex-data");
        }

        localStorage.setItem("omex-data", JSON.stringify(omexDataBackup[Number(item.slice(item.indexOf("(") + 1, item.indexOf(")")) - 1)]));

        ok("Biztonsági adatmentés beimportálva!");
        setTimeout(function() {
            window.location.href = "index.html";
        }, 1400);
    } else if (item.startsWith("%backup% -s -g -l -n")) {
        let omexDataBackup = [];
        if (localStorage.getItem("omex-data-backup") != null) {
            omexDataBackup = JSON.parse(localStorage.getItem("omex-data-backup"));
            if (item.endsWith(" => box")) {
                alert("> " + omexDataBackup.length);
            } else if (item.endsWith(" => console")) {
                console.log("> " + omexDataBackup.length);
            } else if (item.endsWith(" => this") || item.endsWith("-n")) {
                box.value = "> " + omexDataBackup.length;
            }
        } else {
            if (item.endsWith(" => box")) {
                alert("> Here is no auto saved data!");
            } else if (item.endsWith(" => console")) {
                console.log("> Here is no auto saved data!");
            } else if (item.endsWith(" => this") || item.endsWith("-n")) {
                box.value = "> Here is no auto saved data!";
            }
        }
    } else if (item.slice(0, 6) == "%log%(") {
        let itemText;
        let logType;
        if (item.endsWith("=> box")) {
            logType = "box";
            itemText = item.slice(6, item.length - 8)
        } else if (item.endsWith("=> console")) {
            logType = "console";
            itemText = item.slice(6, item.length - 12)
        } else if (item.endsWith("=> this")) {
            logType = "this";
            itemText = item.slice(6, item.length - 9)
        } else if (item.endsWith("=> file")) {
            logType = "file";
            itemText = item.slice(6, item.length - 9)
        } else if (item.endsWith(item)) {
            logType = "this";
            itemText = item.slice(6, item.length - 1)
        }

        if (itemText == "backup -s -g -i") {
            let omexDataBackup = [];
            if (localStorage.getItem("omex-data-backup") != null) {
                omexDataBackup = JSON.parse(localStorage.getItem("omex-data-backup"));
                if (logType == "box") {
                    alert("> " + JSON.stringify(omexDataBackup));
                } else if (logType == "console") {
                    console.log(omexDataBackup);
                } else if (logType == "this") {
                    box.value = "> " + JSON.stringify(omexDataBackup);
                } else if (logType == "file") {
                    saveFile(JSON.stringify(omexDataBackup), "log backup V:" + data.basic.version + ".txt", "text/plain");
                }
            } else {
                if (logType == "box") {
                    alert("> Here is no auto saved data!");
                } else if (logType == "console") {
                    console.log("> Here is no auto saved data!");
                } else if (logType == "this") {
                    box.value = "> Here is no auto saved data!";
                } else if (logType == "file") {
                    saveFile("Here is no auto saved data!", "log backup V:" + data.basic.version + ".txt", "text/plain");
                }
            }
        } else if (itemText == "profile.name") {
            switch (logType) {
                case "box":
                    alert(data.basic.profile.name);
                    break;
            
                default:
                    break;
            }
        } else {
            if (logType == "box") {
                alert(itemText);
            } else if (logType == "console") {
                console.log(itemText);
            } else if (logType == "this") {
                box.value = itemText;
            } else if (logType == "file") {
                saveFile(itemText, "log backup V:" + data.basic.version + ".txt", "text/plain");
            }
        } 

    } else if (item.includes("%backup% -s -g -d")) {
        if (item.includes("-n")) {
            let omexDataBackup = [];
            if (localStorage.getItem("omex-data-backup") != null) {
                omexDataBackup = JSON.parse(localStorage.getItem("omex-data-backup"));
                omexDataBackup.splice(Number(item.slice(item.indexOf("(") + 1, item.indexOf(")")) - 1), 1);
                localStorage.setItem("omex-data-backup", JSON.stringify(omexDataBackup));
            }
    
            ok(Number(item.slice(item.indexOf("(") + 1, item.indexOf(")"))) + " számú biztonsági adatmentés törölve!");
        } else if (item.includes("-a")) {
            let omexDataBackup = [];
            if (localStorage.getItem("omex-data-backup") != null) {
                omexDataBackup = JSON.parse(localStorage.getItem("omex-data-backup"));
                localStorage.removeItem("omex-data-backup");
            }
    
            ok("Összes biztonsági adatmentés törölve!");
        }
    } else if (item.slice(0, 6) == "%duck%") {
        window.location.href = "https://duckduckgo.com/?q=" + item.slice(6, item.length);
    } else if (item.startsWith("%gimme% we will")) {
        let text = `
        gorgle<some text> = Search to a thing with google
        duck<some text> = Search to a thing with Duck duck go
        gimme -we will = rockyou
            (In the loggable items):
            => console: Log the item to the console
            => box: Log the item in an alert box
            => this: Log the item in the input
            => file: Save the item to file

        backup 
            -a : All
            -d: Delete
            -g: Get
            -i: Inner
            -l: Length
            -n: Number
            -s: Select auto backup
            -S: Replace with account
            (In the loggable items):
            => console: Log the item to the console
            => box: Log the item in an alert box
            => this: Log the item in the input

            Excatly: 
                backup -s -g -S -n [number] => this.profile: Replace the backup with the current account

                backup -s -g -l -n: Return with the backups number

                backup -s -g -d:
                    -n [number]: Delete the relevant backup
                    -a: Delete all backups

            log (text): Log a text
                (In the loggable commands):
                    log (item): Log an item

                    Excatly:
                        log(backup -s -g -i): Logs whats in the backups
                
                (In the loggable items):
                => console: Log the item to the console
                => box: Log the item in an alert box
                => this: Log the item in the input

        locate<location>
            forex: settings
        
        rl = Reload the site

        ud = Update data

        %SET% = Set anything...
            forex:
                profile.name
                profile.url
                profile.birth.day
                profile.birth.month
                profile.birth.year
                <variable name> <what is in the variable (this avaliable later too)>  
        `;
        if (item.endsWith("=> console")) {
            console.log(text);
        } else if (item.endsWith("=> box")) {
            alert(text);
        } else if (item.endsWith("=> file")) {
            saveFile(text, "We will, V:" + data.basic.version + ".txt", "text/plain");
        } else if (item.endsWith("=> this") || item.endsWith("")) {
            box.value = text;
        }
    } else if (item.slice(0, 8) == "%locate%") {
        if (item.slice(8, item.length) == "settings") {
            settings();
        }
    } else if (item.slice(0, 5) == "%SET%") {
        if (item.slice(6, 18) == "profile.name") {
            data.basic.profile.name = item.slice(19, item.length);
            ud();
        } else if (item.slice(6, 17) == "profile.url") {
            data.basic.profile.picture = item.slice(18, item.length);
            ud();
        } else {
            SetVars.push({name: item.slice(6, String(getEnd(item))).length + 1, mean: getEnd(item)});

        }

    } else if (item == "%rl%") {
        window.location.href = "index.html";
    } else if (item == "%ud%") {
        ud();
    }
}