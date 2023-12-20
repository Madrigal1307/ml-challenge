// Constants 
let initialData = {}
let QUERY_DETAIL_ITEM = "QUERY_DETAIL_ITEM"
// Reducert 
export default function reducer (state=initialData,action){
    switch (action.type) {
        case QUERY_DETAIL_ITEM:
            return {
                ...action.payload
            }    
        default:
            return state;
    }
}

//auxiliar
const saveStorage = function (itemDetail) {
    sessionStorage.setItem('itemDetail', btoa(JSON.stringify(itemDetail)));
}

// Action
export const restoreItemDetailAction = () => (dispatch) => {
    if (sessionStorage.getItem('itemDetail') !== null) {
        const itemDetail = JSON.parse(atob(sessionStorage.getItem('itemDetail')));
        
        if (itemDetail && itemDetail.author) {
            dispatch({
                type: QUERY_DETAIL_ITEM,
                payload: itemDetail
            })
        }
    }
}

export const getItemDetail = (id,price) => (dispatch, getState) => {
    const url = `http://localhost:3001/api/items/${id}`
    console.log('url:',url);
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        console.log('data: ',data); 
        const obj = {
            author:{
                    name:'Fernanda',
                    lastname: 'Madrigal'
                },
            item:{
                id:data.id,
                title: data.title,
                price: price
                // price: {
                //     currency:data.currency_id,
                //     amount:data.installments?.amount,
                //     decimals:data.installments?.amount % 1
                // },
            },
            picture: data.thumbnail,
            condition: data.condition,
            free_shipping: data.shipping.free_shipping,
            sold_quantity: 10,
            description:data.plain_text
        }

        dispatch({
            type: QUERY_DETAIL_ITEM,
            payload: {...obj},
        })
        saveStorage(getState().itemDetail)
        window.location =`/items/${id}`
       
    });
   
}
