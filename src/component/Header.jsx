import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout } from "../redux/action/userAction";
import LoginIcon from "@mui/icons-material/Login";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonIcon from "@mui/icons-material/Person";
import GridViewIcon from "@mui/icons-material/GridView";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";

const navigation = [
  { name: "Home", to: "/", current: true },
  { name: "Products", to: "/products", current: false },
  { name: "Contact", to: "/contact", current: false },
  { name: "About", to: "/about", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const { cartItems } = useSelector((state) => state.cart);
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: isAuthenticated ? <ExitToAppIcon /> : <LoginIcon />,
      name: isAuthenticated ? "Logout" : "Login",
      func: !isAuthenticated ? loginUser : logoutUser,
    },
  ];

  if (user && user.user && user.user.role == "admin") {
    options.unshift({
      icon: <GridViewIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }
  function account() {
    navigate("/account");
  }
  function logoutUser() {
    dispatch(logout());
    toast.success("logged out", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  function orders() {
    navigate("/orders");
  }
  function loginUser() {
    navigate("/login");
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <ToastContainer />
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  {/* <img
                    className="h-8 w-auto"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROPlT2D79QNCofIkWZ3Uyp7bNT0kB7F4riVA&usqp=CAU"
                    alt="Your Company"
                  /> */}
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div>
                  <Link to="/search">
                    <CiSearch className="text-white text-2xl cursor-pointer mr-2" />
                  </Link>
                </div>
                <button
                  type="button"
                  className="relative mr-2 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <Link to="/cart">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>

                    <CiShoppingCart className="h-6 w-6" />
                  </Link>
                  <span className="absolute top-[-1vh] left-[3.5vh] bg-gray-200 rounded-full w-5 text-black">
                    {cartItems.length}
                  </span>
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {/* < GridViewIcon className='text-white text-xl' /> */}
                      {user && user.user && (
                        <img
                          src={user.user.avatar.url}
                          alt="logo"
                          className="inline-block h-5 w-5 rounded-full "
                        />
                      )}
                      {!isAuthenticated && (
                        <img
                          src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
                          alt="logo"
                          className="inline-block h-10 w-10 rounded-full "
                        />
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {options.map((item , index) => {
                        return (
                          <Menu.Item key={index}>
                            <div
                              onClick={() => item.func()}
                              className="flex gap-3 pl-2 mt-1 cursor-pointer hover:bg-gray-400 transition-colors   "
                              style={{ transition: "all 0.5" }}
                            >
                              <p>{item.icon} </p>
                              <p>{item.name}</p>
                            </div>
                          </Menu.Item>
                        );
                      })}
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* <Link to='/login'>
              <CiUser className='text-white text-xl ml-2'/>
                </Link> */}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
