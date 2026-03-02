document.addEventListener('DOMContentLoaded', () => {
    const inputKills = document.getElementById('input-kills');
    const inputDeaths = document.getElementById('input-deaths');
    const inputAssists = document.getElementById('input-assists');
    
    const kdaScore = document.getElementById('kda-score');
    const evalTitle = document.getElementById('eval-title');
    const evalDesc = document.getElementById('eval-desc');
    const progressCircle = document.querySelector('.progress-ring__circle');
    
    // Circle math
    const radius = progressCircle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference; // Start at 0%
    
    // Select all text when clicking an input for easy typing
    [inputKills, inputDeaths, inputAssists].forEach(input => {
        input.addEventListener('focus', function() {
            this.select();
        });
        
        // Prevent negative numbers via keyboard
        input.addEventListener('keydown', function(e) {
            if (e.key === '-' || e.key === 'e') {
                e.preventDefault();
            }
        });

        // Trigger calculation on input
        input.addEventListener('input', function() {
            if (this.value === '') this.value = 0; // fallback
            // Remove leading zeros
            if (this.value.length > 1 && this.value.startsWith('0')) {
                this.value = parseInt(this.value, 10);
            }
            calculateKDA();
        });
    });
    
    function setProgress(percent) {
        // Clamp between 0 and 100
        const clampedPercent = Math.min(Math.max(percent, 0), 100);
        const offset = circumference - (clampedPercent / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
    }

    const tiers = [
        {
            max: 0.99,
            title: "Feeder",
            desc: "Having a rough game! Focus on survival and playing safe.",
            color: "var(--tier-terrible)",
            progressMax: 1
        },
        {
            max: 1.99,
            title: "Average",
            desc: "You're holding your own. A solid, balanced performance.",
            color: "var(--tier-bad)",
            progressMax: 2
        },
        {
            max: 2.99,
            title: "Good",
            desc: "Positive impact! You're actively contributing to the team's success.",
            color: "var(--tier-average)",
            progressMax: 3
        },
        {
            max: 3.99,
            title: "Excellent",
            desc: "Carrying the game. The enemies are definitely afraid of you.",
            color: "var(--tier-good)",
            progressMax: 4
        },
        {
            max: 4.99,
            title: "Dominating",
            desc: "Absolute menace. You are controlling the flow of the match.",
            color: "var(--tier-excellent)",
            progressMax: 5
        },
        {
            max: Infinity,
            title: "Godlike",
            desc: "Unstoppable force. A truly legendary performance!",
            color: "var(--tier-godlike)",
            progressMax: 10
        }
    ];

    function calculateKDA() {
        const kills = parseInt(inputKills.value) || 0;
        const deaths = parseInt(inputDeaths.value) || 0;
        const assists = parseInt(inputAssists.value) || 0;

        // If no stats entered
        if (kills === 0 && deaths === 0 && assists === 0) {
            kdaScore.textContent = "0.00";
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

        let ratio = 0;
        if (deaths === 0) {
            // 'Perfect' KDA logic
            ratio = kills + assists;
        } else {
            ratio = (kills + assists) / deaths;
        }

        // Display
        if (deaths === 0 && ratio > 0) {
             kdaScore.textContent = "PFCT"; // Perfect
        } else {
             kdaScore.textContent = ratio.toFixed(2);
        }

        // Determine tier
        const tier = tiers.find(t => ratio <= t.max);
        
        // Update UI
        evalTitle.textContent = tier.title;
        evalDesc.textContent = tier.desc;
        
        // Color updates
        evalTitle.style.background = "none";
        evalTitle.style.webkitBackgroundClip = "border-box";
        evalTitle.style.webkitTextFillColor = tier.color;
        evalTitle.style.color = tier.color;
        
        progressCircle.style.stroke = tier.color;
        
        // Calculate progress circle fill based on ratio within the tier's expected range
        // For visual appeal, map ratio 0-10 to 0-100%
        let progressPercent = (ratio / 10) * 100;
        if (deaths === 0 && ratio > 0) progressPercent = 100; // Max out for perfect KDA
        
        setProgress(progressPercent);
        
        // Animate the values slightly
        kdaScore.style.transform = 'scale(1.1)';
        setTimeout(() => {
            kdaScore.style.transform = 'scale(1)';
        }, 150);
    }
    
    // Initial calculation (in case inputs have pre-filled standard HTML values)
    setTimeout(calculateKDA, 100);
});
