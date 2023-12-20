import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import { getItems } from '../redux/itemDuck';
const SearchBox = ({item, getItems}) => {
    const [text, setText] = useState('')
    useEffect(() => {
      if(Object.keys(item).length > 0 && item.text){
        setText(item.text)
      }
    }, [item])
    
    const handleSearchItem = (e) => {
        e.preventDefault();
        console.log('dio click al buscar');
        if(text !== ''){
            getItems(text);
        }
        

    }
    

  return (
    <div className='col-12 box-Search'>
        <div className='row'>
            <div className='col-1'></div>
            <div className='col-1 d-flex justify-content-left'><img src="../img/Logo_ML.png" alt='logo-ML' /></div>
                <form onSubmit={handleSearchItem} className='col-9 px-0 d-flex justify-content-center search-container bg-lightgrey'>
                    <input 
                        type='text' 
                        className='form-control mx-0 f-18' 
                        placeholder='Nunca dejes de Buscar'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <div className='bg-lightgrey d-flex align-items-center'>
                        <button
                            className='border-0'
                            type='submit'
                        >
                            <img 
                                src="../img/ic_Search.png"
                                className="m-0"
                                alt="img-search"
                            />
                        </button>
                    </div>
                </form>
            <div className='col-1'></div>
        </div>
      
      
    </div>
  )
}

const mapStateToProps = ({ item }) => {
    return {
        item,
    }
  }

export default connect(mapStateToProps, {getItems})(SearchBox)

