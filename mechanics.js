var rows = $('tr');

var rowQty = rows.length;
var colQty = rows.eq(0).find('td').length;

var colVolume = [rowQty-1, rowQty-1, rowQty-1, rowQty-1, rowQty-1, rowQty-1, rowQty-1];

var player1Name = prompt('What is the name of the first player?');
var player2Name = prompt('What is the name of the second player?');

var currentColor = 'Red';

var blankCircle = "rgb(255, 255, 255)";
var redCircle = "rgb(231, 29, 54)";
var blueCircle = "rgb(46, 196, 182)";

var turnMade = false;
var gameSwitch = true;



//Click event
$('td').click(function() {
  var colClicked = $(this).index(),
    rowClicked = $(this).parent().index();

  drawColor(colClicked, currentColor);
  checkWinner();
  switchPlayer();
  showTurnInfo();
  //console.log("row index:" + rowClicked + ", col index :" + colClicked);
});



function drawColor(col, player){
  var circlePosition = rows.eq(colVolume[col]).find('td').eq(col);

  if (player === 'Red' && colVolume[col] >= 0)
  {
    circlePosition.css('background-color', redCircle);
    if (colVolume[col] >= 0) {
      colVolume[col]--;
      turnMade = true;
    }
  }

  else if (player === 'Blue' && colVolume[col] >= 0)
  {
    circlePosition.css('background-color', blueCircle);
    if (colVolume[col] >= 0) {
      colVolume[col]--;
      turnMade = true;
    }
  }
}



function checkWinner()
{
  if (checkHorizontal() || checkVertical() ||  checkDiagonalDes() || checkDiagonalAsc())
  {
    $("td").unbind();
    gameSwitch = false;
  }
}



function checkHorizontal()
{
  var winType = 'Horizontal';

  for (var i = 0; i < rowQty; i++)
  {
    for (var j = 3; j < colQty; j++)
    {
      if (isSame(checkColor(i,j), checkColor(i,j-1), checkColor(i,j-2), checkColor(i,j-3)) && checkColor(i,j) !== blankCircle)
      {

        if (checkColor(i,j) === redCircle)
        {
          showWinInfo(getPlayerNameByColor(), currentColor, winType);
          return true;
          break;
        }
        else if (checkColor(i,j) === blueCircle)
        {
          showWinInfo(getPlayerNameByColor(), currentColor, winType);
          return true;
          break;
        }

      }
    }
  }
}



function checkVertical()
{
  var winType = 'Vertical';

  for (var j = 0; j < colQty; j++)
  {
    for (var i = 3; i < rowQty; i++)
    {
      if (isSame(checkColor(i,j), checkColor(i-1,j), checkColor(i-2,j), checkColor(i-3,j)) && checkColor(i,j) !== blankCircle)
      {

        if (checkColor(i,j) === redCircle)
        {
          showWinInfo(getPlayerNameByColor(), currentColor, winType);
          return true;
          break;
        }
        else if (checkColor(i,j) === blueCircle)
        {
          showWinInfo(getPlayerNameByColor(), currentColor, winType);
          return true;
          break;
        }

      }
    }
  }
}



function checkDiagonalDes()
{
  var winType = 'Diagonal Descending';

  for (var i = 3; i < rowQty; i++)
  {
    for (var j = 3; j < colQty; j++)
    {
      if (isSame(checkColor(i,j), checkColor(i-1,j-1), checkColor(i-2,j-2), checkColor(i-3,j-3)) && checkColor(i,j) !== blankCircle)
      {

        if (checkColor(i,j) === redCircle)
        {
          showWinInfo(getPlayerNameByColor(), currentColor, winType);
          return true;
          break;
        }
        else if (checkColor(i,j) === blueCircle)
        {
          showWinInfo(getPlayerNameByColor(), currentColor, winType);
          return true;
          break;
        }

      }
    }
  }
}



function checkDiagonalAsc()
{
  var winType = 'Diagonal Ascending';

  for (var i = 0; i < rowQty-3; i++)
  {
    for (var j = 3; j < colQty; j++)
    {
      if (isSame(checkColor(i,j), checkColor(i+1,j-1), checkColor(i+2,j-2), checkColor(i+3,j-3)) && checkColor(i,j) !== blankCircle)
      {

        if (checkColor(i,j) === redCircle)
        {
          showWinInfo(getPlayerNameByColor(), currentColor, winType);
          return true;
          break;
        }
        else if (checkColor(i,j) === blueCircle)
        {
          showWinInfo(getPlayerNameByColor(), currentColor, winType);
          return true;
          break;
        }

      }
    }
  }
}



function checkColor(row, col)
{
  return rows.eq(row).find('td').eq(col).css('background-color');
}



function isSame(circ1, circ2, circ3, circ4)
{
    if(circ1 === circ2 && circ2 === circ3 && circ3 === circ4)
    {
      return true;
    }
    else
    {
      return false;
    }
}



function switchPlayer()
{
  if (currentColor === 'Red' && turnMade === true)
  {
    currentColor = 'Blue';
    turnMade = false;
  }
  else if(currentColor === 'Blue' && turnMade === true)
  {
    currentColor = 'Red';
    turnMade = false;
  }
}



function showTurnInfo()
{
    if(currentColor === 'Red' && gameSwitch === true)
    {
      $('#gameInfo').text('Current turn: ' + player1Name);
    }
    else if (currentColor === 'Blue' && gameSwitch === true)
    {
      $('#gameInfo').text('Current turn: ' + player2Name);
    }
}



function showWinInfo(playerName, playerColor, winType)
{
  $('#gameInfo').text('Congratulations ' + playerName + '! Refresh to play again.');
  alert(playerColor + ' wins! Win type: ' + winType);
}



function getPlayerNameByColor()
{
  if(currentColor === 'Red')
  {
    return player1Name;
  }
  else if (currentColor === 'Blue')
  {
    return player2Name;
  }
}
