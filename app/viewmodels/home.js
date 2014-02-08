define(["knockout", "knockback",
 "durandal/app", "durandal/system",
 "collections/todos",
 "models/todo"], function (ko, kb, app, system, Todos, Todo) {
    var
        // Public Properties
        ActiveTodos = new Todos(),
        DoneTodos = new Todos(),
        todos = kb.collectionObservable(ActiveTodos),
        done = kb.collectionObservable(DoneTodos),
        selectedTodo = ko.observable(),
        todoText = ko.observable(),
        isLoading = ko.observable(false),
      
        // Private Properties
        messageTitle = "Application Message",
        message = "Hello from your application",

        // Event Handlers
        onTodoClick = function onTodoClick(note) {
            app.showMessage(note.content, note.title);
        },

        onButtonClick = function onButtonClick() {
            app.showMessage(message, messageTitle);
        },
        refreshData = function(){
            ActiveTodos.fetch({
             data:{ status: "Active" } , 
             success:function(){
                   isLoading(false);
            }});
            DoneTodos.fetch({
             data:{ status: "Done" } , 
             success:function(){
                   isLoading(false);
            }});
        },
        // Lifecycle Methods
        activate = function activate() {
            isLoading(true)
            refreshData()
        },
        deactivate = function deactivate() {
            selectedTodo(null);
        },
        markDone = function(id){
       
            var currentItem = ActiveTodos.get(id);
            if(!currentItem){
                alert("That thing is done")
            }
        
            currentItem.save({status:"Done"}, 
                { success: function(){
                    refreshData()
                }});
        },
        deleteItem = function(id){
            
            var currentItem = ActiveTodos.get(id);
            if(!currentItem){
                currentItem = DoneTodos.get(id);
            }
            currentItem.destroy( 
                { success: function(){
                    refreshData()
                }});
        },
        addTodo = function(){
            var newThing = new Todo({
                text: todoText(),
                status: "Active"
            });
            newThing.save({},{success:function(){
                refreshData()
            }});
        };


    return {
        todos: todos,
        done: done,
        deleteItem: deleteItem,
        markDone: markDone,
        todoText: todoText,
        addTodo:addTodo,
        selectedTodo: selectedTodo,
        isLoading: isLoading,

        onTodoClick: onTodoClick,
        onButtonClick: onButtonClick,

        activate: activate,
        deactivate: deactivate
    };
});
