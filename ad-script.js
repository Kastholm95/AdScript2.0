/*jslint browser: true*/
/*jshint esnext:true */
/*global console, XPathResult, Element, performance, CSS, window, atob, __cmp, antag */
/** @preserve
 * MGDK Ad Scripts                                   
 * Last modified: 2024-04-26
 * By: Marc
 * 
 * For the content of this script tag applies
 * Copyright (C) 2024 Media Group Denmark ApS
 */

/* Google ESP */

window.ID5EspConfig = {
    partnerId: 1254
};


/*mgdk*/


var usingIabCMP, googletag, pbjs, PREBID_TIMEOUT, myPrebidTimeout, prebidEnabled, mobileMaxViewportWidth, tabletMinViewportWidth, tabletMaxViewportWidth, desktopMinViewportWidth, is_mobile, is_desktop, connectionNG, slot_Mobile_Article_1, slot_Mobile_Article_2, slot_Mobile_Article_3, slot_Mobile_Article_4, slot_Mobile_Article_5, slot_Mobile_Article_6, slot_Mobile_Article_7, slot_Mobile_Article_8, slot_930x180_1, slot_930x180_2, slot_930x180_3, slot_InFeed_1, slot_InText_1, slot_InText_2, slot_InText_3, slot_InText_4, slot_InText_5, slot_160x600_L, slot_160x600_R, slot_1x1, slot_Mobile_InFeed_1, slot_Mobile_InFeed_2, slot_Mobile_Anchor, adslotStates, contentAreaMaxWidth, deviceClassification, testSupportsES6, supportsES6, browserName, pageVariables, cookieCMP, tcString, paragraphCSS3Selector, paragraphCSS2Selector;
PREBID_TIMEOUT = 1500;
mobileMaxViewportWidth = 727;
tabletMaxViewportWidth = 767;
contentAreaMaxWidth = 1280;
usingIabCMP = true;
cookieCMP = "GAM";

//Definer hvor reklamer må vises.
paragraphCSS3Selector = "div.articleText > :not(:empty):not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not(p:has(strong))";

paragraphCSS2Selector = "div.articleText > p";

pageVariables = {}; /* In Javascript objects and arrays are passed by reference - https://flexiple.com/javascript-pass-by-reference-or-value. */

function printError(err, msg) {
    if (msg !== undefined) {
        console.log("%c** " + msg + " **", 'background:orange;color:#fff');
    }
    console.log("%cERROR: " + err.name + "\n" + err.stack, "color:red");
}

function printWarn(err, msg) {
    if (msg !== undefined) {
        console.log("%c* " + msg + " *", 'background:orange;color:#fff');
    }
    console.log("%cWARN: " + err.name + "\n" + err.stack, "color:yellow");
}

function printInfo(msg) {
    console.log("%cINFO: " + msg, "background:blue;color:#fff");
}

function getViewportWidth() {
    "use strict";
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

function getViewportHeight() {
    "use strict";
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}
pageVariables["viewport-width"] = getViewportWidth();
pageVariables["viewport-height"] = getViewportHeight();
tabletMinViewportWidth = mobileMaxViewportWidth + 1;
desktopMinViewportWidth = tabletMaxViewportWidth + 1;
deviceClassification = pageVariables["viewport-width"] >= desktopMinViewportWidth ? "desktop" : pageVariables["viewport-width"] >= tabletMinViewportWidth ? "tablet" : "mobile";
is_mobile = pageVariables["viewport-width"] <= mobileMaxViewportWidth;
is_desktop = !is_mobile;

testSupportsES6 = function() {
    "use strict";
    try {
        new Function("(a = 0) => a"); // jshint ignore:line
        return true;
    } catch (err) {
        printWarn(err, "ES6 not supported");
        return false;
    }
};
supportsES6 = testSupportsES6();


function rollDice(min, max) {
    "use strict";
    return min + Math.floor(Math.random() * (max - min + 1));
}
pageVariables["dice"] = rollDice(1, 6).toString();

function getBrowserName() {
    "use strict";
    try {
        if ((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) {
            return "Opera";
        }
        var uau = navigator.userAgent || navigator.vendor;
        if ((uau.indexOf("FBAN") > -1) || (uau.indexOf("FBAV") > -1)) {
            return "FacebookInApp";
        } else if ((uau.indexOf("Instagram") > -1)) {
            return "Instagram";
        } else if ((uau.indexOf("android") > -1)) {
            return "Android";
        } else if ((uau.indexOf("Firefox") > -1)) {
            return "Firefox";
        } else if ((uau.indexOf("SamsungBrowser") > -1)) {
            return "Samsung";
        }
        var uav = navigator.vendor || navigator.userAgent;
        if ((uav.indexOf('Apple') > -1)) {
            return "Safari";
        } else if (typeof CSS !== 'undefined' && CSS.supports("(-ms-ime-align:auto)")) {
            return "Edge";
        } else if ((uav.indexOf("Google") > -1)) {
            return "Chrome";
        } else {
            return "Minor";
        }
    } catch (err) {
        printError(err, "Failed to detect browser");
        return "Minor";
    }
}
browserName = getBrowserName();

/* Change ad sizes STEP */
function getAdSizes(format, extendedSizes) {
    console.assert(pageVariables["viewport-width"] !== undefined, "pageVariables['viewport-width'] not defined before calling getAdSizes()");
    extendedSizes = extendedSizes || [];
    /*
    getAdSizes("board")
    getAdSizes("intext")
    getAdSizes("square")
    getAdSizes("mobile")
    getAdSizes("mobile320x480")
    getAdSizes("pixel")
    getFluidAdSizes("belowTitleImage")
    */
    var result;
    switch (format.toLowerCase()) {
        case "infeed":
        case "in-feed":
            if (pageVariables["viewport-width"] >= desktopMinViewportWidth) {
                result = [
                    [300, 600],
                    [300, 250]
                ];
            } else {
                result = []; //COLLAPSE
            }
            break;
        case "topboard":
            if (is_desktop) {
                if (pageVariables["viewport-width"] >= 1200) {
                    result = [
                        [728, 90],
						[930, 180],
						[970, 66],
                        [970, 90],
                        [970, 250],
						[980, 120]
                    ];
                } else if (pageVariables["viewport-width"] >= 980) {
                    result = [
                        [728, 90],
						[930, 180],
						[970, 66],
                        [970, 90],
                        [970, 250],
						[980, 120]
                    ];
                } else if (pageVariables["viewport-width"] >= 970) {
                    result = [
                        [728, 90],
						[930, 180],
						[970, 66],
                        [970, 90],
                        [970, 250]
                    ];
                } else if (pageVariables["viewport-width"] >= 930) {
                    result = [
                        [728, 90],
						[930, 180]
                    ];
                } else if (pageVariables["viewport-width"] >= 728) {
                    result = [
                        [728, 90],
                    ];
                } else {
                    result = []; //COLLAPSE
                }
            } else {
                result = []; //COLLAPSE
            }
            break;
        case "board":
            if (is_desktop) {
                if (pageVariables["viewport-width"] >= 1200) {
                    result = result = [
                        [728, 90],
						[930, 180],
						[930, 600],
						[970, 66],
                        [970, 90],
                        [970, 250],
						[980, 120]
                    ];
                } else if (pageVariables["viewport-width"] >= 980) {
                    result = [
                        [728, 90],
						[930, 180],
						[930, 600],
						[970, 66],
                        [970, 90],
                        [970, 250],
						[980, 120]
                    ];
                } else if (pageVariables["viewport-width"] >= 970) {
                    result = [
                        [728, 90],
						[930, 180],
						[930, 600],
						[970, 66],
                        [970, 90],
                        [970, 250]
                    ];
                } else if (pageVariables["viewport-width"] >= 930) {
                    result = [
                        [728, 90],
						[930, 180],
						[930, 600]
                    ];
                } else if (pageVariables["viewport-width"] >= 728) {
                    result = [
                        [728, 90]
                    ];
                } else {
                    result = [];
                }
            } else {
                result = [];
            }
            break;
        case "intext":
        case "in-text":
            if (is_desktop) {
                result = [
                    [300, 250],
                    [336, 280],
                    [250, 250],
                    [250, 360]

                ];
                if (pageVariables["viewport-width"] >= 1280) {
                    result = result.concat([
                        [728, 90],
						[930, 180]
                    ]);
                }
            } else {
                result = []; //COLLAPSE
            }
            break;
        case "mobile":
            if (is_mobile) {
                result = [
                    [300, 50],
                    [300, 100],
                    [300, 250],
                    [320, 50],
                    [320, 80],
                    [320, 100],
                    [320, 160],
                    [320, 180],
                    [320, 250],
                    [320, 320],
                    [336, 280]
                ];
                if (pageVariables["viewport-width"] >= 390) { //text area padding
                    result = result.concat([
                        [360, 300],
                        [360, 360]
                    ]);
                }
            } else {
                result = []; //COLLAPSE
            }
            break;
        case "mobile320x480":
            if (is_mobile) {
                result = [
                    [300, 50],
                    [300, 100],
                    [300, 250],
                    [320, 50],
                    [320, 80],
                    [320, 100],
                    [320, 160],
                    [320, 180],
                    [320, 250],
                    [320, 320],
                    [320, 400],
                    [320, 480],
                    [336, 280]
                ];
                if (pageVariables["viewport-width"] >= 390) { //text area padding
                    result = result.concat([
                        [360, 300],
                        [360, 360]
                    ]);
                }
            } else {
                result = []; //COLLAPSE
            }
            break;
        case "pixel":
            result = [
                [1, 1],
                [1, 2]
            ];
            break;
		case "skyscraper":
			result = [
                [160, 600]
            ];
            break;
        case "anchor":
            result = [
                [728, 90],
                [970, 90],
                [980, 90],
                [990, 90]
            ];
            break;
        case "mobile_anchor":
            result = [
                [320, 100],
                [320, 50]
            ];
            break;
        default:
            result = [
                [300, 250]
            ];
            break;
    }
    if ((result.length > 0) && (extendedSizes.length > 0)) {
        return result.concat(extendedSizes);
    } else {
        return result;
    }
}

function getFluidAdSizes(format) {
    var extendedSizes = [
        "fluid"
    ];
    return getAdSizes(format, extendedSizes);
}

function getResponsiveAdSizes(format) {
    var extendedSizes = [
        [1, 1]
    ];
    return getAdSizes(format, extendedSizes);
}

function getResponsiveFluidAdSizes(format) {
    var extendedSizes = [
        "fluid", [1, 1]
    ];
    return getAdSizes(format, extendedSizes);
}


Element.prototype.setBefore = function(element) {
    "use strict";
    var inserted = false;
    try {
        element.parentNode.insertBefore(this, element);
        inserted = true;
    } catch (err) {
        printError(err, "Failed to setBefore Container: " + (this.id || this.tagName));
    }
    return inserted;
};

Element.prototype.setAfter = function(element) {
    "use strict";
    var inserted = false;
    try {
        element.parentNode.insertBefore(this, element.nextSibling);
        inserted = true;
    } catch (err) {
        printError(err, "Failed to setAfter Container: " + (this.id || this.tagName));
    }
    return inserted;
};

/**
 * Counts the number of paragraphs.
 *
 * @return     {number}  Number of paragraphs.
 */
function countParagraphs() {
    "use strict";
    try {
        return document.querySelectorAll(paragraphCSS3Selector).length;
    } catch (err) {
        if (err.name === "SyntaxError") {
            printWarn(err, "Browser-support handling: Falling back to simple query selector in countParagraphs function");
            return document.querySelectorAll(paragraphCSS2Selector).length;
        }
    }
}

/**
 * Prepends an element according to a paragraph like element
 *
 * @param      {number}   pNum     The preferred paragraph number
 * @param      {number}   pNumMin  The minimum paragraph number
 * @return     {boolean}  true, if the element could be inserted, else false
 */
Element.prototype.setBeforeParagraph = function(pNum, pNumMin) {
    "use strict";
    var nPar = countParagraphs();
    pNumMin = (typeof pNumMin !== 'undefined') ? pNumMin : pNum;
    var inserted = false;
    try {
        if (nPar >= pNumMin) {
            var paragraph;
            try {
                if (nPar >= pNum) {
                    paragraph = document.querySelectorAll(paragraphCSS3Selector)[pNum - 1];
                } else {
                    paragraph = document.querySelectorAll(paragraphCSS3Selector)[nPar - 1];
                }
            } catch (err) {
                if (nPar >= pNum) {
                    paragraph = document.querySelectorAll(paragraphCSS2Selector)[pNum - 1];
                } else {
                    paragraph = document.querySelectorAll(paragraphCSS2Selector)[nPar - 1];
                }
            }
			/*
            if ((paragraph.className.indexOf("instagram") > -1) || (paragraph.className.indexOf("twitter") > -1) || (paragraph.className.indexOf("facebook") > -1) || (paragraph.className.indexOf("video") > -1) || (paragraph.className.indexOf("image") > -1) || (paragraph.className.indexOf("related-articles") > -1)) {
                paragraph = paragraph.parentNode.parentNode;
            }*/
            paragraph.parentNode.insertBefore(this, paragraph);
            inserted = true;
        } else {
            printInfo("Not enough paragraphs to insert " + (this.id || this.tagName));
        }
    } catch (err) {
        printError(err, "Failed to set before paragraph");
    }
    return inserted;
};

/**
 * Appends an element according to a paragraph like element
 *
 * @param      {number}   pNum     The preferred paragraph number
 * @param      {number}   pNumMin  The minimum paragraph number
 * @return     {boolean}  true, if the element could be inserted, else false
 */
Element.prototype.setAfterParagraph = function(pNum, pNumMin) {
    "use strict";
    var nPar = countParagraphs();
    pNumMin = (typeof pNumMin !== 'undefined') ? pNumMin : pNum;
    var inserted = false;
    try {
        if (nPar >= pNumMin) {
            var paragraph;
            try {
                if (nPar >= pNum) {
                    paragraph = document.querySelectorAll(paragraphCSS3Selector)[pNum - 1];
                } else {
                    paragraph = document.querySelectorAll(paragraphCSS3Selector)[nPar - 1];
                }
            } catch (err) {
                if (nPar >= pNum) {
                    paragraph = document.querySelectorAll(paragraphCSS2Selector)[pNum - 1];
                } else {
                    paragraph = document.querySelectorAll(paragraphCSS2Selector)[nPar - 1];
                }
            }
			/*
            if ((paragraph.className.indexOf("instagram") > -1) || (paragraph.className.indexOf("twitter") > -1) || (paragraph.className.indexOf("facebook") > -1) || (paragraph.className.indexOf("video") > -1) || (paragraph.className.indexOf("video") > -1) || (paragraph.className.indexOf("related-articles") > -1)) {
                paragraph = paragraph.parentNode.parentNode;
            }
			*/
            paragraph.parentNode.insertBefore(this, paragraph.nextSibling);
            inserted = true;
        } else {
            printInfo("Not enough paragraphs to insert " + (this.id || this.tagName));
        }
    } catch (err) {
        printError(err, "Failed to set after paragraph");
    }
    return inserted;
};


function isAdunitWithinYOffset(adunitCode, yOffset) {
    "use strict";

    function isVisible(el) {
        try {
            return !!el && (!!el.offsetParent || ((el.style.position === 'fixed') && (el.style.display !== 'none') && (window.getComputedStyle(el).display !== 'none'))) && (el.style.visibility !== 'hidden') && (el.getBoundingClientRect().left >= 0) && (el.getBoundingClientRect().right <= (window.innerWidth || document.documentElement.clientWidth));
        } catch (err) {
            printWarn(err, "Falling back to legacy browser JS");
            return !!el && (!!el.offsetParent || ((el.style.position === 'fixed') && (el.style.display !== 'none'))) && (el.style.visibility !== 'hidden') && (el.getBoundingClientRect().left >= 0) && (el.getBoundingClientRect().right <= (window.innerWidth || document.documentElement.clientWidth));
        }
    }
    try {
        var scrollingTop, viewHeight, bannerTop, lenght, bannerDiv;
        bannerDiv = document.getElementById(adunitCode);
        if (isVisible(bannerDiv)) {
            scrollingTop = document.body.scrollTop + document.documentElement.scrollTop;
            viewHeight = document.documentElement.clientHeight;
            bannerTop = bannerDiv.getBoundingClientRect().top + window.scrollY;
            return (bannerTop - (scrollingTop + viewHeight) - yOffset <= 0);
        } else {
            return false;
        }
    } catch (err) {
        printError(err, "Failed to check yoffset");
        return false;
    }
}

function isParagraphWithinYOffset(pNum, yOffset) {
    "use strict";
    var nPar = countParagraphs();
    if (pNum < 0) { /* looking up from bottom using negative index */
        pNum = nPar + pNum + 1;
    }
    try {
        if (nPar >= pNum) {
            var scrollingTop, viewHeight, paragraphTop, lenght, paragraph;
            try {
                paragraph = document.querySelectorAll(paragraphCSS3Selector)[pNum - 1];
            } catch (err) {
                paragraph = document.querySelectorAll(paragraphCSS2Selector)[pNum - 1];
            }
            if ((paragraph.className.indexOf("instagram") > -1) || (paragraph.className.indexOf("twitter") > -1) || (paragraph.className.indexOf("facebook") > -1) || (paragraph.className.indexOf("video") > -1) || (paragraph.className.indexOf("image") > -1) || (paragraph.className.indexOf("related-articles") > -1)) {
                paragraph = paragraph.parentNode.parentNode;
            }
            scrollingTop = document.body.scrollTop + document.documentElement.scrollTop;
            viewHeight = document.documentElement.clientHeight;
            paragraphTop = paragraph.getBoundingClientRect().top + window.scrollY;
            return (paragraphTop - (scrollingTop + viewHeight) - yOffset <= 0);
        } else {
            return false;
        }
    } catch (err) {
        printError(err, "Failed to detecide if paragraph within offset");
        return false;
    }
}

function getConnectionEffectiveType() {
    "use strict";
    try {
        var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || navigator.msConnection;
        if (connection) {
            return connection.effectiveType;
        }
        return "unknown";
    } catch (err) {
        printWarn(err, "Could not detect connection effective type");
        return "unknown";
    }
}

connectionNG = getConnectionEffectiveType();

function getCanonicalURL() {

    function isValidWebUrl(url) {
        let regEx = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
        return regEx.test(url);
    }
    var b, a;
    if (!window.hasOwnProperty("evaluate") || !window.hasOwnProperty("XPathResult")) {
        b = document.querySelector('link[rel~="canonical"]');
    } else {
        b = document.evaluate("//link[@rel='canonical']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
    if (b === null) {
        a = window.location.href;
    } else {
        a = b.getAttribute("href");
        if (!isValidWebUrl(a)) {
            a = window.location.href;
        }
    }
    return a;
}
pageVariables["canonical-url"] = getCanonicalURL();

function getPathbaseName() {
    "use strict";
    console.assert(pageVariables["canonical-url"] !== undefined, "pageVariables['canonical-url'] not defined before calling getPathbaseName()");
    var cUrl = pageVariables["canonical-url"];
    var result = cUrl.substring(document.location.protocol.length + 2 + document.domain.length, cUrl.length);
    if ((result.length > 1) && result.endsWith("/")) {
        result = result.slice(0, -1);
    }
    return result;
}
pageVariables['pathbasename'] = getPathbaseName();



function is404Page() {
    "use strict";
    try {
        return (document.querySelector("title").innerText === '404: This page could not be found.') ? "Yes" : "No";
    } catch (err) {
        return false;
    }
}
pageVariables["404"] = is404Page();

function getSubsectionCategory() {
    "use strict";
    console.assert(pageVariables["pathbasename"] !== undefined, "pageVariables['pathbasename'] not defined before calling getSubsectionCategory()");
    var result;
    var nDirectories = getPathbaseName().split("/").length - 1;
    if (nDirectories < 0) {
        nDirectories = 0;
    }
    if (pageVariables["pathbasename"] === "/") {
        result = "frontpage";
    } else {
		if (['/artikler/kategori/nyheder', '/artikler/kategori/aktier', '/artikler/kategori/skat', '/artikler/kategori/budgeter' , '/artikler/kategori/spare-hacks'].indexOf(pageVariables["pathbasename"]) > -1) {
			result = "subsection-frontpage";
		} else {
			var pageTypeMeta = document.querySelector('meta[property~="og:type"]');
			if (!!pageTypeMeta && (pageTypeMeta.content === 'article')) {
				result = "articlepage";
			} else {
				result = "basepage";
			}
		}
    }
    return result;
}

//subsection_category = getSubsectionCategory();
pageVariables["subsection-category"] = getSubsectionCategory();

function getNewsCategory() {
    console.assert(pageVariables["subsection-category"] !== undefined, "pageVariables['subsection-category'] not defined before calling getNewsCategory()");
    var result;
    var subsection_category = pageVariables["subsection-category"];
	if (subsection_category === "articlepage") {
		var sectionTypeMeta = document.querySelector('meta[property~="article:section"]');
		if (!!sectionTypeMeta) {
			result = sectionTypeMeta.content;
		} else {
			result = "Finance";
		}
	} else if (subsection_category === "subsection-frontpage") {
        result = "Finance";
    } else {
        result = "Economy";
    }
    return result.toLowerCase();
}
//news_category = getNewsCategory();
pageVariables["news-category"] = getNewsCategory();

function getSectionIAB(section) { //TODO: translate
    "use strict";
    var iab = {
        "nyheder": "IAB12",
		"økonomi": "IAB13-3",
        "aktier": "IAB13-11",
        "skat": "IAB13-12",
        "budgeter": "IAB13-4",
        "spare-hacks": "IAB13"
    };
    if (iab.hasOwnProperty(section)) {
        return iab[section];
    } else {
        return "IAB13";
    }

}
pageVariables["sectioncat"] = getSectionIAB(pageVariables["news-category"]);

function getSectionIABName(iabCategory) {
    "use strict";
    var iab = {
        "IAB1": "Arts & Entertainment",
        "IAB1-1": "Books & Literature",
        "IAB1-2": "Celebrity Fan/Gossip",
        "IAB1-3": "Fine Art",
        "IAB1-4": "Humor",
        "IAB1-5": "Movies",
        "IAB1-6": "Music",
        "IAB1-7": "Television",
        "IAB2": "Automotive",
        "IAB2-1": "Auto Parts",
        "IAB2-2": "Auto Repair",
        "IAB2-3": "Buying/Selling Cars",
        "IAB2-4": "Car Culture",
        "IAB2-5": "Certified Pre-Owned",
        "IAB2-6": "Convertible",
        "IAB2-7": "Coupe",
        "IAB2-8": "Crossover",
        "IAB2-9": "Diesel",
        "IAB2-10": "Electric Vehicle",
        "IAB2-11": "Hatchback",
        "IAB2-12": "Hybrid",
        "IAB2-13": "Luxury",
        "IAB2-14": "MiniVan",
        "IAB2-15": "Mororcycles",
        "IAB2-16": "Off-Road Vehicles",
        "IAB2-17": "Performance Vehicles",
        "IAB2-18": "Pickup",
        "IAB2-19": "Road-Side Assistance",
        "IAB2-20": "Sedan",
        "IAB2-21": "Trucks & Accessories",
        "IAB2-22": "Vintage Cars",
        "IAB2-23": "Wagon",
        "IAB3": "Business",
        "IAB3-1": "Advertising",
        "IAB3-2": "Agriculture",
        "IAB3-3": "Biotech/Biomedical",
        "IAB3-4": "Business Software",
        "IAB3-5": "Construction",
        "IAB3-6": "Forestry",
        "IAB3-7": "Government",
        "IAB3-8": "Green Solutions",
        "IAB3-9": "Human Resources",
        "IAB3-10": "Logistics",
        "IAB3-11": "Marketing",
        "IAB3-12": "Metals",
        "IAB4": "Careers",
        "IAB4-1": "Career Planning",
        "IAB4-2": "College",
        "IAB4-3": "Financial Aid",
        "IAB4-4": "Job Fairs",
        "IAB4-5": "Job Search",
        "IAB4-6": "Resume Writing/Advice",
        "IAB4-7": "Nursing",
        "IAB4-8": "Scholarships",
        "IAB4-9": "Telecommuting",
        "IAB4-10": "U.S. Military",
        "IAB4-11": "Career Advice",
        "IAB5": "Education",
        "IAB5-1": "7-12 Education",
        "IAB5-2": "Adult Education",
        "IAB5-3": "Art History",
        "IAB5-4": "Colledge Administration",
        "IAB5-5": "College Life",
        "IAB5-6": "Distance Learning",
        "IAB5-7": "English as a 2nd Language",
        "IAB5-8": "Language Learning",
        "IAB5-9": "Graduate School",
        "IAB5-10": "Homeschooling",
        "IAB5-11": "Homework/Study Tips",
        "IAB5-12": "K-6 Educators",
        "IAB5-13": "Private School",
        "IAB5-14": "Special Education",
        "IAB5-15": "Studying Business",
        "IAB6": "Family & Parenting",
        "IAB6-1": "Adoption",
        "IAB6-2": "Babies & Toddlers",
        "IAB6-3": "Daycare/Pre School",
        "IAB6-4": "Family Internet",
        "IAB6-5": "Parenting - K-6 Kids",
        "IAB6-6": "Parenting teens",
        "IAB6-7": "Pregnancy",
        "IAB6-8": "Special Needs Kids",
        "IAB6-9": "Eldercare",
        "IAB7": "Health & Fitness",
        "IAB7-1": "Exercise",
        "IAB7-2": "A.D.D.",
        "IAB7-3": "AIDS/HIV",
        "IAB7-4": "Allergies",
        "IAB7-5": "Alternative Medicine",
        "IAB7-6": "Arthritis",
        "IAB7-7": "Asthma",
        "IAB7-8": "Autism/PDD",
        "IAB7-9": "Bipolar Disorder",
        "IAB7-10": "Brain Tumor",
        "IAB7-11": "Cancer",
        "IAB7-12": "Cholesterol",
        "IAB7-13": "Chronic Fatigue Syndrome",
        "IAB7-14": "Chronic Pain",
        "IAB7-15": "Cold & Flu",
        "IAB7-16": "Deafness",
        "IAB7-17": "Dental Care",
        "IAB7-18": "Depression",
        "IAB7-19": "Dermatology",
        "IAB7-20": "Diabetes",
        "IAB7-21": "Epilepsy",
        "IAB7-22": "GERD/Acid Reflux",
        "IAB7-23": "Headaches/Migraines",
        "IAB7-24": "Heart Disease",
        "IAB7-25": "Herbs for Health",
        "IAB7-26": "Holistic Healing",
        "IAB7-27": "IBS/Crohn's Disease",
        "IAB7-28": "Incest/Abuse Support",
        "IAB7-29": "Incontinence",
        "IAB7-30": "Infertility",
        "IAB7-31": "Men's Health",
        "IAB7-32": "Nutrition",
        "IAB7-33": "Orthopedics",
        "IAB7-34": "Panic/Anxiety Disorders",
        "IAB7-35": "Pediatrics",
        "IAB7-36": "Physical Therapy",
        "IAB7-37": "Psychology/Psychiatry",
        "IAB7-38": "Senor Health",
        "IAB7-39": "Sexuality",
        "IAB7-40": "Sleep Disorders",
        "IAB7-41": "Smoking Cessation",
        "IAB7-42": "Substance Abuse",
        "IAB7-43": "Thyroid Disease",
        "IAB7-44": "Weight Loss",
        "IAB7-45": "Women's Health",
        "IAB8": "Food & Drink",
        "IAB8-1": "American Cuisine",
        "IAB8-2": "Barbecues & Grilling",
        "IAB8-3": "Cajun/Creole",
        "IAB8-4": "Chinese Cuisine",
        "IAB8-5": "Cocktails/Beer",
        "IAB8-6": "Coffee/Tea",
        "IAB8-7": "Cuisine-Specific",
        "IAB8-8": "Desserts & Baking",
        "IAB8-9": "Dining Out",
        "IAB8-10": "Food Allergies",
        "IAB8-11": "French Cuisine",
        "IAB8-12": "Health/Lowfat Cooking",
        "IAB8-13": "Italian Cuisine",
        "IAB8-14": "Japanese Cuisine",
        "IAB8-15": "Mexican Cuisine",
        "IAB8-16": "Vegan",
        "IAB8-17": "Vegetarian",
        "IAB8-18": "Wine",
        "IAB9": "Hobbies & Interests",
        "IAB9-1": "Art/Technology",
        "IAB9-2": "Arts & Crafts",
        "IAB9-3": "Beadwork",
        "IAB9-4": "Birdwatching",
        "IAB9-5": "Board Games/Puzzles",
        "IAB9-6": "Candle & Soap Making",
        "IAB9-7": "Card Games",
        "IAB9-8": "Chess",
        "IAB9-9": "Cigars",
        "IAB9-10": "Collecting",
        "IAB9-11": "Comic Books",
        "IAB9-12": "Drawing/Sketching",
        "IAB9-13": "Freelance Writing",
        "IAB9-14": "Genealogy",
        "IAB9-15": "Getting Published",
        "IAB9-16": "Guitar",
        "IAB9-17": "Home Recording",
        "IAB9-18": "Investors & Patents",
        "IAB9-19": "Jewelry Making",
        "IAB9-20": "Magic & Illusion",
        "IAB9-21": "Needlework",
        "IAB9-22": "Painting",
        "IAB9-23": "Photography",
        "IAB9-24": "Radio",
        "IAB9-25": "Roleplaying Games",
        "IAB9-26": "Sci-Fi & Fantasy",
        "IAB9-27": "Scrapbooking",
        "IAB9-28": "Screenwriting",
        "IAB9-29": "Stamps & Coins",
        "IAB9-30": "Video & Computer Games",
        "IAB9-31": "Woodworking",
        "IAB10": "Home & Garden",
        "IAB10-1": "Appliances",
        "IAB10-2": "Entertaining",
        "IAB10-3": "Environmental Safety",
        "IAB10-4": "Gardening",
        "IAB10-5": "Home Repair",
        "IAB10-6": "Home Theater",
        "IAB10-7": "Interior Decorating",
        "IAB10-8": "Landscaping",
        "IAB10-9": "Remodeling & Construction",
        "IAB11": "Law,  Gov't & Politics",
        "IAB11-1": "Immigration",
        "IAB11-2": "Legal Issues",
        "IAB11-3": "U.S. Government Resources",
        "IAB11-4": "Politics",
        "IAB11-5": "Commentary",
        "IAB12": "News",
        "IAB12-1": "International News",
        "IAB12-2": "National News",
        "IAB12-3": "Local News",
        "IAB13": "Personal Finance",
        "IAB13-1": "Beginning Investing",
        "IAB13-2": "Credit/Debt & Loans",
        "IAB13-3": "Financial News",
        "IAB13-4": "Financial Planning",
        "IAB13-5": "Hedge Fund",
        "IAB13-6": "Insurance",
        "IAB13-7": "Investing",
        "IAB13-8": "Mutual Funds",
        "IAB13-9": "Options",
        "IAB13-10": "Retirement Planning",
        "IAB13-11": "Stocks",
        "IAB13-12": "Tax Planning",
        "IAB14": "Society",
        "IAB14-1": "Dating",
        "IAB14-2": "Divorce Support",
        "IAB14-3": "Gay Life",
        "IAB14-4": "Marriage",
        "IAB14-5": "Senior Living",
        "IAB14-6": "Teens",
        "IAB14-7": "Weddings",
        "IAB14-8": "Ethnic Specific",
        "IAB15": "Science",
        "IAB15-1": "Astrology",
        "IAB15-2": "Biology",
        "IAB15-3": "Chemistry",
        "IAB15-4": "Geology",
        "IAB15-5": "Paranormal Phenomena",
        "IAB15-6": "Physics",
        "IAB15-7": "Space/Astronomy",
        "IAB15-8": "Geography",
        "IAB15-9": "Botany",
        "IAB15-10": "Weather",
        "IAB16": "Pets",
        "IAB16-1": "Aquariums",
        "IAB16-2": "Birds",
        "IAB16-3": "Cats",
        "IAB16-4": "Dogs",
        "IAB16-5": "Large Animals",
        "IAB16-6": "Reptiles",
        "IAB16-7": "Veterinary Medicine",
        "IAB17": "Sports",
        "IAB17-1": "Auto Racing",
        "IAB17-2": "Baseball",
        "IAB17-3": "Bicycling",
        "IAB17-4": "Bodybuilding",
        "IAB17-5": "Boxing",
        "IAB17-6": "Canoeing/Kayaking",
        "IAB17-7": "Cheerleading",
        "IAB17-8": "Climbing",
        "IAB17-9": "Cricket",
        "IAB17-10": "Figure Skating",
        "IAB17-11": "Fly Fishing",
        "IAB17-12": "Football",
        "IAB17-13": "Freshwater Fishing",
        "IAB17-14": "Game & Fish",
        "IAB17-15": "Golf",
        "IAB17-16": "Horse Racing",
        "IAB17-17": "Horses",
        "IAB17-18": "Hunting/Shooting",
        "IAB17-19": "Inline Skating",
        "IAB17-20": "Martial Arts",
        "IAB17-21": "Mountain Biking",
        "IAB17-22": "NASCAR Racing",
        "IAB17-23": "Olympics",
        "IAB17-24": "Paintball",
        "IAB17-25": "Power & Motorcycles",
        "IAB17-26": "Pro Basketball",
        "IAB17-27": "Pro Ice Hockey",
        "IAB17-28": "Rodeo",
        "IAB17-29": "Rugby",
        "IAB17-30": "Running/Jogging",
        "IAB17-31": "Sailing",
        "IAB17-32": "Saltwater Fishing",
        "IAB17-33": "Scuba Diving",
        "IAB17-34": "Skateboarding",
        "IAB17-35": "Skiing",
        "IAB17-36": "Snowboarding",
        "IAB17-37": "Surfing/Bodyboarding",
        "IAB17-38": "Swimming",
        "IAB17-39": "Table Tennis/Ping-Pong",
        "IAB17-40": "Tennis",
        "IAB17-41": "Volleyball",
        "IAB17-42": "Walking",
        "IAB17-43": "Waterski/Wakeboard",
        "IAB17-44": "World Soccer",
        "IAB18": "Style & Fashion",
        "IAB18-1": "Beauty",
        "IAB18-2": "Body Art",
        "IAB18-3": "Fashion",
        "IAB18-4": "Jewelry",
        "IAB18-5": "Clothing",
        "IAB18-6": "Accessories",
        "IAB19": "Technology & Computing",
        "IAB19-1": "3-D Graphics",
        "IAB19-2": "Animation",
        "IAB19-3": "Antivirus Software",
        "IAB19-4": "C/C++",
        "IAB19-5": "Cameras & Camcorders",
        "IAB19-6": "Cell Phones",
        "IAB19-7": "Computer Certification",
        "IAB19-8": "Computer Networking",
        "IAB19-9": "Computer Peripherals",
        "IAB19-10": "Computer Reviews",
        "IAB19-11": "Data Centers",
        "IAB19-12": "Databases",
        "IAB19-13": "Desktop Publishing",
        "IAB19-14": "Desktop Video",
        "IAB19-15": "Email",
        "IAB19-16": "Graphics Software",
        "IAB19-17": "Home Video/DVD",
        "IAB19-18": "Internet Technology",
        "IAB19-19": "Java",
        "IAB19-20": "JavaScript",
        "IAB19-21": "Mac Support",
        "IAB19-22": "MP3/MIDI",
        "IAB19-23": "Net Conferencing",
        "IAB19-24": "Net for Beginners",
        "IAB19-25": "Network Security",
        "IAB19-26": "Palmtops/PDAs",
        "IAB19-27": "PC Support",
        "IAB19-28": "Portable",
        "IAB19-29": "Entertainment",
        "IAB19-30": "Shareware/Freeware",
        "IAB19-31": "Unix",
        "IAB19-32": "Visual Basic",
        "IAB19-33": "Web Clip Art",
        "IAB19-34": "Web Design/HTML",
        "IAB19-35": "Web Search",
        "IAB19-36": "Windows",
        "IAB20": "Travel",
        "IAB20-1": "Adventure Travel",
        "IAB20-2": "Africa",
        "IAB20-3": "Air Travel",
        "IAB20-4": "Australia & New Zealand",
        "IAB20-5": "Bed & Breakfasts",
        "IAB20-6": "Budget Travel",
        "IAB20-7": "Business Travel",
        "IAB20-8": "By US Locale",
        "IAB20-9": "Camping",
        "IAB20-10": "Canada",
        "IAB20-11": "Caribbean",
        "IAB20-12": "Cruises",
        "IAB20-13": "Eastern Europe",
        "IAB20-14": "Europe",
        "IAB20-15": "France",
        "IAB20-16": "Greece",
        "IAB20-17": "Honeymoons/Getaways",
        "IAB20-18": "Hotels",
        "IAB20-19": "Italy",
        "IAB20-20": "Japan",
        "IAB20-21": "Mexico & Central America",
        "IAB20-22": "National Parks",
        "IAB20-23": "South America",
        "IAB20-24": "Spas",
        "IAB20-25": "Theme Parks",
        "IAB20-26": "Traveling with Kids",
        "IAB20-27": "United Kingdom",
        "IAB21": "Real Estate",
        "IAB21-1": "Apartments",
        "IAB21-2": "Architects",
        "IAB21-3": "Buying/Selling Homes",
        "IAB22": "Shopping",
        "IAB22-1": "Contests & Freebies",
        "IAB22-2": "Couponing",
        "IAB22-3": "Comparison",
        "IAB22-4": "Engines"
    };
    if (iab.hasOwnProperty(iabCategory)) {
        return iab[iabCategory];
    } else {
        return "News";
    }
}
pageVariables["sectioncat-name"] = getSectionIABName(pageVariables["sectioncat"]);


function getEnvironment() {
    console.assert(pageVariables["pathbasename"] !== undefined, "pageVariables['pathbasename'] not defined before calling getEnvironment()");
    var result;
    if (pageVariables["404"] === "Yes") {
        result = "NoAds";
    } else if (window.location.href.indexOf('annonce-test') !== -1) {
        result = "Test";
    } else if (window.location.href.indexOf('annonce-specs') !== -1) {
        result = "Specs";
    } else {
        result = "Live";
    }
    return result;
}
pageVariables["environment"] = getEnvironment();

pageVariables["adform-keyvalues"] = "category:" + pageVariables["news-category"] + ",section:" + pageVariables["subsection-category"] + ",environment:" + pageVariables["environment"];
pageVariables["improvedigital-keyvalues"] = {
    sectioncat: [pageVariables["sectioncat"]]
};

function testIsRestrictedContent() {
    "use strict";
    console.assert(pageVariables["pathbasename"] !== undefined, "pageVariables['pathbasename'] not defined before calling testIsRestrictedContent()");
    var restricted_words, restricted_word, result, restriction_triggers, restriction_results;
    restriction_triggers = [];
    restriction_results = [];
    result = "No";
    if (pageVariables["404"] === "Yes") {
        result = "Yes";
    } else {
        restricted_words = ["c2V4", "b3JnYXNtZQ==", "cG9ybg==", "ZXJvdGlr", "ZXNjb3J0", "Ymxvd2pvYg==", "ZGlsZG8=", "ZGlsbGVy", "YnJ5c3Rlcg==", "bnVkaXN0", "cGVuaXM=", "c3dpbmdlcg==", "b25hbmVyZQ==", "cGlr", "ZGlja3BpY3M="];
        for (var i = 0; i < restricted_words.length; i++) {
            restricted_word = atob(restricted_words[i]);
            if (pageVariables["pathbasename"].toLowerCase().indexOf(restricted_word) > -1) {
                result = "Yes";
                restriction_triggers.push(atob("QWR1bHQ="));
                restriction_results.push(restricted_word);
                break;
            }
        }
    }
    return result;
}
pageVariables["restricted"] = testIsRestrictedContent();


googletag = googletag || {};
googletag.cmd = googletag.cmd || [];

pbjs = pbjs || {};
pbjs.que = pbjs.que || [];

pbjs.bidderSettings = {
    standard: {
        allowAlternateBidderCodes: true,
        allowedAlternateBidderCodes: ["*"],
        storageAllowed: true
    },
    adform: {
        bidCpmAdjustment: function(bidCpm) {
            "use strict";
            return bidCpm * 0.9;
        },
        allowAlternateBidderCodes: true,
        allowedAlternateBidderCodes: ["*"],
        storageAllowed: true
    },
    criteo: {
        allowAlternateBidderCodes: true,
        allowedAlternateBidderCodes: ["*"],
        storageAllowed: true
    },
    improvedigital: { //NET CPM
        allowAlternateBidderCodes: true,
        allowedAlternateBidderCodes: ["*"],
        storageAllowed: true
    }
};


prebidEnabled = (supportsES6 && !(connectionNG === "slow-2g" || connectionNG === "2g"));



pbjs.que.push(function() {
    "use strict";
    var adUnits, adform, criteo, improvedigital, improvedigitalPublisherId, imageType;
    adform = "adform";
	criteo = "criteo";
	improvedigital = "improvedigital";
	improvedigitalPublisherId = 2109;
    imageType = "image";

    function getBidderID(divID, bidderName) {
        var result, map, submap;
        if (bidderName === criteo) {
            result = divID.replace("div-", "Pengehjoernet.dk ").replace("_", " ");
        } else {
            map = { 'div-930x180_1': {
                    [adform]: 1905693
                },
                'div-930x180_2': {
                    [adform]: 1905711
                },
                'div-InFeed_1': {
                    [adform]: 1905694
                },
                'div-InText_1': {
                    [adform]: 1905704
                },
                'div-InText_2': {
                    [adform]: 1905705
                },
                'div-InText_3': {
                    [adform]: 1905708
                },
                'div-InText_4': {
                    [adform]: 1905706
                },
                'div-InText_5': {
                    [adform]: 1905707
                },
                'div-160x600_L': {
                    [adform]: 1905702
                },
                'div-160x600_R': {
                    [adform]: 1905703
                },
                'div-Mobile_Article_1': {
                    [adform]: 1905695
                },
                'div-Mobile_Article_2': {
                    [adform]: 1905696
                },
                'div-Mobile_Article_3': {
                    [adform]: 1905698
                },
                'div-Mobile_Article_4': {
                    [adform]: 1905697
                },
                'div-Mobile_Article_5': {
                    [adform]: 1905699
                },
                'div-Mobile_Article_6': {
                    [adform]: 1905700
                },
                'div-Mobile_Article_7': {
                    [adform]: 1905710
                },
                'div-Mobile_Article_8': {
                    [adform]: 1905709
                },
                'div-Mobile_InFeed_1': {
                    [adform]: 1905701
                },
                'div-Mobile_InFeed_2': {
                    [adform]: 1925500
                },
                'gpt_unit_/49662453/PengehjoernetDK/Mobile_Anchor_0': {
                    [adform]: 1905712
                }
            };
            if (map.hasOwnProperty(divID)) {
                submap = map[divID];
                if (submap.hasOwnProperty(bidderName)) {
                    result = submap[bidderName];
                } else {
                    printInfo("ERROR: No ID for " + divID + " and " + bidderName);
                }
            } else {
                printInfo("ERROR: No such bidder: " + bidderName);
            }
        }
        return result;
    }
    if (prebidEnabled) {
        try {
            pbjs.setBidderConfig({
                bidders: ["adform"],
                config: {
                    "schain": {
                        "validation": "relaxed",
                        "config": {
                            "ver": "1.0",
                            "complete": 1,
                            "nodes": [
                                //MGDK
                                {
                                    "asi": "mgdk.dk",
                                    "sid": "MGDK-00000000001",
                                    "hp": 1
                                }
                            ]
                        }
                    }
                }
            });
			pbjs.setBidderConfig({
                bidders: ["criteo"],
                config: {
                    "schain": {
                        "validation": "relaxed",
                        "config": {
                            "ver": "1.0",
                            "complete": 1,
                            "nodes": [
                                //MGDK
                                {
                                    "asi": "mgdk.dk",
                                    "sid": "MGDK-00000000001",
                                    "hp": 1
                                }
                            ]
                        }
                    }
                }
            });
			pbjs.setBidderConfig({
                bidders: ["improvedigital"],
                config: {
                    "schain": {
                        "validation": "relaxed",
                        "config": {
                            "ver": "1.0",
                            "complete": 1,
                            "nodes": [
                                //MGDK
                                {
                                    "asi": "mgdk.dk",
                                    "sid": "MGDK-00000000001",
                                    "hp": 1
                                }
                            ]
                        }
                    }
                }
            });
        } catch (err) {
            printError(err, "in setBidderConfig");
        }
        pbjs.setConfig({
            "schain": {
                "validation": "strict",
                "config": {
                    "ver": "1.0",
                    "complete": 1,
                    "nodes": [{
                        //MGDK
                        "asi": "mgdk.dk",
                        "sid": "MGDK-00000000001",
                        "hp": 1
                    }]

                }
            },
            gptPreAuction: {
                enabled: true,
                useDefaultPreAuction: true
            },
            bidderSequence: "fixed",
            gvlMapping: {
                "adform": 50,
                "criteo": 91,
				"improvedigital": 253,
                "criteoId": 91,
                "id5id": 131,
                "teadsId": 132,
                "unifiedId": 21,
                "adtelligentId": 410,
				"uid2": 21
            },
            priceGranularity: {
                'buckets': [{
                    'min': 1,
                    'max': 50,
                    'increment': 0.10
                }, {
                    'min': 50,
                    'max': 150,
                    'increment': 1.00
                }, {
                    'min': 150,
                    'max': 300,
                    'increment': 5.00
                }, {
                    'min': 300,
                    'max': 500,
                    'increment': 10.00
                }, {
                    'min': 500,
                    'max': 1000,
                    'increment': 50.00
                }, {
                    'min': 1000,
                    'max': 2000,
                    'increment': 100.00
                }]
            },
            currency: {
                "adServerCurrency": "DKK",
                "rates": {
                    "USD": {
                        "DKK": 7.00
                    },
                    "EUR": {
                        "DKK": 7.45
                    }
                },
                "bidderCurrencyDefault": {
                    "adform": "DKK",
                    "criteo": "DKK",
					"improvedigital": "DKK"
                }
            },
            userSync: {
                filterSettings: {
                    iframe: {
                        bidders: '*',
                        filter: 'include'
                    },
                    image: {
                        bidders: '*',
                        filter: 'include'
                    }
                },
                syncDelay: 3000,
                iframeEnabled: true,
                //enableOverride: true,
                syncsPerBidder: 0,
                aliasSyncEnabled: true,
                syncEnabled: true,
                userIds: [{
                    name: 'sharedId',
                    params: {
                        syncTime: 300
                    },
                    storage: {
                        name: 'sharedid',
                        type: typeof Storage === "undefined" ? 'cookie' : 'html5',
                        expires: 28
                    },
                }, {
                    name: "criteo",
                }, {
                    name: "unifiedId",
                    params: {
                        url: "//match.adsrvr.org/track/rid?ttd_pid=30s4f6z&fmt=json"
                    },
                    storage: {
                        type: typeof Storage === "undefined" ? 'cookie' : 'html5',
                        name: "pbjs-unifiedid", // create a cookie with this name
                        expires: 60 // cookie can last for 60 days
                    }
                }, {
                    name: "uid2",
                }, {
                    name: 'adtelligent'
                }, {
                    name: 'id5Id',
                    params: {
                        partner: 1254
                    },
                    storage: {
                        type: 'html5', // "html5" is the required storage type
                        name: 'id5id', // "id5id" is the required storage name
                        expires: 90, // storage lasts for 90 days
                        refreshInSeconds: 8 * 3600 // refresh ID every 8 hours to ensure it's fresh
                    }
                }, {
                    name: 'teadsId',
                    params: {
                        pubId: 24402
                    }
                }],
                /*topics: {
                    maxTopicCaller: 2, // SSP rotation
                    bidders: [{
                        bidder: 'pubmatic',
                        iframeURL: 'https://ads.pubmatic.com/AdServer/js/topics/topics_frame.html',
                        expiry: 21 // Configurable expiry days
                    }]
                },*/
                auctionDelay: 1000 // Delay in milliseconds of the auction to retrieve user ids via the userId module before the auction starts.
            },
            paapi: {
              enabled: true,
              defaultForSlots: 1
            },
            /*jshint -W119 */
            ...(usingIabCMP ? {
                consentManagement: {
                    gdpr: {
                        cmpApi: 'iab',
                        timeout: 10000,
                        defaultGdprScope: true,
                        allowAuctionWithoutConsent: true,
                        rules: [{ // these are the default values
                            purpose: "storage",
                            enforcePurpose: true,
                            enforceVendor: true
                        }, {
                            purpose: "basicAds",
                            enforcePurpose: true,
                            enforceVendor: true
                        }, {
                            purpose: "measurement",
                            enforcePurpose: true,
                            enforceVendor: true
                        }]
                    },
                    usp: {
                        timeout: 500 // US Privacy timeout in ms - https://docs.prebid.org/dev-docs/modules/consentManagementUsp.html
                    },
                    gpp: {
                      cmpApi: 'iab',
                      timeout: 10000
                    }
                }
            } : {}),
            /*jshint +W119 */
            useBidCache: true,
            //enableSendAllBids: true,
			enableTIDs: true,
            pageUrl: pageVariables["canonical-url"],
            ortb2: {
                site: {
                    name: "Pengehjørnet.dk",
                    domain: document.domain,
                    cat: ["IAB13-3"],
                    sectioncat: [pageVariables["sectioncat"]],
                    page: pageVariables["canonical-url"],
                    ref: document.referrer,
                    ext: {
                        data: {
                            pageType: (pageVariables["subsection-category"] === "articlepage") ? "article" : (pageVariables["subsection-category"] === "subsection-frontpage") ? "object" : "website",
                            category: pageVariables["news-category"],
                            restricted: pageVariables["restricted"]
                        }
                    }
                }
            }
        });
        if (is_desktop) {
            adUnits = [{
                code: "div-930x180_1",
                ortb2Imp: {
                    ext: {
                        gpid: "/49662453/PengehjoernetDK/930x180_1",
                        data: {
                            pbadslot: "/49662453/PengehjoernetDK/930x180_1"
                        }
                    }
                },
                mediaTypes: {
                    banner: {
                        sizes: getAdSizes("topboard")
                    }
                },
                bids: [{
                    bidder: adform,
                    params: {
                        mid: getBidderID('div-930x180_1', adform),
                        url: pageVariables["canonical-url"],
                        //mkw: adform_keys,
                        mkv: pageVariables["adform-keyvalues"]
                    }
                }]
            }, {
                code: "div-930x180_2",
                ortb2Imp: {
                    ext: {
                        gpid: "/49662453/PengehjoernetDK/930x180_2",
                        data: {
                            pbadslot: "/49662453/PengehjoernetDK/930x180_2"
                        }
                    }
                },
                mediaTypes: {
                    banner: {
                        sizes: getAdSizes("board")
                    }
                },
                bids: [{
                    bidder: adform,
                    params: {
                        mid: getBidderID('div-930x180_2', adform),
                        url: pageVariables["canonical-url"],
                        //mkw: adform_keys,
                        mkv: pageVariables["adform-keyvalues"]
                    }
                }]
            }, {
                code: "div-InFeed_1",
                ortb2Imp: {
                    ext: {
                        gpid: "/49662453/PengehjoernetDK/InFeed_1",
                        data: {
                            pbadslot: "/49662453/PengehjoernetDK/InFeed_1"
                        }
                    }
                },
                mediaTypes: {
                    banner: {
                        sizes: getAdSizes("infeed")
                    }
                },
                bids: [{
                    bidder: adform,
                    params: {
                        mid: getBidderID('div-InFeed_1', adform),
                        url: pageVariables["canonical-url"],
                        //mkw: adform_keys,
                        mkv: pageVariables["adform-keyvalues"]
                    }
                }]
            }, {
                code: "div-InText_1",
                ortb2Imp: {
                    ext: {
                        gpid: "/49662453/PengehjoernetDK/InText_1",
                        data: {
                            pbadslot: "/49662453/PengehjoernetDK/InText_1"
                        }
                    }
                },
                mediaTypes: {
                    banner: {
                        sizes: getAdSizes("intext")
                    }
                },
                bids: [{
                    bidder: adform,
                    params: {
                        mid: getBidderID('div-InText_1', adform),
                        url: pageVariables["canonical-url"],
                        //mkw: adform_keys,
                        mkv: pageVariables["adform-keyvalues"]
                    }
                }]
            }, {
                code: "div-InText_2",
                ortb2Imp: {
                    ext: {
                        gpid: "/49662453/PengehjoernetDK/InText_2",
                        data: {
                            pbadslot: "/49662453/PengehjoernetDK/InText_2"
                        }
                    }
                },
                mediaTypes: {
                    banner: {
                        sizes: getAdSizes("intext")
                    }
                },
                bids: [{
                    bidder: adform,
                    params: {
                        mid: getBidderID('div-InText_2', adform),
                        url: pageVariables["canonical-url"],
                        //mkw: adform_keys,
                        mkv: pageVariables["adform-keyvalues"]
                    }
                }]
            }, {
                code: "div-InText_3",
                ortb2Imp: {
                    ext: {
                        gpid: "/49662453/PengehjoernetDK/InText_3",
                        data: {
                            pbadslot: "/49662453/PengehjoernetDK/InText_3"
                        }
                    }
                },
                mediaTypes: {
                    banner: {
                        sizes: getAdSizes("intext")
                    }
                },
                bids: [{
                    bidder: adform,
                    params: {
                        mid: getBidderID('div-InText_3', adform),
                        url: pageVariables["canonical-url"],
                        //mkw: adform_keys,
                        mkv: pageVariables["adform-keyvalues"]
                    }
                }]
            }, {
                code: "div-InText_4",
                ortb2Imp: {
                    ext: {
                        gpid: "/49662453/PengehjoernetDK/InText_4",
                        data: {
                            pbadslot: "/49662453/PengehjoernetDK/InText_4"
                        }
                    }
                },
                mediaTypes: {
                    banner: {
                        sizes: getAdSizes("intext")
                    }
                },
                bids: [{
                    bidder: adform,
                    params: {
                        mid: getBidderID('div-InText_4', adform),
                        url: pageVariables["canonical-url"],
                        //mkw: adform_keys,
                        mkv: pageVariables["adform-keyvalues"]
                    }
                }]
            }, {
                code: "div-InText_5",
                ortb2Imp: {
                    ext: {
                        gpid: "/49662453/PengehjoernetDK/InText_5",
                        data: {
                            pbadslot: "/49662453/PengehjoernetDK/InText_5"
                        }
                    }
                },
                mediaTypes: {
                    banner: {
                        sizes: getAdSizes("intext")
                    }
                },
                bids: [{
                    bidder: adform,
                    params: {
                        mid: getBidderID('div-InText_5', adform),
                        url: pageVariables["canonical-url"],
                        //mkw: adform_keys,
                        mkv: pageVariables["adform-keyvalues"]
                    }
                }]
            }, {
                code: "div-160x600_L",
                ortb2Imp: {
                    ext: {
                        gpid: "/49662453/PengehjoernetDK/160x600_L",
                        data: {
                            pbadslot: "/49662453/PengehjoernetDK/160x600_L"
                        }
                    }
                },
                mediaTypes: {
                    banner: {
                        sizes: getAdSizes("skyscraper")
                    }
                },
                bids: [{
                    bidder: adform,
                    params: {
                        mid: getBidderID('div-160x600_L', adform),
                        url: pageVariables["canonical-url"],
                        //mkw: adform_keys,
                        mkv: pageVariables["adform-keyvalues"]
                    }
                }]
            }, {
                code: "div-160x600_R",
                ortb2Imp: {
                    ext: {
                        gpid: "/49662453/PengehjoernetDK/160x600_R",
                        data: {
                            pbadslot: "/49662453/PengehjoernetDK/160x600_R"
                        }
                    }
                },
                mediaTypes: {
                    banner: {
                        sizes: getAdSizes("skyscraper")
                    }
                },
                bids: [{
                    bidder: adform,
                    params: {
                        mid: getBidderID('div-160x600_R', adform),
                        url: pageVariables["canonical-url"],
                        //mkw: adform_keys,
                        mkv: pageVariables["adform-keyvalues"]
                    }
                }]
            }];
        } else {
            adUnits = [{
                code: "div-Mobile_Article_1",
                ortb2Imp: {
                    ext: {
                        gpid: "/49662453/PengehjoernetDK/Mobile_Article_1",
                        data: {
                            pbadslot: "/49662453/PengehjoernetDK/Mobile_Article_1"
                        }
                    }
                },
                mediaTypes: {
                    banner: {
                        sizes: getAdSizes("mobile")
                    }
                },
                bids: [{
                    bidder: adform,
                    params: {
                        mid: getBidderID('div-Mobile_Article_1', adform),
                        url: pageVariables["canonical-url"],
                        //mkw: adform_keys,
                        mkv: pageVariables["adform-keyvalues"]
                    }
                }]
            }, {
                code: "div-Mobile_Article_2",
                ortb2Imp: {
                    ext: {
                        gpid: "/49662453/PengehjoernetDK/Mobile_Article_2",
                        data: {
                            pbadslot: "/49662453/PengehjoernetDK/Mobile_Article_2"
                        }
                    }
                },
                mediaTypes: {
                    banner: {
                        sizes: getAdSizes("mobile")
                    }
                },
                bids: [{
                    bidder: adform,
                    params: {
                        mid: getBidderID("div-Mobile_Article_2", adform),
                        url: pageVariables["canonical-url"],
                        //mkw: adform_keys,
                        mkv: pageVariables["adform-keyvalues"]
                    }
                }]
            }, {
                code: "div-Mobile_Article_3",
                ortb2Imp: {
                    ext: {
                        gpid: "/49662453/PengehjoernetDK/Mobile_Article_3",
                        data: {
                            pbadslot: "/49662453/PengehjoernetDK/Mobile_Article_3"
                        }
                    }
                },
                mediaTypes: {
                    banner: {
                        sizes: getResponsiveAdSizes("mobile")
                    }
                },
                bids: [{
                    bidder: adform,
                    params: {
                        mid: getBidderID("div-Mobile_Article_3", adform),
                        url: pageVariables["canonical-url"],
                        //mkw: adform_keys,
                        mkv: pageVariables["adform-keyvalues"]
                    }
                }]
            }, {
                code: "div-Mobile_Article_4",
                ortb2Imp: {
                    ext: {
                        gpid: "/49662453/PengehjoernetDK/Mobile_Article_4",
                        data: {
                            pbadslot: "/49662453/PengehjoernetDK/Mobile_Article_4"
                        }
                    }
                },
                mediaTypes: {
                    banner: {
                        sizes: getAdSizes("mobile")
                    }
                },
                bids: [{
                    bidder: adform,
                    params: {
                        mid: getBidderID("div-Mobile_Article_4", adform),
                        url: pageVariables["canonical-url"],
                        //mkw: adform_keys,
                        mkv: pageVariables["adform-keyvalues"]
                    }
                }]
            }, {
                code: "div-Mobile_Article_5",
                ortb2Imp: {
                    ext: {
                        gpid: "/49662453/PengehjoernetDK/Mobile_Article_5",
                        data: {
                            pbadslot: "/49662453/PengehjoernetDK/Mobile_Article_5"
                        }
                    }
                },
                mediaTypes: {
                    banner: {
                        sizes: getAdSizes("mobile")
                    }
                },
                bids: [{
                    bidder: adform,
                    params: {
                        mid: getBidderID("div-Mobile_Article_5", adform),
                        url: pageVariables["canonical-url"],
                        //mkw: adform_keys,
                        mkv: pageVariables["adform-keyvalues"]
                    }
                }]
            }, {
                code: "div-Mobile_Article_6",
                ortb2Imp: {
                    ext: {
                        gpid: "/49662453/PengehjoernetDK/Mobile_Article_6",
                        data: {
                            pbadslot: "/49662453/PengehjoernetDK/Mobile_Article_6"
                        }
                    }
                },
                mediaTypes: {
                    banner: {
                        sizes: getAdSizes("mobile")
                    }
                },
                bids: [{
                    bidder: adform,
                    params: {
                        mid: getBidderID("div-Mobile_Article_6", adform),
                        url: pageVariables["canonical-url"],
                        //mkw: adform_keys,
                        mkv: pageVariables["adform-keyvalues"]
                    }
                }]
            }, {
                code: "div-Mobile_Article_7",
                ortb2Imp: {
                    ext: {
                        gpid: "/49662453/PengehjoernetDK/Mobile_Article_7",
                        data: {
                            pbadslot: "/49662453/PengehjoernetDK/Mobile_Article_7"
                        }
                    }
                },
                mediaTypes: {
                    banner: {
                        sizes: getAdSizes("mobile")
                    }
                },
                bids: [{
                    bidder: adform,
                    params: {
                        mid: getBidderID("div-Mobile_Article_7", adform),
                        url: pageVariables["canonical-url"],
                        //mkw: adform_keys,
                        mkv: pageVariables["adform-keyvalues"]
                    }
                }]
            }, {
                code: "div-Mobile_Article_8",
                ortb2Imp: {
                    ext: {
                        gpid: "/49662453/PengehjoernetDK/Mobile_Article_8",
                        data: {
                            pbadslot: "/49662453/PengehjoernetDK/Mobile_Article_8"
                        }
                    }
                },
                mediaTypes: {
                    banner: {
                        sizes: getAdSizes("mobile")
                    }
                },
                bids: [{
                    bidder: adform,
                    params: {
                        mid: getBidderID("div-Mobile_Article_8", adform),
                        url: pageVariables["canonical-url"],
                        //mkw: adform_keys,
                        mkv: pageVariables["adform-keyvalues"]
                    }
                }]
            }, {
                code: "div-Mobile_InFeed_1",
                ortb2Imp: {
                    ext: {
                        gpid: "/49662453/PengehjoernetDK/Mobile_InFeed_1",
                        data: {
                            pbadslot: "/49662453/PengehjoernetDK/Mobile_InFeed_1"
                        }
                    }
                },
                mediaTypes: {
                    banner: {
                        sizes: getAdSizes("mobile")
                    }
                },
                bids: [{
                    bidder: adform,
                    params: {
                        mid: getBidderID('div-Mobile_InFeed_1', adform),
                        url: pageVariables["canonical-url"],
                        //mkw: adform_keys,
                        mkv: pageVariables["adform-keyvalues"]
                    }
                }]
            },  {
                code: "div-Mobile_InFeed_2",
                ortb2Imp: {
                    ext: {
                        gpid: "/49662453/PengehjoernetDK/Mobile_InFeed_2",
                        data: {
                            pbadslot: "/49662453/PengehjoernetDK/Mobile_InFeed_2"
                        }
                    }
                },
                mediaTypes: {
                    banner: {
                        sizes: getAdSizes("mobile")
                    }
                },
                bids: [{
                    bidder: adform,
                    params: {
                        mid: getBidderID('div-Mobile_InFeed_2', adform),
                        url: pageVariables["canonical-url"],
                        //mkw: adform_keys,
                        mkv: pageVariables["adform-keyvalues"]
                    }
                }]
            }, {
                code: "gpt_unit_/49662453/PengehjoernetDK/Mobile_Anchor_0",
                ortb2Imp: {
                    ext: {
                        gpid: "/49662453/PengehjoernetDK/Mobile_Anchor",
                        data: {
                            pbadslot: "/49662453/PengehjoernetDK/Mobile_Anchor"
                        }
                    }
                },
                mediaTypes: {
                    banner: {
                        sizes: getAdSizes("mobile_anchor")
                    }
                },
                bids: [{
                    bidder: adform,
                    params: {
                        mid: getBidderID('gpt_unit_/49662453/PengehjoernetDK/Mobile_Anchor_0', adform),
                        url: pageVariables["canonical-url"],
                        //mkw: adform_keys,
                        mkv: pageVariables["adform-keyvalues"]
                    }
                }]
            }];
        }
        pbjs.addAdUnits(adUnits);
    }
});


/* tracks if an ad slot has been refreshed or not */
var refreshedMap = {
	"div-1x1": false,
    "div-930x180_1": false,
    "div-930x180_2": false,
	"div-930x180_3": false,
    "div-InFeed_1": false,
    "div-InText_1": false,
    "div-InText_2": false,
    "div-InText_3": false,
    "div-InText_4": false,
    "div-InText_5": false,
    "div-Mobile_Article_1": false,
    "div-Mobile_Article_2": false,
    "div-Mobile_Article_3": false,
    "div-Mobile_Article_4": false,
    "div-Mobile_Article_5": false,
    "div-Mobile_Article_6": false,
    "div-Mobile_Article_7": false,
    "div-Mobile_Article_8": false,
    "div-Mobile_InFeed_1": false,
    "div-Mobile_InFeed_2": false,
    "gpt_unit_/49662453/PengehjoernetDK/Mobile_Anchor_0": false
};

function refreshAdslot(adslot) {
    "use strict";
    if (pageVariables["environment"] === "NoAds") {
        printInfo("NoAds environment - skipping ad fetch.");
    } else {
        if (adslot !== undefined) {
            //set longer timeouts for below the fold placements
            if (adslot.getSlotElementId().indexOf("_1") === -1) {
                myPrebidTimeout = PREBID_TIMEOUT + 500;
            } else {
                myPrebidTimeout = PREBID_TIMEOUT;
            }
            if (!!googletag.pubadsReady) {
                if (!refreshedMap[adslot.getSlotElementId()]) {
                    var slotId = adslot.getSlotElementId();
                    refreshedMap[slotId] = true;
                    if (prebidEnabled) {
                        try {
                            pbjs.que.push(function() {
                                pbjs.requestBids({
                                    timeout: myPrebidTimeout,
                                    adUnitCodes: [slotId],
                                    bidsBackHandler: function() {
                                        pbjs.setTargetingForGPTAsync([slotId]);
                                        googletag.pubads().refresh([adslot]);
                                    }
                                });
                            });
                        } catch (err) {
                            googletag.pubads().refresh([adslot]);
                            printError(err, "Prebid timeout");
                        }
                    } else {
                        googletag.pubads().refresh([adslot]);
                        printInfo(slotId + " rendered outside prebid");
                    }
                }
            } else {
                var listenForPubadsReady = setInterval(function() {
                    if (!!googletag.pubadsReady) {
                        var slotId = adslot.getSlotElementId();
                        if (!refreshedMap[slotId]) {
                            refreshedMap[slotId] = true;
                            if (prebidEnabled) {
                                try {
                                    pbjs.que.push(function() {
                                        pbjs.requestBids({
                                            timeout: PREBID_TIMEOUT,
                                            adUnitCodes: [slotId],
                                            bidsBackHandler: function() {
                                                pbjs.setTargetingForGPTAsync([slotId]);
                                                googletag.pubads().refresh([adslot]);
                                            }
                                        });
                                    });
                                } catch (err) {
                                    googletag.pubads().refresh([adslot]);
                                    printError(err, "Prebid timeout");
                                }
                            } else {
                                googletag.pubads().refresh([adslot]);
                                printInfo(slotId + " rendered outside prebid");
                            }
                        }
                        clearInterval(listenForPubadsReady);
                    }
                }, 100);
            }
        }
    }
}

var desktop_delta = 350;
var mobile_delta = 650;
var mobile_article_delta = 300;
if (connectionNG.indexOf("2g") > -1) {
    mobile_delta = 850;
    mobile_article_delta = 450;
} else if (connectionNG.indexOf("3g") > -1) {
    mobile_delta = 750;
    mobile_article_delta = 450;
}

var atfSlots = is_mobile ? ["div-Mobile_Article_1"] : ["div-930x180_1"];






function isEvenDiv(divID) {
    var matches = divID.match(/(\d*[02468])/);
    return !!matches;
}

function createMobileArticleBanner(num) {
    var banner_div, banner_div_id;
    if ((pageVariables["environment"] !== "NoAds") && (pageVariables["environment"] !== "LimmitedAds") && is_mobile) {
        banner_div_id = "div-Mobile_Article_" + num.toString();
        if (!document.getElementById(banner_div_id)) {
            banner_div = document.createElement("div");
            banner_div.id = banner_div_id;
            banner_div.style.textAlign = "center";
            //banner_div.className = "banner";
            banner_div.className += " mobile-article-banner";
            banner_div.style.marginBottom = "1em";
            banner_div.style.marginTop = "0.5em";
            banner_div.style.marginLeft = "-1.5rem !important";
        } else {
            banner_div = document.getElementById(banner_div_id);
        }
    }
    return banner_div;
}

function detectWallpaper() {
    var result = false;
    if (document.getElementsByTagName("HTML").length > 0 && (document.getElementsByTagName("HTML")[0].className.indexOf("wallpaper") > -1 || document.getElementsByTagName("HTML")[0].className.indexOf("skin") > -1)) { 
        result = true;
    } else if (document.body.style.backgroundImage.indexOf("url") > -1) { //Traditional skin
        result = true;
    } else if (document.getElementsByClassName("jpx-wp-wrapper").length > 0) { // just premium
        result = true;
    } else if (!!document.getElementById("ayads-html")) { // improve digital
        result = true;
    } else if (!!document.querySelector("html.adsm-skin")) { // adnami
        result = true;
    }
    return result;
}

function detectTopscroll() {
    var result = false;
    if (!!document.querySelector("html.adnm-topscroll")) { // adnami
        result = true;
    }
    return result;
}

function createInTextBannerForDisplay(num) {
    var banner_div, banner_div_id;
    if ((pageVariables["environment"] !== "NoAds") && (pageVariables["environment"] !== "LimmitedAds") && is_desktop) {
        banner_div_id = "div-InText_" + num.toString();
        if (!document.getElementById(banner_div_id)) {
            banner_div = document.createElement("div");
            banner_div.id = banner_div_id;
            banner_div.style.textAlign = "center";
            //banner_div.className = "banner";
            banner_div.className += " intext-banner";
            if (pageVariables["viewport-width"] >= 1400) {
                banner_div.style.maxWidth = "930px";
            }
            banner_div.style.marginBottom = "0.5em";
        } else {
            banner_div = document.getElementById(banner_div_id);
        }
    }
    return banner_div;
}

function createSidebanners () {
	var contentElement = document.querySelector("main");
	
    var leftSticky = document.createElement("div");
    leftSticky.style.position="absolute";
    leftSticky.style.top = "350px";
    leftSticky.style.right = "calc(100vw/2 + 670px)";
    leftSticky.style.height = contentElement.clientHeight - 200 + "px";
    leftSticky.style.width = "160px";

    var rightSticky = document.createElement("div");
    rightSticky.style.position="absolute";
    rightSticky.style.top = "350px";
    rightSticky.style.left = "calc(100vw/2 + 670px)";
    rightSticky.style.height = contentElement.clientHeight - 200 + "px";
    rightSticky.style.width = "160px";

    var div160x600L = document.createElement("div");
    div160x600L.id = "div-160x600_L";
    //div160x600L.classNeme = "banner";
    div160x600L.style.position = "sticky";
    div160x600L.style.top = "250px";
    div160x600L.style.width = "160px";
    div160x600L.style.height = "600px";
    //div160x600L.style.zIndex = 30;
    //div160x600L.style.backgroundColor = "blue";
    leftSticky.appendChild(div160x600L);

    var div160x600R = document.createElement("div");
    div160x600R.id = "div-160x600_R";
    //div160x600R.classNeme = "banner";
    div160x600R.style.position = "sticky";
    div160x600R.style.top = "250px";
    div160x600R.style.width = "160px";
    div160x600R.style.height = "600px";
    //div160x600R.style.zIndex = 30;
    //div160x600R.style.backgroundColor = "blue";
    rightSticky.appendChild(div160x600R);

    document.body.appendChild(leftSticky);
    document.body.appendChild(rightSticky);

    var listenerSidebarSizeUpdater = function() {
        leftSticky.style.height = contentElement.clientHeight - 200 + "px";
        rightSticky.style.height = contentElement.clientHeight  - 200 + "px";
    };

    try {
        window.addEventListener('scroll', listenerSidebarSizeUpdater, {
            passive: true
        });
    } catch (err) {
        window.addEventListener('scroll', listenerSidebarSizeUpdater);
    }
}

function refreshSidebanners() {
    "use strict";
    if (prebidEnabled) {
        try {
            pbjs.que.push(function() {
                pbjs.requestBids({
                    timeout: PREBID_TIMEOUT,
                    adUnitCodes: ["div-160x600_L", "div-160x600_R"],
                    bidsBackHandler: function() {
                        pbjs.setTargetingForGPTAsync(["div-160x600_L", "div-160x600_R"]);
                        googletag.pubads().refresh([slot_160x600_L, slot_160x600_R]);
                    }
                });
            });
        } catch (err) {
            googletag.pubads().refresh([slot_160x600_L, slot_160x600_R]);
            printError(err, "No prebid for sidebanners");
        }
    } else {
        googletag.pubads().refresh([slot_160x600_L, slot_160x600_R]);
    }
}

function initATFAds() {
    //ATF reload
    try {
        if (pageVariables["environment"] !== "NoAds") {
			if ( (slot_1x1 !== undefined) && !refreshedMap["div-1x1"] ) {
				var banner_div = document.createElement("div");
				banner_div.id = "div-1x1";
				banner_div.style.textAlign = "center";
				banner_div.style.marginLeft = "auto";
				banner_div.style.marginRight = "auto";
				banner_div.setAfter(document.querySelector("main"));
				googletag.cmd.push(function() {
                    googletag.display("div-1x1");
                    refreshAdslot(slot_1x1);
                });
			}
            if ((slot_930x180_1 !== undefined) && !refreshedMap["div-930x180_1"]) {
				var target = document.querySelector("#adBanner");
				var banner_div_930x180_1 = document.createElement("div");
				banner_div_930x180_1.id = "div-930x180_1";
				//banner_div_930x180_1.setBefore(target);
                target.append(banner_div_930x180_1);
                googletag.cmd.push(function() {
                    googletag.display("div-930x180_1"); //new
                    refreshAdslot(slot_930x180_1);
                });
            }
            if ((slot_Mobile_InFeed_1 !== undefined) && !refreshedMap["div-Mobile_InFeed_1"] && isAdunitWithinYOffset("div-Mobile_InFeed_1", mobile_delta) && pageVariables["subsection-category"] !== "articlepage") {
                googletag.cmd.push(function() {
                    googletag.display("div-Mobile_InFeed_1"); //new
                    refreshAdslot(slot_Mobile_InFeed_1);
                });
            }
            if ((slot_Mobile_InFeed_2 !== undefined) && !refreshedMap["div-Mobile_InFeed_2"] && isAdunitWithinYOffset("div-Mobile_InFeed_2", mobile_delta) && pageVariables["subsection-category"] !== "articlepage") {
                googletag.cmd.push(function() {
                    googletag.display("div-Mobile_InFeed_2"); //new
                    refreshAdslot(slot_Mobile_InFeed_2);
                });
            }
			if (pageVariables['viewport-width'] > 1400) {

				setTimeout(function() {
					var wallpaperDetected = detectWallpaper();
					var topscrollDetected = detectTopscroll();
						if (!wallpaperDetected && !topscrollDetected) {
							createSidebanners();
							refreshSidebanners();
						}
					}, 4000);
			}
        }
    } catch (err) {
        printError(err, "Failure in ATF slot pre reload.");
    }
}

var gServicesEnabled = false;

adslotStates = {};

var noExpanding = {
  allowOverlayExpansion: false,
  allowPushExpansion: false
};

googletag.cmd.push(function() {
    "use strict";

    googletag.pubads().collapseEmptyDivs();
    if (pageVariables["environment"] !== "NoAds") {
        if (is_mobile) {
            /* if (pageVariables["subsection-category"] === "articlepage") { */
                slot_Mobile_Article_1 = googletag.defineSlot('/49662453/PengehjoernetDK/Mobile_Article_1', getFluidAdSizes("mobile"), "div-Mobile_Article_1").addService(googletag.pubads());
                slot_Mobile_Article_2 = googletag.defineSlot('/49662453/PengehjoernetDK/Mobile_Article_2', getFluidAdSizes("mobile"), "div-Mobile_Article_2").addService(googletag.pubads());
                slot_Mobile_Article_3 = googletag.defineSlot('/49662453/PengehjoernetDK/Mobile_Article_3', getFluidAdSizes("mobile"), "div-Mobile_Article_3").addService(googletag.pubads());
                slot_Mobile_Article_4 = googletag.defineSlot('/49662453/PengehjoernetDK/Mobile_Article_4', getFluidAdSizes("mobile"), "div-Mobile_Article_4").addService(googletag.pubads());
                slot_Mobile_Article_5 = googletag.defineSlot('/49662453/PengehjoernetDK/Mobile_Article_5', getFluidAdSizes("mobile"), "div-Mobile_Article_5").addService(googletag.pubads());
                slot_Mobile_Article_6 = googletag.defineSlot('/49662453/PengehjoernetDK/Mobile_Article_6', getFluidAdSizes("mobile"), "div-Mobile_Article_6").addService(googletag.pubads());
				slot_Mobile_Article_7 = googletag.defineSlot('/49662453/PengehjoernetDK/Mobile_Article_7', getFluidAdSizes("mobile"), "div-Mobile_Article_7").addService(googletag.pubads());
				slot_Mobile_Article_8 = googletag.defineSlot('/49662453/PengehjoernetDK/Mobile_Article_8', getFluidAdSizes("mobile"), "div-Mobile_Article_8").addService(googletag.pubads());
            /* } */
            slot_Mobile_InFeed_1 = googletag.defineSlot('/49662453/PengehjoernetDK/Mobile_InFeed_1', getFluidAdSizes("mobile"), 'div-Mobile_InFeed_1').addService(googletag.pubads());
            slot_Mobile_InFeed_2 = googletag.defineSlot('/49662453/PengehjoernetDK/Mobile_InFeed_2', getFluidAdSizes("mobile"), 'div-Mobile_InFeed_2').addService(googletag.pubads());
            slot_Mobile_Anchor = googletag.defineOutOfPageSlot('/49662453/PengehjoernetDK/Mobile_Anchor', googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR);
            if (slot_Mobile_Anchor) {
                slot_Mobile_Anchor.addService(googletag.pubads());
            }
        } else {
            slot_930x180_1 = googletag.defineSlot('/49662453/PengehjoernetDK/930x180_1', getAdSizes("topboard"), "div-930x180_1").addService(googletag.pubads());
            slot_930x180_2 = googletag.defineSlot('/49662453/PengehjoernetDK/930x180_2', getFluidAdSizes("board"), "div-930x180_2").addService(googletag.pubads());
            /* if (pageVariables["viewport-width"] > desktopMinViewportWidth) {
                slot_InFeed_1 = googletag.defineSlot('/49662453/PengehjoernetDK/InFeed_1', getFluidAdSizes("infeed"), "div-InFeed_1").addService(googletag.pubads());
            } */
			if (pageVariables['viewport-width'] > 1675) {
                slot_160x600_L = googletag.defineSlot('/49662453/PengehjoernetDK/160x600_L', getAdSizes("skyscraper"), "div-160x600_L").addService(googletag.pubads());
                slot_160x600_R = googletag.defineSlot('/49662453/PengehjoernetDK/160x600_R', getAdSizes("skyscraper"), "div-160x600_R").addService(googletag.pubads());
            }
            /* if (pageVariables["subsection-category"] === "articlepage") { */
				slot_InText_1 = googletag.defineSlot('/49662453/PengehjoernetDK/InText_1', getAdSizes("intext"), "div-InText_1").addService(googletag.pubads());
				slot_InText_2 = googletag.defineSlot('/49662453/PengehjoernetDK/InText_2', getAdSizes("intext"), "div-InText_2").addService(googletag.pubads());
				slot_InText_3 = googletag.defineSlot('/49662453/PengehjoernetDK/InText_3', getAdSizes("intext"), "div-InText_3").addService(googletag.pubads());
				slot_InText_4 = googletag.defineSlot('/49662453/PengehjoernetDK/InText_4', getAdSizes("intext"), "div-InText_4").addService(googletag.pubads());
				slot_InText_5 = googletag.defineSlot('/49662453/PengehjoernetDK/InText_5', getAdSizes("intext"), "div-InText_5").addService(googletag.pubads());
            /* }  */ 
        }
        slot_1x1 = googletag.defineSlot('/49662453/PengehjoernetDK/1x1', getAdSizes("pixel"), "div-1x1").addService(googletag.pubads());
    }
    googletag.pubads().set("page_url", pageVariables["canonical-url"]);
    googletag.pubads().setTargeting("environment", pageVariables["environment"]);
    googletag.pubads().setTargeting("page_url", pageVariables["canonical-url"]);
    googletag.pubads().setTargeting("subsection", pageVariables["subsection-category"]);
    googletag.pubads().setTargeting("news-category", pageVariables["news-category"]);
    googletag.pubads().setTargeting("connection", connectionNG);
    googletag.pubads().setTargeting("is-restricted", pageVariables["restricted"]);
    googletag.pubads().setTargeting("viewport-width", pageVariables["viewport-width"].toString());
    googletag.pubads().setTargeting("viewport-height", pageVariables["viewport-height"].toString());
    //googletag.pubads().setTargeting("is-first-pageview", isFirstVisit());
    googletag.pubads().setTargeting("is-cookies-enabled", navigator.cookieEnabled ? "Yes" : "No");
    //googletag.pubads().setTargeting("is-reloaded", isPageReloaded());
    googletag.pubads().setTargeting("is-wallpaper-fitting", pageVariables["viewport-width"] >= 1600 ? "Yes" : "No");
    googletag.pubads().setTargeting("is-fully-expanded", (pageVariables['viewport-width'] >= contentAreaMaxWidth) ? "Yes" : "No");
    googletag.pubads().setTargeting("device", deviceClassification);
    googletag.pubads().setTargeting("dice", pageVariables["dice"]);
    googletag.pubads().setTargeting("section-iab", pageVariables["sectioncat"]);
    googletag.pubads().setTargeting("section-iabname", pageVariables["sectioncat-name"]);
    googletag.pubads().setTargeting("browserName", browserName);
    googletag.pubads().enableSingleRequest();
    googletag.pubads().disableInitialLoad(); //AdSense API: (adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=1;
    googletag.pubads().setSafeFrameConfig({
        allowPushExpansion: true,
        allowOverlayExpansion: true
    });
    try {
        googletag.pubads().addEventListener('slotRenderEnded', function(event) {
            var renderDiv;
            renderDiv = event.slot.getSlotElementId();
            if (event.isEmpty) {
                adslotStates[renderDiv] = "Empty";
            } else {
                adslotStates[renderDiv] = event.size;
				
                if (Array.isArray(event.size) && (event.size.length === 2) && (renderDiv.indexOf("InText") > -1)) {
                    if ((event.size[0] > 10) && (event.size[0] < 400)) {
                        document.getElementById(renderDiv).style.float = "right";
                        document.getElementById(renderDiv).style.clear = "right";
                        document.getElementById(renderDiv).style.marginLeft = "15px";
                    } else if (event.size[0] === 1) {
                        var realWidth = parseInt(document.querySelector("#" + renderDiv + " > div > iframe").width, 10);
                        if ((realWidth > 10) && (realWidth < 400)) {
                            document.getElementById(renderDiv).style.float = "right";
                            document.getElementById(renderDiv).style.clear = "right";
                            document.getElementById(renderDiv).style.marginLeft = "15px";
                        }
                    }
                }
				
            }
        });
    } catch (err) {
        printError(err, "Bug in slotRenderEnded listener");
    }
    try {
        if (usingIabCMP) {
            //Fallback timeout start
            var fallbackEnableService = setTimeout(function() {
                if ((pageVariables["environment"] !== "NoAds") && !gServicesEnabled) {
                    gServicesEnabled = true;
                    googletag.enableServices(); //AdSense API: (adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=0
                    printInfo("fallbackEnableService entered. This should not happen and indicates race conditions between CPM and GAM. Try loading the CMP script earlier...");
                    initATFAds();
                }
            }, 8000);
            if (cookieCMP === "GAM") {
                window.googlefc = window.googlefc || {};
                window.googlefc.ccpa = window.googlefc.ccpa || {};
                window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
                googlefc.callbackQueue.push({
                    'CONSENT_DATA_READY': function() { //assumes (data.eventStatus === 'tcloaded' || data.eventStatus === 'useractioncomplete') is implicit by CONSENT_DATA_READY, but no sure
                        __tcfapi('getTCData', 0, function(data, success) {
                            if (success) {
                                if (!!data.gdprApplies) {
                                    tcString = data.tcString;
                                    /* Purpose threatment */

                                    // @see: https://support.didomi.io/google-limited-ads
                                    //var localStorageAccessAllowed = data.purpose.consents[1];  //if allowed to access the browsers local storage, e.g. for setting and reading cookies
                                    var basisAdsAllowed = data.purpose.consents[2]; //if allowed to show non-personalized ads based on e.g. conextual targeting or targeted browser info like user language
                                    //                                var targetingMappingAllowed = data.purpose.consents[3];    //if allowed to gather personal informations, e.g. for later targeting
                                    //                                var profileTargetingAllowed = data.purpose.consents[4];      //if allowed to display ads based on personal informations and history, e.g. user has been on eBay previously
                                    var adsPerformanceTrackingAllowed = data.purpose.consents[7]; //if allowed to measure ads performance, e.g. viewabillity tracking
                                    //                                var audienceTargetingAllowed = data.purpose.consents[9];    //if allowed to make audience targeting based on e.g. marketing survys
                                    //                                var dataOptimazionAllowed = data.purpose.consents[10];      //if allowed to use data for product delevopment and improvements, e.g. machine learning
                                    //                                

                                    /* Vendor threatment */

                                    //... see https://iabeurope.eu/vendor-list-tcf-v2-0/
                                    var disallowedVendors = [];
                                    for (var vendor in data.vendor.consents) {
                                        if (data.vendor.consents.hasOwnProperty(vendor) && data.vendor.consents[vendor] === false) {
                                            disallowedVendors.push(vendor.toString(10));
                                            /*if (vendor === 42) {
                                                taboolaInFeedMax = 0;
                                            }*/
                                        }
                                    }
                                    /*if (!basisAdsAllowed || !adsPerformanceTrackingAllowed) {
                                        taboolaInFeedMax = 0;
                                    }*/

                                }

                                /* Debugging */

                                if (window.location.href.indexOf("?gdpr_debug") > -1) {
                                    printInfo("--BEGIN TFC--\n" + JSON.stringify(data, null, 2) + "\n--END TFC--");
                                }
                                if (window.location.href.indexOf('?cookie-control') > -1) {
                                    try {
                                        googlefc.callbackQueue.push(googlefc.showRevocationMessage);
                                    } catch (err) {
                                        printError(err, "Cookie Revocation failed. Please contact admin@mgdk.dk");
                                    }
                                }
                            }
                        }); //Normal start
                        if ((pageVariables["environment"] !== "NoAds") && !gServicesEnabled) {
                            clearTimeout(fallbackEnableService);
                            googletag.enableServices(); //AdSense API: (adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=0
                            gServicesEnabled = true;
                        }

                        initATFAds();
                    }
                });
            } else if (cookieCMP === "ConsentManager") {
                if (typeof window.__cmp === 'function') {
                    if (!!__cmp('getCMPData') && __cmp('getCMPData').consentExists) {
                        var data = __cmp('getCMPData');
                        tcString = data.consentstring;
                        /* Debugging */
                        if (window.location.href.indexOf("?gdpr_debug") > -1) {
                            printInfo("--BEGIN TFC--\n" + JSON.stringify(data, null, 2) + "\n--END TFC--");
                        }
                        //Normal start
                        if ((pageVariables["environment"] !== "NoAds") && !gServicesEnabled) {
                            gServicesEnabled = true;
                            clearTimeout(fallbackEnableService);
                            //setTimeout(function() {
                            googletag.enableServices(); //AdSense API: (adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=0
                            //}, 1000);
                        }
                        //ATF reload
                        initATFAds();
                    }
                    if (!gServicesEnabled) {
                        __cmp("addEventListener", ["consent", function(e, o) {
                            var data = __cmp('getCMPData');
                            tcString = data.consentstring;
                            /* Debugging */
                            if (window.location.href.indexOf("?gdpr_debug") > -1) {
                                printInfo("--BEGIN TFC--\n" + JSON.stringify(data, null, 2) + "\n--END TFC--");
                            }
                            //Normal start
                            if ((pageVariables["environment"] !== "NoAds") && !gServicesEnabled) {
                                clearTimeout(fallbackEnableService);
                                //setTimeout(function() {
                                googletag.enableServices(); //AdSense API: (adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=0
                                //}, 1000);
                                gServicesEnabled = true;
                            }
                            //ATF reload
                            initATFAds();
                        }, false], null);
                    }
                } else {
                    printInfo("Waiting one second for window.__cmp...");
                    setTimeout(function() {
                        if (typeof window.__cmp === 'function') {
                            __cmp("addEventListener", ["consent", function(e, o) {
                                var data = __cmp('getCMPData');
                                tcString = data.consentstring;
                                /* Debugging */
                                if (window.location.href.indexOf("?gdpr_debug") > -1) {
                                    printInfo("--BEGIN TFC--\n" + JSON.stringify(data, null, 2) + "\n--END TFC--");
                                }
                                //Normal start
                                if ((pageVariables["environment"] !== "NoAds") && !gServicesEnabled) {
                                    clearTimeout(fallbackEnableService);
                                    //setTimeout(function() {
                                    googletag.enableServices(); //AdSense API: (adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=0
                                    //}, 1000);
                                    gServicesEnabled = true;
                                }
                                //ATF reload
                                initATFAds();
                            }, false], null);
                            printInfo("Done.");
                        } else {
                            printInfo("Please consider if the CMP can load any faster!");
                        }
                    }, 1000);
                }
            }
        } else { //CMP Disabled start
            if ((pageVariables["environment"] !== "NoAds") && !gServicesEnabled) {
                googletag.enableServices(); //AdSense API: (adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=0
                gServicesEnabled = true;
                //ATF reload
                initATFAds();
            }
        }
    } catch (err) { //Failover start
        printError(err, "Error in googlefc");
        if ((pageVariables["environment"] !== "NoAds") && !gServicesEnabled) {
            gServicesEnabled = true;
            googletag.enableServices(); //AdSense API: (adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=0
            //ATF reload
            initATFAds();
        }
    }
});


var adsScrollListener = function() {

    if (is_desktop) {
        
        if ((slot_InText_1 !== undefined) && !refreshedMap["div-InText_1"] && isAdunitWithinYOffset("div-InText_1", desktop_delta)) {
            try {
               // var banner_div_InText_1 = createInTextBannerForDisplay(1);
                /* if (!!banner_div_InText_1 && banner_div_InText_1.setAfterParagraph(5)) { */
                    googletag.cmd.push(function() {
                        googletag.display("div-InText_1");
                        refreshAdslot(slot_InText_1);
                    });
                /* } else {
                    printInfo("Not enough paragraphs for inserting " + banner_div_InText_1.id);
                } */
            } catch (err) {
                printError(err, "Failed to insert InText 1");
            }
        }
		
		if ((slot_InText_2 !== undefined) && !refreshedMap["div-InText_2"] && isAdunitWithinYOffset("div-InText_2", desktop_delta)) {
            try {
                /* var banner_div_InText_2 = createInTextBannerForDisplay(2);
                if (!!banner_div_InText_2 && banner_div_InText_2.setAfterParagraph(10)) { */
                    googletag.cmd.push(function() {
                        googletag.display("div-InText_2");
                        refreshAdslot(slot_InText_2);
                    });
                /* } else {
                    printInfo("Not enough paragraphs for inserting " + banner_div_InText_2.id);
                } */
            } catch (err) {
                printError(err, "Failed to insert InText 2");
            }
        }
		
		if ((slot_InText_3 !== undefined) && !refreshedMap["div-InText_3"] && isParagraphWithinYOffset(15, desktop_delta)) {
            try {
                var banner_div_InText_3 = createInTextBannerForDisplay(3);
                if (!!banner_div_InText_3 && banner_div_InText_3.setAfterParagraph(15)) {
                    googletag.cmd.push(function() {
                        googletag.display(banner_div_InText_3.id);
                        refreshAdslot(slot_InText_3);
                    });
                } else {
                    printInfo("Not enough paragraphs for inserting " + banner_div_InText_3.id);
                }
            } catch (err) {
                printError(err, "Failed to insert InText 3");
            }
        }
		
		if ((slot_InText_4 !== undefined) && !refreshedMap["div-InText_4"] && isParagraphWithinYOffset(20, desktop_delta)) {
            try {
                var banner_div_InText_4 = createInTextBannerForDisplay(4);
                if (!!banner_div_InText_4 && banner_div_InText_4.setAfterParagraph(20)) {
                    googletag.cmd.push(function() {
                        googletag.display(banner_div_InText_4.id);
                        refreshAdslot(slot_InText_4);
                    });
                } else {
                    printInfo("Not enough paragraphs for inserting " + banner_div_InText_4.id);
                }
            } catch (err) {
                printError(err, "Failed to insert InText 4");
            }
        }
		
		if ((slot_InText_5 !== undefined) && !refreshedMap["div-InText_5"] && isParagraphWithinYOffset(25, desktop_delta)) {
            try {
                var banner_div_InText_5 = createInTextBannerForDisplay(5);
                if (!!banner_div_InText_5 && banner_div_InText_5.setAfterParagraph(25)) {
                    googletag.cmd.push(function() {
                        googletag.display(banner_div_InText_5.id);
                        refreshAdslot(slot_InText_5);
                    });
                } else {
                    printInfo("Not enough paragraphs for inserting " + banner_div_InText_5.id);
                }
            } catch (err) {
                printError(err, "Failed to insert InText 5");
            }
        }
		
		 if ((slot_InFeed_1 !== undefined) && !refreshedMap["div-InFeed_1"] && isAdunitWithinYOffset("div-InFeed_1", desktop_delta)) {
            try {
                googletag.cmd.push(function() {
                    googletag.display("div-InFeed_1"); //new
                    refreshAdslot(slot_InFeed_1);
                });
            } catch (err) {
                printError(err, "Failed to insert InFeed_1");
            }
        }
		
        if ((slot_930x180_2 !== undefined) && !refreshedMap["div-930x180_2"] && isAdunitWithinYOffset("div-930x180_2", desktop_delta)) {
            googletag.cmd.push(function() {
                googletag.display("div-930x180_2"); //new
                refreshAdslot(slot_930x180_2);
            });
        }
    } else {
        if ((slot_Mobile_Article_1 !== undefined) && !refreshedMap["div-Mobile_Article_1"] && isParagraphWithinYOffset(2, mobile_article_delta)) {           
            try {
                var banner_div_Mobile_Article_1 = createMobileArticleBanner(1);
                if (!!banner_div_Mobile_Article_1 && banner_div_Mobile_Article_1.setAfterParagraph(2)) {
                    googletag.cmd.push(function() {
                        googletag.display("div-Mobile_Article_1");
                        refreshAdslot(slot_Mobile_Article_1);
                    });
                } else {
                    printInfo("Not enough paragraphs for inserting " + banner_div_Mobile_Article_1.id);
                }
            } catch (err) {
                printError(err, "Failed to insert Mobile Article 1");
            }
        }
        if ((slot_Mobile_Article_2 !== undefined) && !refreshedMap["div-Mobile_Article_2"] && isParagraphWithinYOffset(7, mobile_article_delta)) {
            try {
                var banner_div_Mobile_Article_2 = createMobileArticleBanner(2);
                if (!!banner_div_Mobile_Article_2 && banner_div_Mobile_Article_2.setAfterParagraph(7)) {
                    googletag.cmd.push(function() {
                        googletag.display("div-Mobile_Article_2");
                        refreshAdslot(slot_Mobile_Article_2);
                    });
                } else {
                    printInfo("Not enough paragraphs for inserting " + banner_div_Mobile_Article_2.id);
                }
            } catch (err) {
                printError(err, "Failed to insert Mobile Article 2");
            }
        }
        if ((slot_Mobile_Article_3 !== undefined) && !refreshedMap["div-Mobile_Article_3"] && isParagraphWithinYOffset(12, mobile_article_delta)) {
            try {
                var banner_div_Mobile_Article_3 = createMobileArticleBanner(3);
                if (!!banner_div_Mobile_Article_3 && banner_div_Mobile_Article_3.setAfterParagraph(12)) {
                    googletag.cmd.push(function() {
                        googletag.display(banner_div_Mobile_Article_3.id);
                        refreshAdslot(slot_Mobile_Article_3);
                    });
                } else {
                    printInfo("Not enougn paragraphs for inserting " + banner_div_Mobile_Article_3.id);
                }
            } catch (err) {
                printError(err, "Failed to insert Mobile Article 3");
            }
        }
        if ((slot_Mobile_Article_4 !== undefined) && !refreshedMap["div-Mobile_Article_4"] && isParagraphWithinYOffset(17, mobile_article_delta)) {
            try {
                var banner_div_Mobile_Article_4 = createMobileArticleBanner(4);
                if (!!banner_div_Mobile_Article_4 && banner_div_Mobile_Article_4.setAfterParagraph(17)) {
                    googletag.cmd.push(function() {
                        googletag.display(banner_div_Mobile_Article_4.id);
                        refreshAdslot(slot_Mobile_Article_4);
                    });
                } else {
                    printInfo("Not enougn paragraphs for inserting " + banner_div_Mobile_Article_4.id);
                }
            } catch (err) {
                printError(err, "Failed to insert Mobile Article 4");
            }
        }
        if ((slot_Mobile_Article_5 !== undefined) && !refreshedMap["div-Mobile_Article_5"] && isParagraphWithinYOffset(22, mobile_article_delta)) {
            try {
                var banner_div_Mobile_Article_5 = createMobileArticleBanner(5);
                if (!!banner_div_Mobile_Article_5 && banner_div_Mobile_Article_5.setAfterParagraph(22)) {
                    googletag.cmd.push(function() {
                        googletag.display(banner_div_Mobile_Article_5.id);
                        refreshAdslot(slot_Mobile_Article_5);
                    });
                } else {
                    printInfo("Not enougn paragraphs for inserting " + banner_div_Mobile_Article_5.id);
                }
            } catch (err) {
                printError(err, "Failed to insert Mobile Article 5");
            }
        }
        if ((slot_Mobile_Article_6 !== undefined) && !refreshedMap["div-Mobile_Article_6"] && isParagraphWithinYOffset(27, mobile_article_delta)) {
            try {
                var banner_div_Mobile_Article_6 = createMobileArticleBanner(6);
                if (!!banner_div_Mobile_Article_6 && banner_div_Mobile_Article_6.setAfterParagraph(27)) {
                    googletag.cmd.push(function() {
                        googletag.display(banner_div_Mobile_Article_6.id);
                        refreshAdslot(slot_Mobile_Article_6);
                    });
                } else {
                    printInfo("Not enougn paragraphs for inserting " + banner_div_Mobile_Article_6.id);
                }
            } catch (err) {
                printError(err, "Failed to insert Mobile Article 6");
            }
        }
		if ((slot_Mobile_Article_7 !== undefined) && !refreshedMap["div-Mobile_Article_7"] && isParagraphWithinYOffset(32, mobile_article_delta)) {
            try {
                var banner_div_Mobile_Article_7 = createMobileArticleBanner(7);
                if (!!banner_div_Mobile_Article_7 && banner_div_Mobile_Article_7.setAfterParagraph(32)) {
                    googletag.cmd.push(function() {
                        googletag.display(banner_div_Mobile_Article_7.id);
                        refreshAdslot(slot_Mobile_Article_7);
                    });
                } else {
                    printInfo("Not enougn paragraphs for inserting " + banner_div_Mobile_Article_7.id);
                }
            } catch (err) {
                printError(err, "Failed to insert Mobile Article 7");
            }
        }
		
		if ((slot_Mobile_Article_8 !== undefined) && !refreshedMap["div-Mobile_Article_8"] && isParagraphWithinYOffset(37, mobile_article_delta)) {
            try {
                var banner_div_Mobile_Article_8 = createMobileArticleBanner(8);
                if (!!banner_div_Mobile_Article_8 && banner_div_Mobile_Article_8.setAfterParagraph(37)) {
                    googletag.cmd.push(function() {
                        googletag.display(banner_div_Mobile_Article_8.id);
                        refreshAdslot(slot_Mobile_Article_8);
                    });
                } else {
                    printInfo("Not enougn paragraphs for inserting " + banner_div_Mobile_Article_8.id);
                }
            } catch (err) {
                printError(err, "Failed to insert Mobile Article 8");
            }
        }
		
        if ((slot_Mobile_InFeed_1 !== undefined) && !refreshedMap["div-Mobile_InFeed_1"] && isAdunitWithinYOffset("div-Mobile_InFeed_1", mobile_delta)) {
            googletag.cmd.push(function() {
                googletag.display("div-Mobile_InFeed_1");
                refreshAdslot(slot_Mobile_InFeed_1);
            });
        }
        if ((slot_Mobile_InFeed_2 !== undefined) && !refreshedMap["div-Mobile_InFeed_2"] && isAdunitWithinYOffset("div-Mobile_InFeed_2", mobile_delta)) {
            googletag.cmd.push(function() {
                googletag.display("div-Mobile_InFeed_2");
                refreshAdslot(slot_Mobile_InFeed_2);
            });
        }

        if (!!slot_Mobile_Anchor && !refreshedMap["gpt_unit_/49662453/PengehjoernetDK/Mobile_Anchor_0"] && ("scrollY" in window) && (window.scrollY > 2500)) {
            googletag.cmd.push(function() {
                refreshAdslot(slot_Mobile_Anchor);
            });
        }
    }
};

if (pageVariables["environment"] !== "NoAds") {
	try {
		window.addEventListener('scroll', adsScrollListener, {
			passive: true
		});
	} catch (err) {
		window.addEventListener('scroll', adsScrollListener);
		console.log("passive scroll listener failed");
	}

}

// Refresh ADS on navigation
window.navigation.addEventListener("navigate", (event) => {
    console.log('location changed!');
    refreshedMap["div-InText_1"] = false;
    refreshedMap["div-InText_2"] = false;
    refreshedMap["div-InText_3"] = false;
    refreshedMap["div-InText_4"] = false;
    refreshedMap["div-InText_5"] = false;
    refreshedMap["div-Mobile_Article_1"] = false;
    refreshedMap["div-Mobile_Article_2"] = false;
    refreshedMap["div-Mobile_Article_3"] = false;
    refreshedMap["div-Mobile_Article_4"] = false;
    refreshedMap["div-Mobile_Article_5"] = false;
    refreshedMap["div-Mobile_Article_6"] = false;
    refreshedMap["div-Mobile_Article_7"] = false;
    refreshedMap["div-Mobile_Article_8"] = false;
});