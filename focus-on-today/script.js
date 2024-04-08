const checkBoxList = document.querySelectorAll('.check-box')
const goalInputs = document.querySelectorAll('.goal-input')
const errorMsg = document.querySelector('.error-label')
const progressBar = document.querySelector('.progress-bar')
const progressBarValue = document.querySelector('.progress-value')

checkBoxList.forEach((checkBox)=>{
    checkBox.addEventListener('click',(e)=>{
        const allFieldsFilled = [...goalInputs].every((input)=>{
            return input.value
        })

        if(allFieldsFilled){
            checkBox.parentElement.classList.toggle('completed')
            progressBarValue.style.width = '33.33%'
        }
        else{
            progressBar.classList.add('show-error')
        }
    })
})

goalInputs.forEach((input)=>{
    input.addEventListener('focus', ()=>{
        progressBar.classList.remove('show-error')
    })
})