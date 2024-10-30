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

    // 新增至購物車清單
    $('#cart-items').append(
      `<li class="cart-item">
        ${itemName} - NT$${itemPrice} 
        <button class="remove-item" data-price="${itemPrice}">移除</button>
      </li>`
    );
    updateTotal(itemPrice);
  });

  // 更新總金額
  function updateTotal(price) {
    let currentTotal = parseInt($('#total-price').text().replace('總金額: NT$', ''));
    $('#total-price').text(`總金額: NT$${currentTotal + price}`);
  }

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
  // 移除購物車項目
  $('#cart-items').on('click', '.remove-item', function () {
    let price = parseInt($(this).data('price'));
    updateTotal(-price);
    $(this).parent().remove();
  });

  // 清空購物車
  $('#clear-cart').click(function () {
    $('#cart-items').empty();
    $('#total-price').text('總金額: NT$0');
  });

  // 搜尋功能
  $('#search-bar').on('input', function () {
    let query = $(this).val().toLowerCase();
    $('.menu-item').each(function () {
      let itemName = $(this).data('name').toLowerCase();
      $(this).toggle(itemName.includes(query));
    });
  });
});

 

