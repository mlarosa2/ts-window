import Util from './Utilities';

export default class Style {
    constructor() { }

    static addPanelStyle(config: any, parent: Element, width: number|string, height: number|string): string {
        let panelStyle: string = `box-sizing:border-box;border:1px solid black;position:absolute;top:0;left:0;width:${width};height:${height};`,
            parentWidth: number, parentHeight: number;
            panelStyle += `min-height:200px;min-width:200px;`;
        if (parent != null) {
            parentHeight = parent.getBoundingClientRect().bottom - parent.getBoundingClientRect().top;
            parentWidth  = parent.getBoundingClientRect().right - parent.getBoundingClientRect().left;
        } else {
            parentHeight = 0;
            parentWidth  = 0;
        }
        
        if (config.maxHeight) {
            let maxHeight: number|string = config.maxHeight;
            if (typeof maxHeight === 'string') {
                maxHeight = parentHeight * (Util.getNumber(maxHeight)/100);
            }
            panelStyle += `max-height:${maxHeight};`;
        }
        if (config.maxWidth) {
            let maxWidth: number|string = config.maxWidth;
            if (typeof maxWidth === 'string') {
                maxWidth = parentWidth * (Util.getNumber(maxWidth)/100);
            }
            panelStyle += `max-width:${config.maxWidth};`;
        }
        if (config.minWidth) {
            let minWidth: number|string = config.minWidth;
            if (typeof minWidth === 'string') {
                minWidth = parentHeight * (Util.getNumber(minWidth)/100);
            }
            panelStyle += `min-width:${config.minWidth};`;
        }
        if (config.minHeight) {
            let minHeight: number|string = config.minHeight;
            if (typeof minHeight === 'string') {
                minHeight = parentHeight * (Util.getNumber(minHeight)/100);
            }
            panelStyle += `min-height:${config.minHeight};`;
        }
        if (config.left) {
            panelStyle += `left:${config.left}px;`;
        }
        if (config.top) {
            panelStyle += `top:${config.top}px`;
        }

        return panelStyle;
    }

    static addHeaderStyle(config: any): string {
        let headerStyle: string = 'border-bottom:1px solid black;cursor:move;padding-left:3px;';
        if (config.borderBottom) {
            headerStyle += config.borderBottom;
        }

        if (config.cursor) {
            headerStyle += config.cursor;
        }

        return headerStyle;
    }
}