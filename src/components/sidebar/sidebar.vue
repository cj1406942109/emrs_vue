<template>
    <div class="page-sidebar-wrapper">
        <!-- BEGIN SIDEBAR -->
        <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
        <!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->
        <div class="page-sidebar navbar-collapse collapse">
            <!-- BEGIN SIDEBAR MENU -->
            <!-- DOC: Apply "page-sidebar-menu-light" class right after "page-sidebar-menu" to enable light sidebar menu style(without borders) -->
            <!-- DOC: Apply "page-sidebar-menu-hover-submenu" class right after "page-sidebar-menu" to enable hoverable(hover vs accordion) sub menu mode -->
            <!-- DOC: Apply "page-sidebar-menu-closed" class right after "page-sidebar-menu" to collapse("page-sidebar-closed" class must be applied to the body element) the sidebar sub menu mode -->
            <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
            <!-- DOC: Set data-keep-expand="true" to keep the submenues expanded -->
            <!-- DOC: Set data-auto-speed="200" to adjust the sub menu slide up/down speed -->
            <ul class="page-sidebar-menu  page-header-fixed " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" style="padding-top: 20px">
                <!-- DOC: To remove the sidebar toggler from the sidebar you just need to completely remove the below "sidebar-toggler-wrapper" LI element -->
                <!-- BEGIN SIDEBAR TOGGLER BUTTON -->
                <li class="sidebar-toggler-wrapper hide">
                    <div class="sidebar-toggler">
                        <span></span>
                    </div>
                </li>
                <!-- END SIDEBAR TOGGLER BUTTON -->
                <!-- DOC: To remove the search box from the sidebar you just need to completely remove the below "sidebar-search-wrapper" LI element -->
                <li class="sidebar-search-wrapper hide">
                    <!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->
                    <!-- DOC: Apply "sidebar-search-bordered" class the below search form to have bordered search box -->
                    <!-- DOC: Apply "sidebar-search-bordered sidebar-search-solid" class the below search form to have bordered & solid search box -->
                    <form class="sidebar-search" action="#" method="POST">
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
                    </form>
                    <!-- END RESPONSIVE QUICK SEARCH FORM -->
                </li>
                <li v-for="menuItem in menu" :key="menuItem.id" class="nav-item" :class="{active: menuItem.isActive, open: menuItem.isOpen}">
                    <router-link :to="menuItem.href" class="nav-link nav-toggle">
                        <i :class="menuItem.icon"></i>
                        <span class="title">{{menuItem.title}}</span>
                        <span :class="{selected: menuItem.isActive}"></span>
                        <span :class="{arrow: menuItem.submenu && menuItem.submenu.length > 0, open: menuItem.isOpen}"></span>
                    </router-link>
                    <ul class="sub-menu">
                        <li v-for="submenuItem in menuItem.submenu" :key="submenuItem.id" class="nav-item" :class="{active: submenuItem.isActive, open: submenuItem.isOpen}" @click="activeMenu(menuItem, submenuItem)">
                            <router-link :to="submenuItem.href" class="nav-link">
                                <i :class="submenuItem.icon"></i>
                                <span class="title">{{submenuItem.title}}</span>
                                <span :class="{selected: submenuItem.isActive}"></span>
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
                    title: '智能医疗',
                    icon: 'icon-home',
                    href: '',
                    isActive: false,
                    isOpen: false,
                    submenu: [
                        {
                            title: '主页',
                            icon: 'icon-bar-chart',
                            href: '/home/index',
                            isActive: false
                        }
                    ]
                },
                {
                    title: '电子病历系统',
                    icon: 'icon-briefcase',
                    href: '',
                    isActive: false,
                    isOpen: false,
                    submenu: [
                        {
                            title: '病历查询',
                            icon: 'icon-question',
                            href: '/home',
                            isActive: false
                        },
                        {
                            title: '病历录入',
                            icon: 'icon-note',
                            href: '/home/input',
                            isActive: false
                        }
                    ]
                }
            ]
        }
    },
    created () {
        var path = this.$route.path;
        console.log(path);
        this.menu.forEach(menuItem => {            
            menuItem.submenu.forEach(submenuItem => {
                if(submenuItem.href === path){
                    submenuItem.isActive = true;
                    menuItem.isActive = true;
                    menuItem.isOpen = true;
                }
            })
        })
        
    },
    methods: {
        activeMenu (menu, submenu) {
            this.menu.forEach(menuItem => {
                menuItem.isActive = false;
                menuItem.isOpen = false;
                menuItem.submenu.forEach(submenuItem => {
                    submenuItem.isActive = false;
                })
            })
            menu.isActive = true;
            menu.isOpen = true;
            submenu.isActive = true;
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>


