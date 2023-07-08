export const customSort = ( arr, filter, isAscending ) => {
  if (filter === 'costs') {
    return Array.from(arr).sort(( el1, el2 ) => {
      const costs1 = Number(el1.quantity) * Number(el1.price);
      const costs2 = Number(el2.quantity) * Number(el2.price);

      return isAscending 
      ? Number(costs1) - Number(costs2)
      : Number(costs2) - Number(costs1) 
    })  
  }
  return Array.from(arr).sort(( el1, el2 ) =>  
    isAscending 
    ? Number(el1[filter]) - Number(el2[filter])
    : Number(el2[filter]) - Number(el1[filter]) 
  )
}