import React, { useEffect, useRef, useState } from 'react'
import sendRequest from '../../services/ApiService'
import Api from '../../constants/Api'

interface IPhoto {
    id: number
    title: string
    url: string
    thumbnailUrl: string
}

const PhotoList = () => {
    const [photos, setPhotos] = useState<IPhoto[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [limit, setLimit] = useState<number>(10)

    const [shouldWait, setShouldWait] = useState<boolean>(false)
    const [isEndOfList, setIsEndOfList] = useState<boolean>(false)

    const loaderRef = useRef<HTMLDivElement>(null)

    const getDataPhotos = async () => {
        setIsLoading(true)

        try {
            const response = await sendRequest(
                Api.photos,
                {},
                {},
                { _limit: limit }
            )
            setPhotos(response)
        } catch (error) {
            setIsLoading(false)
        }
    }

    const handleScroll = () => {
        const loaderCurrent = loaderRef.current
        if (loaderCurrent) {
            const loaderPosition = loaderCurrent.getBoundingClientRect()
            const windowPosition = window.innerHeight

            if (loaderPosition.top < windowPosition) {
                setIsEndOfList(true)
            }
        }
    }

    useEffect(() => {
        getDataPhotos()
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [limit])

    useEffect(() => {
        if (isEndOfList) {
            setShouldWait(true)
            setTimeout(() => {
                setLimit((prevLimit) => prevLimit + 10)
                setShouldWait(false)
            }, 3000)
            setIsEndOfList(false)
        }
    }, [isEndOfList])

    return (
        <div>
            {photos.map((photo, key) => (
                <div key={key}>
                    <img src={photo.thumbnailUrl} alt="" loading="lazy" />
                    {photo.title}
                </div>
            ))}
            {shouldWait ? (
                <div>Loading...</div>
            ) : (
                <div ref={loaderRef}>{isLoading && 'Loading...'}</div>
            )}
        </div>
    )
}

export default PhotoList
