(function()
{
	let app = {
		addNoteButton: document.getElementById('addNoteButton'),
		noteTextBox: document.getElementById('noteTextBox'),
		colorNames: document.getElementById('colorNames'),
		errorMessage: document.getElementById('errorMessage'),
		noteBeingEdited: null,

		init: function() {
			this.addNoteButton.addEventListener('click', app.createNote);
		},

		createNote: function(){
			//check if inputs are empty and give user feedback
			if(app.noteTextBox.value.length < 1){
				app.errorMessage.innerHTML = '<span>*Values required</span>';
				return;
			}
			else // add inputs to object and pass to addNote
			{
				app.errorMessage.innerHTML = '<span></span>';

				let note = new Object();
				note.noteText = app.noteTextBox.value;
				note.colorNames = app.colorNames.value;

				app.addNote(note);
			}
		},

		addNote: function(note){

			let li = document.createElement('li'),
			deleteBtn = document.createElement('span'),
			editBtn = document.createElement('span'),
			noteText = document.createElement(`span`),
			notesElement = document.getElementById('notes');
			noteText.id ='noteText';

			// create buttons with listeners
			deleteBtn.ClassName = 'deleteBtn';
			deleteBtn.innerHTML = '<button id="deleteBtn">Delete</button>';
			deleteBtn.addEventListener('click', app.deleteNote);

			editBtn.ClassName = 'deleteBtn';
			editBtn.innerHTML = '<button id="deleteBtn">Edit</button>';
			editBtn.addEventListener('click', app.editNote);

			//assign css rule
			noteText.ClassName = 'noteText';
			noteText.innerHTML = note.noteText;

			li.style.backgroundColor = note.colorNames; //add color

			// append the spans to each other and then to the UL element
			li.appendChild(deleteBtn);
			li.appendChild(editBtn);
			li.appendChild(noteText);
			notesElement.appendChild(li);

			// reset textbox
			document.getElementById('noteTextBox').value = "";
		},

		// Delete by removing the parent list item tag
		deleteNote: function(){
			this.parentNode.remove();
		},

		editNote: function(){
			// check that a note is already being edited or not before proceeding
			if(!document.getElementById('saveButton') && !document.getElementById('saveButton'))
			{
				let saveButton = document.createElement('span'),
				cancelButton = document.createElement('span'),
				message = null;

				// add context of current note to a global variable
				app.noteBeingEdited = this.parentNode;

				// disable addNote button
				app.addNoteButton.disabled = true;

				// create save and cancel button
				saveButton.ClassName = 'button';
				saveButton.innerHTML = '<button id="saveButton">Save</button>';
				saveButton.addEventListener('click', app.updateNote);		

				cancelButton.ClassName = 'button';
				cancelButton.innerHTML = '<button id="cancelButton">Cancel</button>';
				cancelButton.addEventListener('click', app.resetTextBox);	

				// append buttons to noteTaker
				document.getElementById('noteTaker').appendChild(saveButton);
				document.getElementById('noteTaker').appendChild(cancelButton);

				// edit the html header for edit mode
				document.getElementById('header').innerHTML ='Edit Current Note';

				// Search through the child nodes to find the note string, 
				// then add it to the textbox for editing.
				for(var i = 0; i < app.noteBeingEdited.childNodes.length; i++) 
				{
					let child = app.noteBeingEdited.childNodes[i];
					if(child.ClassName === 'noteText') 
					{
							message = child.innerText;
					}
				}
				if (message)
				{
					document.getElementById('noteTextBox').value = message;
				}
			}
			else
			{
				alert('In edit mode. Press cancel to leave.');
			}
		},

		updateNote: function(){

			// go through the global variables context to find the child node
			// and set its values to that of the inputs
			for(var i = 0; i < app.noteBeingEdited.childNodes.length; i++) 
				{
					let child = app.noteBeingEdited.childNodes[i];
		        	if(child.ClassName === 'noteText') 
		        	{
						child.innerText = app.noteTextBox.value;
						app.noteBeingEdited.style.backgroundColor = app.colorNames.value;
					}
				}
				// reset the global variable and reset the inputs
				app.noteBeingEdited = null;
				app.resetTextBox();
		},

		resetTextBox: function(){
			document.getElementById('header').innerHTML ='Write New Note:';
			document.getElementById('saveButton').remove();
			document.getElementById('cancelButton').remove();
			document.getElementById('noteTextBox').value = "";

			// enable addNote button
			app.addNoteButton.disabled = false;
		},
	}

	app.init();
})();

