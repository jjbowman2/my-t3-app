import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";

type FormValues = {
	name: string;
	breed: string;
	age: string;
};

const NewDog: React.FC = () => {
	const { register, handleSubmit } = useForm<FormValues>();
	const router = useRouter();
	const onSubmit = handleSubmit((data) => {
		const dog = { ...data, age: Number.parseInt(data.age) };
		createDogMutation.mutate(dog, {
			onSuccess: () => router.push("/"),
		});
	});
	const createDogMutation = trpc.useMutation(["dog.createDog"]);
	return (
		<>
			<h1 className="text-5xl text-teal-700">Add a dog</h1>
			<form onSubmit={onSubmit} className="flex flex-col">
				<label htmlFor="nameField" className="mt-1">
					Name:
				</label>
				<input
					id="nameField"
					{...register("name", { required: true })}
					placeholder="Enter the dog's name"
				/>
				<label htmlFor="breedField" className="mt-1">
					Breed:
				</label>
				<input
					id="breedField"
					{...register("breed", { required: true })}
					placeholder="Enter the dog's breed"
				/>
				<label htmlFor="ageField" className="mt-1">
					Age:
				</label>
				<input
					id="ageField"
					{...register("age", { required: true, min: 0 })}
					type="number"
					placeholder="Enter the dog's age"
				/>
				<button
					type="submit"
					className="bg-orange-500 text-slate-100 rounded-md px-4 py-2 mt-2"
				>
					Add dog
				</button>
			</form>
		</>
	);
};

export default NewDog;
