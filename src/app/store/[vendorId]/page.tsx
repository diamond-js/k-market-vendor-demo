"use client";
import AppButton from "@/components/AppButton";
import AppIcon from "@/components/AppIcon";
import { LoadingModal } from "@/components/LoadingModal";
import Logo from "@/components/Logo";
import { ProductItem } from "@/components/Product";
import { CartIcon, ChevronDown } from "@/components/icons";
import { db } from "@/lib/AppFirebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Cart, { CartItem } from "./Cart";

type Props = {
  params: {
    [param: string]: any;
  };
};

type Vendor = {
  id: string | number;
  businessDescription: string;
  businessName: string;
  user: string;
};

const page = ({ params }: Props) => {
  const vendorId = params?.vendorId;

  const [cart, setCart] = useState<CartItem[]>([]);

  const [isLoadingVendor, setIsLoadingVendor] = useState(true);
  const [vendor, setVendor] = useState<Vendor | null>();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [products, setProducts] = useState<ProductItem[]>([]);

  const [showCart, setShowCart] = useState(false);

  async function fetchVendorDetails() {
    try {
      setIsLoadingVendor(true);
      const vendorsRef = doc(db, "vendors", vendorId);

      const vendorDoc = await getDoc(vendorsRef);

      const data: any = vendorDoc.data();

      const productsQuery = query(
        collection(db, "products"),
        where("user", "==", vendorDoc.id)
      );

      const productsSnapshot = await getDocs(productsQuery);
      const productsDocs: any = productsSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      setVendor({ id: vendorDoc.id, ...data });
      setProducts(productsDocs);
    } catch (err) {
      alert("Sorry, could not fetch vendor details, please try again");
      console.log(
        "Sorry and error occurred while fetching vendor datails",
        err
      );
    } finally {
      setIsLoadingVendor(false);
    }
  }

  function toggleItemInCart(product: ProductItem) {
    if (!product.id) return;

    if (cart.find((item) => item.product.id === product.id)) {
      setCart((prev) => prev.filter((item) => item.product.id !== product.id));
      return;
    }

    setCart((prev) => [...prev, { product, quantity: 1 }]);
  }

  function changeItemQuantity(product: ProductItem, quantity: number) {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.product.id === product.id) item.quantity = quantity;
        return item;
      });
    });
  }

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") ?? "[]");
    setCart(savedCart);
    fetchVendorDetails();
    return () => {};
  }, []);

  // useEffect to save user cart to local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    return () => {};
  }, [cart]);

  if (isLoadingVendor) return <LoadingModal />;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <nav className="mb-10 grid grid-cols-2 md:grid-cols-3 justify-between items-center gap-y-8 relative">
        <Logo
          size="h-6"
          className="block"
        />

        <div className="md:justify-self-center">
          <button
            className="bg-gray-100 hover:bg-white flex items-center justify-center gap-2 rounded-lg py-2 px-3 capitalize"
            onClick={() => setShowProfileDropdown((p) => !p)}
          >
            {vendor?.businessName}
            <AppIcon className={showProfileDropdown ? "rotate-180" : ""}>
              <ChevronDown />
            </AppIcon>
          </button>

          {showProfileDropdown && (
            <div className="absolute max-w-md bg-white p-4 top-full translate-y-3 left-1/2 -translate-x-1/2 inset-x-0 rounded-lg border border-gray-200 shadow-xl flex flex-col">
              <h4 className="mb-3 font-bold text-lg capitalize">
                {vendor?.businessName}
              </h4>
              <p className="mb-3">{vendor?.businessDescription}</p>
              <AppButton>View Profile</AppButton>
            </div>
          )}
        </div>

        <AppIcon
          onClick={() => setShowCart(true)}
          className="col-start-2 justify-self-end md:justify-self-center row-start-1 md:col-start-[none] block w-12 h-12 border border-gray-100 rounded-lg text-gray-700 relative text-lg"
        >
          <i className="text-white bg-red-600 rounded-full leading-none text-xs w-4 h-4 flex items-center justify-center font-sans font-bold absolute top-0 -translate-y-1/2 right-0 translate-x-1/2 not-italic">
            {cart.length}
          </i>
          <CartIcon />
        </AppIcon>
      </nav>

      <header>
        <h3 className="font-bold text-lg">Products</h3>
      </header>
      <p className="mb-4">
        Browse through <b>{vendor?.businessName}</b> store
      </p>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
        {products.map((product) => {
          return (
            <ProductItem
              key={product.id}
              product={product}
              isInCart={
                cart.find((it) => it.product.id === product.id) ? true : false
              }
              addToCart={toggleItemInCart}
              removeFromCart={toggleItemInCart}
            />
          );
        })}
      </main>

      {showCart && (
        <Cart
          onClose={() => setShowCart(false)}
          cart={cart}
          removeItemFromCart={toggleItemInCart}
          changeItemQuantity={changeItemQuantity}
          vendorId={vendorId}
        />
      )}
    </div>
  );
};

type ProductItemProp = {
  product: ProductItem;
  isInCart: boolean;
  addToCart: (product: ProductItem) => void;
  removeFromCart: (product: ProductItem) => void;
};

function ProductItem({
  product,
  addToCart,
  removeFromCart,
  isInCart,
}: ProductItemProp) {
  return (
    <div className="border-gray-200 border p-4 rounded-lg">
      <img
        src={product.imgLink}
        alt={product.name}
        className="w-full aspect-video object-cover bg-gray-200 rounded-lg mb-3"
      />
      <p className="text-lg font-bold mb-3">{product.name}</p>
      <p className="mb-3">{product.desc}</p>

      <footer className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-lg font-bold">N{product.price}</p>

        <button
          className="border bg-gray-800 rounded-lg text-white px-4 py-2"
          onClick={() =>
            isInCart ? removeFromCart(product) : addToCart(product)
          }
        >
          {isInCart ? "Remove from" : "Add to"} cart
        </button>
      </footer>
    </div>
  );
}

export default page;
