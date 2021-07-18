var todolist=[];
//popup for adding card in the list
function popup(){
      document.querySelector(".Blur").style.visibility="visible";
      document.querySelector(".heading").style.filter="blur(20px)";
      console.log("click succesfully")
}
 
// popup for adding work-item in card
function SubClosedpopup(){
  document.querySelector(".Blur1").style.visibility="hidden";
 document.querySelector(".heading").style.filter="blur(0px)";
}


var added1= document.querySelector(".Added")
var colosed= document.querySelector(".Closed")
var added2= document.querySelector(".Added")


// This function will render all card in our main list.

  function rendercard(){

  const list= document.getElementById("card_container")
  list.style.display="flex";
  list.style.justifyContent="space-between";
  var child= list.lastElementChild
  while(child)
  {
    list.removeChild(child)
    child=list.lastElementChild 
  }
  
  for(let i=0;i<todolist.length;i++)
  {
    const node= document.createElement("div")
    node.setAttribute("class", "card");
    node.setAttribute("id", todolist[i].id)
    
  
    node.innerHTML= `<div class="card-heading" onclick="redirect(${todolist[i].id},${0})">${todolist[i].heading}</div>
    <hr class="horizontal">
    <div id="content">
    </div>
   <span><i class="fas fa-trash"   arial-hidden="true" onclick="deletecard(${todolist[i].id})"> </i>
         <i class= "fas fa-plus-circle"  arial-hidden="true" onclick="AddSubWork(${todolist[i].id})"></i>
   </span> `
  // console.log(node.innerHTML)
           
  list.append(node);
  
  
  document.querySelector(".Blur").style.visibility="hidden";
  document.querySelector(".heading").style.filter="blur(0px)";
  }
  
  for(let i=0;i<todolist.length;i++)
  {
    for(let j=0;j<todolist[i].subtask.length;j++)
    {
      var parent=document.getElementById(todolist[i].id);
      //get the worklist node in which we are pushing our work.
       const subnode= parent.childNodes[4];
       const node1= document.createElement("div")
       node1.setAttribute("id", todolist[i].subtask[j].id)
       node1.classList.add("workspacing")
  
       if(todolist[i].subtask[j].completed===false)
        {
         node1.innerHTML=`<div class="fixbutton">${todolist[i].subtask[j].taskadded} <button class="btn btn-danger pill  listbutton" onclick="Done(${todolist[i].subtask[j].id})"> mark done</button> </div>`
        }
        else
        {
         node1.innerHTML=`<p class="completed">${todolist[i].subtask[j].taskadded}<p>`
        }
       subnode.append(node1);
      
       console.log(todolist[i].subtask[j].id)
    }
  }

// If there is no item in our list then show this message.
  if(todolist.length==0)
{
 const node1= document.createElement("div");
  node1.innerHTML=`<h1 class="No">There is'nt any todo list. Enjoy!!</h1>`
  list.append(node1);
}

}


//This will remove the particular card from our list.
function deletecard(cardid)
{

  document.querySelector("section").style.visibility="visible";
  document.querySelector(".viewlarge").style.visibility="hidden";

  for(let i=0;i<todolist.length;i++)
  {
    if(todolist[i].id===cardid)
    {
      // first index is the ith item to be removed and second is count of the element you want to remove.
      console.log("success")
      todolist.splice(i,1)
    }
  }
console.log(todolist.length)
rendercard();
}


//This is function which will add our todo work in particular card this is 
// for setting the id of that card to global in which we want to add our 
// todo work

var flag=false;
var global;


function AddSubWork(cardid)
{
  // This will give the card id.
global= cardid;
flag=true;
console.log(global);
document.querySelector(".Blur1").style.visibility="visible";
document.querySelector(".heading").style.filter="blur(20px)";
 }

 //functiona on the popup of clicking any add icon of card
//calling add subwork then set global id of that card
// then simply add the subwork in that card and then render all the card
document.querySelector(".Added1").addEventListener("click",()=>
{

  var parent=document.getElementById(global);
  const subnode= parent.childNodes[4];
 document.querySelector(".Blur1").style.visibility="visible";
 document.querySelector(".heading").style.filter="blur(20px)";
  
        
     var taskadded= document.getElementById("inputtext1").value;
      if(taskadded!="")
      {
      const subdo={
      taskadded,
      completed: false,
      id: Date.now()
      }

      const node1= document.createElement("div")
      node1.setAttribute("id",subdo.id);
      node1.classList.add("workspacing")
      node1.innerHTML=`${taskadded} <button class="btn btn-danger pill listbutton" onclick="Done(${subdo.id})"> mark done</button>`
      subnode.append(node1);
      console.log(subdo.id)
      document.querySelector(".Blur1").style.visibility="hidden";
      document.querySelector(".heading").style.filter="blur(0px)";
      console.log(taskadded)


 // find the card in which I have added the Work-list.
 let idx;
 for(let i=0;i<todolist.length;i++)
  {
   if(todolist[i].id===global)
   {
    idx=i;
   }
  }

 todolist[idx].subtask.push(subdo);
  }
  console.log(todolist)
  })

 // It will marked the work if completed
function Done(complete)
{
  
  for(let i=0;i<todolist.length;i++)
  {
    for(let j=0;j<todolist[i].subtask.length;j++)
    {
      if(todolist[i].subtask[j].id===complete)
      {
        todolist[i].subtask[j].completed=true;
      }
    }
    
  }

  //Important part of redirecting page
  //This is done extra because when we zoom out then I will push the card to the main page
  // and when we complete the work then we rerender and checkecing whether I am zoomed or not
  // If zoomed then prining remove all the worklist and rerender the workitem.
    var view=document.querySelector(".viewlarge").lastElementChild;
  
    if(view!=null)
    {
      const list= document.getElementById("card_container")
      list.style.visibility="visible";
      
      var child= list.firstElementChild;
      console.log(child.id);
      //cause in our item there is only one child.
      const id1=list.lastElementChild.id;
      while(child)
      {
         if(child.id==id1)
          {
            // removed all the child from the list except the one which I am zooming.
            // and if we encounter that then we go to the next sibling of the card
              child=child.nextSibling;
              
              continue;
          }
        list.removeChild(child)
        child=list.firstElementChild;
      }
        
      let idx;
      for(let j=0;j<todolist.length;j++)
     {
 
         if(todolist[j].id==id1)
         {
             idx=j;
         }
     }
     var parent=document.getElementById(id1);
     const subnode1= parent.childNodes[4];
     console.log(id1);
 
     let children=subnode1.lastElementChild;
     while(children)
     {
         subnode1.removeChild(children);
         children=subnode1.lastElementChild;
     }
     for(let k=0;k<todolist[idx].subtask.length;k++)
     {
          parent=document.getElementById(todolist[idx].id);
         //get the worklist node in which we are pushing our work.
          const subnode= parent.childNodes[4];
          const node1= document.createElement("div")
          node1.setAttribute("id", todolist[idx].subtask[k].id)
          node1.classList.add("workspacing")
     
          if(todolist[idx].subtask[k].completed===false)
           {
            node1.innerHTML=`<div class="fixbutton">${todolist[idx].subtask[k].taskadded} <button class="btn btn-danger pill  listbutton" onclick="Done(${todolist[idx].subtask[k].id})"> mark done</button> </div>`
           }
           else
           {
            node1.innerHTML=`<p class="completed">${todolist[idx].subtask[k].taskadded}<p>`
           }
          subnode.append(node1);
     }
     list.style.display="flex";
     list.style.justifyContent="center";

    }
  else
  {
    
  rendercard();

  }
}



  
//This will add card to our main list.

 added1.addEventListener("click",()=> {

console.log("clicked succesfully")
  var redirectpage=document.querySelector(".viewlarge")
  redirectpage.style.visibility="hidden";

console.log(document.getElementById("inputtext").value)

let heading=document.getElementById("inputtext").value
if(heading!="")
{
 const todo={
  heading,
 subtask: [],
  id: Date.now()
};
todolist.push(todo);

}
document.querySelector(".Blur").style.visibility="hidden";
document.querySelector(".heading").style.filter="blur(0px)";

rendercard();
} )




//This will close pop up.
colosed.addEventListener("click", function(){

      document.querySelector(".Blur").style.visibility="hidden";
      document.querySelector(".heading").style.filter="blur(0px)";
     })

