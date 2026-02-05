import { Link } from "react-router-dom"
import { useFilter } from "./FilterContext";
interface BookCardProps{
    id:number;
    title:string;
    image:string;
    price:number;
}
const BookCard:React.FC<BookCardProps> = ({id,title,image,price}) => {
  const {cartData, setCartData}=useFilter()
  const addToCart=(id:number)=>{
    console.log("Adding item:", id);
    console.log("Current cart before:", cartData);
    let newCart;
    const existing = cartData.find(item => item.id === id);
    if (existing) {
      newCart = cartData.map(it => it.id === id ? { ...it, quantity: (it.quantity || 1) + 1 } : it);
    } else {
      newCart = [...cartData, { id, title, price, image, quantity: 1 }];
    }
    setCartData(newCart);
    console.log("Updated cart after:", newCart);
    alert("Added to cart!");
  }
  return (
    <div className="border p4 rounded">
        <Link to={`/products/${id}`}>
        <img src={image} alt={title} className="w-full h-32 object-cover mb-2" />
        </Link>
        <h2 className="font-bold">{title }</h2>
        <p>${price}</p>
        <button className="bg-amber-200 ml-10 align-middle" onClick={()=>addToCart(id)}>Add to cart</button>
    </div>
  )
}

export default BookCard