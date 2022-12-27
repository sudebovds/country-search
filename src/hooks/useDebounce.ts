import { useEffect, useState } from 'react'

const useDebounce = (value: string, delay: number = 300): string => {
    const [debounced, setDebounsed] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebounsed(value), delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debounced
}

export default useDebounce