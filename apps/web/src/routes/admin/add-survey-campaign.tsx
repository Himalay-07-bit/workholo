// biome-ignore-all lint/performance/noJsxPropsBind: UI event handlers require access to component state.

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/add-survey-campaign")({
	component: AddSurveyCampaignPage,
});

type Question = {
	id: number;
	question: string;
	responseType: string;
	options: Array<{
		id: number;
		value: string;
	}>;
};

function AddSurveyCampaignPage() {
	const navigate = useNavigate();

	const [questions, setQuestions] = useState<Question[]>([
		{
			id: 1,
			question: "",
			responseType: "Dropdown",
			options: [{ id: 1, value: "" }],
		},
	]);

	const addQuestion = () => {
		const id = Date.now();

		setQuestions((current) => [
			...current,
			{
				id,
				question: "",
				responseType: "Dropdown",
				options: [{ id: id + 1, value: "" }],
			},
		]);
	};

	const removeQuestion = (questionId: number) => {
		setQuestions((current) => {
			if (current.length === 1) {
				return current;
			}

			return current.filter((question) => question.id !== questionId);
		});
	};

	const updateQuestion = (questionId: number, value: string) => {
		setQuestions((current) =>
			current.map((question) =>
				question.id === questionId ? { ...question, question: value } : question
			)
		);
	};

	const updateResponseType = (questionId: number, value: string) => {
		setQuestions((current) =>
			current.map((question) =>
				question.id === questionId
					? { ...question, responseType: value }
					: question
			)
		);
	};

	const addOption = (questionId: number) => {
		setQuestions((current) =>
			current.map((question) =>
				question.id === questionId
					? {
							...question,
							options: [...question.options, { id: Date.now(), value: "" }],
						}
					: question
			)
		);
	};

	const updateOption = (
		questionId: number,
		optionIndex: number,
		value: string
	) => {
		setQuestions((current) =>
			current.map((question) => {
				if (question.id !== questionId) {
					return question;
				}

				const options = question.options.map((option, index) =>
					index === optionIndex ? { ...option, value } : option
				);

				return {
					...question,
					options,
				};
			})
		);
	};

	const removeOption = (questionId: number, optionIndex: number) => {
		setQuestions((current) =>
			current.map((question) => {
				if (question.id !== questionId) {
					return question;
				}

				if (question.options.length === 1) {
					return question;
				}

				return {
					...question,
					options: question.options.filter((_, index) => index !== optionIndex),
				};
			})
		);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// UI only for now.
	};

	const handleCancel = () => {
		navigate({
			to: "/admin/survey-campaigns",
		});
	};

	return (
		<div className="flex min-h-svh flex-col bg-[#eef3f9] dark:bg-slate-950">
			<AdminTopbar />

			<main className="flex-1 p-4 md:p-6">
				<div className="mx-auto max-w-[1500px]">
					<section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
						{/* HEADER */}
						<div className="border-slate-100 border-b px-5 py-4 dark:border-slate-800">
							<h1 className="font-bold text-[#102b55] text-lg tracking-tight dark:text-white">
								Add Survey Campaign
							</h1>

							<p className="mt-0.5 text-slate-400 text-xs dark:text-slate-500">
								Create and configure a new survey campaign.
							</p>
						</div>

						<form onSubmit={handleSubmit}>
							{/* BASIC DETAILS */}
							<div className="border-slate-100 border-b p-5 md:p-6 dark:border-slate-800">
								<div className="mb-5">
									<h2 className="font-semibold text-[#102b55] text-sm dark:text-white">
										Basic Details
									</h2>

									<p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">
										Configure the basic information displayed for the survey.
									</p>
								</div>

								<div className="grid gap-x-8 gap-y-5 md:grid-cols-2">
									<div>
										<FormField htmlFor="survey-name" label="Name">
											<Input
												className={inputClassName}
												id="survey-name"
												placeholder="Enter survey name"
											/>
										</FormField>

										<FormField htmlFor="survey-page-topic" label="Page Topic">
											<Input
												className={inputClassName}
												id="survey-page-topic"
												placeholder="Enter page topic"
											/>
										</FormField>
									</div>

									<div>
										<FormField
											htmlFor="survey-page-heading"
											label="Page Heading"
										>
											<Input
												className={inputClassName}
												id="survey-page-heading"
												placeholder="Enter page heading"
											/>
										</FormField>

										<FormField htmlFor="survey-page-image" label="Page Image">
											<input
												accept=".png,.jpg,.jpeg"
												className="block h-9 w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-600 text-xs outline-none transition-all file:mr-3 file:border-0 file:bg-transparent file:font-medium file:text-slate-600 focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:file:text-slate-300"
												id="survey-page-image"
												type="file"
											/>

											<p className="mt-1.5 text-[10px] text-slate-400 leading-4 dark:text-slate-500">
												Max size 5MB. Accepted format: *.png, *.jpeg.
												<br />
												Max height: 600px, max width: 160px.
											</p>
										</FormField>
									</div>
								</div>
							</div>

							{/* BULK UPLOAD */}
							<div className="border-slate-100 border-b p-5 md:p-6 dark:border-slate-800">
								<div className="mb-4">
									<h2 className="font-semibold text-[#102b55] text-sm dark:text-white">
										Bulk Upload Questions
									</h2>

									<p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">
										Upload multiple questions using a CSV file.
									</p>
								</div>

								<div className="grid gap-5 md:grid-cols-2">
									<div>
										<Button
											className="h-9 rounded-lg border-slate-200 px-4 text-slate-600 text-xs dark:border-slate-700 dark:text-slate-300"
											type="button"
											variant="outline"
										>
											↓<span className="ml-1">Sample CSV</span>
										</Button>
									</div>

									<div>
										<label className="sr-only" htmlFor="bulk-question-file">
											Upload Questions CSV
										</label>

										<input
											accept=".csv"
											className="block h-9 w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-600 text-xs outline-none transition-all file:mr-3 file:border-0 file:bg-transparent file:font-medium file:text-slate-600 focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:file:text-slate-300"
											id="bulk-question-file"
											type="file"
										/>
									</div>
								</div>
							</div>

							{/* FORM DETAILS */}
							<div className="p-5 md:p-6">
								<div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
									<div>
										<h2 className="font-semibold text-[#102b55] text-sm dark:text-white">
											Form Details
										</h2>

										<p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">
											Add questions and configure their response options.
										</p>
									</div>

									<Button
										className="h-9 rounded-lg border-slate-200 px-4 text-slate-600 text-xs dark:border-slate-700 dark:text-slate-300"
										onClick={addQuestion}
										type="button"
										variant="outline"
									>
										<Plus className="mr-1.5 size-3.5" />
										Add Question
									</Button>
								</div>

								<div className="space-y-5">
									{questions.map((question, questionIndex) => (
										<div
											className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800"
											key={question.id}
										>
											<div className="border-slate-100 border-b bg-slate-50/70 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/50">
												<div className="flex items-center justify-between gap-3">
													<h3 className="font-semibold text-[#102b55] text-xs dark:text-white">
														Question {questionIndex + 1}
													</h3>

													<Button
														className="h-8 rounded-lg border-red-200 px-3 text-[11px] text-red-500 hover:bg-red-50 hover:text-red-600 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/30"
														disabled={questions.length === 1}
														onClick={() => removeQuestion(question.id)}
														type="button"
														variant="outline"
													>
														<Trash2 className="mr-1.5 size-3.5" />
														Remove
													</Button>
												</div>
											</div>

											<div className="p-4 md:p-5">
												<div className="grid gap-x-8 gap-y-5 md:grid-cols-[1fr_250px]">
													{/* QUESTION */}
													<FormField
														htmlFor={`question-${question.id}`}
														label="Question"
													>
														<Input
															className={inputClassName}
															id={`question-${question.id}`}
															onChange={(event) =>
																updateQuestion(question.id, event.target.value)
															}
															placeholder="Enter question"
															value={question.question}
														/>
													</FormField>

													{/* RESPONSE TYPE */}
													<FormField
														htmlFor={`response-type-${question.id}`}
														label="Response Type"
													>
														<select
															className={selectClassName}
															id={`response-type-${question.id}`}
															onChange={(event) =>
																updateResponseType(
																	question.id,
																	event.target.value
																)
															}
															value={question.responseType}
														>
															<option value="Dropdown">Dropdown</option>
															<option value="Text">Text</option>
															<option value="Radio">Radio</option>
															<option value="Checkbox">Checkbox</option>
														</select>
													</FormField>
												</div>

												{/* OPTIONS */}
												<div className="mt-1 max-w-[850px]">
													<div className="mb-3">
														<h4 className="font-medium text-slate-600 text-xs dark:text-slate-300">
															Response Options
														</h4>
													</div>

													<div className="space-y-3">
														{question.options.map((option, optionIndex) => (
															<div
																className="flex items-end gap-2"
																key={option.id}
															>
																<div className="min-w-0 flex-1">
																	<FormField
																		htmlFor={`option-${question.id}-${optionIndex}`}
																		label={`Option ${optionIndex + 1}`}
																	>
																		<Input
																			className={inputClassName}
																			id={`option-${question.id}-${optionIndex}`}
																			onChange={(event) =>
																				updateOption(
																					question.id,
																					optionIndex,
																					event.target.value
																				)
																			}
																			placeholder={`Enter option ${optionIndex + 1}`}
																			value={option.value}
																		/>
																	</FormField>
																</div>

																<Button
																	className="mb-6 h-9 rounded-lg border-slate-200 px-3 text-[11px] text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
																	disabled={question.options.length === 1}
																	onClick={() =>
																		removeOption(question.id, optionIndex)
																	}
																	type="button"
																	variant="outline"
																>
																	<Trash2 className="mr-1 size-3.5" />
																	Remove
																</Button>
															</div>
														))}
													</div>

													<Button
														className="mt-2 h-8 rounded-lg border-slate-200 px-3 text-[11px] text-slate-600 dark:border-slate-700 dark:text-slate-300"
														onClick={() => addOption(question.id)}
														type="button"
														variant="outline"
													>
														<Plus className="mr-1 size-3.5" />
														Add Option
													</Button>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* FOOTER */}
							<div className="flex flex-wrap justify-end gap-2 border-slate-100 border-t px-5 py-4 dark:border-slate-800">
								<Button
									className="h-9 rounded-lg border-slate-200 px-4 text-slate-600 text-xs dark:border-slate-700 dark:text-slate-300"
									onClick={handleCancel}
									type="button"
									variant="outline"
								>
									Cancel
								</Button>

								<Button
									className="h-9 rounded-lg bg-[#0757ff] px-5 text-xs shadow-blue-500/20 shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
									type="submit"
								>
									Save Campaign
								</Button>
							</div>
						</form>
					</section>
				</div>
			</main>
		</div>
	);
}

const inputClassName =
	"h-9 rounded-lg border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-none placeholder:text-slate-400 focus-visible:border-[#0757ff] focus-visible:ring-4 focus-visible:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:placeholder:text-slate-500";

const selectClassName =
	"h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-700 text-xs outline-none transition-all focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200";

function FormField({
	children,
	label,
	htmlFor,
}: {
	children: React.ReactNode;
	label: string;
	htmlFor: string;
}) {
	return (
		<div className="mb-5 space-y-2">
			<label
				className="font-medium text-slate-500 text-xs dark:text-slate-400"
				htmlFor={htmlFor}
			>
				{label}
			</label>

			{children}
		</div>
	);
}
