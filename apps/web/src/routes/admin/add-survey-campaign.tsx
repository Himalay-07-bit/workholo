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
		setQuestions((current) => [
			...current,
			{
				id: Date.now(),
				question: "",
				responseType: "Dropdown",
				options: [{ id: Date.now(), value: "" }],
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
		<div className="flex min-h-svh flex-col">
			<AdminTopbar />

			<main className="flex-1 bg-muted/30 p-4 md:p-6">
				<section className="overflow-hidden rounded-md border bg-background">
					{/* Header */}
					<div className="border-b px-4 py-3">
						<h1 className="font-medium text-lg">Add Survey Campaign</h1>
					</div>

					<form onSubmit={handleSubmit}>
						{/* Basic details */}
						<div className="grid gap-x-10 gap-y-6 border-b p-5 md:grid-cols-2">
							<div>
								<FormField htmlFor="survey-name" label="Name">
									<Input
										className="h-10 rounded-none border-0 border-slate-200 border-b bg-transparent px-0 shadow-none focus-visible:border-[#0757ff] focus-visible:ring-0 dark:border-slate-700"
										id="survey-name"
									/>
								</FormField>

								<FormField htmlFor="survey-page-topic" label="Page Topic">
									<Input
										className="h-10 rounded-none border-0 border-slate-200 border-b bg-transparent px-0 shadow-none focus-visible:border-[#0757ff] focus-visible:ring-0 dark:border-slate-700"
										id="survey-page-topic"
									/>
								</FormField>
							</div>

							<div>
								<FormField htmlFor="survey-page-heading" label="Page Heading">
									<Input
										className="h-10 rounded-none border-0 border-slate-200 border-b bg-transparent px-0 shadow-none focus-visible:border-[#0757ff] focus-visible:ring-0 dark:border-slate-700"
										id="survey-page-heading"
									/>
								</FormField>

								<FormField htmlFor="survey-page-image" label="Page Image">
									<input
										accept=".png,.jpg,.jpeg"
										className="block w-full border-slate-200 border-b bg-transparent py-2 text-sm dark:border-slate-700"
										id="survey-page-image"
										type="file"
									/>

									<p className="mt-1 text-[10px] text-muted-foreground">
										Max size 5MB. Accepted format: *.png, *.jpeg Max height:
										600px, max width: 160px
									</p>
								</FormField>
							</div>
						</div>

						{/* Bulk upload */}
						<div className="border-b p-5">
							<h2 className="mb-3 font-medium">Bulk Upload Questions :</h2>

							<div className="grid gap-6 md:grid-cols-2">
								<div>
									<Button type="button" variant="outline">
										↓&nbsp; Sample CSV
									</Button>
								</div>

								<div>
									<label className="sr-only" htmlFor="bulk-question-file">
										Upload Questions CSV
									</label>

									<input
										accept=".csv"
										className="block w-full border-slate-200 border-b bg-transparent py-2 text-sm dark:border-slate-700"
										id="bulk-question-file"
										type="file"
									/>
								</div>
							</div>
						</div>

						{/* Form details */}
						<div className="p-5">
							<h2 className="mb-8 font-medium">Form Details :</h2>

							<div className="flex items-center justify-between">
								<h3 className="font-medium">Question:</h3>

								<Button onClick={addQuestion} type="button" variant="outline">
									<Plus className="mr-1 size-4" />
									Add Question
								</Button>
							</div>

							<div className="mt-5 space-y-8">
								{questions.map((question, questionIndex) => (
									<div className="relative" key={question.id}>
										<div className="grid gap-x-8 gap-y-5 md:grid-cols-[1fr_250px_auto]">
											{/* Question */}
											<FormField
												htmlFor={`question-${question.id}`}
												label="Question"
											>
												<Input
													id={`question-${question.id}`}
													onChange={(event) =>
														updateQuestion(question.id, event.target.value)
													}
													value={question.question}
												/>
											</FormField>

											{/* Response Type */}
											<FormField
												htmlFor={`response-type-${question.id}`}
												label="Response Type"
											>
												<select
													className="h-10 w-full rounded-none border-0 border-slate-200 border-b bg-transparent px-0 text-sm outline-none focus:border-[#0757ff] dark:border-slate-700 dark:bg-transparent"
													id={`response-type-${question.id}`}
													onChange={(event) =>
														updateResponseType(question.id, event.target.value)
													}
													value={question.responseType}
												>
													<option value="Dropdown">Dropdown</option>
													<option value="Text">Text</option>
													<option value="Radio">Radio</option>
													<option value="Checkbox">Checkbox</option>
												</select>
											</FormField>

											{/* Remove Question */}
											<div className="flex items-end pb-1">
												<Button
													disabled={questions.length === 1}
													onClick={() => removeQuestion(question.id)}
													type="button"
													variant="outline"
												>
													<Trash2 className="mr-1 size-4" />
													Remove Question
												</Button>
											</div>
										</div>

										{/* Options */}
										<div className="mt-5 max-w-[800px]">
											{question.options.map((option, optionIndex) => (
												<div
													className="mb-4 flex items-end gap-3"
													key={option.id}
												>
													<div className="flex-1">
														<FormField
															htmlFor={`option-${question.id}-${optionIndex}`}
															label="Option"
														>
															<Input
																id={`option-${question.id}-${optionIndex}`}
																onChange={(event) =>
																	updateOption(
																		question.id,
																		optionIndex,
																		event.target.value
																	)
																}
																value={option.value}
															/>
														</FormField>
													</div>

													<Button
														disabled={question.options.length === 1}
														onClick={() =>
															removeOption(question.id, optionIndex)
														}
														type="button"
														variant="outline"
													>
														Remove
													</Button>
												</div>
											))}

											<Button
												onClick={() => addOption(question.id)}
												type="button"
												variant="outline"
											>
												Add Option
											</Button>
										</div>

										{questionIndex < questions.length - 1 && (
											<div className="mt-8 border-b" />
										)}
									</div>
								))}
							</div>
						</div>

						{/* Footer */}
						<div className="flex gap-2 border-t p-5">
							<Button type="submit">Save</Button>

							<Button onClick={handleCancel} type="button" variant="outline">
								Cancel
							</Button>
						</div>
					</form>
				</section>
			</main>
		</div>
	);
}

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
		<div className="mb-6 space-y-1.5">
			<label
				className="text-slate-500 text-xs dark:text-slate-400"
				htmlFor={htmlFor}
			>
				{label}
			</label>

			{children}
		</div>
	);
}
