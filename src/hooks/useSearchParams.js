import { useMemo } from 'react';

function useSearchParams(params) {
    return useMemo(() => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            searchParams.set(key, value);
        });
        return searchParams;
    }, [params]);
}

export default useSearchParams;
