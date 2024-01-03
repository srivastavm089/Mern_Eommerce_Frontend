import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeFromCart } from "../redux/action/cartAction";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import {Link, useNavigate} from "react-router-dom"
export default function Cart() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) return;

    dispatch(addItemToCart(id, newQty));
  };
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) return;
    dispatch(addItemToCart(id, newQty));
  };
  const removeCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const  checkOutHandler = ()=> {
 
    navigate("/shipping")
  }
  return <Fragment>{
    cartItems.length ===0 ?   <div className="h-screen flex justify-center  items-center">
      <div className="flex flex-col items-center gap-4">
           <div >
            <RemoveShoppingCartIcon className="text-[tomato]" style={{fontSize:"20vh"}}/>
            </div>   
            <div className="text-2xl font-bold">No Products In Your Cart</div> 
            <Link to="/products" className="bg-gray-700 text-white p-2 text-sm hover:bg-[tomato]">VIEW PRODUCT</Link> 
            </div>
    </div>: <div>
    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <p className="text-lg font-medium text-gray-900">Shopping cart</p>
          <div className="ml-3 flex h-7 items-center"></div>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cartItems &&
                cartItems.map((product) => (
                  <li key={product.product} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.image}
                        alt={product.image}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={product.href}>{product.name}</a>
                          </h3>
                          <p className="ml-4">
                            {product.price * product.quantity}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.color}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex justify-center items-center gap-1">
                          <input
                            type="button"
                            value="-"
                            className="cursor-pointer bg-gray-600 w-6 h-6 text-white"
                            onClick={() =>
                              decreaseQuantity(
                                product.product,
                                product.quantity
                              )
                            }
                          ></input>
                          <input
                            type="text"
                            readOnly
                            value={product.quantity}
                            className="border-none outline-none w-12 h-7 text-center"
                          />
                          <input
                            type="button"
                            value="+"
                            className="cursor-pointer bg-gray-600 w-6 h-6 text-white"
                            onClick={() =>
                              increaseQuantity(
                                product.product,
                                product.quantity,
                                product.stock
                              )
                            }
                          ></input>
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={()=> removeCartHandler(product.product)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>{cartItems.reduce((acc, item)=> acc + item.quantity * item.price , 0 )}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <button
            onClick={checkOutHandler}
            className="flex items-center w-full justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </button  >
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => setOpen(false)}
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
    
    
    }</Fragment>;
}
