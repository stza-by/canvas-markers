export default function extendLeafletCanvas(L) {
    console.log('Leaflet Extending ');

    L.Canvas.include({
        _updateImg(layer) { //Метод добавления img на Canvas-слой
            const {img} = layer.options;
            const p = layer._point.round();
            this._ctx.drawImage(img.el, p.x - img.size[0] / 2, p.y - img.size[1] / 2, img.size[0], img.size[1]);
        },
    });
    const CanvasMarker = L.CircleMarker.extend({
        _updatePath() {
            if (!this.options.img.el) { //Создаем элемент IMG
                const img = document.createElement('img');
                img.src = this.options.img.url;
                this.options.img.el = img;
                img.onload = () => {
                    this.redraw();  //После загрузки запускаем перерисовку
                };
            } else {
                this._renderer._updateImg(this);    //Вызываем _updateImg
            }
        },
    });

    L.canvasMarker = function (...options) {
        return new CanvasMarker(...options);
    };
}