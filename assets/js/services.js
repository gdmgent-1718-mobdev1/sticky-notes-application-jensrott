/*
ApplicationDbContext
--------------------
1) Database transactions: CRUD operations
2) Cache for loaded content / data
*/
var ApplicationDbContext = {
    "init": function(connectionStr) {
        this._connectionStr = connectionStr; // Connection String to the key in the localstorage
        this._dbData = {
            "info": {
                "title": "StickyNotes Application",
                "version": "1.0.",
                "modified": "2017-10-13",
                "author": "Philippe De Pauw - Waterschoot"
            },
            "settings": {},
            "stickynotes": []
        }; 
        if(window.localStorage.getItem(this._connectionStr) != null) {
            this._dbData = JSON.parse(window.localStorage.getItem(this._connectionStr));
        } else {
            window.localStorage.setItem(this._connectionStr, JSON.stringify(this._dbData));
        }
    },
    
    "getStickyNotes": function() {
        const data = this._dbData.stickynotes;

        if(data == null || (data != null && data.length == 0)) {
            return null;
        }
        return data;
    },


    "getStickyNoteById": function(id) {
        const data = this._dbData.stickynotes;
        if(data == null) {
            return null;
        }

        // Ugly written
        let match = false, i = 0, stickyNote;
        while(!match && i < data.length) {
            stickyNote = data[i];
            if(stickyNote.id === id) {
                match = true;
            } else {
                i++;
            }
        }      
        if(match) {
            return stickyNote;
        }
        return null;
    },
  
    "addStickyNote": function(stickyNote) {

        if(stickyNote != undefined && stickyNote != null) {
            stickyNote.id = new Date().getTime() + Math.round(Math.random()*new Date().getTime()); // create unique id
            stickyNote.createdDate = new Date().getTime(); // generate timestamp
            this._dbData.stickynotes.push(stickyNote); // Add sticky note to the array stickynotes
            this.save(); // Save this._dbData to the localstorage
            return stickyNote; // return the sticky note to the caller

        function generate() {

        }

        }
        return null; // Else return null

    
    },

    "findIndexStickyNoteById": function(id) {
        const data = this.getStickyNotes();
        if(data == null) {
            return -1;
        }

        const snFromDB = this.getStickyNoteById(id);
        if(snFromDB == null) {
            return -1;
        }

        // Ugly
        let match = false, i = 0, stickyNote;
        while(!match && i < data.length) {
            stickyNote = data[i];
            if(stickyNote.id === id) {
                match = true;
            } else {
                i++;
            }
        }      
        if(match) {
            return i;
        }
        return -1;
    },
    // Update an existing sticky note dat al bestaat natuurlijk
    "updateStickyNote": function(stickyNote) {
        // 1. Get the index of the sticky note 
        // 2. Replace element in array
        // 3. Save to the local storage
        // 4. Return true if succeeded otherwise false        
        const index = this.findIndexStickyNoteById(stickyNote.id);
        if(index == -1) {
            return false;
        }
        this._dbData.stickynotes[index] = stickyNote;
        this.save();
        return true;
    },
    // Delete an exisiting sticky note, dus er moeten er eerst wel zijn
    "deleteStickyNoteById": function(id) {
        // 1. Get the index of the sticky note 
        // 2. Remove element from the array
        // 3. Save to the local storage
        // 4. Return true if succeeded otherwise false        
        const index = this.findIndexStickyNoteById(id);
        if(index == -1) {
            return false;
        }
        this._dbData.stickynotes.splice(index, 1);
        this.save();
        return true;
    },
    // Soft delete an exisiting sticky note, we voegen gewoon een softdelete toe ze is dus niet verwijdert van de lijst
    "softDeleteStickyNoteById": function(id) {
        // 1. Get the index of the sticky note 
        // 2. Replace element from the array
        // 3. Save to the local storage
        // 4. Return true if succeeded otherwise false        
        const index = this.findIndexStickyNoteById(id);
        if(index == -1) {
            return false;
        }
        const stickyNote = this.getStickyNoteById(id);
        if(stickyNote == null) {
            return false;
        }
        stickyNote.deletedDate = new Date().getTime();
        this._dbData.stickynotes[index] = stickyNote;
        this.save();
        return true;
    },
    // Soft un-delete an exisiting sticky note, we halen die softdelelte er terug uit
    "softUnDeleteStickyNoteById": function(id) {
        // 1. Get the index of the sticky note 
        // 2. Replace element from the array
        // 3. Save to the local storage
        // 4. Return true if succeeded otherwise false        
        const index = this.findIndexStickyNoteById(id);
        if(index == -1) {
            return false;
        }
        const stickyNote = this.getStickyNoteById(id);
        if(stickyNote == null) {
            return false;
        }
        stickyNote.deletedDate = null;
        this._dbData.stickynotes[index] = stickyNote;
        this.save();
        return true;
    },

    // This is a test needs to be removed later
    "theSettings" : function() {
        
        let settings =  this._dbData.settings;
        console.log("The settings: " + settings);
    
    },
    
    "save": function() {

        window.localStorage.setItem(this._connectionStr, JSON.stringify(this._dbData)); // Write the _dbData into the localstorage via the key
        return true; // Always true in modern webbrowsers

    },

    
};