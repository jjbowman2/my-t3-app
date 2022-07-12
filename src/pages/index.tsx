import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import DogsList from "../components/dogs-list";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Dogs</title>
				<meta name="description" content="Example page" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="w-screen min-h-screen flex flex-col justify-center items-center p-4 overflow-y-scroll">
				<h1 className="text-5xl text-teal-700">Dogs</h1>
				<DogsList />
				<Link href="/new">
					<a className="bg-orange-500 text-slate-100 rounded-md px-4 py-2 mt-2">
						Add a dog
					</a>
				</Link>
			</div>
		</>
	);
};

export default Home;
