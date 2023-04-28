import {
    ChangeEvent,
    SyntheticEvent,
    useContext,
    useRef,
    useState,
} from 'react'
import ReactCrop, {
    Crop,
    PixelCrop,
    centerCrop,
    makeAspectCrop,
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { AuthContext } from '../../../context/AuthContext'
import './Upload.scss'
import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'

const centerAspectCrop = (
    mediaWidth: number,
    mediaHeight: number,
    aspect: number
) => {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight
        ),
        mediaWidth,
        mediaHeight
    )
}

const Upload = () => {
    //! Context
    const { userLogin } = useContext(AuthContext)
    //! State
    const [imgSrc, setImgSrc] = useState(userLogin?.avatar)
    const [croppedImage, setCroppedImage] = useState<string | null>(null)
    const [isImageEdited, setIsImageEdited] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const avatarRef = useRef<HTMLInputElement>(null)
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const [crop, setCrop] = useState<Crop>()
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const [aspect, setAspect] = useState<number | undefined>(16 / 9)

    //! Function
    const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || '')
            )
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
        }
    }
    const handleSave = () => {
        setIsSaving(true)
        const canvas = previewCanvasRef.current
        if (!canvas) return

        const imgDataUrl = canvas.toDataURL('image/png')
        setCroppedImage(imgDataUrl)
        setImgSrc(imgDataUrl)
        setIsImageEdited(true)
        setIsSaving(false)
    }
    const resetState = () => {
        setCrop(undefined)
        setCompletedCrop(undefined)
        setImgSrc(userLogin?.avatar ?? null)
        setCroppedImage(null)
        setIsImageEdited(false)
        setAspect(16 / 9)
        if (previewCanvasRef.current) {
            const ctx = previewCanvasRef.current.getContext('2d')
            if (ctx) {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            }
        }
        if (avatarRef.current) {
            avatarRef.current.value = ''
        }
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop
                )
            }
        },
        100,
        [completedCrop]
    )

    //! Return
    return (
        <div className="Upload">
            <div className="Crop-Controls">
                <input
                    type="file"
                    accept="image/*"
                    onChange={onSelectFile}
                    ref={avatarRef}
                    style={{ display: imgSrc ? 'none' : 'block' }}
                />
            </div>
            {isImageEdited ? (
                // Render phần tử img nếu ảnh đã được chỉnh sửa
                <img src={croppedImage ?? ''} alt="" />
            ) : (
                // Render phần tử ReactCrop nếu ảnh chưa được chỉnh sửa
                !!imgSrc && (
                    <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={aspect}
                    >
                        <img
                            ref={imgRef}
                            alt="Crop me"
                            src={imgSrc ? imgSrc : ''}
                            onLoad={onImageLoad}
                            className="my-image"
                        />
                    </ReactCrop>
                )
            )}
            {!!completedCrop && (
                <>
                    <div>
                        <canvas
                            ref={previewCanvasRef}
                            style={{
                                width: Math.round(completedCrop?.width ?? 0),
                                height: Math.round(completedCrop?.height ?? 0),
                                display: isImageEdited ? 'none' : 'block', // Ẩn canvas nếu ảnh đã được chỉnh sửa
                            }}
                        />
                    </div>
                    <button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                        onClick={() => {
                            resetState()
                            avatarRef.current?.click()
                        }}
                    >
                        Choose Image
                    </button>
                </>
            )}
        </div>
    )
}

export default Upload
