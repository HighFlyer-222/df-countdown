const timerText = document.querySelector(".timer-text")
const formatBox = document.querySelector("#format-box")
const releaseDate = new Date('July 29, 2022 06:00:00');
let prevSeconds = -1;
let format = "\\y years, \\d days, \\h hours, \\m minutes, \\s seconds"
let click = new Audio("assets/sfx/noise.wav");
let ding = new Audio("assets/sfx/ding.wav");
let piece = new Audio("assets/sfx/piece.ogg");
let lv = new Audio("assets/sfx/lv.wav");
let revival = new Audio("assets/sfx/revival.ogg");
let blip = new Audio("assets/sfx/blip.wav")
let sounds = true
const formats = [
    "\\y years, \\d days, \\h hours, \\m minutes, \\s seconds",
    "\\cd days, \\h hours, \\m minutes, \\s seconds",
    "\\ch hours, \\m minutes, \\s seconds",
    "\\cm minutes, \\s seconds",
    "\\cs seconds",
    "\\cd:\\H:\\M:\\S",
    "\\cdd \\hh \\mm \\ss",
    "\\ch:\\M\:\\S.\\X"
]
const titles = [
    "New update coming February 3030!",
    "go my clovers",
    "Fuck DDoSers!",
    "Also try DF REFLECTED!",
    "Also try DF COLLECTED!",
    "Also try DF Editor!",
    "As seen in the cryptic sneak peeks!",
    "Approved by Bagel!",
    "Absolutely rune-free!",
    "Not enough splash texts!",
    "A good use of your time!",
    "The compendium of progress reports!",
    "Now with secret boss battles!",
    "Way too much effort!",
    "Also try DF: Lost Memories!",
    "Moddable!"
]
/*
const releaseTexts = [
    "releases in",
    "will be released in",
    "drops in",
    "will drop in",
    "comes out in",
    "will come out in"
]
*/
const releaseTexts = [
    "has been cooking for",
    "has been in the works for",
    "has been in development for"
]
const weGot = [
    { name: "DFR v2.2", url: "https://gamejolt.com/games/DontForgetReflected/697070" },
    { name: "DF on GameBanana", url: "https://gamebanana.com/games/21443" },
    { name: "Nintendo Switch 2 reveal", url: "https://www.youtube.com/watch?v=itpcsQQvgAQ" },
    { name: "Geometry Dash Update 2.2", url: "https://store.steampowered.com/app/322170/Geometry_Dash" },
    { name: "OFF Remaster announcement", url: "https://www.youtube.com/watch?v=SipCXcNdM2E" },
    { name: "Undertale Yellow", url: "https://gamejolt.com/games/UndertaleYellow/136925" },
    { name: "GTA VI trailer", url: "https://www.youtube.com/watch?v=QdBZY2fkU-0" },
    { name: "RIBBIT 2.0", url: "https://gamejolt.com/games/ribbitmod/671888" },
    { name: "TS!Underswap Demo v2.0", url: "https://gamejolt.com/games/tsunderswap/160094" },
    { name: "DELTATRAVELER Section 3", url: "https://gamejolt.com/games/deltatraveler/661464" },
    { name: "PS!Outertale", url: "https://gamejolt.com/games/outertale/643082" },
    { name: "Spamton Sweepstakes", url: "https://deltarune.com/sweepstakes/" }
]
const songs = [
    { name: "Grillbz", game: "DONTFORGET" },
    { name: "Lazybones", game: "DF CONNECTED" },
    { name: "Snow Place Like Home", game: "DF CONNECTED" },
    { name: "This Is A Nice Hotel They Play Jazz Here", game: "DF CONNECTED" },
    { name: "At The World's CORE", game: "DF CONNECTED" },
    { name: "Hometown Reprise", game: "DF CONNECTED" },
    { name: "A CYBER'S SPACE!", game: "DFC v2.8.0" },
    { name: "Hometown (Remastered)", game: "DFC v2.8.0" },
    { name: "Forgotten Lab", game: "DF Chapter 1" },
    { name: "Uwa!! So Nighttime!", game: "DF CONNECTED" },
    { name: "Blooky's Hit Single", game: "DF CONNECTED" },
    { name: "HYPERLINK BLOCKED", game: "DFC v2.8.0" },
    { name: "Luck of the Draw", game: "DFC v2.8.0" },
    { name: "Purification In Progress", game: "DFC v2.8.0" },
    { name: "Forgotten Memory", game: "DONTFORGET" },
    { name: "Green Room", game: "DELTARUNE" }
]
let song = -1

window.onload = function() {
changeWeGot()
formatBox.value = format
document.title = "DFCD: " + titles[Math.floor(Math.random() * titles.length)]
document.querySelector(".timer-above").innerHTML = "DF CONNECTED v2.8.0 " + releaseTexts[Math.floor(Math.random() * releaseTexts.length)]
let updateTimer = setInterval(() => {
    let currentDate = new Date()
    let formatted = "";
    /*
    if (releaseDate.getTime() - currentDate.getTime() < -86400000) {
        timerText.innerHTML = "DF CONNECTED V2.8.0 IS OUT!"
        document.title = "DFCD: It's out!"
        clearPage()
        document.querySelector(".timer-under").innerHTML = "Enjoy the update!"
        clearInterval(updateTimer)
    } else if (releaseDate.getTime() - currentDate.getTime() < 0) {
        timerText.innerHTML = "It is now release day in RickyG's timezone."
        document.title = "DFCD: Is it out?"
        timerText.style.zIndex = "auto"
        document.querySelector(".timer-under").style.zIndex = "auto"
        document.querySelector(".fader").style.display = "block"
        document.querySelector(".fader").style.opacity = 0
        document.querySelector(".fader").style.animation = "epicFade 2s linear 1s 1 normal backwards"
        revival.play()
        clearPage()
        clearInterval(updateTimer)
    } else {
     */
        for (let i = 0; i < format.length; i++) {
            if (format[i] == "\\") {
                let combine = format[i + 1].toLowerCase() == "c"
                let next = (combine ? format[i + 2] : format[i + 1])
                let remaining = currentDate.getTime() - releaseDate.getTime()
                let days = Math.floor(remaining / (1000 * 60 * 60 * 24));
                let hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((remaining % (1000 * 60)) / 1000);
                let millis = Math.floor((remaining % (1000)) / (1000/60));
                if (prevSeconds == -1) prevSeconds = seconds
                if (prevSeconds != seconds) {
                    if (remaining <= 10000) {
                        document.querySelector("#player").volume = seconds / 10
                        document.querySelector(".fader").style.display = "block"
                        document.querySelector(".fader").style.opacity = Math.abs(seconds - 10) / 10 
                    }
                    if (sounds) {
                        if (seconds == 59) {
                            if (minutes == 59) {
                                if (hours == 23) lv.play()
                                else piece.play()
                            }
                            else ding.play()
                        }
                        else click.play()
                    }
                }
                prevSeconds = seconds
                switch (next.toLowerCase()) {
                    case "y":
                        formatted += Math.floor(days / 365).toString()
                        break;
                    case "d":
                        if (!combine) formatted += (days - Math.floor(days / 365) * 365).toString()
                        else formatted += days.toString()
                        break;
                    case "h":
                        if (combine) hours += days * 24
                        else if (next == "H" && hours < 10) formatted += "0"
                        formatted += hours.toString()
                        break;
                    case "m":
                        if (combine) minutes += days * 24 * 60 + hours * 60
                        else if (next == "M" && minutes < 10) formatted += "0"
                        formatted += minutes.toString()
                        break;
                    case "s":
                        if (combine) seconds += days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60
                        else if (next == "S" && seconds < 10) formatted += "0"
                        formatted += seconds.toString()
                        break;
                    case "x":
                        if (combine) millis += days * 24 * 60 * 60 * 1000 + hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000
                        else if (next == "X" && millis < 10) formatted += "0"
                        formatted += millis.toString()
                        break;
                    default:
                        formatted += format[i]
                        formatted += format[i + 1]
                        if (combine)
                            formatted += format[i + 2]
                        break
                }
            } else if (format[i - 1] != "\\" && !(format[i - 2] == "\\" && format[i - 1] == "c")) {
                formatted += format[i]
            }
        // }

        timerText.innerHTML = formatted.replaceAll("\\n", "<br>")
        
    }
}, 1);
}

document.addEventListener("mouseover", e => {
    if (e.target.closest("a")) blip.play()
});

document.addEventListener(`click`, e => {
    let select = new Audio("assets/sfx/select.wav")
    if (e.target.closest("a")) select.play()
});

function applyFormat() {
    format = formatBox.value
    if (formatBox.value == "") format = formats[0]
}

function randomFormat() {
    let oldVal = formatBox.value
    while (oldVal == formatBox.value)
        formatBox.value = formats[Math.floor(Math.random() * formats.length)]
}

function changeSong(val = 1) {
    song += val
    if (song > songs.length - 1)
        song = -1
    if (song < -1)
        song = songs.length - 1
    if (song == -1) {
        document.querySelector("#player").src = ""
        document.querySelector("#mus-title").innerHTML = "No music"
    } else {
        document.querySelector("#player").src = "assets/music/" + songs[song].name + ".ogg"
        document.querySelector("#mus-title").innerHTML = `${songs[song].name} (${songs[song].game})`
    }
}

function clearPage() {
    document.querySelector(".timer-above").style.display = "none"
    document.querySelector(".timer-under").style.display = "block"
    document.querySelector(".format").style.display = "none"
    document.querySelector(".music").style.display = "none"
    document.querySelector("header").style.display = "none"
    document.querySelector(".progress-reports").style.display = "none"
    document.querySelector("body").style.backgroundImage = "none";
}

function toggleSounds() {
    sounds = !sounds
    if (sounds) document.querySelector("#sound-toggle").innerHTML = "Countdown Sounds: ON"
    else document.querySelector("#sound-toggle").innerHTML = "Countdown Sounds: OFF"
}

function changeWeGot() {
    let whatWeGot = weGot[Math.floor(Math.random() * weGot.length)]
    while (document.querySelector("#wegot").innerHTML.includes(whatWeGot.name))
        whatWeGot = weGot[Math.floor(Math.random() * weGot.length)]
    document.querySelector("#wegot").innerHTML = `We got <a href="${whatWeGot.url}" target="_blank">${whatWeGot.name}</a> before DFC v2.8.0!`
}