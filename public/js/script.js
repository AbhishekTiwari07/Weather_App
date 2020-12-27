const fetchForecast = (location)=>{
    fetch('http://localhost:3000/weather?address='+location).then((res) => {
        res.json().then((data) => {
            if (data.error)
                display_1.textContent = data.error
            else {
                temp = "Temperature is : "+data.temp
                humidity = "Humidity is : "+data.humidity
                display_1.textContent = humidity
                display_2.textContent = temp
            }
        })
    })
}

const place = document.getElementById('place')
const form = document.querySelector('form')
const display_1 = document.getElementById('display_1')
const display_2 = document.getElementById('display_2')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = place.value
    display_1.textContent = ""
    display_2.textContent = ""
    fetchForecast(location)
})
