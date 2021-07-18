//This will take zoom our card on which we click
function redirect(cardid,count)
{
  
  
var main=document.getElementById(cardid)
document.querySelector("section").style.visibility="hidden";

var redirectpage=document.querySelector(".viewlarge")
redirectpage.style.visibility="visible";



let child1=redirectpage.lastElementChild;
while(child1)
{
    redirectpage.removeChild(child1);
    child1=redirectpage.lastElementChild;
}
const heading1= document.createElement("div");
heading1.classList.add("top")

let idx;
 for(let i=0;i<todolist.length;i++)
  {
   if(todolist[i].id===cardid)
   {
    idx=i;
   }
  }
heading1.innerHTML=`<div class="Add-item1" > <h2 class="back" onclick="goback(${cardid})"><</h2></div>
                   <div class="fullheading">${todolist[idx].heading}</div>
                <div class="Add-item1" > <h2 class="plus"    onclick="addcard()">+</h2></div>`;


redirectpage.append(heading1)
  

const list= document.getElementById("card_container")
list.style.visibility="visible";
// removed all the child from the list except the one which I am zooming.
// and if we encounter that then we go to the next sibling of the card
var child= list.firstElementChild;
console.log(typeof(child.id));
console.log(typeof(cardid))
while(child)
{
   if(child.id==cardid)
    {
        console.log(cardid)
        child=child.nextSibling;
        console.log(child);
        continue;
    }
  list.removeChild(child)
  child=list.firstElementChild;
}

// css property of the zoomed card.
list.style.display="flex";
list.style.justifyContent="center";
list.lastElementChild.style.minWidth="360px";
list.lastElementChild.style.minHeight="400px";
list.lastElementChild.style.fontSize="30px"
list.lastElementChild.style.borderRadius="10px"

 

}


//function to goback to the main card list.
function goback()
{
    var redirectpage=document.querySelector(".viewlarge")

    let child=redirectpage.lastElementChild;
    while(child)
    {
        redirectpage.removeChild(child);
        child=redirectpage.lastElementChild;
    }
    redirectpage.style.visibility="hidden";
    document.querySelector("section").style.visibility="visible";
    rendercard();

}

//function to add card in the main item and rendering the element
function addcard()
{
  var redirectpage=document.querySelector(".viewlarge")
  var childofview=redirectpage.lastElementChild;

  while(childofview)
  {
    redirectpage.removeChild(childofview);
    childofview=redirectpage.lastElementChild;
  }
  
  rendercard();
  redirectpage.style.visibility="hidden";
  document.querySelector("section").style.visibility="visible";
  popup();


}

