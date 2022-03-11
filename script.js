
const sectionList = document.getElementById('sectionList')
const sectionNew = document.getElementById('sectionNew')
const sectionEdit = document.getElementById('sectionEdit')

const submitNewButton = document.getElementById('submitNewButton')
const submitEditButton = document.getElementById('submitEditButton')

const listLink = document.getElementById('listLink')
const newLink = document.getElementById('newLink')

const newNamn =  document.getElementById('newNamn')
const newJersey = document.getElementById('newJersey')
const newAge = document.getElementById('newAge')
const newBorn = document.getElementById('newBorn')

const editNamn =  document.getElementById('editNamn')
const editJersey = document.getElementById('editJersey')
const editAge = document.getElementById('editAge')
const editBorn = document.getElementById('editBorn')

const productTableBody = document.getElementById('productTableBody')
const sortingTest = document.getElementById('sortingTest')

const baseApi = 'https://hockeyplayers.systementor.se/Philip/player'

class User{
    constructor(id,namn,jersey,age, born){
        this.id = id;
        this.namn = namn;
        this.jersey = jersey;
        this.age = age;
        this.born = born;
   }
}

function showSection(sectionsId){
    if(sectionsId == 'sectionList'){
        sectionList.style.display = "block";
        sectionNew.style.display = "none";
        sectionEdit.style.display = "none";
    }
    else if(sectionsId == 'sectionNew'){
        sectionList.style.display = "none";
        sectionNew.style.display = "block";
        sectionEdit.style.display = "none";
    }
    else if(sectionsId == 'sectionEdit'){
        sectionList.style.display = "none";
        sectionNew.style.display = "none";
        sectionEdit.style.display = "block";
    }
}

newLink.addEventListener("click",()=>{ 
        showSection('sectionNew');    
  });

listLink.addEventListener("click",()=>{ 
    showSection('sectionList');    
});

sortingTest.addEventListener("click",()=>{ 
    items.sort(function (a, b) {
        return b.id - a.id;
      });
    console.log(items.sort());
    refreshItems();
    showSection('sectionList');
});

const searchId = document.getElementById('searchId')
searchId.addEventListener("keyup", ()=>{
    let filterList =  items.filter(item=> item.id.toString()
        .includes( searchId.value ) );
    userTableBody.innerHTML = '';
    filterList.forEach( (item) => {
        renderTr(item);
    });
})

const searchUser = document.getElementById('searchUser')
searchUser.addEventListener("keyup", ()=>{
    let filterList =  items.filter(item=> item.namn.toLowerCase()
        .includes( searchUser.value.toLowerCase() ) );
    userTableBody.innerHTML = '';
    filterList.forEach( (item) => {
        renderTr(item);
    });
})

const searchJersey = document.getElementById('searchJersey')
searchJersey.addEventListener("keyup", ()=>{
    let filterList =  items.filter(item=> item.jersey.toString()
        .includes( searchJersey.value ) );
    userTableBody.innerHTML = '';
    filterList.forEach( (item) => {
        renderTr(item);
    });
})

const searchAge = document.getElementById('searchAge')
searchAge.addEventListener("keyup", ()=>{
    let filterList =  items.filter(item=> item.age.toString()
        .includes( searchAge.value ) );
    userTableBody.innerHTML = '';
    filterList.forEach( (item) => {
        renderTr(item);
    });
})

const searchBorn = document.getElementById('searchBorn')
searchBorn.addEventListener("keyup", ()=>{
    let filterList =  items.filter(item=> item.born.toLowerCase()
        .includes( searchBorn.value.toLowerCase() ) );
    userTableBody.innerHTML = '';
    filterList.forEach( (item) => {
        renderTr(item);
    });
})

submitNewButton.addEventListener("click",()=>{ 
    const newUser = {
        namn: newNamn.value,
        jersey: newJersey.value,
        age: newAge.value,
        born: newBorn.value,
    };

    const reqParams = {
        method:"POST",
        headers:{
            "content-type": "application/json"
        },
        body:JSON.stringify(newUser)
    };

    fetch(baseApi,reqParams)
        .then(res=>res.json())
        .then(json=>{
            const u = new User(
                json.id,
                newNamn.value,
                newJersey.value,
                newAge.value,
                newBorn.value)
            items.push(u); 
            renderTr(u);
            showSection('sectionList');    
        })
});

submitEditButton.addEventListener("click",()=>{
    const changedUserValues = {
        namn: editNamn.value,
        jersey: editJersey.value,
        age: editAge.value,
        born: editBorn.value
    };
    const reqParams = {
        method:"PUT",
        headers:{
            "content-type": "application/json"
        },
        body:JSON.stringify(changedUserValues)
    };
    
    fetch(baseApi + '/' + editingUser.id ,reqParams)
        .then(res=>{

            refreshItems();
            showSection('sectionList');   
        });

});

let editingUser = null;

function editUser(id){
    editingUser = items.find((item)=>item.id == id)
    editNamn.value = editingUser.namn;
    editJersey.value = editingUser.jersey;
    editAge.value = editingUser.age;
    editBorn.value = editingUser.born;
    showSection('sectionEdit');   
}

function renderTr(user){
    let jsCall = `editUser(${user.id})`;
    let template = `<tr>
                        <td>${user.id}</td>
                        <td>${user.namn}</td>
                        <td>${user.jersey}</td>
                        <td>${user.age}</td>
                        <td>${user.born}</td>
                        <td><a href="#" onclick="${jsCall}">EDIT</a></td>
                    </tr>`
    userTableBody.innerHTML = userTableBody.innerHTML + template;
}

function refreshItems(){
    items = [];
    userTableBody.innerHTML = '';

    fetch(baseApi)
        .then(response=>response.json())
        .then(array=>{
            console.log(array)
            array.forEach(user=>{
                u = new User(user.id,
                    user.namn,
                    user.jersey,
                    user.age,
                    user.born)                    
                items.push(u);
            });
            items.forEach( (item) => {
                renderTr(item);
            });
    })
}

let items = [];
refreshItems();

showSection('sectionList');