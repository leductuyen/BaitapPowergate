import React, { useState, useRef, ChangeEvent, SyntheticEvent } from 'react'
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
} from 'react-image-crop'
import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'
import 'react-image-crop/dist/ReactCrop.css'
import './Upload.scss'

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
    const [imgSrc, setImgSrc] = useState('')
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const [crop, setCrop] = useState<Crop>()
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const [aspect, setAspect] = useState<number | undefined>(16 / 9)

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

    return (
        <div className="Upload">
            <div className="Crop-Controls">
                <input type="file" accept="image/*" onChange={onSelectFile} />
            </div>
            {!!imgSrc && (
                <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={aspect}
                >
                    <img
                        ref={imgRef}
                        alt="Crop me"
                        src={imgSrc}
                        onLoad={onImageLoad}
                        className="my-image"
                    />
                </ReactCrop>
            )}
            {!!completedCrop && (
                <>
                    <div>
                        <canvas
                            ref={previewCanvasRef}
                            style={{
                                width: Math.round(completedCrop?.width ?? 0),
                                height: Math.round(completedCrop?.height ?? 0),
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default Upload
