import {
  firebase,
  database,
  ref,
  set,
  update,
  remove,
  onValue,
  push,
  child,
  orderByChild,
  onChildAdded,
  query,
  startAt,
  // getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // signOut
} from "./firebase.js";

import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

const auth = getAuth()
// console.log("current user ", getAuth().currentUser)

let uId = "";


const user = auth.currentUser;
console.log(auth);



onAuthStateChanged(auth, (user) => {
  if (user) {
    uId = user.uid;
    let userRef = ref(database,uId+"/todo");
    onValue(userRef, valSnap)
    // console.log(user)
  } else {
    // alert('not signed in')
    window.location.href = 'login.html';
  }
});
var list = document.getElementById('event');




function writeData(name, email, task, time) {
  const itemKey = push(
    child(ref(database), uId + '/todo'),
    { name, email, task, time }
  ).then(e => {
    console.log(e, "suss")
  }).catch(err => {
    console.log(err, "error")
  })
  list.value = '';

}


function addtask() {
  if (list.value !== '') {

    var text = document.createTextNode(list.value);
    var taskData = text.textContent;
    let times = new Date().getTime();
    writeData(
      "hammadaslam1",
      auth.currentUser.email,
      taskData,
      times
    );
  }
}

document.getElementById('add-task').addEventListener('click', addtask)




const valSnap =  (snapshot) => {
  const data = snapshot.val();
  console.log(data);
  const objList = []
  for (let objId of Object.keys(data||{})) {
    const obj = data[objId]
    // console.log(obj)
    objList.push({...obj, key: objId})
  }
  objList.sort((a, b) => b.time - a.time)
  document.getElementById('list').innerHTML = ''
  for (const obj of objList) {
    const childList = document.createElement('div');
    childList.className = 'list-child flex flex-row justify-between pr-3';
    const item = document.createElement('div');
    item.className = 'items flex wrap-text max-w-[50%]';
    item.style.padding = '10px';

    childList.style.borderBottom = '2px solid skyblue';
    var getText = document.createTextNode(obj.task);
    console.log(typeof(getText))
    // data = getText.textContent;
    document.getElementById("list").appendChild(childList);
    childList.appendChild(item)
    const icons = document.createElement('div');
    icons.className = 'icons';
    childList.appendChild(icons);

    item.appendChild(getText);

    const del = document.createElement('button');
    del.className = 'btn';
    icons.appendChild(del);
    const icon1 = document.createElement('i');
    icon1.className = "fa fa-trash text-white";


    del.addEventListener('click', () => {
      const child = icons.parentElement;
      // child.remove();
      
      let userRef = ref(database,uId+"/todo/"+obj.key);
      remove(userRef)

    });
    del.appendChild(icon1);


    const edit = document.createElement('button');
    edit.className = 'btn';
    icons.appendChild(edit);
    const icon2 = document.createElement('i');
    icon2.className = "fas fa-pencil text-white";

    edit.addEventListener('click', () => {
      const ed = document.createElement('input')
      ed.className = "edit text-white"
      ed.style.backgroundColor = 'skyblue';
      ed.style.height = "30px"
      ed.value = item.textContent;
      ed.style.borderRadius = '5px';
      ed.style.paddingLeft = '5px';
      ed.style.maxWidth = '50%'

      item.replaceWith(ed);
      del.style.display = 'none'
      done.style.display = 'none'
      edit.style.display = 'none';
      
      const cancel = document.createElement('button');
      cancel.className='btn'
      icons.appendChild(cancel);
      const icon5 = document.createElement('i')
      icon5.className = "fas fa-xmark text-white";

      cancel.appendChild(icon5);

      cancel.addEventListener('click', () => {
        ed.replaceWith(item);
        del.style.display = '';
        done.style.display = '';
        edit.style.display = '';
        cancel.remove();
        ok.remove()
      })

      const ok = document.createElement('button');
      ok.className='btn'
      icons.appendChild(ok);
      const icon4 = document.createElement('i')
      icon4.className = "fas fa-check text-white";

      ok.appendChild(icon4);

      ok.addEventListener('click', () => {
        let userRef = ref(database,uId+"/todo/"+obj.key);
        update(userRef, {task:ed.value})
        ed.replaceWith(item);
        del.style.display = '';
        done.style.display = '';
        edit.style.display = '';
        cancel.remove();
        ok.remove();
      })
      
    });

    edit.appendChild(icon2);

    const done = document.createElement('button');
    done.className = 'btn';
    icons.appendChild(done);
    const icon3 = document.createElement('i');
    icon3.className = "fas fa-check text-white";

    done.addEventListener('click', () => {
      // const children = childList.querySelectorAll('.child');
      // childList.style.textDecoration = "line-through"
      // childList.style.color = "green"
      let userRef = ref(database,uId+"/todo/"+obj.key);
        update(userRef, {completed:true})
    });
    done.appendChild(icon3);
    if(obj.completed){
      childList.style.textDecoration = "line-through"
      // childList.style.color = "green"
      // edit.style.background = '#ddd';
      edit.style.display = 'none'
      done.style.display = 'none'
      
      edit.disabled = true;
      done.disabled = true;
    }

  }
}


document.getElementById('logout').addEventListener('click', () => {
  // const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
  // alert('Signed out successfully')
}).catch((error) => {
  // An error happened.
  alert('Signing out failed!')
});
})


