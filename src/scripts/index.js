"use strict";

// Данные
let state = [...loadedState];

// Состояние
const stateOfView = {
  name: false,
  position: false,
  office: false,
  age: false,
  startdate: false,
  salary: false,
};

let currentPage = 0;
const sizeOfView = 10;
 
const removeOldView = (view, withOut = null) => {
  const mutableView = view;
  
  if (withOut) {
    mutableView.innerHTML = '';
    mutableView.appendChild(withOut);
  } else mutableView.innerHTML = '';

  return mutableView;
};

const getCurrentView = (arr) => (
  arr.slice(currentPage * sizeOfView, (currentPage + 1) * sizeOfView - 1)
);

const mountStateToView = () => {
  const routContainer = document.querySelector("#employeeTable");
  const headerOfRoutContainer = document.querySelector(".tableHeader");
  const paginationContainer = document.querySelector(".pagination");

  const newView = getCurrentView(state).map(({
    name,
    position,
    office,
    age,
    startdate,
    salary,
  }) => `
  <tr class="tableString">
    <td class="tableCell nameCell">${name}</td>
    <td class="tableCell positionCell">${position}</td>
    <td class="tableCell officeCell">${office}</td>
    <td class="tableCell ageCell">${age}</td>
    <td class="tableCell dateCell">${startdate}</td>
    <td class="tableCell salaryCell">${salary}</td>
  </tr>
  `).reduce(
    (acc, curr) => `${acc}${curr}`, 
    ''
  );

  removeOldView(routContainer, headerOfRoutContainer);
  removeOldView(paginationContainer);

  let paginationBtns = '';
  for(let i = 0; i < (Math.floor(state.length / sizeOfView) ); i++) {
    paginationBtns = `
      ${paginationBtns}
      <button class="pagination__btn ${i === currentPage ? 'pagination__btn--active' : ''}">
        ${i + 1}
      </button>
    `;
  }

  paginationBtns = `
    <button class="pagination_btn-previous">
      Previous
    </button>
    ${paginationBtns}
    <button class="pagination_btn-next">
      Next
    </button>
  `;

  routContainer.insertAdjacentHTML("beforeend", newView);
  paginationContainer.insertAdjacentHTML("beforeend", paginationBtns);

  [...document.querySelectorAll('.pagination__btn')].map(
    (btn, id) => {
      btn.addEventListener('click', changePaginationPage(id));
    }
  );
  document.querySelector('.pagination_btn-previous').addEventListener('click', paginationClicker(-1));
  document.querySelector('.pagination_btn-next').addEventListener('click', paginationClicker(1));
};

function changePaginationPage(newPage){
  return () => {
    currentPage = newPage;

    mountStateToView();
  }
};

function paginationClicker(pageCount){
  return () => {
    const maxPages = Math.floor(state.length / sizeOfView);
    const pageSum = currentPage + pageCount;
    
    if (pageSum > 0) {
      currentPage = (currentPage + pageCount) % maxPages;
    } else {
      currentPage = maxPages + pageSum;
    }

    mountStateToView();
  };
};

const changeState = (fieldName, value) => stateOfView[fieldName] = value;

const fieldOnClick = field => () => {
  currentPage = 0;
  const fieldValue = stateOfView[field];
  
  state.sort((user1, user2) => (
      fieldValue
       ? (user1[field] > user2[field]) - (user1[field] < user2[field])
       : (user1[field] < user2[field]) - (user1[field] > user2[field])
    )
  );

  changeState(field, !fieldValue);

  mountStateToView();
};

const searchOnClick = () => {
  currentPage = 0;
  const { value } = document.querySelector('#searchInput');

  if (value.replace(/ /g,'')) {
    state = loadedState.reduce( 
      (acc, user) => (
        Object.keys(user).reduce(
          (acc, key) => (
            acc || user[key].toString().toLowerCase().includes(value.toLowerCase())
          ),
          false
        )
          ? [...acc, user]
          : acc
        ),
      []
    );
  } else state = loadedState;
    
  mountStateToView();
};


const searchInputOnKeyDown = ({ keyCode }) => {
  if (keyCode === 13) {
    searchOnClick();
  }
}

const getMocks = sizeOfMocks => {
  const stringSpace = {
    name: ['Vasya', 'Kolya', 'Petya', 'Jenya', 'Sasha'],
    position: ['Developer', 'HR', 'Product Manager', 'Manager', 'Tester', 'QA Lead'],
    office: ['New York', 'Moscow', 'Berlin', 'London'],
  };

  const numberSpace = {
    age: 60,
    salary: 23789,
  };

  const mockArr = [];

  for(let i = 0; i < sizeOfMocks; i++) {
    let userCard = {};

    userCard.startdate = '2013/08/11';

    Object.keys(stringSpace).map(field => {
      const arrValue = stringSpace[field];

      userCard[field] = arrValue[Math.floor(Math.random() * arrValue.length )];
    });

    Object.keys(numberSpace).map(field => {
      const arrValue = numberSpace[field];

      userCard[field] = Math.floor(Math.random() * (arrValue - 20)) + 20;
    });
    
    mockArr.push(userCard);
  }
  return mockArr;
};

window.addEventListener("load", () => {
  mountStateToView();

  Object.keys(stateOfView).map( 
    key => document.querySelector(`#${key}`).addEventListener('click', fieldOnClick(key))
  ); 

  const searchButton = document.querySelector('#searchButton');
  const searchInput = document.querySelector('#searchInput');
  searchButton.addEventListener('click', searchOnClick);
  searchInput.addEventListener('keyup', searchInputOnKeyDown);
});


