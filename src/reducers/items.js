import {ADD_DSBRD_ITEM, EDIT_DSBRD_ITEM, REMOVE_DSBRD_ITEM, ADD_ITEM, REMOVE_ITEM, EDIT_ITEM, ADD_CHART_DATA} from '../actions/items';
const faker = require('faker');

let seedData = [ {
  id: '001',
  description: 'Coffee',
  history: [ {
    id: faker.random.uuid(),
    amount: 400,
    createdAt: 1521240500000
  }, {
    id: faker.random.uuid(),
    amount: 300,
    createdAt: 1534950400000
  }, {
    id: faker.random.uuid(),
    amount: 500,
    createdAt: 1526440400000
  },  {
    id: faker.random.uuid(),
    amount: 700,
    createdAt: 1521149500000
  }, {
    id: faker.random.uuid(),
    amount: 900,
    createdAt: 1524940400000
  }, {
    id: faker.random.uuid(),
    amount: 500,
    createdAt: 1526750400000
  }, {
    id: faker.random.uuid(),
    amount: 550,
    createdAt: 1527140500000
  }, {
    id: faker.random.uuid(),
    amount: 390,
    createdAt: 1522950400000
  }, {
    id: faker.random.uuid(),
    amount: 580,
    createdAt: 1514990400000
  }
  ]
}, {
  id: '002',
  description: 'Movie',
  history: [{
    id: faker.random.uuid(),
    amount: 2500,
    createdAt: 1521140500000,
  }, {
    id: faker.random.uuid(),
    amount: 1500,
    createdAt: 1519156800000
  },{
    id: faker.random.uuid(),
    amount: 2000,
    createdAt: 1521155500000
  }, {
    id: faker.random.uuid(),
    amount: 2200,
    createdAt: 1521540500000
  }, {
    id: faker.random.uuid(),
    amount: 2500,
    createdAt: 1521951900000
  }, {
    id: faker.random.uuid(),
    amount: 1200,
    createdAt: 1522151900000
  }
  ]
}, {
  id: '003',
  description: 'Saving for vacation',
  history: [ {
    id: faker.random.uuid(),
    amount: 2000,
    createdAt: 1521240500000
  }, {
    id: faker.random.uuid(),
    amount: 3000,
    createdAt: 1524950400000
  }, {
    id: faker.random.uuid(),
    amount: 1500,
    createdAt: 1526440400000
  },  {
    id: faker.random.uuid(),
    amount: 5000,
    createdAt: 1521149500000
  }, {
    id: faker.random.uuid(),
    amount: 40000,
    createdAt: 1523940400000
  }, {
    id: faker.random.uuid(),
    amount: 5500,
    createdAt: 1526750400000
  }, {
    id: faker.random.uuid(),
    amount: 2550,
    createdAt: 1527140500000
  }, {
    id: faker.random.uuid(),
    amount: 3900,
    createdAt: 1522950400000
  }, {
    id: faker.random.uuid(),
    amount: 5800,
    createdAt: 1525950400000
  }
  ]
}
];

export default (state = seedData, action) => {
  let objToUpdate, newObj, newHistory, newState;
  switch (action.type) {
    case ADD_DSBRD_ITEM:
    return [...state, {
      id: faker.random.uuid(),
      description: action.name, 
      history: []
      }];

    case EDIT_DSBRD_ITEM:
      objToUpdate = state.filter(el => el.id === action.itemId);
      newObj = Object.assign({}, objToUpdate[0], { description: action.name });
      newState = state.map(item => {
        if(item.id === action.itemId) {
        return newObj;
      }
        return item;
      });
      return newState;

    case REMOVE_DSBRD_ITEM:
      return state.filter(({id}) => id!== action.id);

    case ADD_ITEM:
      objToUpdate = state.filter(el => el.id === action.itemId);
     //add item to history 
      newHistory =  [...objToUpdate[0].history, {id: faker.random.uuid(), ...action.item}];
      // update whole object 
      newObj = Object.assign({}, objToUpdate[0], { history: newHistory });
      //update state
      newState = state.map(item => {
        if(item.id === action.itemId) {
        return newObj;
      }
        return item;
      });
      return newState;
    
    case REMOVE_ITEM:
    console.log(action);
      objToUpdate = state.filter(el => el.id === action.itemId);
      newHistory = objToUpdate[0].history.filter(item => item.id !== action.id);
      newObj = Object.assign({}, objToUpdate[0], {history: newHistory});
      newState = state.map(item => {
        if(item.id === action.itemId) {
        return newObj;
      }
        return item;
      });
      return newState;
    
    case EDIT_ITEM:
    //find parent obj
      objToUpdate = state.filter(el => el.id === action.itemId);
    //find history obj to update  
      let historyObjToUpdate = objToUpdate[0].history.filter(el => el.id === action.id);
      let historyObjUpdated = Object.assign({}, historyObjToUpdate[0], action.updates);
     //update total history array
      newHistory = objToUpdate[0].history.map(item => {
        if(item.id === action.id) {
          return historyObjUpdated;
        }
        return item;
      });
      // update whole object 
      newObj = Object.assign({}, objToUpdate[0], { history: newHistory });
      //update state
      newState = state.map(item => {
        if(item.id === action.itemId) {
        return newObj;
      }
        return item;
      });
      return newState;
    
    case ADD_CHART_DATA:
      objToUpdate = state.filter(el => el.id === action.id);
      newObj = Object.assign({}, objToUpdate[0], { chartData: action.data });
      newState = state.map(item => {
        if(item.id === action.itemId) {
        return newObj;
      }
        return item;
      });
      return newState;
    default:
    return state;
  }
};
