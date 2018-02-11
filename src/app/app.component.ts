import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Premier League Recent Results and Fixtures';
  matchData = null
  constructor(private http: HttpClient) {
    this.http.get("http://push.api.bbci.co.uk/p?t=morph%3A%2F%2Fdata%2Fbbc-morph-football-scores-match-list-data%2FendDate%2F2018-02-28%2FstartDate%2F2018-02-01%2FtodayDate%2F2018-02-10%2Ftournament%2Fpremier-league%2Fversion%2F2.4.0&c=1").subscribe( bbcData=>{
      let data = JSON.parse(bbcData.moments[0].payload);
      data = data.matchData[0].tournamentDatesWithEvents;
      let dates = Object.keys(data);
      let displayData = [];
      dates.forEach( date => {
        console.log("date", date)
        console.log("data[date][0].events", data[date][0].events)
        let matches = [];
        data[date][0].events.forEach( (match) => {
          let homeTeam = match.homeTeam.name.full;
          let homeScore = match.homeTeam.scores.fullTime;
          let awayTeam = match.awayTeam.name.full;
          let awayScore = match.awayTeam.scores.fullTime;
          matches.push({
            homeTeam, homeScore, awayTeam, awayScore
          });
        });
        let matchDay = {
          date, matches
        }
        displayData.push(matchDay);
      });
      this.matchData = displayData;
    });
  }
}
