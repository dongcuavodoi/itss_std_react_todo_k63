import { useState, useEffect } from 'react';
import { getDocs, setDocs, clearDocs } from '../lib/firebase';

function useStorage() {
    const [items, setItems] = useState([]);

    /* 副作用を使う */
    useEffect(() => {
        const data = getDocs()
        data.then((doc) => {
            if (!doc) return
            let items = doc
            if (items)
                setItems(items)
        })
    }, []);

    useEffect(() => {
        if (items){
            if (items.length === 0)
                clearDocs()
            else setDocs(items)
        }
    }, [items])

    const putItems = items => {
        setItems(items)
    };

    const clearItems = () => {
        setItems([])
    };

    return [items, putItems, clearItems];
}

export default useStorage;