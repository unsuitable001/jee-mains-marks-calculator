var marks = 0;
var grace = "41652914708 41652914724 41652914742 41652914798 41652914814 41652914832 41652913084 41652913174 41652914360 41652914450"
var rdc = document.getElementById('respdoc');
var adc = document.getElementById('ansdoc');
var reswindow = document.getElementById('marks')
function startParse(){
    el = document.getElementById("htmresponse");
    //console.log(el.value);
    rdc.contentWindow.document.write(el.value);
    reswindow.innerHTML = "Calculating Marks.... This may take upto 5-10 secs"
    setTimeout(calculate, 5000);
}


var filesInput = document.getElementById("response");
filesInput.addEventListener("change", function (event) {
    var files = event.target.files;
    var file = files[0];
    try{
        var reader = new FileReader();
    }
    catch{
        alert("Your Browser Doesn't support the File Reader API. Please Update your browser.");
        window.location.href = 'https://unsuitable001.github.io/jee-marks-calculator/old.html'
    }
    reader.addEventListener("load", function (event) {
        var textFile = event.target;
        // alert(textFile.result);
        // rdc.srcdoc = textFile.result;
        rdc.contentWindow.document.write(textFile.result);
        reswindow.innerHTML = "Calculating Marks.... This may take upto 5-10 secs"
        setTimeout(calculate, 5000);
    });
    reader.readAsText(file);
});


function calculate(){
    let wholeResp = rdc.contentWindow.document.getElementsByClassName("menu-tbl");
    let wholeAns = adc.contentWindow.document.body.innerText;
    let currentResp = "";
    reswindow.innerHTML = ""
    // console.log(wholeAns);
    let x = 0;
    while(x < 90){
        currentResp = wholeResp[x].children[0].children[7].children[1].innerText;
        if(currentResp == '--'){
            marks += 0;
            reswindow.innerHTML += "0 at question " + (x+1) + "<br>";
        }
        else{
            currentResp = wholeResp[x].children[0].children[Number(currentResp) + 1].children[1].innerText;
            if(wholeAns.indexOf(currentResp) == '-1'){
                if(grace.indexOf(currentResp) == '-1'){
                    marks -= 1;
                    reswindow.innerHTML += "-1 at question " + (x+1) + "<br>";
                }
                else{
                    marks += 4;
                    reswindow.innerHTML += "4 (grace) at question " + (x+1) + "<br>";
                }
            }
            else{
                marks += 4;
                reswindow.innerHTML += "4 at question " + (x+1) + "<br>";
            }
        }
        x+=1;
    }
    alert("Total Marks Gain : " + marks)
    reswindow.innerHTML += "<h2> Net Marks : " + marks + "</h2>";
}
