import { useEffect, useState } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [isLoading, setIsloading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            try {
                setIsloading(false)
                const response = await fetch(url)
                const json = await response.json()
                setData(json);
            } catch (err) {
                setIsloading(false)
                console.log(err.message)
            }

        }
        getData()
    }, [url])

    return { data, isLoading }
}

export default useFetch