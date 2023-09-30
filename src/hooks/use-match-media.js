import { useState, useLayoutEffect } from "react";

const queries = [
    '(min-width: 320px) and (max-width: 767px)',
    '(min-width: 768px) and (max-width: 1279px)',
    '(min-width: 1280px)',
];

 const useMatchMedia = () => {
    const mediaOueryLists = queries.map(query => matchMedia(query));

    const getValues = () => mediaOueryLists.map(mql => mql.matches);

    const [values, setValues] = useState(getValues);

    useLayoutEffect(() => {
        const handlerValues = () => setValues(getValues);

        mediaOueryLists.forEach(mql => mql.addEventListener('change', handlerValues));

        return () => mediaOueryLists.forEach(mql => mql.removeEventListener('change', handlerValues));
        
    });

    return ['isMobile', 'isTablet', 'isDesktop'].reduce((acc, screen, index) => ({
        ...acc,
        [screen]: values[index],
    }), {});
};

export default useMatchMedia;