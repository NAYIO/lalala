var photo = document.getElementsByClassName('box');
var photo1 = document.getElementsByClassName('ph');
var images = document.getElementById('images');
var scalePhoto = document.getElementsByClassName('scale');
//给定最大最小值，来获取随机数
function randomNum(max,min){
    var range = max - min;
    var rand = Math.random();
    var num = min + range*rand;
    return num;
}
//实现图片的随机定位和随机旋转
function randomLay(index){
    //重新获取一边就不会出现添加图片后未定义的情况
    var photos = document.getElementsByClassName('box');
    var ranNumber = randomNum(50,-50);
    var zindex = randomNum(5,1);
    var leftValue = randomNum(70,20);
    var topValue = randomNum(13*(i+1),13*i+5);
    photos[index].style.position = "absolute";
    photos[index].style.transform = "rotate("+ranNumber+"deg)";
    photos[index].style.zIndex = Math.round(zindex);
    photos[index].style.left = leftValue + "vw";
    photos[index].style.top = topValue + "vh";
}
for(var i=0;i<photo.length;i++){
    randomLay(i);
}
//图片拖拽
images.onmousedown = function(ev){
    var oEvent = ev||ev.target;
    //获得当前鼠标点击的图片的id
    var idName = oEvent.target.parentNode.id||oEvent.srcElement.parentElement.id;
    var idPhoto = document.getElementById(idName);
    oEvent.preventDefault();//阻止默认事件的发生  
    var disX = oEvent.clientX - idPhoto.offsetLeft;
    var disY = oEvent.clientY - idPhoto.offsetTop;
    images.onmousemove = function(ev){
        oEvent = ev;
        oEvent.stopPropagation();//防止冒泡
        oEvent.preventDefault();
        var x = oEvent.clientX - disX;
        var y = oEvent.clientY - disY;
        //条件判断，不能出边界
        x = x <= 0 ? 0 : x;
        y = y <= 0 ? 0 : y;
        idPhoto.style.left = 100/window.innerWidth*x + "vw";
        idPhoto.style.top = 100/window.innerHeight*y + "vh";
    }
    //当鼠标离开时，停止移动
    images.onmouseleave = function(){
        images.onmousemove = null;
        images.onmouseup = null;
    }
    //当鼠标弹起时停止移动
    images.onmouseup = function(){
        images.onmousemove = null;
        images.onmouseup = null;
    }
}
//实现图片的放大缩小效果
//给每个scale绑定点击事件
for(let i=0;i<scalePhoto.length;i++){
    scalePhoto[i].onmousedown = function(ev){
        console.log(i);
        ev.preventDefault();
        ev.stopPropagation();
        var pos = {
        'w': photo1[i].offsetWidth,
        'h': photo1[i].offsetHeight,
        'x': ev.clientX,
        'y': ev.clientY
        };
        images.onmousemove = function(e){
            e.preventDefault();
            var w = e.clientX - pos.x + pos.w;
            var h = e.clientY - pos.y + pos.h;
            photo[i].style.width = 100/window.innerWidth*w + "vw";
            photo[i].style.height = 100/window.innerHeight*h + "vh";
        }
        //当鼠标离开时，停止移动
        images.onmouseleave = function(){
            images.onmousemove = null;
            images.onmouseup = null;
        }
        //当鼠标弹起时停止移动
        images.onmouseup = function(){
            images.onmousemove = null;
            images.onmouseup = null;
        }
    
    }
};
//添加图片
let count = 7;
function addImg(obj){  
    let a = count-1;
    let countStr = String(count);
    let add = document.getElementById('images');
    let div = document.createElement('div');
    div.className = "box";
    div.id = "box"+countStr;
    let img = document.createElement('img');
    img.className = "ph";
    img.id = countStr;
    let scale = document.createElement('div');
    scale.className = "scale";
    add.appendChild(div);
    div.appendChild(img);
    div.appendChild(scale);
    let reader = new FileReader();
    let file = obj.files[0];
    reader.onload = function(e){
        $('#'+countStr).attr("src",this.result);
    }
    reader.readAsDataURL(file); 
    //新来的图片位置随机摆放 
    randomLay(a);
    //对新来的图片进行放大缩小的绑定
    var photoAfter = document.getElementsByClassName('box');
    var photo1After = document.getElementsByClassName('ph');
    var scalePhotoAfter = document.getElementsByClassName('scale');
    for(let j=0;j<scalePhotoAfter.length;j++){
        scalePhotoAfter[j].onmousedown= function(ev){
        var oEvent = ev||ev.target;
        ev.preventDefault();
        ev.stopPropagation();
        var pos = {
            'w': photo1After[j].offsetWidth,
            'h': photo1After[j].offsetHeight,
            'x': ev.clientX,
            'y': ev.clientY
        };
        images.onmousemove = function(e){
            e.preventDefault();
            var w = e.clientX - pos.x + pos.w;
            var h = e.clientY - pos.y + pos.h;
            photoAfter[j].style.width = 100/window.innerWidth*w + "vw";
            photoAfter[j].style.height = 100/window.innerHeight*h + "vh";
        }
        //当鼠标离开时，停止移动
        images.onmouseleave = function(){
            images.onmousemove = null;
            images.onmouseup = null;
        }
        //当鼠标弹起时停止移动
        images.onmouseup = function(){
            images.onmousemove = null;
            images.onmouseup = null;
        } 
    }
    }
    
    count++;
}
//实现图片的删除
function delePh(){
        var son = document.getElementsByClassName("choose");
        var parent = new Array();
        for(let i=0;i<son.length;i++){
            //console.log(son.length);
            parent[i] = son[i].parentNode;
            images.removeChild(parent[i]);
            i--;
        }
        var photoAfter = document.getElementsByClassName('box');
        for(let j=0;j<photoAfter.length;j++){
            photoAfter[j].onclick = null;
        }
        //删除之后，由于位置的变化，需要重新进行一次放缩的相关绑定
        var scalePhotoAfter = document.getElementsByClassName('scale');
        var photo1After = document.getElementsByClassName('ph');
        for(let j=0;j<scalePhotoAfter.length;j++){
            scalePhotoAfter[j].onmousedown= function(ev){
                ev.preventDefault();
                ev.stopPropagation();
                var pos = {
                    'w': photo1After[j].offsetWidth,
                    'h': photo1After[j].offsetHeight,
                    'x': ev.clientX,
                    'y': ev.clientY
                };
                images.onmousemove = function(e){
                    e.preventDefault();
                    var w = e.clientX - pos.x + pos.w;
                    var h = e.clientY - pos.y + pos.h;
                    photoAfter[j].style.width = 100/window.innerWidth*w + "vw";
                    photoAfter[j].style.height = 100/window.innerHeight*h + "vh";
                }
                //当鼠标离开时，停止移动
                images.onmouseleave = function(){
                    images.onmousemove = null;
                    images.onmouseup = null;
                }
                //当鼠标弹起时停止移动
                images.onmouseup = function(){
                    images.onmousemove = null;
                    images.onmouseup = null;
                } 
        }
    }
}
//实现对图片的选择
function selector(){
    var photoAfter = document.getElementsByClassName('box');
    var choose = new Array();
    for(let i=0;i<photoAfter.length;i++){
        photoAfter[i].onclick = function(ev){
            choose[i] = document.createElement('div');
            photoAfter[i].appendChild(choose[i]);
            choose[i].className = "choose";
            choose[i].style.width =100/window.innerWidth*(photoAfter[i].offsetWidth+5) +"vw";
            choose[i].style.height =100/window.innerHeight*(photoAfter[i].offsetHeight+7) +"vh";
            choose[i].style.position = "absolute";
            choose[i].style.left = -1+"vw";
            choose[i].style.top = -2+"vh";
        }
    }
}

