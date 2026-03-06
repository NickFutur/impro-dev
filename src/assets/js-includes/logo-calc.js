document.querySelector("#logo-upl").addEventListener("change", function () {
        if (this.files[0]) {
        var fr = new FileReader();
    
        fr.addEventListener("load", function () {
            document.querySelector('.self-design__form-logo__upload').style.display = "none";
            document.querySelector("#logo-prev").style.backgroundImage = "url(" + fr.result + ")";
        }, false);
    
        fr.readAsDataURL(this.files[0]);
        }
    });

    $(".form-ui__holder--p").slider({
        range: "min",
        value: 10,
        min: 5,
        max: 30,
        step: 1,
        animate:true,
        slide: function( event, ui ) {
            $('#p-val').html(ui.value + ' мкм');
            $('#p-input').val(ui.value);
        },
        stop: function( event, ui ) {}
    });
    $(".form-ui__holder--cnt").slider({
        range: "min",
        value: 500,
        min: 100,
        max: 100000,
        step: 100,
        animate:true,
        slide: function( event, ui ) {
            $('#cnt-val').html(ui.value + ' шт.');
            $('#cnt-input').val(ui.value);
        },
        stop: function( event, ui ) {}
    });

