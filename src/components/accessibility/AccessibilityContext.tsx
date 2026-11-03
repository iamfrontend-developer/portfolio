'use client'

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'

export type A11yFeature =
    | 'textSize'
    | 'lineSpacing'
    | 'letterSpacing'
    | 'hideImages'
    | 'greyscale'
    | 'lowSaturation'
    | 'highContrast'
    | 'darkMode'
    | 'highlightLinks'
    | 'bigCursor'
    | 'focusIndicator'
    | 'reduceMotion'
    | 'dyslexiaFont'
    | 'readingRuler'


interface A11yContextType {
    active: Set<A11yFeature>
    levels: Partial<Record<A11yFeature, number>>
    widgetOpen: boolean
    isLoaded: boolean

    toggle: (f: A11yFeature) => void
    reset: () => void
    isActive: (f: A11yFeature) => boolean
    getLevel: (f: A11yFeature) => number

    openWidget: () => void
    closeWidget: () => void
    toggleWidget: () => void
}


const A11yContext = createContext<A11yContextType | null>(null)
const STORAGE_KEY = 'a11y-features'
const MAX_LEVEL = 3
const LEVEL_FEATURES = new Set<A11yFeature>([
    'textSize',
    'lineSpacing',
    'letterSpacing',
])
const TEXT_SCALE: Record<number, number> = {
    1: 1.1,
    2: 1.2,
    3: 1.3,
}
const SKIP_SELECTOR = '.a11y-widget, [data-no-a11y]'
interface A11yState {
    active: A11yFeature[]
    levels: Partial<Record<A11yFeature, number>>
}

function readInitialState(): A11yState {
    if (typeof window === 'undefined') {
        return {
            active: [],
            levels: {},
        }
    }
    try {

        const saved =
            localStorage.getItem(STORAGE_KEY)
        if (!saved) {
            return {
                active: [],
                levels: {},
            }
        }
        const parsed = JSON.parse(saved)
        return {
            active: Array.isArray(parsed.active)
                ? parsed.active
                : [],

            levels:
                parsed.levels &&
                    typeof parsed.levels === 'object'
                    ? parsed.levels
                    : {},
        }

    } catch {

        return {
            active: [],
            levels: {},
        }

    }

}

function applyTextScale(level: number = 0) {

    if (typeof document === 'undefined')
        return

    const nodes =
        document.body.querySelectorAll<HTMLElement>('*')

    nodes.forEach(node => {

        if (node.closest(SKIP_SELECTOR))
            return

        if (!node.dataset.a11yBaseFont) {
            node.dataset.a11yBaseFont =
                window.getComputedStyle(node).fontSize
        }

        if (level === 0) {

            node.style.fontSize = ''

            delete node.dataset.a11yBaseFont

            return
        }

        const base =
            Number.parseFloat(
                node.dataset.a11yBaseFont || ''
            )

        if (!Number.isNaN(base)) {

            node.style.fontSize =
                `${base * TEXT_SCALE[level]}px`
        }
    })
}

export function A11yProvider({
    children
}: {
    children: React.ReactNode
}) {

    const [state, setState] =
        useState<A11yState>({
            active: [],
            levels: {}
        })

    const [isLoaded, setIsLoaded] =
        useState(false)
    const [widgetOpen, setWidgetOpen] =
        useState(false)
    const active =
        useMemo(
            () => new Set(state.active),
            [state.active]
        )

    useEffect(() => {
        const saved =
            readInitialState()
        setState(saved)
        setIsLoaded(true)
    }, [])

    useEffect(() => {
        if (!isLoaded)
            return
        const root =
            document.documentElement
        const classMap: Record<A11yFeature, string> = {

            textSize: 'a11y-text-size',
            lineSpacing: 'a11y-line-spacing',
            letterSpacing: 'a11y-letter-spacing',
            hideImages: 'a11y-hide-images',
            greyscale: 'a11y-greyscale',
            lowSaturation: 'a11y-low-sat',
            highContrast: 'a11y-high-contrast',
            darkMode: 'a11y-dark',
            highlightLinks: 'a11y-highlight-links',
            bigCursor: 'a11y-big-cursor',
            focusIndicator: 'a11y-focus-indicator',
            reduceMotion: 'a11y-reduce-motion',
            dyslexiaFont: 'a11y-dyslexia',
            readingRuler: 'a11y-reading-ruler',
        }

        Object.entries(classMap)
            .forEach(([feature, cls]) => {

                const key =
                    feature as A11yFeature
                root.classList.toggle(
                    cls,
                    active.has(key)
                )

                if (LEVEL_FEATURES.has(key)) {
                    const level =
                        state.levels[key] ?? 0
                    const dataKey =
                        `a11y${feature
                            .charAt(0)
                            .toUpperCase()
                        }${feature.slice(1)}`

                    if (level) {

                        root.dataset[dataKey] =
                            String(level)

                    }
                    else {

                        delete root.dataset[dataKey]
                    }
                }
            })

        applyTextScale(
            state.levels.textSize ?? 0
        )

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(state)
        )
    }, [
        state,
        active,
        isLoaded
    ])

    const toggle =
        (feature: A11yFeature) => {
            setState(prev => {
                const active =
                    new Set(prev.active)
                const levels =
                    { ...prev.levels }
                if (LEVEL_FEATURES.has(feature)) {
                    const next =
                        ((levels[feature] ?? 0) + 1)
                        %
                        (MAX_LEVEL + 1)
                    if (next === 0) {
                        active.delete(feature)
                        delete levels[feature]
                    }
                    else {
                        active.add(feature)
                        levels[feature] = next
                    }

                    return {
                        active: [...active],
                        levels
                    }
                }

                if (active.has(feature))
                    active.delete(feature)
                else
                    active.add(feature)
                return {
                    active: [...active],
                    levels
                }
            })
        }

    const reset = () => {
        localStorage.removeItem(
            STORAGE_KEY
        )
        applyTextScale(0)
        setState({
            active: [],
            levels: {}
        })
    }

    return (
        <A11yContext.Provider
            value={{
                active,
                levels: state.levels,
                widgetOpen,
                isLoaded,
                toggle,
                reset,
                isActive:
                    (f) =>
                        active.has(f),
                getLevel:
                    (f) =>
                        state.levels[f] ?? 0,
                openWidget:
                    () => setWidgetOpen(true),
                closeWidget:
                    () => setWidgetOpen(false),
                toggleWidget:
                    () => setWidgetOpen(
                        prev => !prev
                    )
            }}
        >
            {children}
        </A11yContext.Provider>
    )
}

export function useA11y() {
    const ctx =
        useContext(A11yContext)
    if (!ctx)
        throw new Error(
            'useA11y must be used inside A11yProvider'
        )
    return ctx

}