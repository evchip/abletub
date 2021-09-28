import { useRouter } from "next/router";
import { usePostQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetPostFromUrl = () => {
    const intId = useGetIntId()
    const pause = intId === -1;

    return usePostQuery({
        skip: pause,
        variables: {
            id: intId
        }
    })
}