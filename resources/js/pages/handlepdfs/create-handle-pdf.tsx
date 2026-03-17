import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { router } from '@inertiajs/react';
import { Button } from '@headlessui/react';
import { PDF_TYPES } from '@/constants/pdfTypes';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'HandlePdfs',
		href: '/handlepdfs',
	},
	{
		title: 'Create',
		href: '/handlepdfs/create',
	},
];

export default function CreateHandlePdf() {
	const [isDragging, setIsDragging] = useState(false);
	const [filePreview, setFilePreview] = useState<string | null>(null);
	const [fileInfo, setFileInfo] = useState<{
		name: string;
		size: string;
		type: string;
	} | null>(null);
	const [loading, setLoading] = useState(false);
	const [fileExt, setFileExt] = useState<string | null>(null);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const openPicker = () => fileInputRef.current?.click();

	const handleFile = (file: File) => {
		setLoading(true);
		setFileInfo({
			name: file.name,
			size: (file.size / 1024 / 1024).toFixed(2) + " MB",
			type: file.type || "Unknown",
		});

		const ext = file.name.split(".").pop()?.toLowerCase() || "";
		setFileExt(ext);

		// Ảnh preview
		if (["jpg", "jpeg", "png", "webp"].includes(ext)) {
			setFilePreview(URL.createObjectURL(file));
			setLoading(false);
			onFileSelect?.(file);
			return;
		}

		// PDF → dùng iframe
		if (ext === "pdf") {
			setFilePreview(URL.createObjectURL(file));
			setLoading(false);
			onFileSelect?.(file);
			return;
		}

		// CBR/CBZ → icon mặc định
		if (["cbr", "cbz"].includes(ext)) {
			setFilePreview("/icons/comic-default.png");
			setLoading(false);
			onFileSelect?.(file);
			return;
		}

		setLoading(false);
	};

	function handleSubmit() {
		if (!title) {
			toast.error("Please enter title")
			return
		}

		if (!selectedFile) {
			toast.error("Please select a file")
			return
		}

		if (!selectedTypePdf) {
			toast.error("Please select type pdf")
			return
		}

		const formData = new FormData()
		formData.append("title", title)
		formData.append("type_pdf", selectedTypePdf.toString())
		formData.append("file_path", selectedFile)

		router.post("/handlepdfs", formData, {
			forceFormData: true,
			onStart: () => setLoading(true),
			onFinish: () => setLoading(false),
			onSuccess: () => {
				toast.success("Upload success")
			},
			onError: () => {
				toast.error("Upload failed")
			}
		})
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) handleFile(file);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
		const file = e.dataTransfer.files?.[0];
		if (file) handleFile(file);
	};

	const [selectedTypePdf, setSelectedTypePdf] = useState<number | null>(null);
	const type_pdfs = [
		{ label: "Comic", value: PDF_TYPES.COMIC },
		{ label: "Text", value: PDF_TYPES.TEXT },
	];

	const [title, setTitle] = useState("");
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const onFileSelect = (file: File) => {
		setSelectedFile(file);
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Create HandlePdf" />
			<div className="mx-auto max-w-4xl">

				{/* PageHeading */}
				<div className="flex flex-col gap-3 mb-8">
					<h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
						Comic to Video
					</h1>
					<p className="text-slate-500 dark:text-[#92a4c9] text-base font-normal leading-normal">
						Upload your comic book file to begin the AI-powered video creation process.
					</p>
				</div>

				{/* ProgressBar */}
				<div className="flex flex-col gap-3 mb-8">
					<div className="flex items-center justify-between">
						<p className="text-slate-900 dark:text-white text-base font-bold leading-normal">
							1. Upload File
						</p>
						<p className="text-slate-400 dark:text-slate-500 text-base font-medium leading-normal">
							2. Configure
						</p>
						<p className="text-slate-400 dark:text-slate-500 text-base font-medium leading-normal">
							3. Generate
						</p>
						<p className="text-slate-400 dark:text-slate-500 text-base font-medium leading-normal">
							4.
						</p>
					</div>

					<div className="w-full rounded bg-slate-200 dark:bg-[#324467]">
						<div className="h-2 rounded bg-primary" style={{ width: "25%" }}></div>
					</div>
				</div>

				<div className="grid md:grid-cols-3 gap-6 items-start">
					<div className="mb-8 md:col-span-1">
						<div className="flex flex-col gap-4">
							{/* <p className="text-lg font-bold text-slate-900 dark:text-white">
                                Upload File
                            </p> */}

							<div
								onDragOver={(e) => {
									e.preventDefault();
									setIsDragging(true);
								}}
								onDragLeave={() => setIsDragging(false)}
								onDrop={handleDrop}
								className={`
                                flex flex-col items-center justify-center gap-4 p-10 rounded-xl border-2 border-dashed
                                transition-all
                                ${isDragging ? "border-primary bg-primary/10" : "border-slate-300 dark:border-slate-600"}
                            `}
							>
								{/* LOADING ICON */}
								{loading ? (
									<div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
								) : filePreview ? (
									<>
										{/* IMAGE / PDF PREVIEW UI */}
										<div className="w-40 h-60 overflow-hidden rounded-lg shadow-md bg-slate-200 dark:bg-slate-700">
											{filePreview && fileExt === "pdf" ? (
												<iframe src={filePreview} className="w-full h-full" />
											) : (
												<img src={filePreview} className="w-full h-full object-cover" />
											)}
										</div>

										{/* Info */}
										{fileInfo && (
											<div className="text-center text-slate-700 dark:text-slate-300">
												<p className="font-semibold">{fileInfo.name}</p>
												<p className="text-sm text-slate-500">
													{fileInfo.size} – {fileInfo.type}
												</p>
											</div>
										)}
									</>
								) : (
									<>
										<span className="material-symbols-outlined text-primary text-5xl">
											upload
										</span>

										<p className="text-slate-500 dark:text-slate-400 text-center">
											Drag & drop your file here or click to browse.
										</p>

										<p className="text-slate-400 dark:text-slate-500 text-sm">
											Supports: PDF, CBR, CBZ, Images
										</p>
									</>
								)}

								<input
									type="file"
									ref={fileInputRef}
									className="hidden"
									accept=".pdf,.cbz,.cbr,.jpg,.png,.jpeg,.webp"
									onChange={handleChange}
								/>

								<button
									onClick={openPicker}
									className="mt-2 bg-indigo-900 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-900/90"
								>
									Browse Files
								</button>
							</div>
						</div>
					</div>

					<div className="md:col-span-2">
						<div className="flex flex-col items-stretch justify-start rounded-xl bg-white dark:bg-[#192233] p-6 shadow-sm">
							<div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-4">
								<div className="flex flex-col gap-6">
									<div>
										<label
											htmlFor="title-pdf"
											className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
										>
											Title PDF
										</label>

										<input
											id="title-pdf"
											type="text"
											value={title}
											onChange={(e) => setTitle(e.target.value)}
											placeholder="Enter title PDF"
											className="w-full rounded-md border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-primary focus:border-primary px-2 py-1"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
											Type PDF
										</label>
										<div className="flex gap-2">
											{type_pdfs.map((type_pdf) => {
												const isActive = selectedTypePdf === type_pdf.value;

												return (
													<button
														key={type_pdf.value}
														onClick={() => setSelectedTypePdf(type_pdf.value)}
														className={`
                                                            flex-1 py-2 px-3 text-sm rounded-md border
                                                            transition-all
                                                            ${isActive
																? "bg-white text-slate-500 text-4xl font-bold border-blue-800 border-2"
																: "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-transparent border-2 font-medium"
															}
                                                        `}
													>
														{type_pdf.label}
													</button>
												);
											})}
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* Action Buttons */}
						<div className="mt-8 flex justify-end gap-4">
							<Button
								onClick={() => handleSubmit()}
								disabled={loading}
							>
								{loading ? "Uploading..." : "Next: Configure"}
							</Button>
						</div>
					</div>
				</div>

			</div>
		</AppLayout>
	);
}