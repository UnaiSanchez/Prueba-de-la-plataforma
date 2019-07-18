
function setup() {
    createCanvas(600, 400);
  }
  let timer = 0
function draw(){
    if(millis()-timer>1000){
        timer = millis()
        //drawBar('5d30391ac9af6a001746cdf7','#0fffff')
        drawGraph('5d30391ac9af6a001746cdf7','#0fffff')
        //drawBar('5d304d300c36f30017cfe944','#faab99')
        drawGraph('5d304d300c36f30017cfe944','#faab99')
        
    }
}
function drawBar(id,color){
    background(255)
    let y=0
    let x=0
    fetch('http://localhost:3001/get-data?id='+id).then(function(response){
        return response.json()
    })
    .then(function(data){
        //console.log(data)
        //fill(color)
        stroke(color)
        strokeWeight(1)
        data.forEach(function(element,index){
            //ellipse((600/data.length)*index,400-element.value,1,1)
            if(x<=600){
            y= 400-element.value
            x=(600/data.length)*(index)
            
            rect(x-(600/data.length)/2,y,(600/data.length),400-y);
            
            }
        })
    })
}
function drawGraph(id,color){
    background(255)
    let y1=0
    let y2=0
    let x1=0
    let x2=0
    fetch('http://localhost:3001/get-data?id='+id).then(function(response){
        return response.json()
    })
    .then(function(data){
        //console.log(data)
        stroke(color)
        strokeWeight(4)
        data.forEach(function(element,index){
            //ellipse((600/data.length)*index,400-element.value,1,1)
            if(x2<=600){
            y2= 400-element.value
            x1=(600/data.length)*(index-1)
            x2=(600/data.length)*(index)
            line(x1,y1,x2,y2);
            y1=y2
            }
        })
    })
}