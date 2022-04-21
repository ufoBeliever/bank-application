const openCloseButton = document.querySelector('.open-close-button')
const bankForm = document.querySelector('.add-bank-form')
let isBankFormOpened = true

document.querySelector('body').addEventListener("mousedown", function(ev){
    if(ev.target.closest('.open-close-button')){
        if(!isBankFormOpened){
            ev.stopPropagation()
            isBankFormOpened = true
            let currentValue = 70
            let close = setInterval(()=>{
            bankForm.style.height = `${currentValue}px`
            currentValue+=10
            if(currentValue==450){clearInterval(close)}
            }, 5)
            openCloseButton.classList.remove('rotate')
        }
        else{
            ev.stopPropagation()
            isBankFormOpened = false
            let currentValue = 450
            let close = setInterval(()=>{
            bankForm.style.height = `${currentValue}px`
            currentValue-=10
            if(currentValue==70){clearInterval(close)}
            }, 5)
            openCloseButton.classList.add('rotate')
        }
    }
    if(!ev.target.closest('.add-bank-form')){
        if(isBankFormOpened){
            ev.stopPropagation()
            isBankFormOpened = false
            let currentValue = 450
            let close = setInterval(()=>{
            bankForm.style.height = `${currentValue}px`
            currentValue-=10
            if(currentValue==70){clearInterval(close)}
            }, 5)
            openCloseButton.classList.add('rotate')
        }
    }
    
})


document.getElementById('submit-button').addEventListener('click', function(ev){
    ev.preventDefault()
    let bankData = []
    let isFormValid = true
    Array.from(document.querySelectorAll('input:invalid')).forEach((el)=>{
        isFormValid = false
    })
    if(isFormValid){
        Array.from(document.querySelectorAll('input:valid')).forEach((el)=>{
            if(el.value!='Ok' && el.value!='Reset'){
                bankData.push(el.value)
            }
        })
        localStorage.setItem(bankData[0], bankData)
    }
})