Status="";
objects=[];
alarm = "";
function preload() {
alarm = loadSound("Alarm.exe.mp3");
}
function setup() {
    canvas = createCanvas(500,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide()

    obdt = ml5.objectDetector('cocossd', modload);
    document.getElementById("stat").innerHTML = "Status : Detecting Objects";
}

function modload() {
    console.log("Loaded");
    Status=true;
}
function gotit(error, results) {
    if(error) {
        console.log(error);
    }
 console.log(results);
    objects = results;
    
    
}

function draw() {
    image(video, 0,0,500,500);
    if(Status != "") {
        obdt.detect(video, gotit);
        for(i=0;i<objects.length;i++){
            if(objects.length = "person") {
                document.getElementById("stat").innerHTML = "Status : Baby Detected";
                alarm.stop();
                
            }
            else {
                alarm.play();
                document.getElementById("stat").innerHTML = "Status : Baby NOT Detected";
            }
            if(objects.length < 0) {
                alarm.play();
                document.getElementById("stat").innerHTML = "Status : Baby NOT Detected";
            }

            fill("blue");
            percentenator = floor(objects[i].confidence * 100);
            text(objects[i].label + percentenator + "%", objects[i].x, objects[i].y);
            noFill()
            stroke("blue");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function stopit() {
    alarm.stop()
}

