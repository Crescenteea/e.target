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
const $completeAll = document.querySelector('.complete-all')

// 함수 영역
const render = () => {
  const _todos = menu === 'active'
    ? todos.filter(item => !item.completed)
    : menu === 'completed'
      ? todos.filter(item => item.completed)
      : todos;

  console.log(_todos);

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
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false }
  ].sort((todo1, todo2) => todo2.id - todo1.id);
  render();
};

const generateId = () => Math.max(...todos.map(todo => todo.id)) + 1;

const addTodo = content => {
 todos = [{ id: generateId(), content, completed: false },...todos];
}

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

const markAll = target => {
  todos = todos.map(todo => ({ ...todo, completed: target.checked }));
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
  addTodo(e.target.value.trim());
  e.target.value = '';
  render();
};

$completeAll.onchange = ({ target }) => {
 markAll(target);
 render();
};


