import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext"
import { CarTaxiFront, Tally3 } from "lucide-react";
import axios from "axios";
import BookCard from "./BookCard";
import { RxDropdownMenu } from "react-icons/rx";
import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";

const MainContext = () => {

const {searchQuery,selectedCategory,minPrice,maxPrice,keyword}=useFilter();
const [products,setProducts]=useState<any[]>([]);
const [filter,setFilter]=useState("all")
const[currentPage,setCurrentPage]=useState(1);
const [dropdown,setDropdown]=useState(false)
const itemsPerPage=16;


useEffect(()=>{
  let url=`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage-1)*itemsPerPage}`
  if(keyword){
    url=`https://dummyjson.com/products/search?q=${keyword}`
    
  }
 axios.get(url)
  .then((response) => {
    setProducts(response.data.products);
    
  })
  .catch((error) => {
    console.log("fetching error", error);
    alert("data fetching error"+error);
  });

},[currentPage,keyword]);



const getFilterProducts=()=>{
  let filteredProducts=products;
  if(selectedCategory){
    filteredProducts=filteredProducts.filter(
      (products)=>products.category === selectedCategory
    );
    
  }

  if(minPrice != undefined) {
    filteredProducts=filteredProducts.filter(product=>product.price>= minPrice)
  }
  if(maxPrice != undefined){
    filteredProducts=filteredProducts.filter(product=>product.price<=maxPrice)
  }
  if(searchQuery){
    filteredProducts=filteredProducts.filter(product=>product.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()))
  }
 if(filter === "cheap"){
  filteredProducts=filteredProducts.filter(product=>product.price<=500);
 }
 if(filter === "expensive"){
  filteredProducts=filteredProducts.filter(product=>product.price>=500);
 }
  if(filter === "popular"){
  filteredProducts=filteredProducts.filter(product=>product.rating>=4);
 }
 return filteredProducts;
};
const filteredProducts=getFilterProducts();

const totalProducts=200;
const totalPages=Math.ceil(totalProducts/itemsPerPage);
const handlePageChange=(page:number)=>{
  if(page>0 && page <= totalPages){
    setCurrentPage(page);
  }
}

const getPaginationButtons=()=>{
  const buttons:number[]=[];
  let startPage=Math.max(1,currentPage-2)
  let endPage=Math.min(totalPages,currentPage+2)
  if(currentPage -2<1){
    endPage=Math.min(totalPages,endPage+(2-currentPage-1))
  }
   if(currentPage +2<1){
  startPage=Math.min(1,startPage-(2-totalPages-currentPage))
  }
  for(let page=startPage;page<=endPage;page++){
    buttons.push(page)
  }
  return buttons;
}


  return (
    <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
           <div className="mb-5">
            <div className="flex flex-col sm:flex-row justify-center space-x-3 items-center">
              <div className="relative mb-5 mt-5 flex row justify-between ">
                <button onClick={()=>setDropdown(!dropdown)} className="border px-4 py-2 rounded-full flex items-center">
                  <RxDropdownMenu/>
                  {filter === "all" ? "filter" : filter.charAt(0).toUpperCase()+filter.slice(1)}
                </button>
                {dropdown && (
                  <div className="absolute bg-white border-gray-300 roundef mt-2 w-full sm:w-40">
                    <button onClick={()=>setFilter("cheap")} 
                      className="block px-4 py-2 w-full text-full hover:bg-gray-400"> Cheap</button>
                       <button onClick={()=>setFilter("expensive")} 
                      className="block px-4 py-2 w-full text-full hover:bg-gray-400">Expensive</button>
                       <button onClick={()=>setFilter("popular")} 
                      className="block px-4 py-2 w-full text-full hover:bg-gray-400"> Popular</button>
                  </div>
                )}
                <Link to={`/products/cart`}><button className="border py-3 px-3 mr-2 rounded-full"> cart items</button></Link>
                
              </div>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {filteredProducts.map((products)=>(
              <BookCard key={products.id} id={products.id} 
                  title={products.title}
                  image={products.thumbnail}
                  price={products.price}  />
            ))}
             </div>
             <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
              <button onClick={()=>handlePageChange(currentPage-1)} disabled={currentPage === 1} className="border px-4 py-2 mx-2 rounded-full">Previous</button>
              <div className="flex flex-wrap justify-center">
                {getPaginationButtons().map((page)=>(
                  <button key={page} onClick={()=>handlePageChange(page)} className={`border px-4 py-2 mx-1 rounded-full ${page === currentPage ? "bg-black text-white" : ""}`}>{page}</button>
                ))}
              </div>
              <button onClick={()=>handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="border px-4 py-2 mx-2 rounded-full">Next</button>
             </div>
           </div>
    </section>
  )
}

export default MainContext