<template>
	<div id="notes container">
		<h2>{{ msg }}</h2>
		<input id="newNote" type="text" class="form-control" placeholder="What do you want to remember?" 
		v-model="newTask" 
		@keypress.enter="newNote">
		<div class="dropdown-divider"></div>
		<small> {{countNotes(notes)}} pending tasks of a total {{notes.length}} | <b v-on:click="deleteCompleteNotes">Delete completed tasks</b></small>
		<div class="dropdown-divider"></div>		
		<ul class="list-group">
			<transition-group
				name="custom-classes-transition" 
                enter-active-class="animated fadeInLeft"
				leave-active-class="animated fadeOutRight">
			<li class="list-group-item" v-for="note in orderNotes" v-bind:key="note">
				<div class="container">               
					<div class="row">
						<div class="col-1 icon-note">
							<img class="complete" v-if="note.state == true" src="../assets/circle_tick.png" v-on:click="changeStatus(note)">
							<img class="incomplete" v-else src="../assets/circle.png" v-on:click="changeStatus(note)">
						</div>
						<div class="col-10">
							<div class="row">
								<h4 v-if="note.state == true" class="col-12 title-complete">{{ note.task }}</h4>
								<h4 v-else class="col-12 title-incomplete">{{ note.task }}</h4>
								<small class="col-6 priority">
									Priority:
									<!-- LOW -->
									<button v-if="note.priority == '1'" v-on:click="priorityLow(note)" class="low col-xs-12">Low</button>
									<button v-else v-on:click="priorityLow(note)" class="disable col-xs-12">Low</button>
									<!-- NORMAL -->
									<button v-if="note.priority == '2'" v-on:click="priorityNormal(note)" class="normal col-xs-12">Normal</button>
									<button v-else v-on:click="priorityNormal(note)" class="disable col-xs-12">Normal</button>
									<!-- HIGH -->
									<button v-if="note.priority == '3'" v-on:click="priorityHigh(note)" class="high col-xs-12">High</button>
									<button v-else v-on:click="priorityHigh(note)" class="disable col-xs-12">High</button>
								</small>
								<small class="col-6">Date: {{ note.date_creation }}</small>
								<!-- <p>Complete: {{ note.state }}</p> -->
							</div>							
						</div>
						<div class="col-1 icon-note">
							<img class="delete" src="../assets/delete.png" v-on:click="deleteNotes(note)">
						</div>				
					</div>
                </div>
			</li>
			</transition-group>			
		</ul>
		<h2 class="search">Search Task</h2>
		<div class="dropdown-divider"></div>
		<input type="text" class="form-control" placeholder="Search"
			v-model="searchTask">
		<ul class="list-group">
			<transition-group
				name="custom-classes-transition" 
                enter-active-class="animated fadeInLeft"
				leave-active-class="animated fadeOutRight">
			<li class="list-group-item" v-for="noteFilter in filteredList" v-bind:key="noteFilter">
				<div class="container">               
					<div class="row">
						<div class="col-1 icon-note">
							<img class="complete" v-if="noteFilter.state == true" src="../assets/circle_tick.png" v-on:click="changeStatus(noteFilter)">
							<img class="incomplete" v-else src="../assets/circle.png" v-on:click="changeStatus(noteFilter)">
						</div>
						<div class="col-10">
							<div class="row">
								<h4 v-if="noteFilter.state == true" class="col-12 title-complete">{{ noteFilter.task }}</h4>
								<h4 v-else class="col-12 title-incomplete">{{ noteFilter.task }}</h4>
								<small class="col-6 priority">
									Priority:
									<!-- LOW -->
									<button v-if="noteFilter.priority == '1'" v-on:click="priorityLow(noteFilter)" class="low col-xs-12">Low</button>
									<button v-else v-on:click="priorityLow(noteFilter)" class="disable col-xs-12">Low</button>
									<!-- NORMAL -->
									<button v-if="noteFilter.priority == '2'" v-on:click="priorityNormal(noteFilter)" class="normal col-xs-12">Normal</button>
									<button v-else v-on:click="priorityNormal(noteFilter)" class="disable col-xs-12">Normal</button>
									<!-- HIGH -->
									<button v-if="noteFilter.priority == '3'" v-on:click="priorityHigh(noteFilter)" class="high col-xs-12">High</button>
									<button v-else v-on:click="priorityHigh(noteFilter)" class="disable col-xs-12">High</button>
								</small>
								<small class="col-6">Date: {{ noteFilter.date_creation }}</small>
								<!-- <p>Complete: {{ note.state }}</p> -->
							</div>							
						</div>
						<div class="col-1 icon-note">
							<img class="delete" src="../assets/delete.png" v-on:click="deleteNotes(noteFilter)">
						</div>				
					</div>
                </div>
			</li>
			</transition-group>
		</ul>
	</div>		
</template>

<script>
	export default {
		name: 'Todo',
		props: {
			msg: String
		},
		data: function(){
			return{
				notes: [],
				newTask: "",
				searchTask: "",
				notesOrder: [],
				seekerTask: []
			}
		},
		methods: {
			countNotes: function(notes){
				var result = 0;
				for(let i = 0; i < notes.length; i++){
					if(notes[i].state == false){
						result++;
					}
				}
				return result;
			},
			newNote: function(){
				if(this.newTask != ""){
					var task = this.newTask;
					var priority = parseInt((Math.random() * 3 ) + 1);
					var date_creation = new Date().toLocaleString();
					var state = false;

					this.notes.push({task,priority,date_creation,state});
				}
				this.newTask = "";
			},
			deleteCompleteNotes: function(){
				var notes = this.notes;
				for(let i = notes.length-1; i >= 0; i--){
					if(notes[i].state == true){
						notes.splice(i,1);
					}
				}
			},
			deleteNotes: function(note){
				var notes = this.notes;
				for(let i = 0; i < notes.length; i++){
					if(notes[i] == note){
						notes.splice(i,1);
					}
				}
			},
			changeStatus: function(note){
				note.state = !note.state;
			},
			priorityLow: function(note){
				note.priority = "1";
			},
			priorityNormal: function(note){
				note.priority = "2";
			},
			priorityHigh: function(note){;
				note.priority = "3";
			}
		},
		computed: {
			orderNotes: function(){
				var notes = this.notes;				
				this.notesOrder = [];
				for(let i = 0; i < notes.length; i++){
					if(notes[i].priority == 3){
						this.notesOrder.push(notes[i]);
					}
				}
				for(let i = 0; i < notes.length; i++){
					if(notes[i].priority == 2){
						this.notesOrder.push(notes[i]);
					}
				}
				for(let i = 0; i < notes.length; i++){
					if(notes[i].priority == 1){
						this.notesOrder.push(notes[i]);
					}
				}
				return this.notesOrder;
			},
			filteredList: function() {
				if(this.searchTask == "" || this.searchTask == " "){
					return null;
				}else{
					return this.notes.filter(note => {
						return note.task.toLowerCase().includes(this.searchTask.toLowerCase());
					})
				}		
			}
		},
		mounted: function(){			
			if (localStorage.getItem("notes") != null) {
				this.notes = JSON.parse(localStorage.getItem("notes"));
			}
		},
		updated: function() {
			localStorage.setItem("notes", JSON.stringify(this.notes));
		}
	}
</script>

<style scoped>
	h2{
		color: white;
		margin-top: 15px;
	}

	h2.search{
		margin-top: 25px;
	}

	h4::first-letter{
		text-transform: uppercase;
	}

	ul{
		margin: 15px 0px;
	}

	ul,li{
		color: white;
		background-color: #303030 !important;
	}

	input{
		margin: 20px 0px;
		height: 70px;
	}

	small{
		margin: 20px 0 !important;
		color: white;
	}
	
	small b{
		color: #f39c13;
	}

	.complete,.incomplete{
		width: 40px;
	}

	.delete{
		width: 25px;
	}

	.title-complete{
		color: #00bb8b;
		text-decoration:line-through;
	}

	small button:nth-child(2){
		margin: 0px 5px;
	}

	small.priority button{
		-moz-border-radius:6px;
		-webkit-border-radius:6px;
		border-radius:6px;
		display:inline-block;
		cursor:pointer;
		color:#ffffff;
		font-size:10px;
		font-weight:bold;
		padding:6px 15px;
		text-decoration:none;
	}

	.disable{
		background-color:#464545;
		-moz-border-radius:6px;
		-webkit-border-radius:6px;
		border-radius:6px;
		border:1px solid #464545;
		display:inline-block;
		cursor:pointer;
		color:#ffffff;
		font-family:Arial;
		font-size:10px;
		font-weight:bold;
		padding:6px 15px;
		text-decoration:none;
	}

	.low{
		background-color:#17a2b8;
		border:1px solid #17a2b8;
	}

	.normal{
		background-color:#375a7f;
		border:1px solid #375a7f;
	}

	.high{
		background-color:#e74d3d;
		border:1px solid #e74d3d;
	}

	.icon-note{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

</style>
