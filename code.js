// // To run this assignment, right click on index.html in the Visual Studio Code file explorer to the left
// // and select "Open with Live Server"

// // YOUR CODE HERE!
let body = document.querySelector('body')

let start = document.querySelector("#start")
let question = document.querySelector("#question")
let answerB = document.createElement('button')
answerB.innerText = "Answer"
answerB.classList.add('answerB')

let input = document.querySelector('#answer')
let categoryID = document.createElement("div")
let pointsDiv = document.createElement("div")
let questionB = document.createElement('button')
let gameDiv = document.querySelector('#game')
body.append(gameDiv)

let inputBox = document.createElement('input')
inputBox.type = "text"
inputBox.placeholder = 'answer'

let i = 0
let points = 0
let correctIncorrectDiv = document.createElement('div')
correctIncorrectDiv.classList.add("correctIncorrect")
let newGameB = document.createElement('button')
newGameB.classList.add('newGameB')




start.addEventListener('click', () => fetch('https://jservice.io/api/random/')
    .then(response => response.json())
    .then(element => {

        console.log(element[0].category.title)
        console.log(element)
        categoryID.innerText = `Category:  
                    ${element[0].category.title}`
        categoryID.classList.add('categoryID')
        start.style.display = "none"
        gameDiv.append(categoryID)

        fetch(`https://jservice.io/api/category?id=${element[0].category_id}`)  //https://jservice.io/api/clues/?category=${element[0].category_id}
            .then(response => response.json())
            .then(element => {

                let copy = element.clues.slice(0)   //copying array to manipulate
                for (let i = copy.length - 1; i > 0; i--) {   //shuffling method 
                    let j = Math.floor(Math.random() * (i + 1))
                    let temp = copy[i]
                    copy[i] = copy[j]
                    copy[j] = temp
                }

                gameDiv.append(questionB)
                questionB.innerText = "Show Question"
                questionB.classList.add("showQuestion")


                console.log(copy)

                questionB.addEventListener('click', () => {

                    if (i < copy.length) {
                        questionB.innerText = "Next Question"
                        questionDiv.innerText = copy[i].question
                        gameDiv.append(questionDiv)
                        gameDiv.append(inputBox)
                        gameDiv.append(answerB)
                        gameDiv.append(pointsDiv)
                        correctIncorrectDiv.innerText = ''
                        inputBox.value = ''
                        i++
                    }
                    else {
                        questionDiv.innerText = "No more question in this category, well done you are a genius"
                        gameDiv.append(questionDiv)
                        gameDiv.append(inputBox)
                        gameDiv.append(answerB)
                    }

                })



                answerB.addEventListener('click', () => {
                    let input = inputBox.value.toLowerCase()
                    if (input === copy[i - 1].answer.toLowerCase()) {
                        correctIncorrectDiv.innerText = "CORRECT!!!"
                        points++
                        pointsDiv.innerText = `YOU HAVE: ${points} POINTS`
                        gameDiv.append(correctIncorrectDiv)

                        pointsDiv.classList.add("points")


                    }

                    else {
                        correctIncorrectDiv.innerText = "INCORRECT YOU LOOSE"
                        correctIncorrectDiv.append(newGameB)
                        newGameB.innerText = "NEW GAME"
                        points = 0
                        pointsDiv.innerText = `YOU HAVE: ${points} POINTS`

                        newGameB.addEventListener('click', () => window.location.reload())
                        gameDiv.append(correctIncorrectDiv)

                    }

                })


            })
    }))

function random(number) {
    return Math.floor(Math.random() * number)
}








