export default class Modal {
    constructor(modalElem) {
        this.modalElem = modalElem
        this.reset()
    }

    reset() {
        this.show = true
        this.modalElem.style.setProperty("display", "flex")
        
    }
    
    hide() {
        this.show = false
        this.modalElem.style.setProperty("display", "none")
    }

    // win() {
    //     this.modalElem.
    // }


}