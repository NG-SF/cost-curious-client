export const ADD_ITEM = 'ADD_ITEM';
export const addItem = ({description= '', amount=0, createdAt=0} = {}) => ({
  type: ADD_ITEM,
  item: {
    description,
    amount,
    createdAt
  }
});

export const REMOVE_ITEM = 'REMOVE_ITEM';
export const removeItem = ({id} = {}) => ({
  type: REMOVE_ITEM,
  id
});

export const EDIT_ITEM = 'EDIT_ITEM';
export const editExpense = (id, updates) => ({
  type: EDIT_ITEM,
  id,
  updates
});