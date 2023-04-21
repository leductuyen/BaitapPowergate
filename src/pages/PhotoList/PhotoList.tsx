import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Api from '../../constants/Api'
import sendRequest from '../../services/ApiService'
import { dataPhotos, selectorPhotos } from '../../store/slice/photoSlice'
import { IPhoto } from './Config'

const PhotoList = () => {
    const dispatch = useAppDispatch()

    const dataListPhoto = useAppSelector(selectorPhotos)

    const [inputValues, setInputValues] = useState<Record<number, string>>({})
    const [photoTimes, setPhotoTimes] = useState<Record<number, number>>({})

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [limit, setLimit] = useState<number>(10)
    const [shouldWait, setShouldWait] = useState<boolean>(false)
    const [isEndOfList, setIsEndOfList] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<number | null>(null)
    const [savedData, setSavedData] = useState<IPhoto[]>([])

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
            [index]: dataListPhoto[index].title,
        }))
        setIsEditing(index)
    }
    const handleBlur = (index: number) => {
        if (inputValues[index]) {
            const newPhotos = [...dataListPhoto]
            newPhotos[index] = {
                ...newPhotos[index],
                title: inputValues[index],
            }
        }
    }
    const handleSave = () => {
        const newPhotos = [...dataListPhoto]
        Object.keys(inputValues).forEach((index: any) => {
            if (inputValues[index]) {
                newPhotos[index] = {
                    ...newPhotos[index],
                    title: inputValues[index],
                }
                // update time for the photo
                setPhotoTimes((prevPhotoTimes) => ({
                    ...prevPhotoTimes,
                    [index]: Date.now(),
                }))
            }
        })
        dispatch(dataPhotos(newPhotos))
        setSavedData(newPhotos)
        setInputValues({})
        setIsEditing(null)
    }

    const reset = () => {
        dispatch(dataPhotos(savedData))
        setInputValues({})
        setIsEditing(null)
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
    useEffect(() => {
        setSavedData(dataListPhoto)
    }, [dataListPhoto])
    useEffect(() => {
        const currentTime = new Date().getTime()

        dataListPhoto.forEach((photo: IPhoto, index: number) => {
            if (!photoTimes[index]) {
                setPhotoTimes((prevPhotoTimes) => ({
                    ...prevPhotoTimes,
                    [index]: currentTime,
                }))
            }
        })
    }, [dataListPhoto, photoTimes])

    return (
        <div>
            <button onClick={handleSave}>save</button>
            <button onClick={reset}>reset</button>

            {dataListPhoto.map((photo: IPhoto, index: number) => (
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
                    {photoTimes[index] && (
                        <span>
                            {new Date(photoTimes[index]).toLocaleString()}
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
