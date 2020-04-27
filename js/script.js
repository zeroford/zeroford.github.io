var round = 1
var color = Math.floor(Math.random()*360)
var clicks = 0
var color = Math.floor(Math.random()*360)
var blockItem

function startOver() {
  if (round < 9) {
    round = round + 1
    document.querySelector('#level').innerHTML = round - 1
    document.querySelector('#dim').innerHTML = `${round}x${round}`
    clicks = 0
  }    
  document.documentElement.style.setProperty('--gameWidth', (round*0.1))
  
  if (round != 2) {
    color = color + 45  
  }  

  var max = 100
  var change = max / Math.pow(round,2)
  var build = setInterval(blocks) 
  
  function blocks() {
    var div = document.createElement('span')
    div.className = "block"
    div.style.background = `hsl(${color}deg,100%,${max}%)`
    div.setAttribute("data-color", div.style.background)
    max = max - change
    document.querySelector('#game').appendChild(div)
    
    if (document.querySelectorAll('.block').length == Math.pow(round,2)) {
      clearInterval(build)
      setTimeout(function(){
        document.querySelector('#game').addEventListener('click', timeThis)
        blockItem = document.querySelectorAll('.block') 
        for(var i = 0; i < blockItem.length; i++){
          var randomNo = Math.floor(Math.random() * blockItem.length)
          var randomBlock = blockItem[randomNo]
          var temp = blockItem[i].style.background
          blockItem[i].style.background = randomBlock.style.background 
          randomBlock.style.background = temp
          blockItem[i].addEventListener('click', detectClick)
        }        
      },3000)         
    }  
  } 
} 

function detectClick() {
  if(!document.querySelector('.clicked')) {
    if (this.classList.contains('match')) {

    } else {
      this.classList.add('clicked')
    }                    
  } else { 
    if(this.classList.contains('match')) {
      
    } else {
      clicks++
      document.querySelector('#clicks').innerHTML = clicks
      var temp = document.querySelector('.clicked').style.background
      document.querySelector('.clicked').style.background = this.style.background
      this.style.background = temp
      document.querySelector('.clicked').classList.remove('clicked')
      
      blockItem.forEach(block => {
        if(block.getAttribute('data-color') == block.style.background) {
          block.classList.add('match')
        }  
      })

      if(document.querySelectorAll('.match').length == Math.pow(round, 2)) {
        records()
        setTimeout(function(){
          if(round != 9){
            document.querySelector('#game').innerHTML = ""
            document.querySelector('#level').innerHTML = 1
            document.querySelector('#dim').innerHTML = "2x2"
            document.querySelector('#clicks').innerHTML = 0
            document.querySelector('#time').innerHTML = 0
            startOver()    
          }                
        },2000) 
      } 
    }              
  }    
}

function timeThis() {
  var startTime = Date.now();
  function timer() {      
    var elapsedTime = Date.now() - startTime;
    document.getElementById("time").innerHTML = (elapsedTime / 1000).toFixed(1)

    if(document.querySelector('.match') 
        && document.querySelectorAll('.match').length == Math.pow(round,2)) {
      clearInterval(timery)
    }
  }
  var timery = setInterval(timer)  
  document.querySelector('#game').removeEventListener('click', timeThis)
}

function records() {
  var copyStat = document.getElementById('stat-box').cloneNode(true)
  document.getElementById(`rec${round}`).classList.add('show')
  document.getElementById(`rec${round}`).appendChild(copyStat)
}

startOver()