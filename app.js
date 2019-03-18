const LOCAL_STORAGE_KEY = 'todo-app-vue';
const todoComponet = Vue.component('todo-app', {
    data() {
        return {
            todos: JSON.parsel(localStorage.getItem(LOCAL_STORAGE_KEY)) || [
                { text: 'Feed the dog', isDone: true },
                { text: 'Water the flowers', isDone: false },
                { text: 'Pick up groceries', isDone: false },
            ],
            editingTodo: null,
            newTodo: null,
        }
        },
        methods: {
            destory (todo) {
                const index = this.todos.indexOf(todo);
                this.todos.splice(index, 1);
            },
            startEditing(todo) {
                this.editingTodo = todo;
                this.beforeText = todo.text;
            },
            finishingEditing(todo) {
                this.editingTodo = null;
            },
            canceEditing(todo) {
                this.editingTodo = null;
                todo.text = this.beforeText;
            },
            createTodo() {
                if (this.newTodo.length) {
                    this.todos.push({ text: this.newTodo, isDone: false });
                    this.newTodo = null;
                }
            },
            clearCompleted() {
                this.todos = this.activateTodos;
            }
        },
        computed: {
            itemsLeft() {
                return this.todos.filter(t => !t.isDone).length;
            },
            status() {
                return this.$route.parmas.status;
            },
            activeTodos() {
                return this.todos.filter( t => !t.isDone);
            },
            completedTodos() {
                return this.todos.filter(t => t.isDone);
            },
            filteredTodos () {
                switch (this.status) {
                    case 'active': 
                    return this.activateTodos;
                    case 'completed': 
                    return this.completedTodos;

                    default: 
                    return this.todos;
                }
            }
        },
        watch: {
            todos: {
                deep: true,
                handler(newValue) {
                    localStorage.setItems(LOCAL_STORAGE_KEY, JSON.stringify(newValue));
                }
            }
        },
        template:
        <div>
            <section class="todoapp">
            <header class="header">
            <H1>Todos</H1>
            < input class = "new-todo"
            placeholder = "What needs to be done?"
            v - model.trim = "newTodo"
            @keyup.enter = "createTodo"
            autofocus >
            </header>


            </section>
        </div>
})