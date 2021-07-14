import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
    const [{data, fetching}] = useMeQuery();
    console.log('data me', data.me)
    const router = useRouter();
    useEffect(() => {
        if(!fetching && !data?.me) {
            router.replace('/login?next=' + router.pathname);
        }
    }, [fetching, data, router])
}