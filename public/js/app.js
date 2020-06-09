// State
const $nav = document.querySelector('.nav');

// 1. active class가 붙은 list를 찾아 class를 없앤다.
// 2. 클릭한 요소는 add class

const navTabList = target => {
  const navItem = [...$nav.children].filter($navItem => $navItem.matches('.active'));
  navItem[0].classList.remove('active');

  target.classList.add('active');
};

$nav.onclick = ({ target }) => {
  if (!target.matches('.nav > li:not(.active)')) return;
  navTabList(target);
};
