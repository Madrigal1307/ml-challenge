import { useState, useEffect } from 'react'
import SearchBox from './SearchBox'
import { connect } from 'react-redux';
import { getItemDetail } from '../redux/itemDetailDuck';

const Results = ({item, getItemDetail}) => {
  const [results, setResults] = useState(item);
  useEffect(() => {
    if(Object.keys(item).length){
      setResults(item)
    }
  }, [item])


  const handleItemDetail = (id,price) => {
    getItemDetail(id,price)
  }
  
  return (
    <div className='col-12'>
      <SearchBox/>
        <div className='row'>
          <div className='col-1'></div>
          <div className='col-10 root-item'>{results.categories && results.categories.join(" > ")}</div> 
          <div className='col-1'></div>
        </div>
        <div className='row'>
          <div className='col-1'></div>
          <div className='col-10 bg-white'>  
          {
            Object.keys(results).length > 0 && results.items.length > 0 &&
            results.items.map((element, i) => {
              if(i < 4){
                return  (
                <div className='row border-item' onClick={() => handleItemDetail(element.id, element.price)} key={i}>
                  <div className='col-3 m-0 d-flex justify-content-center'>
                    <img src={element.picture} className='img-items' alt='img-item'/>
                  </div>
                  <div className='col-9'>
                    <div className='row'>
                      <div className='col-9 price-item'>
                        {`$ ${element.price.amount}`}
                      </div>
                      <div className='col-3 location-item'>
                        Mendoza
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-12'><label className='title-item'>{element.title}</label></div>
                    </div>
                  </div>

                </div>
                )
              }
            })
          }
          </div>
          <div className='col-1'></div>
      </div>
    </div>
  )
}
const mapStateToProps = ({ item }) => {
  return {
    item
  }
}

export default connect(mapStateToProps, {getItemDetail})(Results)
// export default Results
