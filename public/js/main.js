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
const $completeAll = document.getElementById('ck-complete-all');

// Function
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

const generateId = () => Math.max(0, ...todos.map(todo => todo.id)) + 1;

const markAll = target => {
  todos = todos.map(todo => ({ ...todo, completed: target.checked }));
};

const navTabList = target => {
  const navItem = [...$nav.children].filter($navItem => $navItem.matches('.active'));
  navItem[0].classList.remove('active');

  target.classList.add('active');

  menu = target.id;
  render();
};

// Ajax
const fetchTodos = () => {
  const xhr = new XMLHttpRequest();
  // 1. 요청 생성
  xhr.open('GET', 'http://localhost:3000/todos');
  // 2. 요청을 보낸다.
  xhr.send();
  // 3. 서버의 응답을 기다린다.
  xhr.onload = () => {
    if (xhr.status === 200 || xhr.status === 201) {
      console.log('get success');
      todos = JSON.parse(xhr.response);
      console.log(todos);
      // 2. todos를 렌더한다.
      render();
    } else {
      throw new Error('get failed');
    }
  };
};

const postTodo = content => {
  const newTodo = { id: generateId(), content, completed: false };
  todos = [newTodo, ...todos];

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3000/todos');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(newTodo));

  xhr.onload = () => {
    if (xhr.status === 200 || xhr.status === 201) {
      console.log('post success');
      render();
    } else {
      throw new Error('post failed');
    }
  };
};

const removeTodo = target => {
  const targetId = +target.parentNode.id;
  todos = todos.filter(todo => targetId !== todo.id);
  if (!todos.length) $completeAll.checked = false;

  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', `http://localhost:3000/todos/${targetId}`);
  xhr.send();
  xhr.onload = () => {
    if (xhr.status === 200 || xhr.status === 201) {
      console.log('delete success');
      render();
    } else {
      throw new Error('delete failed');
    }
  };
};

// Event Handler
window.onload = () => {
  // 1. 서버로부터 todos를 가져온다.
  fetchTodos();
};

$inputTodo.onkeyup = e => {
  if (e.keyCode !== 13 || e.target.value === '') return;
  postTodo(e.target.value.trim());
  e.target.value = '';
};

$todos.onclick = ({ target }) => {
  if (!target.matches('.todos > li > i')) return;
  removeTodo(target);
};

$todos.onchange = ({ target }) => {
  todos = todos.map(todo => (+target.parentNode.id === todo.id
    ? ({ ...todo, completed: !todo.completed })
    : todo
  ));
  $completeAll.checked = todos.length === todos.filter(({ completed }) => completed).length;
};

$clearCompleted.onclick = () => {
  todos = todos.filter(todo => !todo.completed);
  if (!todos.length) $completeAll.checked = false;
  render();
};

$completeAll.onchange = ({ target }) => {
  markAll(target);
  render();
};

$nav.onclick = ({ target }) => {
  if (!target.matches('.nav > li:not(.active)')) return;
  navTabList(target);
};
