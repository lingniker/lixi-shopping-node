'use strict';

// import express from 'express'
// import CityHandle from '../controller/v1/cities'
// import SearchPlace from '../controller/v1/search'
// import Carts from '../controller/v1/carts'
// import Address from '../controller/v1/address'
// import Remark from '../controller/v1/remark'
// import BaseComponent from '../prototype/baseComponent'
// import Captchas from '../controller/v1/captchas'
// import User from '../controller/v2/user'
// import Order from '../controller/v1/order'
// import Hongbao from '../controller/promotion/hongbao'
// const baseHandle = new BaseComponent();
// const router = express.Router();

import Route from '@ioc:Adonis/Core/Route'

Route.get('/v1/cities', async () => {
  return {cities: 'cities11'}
});
// Route.get('/cities/:id', CityHandle.getCityById);
// Route.get('/exactaddress', CityHandle.getExactAddress);
// Route.get('/pois', SearchPlace.search);
// Route.post('/addimg/:type', baseHandle.uploadImg);
// Route.post('/carts/checkout', Carts.checkout);
// Route.get('/carts/:cart_id/remarks', Remark.getRemarks);
// Route.post('/captchas', Captchas.getCaptchas);
// Route.get('/user', User.getInfo);
// Route.get('/user/:user_id', User.getInfoById);
// Route.get('/users/list', User.getUserList);
// Route.get('/users/count', User.getUserCount);
// Route.get('/users/:user_id/addresses', Address.getAddress);
// Route.post('/users/:user_id/addresses', Address.addAddress);
// Route.get('/user/city/count', User.getUserCity);
// Route.get('/addresse/:address_id', Address.getAddAddressById);
// Route.delete('/users/:user_id/addresses/:address_id', Address.deleteAddress);
// Route.post('/users/:user_id/carts/:cart_id/orders', Order.postOrder);
// Route.post('/users/:user_id/hongbao/exchange', Hongbao.exchange);

 
// export default Route