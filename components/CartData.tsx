import { useFilter } from "./FilterContext"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const CartData = () => {
    const {cartData, setCartData}=useFilter()
    const navigate = useNavigate()
    
    console.log("CartData component - cartData:", cartData);
    
    const handleRemove = (id: number) => {
        const updated = cartData.filter(item => item.id !== id)
        setCartData(updated)
    }
    const handleDecrease = (id: number) => {
        const updated = cartData.map(item => {
            if (item.id === id) {
                const qty = (item.quantity || 1) - 1
                return qty > 0 ? { ...item, quantity: qty } : null
            }
            return item
        }).filter(Boolean) as any
        setCartData(updated)
    }
    const handleIncrease = (id:number) => {
        const updated = cartData.map(item => item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item)
        setCartData(updated)
    }
    

  return (
    <div className="p-5 w-full">
        <button onClick={()=>navigate(-1)} className="mb-5 px-4 py-2 bg-black text-white rounded">
            Back
        </button>
        <h1 className="text-3xl font-bold mb-5">Cart Items ({cartData.length})</h1>

        {cartData.length === 0 ? (
            <div className="text-center py-10">
                <p className="text-xl text-gray-500">Your cart is empty</p>
                <button 
                    onClick={()=>navigate("/")}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Continue Shopping
                </button>
            </div>
        ) : (
            <div className="space-y-3">
                {cartData.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-4 border rounded bg-gray-100">
                        <div className="flex items-center gap-4">
                            {item.image && <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />}
                            <div>
                                <div className="font-bold">{item.title}</div>
                                <div className="text-sm text-gray-600">${item.price}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => handleDecrease(item.id)} className="px-2 bg-gray-200 rounded">-</button>
                            <div>{item.quantity || 1}</div>
                            <button onClick={() => handleIncrease(item.id)} className="px-2 bg-gray-200 rounded">+</button>
                            <button 
                                onClick={() => handleRemove(item.id)}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default CartData