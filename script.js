document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();

    let input = document.querySelector('.searchInput').value
    
    if(input !== ''){
        showWarning('Procurando...')
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d06cdb298fafc83c520d5ab677fc477e&units=metric&lang=pt_br`
        
        let result = await fetch(url);
        let json = await result.json();

        if(json.cod === 200){
            showWarning('')
            document.querySelector('.aviso').style.display = 'none'
            document.querySelector('.resultado').style.display = 'block'
            document.querySelector('.titulo').innerHTML = `${json.name} - ${json.sys['country']}`;
            document.querySelector('.tempInfo').innerHTML = `${parseInt(json.main['temp'])}<sup>ºC</sup>`;
            document.querySelector('.imgTemp').setAttribute('src', `http://openweathermap.org/img/wn/${json.weather[0]['icon']}.png`)
            document.querySelector('.ventoInfo').innerHTML = `${json.wind['speed']}<span>km/h</span>`
            document.querySelector('.tempoInfoDescrip').innerHTML = `${json.weather[0]['description']}`
        }else{
            showWarning('Localização não encontrada')
        }
    }else{
        showWarning(`Nenhuma localização digitada! <br><br> Digite a localização que deseja e clique em 'Buscar' para realizar a pesquisa.`)
    }
})

function showWarning(msg){
    document.querySelector('.aviso').style.display = 'block'
    document.querySelector('.resultado').style.display = 'none'
    document.querySelector('.aviso').innerHTML = msg;
}




