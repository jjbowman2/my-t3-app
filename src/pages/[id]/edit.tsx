import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import EditDog from "../../components/edit-dog";
import { trpc } from "../../utils/trpc";

const Home: NextPage = () => {
	const router = useRouter();
	const id = router.query?.id;
	const dog = trpc.useQuery(["dog.byId", id?.toString() ?? ""], {
		enabled: !!id,
	});

	if (dog.isLoading || dog.isError || !dog.data) {
		return null;
	}
	return (
		<>
			<Head>
				<title>Edit {dog.data.name}</title>
				<meta
					name="description"
					content="Edit a dog (mutation example)"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="w-screen min-h-screen flex flex-col justify-center items-center p-4 overflow-y-scroll">
				<EditDog {...dog.data} />
			</div>
		</>
	);
};

export default Home;
