import 'package:todo3/models/todo.dart';

class TodoDefault{
  List<Todo> dummyTodos = [
    Todo(id: 1, title: '플러터', description: '플러터 설명.'),
    Todo(id: 2, title: '서점 가기', description: '서점 책.'),
    Todo(id: 3, title: '공원 가기', description: '나들이.'),
    Todo(id: 4, title: '춤 추기', description: '댄싱..'),
  ];

  List<Todo> getTodos(){
    return dummyTodos;
  }

  Todo getTodo(int id){
    return dummyTodos[id];
  }

  Todo addTodo(Todo todo){
    Todo newTodo = Todo(id: dummyTodos.length+1, title: todo.title, description: todo.description);
    dummyTodos.add(newTodo);
    return newTodo;
  }

  void deleteTodo(int id){
    for(int i=0; i<dummyTodos.length; i++){
      if(dummyTodos[i].id == id){
        dummyTodos.removeAt(i);
      }
    }
  }

  void updateTodo(Todo todo){
    for(int i=0; i<dummyTodos.length; i++){
      if(dummyTodos[i].id == todo.id){
        dummyTodos[i] = todo;
      }
    }
  }
}