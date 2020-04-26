var round = 1
var root = document.documentElement;
var color = Math.floor(Math.random()*360)

function startOver() {
  if(round < 9) {
    round++  
    document.querySelector('#level').innerHTML = round - 1
    document.querySelector('#dim').innerHTML = round + "x" + round
  }    
  root.style.setProperty('--gameWidth', (round*0.1))
  if(round != 2) {
    color = color + 45  
  }  
  var s = 100
  var bc = round*round
  var change = s/bc
  var build = setInterval(blocks,10) 
  var clicks = 0
  
  function blocks() {
    var div = document.createElement('span')
    div.className = "block"
    div.style.background = "hsl("+color+"deg,100%,"+s+"%)"
    div.setAttribute("data-color",div.style.background)
    s = s - change  
    // color = color - 10
    document.querySelector('#game').appendChild(div)
    
    if(document.querySelectorAll('.block').length == bc) {
      clearInterval(build,10)    
      setTimeout(function(){
        document.querySelector('#game').addEventListener('click', timeThis)
        
        var b = document.querySelectorAll('.block') 
        for(var i=0;i<b.length;i++){
          var rb = b[Math.floor(Math.random()*b.length)] //Math.floor(Math.random()*b.length)
          var c = b[i].style.background
          var cc = rb.style.background
          b[i].style.background = cc
          rb.style.background = c        
          
        b[i].addEventListener('click',function(e){
          if(!document.querySelector('.clicked')) {
            if(this.classList.contains('match')) {

            } else {
              this.classList.add('clicked')               
            }             
          } else { 
            if(this.classList.contains('match')) {
              
            } else {
              clicks++
              document.querySelector('#clicks').innerHTML = clicks
              var c = document.querySelector('.clicked').style.background
              var cc = this.style.background
              document.querySelector('.clicked').style.background = cc
              this.style.background = c
              document.querySelector('.clicked').classList.remove('clicked')
              
              b.forEach(function(e){
                if(e.getAttribute('data-color') == e.style.background) {
                  e.classList.add('match')
                }  
              })
    
              if(document.querySelectorAll('.match').length == bc) {
                records()
                setTimeout(function(){
                  if(round != 9){
                    document.querySelector('#game').innerHTML = ""
                    document.querySelector('#level').innerHTML = 1
                    document.querySelector('#dim').innerHTML = "2x2"
                    document.querySelector('#clicks').innerHTML = 0
                    document.querySelector('#time').innerHTML = 0
                    startOver()    
                  } else {
                    
                  }                 
                },2000)               
              } 
            }              
          }    
        })
        }        
      },3000)         
    }  
  } 
} 

function timeThis() {
  var startTime = Date.now();
  bc = round*round
  console.log(bc)
  function timer() {      
    var elapsedTime = Date.now() - startTime;
    document.getElementById("time").innerHTML = (elapsedTime / 1000).toFixed(1);

    if(document.querySelector('.match')) {
      if(document.querySelectorAll('.match').length == bc) {
        clearInterval(timery)
      }
    }
  }
  var timery = setInterval(timer)  
  document.querySelector('#game').removeEventListener('click', timeThis)
}

function records() {
  var cln = document.getElementById('stat-box').cloneNode(true)
  document.getElementById('rec'+round).classList.add('recOn')
  document.getElementById('rec'+round).appendChild(cln)
}

startOver()