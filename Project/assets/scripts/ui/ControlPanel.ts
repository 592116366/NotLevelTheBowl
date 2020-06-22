import UIBase from "./UIBase"
import UIManager from "../UIManager"
import GameManager from "../GameManager"
import { MusicManager } from "../MusicManager"
import { MusicType } from "../Enum"
import { Util } from "../utils/Util"

const {ccclass, property} = cc._decorator

@ccclass
export default class ControlPanel extends UIBase {

    @property({
        type: cc.Node,
        displayName: '点击下落按钮'
    })
    clickDownButton: cc.Node | undefined = undefined

    @property({
        type: cc.Node,
        displayName: '点击左移按钮'
    })
    clickLeftButton: cc.Node | undefined = undefined

    @property({
        type: cc.Node,
        displayName: '点击右移按钮'
    })
    clickRightButton: cc.Node | undefined = undefined

    @property({
        type: cc.Node,
        displayName: '轮盘背景节点'
    })
    panelBkNode: cc.Node | undefined = undefined

    @property({
        type: cc.Node,
        displayName: '轮盘中心节点'
    })
    panelMidNode: cc.Node | undefined = undefined

    onLoad() {
        super.onLoad()
    }

    /** 初始化按钮监听事件，注入管理实例 */
    init(uiManager: UIManager) {
        const { TOUCH_START, TOUCH_MOVE, TOUCH_END, TOUCH_CANCEL } = cc.Node.EventType
        // 轮盘事件
        if (this.panelBkNode && this.panelMidNode) {
            this.panelBkNode.on(TOUCH_START, (event: cc.Event.EventTouch) => {
                MusicManager.getInstance().play(MusicType.Click)
                const pos = this.panelBkNode!.convertToNodeSpaceAR(event.getLocation())
                this.panelMidNode!.setPosition(this.limitMidNodePos(pos))
            }, this)

            this.panelBkNode.on(TOUCH_MOVE, (event: cc.Event.EventTouch) => {
                const pos = this.panelBkNode!.convertToNodeSpaceAR(event.getLocation())
                this.panelMidNode!.setPosition(this.limitMidNodePos(pos))
            }, this)

            this.panelBkNode.on(TOUCH_END, () => this.panelMidNode!.setPosition(0, 0), this)
            this.panelBkNode.on(TOUCH_CANCEL, () => this.panelMidNode!.setPosition(0, 0), this)
        }
        // 左向按钮
        if (this.clickLeftButton) {
            this.clickLeftButton.on(TOUCH_START, () => {
                MusicManager.getInstance().play(MusicType.Click)
                Util.clickDownTween(this.clickLeftButton)
            }, this)

            this.clickLeftButton.on(TOUCH_END, () => {
                Util.clickUpTween(this.clickLeftButton)
            }, this)

            this.clickLeftButton.on(TOUCH_CANCEL, () => Util.clickUpTween(this.clickLeftButton), this)
        }
        // 右向按钮
        if (this.clickRightButton) {
            this.clickRightButton.on(TOUCH_START, () => {
                MusicManager.getInstance().play(MusicType.Click)
                Util.clickDownTween(this.clickRightButton)
            }, this)

            this.clickRightButton.on(TOUCH_END, () => {
                Util.clickUpTween(this.clickRightButton)
            }, this)

            this.clickRightButton.on(TOUCH_CANCEL, () => Util.clickUpTween(this.clickRightButton), this)
        }
        // 下落按钮
        if (this.clickDownButton) {
            this.clickDownButton.on(TOUCH_START, () => {
                MusicManager.getInstance().play(MusicType.Click)
                Util.clickDownTween(this.clickDownButton)
            }, this)

            this.clickDownButton.on(TOUCH_END, () => {
                Util.clickUpTween(this.clickDownButton)
            }, this)

            this.clickDownButton.on(TOUCH_CANCEL, () => Util.clickUpTween(this.clickDownButton), this)
        }
    }

    limitMidNodePos(pos: cc.Vec2): cc.Vec2 {
        const R = 130
        const len = pos.mag()
        const ratio = len > R ? R / len : 1
        return cc.v2(pos.x * ratio, pos.y * ratio)
    }

}
