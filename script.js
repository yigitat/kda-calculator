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
<<<<<<< HEAD

=======

>>>>>>> cee4fefd955f7de5edaa404b085f8a8c6f1e8698

    document.getElementById("result").innerHTML =
        `KDA: ${kda.toFixed(2)}<br>`;
}

function sifirla() {
    document.getElementById("kills").value = "";
    document.getElementById("deaths").value = "";
    document.getElementById("assists").value = "";
    document.getElementById("result").innerHTML = "";
}