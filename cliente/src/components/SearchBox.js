import React, {useState,useEffect} from 'react'

const SearchBox = () => {
    const [text, setText] = useState('')

    useEffect(() => {
        console.log('txt: ', text);
        if(text !== '' && text !== undefined){
            const url = `http://localhost:3001/api/items/${text}`
            fetch(url)
            .then((res) => res.json())
            .then((data) => console.log('data: ',data));
        }
        
    }, [text])

    const getValue = e => {
        console.log(e.target.value);
        setText(e.target.value)
    }
    

  return (
    <div className='col-12 box-Search'>
        <div className='row'>
            <div className='col-2'></div>
            <div className='col-1 d-flex justify-content-center'><img src="../img/Logo_ML.png" alt="guaysito_espera"  /></div>
            {/* <div className='col-7 px-0 input-search-img'> */}
            <div className='col-6 px-0 d-flex justify-content-center search-container bg-lightgrey'>
                <input 
                    type='text' 
                    className='form-control mx-0 f-18' 
                    placeholder='Nunca dejes de Buscar'
                    value={text}
                    onChange={getValue}
                />
                <div className='bg-lightgrey'>
                    <img
                        src="../img/ic_Search.png"
                        className="m-0"
                        alt="img-search"
                    />
                </div>
                
            </div>
            <div className='col-2'></div>
        </div>
      
      
    </div>
  )
}

export default SearchBox
