const meetings = document.querySelector('#meetings');
const form = document.querySelector('#add-meetings-form');

function renderList(doc){
 let li = document.createElement('li');
 let name = document.createElement('span');
 let date = document.createElement('span');
 let cross = document.createElement('div');

 li.setAttribute('data-id',doc.id);
 name.textContent = doc.data().name;
 date.textContent = doc.data().date;
 cross.textContent= 'x';

 li.appendChild(name); 
 li.appendChild(date); 
 li.appendChild(cross); 

 meetings.appendChild(li);

 cross.addEventListener('click' , (e) =>{
   e.stopPropagation();
   let id = e.target.parentElement.getAttribute('data-id');
   db.collection('meetings').doc(id).delete();
 })
} 
 
  //db.collection('todolist').get().then((snapshot) => {
    //snapshot.docs.forEach(doc => {
      //renderList(doc);
//});

 //});
form.addEventListener('submit',(e)=> {
      e.preventDefault();
      db.collection('meetings').add({
        name: form.name.value, 
        date: form.date.value, 
      })
      form.name.value='';
      form.date.value='';
})

db.collection('meetings').onSnapshot(snapshot =>{
  let changes = snapshot.docChanges();
  changes.forEach(change =>{
     if(change.type == 'added'){
       renderList(change.doc);
     }else if(change.type == 'removed'){
       let li = meetings.querySelector('[data-id=' + change.doc.id + ']');
       meetings.removeChild(li);
     }
  })
})