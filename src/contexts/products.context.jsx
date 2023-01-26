import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const ProductsContext = createContext({
    products: []
})

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([])
    const value = {products}

    useEffect(() => {
        const getCategoryMap = async () => {
            const categoryMap = await getCategoriesAndDocuments()
            console.log(categoryMap)
        }

        getCategoryMap()
    }, [])

    return <ProductsContext.Provider value={value} >{children}</ProductsContext.Provider>
}