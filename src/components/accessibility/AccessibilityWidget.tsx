'use client'

import { useEffect, useRef } from 'react'
import { useA11y, type A11yFeature } from './AccessibilityContext'
import styles from './AccessibilityWidget.module.scss'
// import Button from '../common/button/Button'
import type { StaticImageData } from 'next/image'
import textSizeIcon from '@/assets/images/text-size.svg'
import hideImagesIcon from '@/assets/images/hideshowimg.svg'
import lineSpacingIcon from '@/assets/images/linespacing.svg'
import letterSpacingIcon from '@/assets/images/letterspacing.svg'
import greyscaleIcon from '@/assets/images/grayscale.svg'
import lowSaturationIcon from '@/assets/images/lowsaturation.svg'
import highlightLinksIcon from '@/assets/images/highlightlinks.svg'
import Image from 'next/image'
interface Tile {
    id: A11yFeature
    label: string
    icon: string
    hasDots?: boolean
}


const ICON_IMAGES: Record<string, StaticImageData> = {
    textSize: textSizeIcon,
    hideImages: hideImagesIcon,
    lineSpacing: lineSpacingIcon,
    letterSpacing: letterSpacingIcon,
    greyscale: greyscaleIcon,
    lowSaturation: lowSaturationIcon,
    highlightLinks: highlightLinksIcon,
}


const SECTIONS: { label: string; tiles: Tile[] }[] = [
    {
        label: 'Content Size',
        tiles: [
            { id: 'textSize', label: 'Text Size', icon: 'textSize', hasDots: true },
            { id: 'hideImages', label: 'Hide/Show Image', icon: 'hideImages' },
            { id: 'lineSpacing', label: 'Line Spacing', icon: 'lineSpacing', hasDots: true },
            { id: 'letterSpacing', label: 'Letter Spacing', icon: 'letterSpacing', hasDots: true },
        ],
    },
    {
        label: 'Color',
        tiles: [
            { id: 'greyscale', label: 'Grey Scale', icon: 'greyscale' },
            { id: 'lowSaturation', label: 'Low Saturation', icon: 'lowSaturation' },
        ],
    },
    {
        label: 'Navigation',
        tiles: [
            { id: 'highlightLinks', label: 'Highlight Link', icon: 'highlightLinks' },
        ],
    },
]


function Dots({ level }: { level: number }) {
    return (
        <div className={styles.dots}>
            {[1, 2, 3].map(dot => (
                <span
                    key={dot}
                    className={`${styles.dot} ${level >= dot ? styles.dotActive : ''}`}
                />
            ))}
        </div>
    )
}

function useReadingRuler(enabled: boolean) {
    useEffect(() => {
        if (!enabled) {
            document.querySelector('.a11y-reading-ruler-line')?.remove()
            return
        }
        const ruler = document.createElement('div')
        ruler.className = 'a11y-reading-ruler-line'
        document.body.appendChild(ruler)
        const onMove = (e: MouseEvent) => { ruler.style.top = `${e.clientY}px` }
        window.addEventListener('mousemove', onMove)
        return () => { window.removeEventListener('mousemove', onMove); ruler.remove() }
    }, [enabled])
}

export default function AccessibilityWidget() {
    const {
        toggle,
        reset,
        isActive,
        getLevel,
        widgetOpen,
        closeWidget,
        isLoaded
    } = useA11y()
    const panelRef = useRef<HTMLDivElement>(null)

    useReadingRuler(isActive('readingRuler'))

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) closeWidget()
        }
        if (widgetOpen) document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [closeWidget, widgetOpen])

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeWidget() }
        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [closeWidget])



    return (
        <div ref={panelRef} className={`${styles.accesibilityWrapper} a11y-widget`}>
            <div
                role="dialog"
                aria-label="Accessibility settings"
                aria-modal="true"
                className={`${styles.panel} ${widgetOpen ? styles.open : styles.closed}`}
            >
                <div className={styles.closeButtonWrapper}>
                    <button
                        type="button"
                        className={styles.closeBtn}
                        aria-label="Close accessibility settings"
                        onClick={closeWidget}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className={styles.panelInner}>
                    {SECTIONS.map(section => (
                        <div key={section.label} className={styles.section}>
                            <p className={styles.sectionLabel}>{section.label}</p>
                            <div className={styles.grid} data-no-a11y>
                                {section.tiles.map(tile => {
                                    const on = isActive(tile.id)
                                    const level = getLevel(tile.id)
                                    return (
                                        <button
                                            key={tile.id}
                                            onClick={() => toggle(tile.id)}
                                            aria-pressed={on}
                                            className={`${styles.tile} ${on ? styles.tileActive : ''}`}
                                        >
                                            <Image
                                                className={`${styles.tileIcon} ${on ? styles.tileIconActive : ''}`}
                                                src={ICON_IMAGES[tile.icon] ?? ICON_IMAGES.textSize}
                                                alt={tile.label}
                                                aria-hidden="true"
                                            />
                                            <span className={`${styles.tileLabel} ${on ? styles.tileLabelActive : ''}`}>
                                                {tile.label}
                                            </span>
                                            {tile.hasDots && <Dots level={level} />}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    ))}

                    <div className={styles.resetRow}>
                        {/* <Button
                            text="Reset"
                            variant="primary"
                            icon=""
                            showArrow={false}
                            onClick={reset}
                            className={styles.resetBtn}
                        /> */}

                        <button text="Reset"
                            variant="primary"
                            icon=""
                            showArrow={false}
                            onClick={reset}
                            className={styles.resetBtn}>click me</button>
                    </div>
                </div>
            </div>

            {/* <button
                onClick={() => setOpen(prev => !prev)}
                aria-label={open ? 'Close accessibility menu' : 'Open accessibility menu'}
                aria-expanded={open}
                className={styles.fab}
            >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="white" aria-hidden="true">
                    <path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
                </svg>
                {active.size > 0 && (
                    <span className={styles.badge} aria-label={`${active.size} active`}>
                        {active.size}
                    </span>
                )}
            </button> */}
        </div>
    )
}
