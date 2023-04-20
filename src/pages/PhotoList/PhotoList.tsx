import { useEffect, useRef, useState } from 'react'
import Api from '../../constants/Api'
import sendRequest from '../../services/ApiService'
import { IPhoto } from './Config'

const PhotoList = () => {
    const [inputValues, setInputValues] = useState<Record<number, string>>({})
    console.log(inputValues)
    const [photos, setPhotos] = useState<IPhoto[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [limit, setLimit] = useState<number>(10)
    const [shouldWait, setShouldWait] = useState<boolean>(false)
    const [isEndOfList, setIsEndOfList] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<number | null>(null)
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

    const handleInputChange = (index: number, value: string) => {
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [index]: value,
        }))
    }

    const handleTitleClick = (index: number) => {
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [index]: photos[index].title,
        }))
        setIsEditing(index)
    }

    const handleBlur = (index: number) => {
        if (inputValues[index]) {
            const newPhotos = [...photos]
            newPhotos[index] = {
                ...newPhotos[index],
                title: inputValues[index],
            }
            setPhotos(newPhotos)
        }
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
        }))
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
            {photos.map((photo, index) => (
                <div key={index}>
                    <img src={photo.thumbnailUrl} alt="" loading="lazy" />

                    {isEditing === index ? (
                        <input
                            value={inputValues[index] || ''}
                            onChange={(e) =>
                                handleInputChange(index, e.target.value)
                            }
                            onBlur={() => handleBlur(index)}
                            autoFocus
                        />
                    ) : (
                        <span onClick={() => handleTitleClick(index)}>
                            {photo.title}
                        </span>
                    )}
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
