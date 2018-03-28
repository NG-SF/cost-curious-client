import {ADD_DSBRD_ITEM, EDIT_DSBRD_ITEM, REMOVE_DSBRD_ITEM, ADD_ITEM, REMOVE_ITEM, EDIT_ITEM} from '../actions/items';

let itemId = (Math.random() * 40).toString();
let seedData = [ {
  id: '00',
  description: 'Coffee',
  history: [ {
    id: itemId,
    amount: 400,
    createdAt: 1521240500000
  }, {
    id: itemId,
    amount: 300,
    createdAt: 1524950400000
  }, {
    id: itemId,
    amount: 500,
    createdAt: 1526440400000
  },  {
    id: '000',
    amount: 700,
    createdAt: 1521149500000
  }, {
    id: '001',
    amount: 900,
    createdAt: 1524940400000
  }, {
    id: '002',
    amount: 500,
    createdAt: 1526750400000
  }, {
    id: itemId,
    amount: 550,
    createdAt: 1527140500000
  }, {
    id: itemId,
    amount: 390,
    createdAt: 1522950400000
  }, {
    id: itemId,
    amount: 580,
    createdAt: 1524950400000
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
    createdAt: 1521155500000
  }, {
    id: '005',
    amount: 2200,
    createdAt: 1521540500000
  }, {
    id: '006',
    amount: 2500,
    createdAt: 1521951900000
  }, {
    id: '007',
    amount: 1200,
    createdAt: 1522151900000
  }
  ]
}
];

export default (state = seedData, action) => {
  let objToUpdate, newObj, newHistory, newState;
  switch (action.type) {
    case ADD_DSBRD_ITEM:
    return [...state, {
      id: itemId,
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
      newHistory =  [...objToUpdate[0].history, {...action.item, id: itemId}];
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

    default:
    return state;
  }
};
