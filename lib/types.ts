export type RootStackParamList = {
  index: undefined;
  tabs: undefined; 
  signIn: undefined;
  signUp: undefined;
  verifyEmail: undefined;
  notification: undefined;
  resetPassword: undefined;
  Resetverification: undefined;
  ProductDetail: { product: Product };
  Customerservice: undefined;
  MyOrder: undefined;
  HelpCenter: undefined;
  PaymentMethod: undefined;
  AddCard: undefined;
  Mydetail: undefined;
  userinfo: undefined;
  wishlist: { wishlist: Product[] };
  Cart: undefined;
};

export interface Product {
  $id: string;
  name: string;
  images: string | string[];
  price: number;
  description: string;
  location: string;
}

export type TabParamList = {
  Home: undefined;
  Wallet: undefined;
  Create: undefined;
  Cart: undefined;
  Account: undefined;
};

export const formatPrice = (price: number): string => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0, 
  });
};