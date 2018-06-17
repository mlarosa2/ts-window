import Util from './Utilities';

export default class Draggable {
    panel: HTMLElement|null;
    header: HTMLElement|null;
    selector: string;
    parent: HTMLElement|null;
    isDragging: boolean;
    xDiff: number = -1;
    yDiff: number = -1;
    bounds: {top:boolean, right:boolean, bottom:boolean, left:boolean};
    moveStart: Function;
    moveEnd: Function;
    constructor(selector: string, parent: string, bounds: {top:boolean, right:boolean, bottom:boolean, left:boolean}, moveStart: Function, moveEnd: Function) {
        this.isDragging = false;
        this.panel      = null;
        this.header     = null;
        this.selector   = selector;
        this.parent     = document.querySelector(parent);
        this.bounds     = bounds;
        this.moveStart  = moveStart;
        this.moveEnd    = moveEnd;
    }

    addListeners(): void {
        this.panel      = document.querySelector(`#${this.selector}`);
        this.header     = document.querySelector(`#${this.selector} header`);
        if (this.header == null) {
            throw "No header found";
        } else {
            this.header.addEventListener('mousedown', this.mousedown.bind(this), false);
            document.addEventListener('mousemove', this.mousemove.bind(this), false);
            document.addEventListener('mouseup', this.mouseup.bind(this), false);
        }
    }

    removeListeners(): void {
        if (this.header != null) {
            this.header.removeEventListener('mousedown', this.mousedown.bind(this));
        }
        document.removeEventListener('mousemove', this.mousemove.bind(this));
        document.removeEventListener('mouseup', this.mouseup.bind(this));
    }

    private mouseup(e: MouseEvent) {
        if (this.isDragging) this.moveEnd();
        this.isDragging = false;
        this.xDiff      = -1;
        this.yDiff      = -1;
        if (this.panel != null) {
            this.panel.style.userSelect = 'all';
        }
    }

    private mousedown(e: MouseEvent): void {
        let parentBounding, left: number, top: number;
        this.setZIndices();
        this.isDragging = true;
        if (this.parent != null) {
            parentBounding = this.parent.getBoundingClientRect();
        } else {
            parentBounding = {left: 0, top: 0};
        }

        this.xDiff = e.clientX - parentBounding.left;
        this.yDiff = e.clientY - parentBounding.top;
        this.moveStart();
    }

    private mousemove(e: MouseEvent): void {
        let parentBounding, dragX: number, dragY: number, left: number, top: number;

        if (this.parent != null) {
            parentBounding = this.parent.getBoundingClientRect();
        } else {
            parentBounding = {left: 0, top: 0};
        }

        dragX = e.clientX - parentBounding.left;
        dragY = e.clientY - parentBounding.top;

        if (this.panel && this.panel.style.left) {
            left = Util.getNumber(this.panel.style.left);
        } else {
            left = 0;
        }
        if (this.panel && this.panel.style.top) {
            top = Util.getNumber(this.panel.style.top);
        } else {
            top = 0;
        }
        
        if (this.panel != null && this.isDragging) {
            this.panel.style.userSelect = 'none';
            if (dragX < this.xDiff) {
                this.panel.style.left = left - (this.xDiff - dragX) + 'px';
            }
            if (dragX > this.xDiff) {
                this.panel.style.left = left + (dragX - this.xDiff) + 'px';
            }

            if (dragY < this.yDiff) {
                this.panel.style.top = top - (this.yDiff - dragY) + 'px';
            }
            if (dragY > this.yDiff) {
                this.panel.style.top = top + (dragY - this.yDiff) + 'px';
            }
            this.xDiff = dragX;
            this.yDiff = dragY;

            this.checkBounds();
        }
    }

    private checkBounds(): void {
        if (this.panel != null && this.panel.style && this.parent != null) {
            let parentBounds  = this.parent.getBoundingClientRect(),
                panelBounds = this.panel.getBoundingClientRect();

            if (panelBounds.left < parentBounds.left && this.bounds.left) {
                this.panel.style.left = '0px';
            }
            if (panelBounds.top < parentBounds.top && this.bounds.top) {
                this.panel.style.top = '0px';
            }
            if (panelBounds.bottom > parentBounds.bottom && this.bounds.bottom && this.panel.style.top) {
                let difference: number = panelBounds.bottom - parentBounds.bottom,
                    top: number = Util.getNumber(this.panel.style.top);

                this.panel.style.top = top - difference + 'px';
            }
            if (panelBounds.right > parentBounds.right && this.bounds.right && this.panel.style.left) {
                let difference: number = panelBounds.right - parentBounds.right,
                left: number = Util.getNumber(this.panel.style.left);

                this.panel.style.left = left - difference + 'px';
            }
        }
    }

    private setZIndices(): void {
        if (this.panel != null) {
            this.panel.style.zIndex = '9999999';
        }
    }
}   