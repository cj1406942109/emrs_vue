<template>
    <div class="page-sidebar-wrapper">
        <!-- BEGIN SIDEBAR -->
        <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
        <!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->
        <div class="page-sidebar navbar-collapse collapse" ref="pageSidebar">
            <!-- BEGIN SIDEBAR MENU -->
            <!-- DOC: Apply "page-sidebar-menu-light" class right after "page-sidebar-menu" to enable light sidebar menu style(without borders) -->
            <!-- DOC: Apply "page-sidebar-menu-hover-submenu" class right after "page-sidebar-menu" to enable hoverable(hover vs accordion) sub menu mode -->
            <!-- DOC: Apply "page-sidebar-menu-closed" class right after "page-sidebar-menu" to collapse("page-sidebar-closed" class must be applied to the body element) the sidebar sub menu mode -->
            <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
            <!-- DOC: Set data-keep-expand="true" to keep the submenues expanded -->
            <!-- DOC: Set data-auto-speed="200" to adjust the sub menu slide up/down speed -->
            <ul class="page-sidebar-menu  page-header-fixed " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">
                <!-- DOC: To remove the sidebar toggler from the sidebar you just need to completely remove the below "sidebar-toggler-wrapper" LI element -->
                <!-- BEGIN SIDEBAR TOGGLER BUTTON -->
                <!-- <li class="sidebar-toggler-wrapper">
                    <div class="sidebar-toggler">
                        <span></span>
                    </div>
                </li> -->
                <!-- END SIDEBAR TOGGLER BUTTON -->
                <!-- DOC: To remove the search box from the sidebar you just need to completely remove the below "sidebar-search-wrapper" LI element -->
                <!-- <li class="sidebar-search-wrapper hide"> -->
                    <!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->
                    <!-- DOC: Apply "sidebar-search-bordered" class the below search form to have bordered search box -->
                    <!-- DOC: Apply "sidebar-search-bordered sidebar-search-solid" class the below search form to have bordered & solid search box -->
                    <!-- <form class="sidebar-search" action="#" method="POST">
                        <a href="javascript:;" class="remove">
                            <i class="icon-close"></i>
                        </a>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search...">
                            <span class="input-group-btn">
                                <a href="javascript:;" class="btn submit">
                                    <i class="icon-magnifier"></i>
                                </a>
                            </span>
                        </div>
                    </form> -->
                    <!-- END RESPONSIVE QUICK SEARCH FORM -->
                <!-- </li> -->
                <li @click="menuToggler(menuItem)" v-for="(menuItem, menuIndex) in menu" :key="menuItem.id" class="nav-item" :class="{active: currentMenu==menuIndex, open: menuItem.isOpen}">
                    <router-link :to="menuItem.href" class="nav-link nav-toggle">
                        <i :class="menuItem.icon"></i>
                        <span class="title">{{menuItem.title}}</span>
                        <span :class="{selected: currentMenu==menuIndex}"></span>
                        <span :class="{arrow: menuItem.submenu && menuItem.submenu.length > 0, open: menuItem.isOpen}"></span>
                    </router-link>
                    <ul class="sub-menu" :class="{hide:!menuItem.isOpen, show:menuItem.isOpen}">
                        <li @click.prevent.stop="submenuToggler(menuIndex, submenuIndex)" v-for="(submenuItem, submenuIndex) in menuItem.submenu" :key="submenuItem.id" class="nav-item" :class="{active: currentSubmenu==submenuIndex&&currentMenu==menuIndex}">
                            <router-link :to="submenuItem.href" class="nav-link">
                                <i :class="submenuItem.icon"></i>
                                <span class="title">{{submenuItem.title}}</span>
                                <span :class="{selected: currentSubmenu==submenuIndex}"></span>
                                <!-- <span :class="{arrow: submenuItem.submenu && submenuItem.submenu.length > 0, open: submenuItem.isOpen}"></span> -->
                            </router-link>
                            <!-- <ul class="sub-menu" v-if="submenuItem.submenu && submenuItem.submenu.length > 0"></ul> -->
                        </li>
                    </ul>
                </li>                          
            </ul>
            <!-- END SIDEBAR MENU -->
        </div>
        <!-- END SIDEBAR -->
    </div>
</template>

<script>

export default {
    name: 'sidebar',
    data () {
        return {
            //目前只实现二级菜单
            menu: [
                {
                    title: 'Intelligent Medical',
                    icon: 'icon-home',
                    href: '',
                    isOpen: false,
                    submenu: [
                        {
                            title: 'Dashboard',
                            icon: 'icon-bar-chart',
                            href: '/home'
                        }
                    ]
                },
                {
                    title: 'Bleeding Risk Estimator',
                    icon: 'icon-calculator',
                    href: '',
                    isOpen: false,
                    submenu: [
                        {
                            title: 'Input Data',
                            icon: 'icon-note',
                            href: '/home/bre_input'
                        },{
                            title: 'Result List',
                            icon: 'icon-list',
                            href: '/home/bre_query'
                        }
                    ]
                },
                {
                    title: 'Coronary Artery Disease',
                    icon: 'icon-calculator',
                    href: '',
                    isOpen: false,
                    submenu: [
                        {
                            title: 'Input Data',
                            icon: 'icon-note',
                            href: '/home/cad_input'
                        },{
                            title: 'Result List',
                            icon: 'icon-list',
                            href: '/home/cad_query'
                        }
                    ]
                },
                {
                    title: 'Framingham risk score',
                    icon: 'icon-calculator',
                    href: '',
                    isOpen: false,
                    submenu: [
                        {
                            title: 'Input Data',
                            icon: 'icon-note',
                            href: '/home/frs_input'
                        },{
                            title: 'Result List',
                            icon: 'icon-list',
                            href: '/home/frs_query'
                        }
                    ]
                }
            ],
            currentMenu: 0,
            currentSubmenu: 0
        }
    },
    created () {
        var path = this.$route.path;
        const vue = this;
        vue.menu.forEach(function(menuItem, menuIndex) {
            menuItem.submenu.forEach(function(submenuItem, submenuIndex) {
                if(submenuItem.href == path) {
                    vue.currentMenu = menuIndex;
                    vue.currentSubmenu = submenuIndex;
                    menuItem.isOpen = true;
                }
            })
        });
    },
    methods: {        
        menuToggler (menuItem) {
            menuItem.isOpen = !menuItem.isOpen;
        },
        submenuToggler (menuIndex, submenuIndex) {
            this.currentMenu = menuIndex;
            this.currentSubmenu = submenuIndex;
        }
    }
}
</script>

<style lang="stylus" scoped>
    
</style>


