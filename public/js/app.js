// 상태
let todos = [];

const $todos = document.querySelector('.todos');

// 함수 영역
const render = () => {
  let html = '';
  todos.forEach(({ id, content, completed }) => {
    html += `<li id="${id}" class="todo-item">
        <input id="ck-${id}" class="checkbox" ${completed ? 'checked' : ''} type="checkbox">
        <label for="ck-${id}">${content}</label>
        <i class="remove-todo far fa-times-circle"></i>
        </li>`;
  });
  console.log(todos);
  $todos.innerHTML = html;
};

window.onload = () => {
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false }
  ];
  console.log(todos);
  render();
};
