import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Nav from "../NavbarComponents/Nav";
import { useNavigate } from "react-router-dom";
import TagFeold from "./TagFeold";
import ParagraphFeild from "./ParagraphFeild";
import { Alert } from "../Alert";

export default function CreateBlog({ id }) {
    const [paragraphs, setParagraphs] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [isTextnavigate, setIstextNavigate] = useState(
        Array(paragraphs.length).fill(false)
    );
    const [isCreateBlog, setIscreateBlog] = useState(false);
    const paragraphRef = useRef([]);
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [tags, setTags] = useState([]);
    const [inputTag, setInputTag] = useState("");
    const [image, setImage] = useState("");
    const [author, setAuthor] = useState({
        name: "",
        email: "",
        image: "",
    });

    const navigate = useNavigate();

    let result = "";

    useEffect(() => {
        if (isTextnavigate.length != paragraphs.length) {
            setIstextNavigate(Array(paragraphs.length).fill(false));
        }
    }, [paragraphs]);

    //ดึงข้อมูลจาก localstorage
    useEffect(() => {
        try {
            const saveParagraphs = JSON.parse(
                localStorage.getItem("paragraphs")
            );
            if (saveParagraphs != null && saveParagraphs.length > 0) {
                setParagraphs(saveParagraphs);
            } else {
                setParagraphs(["", ""]);
            }
        } catch (error) {
            console.log("err: ", error);
        }
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_API_URI}/api/profile/${id}`
            );
            const autherRes = response.data.profile;
            //console.log(response.data.profile);
            setAuthor({
                name: autherRes.first_name + " " + autherRes.last_name,
                email: autherRes.email,
                image: autherRes.image_path,
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProfile();
        setIscreateBlog(true);
    }, []);

    const handleKeydown = (event, index) => {
        if (event.key === "Enter") {
            event.preventDefault();

            const newParagraphs = [...paragraphs];
            newParagraphs.splice(index + 1, 0, ""); // เพิ่ม textarea ใหม่เป็นค่าพื้นฐาน (ข้อความว่าง)
            setParagraphs(newParagraphs);
            setActiveIndex(index + 1);

            requestAnimationFrame(() => {
                if (paragraphRef.current[newParagraphs.length - 1]) {
                    paragraphRef.current[newParagraphs.length - 1].focus();
                }
            }, 0);
        }
        if (event.key === "Backspace" && paragraphs[index] === "") {
            if (paragraphs.length > 1) {
                const newParagraphs = [...paragraphs];
                newParagraphs.splice(index, 1); // ลบ textarea ที่ตำแหน่งนี้
                setParagraphs(newParagraphs);

                const newIndex = index > 0 ? index - 1 : 0;
                setActiveIndex(newIndex);

                requestAnimationFrame(() => {
                    paragraphRef.current[index - 1]?.focus();
                }, 0);
            }
        }
    };

    const handleContent = (event, index) => {
        const newparagraphs = [...paragraphs];
        newparagraphs[index] = event.target.value;
        setParagraphs(newparagraphs);
        localStorage.setItem("paragraphs", JSON.stringify(newparagraphs));
    };

    //const handleChangeDescription = (event) => {
    //	setDescription(event.target.value);
    //};
    const handleFocus = (index) => {
        setActiveIndex(index);
        setIstextNavigate((prevSate) =>
            prevSate.map((state, i) => (i === index ? false : null))
        );
        // เมื่อมีการโฟกัสที่ <p> จะตรวจสอบตำแหน่งของ cursor
    };

    const handleNavatebutton = (index) => {
        setIstextNavigate((prevState) =>
            prevState.map((state, i) => (i === index ? !state : state))
        );
    };

    const handleInputChange = (e) => {
        setInputTag(e.target.value);
    };

    const handleTagInputKey = (e) => {
        if (e.key === "Enter") {
            setInputTag("");
            const triminput = inputTag.trim();
            if (triminput && !tags.includes(inputTag)) {
                setTags([...tags, inputTag]);
                localStorage.setItem(
                    "tags",
                    JSON.stringify([...tags, triminput])
                );
            } else if (!tags.includes(inputTag)) {
                Alert("tag นี้มีอยู่ในรายการแล้ว", "warning", "top");
            } else {
                Alert("กรุณากรอก tag", "warning", "top");
            }
        }
    };

    const handleSubmitBlog = async (event) => {
        event.preventDefault();
        if (paragraphs.length > 2) {
            let header = paragraphs[0];
            result = paragraphs.slice(1).join("\n");
            setTitle(header);
            setContents(result);
        }
        try {
            if (title === "" || contents === "" || author === null) {
                alert("Please fill all the fields");
                return;
            }
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_API_URI}/api/creatBlogs`,
                {
                    title: title,
                    description: contents,
                    author,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            if (response.status === 201) {
                localStorage.removeItem("paragraphs");
                setTitle("");
                setContents("");
                setParagraphs([]);
                // alertMessage("บันทึกสําเร็จ", "success");
                navigate("/");
            } else {
                alert("ไม่สามารถ publish blog ได้");
            }
        } catch (error) {
            alert("ไม่สามารถ publish blog ได้");
            console.log(error);
        }
    };

    useEffect(() => {
        const localTags = localStorage.getItem("tags");
        if (localTags) {
            setTags(JSON.parse(localTags));
        }
    }, []);

    //const convertList2string = () => {
    //	if (paragraphs.length > 2) {
    //		let header = paragraphs[0];
    //		result = paragraphs.slice(1).join("\n");
    //		setTitle(header);
    //		setContents(JSON.stringify(result));
    //	}
    //	//console.log(`raw reslut ${JSON.stringify(result)} typeof ${typeof result}`);
    //	//let content = result.split("")
    //	//setTitle(title)
    //	//console.log(`split string ${split} typeof ${typeof split}`);
    //};

    return (
        <>
            <div className="w-full flex flex-col items-center justify-center gap-4 ">
                <Nav
                    isCreateBlog={isCreateBlog}
                    publicState={handleSubmitBlog}
                />

                <ParagraphFeild
                    paragraphs={paragraphs}
                    handleContent={handleContent}
                    activeIndex={activeIndex}
                    paragraphRef={paragraphRef}
                    handleKeydown={handleKeydown}
                    handleFocus={handleFocus}
                    isTextnavigate={isTextnavigate}
                    handleNavatebutton={handleNavatebutton}
                />

                <TagFeold
                    handleInputChange={handleInputChange}
                    handleTagInputKey={handleTagInputKey}
                    inputTag={inputTag}
                    tags={tags}
                />

                {/* เพิ่มของ blog */}

                {/*<button className="block" onClick={(e) => handleSubmitBlog(e)}>
					
				</button>*/}
            </div>
        </>
    );
}
