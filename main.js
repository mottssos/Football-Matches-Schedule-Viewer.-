const apiKey = 'bf4b49de00f13a747f162758286e5783'; // ضع مفتاح الـ API الخاص بك هنا

        const leagues = [
            { name: 'الدوري الإنجليزي', path: 'soccer_epl', reg: 'uk' },
            { name: 'الدوري الإسباني', path: 'soccer_spain_la_liga', reg: 'eu' },
            { name: 'الدوري الإيطالي', path: 'soccer_italy_serie_a', reg: 'eu' },
            { name: 'الدوري الألماني', path: 'soccer_germany_bundesliga', reg: 'eu' },
            { name: 'الدوري الفرنسي', path: 'soccer_france_ligue_one', reg: 'eu' }
        ];

        const buttonsDiv = document.getElementById('buttons');

        leagues.forEach(league => {
            const upcomingButton = document.createElement('button');
            upcomingButton.textContent = `المباريات القادمة - ${league.name}`;
            upcomingButton.onclick = () => {
                fetchMatches(league, true);
                saveLeagueSelection(league.name, true);
            };
            buttonsDiv.appendChild(upcomingButton);

            const pastButton = document.createElement('button');
            pastButton.textContent = `المباريات السابقة - ${league.name}`;
            pastButton.onclick = () => {
                fetchMatches(league, false);
                saveLeagueSelection(league.name, false);
            };
            buttonsDiv.appendChild(pastButton);
        });

        const fetchMatches = (league, isUpcoming) => {
            const url = `https://api.the-odds-api.com/v4/sports/${league.path}/odds?regions=${league.reg}&apiKey=${apiKey}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const resultsDiv = document.getElementById('results');
                    resultsDiv.innerHTML = '';

                    if (data.length > 0) {
                        const leagueTitle = document.createElement('h3');
                        leagueTitle.textContent = `مباريات دوري: ${league.name}`;
                        resultsDiv.appendChild(leagueTitle);

                        data.forEach(game => {
                            const gameTime = game.timestamp ? new Date(game.timestamp * 1000) : new Date(game.commence_time);
                            const formattedDate = gameTime.toLocaleString('ar-DZ', { day: 'numeric', month: 'numeric', hour: 'numeric', minute: 'numeric' });

                            if ((isUpcoming && gameTime > new Date()) || (!isUpcoming && gameTime < new Date())) {
                                const gameDiv = document.createElement('div');
                                gameDiv.className = 'game';

                                const homeTeam = document.createElement('div');
                                homeTeam.className = 'team home';
                                homeTeam.textContent = game.home_team;
                                gameDiv.appendChild(homeTeam);

                                const vsText = document.createElement('div');
                                vsText.className = 'vs';
                                vsText.textContent = 'VS';
                                gameDiv.appendChild(vsText);

                                const awayTeam = document.createElement('div');
                                awayTeam.className = 'team away';
                                awayTeam.textContent = game.away_team;
                                gameDiv.appendChild(awayTeam);

                                const gameDateElement = document.createElement('p');
                                gameDateElement.textContent = `تاريخ: ${formattedDate}`;
                                gameDiv.appendChild(gameDateElement);

                                resultsDiv.appendChild(gameDiv);
                            }
                        });
  
if(scrollY=4060) {
                    document.getElementById('scrollBtn').style.display = 'block';
}else{
                    document.getElementById('scrollBtn').style.display = 'none';
}                       window.scrollTo({
                            top: document.body.scrollHeight,
                            behavior: 'smooth'
                        });
                    } else {
                        const noDataMessage = document.createElement('p');
                        noDataMessage.textContent = `لا توجد مباريات لدوري: ${league.name}`;
                        resultsDiv.appendChild(noDataMessage);
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    const errorMessage = document.createElement('p');
                    errorMessage.textContent = `حدث خطأ أثناء جلب بيانات دوري: ${league.name}. ${error.message}`;
                    document.getElementById('results').appendChild(errorMessage);
                });
        };

        const saveLeagueSelection = (leagueName, isUpcoming) => {
            localStorage.setItem('selectedLeague', leagueName);
            localStorage.setItem('isUpcoming', isUpcoming);
        };

        const loadPreviousSelection = () => {
            const selectedLeague = localStorage.getItem('selectedLeague');
            const isUpcoming = localStorage.getItem('isUpcoming');

            if (selectedLeague && isUpcoming !== null) {
                const league = leagues.find(l => l.name === selectedLeague);
                fetchMatches(league, isUpcoming === 'true');
            }
  
} ;

        const scrollToTop = () => {
            window.scrollTo({
                top:0,
                behavior: 'smooth'
            });
        };

        // تحميل الاختيار السابق عند فتح الصفحة
        window.onload = loadPreviousSelection;
        
    