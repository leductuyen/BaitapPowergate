import { useEffect, useRef, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import Api from '../../constants/Api'
import sendRequest from '../../services/ApiService'
import { dataPhotos } from '../../store/slice/photoSlice'
import { IPhoto } from './Config'

const PhotoList = () => {
    const dispatch = useAppDispatch()

    const [inputValues, setInputValues] = useState<Record<number, string>>({})

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
            dispatch(dataPhotos(response))
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
    }
    const handleSave = () => {
        const newPhotos = [...photos]
        dispatch(dataPhotos(newPhotos))
        console.log(newPhotos)
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
            <button onClick={handleSave}>save</button>

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
