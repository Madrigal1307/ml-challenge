// Constants 
let initialData = {
    text:'',
    itemsResults: {}
}
let QUERY_RESULT_ITEMS = "QUERY_RESULT_ITEMS"
// Reducert 
export default function reducer (state=initialData,action){
    switch (action.type) {
        case QUERY_RESULT_ITEMS:
            return {
                ...action.payload
            }    
        default:
            return state;
    }
}

//auxiliar
const saveStorage = function (item) {
    sessionStorage.setItem('item', btoa(JSON.stringify(item)));
}

// Action
export const restoreItemsAction = () => (dispatch) => {
    if (sessionStorage.getItem('item') !== null) {
        const item = JSON.parse(atob(sessionStorage.getItem('item')));
        
        if (item && item.author) {
            dispatch({
                type: QUERY_RESULT_ITEMS,
                payload: item
            })
        }
    }
}

export const getItems = (txt) => (dispatch, getState) => {
    const url = `http://localhost:3001/api/items/q=${txt}`
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        console.log('dataitems: ', data);
        const items = data.results.map(item => {
            const prod = {
                id:item.id,
                title: item.title,
                price: {
                    currency:item.installments?.currency_id,
                    amount:item.installments?.amount,
                    decimals:item.installments?.amount % 1
                },
                picture: item.thumbnail,
                condition: item.condition,
                free_shipping: item.shipping.free_shipping
            }
            return prod;
        })
        
        const categories = data.filters.length > 0 && data.filters[0].values[0].path_from_root.map(cat => cat.name)
        const obj = {
            author:{
                name:'Fernanda',
                lastname: 'Madrigal'
            },
            categories: categories,
            items: items
        }
        dispatch({
            type: QUERY_RESULT_ITEMS,
            payload: {
                 ...obj,
                 text:txt
            },
        })
        saveStorage(getState().item)
        window.location =`/items?search=${txt}`
    });
   
}