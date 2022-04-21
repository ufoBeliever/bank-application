update()

const openCloseButton = document.querySelector('.open-close-button-create')
const bankForm = document.querySelector('.add-bank-form')
let isBankFormOpened = false

document.querySelector('body').addEventListener("mousedown", function(ev){
    if(ev.target.closest('.open-close-button-create')){
        if(!isBankFormOpened){
            isBankFormOpened = true
            let currentValue = 70
            let close = setInterval(()=>{
            bankForm.style.height = `${currentValue}px`
            currentValue+=10
            if(currentValue==450){
                document.querySelector('.create-bank-main').style.display='block'
                window.scrollBy(0, 1000)
                clearInterval(close)
            }
            }, 1)
            openCloseButton.classList.remove('rotate')
            
        }
        else{
            isBankFormOpened = false
            let currentValue = 450
            let close = setInterval(()=>{
            bankForm.style.height = `${currentValue}px`
            currentValue-=10
            if(currentValue==70){clearInterval(close)}
            }, 1)
            openCloseButton.classList.add('rotate')
            document.querySelector('.create-bank-main').style.display='none'
        }
    }
    if(!ev.target.closest('.add-bank-form')){
        if(isBankFormOpened){
            isBankFormOpened = false
            let currentValue = 450
            let close = setInterval(()=>{
            bankForm.style.height = `${currentValue}px`
            currentValue-=10
            if(currentValue==70){
                document.querySelector('.create-bank-main').style.display='block'
                window.scrollBy(0, 1000)
                clearInterval(close)
            }
            }, 1)
            openCloseButton.classList.add('rotate')
            document.querySelector('.create-bank-main').style.display='none'
        }
    }
    
})

function update(){
    let insertValue = ""
    for(let key in localStorage){
        if(localStorage.getItem(key)!==null){
            let currentBankInfo = localStorage.getItem(key).split(',')
            let str = `<span>
            Bank name: ${currentBankInfo[0]}, 
            Interest rate: ${currentBankInfo[1]}, 
            Maximum loan: ${currentBankInfo[2]}, 
            Minimum down payment: ${currentBankInfo[3]}, 
            Loan term: ${currentBankInfo[4]}
            <span>`;

            let buttons = `
            <div class="bank-element-buttons-wrapper">
            <button class="bank-element-button learn-more">
                <img src="../img/learn-more-button.png" class="button-img">
            </button>
            
            <button class="bank-element-button edit">
                <img src="../img/edit-button.png" class="button-img">
            </button>

            <button class="bank-element-button delete">
                <img src="../img/delete-button.png" class="button-img">
            </button>
            </div>`
            insertValue+=`<li class="bank-element">${buttons}${str.slice(0, 70)+'...'}</li>`
        }
    }
    document.querySelector('.current-banks-list').innerHTML = insertValue
}

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
                el.value = ''
            }
        })
        localStorage.setItem(bankData[0], bankData)
        update()
    }
})

const learnMoreButton = document.querySelectorAll('.learn-more');
const editButton = document.querySelectorAll('.edit');
const removeButton = document.querySelectorAll('.delete');

const listItemsWrapper = document.querySelector('.current-banks-list')


listItemsWrapper.addEventListener('click', function(ev){
    if(ev.target.closest('.delete')){
        let targetString = ev
        .target
        .parentNode
        .parentNode
        .parentNode
        .lastChild
        .innerHTML
        .trim()
        .slice(11)
        
        let targetName = targetString.slice(0, targetString.indexOf(','))
        localStorage.removeItem(targetName)
        update()
    }
    if(ev.target.closest('.edit')){
        if(!isBankFormOpened){
            isBankFormOpened = true
            let currentValue = 70
            let close = setInterval(()=>{
            bankForm.style.height = `${currentValue}px`
            currentValue+=10
            if(currentValue==450){
                document.querySelector('.create-bank-main').style.display='block'
                window.scrollBy(0, 1000)
                clearInterval(close)
            }
            }, 1)
            openCloseButton.classList.remove('rotate')
        }

        let targetString = ev
        .target
        .parentNode
        .parentNode
        .parentNode
        .lastChild
        .innerHTML
        .trim()
        .slice(11)
        
        let targetName = targetString.slice(0, targetString.indexOf(','))

        document.querySelector('[placeholder="Bank name"]').value = targetName
    }

    if(ev.target.closest('.learn-more')){
        let targetString = ev
        .target
        .parentNode
        .parentNode
        .parentNode
        .lastChild
        .innerHTML
        .trim()
        .slice(11)
        
        let targetName = targetString.slice(0, targetString.indexOf(','))
        let valuesArr = localStorage.getItem(targetName).split(',')

        let modal = document.querySelector('.modal')
        modal.style.display = "block"
        document.querySelector('.modal-content').innerHTML = `
        <div class="modal-data">
            <button class="close-modal">
                X
            </button>
            <ul class="bank-info-wrapper">
                <li>Bank name: ${valuesArr[0]}</li>
                <li>Interest rate: ${valuesArr[1]}</li>
                <li>Maximum loan: ${valuesArr[2]}</li>
                <li>Minimum down payment: ${valuesArr[3]}</li>
                <li>Loan term: ${valuesArr[4]}</li>
            </ul>
        </div>`;

        document.querySelector('.close-modal').addEventListener('click', function(ev){
            modal.style.display = "none"
            document.querySelector('.modal-content').innerHTML = ""
        })
    }
})
