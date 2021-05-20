const todoList = document.querySelector('#todo-list');
const form = document.querySelector('#add-list-form');

function renderList(doc){
 let li = document.createElement('li');
 let task = document.createElement('span');
 let cross = document.createElement('div');

 li.setAttribute('data-id',doc.id);
 task.textContent = doc.data().task;
 cross.textContent= 'x';

 li.appendChild(task); 
 li.appendChild(cross); 

 todoList.appendChild(li);

 cross.addEventListener('click' , (e) =>{
   e.stopPropagation();
   let id = e.target.parentElement.getAttribute('data-id');
   db.collection('todolist').doc(id).delete();
 })
} 
 
  //db.collection('todolist').get().then((snapshot) => {
    //snapshot.docs.forEach(doc => {
      //renderList(doc);
//});

 //});
form.addEventListener('submit',(e)=> {
      e.preventDefault();
      db.collection('todolist').add({
        task: form.task.value, 
      })
      form.task.value='';
})

db.collection('todolist').onSnapshot(snapshot =>{
  let changes = snapshot.docChanges();
  changes.forEach(change =>{
     if(change.type == 'added'){
       renderList(change.doc);
     }else if(change.type == 'removed'){
       let li = todoList.querySelector('[data-id=' + change.doc.id + ']');
       todoList.removeChild(li);
     }
  })
})