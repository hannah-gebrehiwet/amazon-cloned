
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/cart/Cart";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import Results from "./Pages/Results/Results";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./Components/protectedRoute/protectedRoute";

const stripePromise = loadStripe(
	"pk_live_51OjiNPCbf6EHuIMmgo2bjiIgGZ52Un7ljOkztgPOaX0aWHcnJTXy6Y4b5rkzjFMpSZ5gbQiKHDk9a1aH9NqGHiM300ZNCFqRHy"
);

function Routing() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/auth" element={<Auth />} />
				<Route
					path="/payments"
					element={
						<ProtectedRoute
							msg={"you must login to pay"}
							redirect={"/payments"}
						>
							<Elements stripe={stripePromise}>
								<Payment />
							</Elements>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/orders"
					element={
						<ProtectedRoute
							msg={"you must login to access your orders"}
							redirect={"/orders"}
						>
							<Orders />
						</ProtectedRoute>
					}
				/>
				<Route path="/category/:categoryName" element={<Results />} />
				<Route path="/products/:productId" element={<ProductDetail />} />
				<Route path="/cart" element={<Cart />} />
			</Routes>
		</Router>
	);
}

export default Routing;