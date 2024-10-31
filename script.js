$(document).ready(function() {
  let deliveryFee = 0;

  // 顯示彈窗的函數
  function showPopup(message) {
    $('#popup-text').text(message);
    $('#popup-message').fadeIn(300).delay(1000).fadeOut(300);
  }

  // 更新總金額，根據外送選項加上外送費用
  function updateTotalPrice() {
    let totalPrice = 0;
    $('#cart-items .cart-item').each(function() {
      const itemPrice = $(this).data('price');
      totalPrice += itemPrice;
    });

    $('#total-price').text(`總金額: NT$${totalPrice}`);
    $('#checkout-total').text(`總金額: NT$${totalPrice + deliveryFee}`);
  }

  // 切換外送/自取時更新運費
  $('input[name="delivery"]').on('change', function() {
    deliveryFee = $(this).val() === 'delivery' ? 30 : 0;
    updateTotalPrice();
  });

  // 結帳按鈕事件
  $('#checkout-btn').on('click', function() {
    $('#cart').hide();
    $('#checkout').show();
    $('#checkout-items').html($('#cart-items').html());
    updateTotalPrice();
  });

  // 確認結帳
  $('#confirm-checkout').on('click', function() {
    $('#checkout').hide();
    $('#order-complete').show();
    
    setTimeout(function() {
      $('#order-complete').hide();
      $('#menu').show();
      $('#cart-items').empty();  // 清空購物車
      updateTotalPrice(); // 更新為0元
    }, 3000);
  });

  // 回到購物籃
  $('#back-to-cart').on('click', function() {
    $('#checkout').hide();
    $('#cart').show();
  });

  // 新增至購物車按鈕事件
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

  // 刪除購物車內的單一商品
  $('#cart-items').on('click', '.remove-item', function() {
    $(this).closest('.cart-item').remove();
    updateTotalPrice();
    showPopup('商品已從購物車移除！');
  });

  // 清空購物車按鈕事件
  $('#clear-cart').on('click', function() {
    $('#cart-items').empty();
    updateTotalPrice();
    showPopup('購物車已清空！');
  });
});

