/*****
 * INIT VARIABLES*
 *****/
var theBody=document.getElementById("bodyWindow"); 
/*Weapon*/
var weapon=document.querySelector(".weapon"); 
var weaponLeft=0;
/********/
/*Bullet*/
var bullet=document.querySelector(".weapon .bullet");
var bulletBottom=0;
var bulletFromBodyTop=parseInt(bullet.getBoundingClientRect().top);
var bulletLeft=0;
var bulletRight=0;
var bulletAudio;
var bulletWidth=document.querySelector(".bullet img").offsetWidth;
/********/
/*Chicken*/
var chickenImgs;
var chickenHtml="";
var shootedIndex=-1;
var row1=document.getElementById("chicken1");
var row2=document.getElementById("chicken2");
var nTrials=-1;
var chicken;
var MaxChicken;
var MaxChickenFixed;
var chickenWidth;
var chickenheight;
/******/
/*Score*/
var updateScore;
var score=document.getElementById("score");
/*******/
/*Screen Size*/
var LgScreens = window.matchMedia("(max-width: 767px) and (min-width: 500px)")
var smScreens=window.matchMedia("(max-width: 500px)");
/*************/
/*****
 *END INIT VARIABLES*
 *****/

 /*****
 *DECIDE NUMBER OF CHICKEN 
 ACCORDING TO SCREEN SIZE*
 *****/
function numChicken()
 {
    if ((LgScreens.matches)||(smScreens.matches)) { // If media query matches
      MaxChickenFixed=5;
      MaxChicken=10;
    } 
    else
    {   MaxChickenFixed=8;
        MaxChicken=16;
    }
};  
/*****
 *END NUMBER OF CHICKEN*
 *****/
/*****
 *INIT*
 *****/
function Init()
{
    chickenHtml="";
    numChicken();
    for(var i=0;i<MaxChickenFixed;i++)
    {
        chickenHtml+="<img src='images/chicken.png' class='chickenImg'>";
    }
    row1.innerHTML=chickenHtml;
    row2.innerHTML=chickenHtml;
    chicken=document.getElementById("chicken");
    bulletAudio=document.getElementById("bulletSound");
    chickenImgs=Array.from(document.querySelectorAll(".chicken img"));
    chickenWidth=document.querySelector("#chicken img").offsetWidth;
    chickenHeight=document.querySelector("#chicken img").offsetHeight;
    chickenDown();
    nTrials++;
}
/*****
 *END INIT*
 *****/
/*****
 *MOVE CHICKEN DOWN*
 *****/
function chickenDown()
{
    chicken.style.transition="ease-in top 10s 0s";
    chicken.style.top="350";
    nTrials++;
}
/*****
 *END MOVE CHICKEN DOWN*
 *****/
/*****
 *MOVE CHICKEN UP*
 *****/
function chickenUp()
{
    chicken.style.transition="top linear 0s 0.2s";
    chicken.style.top="30";
    for(var j=0;j<MaxChicken;j++)
    {
        $(".chicken img").eq(j).css("opacity")=1;
    }
}
/*****
 *END MOVE CHICKEN UP*
 *****/
/*****
 *CHECK IF CHICKEN IS SHOOTED*
 *****/
function chickenShooted()
{
    for(var i=0;i<=MaxChickenFixed*2-1;i++)
    {
        if(((bulletRight>=chickenImgs[i].getBoundingClientRect().left)&&(bulletRight<=chickenImgs[i].getBoundingClientRect().left+chickenWidth))||((bulletRight>=chickenImgs[i].getBoundingClientRect().left+chickenWidth)&&(bulletLeft<=chickenImgs[i].getBoundingClientRect().left+chickenWidth)))
        {
            if($(".chicken img").eq(i).css("opacity")==0)
            {
                continue;
            }
            else if($(".chicken img").eq(i).attr("opacity")==1)
            {
                shootedIndex=i;
            }
            else
            {
                shootedIndex=i;
            }
        }
    }
}
/*****
 *END CHECK IF CHICKEN IS SHOOTED*
 *****/
/*****
 *ACTIONS ON SPACE*
 *****/
document.addEventListener("keyup",function(e){

    if(e.keyCode==32) //space
    {
        bullet.style.transition="top 0s 0s"
        bullet.style.transition="opacity 0s 0s";
        bulletBottom-=520;
        bulletFromBodyTop-=520;
        bullet.style.opacity=1;
        chickenShooted();
    if(bulletFromBodyTop<=(chicken.getBoundingClientRect().top+(chickenHeight))&&(shootedIndex>=0))
    {      
        bullet.style.top=bulletBottom;
            chickenImgs[shootedIndex].style.transition="opacity 0.1s 0s";
            $(".chicken img").eq(shootedIndex).css("opacity","0");
            MaxChicken--;
            updateScore=Number(score.innerHTML);
            updateScore++;
            score.innerHTML=updateScore;
            bullet.style.transition="opacity 0s 0.1s"
        bullet.style.opacity=0;
        bulletBottom=-6;
        bulletFromBodyTop=-6;
            shootedIndex=-1;
    }
    else
    {
        bullet.style.top=bulletBottom;
    }
    if(bullet.getBoundingClientRect().top<0)
    {
            bullet.style.opacity=0;
            bulletBottom=-6;
            bullet.style.top=-6;
            bulletFromBodyTop=-6;
    }
            shootedIndex=-1;
            bulletAudio.play();
            bullet.style.opacity=0;
            bulletBottom-=520;
            bulletFromBodyTop-=520;
        }
    });
/*****
 *END ACTIONS ON SPACE*
 *****/
/*****
 *ACTIONS ON RIGHT ARROW , LEFT ARROW*
 *****/
document.addEventListener("keydown",function(e)
{
    
     if(e.keyCode==39) //rightArrow
    {
        if((weaponLeft+100)<=(window.innerWidth))
        {
            /*Make bullet down again */
            bullet.style.opacity=0;
            bulletBottom=-6;
            bulletFromBodyTop=-6;
            bullet.style.top=-6;
            /**************************/
            weaponLeft+=85;
            weapon.style.left=weaponLeft;
            bulletLeft=weaponLeft;
            bulletRight=bulletLeft+bulletWidth;
        }
    }
    else if(e.keyCode==37) //leftArrow
    {
        if((weaponLeft)>0)
        {
            /*Make bullet down again */
            bullet.style.opacity=0;
            bulletBottom=-6;
            bulletFromBodyTop=-6;
            bullet.style.top=-6;
            /**************************/
            weaponLeft-=85;
            weapon.style.left=weaponLeft;
            bulletLeft=weaponLeft;
            bulletRight=bulletLeft+bulletWidth;
        }
    }
});
/*****
 *END ACTIONS ON RIGHT ARROW , LEFT ARROW*
 *****/
/*****
 *CALLING FUNCTIONS*
 *****/
Init();
/*****
 *END CALLING*
 *****/
/*****
 *HANDLE WIN AND GAME OVER CONDITIONS*
 *****/
chicken.addEventListener("transitionend",function(e)
{
    if((MaxChicken>0)&&(chicken.getBoundingClientRect().top>=350))
        {
            theBody.innerHTML="<div class="+"'w-100 h-100 d-flex align-items-center justify-content-center End text-center'+><p>Game Over</p></div>"    
        } 
    if(nTrials>=2)
    { 
        if((score<MaxChickenFixed*2)&&(chicken.getBoundingClientRect().top>=350))
        {
            theBody.innerHTML="<div class="+"'w-100 h-100 d-flex align-items-center justify-content-center End text-center'+><p>Game over</p></div>"    
        }
        else if((MaxChicken<=0)&&(chicken.getBoundingClientRect().top>=350))
        {
            theBody.innerHTML="<div class="+"'w-100 h-100 d-flex align-items-center justify-content-center End text-center'+><p>You Win!</p></div>" 
        }
    }
    if(chicken.getBoundingClientRect().top>=350&&(MaxChicken<=0))
    {
        chickenUp();
    }
    if((chicken.getBoundingClientRect().top==30)&&(nTrials<=2)&&(MaxChicken<=0))
    {
        for(var i=0;i<=MaxChickenFixed*2-1;i++)
        {
            chickenImgs[i].style.transition="opacity 0s 0s";
            chickenImgs[i].style.opacity=1;
        }
        MaxChicken=MaxChickenFixed*2;
        chicken.style.transition="ease-in top 8s 0s";
        chickenDown();
    }
}
);
/*****
 *END HANDLE WIN AND GAME OVER CONDITIONS*
 *****/
