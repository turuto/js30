export class CheckboxList {
    constructor(container) {
        this.container = container;
        this.isShiftPressed = false;
        this.lastChecked = undefined;
        this.init();
    }

    init = function () {
        this.createElements();
        this.addEventListeners();
    }

    createElements = function () {
        this.listItems = this.container.querySelectorAll('li');
        this.checks = this.container.querySelectorAll('input[type="checkbox"]');
    }

    addEventListeners = function () {
        this.checks.forEach(check => {
            check.addEventListener('change', this.updateList.bind(this));
        });

        document.addEventListener('keydown', e => {
            if (e.shiftKey) {
                this.isShiftPressed = true
            }
        })

        document.addEventListener('keyup', e => {
            if (!e.shiftKey) {
                console.log('SHIFT UP')
                this.isShiftPressed = false
            }
        })
    }

    updateList = function (e) {
        const clickedItemIndex = [... this.listItems].indexOf(e.target.parentNode);
        if (!this.isShiftPressed) {
            this.lastChecked = clickedItemIndex;
        } else {
            // we have pressed SHIFT
            if (this.lastChecked) {
                // and had another one already
                this.selectIntermediateItems(this.lastChecked, clickedItemIndex)
            }
        }
    }

    selectIntermediateItems = function (indexA, indexB) {
        const bounds = [indexA, indexB].sort();
        for (let i = bounds[0]; i <= bounds[1]; i++) {
            const interItem = this.listItems[i];
            interItem.querySelector('input').setAttribute('checked', '');
        }
    }

}