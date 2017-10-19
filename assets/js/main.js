// Hier de dingen linken naar de dom
function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};



ready(function(){

    var App = {

        "init": function() {
            this._applicationDbContext = ApplicationDbContext; // Reference to the ApplicationDbContext object that we can find in services.js
            this._applicationDbContext.init('ahs.nmd.stickynotes'); // Intialize the ApplicationDbContext with the connection string as parameter value uit service.js
            this.testApplicationDbContext(); // Initialize testApplicationDbContext
           
        },
        "testApplicationDbContext": function() {

            // Selecting from the DOM
            let createStickyNoteBtn = document.getElementById("addStickyNote");

            // Give it an evenlistener
            createStickyNoteBtn.addEventListener("click", createStickyNote, false);

            let containerForNotes = document.getElementById("container-card");

            function createStickyNote() {

                let valueInput = document.getElementById("stickyNoteValue").value;
                let textWarning = document.getElementById("textWarning");
    
                // First we check if there is a value in the input field.
                if(valueInput === "" || valueInput === null) {

                    textWarning.textContent = "Type in a message!";
    
                } else {

                    let sticknote = new StickyNote();
                    sticknote.message = valueInput;

                    let created = ApplicationDbContext.addStickyNote(sticknote);

                    containerForNotes.innerHTML = ` 
                    <div class="row mt-5">

                        <form>
                        <button id="deleteStickyNote" class="btn btn-primary">Delete the stickynote</button>
                        <button id="softDeleteStickyNote" class="btn btn-primary">Softdelete the stickynote</button>
                        <button id="softUndeleteStickyNote" class="btn btn-primary">Softundelete the stickynote</button>
                        <button id="updateStickyNote" class="btn btn-primary">Update the stickynote</button>
                        </form>

                    </div>
                    <div id="StickyNote" style="display:block"> ${valueInput} </div>`
                }
            }

            // We loop through all the stickynotes 
            let deleteStickyNoteBtn = document.querySelectorAll("#deleteStickyNote");
            function deleteStickyNote() {
                for(let i = 0; i < deleteStickyNoteBtn.length; i++) {
                    deleteStickyNoteBtn[i].addEventListener("click", function(event) {
                        let id = parseInt(this.id);
                        ApplicationDbContext.deleteStickyNoteById(id);
                    })
                }
            }

            // Loop
            let softDeleteStickyNoteBtn = document.querySelectorAll("#softDeleteStickyNote");
            function softDeleteStickyNote() {
                for(let i = 0; i < softDeleteStickyNoteBtn; i++) {
                    softDeleteStickyNoteBtn[i].addEventListener("click", function(event) {
                        let id = parseInt(this.id);
                        ApplicationDbContext.softDeleteStickyNoteById(id);
                    })
                }
            }

            // Loop
            let softUnDeleteStickyNoteBtn = document.querySelectorAll("#softUndeleteStickyNote");
            function softUnDeleteStickyNote() {
                for(let i = 0; i < softUnDeleteStickyNoteBtn; i++) {
                    softUnDeleteStickyNoteBtn[i].addEventListener("click", function(event) {
                        let id = parseInt(this.id);
                        ApplicationDbContext.softUnDeleteStickyNoteById(id);
                    })
                }
            }

            
            let updateStickyNoteBtn = document.querySelectorAll("#updateStickyNote");
            // Werkt niet, bedoeling om een prompt venster te krijgen en wat we daar invullen wordt onze nieuwe message
            function updateStickyNote() {
                for(let i = 0; i < updateStickyNoteBtn; i++) {
                    updateStickyNoteBtn[i].addEventListener("click", function(event) {
                        let message = prompt("Vul een message in aub");
                        let id = parseInt(this.id);
                        let stickynote = new StickyNote();
                        stickynote = ApplicationDbContext.getStickyNoteById();
                        stickynote.message = message.value;
                        ApplicationDbContext.updateStickyNote(stickynote);

                        containerForNotes.innerHTML = `<div id="StickyNote" style="display:block"> ${message}</div> `
                    })
                }
            } 
        },

      
    }  
    
    App.init(); // Initialize the application

});




