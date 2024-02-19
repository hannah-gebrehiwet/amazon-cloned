import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import classes from "./Results.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { producturl } from "../../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader"

function Results() {
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { categoryName } = useParams();

	useEffect(() => {
		axios
			.get(`${producturl}/products/category/${categoryName}`)
			.then((res) => {
				setResults(res.data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [categoryName]);

	return (
		<Layout>
			<section>
				<h1 style={{ padding: "30px" }}>Results</h1>
				<p style={{ padding: "30px" }}>Category/ {categoryName}</p>
				<hr />
				{isLoading ? (
					<Loader />
				) : (
					<div className={classes.products_container}>
						{results?.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
					</div>
				)}
			</section>
		</Layout>
	);
}

export default Results;
