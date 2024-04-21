
let notes = [
    {
        text: "NOTE #1",
        id: 1,
        isCompleted: true
    },
    {
        text: "NOTE #2",
        id: 2,
        isCompleted: false
    },
    {
        text: "NOTE #3",
        id: 3,
        isCompleted: true
    },
]
//DOM
const listDiv = document.querySelector(".todo-list")
const todoTheme = document.querySelector(".todo-theme button")
const floatBtn = document.querySelector("#plus")
const overlay = document.querySelector(".overlay")
const cnBtn = document.querySelector(".cancel")
const apBtn = document.querySelector("#apply")
const noteInput = document.querySelector("#note")
const select = document.getElementById("todo-status")
const inputSearch = document.getElementById("search")
let selectedNoteId;

inputSearch.oninput = () => {
    console.log(inputSearch.value);
    const copyNotes = [].concat(notes)
    const not = copyNotes.filter(el => el.text.toLowerCase().includes(inputSearch.value))
    renderNotes(not);
    if (not.length === 0){
    listDiv.innerHTML = `<img src="./Detective-check-footprint 1.png" alt=""/>`
}
}
select.onchange = () => {
    console.log(select.value);
    const copyNotes = [].concat(notes)
    if (select.value === "complete") {
        const notes = copyNotes.filter(n => n.isCompleted === true)
        console.log(notes, 'true');
        renderNotes(notes)
    }else if(select.value === "incomplete"){
        const notes = copyNotes.filter(n => n.isCompleted === false)
        console.log(notes, 'false');
        renderNotes(notes)
    }else if(select.value === "all"){
        const all = copyNotes
        console.log(all, 'all')
        renderNotes(notes)
    }
}
floatBtn.onclick = () => {
    overlay.style.display = "block"
    apBtn.textContent = "APPLY"
    noteInput.value = ""
}
cnBtn.onclick = () => {
    overlay.style.display = "none"
}
apBtn.onclick = () => {
    if(apBtn.textContent ==="Save"){
        console.log('update');
        notes = notes.map((n) => {
            if(n.id === selectedNoteId){
                return {...n , text: noteInput.value}
            }else{
                return n;
            }
        })
        renderNotes()
        overlay.style.display = "none";
        return
    }
    if(!noteInput.value.trim())return
    overlay.style.display = "none"
    const newNote = {
        id: Math.random(),
        text: noteInput.value,
        isCompleted: false
    }
    notes.push(newNote)
    renderNotes()
    noteInput.value = ""
}
let isDark = false
todoTheme.onclick = () => {
    isDark = !isDark
    let href = document.querySelector("#theme")
    if (isDark) {
        href.href = './dark.css'
        todoTheme.innerHTML = `<i class="bi bi-sun"></i>`
    } else {
        href.href = './style.css'
        todoTheme.innerHTML = `<i class="bi bi-moon"></i>`
    }
    console.log(href);
}
function renderNotes(notesL = notes) {
    listDiv.innerHTML = ""
    notesL.forEach((el) => {
        listDiv.innerHTML += `
        <div class="list-item">
          <div class="text">
           <input type="checkbox" data-id="${el.id}" 
           onchange="change(event)" ${setChecked(el.isCompleted)} />
           <span  class="${setChecked(el.isCompleted)}" >${el.text}</span>
          </div>
           <div class="item-btns">
            <button onclick = "edit(${el.id})"><i class="bi bi-pen"></i></button>
            <button onclick = "delNote(${el.id})"><i class="bi bi-trash3"></i> </button>    
          </div>
        </div>` })
}
renderNotes()
function edit(id){
    selectedNoteId = id
    overlay.style.display = "block"
    const note = notes.find(el => el.id == id)
    noteInput.value = note.text
    apBtn.textContent = "Save" 
}
function setChecked(isTrue) {
    return isTrue ? "checked" : ""
}
// event --- e
function change(e) {
    const notId = e.target.getAttribute("data-id")
    console.log(notId);
    notes = notes.map((el) => {
        if (el.id == notId) {
            return {
                ...el,
                isCompleted: !el.isCompleted
            }
        } else {
            return el
        }
    })
    renderNotes()
}
function delNote(id) {
    console.log('delete', id);
    notes = notes.filter((elem) => {
        return elem.id !== id
    })
    renderNotes()
}


