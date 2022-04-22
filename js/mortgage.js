updateSelect()

document.querySelector('.mortgage-form').addEventListener('submit', (ev)=>{
    ev.preventDefault()
})

function updateSelect(){
    let newContent = ''
    for(let key in localStorage) {
        if (!localStorage.hasOwnProperty(key)) {
          continue; 
        }
        newContent+=`<option>${key}</option>`
    }
    document.querySelector('select').innerHTML=newContent
}

function checkValidData(obj){
    if(obj.initLoan == "" || obj.downPayment == ""){
        return 'You should fill all fields'
    }

    let bankData = localStorage.getItem(obj.bankName).split(',')
    if(+obj.initLoan>+bankData[2]){
        return `Invalid data: This bank's maximum loan is ${bankData[2]}`
    }
    if((+obj.initLoan)*(+bankData[3])!==100*obj.downPayment){
        return `Invalid data: ${bankData[3]}% from ${obj.initLoan} doesn't equal ${obj.downPayment}`
    }
}

function setResult(str1, isError, monthAmount){
    if(!isError){
        let string = str1+""
        let innerValue = `Monthly payment: ${string.slice(0, string.indexOf('.')+3)} 
        for ${monthAmount} month`
        document.querySelector('.result-input').innerHTML = innerValue
    }
    else{
        let innerValue = `${str1}`
        document.querySelector('.result-input').innerHTML = innerValue
    }
}

document.querySelector('#form-submit-button').addEventListener('click', (ev)=>{
    let inputValues = {}
    

    let inputs = Array.from(document.querySelectorAll('.text-input'))
    inputValues.initLoan = inputs[0].value
    inputValues.downPayment = inputs[1].value
    inputValues.bankName = document.querySelector('select').value
    let bankData = localStorage.getItem(inputValues.bankName).split(',')

    if(!Boolean(checkValidData(inputValues))){
        let P = +inputValues.initLoan;
        let r = +bankData[1]
        let n = +bankData[4]

        let M = (P*(r/12)*Math.pow((1+r/12), n))/(Math.pow((1+r/12), n)-1)
        setResult(M, false, bankData[4])
    }
    else{
        setResult(checkValidData(inputValues), true)
    }
})