var weapon=document.querySelector(".weapon");
var rocket=document.querySelector(".weapon .rocket");
var bullet=document.querySelector(".weapon .bullet");
var weaponLeft=0;
var bulletBottom=0;
var bulletFromBodyTop=parseInt(bullet.getBoundingClientRect().top);
var bulletLeft=0;
var bulletRight=0;
var shootedLeft=0;
var shootedRight=0;
var shootedChicken=-1;
var nTrials=-1; //2 trials
/*Initially MaxChicken*/
var MaxChicken;
var MaxChickenFixed;
var LgScreens = window.matchMedia("(max-width: 767px) and (min-width: 500px)")
var smScreens=window.matchMedia("(max-width: 500px)");
function numChicken() {
    if ((LgScreens.matches)||(smScreens.matches)) { // If media query matches
      MaxChickenFixed=5;
      MaxChicken=5;
    } 
    else
    {   MaxChickenFixed=8;
        MaxChicken=8;
    }
}  
numChicken();
var chicken=document.getElementById("chicken");
var bulletAudio=document.getElementById("bulletSound");
var chickenImgs;
var chickenHtml="";
var shootedIndex=-1;
function chickenDown()
{
    chicken.style.transition="ease-in top 15s 0s";
    chicken.style.top="350";
    nTrials++;
}
function chickenUp()
{
    chicken.style.transition="top linear 0s 0.2s";
    chicken.style.top="30";
}
function chickenShooted()
{
    for(var i=0;i<MaxChickenFixed;i++)
    {
        if(((bulletRight>=chickenImgs[i].getBoundingClientRect().left)&&(bulletRight<=chickenImgs[i].getBoundingClientRect().left+100))||((bulletRight>=chickenImgs[i].getBoundingClientRect().left+100)&&(bulletLeft<=chickenImgs[i].getBoundingClientRect().left+100)))
        {
            bullet.style.top=-6;
            bulletBottom=-6;
            bullet.style.top=-6;
            bulletFromBodyTop=parseInt(bullet.getBoundingClientRect().top);
            shootedIndex=i;
        }
    }
}
for(var i=0;i<MaxChicken;i++)
{
    chickenHtml+="<img src='images/chicken.png' class='chickenImg'>";
}
chicken.innerHTML=chickenHtml;
chickenImgs=Array.from(document.querySelectorAll(".chicken img"));
chickenDown();
nTrials++;
document.addEventListener("keyup",function(e)
{
    if(e.keyCode==32) //space
    {

        bulletAudio.play();
    }
}
);
document.addEventListener("keydown",function(e)
{
     if(e.keyCode==32) //space
    {
        bullet.style.opacity=1;
        bulletBottom-=120;
        bulletFromBodyTop-=120;
        if((bulletFromBodyTop)<=(parseInt(chicken.getBoundingClientRect().top+100)))
        {   
            bullet.style.top=bulletBottom;
            chickenShooted();
            if(shootedIndex>=0)
            {
                chickenImgs[shootedIndex].style.transition="opacity 0.4s 0s";
                chickenImgs[shootedIndex].style.opacity=0;
                MaxChicken--;
                bulletBottom=-6;
                bullet.style.top=-6;
            }
            else if(shootedIndex<0 &&((bulletBottom-20)>0))
            {
                bulletBottom-=20;
                bullet.style.top=bulletBottom;
                bulletFromBodyTop=parseInt(bullet.getBoundingClientRect().top);
            }
            else if (shootedIndex<0 && ((bulletBottom-20)<=0))
            {
                bulletBottom=-6;
                bullet.style.top=bulletBottom;
                bulletFromBodyTop=parseInt(bullet.getBoundingClientRect().top);
            }
           /* bulletBottom=-14;
            bullet.style.top=-14;
            bulletFromBodyTop=parseInt(bullet.getBoundingClientRect().top);*/
            shootedIndex=-1;
        }
        else
        {
            bullet.style.top=bulletBottom;
        }
    }
    else if(e.keyCode==39) //rightArrow
    {
        if((weaponLeft+100)<=(window.innerWidth))
        {
            weaponLeft+=50;
            weapon.style.left=weaponLeft;
            bulletLeft=weaponLeft;
            bulletRight=bulletLeft+20;
        }
    }
    else if(e.keyCode==37) //leftArrow
    {
        if((weaponLeft)>0)
        {
            weaponLeft-=50;
            weapon.style.left=weaponLeft;
            bulletLeft=weaponLeft;
            bulletRight=bulletLeft+20;
        }
    }
});
/*Game Over*/
var theBody=document.getElementById("bodyWindow");
chicken.addEventListener("transitionend",function(e)
{
    if((MaxChicken>0)&&(chicken.getBoundingClientRect().top>=350))
        {
            theBody.innerHTML="<div class="+"'w-100 h-100 d-flex align-items-center justify-content-center GameOver text-center'+><p>Game Over</p></div>"    
        } 
    if(nTrials>=2)
    { 
        if((MaxChicken<=0)&&(chicken.getBoundingClientRect().top>=350))
        {
            theBody.innerHTML="<div class="+"'w-100 h-100 d-flex align-items-center justify-content-center GameOver text-center'+><p>You Win!</p></div>"    
        }
    }
    if(chicken.getBoundingClientRect().top>=350)
    {
        chickenUp();
      // nTrials++;

    }
    if((chicken.getBoundingClientRect().top==30)&&(nTrials<=2))
    {
        for(var i=0;i<MaxChickenFixed;i++)
        {
            chickenImgs[i].style.transition="opacity 0s 0s";
            chickenImgs[i].style.opacity=1;
        }
        chickenDown();
        MaxChicken=MaxChickenFixed;
    }
}
);
chicken.addEventListener("transitionrun",function(e)

{
    if((MaxChicken>0)&&(chicken.getBoundingClientRect().top>=350))
    {
        theBody.innerHTML="<div class="+"'w-100 h-100 d-flex align-items-center justify-content-center GameOver text-center'+><p>Game Over</p></div>"    
    } 
    if(nTrials==2)
    { 
        if((MaxChicken<=0)&&(chicken.getBoundingClientRect().top>30))
        {
            theBody.innerHTML="<div class="+"'w-100 h-100 d-flex align-items-center justify-content-center GameOver text-center'+><p>You Win!</p></div>"    
        }
    }
    else if((chicken.getBoundingClientRect().top>=30)&&(chicken.getBoundingClientRect().top<=350)&&(MaxChicken<=0)&&(nTrials<=1))
    {  
        chickenUp();
    }
}
);

/* */
