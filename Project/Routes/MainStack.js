import {
  MyTabs,
  Add,
  Product,
  ProductDetail,
  Accepted,
  Profile,
  AllProduct,
  Beverages,
  Order,
  Search,
  Selling,
  AllBestSell,
  ExclusiveProDucts,
  AllExclusive,
  UpdateUser,
  ErrorScreen,
  ItemOrders,
  PerparingOrder,
  Brand
} from "../index";

export default function (Stack) {
  return (
    <>
      <Stack.Screen name="MyTabs" component={MyTabs} />
      <Stack.Screen
        name="Add"
        component={Add}
        options={{ presentation: "modal" }}
      />

      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="AllProduct" component={AllProduct} />
      <Stack.Screen name="Beverages" component={Beverages} />
      <Stack.Screen name="Order" component={Order} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Selling" component={Selling} />
      <Stack.Screen
        name="Accepted"
        component={Accepted}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="AllBestSell" component={AllBestSell} />
      <Stack.Screen name="ExclusiveProDucts" component={ExclusiveProDucts} />
      <Stack.Screen name="AllExclusive" component={AllExclusive} />
      <Stack.Screen name="UpdateUser" component={UpdateUser} />
      <Stack.Screen name="ErrorScreen" component={ErrorScreen} />
      <Stack.Screen name="ItemOrders" component={ItemOrders} />
      <Stack.Screen name="PerparingOrder" component={PerparingOrder} />
      <Stack.Screen name="Brand" component={Brand} />
    </>
  );
}
