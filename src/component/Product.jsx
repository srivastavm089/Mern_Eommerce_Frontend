import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./product.css";

const Product = ({ products }) => {

  const options = {
    edit: false,
    color: "rgba(20, 20, 20,0.1)",
    activeColor: "red",
    value: products.ratings,
    size: window.innerWidth < 600 ? 20 : 15,
    isHalf: true,
  };
  return (
    <Link
      id="product-card"
      className=" flex flex-col  justify-center"
      to={`/product/${products._id}`}
    >
      {/* <img src={product.images[0].url} className='w-[15vw] h-56' alt="loog" />
  <p>{product.name}</p>
<div className='flex gap-2'>

   
  </div> 
   <span className='text-[tomato]'>₹{product.price}</span>  */}

      <div key={products.id} className="group relative p-2">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none 5 lg:h-80">
          <img
            src={products.images[0].url}
            alt={products.imageAlt}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href={products.href}>
                <span aria-hidden="true" className="absolute inset-0" />
                {products.name}
              </a>
            </h3>
            {/* <p className="">{products.color}</p> */}
            <p className="flex items-center  gap-2">
              {" "}
              <ReactStars
                {...options}
                classNames="whitespace-nowrap mt-1 text-sm text-gray-500"
              />{" "}
              <span className="text-sm">({products.numOfReviews}Reviews)</span>
            </p>
          </div>

          <p className="text-sm font-medium text-gray-900">{products.price}</p>
        </div>
      </div>
    </Link>
    /* <div className="pagination-box">
       <Pagination
            activePage={currentPage}
            itemsCountPerPage={productPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="First"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div> */
  );
};

export default Product;
