interface PanelConfig {
    id: string,
    parentSelector: string,
    // string for percentages
    width: number|string,
    height: number|string,
    header: string,
    body: string,
    bounds?: {
        top?: boolean,
        right?: boolean,
        bottom?: boolean,
        left?: boolean
    }
    style?: {
        panel?: {
            left?: number,
            top?: number
            maxWidth?: number|string,
            maxHeight?: number|string,
            minWidth?: number|string,
            minHeight?: number|string
        },
        header?: {
            borderBottom?: string,
            cursor?: string
        }
    },
    onClose?: Function,
    onMax?: Function,
    onNormalize?: Function,
    onMoveStart?: Function,
    onMoveEnd?: Function,
    onResizeStart?: Function,
    onResizeEnd?: Function
}