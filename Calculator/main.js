class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
    }
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')){return}
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation) {
        if(this.currentOperand === ''){return}
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute() {
        let computation
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(previous) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = previous + current 
                break
            case '-':
                computation = previous - current 
                break  
            case '*':
                computation = previous * current 
                break 
            case '÷':
                computation = previous / current 
                break
            default:
                return      
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    updateDislpay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
    
}

const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const allClearButton = document.querySelector("[data-all-clear]")
const previousOperandTextElement = document.querySelector("[data-previous-operand]")
const currentOperandTextElement = document.querySelector("[data-current-operand]")

const calculator = new Calculator (previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDislpay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDislpay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDislpay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDislpay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDislpay()
})