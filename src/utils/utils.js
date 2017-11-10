const handleSidebarAndContentHeight = function() {
    var content = $('.page-content');
    var sidebar = $('.page-sidebar');
    var body = $('body');
    var height;

    if(body.hasClass("page-footer-fixed") === true && body.hasClass("page-sidebar-fixed") === false) {
        var available_height = getViewPort().height - $('.page-footer').outerHeight() - $('.page-header').outerHeight();
        var sidebar_height = sidebar.outerHeight();
        if(sidebar_height > available_height) {
            available_height = sidebar_height + $('.page-footer').outerHeight();
        }
        if(content.height() < available_height) {
            content.css('min-height', available_height);
        }
    } else {
        if(body.hasClass('page-sidebar-fixed')) {
            height = _calculateFixedSidebarViewportHeight();
            if(body.hasClass('page-footer-fixed') === false) {
                height = height - $('.page-footer').outerHeight();
            }
        } else {
            var headerHeight = $('.page-header').outerHeight();
            var footerHeight = $('.page-footer').outerHeight();

            if(getViewPort().width < resBreakpointMd) {
                height = getViewPort().height - headerHeight - footerHeight;
            } else {
                height = sidebar.height() + 20;
            }

            if((height + headerHeight + footerHeight) <= getViewPort().height) {
                height = getViewPort().height - headerHeight - footerHeight;
            }
        }
        content.css('min-height', height);
        sidebar.css('min-height', height);
    }
};

const handlePortletCollapse = function() {
    $('body').on('click', '.portlet > .portlet-title > .tools > .collapse, .portlet .portlet-title > .tools > .expand', function(e) {
        e.preventDefault();
        var el = $(this).closest(".portlet").children(".portlet-body");
        if($(this).hasClass("collapse")) {
            $(this).removeClass("collapse").addClass("expand");
            el.stop().slideUp(200);
        } else {
            $(this).removeClass("expand").addClass("collapse");
            el.stop().slideDown(200);
        }
    });
};

const handleGoTop = function() {
    var offset = 300;
    var duration = 500;

    if(navigator.userAgent.match(/iPhone|iPad|iPod/i)) { // ios supported
        $(window).bind("touchend touchcancel touchleave", function(e) {
            if($(this).scrollTop() > offset) {
                $('.scroll-to-top').fadeIn(duration);
            } else {
                $('.scroll-to-top').fadeOut(duration);
            }
        });
    } else { // general 
        $(window).scroll(function() {
            if($(this).scrollTop() > offset) {
                $('.scroll-to-top').fadeIn(duration);
            } else {
                $('.scroll-to-top').fadeOut(duration);
            }
        });
    }

    $('.scroll-to-top').click(function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, duration);
        return false;
    });
};
// Helper function to calculate sidebar height for fixed sidebar layout.
const _calculateFixedSidebarViewportHeight = function() {
    var sidebarHeight = getViewPort().height - $('.page-header').outerHeight(true);
    if($('body').hasClass("page-footer-fixed")) {
        sidebarHeight = sidebarHeight - $('.page-footer').outerHeight();
    }
    return sidebarHeight;
};

const getViewPort = function() {
    var e = window,
        a = 'inner';
    if(!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }

    return {
        width: e[a + 'Width'],
        height: e[a + 'Height']
    };
};

const datepickerOption = {
    type: 'day',
    week: ['一', '二', '三', '四', '五', '六', '日'],
    month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    format: 'YYYY-MM-DD',
    placeholder: '选择日期',
    inputStyle: {
        'display': 'inline-block',
        'padding': '6px',
        'line-height': '22px',
        'text-align': 'center',
        'font-size': '14px',
        'border': '1px solid #c2cad8',
        'border-radius': '4px',
        'color': '#5F5F5F'
    },
    color: {
        header: '#ccc',
        headerText: '#f00'
    },
    buttons: {
        ok: '确定',
        cancel: '取消'
    },
    overlayOpacity: 0.5, // 0.5 as default 
    dismissible: true // as true as default 
};

/**
 * 存储localStorage
 */
const setStore = (name, content) => {
    if(!name) return;
    if(typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
const getStore = name => {
    if(!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
const removeStore = name => {
    if(!name) return;
    window.localStorage.removeItem(name);
}

export default {
    handleSidebarAndContentHeight: handleSidebarAndContentHeight,
    datepickerOption: datepickerOption,
    handlePortletCollapse: handlePortletCollapse,
    handleGoTop: handleGoTop,
    setStore: setStore,
    getStore: getStore,
    removeStore: removeStore
}
