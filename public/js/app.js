// 상태
let todos = [];
let menu = 'all';

// DOM Nodes
const $todos = document.querySelector('.todos');
const $nav = document.querySelector('.nav');
const $clearCompleted = document.querySelector('.clear-completed > .btn');
const $completedTodos = document.querySelector('.completed-todos');
const $activeTodos = document.querySelector('.active-todos');
const $inputTodo = document.querySelector('.input-todo');


// 함수 영역
const render = () => {
  const _todos = menu === 'active'
    ? todos.filter(item => !item.completed)
    : menu === 'completed'
      ? todos.filter(item => item.completed)
      : todos;

  // console.log(_todos);

  let html = '';
  _todos.forEach(({ id, content, completed }) => {
    html += `<li id="${id}" class="todo-item">
    <input id="ck-${id}" class="checkbox" ${completed ? 'checked' : ''} type="checkbox">
    <label for="ck-${id}">${content}</label>
    <i class="remove-todo far fa-times-circle"></i>
    </li>`;
  });
  $todos.innerHTML = html;
  $completedTodos.textContent = todos.filter(todo => todo.completed).length;
  $activeTodos.textContent = todos.filter(todo => !todo.completed).length;
};

const getTodos = () => {
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: false },
    { id: 3, content: 'Javascript', completed: false }
  ];
  render();
};

const generateId = () => Math.max(...todos.map(todo => todo.id)) + 1;
const addTodo = content => {
  todos = [...todos, { id: generateId(), content, completed: false }];
};

const navTabList = target => {
  const navItem = [...$nav.children].filter($navItem => $navItem.matches('.active'));
  navItem[0].classList.remove('active');

  target.classList.add('active');

  menu = target.id;
  render();
};

const removeTodo = target => {
  todos = todos.filter(todo => +target.parentNode.id !== todo.id);
};

// 이벤트 핸들러 영역
window.onload = getTodos;

$nav.onclick = ({ target }) => {
  if (!target.matches('.nav > li:not(.active)')) return;
  navTabList(target);
};

$todos.onclick = ({ target }) => {
  if (!target.matches('.todos > li > i')) return;
  removeTodo(target);
  render();
};

$clearCompleted.onclick = () => {
  todos = todos.filter(todo => !todo.completed);
  render();
};

$inputTodo.onkeyup = e => {
  if (e.keyCode !== 13 || e.target.value === '') return;
  addTodo(e.target.value);
  e.target.value = '';
  render();
};

// 1. onchange가 발생하면
// 2. target의 부모 아이디와 todo의 id가 일치하면
// 3. 일치하는 요소만 completed의 값을 전환시킨다.

$todos.onchange = ({ target }) => {
  // console.log(target);
  // todos.map(todo => ({ ...todo, completed: !todo.completed }));
  // todos = todos.map(function (todo) {
  //   if (+target.parentNode.id === todo.id) {
  //     return ({ ...todo, completed: !todo.completed });
  //   }
  //   return todo;
  // });
  todos = todos.map(todo => (+target.parentNode.id === todo.id 
    ? ({ ...todo, completed: !todo.completed })
    : todo
  ));
  console.log(todos);
  render();
};
