import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

const useShowToast = () => {
	const toast = useToast();

	const showToast = useCallback(
		(
			title: string,
			description: string,
			status: "success" | "error" | "warning" | "info"
		) => {
			toast({
				title,
				description,
				status,
				duration: 3000,
				isClosable: true,
			});
		},
		[toast]
	);

	return showToast;
};

export default useShowToast;
