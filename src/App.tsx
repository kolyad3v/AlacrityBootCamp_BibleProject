import { FC, useState } from "react";
import { ToastContainer } from "react-toastify";

import "./App.scss";
import FileLoad from "./components/FileLoad";

const App: FC = () => {
	// useMemo(() => first, [second]);

	const [textDictionary, setTextDictionary] = useState<
		Record<string | number, number>
	>({});

	const [searchTerm, setSearchTerm] = useState<string>("");

	return (
		<>
			<main>
				<div>
					<FileLoad
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
						setTextDictionary={setTextDictionary}
					/>
					<h1>Appears in text: {searchTerm && textDictionary[searchTerm]}</h1>
					<p></p>
				</div>
			</main>
			<div>
				<ToastContainer />
			</div>
		</>
	);
};

export default App;
