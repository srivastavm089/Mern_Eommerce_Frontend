import React, { Fragment, useState } from "react";
import MetaData from "./MetaData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { HomeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PinDropIcon from "@mui/icons-material/PinDrop";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import PublicIcon from "@mui/icons-material/Public";
import { Country, State, City } from "country-state-city";
import CheckoutSteps from "./CheckoutSteps";
import { saveShippingInfo } from "../redux/action/cartAction";
import { useNavigate } from "react-router-dom";
const Shipping = () => {
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.state);
  const [pinCode, setPinCode] = useState(shippingInfo.pincode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const shippingSubmit = (e) => {
    e.preventDefault();
 

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      return toast.error("Phone Number should be 10 digit", {
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

    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };
  return (
    <Fragment>
      <MetaData title="Shipping Details" />
      <ToastContainer />
      <CheckoutSteps activeStep={0} />
      <div className="shippingContainer w-screen max-w-full flex justify-center">
        <div className="shippingBox w-[50vh] h-[90vh] bg-white  box-border mt-10">
          <h2 className="shippingHeading text-center text-black m-auto w-[50%] border-b-2 text-xl pb-2">
            Shipping Details
          </h2>
          <form
            action=""
            className="shippingForm flex  justify-center  p-2 m-auto flex-col gap-10 mt-2"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div className="flex items-center w-ful relative">
              <HomeIcon className="w-5 absolute left-2 opacity-40" />
              <input
                type="text"
                placeholder="address "
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="p-2 outline-none border w-full pl-8 text-sm"
              />
            </div>
            <div className="flex items-center relative">
              <LocationCityIcon
                className=" absolute left-2 opacity-40 "
                style={{ width: "1.25rem" }}
              />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full pl-8 text-sm"
              />
            </div>
            <div className="flex items-center w-full relative">
              <PinDropIcon
                className="absolute left-2 opacity-40"
                style={{ width: "1.25rem" }}
              />
              <input
                type="number"
                placeholder="Pin Code"
                className="w-full pl-8"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div className="flex items-center w-full relative">
              <PhoneIcon
                className=" absolute text-sm opacity-40 left-2"
                style={{ width: "1.25rem" }}
              />
              <input
                type="number"
                placeholder="Mobile"
                required
                className="w-full pl-8"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <div className="flex items-center w-full relative">
              <PublicIcon
                className=" absolute opacity-40 left-2"
                style={{ width: "1.25rem" }}
              />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full pl-8"
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => {
                    return (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            {country && (
              <div className="flex items-center w-full relative">
                <TransferWithinAStationIcon
                  className="absolute opacity-40 left-2"
                  style={{ width: "1.25rem" }}
                />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full pl-8"
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => {
                      return (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            )}
            <button
              type="submit"
              value="Continue"
              className="shippingBtn bg-[tomato] w-full h-10 rounded text-white  cursor-pointer hover:bg-gray-500 "
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
