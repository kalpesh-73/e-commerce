import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useFilter } from "./FilterContext";

interface Product{
    id:number;
    title:string;
    description:string;
    price:number;
    rating:number;
    images:string[];
}
const ProductPage = () => {
     const navigate = useNavigate();
     const {id}=useParams<{id:string}>();
     const [product,setProduct]=useState<Product | null>(null);
     const [error, setError]=useState<string | null>(null);
     const { cartData, setCartData } = useFilter();

    useEffect(()=>{
        if(id){
            axios.get<Product>(`https://dummyjson.com/products/${id}`)
            .then((res)=>{
                setProduct(res.data)
            }).catch((error)=>{
                console.error(`error fetching data:${error}`)
                setError("Failed to load product")
            })
        }
    },[id]) 

    if(error){
        return <h1>{error}</h1>
    }
    if(!product){
        return <h1>Loading...</h1>
    }
  return (
    <div className="p-5 w-[60%]">
        <button onClick={()=>navigate(-1)} className="mb-5 px-4 py-2 bg-black text-white rounded">
            Back
        </button>
        <div className="mb-5">
            <img src={product.images[0]} alt={product.title} className="w-full h-auto rounded" />
        </div>
        <h1 className="text-2xl font-bold mb-3">{product.title}</h1>
        <p className="text-gray-600 mb-3">{product.description}</p>
        <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">${product.price}</h2>
            <p className="text-yellow-500">Rating: {product.rating}</p>
        </div>
        <div className="mt-5 flex gap-3">
            <button 
                onClick={() => {
                    const existingIndex = cartData.findIndex(item => item.id === product.id);
                    if (existingIndex !== -1) {
                        const updated = cartData.map((it, i) => i === existingIndex ? { ...it, quantity: (it.quantity || 1) + 1 } : it);
                        setCartData(updated);
                    } else {
                        setCartData([...cartData, { id: product.id, title: product.title, price: product.price, image: product.images[0], quantity: 1 }]);
                    }
                    alert("Added to cart!");
                }}
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                Add to Cart
            </button>
            <button 
                onClick={() => navigate("/cart")}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                View Cart
            </button>
        </div>
    </div>
  )
}

export default ProductPage