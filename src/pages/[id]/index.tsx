import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Dog from "../../components/dog";
import { trpc } from "../../utils/trpc";

const Home: NextPage = () => {
	const router = useRouter();
	const id = router.query?.id;
	const dog = trpc.useQuery(["dog.byId", id?.toString() ?? ""], {
		enabled: !!id,
	});

	const removeDogMutation = trpc.useMutation("dog.removeDog");

	const removeDog = () => {
		removeDogMutation.mutate(id?.toString() ?? "", {
			onSuccess: () => router.push("/"),
		});
	};

	if (dog.isLoading || dog.isError || !dog.data) {
		return null;
	}

	return (
		<>
			<Head>
				<title>{dog.data?.name}</title>
				<meta name="description" content="Example page" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="w-screen min-h-screen flex flex-col justify-center items-center p-4 overflow-y-scroll">
				<Dog {...dog.data} />
				<Link href={`/${dog.data.id}/edit`}>
					<a className="bg-orange-500 text-slate-100 rounded-md px-4 py-2 mt-2">
						Edit {dog.data.name}
					</a>
				</Link>
				<button
					onClick={removeDog}
					className="bg-red-200 text-slate-700 rounded-md px-4 py-2 mt-2"
				>
					Remove {dog.data.name}
				</button>
				<Link href="/">
					<a className="bg-orange-200 text-slate-600 rounded-md px-4 py-2 mt-2">
						Back to dogs
					</a>
				</Link>
			</div>
		</>
	);
};

export default Home;
