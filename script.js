const displayOne = document.querySelector('.display-1')
const displayTwo = document.querySelector('.display-2')
const allkeys = document.querySelector('.all-btns')

let lastKeyPressed = ''
let operatorKey = ''
let firstKey = ''
let secondKey = ''
let newCalculate = ''
let stopBackSpace = ''
let numberEntered = ''

allkeys.addEventListener('click', (e) => {

    if (!e.target.closest('button')) return
    const key = e.target

    if (key.dataset.type == 'number') {

        displayOne.classList.remove('size-small')

        if (lastKeyPressed == 'operator') {
            displayOne.innerText = ''
            secondKey = key.innerText
            displayOne.innerText = secondKey
            lastKeyPressed = 'number'
        }
        else if (lastKeyPressed == 'backspace') {
            if (stopBackSpace == true) {
                numberEntered = true
                displayOne.innerText = ''
                displayOne.innerText += key.innerText
                firstKey = displayOne.innerText                
            } else {
                displayOne.innerText += key.innerText
            }
        }
        else if (lastKeyPressed == 'equal') {
            firstKey = ''
            firstKey = key.innerText
            displayOne.innerText = firstKey
            newCalculate = true
        }
        else {
            if ((displayOne.innerText).length > 14) {
                key.classList.add('pointer-none')
            } else {
                displayOne.classList.remove('size-32px')
                displayOne.innerText += key.innerText
            }

            if (secondKey) {
                if (secondKey.length > 14) {
                    key.classList.add('pointer-none')
                } else {
                    secondKey += key.innerText
                }
                displayOne.innerText = secondKey
            }

            if (newCalculate == true) {
                firstKey += key.innerText
                displayOne.innerText = firstKey
                let len1 = secondKey.length
                secondKey = secondKey.slice(0, len1 - 1)
            }
            if (stopBackSpace == true && numberEntered == true) {
                firstKey += key.innerText
                displayOne.innerText = firstKey
                let len2= secondKey.length
                secondKey = secondKey.slice(0, len2 - 1)
            }
        }
        key.classList.remove('pointer-none')

        lastKeyPressed = 'number'
    }

    if ((displayOne.innerText).length > 12) {
        displayOne.classList.add('size-32px')
    } else {
        displayOne.classList.remove('size-32px')
    }

    if (key.dataset.type == 'operator') {
        displayTwo.innerText = displayOne.innerText + ' ' + key.innerText
        operatorKey = key.innerText
        firstKey = displayOne.innerText
        lastKeyPressed = 'operator'
    }

    if (key.dataset.value == 'equal') {
        let firstNumber = Number(firstKey)
        let secondNumber = Number(displayOne.innerText)
        let finalResult = calculation(firstNumber, operatorKey, secondNumber)

        if (lastKeyPressed == 'equal' || lastKeyPressed == 'backspace') {
            firstNumber = Number(displayOne.innerText)
            secondNumber = Number(secondKey)
            finalResult = calculation(firstNumber, operatorKey, secondNumber)
        }
        if (newCalculate == true) {
            firstNumber = Number(firstKey)
            secondNumber = Number(secondKey)
            finalResult = calculation(firstNumber, operatorKey, secondNumber)
            newCalculate = false
        }
        if (stopBackSpace == true && numberEntered == true) {
            firstNumber = Number(firstKey)
            secondNumber = Number(secondKey)
            finalResult = calculation(firstNumber, operatorKey, secondNumber)
            stopBackSpace = false
        }
        if (typeof finalResult == 'string') {
            displayOne.classList.add('size-small')
            displayOne.innerText = finalResult
        } else {
            displayOne.innerText = parseFloat(finalResult)
        }

        if ((displayOne.innerText).length > 12) {
            displayOne.classList.add('size-small')
            displayTwo.style.fontSize = '12px'
        } else {
            displayOne.classList.remove('size-small')
            displayTwo.style.fontSize = '16px'
        }
        if (displayOne.innerText == 'Infinity') displayTwo.style.fontSize = '12px'

        displayTwo.innerText = `${firstNumber} ${operatorKey} ${secondNumber} =`

        lastKeyPressed = 'equal'
    }

    if (key.dataset.value == 'clear') {
        displayOne.innerText = ''
        displayTwo.innerText = ''
        firstKey = 0
        secondKey = 0
        lastKeyPressed = 'clear'
    }

    if (key.dataset.value == 'backspace') {
        if (lastKeyPressed == 'equal') {
            displayTwo.innerText = ''
            stopBackSpace = true
            debugger
        }
        else if (lastKeyPressed == 'operator') {
            console.log('no-action')
        } else if (stopBackSpace == true && lastKeyPressed == 'backspace') {
            console.log('no-backspace')
        }
        else {
            const firstNumberInArray = (displayOne.innerText).split('')
            firstNumberInArray.pop()
            displayOne.innerText = firstNumberInArray.join('')
        }
        lastKeyPressed = 'backspace'
    }

    if (key.dataset.value == 'negate') {
        displayOne.innerText = -(Number(displayOne.innerText))
        lastKeyPressed = 'negate'
    }
})

function calculation(firstNumber, operator, secondNumber) {
    let result = ''
    if (operator == '+') result = firstNumber + secondNumber
    if (operator == '-') result = firstNumber - secondNumber
    if (operator == '×') result = firstNumber * secondNumber
    if (operator == '%') result = (firstNumber / 100) * secondNumber

    if (operator == '÷') {
        if (secondNumber === 0) {
            result = 'Cannot divide by zero'
        } else {
            result = firstNumber / secondNumber
        }
    }
    return result
}
