import { NextPage } from "next";
import Image from "next/image";
import { ChangeEvent, useCallback, useEffect, useRef, useMemo, useState } from "react";
import { JSONTree } from 'react-json-tree';

const theme = {
	scheme: 'monokai',
	author: 'wimer hazenberg (http://www.monokai.nl)',
	base00: '#272822',
	base01: '#383830',
	base02: '#49483e',
	base03: '#75715e',
	base04: '#a59f85',
	base05: '#f8f8f2',
	base06: '#f5f4f1',
	base07: '#f9f8f5',
	base08: '#f92672',
	base09: '#fd971f',
	base0A: '#f4bf75',
	base0B: '#a6e22e',
	base0C: '#a1efe4',
	base0D: '#66d9ef',
	base0E: '#ae81ff',
	base0F: '#cc6633',
};

const HomePage: NextPage = (props) => {
	const [files, setFiles] = useState<File[]>([])
	const [currentFile, setCurrentFile] = useState(0)
	const [fileData, setFileData] = useState("{}")
	const fileInputRef = useRef<HTMLInputElement>(null)
	const _fileHandler = useCallback((e: ChangeEvent<Element>) => {
		e.preventDefault()
		let array = fileInputRef.current.files
		let res: File[] = []
		for (let index = 0; index < array.length; index++) {

			res.push(array.item(index))
		}
		setFiles(res)
	}, [])

	useEffect(() => {
		initAsync()
		return () => {

		}
	}, [files])

	const initAsync = async () => {
		if (!files?.length) return
		setCurrentFile(0)
		if (!files?.length) return setFileData(await Promise.resolve("{}"))
		return setFileData(JSON.stringify(JSON.parse(await files[0].text()), null, 4))

	}
	const loadFileText = useCallback(async (index) => {
		if (!files?.length) return
		return setFileData(await files[index].text())
	}, [files])

	useEffect(() => { loadFileText(currentFile) }, [currentFile, loadFileText])
	return (
		<div className="p-32 mx-auto text-center">
			<h1 className="font-bold text-4xl">
				Prediction Engine Tuning

			</h1>
			<Image src="/icons/DRL.png" className="" alt="Prediction engine" height={144} // Desired size with correct aspect ratio
				width={144}></Image>

			<span onClick={(e) => {
				e.preventDefault()
				fileInputRef.current.click()
			}} className="m-auto hover:cursor-pointer flex flex-col justify-center items-center w-1/4 p-32 rounded-lg border-2 border-gray-300 shadow-md">
				<Image src="/icons/json.png" className="opacity-50" alt="json" height={144} // Desired size with correct aspect ratio
					width={144}></Image>
				<p className="font-semibold p-4">upload .json tunning files</p>
			</span>
			<input
				className="hidden"
				ref={fileInputRef}
				name="tunnings"
				multiple type="file"
				onChange={_fileHandler}></input>
			<hr className="my-14" />
			
			<h1 className="font-bold text-4xl">Reward Formula</h1>
			<hr className="my-14" />
			
			<h1 className="font-bold text-4xl">Loaded Tuning files</h1>
			<ul className="flex gap-2">
				{(files?.length > 0) && files.map((file, index) => <li className="p-4 rounded-md bg-blue-600 text-white" key={file.name}><button onClick={(e) => setCurrentFile(index)}>{file.name}</button></li>)}
			</ul>

			<hr className="my-14" />
			<h1 className="font-bold text-4xl">Visualization of the current file content: {files.length && files[currentFile].name}</h1>
			{(files?.length > 0) && <JSONTree theme={theme} invertTheme={false} data={fileData}></JSONTree>}
		</div>
	);
}
HomePage.getInitialProps = async (context) => {
	console.log(context.pathname)
	return {
		data: "Hello"
	}
}
export default HomePage