import { useState, type ReactNode } from 'react'
import { PhotoFrame, BrokenImage, type PhotoTreatment } from './PhotoFrame'
import { ObservatoryScene, StationScene, WellheadScene } from './scenes'

/**
 * 数据层描述一张图，由这里负责画出来。
 *
 * 两种来源：
 *   src 有值   → 用 public/photos/ 下的真实照片
 *   src 没值   → 用同名的 SVG 场景
 *
 * 真实照片加载失败会自动退回 SVG，所以文件没到位之前页面一切照常，
 * 丢一张进去就换一张，不需要改任何代码。
 *
 * 两种来源都会套上 PhotoFrame 的颗粒、褪色、暗角。这一层不能省：
 * 生成出来的照片太干净、太现代，正是那层退化让它读起来像扫描件。
 */
export type SceneImage =
  | {
      kind: 'station'
      /** 钟面数字形制。全篇的贯穿物。SVG 回退时用得上。 */
      numerals: 'roman' | 'arabic'
      /** public/photos/ 下的文件名，如 'station-1988-roman.jpg'。 */
      src?: string
      treatment?: PhotoTreatment
      stamp?: string
      skew?: number
      caption?: string
      width?: number
    }
  | {
      kind: 'wellhead'
      figures?: number
      src?: string
      treatment?: PhotoTreatment
      stamp?: string
      skew?: number
      caption?: string
      width?: number
    }
  | {
      kind: 'observatory'
      src?: string
      treatment?: PhotoTreatment
      caption?: string
      width?: number
    }
  /** 曾经存在、现在打不开的附件。 */
  | { kind: 'broken'; filename: string; note?: string; width?: number; height?: number }

/** 真实照片优先，加载不出来就退回 SVG。 */
function PhotoOrScene({
  src,
  scene,
  width,
  height,
}: {
  src?: string
  scene: ReactNode
  width: number
  height: number
}) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) return <>{scene}</>

  return (
    <img
      src={`${import.meta.env.BASE_URL}photos/${src}`}
      alt=""
      width={width}
      height={height}
      loading="lazy"
      onError={() => setFailed(true)}
      className="block object-cover"
      style={{ width, height }}
    />
  )
}

export function SceneImageView({ img }: { img: SceneImage }) {
  if (img.kind === 'broken') {
    return (
      <BrokenImage
        filename={img.filename}
        note={img.note}
        width={img.width ?? 260}
        height={img.height ?? 180}
      />
    )
  }

  const w = img.width ?? 360
  const h = Math.round((w / 400) * 250)

  const scene =
    img.kind === 'station' ? (
      <StationScene numerals={img.numerals} width={w} height={h} />
    ) : img.kind === 'wellhead' ? (
      <WellheadScene figures={img.figures ?? 4} width={w} height={h} />
    ) : (
      <ObservatoryScene width={w} height={h} />
    )

  return (
    <PhotoFrame
      treatment={img.treatment ?? 'print'}
      stamp={'stamp' in img ? img.stamp : undefined}
      skew={'skew' in img ? img.skew : 0}
      caption={img.caption}
      className="inline-block max-w-full"
    >
      <PhotoOrScene src={img.src} scene={scene} width={w} height={h} />
    </PhotoFrame>
  )
}

/** 一行放多张。 */
export function SceneImageRow({ images }: { images: SceneImage[] }) {
  if (images.length === 0) return null
  return (
    <div className="my-4 flex flex-wrap items-start gap-4">
      {images.map((img, i) => (
        <SceneImageView key={i} img={img} />
      ))}
    </div>
  )
}
