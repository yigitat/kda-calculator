document.addEventListener('DOMContentLoaded', () => {
    const inputKills = document.getElementById('input-kills');
    const inputDeaths = document.getElementById('input-deaths');
    const inputAssists = document.getElementById('input-assists');
    const inputTeamKills = document.getElementById('input-team-kills');

    const kdaScore = document.getElementById('kda-score');
    const kpScore = document.getElementById('kp-score');
    const evalTitle = document.getElementById('eval-title');
    const evalDesc = document.getElementById('eval-desc');
    const progressCircle = document.querySelector('.progress-ring__circle');

    // Circle math
    const radius = progressCircle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;

    [inputKills, inputDeaths, inputAssists, inputTeamKills].forEach(input => {
        input.addEventListener('focus', function () { this.select(); });
        input.addEventListener('keydown', function (e) {
            if (e.key === '-' || e.key === 'e') e.preventDefault();
        });
        input.addEventListener('input', function () {
            if (this.value === '') this.value = 0;
            if (this.value.length > 1 && this.value.startsWith('0')) {
                this.value = parseInt(this.value, 10);
            }
            // Auto-adjust team kills if K+A is somehow higher
            if (this.id !== 'input-team-kills') {
                const k = parseInt(inputKills.value) || 0;
                const tk = parseInt(inputTeamKills.value) || 0;
                if (k > tk) inputTeamKills.value = k;
            }
            calculateMOBA();
        });
    });

    function setProgress(percent) {
        const clampedPercent = Math.min(Math.max(percent, 0), 100);
        const offset = circumference - (clampedPercent / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
    }

    const tiers = [
        { max: 1.49, title: "Feeding", color: "var(--tier-terrible)" },
        { max: 2.49, title: "Sub-par", color: "var(--tier-bad)" },
        { max: 3.49, title: "Average", color: "var(--tier-average)" },
        { max: 4.99, title: "Great", color: "var(--tier-good)" },
        { max: 6.99, title: "Carrying", color: "var(--tier-excellent)" },
        { max: Infinity, title: "1v9 Machine", color: "var(--tier-godlike)" }
    ];

    function calculateMOBA() {
        const kills = parseInt(inputKills.value) || 0;
        const deaths = parseInt(inputDeaths.value) || 0;
        const assists = parseInt(inputAssists.value) || 0;
        const teamKills = parseInt(inputTeamKills.value) || 0;

        if (kills === 0 && deaths === 0 && assists === 0) {
            kdaScore.textContent = "0.00";
            kpScore.textContent = "0%";
            evalTitle.textContent = "Unranked";
            evalDesc.textContent = "Enter your stats to see your rank.";
            evalTitle.style.background = `linear-gradient(to right, var(--text-main), var(--text-muted))`;
            evalTitle.style.webkitBackgroundClip = "text";
            evalTitle.style.webkitTextFillColor = "transparent";
            kdaScore.style.color = "var(--text-main)";
            progressCircle.style.stroke = "rgba(255,255,255,0.05)";
            setProgress(0);
            return;
        }

        // KDA Calc
        let ratio = (deaths === 0) ? (kills + assists) : ((kills + assists) / deaths);
        kdaScore.textContent = (deaths === 0 && ratio > 0) ? "PFCT" : ratio.toFixed(2);

        // Kill Participation Calc
        let kp = 0;
        if (teamKills > 0) {
            // Can't have more than 100% participation logically in base calculation
            kp = Math.min(((kills + assists) / teamKills) * 100, 100);
        } else if (kills + assists > 0 && teamKills === 0) {
            kp = 100; // If you have assist/kills but didn't put team kills yet, assume 100%
        }
        kpScore.textContent = `${kp.toFixed(0)}%`;

        // Tier Logic purely based on KDA first
        const tier = tiers.find(t => ratio <= t.max);

        // Dynamic description based on KP
        let kpDesc = "";
        if (kp < 30) kpDesc = "You're playing a bit too far from your team. Try to group up more.";
        else if (kp < 50) kpDesc = "Decent involvement, but you could have more map presence.";
        else if (kp < 75) kpDesc = "Good map presence! Always there when a fight breaks out.";
        else kpDesc = "Incredible macro play! You are involved in almost every kill.";

        evalTitle.textContent = tier.title;
        evalDesc.textContent = kpDesc;

        evalTitle.style.background = "none";
        evalTitle.style.webkitBackgroundClip = "border-box";
        evalTitle.style.webkitTextFillColor = tier.color;
        evalTitle.style.color = tier.color;
        kpScore.style.color = tier.color;
        progressCircle.style.stroke = tier.color;

        let progressPercent = (ratio / 10) * 100;
        if (deaths === 0 && ratio > 0) progressPercent = 100;
        setProgress(progressPercent);

        kdaScore.style.transform = 'scale(1.1)';
        setTimeout(() => kdaScore.style.transform = 'scale(1)', 150);
    }

    setTimeout(calculateMOBA, 100);
});
