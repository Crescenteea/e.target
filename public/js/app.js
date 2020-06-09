// 상태
let todos = [];
let menu = 'all';

// DOM Nodes
const $todos = document.querySelector('.todos');
const $nav = document.querySelector('.nav');

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
};

const getTodos = () => {
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false }
  ];
  render();
};

const navTabList = target => {
  const navItem = [...$nav.children].filter($navItem => $navItem.matches('.active'));
  navItem[0].classList.remove('active');

  target.classList.add('active');

  menu = target.id;
  render();
};


// 이벤트 핸들러 영역
window.onload = getTodos;

$nav.onclick = ({ target }) => {
  if (!target.matches('.nav > li:not(.active)')) return;
  navTabList(target);
};
