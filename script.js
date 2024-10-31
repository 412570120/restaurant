$(document).ready(function() {
  // 顯示彈窗的函數
  function showPopup(message) {
    $('#popup-text').text(message);
    $('#popup-message').fadeIn(300).delay(1000).fadeOut(300);
  }

  // 新增至購物車按鈕事件
  $('.add-to-cart').on('click', function() {
    const itemName = $(this).closest('.menu-item').data('name');
    const itemPrice = $(this).closest('.menu-item').data('price');

    // 將商品加入購物車
    $('#cart-items').append(`
      <li class="cart-item" data-name="${itemName}" data-price="${itemPrice}">
        <span>${itemName} - NT$${itemPrice}</span>
        <button class="remove-item">刪除</button>
      </li>
    `);
    updateTotalPrice();

    // 顯示成功加入購物車的提示
    showPopup(`${itemName} 已加入購物車！`);
  });

  // 刪除購物車內的單一商品
  $('#cart-items').on('click', '.remove-item', function() {
    const itemName = $(this).closest('.cart-item').data('name');
    $(this).closest('.cart-item').remove();
    updateTotalPrice();

    // 顯示成功刪除商品的提示
    showPopup(`${itemName} 已從購物車移除！`);
  });

  // 清空購物車按鈕事件
  $('#clear-cart').on('click', function() {
    $('#cart-items').empty();
    updateTotalPrice();

    // 顯示清空購物車的提示
    showPopup('購物車已清空！');
  });

  // 更新購物車總價的函數
  function updateTotalPrice() {
    let totalPrice = 0;
    $('#cart-items .cart-item').each(function() {
      const itemPrice = $(this).data('price');
      totalPrice += itemPrice;
    });
    $('#total-price').text(`總金額: NT$${totalPrice}`);
  }
});
