let seedData = [ {
  id: '00',
  description: 'coffee',
  amount: 400,
  createdAt: 1521140400000
}, {
  id: '01',
  description: 'coffee',
  amount: 300,
  createdAt: 1621140400000
}, {
  id: '02',
  description: 'movie',
  amount: 2500,
  createdAt: 1721140400000
}, {
  id: '03',
  description: 'coffee',
  amount: 400,
  createdAt: 1821140400000
}, {
  id: '04',
  description: 'movie',
  amount: 2000,
  createdAt: 1521140400000
}
];

export default (state = seedData, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.item];
    
    case 'REMOVE_ITEM':
      return state.filter(({id}) => id!== action.id);
    
    case 'EDIT_ITEM':
      return state.map((item) => {
        if(item.id === action.id) {
          return {...item, ...action.updates};
        }
        return item;
      });
    default:
    return state;
  }
};
