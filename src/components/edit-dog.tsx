import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
import { DogProps } from "./dog";

type FormValues = {
	name: string;
	breed: string;
	age: string;
};

const EditDog: React.FC<DogProps> = ({ id, name, breed, age }: DogProps) => {
	const { register, handleSubmit } = useForm<FormValues>({
		defaultValues: {
			age: age.toString(),
			name,
			breed,
		},
	});
	const router = useRouter();
	const editDogMutation = trpc.useMutation(["dog.editDog"]);
	const onSubmit = handleSubmit((data) => {
		const dog = { ...data, age: Number.parseInt(data.age), id };
		editDogMutation.mutate(dog, {
			onSuccess: () => router.push(`/${id}`),
		});
	});
	return (
		<>
			<h1 className="text-5xl text-teal-700">Edit {name}</h1>
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
					Edit {name}
				</button>
				<Link href={`/${id}`}>
					<button className="bg-orange-200 text-slate-600 rounded-md px-4 py-2 mt-2">
						Cancel
					</button>
				</Link>
			</form>
		</>
	);
};

export default EditDog;
