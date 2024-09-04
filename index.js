const {Command} = require('commander');
const fs = require('fs');

const todoFile = 'todos.json';
const program = new Command;

program
    .name('Todo-CLI')
    .description('A command based todo application')
    .version('1.0.0');

program
    .command('add <todo>')
    .description('Adding a new task')
    .action((todo)=>{
        const todos = getAllTodo();
        todos.push({task:todo, status:false});
        updateTodo(todos);
        console.log(`"${todo}" is added`);
    });
program
    .command('delete <index>')
    .description("Deleteing Todo by index")
    .action((index)=>{
        const todos = getAllTodo();
        if(index >= 0 && index < todos.length){
            const deleteTodo = todos.splice(index,1);
            updateTodo(todos);
            console.log(`"${deleteTodo[0].task}": Task deleted`);
        }
        else{
            console.log('Invalid index');
        }
    });
program
    .command('edit <index> <newTask>')
    .description('Modifing task my index')
    .action((index,newTask)=>{
        const todos = getAllTodo();
        if(index >=0 && index < todos.length){                
            todos[index].task = newTask;
            updateTodo(todos);
            console.log(`Todo no: "${index}" is modified`);
        }
        else{
            console.log('Invalid index');
        }
    });
program
    .command('done <index>')
    .description('Updating status of the task')
    .action((index) =>{
        const todos = getAllTodo();
        if(index >= 0 && index < todos.length){
           todos[index].status = true;
           updateTodo(todos);
           console.log(`Todo no: ${index} "${todos[index].task} "done`)
        }
        else{
            console.log('Invalid index');
        }
    });
program
    .command('listAll')
    .description('Listing all Tasks')
    .action(()=>{
        const todos = getAllTodo();
        todos.forEach((todo,index)=>{
            const done = todo.status ? '[✓]' : '[ ]';
            console.log(`${index}. ${todo.task}--${done}`);
        })
    });
program
    .command('clearAll')
    .description('Deleting all todo')
    .action(()=>{
        const todos = [];
        updateTodo(todos);
        console.log('All task deleted');
    });

function getAllTodo(){
    try{
        const dataBuffer = fs.readFileSync(todoFile);
        return JSON.parse(dataBuffer.toString());
    }catch(e){
        console.log(e);
        return [];
    }
}
function updateTodo(todos){
    fs.writeFileSync(todoFile,JSON.stringify(todos));
}

program.parse(process.argv);
