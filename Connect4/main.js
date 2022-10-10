let playerRed = "R"
let playerYellow = "Y"
let currentPlayer = playerRed

let gameOver = false
let board
let currentColumns

let rows = 6
let columns = 7

const closeButton = document.getElementById('close-button')
const playButton = document.getElementById('play-button')
const refreshButton = document.getElementById('refresh-button')
const message = document.getElementById('message')
const game = document.getElementById('main-div')

const setGame = () => {
    board = []
    currentColumns = [5, 5, 5, 5, 5, 5, 5]
    for (let r = 0; r < rows; r++) {
        let row = []
        for (let c = 0; c < columns; c++) {
            row.push(' ')
            let tile = document.createElement("div")
            tile.id = r.toString() + "-" + c.toString()
            tile.classList.add("tile")
            tile.addEventListener("click", setCoin)
            document.getElementById("board").append(tile)
        }
        board.push(row)
    }
}

/*In short, with arrow functions there are no binding of this. 
1. In regular functions the this keyword represented the object that called the function, 
which could be the window, the document, a button or whatever. 
2. With arrow functions the this keyword always represents the object that defined the arrow function.
*/

function setCoin  () {
    if(gameOver) {
        return
    }

    let coordinations = this.id.split("-")
    let r = parseInt(coordinations[0])
    let c = parseInt(coordinations[1])

    r = currentColumns[c]
    if( r < 0 ){
        return
    }

    board[r][c] = currentPlayer
    let tile = document.getElementById(r.toString() + "-" + c.toString())
    if (currentPlayer == playerRed) {
        tile.classList.add("red-coin")
        message.textContent = "Yellow player's turn"
        currentPlayer = playerYellow
    }
    else {
        tile.classList.add("yellow-coin")
        message.textContent = "Red player's turn"
        currentPlayer = playerRed
    }
    currentColumns[c] -= 1 
    checkWinner()
}

const checkWinner = () => {

    // Horizontally
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if(board[r][c] != ' '){
                if(board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]){
                    displayWinner(r, c)
                    return
                }
            }
        }
    }

    //Vertically
    for (let r = 0; r < rows -3; r++) {
        for (let c = 0; c < columns; c++) {
            if(board[r][c] != ' '){
                if(board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]){
                    displayWinner(r, c)
                    return
                }
            }
        }
    }

    // Diagonally-down
    for (let r = 0; r < rows -3; r++) {
        for (let c = 0; c < columns -3; c++) {
            if(board[r][c] != ' '){
                if(board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]){
                    displayWinner(r, c)
                    return
                }
            }
        }
    }

    //Diagonally-up
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if(board[r][c] != ' '){
                if(board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]){
                    displayWinner(r, c)
                    return
                }
            }
        }
    }
}



const displayWinner = (r, c) => {
    const winner = document.getElementById("winner")
    if(board[r][c] == playerRed){
    winner.textContent = 'Red Wins!'
    }
    else {
    winner.textContent = 'Yellow Wins!'
    }
    message.textContent = ''
    winner.style.display = 'block'
    gameOver = true
}

const displayGame = () => {
    setGame()
    message.textContent = "Player Red plays first"
    playButton.style.display = 'none'
}

const reloadGame = () => {
    window.location.reload()
}

const goodbyePage = () => {
    game.style.display = 'none'
    message.textContent = "Thank's for playing! 😊"
    refreshButton.id = 'after-closing'
    message.append(refreshButton)
}

playButton.addEventListener('click', displayGame)
refreshButton.addEventListener('click', reloadGame)
closeButton.addEventListener('click', goodbyePage)