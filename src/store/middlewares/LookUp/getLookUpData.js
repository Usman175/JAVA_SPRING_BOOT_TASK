import {ENDPOINT} from "../../../utils/endpoint.js";
import {getOptions,postOptions} from "../../../utils/httpConfig.js";
import request from "../../../utils/request.js";
import {
    getLookUpDataRequest,
    getLookUpDataRequestFailure,
    getLookUpDataRequestSuccess,
    getDefaultAddressDataRequest,
    getDefaultAddressDataRequestFailure,
    getDefaultAddressDataRequestSuccess
} from "../../action/LookUp/lookUpActions.js";
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyAX7-W0Lk7UXYPIQfp613Rmfp2BtqbTIQw");
export const getLookUpData = (latitude,longitude) => {
    
    return async function (dispatch) {
        dispatch(getLookUpDataRequest());
        Geocode.fromLatLng(latitude, longitude).then(
            (response) => {
                const address = response.results[0].formatted_address;
                let city, state, country,shortCode;
                for (let i = 0; i < response.results[0].address_components.length; i++) {
                  for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                    switch (response.results[0].address_components[i].types[j]) {
                      case "locality":
                        city = response.results[0].address_components[i].long_name;
                        break;
                      case "administrative_area_level_1":
                        state = response.results[0].address_components[i].long_name;
                        break;
                      case "country":
                        country = response.results[0].address_components[i].long_name;
                        break;
                    }
                  }
                }
                let obj={
                    shortCode:response.results[0].address_components[response.results[0].address_components.length-1].short_name ,
                    city,
                    state,
                    country,
                    address,
                    placeId:response.results[0].place_id
                }
                return (dispatch(getLookUpDataRequestSuccess(obj)))
            },
           async (error) => {
                return await request(`https://extreme-ip-lookup.com/json/?key=demo`, getOptions({})).then(response => response)
                .then(data => {
                    let obj={
                        shortCode:data.countryCode,
                        city:data.city,
                        state:data.region,
                        country:data.country,
                        address:data.isp
                    }
                    return (dispatch(getLookUpDataRequestSuccess(obj)))
                })
                .catch((error) => {
                    return (dispatch(getLookUpDataRequestFailure(error)))
            }
          );
        
    
    }
    )
}
}
// https://extreme-ip-lookup.com/json/?key=demo

//GetDeafultAddressField


export const getDefaultAddressData = (payload) => {

    return async function (dispatch) {
      
        dispatch(getDefaultAddressDataRequest());
        return await request(`${ENDPOINT["GetUserAddress"]}`, postOptions({...payload})).then(response => response)
            .then(data => {
           
                //Pass Only Default Address

                
                return (dispatch(getDefaultAddressDataRequestSuccess(data.result)))
            })
            .catch((error) => {
         
                if (error.toString().includes('Network Error') || error.toString().includes('TypeError')) {
                    const errorData = {code: 503, message: "Network Error"}
                    return (dispatch(getDefaultAddressDataRequestFailure(errorData)))
                } else {
                    if (error.response) {
                        if (error.response.data) {
                            if (error.response.data.code === 400 || error.response.data.code === 401) {
                                return (dispatch(getDefaultAddressDataRequestFailure(error.response.data)))
                            }
                            if (error.response.data.code === 409) {
                                const errorData = {code: 409, message: error.response.data.message}
                                return (dispatch(getDefaultAddressDataRequestFailure(errorData)))
                            }
                            if (error.response.data.code === 500) {
                                const errorData = {code: 500, message: "Internal Server Error"}
                                return (dispatch(getDefaultAddressDataRequestFailure(errorData)))
                            }
                        }
                    }
                }
            });
    }
    
}