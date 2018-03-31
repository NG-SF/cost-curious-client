export const ADD_DSBRD_ITEM = 'ADD_DSBRD_ITEM';
export const addDashboardItem = (name = '') => ({
  type: ADD_DSBRD_ITEM,
  name
});

export const ADD_CHART_DATA = 'ADD_CHART_DATA';
export const addChartData = (id, data = []) => ({
  type: ADD_CHART_DATA,
  id,
  data
});

export const EDIT_DSBRD_ITEM = 'EDIT_DSBRD_ITEM';
export const editDashboardItem = (itemId='', name) => ({
  type: EDIT_DSBRD_ITEM,
  itemId,
  name
});

export const REMOVE_DSBRD_ITEM = 'REMOVE_DSBRD_ITEM';
export const removeDashboardItem = ({id} = {}) => ({
  type: REMOVE_DSBRD_ITEM,
  id
});

export const ADD_ITEM = 'ADD_ITEM';
export const addItem = (itemId= '', {amount=0, createdAt=0, place=''} = {}) => ({
  type: ADD_ITEM,
  itemId,
  item: {
    amount,
    createdAt,
    place
  }
});

export const REMOVE_ITEM = 'REMOVE_ITEM';
export const removeItem = (itemId='', id='') => ({
  type: REMOVE_ITEM,
  itemId,
  id
});

export const EDIT_ITEM = 'EDIT_ITEM';
export const editItem = (itemId, id, updates) => ({
  type: EDIT_ITEM,
  itemId,
  id,
  updates
});