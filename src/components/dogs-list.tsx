import { trpc } from "../utils/trpc";
import Dog from "./dog";

const DogsList: React.FC = () => {
	const dogs = trpc.useQuery(["dog.getAll"]);

	if (dogs.isLoading) {
		return <p className="text-xl mt-2">Loading...</p>;
	}

	if (dogs.error) {
		return (
			<p className="text-xl mt-2">
				Someone must have let the dogs out... :(
			</p>
		);
	}

	if (!dogs.data?.length) {
		return (
			<p className="text-xl mt-2">We don&apos;t have any dogs... :(</p>
		);
	}

	return (
		<>
			{dogs.data.map((dog) => (
				<Dog key={dog.id} {...dog} />
			))}
		</>
	);
};

export default DogsList;
