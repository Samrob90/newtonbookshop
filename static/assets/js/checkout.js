$(document).ready(function () {
    const csftoken = Cookies.get('csrftoken');
    const url = "/checkout/"
    let addressid = 0,
        shippingcost = 0;
    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!(/^http:.*/.test(settings.url))) {
                xhr.setRequestHeader("X-CSRFToken", csftoken)
            }
        }
    })
    // if user account section is displayed (if user is authenticated)
    if ($(".fetch_address").css("display") == "none") {

        // pass
    } else {
        // get selected user address id if address changed 
        $(".form-check input").click(function () {
            addressid = $(this).val()
            $(".select_address_error").addClass("d-none")
            shippinCost(addressid)

        })
        let TotalSum = Number($("#subtotal").attr("subtotal")) + Number($("#shipping_fee").html())
        $("#Total").html(TotalSum.toFixed(1))

    }

    // apply coupon
    $("#apply_coupon").click(function (e) {
        e.preventDefault();
        // get coupon value 
        const coupon = $("#coupon_code1").val()
        // check if address is filed or selected 
        let address = $(".fetch_address input[name='addressid']:checked").val()
        alert(address)
        if (typeof address === "undefined" && $("#billing_country").css("display") === "None") {
            // display error incase it was hidden 
            $(".select_address_error").removeClass("d-none")
            $("body").scrollTop(0); //scroll page back to top 
            $(".select_address_error").html("Please select address to preceed !")
        } else if (typeof address === "undefined" && $("#billing_country").val() === "") {
            $(".country_error").removeClass("d-none")
            $(".country_error").html("Please select country")
        } else {
            let this_ = $(this)
            this_.css("opacity", "0.5")
            this_.val("proccessing..")
            if (coupon === "" || coupon.length === 0 || !coupon.replace(/\s/g, '').length) {
                $("#coupon_code1").css("border", "1px solid red")
                $("#coupon_error").html("Invalide input!")
                this_.css("opacity", "1")
                this_.val("Apply coupon")

            } else {
                const coupon_data = {
                    "coupon_code_check": 0,
                    "coupon": coupon,
                    "total": Number($("#Total").html())
                }
                $.post(url, coupon_data,
                    function (data) {
                        this_.css("opacity", "1")
                        this_.val("Apply coupon")
                        if (data.result === "valid") {
                            // let total = $("#Total").html()
                            $(".discount").addClass("d-none")
                            $(".applied_coupon").removeClass("d-none")
                            $("#discount__").html(data.discount)
                            $(".getdiscount").attr("discount", data.percentage)
                            $("#Total").html(data.total.toFixed(1))
                        }
                    },
                    "json"
                ).fail(function (error) {
                    alert(error.responseJSON)
                });
            }
        }
    });


    // add new new shipping address
    $(".new_address").click(function (e) {
        e.preventDefault();
        $(".select_address_section").hide()
        $(".new_address").addClass("d-none")
        $(".select_user_address").removeClass("d-none")
        $(".add_address_section").removeClass("d-none")
        $(".fetch_address input[name='addressid']:checked").removeAttr("checked")
    });

    // switch back to select address
    $(".select_user_address").click(function (e) {
        e.preventDefault();
        $(".select_address_section").show() // dislay user address
        $(".new_address").removeClass("d-none") // show button to add new address
        $(".select_user_address").addClass("d-none") // hide button add new address 
        $(".add_address_section").addClass("d-none") // hide new address form
        $("#billing_country").val(" ") // set address country val to empty 

    });


    // if country value changes
    $("#billing_country").change(function (e) {
        e.preventDefault();
        $(".country_error").addClass("d-none") // hide country error 
        const country = $(this).val() // get country value to calculate shipping fee
        const city = $("#billing_city").val() // get city value to calculate shipping fee
        let shippingFee = 0 // declare empty shipping fee 
        // check if country and cirty are not empty 
        if (country !== "") {

            if (country === "GH") {
                if (city === "") {
                    // delivery fee for Ghana varies in two diffenrece city
                    // if user click apply button before filling city field
                    // show error 
                    // then when user filled city input get value and process shipping cost 
                    $(".city_error").removeClass("d-none")
                    $(".city_error").html("This field can't not be empty")
                    $("#billing_city").focusout(function (e) {
                        shippingFee = delivery_fee_in_ghana($(this).val())
                        $(".city_error").addClass("d-none")
                        // ?
                        set_totals(shippingFee)
                    });
                } else {
                    shippingFee = delivery_fee_in_ghana(city)
                }

            } else {
                shippingFee = 455
            }

            set_totals(shippingFee)
        }




    });


    function delivery_fee_in_ghana(city) {
        if (city.toLowerCase() === "tema") {
            fees = 50
        } else if (city.toLowerCase() === "accra") {
            fees = 35
        } else {
            fees = 60
        }
        return fees
    }


    function set_totals(shippincost) {
        let subtotal = $("#subtotal").attr("subtotal")
        let percentage = $(".getdiscount").attr("discount")
        // alert(discount)
        let fees = shippincost
        if (Number(subtotal) >= 300) {
            fees = 0
        }

        let SubtotalSum = Number(subtotal) + Number(fees)
        let total = SubtotalSum
        if (percentage !== "") {
            let discount = (Number(SubtotalSum) * Number(percentage)) / 100
            total = Number(SubtotalSum) - Number(discount)
            $("#discount__").html(discount)
        }

        $("#shipping_fee").html(fees.toFixed(1))
        $("#subtotal").html(SubtotalSum.toFixed(1))
        $("#Total").html(total.toFixed(1))

    }


    // calculate shippinCost 
    function shippinCost(addressid) {
        let data = {
            "addressid": addressid,
            "calculate_shipping_cost": 0
        }
        $.post(url, data,
            function (data, textStatus, jqXHR) {
                set_totals(data.result)
            },
            "Json"
        );
    }


    $("#pay_cash").click(function (e) {
        e.preventDefault()
        $("#pay_momo").find(".card-body").removeClass("select_payment_active")
        $(".selected_icone_pay_momo").addClass("d-none")
        $(this).find(".card-body").addClass("select_payment_active");
        $(".selected_icone_pay_cash").removeClass("d-none")
        $("#payment_method").attr("value", "pay_with_cash_on_delivery")
    })
    $("#pay_momo").click(function (e) {
        e.preventDefault();
        $("#pay_cash").find(".card-body").removeClass("select_payment_active")
        $(".selected_icone_pay_momo").removeClass("d-none")
        $(this).find(".card-body").addClass("select_payment_active");
        $(".selected_icone_pay_cash").addClass("d-none")
        $("#payment_method").attr("value", "pay_with_momo")

    });




});