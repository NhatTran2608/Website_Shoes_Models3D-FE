<template>
    <div>
        <div>
            <div class="page-wrapper chiller-theme toggled">
                <a id="show-sidebar" class="btn btn-sm btn-dark" href="#">
                    <i class="fas fa-bars"></i>
                </a>
                <nav id="sidebar" class="sidebar-wrapper">
                    <div class="sidebar-content">
                        <div class="sidebar-brand">
                            <a href="#">pro sidebar</a>
                            <div id="close-sidebar">
                                <i class="fas fa-times"></i>
                            </div>
                        </div>
                        <div class="sidebar-header">
                            <div class="user-pic">
                                <router-link to="/admin/home"><img class="img-responsive img-rounded"
                                        src="../../../public/logo_Header.png" alt="User picture"></router-link>

                            </div>
                            <div class="user-info">
                                <span class="user-name">Shoes
                                    <strong>Store</strong>
                                </span>
                                <span class="user-role">Administrator</span>
                                <span class="user-status">
                                    <i class="fa fa-circle"></i>
                                    <span>Online</span>
                                </span>
                            </div>
                        </div>
                        <!-- sidebar-header  -->
                        <div class="sidebar-search">
                            <div>
                                <div class="input-group">
                                    <input type="text" class="form-control search-menu" placeholder="Search...">
                                    <div class="input-group-append">
                                        <span class="input-group-text">
                                            <i class="fa fa-search" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- sidebar-search  -->
                        <div class="sidebar-menu">
                            <ul>
                                <li class="header-menu">
                                    <span>General</span>
                                </li>
                                <li class="sidebar-dropdown">
                                    <router-link to="/admin/home"><i class="fas fa-warehouse"></i>
                                        <span>Kho hàng</span></router-link>
                                    <!-- <a href=""> -->
                                    <!-- <span class="badge badge-pill badge-warning">New</span> -->
                                    <!-- </a> -->
                                    <!-- <div class="sidebar-submenu">
                                        <ul>
                                            <li>
                                                <router-link to="#"> Quản lý kho
                                                    <span class="badge badge-pill badge-success">Pro</span>
                                                </router-link>
                                            </li>
                                            <li>
                                                <router-link to="#">

                                                </router-link>
                                            </li>
                                            <li>
                                                <a href="#">Dashboard 3</a>
                                            </li>
                                        </ul>
                                    </div> -->
                                </li>
                                <li class="sidebar-dropdown">
                                    <a href="#">
                                        <i class="fa fa-shopping-cart"></i>
                                        <span>Đơn hàng</span>
                                        <span class="badge badge-pill badge-danger">3</span>
                                    </a>
                                    <div class="sidebar-submenu">
                                        <ul>
                                            <li>
                                                <router-link to="/admin/list/order">Đặt hàng</router-link>
                                            </li>
                                            <li>
                                                <router-link to="/admin/list/shipping">Bàn giao vận chuyển</router-link>
                                            </li>
                                            <!-- <li>
                                                <a href="#">Products
                                                </a>
                                            </li> -->

                                        </ul>
                                    </div>
                                </li>
                                <li class="sidebar-dropdown">
                                    <a href="#">
                                        <i class="far fa-gem"></i>
                                        <span>Quản lý người dùng</span>
                                    </a>
                                    <div class="sidebar-submenu">
                                        <ul>
                                            <li>
                                                <a href="/admin/list-user">Danh sách người dùng</a>
                                            </li>
                                            <!-- <li>
                                                <a href="#">Panels</a>
                                            </li>
                                            <li>
                                                <a href="#">Tables</a>
                                            </li> -->
                                        </ul>
                                    </div>
                                </li>
                                <li class="sidebar-dropdown">
                                    <a href="#">
                                        <i class="fa fa-chart-line"></i>
                                        <span>Thống kê</span>
                                    </a>
                                    <div class="sidebar-submenu">
                                        <ul>
                                            <li>
                                                <a href="/admin/revenue">Theo ngày/tháng</a>
                                            </li>
                                            <!-- <li>
                                                <a href="#">Theo thương hiệu</a>
                                            </li>
                                            <li>
                                                <a href="#">Bar chart</a>
                                            </li>
                                            <li>
                                                <a href="#">Histogram</a>
                                            </li> -->
                                        </ul>
                                    </div>
                                </li>
                                <li class="sidebar-dropdown">
                                    <a href="#">
                                        <i class="fa fa-globe"></i>
                                        <span>Thêm</span>
                                    </a>
                                    <div class="sidebar-submenu">
                                        <ul>
                                            <li>
                                                <a href="/admin/addBrand">Thêm thương hiệu</a>
                                            </li>
                                            <li>
                                                <a href="/add-model3D">Tải lên mô hình 3D</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <!-- <li class="header-menu">
                                    <span>Extra</span>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fa fa-book"></i>
                                        <span>Documentation</span>
                                        <span class="badge badge-pill badge-primary">Beta</span>
                                    </a>
                                </li> -->
                            </ul>
                        </div>
                        <!-- sidebar-menu  -->
                    </div>
                    <!-- sidebar-content  -->
                    <div class="sidebar-footer">
                        <a href="#">
                            <i class="fa fa-bell"></i>
                            <span class="badge badge-pill badge-warning notification">3</span>
                        </a>
                        <a href="#">
                            <i class="fa fa-envelope"></i>
                            <span class="badge badge-pill badge-success notification">7</span>
                        </a>
                        <a href="#">
                            <i class="fa fa-cog"></i>
                            <span class="badge-sonar"></span>
                        </a>
                        <a href="#">
                            <i class="fa fa-power-off"></i>
                        </a>
                    </div>
                </nav>
                <!-- sidebar-wrapper  -->
                <!-- page-content" -->
            </div>
            <!-- page-wrapper -->
        </div>
    </div>
</template>
<script>

export default {
    mounted() {
        $(".sidebar-dropdown > a").click(function () {
            $(".sidebar-submenu").slideUp(200);
            if (
                $(this)
                    .parent()
                    .hasClass("active")
            ) {
                $(".sidebar-dropdown").removeClass("active");
                $(this)
                    .parent()
                    .removeClass("active");
            } else {
                $(".sidebar-dropdown").removeClass("active");
                $(this)
                    .next(".sidebar-submenu")
                    .slideDown(200);
                $(this)
                    .parent()
                    .addClass("active");
            }
        });

        $("#close-sidebar").click(function () {
            $(".page-wrapper").removeClass("toggled");
        });
        $("#show-sidebar").click(function () {
            $(".page-wrapper").addClass("toggled");
        });
    }
}
</script>
<style scoped>
@import '../HeaderAdmin/Header.css';
</style>