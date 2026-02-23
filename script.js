function hesapla() {

    let kills = parseInt(document.getElementById("kills").value) || 0;
    let deaths = parseInt(document.getElementById("deaths").value) || 1;
    let assists = parseInt(document.getElementById("assists").value) || 0;

    let kda = (kills + assists) / deaths;
    let rank = "";
    let img = "";

    if (kda < 0.8) { rank = "Unranked"; img="ranks/unranked.png"; }
    else if (kda < 1) { rank = "Iron"; img="ranks/iron.png"; }
    else if (kda < 1.2) { rank = "Bronze"; img="ranks/bronze.png"; }
    else if (kda < 1.4) { rank = "Silver"; img="ranks/silver.png"; }
    else if (kda < 1.6) { rank = "Gold"; img="ranks/gold.png"; }
    else if (kda < 1.8) { rank = "Platinum"; img="ranks/platinum.png"; }
    else if (kda < 2) { rank = "Diamond"; img="ranks/diamond.png"; }
    else if (kda < 2.2) { rank = "Ascedant"; img="ranks/ascedant.png"; }
    else if (kda < 2.5) { rank = "Immortal"; img="ranks/immortal.png"; }
    else { rank = "Radiant"; img="ranks/radiant.png"; }

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