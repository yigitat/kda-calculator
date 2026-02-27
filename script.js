function hesaplaValorant() {
    hesaplaRank("valorant");
}

function hesaplaCS2() {
    hesaplaRank("cs2");
}

function hesaplaRank(game) {

    let kills = parseInt(document.getElementById("kills").value) || 0;
    let deaths = parseInt(document.getElementById("deaths").value) || 1;
    let assists = parseInt(document.getElementById("assists").value) || 0;

    let kda = (kills + assists) / deaths;

    let rank = "";
    let img = "";


    document.getElementById("result").innerHTML =
        `KDA: ${kda.toFixed(2)}<br>`;
}

function hesaplaMOBA() {

    let kills = parseInt(document.getElementById("kills").value) || 0;
    let deaths = parseInt(document.getElementById("deaths").value) || 1;
    let assists = parseInt(document.getElementById("assists").value) || 0;

    let kda = (kills + assists) / deaths;

    let rating = "";

    if (kda < 1) rating = "Beginner";
    else if (kda < 2) rating = "Average";
    else if (kda < 3) rating = "Good";
    else if (kda < 4) rating = "Pro";
    else rating = "Godlike";

    document.getElementById("result").innerHTML =
        `KDA: ${kda.toFixed(2)}<br>`;
}

function sifirla() {
    document.getElementById("kills").value = "";
    document.getElementById("deaths").value = "";
    document.getElementById("assists").value = "";
    document.getElementById("result").innerHTML = "";
}