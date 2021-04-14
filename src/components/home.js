import React, { useState, useEffect } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit'
import './home.css'
const images = require.context('../images', true)

var indexAnswer
var correctAnswer = Math.floor(Math.random() * (2 - 0) + 0.5)
const words = [ 'Avião', 'Aranha', 'Balão', 'Boneca',
                'Boca', 'Colher', 'Cola', 'Cavalo', 
                'Coelho', 'Cama', 'Dedo', 'Laranja',
                'Flor', 'Gota', 'Galo', 'Jacaré',
                'Lua', 'Macaco', 'Menino', 'Menina',
                'Navio', 'Porta', 'Pipa', 'Rosa',
                'Sorvete', 'Sol', 'Sal',
                'Urso', 'Vaca', 'Vela', 'Dado',
                'Estrela', 'Torta', 'Zebra', 'Chapéu',
                'Bola', 'Banana', 'Bule', 'Escada']

const Home = () => {
  const { speak } = useSpeechSynthesis()
  const [KeyWordGenerate, setKeyWordGenerate] = useState([0, 1, 2])
  var [Count, setCount] = useState(0)
  
  useEffect(() => {
    setKeyWordGenerate(generatekey())
  }, [])
  
  function verifyCorrectAnswer() {
    if(indexAnswer === correctAnswer){
      setCount(1+Count)
      console.log('Resposta certa');
    }
    else{
      setCount(Count)
      console.log('Resposta errada');
    }
  }
  
  const changeBackgroundColor = (index) => {
    let selected = document.querySelectorAll('.item')
    indexAnswer = index
    for (let i = 0; i < 3; i++) {
      (i === index) ? selected[index].style = 'background-color: #f3d3bd' : selected[i].style = ''
    }
  }
  
  const generatekey = () => {
    verifyCorrectAnswer()
    var keyGenerate = []
    correctAnswer = Math.floor(Math.random() * (2 - 0) + 0.5)
    for(let i = 0; i < 3; i++){
      keyGenerate.push(Math.floor(Math.random() * 36))
    }
    return keyGenerate
  }

  const itemSelected = (text, index) => {
    speak({ text })
    changeBackgroundColor(index)
  }
  return (
    <div>
      <nav>
        <h1>Auxílio Alfabetização</h1>
      </nav>
      <div className='options'>
        <div className='option'>
          <div className='item' onClick={() => itemSelected(words[KeyWordGenerate[0]], 0)}><img src={images('./' + words[KeyWordGenerate[0]].toLocaleLowerCase() + '.png').default} alt="" /></div>
          <div className='item' onClick={() => itemSelected(words[KeyWordGenerate[1]], 1)}><img src={images('./' + words[KeyWordGenerate[1]].toLocaleLowerCase() + '.png').default} alt="" /></div>
          <div className='item' onClick={() => itemSelected(words[KeyWordGenerate[2]], 2)}><img src={images('./' + words[KeyWordGenerate[2]].toLocaleLowerCase() + '.png').default} alt="" /></div>
        </div>
        <div className='readText'>
          <span>{words[KeyWordGenerate[correctAnswer]]}</span>
          <button id='confirm' onClick={() => setKeyWordGenerate(generatekey)}>Confirmar</button>
        </div>
      </div>

      <div className='score'><h1>{Count}</h1></div>
    </div>
  )
}

export default Home