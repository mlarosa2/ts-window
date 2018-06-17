import Util from './Utilities';

export default class Resizeable {
    panel: HTMLElement|null;
    parent: HTMLElement|null;
    selector: string;
    parentSelector: string;
    isResizing: boolean = false;
    canResizeRight: boolean = false;
    canResizeDown: boolean = false;
    canResizeDiag: boolean = false;
    xDiff: number = -1;
    yDiff: number = -1;
    bounds: {top:boolean, right:boolean, bottom:boolean, left:boolean};
    resizeStart: Function;
    resizeEnd: Function;
    constructor(selector: string, parentSelector: string, bounds: {top:boolean, right:boolean, bottom:boolean, left:boolean}, resizeStart: Function, resizeEnd: Function) {
        this.panel          = null;
        this.parent         = null;
        this.selector       = selector;
        this.parentSelector = parentSelector;
        this.bounds         = bounds;
        this.resizeStart    = resizeStart;
        this.resizeEnd      = resizeEnd;
    }

    addListeners(): void {
        this.panel  = document.querySelector(`#${this.selector}`);
        this.parent = document.querySelector(this.parentSelector);
   
        if (this.panel != null) {
            this.panel.addEventListener('mousedown', this.mousedown.bind(this));
            document.addEventListener('mouseup', this.mouseup.bind(this));
            document.addEventListener('mousemove', this.mousemove.bind(this));
        }
    }

    removeListeners(): void {
        if (this.panel != null) {
            this.panel.removeEventListener('mousedown', this.mousedown.bind(this));
        }
        document.removeEventListener('mouseup', this.mouseup.bind(this));
        document.removeEventListener('mousemove', this.mousemove.bind(this));
    }

    private mousedown(e: MouseEvent): void {
        if (this.canResizeDiag || this.canResizeDown || this.canResizeRight) {
            this.isResizing = true;
            let parentBounding, left: number, top: number;

            if (this.parent != null) {
                parentBounding = this.parent.getBoundingClientRect();
            } else {
                parentBounding = {right: 0, bottom: 0};
            }

            this.xDiff = e.clientX - parentBounding.right;
            this.yDiff = e.clientY - parentBounding.bottom;
            this.resizeStart();
        }
    }

    private mouseup(e: MouseEvent): void {
        if (this.isResizing) this.resizeEnd();
        this.isResizing = false;
        this.xDiff      = -1;
        this.yDiff      = -1;
        if (this.panel != null) {
            this.panel.style.userSelect = 'all';
        }
    }

    private mousemove(e: MouseEvent): void {
        if (!this.isResizing) {
            this.styleCursor(e);
        } else {
            if (this.panel != null) {
                this.panel.style.userSelect = 'none';
            }
            let parentBounding, dragX: number, dragY: number, width: number, height: number;

            if (this.parent != null) {
                parentBounding = this.parent.getBoundingClientRect();
            } else {
                parentBounding = {right: 0, bottom: 0};
            }
    
            dragX = e.clientX - parentBounding.right;
            dragY = e.clientY - parentBounding.bottom;
    
            if (this.panel && this.panel.style.width) {
                width = Util.getNumber(this.panel.style.width);
            } else {
                width = 0;
            }
            if (this.panel && this.panel.style.height) {
                height = Util.getNumber(this.panel.style.height);
            } else {
                height = 0;
            }
            
            if (this.panel != null) {
                if (this.canResizeDiag || this.canResizeRight) {
                    if (dragX < this.xDiff) {
                        this.panel.style.width = width - (this.xDiff - dragX) + 'px';
                    }
                    if (dragX > this.xDiff) {
                        this.panel.style.width = width + (dragX - this.xDiff) + 'px';
                    }
                    this.xDiff = dragX;
                }

                if (this.canResizeDiag || this.canResizeDown) {
                    if (dragY < this.yDiff) {
                        this.panel.style.height = height - (this.yDiff - dragY) + 'px';
                    }
                    if (dragY > this.yDiff) {
                        this.panel.style.height = height + (dragY - this.yDiff) + 'px';
                    }
                    this.yDiff = dragY;
                }
            }

            this.checkBounds();
        }
    }

    private styleCursor(e: MouseEvent): void {
        let parentBounding, x: number, y: number, panelBounding;

        if (this.parent != null && this.panel != null) {
            parentBounding = this.parent.getBoundingClientRect();
            panelBounding  = this.panel.getBoundingClientRect();
            x              = e.clientX;
            y              = e.clientY;

            if (x <= panelBounding.right && x > panelBounding.right - 4) {
                this.canResizeRight = true;
            } else {
                this.canResizeRight = false;
            }
            if (y <= panelBounding.bottom && y > panelBounding.bottom - 4) {
                this.canResizeDown = true;
            } else {
                this.canResizeDown = false;
            }

            if (x <= panelBounding.right && x > panelBounding.right - 10 &&
                y <= panelBounding.bottom && y > panelBounding.bottom - 10) {
                this.canResizeDiag = true;
            } else {
                this.canResizeDiag = false;
            }

            if (this.canResizeDiag) {
                this.panel.style.cursor = 'nwse-resize';
            } else if (this.canResizeDown) {
                this.panel.style.cursor = 'ns-resize';
            } else if (this.canResizeRight) {
                this.panel.style.cursor = 'ew-resize';
            } else {
                this.panel.style.cursor = 'default';
            }
        } else {
            throw "How'd you even get here?";
        }
    }

    private checkBounds(): void {
        if (this.panel != null && this.panel.style && this.parent != null) {
            let parentBounds = this.parent.getBoundingClientRect(),
                panelBounds  = this.panel.getBoundingClientRect();

            if (panelBounds.bottom > parentBounds.bottom && this.bounds.bottom && this.panel.style.height) {
                let difference: number = panelBounds.bottom - parentBounds.bottom,
                    height: number = Util.getNumber(this.panel.style.height);

                this.panel.style.height = height - difference + 'px';
            }
            if (panelBounds.right > parentBounds.right && this.bounds.right && this.panel.style.width) {
                let difference: number = panelBounds.right - parentBounds.right,
                width: number = Util.getNumber(this.panel.style.width);

                this.panel.style.width = width - difference + 'px';
            }
        }
    }
}