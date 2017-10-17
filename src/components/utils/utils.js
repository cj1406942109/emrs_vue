var handleSidebarAndContentHeight = function() {
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

// Helper function to calculate sidebar height for fixed sidebar layout.
var _calculateFixedSidebarViewportHeight = function() {
    var sidebarHeight = getViewPort().height - $('.page-header').outerHeight(true);
    if($('body').hasClass("page-footer-fixed")) {
        sidebarHeight = sidebarHeight - $('.page-footer').outerHeight();
    }
    return sidebarHeight;
};

var getViewPort = function() {
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

export default {
    handleSidebarAndContentHeight: handleSidebarAndContentHeight
}
