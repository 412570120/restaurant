$(document).ready(function () {
  // 切換菜單和購物車頁面
  $('#menu-btn').click(function () {
    $('#menu').show();
    $('#cart').hide();
  });

  $('#cart-btn').click(function () {
    $('#menu').hide();
    $('#cart').show();
  });

  // 加入購物車功能
  $('.add-to-cart').click(function () {
    let itemName = $(this).parent().data('name');
    let itemPrice = $(this).parent().data('price');
    $('#cart-items').append(`<li>${itemName} - NT$${itemPrice}</li>`);
    updateTotal(itemPrice);
  });

  // 更新總金額
  function updateTotal(price) {
    let currentTotal = parseInt($('#total-price').text().replace('總金額: NT$', ''));
    $('#total-price').text(`總金額: NT$${currentTotal + price}`);
  }
});
