function itemsCount(e) {
    var current_value = $(e).parent().children('input').val();
    if ($(e).hasClass('up')){
        $(e).parent().children('input').val(current_value*1+1);
    } else {
        if (current_value != 1) {
            $(e).parent().children('input').val(current_value*1-1);
        }
    }
}
function triggerVariant(e) {
    if(!$(e).hasClass('unit--active')){
        $(e).parent().children('.unit--select').removeClass('unit--active');
        $(e).addClass('unit--active');
        $(e).parent().parent().parent().children('.product_price_club_card').children('.goldPrice').toggle();
        $(e).parent().parent().parent().children('.product_price_default').children('.retailPrice').toggle();
    }
}
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'https://old.lapsi.ru/content/articles/json_testing/products.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}
$(document).ready(function(){

    loadJSON(function(response) {
        var actual_JSON = JSON.parse(response);

        for (var i = 0; i < actual_JSON.length; i++) {

            var accesoirs = actual_JSON[i].assocProducts.split('\n');
            var accesoirs_html = '<p>Могут понадобиться:</p> ';
            for (var k = 0; k < accesoirs.length; k++) {
                accesoirs_html = accesoirs_html + '<a href="#" class="url--link">' + accesoirs[k] + '</a>';
            }
            var unit_full_value = 'упаковку';
            if(actual_JSON[i].unitFull == 'штука') {unit_full_value = 'штуку';}
            if(actual_JSON[i].unitFull == 'метр погонный') {actual_JSON[i].unitFull = 'метр погонны';}

            var koeff = 1/actual_JSON[i].unitRatioAlt;
            koeff = koeff.toFixed(2);

            var template_item = '<div class="products_page pg_0">\
                                            <div class="product product_horizontal">\
                                            <span class="product_code">'+"Код: " + actual_JSON[i].code+'</span>\
                                    <div class="product_status_tooltip_container">\
                                            <span class="product_status">Наличие</span>\
                                            </div>\
                                            <div class="product_photo">\
                                            <a href="#" class="url--link product__link">\
                                            <img src="' + actual_JSON[i].primaryImageUrl.replace('.jpg','_220x220_1.jpg') + '">\
                                            </a>\
                                            </div>\
                                            <div class="product_description">\
                                            <a href="#" class="product__link">' + actual_JSON[i].title + '</a>\
                                            </div>\
                                    <div class="product_tags hidden-sm">'+accesoirs_html+'</div>\
                                    <div class="product_units">\
                                            <div class="unit--wrapper">\
                                            <div class="unit--select unit--active" onClick="triggerVariant(this);">\
                                            <p class="ng-binding">За '+actual_JSON[i].unitAlt+'</p>\
                                            </div>\
                                    <div class="unit--select" onClick="triggerVariant(this);">\
                                            <p class="ng-binding">За '+unit_full_value+'</p>\
                                            </div>\
                                            </div>\
                                            </div>\
                                    <p class="product_price_club_card">\
                                            <span class="product_price_club_card_text">По карте<br>клуба</span>\
                                    <span class="goldPrice">'+actual_JSON[i].priceRetailAlt.toFixed(2)+'</span>\
                                    <span class="goldPrice" style="display:none;">'+actual_JSON[i].priceGoldAlt.toFixed(2)+'</span>\
                                            <span class="rouble__i black__i">\
                                            <svg version="1.0" id="rouble__b" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="30px" height="22px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">\
                                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rouble_black"></use>\
                                            </svg>\
                                            </span>\
                                            </p>\
                                            <p class="product_price_default">\
                                            <span class="retailPrice">'+actual_JSON[i].priceGold.toFixed(2)+'</span>\
                                            <span class="retailPrice" style="display:none;">'+actual_JSON[i].priceRetail.toFixed(2)+'</span>\
                                            <span class="rouble__i black__i">\
                                            <svg version="1.0" id="rouble__g" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="30px" height="22px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">\
                                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rouble_gray"></use>\
                                            </svg>\
                                            </span>\
                                            </p>\
                                            <div class="product_price_points">\
                                            <p class="ng-binding">Можно купить за '+actual_JSON[i].bonusAmount+' балла</p>\
                                            </div>\
                                    <div class="list--unit-padd"></div>\
                                            <div class="list--unit-desc">\
                                            <div class="unit--info">\
                                            <div class="unit--desc-i"></div>\
                                            <div class="unit--desc-t">\
                                            <p>\
                                            <span class="ng-binding">Продается '+actual_JSON[i].unitFull+'ми:</span>\
                                    <span class="unit--infoInn">1 '+actual_JSON[i].unit+' = '+koeff+' '+actual_JSON[i].unitAlt+' </span>\
                                            </p>\
                                            </div>\
                                            </div>\
                                            </div>\
                                    <div class="product__wrapper">\
                                            <div class="product_count_wrapper">\
                                            <div class="stepper">\
                                            <input class="product__count stepper-input" type="text" value="1">\
                                            <span class="stepper-arrow up" onClick="itemsCount(this);"></span>\
                                            <span class="stepper-arrow down" onClick="itemsCount(this);"></span>\
                                            </div>\
                                            </div>\
                                            <span class="btn btn_cart" data-url="/cart/" data-product-id="'+actual_JSON[i].productId+'">\
                                            <svg class="ic ic_cart">\
                                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart"></use>\
                                            </svg>\
                                            <span class="ng-binding">В корзину</span>\
                                            </span>\
                                            </div>\
                                            </div>\
                                    </div>';
            $('#products_section').append(template_item);
        }
    });
});