const openCloseButton = document.querySelector('.open-close-button')
const bankForm = document.querySelector('.add-bank-form')
let isBankFormOpened = true

document.querySelector('body').addEventListener('click', function(ev){
    if(ev.target.closest('.open-close-button')){
        if(!isBankFormOpened){
            isBankFormOpened = true
            let currentValue = 70
            let close = setInterval(()=>{
            bankForm.style.height = `${currentValue}px`
            currentValue+=10
            if(currentValue==300){clearInterval(close)}
            }, 10)
            openCloseButton.classList.remove('rotate')
            ev.stopPropagation()
        }
        else{
            isBankFormOpened = false
            let currentValue = 300
            let close = setInterval(()=>{
            bankForm.style.height = `${currentValue}px`
            currentValue-=10
            if(currentValue==70){clearInterval(close)}
            }, 10)
            openCloseButton.classList.add('rotate')
            ev.stopPropagation()
        }
    }
    if(!ev.target.closest('.add-bank-form')){
        if(isBankFormOpened){
            isBankFormOpened = false
            let currentValue = 300
            let close = setInterval(()=>{
            bankForm.style.height = `${currentValue}px`
            currentValue-=10
            if(currentValue==70){clearInterval(close)}
            }, 10)
            openCloseButton.classList.add('rotate')
            ev.stopPropagation()
        }
    }
    
})