# TSWindow

## Usage
Add windows to your web application with this lightweight library (only 15KB!). [Click here]() to see the demo (link coming soon), along with code to generate a window. The configuration object right now looks like this:
```
{
    id: string, // used as id for whole window, ie window-one
    parentSelector: string, // CSS selector for the window's parent
    width: number|string, // if number then px, if string then '100%'
    height: number|string, // if number then px, if string then '100%'
    header: string, // content for the window header
    body: string, // content for the window body
    // properties followed by a ? are optional
    bounds?: { // bounds properties that are true will not allow window to go past that part of the parent.
               // if bounds.right == true then the window cannot be dragged past it's parent's right bound
        top?: boolean,
        right?: boolean,
        bottom?: boolean,
        left?: boolean
    }
    style?: {
        panel?: { // styles for the window itself
            left?: number, // starting style for window's left attribute, default is 0
            top?: number // starting style for winow's top attribute, default is 0
            maxWidth?: number|string, window max width (pixels or %)
            maxHeight?: number|string, window max height (pixels or %)
            minWidth?: number|string, window min width (pixels or %) default is 200px
            minHeight?: number|string window min height (pixels or %) default is 200px
        },
        header?: {
            borderBottom?: string, // border-bottom css value
            cursor?: string // cursor css value for when user is hovering over header
        }
    },
    onClose?: Function, // function to run when window is closed
    onMax?: Function, // function to run when window is maximized
    onNormalize?: Function, // function to run when window is normalized
    onMoveStart?: Function, // function to run when user begins to drag the window
    onMoveEnd?: Function, // function to run when user stops dragging the window
    onResizeStart?: Function, // function to run when user begins to resize the window
    onResizeEnd?: Function // function to run when user stops resizing the window
}
```
I am planning on adding much more customization. Please provide feedback as what you would like to see customized, and other features! 

## Development
If you want to make changes to the project, all you need to do is run npm install, then npm run build and you are on your way. The only development dependencies are TypeScript and Webpack. All the styles are added to the window in src/classes/Panel.ts