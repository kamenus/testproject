// Здесь вводим начальное значение для стейта
const loadedState = [
  {
    name: 'Vasya',
    position: 'Developer',
    office: 'New York',
    age: 27,
    startdate: '2013/08/11',
    salary: 23789,
  },
  {
    name: 'Anton',
    position: 'HR',
    office: 'California',
    age: 21,
    startdate: '2015/08/11',
    salary: 15560,
  },
  {
    name: 'Dan',
    position: 'Developer',
    office: 'London',
    age: 26,
    startdate: '2016/08/11',
    salary: 100000,
  },
  {
    name: 'Bob',
    position: 'Product manager',
    office: 'Moscow',
    age: 32,
    startdate: '2011/08/11',
    salary: 32000,
  },
];

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
 
const removeOldView = (view, withOut = null) => {
  const mutableView = view;
  
  if (withOut) {
    mutableView.innerHTML = '';
    mutableView.appendChild(withOut);
  } else mutableView.innerHTML = '';

  return mutableView;
};

const mountStateToView = () => {
  const routContainer = document.querySelector("#employeeTable");
  const headerOfRoutContainer = document.querySelector(".tableHeader");

  const newView = state.map(({
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

  routContainer.insertAdjacentHTML("beforeend", newView);
};

changeState = (fieldName, value) => stateOfView[fieldName] = value;

const fieldOnClick = field => () => {
  const fieldValue = stateOfView[field];
  
  state.sort((user1, user2) => {
    if (user1[field] > user2[field]) {
      return fieldValue ? -1 : 1;
    } else if (user1[field] < user2[field]) {
      return fieldValue ? 1 : 1;
    }
    return 0;
  });

  changeState(field, !fieldValue);

  mountStateToView();
};

const searchOnClick = () => {
  const {value} = document.querySelector('#searchInput');

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
}

window.addEventListener("load", () => {
  mountStateToView();

  Object.keys(stateOfView).map( 
    key => document.querySelector(`#${key}`).addEventListener('click', fieldOnClick(key))
  ); 

  const searchButton = document.querySelector('#searchButton');
  searchButton.addEventListener('click', searchOnClick);
});


