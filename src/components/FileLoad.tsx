import { FC } from "react";
import axios from "axios";
import { Id, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface IFileLoad {
	searchTerm: string;
	setTextDictionary: any;
	setSearchTerm: any;
}
const FileLoad: FC<IFileLoad> = ({
	searchTerm,
	setSearchTerm,
	setTextDictionary,
}) => {
	let toastId: Id;
	const fetchLocalFile = async (url: string): Promise<null | string> => {
		try {
			toastId = toast.loading("Loading file...", {});
			const response = await axios.get(url);

			return response.data;
		} catch (error) {
			console.log(error);
			return null;
		}
	};

	const loadFile = async () => {
		let file = await fetchLocalFile("/bible.txt");
		if (file) {
			processFileToDictionary(file);
			return;
		}
		throw new Error("Error loading file");
	};

	const processFileToDictionary = (text: string) => {
		let dictionary: Record<string | number, number> = {};
		text.split(" ").forEach((el) => {
			dictionary[el] = (dictionary[el] || 0) + 1;
		});
		setTextDictionary({ ...dictionary });
		setTimeout(() => {
			toast.success("Content Loaded!", {
				closeOnClick: true,
			});
			toast.dismiss(toastId);
		}, 2000);
	};

	return (
		<form>
			<label htmlFor="searchInput">Search</label>
			<input
				type="text"
				id="searchInput"
				placeholder="Search For"
				value={searchTerm}
				onChange={(e) => {
					setSearchTerm(e.target.value);
				}}
			/>
			<button
				onClick={(e) => {
					e.preventDefault();
					loadFile();
				}}>
				Load File
			</button>
		</form>
	);
};

export default FileLoad;
