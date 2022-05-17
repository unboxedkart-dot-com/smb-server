
//   async createOrder(
//     paymentType: string,
//     paymentMethod: string,
//     userId: string,
//   ) {
//     let amountPaid = 0;
//     let amountDue;





//     //get order summary
//     console.log('given userid', userId);
//     console.log('userid', userId);
//     const userDoc = await this.userModel.findById(userId);
//     console.log(userDoc);
//     console.log('id is', userDoc.phoneNumber);

//     const orderSummary = userDoc.orderSummary;
//     //generating a unique ordernumber
//     const orderNumber = this._generateOrderNumber();
//     //generating new order details
//     console.log('user doc', userDoc);
//     const orderItemDetails = await this._generateOrderItemDetails(
//       orderSummary.orderItems,
//     );

//     console.log('orderitemdetails', orderItemDetails.orderTotal);

//     var payableAmount = orderItemDetails.orderTotal;
//     var couponDiscount = 0;

//     //validating coupon and coupon discount
//     if (orderSummary.couponCode != null) {
//       couponDiscount = await this._getCouponDiscount(
//         userDoc._id.toString(),
//         userDoc.name,
//         orderNumber,
//         orderSummary.couponCode,
//         orderItemDetails.orderTotal,
//       );
//       console.log('paybale amount', payableAmount);
//       console.log('c amount', payableAmount);
//       payableAmount = payableAmount - couponDiscount;
//     }
//     console.log('paybale amount', payableAmount);
//     const newOrder = new this.orderModel({
//       userId: userId,
//       userDetails: {
//         name: userDoc.name,
//         emailId: userDoc.emailId,
//         phoneNumber: userDoc.phoneNumber,
//       },
//       orderNumber: orderNumber,
//       deliveryType: userDoc.orderSummary.deliveryType,
//       paymentDetails: {
//         paymentType: paymentType,
//         paymentMethod: paymentMethod,
//         $push: { productsIds: userDoc.orderSummary.paymentId },
//         partialPaymentId:
//           paymentType == 'PARTIAL' ?? userDoc.orderSummary.partialPaymentId,
//         billTotal: orderItemDetails.orderTotal,
//         payableTotal: payableAmount,
//         amountPaid: 2000,
//         amountDue: 20000,
//         couponCode: orderSummary.couponCode,
//         couponDiscount: couponDiscount,
//       },
//       // deliveryAddress: entireBody.deliveryAddress,
//       itemsCount: orderItemDetails.orderItemsCount,
//       orderItems: orderItemDetails.orderItems,
//     });

//     newOrder.save();
//     // if(orderSummary.couponCode!=null){

//     // }
//     this._handleSendOrderPlacedMessage(userDoc, orderItemDetails.orderItems);
//     this._handleSendOrderPlacedMail(userDoc, orderItemDetails.orderItems);
//     //saving order individually in db
//     await this._handleSaveIndividualOrders(userDoc, {
//       paymentType: paymentType,
//       deliveryType: orderSummary.deliveryType,
//       // storeLocation: orderSummary.pickUpDetails.storeLocation,
//       itemsCount: orderItemDetails.orderItemsCount,
//       orderData: orderItemDetails.orderItems,
//       orderNumber: orderNumber,
//       shippingDetails: {
//         shipDate: orderSummary.shippingDetails.shipDate,
//         deliveryAddress: orderSummary.shippingDetails.deliveryAddress,
//         deliveryDate: orderSummary.shippingDetails.deliveryDate,
//         deliveryDateInString: orderSummary.shippingDetails.deliveryDateInString,
//       },
//       pickUpDetails: {
//         pickUpDate: orderSummary.pickUpDetails.pickUpDate,
//         storeLocation: orderSummary.pickUpDetails.storeLocation,
//         pickUpTimeStart: orderSummary.pickUpDetails.pickUpTimeStart,
//         pickUpTimeEnd: orderSummary.pickUpDetails.pickUpTimeEnd,
//         pickUpTimeInString: orderSummary.pickUpDetails.pickUpTimeInString,
//         pickUpDateInString: orderSummary.pickUpDetails.pickUpDateInString,
//       },
//       couponCode: orderSummary.couponCode,
//       couponDiscount: couponDiscount,
//     });

//     await this.userModel.findByIdAndUpdate(userId, {
//       // $pull: { cartItems: orderItemDetails.orderItems },
//       orderSummary: {},
//     });
//     // return newOrder;
//     return {
//       orderNumber: orderNumber,
//       orderDate: Date.now(),
//       selectedPickUpDate: Date.now(),
//       deliveryDate: orderSummary.shippingDetails.deliveryDateInString,
//       pickUpDateInString: orderSummary.pickUpDetails.pickUpDateInString,
//       pickUpTimeInString: orderSummary.pickUpDetails.pickUpTimeInString,
//       paymentType: paymentTypes.PAY_AT_STORE,
//       deliveryType: orderSummary.deliveryType,
//       selectedAddress: orderSummary.shippingDetails.deliveryAddress,
//       selectedStore: orderSummary.pickUpDetails.storeLocation,
//       orderItems: orderItemDetails,
//     };
//     // await this.acceptOrder(orderItemDetails.orderItems[0].)
//   }