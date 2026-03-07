import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TagField({
	tags = [],
	inputTag,
	handleInputChange,
	handleTagInputKey,
	handleCloseTag,
}) {
	return (
		<div className="w-full">
			<h3 className="text-base font-bold text-gray-900 mb-3 font-sans pb-2 border-b border-gray-100">Add Tags</h3>
			<p className="text-sm text-gray-500 mb-4 font-sans">
				Add tags to help readers find your story. Press enter to add a tag.
			</p>
			
			<div className="flex flex-col gap-4">
				<input
					type="text"
					name="tag-input"
					id="tag-input"
					placeholder="Enter a topic (e.g., Programming, Design)..."
					value={inputTag}
					onChange={handleInputChange}
					onKeyDown={handleTagInputKey}
					className="w-full p-3 font-sans text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:bg-white transition-all"
				/>

				{tags.length > 0 && (
					<div className="flex flex-wrap gap-2 mt-2">
						{tags.map((tag, index) => (
							<div
								className="flex items-center gap-2 bg-gray-100 text-gray-800 py-1.5 px-3 rounded-full text-sm font-sans"
								key={index}
							>
								<span>{tag}</span>
								<button
									type="button"
									className="text-gray-400 hover:text-black focus:outline-none transition-colors ml-1 w-4 h-4 flex items-center justify-center rounded-full hover:bg-gray-200"
									onClick={() => handleCloseTag(tag)}
								>
									<FontAwesomeIcon icon={faXmark} className="text-[10px]" />
								</button>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
