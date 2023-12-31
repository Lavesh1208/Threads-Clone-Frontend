import { ChangeEvent, useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
	const [imgUrl, setImgUrl] = useState<string | null>(null);
	const showToast = useShowToast();
	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e?.target?.files?.[0];
		if (file && file.type.startsWith("image/")) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setImgUrl(reader.result as string);
			};

			reader.readAsDataURL(file);
		} else {
			showToast("Error", "Please select an image file", "error");
			setImgUrl(null);
		}
	};
	return { imgUrl, handleImageChange, setImgUrl };
};

export default usePreviewImg;
