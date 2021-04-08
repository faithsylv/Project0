$(document).ready(function () {

//create global variables

  // store players' selected symbols
  let player1Symbol;
  let player2Symbol;

  // track symbol of whichever player's turn it is currently - this is what is ultimately put into each cell as text upon every click. This is initialised by assignSymbol and is changed each turn by switchPlayer.
  let currentPlayerSymbol;

  // store ongoing game scores for each player
  let player1Score = 0;
  let player2Score = 0;

  //variable to tell functions whether or not the game is still in play - initialise as false and changes to true if it's a cats game or there is a winner.
  let gameOver = false;

  //function to assign initial symbols to players based on button clicks. Called only once at start of first game - see main playGame function.
  const assignSymbol = function () {

    player1Symbol = $(this).text(); //put text into they player1Symbol variable - pulls from the text within the button selected. This on click event is within the main play game function.

    currentPlayerSymbol = player1Symbol; //player 1 always starts the first game.

    if (player1Symbol === 'X') { //assign symbol for player 2 based on player 1 choice
      player2Symbol = 'O';
    } else {
      player2Symbol = 'X';
    }

    //set display of which player chose which symbol at bottom of screen
    $('#player1-symbol-display').text(player1Symbol);
    $('#player2-symbol-display').text(player2Symbol);

    //remove the pick your symbol section, including button
    $('#symbol-picker').addClass('invisible');

    //make the cursor symbol appear and set it to the Player 1's symbol as they are starting the game.
    $('#cursor-symbol').removeClass('invisible');
    $('#cursor-symbol').text(player1Symbol);

    //set event listener to make the cursor symbol follow the cursor around the page
    $(document).on('mousemove', function(e){
      $('#cursor-symbol').css({
        left:  e.pageX,
        top:   e.pageY
      });
    });

  }

  //function to switch between players after each click. Called in main playGame function every time that a table cell is clicked.
  const switchPlayer = function (){

    if(currentPlayerSymbol === 'X') { //change the current player symbol
      currentPlayerSymbol = 'O';
      $('#cursor-symbol').text('O'); // change the symbol that follows the cursor to the new symbol
    } else if (currentPlayerSymbol === 'O'){
      currentPlayerSymbol = 'X';
      $('#cursor-symbol').text('X');
    }
  }

  //function to check if there is a winner. Called in main playGame function every time that a table cell is clicked.
  const checkWinner = function () {

    const cell1Text = $('#1').text();
    const cell2Text = $('#2').text();
    const cell3Text = $('#3').text();
    const cell4Text = $('#4').text();
    const cell5Text = $('#5').text();
    const cell6Text = $('#6').text();
    const cell7Text = $('#7').text();
    const cell8Text = $('#8').text();
    const cell9Text = $('#9').text();

    if (cell1Text === cell2Text && cell1Text === cell3Text && cell1Text !== ''){

      ifWinnerCalls();

    } else if (cell4Text === cell5Text && cell4Text === cell6Text && cell4Text !== ''){

      ifWinnerCalls();

    } else if (cell7Text === cell8Text && cell7Text === cell9Text && cell7Text !== '') {

      ifWinnerCalls();

    } else if (cell1Text === cell4Text && cell1Text === cell7Text && cell1Text !== '') {

      ifWinnerCalls();

    } else if (cell2Text === cell5Text && cell2Text === cell8Text && cell2Text !== '') {

      ifWinnerCalls();

    } else if (cell3Text === cell6Text && cell3Text === cell9Text && cell3Text !== '') {

      ifWinnerCalls();

    } else if (cell1Text === cell5Text && cell1Text == cell9Text && cell1Text !== '') {

      ifWinnerCalls();

    } else if (cell3Text === cell5Text && cell3Text === cell7Text && cell3Text !== ''){

      ifWinnerCalls();

    }

    let boardHasRemainingSpaces = false;

    for (let i = 1; i <= 9; i++) {
      if ($(`#${i}`).text() === '') {
        boardHasRemainingSpaces = true;
      }
    }

    if (boardHasRemainingSpaces === false && gameOver === false) {

      gameOver = true;
      $('#cats-game').removeClass('invisible');
      $('#cats-game').addClass('cats-game-over');
      $('#play-again').removeClass('invisible');
      gameOver = true;
      $('.play-again').on('click',clearBoard);

    }

  }

  //a function to hold every code block that needs to be executed if there is a winner
  const ifWinnerCalls = function () {

    // set gameOver variable to true to  stop ongoing play / clicking on the board once there is a winner.
    gameOver = true;

    //remove the cursor symbol from view (until board is cleared)
    $('#cursor-symbol').addClass('invisible');

    //show the winner banner
    $('#winner-banner').addClass('banner-over');

    //show the play again button
    $('#play-again').removeClass('invisible');

    //see if the player's symbol matches the text in the currentPlayerSymbol variable at the time of winning - if they match, then that player won.
    if($('#player1-symbol-display').text() === currentPlayerSymbol) {
      $('.name-winner').text('Player 1') //add text to the name winner span displayed on banner
      $('#player1-score').text(player1Score += 1); // display player's new score
    } else if ($('#player2-symbol-display').text() === currentPlayerSymbol) {
      $('.name-winner').text('Player 2');
      $('#player2-score').text(player2Score += 1);
    }

    //once the play again button is clicked, clear the board
    $('.play-again').on('click',clearBoard);

  }

  //function to clear the board in the event of a win or a draw
  const clearBoard = function () {

    // Loop to remove the text in each table cell
    for( let i = 1; i <= 9; i++) {
      $(`#${i}`).text('');
    }

    //re-set the gameOver variable to false so that game play can start (NB on click event for each table cell in main playGame function can only run if gameOver is false)
    gameOver = false;

    //if there was a winner, remove the winner banner from view
    $('#winner-banner').removeClass('banner-over');
    $('#winner-banner').addClass('invisible');

    //if it was a draw, remove the cats game nbanner from view.
    $('#cats-game').removeClass('cats-game-over');
    $('#cats-game').addClass('invisible');

    //remove the play again button from view because clicking it is what calls this clearBoard function so we don't need it until the game ends again (set in the ifWinnerCalls function)
    $('#play-again').addClass('invisible');

    //show the cursor symbol again so you can see who starts the next game.
    $('#cursor-symbol').removeClass('invisible');

  }

  //main function - called to initialise game
  const playGame = function () {

    //call assign symbol function to set player symbols once either button is clicked
    $('#x-button').on('click', assignSymbol);
    $('#o-button').on('click', assignSymbol);


    //attach event listener to each cell
    for( let i = 1; i <= 9; i++) {

      //anonymous function run on each click of a cell - only runs if the cell is empty and the game isn't over yet (gameOver variable === false)
      $(`#${i}`).on('click', function (){

        if($(this).text() === '' && !gameOver) {

          // change text in chosen / clicked cell to whatever is in currentPlayerSymbol global variable
          $(this).text(currentPlayerSymbol);

          //check if there is a winner as a result of that click
          checkWinner();

          //change symbol once clicked to other player
          switchPlayer();
        }
      });

    }
  }

  playGame();


}); //end of document.ready
