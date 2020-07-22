console.log("Wellcome to my note app-- created By Pavel ");
showNotes();
// If user adds a note, add it to the localStorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addtxt = document.getElementById("addtxt");
    let addtitle = document.getElementById("addtitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);


    }

    let myObj = {
        title : addtitle.value,
        text : addtxt.value
    };
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtxt.value = "";
    addtitle.value = "";
    console.log(notesObj);//1------------
    showNotes();

})

// Function to show elements from local storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;" style="padding:20px;">
                <div class="card-body" style="background-color: #343A40;
                border:1px solid #000000; color: aliceblue;">
                        <h5 class="card-title" >${index+1}. ${element.title}</h5>
                        <p class="cardtext">${element.text}</p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary" style="display:block;">Delete Note</button>
                </div>
                
            </div>
                `;
    });


    let notesElm = document.getElementById('notes');
        if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show, use "Add a Note" section above to add notes.`
    }
}




//function to delete notes
function deleteNote(index) {
    console.log('Deleting the note', index);//2--------
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);

    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();

}


//search function
let search = document.getElementById("searchtxt")
search.addEventListener("input", function () {
    let inputVal = search.value;

    console.log("input event done..", inputVal);//3--------
    let notecard = document.getElementsByClassName("noteCard");
    Array.from(notecard).forEach(function (element) {
        let cardtxt = element.getElementsByTagName("p")[0].innerText;
        let cardtitle = element.getElementsByTagName("h5")[0].innerText;
        if (cardtxt.includes(inputVal) || cardtitle.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        console.log(cardtxt)//4------

    })

})

//search button function
let search1 = document.getElementById("search")
search1.addEventListener("click", function () {
    console.log("search");
    searchtxt.value = ""
})


/*
1 addd title
2 mark a note as important
3 sparate notes by user
4 sync and host to web server
*/