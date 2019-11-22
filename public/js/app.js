const weatherform=document.querySelector('form')
const search =document.querySelector('input')
const firstmessage=document.querySelector('#message1')
const secondmessage=document.querySelector('#message2')
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location= search.value
    
    fetch("/weather?address="+location).then((response)=>{
        
    response.json().then((data={})=>{
        if (data.error){firstmessage.textContent=data.error
            secondmessage.textContent=''
}
        else{
            firstmessage.textContent=data.location
            secondmessage.textContent=data.forecast
        }
    })
})
})
