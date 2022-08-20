document.getElementById("custom-array").addEventListener("click", function(){
    document.querySelector(".bg-modal").style.display="flex";
})

document.querySelector(".close").addEventListener("click",function(){
    document.querySelector(".bg-modal").style.display = "none";
})


const array_size=document.getElementById("size-array");
const run_algo=document.getElementById("run-button"); // run algorithm button.
const space=document.getElementById("array-space");
const skip=document.getElementById("skip-button");
const selected_algo=document.getElementById("algo");
const req_speed=document.getElementById("speed");

const Asize=document.getElementById("Asize");
const Aspeed=document.getElementById("Aspeed");

// DOM things for Bootsrap modal (Pop-up for custom array).
const modal_save = document.getElementById("modal-save");
const modal_text = document.getElementById("modal-text");
const modal_size = document.getElementById("modal-size");
const text_error_text = document.getElementById("text-error");
const size_error_text = document.getElementById("size-error");
const custom_array_btn = document.getElementById("custom-array");


const bar_len=[]; // array elements height.
const bar_div=[]; // corresponding div.
const setting=[array_size, run_algo, selected_algo, req_speed, custom_array_btn];
var total_size=array_size.value;  // array size.
var delay=10; // required speed .
var totdelay=0; //total current delay required to animate a div element(bar). 
var cleartimeout; //skip button functionality

array_size.addEventListener("input",generate_new_array);
req_speed.addEventListener("input",change_speed);
run_algo.addEventListener("click",runalgo);
window.onload=generate_new_array;

modal_save.addEventListener("click",generate_new_array);

modal_save.onclick = function(){
    space.style.display="flex";
}

function generate_new_array(){
    console.log("in the geneate array function");
    let custom_size = modal_size.value;
    array_size.value=custom_size;
    
    let str = modal_text.value;
    let temp = str.split(" ");

    let array = [];
    for(let i=0;i<temp.length;i++)array.push(temp[i]);
    custom_array=array;
   
    space.innerHTML="";
    total_size=array_size.value;
    Asize.innerHTML="Size ("+total_size+")";
    // if(!is_valid) custom_array_btn.innerHTML="<i class=\"fa fa-pencil\" aria-hidden=\"true\"></i> Custom";
    // if(!is_valid) custom_array_btn.className="btn btn-outline-primary my-2 my-sm-1"
    //('.alert').alert('close');
    change_speed();
    for(let i=0;i<total_size;i++){
       //if(is_valid)
        bar_len[i]=custom_array[i];
       // else bar_len[i] = Math.floor(Math.random()*560+20);
       bar_div[i] = document.createElement("div");
       space.appendChild(bar_div[i]);
       apply_style(bar_div[i],"skyblue",bar_len[i]);
    }
}

function change_speed(){
    Aspeed.innerHTML="Animation (" + Math.pow(2,parseInt(req_speed.value)) + "X)";
    delay=20000/(total_size*Math.pow(2,parseInt(req_speed.value)));
}

function update_bar (element,color,height) {
    cleartimeout=setTimeout(()=>{
       if(total_size<=20)element.innerHTML= "<small >"+ height + "</small>";
    element.style=" margin : 0.8px; " + "background-color:" + color + ";"+ "width: 100%;" + "height: " + height + "px; text-align: center;border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;";
    },totdelay+=delay);
}
 
 // style=color: black; text-align: center; text-overflow: ellipsis;
 // changes the color or height of the div element.
function apply_style(element,color,height) {
    if(total_size<=20)element.innerHTML= "<small >"+ height + "</small>";
    element.style=" margin : 1px; " + "background-color:" + color + ";"+ "width: 80%;" + "height: " + height + "px; text-align: center;border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;";
}

function swap(id1, id2, col1, col2){
    update_bar(bar_div[id1],"red",bar_len[id1]);
    update_bar(bar_div[id2],"red",bar_len[id2]);
    [bar_len[id1], bar_len[id2]] = [bar_len[id2], bar_len[id1]];
    update_bar(bar_div[id1],col1,bar_len[id1]);
    if(id1!=id2) update_bar(bar_div[id2],col2,bar_len[id2]);
}

function runalgo(){
    totdelay=0;
    // disable();
    Merge();
    // enable();
 }
