// 상태
let todos = [];
let _todos = [];
let nav = 'all';

// DOM Nodes
const $todos = document.querySelector('.todos');
const $nav = document.querySelector('.nav');

// 함수 영역
const render = () => {
  let html = '';

  // if (nav === 'active') {
  //  _todos = todos.filter(todo => !todo.completed);
  // };

  // if (nav === 'completed') {
  //   _todos = todos.filter(todo => todo.completed);
  //  };


  // _todos = todos.filter(todo => {
  //   nav === 'active' || nav === 'completed' ? (!todo.completed ? !todo.completed : todo.completed ) : todo.completed
  // )});

  _todos = todos.filter(todo => nav === 'active' || nav === 'completed' ? !todo.completed : (todo.completed ? todo.completed : !todo.completed));


  if (nav === 'all') {
    _todos = todos;
  };


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

// const activeTodos = () => {
//   todos.filter(todo => todo.completed === false);
//   render();
// };


// const completedTodos = () => {
//   todos.filter(todo => todo.completed === true);
//   render();
// };

const navTabList = target => {
  const navItem = [...$nav.children].filter($navItem => $navItem.matches('.active'));
  navItem[0].classList.remove('active');

  target.classList.add('active');

// --------------------------------------------------------------------
  nav = target.id;

// nav tab 중 하나가 클릭되면
// active가 target일 경우
// target의 id가 active이면 filter해서 completed 값이 false인 것들만 그린다
  // if (target.id === 'active') {
  //   activeTodos();
  // };

  // if (target.id === 'completed') {
  //   completedTodos();
  // };
  render();
};


// 이벤트 핸들러 영역
window.onload = getTodos;

$nav.onclick = ({ target }) => {
  if (!target.matches('.nav > li:not(.active)')) return;
  navTabList(target);
};
