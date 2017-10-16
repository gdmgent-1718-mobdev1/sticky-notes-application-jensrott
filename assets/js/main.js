function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};


ready(function(){

    var App = {
        "init": function() {
            this._applicationDbContext = ApplicationDbContext; // Reference to the ApplicationDbContext object
            this._applicationDbContext.init('ahs.nmd.stickynotes'); // Intialize the ApplicationDbContext with the connection string as parameter value
            this.testApplicationDbContext(); // Test DbContext
        },
        "testApplicationDbContext": function() {
            // 1. Get all sticky notes
            let data = this._applicationDbContext.getStickyNotes();
            console.log("De eerste data " + data);

            // 2. Create a new sticky note
            // We updaten sn altijd
            let sn = new StickyNote();

            // De ids zijn verschillend voor iedereen zijn computer, ik moet dit dus nog aanpassen
            sn.message = 'Pak cola zero voor mezelf.';
            sn = this._applicationDbContext.addStickyNote(sn); // add to db and save it, saving happens in addStickyNote, dit staat in services.js

            // 3. Get alle sticky notes
            data = this._applicationDbContext.getStickyNotes();
            console.log("Wat de data wordt " + data);

            // 4. Get sticky note by id
            sn = this._applicationDbContext.getStickyNoteById(2611110360970);
            console.log("The stickynote by ID: " + sn);

            // 5. Delete sticky note by id
            const deleted = this._applicationDbContext.deleteStickyNoteById(2611110360970);
            console.log("Deleting the sticky note: " + deleted);

            // 6. Soft Delete sticky note with id: 1551637732407
            //const softDeleted = this._applicationDbContext.softDeleteStickyNoteById(1551637732407);
            //console.log(softDeleted);

            //sn = this._applicationDbContext.getStickyNoteById(1551637732407);
            //console.log(sn);

            // 6. Soft Delete sticky note with id: 1551637732407
            const softUnDeleted = this._applicationDbContext.softUnDeleteStickyNoteById(1551637732407);
            console.log(softUnDeleted);

            sn = this._applicationDbContext.getStickyNoteById(1551637732407);
            console.log(sn);

            // Update sticky note with id: 1902577181167
            sn = this._applicationDbContext.getStickyNoteById(1902577181167);
            console.log(sn);
            sn.message = 'ik heb zin in een zwarte kat (koffie)...';

            const updated = this._applicationDbContext.updateStickyNote(1902577181167);
            console.log("We update the Id: " + updated);

            // We updaten the sticknote nadat we ze hebben geupdate.
            sn = this._applicationDbContext.getStickyNoteById(1902577181167);
            console.log("We updated the stickyNote with the Id" + sn);
        }
    };

    App.init(); // Initialize the application
});