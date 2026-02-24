function hesapla() {

    let kills = parseInt(document.getElementById("kills").value) || 0;
    let deaths = parseInt(document.getElementById("deaths").value) || 1;
    let assists = parseInt(document.getElementById("assists").value) || 0;

    let kda = (kills + assists) / deaths;
    let rank = "";
    let img = "";


    document.getElementById("result").innerHTML =
        `KDA: ${kda.toFixed(2)}<br>
         Rank: ${rank}<br>
         <img src="${img}" class="rank-img">`;
}

function sifirla() {
    document.getElementById("kills").value = "";
    document.getElementById("deaths").value = "";
    document.getElementById("assists").value = "";
    document.getElementById("result").innerHTML = "";
}