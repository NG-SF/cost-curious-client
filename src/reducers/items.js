import {ADD_DSBRD_ITEM, EDIT_DSBRD_ITEM, REMOVE_DSBRD_ITEM, ADD_ITEM, REMOVE_ITEM, EDIT_ITEM} from '../actions/items';

let seedData = [ {
  id: '00',
  description: 'Coffee',
  history: [ {
    id: '000',
    amount: 400,
    createdAt: 1521140500000
  }, {
    id: '001',
    amount: 300,
    createdAt: 1524950400000
  }, {
    id: '002',
    amount: 500,
    createdAt: 1526950400000
  }
  ]
}, {
  id: '01',
  description: 'Movie',
  history: [{
    id: '003',
    amount: 2500,
    createdAt: 1521140500000,
  }, {
    id: '004',
    amount: 2000,
    createdAt: 1524950400000
  }, {
    id: '005',
    amount: 2200,
    createdAt: 1525950400000
  }, {
    id: '006',
    amount: 2500,
    createdAt: 1525951900000
  }
  ]
}
];
let itemId = Math.floor(Math.random() * (seedData.length - 1 + 1)) + 1;

export default (state = seedData, action) => {
  let objToUpdate, newObj, newHistory, newState;
  switch (action.type) {
    case ADD_DSBRD_ITEM:
    return [...state, {
      id: itemId.toString(),
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
      newHistory =  [...objToUpdate[0].history, {...action.item, id: itemId.toString()}];
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
      objToUpdate = state.filter(el => el.id === action.itemId);
     //add item to history 
      newHistory =  [...objToUpdate[0].history, {...action.item}];
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

    default:
    return state;
  }
};
