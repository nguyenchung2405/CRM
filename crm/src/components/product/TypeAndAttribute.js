import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GET_PRODUCT_ATTRIBUTE, GET_PRODUCT_TYPE } from '../../title/title';
import Loading from '../Loading';
import ProductTypeEditTable from './ProductTypeEditTable';

export default function TypeAndAttribute() {

    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.loadingReducer);

    useEffect(() => {
        dispatch({
            type: GET_PRODUCT_TYPE,
            data: { page: 1, page_size: 1000 }
        })
        dispatch({
            type: GET_PRODUCT_ATTRIBUTE,
            data: { page: 1, page_size: 1000 }
        })
    }, [])

    const showLoading = () => {
        if (isLoading) {
            return <Loading />
        }
    }

  return (
    <div className="customer__table content product__table">
        {showLoading()}
        <ProductTypeEditTable />
    </div>
  )
}
