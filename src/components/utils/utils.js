const utils = {};

utils.handleSidebarAndContentHeight = () => {

}

handleSidebarAndContentHeight = function() {
    var content = $('.page-content');
    var sidebar = $('.page-sidebar');
    var body = $('body');
    var height;

    if(body.hasClass("page-footer-fixed") === true && body.hasClass("page-sidebar-fixed") === false) {
        var available_height = App.getViewPort().height - $('.page-footer').outerHeight() - $('.page-header').outerHeight();
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

            if(App.getViewPort().width < resBreakpointMd) {
                height = App.getViewPort().height - headerHeight - footerHeight;
            } else {
                height = sidebar.height() + 20;
            }

            if((height + headerHeight + footerHeight) <= App.getViewPort().height) {
                height = App.getViewPort().height - headerHeight - footerHeight;
            }
        }
        content.css('min-height', height);
    }
};
