//Key Variables
function onClick(e) {
e.preventDefault();
let firstName = document.getElementById('firstName').value;
let lastName = document.getElementById('lastName').value;
let urlPlayers = "https://nba-players.herokuapp.com/players-stats" + "/"+ lastName +'/' + firstName +  "?json";
const urlPicture = "https://nba-players.herokuapp.com/players/" + lastName + "/" + firstName +  "?json";
document.getElementById('playerPhoto').innerHTML = `
 <img class = "center" style="width:400px;height:350px;" src = "` + urlPicture + `">`;
//Fetches Data
fetch(urlPlayers)
    .then(function(response) {
      // make sure the request was successful
      if (response.status != 200) {
        document.getElementById('playerPhoto').innerHTML = "<p>There was an error</p>";
        return {
          text: "Seems that something went wrong, please try again " + response.statusText
        }
      }
      return response.json();
    }).then(function(json) {
      var playerInfo = [];
      playerInfo.push(json.team_name);
      playerInfo.push(json.games_played);
      playerInfo.push(json.minutes_per_game);
      playerInfo.push(json.field_goal_percentage);
      playerInfo.push(json.free_throw_percentage);
      playerInfo.push(json.three_point_percentage);
      playerInfo.push(json.points_per_game);
      playerInfo.push(json.assists_per_game);
      playerInfo.push(json.turnovers_per_game);
      playerInfo.push(json.player_efficiency_rating);
      console.log(playerInfo);
      //updateResult(json.text);
      return playerInfo;
    }).then(function(playerInfo){
      document.getElementById('table').innerHTML = `
      <table align = "center" border = 1 id = "dataTable" class = "tableStats">
          <tr>
            <td style = 'padding:5px'> Team Name </td>
            <td style = 'padding:5px'> Games Played </td>
            <td style = 'padding:5px'> MPG </td>
            <td style = 'padding:5px'> FGP </td>
            <td style = 'padding:5px'> FTP </td>
            <td style = 'padding:5px'> TPG </td>
            <td style = 'padding:5px'> PPG </td>
            <td style = 'padding:5px'> APG </td>
            <td style = 'padding:5px'> TOPG </td>
            <td style = 'padding:5px'> Player Efficiency Rating </td>
          </tr>
        </table>
      `
      document.getElementById('keyList').innerHTML = `
      <p> Meaning of Table Acronyms</p>
      <ul>
        <li>MPG: Minutes Per Game</li>
        <li>FGP: Field Goal Percentage</li>
        <li>FTP: Free Throw Percentage</li>
        <li>FTP: Free Throw Percentage</li>
        <li>TPG: Three Point Percentage</li>
        <li>PPG: Points Per Game</li>
        <li>APG: Assists Per Game</li>
        <li>TOPG: Turn-overs Per Game</li>
      </ul>
      `
      tableGenerator(playerInfo);
    })
}
function tableGenerator(array) {
  var newTable = document.getElementById("dataTable");
  var row = document.createElement('tr');
  var loopLength = (array.length/10);
  for (index = 0; index < loopLength; index++) {
    var row = document.createElement('tr');
    for (index2 = 0; index2 < 10; index2++) {
        var el = document.createElement('td');
        el.textContent = array[index2];
        row.appendChild(el);
    }
    newTable.appendChild(row);
  }
  return newTable;
}
document.getElementById('Search').addEventListener('click', onClick);
