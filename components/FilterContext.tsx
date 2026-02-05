
import React, {createContext,useContext,useState,ReactNode} from "react"
type CartItem = { id:number; title:string; price:number; image?:string; quantity?:number }
interface filterContextType{
    searchQuery:string;
    setSearchQuery:(query:string)=>void;
    selectedCategory:string;
    setSelectedCategory:(category:string)=>void;
    minPrice:number | undefined;
    setMinPrice:(price:number | undefined)=>void;
    maxPrice:number|undefined;
    setMaxPrice:(price:number | undefined)=>void;
    keyword:string;
    setKeyword:(keyword:string)=>void;
    cartData: CartItem[];
    setCartData:(items:CartItem[])=>void;
}
const FilterContext=createContext<filterContextType | undefined>(undefined)
export const FilterProvider:React.FC<{children:ReactNode}>=({children})=>{
    const [searchQuery,setSearchQuery]=useState<string>("");
    const [selectedCategory,setSelectedCategory]=useState<string>("");
    const [minPrice,setMinPrice]=useState<number | undefined>(undefined);
    const [maxPrice,setMaxPrice]=useState<number | undefined>(undefined);
    const [keyword,setKeyword]=useState<string>("");
    const [cartData,setCartData]=useState<CartItem[]>([])

    return (
        <FilterContext.Provider 
        value={{
            searchQuery,
            setSearchQuery,
            selectedCategory,
            setSelectedCategory,
            minPrice,
            setMinPrice,
            maxPrice,
            setMaxPrice,
            keyword,
            setKeyword,
                cartData,
                setCartData
         } }>
{children}
        </FilterContext.Provider>
    )
};
export const useFilter=()=>{
    const context=useContext(FilterContext)
    if(context === undefined){
        throw new Error("usefilter must be used within a filterProvider ")
    }
    return context
}