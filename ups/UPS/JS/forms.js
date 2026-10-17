/* Formular-Handling Responsive */

// PLZ
// PLUGINS
// DEFINITIONS
// Form Settings
// Display and hide elements
// FUNCTIONS
// Validation
// ACTION
// Text
// Select
// Checkboxen
// RB
// Specials
// _Bankdaten
// Abschicken
// General stuff
// Weiteres
// Desktop: alle input-Felder auf text
// ggf. Var. onload befüllen (FF Vorbefüllung)
// Ergebnis
// FINAL

var mydebug = 1;
function trace(c) {
    if (mydebug) {
        if (window.console && window.trace) {
            trace(c);
        }
    }
}

var laenderfeld = {
    uid20: "uid461",
    uid120: "uid1461",
    uid175: "uid461"
}

var plz_regex = /^([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{3}$/;

// PLZ
$("#uid20,#uid120,#uid175").bind("keyup blur", function (e) {
	targetDiv = $(this).parent();
	rightkey=false;
	if((e.keyCode > 47 && e.keyCode < 58) || (e.keyCode > 95 && e.keyCode < 106)) {
		rightkey=true;
	}
	if ((e.type == "keyup" && $(this).val().length == 5 && rightkey) || e.type == "blur") {
		// DE
		if (laenderfeld[$(this).attr("id")] != undefined) {
			customerland = $('#' + laenderfeld[$(this).attr("id")]);
		} else {
			customerland.length = 0;
		}
		if (customerland.length == 0 || (customerland.length == 1 && customerland.val() == "DE")) {
			// PLZ korrekte Syntax
			if (!plz_regex.test($(this).val())) {
				msgTxt = "Bitte geben Sie eine gültige Postleitzahl ein.";
				$.showError(targetDiv, msgTxt);
				formok = false;
			} else {
				// Ortsvorbelegung
				$.post("/ajax/hb_ajax_ort.php", {
					plz: $(this).val()
				}).done(function (data) {
					targetDiv.next().find("input").focus();
					targetDiv.next().find("input").val(data);
					if (data != "-") {
						$.showSuccess(targetDiv);
						$.showSuccess(targetDiv.next());
					} else { // PLZ nicht in Geo DB gefunden
						msgTxt = "Diese PLZ existiert nicht.";
						$.showError(targetDiv, msgTxt);
						formok = false;
					}
				});
			}
		}
		// Ausland
		else {
			summe_regex = /^\s*(\+|-)?\d+\s*$/;
			if (!summe_regex.test($(this).val())) {
				msgTxt = "Bitte geben Sie eine für Ihren Wohnsitz gültige Postleitzahl ein.";
				$.showError(targetDiv, msgTxt);
				formok = false;
			} else {
				$.showSuccess(targetDiv);
				$.showSuccess(targetDiv.next());
			}
		}
	}
});

// PLUGINS

if ($('input[type=checkbox]').length > 0 && $.fn.checkator !== undefined) {
    $('input[type=checkbox]').checkator();
}

// DEFINITIONS

var zindex = 100;

var formok = true;

var ajax_load = "";
var loadBankUrl = "/ajax/hb_ajax_blzkto.php";
var loadBICUrl = "/ajax/hb_ajax_bic.php";
var loadSofortUrl = "/ajax/hb_ajax_gc_sofortueberweisung.php";
var loadZusendenUrl = "/ajax/hb_ajax_gc_zusenden.php";
var loadAusdruckenUrl = "/ajax/hb_ajax_gc_ausdrucken.php";
var loadVideoUrl = "/ajax/hb_ajax_gc_videolegi.php";
var loadCheck24Url = "/ajax/hb_ajax_gc_check24.php";
var loadSovendusUrl = "/ajax/hb_ajax_gc_sovendus.php";
var loadNectUrl = "/ajax/hb_ajax_gc_nect.php";
var loadNect2Url = "/ajax/hb_ajax_gc_nect2.php";
var loadLPGeburtstag = "/ajax/hb_ajax_lp_gebdatum.php";

var multiTouch = new Array();

var rBs = new Array();
var rBCount = 0;

var currentDate = new Date();
var tstamp_h = currentDate.getTime();
var year_h = currentDate.getFullYear();

var DEFirstDay = "";
var jobFirstDay = "";
var locationDay = "";
var wohnhaftSeitDay = "";
var birthday = "";
var birthday_15 = "";

var kontoinhaber = new Array(2);

var errtxt = {
    uid10: "Bitte geben Sie Ihre TchiboCard Kartennummer an. Diese finden Sie auf Ihrer TchiboCard.",
    uid14: "Bitte wählen Sie eine Anrede.",
    uid15: "Bitte geben Sie ALLE Vornamen laut Personalausweis ein.",
    uid16: "Bitte geben Sie Ihren Nachnamen ein.",
    uid17: "Bitte geben Sie Ihren Geburtsnamen ein.",
    uid32: "Bitte geben Sie Ihren Geburtsort ein.",
    uid33: "Bitte geben Sie Ihren Familienstand an.",
    uid34: "Bitte geben Sie die Anzahl der in Ihrem Haushalt lebenden Kinder an.",
    uid18: "Bitte geben Sie Ihre Straße an.",
    uid19: "Bitte geben Sie Ihre Hausnummer an.",
    uid20: "Bitte geben Sie Ihre Postleitzahl an.",
    uid21: "Bitte geben Sie einen gültigen Ort an.",
    uid24: "Bitte geben Sie Ihre Telefonnummer ein.",
    uid25: "Bitte geben Sie eine gültige Telefonnummer ein.",
    uid27: "Bitte geben Sie eine gültige E-Mail-Adresse an.",
    uid35: "Bitte geben Sie Ihre Staatsangehörigkeit an.",
    uid44: "Bitte geben Sie die Branche an, in der Sie arbeiten.",
    uid51: "Bitte geben Sie an, seit wann Sie dort arbeiten.",
    uid37: "Bitte wählen Sie die Art der Beschäftigung.",
    uid93: "Bitte geben Sie an, bis wann Ihre Arbeit befristet ist.",
    uid54: "Bitte geben Sie den Namen des Arbeitgebers an.",
    uid55: "Bitte geben Sie den Ort Ihres Arbeitgebers an.",
    uid945: "Bitte geben Sie an, seit wann Sie selbstständig sind.",
    uid950: "Bitte geben Sie an, seit wann Sie beschäftigt sind.",
    uid939: "Bitte geben Sie an, seit wann Sie sich in Deutschland aufhalten.",
    uid993: "Bitte geben Sie an, bis wann Ihr Beschäftigungsverhältnis befristet ist.",
    uid987: "Bitte geben Sie an, bis wann Ihre Aufenthaltserlaubnis befristet ist.",
    uid983: "Bitte geben Sie an, bis wann Ihre Arbeitserlaubnis befristet ist.",
    uid990: "Bitte geben Sie Ihr voraussichtliches Ausbildungsende an.",
    uid26: "Bitte geben Sie Ihr monatliches Nettoeinkommen an.",
    uid63: "Bitte geben Sie Ihre monatliche Warmmiete an.",
    uid64: "Bitte geben Sie Ihre monatliche Hypothek an.",
    uid65: "Bitte geben Sie Ihre monatlichen Einnahmen an.",
    uid66: "Bitte geben Sie Ihre monatlichen Ausgaben an.",
    uid69: "Bitte geben Sie Ihre Kontonummer an.",
    uid70: "Bitte geben Sie Ihre Bankleitzahl an.",
    uid68: "Bitte geben Sie Ihren Banknamen an.",
    uid71: "Bitte geben Sie den Kontoinhaber an.",
    uid81: "Bitte bestätigen Sie die Datenübermittlung.",
    uid82: "Bitte bestätigen Sie den Erhalt der Vertragsdokumente sowie die Kenntnisnahme der Erstinformation.",
    uid82a: "Bitte bestätigen Sie den Erhalt der Vertragsdokumente.",
    uid83: "Bitte bestätigen Sie zunächst den Erhalt der Erstinformation, um eine Berechnung durchführen zu können.",
    uid83a: "Bitte laden Sie die Erstinformation herunter.",
    uid207: "Bitte bestätigen Sie die Kenntnisnahme der AGB.",
    uid78: "Bitte geben Sie an, seit wann Sie dort wohnen.",
    uid114: "Bitte wählen Sie eine Anrede.",
    uid173: "Bitte geben Sie Ihre Straße an.",
    uid174: "Bitte geben Sie Ihre Hausnummer an.",
    uid175: "Bitte geben Sie Ihre Postleitzahl an.",
    uid176: "Bitte geben Sie Ihren Wohnort an.",
    uid300: "Bitte bestätigen.",
    uid324: "Bitte geben Sie eine Festnetz-Nummer ein.",
    uid927: "Die E-Mail-Adresse stimmt nicht mit Ihrer vorherigen Eingabe überein.",
    uid1927: "Die E-Mail-Adresse stimmt nicht mit Ihrer vorherigen Eingabe überein.",
    uid929: "Bitte geben Sie ein Datum im Format TT.MM.JJJJ ein (z.B. 01.01.1990).",
    uid979: "Bitte geben Sie ein gültiges Datum im Format TT.MM.JJJJ ein."
};

var textbits1 = new Array();
textbits1[0] = "ich willige";
textbits1[1] = " meine w";
textbits1[2] = " meine A";
textbits1[3] = " meinen ";
textbits1[4] = "meiner Person";
textbits1[5] = "willige ich";
textbits1[6] = "chtige";
textbits1[7] = "kann ich";
textbits1[8] = "finde ich";
textbits1[9] = ", ich w";
textbits1[10] = "ich gespeichert oder ausgedruckt und zur Kenntnis genommen habe";
textbits1[11] = "Ich verzichte";
textbits1[12] = ", ich m";
textbits1[13] = "chte d";
textbits1[14] = "nsche ";
textbits1[15] = "verzichte ";

var textbits2 = new Array();
textbits2[0] = "wir willigen";
textbits2[1] = " unsere w";
textbits2[2] = " unsere A";
textbits2[3] = " unseren ";
textbits2[4] = "unseren Personen";
textbits2[5] = "willigen wir";
textbits2[6] = "chtigen";
textbits2[7] = "k&ouml;nnen wir";
textbits2[8] = "finden wir";
textbits2[9] = ", wir w";
textbits2[10] = "wir gespeichert oder ausgedruckt und zur Kenntnis genommen haben";
textbits2[11] = "Wir verzichten";
textbits2[12] = ", wir m";
textbits2[13] = "chten d";
textbits2[14] = "nschen ";
textbits2[15] = "verzichten ";

var produktTxt = "";
if ($("body").hasClass("genial")) {
    produktTxt = "GenialCard";
} else if ($("body").hasClass("gold")) {
    produktTxt = "GoldCard";
}

var webidWartung=false;

// Form Settings

var debug=false;

var is_iPad =  navigator.userAgent.match(/iPad/i) != null; 
var is_iPhone =  navigator.userAgent.match(/iPhone/i) != null; 
var is_Android =  navigator.userAgent.match(/Android/i) != null; 

var checkpastestd, checkpasteiban;

$(document).ready(function () {

	if(is_iPad || is_iPhone||is_Android) {
		$("body").addClass("mobile"); 
		if(is_iPad) {
			$("input[name=device]").val("tablet"); 
		}
		else {
			$("input[name=device]").val("mobile"); 
		}
	}
	else {
		$("body").removeClass("mobile"); 
		$("input[name=device]").val("desktop"); 
	}
	
    $(window).on('resize', function (e) {
        $.setModTxtHeight();
        $.setModImgHeight();
        $.equalheight();
    });

    // Vorbefüllung SpbDyn.
    if ($("body").hasClass("sparbriefdynamik") && $("body").hasClass("antrag")) {
        $("#uid208").val(kondi[1]);
        $("#uid209").val(kondi[2]);
        $("#uid210").val(kondi[3]);
        $("#uid211").val(kondi[4]);
        $("#uid212").val(kondi[5]);
        $("#uid213").val(kondi[6]);
    } else if ($("body").hasClass("sparbrief") && $("body").hasClass("antrag")) {
       // $("#uid10").val(kondi[1]);
    }

    $(".form-group input[type=text], .form-group input[type=tel], .form-group input[type=number]").each(function () {
		var mylabel=$(this).closest(".form-group").find("label");
        if (mylabel.text().indexOf("optional") != -1 || mylabel.text().indexOf("abweichend") != -1) {
            $(this).addClass("optional");
        }
    });
    $(".form-group input[type=radio]:visible").each(function () {
        if ($(this).prop("checked")) {
            $(this).click();
        }
    });

    $.checkButtons();

    if ($("#uid240").length > 0) {
        setTimeout('$("#uid240").click();', 500);
    }

    // ED-Aktion
    if ($("form[name=edaktion]").length > 0) {
        minbetrag = 5000;
        minbetrag_txt = "5.000";
        maxsue = 60000;
    }

    if ($("form#ueberweisung input[name=kreditrahmen]").length > 0) {
        maxsue = $("form#ueberweisung input[name=kreditrahmen]").val();
        maxsue = Math.floor(maxsue.replace('.', ''));
    }

    $("input[name=betrag]").click(function () {
        if ($(this).val().indexOf("–") != -1) {
            $(this).val("");
        }
    });

    // FT

    if ($("body").hasClass("kredit") && !$("body").hasClass("zugang")) {
        // _Text changes
        var myfile = window.location.pathname;
        if (myfile.indexOf("gold") != -1) {
            newtel = "040 600 096 458";
            newtelrel = "tel:+4940600096458";
        } else {
            newtel = "040 600 096 422";
            newtelrel = "tel:+4940600096422";
        }
        var newemail = "info@hanseaticbank.de";

        $("#footer-contact__item-phone .footer-contact__headline > a").text(newtel);
        $("#footer-contact__item-phone .footer-contact__headline > a").attr("href", newtelrel);

        $("#footer-contact__item-email .footer-contact__headline > a").attr("href", "mailto:" + newemail);
        $("#footer-contact__item-email .footer-contact__headline > a").attr("title", "");
        $("#footer-contact__item-email .footer-contact__headline > a").text(newemail);

        // Module adaptation
        setTimeout("$.setModTxtHeight();", 800);
        $.setModImgHeight();
    }

    // Checkboxen empty space bar triggers click
    $(".checkator_element").keyup(function (e) {
        e.preventDefault();
        if (e.keyCode === 32) {
            $(this).click();
        }
    });

    // Prevent Form Submit by Enter
    $('form input, form select, button[type=submit]').on('keypress', function (e) {
        if (e.keyCode == 13 || e.keyCode == 169) {
            e.preventDefault();
            return false;
        }
    });
    jumpTop();

    // FT
    if (!$("#uid994") != undefined) {
        if ($("#uid994").prop("checked")) {
            $("#uid994").prop("checked", false);
        }
    }

    $.equalheight();

    // Progress Bar (gelb/rot)
    if ($("#digitalinfos").length == 0) {
        $(".mainWrap.result .progress > .progress-bar.ergebnis ").removeClass("open").addClass("done");
    }

    // Sovendus
    if (typeof sovendus !== 'undefined') {
        if (sovendus) {
            $.ajax({
                type: "POST",
                url: loadSovendusUrl,
                data: "token=" + token,
                success: function (data) {
                    //console.log(data);
                }
            });
        }
    }
	
	// Desktop: alle input-Felder auf text
	$("input[type=number],input[type=tel],input[type=email]").each(function () {
		if (!$("body").hasClass("mobile")) {
			$(this).prop("type", "text");
		}
	});

	// Mobile: alle date-Felder auf tel
	$("input[type=text].date").each(function () {
		if ($("body").hasClass("mobile")) {
			$(this).prop("type", "tel");
		}
		else {
			// Chrome
			if ($(this).val() == "") {
				if($(this).hasClass("month")) {
					$(this).val("MM.JJJJ");
				}
				else {
					$(this).val("TT.MM.JJJJ");
				}
			}
		}
	});

	// reset onload
	$("select#uid232").prop('selectedIndex', 0);

	$("#formdiv_uid203").hide();

	// Kundennummer

	var fieldActivity = false;

	// ggf. Var. onload befüllen (FF Vorbefüllung)
	if ($("form#bankdaten").length > 0) {
		if ($("#uid929").val() != "" && $("#uid929").val().indexOf(".") != -1) {
			mydate_data = $("#uid929").val().split(".");
			birthday = $.createDate(mydate_data[2], mydate_data[1], mydate_data[0]);
			birthday_15 = $.createDate(15 + parseInt(mydate_data[2]), mydate_data[1], mydate_data[0]);
		}
		if ($("#uid939").val() != "" && $("#uid939").val().indexOf(".") != -1) {
			mydate_data = $("#uid939").val().split(".");
			DEFirstDay = $.createDate(mydate_data[2], mydate_data[1], mydate_data[0]);
		}
		if ($("#uid950").val() != "" && $("#uid950").val().indexOf(".") != -1) {
			mydate_data = $("#uid950").val().split(".");
			jobFirstDay = $.createDate(mydate_data[2], mydate_data[1], mydate_data[0]);
		}
		if ($("#uid979").val() != "" && $("#uid979").val().indexOf(".") != -1) {
			mydate_data = $("#uid979").val().split(".");
			wohnhaftSeitDay = $.createDate(mydate_data[2], mydate_data[1], mydate_data[0]);
		}
	}

	// Ein- / Ausblendungen

	$(".dropdown select").each(function () {
		selindex = $(this).prop("selectedIndex");
		if (selindex != 0 && $(this).val() != "DE") {
			$(this).blur();
		}
	});

	$("input[type=radio]").each(function () {
		if ($(this).prop("checked")) {
			$(this).closest("label.btn1").addClass("active");
		} else {
			$(this).closest("label.btn1").removeClass("active");
		}
	});

	if($("body").hasClass("video")) {
        tc_vars.page_name = "Step5_Danke-Seite_Videoident";
        tC.container.reload({
            events: {
                pageview: [{}, {}
                ]
            }
        });
    }
	
	// IBAN Passivprodukte
	if($("button#step2").length==0) {
		$.startIBANListener();
	}
	
	if($("map").length>0){
		$("map").imageMapResize();
	}

	// Temp. Removal
	if($("#trustpilot").length>0){
		$("#trustpilot").remove();
	}
	
	if(webidWartung && $(".mainwrap.row.result") && $("#uid300") && !$("#videoident").hasClass("deactivated")) {
		var cbtext = "Derzeit kann es pandemiebedingt bei der Video-Identifikation zu längeren Wartezeiten kommen. Sie können sich alternativ über das Postident-Verfahren identifizieren lassen.";
		$("#uid300").closest(".checkbox.form-group").after("<div class='alert_checkbox'>" + cbtext + "</div>");
	}
	
	/* $g_settings="";

	if($gdprConsent) {
		$g_settings="ad_storage: 'granted', analytics_storage: 'granted'";
	}
	else {
		$g_settings="ad_storage: 'denied', ads_data_redaction: 'true'";
	}
		
	var timeout_gtag;function update_gtag(){if ('undefined' != typeof gtag) {clearTimeout(timeout_gtag);gtag('consent','default',{ ".$g_settings."});}else{timeout_gtag=window.setTimeout(update_gtag,100);}}update_gtag(); */
	
});

// Buttons mehrzeilig
jQuery.checkButtons = function () {
    $(".form-group.btn-group").each(function () {
        l1h = $(this).find(".btn-primary:eq(0)").height();
        l2h = $(this).find(".btn-primary:eq(1)").height();
        if (l1h != l2h) {
            l1h > l2h ? $(this).find(".btn-primary:eq(1)").addClass("expandedHeight") : $(this).find(".btn-primary:eq(0)").addClass("expandedHeight");
        }
    });
};

// Display and hide elements

jQuery.check2Jahre = function (j) {
    if (j == "0") {
        // kürzer
        $("div.form-group.w2Jahre, h5.w2Jahre").each(function () {
			if ($(this).hasClass("inlineElem") || $(this).hasClass("btn-group")) {
				$(this).css("display", "flex");
			} else {
				$(this).css("display", "block");
			}
        });
		$("div.form-group.combined.w2Jahre:last").css("borderBottom","1px #5A0035 dashed");
		$("div.form-group.combined.w2Jahre:last").css("paddingBottom","1.5em");
        //$("#uid173").focus();
    } else {
        // länger
        $("label,div.form-group,h5").each(function () {
            if ($(this).hasClass("w2Jahre")) {
                $(this).hide();
                $(this).children("input").val("");
                $.resetValidation($(this));
            }
        });
		$("div.form-group.combined.w2Jahre:last").css("borderBottom","0");
		$("div.form-group.combined.w2Jahre:last").css("paddingBottom","0");
		if(!$("#uid22_1").parent().hasClass("active")) {
			$("#uid22_1").parent().addClass("active");
			$("#uid22_2").parent().removeClass("active");
			$("#uid22_1").prop("checked",true);
			$("#uid22_2").prop("checked",false);
		}
    }
};

jQuery.checkWohn = function (c) {
    //trace(c);
    // Mieter
    if (c == "3") {
        $("#formdiv_uid63").show();
        $("#formdiv_uid64").hide();
        $.resetValidation($("#formdiv_uid63"));
    }
    // Eigentümer
    else if (c == "1") {
        $("#formdiv_uid64").show();
        $("#formdiv_uid63").hide();
        $.resetValidation($("#formdiv_uid64"));
    }
};

jQuery.checkAusland = function (c) {
    var euCodes = ['BE', 'DK', 'DE', 'FI', 'FR', 'GR', 'IE', 'IS', 'IT', 'LI', 'LU', 'NL', 'NO', 'AT', 'PT', 'SE', 'ES', 'GB', 'EE', 'LV', 'LT', 'MT', 'PL', 'CH', 'SK', 'SI', 'CZ', 'HU', 'CY', 'BG', 'RO', 'HR'];
    if ($.inArray(c, euCodes) == -1) {
        $("label,div.form-group").each(function () {
            if ($(this).hasClass("ausland")) {
                if ($(this).hasClass("inlineElem") || $(this).hasClass("btn-group")) {
                    $(this).css("display", "flex");
                } else {
                    $(this).css("display", "block");
                }
            }
            if ($("#uid42_1").prop("checked")) {
                if ($(this).hasClass("befristetArbeit")) {
                    if ($(this).hasClass("inlineElem")) {
                        $(this).css("display", "flex");
                    } else {
                        $(this).css("display", "block");
                    }
                }
            }
            if ($("#uid43_1").prop("checked")) {
                if ($(this).hasClass("befristetAufhalt")) {
                    if ($(this).hasClass("inlineElem")) {
                        $(this).css("display", "flex");
                    } else {
                        $(this).css("display", "block");
                    }
                }
            }
        });
    } else {
        $("label,div.form-group").each(function () {
            if ($(this).hasClass("ausland") || $(this).hasClass("befristetArbeit") || $(this).hasClass("befristetAufhalt")) {
                $(this).hide();
                $.resetValidation($(this));
            }
        });
    }
};

jQuery.checkBeruf = function (b) {
    if (b == "1" || b == "2" || b == "3" || b == "8") {
        $("label,div.form-group").each(function () {
            if ($(this).hasClass("angestellt") && !$(this).hasClass("befristetArt")) {
                if ($(this).hasClass("inlineElem") || $(this).hasClass("btn-group")) {
                    $(this).css("display", "flex");
                } else {
                    $(this).css("display", "block");
                }
            }
            if (!$(this).hasClass("angestellt") && ($(this).hasClass("selbststaendig") || $(this).hasClass("azubi"))) {
               $(this).hide();
                $(this).find("input[type=text],input[type=tel]").empty();
                $.resetValidation($(this));
            }
			if($("#uid57_1").prop("checked") && $(".befristetArt.angestellt").is(":hidden")) {
				$(".befristetArt.angestellt").show();
			}
        });
    } else if (b == "4") {
        $("label,div.form-group").each(function () {
            if ($(this).hasClass("azubi")) {
                if ($(this).hasClass("inlineElem") || $(this).hasClass("btn-group")) {
                    $(this).css("display", "flex");
                } else {
                    $(this).css("display", "block");
                }
            }
            if (!$(this).hasClass("azubi") && ($(this).hasClass("angestellt") || $(this).hasClass("selbststaendig"))) {
                $(this).hide();
                $(this).find("input[type=text],input[type=tel]").empty();
                $(this).find("input[type=text],input[type=tel]").removeClass("errorField");
            }
        });
        $("#uid57_1").click();
    } else if (b == "9" || b == "10" || b == "11" || b == "12" || b == "13") {
        $("label,div.form-group").each(function () {
            if ($(this).hasClass("selbststaendig")) {
                if ($(this).hasClass("inlineElem") || $(this).hasClass("btn-group")) {
                    $(this).css("display", "flex");
                } else {
                    $(this).css("display", "block");
                }
            }
            if (!$(this).hasClass("selbststaendig") && ($(this).hasClass("angestellt") || $(this).hasClass("azubi"))) {
                $(this).hide();
                $(this).find("input[type=text],input[type=tel]").empty();
                $(this).find("input[type=text],input[type=tel]").removeClass("errorField");
            }
        });
        $("#uid57_0").prop("checked", false);
    } else {
        $("label,div.form-group").each(function () {
            if ($(this).hasClass("angestellt") || $(this).hasClass("selbststaendig") || $(this).hasClass("azubi")) {
                $(this).hide();
                $(this).find("input[type=text],input[type=tel]").empty();
                $(this).find("input[type=text],input[type=tel]").removeClass("errorField");
            }
        });
    }
};

jQuery.checkBefristetArbeit = function (bef) {
    if (bef == "1") {
        $("label,div.form-group").each(function () {
            if ($(this).hasClass("befristetArbeit")) {
                if ($(this).hasClass("inlineElem") || $(this).hasClass("btn-group")) {
                    $(this).css("display", "flex");
                } else {
                    $(this).css("display", "block");
                }
            }
        });
    } else {
        $("label,div.form-group").each(function () {
            if ($(this).hasClass("befristetArbeit")) {
                $(this).hide();
                $(this).find("input[type=text],input[type=tel]").empty();
                $(this).find("input[type=text],input[type=tel]").removeClass("errorField");
            }
        });
        if ($("#uid43_1").prop("checked")) {
            msgTxt = "Befristete Aufenthaltserlaubnis kann bei unbefristeter Arbeitserlaubnis nicht vorliegen.";
            $.showError(targetDiv, msgTxt);
            rgok = false;
        }
    }
};

jQuery.checkBefristetAufhalt = function (bef) {
    rgok = true;
    targetDivId = "formdiv_uid43";
    targetDiv = $("#" + targetDivId);
    if (bef == "1") {
        //trace("Aufenthalt befr.");
        // befr. Aufenthaltserl. nicht bei unbefristeter Arbeitserl.
        if ($("#uid42_1").prop("checked")) {
            //trace("Arbeitserlaubnis unbef.");
            msgTxt = "Befristete Aufenthaltserlaubnis kann bei unbefristeter Arbeitserlaubnis nicht vorliegen.";
            $.showError(targetDiv, msgTxt);
            rgok = false;
        } else {
            //trace("Arbeitserlaubnis bef.");
            $("label,div.form-group").each(function () {
                if ($(this).hasClass("befristetAufhalt") && !$(this).attr("id") != "formdiv_uid61") {
                    if ($(this).hasClass("inlineElem") || $(this).hasClass("btn-group")) {
                        $(this).css("display", "flex");
                    } else {
                        $(this).css("display", "block");
                    }
                }
            });
            rgok = true;
        }
    } else {
        $("label,div.form-group").each(function () {
            if ($(this).hasClass("befristetAufhalt")) {
                $(this).hide();
                $.resetValidation(targetDiv);
            }
        });
        rgok = true;
    }
    return rgok;
};

jQuery.checkBefristetArt = function (bef) {
    if (bef == "1") {
        b = $("#uid37")[0].selectedIndex;
        $("div.form-group, img.icon_info").each(function () {
            if (b == "1" || b == "2" || b == "3" || b == "8") {
                if ($(this).hasClass("angestellt") && $(this).hasClass("befristetArt")) {
                    $(this).show();
                }
            } else if (b == "4") {
                if ($(this).hasClass("azubi") && $(this).hasClass("befristetArt")) {
                    if ($(this).hasClass("inlineElem") || $(this).hasClass("btn-group")) {
                        $(this).css("display", "flex");
                    } else {
                        $(this).css("display", "block");
                    }
                }
            }
        });
    } else {
        $("label,div.form-group, img.icon_info").each(function () {
            if ($(this).hasClass("befristetArt")) {
                $(this).hide();
                $(this).find("input[type=text],input[type=tel]").empty();
                $(this).find("input[type=text],input[type=tel]").removeClass("errorField");
            }
        });
    }
};

jQuery.setModTxtHeight = function () {
    if ($("body").hasClass("kredit")) {
        if (window.matchMedia('(max-width: 43.74rem)').matches) {
            txtH = 0;
            $(".module .txt > div").each(function () {
                txtH += $(this).height();
            });
            //txtH-=37;
            $(".module .txt").height(txtH);
            $(".module .img").height("37.64vw");
        } else {
            $(".module .txt").height("");
        }
    }
}

jQuery.setModImgHeight = function () {
    if ($("body").hasClass("kredit")) {
        if (window.matchMedia('(min-width: 43.75rem)').matches) {
            myh = $(".module .txt").outerHeight() + 1;
            $(".module .img").height(myh);
        } else {
            $(".module .img").height("37.64vw");
        }
    }
}

jQuery.videoerror = function () {
    $("#warten").hide();
    $("#digitalinfos").show();
	if($("#digitalinfos").hasClass("withnect")) {
		if($("#digitalinfos p.bodytext").text().indexOf("Leider")==-1) {
			$("#digitalinfos > div > form > div:eq(1)").remove();
			$("#digitalinfos > div > form > div:eq(0)").remove();
			$("#digitalinfos > div > form > div.form-group").css("textAlign","left");
			$("#digitalinfos > div > form > h5").remove();
			$("#digitalinfos > div > form > p").remove();
			$("#digitalinfos > div > form > div.form-group").prepend("<div><p class='bodytext'>Leider gab es einen technischen Fehler bei der Weiterleitung zu unserem Partner WebID. Bitte wählen Sie Ihr weiteres Vorgehen.</p></div>");
			$("#digitalinfos > div > form div.centeredBtn").prepend($("a#postident"));
			$("a#postident").css("marginRight","15px");
			$(".progress > .progress-bar.legitimation.done").removeClass("done").addClass("open");
		}
	}
	else {
		if($("#digitalinfos p.bodytext").text().indexOf("Leider")==-1) {
			$("#digitalinfos > div.videoinfo-popup").remove();
			$("#digitalinfos h3").remove();
			$("#digitalinfos > div.info-list").remove();
			$("#digitalinfos > form").remove();
			$("#digitalinfos > div.spacer").remove();
			$("#digitalinfos > div:eq(1)").find("h5").remove();
			$("#digitalinfos > div:eq(1)").find("p").remove();
			$("#digitalinfos > div.form-group").prepend("<div><p class='bodytext'>Leider gab es einen technischen Fehler bei der Weiterleitung zu unserem Partner WebID. Bitte wählen Sie Ihr weiteres Vorgehen.</p></div>");
			$("a#videoident").text("Videoident erneut versuchen");
			$("a#videoident").addClass("videoerror");
			$("div#videoidentWrapper").css("margin-bottom","0 !important");
		}
	}
}

// FUNCTIONS

// Validation
//$("#formdiv_uid10")

jQuery.reshowInfo = function (elem) {
	sfid = elem.attr("id");
	$.resetValidation(elem);
	elem.find(".input-group-btn").show();
	elem.find(".help-block.prevalidate").show();
}

jQuery.showSuccess = function (elem) {
    sfid = elem.attr("id");
    elem.find(".glyphicon").remove();
    elem.removeClass("has-error");
    elem.find(".glyphicon").css("cursor", "default");
    if (elem.find(".input-group").length > 0) {
        if (elem.find(".input-group-addon").length == 0) {
            elem.find(".input-group").addClass("bothEnds");
        } else {
            elem.find(".input-group").addClass("rightEnd");
        }
        elem.find(".input-group-btn").hide();
    } else {
        elem.find(".input-group").removeClass("bothEnds");
        elem.find(".input-group").removeClass("rightEnd");
    }
    if (elem.find(".glyphicon-ok").length == 0) {
       elem.append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
    }
    if (elem.parent().hasClass("combined")) {
        elem.parent().find("#err_" + sfid).remove();
        elem.parent().remove("div.inlineClearer");
        elem.removeClass("has-error");
    } else {
        elem.find(".help-block").not(".prevalidate").remove();
    }
    if (sfid == "formdiv_uid266") {
        if ($("#formdiv_uid266 label").height() > 20) {
            elem.find("span.glyphicon").addClass("twoLines");
        }
    }
    elem.addClass("has-success");
}

jQuery.showError = function (elem, errTxt) {
    ffid = elem.attr("id");
    elem.find(".glyphicon").remove();
    elem.removeClass("has-success");
    if (elem.find(".input-group-btn").length > 0) {
        if (elem.find(".input-group-addon").length == 0) {
            elem.find(".input-group").addClass("bothEnds");
        } else {
            elem.find(".input-group").addClass("rightEnd");
        }
        elem.find(".input-group-btn").hide();
    } else {
        elem.find(".input-group").removeClass("bothEnds");
        elem.find(".input-group").removeClass("rightEnd");
    }
    if (elem.find(".glyphicon-remove").length == 0 && elem.children(".btn").length == 0) {
        elem.append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
        if (!(elem.hasClass("dropdown"))) {
            elem.find(".glyphicon-remove").css("cursor", "pointer");
            elem.find(".glyphicon-remove").click(function () {
                elem.find(".form-control").val("");
            });
        }
    }
    if (elem.parent().hasClass("combined")) {
        if (elem.parent().find("p.help-block").length == 0) {
            elem.parent().append("<div class='inlineClearer'></div>");
        }
        if (elem.parent().find("p.help-block#err_" + ffid).length == 0) {
            elem.parent().append("<p class='help-block errMsg' id='err_" + ffid + "'>" + errTxt + "</p>");
        } else {
            $("p#err_" + ffid).text(errTxt);
        }
    } else if (elem.children("label.btn").length > 0) {
        if (elem.find("p.help-block").length == 0) {
            elem.append("<div class='inlineClearer'></div>");
        }
        if (elem.find("p.help-block").not(".prevalidate").length == 0) {
            elem.append("<p class='help-block'>" + errTxt + "</p>");
        }
    } else {
        if (elem.find("p.help-block").not(".prevalidate").length == 0) {
            elem.append("<p class='help-block'>" + errTxt + "</p>");
        } else {
            elem.find("p.help-block").not(".prevalidate").text(errTxt);
        }
    }
    if (ffid == "formdiv_uid266") {
        if ($("#formdiv_uid266 label").height() > 20) {
            elem.find("span.glyphicon").addClass("twoLines");
        }
    }
    elem.addClass("has-error");
}

jQuery.resetValidation = function (elem) {
    elem.find(".glyphicon").remove();
    elem.removeClass("has-success");
    elem.removeClass("has-error");
    elem.find(".inlineClearer").remove();
    elem.find(".help-block").not(".prevalidate").remove();
}

jQuery.checkSelbstaendig = function (m, b) {
    if (m == 1) {
        if (b == "13") {
            $("#formdiv_uid852").show();
        } else {
            $("#formdiv_uid852").hide();
        }
    } else if (m == 2) {
        if (b == "13") {
            $("#formdiv_uid1852").show();
        } else {
            $("#formdiv_uid1852").hide();
        }
    }
};

jQuery.startIBANListener=function() {
	if(document.getElementById('uid215')) {
		document.getElementById('uid215').addEventListener('input', function (e) {
		  var target = e.target, position = target.selectionEnd, length = target.value.length;
		  target.value = target.value.replace(/[^\dA-Za-z]/g, '').replace(/(.{4})/g, '$1 ').trim();
		  target.selectionEnd = position += ((target.value.charAt(position - 1) === ' ' && target.value.charAt(length - 1) === ' ' && length !== target.value.length) ? 1 : 0);
		});	
	}
	if(document.getElementById('uid455')) {
		document.getElementById('uid455').addEventListener('input', function (e) {
		  var target = e.target, position = target.selectionEnd, length = target.value.length;
		  target.value = target.value.replace(/[^\dA-Za-z]/g, '').replace(/(.{4})/g, '$1 ').trim();
		  target.selectionEnd = position += ((target.value.charAt(position - 1) === ' ' && target.value.charAt(length - 1) === ' ' && length !== target.value.length) ? 1 : 0);
		});
	}
};

// Data save
/*jQuery.saveFormEntry=function(mydata,mylink){
$.ajax({
type: "POST",
url: loadFormSaveURL,
data: mydata,
success: function(data) {
var pref="";
if(mylink!="") {
if(mylink.indexOf("http")==-1 && mylink!="/") {
pref="/";
}
window.location.href=pref+mylink;
}
}
});
};*/

// Further stuff
jQuery.createDate = function (year, month, day) {
    if (year != "" && month != "" & day != "") {
        mydate = new Date(year, month - 1, day);
    } else {
        mydate = "";
    }
    return mydate;
}

jQuery.checkLaufzeitSPB = function (l) {
    var mykondi = "";

    if (l == "2 Jahre") {
        mykondi = kondi[2];
    } else if (l == "3 Jahre") {
        mykondi = kondi[3];
    } else if (l == "4 Jahre") {
        mykondi = kondi[4];
    } else if (l == "5 Jahre") {
        mykondi = kondi[5];
    } else if (l == "6 Jahre") {
        mykondi = kondi[6];
    } else if (l == "1 Jahr") {
        mykondi = kondi[1];
    } else {
        mykondi = "";
    }
    $('input[name=\'f[kondition]\']').val(mykondi);

};

jQuery.checkTINLandDouble = function (section, selid, land) {
    TINLand = new Array();
    $("." + section + " .unit select:visible").not("#" + selid).each(function () {
        TINLand.push($(this).val());
    });
    if ($.inArray(land, TINLand) == -1) {
        return false;
    } else {
        return true;
    }
};

jQuery.ver_randomizer = function (strl) {
    var myid = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < strl; i++) {
        myid += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return myid;
}

jQuery.equalheight = function () {
    maxH = 0;
    $(".threeColsContent").each(function () {
        $(this).children("p:eq(0)").height("auto");
    });
    $(".threeColsContent").each(function () {
        if ($(this).children("p:eq(0)").height() > maxH) {
            maxH = $(this).children("p:eq(0)").height();
        }
    });
    $(".threeColsContent").each(function () {
        $(this).children("p:eq(0)").height(maxH);
    });
}

const customDataObject = new Object(); 

jQuery.antragFinal = function (d) {
    $("#sofortueberweisung").html(" ");
    $("h1").text("Vielen Dank! Die Kontoeröffnung ist fast geschafft!");
    $("h2").text("Sie erhalten in Kürze eine Bestätigungsmail an die angegebene E-Mail-Adresse.");
    $("#postidentinfos .pureText:eq(0)").text("Was noch zu tun ist:");
    $("ol.steps li:eq(0)").empty().html("<h4>Vertrag anfordern</h4><p style=\"margin-bottom: 0;\">&nbsp;</p>");
    $("ol.steps li:eq(0)").addClass("done");
    $("ol.steps li:eq(1)").addClass("active");
    $("ol.steps li:eq(2)").addClass("active");
    
	if($("#modeHint").length==0) {
		$("div#postidentinfos > div.techHint").after("<p id='modeHint' style='margin:0'>"+d+"</p>");
	}
	else {
		$("div#postidentinfos > #modeHint").html(d);
	}
    
    // Step 4
    $(".progress > .progress-bar.legitimation.open").removeClass("open").addClass("done");
    jumpTop();
	
    setTimeout('$("div#postidentinfos .adservercontent").show();',300);

	tC.event.bannerShow(this, customDataObject);
    
	// Tracking TC PostIdent.
    if (tc_vars.page_name != undefined) {
        tc_vars.page_name = "Step5_Danke-Seite_Postident";
        tc_vars.order_validation_type = "postident";
        tC.container.reload({
            events: {
                pageview: [{}, {}
                ]
            }
        });
    }

    // Trustpilot
    //setTimeout('$(".popupLayer#trustpilot").show();',3000);
}

jQuery.checkRSV = function () {
    if ($("fieldset.step2a").length > 0 && $("input[name=financeData_SIKA]").length>0) {
        var altersFlag = false;
        var berufsFlag = false;
        if ($("select#uid37").val() == 1 || $("select#uid37").val() == 2 || $("select#uid37").val() == 13) {
            berufsFlag = true;
        }
        var gebdatum = $("input#uid929").val();
        // unter 59
        var age = 59;
        yearDiff = year_h - age;
        max58Date = currentDate;
        max58Date.setFullYear(yearDiff);
        if (max58Date - birthday < 0) {
            altersFlag = true;
        }
        if (berufsFlag && altersFlag) {
            $("fieldset.step2a").show();
			if ($("#uid81_1").is(":checked")) {
				$(".rsv").show();
			}
        } else {
            $("fieldset.step2a").hide();
			$(".rsv").hide();
        }
		if(clickSubmit==0) {
			// DL Vertragsdokumente resetten
			$("#uid82").prop("checked",false);
		}
    }
}

/**
 * jQuery serializeObject
 * @copyright 2014, macek <paulmacek@gmail.com>
 * @link https://github.com/macek/jquery-serialize-object
 * @license BSD
 * @version 2.5.0
 */
!function (e, i) {
    if ("function" == typeof define && define.amd)
        define(["exports", "jquery"], function (e, r) {
            return i(e, r)
        });
    else if ("undefined" != typeof exports) {
        var r = require("jquery");
        i(exports, r)
    } else
        i(e, e.jQuery || e.Zepto || e.ender || e.$)
}
(this, function (e, i) {
    function r(e, r) {
        function n(e, i, r) {
            return e[i] = r,
            e
        }
        function a(e, i) {
            for (var r, a = e.match(t.key); void 0 !== (r = a.pop()); )
                if (t.push.test(r)) {
                    var u = s(e.replace(/\[\]$/, ""));
                    i = n([], u, i)
                } else
                    t.fixed.test(r) ? i = n([], r, i) : t.named.test(r) && (i = n({}, r, i));
            return i
        }
        function s(e) {
            return void 0 === h[e] && (h[e] = 0),
            h[e]++
        }
        function u(e) {
            switch (i('[name="' + e.name + '"]', r).attr("type")) {
            case "checkbox":
                return "on" === e.value ? !0 : e.value;
            default:
                return e.value
            }
        }
        function f(i) {
            if (!t.validate.test(i.name))
                return this;
            var r = a(i.name, u(i));
            return l = e.extend(!0, l, r),
            this
        }
        function d(i) {
            if (!e.isArray(i))
                throw new Error("formSerializer.addPairs expects an Array");
            for (var r = 0, t = i.length; t > r; r++)
                this.addPair(i[r]);
            return this
        }
        function o() {
            return l
        }
        function c() {
            return JSON.stringify(o())
        }
        var l = {},
        h = {};
        this.addPair = f,
        this.addPairs = d,
        this.serialize = o,
        this.serializeJSON = c
    }
    var t = {
        validate: /^[a-z_][a-z0-9_]*(?:\[(?:\d*|[a-z0-9_]+)\])*$/i,
        key: /[a-z0-9_]+|(?=\[\])/gi,
        push: /^$/,
        fixed: /^\d+$/,
        named: /^[a-z0-9_]+$/i
    };
    return r.patterns = t,
    r.serializeObject = function () {
        return new r(i, this).addPairs(this.serializeArray()).serialize()
    },
    r.serializeJSON = function () {
        return new r(i, this).addPairs(this.serializeArray()).serializeJSON()
    },
    "undefined" != typeof i.fn && (i.fn.serializeObject = r.serializeObject, i.fn.serializeJSON = r.serializeJSON),
    e.FormSerializer = r,
    r
});

// Scrolling
function scrollto(element) {
    $('html, body').animate({
        scrollTop: ($(element).offset().top)
    }, {
        duration: 250,
        easing: 'linear',
        queue: false
    });
};

// Jumping
function jumpto(element) {
    headerHeight = 0;
    if ($("header").length > 0) {
        headerHeight = $("header").height();
    }
    var h = $(element).offset().top - headerHeight;
    document.documentElement.scrollTop = document.body.scrollTop = h;
};

function jumpTop() {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
};

function checkFieldStd(myid) {
	var felem=$("#"+myid);
	clearTimeout(checkpastestd);
    fval = felem.val();
    numeric = false;
    msgTxt = "Bitte ausfüllen.";
    passBy = false;
    if (felem.hasClass("optional")) {
        passBy = true;
    }
    if (felem.hasClass("numeric")) {
        numeric = true;
        if (fval.indexOf(".") != -1) {
            //trace(fval.indexOf("."));
            num_data = fval.split(".");
            lastbit = num_data[num_data.length - 1];
            // Tausender gemeint
            if (lastbit.length == 3) {
                num_san = fval.replace(/\./g, "");
                felem.val(num_san);
                fval = num_san;
            }
        }
    }
    if (felem.closest(".form-group").hasClass("combined")) {
        targetDiv = felem.parent(".inlineElem");
    } else {
        targetDiv = felem.closest(".form-group");
    }
    targetDivId = targetDiv.attr("id");

	result = new Array(1, msgTxt);

	fval = $.trim(fval);
	fid = felem.attr("id");

	ftype = felem.prop("type");
	fnum = numeric;
	fname = felem.prop("name");

	if (errtxt[fid] != undefined) {
		if (errtxt[fid].length > 0 && fval != "") {
			result[1] = errtxt[fid];
		}
	}

	// Leer?
	if (fval == "") {
		if($("body").hasClass("mobile") && felem.hasClass("date")) {
			result[1] = "Bitte ausfüllen";
		}
		else {
			if (errtxt[fid] != undefined && errtxt[fid].length > 0) {
				result[1] = errtxt[fid];
			}
		}
		if (!passBy) {
			result[0] = 0;
		}
	}
	// Kontaktformular
	else if (ftype == "textarea" && felem.hasClass("required") && felem.hasClass("prefill")) {
		result[0] = 0;
	} 
	else {
		// Vorfiltern Texteingaben
		if (!fnum) {
			if (ftype == "text") {
				zahl_regex = /^[0-9]+$/;
				fval_data = fval.split(" ");
				secondLetter = "";
				thirdLetter = "";
				newstr = "";
				if (fname.indexOf("tin") == -1) {
					// Autokorrektur: 2. Buchstabe groß
					for (i = 0; i < fval_data.length; i++) {
						secondLetter = fval_data[i].substr(1, 1);
						thirdLetter = fval_data[i].substr(2, 1);
						if (thirdLetter != "" && thirdLetter != "." && thirdLetter == thirdLetter.toLowerCase()) {
							fval_data[i] = fval_data[i].substr(0, 1) + secondLetter.toLowerCase() + fval_data[i].substr(2);
						}
						if (i < 1) {
							newstr += fval_data[i];
						} else {
							newstr += " " + fval_data[i]
						}
					}
					$("#" + fid).val(newstr);
				}
			}
			// Spezialfall Tchibo
			if(fid=="uid10") {
				var tchibo_regex = /^2401[0-9]{9}$/;
				if (!tchibo_regex.test(fval)) {
					result[0] = 0;
					result[1] = "Ihre TchiboCard Kartennummer ist nicht korrekt. Diese finden Sie auf Ihrer TchiboCard.";
				}
			}
			// Vorname
			if (fid == "uid15" || fid == "uid115") {
				namens_regex_sz = /[0-9\+;,:%§!!\?\*<>#\(\)\[\]\{\}]/;
				namens_regex_empty = /\s{2,}/;
				if (namens_regex_sz.test(fval)||namens_regex_empty.test(fval)) {
					result[0] = 0;
					result[1] = "Bitte geben Sie korrekte Vornamen ein.";
				} else {
					if (fid == "uid15") {
						kontoinhaber[0] = fval;
					}
				}
			}
			// Nachname
			if (fid == "uid16" || fid == "uid116") {
				namens_regex_sz = /[0-9\+;,:%§!!\?\*<>#\(\)\[\]\{\}]/;
				namens_regex_empty = /\s{2,}/;
				if (namens_regex_sz.test(fval)||namens_regex_empty.test(fval)) {
					result[0] = 0;
					result[1] = "Bitte geben Sie einen korrekten Nachnamen ein.";
				} else {
					if (fid == "uid16") {
						kontoinhaber[1] = fval;
					}
				}
			}
			// Geburtsname
			if (fid == "uid17" || fid == "uid117") {
				// nur Buchstaben und Leerstellen
				namens_regex_sz = /[0-9\+;,:%§!!\?\*<>#\(\)\[\]\{\}]/;
				if (namens_regex_sz.test(fval)) {
					result[0] = 0;
					result[1] = "Bitte geben Sie einen korrekten Geburtsnamen ein.";
				}
			}
			// Kontoinhaber mitbefüllen
			if (kontoinhaber[0] != "" && kontoinhaber[1] != "" && kontoinhaber[0] != undefined && kontoinhaber[1] != undefined) {
				vornamen_data = kontoinhaber[0].split(" ");
				rufname = vornamen_data[0];
				$("#uid71").val(rufname + " " + kontoinhaber[1]);
				$("#uid458").val(rufname + " " + kontoinhaber[1]);
			}

			// Tel.
			if (fid == "uid24" || fid == "uid124") {
				tel_regex = /^[0-9/.+ \-]*$/;
				checkval = fval.replace(/\s/g, "");
				checkval = checkval.replace(/\//g, ""); ;
				checkval = checkval.replace(/\-/g, "");
				//trace(checkval);
				// Mobil-Nr.
				if (!tel_regex.test(checkval)) {
					result[0] = 0;
					result[1] = "Bitte geben Sie Ihre korrekte Telefonnummer ein.";
				}
			}

			// Mobilnr.
			if (fid == "uid108" || fid == "uid324" || fid == "uid25" || fid == "uid125") {
				tel_regex = /^[0-9/.+ \-]*$/;
				err_msg_tel = "Bitte geben Sie Ihre korrekte mobile Telefonnummer ein, z.B. 0170-123456.";
				checkval = fval.replace(/\s/g, "");
				checkval = checkval.replace(/\//g, ""); ;
				checkval = checkval.replace(/\-/g, "");
				//trace(checkval);
				// Mobil-Nr.
				if ((checkval.substr(0, 1) != "0" && checkval.substr(0, 1) != "+") || checkval.length < 4 || !tel_regex.test(checkval) || (checkval.substr(0, 5) != "++491" && checkval.substr(0, 4) != "+491" && checkval.substr(0, 5) != "00491" && checkval.substr(0, 3) != "491") && checkval.substr(0, 2) != "0") {
					result[0] = 0;
					result[1] = err_msg_tel;
				}
			}

			// PLZ, Ort kombiniert (ED)
			if (fid == "uid20_21") {
				myplz = fval.substr(0, 5);
				if (!plz_regex.test(myplz)) {
					result[0] = 0;
					result[1] = "Bitte geben Sie einen korrekten Wert ein.";
				}
			}

			// Ort
			if (fid == "uid21" || fid == "uid176") {
				if (fval == "-") {
					result[0] = 0;
				}
			}
			// Hausnr.
			if (fid == "uid19" || fid == "uid174") {
				if (fval.length > 10) {
					result[0] = 0;
					result[1] = "Die Hausnummer darf maximal 10 Zeichen lang sein.";
				}
			}
			// E-Mail
			if (fid == "uid27" || fid == "uid127" || fid == "uid1927" || fid == "uid327") {
				email_regex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,12}$/;
				if (!email_regex.test(fval) || fval.substr(0, 1) == ".") {
					result[0] = 0;
				}
			}
			// E-Mail Wied.
			if (fid == "uid927") {
				if (fval != $("#uid27").val()) {
					result[0] = 0;
				}
			}
			if (fid == "uid1927") {
				if (fval != $("#uid127").val()) {
					result[0] = 0;
				}
			}
			// Geburtsort
			if (fid == "uid32") {
				ctext = $("#uid35").find("option:selected").text();
				if (fval.toLowerCase() == ctext.toLowerCase()) {
					result[0] = 0;
					result[1] = "Bitte geben Sie Ihren Geburtsort und nicht das Land ein.";
				}
			}
			// Personennummer
			if (fid == "uid202" || fid == "uid302") {
				if ($("form#edaktion").length > 0) {
					if (!zahl_regex.test(fval)) {
						result[0] = 0;
						result[1] = "Bitte geben Sie eine korrekte Kontonummer ein.";
					}
				} else {
					pers_regex = /^([0-9]{10})$/;
					if (!pers_regex.test(fval)) {
						result[0] = 0;
						result[1] = "Die Personennummer muss eine 10-stellige Zahl sein, z.B. 0123456789";
					}
				}
			}
			// Datum
			if (result[0] == 1 && felem.hasClass("date")) {

				// Var.- befüllen
				if (fid == "uid929" && fval.indexOf(".") != -1) {
					mydate_data = fval.split(".");
					birthday = $.createDate(mydate_data[2], mydate_data[1], mydate_data[0]);
					birthday_15 = $.createDate(15 + parseInt(mydate_data[2]), mydate_data[1], mydate_data[0]);
				}
				if (fid == "uid939" && fval.indexOf(".") != -1) {
					mydate_data = fval.split(".");
					DEFirstDay = $.createDate(mydate_data[2], mydate_data[1], mydate_data[0]);
				}
				if ((fid == "uid950" || fid=="uid979") && fval.indexOf(".") != -1) {
					mydate_data = fval.split(".");
					jobFirstDay = $.createDate(mydate_data[2], mydate_data[1], mydate_data[0]);
				}

				// Schreibweise TT.MM.JJJJ erzwingen (Chrome und mobile JJJJ-MM-TT)
				if (ftype == "date") {
					if (fval.indexOf("-") != -1) {
						ddate_data = fval.split("-");
						fval = ddate_data[2] + "." + ddate_data[1] + "." + ddate_data[0];
					}
				}

				date_data = fval.split(".");

				// Vorfiltern Eingaben
				singlenumber_regex = /^[0-9]{1}$/;
				singlemonth_regex = /^[12]{1}$/;
				shortFlag = 0;
				if (date_data.length == 3) {
					if (date_data[0].length == 1 && singlenumber_regex.test(date_data[0])) {
						date_data[0] = "0" + date_data[0];
						shortFlag++;
					}
					if (date_data[1].length == 1 && singlemonth_regex.test(date_data[1])) {
						date_data[1] = "0" + date_data[1];
						shortFlag++;
					}
					if (shortFlag > 0) {
						fval = date_data[0] + "." + date_data[1] + "." + date_data[2];
						$("#" + fid).val(fval);
					}
				}
				date_regex = /^(0[1-9]|1[0-9]|2[0-9]|3[01])\.(0[1-9]|1[012])\.[0-9]{4}$/;
				if (!date_regex.test(fval)) {
					result[0] = 0;
					result[1] = errtxt['uid929'];
				}

				// Spezielle Prüfungen
				if (result[0] == 1) {
					errFlag = 0;

					// _Year
					if (date_data[2] < 1900) {
						errFlag = 1;
						result[1] = "Bitte geben Sie ein Datum nach 1900 ein.";
					}

					// _Tag/Monat
					switch (date_data[1]) {
					case "02":
						if ((date_data[2] % 4) == 0) {
							if (date_data[0] > 29) {
								errFlag = 1;
								result[1] = "Bitte geben Sie ein korrektes Datum ein. Der angegebene Monat hat nur 29 Tage.";
							}
						} else {
							if (date_data[0] > 28) {
								errFlag = 1;
								result[1] = "Bitte geben Sie ein korrektes Datum ein. Der angegebene Monat hat nur 28 Tage.";
							}
						}
						break;
					case "04":
					case "06":
					case "09":
					case "11":
						if (date_data[0] > 30) {
							errFlag = 1;
							result[1] = "Bitte geben Sie ein korrektes Datum ein. Der angegebene Monat hat nur 30 Tage.";
						}
						break;
					default:
					}
					if (errFlag == 1) {
						result[0] = 0;
					}
					// Prüfung Datum gesamt (nur bei ansonsten korrekter Eingabe)
					else if (result[0] == 1) {
						entryDate = $.createDate(date_data[2], date_data[1], date_data[0]);

						// GENERELL
						// _JJJJ (Verg.)
						if (fid == "uid929" || fid == "uid939" || fid == "uid945" || fid == "uid950" || fid == "uid979") {
							tstamp_p = entryDate.getTime();
							if (!(tstamp_h > tstamp_p)) {
								result[0] = 0;
								result[1] = "Bitte geben Sie ein Datum in der Vergangenheit ein.";
							}
						}
						// JJJJ (Zuk.)
						else if (fid == "uid983" || fid == "uid987" || fid == "uid990" || fid == "uid993" || fid == "uid110") {
							tstamp_f = entryDate.getTime();
							if (!(tstamp_f > tstamp_h)) {
								result[0] = 0;
								result[1] = "Bitte geben Sie ein zukünftiges Datum ein.";
							}
						}
						// SPEZIELL
						// Kreditkarten
						// _Geb.
						if (fid == "uid929" || fid == "uid1929") {
							// Vollj.
							var age = 18;
							yearDiff = year_h - age;
							min18Date = currentDate;
							min18Date.setFullYear(yearDiff);
							if ((min18Date - entryDate) < 0 && result[0] == 1) {
								if ($("form#bankdaten").length > 0) {
									result[0] = 0;
									result[1] = "Sie müssen volljährig sein, um eine Kreditkarte der Hanseatic Bank beantragen zu können.";
								}
								else if ($("form#geburtsdatum").length > 0) {
									result[0] = 0;
									result[1] = "Sie müssen volljährig sein, um die Sofortüberweisung vornehmen zu können.";
								}
								else if ($("form#zugang").length > 0) {
									result[0] = 0;
									result[1] = "Sie müssen volljährig sein, um Zugangsdaten beantragen zu können.";
								}
								else if ($("form#edaktion").length > 0) {
									result[0] = 0;
									result[1] = "Sie müssen volljährig sein, um ein EigentümerDarlehen zu erhalten.";
								} 
								else if ($("form#versicherungsformular").length > 0 || $("form#ueberweisungsformular").length > 0) {
									result[0] = 0;
									result[1] = "Sie müssen volljährig sein, um eine Kreditkarte der Hanseatic Bank nutzen zu können.";
								} 
								else if ($("form#geldanlageantrag").length > 0) {
									result[0] = 0;
									result[1] = "Der Antragsteller (ggf. auch sein Kontomitinhaber) muss volljährig sein, um eine Geldanlage beantragen zu können.";
								}
							} else {
								if (DEFirstDay != '') {
									if ((tstamp_p - DEFirstDay) > 0) {
										result[0] = 0;
										result[1] = "Das Datum darf nicht nach Ihrer Angabe für \"in Deutschland seit\" liegen.";
									}
								} else if (jobFirstDay != '') {
									if ((tstamp_p - jobFirstDay) >= 0) {
										result[0] = 0;
										result[1] = "Das Datum darf nicht nach Ihrer Angabe für \"Beschäftigt seit\" liegen.";
									}
								} else if (locationDay != '') {
									if ((tstamp_p - locationDay) >= 0) {
										result[0] = 0;
										result[1] = "Das Datum darf nicht nach Ihrer Angabe für \"Dort wohnhaft seit\" liegen.";
									}
								}
							}
						}
						if (fid == "uid929") {
							$.checkRSV();
						}
						// _ in Deutschland seit
						else if (fid == "uid939" && result[0] == 1) {
							if (birthday != "" && DEFirstDay != "") {
								if ((birthday - DEFirstDay) > 0) {
									result[0] = 0;
									result[1] = "Das Datum darf nicht vor Ihrem Geburtstag liegen.";
								}
							}
							if (DEFirstDay != "" && wohnhaftSeitDay != "") {
								if ((DEFirstDay - wohnhaftSeitDay) > 0) {
									result[0] = 0;
									result[1] = "Das Datum darf nicht nach Ihrer Angabe für \"wohnhaft seit\" liegen.";
								}
							}
						}
						// _Beschäftigt seit
						else if (fid == "uid950" && result[0] == 1) {

							if (birthday_15 != "" && birthday_15 > entryDate) {
								result[0] = 0;
								result[1] = "Sie müssen bei Beginn Ihrer Beschäftigung mindestens 15 Jahre alt gewesen sein.";
							}
							// Starttermin: Abgleich Geburtstag

							if (birthday != "" && jobFirstDay != "") {
								if (birthday - jobFirstDay > 0) {
									result[0] = 0;
									result[1] = "Das Datum darf nicht vor Ihrem Geburtstag liegen.";
								}
							}
						}
						// _Wohnhaft kürzer als 2 Jahre
						else if (fid == "uid979" && result[0] == 1) {
							yearDiff2 = year_h - 2;
							min2Date = currentDate;
							min2Date.setFullYear(yearDiff2);
							min2Date.setHours(0, 0, 0, 0);
							if (min2Date - entryDate > 0) {
								$.check2Jahre(1);
							}
							else {
								$.check2Jahre(0);
							}
							// Starttermin: Abgleich Geburtstag

							if (birthday != "" && wohnhaftSeitDay != "") {
								if (birthday - wohnhaftSeitDay > 0) {
									result[0] = 0;
									result[1] = "Das Datum darf nicht vor Ihrem Geburtstag liegen.";
								}
							}
						}
					}
				}
			}
			// Anlagebetrag (Geldanlageprodukte)
			if (fid == "uid204") {
				mfval = fval.replace(",-", "");
				mfval = mfval.replace(".-", "");
				summe_regex = /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/;
				if (!summe_regex.test(mfval)) {
					result[0] = 0;
					result[1] = "Bitte geben Sie einen korrekten Betrag ein.";
				}
				sparbriefemin = 2500;
				sparbriefemin_txt = "2.500";
				if ($("body").hasClass("sparbriefdynamik")) {
					sparbriefemin = 1000;
					sparbriefemin_txt = "1.000";
				}
				if ($("body").hasClass("fundtransfer")) {
					sparbriefemin = 100;
					sparbriefemin_txt = "1.00";
				}
				calcval = mfval.replace(".", "");
				calcval = calcval.replace(",", ".");
				if (parseInt(calcval) > 500000 || parseInt(calcval) < sparbriefemin) {
					result[0] = 0;
					result[1] = "Bitte beachten Sie den möglichen Anlagebetrag.";
				}
				if ($("form#edaktion").length > 0) {
					mybetrag = fval;
					errMsg = "";
					summe_regex = /^[1-9]{1}[0-9]*[\s,.-]*$/;
					mybetrag = mybetrag.replace(/\s/g, "");

					// Syntax-Prüfung
					if (!summe_regex.test(mybetrag)) {
						result[0] = 0;
						result[1] = "Bitte geben Sie eine korrekte Summe ein.";
					} else {
						// Math. Prüfung
						mybetrag = mybetrag.replace(".", "");
						mybetrag = mybetrag.replace(",", ".");
						if (mybetrag > maxsue) {
							result[0] = 0;
							result[1] = "Bitte geben Sie maximal " + maxsue + " € ein.";
						} else if (mybetrag < minbetrag) {
							result[0] = 0;
							result[1] = "Bitte geben Sie mindestens " + minbetrag_txt + " € ein.";
						}
					}
				} else if ($("form#ueberweisung").length > 0) {
					fval = document.ueberweisung.betrag.value;
					fval = fval.replace(",", "");
					fval = fval.replace(".", "");
					if (fval == "" || fval == "Wunschbetrag") {
						result[0] = 0;
						result[1] = "Bitte geben Sie eine Summe ein.";
					} else {
						if (!summe_regex.test(fval)) {
							result[0] = 0;
							result[1] = "Bitte geben Sie eine korrekte Summe ein.";
						} else {
							if (fval > maxsue) {
								result[0] = 0;
								result[1] = "Bitte geben Sie maximal " + maxsue + " € ein.";
							} else if (fval < 100) {
								result[0] = 0;
								result[1] = "Bitte geben Sie mindestens 100 € ein.";
							}
							mybetrag = $("input[name=betrag]").val();
							betrag = mybetrag.replace(",", "");
							betrag = betrag.replace(".", "");
							betrag = betrag.replace("€", "");
							betrag = betrag.replace(" ", "");
							$("input[name=betrag]").val(betrag);
						}
					}
					kreditrahmen = $("input[name=kreditrahmen]").val().replace(".", "");
					$("input[name=kreditrahmen]").val(kreditrahmen);

				}
			}
			// Steuernummer
			if (fid == "uid197" || fid == "uid297" || fid == "uid802" || fid == "uid1802") {
				newnumber = fval.replace(" ", "");
				$("#" + fid).val(newnumber);
				fval = newnumber;
				steuer_regex = /^\+?[1-9]{1}[0-9]{10}?$/;
				if (!steuer_regex.test(fval)) {
					result[0] = 0;
					result[1] = "Bitte geben Sie die 11-stellige Steuer-ID an.";
				}
			}
		}
		// Zahleneingaben ("numeric")
		else {
			// Geldbeträge
			if (fid == "uid26" || fid == "uid63" || fid == "uid64" || fid == "uid65" || fid == "uid196") {
				// Eingabe filtern auf typische Fehleingaben
				mfval = fval.replace(",--", "");
				mfval = mfval.replace(",-", "");
				mfval = mfval.replace(".--", "");
				mfval = mfval.replace(".-", "");
				mfval = mfval.replace(",", ".");
				mfval = Math.round(mfval);
				summe_regex = /^\+?[0-9]*\.?[0-9]+$/;
				if (!summe_regex.test(mfval)) {
					result[0] = 0;
					result[1] = "Bitte geben Sie eine ganzzahlige Summe ein.";
				} else {
					$("#" + fid).val(mfval);
					fval = mfval;
				}
				if (fval > 20000) {
					result[0] = 0;
					result[1] = "Sie können maximal 20.000 EUR eingeben.";
				}
				if (fid == "uid196") {
					if (Number(fval) < 100) {
						result[0] = 0;
						result[1] = "Bitte mindestens 100 EUR eingeben.";
					} else if (Number(fval) > 10000) {
						result[0] = 0;
						result[1] = "Sie können maximal 10.000 EUR eingeben.";
					}
				}
			}
			// Uhrzeit
			if (fid == "uid109_1" || fid == "uid109_2") {
				if (!(fval > 8 && fval < 19)) {
					result[0] = 0;
					result[1] = "Bitte geben Sie eine Uhrzeit zwischen 9 und 18 Uhr an.";
				}
			}
			if (fid == "uid109_2") {
				if (Number(fval) <= Number($("#uid109_1").val())) {
					result[0] = 0;
					result[1] = "Die End-Uhrzeit muss später als die Start-Uhrzeit liegen.";
				}
			}
			// nur Zahl

        
        
   
			if (result[0] == 1) {
				summe_regex = /^\s*(\+|-)?\d+\s*$/;
				if (!summe_regex.test(fval)) {
					result[0] = 0;
					result[1] = "Bitte geben Sie eine Zahl ein.";
				}
			}
			// Teilzahlung
			if (fid == "uid74_3") {
				if (!(fval <= 100 && fval > 3)) {
					result[0] = 0;
					result[1] = "Bitte geben Sie eine ganze Zahl von 4 bis 100 ein.";
				}
			}
		}

	}

	// Nichts oder 3 Optionen

	if (!(fval == "" && passBy)) {
		if (targetDiv.hasClass("optional") && fval == "") {
			$.resetValidation(targetDiv);
			// Tel.: Rückruf
			if (fid == "uid24" && $("#formdiv_uid265_110").is(":visible")) {
				$("#formdiv_uid265_110").hide();
			}
		} else if (result[0] == 1) {
			$.showSuccess(targetDiv);
			// Tel.: Rückruf
			if (fid == "uid24" && $("#formdiv_uid265_110").is(":hidden")) {
				$("#formdiv_uid265_110").show();
			}
			// Mailwiederholung
			/*if (fid=="uid27" && $("#formdiv_uid927").is(":hidden")) {
			$("#formdiv_uid927").show();
			$("#uid927").focus();
			}*/
		} else {
			formok = false;
			msgTxt = result[1];
			$.showError(targetDiv, msgTxt);
			// Tel.: Rückruf
			if (fid == "uid24" && $("#formdiv_uid265_110").is(":visible")) {
				$("#formdiv_uid265_110").hide();
			}
		}
	} else {
		$.resetValidation(targetDiv);
	}
}


function checkFieldIBAN(myid) {
	var felem=$("#"+myid);
	clearTimeout(checkpasteiban);
    passBy = false;
    if (myid == "uid215") {
        fid = "uid215";
        fidbic = "uid216";
        fidname = "uid68";
    } else {
        fid = "uid455";
        fidbic = "uid456";
        fidname = "uid457";
    }

    // Cleaning
    mystr = $.trim(felem.val());
    mystr = mystr.replace(/\s/g, "");
    
	firstLetters=$("#" + fid).val().substr(0,2).toUpperCase();
    mystrCap = $("#" + fid).val().replace(/([a-z]{2})(\0-9)*/, firstLetters+"$2");
	
	$("#" + fid).val(mystrCap);

    if (mystr == "" && felem.hasClass("optional")) {
        passBy = true;
    }

    targetDiv = $("#formdiv_" + fid);
    var okdata = "";

    // nicht leer
    if (mystr != "" && !passBy) {

        var checkcase = "";
        if (mystr.substr(0, 2).toLowerCase() == "de") {
            checkcase = "ibanDE";
        }
        // Karten: Eingabe ohne "DE"
        else {
            checkcase = "ibanAusland";
        }
        // 1. IBAN
        if (checkcase == "ibanDE") {
            mystr = mystr.toUpperCase();
            // get BIC per Ajax
            $.ajax({
                type: "POST",
                url: loadBICUrl,
                data: "iban=" + mystr,
                success: function (data) {
                    okdata = data.slice(0, 1);
                    bic = data.slice(1);
                    if (okdata == "1") { // Success
                        if (bic != "") {
                            $("#" + fidbic).val(bic);
                        }
                        // Haken
                        $.resetValidation(targetDiv);
                        $.showSuccess(targetDiv);
                    } else if (okdata == "2") {
                        msgTxt = "Bitte geben Sie eine korrekte IBAN ein.";
                        $.showError(targetDiv, msgTxt);
                    } else if (okdata == "9") {}
                    else {
                        msgTxt = "Es gab einen unbekannten technischen Fehler. Bitte versuchen Sie es sp\344ter noch einmal.";
                        $.showError(targetDiv, msgTxt);
                    }
                    // get Bankname per Ajax
                    $.ajax({
                        type: "POST",
                        url: loadBankUrl,
                        data: "iban=" + mystr,
                        contentType: 'application/x-www-form-urlencoded; charset=ISO-8859-1',
                        beforeSend: function (jqXHR) {
                            jqXHR.overrideMimeType('application/x-www-form-urlencoded; charset=ISO-8859-1');
                        },
                        success: function (data) {
                            okdata1 = data.slice(0, 1);
                            bankname = data.slice(1);
                            if (okdata1 == "9") {
                                msgTxt = "Es gab einen unbekannten technischen Fehler. Bitte versuchen Sie es sp\344ter noch einmal.";
                                $.showError(targetDiv, msgTxt);
                            } else if (okdata1 == "2") {
                                msgTxt = "Bitte geben Sie eine korrekte IBAN ein.";
                                $.showError(targetDiv, msgTxt);
                                $.resetValidation($("#formdiv_" + fidbic));
                                $("#" + fidbic).val("");
                                $.resetValidation($("#formdiv_" + fidname));
                                $("#" + fidname).val("");
                            } else if (okdata1 == "1") {
                                // Success
                                // Haken
                                curErrTxt = $("#errBox_formdiv_" + fid + "_1").text();
                                $.showSuccess($("#formdiv_" + fid));
                                if (bankname != "") {
                                    $("#" + fidname).val(bankname);
                                    $.showSuccess($("#formdiv_" + fidname));
                                }
                            } else {
                                msgTxt = "Es gab einen unbekannten technischen Fehler. Bitte versuchen Sie es sp\344ter noch einmal.";
                                $.showError(targetDiv, msgTxt);
                                $.resetValidation($("#formdiv_" + fidbic));
                                $("#" + fidbic).val("");
                                $.resetValidation($("#formdiv_" + fidname));
                                $("#" + fidname).val("");
                            }
                        }
                    });
                }
            });
        }
        // 2. Ausland
        else if (checkcase == "ibanAusland") {
            mycheck = checkiban(mystr);
            if (mycheck == 1) {
                $.showSuccess(targetDiv);
            } else {
                msgTxt = "Bitte geben Sie eine korrekte IBAN ein.";
                $.showError(targetDiv, msgTxt);
            }
        }
    } else {
        if (!passBy) {
            formok = false;
            msgTxt = "Bitte geben Sie eine korrekte IBAN ein.";
            $.showError(targetDiv, msgTxt);
        }
    }
	
}
// Select

$(".form-group > div > select").bind("change blur",
    function () {
    errFlag = 0;
    msgTxt = "Bitte ausfüllen.";
    targetDiv = $(this).parent();
    targetDivId = targetDiv.attr("id");
    if ($(this).closest(".form-group").hasClass("combined")) {
        targetDiv = $(this).parent(".inlinefelem");
    } else {
        targetDiv = $(this).closest(".form-group");
    }
    tindouble = false;
    if (targetDiv.parent().hasClass("unit")) {
        tindouble = $.checkTINLandDouble($(this).closest(".unit").parent().attr("class"), $(this).attr("id"), $(this).val());
    }
    // Success
    if (this.selectedIndex != 0) {
        if ($(this).closest(".form-group").hasClass("rueckruf")) {
            if (parseInt($("#uid265a").val()) >= parseInt($("#uid265b").val())) {
                msgTxt = "Die zweite Angabe muss zeitlich nach der ersten liegen.";
                errFlag = 1;
            }
        }
        if (errFlag > 0) {
            formok = false;
            $.showError(targetDiv, msgTxt);
        } else {
            $.showSuccess(targetDiv);
            if ($(this).closest(".form-group").hasClass("rueckruf")) {
                $(this).closest(".form-group").children(".inlineElem").each(function () {
                    if ($(this).children("select").length > 0) {
                        if ($(this).children("select").prop("selectedIndex") != 0 && $(this).hasClass("has-error")) {
                            $.showSuccess($(this));
                        }
                    }
                });
            }
        }
    }
    // Failure
    else {
        formok = false;
        msgTxt = "Bitte eine Option auswählen.";
        $.showError(targetDiv, msgTxt);
    }
});

// Checkboxen

$("input[type=checkbox]").click(function () {
    // Definitions
    var fid = $(this).attr("id");
    var cberror = false;
    var cberrtext = "Bitte bestätigen.";
    // Nur Pflicht-CBs
    if (!$(this).hasClass("optional")) {
        // Nicht ausgewählt
        if (!$(this).prop("checked")) {
            cberror = true;
            if (errtxt[fid] != undefined) {
				errfid=fid;
				if(fid=="uid82" && !$("#uid81_1").parent().hasClass("active")) {
					errfid="uid82a";
				}
                cberrtext = errtxt[errfid];
            }
        } 
		// Ausgewählt
		else {
			// Spezialfall DL
            if ($(this).closest(".checkbox.form-group").hasClass("forceDownload")) {
				if($(this).prop("checked")) {
					$("a#vertragsdokumente").click();
				}
            }
        }
        // Ausgabe
        if (cberror) {
            formok = false;
            $("#" + fid).prop("checked", false);
            $(this).next(".checkator_element").addClass("error_cb");
            if ($(this).closest(".checkbox.form-group").find(".error_checkbox").length == 0) {
                $(this).closest(".checkbox.form-group").append("<div class='error_checkbox'>" + cberrtext + "</div>");
            } else {
                $(this).closest(".checkbox.form-group").find(".error_checkbox").text(cberrtext);
            }
        } else {
            $(this).next(".checkator_element").removeClass("error_cb");
            $(this).closest(".checkbox.form-group").find("div.error_checkbox").remove();
        }
    }	
});
// ACTION

// Text

$(".form-group input[type=text],.form-group input[type=number],.form-group input[type=tel],.form-group input[type=email],.form-group input[type=date],input[type=password],.form-group textarea").not("input.ajax,#uid901,#uid20,#uid120,#uid175,.readonly").blur(function(){
	checkFieldStd($(this).attr("id"));
});

$(".form-group input[type=text],.form-group input[type=number],.form-group input[type=tel],.form-group input[type=email],.form-group input[type=date],input[type=password],.form-group textarea").not("input.ajax,#uid901,#uid20,#uid120,#uid175,.readonly").on('paste', function () {
    var element = this;
    setTimeout(function () {
        var userEnteredText = $(element).val();  
		checkFieldStd($(element).attr("id"));
   }, 50); 
});

// RB
$(".btn-group .btn-primary").click(function () {
    targetDiv = $(this).parent();
    $.resetValidation(targetDiv);
});

// Specials

// _Intro

$("a#automatisch,a#manuell").click(function (e) {
    e.preventDefault();
    fadeSpeed = 100;
    r = $(this).attr("id");
    // automatisch
    if (r == "automatisch") {
        $(this).closest("fieldset").fadeOut(fadeSpeed, function () {
            // Einblenden
            $(".step0a").fadeIn(fadeSpeed);
            $("main .pureText:eq(0)").html("Für die <strong>automatische Datenübernahme</strong> bieten wir Ihnen zur Zeit folgende Services an.");
            $("main h2").after("<h3 style='margin-top: 10px;margin-bottom: 20px;}'>Digitaler Kontoblick auf Ihr Gehaltskonto</h3>");
            $("main h2").remove();
            jumpTop();
        });
    }
    // manuell
    else {
        $(this).closest("fieldset").fadeOut(fadeSpeed, function () {
            // Einblenden
            $(".step1").removeClass("hiddenElem");
            $("main .pureText:eq(0)").text("Um eine Kreditkarte der Hanseatic Bank erhalten zu können, benötigen wir zunächst folgende Angaben von Ihnen.");
            $("main h2").remove();
            jumpTop();
        });
    }
});

// _Antrag laden (alles)

$("button#step2").click(function (event) {
    event.preventDefault();
    formok = true;
    getFirstErrFlag = false;
    clickSubmit = 1;
    msgTxt = "Bitte ausfüllen.";
    result = new Array(1, msgTxt);
	$.startIBANListener();
    $("form input[type=text]:visible, form input[type=tel]:visible, form input[type=email]:visible, form select:visible, form input[type=checkbox]:visible, form .btn-group .btn-primary:visible, form textarea:visible").each(function () {
		fid = $(this).attr("id");
        fval = $.trim($(this).val());
        if ($(this).prop("tagName").toLowerCase() == "label") {
            if ($(this).parent().hasClass("mandatory")) {
                setok = false;
                $(this).parent().find("input:radio").each(function () {
                    if ($(this).is(":checked")) {
                        setok = true;
                    }
                });
                if (!setok) {
                    formok = false;
                    var msgTxt = "Bitte eine Option auswählen.";
                    $.showError($(this).parent(), msgTxt);
                } else {
                    $.resetValidation($(this).parent());
                }
            }
        } else if ($(this).prop("type") != "checkbox" && $(this).prop("tagName").toLowerCase() != "label") {
            $(this).blur();
        }
        if (formok == false && getFirstErrFlag == false) {
            getFirstErrFlag = true;
            firstErrElem = $(this);
        }
    });
	$("#fieldset_1 .help-block.prevalidate").hide();
    if (formok) {
        $(".step2").removeClass("hiddenElem");
        $(".step2").show();
        $("button#step2").hide();
        scrollto("fieldset#fieldset2a");
        $("#uid18").mask("0000 0000 0000 0000");
        // Step 1
        $(".progress > .progress-bar:eq(1)").removeClass("open").addClass("done");
		
        // Tracking TC Step 2

		tc_vars.page_name = "Step1_Antragsformular-Schritt2";
		tC.container.reload({
			events: {
				pageview: [{}, {}
				]
			}
		});
    } else {
        var firstErrPar = "";
        var offs = 0;
        if (firstErrElem != undefined) {
            firstErrPar = firstErrElem.closest(".form-group");
            offs = -10;
        }
        scrollto(firstErrPar);
    }
    clickSubmit = 0;
});

$("input#uid73").click(function () {
    if (!$(this).prop("checked")) {
        formok = false;
        $(this).next(".checkator_element").addClass("error_cb");
        if ($(this).closest(".checkbox.form-group").find(".error_checkbox").length == 0) {
            $(this).closest(".checkbox.form-group").append("<div class='error_checkbox'>Bitte bestätigen.</div>");
        }
    } else {
        $(this).next(".checkator_element").removeClass("error_cb");
        $(this).closest(".checkbox.form-group").find("div.error_checkbox").remove();
    }
});
$("#checkator_uid73").keyup(function (e) {
    e.preventDefault();
    if (e.keyCode === 32) {
        if (!$(this).prop("checked")) {
            formok = false;
            $(this).next(".checkator_element").addClass("error_cb");
            if ($(this).closest(".checkbox.form-group").find(".error_checkbox").length == 0) {
                $(this).closest(".checkbox.form-group").append("<div class='error_checkbox'>Bitte bestätigen.</div>");
            }
        } else {
            $(this).next(".checkator_element").removeClass("error_cb");
            $(this).closest(".checkbox.form-group").find("div.error_checkbox").remove();
            $.antragStep2();
        }
    }
});

// _Bankdaten

// __IBAN
$("#uid215, #uid455").blur(function () {
	checkFieldIBAN($(this).attr("id"));
});

$("#uid215, #uid455").on('paste', function () {
    var element = this;
    setTimeout(function () {
        var userEnteredText = $(element).val();  
		checkFieldIBAN($(element).attr("id"));
   }, 50); 
});

// __BLZ (Feld vorher dynamisch eingeblendet worden)
$("#uid70").blur(function () {
    fid = "uid70";
    mystr = $.trim($(this).val());
    targetDiv = $("#formdiv_uid70");

    mystr = mystr.replace(" ", ""); // falls maxlength irgendwo nicht greift

    if (mystr.length !== 8) {
        msgTxt = "Bitte geben Sie eine korrekte Bankleitzahl ein.";
        $.showError(targetDiv, msgTxt);
    }

    // Kto-Nr. liegt vor (hidden)
    if ($('#uid69').val() != "") {
        ajaxdata = "blz=" + mystr + "&kontonummer=" + $('#uid69').val();
    }
    // Kto-Nr. liegt nicht vor
    else {
        ajaxdata = "blz=" + mystr;
    }
    $.ajax({
        type: "POST",
        url: loadBankUrl,
        data: ajaxdata,
        success: function (data) {
            okdata = data.slice(0, 1);
            bankname = data.slice(1);
            if (okdata == 9) {
                msgTxt = "Es gab einen unbekannten technischen Fehler. Bitte versuchen Sie es sp\344ter noch einmal.";
                $.showError(targetDiv, msgTxt);
            } else if (okdata == 2) {
                msgTxt = "Bitte geben Sie eine korrekte Bankleitzahl ein.";
                $.showError(targetDiv, msgTxt);
            } else if (okdata == 3) {
                if ($('#uid69').val() != "") {
                    msgTxt = "Kontonummer und BLZ passen nicht zusammen.";
                } else {
                    msgTxt = "Bitte geben Sie eine korrekte IBAN oder Kontonummer ein.";
                }
                $.showError($("#formdiv_uid215"), msgTxt);
                $.resetValidation($("#formdiv_uid70"));
                $.showSuccess(targetDiv);
                if (bankname != "") {
                    $("#uid68").val(bankname);
                    $.resetValidation($("#formdiv_uid68"));
                    $.showSuccess(targetDiv);
                }
            } else if (okdata == 1) { // Success
                // Haken
                $.resetValidation($("#formdiv_uid70"));
                $.showSuccess(targetDiv);
                if (bankname != "") {
                    $("#uid68").val(bankname);
                    $.showSuccess($("#formdiv_uid68"));
                }
                $.showSuccess($("#formdiv_uid215"));
            } else {
                msgTxt = "Es gab einen unbekannten technischen Fehler. Bitte versuchen Sie es sp\344ter noch einmal.";
                $.showError(targetDiv, msgTxt);
            }
        }
    });

});

// Abschicken

var formFill = "";
var clickSubmit = 0;

$("button#submitBtn,form#edaktion .btn-submit").click(
    function (event) {
		event.preventDefault();
		formok = true;
		getFirstErrFlag = false;
		clickSubmit = 1;
		$("form input[type=text]:visible, form input[type=tel]:visible, form input[type=email]:visible, form select:visible, form input[type=checkbox]:visible, form .btn-group .btn-primary:visible, form textarea:visible").each(function () {
			if ($(this).prop("type") != "checkbox" && $(this).prop("tagName").toLowerCase() != "label") {
				// Dev. Stage zum Testen: Auskommentieren
				$(this).blur();
				// Dev. Stage zum Testen End
			} else if ($(this).prop("tagName").toLowerCase() == "label") {
				if ($(this).parent().hasClass("mandatory")) {
					setok = false;
					$(this).parent().find("input:radio").each(function () {
						if ($(this).is(":checked")) {
							setok = true;
						}
					});
					if (!setok) {
						formok = false;
						var msgTxt = "Bitte eine Option auswählen.";
						$.showError($(this).parent(), msgTxt);
					} else {
						$.resetValidation($(this).parent());
					}
				}
			} else if ($(this).attr("type") == "checkbox") {
				fid = $(this).attr("id");
				if (!$(this).hasClass("optional")) {
					if (!$(this).prop("checked")) {
						formok = false;
						$(this).next(".checkator_element").addClass("error_cb");
						// Ggf. alten Fehlertext entfernen
						if ($(this).closest(".checkbox.form-group").find(".error_checkbox").length != 0) {
							$(this).closest(".checkbox.form-group").find("div.error_checkbox").remove();
						}
						// Neuen  Fehler ausgeben
						if (errtxt[fid] != undefined) {
							errfid=fid;
							if(fid=="uid82" && !$("#uid81_1").parent().hasClass("active")) {
								errfid="uid82a";
							}
							errMsg = errtxt[errfid];
						}
						else {
							errMsg="Bitte bestätigen.";
						}
						$(this).closest(".checkbox.form-group").append("<div class='error_checkbox'>"+errMsg+"</div>");
					} else {
						$(this).next(".checkator_element").removeClass("error_cb");
						$(this).closest(".checkbox.form-group").find("div.error_checkbox").remove();
					}
				}
			}
			
			if (formok == false && getFirstErrFlag == false) {
				getFirstErrFlag = true;
				firstErrElem = $(this);
			}
		});
		$("input[type=text]:hidden, input[type=tel]:hidden, select:hidden").each(function () {
			$(this).val("");
		});
		$("form .btn-group .btn-primary:hidden").each(function () {
			$(this).find("input[type=radio]").val("");
		});
		$("div.form-group_radio:hidden").each(function () {
			$(this).find("input:radio").val("");
		});
		setTimeout(function () {
			var a = "";
		}, 3000);
		if (formok) {
			
			// Karten
			if ($("form#bankdaten").length > 0) {
				
				// Tracking Werbe-CBs
				if (typeof ATInternet !== 'undefined') {
					var werbeopts=new Array();
					werbeopts[0]=new Array();
					werbeopts[1]=new Array();
					werbeopts[2]=new Array();
					werbeopts[0]['fname']="uid301";
					werbeopts[1]['fname']="uid302";
					werbeopts[2]['fname']="uid303";
					werbeopts[0]['atinameIn']="GenialCard::Checkbox_E-Mail::Optin::Checkbox_E-Mail";
					werbeopts[1]['atinameIn']="GenialCard::Checkbox_Telefon::Optin::Checkbox_Telefon";
					werbeopts[2]['atinameIn']="GenialCard::Checkbox_SMS::Optin::Checkbox_SMS";
					werbeopts[0]['atinameOut']="GenialCard::Checkbox_E-Mail::Optout::Checkbox_E-Mail";
					werbeopts[1]['atinameOut']="GenialCard::Checkbox_Telefon::Optout::Checkbox_Telefon";
					werbeopts[2]['atinameOut']="GenialCard::Checkbox_SMS::Optout::Checkbox_SMS";
					
					var tag=new ATInternet.Tracker.Tag();
					
					if(tag.click!=undefined) {
						for (var i=0;i<3;i++) {
							if($("#"+werbeopts[i]['fname']).prop("checked")) {
								tag.click.send({elem:this, name:werbeopts[i]['atinameIn'], level2:'1', type:'action'});							
							}
							else {
								tag.click.send({elem:this, name:werbeopts[i]['atinameOut'], level2:'1', type:'action'});							
							}
						}
					}
				}
				
				mydata = "";
				$("form#bankdaten input:hidden[name=mainDebtor_BESCHAEFTIGTALS_txt]").val($('#uid37 option:eq(' + $('#uid37').val() + ')').text());
				$("form#bankdaten input:hidden[name=mainDebtor_BRANCHE_txt]").val($('#uid44 option:eq(' + $('#uid44').val() + ')').text());
				$("form#bankdaten input:hidden[name=mainDebtor_NATIONALITAET_txt]").val($('#uid35 option:eq(' + $('#uid35').attr("selectedIndex") + ')').text());
				if ($('#uid335').is(':visible')) {
					$("form#bankdaten input:hidden[name=partnercard_NATIONALITAET_txt]").val($('#uid335 option:eq(' + $('#uid335').attr("selectedIndex") + ')').text());
				}
				// Manuelle BIC-Eingabe war erforderlich
				if ($("input[name=mainDebtor_KONTOBIC_VN]").val() != "") {
					mybic = $("input[name=mainDebtor_KONTOBIC_VN]").val();
					$("input[name=mainDebtor_KONTOBIC]").val(mybic);
				}

				$("#uid215, #uid455").each(function () {
					mystr = $.trim($(this).val());
					mystr = mystr.replace(/\s/g, "");
					$(this).val(mystr);
				});

				mydata = $("form#bankdaten").serialize();
				mydata = encodeURI(mydata);
				$("form").hide();
				$(".explain.long").hide();
				sendForm();
			}
			// alle anderen Formulare
			else {
				$("#uid215, #uid455").each(function () {
					mystr = $.trim($(this).val());
					mystr = mystr.replace(/\s/g, "");
					$(this).val(mystr);
				});
				$("form").last().submit();
			}
		} else {
			var firstErrPar = "";
			var offs = 0;
			if (firstErrElem != undefined) {
				firstErrPar = firstErrElem.closest(".form-group");
				offs = -10;
			}
			scrollto(firstErrPar);
			clickSubmit = 0;
		}
	}
);

$("button[type=reset]").click(
    function (event) {
    event.preventDefault();
    window.history.back();
});

// General stuff

$('input').focus(function () {
    if ($(this).val().substr(0, 4) == "min.") {
        $(this).val("");
        if ($("body").hasClass("mobile") && $("form button").text().indexOf("Post") != -1) {
            $(this).prop("type", "number");
        }
        $(this).focus();
    }
});

function sendForm() {
    var produktkat = "";
    if ($("form input[name=product]").val() == "gen") {
        produktkat = "GeCa";
    } else if ($("form input[name=product]").val() == "gol") {
        produktkat = "GoCa";
    }
    $(".process ul li:eq(0)").removeClass("current");
    $(".process ul li:eq(1)").addClass("current");
    $(".process ul").css("backgroundColor", "#5A0035");
    $("form#bankdaten").hide();
    $("#verimiTrust").hide();
    $(".alertBox").hide();
    if ($(".errorBlockMsg").length > 0)
        $(".errorBlockMsg").hide();
    $("p.note").hide();
    $("main .csc-header-n1 h1").text("Es geht sofort weiter.");
    $("main .csc-header-n1 h2").text("Bitte haben Sie einen Moment Geduld. Ihre Angaben werden geprüft.");
    $("main p.pureText:eq(1)").hide();
	$(".incentive.formular").hide();
	if($(".incentive").length>0) {
		$("p.hint").hide();
	}
    // Step 2
    $(".progress > .progress-bar:eq(2)").removeClass("open").addClass("done");
    $(".mainWrap h1:eq(0)").text("Es geht sofort weiter.");
    jumpTop();
    $("#warten").show(function () {
        $("form#bankdaten").submit();
    });
}

// Weiteres
// _Kreditkarten
$("#formdiv_uid23").children("label").click(function () {
    myval = $(this).children("input").val();
    if (myval == "3") {
        $("#formdiv_uid63").show();
        $("#formdiv_uid64").hide();
    }
    // Eigentümer
    else if (myval == "1") {
        $("#formdiv_uid64").show();
        $("#formdiv_uid63").hide();
    } else {}
});
// _Wohnhaft seit
$("#formdiv_uid22").children("label").click(function () {
    myval = $(this).children("input").val();
    // länger
    if (myval == "ja") {
        $.check2Jahre(1);
    }
    // kürzer
    else if (myval == "nein") {
        $.check2Jahre(0);
    } else {}
});
$("select#uid35").bind("change blur",
    function () {
    $.checkAusland($(this).val());
});
$("select#uid37").bind("change blur", function () {
    $.checkBeruf($(this).val());
    $.checkRSV();
});

$("#formdiv_uid81").children("label").click(function () {
    myval = $(this).children("input").val();
    if (myval == 1) {
        $("#rsvAgreeText").show();
        $(".rsv").show();
		$("#rsvAgree> div > p > a").attr("href","/fileadmin/docs/"+produktTxt+"_Vertragsdokumente_Teil1_inkl-RSV.pdf");
    }
    else if (myval == 0) {
        $("#rsvAgreeText").hide();
        $(".rsv").hide();
		$("#rsvAgree> div > p > a").attr("href","/fileadmin/docs/"+produktTxt+"_Vertragsdokumente_Teil1_ohne-RSV.pdf");
    } 
	// Reset specific DL-CB
	$("#uid82").prop("checked",false);
	$("#uid82").next(".checkator_element").removeClass("error_cb");
	$("#uid82").closest(".checkbox.form-group").find("div.error_checkbox").remove();
});

// Tracking Download

var cb1=true;

$("a#vertragsdokumente").bind("click", function(e){
	if ($("body").hasClass("mobile")) {
	//	$("#footer-contact__item-store .footer-contact__headline").text("clicked");
	}
	if(cb1) {
		e.preventDefault();
		if ($("body").hasClass("mobile")) {
			currentTarget="_blank";
		}
		// RSV
		if($("#fieldset_2a").is(":visible")) {
			// Auswahl getroffen?
			var rsvFlag=false;
			$("#formdiv_uid81").find("input:radio").each(function () {
				if ($(this).is(":checked")) {
					rsvFlag = true;
				}
			});
			if (!rsvFlag) {
				var msgTxt = "Bitte eine Option auswählen.";
				// Show RSV-Auswahl Error
				$.showError($("#formdiv_uid81"), msgTxt);
				scrollto("#formdiv_uid81");
				// Reset CB Error
				$("#uid82").next(".checkator_element").removeClass("error_cb");
				$("#uid82").closest(".checkbox.form-group").find("div.error_checkbox").remove();
			} else {
				$.resetValidation($("#formdiv_uid81"));
				cb1=false;
				if (!$("body").hasClass("mobile")) {
					e.currentTarget.click();
				}
				else {
					window.open(e.currentTarget.href, "new");
				}
				cb1=true;
			}
		}
		// Keine RSV
		else {
			cb1=false;
			if (!$("body").hasClass("mobile")) {
				e.currentTarget.click();
			}
			else {
				window.open(e.currentTarget.href, "new");
			}
			cb1=true;
		}
	}
});

// _Kontakt: Kunde
$("#formdiv_uid201").children("label").click(function () {
    myval = $(this).children("input").val();
    if (myval == "1") {
        $("#formdiv_uid262").show();
        $("#formdiv_uid18_19").hide();
        $("#formdiv_uid20_21").hide();
    } else {
        $("#formdiv_uid262").hide();
        $("#formdiv_uid18_19").show();
        $("#formdiv_uid20_21").show();
    }
});

// Aktivierung RBs
$("label.btn").click(function () {
    r = $(this).find("input[type=radio]").attr("id");
    if (r == "uid42_1") {
        $.checkBefristetArbeit(0);
    } else if (r == "uid42_2") {
        $.checkBefristetArbeit(1);
    } else if (r == "uid43_0") {
        $.checkBefristetAufhalt(0);
    } else if (r == "uid43_1") {
        $.checkBefristetAufhalt(1);
    } else if (r == "uid57_0") {
        if ($("#uid37").val() == "4") {
            $.showError($(this).parent(), "Ein Ausbildungsverhältnis kann nicht unbefristet sein.");
        } else {
            $.checkBefristetArt(0);
        }
    } else if (r == "uid57_1") {
        $.checkBefristetArt(1);
    }
});

// Mehr-Links
$("a.js-toggle").click(
    function (e) {
		e.preventDefault();
		$(this).parent().toggleClass("is-open");
	}
);

// Prüfung auf Wohnsitz: Minimum 2 Jahre, sonst Zusatzangaben erforderlich

var thisyear_2back = currentDate.getFullYear() - 2;
var thismonth = currentDate.getMonth() + 1;
var thisday = currentDate.getDate();

$(".mehrInfos:gt(0)").each(function () {
    $(this).text("mehr Infos");
    $(this).parent().next().slideUp();
});

$(".mehrInfos").each(function () {
    $(this).text("mehr Infos");
    $(this).parent().next().slideUp();
});

// Prozess-Übersicht
$("div.process ul a").click(function (event) {
    event.preventDefault();
});

// Hilfstexte
var curElem = "";

$("input.form-control").focus(function () {
	$(this).closest(".form-group").find(".help-block.prevalidate").hide();
	$(this).closest(".form-group").find(".btn-info").addClass("active");
	curElem = $(this).closest(".form-group");
    if (curElem.find(".btn-info:visible").length>0) {
        $(this).closest(".form-group").find(".help-block").show();
    }
	if(curElem.find(".btn-info:hidden").length>0 && curElem.hasClass("has-error")) {
		$.reshowInfo(curElem);
	}
});

$("input.form-control").blur(function () {
    if (curElem != "") {
        curElem.children(".help-block.prevalidate").hide();
        curElem.find(".btn-info").removeClass("active");
    }
});

$(".btn-info").click(function () {
    $(this).addClass("active");
    $(this).closest(".form-group").find("p.prevalidate").show();
});

// _Textareas

$("#uid266").focus(function () {
    if ($(this).val() == "--- Was können wir für Sie tun? ---") {
        $(this).val("");
    }
    $(this).removeClass("prefill");
});

var hiddenfilled = 0;

// _Wahl D/Ausland
$("#uid801_1").parent("label").click(function () {
    $("#formdiv_uid802").show();
    $(".kunde .unit").hide();
    $(".kunde p.subHeadline").hide();
    $(".kunde .admPanel").hide();
    $("#formdiv_uid818").hide();
});
$("#uid801_2").parent("label").click(function () {
    $("#formdiv_uid802").hide();
    $(".kunde p.subHeadline").show();
    var hiddenfilled = 0;
    $(".kunde .unit select").each(function () {
        if ($(this).val() != "") {
            hiddenfilled++;
        }
    });
    var unfoldfields = 0;
    hiddenfilled > 0 ? unfoldfields = hiddenfilled : unfoldfields = 1;
    var k = 0;
    for (k = 0; k < unfoldfields; k++) {
        newunit = ".kunde .land" + (k + 1);
        // Boxen
        $(newunit).show();
        $(newunit + " input[type=checkbox]").prop("checked", false);
    }
    $(".kunde .admPanel").show();
    $(".kunde .admPanel .add").show();
    if (k > 1) {
        $(".kunde .admPanel .remove").show();
    } else {
        $(".kunde .admPanel .remove").hide();
    }
});
$("#uid1801_1").parent("label").click(function () {
    $("#formdiv_uid1802").show();
    $(".partner .unit").hide();
    $(".partner p.subHeadline").hide();
    $(".partner .admPanel").hide();
    $("#formdiv_uid1818").hide();
});
$("#uid1801_2").parent("label").click(function () {
    $("#formdiv_uid1802").hide();
    $(".partner p.subHeadline").show();
    var hiddenfilled = 0;
    $(".partner .unit select").each(function () {
        if ($(this).val() != "") {
            hiddenfilled++;
        }
    });
    var unfoldfields = 0;
    hiddenfilled > 0 ? unfoldfields = hiddenfilled : unfoldfields = 1;
    var k = 0;
    for (k = 0; k < unfoldfields; k++) {
        newunit = ".partner .land" + (k + 1);
        // Boxen
        $(newunit).show();
        $(newunit + " input[type=checkbox]").prop("checked", false);
    }
    $(".partner .admPanel").show();
    $(".partner .admPanel .add").show();
    if (k > 1) {
        $(".partner .admPanel .remove").show();
    } else {
        $(".partner .admPanel .remove").hide();
    }
});

// _Land hinzufügen
$(".admPanel .add").click(function () {
    var person = "";
    if ($(this).closest(".kunde").length > 0) {
        person = ".kunde ";
    } else {
        person = ".partner ";
    }
    lnr = $(person + ".unit:visible").length;
    if (lnr < $(person + ".unit").length) {
        newlnr = lnr + 1;
        newunit = person + ".land" + newlnr;

        // Boxen
        $(newunit).show();
        if ($(newunit).find("select").val() == "") {
            $(newunit + " input[type=checkbox]").prop("checked", false);
        }
        if ($(newunit).find("input[type=text]").val() == "") {
            $(newunit + " input[type=checkbox]").prop("checked", false);
        }

        // AdmPanel
        if (newlnr == $(person + ".unit").length) {
            $(person + ".admPanel span.add").hide();
        } else if (newlnr > 1) {
            $(person + ".admPanel span.remove").show();
        }
    }
});

// _Land wegnehmen
$(".admPanel .remove").click(function () {
    var person = "";
    if ($(this).closest(".kunde").length > 0) {
        person = ".kunde ";
    } else {
        person = ".partner ";
    }
    lnr = $(person + ".unit:visible").length;
    if (lnr > 1) {
        oldunit = person + ".land" + lnr;

        // Boxen
        $(oldunit).hide();

        // AdmPanel
        if (lnr == 2) {
            $(person + ".admPanel span.remove").hide();
        } else if (lnr <= $(".unit").length) {
            $(person + ".admPanel span.add").show();
        }
        currPos = $("form").scrollTop();
        newPos = currPos - $(person + ".unit:eq(" + (lnr - 1) + ")").height() - 20;
        $("form").stop().animate({
            scrollTop: newPos
        }, 100);
    }
});

// _keine TIN
$(".unit input[type=checkbox]").click(function () {
    // Bereich feststellen
    if ($(this).closest(".kunde").length > 0) {
        person = ".kunde ";
    } else {
        person = ".partner ";
    }
    // Eingabefeld ausblenden
    if ($(this).prop("checked")) {
        $(this).closest(".checkbox ").prev(".form-group").hide();
    } else {
        $(this).closest(".checkbox ").prev(".form-group").show();
    }

    // Grund angeben
    cflag = 0;
    $(person + ".unit input[type=checkbox]:visible").each(function () {
        if ($(this).prop("checked")) {
            cflag++;
        }
    })
    if (cflag > 0) {
        if (person == ".kunde ") {
            $("#formdiv_uid818").show();
        } else {
            $("#formdiv_uid1818").show();
        }
    } else {
        if (person == ".kunde ") {
            $("#formdiv_uid818").hide();
        } else {
            $("#formdiv_uid1818").hide();
        }
    }
});

$("#uid232").change(function () {
    $.checkLaufzeitSPB($("select#uid232").val());
});

// Selbständige Detail
$("select#uid37").bind("change blur",
    function () {
    $.checkSelbstaendig(1, $(this).val());
});

$("select#uid137").bind("change blur",
    function () {
    $.checkSelbstaendig(2, $(this).val());
});

$("#uid240").click(function () {
    if ($(this).is(":checked")) {
        $('#docs .online').show();
    } else {
        $('#docs .online').hide();
    }
});

$("#uid231_1").parent("label").click(function () {
    $("#formdiv_uid203").show();
});

$("#uid231_2").parent("label").click(function () {
    $("#formdiv_uid203").hide();
});

$("#uid99_1").parent("label").click(function () {
    $(".partner").hide();
    $("label,div.form-group").each(function () {
        if ($(this).hasClass("zuzweit")) {
            $(this).hide();
        }
    });
    $("h2").each(function () {
        if ($(this).hasClass("zuzweit")) {
            $(this).hide();
        }
    });
    $(".textcheck").each(function () {
        for (var i = 0; i < textbits2.length; i++) {
            $(this).html($(this).html().replace(textbits2[i], textbits1[i]));
        }
    });
    $("#uid317").prop("checked", false);
    $("form input:hidden[name=modus]").val(1);
});

$("#uid99_2").parent("label").click(function () {
    $(".partner").show();
    $(".partner div.form-group").not(".partner .notvisible").each(function () {
        if ($(this).attr("id") != "formdiv_uid202" && $(this).attr("id") != "formdiv_uid302") {
            $(this).show();
        } else {
            if ($(this).attr("id") == "formdiv_uid302" && $("#uid201_1").prop("checked")) {
                $(this).show();
            }
        }
    });
    $("h2").each(function () {
        if ($(this).hasClass("zuzweit")) {
            $(this).show();
        }
    });
    $(".textcheck").each(function () {
        for (var i = 0; i < textbits1.length; i++) {
            $(this).html($(this).html().replace(textbits1[i], textbits2[i]));
        }
    });
    $("form input:hidden[name=modus]").val(2);
    $.checkButtons();
});

$("#uid201_1").parent("label").click(function () {
    $("#formdiv_uid202").show();
    $("#formdiv_uid302").show();
    if ($("body").hasClass("sparbrief") && $("body").hasClass("antrag")) {
		$.checkLaufzeitSPB($("select#uid232").val());
	}
});

$("#uid201_2").parent("label").click(function () {
    $("#formdiv_uid202").hide();
    $("#formdiv_uid302").hide();
    if ($("body").hasClass("sparbrief") && $("body").hasClass("antrag")) {
		$.checkLaufzeitSPB($("select#uid232").val()	);
	}
});

$("._checkbox > div").click(
    function () {
    mycheckbox = $(this).prev().find("input[type=checkbox]");
    if (mycheckbox.is(':checked')) {
        mycheckbox.prop("checked", false);
    } else {
        mycheckbox.prop("checked", true);
    }
});

// Ergebnis

$("#uid900_1").parent().click();

$("input#uid901").keyup(
    function () {
    fieldActivity = true;
});

if ($("input[name=responsive_device]").val() == "desktop") {
    $(".iframe .steps li").css("paddingBottom", "5px");
}

$("input#uid901").blur(
    function () {
    if (fieldActivity) {
        fval = $.trim($(this).val());
        msgTxt = "Bitte ausfüllen.";
        result = new Array(1, msgTxt);

        // Tausender
        if (fval.indexOf(".") != -1) {
            num_data = fval.split(".");
            lastbit = num_data[num_data.length - 1];
            if (lastbit.length == 3) {
                num_san = fval.replace(/\./g, "");
                $(this).val(num_san);
                fval = num_san;
            }
        }

        targetDiv = $(this).closest(".form-group");
        targetDivId = targetDiv.attr("id");

        // Leer?
        if (fval == "") {
            result[0] = 0;
        } else {
            // Vorfiltern Texteingaben
            // Geldbeträge
            // Eingabe filtern auf typische Fehleingaben
            mfval = fval.replace(",--", "");
            mfval = mfval.replace(",-", "");
            mfval = mfval.replace(".--", "");
            mfval = mfval.replace(".-", "");
            mfval = mfval.replace(",", ".");
            mfval = Math.round(mfval);
            summe_regex = /^\+?[0-9]*\.?[0-9]+$/;
            if (!summe_regex.test(mfval)) {
                result[0] = 0;
                result[1] = "Bitte geben Sie eine ganzzahlige Summe ein.";
            } else {
                $("#uid901").val(mfval);
                fval = mfval;
            }
            if (parseInt(fval) > parseInt($("input[name='kreditrahmen_calc']").val())) {
                result[0] = 0;
                result[1] = "Wir können Ihnen aktuell maximal " + $("input[name='kreditrahmen_calc_txt']").val() + ",- € sofort überweisen.";
                $.showError($(this).parent(), result[1]);
            } else if (parseInt(fval) < 100) {
                result[0] = 0;
                result[1] = "Die Summe muss mindestens 100,- € betragen.";
                $.showError($(this).parent(), result[1]);
            }
        }

        if (result[0] == 1) {
            $.showSuccess(targetDiv);
            if (parseInt(fval) == parseInt($("input[name='kreditrahmen_calc']").val())) {
                $("input[name='verfuegung']").val(2);
            } else {
                $("input[name='verfuegung']").val(1);
            }
        } else {
            formok = false;
            $.showError(targetDiv, result[1]);
        }
    }
});
$("#sofortueberweisung div.btn-reset,#sofortueberweisung button[type=submit]").not("form#check24 button[type=submit]").click(
    function (event) {
    event.preventDefault();
	// Verfügungshöhe
    if ($(this).attr("class").indexOf("btn-reset")!=-1) {
        $("input[name='verfuegung_hoehe']").val(0);
    }
	// Verfügungs-Kennziffer
	if (parseInt($("input[name=verfuegung_hoehe]").val()) == parseInt($("input[name='kreditrahmen_calc']").val())) {
		$("input[name='verfuegung']").val(2);
	} else if (parseInt($("input[name=verfuegung_hoehe]").val()) > 0) {
		$("input[name='verfuegung']").val(1);
	} else {
		$("input[name='verfuegung']").val(0);
	}
	$.ajax({
		type: "POST",
		url: loadSofortUrl,
		data: $("#sofortueberweisung form").serialize(),
		success: function (data) {
			mybetrag = $("input[name=verfuegung_hoehe]").val();
			$("#sofortueberweisung").html("");
			$("#digitalinfos").show();
			// Step 3
			$(".progress > .progress-bar.ergebnis ").removeClass("open").addClass("done");
			$(".progress > .progress-bar.legitimation").addClass("open");
			if($("#digitalinfos").hasClass("withnect")) {
				$(".mainWrap.result h1.csc-firstHeader:eq(0)").text("Jetzt einfach online identifizieren!");
				$("main h2.headline2").text("Unkomplizierter Vertragsabschluss mit digitaler Unterschrift.");
			}
			else {
				$(".mainWrap.result h1.csc-firstHeader:eq(0)").text("Online identifizieren und digital unterschreiben");
				$("main h2.headline2").text("In nur wenigen Minuten papierlos ausweisen");
			}
			$("#digitalinfos input[type=checkbox]").each(function () {
				if ($(this).prop("checked")) {
					$(this).next(".checkator_element").click();
				}
			});
			// Tracking TC FT
			if (tc_vars.order_amount != undefined) {
				tc_vars.order_amount = mybetrag;
				tc_vars.page_name = "Step3_Auswahl-Identifikation";
				tC.container.reload({
					events: {
						pageview: [{}, {}
						]
					}
				});
			}
			jumpTop();
		}
	});
});

// Kalender

jQuery.checkCallbackData = function (fval) {
    $("#uid110").blur();
}

$("input[name=verfuegung_hoehe]").focus(
    function () {
    if ($(this).val().indexOf("–") != -1) {
        $(this).val("");
    }
});

// FINAL

var antragState = 0;

function OpenInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

function ausdrucken(mylink, myvorgangsid, mypartnerid, mysnippetfile) {
    // open pdf
    OpenInNewTab(mylink);
    // get result page
    $.ajax({
        type: "POST",
        url: loadAusdruckenUrl,
        data: "pdflink=" + mylink + "&vorgangsid=" + myvorgangsid + "&partnerid=" + mypartnerid + "&snippetfile=" + mysnippetfile + "&responsive=1",
        success: function (data) {
            $.antragFinal(data);
        }
    });
}

function zusenden(myvorgangsid, mypartnerid, mysnippetfile) {
    if (antragState == 0) {
        $.ajax({
            type: "POST",
            url: loadZusendenUrl,
            data: "vorgangsid=" + myvorgangsid + "&partnerid=" + mypartnerid + "&snippetfile=" + mysnippetfile,
            success: function (data) {
                $.antragFinal(data);
            }
        });
    }
}

function videolegi(myvorgangsid, mypartnerid) {
    if ($("#videoident").hasClass("deactivated")) {
		if($("#digitalinfos").hasClass("withnect")) {
			$("#videoauswahl div.webid div.errMsg").show();
		}
		else {
			$("#digitalinfos div.inlineBtn div.errMsg").show();
		}
    } else {
        formok = true;
        if (antragState == 0) {
			if($("#digitalinfos").hasClass("withnect")) {
				cbcontainer=$("#videoauswahl .webid input[type=checkbox]:visible");
			}
			else {
				cbcontainer=$("#digitalinfos input[type=checkbox]:visible");
			}
            cbcontainer.each(function () {
                if (!$(this).prop("checked")) {
                    formok = false;
                    $(this).next(".checkator_element").addClass("error_cb");
                    if ($(this).closest(".checkbox.form-group").find(".error_checkbox").length == 0) {
                        $(this).closest(".checkbox.form-group").append("<div class='error_checkbox'>Bitte bestätigen.</div>");
                    }
                } else {
                    $(this).next(".checkator_element").removeClass("error_cb");
                    $(this).closest(".checkbox.form-group").find("div.error_checkbox").remove();

                }
            });
            if (formok) {
                if($("#digitalinfos").length>0) {
					$("#digitalinfos").hide();
				}
				if($("#videoauswahl").length>0) {
					$("#videoauswahl").hide();
				}
                $("#warten").show();
                $(".card").css("border","0");
                $("main h1").text("Es geht sofort weiter.");
                $("main h2.headline2").text("Bitte haben Sie einen Moment Geduld. Sie werden zu WebID weitergeleitet.");
                jumpTop();
                // Step 4
                $(".progress > .progress-bar.legitimation.open").removeClass("open").addClass("done");
                $.ajax({
                    type: "POST",
                    url: loadVideoUrl,
                    data: "vorgangsid=" + myvorgangsid + "&partnerid=" + mypartnerid,
                    success: function (data) {
                        if (data == 9) {
                            $.videoerror();
                        } else {
                            if (data.indexOf("http") != -1) {
                                window.location.href = data;
                            } else {
                                $.videoerror();
                            }
                        }
                    }
                });
            }
        }
    }
}

// Max. number of attempts
var maxnects=10;
var nectcounter=0;

function nect_cancel() {
	// Get back to initial selection page
	$("#warten").hide();
	$("#digitalinfos").show();
	if($("#digitalinfos p.bodytext").text().indexOf("Leider")==-1) {
		$("#digitalinfos > div > form > div:eq(1)").remove();
		$("#digitalinfos > div > form > div:eq(0)").remove();
		$("#digitalinfos > div > form > div.form-group").css("textAlign","left");
		$("#digitalinfos > div > form > h5").remove();
		$("#digitalinfos > div > form > p").remove();
		$("#digitalinfos > div > form > div.form-group").prepend("<div><p class='bodytext'>Leider gab es einen technischen Fehler bei der Weiterleitung zu unserem Partner Nect. Bitte wählen Sie Ihr weiteres Vorgehen.</p></div>");
		$("#digitalinfos > div > form div.centeredBtn").prepend($("a#postident"));
		$("a#postident").css("marginRight","15px");
		$(".progress > .progress-bar.legitimation.done").removeClass("done").addClass("open");
	}
}

function nect_getToken() {
	$.ajax({
		type: "POST",
		url: loadNectUrl,
		data: "d=",
		success: function (bearer) {
			if(bearer==9) {
				if(nectcounter<maxnects) {
					nectcounter++;
					setTimeout("nect_getToken()",200);
				}
				else {
					nect_cancel();
				}
			}
			else {
				nect_postData(bearer);
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			nect_cancel();
		}
	});
}

function nect_postData(bearer) {
	token_regex = /^[A-Za-z0-9-]+$/;
	if (token_regex.test(bearer)) {

		// Get form data
		nextjson_obj = $('#videoauswahl form:eq(0)').serializeObject();
		nextjson = JSON.stringify(nextjson_obj);
		nextjson = encodeURIComponent(nextjson);
		$.ajax({
			type: "POST",
			url: loadNect2Url,
			data: "b="+bearer+"&d="+nextjson,
			success: function (necturl) {
				if(necturl==9) {
					nect_cancel();
				}
				else {
					//alert(necturl);
					window.location.href=necturl;
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				nect_cancel();
			}
		});
	}
	else {
		nect_cancel();
	}
}

function nect() {
    formok = true;
    if (antragState == 0) {
        $("#videoauswahl .nect input[type=checkbox]:visible").each(function () {
            if (!$(this).prop("checked")) {
                formok = false;
                $(this).next(".checkator_element").addClass("error_cb");
                if ($(this).closest(".checkbox.form-group").find(".error_checkbox").length == 0) {
                    $(this).closest(".checkbox.form-group").append("<div class='error_checkbox'>Bitte bestätigen.</div>");
                }
            } else {
                $(this).next(".checkator_element").removeClass("error_cb");
                $(this).closest(".checkbox.form-group").find("div.error_checkbox").remove();

            }
        });
        if (formok) {
            $("#digitalinfos").hide();
            $("#videoauswahl").hide();
            $("#warten").show();
            $("main h1").text("Es geht sofort weiter.");
            $("main h2.headline2").text("Bitte haben Sie einen Moment Geduld. Sie werden zu Nect weitergeleitet.");
            jumpTop();
            // Step 4
            $(".progress > .progress-bar.legitimation.open").removeClass("open").addClass("done");
            $('#videoauswahl form input[name=mainDebtor_NECTDATAAGB_VN]').remove();
			
			// Bearer get token
			nect_getToken();
		}
	}
}

function videozurueck(myvorgangsid, mypartnerid) {
    if (antragState == 0) {
        $("#uid300,#uid304").prop("checked", false);
        $("#uid300,#uid304").next(".checkator_element").removeClass("error_cb");
        $("#uid300,#uid304").closest(".checkbox.form-group").find("div.error_checkbox").remove();
        $("#digitalinfos").show();
        jumpTop();
		if($("#digitalinfos").hasClass("withnect")) {
			$(".mainWrap.result h1.csc-firstHeader:eq(0)").text("Jetzt nur noch sicher online identifizieren und Antrag abschließen!");
		}
		else {
			$(".mainWrap.result h1.csc-firstHeader:eq(0)").text("Jetzt nur noch sicher online legitimieren und Antrag abschließen!");
		}
		$("main h2.headline2").text("Fast geschafft! Wir müssen Sie jetzt nur noch anhand eines gültigen Ausweisdokuments identifizieren.");
        $("#postidentinfos").hide();
        // Tracking TC FT
        if (tc_vars.order_amount != undefined) {
            tc_vars.order_amount = mybetrag;
            tc_vars.page_name = "Step3_Auswahl-Identifikation";
            tC.container.reload({
                events: {
                    pageview: [{}, {}
                    ]
                }
            });
        }
    }
}

$("a#videoidentAuswahl").click(function (e) {
    $(".mainWrap.result h1.csc-firstHeader:eq(0)").text("Wählen Sie aus!");
    $("main h2.headline2").text("Hier können Sie sich für das Verfahren entscheiden, das am besten zu Ihnen passt. Sie haben die zwei folgenden Möglichkeiten:");
    $("#digitalinfos").hide();
    $("#videoauswahl").show();
	// Tracking TC Online Ident.
    if (tc_vars.page_name != undefined) {
		tc_vars.page_name = "Step3_Auswahl-Online-Ident";
		tC.container.reload({
			events: {
				pageview: [{}, {}
				]
			}
		});
	}
});

$("a#postident").click(function (e) {
    e.preventDefault();
    $("#digitalinfos").hide();
    $("#postidentinfos").show();
    $(".mainWrap.result h1.csc-firstHeader:eq(0)").text("So einfach geht es weiter!");
    $("main h2.headline2").text("Folgende Schritte fehlen noch, damit Sie so schnell wie möglich Ihre " + produktTxt + " erhalten:");
    $.equalheight();
    // Tracking TC PostIdent.
    if (tc_vars.page_name != undefined) {
        tc_vars.page_name = "Step4_Vertrag-anfordern";
        tC.container.reload({
            events: {
                pageview: [{}, {}
                ]
            }
        });
    }
    if ($(this).hasClass("hadVideoError")) {
        //$("#videozurueck").remove();
    }
    jumpTop();
});

// Slider
function startSlider() {
	if ($('form#ueberweisung input[type="range"]').length > 0 || $('div#sofortueberweisung input[type="range"]').length > 0) {
		var betrag = "";
		if ($("div#sofortueberweisung").length > 0) {
			betragsfeld = "verfuegung_hoehe";
		} else {
			betragsfeld = "betrag";
		}
		$('input[type="range"]').rangeslider({
			polyfill: false,
			onInit: function () {
				betrag = this.$element.val().toString();
				if (this.$element.val() > 999) {
					betrag = betrag.slice(0, 1) + "." + betrag.slice(1);
					$("#FTBetrag").addClass("xtraLarge");
				} else {
					betrag = this.$element.val();
					$("#FTBetrag").removeClass("xtraLarge");
				}
				this.output = $("#betragsselector label").html(betrag);
				this.output2 = $("input[name=" + betragsfeld + "]").val(betrag);
				this.output3 = $("#FTBetrag").html(betrag);

				$rangeEl = this.$range;
				var $handle = $rangeEl.find('.rangeslider__handle');
				var handleValue = '<div class="rangeslider__handle__value">' + this.value + '</div>';
				$handle.append(handleValue);

				// get range index labels
				if (this.$element.attr('labels') != undefined) {
					var rangeLabels = this.$element.attr('labels');
					rangeLabels = rangeLabels.split(',');

					// add labels
					$rangeEl.append('<div class="rangeslider__labels"></div>');
					$(rangeLabels).each(function (index, value) {
						kaufm_value = value.toString();
						if (value > 999) {
							kaufm_value = kaufm_value.slice(0, 1) + "." + kaufm_value.slice(1);
						} else {
							kaufm_value = value;
						}
						kaufm_value += " €";
						$rangeEl.find('.rangeslider__labels').append('<span class="rangeslider__labels__label">' + kaufm_value + '</span>');
					});
				}
			},
			onSlide: function (position, value) {
				if (value > 999) {
					betrag = value.toString();
					betrag = betrag.slice(0, 1) + "." + betrag.slice(1);
					$("#FTBetrag").addClass("xtraLarge");
			   } else {
					betrag = value;
					$("#FTBetrag").removeClass("xtraLarge");
			   }
				this.output.html(betrag);
				this.output2.val(value);
				this.output3.html(betrag);
		   }
		});
	}
}

startSlider();

$("form#videolegitimation").submit(function (e) {
    e.preventDefault();
    videolegi();
});

// Extern
$("form#check24 button").click(function (event) {
    event.preventDefault();
    formok = true;
    getFirstErrFlag = false;
    clickSubmit = 1;
	msgTxt="";
    result = new Array(1, msgTxt);
    $("form input[type=text]:visible, form input[type=tel]:visible, form input[type=email]:visible, form select:visible, form input[type=checkbox]:visible, form .btn-group .btn-primary:visible, form textarea:visible").each(function () {
        if ($(this).attr("type") == "checkbox") {
            if (!$(this).prop("checked")) {
                formok = false;
                $(this).next(".checkator_element").addClass("error_cb");
                if ($(this).closest(".checkbox.form-group").find(".error_checkbox").length == 0) {
                    $(this).closest(".checkbox.form-group").append("<div class='error_checkbox'>Bitte bestätigen.</div>");
                }
            } else {
                $(this).next(".checkator_element").removeClass("error_cb");
                $(this).closest(".checkbox.form-group").find("div.error_checkbox").remove();
            }
        } else if ($(this).prop("type") != "checkbox" && $(this).prop("tagName").toLowerCase() != "label") {
            $(this).blur();
        }
        if (formok == false && getFirstErrFlag == false) {
            getFirstErrFlag = true;
            firstErrElem = $(this);
        }
    });
    if (formok) {
        myform = $(this).closest("form");
        $.ajax({
            type: 'POST',
            url: loadCheck24Url,
            data: "url=" + myform.attr("action") + "&" + myform.serialize(),
            success: function (data) {
                if (data == "9") {
                    msgTxt = "Technischer Fehler vor Connect-Versuch.";
                    if ($(".additionalContent.red .errorBlockMsg").length == 0) {
                        $(".additionalContent.red button").after("<div class='errorBlockMsg'>Leider gab es einen technischen Fehler bei der Weiterleitung zu unserem Partner WebID. Bitte versuchen Sie es später noch einmal.</div>");
                    }
                } else if (data.substr(0, 5) == "error") {
                    msgTxt = "Technischer Fehler bei Connect-Versuch.";
                    if ($(".additionalContent.red .errorBlockMsg").length == 0) {
                        $(".additionalContent.red button").after("<div class='errorBlockMsg'>Leider gab es einen technischen Fehler bei der Weiterleitung zu unserem Partner WebID. Bitte versuchen Sie es später noch einmal.</div>");
                    }
                } else {
                    msgTxt = "Die Weiterleitung zu Check24 war erfolgreich.";
                    if (data.indexOf("https") == 0) {
                        window.location.href = data;
                    } else {
                        msgTxt = "Technischer Fehler bei Connect-Versuch.";
                    }
                }
            },
            error: function (data) {
                return false;
            }
        });
    } else {
        var firstErrPar = "";
        var offs = 0;
        if (firstErrElem != undefined) {
            firstErrPar = firstErrElem.closest(".form-group");
            offs = -10;
        }
        scrollto(firstErrPar);
        clickSubmit = 0;
    }
});

$("a#videoidentStart").click(function (event) {
    event.preventDefault();
    $("#videoauswahl").hide();
    $("#digitalinfos").show();
    $(".mainWrap.result h1.csc-firstHeader:eq(0)").text("Jetzt einfach online identifizieren!");
    $("main h2.headline2").text("Unkomplizierter Vertragsabschluss mit digitaler Unterschrift.");
});

$("input.date").focus(function () {
    if ($(this).val() == "MM.JJJJ" || $(this).val() == "TT.MM.JJJJ") {
        $(this).val("");
    }
});

$("input[type=tel]").bind("keyup blur", function (e) {
    if ($(this).hasClass("date") && $("input[name=android]") != undefined) {
        if ($("input[name=android]").val() == 1) {
            if ($(this).prop("placeholder") == "TT.MM.JJJJ") {
                $(this).prop("placeholder", "");
            }
            if (e.type == "keyup" && e.keyCode != 8 && e.keyCode != 46) {
                // Check String
                fval = $(this).val();
                flength = fval.length;
                if ((flength == 2 && fval.indexOf(".") == -1) || (flength == 5 && fval.indexOf(".") == 2)) {
                    $(this).val($(this).val() + ".");
                }
                if (fval.substr(-1) == "." && fval.indexOf("..") != -1) {
                    fval = fval.substr(0, flength - 1);
                    $(this).val(fval);
                }
            }
        }
    }
});

// Punkt-Ergänzung
$("input.date").bind("keyup blur", function (e) {
    //$("input[type=text].date").bind("keyup blur", function(e) {
    if (e.type == "keyup" && e.keyCode != 8 && e.keyCode != 46) {
        // Check String
        fval = $(this).val();
        flength = fval.length;
		if ((flength == 2 && fval.indexOf(".") == -1)) {
			$(this).val($(this).val() + ".");
		}
		if(!$(this).hasClass("month")) {
			if (flength == 5 && fval.indexOf(".") == 2) {
				$(this).val($(this).val() + ".");
			}
		}
        if (fval.substr(-1) == "." && fval.indexOf("..") != -1) {
            fval = fval.substr(0, flength - 1);
            $(this).val(fval);
        }
    }
});

/* SparBriefe Referenzkonto */
$("select#uid12").bind("change blur",
    function () {
    typ = $("#uid12").val();
    // Dyn. Sparbrief
    if ($("body").hasClass("sparbriefdynamik")) {
        if (typ == "A") {
            $(".tx-powermail-pi1_fieldset_2").show();
        } else if (typ == "B") {
            $(".tx-powermail-pi1_fieldset_2").hide();
        }
    }
    // Sparbrief
    else if ($("body").hasClass("sparbrief")) {
        if (typ == "1") {
            $(".tx-powermail-pi1_fieldset_2").show();
        } else if (typ == "2") {
            $(".tx-powermail-pi1_fieldset_2").hide();
        }
    }
});

$(".unfold").click(function (event) {
    $(this).parent().parent(".foldIn").hide();
    $(this).parent().parent(".foldIn").next(".foldOut").show();
	$(this).closest(".bottom").addClass("is-open");
});
$(".fold").click(function (event) {
    $(this).parent().parent(".foldOut").hide();
    $(this).parent().parent(".foldOut").prev(".foldIn").show();
	$(this).closest(".bottom").removeClass("is-open");
});

// Adserver-Panel einblenden
$(".popupLayer .close").click(function() {
	$(this).parent().hide();
    setTimeout('$("div#postidentinfos .adservercontent").show();',300);
});

// VIdeo-Info einblenden
$(".info-button").click(function() {
	$(".videoinfo-popup").addClass("show");
});
$(".videoinfo-popup .cross").click(function() {
	$(".videoinfo-popup").removeClass("show");
});

// LP Geburtstagsabfrage
$("form#geburtsdatum").on("submit", function(e) {
	e.preventDefault();
	$.ajax({
		type: "POST",
		url: loadLPGeburtstag,
		data: $("form#geburtsdatum").serialize(),
		success: function (data) {
			okdata = data.slice(0, 2);
			if (okdata == "91") {
				$.showError($("#formdiv_uid929"), "Leider gab es einen technischen Fehler.");
			} 
			else if (okdata == "92") {
				$.showError($("#formdiv_uid929"), "Das Geburtsdatum stimmt nicht mit unserem Datenbestand überein.");
			}
			else if (okdata == "93") {
				myurl=window.location.href;
				myurl+="&ident=error";
				window.location.href=myurl;
			}
			 // Success
			else {
				$("#lpcontent").css("visibility","hidden");
				$("#lpcontent").html(data);
				setTimeout('$("#lpcontent").css("visibility","visible");',500);
				setTimeout('$("#lpcontent").fadeIn(500);',200);
				startSlider();
			}
		}
	});
});