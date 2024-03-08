<template>
    <div>
        <div id="accordion">
            <div class="card">
                <div class="card-header" id="headingTwo" data-toggle="collapse" data-target="#collapseTwo"
                    aria-expanded="false" aria-controls="collapseTwo">
                    <h5 class="mb-0">
                        <div>
                            <div class="accordion_head">Chính sách giao hàng &amp; đổi trả
                                <span class="plusminus">+</span>
                            </div>
                        </div>
                    </h5>
                </div>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                    <div class="card-body">
                        <div class="freeShipping">
                            <i class="fa fa-truck fa-2x box-icon" aria-hidden="true"></i>
                            Giao hàng hoàn toàn miễn phí 100%
                        </div>
                        <div class="freeShipping">
                            <i class="fa fa-shield fa-2x box-icon" aria-hidden="true"></i>
                            An toàn với nhận hàng và trả tiền tại nhà
                        </div>
                        <div class="freeShipping">
                            <i class="fa fa-exchange fa-2x box-icon" aria-hidden="true"></i>
                            Bảo hành đổi trả trong vòng 60 ngày
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" id="headingThree" data-toggle="collapse" data-target="#collapseThree"
                    aria-expanded="false" aria-controls="collapseThree">
                    <h5 class="mb-0">
                        <div class="accordion_head">
                            Hướng dẫn bảo quản <span class="plusminus">+</span>
                        </div>
                    </h5>
                </div>
                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                    <div class="card-body">
                        <div class="accordion_body" style="display: block;">
                            <ul>
                                <li><strong>Khử mùi bên trong giày</strong></li>
                            </ul>
                            <p>
                                Bạn hãy đặt túi đựng viên chống ẩm vào bên trong giày để hút ẩm và rắc phấn rôm (có thể thay
                                bằng cách đặt vào bên trong giày gói trà túi lọc chưa qua sử dụng) để khử mùi, giúp giày
                                luôn khô thoáng.
                            </p>
                            <p>
                                Để hạn chế mùi hôi và sự ẩm ướt cho giày, hãy chọn vớ chân loại tốt, có khả năng thấm hút
                                cao. Ngoài ra, dùng các loại lót giày khử mùi cũng là một phương pháp tốt.
                            </p>
                            <ul>
                                <li><strong>Bảo quản giày khi không sử dụng</strong></li>
                            </ul>
                            <p>
                                Khi sử dụng giày, bạn đừng vội vứt hộp đi mà hãy cất lại để dành. Khi không sử dụng, hãy
                                nhét
                                một ít giấy vụn vào bên trong giày để giữ cho dáng giày luôn chuẩn, đẹp. Sau đó đặt giày vào
                                hộp bảo quản cùng túi hút ẩm.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style scoped>
.freeShipping {
    display: flex;
    align-items: center;
    padding: 1.5rem 0;
    margin: 0 1.5rem;
    border-bottom: 1px solid #f1f1f1;
}

.freeShipping .fa-truck {
    background-color: #fff4b8 !important;
    color: #e6ae15 !important;
}

.freeShipping .fa-shield {
    background-color: #bff9d0 !important;
    color: #00d994 !important;
}

.freeShipping .fa-exchange {
    background-color: #ffd0d0 !important;
    color: #d45757 !important;
}

.card-body .freeShipping i {
    margin-right: 1rem;
    color: #23232c;
    padding: 0.6rem;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    text-align: center;
}

.accordion_head {
    color: #111;
    cursor: pointer;
    font-family: arial;
    font-size: 15px;
    margin: 0 0 1px 0;
    padding: 10px 0;
    font-weight: 300;
    text-transform: uppercase;
}

.card-header {
    color: #111;
    cursor: pointer;
    font-family: arial;
    font-size: 15px;
    margin: 0 20px 1px 20px;
    padding: 10px 0;
    font-weight: 300;
    text-transform: uppercase;
    border: none;
}

.plusminus {
    float: right;
}
</style>