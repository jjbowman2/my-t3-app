import type { NextPage } from "next";
import Head from "next/head";
import NewDog from "../components/new-dog";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>New Dog</title>
				<meta
					name="description"
					content="Add a new dog (mutation example)"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="w-screen min-h-screen flex flex-col justify-center items-center p-4 overflow-y-scroll">
				<NewDog />
			</div>
		</>
	);
};

export default Home;
