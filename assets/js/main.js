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


/*
            // 1. Get all sticky notes
            let data = this._applicationDbContext.getStickyNotes();

            console.log("De eerste data object" + data);

            // 2. Create a new sticky note
            // We updaten de sticknote altijd   
            let sn = new StickyNote();

            // De ids zijn verschillend voor iedereen zijn computer, ik moet dit dus nog aanpassen

            let myInput = document.querySelector("myInput");
            sn.message = myInput; // Maak een message
            sn = this._applicationDbContext.addStickyNote(sn); // add to db and save it, saving happens in addStickyNote, dit staat in services.js
            
            
            

            // 3. Get alle sticky notes
            data = this._applicationDbContext.getStickyNotes();
            console.log("Wat de data wordt " + data);

            // 4. Get sticky note by id
            sn = this._applicationDbContext.getStickyNoteById(2934685804658); // De id 2998498... selecteren we uit de localstorage
            console.log("The stickynote by ID: " + sn);

            // 5. Delete sticky note by id 
            const deleted = this._applicationDbContext.deleteStickyNoteById(2934685804658); // Eerst verwijderen we deze stickyNote
            console.log("Deleting the sticky note: if done return true " + deleted);

            // 6. Soft Delete sticky note with id: 1551637732407
            //const softDeleted = this._applicationDbContext.softDeleteStickyNoteById(2934685804658);
            //console.log(softDeleted);

            //sn = this._applicationDbContext.getStickyNoteById(2934685804658);
            //console.log(sn);

            // 6. Soft Delete sticky note with id: 1551637732407
            const softUnDeleted = this._applicationDbContext.softUnDeleteStickyNoteById(2934685804658);
            console.log("softundelte: If done return true: " + softUnDeleted);

            sn = this._applicationDbContext.getStickyNoteById(2934685804658); // We selecteren de stickynote die we willen updaten en geven die de id waarmee ze geupdated moeten worden
            console.log("The stickynote by ID: " + sn);

            // Update sticky note with id: 2934685804658
            sn = this._applicationDbContext.getStickyNoteById(2968625119401); // We selecteren de stickynote waar het moeten komen 
                                                                             // en updaten deze met message
            console.log("The stickynote by ID: " + sn);
            
            sn.message = 'ik heb zin in een zwarte kat (koffie)...';
            
            // De laatste twee zijn de enige die een andere ID moeten hebben!!!
            const updated = this._applicationDbContext.updateStickyNote(2968625119401); // We updaten onze stickynote met een nieuwe ID 
                                                                                        //die we hebben geselecteerd uit de localstorage
            console.log("We update the Id: " + updated);

            // We updaten the sticknote nadat we ze hebben geupdate.
            sn = this._applicationDbContext.getStickyNoteById(2968625119401);
            console.log("We updated the stickyNote with the Id" + sn);

            // The settings, console.log() result is undefined
            let settings = this._applicationDbContext.theSettings();
            console.log("Test with the settings: " + settings);

            // We moeten het hier toch eens oproepen anders werkt het niet
            let generateUI = this._applicationDbContext.generateUI(); */
            

