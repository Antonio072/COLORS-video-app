export const persistanceLocalStorage = store => next => action => {
  next(action)
  localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
}
