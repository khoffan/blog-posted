import React, { useState, useEffect, useRef } from "react";
import ParagraphField from "./ParagraphField";
import TagField from "./TagField";
import useBlogStore from "../../store/useBlogStore";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CreateBlog() {
	const navigate = useNavigate();
	const { createBlog, uploadBlogImage, isLoading } = useBlogStore();
	const { user } = useAuthStore();

	const [paragraphs, setParagraphs] = useState([{ type: "text", content: "" }]);
	const [blogImage, setBlogImage] = useState([]); // {id, image_path}
	const [activeIndex, setActiveIndex] = useState(0);
	const [isTextnavigate, setIsTextnavigate] = useState([false]);
	
	const [inputTag, setInputTag] = useState("");
	const [tags, setTags] = useState([]);
	const paragraphRef = useRef([]);

	useEffect(() => {
		const storeDraft = localStorage.getItem("draftCreateBlog");
		if (storeDraft) {
			const parsed = JSON.parse(storeDraft);
			setParagraphs(parsed.paragraphs || [{ type: "text", content: "" }]);
			setBlogImage(parsed.blogImage || []);
		}
	}, []);

	const saveDraft = (p, bi) => {
		localStorage.setItem("draftCreateBlog", JSON.stringify({ paragraphs: p, blogImage: bi }));
	};

	const clearDraft = () => {
		localStorage.removeItem("draftCreateBlog");
	};

	const handleFocus = (index) => {
		setActiveIndex(index);
		const newNavState = Array(paragraphs.length).fill(false);
		setIsTextnavigate(newNavState);
	};

	const handleContent = (event, index) => {
		const newParagraph = [...paragraphs];
		newParagraph[index].content = event.target.value;
		setParagraphs(newParagraph);
		
		event.target.style.height = "auto";
		event.target.style.height = `${event.target.scrollHeight}px`;
		saveDraft(newParagraph, blogImage);
	};

	const handleKeydown = (event, index) => {
		if (event.key === "Enter") {
			event.preventDefault();
			const newParagraph = [...paragraphs];
			newParagraph.splice(index + 1, 0, { type: "text", content: "" });
			setParagraphs(newParagraph);
			saveDraft(newParagraph, blogImage);

			setTimeout(() => {
				if (paragraphRef.current[index + 1]) {
					paragraphRef.current[index + 1].focus();
				}
			}, 0);
		} else if (event.key === "Backspace" && paragraphs[index].content === "" && paragraphs.length > 1) {
			event.preventDefault();
			const newParagraph = [...paragraphs];
			newParagraph.splice(index, 1);
			setParagraphs(newParagraph);
			saveDraft(newParagraph, blogImage);

			setTimeout(() => {
				if (paragraphRef.current[index - 1]) {
					paragraphRef.current[index - 1].focus();
					setActiveIndex(index - 1);
				}
			}, 0);
		}
	};

	const handleNavatebutton = (index) => {
		const newNavState = [...isTextnavigate];
		newNavState[index] = !newNavState[index];
		setIsTextnavigate(newNavState);
	};

	const handleFileUpload = async (e, index) => {
		const file = e.target.files[0];
		if (!file) return;

		const uploadedPath = await uploadBlogImage(file);
		if (uploadedPath) {
			const newId = `image-${Date.now()}`;
			const newBlogImages = [...blogImage, { id: newId, image_path: uploadedPath }];
			setBlogImage(newBlogImages);

			const newParagraph = [...paragraphs];
			newParagraph[index] = { type: "image", content: newId };
			newParagraph.splice(index + 1, 0, { type: "text", content: "" });
			setParagraphs(newParagraph);
			
			const newNavState = Array(newParagraph.length).fill(false);
			setIsTextnavigate(newNavState);
			saveDraft(newParagraph, newBlogImages);
			
			setTimeout(() => {
				if (paragraphRef.current[index + 1]) {
					paragraphRef.current[index + 1].focus();
				}
			}, 0);
		}
	};

	const handleDeleteImage = (index) => {
		const newParagraph = [...paragraphs];
		const imageId = newParagraph[index].content;
		newParagraph.splice(index, 1);
		
		const newBlogImages = blogImage.filter(img => img.id !== imageId);
		
		if (newParagraph.length === 0) {
			newParagraph.push({ type: "text", content: "" });
		}
		
		setParagraphs(newParagraph);
		setBlogImage(newBlogImages);
		saveDraft(newParagraph, newBlogImages);
	};

	const handleInputChange = (e) => setInputTag(e.target.value);

	const handleTagInputKey = (e) => {
		if (e.key === "Enter" && inputTag.trim() !== "") {
			e.preventDefault();
			if (!tags.includes(inputTag.trim())) {
				setTags([...tags, inputTag.trim()]);
			}
			setInputTag("");
		}
	};

	const handleCloseTag = (tagToRemove) => {
		setTags(tags.filter(tag => tag !== tagToRemove));
	};

	const handleUploadBlog = async () => {
		if (paragraphs.length === 0 || !paragraphs[0].content) {
			Swal.fire("Error", "Title cannot be empty.", "error");
			return;
		}

		if (!user) {
			Swal.fire("Error", "You must be logged in to publish.", "error");
			return;
		}

		const title = paragraphs[0].content;
		const description = paragraphs.length > 1 && paragraphs[1].type === "text" 
			? paragraphs[1].content.substring(0, 150) + "..."
			: "";

		const blogData = {
			title,
			description,
			tags,
			paragraphs,
			imagePath: blogImage,
			userId: user._id,
			name: user.first_name + " " + user.last_name,
			userImage: user.image_path || ""
		};

		const result = await createBlog(blogData);
		if (result.success) {
			clearDraft();
			Swal.fire("Published!", "Your story is live.", "success").then(() => {
				navigate("/");
			});
		} else {
			Swal.fire("Error", "Failed to publish story.", "error");
		}
	};

	return (
		<div className="max-w-[800px] mx-auto px-6 py-12">
			{/* Publish Header */}
			<div className="flex justify-between items-center mb-10 pb-4 border-b border-gray-100">
				<div className="flex items-center gap-3">
					<span className="text-gray-400 font-sans">Draft</span>
					<span className="text-sm font-medium text-gray-500">Saved</span>
				</div>
				<button 
					onClick={handleUploadBlog}
					disabled={isLoading}
					className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-1.5 rounded-full transition-colors disabled:opacity-50 shadow-sm"
				>
					{isLoading ? "Publishing..." : "Publish"}
				</button>
			</div>

			{/* Main Editor Area */}
			<div className="w-full">
				<ParagraphField
					paragraphs={paragraphs}
					handleContent={handleContent}
					activeIndex={activeIndex}
					paragraphRef={paragraphRef}
					handleKeydown={handleKeydown}
					handleFocus={handleFocus}
					isTextnavigate={isTextnavigate}
					handleNavatebutton={handleNavatebutton}
					handleFileUpload={handleFileUpload}
					handleDeleteImage={handleDeleteImage}
					blogImage={blogImage}
				/>

				{/* Tag Editor */}
				<div className="mt-16 pt-8 border-t border-gray-100">
					<TagField
						tags={tags}
						inputTag={inputTag}
						handleInputChange={handleInputChange}
						handleTagInputKey={handleTagInputKey}
						handleCloseTag={handleCloseTag}
					/>
				</div>
			</div>
		</div>
	);
}
