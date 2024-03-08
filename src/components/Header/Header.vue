<template>
    <div class="container">
        <div class="super_container">
            <!-- Header -->
            <header class="header">

                <!-- Top Bar -->

                <div class="top_bar">
                    <div class="container">
                        <div class="row">
                            <div class="col d-flex flex-row">
                                <div class="top_bar_contact_item">
                                    <div class="top_bar_icon"><img
                                            src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560918577/phone.png"
                                            alt=""></div>+84 915 217 024
                                </div>
                                <div class="top_bar_contact_item">
                                    <div class="top_bar_icon"><img
                                            src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560918597/mail.png"
                                            alt=""></div><a
                                        href="mailto:trancongnhat2608@gmail.com">trancongnhat2608@gmail.com</a>
                                </div>
                                <div class="top_bar_content ml-auto">
                                    <div class="top_bar_menu">
                                    </div>
                                    <div class="top_bar_user mt-3">
                                        <div class="user_icon"><img
                                                src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560918647/user.svg"
                                                alt="">
                                        </div>
                                        <div v-if="this.fullName != '' && this.fullName != undefined">
                                            Xin chào, {{ this.fullName }}
                                        </div>
                                        <div v-if="this.fullName == undefined || this.fullName == ''">
                                            <router-link to="/login">Đăng nhập</router-link>
                                        </div>
                                        <div class="btn_logout" v-if="this.fullName != '' && this.fullName != undefined"
                                            @click="logOut()"><i class="fa-solid fa-right-from-bracket"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Header Main -->

                <div class="header_main">
                    <div class="container">
                        <div class="row row_1">

                            <!-- Logo -->
                            <div class="col-lg-2 col-sm-3 col-3 order-1">
                                <div class="logo_container">
                                    <div class="logo">
                                        <router-link to="/home">
                                            <img class="logo_header" width="100" src="../../../public/Logo_Header.png"
                                                alt="">
                                        </router-link>
                                    </div>
                                </div>
                            </div>

                            <!-- Search -->
                            <div class="col-lg-6 col-12 order-lg-2 order-3 text-lg-left text-right">
                                <div class="header_search">
                                    <div class="header_search_content">
                                        <div class="header_search_form_container">
                                            <form action="#" class="header_search_form clearfix">
                                                <input type="search" required="required" class="header_search_input"
                                                    placeholder="Tìm kiếm...">
                                                <div class="custom_dropdown" style="display: none;">
                                                    <div class="custom_dropdown_list">
                                                        <span class="custom_dropdown_placeholder clc">All Categories</span>
                                                        <i class="fas fa-chevron-down"></i>
                                                        <ul class="custom_list clc">
                                                            <li><a class="clc" href="#">All Categories</a></li>
                                                            <li><a class="clc" href="#">Computers</a></li>
                                                            <li><a class="clc" href="#">Laptops</a></li>
                                                            <li><a class="clc" href="#">Cameras</a></li>
                                                            <li><a class="clc" href="#">Hardware</a></li>
                                                            <li><a class="clc" href="#">Smartphones</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <button type="submit" class="header_search_button trans_300"
                                                    value="Submit"><img
                                                        src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560918770/search.png"
                                                        alt=""></button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Wishlist -->
                            <div class="col-lg-4 col-9 order-lg-3 order-2 text-lg-left text-right">
                                <div class="wishlist_cart d-flex flex-row align-items-center justify-content-end">
                                    <div class="wishlist d-flex flex-row align-items-center justify-content-end">
                                        <div class="wishlist_icon"><img
                                                src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560918681/heart.png"
                                                alt=""></div>
                                        <div class="wishlist_content">
                                            <div class="wishlist_text"><a href="#">Yêu thích</a></div>
                                            <div class="wishlist_count">10</div>
                                        </div>
                                    </div>

                                    <!-- Cart -->
                                    <div class="cart">
                                        <router-link to="">
                                            <div @click="cart()"
                                                class="cart_container d-flex flex-row align-items-center justify-content-end">
                                                <div class="cart_icon">
                                                    <img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560918704/cart.png"
                                                        alt="">
                                                    <div class="cart_count"><span>{{ this.lengthCart }}</span></div>
                                                </div>
                                                <div class="cart_content">
                                                    <div class="cart_text"><a href="#">Giỏ hàng</a></div>
                                                    <div class="cart_price">0đ</div>
                                                </div>
                                            </div>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Menu -->
            </header>
        </div>
    </div>
</template>

<script>


import { TweenMax, Power2 } from "gsap";
import notification from "../../utils/notification.utils";
import CartService from '../../service/Cart'
export default {
    props: {
        countReRender: Number
    },
    data() {
        return {
            fullName: '',
            cartId: undefined,
            Cart: {},
            lengthCart: 0,
            id: undefined
        }
    },
    methods: {
        logOut() {
            localStorage.clear()
            this.$router.replace({ path: `/home` });
            window.location.reload()
        },

        cart() {
            this.cartId = JSON.parse(localStorage.getItem('cart'))
            if (this.cartId == '' || this.cartId == undefined) {
                notification.warn('Bạn cần đăng nhập vào tài khoản', this)
            }
            else {
                this.$router.push({ path: `/cart/${this.cartId}` });
            }
        }

    },
    async created() {
        console.log('rerender: 1')
        if (localStorage.getItem('cart') != undefined || localStorage.getItem('cart') != '') {
            this.id = await JSON.parse(localStorage.getItem('cart'))
            if (this.id != null) {
                let res = await CartService.getCart(this.id)
                this.lengthCart = await res.data.items.length
            }
        }

        this.fullName = JSON.parse(localStorage.getItem('FullName'))
        $(document).ready(function () {
            "use strict";

            var menuActive = false;
            var header = $('.header');
            setHeader();
            initCustomDropdown();
            initPageMenu();

            function setHeader() {

                if (window.innerWidth > 991 && menuActive) {
                    closeMenu();
                }
            }

            function initCustomDropdown() {
                if ($('.custom_dropdown_placeholder').length && $('.custom_list').length) {
                    var placeholder = $('.custom_dropdown_placeholder');
                    var list = $('.custom_list');
                }

                placeholder.on('click', function (ev) {
                    if (list.hasClass('active')) {
                        list.removeClass('active');
                    }
                    else {
                        list.addClass('active');
                    }

                    $(document).one('click', function closeForm(e) {
                        if ($(e.target).hasClass('clc')) {
                            $(document).one('click', closeForm);
                        }
                        else {
                            list.removeClass('active');
                        }
                    });

                });

                $('.custom_list a').on('click', function (ev) {
                    ev.preventDefault();
                    var index = $(this).parent().index();

                    placeholder.text($(this).text()).css('opacity', '1');

                    if (list.hasClass('active')) {
                        list.removeClass('active');
                    }
                    else {
                        list.addClass('active');
                    }
                });


                $('select').on('change', function (e) {
                    placeholder.text(this.value);

                    $(this).animate({ width: placeholder.width() + 'px' });
                });
            }

            /* 
        
            4. Init Page Menu
        
            */

            function initPageMenu() {
                if ($('.page_menu').length && $('.page_menu_content').length) {
                    var menu = $('.page_menu');
                    var menuContent = $('.page_menu_content');
                    var menuTrigger = $('.menu_trigger');

                    //Open / close page menu
                    menuTrigger.on('click', function () {
                        if (!menuActive) {
                            openMenu();
                        }
                        else {
                            closeMenu();
                        }
                    });

                    //Handle page menu
                    if ($('.page_menu_item').length) {
                        var items = $('.page_menu_item');
                        items.each(function () {
                            var item = $(this);
                            if (item.hasClass("has-children")) {
                                item.on('click', function (evt) {
                                    evt.preventDefault();
                                    evt.stopPropagation();
                                    var subItem = item.find('> ul');
                                    if (subItem.hasClass('active')) {
                                        subItem.toggleClass('active');
                                        TweenMax.to(subItem, 0.3, { height: 0 });
                                    }
                                    else {
                                        subItem.toggleClass('active');
                                        TweenMax.set(subItem, { height: "auto" });
                                        TweenMax.from(subItem, 0.3, { height: 0 });
                                    }
                                });
                            }
                        });
                    }
                }
            }

            function openMenu() {
                var menu = $('.page_menu');
                var menuContent = $('.page_menu_content');
                TweenMax.set(menuContent, { height: "auto" });
                TweenMax.from(menuContent, 0.3, { height: 0 });
                menuActive = true;
            }

            function closeMenu() {
                var menu = $('.page_menu');
                var menuContent = $('.page_menu_content');
                TweenMax.to(menuContent, 0.3, { height: 0 });
                menuActive = false;
            }


        });
    }
}
</script>
<style scoped>
@import url('../Header/Header.css');
</style>