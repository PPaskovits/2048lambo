"use strict";
function saveCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

class Highscore {
    constructor() {
        this.highscores = [];
    }

    loadHighscore() {
        var scoresString = readCookie("highscores");
        if (scoresString != null) {
            var highscores = JSON.parse(scoresString);
            highscores.forEach(score => this.highscores.push(parseInt(score)));
        }
        this.sortScores();
    }

    saveHighscore() {
        var scoresString = JSON.stringify(this.highscores);
        saveCookie("highscores", scoresString);
    }

    sortScores() {
        this.highscores.sort((a, b) => b - a);
        this.highscores = this.highscores.slice(0,10);
    }

    registerScore(score) {
        this.highscores.push(score);
        this.sortScores();
        this.saveHighscore();
    }

    getBestScore() {
        return this.highscores.length ? this.highscores[0] : 0;
    }

    getScores() {
        return this.highscores.slice(0);
    }
}

export default Highscore;