$(document).ready(function() {
  function showPopup(message) {
    $('#popup-text').text(message);
    $('#popup-message').fadeIn(300).delay(1000).fadeOut(300);
  }

  // 切換菜單和購物車顯示
  $('#menu-btn').on('click', function(e) {
    e.preventDefault();
    $('#menu').show();
    $('#cart, #checkout, #order-complete').hide();
  });

  $('#cart-btn').on('click', function(e) {
    e.preventDefault();
    $('#cart').show();
    $('#menu, #checkout, #order-complete').hide();
  });

  $('.add-to-cart').on('click', function() {
    const itemName = $(this).closest('.menu-item').data('name');
    const itemPrice = $(this).closest('.menu-item').data('price');
    $('#cart-items').append(`
      <li class="cart-item" data-name="${itemName}" data-price="${itemPrice}">
        <span>${itemName} - NT$${itemPrice}</span>
        <button class="remove-item">刪除</button>
      </li>
    `);
    updateTotalPrice();
    showPopup(`${itemName} 已加入購物車！`);
  });

  $('#cart-items').on('click', '.remove-item', function() {
    const itemName = $(this).closest('.cart-item').data('name');
    $(this).closest('.cart-item').remove();
    updateTotalPrice();
    // 顯示成功刪除商品的提示
    showPopup(`${itemName} 已從購物車移除！`);
  });

  $('#clear-cart').on('click', function() {
    $('#cart-items').empty();
    updateTotalPrice();
    showPopup('購物車已清空！');
  });

  function updateTotalPrice() {
    let totalPrice = 0;
    $('#cart-items .cart-item').each(function() {
      totalPrice += $(this).data('price');
    });
    $('#total-price').text(`總金額: NT$${totalPrice}`);
  }

  $('#checkout-btn').on('click', function() {
    $('#checkout-items').html($('#cart-items').html());
    $('#checkout-total').text($('#total-price').text());
    $('#checkout').show();
    $('#cart, #menu').hide();
  });

  $('#confirm-checkout').on('click', function() {
    let deliveryFee = $('input[name="delivery"]:checked').val() === 'delivery' ? 30 : 0;
    let finalTotal = parseInt($('#total-price').text().replace('總金額: NT$', '')) + deliveryFee;
    $('#checkout-total').text(`總金額: NT$${finalTotal}`);
    $('#checkout').hide();
    $('#order-complete').show();
    setTimeout(function() {
      $('#order-complete').hide();
      $('#menu').show();
    }, 3000);
  });

  $('#back-to-cart').on('click', function() {
    $('#checkout').hide();
    $('#cart').show();
  });
});
