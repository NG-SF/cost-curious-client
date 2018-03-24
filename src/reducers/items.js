export default (state = [], action) => {
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
