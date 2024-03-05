


const notes = [
    {
        text: "NOTE #1",
        id: 1,
    },
    {
        text: "NOTE #2",
        id: 2,
    },
    {
        text: "NOTE #3",
        id: 3,
    },
]

//DOM
const listDiv = document.querySelector(".todo-list")

const moon = document.querySelector(".todo-theme")
const btn = document.querySelector(".bi bi moon")

let isOpenIcon = false

moon.onclick = () => {
    isOpenIcon = !isOpenIcon
    if(isOpenIcon === true){

         moon.innerHTML = `<i class="bi bi-sun"></i>
        `
    } else{

       moon.innerHTML = `<i class="bi bi-moon"></i>
        `
    }
}


function renderNotes (){
    listDiv.innerHTML = ""

    notes.forEach((el) => {
        listDiv.innerHTML +=`
        <div class="list-item">
          <div class="text">
           <input type="checkbox">
           <span>${el.text}</span>
          </div>
           <div class="item-btns">
            <button><i class="bi bi-pen"></i>
            </button>
            <button><i class="bi bi-trash3"></i>
            </button>
          </div>
        </div>` })
}

renderNotes ()