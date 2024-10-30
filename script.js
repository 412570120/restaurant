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

    let cartItem = $(`<li>${itemName} - NT$${itemPrice} 
      <button class="remove-item">移除</button> 
      <button class="increase-qty">+</button>
      <span class="quantity"> 1 </span>
      <button class="decrease-qty">-</button>
    </li>`).hide().fadeIn();

    $('#cart-items').append(cartItem);
    updateTotal(itemPrice);
  });

  // 更新總金額
  function updateTotal(price) {
    let currentTotal = parseInt($('#total-price').text().replace('總金額: NT$', ''));
    $('#total-price').text(`總金額: NT$${currentTotal + price}`);
  }

  // 移除購物車項目
  $('#cart-items').on('click', '.remove-item', function () {
    let itemPrice = parseInt($(this).parent().text().match(/NT\$([0-9]+)/)[1]);
    let quantity = parseInt($(this).siblings('.quantity').text());
    updateTotal(-itemPrice * quantity);
    $(this).parent().fadeOut(function () {
      $(this).remove();
    });
  });

  // 清空購物車
  $('#clear-cart').click(function () {
    $('#cart-items').fadeOut(function () {
      $(this).empty().fadeIn();
    });
    $('#total-price').text('總金額: NT$0');
  });

  // 增加商品數量
  $('#cart-items').on('click', '.increase-qty', function () {
    let quantityElem = $(this).siblings('.quantity');
    let newQty = parseInt(quantityElem.text()) + 1;
    quantityElem.text(newQty);
    
    let itemPrice = parseInt($(this).parent().text().match(/NT\$([0-9]+)/)[1]);
    updateTotal(itemPrice);
  });

  // 減少商品數量
  $('#cart-items').on('click', '.decrease-qty', function () {
    let quantityElem = $(this).siblings('.quantity');
    let currentQty = parseInt(quantityElem.text());

    if (currentQty > 1) {
      let newQty = currentQty - 1;
      quantityElem.text(newQty);

      let itemPrice = parseInt($(this).parent().text().match(/NT\$([0-9]+)/)[1]);
      updateTotal(-itemPrice);
    }
  });
});
