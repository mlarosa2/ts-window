import Draggable from './Draggable';
import Resizable from './Resizable';
import Style from './Style';

export default class Panel {
    config: PanelConfig;
    draggable: Draggable;
    resizeable: Resizable;
    parent: Element|null;
    panel: HTMLElement|null;
    constructor(config: PanelConfig) {
        let concreteBounds: {top:boolean, right:boolean, bottom:boolean, left:boolean} = {top: true, right: true, bottom: true, left: true},
            moveStartFn: Function, moveEndFn: Function, resizeStartFn: Function, resizeEndFn: Function;
        this.config = config;
        if (this.config.bounds) {
            if (!this.config.bounds.top) concreteBounds.top = false;
            if (!this.config.bounds.right) concreteBounds.right = false;
            if (!this.config.bounds.bottom) concreteBounds.bottom = false;
            if (!this.config.bounds.left) concreteBounds.left = false;
        }
        if (this.config.onMoveStart) {
            moveStartFn = this.config.onMoveStart;
        } else {
            moveStartFn = () => {};
        }
        if (this.config.onMoveEnd) {
            moveEndFn = this.config.onMoveEnd;
        } else {
            moveEndFn = () => {};
        }
        if (this.config.onResizeStart) {
            resizeStartFn = this.config.onResizeStart;
        } else {
            resizeStartFn = () => {};
        }
        if (this.config.onResizeEnd) {
            resizeEndFn = this.config.onResizeEnd;
        } else {
            resizeEndFn = () => {};
        }
        this.draggable  = new Draggable(this.config.id, this.config.parentSelector, concreteBounds, moveStartFn, moveEndFn);
        this.resizeable = new Resizable(this.config.id, this.config.parentSelector, concreteBounds, resizeStartFn, resizeEndFn); 
        this.parent     = document.querySelector(this.config.parentSelector);
        this.panel      = null;
    }

    buildPanel(): void {
        if (this.parent === null) {
            throw 'Parent selector could not be found';
        } else {
            let panelConfig = {}, headerConfig = {};
            if (this.config.style) {
                if (this.config.style.panel) {
                    panelConfig = this.config.style.panel;
                }
                if (this.config.style.header) {
                    headerConfig = this.config.style.header
                }
            }
            const panelStyle  = Style.addPanelStyle(
                panelConfig,
                this.parent,
                this.config.width,
                this.config.height
            );
            const headerStyle = Style.addHeaderStyle(headerConfig); 
            this.parent.innerHTML += `
                <section style="${panelStyle}" id="${this.config.id}">
                    <header style="${headerStyle}">
                        <span>${this.config.header}</span>
                        <div style="float:right;position:relative;right:4px;top:1px;cursor:pointer;" class="ts-panel-close">
                            <span style="font-family:sans-serif;">X</span>
                        </div>
                        <div style="float:right;position;position:relative;right:15px;top:3px;cursor:pointer;background:white;" class="ts-panel-max">
                            <span style="display:inline-block;border:1px solid black;width:10px;height:10px;"></span>
                        </div>
                        <div style="float:right;position;position:relative;right:4px;top:4px;cursor:pointer;visibility:hidden;" class="ts-panel-normal">
                            <span style="display:inline-block;border:1px solid black;width:10px;height:10px; background:white;position:absolute"></span>
                            <span style="display:inline-block;border:1px solid black;width:10px;height:10px; background:white;position:relative;bottom:2px;left:2px;"></span>
                        </div>
                    </header>
                    <main>${this.config.body}</main>
                </section>
            `;

            this.addListeners();
            this.panel = document.querySelector(`#${this.config.id}`);
        }
    }

    closePanel(e: Event): void {
        if (e) {
            e.stopPropagation();
        }
        let parentNode = document.querySelector(this.config.parentSelector) as Node;

        if (this.config.onClose) {
            this.config.onClose();
        }

        if (parentNode != null && this.parent != null) {
            let panel: Node = this.parent.querySelector(`#${this.config.id}`) as Node;

            if (panel != null) {
                parentNode.removeChild(panel);
            }
        }
    }

    private addListeners(): void {
        this.addPanelListeners();
        this.draggable.addListeners();
        this.resizeable.addListeners();
    }

    private addPanelListeners(): void {
        const close: HTMLElement|null     = document.querySelector(`#${this.config.id} .ts-panel-close`),
              max: HTMLElement|null       = document.querySelector(`#${this.config.id} .ts-panel-max`),
              normalize: HTMLElement|null = document.querySelector(`#${this.config.id} .ts-panel-normal`);

        if (close != null) {
            close.addEventListener('click', this.closePanel.bind(this), false);
            close.addEventListener('mousedown', this.stopMove.bind(this), false);
        }
        if (max != null) {
            max.addEventListener('click', this.maximizePanel.bind(this), false);
            max.addEventListener('mousedown', this.stopMove.bind(this), false);
        }
        if (normalize != null) {
            normalize.addEventListener('click', this.normalizePanel.bind(this), false);
            normalize.addEventListener('mousedown', this.stopMove.bind(this), false);
        }
    }

    // need to stop mousedown event on header for dragging
    private stopMove(e: Event) {
        e.stopPropagation();
        if (this.panel && this.panel.style) {
            this.panel.style.userSelect = 'none';
        }
    }

    private removeListeners(): void {
        this.draggable.removeListeners();
        this.resizeable.removeListeners();
        this.removePanelListeners();
    }

    private removePanelListeners(): void {
        const close: HTMLElement|null = document.querySelector(`#${this.config.id} .ts-panel-close`),
              max: HTMLElement|null   = document.querySelector(`#${this.config.id} .ts-panel-max`),
              normalize: HTMLElement|null = document.querySelector(`#${this.config.id} .ts-panel-normal`);

        if (close != null) {
            close.removeEventListener('click', this.closePanel.bind(this));
            close.removeEventListener('mousedown', this.stopMove.bind(this));
        }
        if (max != null) {
            max.removeEventListener('click', this.maximizePanel.bind(this));
            max.removeEventListener('mousedown', this.stopMove.bind(this));
        }
        if (normalize != null) {
            normalize.removeEventListener('click', this.normalizePanel.bind(this));
            normalize.removeEventListener('mousedown', this.stopMove.bind(this));
        }
    }

    private maximizePanel(e: Event): void {
        e.stopPropagation();
        let normalize: HTMLElement|null = document.querySelector(`#${this.config.id} .ts-panel-normal`),
            maximize: HTMLElement|null  = document.querySelector(`#${this.config.id} .ts-panel-max`);
        if (this.panel != null && this.panel.style && this.parent) {
            let parentWidth  = this.parent.clientWidth,
                parentHeight = this.parent.clientHeight;
                
            this.panel.style.width      = parentWidth + 'px';
            this.panel.style.height     = parentHeight + 'px';
            this.panel.style.left       = '0px';
            this.panel.style.top        = '0px';
            this.panel.style.userSelect = 'all';
        }

        if (normalize != null && maximize != null && normalize.style && maximize.style) {
            normalize.style.visibility = 'visible';
            maximize.style.visibility = 'hidden';
        }

        if (this.config.onMax) {
            this.config.onMax();
        }
    }

    private normalizePanel(e: Event): void {
        e.stopPropagation();
        let normalize: HTMLElement|null = document.querySelector(`#${this.config.id} .ts-panel-normal`),
            maximize: HTMLElement|null  = document.querySelector(`#${this.config.id} .ts-panel-max`);
        if (this.panel != null && this.panel.style) {
            this.panel.style.width      = this.config.width + 'px';
            this.panel.style.height     = this.config.height + 'px';
            this.panel.style.userSelect = 'all';
        }

        if (normalize != null && maximize != null && normalize.style && maximize.style) {
            normalize.style.visibility = 'hidden';
            maximize.style.visibility = 'visible';
        }


        if (this.config.onNormalize) {
            this.config.onNormalize();
        }
    }
}