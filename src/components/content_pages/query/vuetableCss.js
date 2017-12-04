export default {
    table: {
        tableClass: 'table table-striped table-hover',
        ascendingIcon: 'glyphicon glyphicon-chevron-up',
        descendingIcon: 'glyphicon glyphicon-chevron-down',
        handleIcon: 'glyphicon glyphicon-menu-hamburger',
        renderIcon: function(classes, options) {
            return `<span class="${classes.join(' ')}"></span>`
        }
    },
    pagination: {
        wrapperClass: "pagination btn-group pull-right",
        activeClass: "btn green",
        disabledClass: "disabled",
        pageClass: "btn btn-default",
        linkClass: "btn btn-default",
        icons: {
            first: "",
            prev: "",
            next: "",
            last: ""
        }
    },
    paginationInfo: {
        infoClass: 'pull-left'
    }
}
