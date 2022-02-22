var img="";
status1="";
objects= [];


function setup(){
canvas=createCanvas(350,350);
canvas.center();
video=createCapture(VIDEO);
video.hide();
objectDetector=ml5.objectDetector("cocossd",modelLoaded);
document.getElementById("status").innerHTML="Status: Detecting objects";


}

function preload(){
img=loadImage("dog_cat.jpg");

}

function draw(){
image(video,0,0,350,350);
if(status1 !=""){
   r=random(255);
   g=random(255);
   b=random(255);
   objectDetector.detect(video,gotResult);
    for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML="status: objectsdetected";
        document.getElementById("number_of_objects").innerHTML="Number of objects detected are:"+objects.length; 
        fill(r,g,b);
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }

}



}

function modelLoaded(){
    console.log("Modelloaded");
   status1=true;
 objectDetector.detect(video,gotResult);
}

function gotResult(error,results){
if(error){
    console.log(error);
    }
    else{
        console.log(results);
        objects=results
    }
   


}