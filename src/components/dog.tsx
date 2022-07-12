import { useRouter } from "next/router";

export type DogProps = {
	id: string;
	name: string;
	breed: string;
	age: number;
};

const Dog: React.FC<DogProps> = ({ id, name, breed, age }: DogProps) => {
	const router = useRouter();
	return (
		<div
			className="flex flex-col justify-start cursor-pointer"
			onClick={() => router.push(`/${id}`)}
		>
			<h2 className="text-xl text-slate-700">{name}</h2>
			<p className="text-md text-slate-600">{breed}</p>
			<p className="text-sm text-slate-600">
				{age} year{age > 1 ? "s" : ""}
			</p>
		</div>
	);
};

export default Dog;
