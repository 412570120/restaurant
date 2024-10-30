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

