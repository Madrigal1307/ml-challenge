import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import SearchBox from './SearchBox'
const ItemDetail = ({item, itemDetail}) => {
const [rootItem, setRootItem] = useState([])
const [itemDet, setItemDet] = useState({})

    useEffect(() => {
      if(Object.keys(item).length > 0 && item.categories.length > 0){
        setRootItem(item.categories)
      }
    }, [item])

    useEffect(() => {
        if(Object.keys(itemDetail).length > 0){
            setItemDet(itemDetail)
        }
    }, [itemDetail])
    
    

  return (
    <div className='col-12'>
        <SearchBox/>
        <div className='row'>
            <div className='col-1'></div>
            <div className='col-10 root-item'>{rootItem.length > 0  && rootItem.join(" > ")}</div> 
            <div className='col-1'></div>
        </div>
        <div className='row'>
            <div className='col-1'></div>
            <div className='col-10 bg-white'> 
                {
                    Object.keys(itemDet).length > 0 && (
                        <div className='row'>
                            <div className='col-8 m-0 d-flex justify-content-center'>
                                <img src={itemDet.picture} className='img-item-detail' alt='img-item-detail'/>
                            </div>
                            <div className='col-4'>
                                <div className='row'>
                                    <div className='col-12 solded-items'>
                                    {`${itemDet.condition} - ${itemDet.sold_quantity} vendidos`}
                                    </div>
                                    <div className='col-12 title-item-det'>
                                    {itemDet.item.title}
                                    </div>
                                    <div className='col-12 price-item-det'>
                                        {`$ ${itemDet.item.price.amount}`}
                                    </div>
                                    <div className='col-12 div-btn-buy'>
                                        <button type="button" className="btn btn-buy">Comprar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                } 
            </div>
            <div className='col-1'></div>
        </div>
        <div className='row'>
            <div className='col-1'></div>
            <div className='col-10 bg-white'>
                <div className='row item-div-desc'>
                    <div className='col-8 item-title-desc'>Descripción del producto</div>
                    <div className='col-4'></div>
                    <div className='col-8 item-desc'>{itemDet.description}</div>
                    <div className='col-4'></div>
                </div>
                </div>
            <div className='col-1'></div>
        </div>
    </div>
  )
}

const mapStateToProps = ({ item, itemDetail }) => {
    return {
        item,
        itemDetail
    }
  }

export default connect(mapStateToProps)(ItemDetail)
